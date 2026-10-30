import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { BRAND, STATS } from '../constants/content.ts';
import { CountUp } from './common/CountUp.tsx';
import { Shine } from './common/Shine.tsx';
import { TiltCard } from './common/TiltCard.tsx';
import { gsap, useGSAP } from '../lib/gsap.ts';

/**
 * About Section Teaser (Home):
 * Refined editorial typography, high-contrast readable copy,
 * tactile purple CTA button, and GSAP scroll-triggered text reveal.
 */
export const About: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDListElement>(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;

      const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (isReduced) return;

      const headlineLead = container.querySelector('.about-headline-lead');
      const headlineAccent = container.querySelector('.about-headline-accent');
      const paragraph = container.querySelector('.about-paragraph');
      const cta = container.querySelector('.about-cta');
      const stats = statsRef.current;

      // Sequential Entrance Timeline for Editorial Text & CTA
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      if (headlineLead) {
        tl.fromTo(
          headlineLead,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.75, ease: 'power3.out' }
        );
      }

      if (headlineAccent) {
        tl.fromTo(
          headlineAccent,
          { opacity: 0, y: 16, scale: 0.98 },
          { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'power2.out' },
          '-=0.45'
        );
      }

      if (paragraph) {
        tl.fromTo(
          paragraph,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.65, ease: 'power2.out' },
          '-=0.4'
        );
      }

      if (cta) {
        tl.fromTo(
          cta,
          { opacity: 0, y: 14, scale: 0.98 },
          { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: 'power2.out' },
          '-=0.35'
        );
      }

      // Stats 2x2 Grid Stagger
      if (stats) {
        const statItems = stats.querySelectorAll('.stat-item');
        if (statItems.length > 0) {
          gsap.fromTo(
            statItems,
            { opacity: 0, y: 26, scale: 0.96 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              stagger: 0.08,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: stats,
                start: 'top 85%',
              },
            }
          );
        }
      }
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} id="about" className="relative bg-[#0C0D12] py-24 sm:py-32 overflow-hidden">
      {/* Background ambient lighting */}
      <div
        className="pointer-events-none absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full bg-[#F59E0B]/06 blur-[140px]"
        aria-hidden="true"
      />
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
          {/* Left Column (7 cols): Editorial Headline, Supporting Copy & Tactile CTA */}
          <div className="text-center lg:col-span-7 lg:text-left">
            {/* Main Headline: Pure White Typography with Animated Liquid Shimmer Accent */}
            <h2 className="mx-auto max-w-[26ch] text-balance font-display text-[clamp(2.35rem,4.4vw,3.85rem)] font-bold leading-[1.08] tracking-[-0.025em] text-white lg:mx-0">
              <span className="about-headline-lead block">
                One team for your social, website and ads.
              </span>
              <span className="about-headline-accent mt-2 inline-block font-serif-display font-light italic text-[1.04em] tracking-normal text-shimmer-pure drop-shadow-[0_2px_24px_rgba(245,158,11,0.45)]">
                Working as yours.
              </span>
            </h2>

            {/* Supporting Copy: High-Contrast Crisp Silver */}
            <p className="about-paragraph mx-auto mt-6 sm:mt-7 max-w-[46ch] font-sans text-base sm:text-lg lg:text-[1.125rem] font-normal leading-[1.72] text-[#CBD5E1] tracking-normal lg:mx-0">
              {BRAND.aboutCopy}
            </p>

            {/* CTA Button: Tactile amber glow with visible focus ring */}
            <div className="mt-8 flex justify-center sm:mt-9 lg:justify-start">
              <Link
                to="/about"
                className="about-cta group relative inline-flex h-12 items-center gap-2.5 rounded-full border border-amber-500/40 bg-amber-500/15 px-7 font-sans text-[15px] font-semibold tracking-wide text-white backdrop-blur-sm transition-all duration-300 ease-out hover:border-[#F59E0B] hover:bg-[#F59E0B] hover:text-[#0C0D12] hover:shadow-[0_0_24px_rgba(245,158,11,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0C0D12] active:scale-[0.98]"
              >
                <span>More about us</span>
                <ArrowUpRight
                  className="h-4 w-4 text-[#F59E0B] transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#0C0D12]"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </div>

          {/* Right Column (5 cols): 3D Extruded Stats Panel */}
          <div className="lg:col-span-5 [perspective:1200px]">
            <TiltCard max={5}>
              <div className="group relative overflow-hidden rounded-[2rem] border border-amber-500/30 bg-gradient-to-br from-[#1C1E2A]/95 via-[#14151F]/95 to-[#101118]/95 p-1.5 shadow-[0_20px_50px_rgba(8,9,14,0.85),inset_0_1px_1px_rgba(255,255,255,0.12)] backdrop-blur-xl">
                <Shine />
                <dl
                  ref={statsRef}
                  className="grid grid-cols-2 gap-2 overflow-hidden rounded-[1.75rem]"
                >
                  {STATS.map((stat, idx) => (
                    <div
                      key={stat.label}
                      className="stat-item relative overflow-hidden rounded-2xl border border-white/10 bg-[#161722]/90 p-6 sm:p-7 transition-all duration-300 hover:border-amber-400/50 hover:bg-[#1E202E] hover:shadow-[0_8px_24px_rgba(245,158,11,0.20)]"
                    >
                      <div className="flex items-center justify-between pb-2">
                        <span className="font-mono text-[10px] font-bold text-[#F59E0B] tracking-widest">
                          METRIC 0{idx + 1}
                        </span>
                        <span className="h-1.5 w-1.5 rounded-full bg-[#10B981] shadow-[0_0_8px_#10B981]" />
                      </div>
                      <dt className="sr-only">{stat.label}</dt>
                      <dd>
                        <span className="block whitespace-nowrap font-serif-display text-4xl sm:text-5xl lg:text-6xl font-light text-[#F59E0B] tracking-tight">
                          <CountUp value={stat.value} />
                        </span>
                        <span className="mt-3 block text-sm sm:text-base font-bold text-white tracking-tight">{stat.label}</span>
                        <span className="mt-1 block text-xs sm:text-sm leading-snug text-[#CBD5E1]">{stat.detail}</span>
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </TiltCard>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
