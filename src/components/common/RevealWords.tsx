import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { EASE, VIEWPORT } from '../../lib/motion.ts';

interface RevealWordsProps {
  text: string;
  className?: string;
  delay?: number;
  /**
   * One phrase of `text` to set as the gold accent (Fraunces italic). Use at most one per heading. On dark
   * backgrounds it also gets a soft gold glow; on light backgrounds it uses the darker gold for contrast.
   */
  accent?: string;
  tone?: 'dark' | 'light';
}

/** Which words (by index) belong to the accent phrase */
function accentRange(words: string[], accent?: string): [number, number] {
  if (!accent) return [-1, -1];
  const target = accent.split(' ');
  for (let i = 0; i <= words.length - target.length; i++) {
    if (target.every((w, k) => words[i + k] === w)) return [i, i + target.length];
  }
  return [-1, -1];
}

/**
 * Headline entrance: each word rises from behind a mask, one after another (0.85s, stagger 0.05s, once per view).
 * Screen readers get the plain sentence. Reduced motion: the same text, shown at once.
 */
export const RevealWords: React.FC<RevealWordsProps> = ({ text, className, delay = 0, accent, tone = 'dark' }) => {
  const reduce = useReducedMotion();
  const words = text.split(' ');
  const [a0, a1] = accentRange(words, accent);
  const accentClass = `font-editorial font-normal italic text-[1.12em] tracking-normal text-shimmer-pure drop-shadow-[0_2px_24px_rgba(245,158,11,0.45)]`;

  if (reduce) {
    return (
      <span className={className}>
        {words.map((word, i) => (
          <span key={i} className={i >= a0 && i < a1 ? accentClass : undefined}>
            {word}
            {i < words.length - 1 ? ' ' : ''}
          </span>
        ))}
      </span>
    );
  }

  return (
    <motion.span
      className={className}
      initial="hide"
      whileInView="show"
      viewport={VIEWPORT}
      transition={{ staggerChildren: 0.05, delayChildren: delay }}
    >
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, i) => (
          <span key={i} className="-mb-[0.14em] inline-block overflow-hidden pb-[0.14em] align-bottom">
            <motion.span
              className={`inline-block ${i >= a0 && i < a1 ? accentClass : ''}`}
              variants={{ hide: { y: '110%' }, show: { y: '0%', transition: { duration: 0.85, ease: EASE } } }}
            >
              {word}
              {/* non-breaking space: a normal one is dropped at the edge of each inline-block word */}
              {i < words.length - 1 ? ' ' : ''}
            </motion.span>
          </span>
        ))}
      </span>
    </motion.span>
  );
};
