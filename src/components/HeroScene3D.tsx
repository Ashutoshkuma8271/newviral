/**
 * Hero 3D scene (Three.js via React Three Fiber). Loaded lazily, only on laptop/desktop screens with WebGL, after the
 * page has painted — phones and reduced-motion visitors get the poster image instead (see Hero.tsx).
 *
 * Art direction: a slow, moody product-shot of the brand in resin and chrome. Polished amber honeycomb prisms (the bee
 * motif), a polished chrome ring and a few honey-amber light orbs float in depth on the right of the frame, lit by
 * soft amber/white light panels; fine pollen-like particles drift through. Bloom makes the orbs glow; film grain and
 * the vignette are page overlays (see Hero.tsx).
 * The camera drifts on its own, eases toward the mouse, and dollies in as the visitor scrolls.
 *
 * TWEAKABLE VALUES are grouped in SCENE below.
 */
import React, { useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, Lightformer, PerformanceMonitor, Sparkles } from '@react-three/drei';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import { Vector3 } from 'three';
import type { MotionValue } from 'framer-motion';

/* ---------------------------------------------------------------------------------------------------------------- */
/* TWEAKABLE VALUES                                                                                                    */
/* ---------------------------------------------------------------------------------------------------------------- */
export const SCENE = {
  background: '#0C0D12', // Obsidian Slate Canvas
  blue: '#F59E0B', // Radiant Honey Amber
  cyan: '#FBBF24', // Warm Gold
  lavender: '#E2E8F0', // Pure Chrome Silver
  softPink: '#F59E0B', // Honey Accent
  clusterOffset: [2.1, 0.1, 0] as [number, number, number],
  cameraZ: 9,
  mouseFollow: { x: 0.9, y: 0.55 },
  scrollDolly: 2.6,
  drift: 0.12,
  floatSpeed: 1.1,
  bloom: 1.25,
  particles: 70,
};

/* Hexagonal prism = a 6-sided cylinder turned to face the camera */
const HexPrism: React.FC<{
  position: [number, number, number];
  scale: number;
  tilt: [number, number, number];
  speed: number;
  tint?: string;
}> = ({ position, scale, tilt, speed, tint = '#161F36' }) => (
  <Float speed={speed * SCENE.floatSpeed} rotationIntensity={0.7} floatIntensity={0.9}>
    <mesh position={position} rotation={[Math.PI / 2 + tilt[0], tilt[1], tilt[2]]} scale={scale}>
      <cylinderGeometry args={[1, 1, 0.42, 6, 1]} />
      {/* Polished deep navy resin with luminous electric blue inner glow */}
      <meshStandardMaterial
        color={tint}
        metalness={0.5}
        roughness={0.2}
        emissive={SCENE.blue}
        emissiveIntensity={0.2}
        envMapIntensity={2.5}
      />
    </mesh>
  </Float>
);

const ChromeRing: React.FC<{ position: [number, number, number]; scale: number }> = ({ position, scale }) => (
  <Float speed={0.8 * SCENE.floatSpeed} rotationIntensity={1.1} floatIntensity={0.6}>
    <mesh position={position} rotation={[0.9, 0.4, 0.2]} scale={scale}>
      <torusGeometry args={[1, 0.26, 48, 128]} />
      <meshStandardMaterial color="#DDE3F0" metalness={1} roughness={0.12} envMapIntensity={1.8} />
    </mesh>
  </Float>
);

const Orb: React.FC<{ position: [number, number, number]; size: number; speed: number }> = ({ position, size, speed }) => (
  <Float speed={speed * SCENE.floatSpeed} floatIntensity={1.4} rotationIntensity={0}>
    <mesh position={position}>
      <sphereGeometry args={[size, 32, 32]} />
      {/* Bright cyan glowing orbs with bloom pass */}
      <meshBasicMaterial color={SCENE.cyan} toneMapped={false} />
    </mesh>
  </Float>
);

/** Camera: slow idle drift + eases toward the mouse + dollies in with the hero scroll */
const CameraRig: React.FC<{ px: MotionValue<number>; py: MotionValue<number>; progress: MotionValue<number> }> = ({
  px,
  py,
  progress,
}) => {
  const target = useMemo(() => new Vector3(), []);
  const look = useMemo(() => new Vector3(SCENE.clusterOffset[0] * 0.55, 0, 0), []);
  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const p = progress.get();
    target.set(
      px.get() * SCENE.mouseFollow.x + Math.sin(t * SCENE.drift) * 0.45,
      -py.get() * SCENE.mouseFollow.y + Math.cos(t * SCENE.drift * 0.8) * 0.22 + p * 0.6,
      SCENE.cameraZ - p * SCENE.scrollDolly,
    );
    // frame-rate independent easing (expo-like)
    state.camera.position.lerp(target, 1 - Math.pow(0.0025, delta));
    state.camera.lookAt(look);
  });
  return null;
};

/** The whole cluster turns slowly; scrolling adds a little extra turn */
const Cluster: React.FC<{ progress: MotionValue<number>; children: React.ReactNode }> = ({ progress, children }) => {
  const ref = useRef<import('three').Group>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.08) * 0.25 + progress.get() * 0.7;
  });
  return (
    <group ref={ref} position={SCENE.clusterOffset}>
      {children}
    </group>
  );
};

interface HeroScene3DProps {
  px: MotionValue<number>;
  py: MotionValue<number>;
  progress: MotionValue<number>;
  /** stop rendering while the hero is off-screen */
  paused: boolean;
  onReady?: () => void;
  /** called if the device stays too slow even in the lighter mode; the hero then falls back to the poster */
  onTooSlow?: () => void;
}

const HeroScene3D: React.FC<HeroScene3DProps> = ({ px, py, progress, paused, onReady, onTooSlow }) => {
  // Drop to a lighter mode (lower resolution, no depth of field) if the device cannot hold the frame rate
  const [lite, setLite] = useState(false);

  return (
    <Canvas
      className="!absolute inset-0"
      dpr={[1, lite ? 1 : 1.5]}
      frameloop={paused ? 'never' : 'always'}
      camera={{ position: [0, 0, SCENE.cameraZ], fov: 32, near: 0.1, far: 60 }}
      gl={{ antialias: false, powerPreference: 'high-performance', alpha: false, stencil: false }}
      onCreated={() => requestAnimationFrame(() => onReady?.())}
      aria-hidden="true"
    >
      {/* Slow device: first a lighter mode; if it keeps struggling, hand back to the poster image */}
      <PerformanceMonitor onDecline={() => setLite(true)} flipflops={2} onFallback={() => onTooSlow?.()} />
      <color attach="background" args={[SCENE.background]} />
      <fog attach="fog" args={[SCENE.background, 9, 20]} />

      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 4, 5]} intensity={1.5} color={SCENE.cyan} />
      <directionalLight position={[-6, -2, 3]} intensity={0.7} color={SCENE.blue} />

      {/* Studio light panels, generated in code (no image download) — these are what glass and chrome reflect */}
      <Environment resolution={128} frames={1}>
        <Lightformer form="rect" intensity={5} color={SCENE.blue} position={[5, 3, 3]} scale={[6, 2, 1]} />
        <Lightformer form="rect" intensity={4} color="#ffffff" position={[-5, 2, 4]} scale={[4, 5, 1]} />
        <Lightformer form="rect" intensity={3} color="#ffffff" position={[0, 6, 2]} scale={[8, 1.5, 1]} />
        <Lightformer form="ring" intensity={4} color={SCENE.cyan} position={[0, 0, -7]} scale={6} />
        <Lightformer form="rect" intensity={1.5} color="#DDE3F0" position={[0, -5, 2]} scale={[10, 1, 1]} />
      </Environment>

      <Cluster progress={progress}>
        <HexPrism position={[0.2, 0.9, 0]} scale={1.15} tilt={[0.35, 0.2, 0.3]} speed={1} tint="#161F36" />
        <HexPrism position={[-1.6, -0.9, 1.1]} scale={0.7} tilt={[-0.4, 0.5, 0]} speed={1.4} tint="#1E293B" />
        <HexPrism position={[1.7, -1.3, -0.8]} scale={0.9} tilt={[0.2, -0.6, 0.4]} speed={0.8} tint="#111827" />
        <HexPrism position={[-0.6, 2.3, -1.6]} scale={0.55} tilt={[0.6, 0.1, -0.3]} speed={1.6} tint="#2563EB" />
        <ChromeRing position={[0.9, -0.2, 0.9]} scale={0.75} />
        <Orb position={[-1.1, 1.4, 0.6]} size={0.13} speed={1.8} />
        <Orb position={[1.5, 1.6, -0.4]} size={0.09} speed={2.2} />
        <Orb position={[-0.2, -1.9, 0.8]} size={0.11} speed={1.5} />
      </Cluster>

      <Sparkles count={SCENE.particles} scale={[14, 7, 8]} size={2.2} speed={0.25} color={SCENE.cyan} opacity={0.65} />

      <CameraRig px={px} py={py} progress={progress} />

      {/* Only bloom runs in 3D (the glow on the amber orbs). Grain and vignette are cheap page overlays in Hero.tsx;
          depth of field and light rays were removed: each re-processed the full screen every frame and was too heavy
          for typical integrated laptop graphics. */}
      <EffectComposer multisampling={0}>
        <Bloom mipmapBlur intensity={SCENE.bloom} luminanceThreshold={0.85} luminanceSmoothing={0.2} />
      </EffectComposer>
    </Canvas>
  );
};

export default HeroScene3D;
