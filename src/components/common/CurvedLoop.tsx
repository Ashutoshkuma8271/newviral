import React, { useId, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { gsap, ScrollTrigger, useGSAP } from '../../lib/gsap.ts';

interface CurvedLoopProps {
  /** Editorial text phrase repeated along the curve */
  text?: string;
  /** Speed / duration of complete loop in seconds */
  duration?: number;
  /** Custom wrapper styling */
  className?: string;
  /** Primary text accent color */
  accentColor?: string;
}

/**
 * CurvedLoop: Fluid Curved Text Wave Animation
 * Inspired by React Bits Curved Loop & editorial typography ribbons.
 *
 * Renders editorial phrases traveling along a subtle, elegant organic Bezier wave,
 * accelerating smoothly on user scroll via GSAP ScrollTrigger synchronization.
 */
export const CurvedLoop: React.FC<CurvedLoopProps> = ({
  text = '// LESS AGENCY FRICTION // MORE REVENUE // 100% BESPOKE CREATIVE // HIGH-CONVERTING WEBSITES // VERIFIED ROAS ',
  duration = 26,
  className = '',
  accentColor = '#8B5CF6',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textPathRef = useRef<SVGTextPathElement>(null);
  const rawId = useId();
  const pathId = `curved-loop-path-${rawId.replace(/[^a-zA-Z0-9_-]/g, '')}`;
  const reduce = useReducedMotion();

  // Repeating text string to fill the wide SVG curve continuously
  const repeatedText = `${text.trim()} ${text.trim()} ${text.trim()} `;

  // GSAP ScrollTrigger velocity booster
  useGSAP(
    () => {
      const container = containerRef.current;
      const textPath = textPathRef.current;
      if (!container || !textPath || reduce) return;

      ScrollTrigger.create({
        trigger: container,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          // Subtle nudge based on scroll velocity
          const velocity = self.getVelocity() / 3000;
          if (Math.abs(velocity) > 0.05) {
            gsap.to(textPath, {
              attr: { startOffset: `+=${velocity * 30}` },
              duration: 0.4,
              ease: 'power1.out',
              overwrite: 'auto',
            });
          }
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden py-4 select-none pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1600 120"
        className="h-20 sm:h-24 md:h-28 w-full overflow-visible"
        preserveAspectRatio="none"
      >
        <defs>
          {/* Smooth, subtle sine wave path across the viewport */}
          <path
            id={pathId}
            d="M -200,60 Q 200,10 600,60 T 1400,60 T 2200,60"
            fill="none"
          />
        </defs>

        <text className="font-display text-sm sm:text-base md:text-lg font-bold tracking-[0.2em] uppercase fill-[#F8F6FF]/70">
          <textPath
            ref={textPathRef}
            href={`#${pathId}`}
            startOffset="0%"
            className="transition-all"
          >
            {repeatedText}
            {/* Animated continuous loop offset */}
            {!reduce && (
              <animate
                attributeName="startOffset"
                from="0%"
                to="-100%"
                dur={`${duration}s`}
                repeatCount="indefinite"
              />
            )}
          </textPath>
        </text>
      </svg>

      {/* Subtle Ambient Light Wash */}
      <div
        className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 h-10 bg-gradient-to-r from-transparent via-[#8B5CF6]/10 to-transparent blur-xl"
        aria-hidden="true"
      />
    </div>
  );
};

export default CurvedLoop;
