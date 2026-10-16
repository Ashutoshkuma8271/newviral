import React, { useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { PORTFOLIO_ITEMS } from '../constants/content.ts';
import { workSrc, workSrcSet } from '../lib/images.ts';
import { SectionHeader } from './common/SectionHeader.tsx';
import { useMediaQuery } from '../lib/motion.ts';

type Item = (typeof PORTFOLIO_ITEMS)[number];
const pad = (n: number) => String(n).padStart(2, '0');
/** The row travels faster than the page scrolls, so the pinned scene stays short */
const SPEED = 1.5;

/** One project. `imageX` gives the photo a slow counter-drift inside its frame while the row travels. */
const ProjectPanel: React.FC<{ item: Item; index: number; total: number; imageX?: ReturnType<typeof useTransform<number, string>> }> = ({
  item,
  index,
  total,
  imageX,
}) => (
  <Link to="/work" className="group block">
    <div className="relative overflow-hidden rounded-3xl bg-dark-card">
      <div className="aspect-[4/3] lg:aspect-auto lg:h-[min(58vh,560px)]">
        <motion.img
          src={workSrc(item.image)}
          srcSet={workSrcSet(item.image)}
          sizes="(min-width: 1024px) 56vw, 84vw"
          alt=""
          width={1200}
          height={900}
          loading="lazy"
          decoding="async"
          style={imageX ? { x: imageX } : undefined}
          className="h-full w-full scale-[1.14] object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.2]"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent" />
      <span className="absolute left-5 top-5 rounded-full bg-ink/70 px-3.5 py-1.5 text-[13px] font-semibold text-white backdrop-blur-md">
        {item.category}
      </span>
      <span className="absolute bottom-5 left-5 rounded-full bg-gold px-3 py-1 text-xs font-semibold text-ink">
        Concept project
      </span>
      <span className="absolute bottom-5 right-5 flex h-12 w-12 items-center justify-center rounded-full bg-white text-ink transition-transform duration-500 group-hover:rotate-45">
        <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
      </span>
    </div>
    <div className="mt-6 flex flex-col gap-1.5 lg:flex-row lg:items-baseline lg:gap-4">
      <span className="whitespace-nowrap font-display text-sm font-semibold tabular-nums text-white/45">
        {pad(index + 1)} / {pad(total)}
      </span>
      <h3 className="font-display text-2xl font-semibold leading-tight text-white transition-colors group-hover:text-gold lg:text-[clamp(1.6rem,2.2vw,2.4rem)]">
        {item.title}
      </h3>
    </div>
    <p className="mt-3 max-w-[52ch] text-base leading-relaxed text-white/65">{item.description}</p>
  </Link>
);

/**
 * Home work showcase. Laptop and desktop: the section pins and vertical scrolling carries a row of large project
 * panels sideways, with a progress bar and counter. Phones, tablets and reduced motion: a swipeable row, no pinning.
 * Items are concept projects (labelled as such); no results are shown until real case studies exist.
 */
export const WorkPreview: React.FC = () => {
  const items = PORTFOLIO_ITEMS;
  const reduce = useReducedMotion();
  const wide = useMediaQuery('(min-width: 1024px)');
  const pinned = wide && !reduce;

  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const [current, setCurrent] = useState(0);

  // How far the row has to travel: its full width minus one screen
  useLayoutEffect(() => {
    if (!pinned) return;
    const measure = () => {
      const track = trackRef.current;
      if (track) setDistance(Math.max(0, track.scrollWidth - window.innerWidth));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [pinned]);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  const x = useTransform(progress, (v) => -v * distance);
  const imageX = useTransform(progress, (v) => `${(v - 0.5) * 10}%`);
  const bar = useTransform(progress, [0, 1], [0, 1]);
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const i = Math.min(items.length - 1, Math.max(0, Math.round(v * (items.length + 1)) - 1));
    if (i !== current) setCurrent(i);
  });

  if (!pinned) {
    return (
      <section className="relative bg-ink py-24 text-white sm:py-32">
        <div className="shell">
          <SectionHeader
            title="A look at the work."
            intro="Social, video and ad projects built to get a brand noticed. More case studies are on the way."
          />
        </div>
        <ul className="mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 [-ms-overflow-style:none] [scrollbar-width:none] sm:mt-16 sm:px-8 [&::-webkit-scrollbar]:hidden">
          {items.map((item, i) => (
            <li key={item.id} className="w-[84%] shrink-0 snap-center sm:w-[62%] md:w-[48%]">
              <ProjectPanel item={item} index={i} total={items.length} />
            </li>
          ))}
        </ul>
        <div className="shell mt-12 flex justify-center">
          <Link
            to="/work"
            className="inline-flex h-12 items-center gap-2 rounded-full bg-gold px-6 text-[15px] font-semibold text-ink transition-colors hover:bg-gold-light"
          >
            See all work
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      aria-label="Selected work"
      className="relative bg-ink text-white"
      style={{ height: `calc(100svh + ${Math.round(distance / SPEED)}px)` }}
    >
      <div className="sticky top-0 flex h-svh flex-col justify-center overflow-hidden">
        <motion.div ref={trackRef} style={{ x }} className="flex w-max items-center gap-[4vw] pl-[6vw] pr-[6vw] will-change-transform">
          {/* Opening panel */}
          <div className="w-[30vw] max-w-[520px] shrink-0">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gold">Selected work</p>
            <h2 className="mt-5 font-display text-[clamp(2.8rem,5vw,5.5rem)] font-semibold leading-[0.98] text-white">
              A look at the work.
            </h2>
            <p className="mt-6 max-w-md font-serif-display text-xl leading-relaxed text-white/70">
              Social, video and ad projects built to get a brand noticed. More case studies are on the way.
            </p>
            <p className="mt-10 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-white/60">
              Scroll
              <span className="relative block h-px w-14 overflow-hidden bg-white/25">
                <span className="scroll-cue absolute inset-y-0 left-0 w-1/2 bg-gold" />
              </span>
            </p>
          </div>

          {items.map((item, i) => (
            <div key={item.id} className="w-[min(56vw,880px)] shrink-0">
              <ProjectPanel item={item} index={i} total={items.length} imageX={imageX} />
            </div>
          ))}

          {/* Closing panel */}
          <div className="flex w-[30vw] max-w-[480px] shrink-0 flex-col items-start">
            <p className="font-display text-[clamp(2.2rem,3.6vw,4rem)] font-semibold leading-[1.02]">
              Want work like this for your brand?
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/work"
                className="inline-flex h-14 items-center gap-2 rounded-full bg-gold px-7 text-base font-semibold text-ink transition-colors hover:bg-gold-light"
              >
                See all work
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex h-14 items-center gap-2 rounded-full border border-white/30 px-7 text-base font-semibold text-white transition-colors hover:border-white hover:bg-white hover:text-ink"
              >
                Start a project
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Progress: a filling line and the current project number */}
        <div className="shell absolute inset-x-0 bottom-8 flex items-center gap-6" aria-hidden="true">
          <span className="font-display text-sm font-semibold tabular-nums text-white/70">
            {pad(current + 1)} <span className="text-white/35">/ {pad(items.length)}</span>
          </span>
          <span className="relative h-px flex-1 bg-white/15">
            <motion.span style={{ scaleX: bar }} className="absolute inset-0 origin-left bg-gold" />
          </span>
        </div>
      </div>
    </section>
  );
};
