import React, { useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Lightformer, PerformanceMonitor, Sparkles } from '@react-three/drei';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import * as THREE from 'three';
import type { MotionValue } from 'framer-motion';

export const HERO_3D_CONFIG = {
  background: '#0C0D12',
  purple: '#F59E0B',
  neonPink: '#FBBF24',
  deepPurple: '#141620',
  softPink: '#FBBF24',
  lavender: '#E2E8F0',
  titanium: '#FFFFFF',
  cameraZ: 8.5,
  drift: 0.15,
};

/**
 * 1. Cinematic Camera Lens Barrel & Sapphire Optics (representing Video & Reels)
 */
const CinematicLens: React.FC<{ activeDiscipline: number }> = ({ activeDiscipline }) => {
  const isFocused = activeDiscipline === 2; // Reels & Video
  return (
    <Float speed={1.2} rotationIntensity={0.6} floatIntensity={0.8}>
      <group position={[1.8, -0.6, 0.4]} rotation={[0.4, -0.3, 0.2]}>
        {/* Outer Titanium Barrel */}
        <mesh>
          <cylinderGeometry args={[0.95, 0.95, 0.55, 32]} />
          <meshStandardMaterial
            color="#161F36"
            metalness={0.92}
            roughness={0.25}
            envMapIntensity={2.5}
          />
        </mesh>

        {/* Anodized Ice Blue / Electric Blue Focus Ring */}
        <mesh position={[0, 0.12, 0]}>
          <cylinderGeometry args={[0.97, 0.97, 0.14, 32]} />
          <meshStandardMaterial
            color={isFocused ? HERO_3D_CONFIG.neonPink : HERO_3D_CONFIG.purple}
            metalness={0.85}
            roughness={0.3}
            emissive={isFocused ? HERO_3D_CONFIG.neonPink : '#161F36'}
            emissiveIntensity={isFocused ? 0.45 : 0.15}
          />
        </mesh>

        {/* Aperture Inner Bevel */}
        <mesh position={[0, 0.26, 0]}>
          <cylinderGeometry args={[0.78, 0.65, 0.08, 24]} />
          <meshStandardMaterial color="#0C0D12" metalness={0.9} roughness={0.15} />
        </mesh>

        {/* Sapphire Front Lens Glass Element with Specular Reflection */}
        <mesh position={[0, 0.24, 0]}>
          <sphereGeometry args={[0.66, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.35]} />
          <meshPhysicalMaterial
            color="#38BDF8"
            metalness={0.1}
            roughness={0.05}
            transmission={0.88}
            ior={1.62}
            thickness={0.5}
            specularIntensity={1.5}
            specularColor="#38BDF8"
            transparent
            opacity={0.85}
          />
        </mesh>
      </group>
    </Float>
  );
};

/**
 * 2. Polished Cosmic Crystal Prism (Viral Bee Signature Brand Core)
 */
const AmberCorePrism: React.FC<{ activeDiscipline: number }> = ({ activeDiscipline }) => {
  const isFocused = activeDiscipline === 0; // Social / Brand Core
  return (
    <Float speed={0.9} rotationIntensity={0.8} floatIntensity={0.9}>
      <group position={[0.2, 0.8, -0.2]} rotation={[0.5, 0.4, -0.2]}>
        <mesh scale={isFocused ? 1.15 : 1.0}>
          <cylinderGeometry args={[0.92, 0.92, 0.45, 6]} />
          <meshPhysicalMaterial
            color={HERO_3D_CONFIG.purple}
            metalness={0.25}
            roughness={0.15}
            transmission={0.65}
            ior={1.55}
            thickness={1.2}
            emissive={HERO_3D_CONFIG.purple}
            emissiveIntensity={isFocused ? 0.45 : 0.18}
            specularIntensity={1.8}
            specularColor="#38BDF8"
            clearcoat={1.0}
            clearcoatRoughness={0.1}
          />
        </mesh>
      </group>
    </Float>
  );
};

/**
 * 3. Glass Design Artboard & Bezier Curve (representing Creative & Graphic Design)
 */
const CreativeArtboard: React.FC<{ activeDiscipline: number }> = ({ activeDiscipline }) => {
  const isFocused = activeDiscipline === 1; // Creative Design
  return (
    <Float speed={1.1} rotationIntensity={0.7} floatIntensity={0.7}>
      <group position={[-1.6, -0.9, 0.6]} rotation={[-0.3, 0.5, -0.25]}>
        {/* Chamfered Glass Artboard Slab */}
        <mesh scale={isFocused ? [1.4, 0.95, 0.08] : [1.25, 0.85, 0.06]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshPhysicalMaterial
            color="#F8FAFC"
            metalness={0.05}
            roughness={0.1}
            transmission={0.82}
            ior={1.5}
            thickness={0.4}
            clearcoat={0.9}
            transparent
            opacity={0.75}
          />
        </mesh>

        {/* Luminous Bezier Arch Ring */}
        <mesh position={[0, 0, 0.08]} rotation={[0.2, 0, 0.4]}>
          <torusGeometry args={[0.35, 0.04, 16, 48, Math.PI * 1.4]} />
          <meshStandardMaterial
            color={HERO_3D_CONFIG.lavender}
            metalness={0.95}
            roughness={0.2}
            emissive={HERO_3D_CONFIG.lavender}
            emissiveIntensity={isFocused ? 0.5 : 0.15}
          />
        </mesh>
      </group>
    </Float>
  );
};

/**
 * 4. Ascending Performance ROAS Pillars (representing Meta & Google Ads / Lead Gen)
 */
const GrowthPillars: React.FC<{ activeDiscipline: number }> = ({ activeDiscipline }) => {
  const isFocused = activeDiscipline === 4 || activeDiscipline === 5; // Ads or Lead Gen
  return (
    <Float speed={1.0} rotationIntensity={0.5} floatIntensity={0.8}>
      <group position={[2.2, 1.4, -0.6]} rotation={[0.4, -0.6, 0.3]}>
        {/* 3 Stepped Isometric Bar Columns */}
        {[
          { h: 0.6, y: -0.3, x: -0.35, tint: '#1E293B' },
          { h: 0.95, y: -0.12, x: 0, tint: HERO_3D_CONFIG.purple },
          { h: 1.35, y: 0.08, x: 0.35, tint: HERO_3D_CONFIG.neonPink },
        ].map((bar, idx) => (
          <group key={idx} position={[bar.x, bar.y, 0]}>
            <mesh>
              <boxGeometry args={[0.24, bar.h, 0.24]} />
              <meshStandardMaterial
                color="#161F36"
                metalness={0.9}
                roughness={0.22}
                envMapIntensity={2.0}
              />
            </mesh>
            {/* Luminous Top Cap */}
            <mesh position={[0, bar.h / 2 + 0.02, 0]}>
              <boxGeometry args={[0.24, 0.04, 0.24]} />
              <meshBasicMaterial
                color={bar.tint}
                toneMapped={false}
              />
            </mesh>
          </group>
        ))}
      </group>
    </Float>
  );
};

/**
 * 5. Floating Chrome Halo Ring (Technological Precision)
 */
const PrecisionHalo: React.FC = () => {
  return (
    <Float speed={0.7} rotationIntensity={0.9} floatIntensity={0.5}>
      <mesh position={[0.8, -0.2, 1.0]} rotation={[1.1, 0.3, 0.1]}>
        <torusGeometry args={[0.85, 0.05, 24, 64]} />
        <meshStandardMaterial
          color="#F1F5F9"
          metalness={1.0}
          roughness={0.08}
          envMapIntensity={3.0}
        />
      </mesh>
    </Float>
  );
};

/**
 * Synchronized Camera Rig with Mouse Parallax and 3-Phase Scroll Dolly
 */
const CameraController: React.FC<{
  px: MotionValue<number>;
  py: MotionValue<number>;
  progress: MotionValue<number>;
}> = ({ px, py, progress }) => {
  const targetPos = useMemo(() => new THREE.Vector3(), []);
  const lookAtPos = useMemo(() => new THREE.Vector3(1.1, 0, 0), []);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const p = progress.get();

    // Mouse tracking + slow natural organic breathing drift
    const mouseX = px.get() * 1.3;
    const mouseY = -py.get() * 0.9;
    const driftX = Math.sin(t * HERO_3D_CONFIG.drift) * 0.22;
    const driftY = Math.cos(t * HERO_3D_CONFIG.drift * 0.7) * 0.16;

    // Choreographed 3-Phase Scroll Camera:
    // Phase 1 (0.0 - 0.35): Camera approach, right-aligned focus with room for headline on the left
    // Phase 2 (0.35 - 0.75): 3D transformation with smooth pitch/roll and centered focus as copy fades
    // Phase 3 (0.75 - 1.0): Section transition ease into the lower boundary
    let dollyZ = HERO_3D_CONFIG.cameraZ;
    let targetYOffset = 0.1;
    let targetLookX = 1.1;

    if (p < 0.35) {
      const tPhase = p / 0.35;
      dollyZ = 8.5 - tPhase * 1.8; // 8.5 -> 6.7
      targetYOffset = 0.1 + tPhase * 0.15;
      targetLookX = 1.1;
    } else if (p < 0.75) {
      const tPhase = (p - 0.35) / 0.4;
      dollyZ = 6.7 - tPhase * 1.3; // 6.7 -> 5.4
      targetYOffset = 0.25 + tPhase * 0.35;
      targetLookX = 1.1 - tPhase * 0.55;
    } else {
      const tPhase = (p - 0.75) / 0.25;
      dollyZ = 5.4 - tPhase * 0.6; // 5.4 -> 4.8
      targetYOffset = 0.6 + tPhase * 0.4;
      targetLookX = 0.55 - tPhase * 0.35;
    }

    targetPos.set(
      1.2 + mouseX + driftX,
      targetYOffset + mouseY + driftY,
      dollyZ
    );

    lookAtPos.set(targetLookX, targetYOffset * 0.25, 0);

    // Frame-rate independent exponential interpolation
    state.camera.position.lerp(targetPos, 1 - Math.pow(0.002, delta));
    state.camera.lookAt(lookAtPos);
  });

  return null;
};

/**
 * Main 3D World Cluster that pivots dynamically across the 3 scroll phases
 */
const SceneCluster: React.FC<{
  activeDiscipline: number;
  progress: MotionValue<number>;
  children: React.ReactNode;
}> = ({ activeDiscipline, progress, children }) => {
  const groupRef = useRef<THREE.Group>(null);
  const targetRotY = useRef(0);
  const targetScale = useRef(1);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const p = progress.get();

    // Base slow rotation + active discipline step offset + scroll twist
    targetRotY.current =
      Math.sin(state.clock.elapsedTime * 0.08) * 0.18 +
      activeDiscipline * (Math.PI / 4) +
      p * 0.85;

    // Phase 2 3D expansion: scale expands gracefully as copy fades
    targetScale.current = p > 0.3 ? 1.0 + Math.min(0.2, (p - 0.3) * 0.45) : 1.0;

    groupRef.current.rotation.y = THREE.MathUtils.damp(
      groupRef.current.rotation.y,
      targetRotY.current,
      2.8,
      delta
    );

    const s = THREE.MathUtils.damp(groupRef.current.scale.x, targetScale.current, 2.5, delta);
    groupRef.current.scale.set(s, s, s);
  });

  return (
    <group ref={groupRef} position={[1.35, 0.1, 0]}>
      {children}
    </group>
  );
};

export interface Hero3DVisualProps {
  px: MotionValue<number>;
  py: MotionValue<number>;
  progress: MotionValue<number>;
  activeDiscipline?: number;
  paused?: boolean;
  onReady?: () => void;
  onTooSlow?: () => void;
}

export const Hero3DVisual: React.FC<Hero3DVisualProps> = ({
  px,
  py,
  progress,
  activeDiscipline = 0,
  paused = false,
  onReady,
  onTooSlow,
}) => {
  const [lite, setLite] = useState(false);

  return (
    <Canvas
      className="!absolute inset-0 z-0 pointer-events-none"
      dpr={[1, lite ? 1 : 1.5]}
      frameloop={paused ? 'never' : 'always'}
      camera={{ position: [1.2, 0, HERO_3D_CONFIG.cameraZ], fov: 34, near: 0.1, far: 50 }}
      gl={{
        antialias: false,
        powerPreference: 'high-performance',
        alpha: true,
        stencil: false,
      }}
      onCreated={() => {
        requestAnimationFrame(() => onReady?.());
      }}
      aria-hidden="true"
    >
      <PerformanceMonitor
        onDecline={() => setLite(true)}
        flipflops={2}
        onFallback={() => onTooSlow?.()}
      />

      <fog attach="fog" args={[HERO_3D_CONFIG.background, 8, 22]} />

      {/* Atmospheric Studio Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 6, 4]} intensity={2.2} color={HERO_3D_CONFIG.softPink} />
      <directionalLight position={[-6, -2, 3]} intensity={0.9} color={HERO_3D_CONFIG.lavender} />

      {/* Code-Generated Studio Lightformers (Ultra-fast reflections without texture downloads) */}
      <group>
        <Lightformer
          form="rect"
          intensity={6.0}
          color={HERO_3D_CONFIG.purple}
          position={[5, 4, 3]}
          scale={[6, 3, 1]}
        />
        <Lightformer
          form="rect"
          intensity={3.5}
          color="#FFFFFF"
          position={[-6, 3, 4]}
          scale={[5, 6, 1]}
        />
        <Lightformer
          form="ring"
          intensity={4.0}
          color={HERO_3D_CONFIG.neonPink}
          position={[0, 0, -6]}
          scale={7}
        />
      </group>

      {/* Floating 3D Creative Tech Artifacts Cluster */}
      <SceneCluster activeDiscipline={activeDiscipline} progress={progress}>
        <CinematicLens activeDiscipline={activeDiscipline} />
        <AmberCorePrism activeDiscipline={activeDiscipline} />
        <CreativeArtboard activeDiscipline={activeDiscipline} />
        <GrowthPillars activeDiscipline={activeDiscipline} />
        <PrecisionHalo />
      </SceneCluster>

      {/* Floating Cosmic Pink Micro-Dust */}
      <Sparkles
        count={55}
        scale={[12, 8, 7]}
        size={2.4}
        speed={0.25}
        color={HERO_3D_CONFIG.neonPink}
        opacity={0.65}
      />

      <CameraController px={px} py={py} progress={progress} />

      {/* Postprocessing Bloom Pass */}
      <EffectComposer multisampling={0}>
        <Bloom
          mipmapBlur
          intensity={1.2}
          luminanceThreshold={0.82}
          luminanceSmoothing={0.25}
        />
      </EffectComposer>
    </Canvas>
  );
};

export default Hero3DVisual;
