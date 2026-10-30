import React, { useRef } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import { useMediaQuery } from '../../lib/motion.ts';

/**
 * Subtle 3D tilt that follows the pointer (max 4 degrees). Only for image-led cards, and only on devices that have a
 * real hover pointer; touch screens and reduced-motion users get a plain card.
 */
export const TiltCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  /** class for the moving inner layer, e.g. `h-full` for stretched cards */
  innerClassName?: string;
  /** max tilt in degrees */
  max?: number;
}> = ({ children, className, innerClassName, max = 4 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const canHover = useMediaQuery('(hover: hover) and (pointer: fine)');
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-max, max]), { stiffness: 200, damping: 22 });
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [max, -max]), { stiffness: 200, damping: 22 });

  if (reduce || !canHover)
    return (
      <div className={className}>
        <div className={innerClassName}>{children}</div>
      </div>
    );

  return (
    <div className={className} style={{ perspective: 1000 }}>
      <motion.div
        ref={ref}
        className={innerClassName}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        onPointerMove={(e) => {
          const box = ref.current?.getBoundingClientRect();
          if (!box) return;
          x.set((e.clientX - box.left) / box.width - 0.5);
          y.set((e.clientY - box.top) / box.height - 0.5);
        }}
        onPointerLeave={() => {
          x.set(0);
          y.set(0);
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};
