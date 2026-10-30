import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { useMediaQuery } from '../../lib/motion.ts';

const INTERACTIVE = 'a, button, [role="button"], input, select, textarea, label, summary';

/**
 * Soft amber glow that trails the mouse and swells over links and buttons. The normal cursor stays visible (so text
 * selection and precision are unaffected); this is a decorative layer only. Mouse devices only — never on touch
 * screens — and off for reduced motion.
 */
export const GlowCursor: React.FC = () => {
  const reduce = useReducedMotion();
  const finePointer = useMediaQuery('(hover: hover) and (pointer: fine)');
  const enabled = finePointer && !reduce;

  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const sx = useSpring(x, { stiffness: 380, damping: 32, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 380, damping: 32, mass: 0.4 });
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    const move = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      setHovering(!!(e.target as Element | null)?.closest?.(INTERACTIVE));
    };
    const leave = () => setVisible(false);
    window.addEventListener('pointermove', move, { passive: true });
    document.documentElement.addEventListener('mouseleave', leave);
    return () => {
      window.removeEventListener('pointermove', move);
      document.documentElement.removeEventListener('mouseleave', leave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[70]"
      style={{ x: sx, y: sy }}
      aria-hidden="true"
    >
      <motion.div
        animate={{ scale: hovering ? 2.1 : 1, opacity: visible ? 1 : 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 24 }}
        className="-ml-5 -mt-5 h-10 w-10 rounded-full border border-accent/50 bg-[radial-gradient(circle,rgba(56, 189, 248,0.28)_0%,rgba(37, 99, 235,0.15)_45%,transparent_70%)]"
      />
    </motion.div>
  );
};
