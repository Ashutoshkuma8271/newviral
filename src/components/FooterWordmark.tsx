import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';

/**
 * 6 Signature Multicolor Agency Themes:
 * Cycles at regular intervals in a cinematic, dimensional 3D graphics presentation:
 * 1. Electric Blue & Bright Cyan (Flagship Tech)
 * 2. Signature Violet & Soft Pink (Creative Viral)
 * 3. Emerald Green & Champagne Gold (Executive Prestige)
 * 4. Burnt Orange & Warm Gold (High-Energy Impact)
 * 5. Ice Blue & Pure Platinum (Luxury Precision)
 * 6. Deep Indigo & Cyan Aurora (Cinematic Deep-Space)
 */
const COLOR_INTERVAL_THEMES = [
  {
    name: 'electric-blue',
    vyralGradient: 'linear-gradient(90deg, #F8FAFC 0%, #FFFFFF 25%, #E0F2FE 50%, #BAE6FD 75%, #F8FAFC 100%)',
    beeGradient: 'linear-gradient(90deg, #2563EB 0%, #1D4ED8 25%, #38BDF8 50%, #C4B5FD 75%, #2563EB 100%)',
    glow: 'rgba(37, 99, 235, 0.45)',
    accentDot: '#38BDF8',
    label: 'TECH ARCHITECTURE',
  },
  {
    name: 'cosmic-violet',
    vyralGradient: 'linear-gradient(90deg, #FFFFFF 0%, #F5F3FF 30%, #E9D5FF 55%, #DDD6FE 80%, #FFFFFF 100%)',
    beeGradient: 'linear-gradient(90deg, #7C3AED 0%, #A855F7 25%, #F472B6 55%, #EC4899 75%, #7C3AED 100%)',
    glow: 'rgba(124, 58, 237, 0.45)',
    accentDot: '#F472B6',
    label: 'VIRAL & MOTION',
  },
  {
    name: 'emerald-gold',
    vyralGradient: 'linear-gradient(90deg, #F5F5F0 0%, #FFFFFF 25%, #ECFDF5 50%, #D1FAE5 75%, #F5F5F0 100%)',
    beeGradient: 'linear-gradient(90deg, #059669 0%, #10B981 30%, #D4AF37 60%, #F59E0B 80%, #059669 100%)',
    glow: 'rgba(16, 185, 129, 0.4)',
    accentDot: '#D4AF37',
    label: 'EXECUTIVE REVENUE',
  },
  {
    name: 'burnt-orange',
    vyralGradient: 'linear-gradient(90deg, #FFF9F0 0%, #FFFFFF 25%, #FFEDD5 50%, #FED7AA 75%, #FFF9F0 100%)',
    beeGradient: 'linear-gradient(90deg, #F05A28 0%, #EA580C 28%, #FF8C38 55%, #FFB36B 78%, #F05A28 100%)',
    glow: 'rgba(240, 90, 40, 0.45)',
    accentDot: '#FF8C38',
    label: 'CONVERSION VELOCITY',
  },
  {
    name: 'aurora-cyan',
    vyralGradient: 'linear-gradient(90deg, #F0FDF4 0%, #FFFFFF 25%, #CFFAFE 50%, #A5F3FC 75%, #F0FDF4 100%)',
    beeGradient: 'linear-gradient(90deg, #06B6D4 0%, #0891B2 25%, #38BDF8 50%, #818CF8 75%, #06B6D4 100%)',
    glow: 'rgba(6, 182, 212, 0.45)',
    accentDot: '#38BDF8',
    label: 'IMMERSIVE DIGITAL',
  },
];

/**
 * FooterWordmark: "Vyral Bee" 3D Cinematic Digital-Agency Signature.
 * - Periodic interval-based color morphing (cycles every 5 seconds seamlessly).
 * - Interactive 3D Perspective Tilt on pointer move with spring physics.
 * - 3D Multilayer shadow & depth extrusion.
 * - Reduced motion support with stable fallback.
 */
export const FooterWordmark: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Current color theme index (cycles every 5 seconds)
  const [themeIdx, setThemeIdx] = useState(0);

  useEffect(() => {
    if (shouldReduceMotion) return;
    const interval = setInterval(() => {
      setThemeIdx((prev) => (prev + 1) % COLOR_INTERVAL_THEMES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [shouldReduceMotion]);

  const currentTheme = COLOR_INTERVAL_THEMES[themeIdx];

  // 3D Perspective Physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 120, damping: 20, mass: 0.6 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-8, 8]);
  const translateZ = useTransform(smoothY, [-0.5, 0.5], [18, -18]);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (shouldReduceMotion || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    },
    [shouldReduceMotion, mouseX, mouseY]
  );

  const handlePointerLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="shell relative select-none overflow-hidden pt-4 pb-6 sm:pt-6 sm:pb-8 [perspective:1400px]"
      aria-hidden="true"
    >
      <style>{`
        .wordmark-3d-text {
          transform-style: preserve-3d;
          transition: filter 1.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .footer-wordmark-vyral {
          display: inline-block;
          color: #F8FAFC;
          background-size: 260% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: wordmarkBidirectionalSweep 16s ease-in-out infinite alternate;
          transition: background-image 1.2s ease-in-out;
        }

        .footer-wordmark-bee {
          display: inline-block;
          color: #2563EB;
          background-size: 260% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: wordmarkBidirectionalSweep 16s ease-in-out infinite alternate;
          transition: background-image 1.2s ease-in-out;
        }

        @keyframes wordmarkBidirectionalSweep {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 100% 50%;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .footer-wordmark-vyral,
          .footer-wordmark-bee {
            animation: none !important;
            background-image: none !important;
            -webkit-text-fill-color: currentColor !important;
          }
        }
      `}</style>

      {/* 3D Stage with Tilt & Atmospheric Lighting */}
      <motion.div
        style={{
          rotateX: shouldReduceMotion ? 0 : rotateX,
          rotateY: shouldReduceMotion ? 0 : rotateY,
          transformStyle: 'preserve-3d',
        }}
        initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="w-full text-center relative will-change-transform"
      >
        {/* Dynamic Theme Telemetry Badge */}
        <div className="mb-3 flex items-center justify-center gap-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#0C0D12]/90 px-3 py-1 backdrop-blur-md transition-all duration-700">
            <span
              className="h-1.5 w-1.5 rounded-full transition-colors duration-700"
              style={{
                backgroundColor: currentTheme.accentDot,
                boxShadow: `0 0 10px ${currentTheme.accentDot}`,
              }}
            />
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-[#94A3B8]">
              {currentTheme.label}
            </span>
          </div>
        </div>

        {/* 3D Depth Extruded Wordmark */}
        <motion.p
          style={{
            z: shouldReduceMotion ? 0 : translateZ,
          }}
          className="wordmark-3d-text whitespace-nowrap text-center font-display text-[17.8vw] font-bold leading-[0.82] tracking-[-0.04em] 2xl:text-[16vw] min-[1720px]:text-[280px]"
        >
          <span
            className="footer-wordmark-vyral"
            style={{
              backgroundImage: currentTheme.vyralGradient,
              filter: `drop-shadow(0 4px 20px ${currentTheme.glow})`,
            }}
          >
            Vyral
          </span>
          <span className="inline-block">&nbsp;</span>
          <span
            className="footer-wordmark-bee"
            style={{
              backgroundImage: currentTheme.beeGradient,
              filter: `drop-shadow(0 6px 32px ${currentTheme.glow})`,
            }}
          >
            Bee
          </span>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default FooterWordmark;


