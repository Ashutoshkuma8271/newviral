import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Play,
  Volume2,
  VolumeX,
} from 'lucide-react';
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from 'framer-motion';
import { HERO_SLIDES, MARQUEE_ITEMS } from '../constants/content.ts';
import { Marquee } from './Marquee.tsx';
import { Magnetic } from './common/Magnetic.tsx';
import { useMediaQuery } from '../lib/motion.ts';

const SLIDE_MS = 7000;
const EASE = [0.16, 1, 0.3, 1] as const;

// High-definition cinematic background videos (5 unique non-duplicate videos cycling continuously)
const FULLWIDTH_HERO_VIDEOS = [
  {
    id: 'gemini-hero-video',
    src: '/video/hero-gemini-video.mp4',
    poster: '/video/hero-poster.png',
    badge: 'CINEMATIC 3D ENGINE',
    label: '4K Creative Production',
  },
  {
    id: 'banner-2-3d',
    src: '/video/banner-2.mp4',
    poster: '/video/banner-2.png',
    badge: '3D BRAND ARCHITECTURE',
    label: 'Bespoke Visual Identity',
  },
  {
    id: 'banner-3-reels',
    src: '/video/banner-3.mp4',
    poster: '/video/banner-3.png',
    badge: 'VIRAL REELS & ALGORITHM',
    label: 'High-Retention Video',
  },
  {
    id: 'banner-4-motion',
    src: '/video/banner-4.mp4',
    poster: '/video/banner-4.png',
    badge: 'MOTION & CREATIVE TECH',
    label: 'Dynamic Interactive Studio',
  },
  {
    id: 'banner-next-growth',
    src: '/video/banner-next-growth.mp4',
    poster: '/video/banner-1.png',
    badge: 'FULL-FUNNEL GROWTH ENGINE',
    label: 'Precision Client Acquisition',
  },
];

// Outgoing copy fades gracefully; incoming copy rises smoothly with minimal delay
const copyVariants: Variants = {
  show: { opacity: 1, transition: { duration: 0.45, ease: EASE, staggerChildren: 0.03, delayChildren: 0.05 } },
  hide: { opacity: 0, transition: { duration: 0.35, ease: EASE } },
};
const fadeUpVariants: Variants = {
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
  hide: { opacity: 0, y: -8, transition: { duration: 0.3, ease: EASE } },
};

export const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const count = HERO_SLIDES.length;
  const videoCount = FULLWIDTH_HERO_VIDEOS.length;

  const [active, setActive] = useState(0);
  const [videoIdx, setVideoIdx] = useState(0);
  const [prevVideoIdx, setPrevVideoIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [hoverPaused, setHoverPaused] = useState(false);
  const [tabHidden, setTabHidden] = useState(false);

  const reduceMotion = useReducedMotion();
  const inView = useInView(sectionRef, { amount: 0.35 });
  const autoplay = !reduceMotion;
  const paused = hoverPaused || tabHidden || !inView;

  const activeRef = useRef(0);
  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  const changeTo = useCallback(
    (i: number) => {
      const target = ((i % count) + count) % count;
      if (target === activeRef.current) return;
      setActive(target);
      setPrevVideoIdx(videoIdx);
      setVideoIdx((prev) => (prev + 1) % videoCount);
    },
    [count, videoCount, videoIdx]
  );

  const nextSlide = useCallback(() => {
    changeTo(activeRef.current + 1);
  }, [changeTo]);

  const prevSlide = useCallback(() => {
    changeTo(activeRef.current - 1);
  }, [changeTo]);

  // Video and copy transition at regular intervals
  useEffect(() => {
    if (!autoplay || paused) return;
    const timer = window.setTimeout(nextSlide, SLIDE_MS);
    return () => window.clearTimeout(timer);
  }, [active, autoplay, paused, nextSlide]);

  useEffect(() => {
    const onVisibility = () => setTabHidden(document.hidden);
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (!inView) return;
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [inView, nextSlide, prevSlide]);

  /*
   * 3D Cinematic Scroll Transitions:
   * Features dynamic zoom-in (scale 1.0 -> 1.07) during scroll, followed by smooth ease-out (-> 0.88)
   * with 3D perspective rotation (rotateX 0 -> 6deg) and subtle Z-axis depth.
   */
  const cinematic = !reduceMotion;
  const phone = useMediaQuery('(max-width: 767px)');

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });

  // Natural, smooth scroll parallax (subtle background drift without dead-scroll or black void)
  const videoY = useTransform(scrollYProgress, [0, 1], ['0%', '16%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', cinematic ? (phone ? '-6%' : '-10%') : '0%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.85], [1, cinematic ? 0.35 : 1]);

  // Ensure videos are preloaded and playing in sync
  useEffect(() => {
    videoRefs.current.forEach((v) => {
      if (v) {
        if (v.paused && isPlaying) {
          v.play().catch(() => {});
        }
      }
    });
  }, [videoIdx, isPlaying]);

  useEffect(() => {
    videoRefs.current.forEach((v) => {
      if (v) {
        v.muted = isMuted;
      }
    });
  }, [isMuted]);

  const togglePlay = () => {
    const activeVid = videoRefs.current[videoIdx];
    if (!activeVid) return;
    if (activeVid.paused) {
      videoRefs.current.forEach((v) => v?.play().catch(() => {}));
      setIsPlaying(true);
    } else {
      videoRefs.current.forEach((v) => v?.pause());
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    videoRefs.current.forEach((v) => {
      if (v) v.muted = nextMuted;
    });
  };

  const slide = HERO_SLIDES[active];

  return (
    <section
      ref={sectionRef}
      id="hero"
      aria-label="Vyral Bee digital agency"
      className="relative -mt-20 overflow-x-clip bg-[#0C0D12] text-white lg:-mt-23 min-h-svh flex flex-col justify-between"
    >
      <div className="relative flex flex-1 flex-col justify-between min-h-svh overflow-hidden">
        {/* Full-Width 3D Seamless Cross-Dissolve Video Backdrop with Smooth Parallax Drift */}
        <motion.div style={{ y: videoY }} className="absolute inset-0 will-change-transform overflow-hidden bg-[#0C0D12] scale-105">
            {FULLWIDTH_HERO_VIDEOS.map((vid, idx) => {
              const isCurrent = idx === videoIdx;
              const isPrev = idx === prevVideoIdx && idx !== videoIdx;
              return (
                <div
                  key={vid.id}
                  className={`absolute inset-0 h-full w-full transition-opacity duration-1000 ease-in-out ${
                    isCurrent
                      ? 'z-[2] opacity-100'
                      : isPrev
                      ? 'z-[1] opacity-100 pointer-events-none'
                      : 'z-0 opacity-0 pointer-events-none'
                  }`}
                  aria-hidden={!isCurrent}
                >
                  <video
                    ref={(el) => {
                      videoRefs.current[idx] = el;
                    }}
                    src={vid.src}
                    poster={vid.poster}
                    autoPlay
                    muted={isMuted}
                    loop
                    playsInline
                    preload="auto"
                    className="h-full w-full object-cover"
                    style={{
                      filter: 'brightness(0.85) contrast(1.08)',
                    }}
                  />
                </div>
              );
            })}
          </motion.div>

          {/* Enhanced Scrim Layers for Crisp 100% Text Readability & Rich Neutral Ambience */}
          <div className="absolute inset-0 z-[2] bg-gradient-to-b from-[#0C0D12]/92 via-[#0C0D12]/70 to-[#0C0D12]/92 lg:bg-gradient-to-r lg:from-[#0C0D12]/95 lg:via-[#0C0D12]/75 lg:to-[#0C0D12]/35" />
          <div className="absolute inset-x-0 top-0 z-[2] h-44 bg-gradient-to-b from-[#0C0D12] via-[#0C0D12]/70 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 z-[2] h-48 bg-gradient-to-t from-[#0C0D12] via-[#0C0D12]/80 to-transparent" />
          {/* Dedicated soft text backing bloom */}
          <div className="pointer-events-none absolute -left-16 top-1/4 z-[2] h-[550px] w-[650px] rounded-full bg-[#0C0D12]/85 blur-3xl" />
          <div className="hero-vignette pointer-events-none absolute inset-0 z-[3]" aria-hidden="true" />

          {/* Subtle Architectural Grid Lines */}
          <div className="pointer-events-none absolute inset-0 z-[3] grid grid-cols-3 opacity-[0.06]" aria-hidden="true">
            <div className="border-r border-white" />
            <div className="border-r border-white" />
            <div />
          </div>

          {/* Foreground Stage: Editorial Typographic Composition */}
          <motion.div
            style={{ y: contentY, opacity: contentOpacity }}
            className="shell relative z-10 flex flex-1 flex-col justify-center pb-8 pt-24 lg:pb-12 lg:pt-28"
          >
            <div className="max-w-3xl flex flex-col items-center text-center lg:items-start lg:text-left">
              <h1 className="sr-only">
                Vyral Bee, a creative digital agency for social media, design, video, websites and ads
              </h1>

              {/* Availability Status Pill */}
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: EASE }}
                className="mb-4 inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-[#171822]/90 px-4 py-1.5 shadow-[0_4px_24px_rgba(0,0,0,0.7)] backdrop-blur-md transition-colors hover:border-[#F59E0B]/50"
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#F59E0B] opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#F59E0B]" />
                </span>
                <span className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-white">
                  ACCEPTING BRANDS FOR Q2 • FAST-TRACK ONBOARDING
                </span>
              </motion.div>

              {/* Slides Container */}
              <div className="grid w-full" aria-live={paused ? 'polite' : 'off'}>
                {HERO_SLIDES.map((s, i) => {
                  const isActive = i === active;
                  const words = [s.lead, s.accent, s.tail].filter(Boolean).join(' ').split(' ');
                  return (
                    <motion.div
                      key={s.id}
                      aria-hidden={!isActive}
                      variants={reduceMotion ? undefined : copyVariants}
                      initial={reduceMotion || i === 0 ? false : 'hide'}
                      animate={isActive ? 'show' : 'hide'}
                      style={reduceMotion ? { opacity: isActive ? 1 : 0 } : undefined}
                      className={`col-start-1 row-start-1 self-start ${isActive ? '' : 'pointer-events-none'}`}
                    >
                      {/* Service Discipline Badge */}
                      <motion.div variants={fadeUpVariants} className="inline-flex items-center gap-2">
                        <span className="relative flex h-2 w-2">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#F59E0B] opacity-75" />
                          <span className="relative inline-flex h-2 w-2 rounded-full bg-[#F59E0B]" />
                        </span>
                        <span className="text-sm font-bold uppercase tracking-[0.18em] text-[#F59E0B] drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)] lg:text-base">
                          {s.label}
                        </span>
                      </motion.div>

                      {/* Fluid Headline with Animated Liquid Gold Shimmer Accent */}
                      <p className="text-on-photo mx-auto mt-3 max-w-[15ch] font-display text-fluid-hero font-bold text-white drop-shadow-[0_4px_28px_rgba(0,0,0,0.95)] sm:max-w-[16ch] lg:mx-0">
                        <span className="sr-only">{words.join(' ')}</span>
                        <span aria-hidden="true">
                          {s.lead}{' '}
                          <span className="font-editorial font-normal italic text-shimmer-pure text-[1.12em] tracking-normal drop-shadow-[0_0_24px_rgba(245,158,11,0.55)]">
                            {s.accent}
                          </span>{' '}
                          {s.tail}
                        </span>
                      </p>

                      {/* Description with High Contrast Pure Visibility */}
                      <motion.p
                        variants={fadeUpVariants}
                        className="mx-auto mt-4 max-w-xl text-base font-normal leading-relaxed text-[#CBD5E1] drop-shadow-[0_2px_14px_rgba(0,0,0,0.95)] sm:text-lg lg:mx-0 lg:mt-6 lg:text-xl lg:leading-relaxed"
                      >
                        {s.description}
                      </motion.p>
                    </motion.div>
                  );
                })}
              </div>

              {/* Call To Action Buttons — Ultra-Premium Curated Styling */}
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.25, ease: EASE }}
                className="mt-7 flex w-full flex-col gap-3.5 sm:w-auto sm:flex-row sm:gap-4 lg:mt-8"
                onMouseEnter={() => setHoverPaused(true)}
                onMouseLeave={() => setHoverPaused(false)}
                onFocus={() => setHoverPaused(true)}
                onBlur={() => setHoverPaused(false)}
              >
                {/* Primary Button: Radiant Honey Amber with Specular Rim & Dark Ink Typography */}
                <Magnetic className="flex w-full sm:w-auto">
                  <Link
                    to="/contact"
                    className="group relative inline-flex h-14 w-full items-center justify-between overflow-hidden rounded-full border border-amber-300/30 bg-gradient-to-r from-[#F59E0B] via-[#EAB308] to-[#D97706] py-2 pl-7 pr-3 text-[15px] font-bold text-[#0C0D12] shadow-[0_4px_24px_rgba(245,158,11,0.45),inset_0_1px_1px_rgba(255,255,255,0.6)] backdrop-blur-md transition-all duration-300 ease-out hover:scale-[1.02] hover:border-amber-200 hover:shadow-[0_8px_36px_rgba(245,158,11,0.65),inset_0_1px_1px_rgba(255,255,255,0.8)] active:scale-[0.98] sm:w-[20.5rem]"
                  >
                    <span className="relative z-10 tracking-[-0.01em] drop-shadow-sm font-bold">Get a free strategy call</span>
                    <span className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0C0D12]/20 text-[#0C0D12] backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-[#0C0D12] group-hover:text-[#F59E0B]">
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </span>
                    <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
                  </Link>
                </Magnetic>

                {/* Secondary Button: Smoked Titanium with Responsive Hover Elevation */}
                <Link
                  to="/services"
                  className="group relative inline-flex h-14 items-center justify-between overflow-hidden rounded-full border border-white/15 bg-[#171822]/85 py-2 pl-6 pr-3.5 text-[15px] font-semibold text-white shadow-[0_4px_20px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.12)] backdrop-blur-xl transition-all duration-300 ease-out hover:border-[#F59E0B]/70 hover:bg-[#202230] hover:text-white hover:scale-[1.02] hover:shadow-[0_6px_28px_rgba(245,158,11,0.30),inset_0_1px_1px_rgba(255,255,255,0.2)] active:scale-[0.98] sm:w-[20.5rem]"
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <span className="font-brush text-lg text-[#F59E0B] drop-shadow-[0_0_8px_rgba(245,158,11,0.6)] leading-none transition-transform duration-300 group-hover:scale-110">
                      ~
                    </span>
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.span
                        key={slide.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.25, ease: EASE }}
                        className="truncate text-[#E2E8F0] tracking-[-0.01em] transition-colors group-hover:text-white"
                      >
                        Explore {slide.label}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-white/80 border border-white/10 transition-all duration-300 group-hover:scale-105 group-hover:border-[#F59E0B]/60 group-hover:bg-[#F59E0B] group-hover:text-[#0C0D12]">
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                  <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* Service Ticker Marquee — Smooth High-Visibility Ribbon Connecting Into Next Section */}
          <Marquee items={MARQUEE_ITEMS} className="relative z-10 shrink-0" />
        </div>
      </section>
    );
  };

export default Hero;
