import React from 'react';

/**
 * A soft streak of light that crosses a card when it is hovered. Place inside a `relative` element that is (or sits
 * inside) a Tailwind `group`. Hover-only, so it never appears on touch screens; hidden for reduced motion.
 * Animates transform and opacity only.
 */
export const Shine: React.FC<{ className?: string }> = ({ className = '' }) => (
  <span
    aria-hidden="true"
    className={`pointer-events-none absolute inset-0 z-[2] overflow-hidden rounded-[inherit] motion-reduce:hidden ${className}`}
  >
    <span className="absolute inset-y-0 -left-[60%] w-[45%] -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-[transform,opacity] duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-[380%] group-hover:opacity-100" />
  </span>
);
