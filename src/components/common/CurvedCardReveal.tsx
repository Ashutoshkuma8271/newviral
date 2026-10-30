import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

interface CurvedCardRevealProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  shape?: 'circular' | 'ellipse' | 'convex';
}

/**
 * CurvedCardReveal: Signature Circular / Curved Aperture Reveal
 *
 * As the card enters the viewport:
 * 1. Begins within a curved, organic circular/elliptical aperture mask with a luminous rim.
 * 2. As the visitor scrolls forward, the curved boundary smoothly expands from a focused
 *    lens (45%) into the full card surface (140%), revealing the visual and content.
 * 3. Settles into a stable, crisp rounded-3xl container.
 * 4. Reverses naturally and smoothly on upward scroll without layout shift.
 */
export const CurvedCardReveal: React.FC<CurvedCardRevealProps> = ({
  children,
  className = '',
  glowColor = 'rgba(139, 92, 246, 0.45)',
  shape = 'circular',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'center center'],
  });

  // Calculate dynamic circular clip-path expansion
  const radius = useTransform(scrollYProgress, [0, 0.85], [38, 140]);
  const clipPath = useTransform(
    radius,
    (r) =>
      shape === 'ellipse'
        ? `ellipse(${r}% ${r * 0.85}% at 50% 50%)`
        : `circle(${r}% at 50% 50%)`
  );

  // Border glow opacity linked to reveal phase
  const rimOpacity = useTransform(scrollYProgress, [0, 0.3, 0.85, 1], [0.8, 1, 0.4, 0]);

  if (reduce) {
    return <div className={`relative overflow-hidden rounded-3xl ${className}`}>{children}</div>;
  }

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      {/* Dynamic Curved Masked Surface */}
      <motion.div
        style={{ clipPath }}
        className="relative h-full w-full will-change-[clip-path] rounded-3xl overflow-hidden"
      >
        {children}
      </motion.div>

      {/* Luminous Curved Rim Glare Tracing the Aperture Boundary */}
      <motion.div
        style={{
          opacity: rimOpacity,
          boxShadow: `inset 0 0 40px ${glowColor}`,
        }}
        className="pointer-events-none absolute inset-0 rounded-3xl border border-primary/40"
        aria-hidden="true"
      />
    </div>
  );
};

export default CurvedCardReveal;
