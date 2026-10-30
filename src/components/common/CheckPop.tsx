import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { VIEWPORT } from '../../lib/motion.ts';

/**
 * Wraps a checkmark so it pops in (scale 0 → 1 with a small overshoot) when its list scrolls into view, each one
 * a little after the one above (`index` × 0.06s, capped). Reduced motion: shown as is.
 */
export const CheckPop: React.FC<{ index: number; className?: string; children: React.ReactNode }> = ({
  index,
  className = '',
  children,
}) => {
  const reduce = useReducedMotion();
  if (reduce) return <span className={`inline-flex ${className}`}>{children}</span>;
  return (
    <motion.span
      className={`inline-flex ${className}`}
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={VIEWPORT}
      transition={{ type: 'spring', stiffness: 420, damping: 16, delay: 0.25 + Math.min(index * 0.06, 0.5) }}
    >
      {children}
    </motion.span>
  );
};
