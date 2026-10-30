import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Plus } from 'lucide-react';
import { PRICING_PACKAGES } from '../constants/content.ts';
import { Reveal } from './common/Reveal.tsx';
import { motion, useReducedMotion } from 'framer-motion';
import { EASE, VIEWPORT } from '../lib/motion.ts';
import { Scene3D } from './common/Scene3D.tsx';
import { TiltCard } from './common/TiltCard.tsx';
import { Shine } from './common/Shine.tsx';
import { CheckPop } from './common/CheckPop.tsx';

// One plain-English line per item, so anyone can see what they are getting.
export const PLAIN: Record<string, string> = {
  'Social Media Management': 'We run your accounts day to day.',
  'Static Posts': 'Designed image and carousel posts.',
  'Content Strategy': 'A plan for what to post, and why.',
  'Reels Production': 'Short videos made to reach new people.',
  'Ads Management': 'We run and improve your Meta and Google ads.',
  Website: 'A modern business website, built for you.',
  'Monthly Reporting': 'A clear report on what worked.',
};

// Facts already stated elsewhere on the site, shown as quick reassurance under the intro
const ASSURANCES = ['Priced to your budget', 'Move up any time', 'Reply within one working day'];

const STEPS = [
  { title: 'Book a free call', text: 'Tell us about your business and goals.' },
  { title: 'Get a plan and quote', text: 'We recommend a package and price it to your budget.' },
  { title: 'Approve and start', text: 'Say yes when you are happy, and we get going.' },
];

const Hexagon: React.FC<{ filled: boolean; dark: boolean }> = ({ filled, dark }) => (
  <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
    <path
      d="M12 2 20.66 7v10L12 22l-8.66-5V7z"
      className={
        filled
          ? dark
            ? 'fill-[#0C0D12] stroke-[#0C0D12]'
            : 'fill-[#F59E0B] stroke-[#F59E0B]'
          : dark
            ? 'fill-transparent stroke-[#0C0D12]/35'
            : 'fill-transparent stroke-white/30'
      }
      strokeWidth="1.5"
    />
  </svg>
);

/**
 * Packages page. The three plans build on each other, so each card shows "everything in the plan below, plus ..."
 * and only the new items, each with a plain-English line. No prices are shown until the owner confirms them.
 */
export const PackageTiers: React.FC = () => {
  const reduceMotion = useReducedMotion();
  const included = PRICING_PACKAGES.map((pkg) => pkg.features.filter((f) => f.included === true).map((f) => f.name));

  return (
    <section id="plans" className="relative bg-[#0C0D12] py-20 sm:py-28">
      <div className="shell">
        {/* Intro: the growing hexagons echo the plan levels on the cards below */}
        <Reveal className="mx-auto max-w-3xl text-center">
          <div className="flex items-end justify-center gap-2.5" aria-hidden="true">
            {[28, 40, 56].map((size, i) => (
              <svg key={size} viewBox="0 0 24 24" style={{ width: size, height: size }}>
                <motion.path
                  d="M12 2 20.66 7v10L12 22l-8.66-5V7z"
                  fill="#F59E0B"
                  stroke="#FBBF24"
                  strokeWidth="1.2"
                  strokeLinejoin="round"
                  initial={reduceMotion ? false : { pathLength: 0, fillOpacity: 0, strokeOpacity: 0.7 }}
                  whileInView={{ pathLength: 1, fillOpacity: [0, 0.4, 1][i], strokeOpacity: [0.6, 0.7, 1][i] }}
                  viewport={VIEWPORT}
                  transition={{ duration: 1.3, delay: 0.2 + i * 0.25, ease: EASE }}
                />
              </svg>
            ))}
          </div>
          <p className="mt-6 flex items-center justify-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#F59E0B]">
            Plans &amp; packages
            <span className="font-satisfy text-[#FBBF24] lowercase tracking-normal text-sm">— transparent tiers</span>
          </p>
          <h2 className="mt-4 text-balance font-display text-fluid-h2 font-semibold text-white">
            Not sure which <span className="font-editorial font-normal italic text-shimmer-pure text-[1.12em] drop-shadow-[0_2px_20px_rgba(245,158,11,0.45)]">to choose?</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-[#CBD5E1]">
            Start where you are. Every plan builds on the one before it, so you can move up any time.
          </p>
          <ul className="mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm font-medium text-[#CBD5E1]">
            {ASSURANCES.map((text, i) => (
              <li key={text} className="flex items-center gap-5">
                {i > 0 && <span className="h-1 w-1 rounded-full bg-[#F59E0B]" aria-hidden="true" />}
                {text}
              </li>
            ))}
          </ul>
        </Reveal>

        <Scene3D>
          <ul className="mt-16 grid gap-6 lg:mt-20 lg:grid-cols-3 lg:items-stretch lg:gap-5 xl:gap-7">
            {PRICING_PACKAGES.map((pkg, tier) => {
              const featured = pkg.popular;
              const previous = tier > 0 ? included[tier - 1] : [];
              const added = included[tier].filter((name) => !previous.includes(name));
              const addOns = pkg.features.filter((f) => f.included === 'Add-on').map((f) => f.name);

              return (
                <Reveal as="li" delay={tier * 0.1} key={pkg.name}>
                  <TiltCard max={4} className="h-full" innerClassName="h-full">
                    <article
                      className={`group relative flex h-full flex-col rounded-[32px] p-7 sm:p-9 transition-all duration-500 ease-out ${
                        featured
                          ? 'border-2 border-amber-400/50 bg-gradient-to-b from-[#222434] via-[#1A1B28] to-[#12131C] shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_40px_rgba(245,158,11,0.22),inset_0_1px_1px_rgba(255,255,255,0.2)] hover:scale-[1.02]'
                          : 'border border-white/10 bg-gradient-to-b from-[#1C1E2A]/90 via-[#161722]/95 to-[#0F1017]/95 text-white shadow-[0_12px_36px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.06)] hover:border-white/20 hover:scale-[1.01]'
                      }`}
                    >
                      <Shine />
                      {/* Level: more filled hexagons = more included */}
                      <div className="flex items-center justify-between gap-4">
                        <div
                          className="flex gap-1"
                          role="img"
                          aria-label={`Plan level ${tier + 1} of ${PRICING_PACKAGES.length}`}
                        >
                          {PRICING_PACKAGES.map((_, i) => (
                            <Hexagon key={i} filled={i <= tier} dark={false} />
                          ))}
                        </div>
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[12px] font-bold uppercase tracking-wider ${
                            featured
                              ? 'badge-pulse bg-gradient-to-r from-[#F59E0B] to-[#FBBF24] text-[#0C0D12] shadow-[0_0_15px_rgba(245,158,11,0.45)]'
                              : 'border border-white/10 bg-white/5 text-[#CBD5E1]'
                          }`}
                        >
                          {featured && <span>★</span>}
                          {pkg.badge}
                        </span>
                      </div>

                      <h2 className="mt-6 text-center font-display text-4xl font-semibold text-white">{pkg.name}</h2>
                      <p
                        className="mx-auto mt-2 max-w-[34ch] text-balance text-center text-base leading-relaxed text-[#CBD5E1] lg:min-h-[3.25rem]"
                      >
                        {pkg.tagline}
                      </p>

                      {/* What this plan is best for */}
                      <p
                        className={`mt-6 rounded-2xl px-4 py-3 font-cormorant text-[18px] italic leading-snug ${
                          featured
                            ? 'border border-[#38BDF8]/40 bg-[#38BDF8]/[0.08] text-[#38BDF8]'
                            : 'border border-[#334155]/60 bg-[#161F36]/50 text-[#94A3B8]'
                        }`}
                      >
                        {pkg.highlight}
                      </p>

                      <div className="mt-7 border-t border-[#334155]/60 pt-6">
                        <p
                          className="text-xs font-semibold uppercase tracking-[0.14em] text-[#38BDF8]"
                        >
                          {tier === 0 ? "What's included" : `Everything in ${PRICING_PACKAGES[tier - 1].name}, plus`}
                        </p>

                        <ul className="mt-5 space-y-4">
                          {added.map((name, i) => (
                            <li key={name} className="flex items-start gap-3.5">
                              <CheckPop
                                index={i}
                                className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-[#2563EB] to-[#38BDF8] text-white shadow-[0_0_10px_rgba(56,189,248,0.3)]"
                              >
                                <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden="true" />
                              </CheckPop>
                              <span>
                                <span className="block text-base font-semibold text-[#F8FAFC]">{name}</span>
                                <span className="mt-0.5 block text-sm leading-snug text-[#94A3B8]">{PLAIN[name]}</span>
                              </span>
                            </li>
                          ))}
                        </ul>

                        {/* Earlier plans' items as compact tags */}
                        {tier > 0 && (
                          <div className="mt-7">
                            <p className="text-sm font-semibold text-[#F8FAFC]/90">
                              Already included from {PRICING_PACKAGES[tier - 1].name}
                            </p>
                            <ul className="mt-3 flex flex-wrap gap-2">
                              {previous.map((name) => (
                                <li
                                  key={name}
                                  className="inline-flex items-center gap-1.5 rounded-full border border-[#334155] bg-[#161F36] px-3 py-1.5 text-[13px] font-medium text-[#94A3B8]"
                                >
                                  <Check className="h-3 w-3 text-[#38BDF8]" strokeWidth={3} aria-hidden="true" />
                                  {name}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {addOns.length > 0 && (
                          <p
                            className="mt-6 flex items-start gap-2.5 rounded-2xl border border-dashed border-[#334155]/80 px-4 py-3 text-sm leading-snug text-[#94A3B8]"
                          >
                            <Plus className="mt-0.5 h-4 w-4 shrink-0 text-[#38BDF8]" strokeWidth={2.5} aria-hidden="true" />
                            <span>{addOns.join(', ')} can be added to this plan.</span>
                          </p>
                        )}
                      </div>

                      <div className="mt-auto pt-9">
                        <div className="border-t border-white/10 pt-6">
                          <p className="font-editorial text-3xl font-medium text-white">Custom quote</p>
                          <p className="mt-1 text-sm text-[#CBD5E1]">Priced to your goals and budget.</p>
                        </div>
                        <Link
                          to={`/contact?package=${encodeURIComponent(pkg.name)}`}
                          className={`group/btn mt-5 inline-flex h-14 w-full items-center justify-between overflow-hidden rounded-full py-2 pl-7 pr-3 text-[15px] font-bold transition-all duration-400 ${
                            featured
                              ? 'bg-gradient-to-r from-[#F59E0B] via-[#EAB308] to-[#D97706] text-[#0C0D12] shadow-[0_4px_24px_rgba(245,158,11,0.45),inset_0_1px_1px_rgba(255,255,255,0.6)] hover:shadow-[0_8px_36px_rgba(245,158,11,0.65)] hover:scale-[1.01]'
                              : 'border border-white/15 bg-white/5 text-white hover:border-amber-400/50 hover:bg-white/10 hover:text-white'
                          }`}
                        >
                          <span>Get a quote for {pkg.name}</span>
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0C0D12]/20 text-current shadow-sm transition-transform duration-300 group-hover/btn:translate-x-0.5">
                            <ArrowRight className="h-4 w-4" />
                          </span>
                        </Link>
                      </div>
                    </article>
                  </TiltCard>
                </Reveal>
              );
            })}
          </ul>
        </Scene3D>

        {/* How choosing works */}
        <div className="mt-20 rounded-3xl border border-white/10 bg-[#161724]/90 p-8 sm:p-12 shadow-2xl">
          <h2 className="text-center font-display text-fluid-h3 font-semibold text-white">How to get started</h2>
          <ol className="mt-10 grid gap-10 md:grid-cols-3 md:gap-8">
            {STEPS.map((step, idx) => (
              <Reveal as="li" key={step.title} delay={idx * 0.1} className="flex flex-col items-center text-center">
                <svg viewBox="0 0 24 24" className="h-10 w-10 text-[#F59E0B]" aria-hidden="true">
                  <path d="M12 2 20.66 7v10L12 22l-8.66-5V7z" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M12 7.5 16.6 10v5L12 17.5 7.4 15v-5z" fill="currentColor" />
                </svg>
                <h3 className="mt-5 font-display text-xl font-semibold text-white">{step.title}</h3>
                <p className="mt-2 max-w-[28ch] text-base leading-relaxed text-[#CBD5E1]">{step.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};
