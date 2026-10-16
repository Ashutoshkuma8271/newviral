import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, type MotionValue } from 'framer-motion';
import { BRAND } from '../constants/content.ts';
import { useMediaQuery, useRamp } from '../lib/motion.ts';

/** One word of the read-along line: dim until the scroll reaches it, then fully lit */
const Word: React.FC<{ word: string; progress: MotionValue<number>; range: [number, number] }> = ({ word, progress, range }) => {
  // Dim, not invisible: even the unread words keep enough contrast to read
  const opacity = useRamp(progress, range, [0.4, 1]);
  return (
    <motion.span style={{ opacity }} className="inline">
      {word}{' '}
    </motion.span>
  );
};

/**
 * Statement scene: a pinned, dark full-screen moment. The positioning line grows into place, then the agency
 * description lights up word by word as you scroll (read-along), and the tagline arrives last.
 * Reduced motion: shown fully, no pinning.
 */
export const StatementScene: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const phone = useMediaQuery('(max-width: 767px)');
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });

  const headScale = useRamp(scrollYProgress, [0, 0.3], [0.82, 1]);
  const headOpacity = useRamp(scrollYProgress, [0, 0.18], [0.5, 1]);
  const underline = useRamp(scrollYProgress, [0.12, 0.35], [0, 1]);
  const taglineOpacity = useRamp(scrollYProgress, [0.82, 0.95], [0, 1]);
  const taglineY = useRamp(scrollYProgress, [0.82, 0.95], [16, 0]);

  const words = BRAND.subheadline.split(' ');
  const start = 0.3;
  const end = 0.85;
  const step = (end - start) / words.length;

  const [head, ...restHead] = BRAND.positioning.replace(/\.$/, '').split(' ');

  if (reduce) {
    return (
      <section aria-label="What we do" className="bg-ink py-24 text-white sm:py-32">
        <div className="shell max-w-5xl text-center">
          <h2 className="font-display text-[clamp(2.6rem,7vw,7rem)] font-semibold leading-[0.95]">{BRAND.positioning}</h2>
          <p className="mx-auto mt-10 max-w-3xl text-balance text-2xl leading-snug text-white/85">{BRAND.subheadline}</p>
          <p className="mt-10 text-sm font-semibold uppercase tracking-[0.35em] text-gold">{BRAND.tagline}</p>
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} aria-label="What we do" className={`relative bg-ink text-white ${phone ? 'h-[170svh]' : 'h-[210svh]'}`}>
      <div className="sticky top-0 flex h-svh items-center overflow-hidden">
        <div className="shell relative w-full max-w-6xl text-center">
          <motion.h2
            style={{ scale: headScale, opacity: headOpacity }}
            className="font-display text-[clamp(2.6rem,8vw,8.5rem)] font-semibold leading-[0.95] tracking-tight"
          >
            {head}{' '}
            {restHead.slice(0, -1).join(' ')}{' '}
            <span className="relative inline-block whitespace-nowrap text-gold">
              {restHead[restHead.length - 1]}.
              <motion.span
                style={{ scaleX: underline }}
                className="absolute -bottom-1 left-0 h-[0.06em] w-full origin-left rounded-full bg-gold"
                aria-hidden="true"
              />
            </span>
          </motion.h2>

          {/* Read-along: screen readers get the sentence once, plainly */}
          <p className="sr-only">{BRAND.subheadline}</p>
          <p
            className="mx-auto mt-10 max-w-4xl text-balance font-display text-[clamp(1.35rem,2.6vw,2.4rem)] font-medium leading-snug sm:mt-14"
            aria-hidden="true"
          >
            {words.map((w, i) => (
              <Word key={i} word={w} progress={scrollYProgress} range={[start + i * step, start + (i + 1) * step]} />
            ))}
          </p>

          <motion.p
            style={{ opacity: taglineOpacity, y: taglineY }}
            className="mt-10 text-sm font-semibold uppercase tracking-[0.35em] text-gold sm:mt-14"
          >
            {BRAND.tagline}
          </motion.p>
        </div>
      </div>
    </section>
  );
};
