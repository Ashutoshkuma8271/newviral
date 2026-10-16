import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { useRamp } from '../lib/motion.ts';

const LETTERS = [...'Viral', ' ', ...'Bee'];

const Letter: React.FC<{ char: string; index: number; progress: MotionValue<number>; gold: boolean }> = ({
  char,
  index,
  progress,
  gold,
}) => {
  // Each letter starts a little later than the one before, so the word rises like a wave
  const start = index * 0.045;
  const rise = useRamp(progress, [start, start + 0.55], [105, 0]);
  const y = useTransform(rise, (v) => `${v}%`);
  return (
    <span className="inline-block overflow-hidden pb-[0.04em] align-bottom">
      <motion.span style={{ y }} className={`inline-block ${gold ? 'text-gold' : 'text-white'}`}>
        {char === ' ' ? ' ' : char}
      </motion.span>
    </span>
  );
};

/**
 * Footer sign-off: the brand name set edge to edge. As the footer scrolls into view the letters rise out of a mask
 * one after another. Decorative (the logo and copyright already name the brand), so hidden from screen readers.
 */
export const FooterWordmark: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] });

  return (
    <div ref={ref} className="shell relative select-none pt-4" aria-hidden="true">
      <p className="whitespace-nowrap text-center font-display text-[18.5vw] font-semibold leading-[0.82] tracking-[-0.04em] 2xl:text-[16.5vw] min-[1720px]:text-[300px]">
        {reduce
          ? LETTERS.map((c, i) => (
              <span key={i} className={i > 5 ? 'text-gold' : 'text-white'}>
                {c === ' ' ? ' ' : c}
              </span>
            ))
          : LETTERS.map((c, i) => <Letter key={i} char={c} index={i} progress={scrollYProgress} gold={i > 5} />)}
      </p>
    </div>
  );
};
