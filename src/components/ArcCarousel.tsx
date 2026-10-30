import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BorderBeam } from './common/BorderBeam.tsx';
import { gsap, ScrollTrigger, useGSAP } from '../lib/gsap.ts';

export interface ArcStandardItem {
  id: string;
  tabLabel: string;
  category: string;
  title: string;
  desc: string;
  image: string;
  badge: string;
  accent: string;
  secondaryAccent: string;
  link: string;
}

const ARC_STANDARDS: ArcStandardItem[] = [
  {
    id: 'strategy',
    tabLabel: 'Commercial Strategy',
    category: 'Commercial Focus',
    title: 'Pipeline-Driven Growth',
    desc: 'Every campaign is engineered around qualified inquiries, customer acquisition, and verified margin growth — completely removing vanity metrics from the equation.',
    image: '/images/services/growth-800.webp',
    badge: 'Verified Pipeline',
    accent: '#38BDF8',
    secondaryAccent: '#2563EB',
    link: '/services',
  },
  {
    id: 'creative',
    tabLabel: 'Senior Craft',
    category: 'Studio Leadership',
    title: 'Principal-Led Creative',
    desc: 'You collaborate directly with experienced brand directors and principal designers. No junior coordinators, no broken telephone between pitch and execution.',
    image: '/images/services/design-800.webp',
    badge: 'Senior Direction',
    accent: '#C4B5FD',
    secondaryAccent: '#8B5CF6',
    link: '/work',
  },
  {
    id: 'velocity',
    tabLabel: 'Sprint Velocity',
    category: 'Studio Agility',
    title: 'Weekly Sprint Cadence',
    desc: 'Fast 7-day studio sprint cycles that test fresh creative angles, deploy conversion pages, and adapt rapidly to viral platform shifts without bloated overhead.',
    image: '/images/services/video-800.webp',
    badge: '7-Day Sprints',
    accent: '#F59E0B',
    secondaryAccent: '#D97706',
    link: '/process',
  },
  {
    id: 'ecosystem',
    tabLabel: 'Unified System',
    category: 'Brand Harmony',
    title: 'Unified Digital Voice',
    desc: 'Your video reels, websites, and paid media planned together as one synchronized system, keeping your brand aesthetic and message cohesive across every touchpoint.',
    image: '/images/services/web-800.webp',
    badge: 'Full Parity',
    accent: '#10B981',
    secondaryAccent: '#06B6D4',
    link: '/services',
  },
];

/**
 * ArcCarousel: Scroll-Driven & Interactive 3D Arc Card Carousel
 * Inspired by Framer Arc Carousel (successful-diversity-678439.framer.app)
 *
 * Features:
 * - Scroll-driven scrub: As the user scrolls down the page, cards smoothly glide along the 3D arc (0 -> 1 -> 2 -> 3)
 * - 4 interactive category tabs with active scroll spy
 * - Authentic high-resolution editorial photography (growth, design, video, web)
 * - Human-crafted, elegant typography using Outside Boston & Satoshi
 * - Drag/swipe with mouse or touch + magnetic navigation buttons
 * - 21st.dev BorderBeam specular illumination on active card
 */
export const ArcCarousel: React.FC = () => {
  const pinSectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0); // continuous float 0 to 3
  const [activeIndex, setActiveIndex] = useState(0);
  const total = ARC_STANDARDS.length;

  // Pointer drag tracking
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef(0);
  const startProgressRef = useRef(0);

  // GSAP ScrollTrigger: Scroll-driven arc progression as page scrolls top to bottom
  useGSAP(
    () => {
      const pinSection = pinSectionRef.current;
      if (!pinSection) return;

      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduceMotion) return;

      const st = ScrollTrigger.create({
        trigger: pinSection,
        start: 'top top+=75',
        end: '+=150%',
        pin: true,
        scrub: 0.6,
        anticipatePin: 1,
        onUpdate: (self) => {
          // self.progress goes from 0 to 1
          const targetProg = self.progress * (total - 1);
          setProgress(targetProg);
          setActiveIndex(Math.min(total - 1, Math.round(targetProg)));
        },
      });

      return () => {
        st.kill();
      };
    },
    { scope: pinSectionRef }
  );

  // Direct tab / button navigation
  const goToCard = (targetIdx: number) => {
    setActiveIndex(targetIdx);
    setProgress(targetIdx);

    // If ScrollTrigger is active, scroll page smoothly to match the target card
    const pinSection = pinSectionRef.current;
    if (pinSection) {
      const st = ScrollTrigger.getById('arc-scroll') || ScrollTrigger.getAll().find((s) => s.trigger === pinSection);
      if (st) {
        const targetScroll = st.start + (targetIdx / (total - 1)) * (st.end - st.start);
        window.scrollTo({ top: targetScroll, behavior: 'smooth' });
      }
    }
  };

  // Pointer drag handlers for optional interactive swiping
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    startXRef.current = e.clientX;
    startProgressRef.current = progress;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startXRef.current;
    // 350px drag advances 1 full card
    const newProg = Math.max(0, Math.min(total - 1, startProgressRef.current - deltaX / 320));
    setProgress(newProg);
    setActiveIndex(Math.round(newProg));
  };

  const handlePointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    // Snap to nearest integer card index
    goToCard(Math.round(progress));
  };

  return (
    <div ref={pinSectionRef} className="relative w-full overflow-hidden select-none py-8">
      {/* 1. Header Row */}
      <div className="mb-8 px-2 text-center sm:text-left">
        <div className="flex items-center gap-2 justify-center sm:justify-start">
          <span className="h-1.5 w-1.5 rounded-full bg-[#38BDF8] shadow-[0_0_8px_#38BDF8]" />
          <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#38BDF8]">
            OPERATIONAL ARCHITECTURE
          </span>
        </div>
        <h3 className="mt-3 font-serif-display text-3xl sm:text-4xl lg:text-[2.65rem] font-bold text-white tracking-tight">
          How our studio{' '}
          <span className="font-['Bristy_Signature','Articullare',cursive] font-normal text-[1.28em] text-[#38BDF8] ml-1.5">
            executes every sprint.
          </span>
        </h3>
      </div>

      {/* 2. Four Full-Width Interactive Category Tabs (Fills entire horizontal space) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 w-full mb-12 px-1">
        {ARC_STANDARDS.map((card, idx) => {
          const isCurrent = idx === activeIndex;
          return (
            <button
              key={card.id}
              type="button"
              onClick={() => goToCard(idx)}
              className={`group/tab relative flex flex-col justify-between rounded-2xl p-4 sm:p-5 text-left transition-all duration-300 backdrop-blur-xl overflow-hidden w-full ${
                isCurrent
                  ? 'border border-[#38BDF8]/60 bg-gradient-to-b from-[#1E293B]/95 to-[#121B32]/95 shadow-[0_12px_30px_-8px_rgba(37,99,235,0.35),0_0_0_1px_rgba(56,189,248,0.15)]'
                  : 'border border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-white/[0.01] hover:border-white/20 hover:bg-white/[0.06]'
              }`}
            >
              {/* Active top specular rim */}
              <div
                className={`pointer-events-none absolute inset-x-0 top-0 h-px transition-opacity duration-300 ${
                  isCurrent
                    ? 'bg-gradient-to-r from-transparent via-[#38BDF8] to-transparent opacity-100'
                    : 'bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover/tab:opacity-100'
                }`}
                aria-hidden="true"
              />

              {/* Top row: Phase tracker + Status dot */}
              <div className="flex items-center justify-between w-full mb-2.5">
                <span className="font-mono text-[10px] sm:text-[10.5px] font-semibold uppercase tracking-[0.16em] text-[#64748B] group-hover/tab:text-[#94A3B8]">
                  PHASE 0{idx + 1}
                </span>
                <span className="relative flex h-2 w-2">
                  {isCurrent && (
                    <span
                      className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
                      style={{ backgroundColor: card.accent }}
                    />
                  )}
                  <span
                    className={`relative inline-flex h-2 w-2 rounded-full transition-all duration-300 ${
                      isCurrent
                        ? 'shadow-[0_0_10px_currentColor] scale-125'
                        : 'bg-[#475569] group-hover/tab:bg-[#94A3B8]'
                    }`}
                    style={isCurrent ? { backgroundColor: card.accent, color: card.accent } : undefined}
                  />
                </span>
              </div>

              {/* Tab Label */}
              <span
                className={`font-display text-sm sm:text-base font-bold tracking-tight transition-colors duration-300 ${
                  isCurrent ? 'text-white' : 'text-[#94A3B8] group-hover/tab:text-white'
                }`}
              >
                {card.tabLabel}
              </span>

              {/* Active bottom glowing indicator bar */}
              {isCurrent && (
                <motion.span
                  layoutId="activeTabGlow"
                  className="absolute bottom-0 inset-x-0 h-[2px] shadow-[0_0_10px_#38BDF8]"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${card.accent}, transparent)`,
                  }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* 3. 3D Arc Carousel Viewport Container */}
      <div
        className="relative min-h-[540px] sm:min-h-[580px] w-full flex items-center justify-center cursor-grab active:cursor-grabbing touch-pan-y [perspective:1400px]"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        {/* Ambient Chromatic Glow */}
        <div
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[340px] w-[80%] max-w-[800px] rounded-full blur-[110px] opacity-25 transition-colors duration-700"
          style={{
            background: `radial-gradient(circle at center, ${ARC_STANDARDS[activeIndex].accent}, transparent 70%)`,
          }}
          aria-hidden="true"
        />

        {/* Carousel Cards along the Arc */}
        <div className="relative w-full max-w-[1200px] h-[520px] flex items-center justify-center">
          {ARC_STANDARDS.map((card, idx) => {
            // Difference from continuous progress
            const diff = idx - progress;
            const isCurrent = Math.abs(diff) < 0.45;

            // Arc geometry
            // 1. Horizontal spacing
            const cardSpacing = 370;
            const xOffset = diff * cardSpacing;

            // 2. Parabolic Arc Droop (Y)
            const yOffset = Math.abs(diff) * 22 + Math.pow(Math.abs(diff), 1.85) * 14;

            // 3. Fanned Arc Rotation (Z)
            const rotateZ = diff * 4.5;

            // 4. Inward 3D Perspective Tilt (Y)
            const rotateY = -diff * 9;

            // 5. Scale & Opacity falloff
            const scale = Math.max(0.84, 1 - Math.abs(diff) * 0.08);
            const opacity = Math.max(0.28, 1 - Math.abs(diff) * 0.32);
            const zIndex = Math.round(30 - Math.abs(diff) * 10);

            return (
              <motion.div
                key={card.id}
                animate={{
                  x: xOffset,
                  y: yOffset,
                  rotateZ,
                  rotateY,
                  scale,
                  opacity,
                }}
                transition={{
                  type: 'spring',
                  stiffness: isDragging ? 400 : 220,
                  damping: isDragging ? 30 : 26,
                  mass: 0.8,
                }}
                style={{
                  zIndex,
                  transformOrigin: '50% 100%',
                }}
                onClick={() => {
                  if (!isCurrent) goToCard(idx);
                }}
                className={`absolute w-[310px] sm:w-[350px] md:w-[370px] rounded-3xl [transform-style:preserve-3d] transition-shadow duration-500 ${
                  isCurrent
                    ? 'shadow-[0_25px_60px_-10px_rgba(0,0,0,0.85)]'
                    : 'shadow-[0_15px_40px_-15px_rgba(0,0,0,0.7)] hover:opacity-80'
                }`}
              >
                {/* 3D Glass Surface Container */}
                <div
                  className={`group relative overflow-hidden rounded-3xl border p-5 sm:p-6 backdrop-blur-xl transition-all duration-300 ${
                    isCurrent
                      ? 'border-amber-400/50 bg-gradient-to-b from-[#222434]/95 via-[#1A1B28]/95 to-[#12131C]/98'
                      : 'border-white/10 bg-gradient-to-b from-[#1C1E2A]/85 via-[#161722]/85 to-[#101118]/90'
                  }`}
                >
                  {/* Active 21st.dev BorderBeam */}
                  {isCurrent && (
                    <BorderBeam
                      size={260}
                      duration={8}
                      colorFrom={card.accent}
                      colorTo={card.secondaryAccent}
                      borderWidth={1.5}
                    />
                  )}

                  {/* Specular Top Rim Reflection */}
                  <div
                    className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    aria-hidden="true"
                  />

                  {/* 1. Real Editorial Photography Frame (Zero AI Look) */}
                  <div className="relative mb-5 h-44 w-full overflow-hidden rounded-2xl bg-[#0C0D12]">
                    <img
                      src={card.image}
                      alt={card.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    {/* Gradient Scrim */}
                    <div
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0C0D12]/90 via-[#0C0D12]/20 to-transparent"
                      aria-hidden="true"
                    />

                    {/* Floating Studio Badge */}
                    <div className="absolute top-3 right-3 z-10 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-[#0C0D12]/80 px-2.5 py-1 text-[11px] font-mono text-white backdrop-blur-md">
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ backgroundColor: card.accent }}
                      />
                      <span>{card.badge}</span>
                    </div>
                  </div>

                  {/* 2. Category Eyebrow */}
                  <div className="flex items-center gap-2">
                    <span
                      className="font-mono text-xs font-bold uppercase tracking-[0.18em]"
                      style={{ color: card.accent }}
                    >
                      {card.category}
                    </span>
                  </div>

                  {/* 3. Editorial Headline in Outside Boston */}
                  <h4 className="mt-2 font-serif-display text-2xl sm:text-[1.65rem] font-bold tracking-tight text-white leading-tight">
                    {card.title}
                  </h4>

                  {/* 4. Human-Crafted, Simple & Professional Description */}
                  <p className="mt-2.5 font-sans text-sm sm:text-[14px] leading-relaxed text-[#CBD5E1]">
                    {card.desc}
                  </p>

                  {/* 5. Clean Action Link */}
                  <div className="mt-5 pt-3.5 border-t border-white/[0.08] flex items-center justify-between">
                    <Link
                      to={card.link}
                      className="inline-flex items-center gap-2 text-xs font-mono font-medium text-[#E2E8F0] group-hover:text-[#F59E0B] transition-colors"
                    >
                      <span>Explore methodology</span>
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[#F59E0B]" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
