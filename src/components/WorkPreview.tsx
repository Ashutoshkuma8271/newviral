import React, { useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { PORTFOLIO_ITEMS } from '../constants/content.ts';
import { workSrc, workSrcSet } from '../lib/images.ts';
import { SectionHeader } from './common/SectionHeader.tsx';
import { Shine } from './common/Shine.tsx';
import { TiltCard } from './common/TiltCard.tsx';
import { Skeleton } from './common/Skeleton.tsx';
import { useMediaQuery } from '../lib/motion.ts';

type Item = (typeof PORTFOLIO_ITEMS)[number];
const pad = (n: number) => String(n).padStart(2, '0');

/** One project. `imageX` gives the photo a slow counter-drift inside its frame while the row travels. */
const ProjectPanel: React.FC<{
  item: Item;
  index: number;
  total: number;
  imageX?: ReturnType<typeof useTransform<number, string>>;
}> = ({ item, index, total, imageX }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <Link to="/work" className="group block">
      <TiltCard max={5}>
        <div className="relative overflow-hidden rounded-3xl bg-[#161F36] border border-[#334155]/80">
          <Shine />
          <div className="relative aspect-[4/3] lg:aspect-auto lg:h-[min(58vh,560px)] overflow-hidden bg-[#161F36]">
            {!loaded && <Skeleton className="absolute inset-0 z-[1] h-full w-full rounded-none" />}
            <motion.img
              ref={(el) => {
                if (el?.complete && el.naturalWidth) setLoaded(true);
              }}
              src={workSrc(item.image)}
              srcSet={workSrcSet(item.image)}
              sizes="(min-width: 1024px) 56vw, 84vw"
              alt=""
              width={1200}
              height={900}
              loading="lazy"
              decoding="async"
              onLoad={() => setLoaded(true)}
              style={imageX ? { x: imageX } : undefined}
              className={`h-full w-full scale-[1.14] object-cover transition-all duration-[900ms] ease-out group-hover:scale-[1.2] ${
                loaded ? 'opacity-100' : 'opacity-0'
              }`}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0C0D12]/75 via-transparent to-transparent pointer-events-none" />
          <span className="absolute left-5 top-5 rounded-full bg-[#0C0D12]/85 border border-white/15 px-3.5 py-1.5 text-[13px] font-semibold text-white backdrop-blur-md">
            {item.category}
          </span>
          <span className="absolute bottom-5 left-5 rounded-full bg-[#F59E0B] px-3 py-1 text-xs font-bold text-[#0C0D12] shadow-md">
            Concept project
          </span>
          <span className="absolute bottom-5 right-5 flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#0C0D12] transition-transform duration-500 group-hover:rotate-45">
            <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
          </span>
        </div>
      </TiltCard>
      <div className="mt-6 flex flex-col gap-1.5 lg:flex-row lg:items-baseline lg:gap-4">
        <span className="whitespace-nowrap font-display text-sm font-semibold tabular-nums text-white/50">
          {pad(index + 1)} / {pad(total)}
        </span>
        <h3 className="font-editorial text-2xl font-medium leading-tight text-white transition-colors group-hover:text-[#F59E0B] lg:text-[clamp(1.75rem,2.4vw,2.6rem)]">
          {item.title}
        </h3>
      </div>
      <p className="mt-3 max-w-[52ch] text-base leading-relaxed text-[#CBD5E1]">{item.description}</p>
    </Link>
  );
};

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
      if (track) {
        setDistance(Math.max(0, track.scrollWidth - window.innerWidth));
      }
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener('resize', measure);
    window.addEventListener('load', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
      window.removeEventListener('load', measure);
    };
  }, [pinned]);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });
  // Smooth, buttery continuous scroll progression directly to the end of the section with zero dead pauses or freezes
  const progress = useSpring(scrollYProgress, { stiffness: 220, damping: 30, mass: 0.08 });
  const x = useTransform(progress, (v) => -v * distance);
  const imageX = useTransform(progress, (v) => `${(v - 0.5) * 10}%`);
  const bar = useTransform(progress, [0, 1], [0, 1]);
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const i = Math.min(items.length - 1, Math.max(0, Math.floor(v * items.length)));
    if (i !== current) setCurrent(i);
  });

  if (!pinned) {
    return (
      <section id="work-preview" className="relative bg-[#0C0D12] py-24 text-white sm:py-32">
        <div className="shell">
          <SectionHeader
            title="A look at the work."
            accent="the work."
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
            className="inline-flex h-14 items-center gap-2 rounded-full border border-amber-300/40 bg-gradient-to-r from-[#F59E0B] via-[#EAB308] to-[#D97706] px-8 text-base font-bold text-[#0C0D12] shadow-[0_4px_24px_rgba(245,158,11,0.45)] transition-all hover:scale-[1.02] hover:shadow-[0_8px_36px_rgba(245,158,11,0.65)]"
          >
            See all work
            <ArrowRight className="h-4 w-4 text-[#0C0D12]" aria-hidden="true" />
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      id="work-preview"
      aria-label="Selected work"
      className="relative bg-[#0C0D12] text-white"
      style={{ height: `calc(100svh + ${Math.round(distance)}px)` }}
    >
      <div className="sticky top-0 flex h-svh flex-col justify-center overflow-hidden">
        {/* Ambient background glow */}
        <div
          className="pointer-events-none absolute left-1/3 top-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-[#F59E0B]/[0.06] blur-[140px]"
          aria-hidden="true"
        />

        <motion.div
          ref={trackRef}
          style={{ x }}
          className="relative z-10 flex w-max items-center gap-[4vw] pl-[6vw] pr-[6vw] will-change-transform"
        >
          {/* Opening panel */}
          <div className="w-[30vw] max-w-[520px] shrink-0">
            <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#F59E0B]">
              Selected work
              <span className="font-satisfy text-[#FBBF24] lowercase tracking-normal text-sm">— curated</span>
            </p>
            <h2 className="mt-5 font-display text-[clamp(2.8rem,5vw,5.5rem)] font-semibold leading-[0.98] text-white">
              A look at <span className="font-editorial font-normal italic text-shimmer-pure text-[1.12em] drop-shadow-[0_2px_24px_rgba(245,158,11,0.45)]">the work.</span>
            </h2>
            <p className="mt-6 max-w-md font-editorial text-2xl leading-relaxed text-[#CBD5E1]">
              Social, video and ad projects built to get a brand noticed. More case studies are on the way.
            </p>
            <p className="mt-10 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-white/60">
              Scroll
              <span className="relative block h-px w-14 overflow-hidden bg-white/25">
                <span className="scroll-cue absolute inset-y-0 left-0 w-1/2 bg-[#F59E0B]" />
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
            <p className="font-display text-[clamp(2.2rem,3.6vw,4rem)] font-semibold leading-[1.02] text-white">
              Want work like this for <span className="font-editorial font-normal italic text-shimmer-pure drop-shadow-[0_2px_20px_rgba(245,158,11,0.4)]">your brand?</span>
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/work"
                className="inline-flex h-14 items-center gap-2 rounded-full border border-amber-300/40 bg-gradient-to-r from-[#F59E0B] via-[#EAB308] to-[#D97706] px-8 text-base font-bold text-[#0C0D12] shadow-[0_4px_24px_rgba(245,158,11,0.45)] transition-all hover:scale-[1.02] hover:shadow-[0_8px_36px_rgba(245,158,11,0.65)]"
              >
                See all work
                <ArrowRight className="h-5 w-5 text-[#0C0D12]" aria-hidden="true" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex h-14 items-center gap-2 rounded-full border border-white/15 bg-white/5 px-8 text-base font-semibold text-white backdrop-blur-md transition-colors hover:border-amber-400/40 hover:bg-white/10"
              >
                Start a project
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Progress: a filling line and the current project number */}
        <div className="shell relative z-10 inset-x-0 bottom-8 flex items-center gap-6" aria-hidden="true">
          <span className="font-display text-sm font-semibold tabular-nums text-white/70">
            {pad(current + 1)} <span className="text-white/35">/ {pad(items.length)}</span>
          </span>
          <span className="relative h-px flex-1 bg-white/15">
            <motion.span style={{ scaleX: bar }} className="absolute inset-0 origin-left bg-gradient-to-r from-[#F59E0B] to-[#FBBF24]" />
          </span>
        </div>
      </div>
    </section>
  );
};
