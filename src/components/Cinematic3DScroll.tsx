import React, { useCallback, useEffect, useId, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Compass,
  Eye,
  Flame,
  Layers,
  Maximize2,
  Play,
  RotateCcw,
  TrendingUp,
  Volume2,
  VolumeX,
  Zap,
} from 'lucide-react';
import { HERO_VIDEO_BANNERS, type HeroVideoBanner } from '../constants/content.ts';
import { BorderBeam } from './common/BorderBeam.tsx';
import { ShimmerButton } from './common/ShimmerButton.tsx';
import { Spotlight } from './common/Spotlight.tsx';
import { useMediaQuery, useRamp } from '../lib/motion.ts';

const EASE = [0.16, 1, 0.3, 1] as const;

export const Cinematic3DScroll: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduceMotion = useReducedMotion();
  const isMobile = useMediaQuery('(max-width: 767px)');
  const isTablet = useMediaQuery('(max-width: 1023px)');

  const [activeBannerIdx, setActiveBannerIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const activeBanner: HeroVideoBanner = HERO_VIDEO_BANNERS[activeBannerIdx] || HERO_VIDEO_BANNERS[0];
  const count = HERO_VIDEO_BANNERS.length;

  const nextBanner = useCallback(() => {
    setActiveBannerIdx((prev) => (prev + 1) % count);
  }, [count]);

  const prevBanner = useCallback(() => {
    setActiveBannerIdx((prev) => (prev - 1 + count) % count);
  }, [count]);

  // Keyboard navigation for slider
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextBanner();
      if (e.key === 'ArrowLeft') prevBanner();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextBanner, prevBanner]);

  // Scroll Progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // 3D Cinematic Scroll Transitions:
  // Phase 1 (0 -> 0.45): Dramatic Zoom In from deep space into camera focus
  // Phase 2 (0.45 -> 0.75): Center stage immersion & left/right slide parallax
  // Phase 3 (0.75 -> 1.0): Smooth zoom out & settle into next section
  const stageScale = useTransform(
    scrollYProgress,
    [0, 0.45, 0.75, 1],
    [isMobile ? 0.92 : 0.86, isMobile ? 1.04 : 1.14, isMobile ? 1.02 : 1.08, 0.95]
  );

  const stageRotateX = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [isMobile ? 6 : 12, 0, isMobile ? -4 : -8]
  );

  const stageZ = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [isMobile ? -80 : -180, isMobile ? 30 : 90, isMobile ? -40 : -90]
  );

  // Left and Right Slide Parallax Tracks
  const leftSlideX = useTransform(scrollYProgress, [0, 1], ['5%', isMobile ? '-40%' : '-55%']);
  const rightSlideX = useTransform(scrollYProgress, [0, 1], ['-50%', isMobile ? '5%' : '18%']);

  // Dynamic telemetry depth indicators
  const depthValue = useTransform(scrollYProgress, (v) => `${Math.round(v * 100)}%`);
  const zoomDisplay = useTransform(stageScale, (s) => `${s.toFixed(2)}x`);

  // Mouse tilt on centerpiece
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduceMotion || isMobile) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  const cardRotateX = useSpring(mousePos.y * -16, { stiffness: 120, damping: 20 });
  const cardRotateY = useSpring(mousePos.x * 20, { stiffness: 120, damping: 20 });

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  if (reduceMotion) {
    return (
      <section id="cinematic" aria-label="Cinematic 3D Showcase" className="bg-[#0C0D12] py-24 text-white sm:py-32">
        <div className="shell max-w-6xl">
          <div className="flex flex-col items-center text-center">
            <span className="inline-flex items-center rounded-full border border-accent/40 bg-accent/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-accent">
              Cinematic Growth Architecture
            </span>
            <h2 className="mt-6 font-display text-fluid-h2 font-semibold">
              Engineered Virality, Driven by <span className="text-shimmer-pure">3D Precision</span>.
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-[#CBD5E1]">{activeBanner.description}</p>
          </div>
          <div className="mt-12 overflow-hidden rounded-3xl border border-white/10 bg-[#171822] p-4">
            <div className="relative aspect-video overflow-hidden rounded-2xl">
              <video
                src={activeBanner.video}
                poster={activeBanner.poster}
                controls
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={containerRef}
      id="cinematic-stage"
      aria-label="3D Cinematic Experience"
      className="relative bg-[#0C0D12] text-white select-none h-[270svh] sm:h-[300svh]"
    >
      {/* Sticky 3D Perspective Chamber */}
      <div className="sticky top-0 h-svh w-full overflow-hidden flex flex-col justify-between [perspective:1400px]">
        {/* Background Atmospheric Glow & Grid */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[680px] w-[880px] rounded-full bg-[#F59E0B]/[0.06] blur-[160px]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
        </div>

        {/* Top Telemetry Header */}
        <div className="relative z-30 pt-4 sm:pt-6 px-4 sm:px-8">
          <div className="shell flex items-center justify-between">
            {/* Left Status Badge */}
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-[#171822]/90 px-3.5 py-1.5 shadow-[0_4px_24px_rgba(0,0,0,0.6)] backdrop-blur-xl">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              <span className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-white/90">
                CINEMATIC 3D ENGINE • ACTIVE
              </span>
            </div>

            {/* Right Interactive Depth Telemetry Gauge */}
            <div className="hidden sm:flex items-center gap-4 text-[11px] font-mono tracking-wider text-white/60">
              <div className="flex items-center gap-2 rounded-full border border-border/60 bg-surface/40 px-3 py-1">
                <Compass className="h-3 w-3 text-accent" />
                <span>ZOOM:</span>
                <motion.span className="font-semibold text-accent">{zoomDisplay}</motion.span>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-border/60 bg-surface/40 px-3 py-1">
                <Layers className="h-3 w-3 text-accent" />
                <span>SCROLL DEPTH:</span>
                <motion.span className="font-semibold text-white">{depthValue}</motion.span>
              </div>
            </div>
          </div>
        </div>

        {/* 3D Cinematic Pinned World (Zooms In and Out on Scroll) */}
        <motion.div
          style={{
            scale: stageScale,
            rotateX: stageRotateX,
            z: stageZ,
            transformStyle: 'preserve-3d',
          }}
          className="relative z-10 my-auto flex w-full flex-col items-center justify-center will-change-transform"
        >
          {/* TRACK 1: Top Rail — Glides to the LEFT on scroll */}
          <motion.div
            style={{ x: leftSlideX }}
            className="pointer-events-none mb-3 sm:mb-5 flex items-center gap-4 sm:gap-6 whitespace-nowrap will-change-transform opacity-75 sm:opacity-90"
            aria-hidden="true"
          >
            <div className="flex items-center gap-3 rounded-2xl border border-[#334155]/80 bg-[#161F36]/90 px-4 sm:px-5 py-2.5 backdrop-blur-md shadow-lg">
              <TrendingUp className="h-4 w-4 text-accent" />
              <span className="text-xs sm:text-sm font-semibold tracking-wide text-white">4.8x Meta ROAS Scaled</span>
              <span className="rounded-full bg-primary/20 px-2 py-0.5 text-[10px] font-bold text-accent">+380% Lift</span>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-accent/40 bg-accent/15 px-4 sm:px-5 py-2.5 backdrop-blur-md shadow-[0_0_24px_rgba(56,189,248,0.25)]">
              <Flame className="h-4 w-4 text-accent" />
              <span className="text-xs sm:text-sm font-bold tracking-wide text-white">20M+ Viral Reel Views</span>
              <span className="rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-bold text-white">Organic Reach</span>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-[#334155]/80 bg-[#161F36]/90 px-4 sm:px-5 py-2.5 backdrop-blur-md shadow-lg">
              <Zap className="h-4 w-4 text-accent" />
              <span className="text-xs sm:text-sm font-semibold tracking-wide text-white">Conversion Architecture</span>
              <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-400">Zero Fluff</span>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-[#334155]/80 bg-[#161F36]/90 px-4 sm:px-5 py-2.5 backdrop-blur-md shadow-lg">
              <Eye className="h-4 w-4 text-accent" />
              <span className="text-xs sm:text-sm font-semibold tracking-wide text-white">Thumb-Stopping Hooks</span>
            </div>
          </motion.div>

          {/* MASTER CENTERPIECE: 21st.dev Style 3D Pin & Spotlight Card */}
          <div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="group relative z-20 w-[94vw] max-w-[820px] transition-transform duration-200 [perspective:1000px]"
          >
            <motion.div
              style={{
                rotateX: cardRotateX,
                rotateY: cardRotateY,
                transformStyle: 'preserve-3d',
              }}
              className="relative overflow-hidden rounded-3xl border border-[#334155]/80 bg-[#161F36]/95 p-3 sm:p-5 shadow-[0_24px_80px_rgba(0,0,0,0.85)] backdrop-blur-2xl transition-all duration-300 hover:border-accent/60 hover:shadow-[0_0_60px_rgba(56,189,248,0.25)]"
            >
              {/* 21st.dev Animated Border Beam */}
              <BorderBeam size={260} duration={7} colorFrom="#2563EB" colorTo="#38BDF8" />

              {/* Cursor Spotlight Glow */}
              <Spotlight size={360} color="rgba(37, 99, 235, 0.25)" />

              {/* Card Header Bar with Interactive Badges */}
              <div className="mb-3 sm:mb-4 flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                  <span className="flex h-2.5 w-2.5 rounded-full bg-accent" />
                  <span className="font-display text-sm sm:text-base font-semibold tracking-wide text-white">
                    {activeBanner.label}
                  </span>
                  <span className="hidden xs:inline-block rounded-md border border-border/80 bg-surface/50 px-2 py-0.5 text-[10px] font-bold tracking-widest text-accent uppercase">
                    {activeBanner.badge}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {/* Slide index indicators */}
                  <span className="font-mono text-xs text-white/50">
                    <span className="font-bold text-accent">0{activeBannerIdx + 1}</span> / 0{count}
                  </span>

                  {/* Audio Toggle */}
                  <button
                    type="button"
                    onClick={toggleMute}
                    aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                    className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-border/60 bg-surface/40 text-white/70 transition-colors hover:border-accent/40 hover:text-white"
                  >
                    {isMuted ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5 text-accent" />}
                  </button>

                  {/* Play/Pause Toggle */}
                  <button
                    type="button"
                    onClick={togglePlay}
                    aria-label={isPlaying ? 'Pause video' : 'Play video'}
                    className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-border/60 bg-surface/40 text-white/70 transition-colors hover:border-accent/40 hover:text-white"
                  >
                    {isPlaying ? <span className="text-xs">❚❚</span> : <Play className="h-3.5 w-3.5 fill-current" />}
                  </button>
                </div>
              </div>

              {/* Video Viewport with Holographic Aspect Frame */}
              <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-black">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeBanner.id}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.45, ease: EASE }}
                    className="absolute inset-0 h-full w-full"
                  >
                    <video
                      ref={videoRef}
                      src={activeBanner.video}
                      poster={activeBanner.poster}
                      autoPlay
                      muted={isMuted}
                      loop
                      playsInline
                      className="h-full w-full object-cover"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Ambient Scrim & Vignette */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30" />

                {/* Floating Metric Pill Overlay */}
                <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 z-10 flex flex-wrap items-center gap-2">
                  <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#171822]/90 px-3 py-1.5 backdrop-blur-md">
                    <span className="font-display text-lg sm:text-2xl font-bold text-[#F59E0B]">
                      {activeBanner.stat}
                    </span>
                    <span className="text-[11px] sm:text-xs text-[#CBD5E1] leading-tight">
                      {activeBanner.statLabel}
                    </span>
                  </div>
                </div>

                {/* Floating Controls: Left and Right Slider Arrows */}
                <div className="absolute inset-y-0 inset-x-2 flex items-center justify-between pointer-events-none z-10">
                  <button
                    type="button"
                    onClick={prevBanner}
                    aria-label="Previous showcase video"
                    className="pointer-events-auto flex h-10 w-10 sm:h-12 sm:w-12 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-[#171822]/90 text-white shadow-lg backdrop-blur-md transition-all hover:scale-110 hover:border-amber-400 hover:bg-[#F59E0B] hover:text-[#0C0D12] active:scale-95"
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={nextBanner}
                    aria-label="Next showcase video"
                    className="pointer-events-auto flex h-10 w-10 sm:h-12 sm:w-12 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-[#171822]/90 text-white shadow-lg backdrop-blur-md transition-all hover:scale-110 hover:border-amber-400 hover:bg-[#F59E0B] hover:text-[#0C0D12] active:scale-95"
                  >
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Lower Details & Call-To-Action */}
              <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-1">
                <div>
                  <h3 className="font-display text-lg sm:text-xl font-semibold text-white">
                    {activeBanner.lead}{' '}
                    <span className="font-cormorant italic text-accent font-normal">
                      {activeBanner.headlineAccent}
                    </span>
                  </h3>
                  <p className="mt-0.5 line-clamp-1 max-w-lg text-xs sm:text-sm text-lavender">
                    {activeBanner.description}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Link to="/contact" className="w-full sm:w-auto">
                    <ShimmerButton className="w-full sm:w-auto py-2.5 px-5 text-xs sm:text-sm">
                      Engineer Your Growth
                      <ArrowUpRight className="h-4 w-4 text-accent" />
                    </ShimmerButton>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>

          {/* TRACK 2: Bottom Rail — Glides to the RIGHT on scroll */}
          <motion.div
            style={{ x: rightSlideX }}
            className="pointer-events-none mt-3 sm:mt-5 flex items-center gap-4 sm:gap-6 whitespace-nowrap will-change-transform opacity-75 sm:opacity-90"
            aria-hidden="true"
          >
            <div className="flex items-center gap-3 rounded-2xl border border-[#334155]/80 bg-[#161F36]/90 px-4 sm:px-5 py-2.5 backdrop-blur-md shadow-lg">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span className="text-xs sm:text-sm font-semibold tracking-wide text-white">4K Cinematic Video Production</span>
              <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-mono text-lavender">1/50s • f/1.8</span>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-accent/40 bg-accent/15 px-4 sm:px-5 py-2.5 backdrop-blur-md shadow-[0_0_24px_rgba(56,189,248,0.25)]">
              <span className="h-2 w-2 rounded-full bg-accent" />
              <span className="text-xs sm:text-sm font-bold tracking-wide text-white">Bespoke 3D Visual Identity</span>
              <span className="rounded-full bg-accent/30 px-2 py-0.5 text-[10px] font-bold text-white">Awwwards Grade</span>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-[#334155]/80 bg-[#161F36]/90 px-4 sm:px-5 py-2.5 backdrop-blur-md shadow-lg">
              <span className="text-accent font-bold">~</span>
              <span className="text-xs sm:text-sm font-semibold tracking-wide text-white">Meta & Google Performance Ads</span>
              <span className="rounded-full bg-primary/20 px-2 py-0.5 text-[10px] font-bold text-accent">ROAS First</span>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-[#334155]/80 bg-[#161F36]/90 px-4 sm:px-5 py-2.5 backdrop-blur-md shadow-lg">
              <span className="text-xs sm:text-sm font-semibold tracking-wide text-white">High-Retention Video Editing</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Interactive Navigation Strip (21st.dev Style Pill Controls) */}
        <div className="relative z-30 pb-4 sm:pb-6 px-4 sm:px-8">
          <div className="shell flex flex-col xs:flex-row items-center justify-between gap-3">
            {/* Slide Selection Buttons */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {HERO_VIDEO_BANNERS.map((banner, idx) => {
                const isCurrent = idx === activeBannerIdx;
                return (
                  <button
                    key={banner.id}
                    type="button"
                    onClick={() => setActiveBannerIdx(idx)}
                    className="flex h-9 cursor-pointer items-center gap-2 rounded-full border px-3 text-xs font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    style={{
                      borderColor: isCurrent ? '#F472B6' : 'rgba(255,255,255,0.15)',
                      backgroundColor: isCurrent ? 'rgba(56, 189, 248,0.15)' : 'rgba(255,255,255,0.03)',
                      color: isCurrent ? '#F472B6' : 'rgba(255,255,255,0.7)',
                    }}
                    aria-label={`Switch to ${banner.label}`}
                  >
                    <span
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        isCurrent ? 'w-4 bg-accent shadow-[0_0_8px_#F472B6]' : 'w-1.5 bg-white/40'
                      }`}
                    />
                    <span className="hidden sm:inline">{banner.badge}</span>
                  </button>
                );
              })}
            </div>

            {/* Scroll cue with animated indicator */}
            <div className="flex items-center gap-2 text-xs font-sans font-bold tracking-widest text-white/50 uppercase">
              <span>SCROLL TO DIVE DEEPER</span>
              <span className="animate-bounce text-accent">↓</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cinematic3DScroll;
