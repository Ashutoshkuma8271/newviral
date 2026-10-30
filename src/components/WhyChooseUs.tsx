import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { COMPARISON_VISUALS } from './WhyChooseUsVisuals.tsx';
import { Magnetic } from './common/Magnetic.tsx';
import { useMediaQuery } from '../lib/motion.ts';

const EASE = [0.16, 1, 0.3, 1] as const;

// 4 Curated Pillar Tabs for Interactive Exploration
const PILLARS = [
  { id: 'all', label: 'All Standards', count: 8 },
  { id: 'strategy', label: 'Strategy & Creative', count: 3, indices: [0, 1, 2] },
  { id: 'systems', label: 'Execution & Systems', count: 3, indices: [3, 4, 5] },
  { id: 'partnership', label: 'Partnership & Growth', count: 2, indices: [6, 7] },
];

export interface CommercialStandardItem {
  id: string;
  category: string;
  friction: string;
  title: string;
  description: string;
  deliverables: string[];
  pillar: 'strategy' | 'systems' | 'partnership';
  visualIndex: number;
}

export const COMMERCIAL_STANDARDS: CommercialStandardItem[] = [
  {
    id: 'strategy',
    category: 'Commercial Growth Strategy',
    friction: 'Vanity metrics, chasing viral views without intent, and disconnected reach',
    title: 'Strategy Built Around Pipeline & Revenue',
    description:
      'We engineer campaigns directly to commercial objectives. Every post, creative iteration, and ad dollar is calibrated to generate qualified inquiries, conversions, and sustainable margin growth.',
    deliverables: ['Full-Funnel Architecture', 'Verified Commercial ROI', 'Direct Pipeline Gen'],
    pillar: 'strategy',
    visualIndex: 0,
  },
  {
    id: 'creative',
    category: 'Bespoke Brand Identity',
    friction: 'Generic templates and cookie-cutter designs reused across client accounts',
    title: 'Creative Content That Commands Attention',
    description:
      'No recycled templates. Everything is custom-crafted to mirror your distinct brand tone, palette, and executive market positioning, elevating perceived value across all customer touchpoints.',
    deliverables: ['100% Bespoke Identity', 'Custom Typography & Palette', 'Zero Template Cloning'],
    pillar: 'strategy',
    visualIndex: 1,
  },
  {
    id: 'consistency',
    category: 'Publishing Discipline',
    friction: 'Irregular posting whenever someone remembers or has spare internal time',
    title: 'Disciplined Publishing & Unified Brand Cadence',
    description:
      'We maintain strict editorial schedules and cohesive styling across all digital touchpoints, turning casual viewers into loyal brand advocates through predictable, relentless execution.',
    deliverables: ['30-Day Content Roadmap', 'Multi-Platform Sync', 'Cohesive Grid Architecture'],
    pillar: 'strategy',
    visualIndex: 2,
  },
  {
    id: 'communication',
    category: 'Executive Transparency',
    friction: 'Marketing jargon, sluggish email chains, and unexpected scope creep bills',
    title: 'Unfiltered Transparency & Direct Communication',
    description:
      'Zero confusing jargon or hidden surprises. You receive direct senior updates, crystal-clear milestone tracking, and rapid response through dedicated private channels.',
    deliverables: ['Direct Strategic Partner', 'Sub-2hr Response SLA', 'Weekly Milestone Debriefs'],
    pillar: 'systems',
    visualIndex: 3,
  },
  {
    id: 'reporting',
    category: 'Revenue Attribution',
    friction: '40-page PDF reports filled with vanity charts and superficial data',
    title: 'Actionable Intelligence & ROAS Attribution',
    description:
      'Monthly analytics debriefs translated into real commercial metrics: customer acquisition cost, inbound pipeline volume, verified leads, and clear next-month recommendations.',
    deliverables: ['Executive Revenue Dashboards', 'Verified ROAS Attribution', 'Cashflow Analytics'],
    pillar: 'systems',
    visualIndex: 4,
  },
  {
    id: 'packages',
    category: 'Commercial Agility',
    friction: 'Rigid, inflexible annual contracts and bloated one-size-fits-all bundles',
    title: 'Growth That Scales With Your Ambition',
    description:
      'Flexible, performance-focused services designed around your business stage, growth goals, and evolving market needs without restrictive lock-ins or bloated overhead.',
    deliverables: ['Modular Service Architecture', 'No Long-Term Lock-In', 'Agile Growth Scaling'],
    pillar: 'systems',
    visualIndex: 5,
  },
  {
    id: 'partnership',
    category: 'Unified Ecosystem',
    friction: 'Disconnected freelancers operating in isolated silos who never communicate',
    title: 'Single-Source Alignment for Social, Web & Ads',
    description:
      'Full-spectrum synchronicity under one roof. Your copywriters, designers, web developers, and ad managers execute from the exact same strategy and creative brief.',
    deliverables: ['Unified Campaign Synchronicity', 'Integrated Web & Paid Ads', 'Zero Miscommunication'],
    pillar: 'partnership',
    visualIndex: 6,
  },
  {
    id: 'management',
    category: 'Senior Leadership',
    friction: 'A revolving door of junior coordinators every time you call for strategic advice',
    title: 'Dedicated Senior Growth Strategist',
    description:
      'A single dedicated point of contact who understands your business inside out, orchestrates your deliverables, and takes direct personal responsibility for commercial results.',
    deliverables: ['1 Dedicated Senior Partner', 'Direct WhatsApp Line', 'Proactive Strategic Leadership'],
    pillar: 'partnership',
    visualIndex: 7,
  },
];

/**
 * StandardStackCard: Individual Sticky Card with Scroll-Snapping Stacking Dynamics
 * Styled to precisely match the user's reference mockup:
 * - Rounded container with subtle blue border
 * - Top row: 0X / CATEGORY in cyan tracking + • Commercial Standard pill
 * - Left column: Previous approach pill + tight editorial headline + crisp description + feature badges with cyan dots
 * - Right column: 16:10 framed visual
 */
interface StandardStackCardProps {
  item: CommercialStandardItem;
  idx: number;
  total: number;
  originalIdx: number;
}

const StandardStackCard: React.FC<StandardStackCardProps> = ({ item, idx, total, originalIdx }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const VisualComponent = COMPARISON_VISUALS[item.visualIndex];
  const reduce = useReducedMotion();

  // Scroll tracking on each card to compute the signature reversing/stacking transition
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'start 15%'],
  });

  // Reversing effect: card starts scale 0.98, reaches 1 when pinned, then dims slightly as next card covers
  const cardScale = useTransform(scrollYProgress, [0, 0.6, 1], [reduce ? 1 : 0.97, 1, 1]);
  const cardOpacity = useTransform(scrollYProgress, [0, 0.4], [reduce ? 1 : 0.6, 1]);

  // Progressive sticky top offset on desktop so cards snap with elegant tab visibility
  const topOffset = `${5 + idx * 0.75}rem`;

  return (
    <motion.div
      ref={cardRef}
      style={{
        zIndex: 10 + idx,
        scale: cardScale,
        opacity: cardOpacity,
        ['--stack-top' as any]: topOffset,
      }}
      className="relative lg:sticky lg:top-[var(--stack-top)] mb-6 sm:mb-8 lg:mb-10 w-full will-change-transform transition-all duration-300"
    >
      <div className="relative overflow-hidden rounded-[1.75rem] sm:rounded-[2.25rem] border border-[#2563EB]/35 bg-gradient-to-br from-[#17213B]/98 via-[#131B31]/98 to-[#10182F]/98 p-6 sm:p-9 lg:p-11 shadow-[0_20px_50px_rgba(11,16,32,0.85),0_0_0_1px_rgba(56,189,248,0.1)] backdrop-blur-xl">
        {/* Subtle top interior rim reflection */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#38BDF8]/40 to-transparent"
          aria-hidden="true"
        />

        {/* 1. Card Top Bar: 0X / CATEGORY + Commercial Standard Pill */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#2563EB]/25 pb-4 sm:pb-5">
          <div className="inline-flex items-center gap-2.5">
            <span className="font-mono text-xs sm:text-sm font-bold text-[#38D9F5]">
              0{originalIdx + 1}
            </span>
            <span className="text-[#3B82F6]/60 font-mono text-xs">/</span>
            <span className="font-mono text-[11px] sm:text-xs font-bold uppercase tracking-[0.22em] text-[#38D9F5]">
              {item.category}
            </span>
          </div>

          {/* Pill Badge with cyan indicator dot (Reference design) */}
          <div className="inline-flex items-center gap-2 rounded-full border border-[#2563EB]/40 bg-[#10182F]/80 px-3.5 py-1 text-xs font-mono text-[#F8FAFC] shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[#38D9F5] shadow-[0_0_8px_#38D9F5]" />
            <span>Commercial Standard</span>
          </div>
        </div>

        {/* 2. Main Card Content: Left Editorial Hierarchy, Right Visual Container */}
        <div className="mt-6 sm:mt-8 grid gap-8 lg:grid-cols-12 lg:items-center">
          {/* Left Column (7 cols): Eyebrow comparison, Headline, Body, Feature Badges */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-4 sm:space-y-5">
            {/* Previous Approach Bar */}
            <div className="inline-flex flex-wrap items-center gap-2 rounded-xl border border-[#334155]/60 bg-[#10182F]/90 px-3.5 py-2 text-xs sm:text-[13px] text-[#94A3B8]">
              <span className="shrink-0 font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
                PREVIOUS APPROACH:
              </span>
              <span className="text-[#94A3B8] font-normal leading-snug">
                {item.friction}
              </span>
            </div>

            {/* Main Headline: Bold, refined, controlled line height */}
            <h3 className="font-display text-2xl sm:text-3xl lg:text-[2.1rem] font-bold leading-[1.18] tracking-[-0.02em] text-[#F8FAFC]">
              {item.title}
            </h3>

            {/* Supporting Description: Controlled width, cool slate typography */}
            <p className="max-w-xl font-sans text-sm sm:text-base leading-relaxed text-[#B8C4D9]">
              {item.description}
            </p>

            {/* Feature Badges: Pill-shaped with cyan dots (Reference design) */}
            <div className="flex flex-wrap items-center gap-2.5 pt-2">
              {item.deliverables.map((label) => (
                <div
                  key={label}
                  className="inline-flex items-center gap-2 rounded-full border border-[#2563EB]/40 bg-[#10182F] hover:bg-[#16213D] px-3.5 py-1.5 text-xs font-mono font-medium text-[#F8FAFC] transition-colors duration-200"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#38D9F5] shadow-[0_0_6px_#38D9F5]" />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column (5 cols): Visual Container */}
          <div className="lg:col-span-5">
            {VisualComponent && (
              <div className="overflow-hidden rounded-2xl border border-[#2563EB]/30 bg-[#10182F] p-1.5 shadow-[0_12px_36px_rgba(0,0,0,0.5)]">
                <VisualComponent />
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/**
 * The Vyral Bee Standard — Less agency friction. More results.
 * Redesigned with:
 * - Scroll-snapping stacked cards architecture (inspired by scroll-snapping-cards.webflow.io)
 * - Refined editorial typography and compact pill badges with cyan dots (inspired by reference image)
 * - Removed 3D tilt/curved distortion
 * - Tightened section padding and eliminated dead space before CTA button
 */
export const WhyChooseUs: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const phone = useMediaQuery('(max-width: 767px)');
  const [activeTab, setActiveTab] = useState('all');

  // Filter cards based on selected pillar while preserving all original items
  const filteredItems = COMMERCIAL_STANDARDS.map((item, originalIdx) => ({
    ...item,
    originalIdx,
  })).filter((item) => {
    if (activeTab === 'all') return true;
    const pillar = PILLARS.find((p) => p.id === activeTab);
    return pillar?.indices?.includes(item.originalIdx) ?? true;
  });

  return (
    <section
      ref={sectionRef}
      id="why-choose-us"
      aria-label="The Vyral Bee Commercial Standard"
      className="relative overflow-hidden bg-[#0C0D12] py-16 sm:py-20 lg:py-24 text-[#F8FAFC]"
    >
      {/* Ambient Atmospheric Lighting Cones */}
      <div
        className="pointer-events-none absolute left-1/2 -top-40 h-[650px] w-[950px] -translate-x-1/2 rounded-full bg-gradient-to-b from-[#2563EB]/14 via-[#38D9F5]/6 to-transparent blur-[160px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-32 top-1/3 h-[550px] w-[550px] rounded-full bg-[#2563EB]/10 blur-[140px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-32 bottom-20 h-[500px] w-[500px] rounded-full bg-[#38D9F5]/8 blur-[140px]"
        aria-hidden="true"
      />

      <div className="shell relative z-10 max-w-7xl">
        {/* ===================================================================
            1. EDITORIAL HEADER & HIGH-CONTRAST TYPOGRAPHY
            =================================================================== */}
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-14">
          {/* Main Headline Zone (7 cols) */}
          <div className="lg:col-span-7">
            {/* Eyebrow with cyan dot */}
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#2563EB]/40 bg-[#17213B] px-3.5 py-1.5 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#38D9F5] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#38D9F5] shadow-[0_0_8px_rgba(56,217,245,0.9)]" />
              </span>
              <span className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-[#38D9F5]">
                THE VYRAL BEE STANDARD
              </span>
            </div>

            {/* Main Statement */}
            <h2 className="font-display text-[clamp(2.4rem,5vw,4.5rem)] font-bold leading-[1.02] tracking-tight text-[#F8FAFC]">
              <span className="block">Less agency friction.</span>
              <span className="block mt-1.5 font-serif-display font-light italic bg-gradient-to-r from-[#FFFFFF] via-[#F8FAFC] to-[#38D9F5] bg-clip-text text-transparent drop-shadow-[0_2px_24px_rgba(37,99,235,0.35)]">
                More commercial results.
              </span>
            </h2>
          </div>

          {/* Supporting Statement Zone (5 cols) */}
          <div className="lg:col-span-5 lg:pb-2">
            <p className="font-sans text-base sm:text-lg leading-relaxed text-[#B8C4D9] max-w-[42ch]">
              A transparent commercial standard engineered to eliminate agency clutter, fragmented freelancers, and vanity metrics.
            </p>
            {/* Upgraded Commercial Badges */}
            <div className="mt-5 flex flex-wrap items-center gap-2.5 text-xs font-mono">
              <div className="flex items-center gap-1.5 rounded-full border border-[#2563EB]/35 bg-[#17213B] px-3 py-1 text-[#F8FAFC]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#38D9F5]" />
                <span>Full-Service Alignment</span>
              </div>
              <div className="flex items-center gap-1.5 rounded-full border border-[#2563EB]/35 bg-[#17213B] px-3 py-1 text-[#F8FAFC]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#38D9F5]" />
                <span>Transparent Roadmap</span>
              </div>
              <div className="flex items-center gap-1.5 rounded-full border border-[#2563EB]/35 bg-[#17213B] px-3 py-1 text-[#F8FAFC]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#38D9F5]" />
                <span>1 Dedicated Strategist</span>
              </div>
            </div>
          </div>
        </div>

        {/* ===================================================================
            2. PILLAR FILTER CONTROLS
            =================================================================== */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-b border-[#2563EB]/25 pb-5 sm:mt-12">
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-2 hidden text-xs font-mono uppercase tracking-wider text-[#64748B] sm:inline-block">
              Filter By Pillar:
            </span>
            {PILLARS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`group relative flex items-center gap-2 rounded-full px-4 py-2 text-xs sm:text-[13px] font-sans font-medium transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] ${
                    isActive ? 'text-white font-semibold' : 'text-[#94A3B8] hover:text-white'
                  }`}
                >
                  {/* Fluid Spring Active Indicator Pill */}
                  {isActive && (
                    <motion.div
                      layoutId="activePillarStandardTab"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      className="absolute inset-0 rounded-full bg-[#2563EB] shadow-[0_0_20px_rgba(37,99,235,0.35)]"
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                  <span
                    className={`relative z-10 rounded-full px-1.5 py-0.2 text-[10px] font-mono transition-colors ${
                      isActive ? 'bg-white/20 text-white' : 'bg-white/5 text-[#64748B] group-hover:text-white'
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Section Indicator Counter */}
          <div className="flex items-center gap-2 text-xs font-mono text-[#F8FAFC]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#38D9F5] shadow-[0_0_6px_#38D9F5]" />
            <span>Showing {filteredItems.length} of {COMMERCIAL_STANDARDS.length} Commercial Standards</span>
          </div>
        </div>

        {/* ===================================================================
            3. SCROLL-SNAPPING STACKED CARDS CONTAINER
            Sticky stack cards inspired by scroll-snapping-cards.webflow.io
            With generous bottom clearance for the final card
            =================================================================== */}
        <div className="relative mt-10 sm:mt-12 pb-16 sm:pb-24 lg:pb-32">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, idx) => (
              <StandardStackCard
                key={item.id}
                item={item}
                idx={idx}
                total={filteredItems.length}
                originalIdx={item.originalIdx}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* ===================================================================
            4. BOTTOM CONVERSION ACTION (Tight Spacing, No Dead Gap)
            =================================================================== */}
        <div className="mt-10 sm:mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Magnetic>
            <Link
              to="/contact"
              className="group relative inline-flex h-14 items-center justify-center gap-3 overflow-hidden rounded-full border border-white/20 bg-gradient-to-r from-[#2563EB] to-[#0284C7] px-8 text-base font-bold text-white shadow-[0_4px_24px_rgba(37,99,235,0.45),inset_0_1px_1px_rgba(255,255,255,0.4)] backdrop-blur-md transition-all duration-300 hover:scale-[1.02] hover:border-[#38BDF8] hover:shadow-[0_8px_36px_rgba(56,189,248,0.65)] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#38BDF8]"
            >
              <span className="relative z-10">Start a conversation</span>
              <ArrowRight className="relative z-10 h-5 w-5 text-white transition-transform duration-300 group-hover:translate-x-1" />
              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
            </Link>
          </Magnetic>
          <span className="text-xs font-sans text-[#64748B]">
            No long contracts · Transparent milestone pricing · Direct WhatsApp line
          </span>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
