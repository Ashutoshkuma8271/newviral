import React, { useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { gsap, ScrollTrigger, useGSAP } from '../../lib/gsap.ts';
import { Spotlight } from './Spotlight.tsx';
import { useMediaQuery } from '../../lib/motion.ts';

interface CurvedHalfCircleCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  index?: number;
  /** Shape variation for the organic curved transition */
  variant?: 'arc-top' | 'arc-bottom' | 'convex-radial' | 'curved-asymmetric';
}

/**
 * CurvedHalfCircleCard: 3D Slope & Half-Circle Curve Scroll Component
 *
 * Implements:
 * 1. 3D Slope & Half-Circle Curved Scroll Trajectory:
 *    - Cards glide along an undulating 3D slope with perspective depth.
 *    - Half-circle curve trajectory sweeps from left to right as you scroll down,
 *      and reverses seamlessly from right to left as you scroll up.
 * 2. Visual Aperture Mask:
 *    - Circular / half-circle lens reveal on [data-curved-aperture]
 * 3. Parallax Image Drift:
 *    - Smooth 3D parallax on [data-parallax-img]
 * 4. Midnight Ink (#171C2B) / Graphite (#242B3A) Surfaces & Crisp Satoshi Typography.
 */
export const CurvedHalfCircleCard: React.FC<CurvedHalfCircleCardProps> = ({
  children,
  className = '',
  glowColor = 'rgba(37, 99, 235, 0.18)',
  index = 0,
  variant = 'convex-radial',
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const rimRef = useRef<HTMLDivElement>(null);

  const reduce = useReducedMotion();
  const isMobile = useMediaQuery('(max-width: 767px)');

  // GSAP ScrollTrigger: 3D Slope & Half-Circle Curve Motion
  useGSAP(
    () => {
      const card = cardRef.current;
      const shell = shellRef.current;
      const rim = rimRef.current;

      if (!card || !shell || reduce) return;

      const isEven = index % 2 === 0;

      // 1. 3D Slope & Half-Circle Curve Scroll (Left-to-Right down the slope)
      // As you scroll down: card enters tilted on the left, peaks at center, and slopes down curving to the right.
      // As you scroll up: reverses smoothly along the exact same half-circle arc.
      const startX = isMobile ? (isEven ? -16 : -8) : (isEven ? -52 : -28);
      const endX = isMobile ? (isEven ? 16 : 8) : (isEven ? 44 : 58);
      const startRotY = isMobile ? -2.5 : -5.5;
      const endRotY = isMobile ? 2.5 : 5;
      const startRotX = isMobile ? 3 : 6.5;
      const endRotX = isMobile ? -3 : -5.5;
      const startRotZ = isEven ? -1.2 : 1.2;
      const endRotZ = isEven ? 1.2 : -1.2;
      const startZ = isMobile ? -35 : -80;
      const endZ = isMobile ? -25 : -60;

      gsap.fromTo(
        shell,
        {
          x: startX,
          y: 45,
          z: startZ,
          rotateX: startRotX,
          rotateY: startRotY,
          rotateZ: startRotZ,
          transformPerspective: 1200,
          transformOrigin: '50% 50%',
        },
        {
          x: endX,
          y: -35,
          z: endZ,
          rotateX: endRotX,
          rotateY: endRotY,
          rotateZ: endRotZ,
          ease: 'power1.inOut',
          scrollTrigger: {
            trigger: card,
            start: 'top bottom+=80',
            end: 'bottom top-=80',
            scrub: 1.1,
          },
        }
      );

      // 2. Subtle border-radius morph from organic curve to clean container
      const startRadius =
        variant === 'curved-asymmetric' || index % 2 === 1
          ? isMobile
            ? '1.75rem 1rem 1.75rem 1rem'
            : '2.5rem 1.25rem 2.5rem 1.25rem'
          : isMobile
            ? '1rem 1.75rem 1rem 1.75rem'
            : '1.25rem 2.5rem 1.25rem 2.5rem';

      const finalRadius = isMobile ? '1.25rem' : '1.5rem';

      gsap.fromTo(
        shell,
        { borderRadius: startRadius },
        {
          borderRadius: finalRadius,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
            end: 'center 50%',
            scrub: 0.8,
          },
        }
      );

      // 3. Targeted Half-Circle & Curved Aperture Reveal on Visual Area
      const aperture = card.querySelector<HTMLElement>('[data-curved-aperture]');
      if (aperture) {
        const initialClip =
          variant === 'arc-top'
            ? 'ellipse(75% 55% at 50% 0%)'
            : variant === 'arc-bottom'
              ? 'ellipse(75% 55% at 50% 100%)'
              : variant === 'curved-asymmetric'
                ? 'ellipse(80% 65% at 20% 40%)'
                : 'circle(48% at 50% 50%)';

        const finalClip =
          variant === 'arc-top'
            ? 'ellipse(140% 125% at 50% 0%)'
            : variant === 'arc-bottom'
              ? 'ellipse(140% 125% at 50% 100%)'
              : variant === 'curved-asymmetric'
                ? 'ellipse(145% 125% at 50% 50%)'
                : 'circle(120% at 50% 50%)';

        gsap.fromTo(
          aperture,
          { clipPath: initialClip },
          {
            clipPath: finalClip,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              end: 'center 42%',
              scrub: 0.8,
            },
          }
        );
      }

      // 4. 3D Parallax image drift
      const parallaxImg = card.querySelector<HTMLElement>('[data-parallax-img]');
      if (parallaxImg) {
        gsap.fromTo(
          parallaxImg,
          { scale: 1.08, yPercent: -4 },
          {
            scale: 1.0,
            yPercent: 4,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      }

      // 5. Subtle top rim lighting on viewport focus
      if (rim) {
        gsap.fromTo(
          rim,
          { opacity: 0.15 },
          {
            opacity: 0.85,
            ease: 'sine.inOut',
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
              end: 'center center',
              scrub: true,
            },
          }
        );
      }
    },
    { scope: cardRef }
  );

  return (
    <motion.div
      ref={cardRef}
      whileHover={reduce ? undefined : { y: -4, transition: { duration: 0.25, ease: 'easeOut' } }}
      style={{ perspective: 1200, transformStyle: 'preserve-3d' }}
      className={`group relative overflow-visible transition-all duration-300 will-change-transform ${className}`}
    >
      {/* Outer Subtle Ambient Glow on Hover */}
      <div
        className="pointer-events-none absolute -inset-0.5 rounded-[2rem] opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-40"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${glowColor}, transparent 70%)`,
        }}
        aria-hidden="true"
      />

      {/* Main Midnight Ink Shell with 3D slope curve animation */}
      <div
        ref={shellRef}
        style={{ transformStyle: 'preserve-3d' }}
        className="relative flex h-full flex-col justify-between overflow-hidden border border-[#334155]/80 bg-[#161F36]/95 p-6 sm:p-8 transition-colors duration-300 group-hover:border-[#2563EB]/50 shadow-[0_16px_40px_rgba(11,16,32,0.6)] will-change-transform"
      >
        {/* Subtle Interactive Mouse Spotlight */}
        <Spotlight size={360} color="rgba(37, 99, 235, 0.08)" />

        {/* Card Content (Always 100% visible and unclipped) */}
        <div className="relative z-10 flex h-full flex-col justify-between">
          {children}
        </div>

        {/* Luminous Rim Arc Glare (Bright Cyan Highlight Accent) */}
        <div
          ref={rimRef}
          className="pointer-events-none absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#38BDF8]/40 to-transparent"
          aria-hidden="true"
        />
      </div>
    </motion.div>
  );
};

export default CurvedHalfCircleCard;


