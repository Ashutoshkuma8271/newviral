import React from 'react';
import { motion, useReducedMotion, type MotionValue, useTransform } from 'framer-motion';

interface VyralSignalVisualProps {
  mouseX?: MotionValue<number>;
  mouseY?: MotionValue<number>;
  className?: string;
}

/**
 * The Vyral Signal: Bespoke 3D Motion Graphic
 *
 * Art Direction:
 * - Rich atmospheric violet-to-magenta light field
 * - Translucent glass-like 3D lenses with specular reflections
 * - Fine harmonic luminous ribbons and flowing light paths
 * - Concentric signal wavefronts suggesting creative amplification & momentum
 * - Faint typographic watermark layer
 */
export const VyralSignalVisual: React.FC<VyralSignalVisualProps> = ({
  mouseX,
  mouseY,
  className = '',
}) => {
  const reduce = useReducedMotion();

  // Multi-layer parallax transforms driven by card pointer movement
  const depthFarX = useTransform(mouseX || { get: () => 0 } as any, [-1, 1], [-14, 14]);
  const depthFarY = useTransform(mouseY || { get: () => 0 } as any, [-1, 1], [-12, 12]);

  const depthMidX = useTransform(mouseX || { get: () => 0 } as any, [-1, 1], [22, -22]);
  const depthMidY = useTransform(mouseY || { get: () => 0 } as any, [-1, 1], [18, -18]);

  const depthNearX = useTransform(mouseX || { get: () => 0 } as any, [-1, 1], [38, -38]);
  const depthNearY = useTransform(mouseY || { get: () => 0 } as any, [-1, 1], [30, -30]);

  return (
    <div
      className={`pointer-events-none relative select-none overflow-hidden [perspective:1200px] ${className}`}
      aria-hidden="true"
    >
      {/* 1. Deep Atmospheric Light Field (Radial Electric Blue & Bright Cyan Bloom) */}
      <motion.div
        style={reduce ? undefined : { x: depthFarX, y: depthFarY }}
        className="absolute -right-12 -top-16 h-[340px] w-[340px] sm:h-[480px] sm:w-[480px] lg:h-[560px] lg:w-[560px] rounded-full bg-gradient-to-br from-[#2563EB]/28 via-[#38BDF8]/18 to-transparent blur-[90px] sm:blur-[120px]"
      />
      <div className="absolute right-24 bottom-4 h-48 w-48 rounded-full bg-[#2563EB]/20 blur-[80px]" />

      {/* 2. Faint Architectural Typographic Watermark Texture */}
      <div className="absolute -right-8 bottom-6 z-0 hidden lg:block opacity-[0.035] select-none">
        <span className="font-display text-[7.5rem] font-bold tracking-[0.22em] text-white whitespace-nowrap">
          SIGNAL
        </span>
      </div>

      {/* 3. Luminous Signal Wavefronts & Flowing Ribbons SVG */}
      <motion.svg
        viewBox="0 0 600 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={reduce ? undefined : { x: depthMidX, y: depthMidY }}
        className="absolute inset-0 h-full w-full will-change-transform z-[1]"
      >
        <defs>
          {/* Linear Gradients for Flowing Ribbons */}
          <linearGradient id="signalRibbon1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2563EB" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#38BDF8" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#C4B5FD" stopOpacity="0.3" />
          </linearGradient>

          <linearGradient id="signalRibbon2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.85" />
            <stop offset="60%" stopColor="#2563EB" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#111827" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="signalMetallic" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.6" />
            <stop offset="40%" stopColor="#F8FAFC" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.1" />
          </linearGradient>

          {/* Radial Core Glow */}
          <radialGradient id="signalCore" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="35%" stopColor="#38BDF8" stopOpacity="0.8" />
            <stop offset="70%" stopColor="#2563EB" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#0C0D12" stopOpacity="0" />
          </radialGradient>

          {/* Glass Specular Filter */}
          <filter id="glassGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Concentric Signal Wavefront Arcs (Transmitting from Focal Core) */}
        <g opacity="0.45" stroke="#2563EB" strokeWidth="1.2">
          {/* Wave 1 */}
          <ellipse
            cx="440"
            cy="240"
            rx="110"
            ry="90"
            strokeDasharray="4 8"
            className={reduce ? '' : 'animate-[spin_90s_linear_infinite]'}
            style={{ transformOrigin: '440px 240px' }}
          />
          {/* Wave 2 */}
          <ellipse
            cx="440"
            cy="240"
            rx="170"
            ry="140"
            strokeDasharray="6 14"
            opacity="0.6"
            className={reduce ? '' : 'animate-[spin_120s_linear_infinite_reverse]'}
            style={{ transformOrigin: '440px 240px' }}
          />
          {/* Wave 3 Outer Resonant Field */}
          <ellipse
            cx="440"
            cy="240"
            rx="230"
            ry="190"
            strokeDasharray="3 18"
            opacity="0.3"
          />
        </g>

        {/* Dynamic Curved Flowing Ribbons */}
        {/* Ribbon Alpha */}
        <path
          d="M 280 380 C 340 330, 390 170, 490 140 C 540 120, 580 180, 570 260"
          stroke="url(#signalRibbon1)"
          strokeWidth="2.5"
          strokeLinecap="round"
          filter="url(#glassGlow)"
        />

        {/* Ribbon Beta */}
        <path
          d="M 310 180 C 370 210, 420 340, 520 330 C 570 325, 600 280, 590 220"
          stroke="url(#signalRibbon2)"
          strokeWidth="2"
          strokeDasharray="12 16"
          strokeLinecap="round"
          opacity="0.8"
        />

        {/* Ribbon Gamma: Fine high-specular metallic filament */}
        <path
          d="M 360 270 C 410 230, 460 210, 530 235"
          stroke="url(#signalMetallic)"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.7"
        />

        {/* Central Luminous Signal Node / Emitter */}
        <circle cx="440" cy="240" r="32" fill="url(#signalCore)" />
        <circle cx="440" cy="240" r="8" fill="#FFFFFF" />
        <circle
          cx="440"
          cy="240"
          r="14"
          stroke="#38BDF8"
          strokeWidth="2"
          opacity="0.8"
          className={reduce ? '' : 'animate-ping'}
          style={{ animationDuration: '3.2s' }}
        />

        {/* Ambient Signal Satellites (Curated Micro-Stars) */}
        <circle cx="370" cy="190" r="2.5" fill="#38BDF8" opacity="0.9" />
        <circle cx="510" cy="160" r="3" fill="#2563EB" opacity="0.85" />
        <circle cx="490" cy="320" r="2" fill="#F8FAFC" opacity="0.75" />
        <circle cx="330" cy="310" r="2" fill="#C4B5FD" opacity="0.6" />
      </motion.svg>

      {/* 4. Translucent 3D Glass Forms (Layered Refractive Blades) */}
      <motion.div
        style={reduce ? undefined : { x: depthNearX, y: depthNearY }}
        className="absolute inset-0 z-[2] flex items-center justify-end pr-6 sm:pr-12 lg:pr-20 will-change-transform pointer-events-none"
      >
        <div className="relative h-[220px] w-[220px] sm:h-[300px] sm:w-[300px] lg:h-[360px] lg:w-[360px] [transform-style:preserve-3d]">
          {/* Glass Form A: Primary Angled Refractive Shield */}
          <div
            className="absolute inset-0 rounded-[2rem] border border-white/20 bg-gradient-to-br from-white/12 via-white/[0.04] to-transparent backdrop-blur-md shadow-[0_12px_40px_rgba(37,99,235,0.25),inset_0_1px_1px_0_rgba(255,255,255,0.35)]"
            style={{
              transform: reduce
                ? 'none'
                : 'rotateX(14deg) rotateY(-22deg) rotateZ(8deg) translateZ(30px)',
              transformOrigin: 'center center',
            }}
          >
            {/* Top specular highlight sheen */}
            <div className="absolute top-0 left-0 right-0 h-1/2 rounded-t-[2rem] bg-gradient-to-b from-white/20 to-transparent pointer-events-none opacity-60" />
            {/* Ambient blue rim light */}
            <div className="absolute inset-0 rounded-[2rem] border border-[#2563EB]/40 pointer-events-none" />
          </div>

          {/* Glass Form B: Secondary Offset Floating Lens (Cyan/Blue Tint) */}
          <div
            className="absolute -top-4 -right-4 h-[75%] w-[75%] rounded-[1.75rem] border border-[#38BDF8]/30 bg-gradient-to-tl from-[#38BDF8]/15 via-white/[0.03] to-[#2563EB]/15 backdrop-blur-lg shadow-[0_8px_30px_rgba(56,189,248,0.25)]"
            style={{
              transform: reduce
                ? 'none'
                : 'rotateX(-10deg) rotateY(18deg) rotateZ(-12deg) translateZ(60px)',
              transformOrigin: 'center center',
            }}
          >
            <div className="absolute inset-0 rounded-[1.75rem] bg-[radial-gradient(ellipse_at_30%_30%,rgba(56,189,248,0.25),transparent_70%)]" />
          </div>

          {/* Glass Form C: Small Metallic Accent Blade */}
          <div
            className="absolute -bottom-6 left-6 h-[45%] w-[45%] rounded-2xl border border-white/25 bg-gradient-to-br from-white/20 via-white/5 to-transparent backdrop-blur-md shadow-lg"
            style={{
              transform: reduce
                ? 'none'
                : 'rotateX(20deg) rotateY(-8deg) rotateZ(16deg) translateZ(85px)',
              transformOrigin: 'center center',
            }}
          >
            <div className="absolute top-2 left-2 h-1.5 w-1.5 rounded-full bg-[#FFFFFF] shadow-[0_0_8px_#FFFFFF]" />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default VyralSignalVisual;
