import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { pageSrc, pageSrcSet, pageMobileSrcSet } from '../../lib/images.ts';
import { LazyImage } from './LazyImage.tsx';
import { PillMarquee } from './PillMarquee.tsx';
import { Reveal } from './Reveal.tsx';
import { RevealWords } from './RevealWords.tsx';

interface PageHeaderProps {
  title: React.ReactNode;
  /** One phrase of a text title to set as the gold accent */
  accent?: string;
  intro?: React.ReactNode;
  /** Header photo key: about | services | process | packages | work | contact (files in /images/pages) */
  image: string;
  /** Buttons under the intro */
  actions?: React.ReactNode;
  /** Quick-jump links shown as pills under the buttons */
  chips?: { label: string; href: string }[];
}

/** Opening block for inner pages: full-width photo with parallax, breadcrumb, headline, intro and actions. */
export const PageHeader: React.FC<PageHeaderProps> = ({ title, accent, intro, image, actions, chips }) => {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', reduceMotion ? '0%' : '18%']);
  const imageScale = useTransform(scrollYProgress, [0, 1], [reduceMotion ? 1 : 1.08, 1]);

  return (
    <header
      ref={ref}
      className="relative -mt-20 flex min-h-[34rem] flex-col overflow-hidden bg-ink lg:-mt-23 lg:min-h-[40rem]"
    >
      <motion.div style={{ y: imageY, scale: imageScale }} className="absolute inset-x-0 top-0 h-[118%] will-change-transform">
        <LazyImage
          src={pageSrc(image)}
          srcSet={pageSrcSet(image)}
          sizes="100vw"
          mobileSrcSet={pageMobileSrcSet(image)}
          alt=""
          loading="eager"
          fetchPriority="high"
          wrapperClassName="absolute inset-0"
        />
      </motion.div>
      <div className="scrim-page absolute inset-0" />
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-ink/65 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-ink to-transparent" />

      {/* Subtle ambient blue/cyan bloom */}
      <div
        className="pointer-events-none absolute -left-20 top-1/4 h-80 w-80 rounded-full bg-[#2563EB]/[0.15] blur-[120px]"
        aria-hidden="true"
      />

      <div className="shell relative z-10 flex flex-1 flex-col items-center justify-end pb-12 pt-60 text-center sm:pt-80 lg:items-start lg:justify-center lg:pb-16 lg:pt-40 lg:text-left">
        <h1 className="text-on-photo max-w-[18ch] text-balance font-display text-fluid-hero font-semibold text-[#F8FAFC]">
          {typeof title === 'string' ? <RevealWords text={title} accent={accent} delay={0.1} /> : title}
        </h1>

        {/* Animated brand hairline drawn under title */}
        <motion.div
          initial={reduceMotion ? false : { scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="mt-5 h-[2px] w-20 origin-left rounded-full bg-gradient-to-r from-[#2563EB] via-[#38BDF8] to-transparent shadow-[0_0_10px_rgba(56,189,248,0.6)]"
          aria-hidden="true"
        />

        {intro && (
          <Reveal as="p" delay={0.45} className="mt-5 max-w-xl text-lg leading-relaxed text-[#94A3B8] lg:mt-6 lg:text-xl">
            {intro}
          </Reveal>
        )}

        {actions && (
          <Reveal delay={0.6} className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row lg:mt-10">
            {actions}
          </Reveal>
        )}

      </div>

      {chips && <PillMarquee items={chips} className="relative z-10 pb-8 lg:pb-10" />}
    </header>
  );
};
