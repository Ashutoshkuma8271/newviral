import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { BRAND } from '../constants/content.ts';
import { useMediaQuery, useRamp } from '../lib/motion.ts';

/**
 * Read-along word that illuminates from readable silver to radiant pure white
 * with a vibrant Honey Amber halo & core bloom as user scrolls down, and dims on scroll up.
 */
const Word: React.FC<{
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
}> = ({ word, progress, range }) => {
  // Smooth normalized ramp for this word's scroll trigger slice
  const t = useRamp(progress, range, [0, 1]);

  // Opacity: starts at a clean readable 0.35, rises to 1.0 when active
  const opacity = useRamp(progress, range, [0.35, 1]);

  // Color: smoothly transitions from silver (#94A3B8) to pure white (#FFFFFF)
  const color = useTransform(t, [0, 1], ['#94A3B8', '#FFFFFF']);

  // Dynamic radiant Honey Amber & White glow bloom
  const textShadow = useTransform(t, (v) => {
    if (v <= 0.05) return 'none';
    const amberSpread = (v * 24).toFixed(1);
    const whiteCore = (v * 8).toFixed(1);
    const alpha = (v * 0.9).toFixed(2);
    return `0 0 ${amberSpread}px rgba(245, 158, 11, ${alpha}), 0 0 ${whiteCore}px rgba(255, 255, 255, ${v.toFixed(2)})`;
  });

  // Subtle physical scale lift when illuminated
  const scale = useTransform(t, [0, 0.5, 1], [1, 1.05, 1]);

  return (
    <motion.span
      style={{
        opacity,
        color,
        textShadow,
        scale,
      }}
      className="inline-block origin-bottom will-change-[opacity,transform]"
    >
      {word}
      <span className="inline-block">&nbsp;</span>
    </motion.span>
  );
};

interface FloatingPill {
  text: string;
  left: string;
  top: string;
  moveX: number;
  moveY: number;
  rotate: number;
  theme: 'palette-1' | 'palette-2' | 'palette-3' | 'palette-4' | 'palette-5' | 'palette-6';
}

const PILLS: FloatingPill[] = [
  { text: '4.8x Meta ROAS', left: '12%', top: '18%', moveX: -34, moveY: -26, rotate: -10, theme: 'palette-5' },
  { text: 'Viral Reels & Shorts', left: '84%', top: '20%', moveX: 36, moveY: -28, rotate: 12, theme: 'palette-3' },
  { text: 'Creative Direction', left: '8%', top: '46%', moveX: -40, moveY: 6, rotate: -8, theme: 'palette-4' },
  { text: '20M+ Organic Views', left: '88%', top: '44%', moveX: 38, moveY: 10, rotate: 14, theme: 'palette-1' },
  { text: 'High-Converting Web', left: '16%', top: '78%', moveX: -30, moveY: 30, rotate: -12, theme: 'palette-6' },
  { text: 'Enterprise Growth', left: '80%', top: '78%', moveX: 32, moveY: 32, rotate: 10, theme: 'palette-2' },
  { text: 'Thumb-Stopping Hooks', left: '30%', top: '14%', moveX: -14, moveY: -36, rotate: 6, theme: 'palette-3' },
  { text: 'Retention Funnels', left: '68%', top: '15%', moveX: 18, moveY: -34, rotate: -8, theme: 'palette-5' },
  { text: 'Bespoke Brand Identity', left: '32%', top: '86%', moveX: -12, moveY: 34, rotate: 10, theme: 'palette-4' },
  { text: 'Zero Agency Fluff', left: '68%', top: '86%', moveX: 20, moveY: 36, rotate: -10, theme: 'palette-1' },
  { text: 'Commercial Strategy', left: '50%', top: '10%', moveX: 0, moveY: -40, rotate: 4, theme: 'palette-2' },
  { text: 'Transparent Analytics', left: '50%', top: '90%', moveX: 0, moveY: 40, rotate: -6, theme: 'palette-6' },
];

/**
 * StatementScene: Signature Cinematic Zoom & Read-Along Storytelling Experience.
 *
 * Sequence:
 * 1. Entry (Scroll 0 - 0.22): Restrained, architectural headline scale & opacity settle in.
 * 2. Word-by-Word Illumination (Scroll 0.24 - 0.82): Cursive & editorial statement illuminates word by word
 *    with radiant Honey Amber bloom on scroll down, and dims on scroll up.
 * 3. Tagline Climax (Scroll 0.82 - 0.95): The closing brand motto fades in. Fully reversible on upward scroll.
 */
export const StatementScene: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const phone = useMediaQuery('(max-width: 767px)');

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });

  // 1. Headline Scale
  const headScale = useTransform(
    scrollYProgress,
    [0, 0.22, 0.6, 0.85, 1.0],
    reduce || phone ? [1, 1, 1, 1, 1] : [0.85, 0.96, 1.04, 1.0, 0.95]
  );

  // 2. Headline Opacity & Y translation (stays visible through the entire reading phase)
  const headOpacity = useTransform(
    scrollYProgress,
    [0, 0.18, 0.92, 1.0],
    reduce || phone ? [1, 1, 1, 1] : [0.5, 1, 1, 0.75]
  );
  const headY = useTransform(
    scrollYProgress,
    [0, 0.22, 0.82, 1.0],
    reduce || phone ? [0, 0, 0, 0] : [28, 0, 0, -20]
  );

  // 3. Background Spatial Visual Canvas
  const visualScale = useTransform(
    scrollYProgress,
    [0, 0.22, 0.55, 0.8, 1.0],
    reduce || phone ? [1, 1, 1, 1, 1] : [0.65, 0.9, 1.06, 1.12, 1.2]
  );
  const visualOpacity = useTransform(
    scrollYProgress,
    [0, 0.18, 0.5, 0.85, 1.0],
    reduce || phone ? [0.4, 0.8, 0.8, 0.6, 0.4] : [0.2, 0.85, 0.95, 0.8, 0.5]
  );
  const visualZ = useTransform(
    scrollYProgress,
    [0, 0.5, 1.0],
    reduce || phone ? [0, 0, 0] : [-60, 20, -40]
  );

  // 4. Artisanal brush underline & handwriting accent reveal
  const underline = useTransform(scrollYProgress, [0.15, 0.38], [0, 1]);
  const handwritingOpacity = useTransform(scrollYProgress, [0.18, 0.40], [0, 1]);
  const handwritingY = useTransform(scrollYProgress, [0.18, 0.40], [14, 0]);

  // 5. Read-along subheadline timing (21 words, evenly distributed across the comfortable reading zone)
  const words = BRAND.subheadline.split(' ');
  const start = 0.24;
  const end = 0.82;
  const step = (end - start) / words.length;

  // 6. Dispersion progress for 3D floating tag cloud
  const pillsProgress = useTransform(scrollYProgress, [0.15, 0.85], [0, 1]);

  // 7. Closing Tagline & CTA
  const taglineOpacity = useTransform(scrollYProgress, [0.80, 0.94], [0, 1]);
  const taglineY = useTransform(scrollYProgress, [0.80, 0.94], [20, 0]);

  const [head, ...restHead] = BRAND.positioning.replace(/\.$/, '').split(' ');

  if (reduce) {
    return (
      <section id="statement" aria-label="Brand philosophy" className="bg-[#0C0D12] py-24 text-white sm:py-32">
        <div className="shell max-w-5xl text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#F59E0B]">[ 03 // MANIFESTO ]</p>
          <h2 className="font-display text-[clamp(2.4rem,6vw,6rem)] font-bold leading-[0.98] text-white">
            <span className="text-shimmer-pure">{BRAND.positioning}</span>
          </h2>
          <p className="mx-auto mt-8 max-w-3xl text-balance font-editorial text-2xl font-light italic text-[#CBD5E1]">
            {BRAND.subheadline}
          </p>
          <p className="mt-6 font-brush text-3xl font-normal text-[#FDE68A]">~ every viral moment is engineered by design.</p>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={ref}
      id="statement"
      aria-label="Brand manifesto & visual storytelling"
      className={`relative bg-[#0C0D12] text-white ${phone ? 'h-[150svh]' : 'h-[175svh]'}`}
    >
      <div className="sticky top-0 flex h-svh items-center justify-center overflow-hidden [perspective:1400px]">
        {/* Subtle architectural grid lines */}
        <div className="pointer-events-none absolute inset-0 grid grid-cols-3 z-[1] opacity-10" aria-hidden="true">
          <div className="border-r border-white/20" />
          <div className="border-r border-white/20" />
          <div />
        </div>

        {/* Spatial Atmospheric Ambient Bloom */}
        <motion.div
          style={{
            scale: visualScale,
            opacity: visualOpacity,
            z: visualZ,
          }}
          className="pointer-events-none absolute inset-0 z-[2] flex items-center justify-center will-change-transform"
          aria-hidden="true"
        >
          <div className="absolute h-[620px] w-[620px] rounded-full bg-gradient-to-tr from-[#F59E0B]/20 via-[#D97706]/10 to-transparent blur-[140px] sm:h-[800px] sm:w-[800px]" />
          <div className="absolute h-[380px] w-[380px] sm:h-[500px] sm:w-[500px] rounded-full bg-[#F59E0B]/12 blur-[90px]" />
        </motion.div>

        {/* 3D Floating Tag Cloud Dispersion Layer */}
        {!phone && (
          <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden" aria-hidden="true">
            {PILLS.map((pill, i) => {
              const xVal = useTransform(pillsProgress, (p) => `${p * pill.moveX}vw`);
              const yVal = useTransform(pillsProgress, (p) => `${p * pill.moveY}vh`);
              const scaleVal = useTransform(pillsProgress, (p) => 1 - p * 0.12);
              const opVal = useTransform(pillsProgress, [0, 0.1, 0.75, 0.95], [0.35, 0.9, 0.9, 0.15]);

              let badgeClasses = '';
              if (pill.theme === 'palette-1') {
                badgeClasses = 'bg-[#2563EB] text-[#F8FAFC] font-bold border border-[#38BDF8] shadow-[0_0_24px_rgba(37,99,235,0.45)]';
              } else if (pill.theme === 'palette-2') {
                badgeClasses = 'bg-[#0B0F0D] text-[#D4AF37] font-bold border border-[#087F5B] shadow-[0_0_24px_rgba(8,127,91,0.45)]';
              } else if (pill.theme === 'palette-3') {
                badgeClasses = 'bg-[#7C3AED] text-white font-bold border border-[#F472B6] shadow-[0_0_24px_rgba(244,114,182,0.45)]';
              } else if (pill.theme === 'palette-4') {
                badgeClasses = 'bg-[#8F233A] text-[#F4EBDD] font-bold border border-[#C8A46A] shadow-[0_0_24px_rgba(143,35,58,0.45)]';
              } else if (pill.theme === 'palette-5') {
                badgeClasses = 'bg-[#F05A28] text-[#FFF9F0] font-bold border border-[#FFB36B] shadow-[0_0_24px_rgba(240,90,40,0.50)]';
              } else if (pill.theme === 'palette-6') {
                badgeClasses = 'bg-[#14202C] text-white font-bold border border-[#22D3EE] shadow-[0_4px_16px_rgba(34,211,238,0.30)]';
              }

              return (
                <motion.div
                  key={i}
                  style={{
                    left: pill.left,
                    top: pill.top,
                    x: xVal,
                    y: yVal,
                    scale: scaleVal,
                    opacity: opVal,
                    rotate: pill.rotate,
                  }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 will-change-transform"
                >
                  <span
                    className={`inline-block rounded-full px-4 py-2 text-xs sm:text-[13px] tracking-wide whitespace-nowrap transition-transform duration-300 ${badgeClasses}`}
                  >
                    {pill.text}
                  </span>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Vertical scene progress rail */}
        <div
          className="pointer-events-none absolute left-8 top-1/2 hidden h-28 w-px -translate-y-1/2 overflow-hidden bg-white/10 lg:block"
          aria-hidden="true"
        >
          <motion.div style={{ scaleY: scrollYProgress }} className="h-full w-full origin-top bg-[#F59E0B]" />
        </div>

        {/* Top Eyebrow Cues */}
        <div className="pointer-events-none absolute top-8 sm:top-10 left-6 sm:left-12 right-6 sm:right-12 z-20 flex items-center justify-between text-[11px] font-sans font-bold tracking-[0.22em] text-white/50">
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#F59E0B] animate-pulse" />
            [ 03 // VYRAL BEE PHILOSOPHY ]
          </span>
          <span className="hidden sm:inline">DISCOVERY → CREATIVE → CONVERSION</span>
        </div>

        {/* Foreground Stage: Kinetic Zoom Typography & Read-Along Scroll Scrub */}
        <div className="shell relative z-20 w-full max-w-6xl text-center px-4">
          <motion.div
            style={{ scale: headScale, opacity: headOpacity, y: headY }}
            className="flex flex-col items-center will-change-transform"
          >
            {/* Focal Headline */}
            <h2 className="font-display text-[clamp(2.5rem,7.5vw,7.8rem)] font-semibold leading-[0.95] tracking-tight text-white drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)]">
              {head} {restHead.slice(0, -1).join(' ')}{' '}
              <span className="relative isolate inline-block whitespace-nowrap text-[#FBBF24]">
                {restHead[restHead.length - 1]}.
                {/* Curved underline brush */}
                <svg
                  viewBox="0 0 200 12"
                  preserveAspectRatio="none"
                  className="absolute left-0 -bottom-[0.16em] w-full h-[0.24em] pointer-events-none"
                  aria-hidden="true"
                >
                  <motion.path
                    d="M2 8C50 3 120 2 198 6"
                    stroke="#F59E0B"
                    strokeWidth="5"
                    strokeLinecap="round"
                    fill="none"
                    style={{ pathLength: underline }}
                  />
                </svg>
              </span>
            </h2>

            {/* Handwritten Sub-statement */}
            <motion.p
              style={{ opacity: handwritingOpacity, y: handwritingY }}
              className="mt-4 font-brush text-[#FDE68A] text-2xl sm:text-3xl lg:text-4xl -rotate-1 tracking-wide drop-shadow-[0_2px_14px_rgba(245,158,11,0.55)]"
            >
              ~ every viral moment is engineered by design.
            </motion.p>
          </motion.div>

          {/* Read-along: screen readers get the sentence once, plainly */}
          <p className="sr-only">{BRAND.subheadline}</p>
          <div
            className="mx-auto mt-8 max-w-4xl text-balance font-editorial text-[clamp(1.4rem,2.8vw,2.55rem)] font-light italic leading-[1.45] sm:mt-12 text-[#94A3B8]"
            aria-hidden="true"
          >
            {words.map((w, i) => (
              <Word key={i} word={w} progress={scrollYProgress} range={[start + i * step, start + (i + 1) * step]} />
            ))}
          </div>

          {/* Focal Climax Tagline */}
          <motion.div
            style={{ opacity: taglineOpacity, y: taglineY }}
            className="mt-8 flex flex-col items-center gap-2 sm:mt-10"
          >
            <p className="font-display text-sm sm:text-base font-bold uppercase tracking-[0.3em] text-[#F59E0B]">
              {BRAND.tagline}
            </p>
          </motion.div>
        </div>

        {/* Bottom Bar: Progress and Live Ticker */}
        <div className="pointer-events-none absolute bottom-6 sm:bottom-8 left-6 sm:left-12 right-6 sm:right-12 z-20 flex items-end justify-between">
          <span className="text-[10px] sm:text-[11px] font-sans font-bold tracking-[0.22em] text-white/40 uppercase">
            MEET · CREATE · SCALE
          </span>
          <span className="font-display font-extrabold text-white/20 text-3xl sm:text-5xl tracking-tight tabular-nums">
            003
          </span>
        </div>
      </div>
    </section>
  );
};

export default StatementScene;
