import React, { useRef } from 'react';
import { ArrowUpRight, MapPin } from 'lucide-react';
import { PORTFOLIO_ITEMS, WORK_CATEGORIES } from '../constants/content.ts';
import { FilterRail } from './common/FilterRail.tsx';
import { motion, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from 'framer-motion';
import { workSrc, workSrcSet } from '../lib/images.ts';
import { Shine } from './common/Shine.tsx';
import { BorderBeam } from './common/BorderBeam.tsx';
import { HexLattice } from './common/HexLattice.tsx';
import { Skeleton } from './common/Skeleton.tsx';
import { useMediaQuery } from '../lib/motion.ts';

type Item = (typeof PORTFOLIO_ITEMS)[number];

const PROJECT_DETAILS: Record<number, { scope: string; deliverables: string[] }> = {
  1: {
    scope: 'Hospitality & Culinary',
    deliverables: ['Grid Curation', 'Appetite Styling', 'Local Reach'],
  },
  2: {
    scope: 'D2C Lifestyle Label',
    deliverables: ['Audio Direction', 'Kinetic Motion', 'Fast-Paced Cuts'],
  },
  3: {
    scope: 'Performance Acquisition',
    deliverables: ['Meta Advantage+', 'Google Search', 'CRM Bridge'],
  },
  4: {
    scope: 'Modern Web Platform',
    deliverables: ['Next.js Engine', 'WhatsApp Bridge', 'Instant Quoting'],
  },
  5: {
    scope: 'Prestige Real Estate Identity',
    deliverables: ['Brand Architecture', 'Gold Print Decks', 'Asset System'],
  },
  6: {
    scope: 'Activewear Brand Direction',
    deliverables: ['Carousel Sequences', 'Product Showcase', 'Viral Reach'],
  },
  7: {
    scope: 'D2C Skincare Brand System',
    deliverables: ['Packaging System', 'Unboxing Kit', 'Pre-Launch Buzz'],
  },
  8: {
    scope: 'EdTech Scaled Growth Funnel',
    deliverables: ['Performance Max', 'Meta Video Ads', 'CRM Automation'],
  },
  9: {
    scope: 'Luxury Hospitality Portal',
    deliverables: ['Editorial Web', '3D Room Tours', 'Direct Engine'],
  },
  10: {
    scope: 'Streetwear Viral Content',
    deliverables: ['Beat-Synced Cuts', 'Street Intercepts', 'Audio Trends'],
  },
  11: {
    scope: 'Organic Food & Supermarket',
    deliverables: ['Origin Stories', 'Recipe Carousels', 'Co-Creation'],
  },
  12: {
    scope: 'FinTech Platform Redesign',
    deliverables: ['Interactive UI', 'Onboarding Funnel', 'KYC Flow'],
  },
};

const PROJECT_STATS_METRICS: Record<
  number,
  { label1: string; val1: string; label2: string; val2: string; label3: string; val3: string }
> = {
  1: { label1: 'Reach', val1: '+320%', label2: 'Audience', val2: '18.4K', label3: 'Engagement', val3: '6.8%' },
  2: { label1: 'Views', val1: '1.4M+', label2: 'Avg Watch', val2: '94%', label3: 'Shares', val3: '42K+' },
  3: { label1: 'ROAS', val1: '4.8x', label2: 'Leads', val2: '1,240', label3: 'Cost/Lead', val3: '-38%' },
  4: { label1: 'Speed', val1: '98/100', label2: 'Conversion', val2: '+68%', label3: 'Stack', val3: 'Next.js' },
  5: { label1: 'Collateral', val1: '32 Items', label2: 'Asset Kit', val2: 'Full 4K', label3: 'Print Spec', val3: 'Gold Foil' },
  6: { label1: 'Saves', val1: '28K+', label2: 'CTR', val2: '5.2%', label3: 'Format', val3: 'Carousels' },
  7: { label1: 'Pre-Orders', val1: '+450%', label2: 'Packaging', val2: 'Custom', label3: 'Retail', val3: 'Global' },
  8: { label1: 'ROAS', val1: '3.9x', label2: 'Students', val2: '8,500+', label3: 'Cost/Acq', val3: '-44%' },
  9: { label1: 'Lighthouse', val1: '99.8', label2: 'Bookings', val2: '+115%', label3: 'Format', val3: '3D Web' },
  10: { label1: 'Views', val1: '2.8M', label2: 'Viral Shares', val2: '42K', label3: 'Saves', val3: '19K' },
  11: { label1: 'Followers', val1: '+180%', label2: 'Engagement', val2: '8.4%', label3: 'Footfall', val3: '+62%' },
  12: { label1: 'Store Conv', val1: '4.2x', label2: 'Onboarding', val2: '<60s', label3: 'Retention', val3: '78%' },
};

const DEMO_LINKS: Record<number, { url: string; label: string }> = {
  1: { url: 'https://instagram.com', label: 'Explore Social Feed' },
  2: { url: 'https://youtube.com', label: 'Watch 4K Video Edit' },
  3: { url: 'https://ads.google.com', label: 'Inspect Funnel Architecture' },
  4: { url: 'https://nextjs.org', label: 'Launch Web Platform Demo' },
  5: { url: 'https://behance.net', label: 'Browse Brand Identity Deck' },
  6: { url: 'https://instagram.com', label: 'Open Campaign Carousel' },
  7: { url: 'https://behance.net', label: 'View Brand Guidelines' },
  8: { url: 'https://ads.google.com', label: 'Review Acquisition Ads' },
  9: { url: 'https://nextjs.org', label: 'Explore Hotel Experience' },
  10: { url: 'https://tiktok.com', label: 'Watch Viral Reel Cuts' },
  11: { url: 'https://instagram.com', label: 'Inspect Organic Feed' },
  12: { url: 'https://github.com', label: 'Explore FinTech Case' },
};

/** Individual 3D Coverflow Card driven by page vertical scroll */
const Card3DItem: React.FC<{
  item: Item;
  index: number;
  total: number;
  progress: MotionValue<number>;
  phone: boolean;
  reduce: boolean;
}> = ({ item, index, total, progress, phone, reduce }) => {
  const [imgLoaded, setImgLoaded] = React.useState(false);
  const details = PROJECT_DETAILS[item.id] || {
    scope: 'Strategic Commission',
    deliverables: ['Strategy', 'Creative', 'Growth'],
  };
  const metrics = PROJECT_STATS_METRICS[item.id] || {
    label1: 'Outcome',
    val1: item.stats,
    label2: 'Format',
    val2: '4K Full',
    label3: 'Rating',
    val3: '5.0 ★',
  };
  const demo = DEMO_LINKS[item.id] || {
    url: '/contact',
    label: 'Explore Commission',
  };

  const spacing = phone ? 290 : 360;

  // Virtual distance delta from current scroll center
  const delta = useTransform(progress, (p) => {
    if (total <= 1) return 0;
    return index - p * (total - 1);
  });

  const x = useTransform(delta, (d) => d * spacing);
  const scale = useTransform(delta, (d) => {
    const dist = Math.abs(d);
    return Math.max(0.74, 1 - dist * 0.13);
  });
  const rotateY = useTransform(delta, (d) => {
    if (reduce) return 0;
    return Math.max(-20, Math.min(20, -d * 12));
  });
  const opacity = useTransform(delta, (d) => {
    const dist = Math.abs(d);
    return Math.max(0.25, 1 - dist * 0.38);
  });
  const blur = useTransform(delta, (d) => {
    if (reduce) return 'blur(0px)';
    const dist = Math.abs(d);
    return dist < 0.25 ? 'blur(0px)' : `blur(${Math.min(3.5, dist * 2)}px)`;
  });
  const zIndex = useTransform(delta, (d) => Math.round(30 - Math.abs(d) * 10));

  return (
    <motion.div
      style={{
        x,
        scale,
        rotateY,
        opacity,
        filter: blur,
        zIndex,
        transformStyle: 'preserve-3d',
      }}
      className="absolute w-[310px] xs:w-[335px] sm:w-[360px] will-change-transform"
    >
      <div className="relative overflow-hidden rounded-[26px] border border-[#334155]/80 bg-[#141C31] p-3.5 sm:p-4 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.85)] transition-colors duration-500 hover:border-[#38BDF8]/60">
        <BorderBeam size={220} duration={8} borderWidth={1.5} colorFrom="#2563EB" colorTo="#38BDF8" />
        <Shine />

        {/* Top Specular Rim */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-20 h-[1.5px] bg-gradient-to-r from-transparent via-[#38BDF8]/50 to-transparent"
          aria-hidden="true"
        />

        {/* Compact Photo Frame with Skeleton Shimmer Placeholder */}
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-[#161722]">
          {!imgLoaded && (
            <Skeleton className="absolute inset-0 z-[1] h-full w-full rounded-2xl" />
          )}
          <img
            ref={(el) => {
              if (el?.complete && el.naturalWidth) setImgLoaded(true);
            }}
            src={workSrc(item.image)}
            srcSet={workSrcSet(item.image)}
            sizes="(min-width: 640px) 360px, 310px"
            alt={item.title}
            width={1200}
            height={750}
            loading="lazy"
            decoding="async"
            onLoad={() => setImgLoaded(true)}
            className={`h-full w-full object-cover transition-all duration-700 ease-out ${
              imgLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0C0D12]/90 via-transparent to-[#0C0D12]/30 pointer-events-none" />

          {/* Category pill on image */}
          <span className="absolute left-3 top-3 z-10 rounded-full border border-white/20 bg-[#0C0D12]/80 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur-md shadow-sm">
            {item.category}
          </span>

          {/* Outcome Metric Chip */}
          <div className="absolute bottom-2.5 left-3 z-10 flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-[#0C0D12]/85 px-2.5 py-0.5 backdrop-blur-md shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[#F59E0B] animate-pulse" />
            <span className="font-sans text-[11px] font-semibold text-white">{item.stats}</span>
          </div>
        </div>

        {/* Card Content — Clean, modern, highly legible typography */}
        <div className="mt-3.5 px-0.5">
          <div className="flex items-center gap-1.5 text-xs text-[#F59E0B] font-medium">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-[#F59E0B]" />
            <span className="truncate">{details.scope}</span>
          </div>

          <h3 className="font-sans text-lg sm:text-xl font-bold tracking-tight text-white leading-snug mt-1 truncate">
            {item.title}
          </h3>

          <p className="mt-1.5 text-xs sm:text-[13px] text-[#CBD5E1] line-clamp-2 leading-relaxed">
            {item.description}
          </p>

          {/* 3 Metrics Data Columns (Destination Cards Style) */}
          <div className="mt-3.5 grid grid-cols-3 divide-x divide-white/10 rounded-xl border border-white/10 bg-[#0C0D12]/75 py-2 px-1 text-center backdrop-blur-sm">
            <div>
              <div className="text-[10px] uppercase tracking-wider text-[#CBD5E1] font-medium">
                {metrics.label1}
              </div>
              <div className="mt-0.5 font-sans text-xs sm:text-sm font-bold text-[#F59E0B]">
                {metrics.val1}
              </div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-wider text-[#CBD5E1] font-medium">
                {metrics.label2}
              </div>
              <div className="mt-0.5 font-sans text-xs sm:text-sm font-bold text-white">
                {metrics.val2}
              </div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-wider text-[#CBD5E1] font-medium">
                {metrics.label3}
              </div>
              <div className="mt-0.5 font-sans text-xs sm:text-sm font-bold text-[#F59E0B]">
                {metrics.val3}
              </div>
            </div>
          </div>

          {/* Clean Deliverable Chips */}
          <div className="mt-3 flex flex-wrap items-center justify-center gap-1.5">
            {details.deliverables.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 bg-[#0C0D12]/60 px-2.5 py-0.5 text-[11px] font-medium text-[#CBD5E1]"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Centered Attractive Interactive Action Button */}
          <a
            href={demo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group/btn relative mt-3 flex w-full items-center justify-center gap-2 overflow-hidden rounded-full border border-amber-300/40 bg-gradient-to-r from-[#F59E0B] via-[#EAB308] to-[#D97706] py-2.5 px-4 text-xs font-bold text-[#0C0D12] shadow-[0_4px_16px_rgba(245,158,11,0.4),inset_0_1px_1px_rgba(255,255,255,0.5)] backdrop-blur-md transition-all duration-300 hover:scale-[1.02] hover:border-amber-200 hover:shadow-[0_0_24px_rgba(245,158,11,0.7)] active:scale-[0.98]"
            title={demo.label}
          >
            <span className="relative z-10">{demo.label}</span>
            <ArrowUpRight className="relative z-10 h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5 text-[#0C0D12]" />
            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-out group-hover/btn:translate-x-full" />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

/**
 * WorkGallery with Page-Scroll Linked Horizontal 3D Coverflow.
 * As the user scrolls vertically (top & down), the section pins and the cards scroll horizontally (left & right).
 * Zero manual arrow/dot clutter, compact cards, non-truncated deliverables, and clean readable typography.
 */
export const WorkGallery: React.FC = () => {
  const [category, setCategory] = React.useState<string>('All');
  const sectionRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const phone = useMediaQuery('(max-width: 767px)');

  const items = category === 'All' ? PORTFOLIO_ITEMS : PORTFOLIO_ITEMS.filter((item) => item.category === category);

  // Bind vertical page scrolling to horizontal card scroll.
  // Continuous smooth scrub from start to finish without dead freezes
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 28,
    mass: 0.1,
  });

  // Calculate dynamic scroll height based on item count with ample breathing room
  const isMultiItem = items.length > 1;
  const sectionHeight = isMultiItem ? `${Math.max(220, items.length * 55)}vh` : 'auto';

  return (
    <div
      ref={sectionRef}
      style={{ minHeight: sectionHeight }}
      className="relative bg-[#0C0D12]"
    >
      {/* Sticky container that stays in view while vertical scroll drives horizontal card scrub */}
      <div className={`relative ${isMultiItem ? 'sticky top-0 h-screen' : 'py-16 sm:py-24'} flex flex-col justify-center overflow-hidden`}>
        {/* Ambient background glows */}
        <div
          className="pointer-events-none absolute -right-24 top-[10%] h-[580px] w-[580px] rounded-full bg-[radial-gradient(circle,rgba(245,158,11,0.12)_0%,transparent_70%)] blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -left-24 top-[30%] h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,rgba(251,191,36,0.08)_0%,transparent_70%)] blur-3xl"
          aria-hidden="true"
        />

        {/* Hex lattice drifting in background */}
        <div
          className="lattice-fade-left lattice-drift pointer-events-none absolute -right-16 top-20 z-0 hidden opacity-15 sm:block"
          aria-hidden="true"
        >
          <HexLattice width={440} height={484} />
        </div>

        <div className="shell relative z-10 w-full">
          {/* Header row: Streamlined, non-duplicate headline with luxury filter rail */}
          <div className="flex flex-col items-center gap-5 text-center lg:flex-row lg:items-end lg:justify-between lg:text-left">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 mb-2 rounded-full border border-amber-400/20 bg-[#171822]/80 px-3.5 py-1 backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-[#F59E0B] animate-pulse" />
                <span className="font-sans text-xs font-semibold uppercase tracking-widest text-[#F59E0B]">
                  Curated Showcase
                </span>
              </div>
              <h2 className="font-serif-display text-[clamp(2rem,3.4vw,3.4rem)] font-normal tracking-tight leading-[1.08] text-white">
                Selected Client{' '}
                <span className="font-cursive text-[clamp(2.3rem,4vw,4rem)] font-normal text-shimmer-pure inline-block not-italic -rotate-1 pl-1 drop-shadow-[0_2px_24px_rgba(245,158,11,0.4)]">
                  Commissions.
                </span>
              </h2>
            </div>

            <div className="flex items-center justify-center lg:justify-end">
              <FilterRail
                label="Filter work by category"
                options={WORK_CATEGORIES}
                value={category}
                onChange={(cat) => setCategory(cat)}
                className="max-w-full"
              />
            </div>
          </div>

          {/* 3D Horizontal Stage: Driven by Vertical Page Scrolling */}
          <div
            className="relative mt-8 sm:mt-12 flex h-[580px] sm:h-[620px] w-full items-center justify-center overflow-visible select-none"
            style={{ perspective: phone ? '1000px' : '1600px' }}
          >
            {items.map((item, index) => (
              <Card3DItem
                key={item.id}
                item={item}
                index={index}
                total={items.length}
                progress={smoothProgress}
                phone={phone}
                reduce={reduceMotion ?? false}
              />
            ))}
          </div>

          {/* Subtle scroll progress hint (NO ugly buttons or dot clusters) */}
          {isMultiItem && (
            <div className="mt-2 flex items-center justify-center gap-2 text-xs font-mono uppercase tracking-widest text-[#94A3B8]/60">
              <span className="text-[#38BDF8] animate-bounce">↓</span>
              <span>Scroll page to navigate commissions</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default WorkGallery;
