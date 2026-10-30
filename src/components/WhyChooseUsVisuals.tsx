import React from 'react';
import { ArrowUpRight, Palette, MessageSquare, Layers, ShieldCheck, UserCheck, Calendar } from 'lucide-react';

/**
 * Authentic High-Resolution Visual Compositions for The Vyral Bee Standard
 *
 * Uses genuine 4K/2000px photography, single-layer minimal framing,
 * [data-curved-aperture] for GSAP-scrubbed curved reveals,
 * [data-parallax-img] for subtle 3D parallax drift,
 * and Midnight Ink (#171C2B), Graphite (#242B3A), Refined Cobalt (#315EDE) and Sky Highlight (#72C8F4) styling.
 */

// 1. STRATEGY: Business-focused revenue architecture vs Vanity metrics
export const StrategyVisual: React.FC = () => (
  <div
    data-curved-aperture
    className="group/img relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-white/10 bg-[#171822] shadow-[0_12px_32px_rgba(0,0,0,0.5)]"
  >
    <img
      data-parallax-img
      src="/images/services/growth-2000.webp"
      srcSet="/images/services/growth-1200.webp 1200w, /images/services/growth-2000.webp 2000w"
      sizes="(min-width: 1024px) 520px, 100vw"
      alt="Strategic growth campaign architecture and revenue model"
      loading="lazy"
      decoding="async"
      className="h-full w-full object-cover filter brightness-[0.92] contrast-[1.06] transition-transform duration-500 ease-out group-hover/img:scale-105"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-[#0C0D12]/90 via-[#0C0D12]/25 to-transparent" />
    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
      <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#F59E0B]">
        Full-Funnel Acquisition Funnel
      </span>
      <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/15 px-2.5 py-0.5 font-mono text-[11px] font-semibold text-emerald-300 backdrop-blur-sm shadow-[0_0_12px_rgba(16,185,129,0.2)]">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
        Verified Commercial ROI
      </span>
    </div>
  </div>
);

// 2. CREATIVE: Bespoke brand identity vs Generic templates
export const CreativeVisual: React.FC = () => (
  <div
    data-curved-aperture
    className="group/img relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-white/10 bg-[#171822] shadow-[0_12px_32px_rgba(0,0,0,0.5)]"
  >
    <img
      data-parallax-img
      src="/images/services/design-2000.webp"
      srcSet="/images/services/design-1200.webp 1200w, /images/services/design-2000.webp 2000w"
      sizes="(min-width: 1024px) 520px, 100vw"
      alt="Bespoke creative brand design system and typography"
      loading="lazy"
      decoding="async"
      className="h-full w-full object-cover filter brightness-[0.94] contrast-[1.05] transition-transform duration-500 ease-out group-hover/img:scale-105"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-[#0C0D12]/90 via-[#0C0D12]/25 to-transparent" />
    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Palette className="h-3.5 w-3.5 text-[#F59E0B]" />
        <span className="font-sans text-xs font-semibold uppercase tracking-wider text-white">
          100% Bespoke Identity
        </span>
      </div>
      <div className="flex -space-x-1.5">
        <span className="h-4.5 w-4.5 rounded-full border border-[#0C0D12] bg-[#F59E0B] shadow-sm" />
        <span className="h-4.5 w-4.5 rounded-full border border-[#0C0D12] bg-[#FBBF24] shadow-sm" />
        <span className="h-4.5 w-4.5 rounded-full border border-[#0C0D12] bg-white shadow-sm" />
      </div>
    </div>
  </div>
);

// 3. CONSISTENCY: Disciplined publishing schedule vs Irregular posting
export const ConsistencyVisual: React.FC = () => (
  <div
    data-curved-aperture
    className="group/img relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-white/10 bg-[#171822] shadow-[0_12px_32px_rgba(0,0,0,0.5)]"
  >
    <img
      data-parallax-img
      src="/images/services/social-2000.webp"
      srcSet="/images/services/social-1200.webp 1200w, /images/services/social-2000.webp 2000w"
      sizes="(min-width: 1024px) 520px, 100vw"
      alt="Consistent multi-channel social brand publishing"
      loading="lazy"
      decoding="async"
      className="h-full w-full object-cover filter brightness-[0.9] contrast-[1.06] transition-transform duration-500 ease-out group-hover/img:scale-105"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-[#0C0D12]/90 via-[#0C0D12]/25 to-transparent" />
    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Calendar className="h-3.5 w-3.5 text-[#F59E0B]" />
        <span className="font-mono text-xs font-semibold text-white">
          30-Day Content Roadmap
        </span>
      </div>
      <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[10.5px] font-mono font-medium text-[#F59E0B] backdrop-blur-sm">
        Multi-Channel Sync
      </span>
    </div>
  </div>
);

// 4. COMMUNICATION: Direct senior liaison vs Jargon & surprises
export const CommunicationVisual: React.FC = () => (
  <div
    data-curved-aperture
    className="relative flex flex-col justify-between gap-4 rounded-xl border border-white/10 bg-[#171822]/95 p-5 shadow-[0_12px_32px_rgba(0,0,0,0.5)]"
  >
    <div className="flex items-center justify-between border-b border-white/10 pb-3">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-amber-400/40 bg-[#F59E0B]/15 text-[#F59E0B]">
          <MessageSquare className="h-4 w-4" />
        </div>
        <div>
          <span className="block font-sans text-sm font-semibold text-white">
            Direct Strategic Liaison
          </span>
          <span className="block text-[11px] font-mono text-[#CBD5E1]">
            Dedicated private channel · Zero middlemen
          </span>
        </div>
      </div>
      <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/15 px-2.5 py-0.5 font-mono text-[10.5px] font-medium text-emerald-300">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
        Active SLA
      </span>
    </div>

    <div className="grid grid-cols-3 gap-2.5 pt-1 text-center">
      <div className="rounded-lg border border-white/10 bg-[#141520] p-2.5">
        <span className="block text-[10px] font-mono text-[#CBD5E1] uppercase tracking-wider">Response SLA</span>
        <span className="mt-0.5 block font-sans text-sm font-bold text-white">&lt;2 Hours</span>
      </div>
      <div className="rounded-lg border border-white/10 bg-[#141520] p-2.5">
        <span className="block text-[10px] font-mono text-[#CBD5E1] uppercase tracking-wider">Milestones</span>
        <span className="mt-0.5 block font-sans text-sm font-bold text-white">Weekly</span>
      </div>
      <div className="rounded-lg border border-white/10 bg-[#141520] p-2.5">
        <span className="block text-[10px] font-mono text-[#CBD5E1] uppercase tracking-wider">Scope Clarity</span>
        <span className="mt-0.5 block font-sans text-sm font-bold text-[#F59E0B]">100%</span>
      </div>
    </div>
  </div>
);

// 5. REPORTING: Actionable ROI reporting vs Meaningless numbers
export const ReportingVisual: React.FC = () => (
  <div
    data-curved-aperture
    className="group/img relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-white/10 bg-[#171822] shadow-[0_12px_32px_rgba(0,0,0,0.5)]"
  >
    <img
      data-parallax-img
      src="/images/services/ads-2000.webp"
      srcSet="/images/services/ads-1200.webp 1200w, /images/services/ads-2000.webp 2000w"
      sizes="(min-width: 1024px) 520px, 100vw"
      alt="Commercial ROI performance reporting and dashboard"
      loading="lazy"
      decoding="async"
      className="h-full w-full object-cover filter brightness-[0.9] contrast-[1.08] transition-transform duration-500 ease-out group-hover/img:scale-105"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-[#0C0D12]/90 via-[#0C0D12]/25 to-transparent" />
    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
      <span className="font-sans text-xs font-semibold uppercase tracking-wider text-white">
        Revenue Attribution
      </span>
      <span className="inline-flex items-center gap-1 font-mono text-xs font-semibold text-[#F59E0B]">
        <ArrowUpRight className="h-3.5 w-3.5" />
        Measured in Cashflow
      </span>
    </div>
  </div>
);

// 6. PACKAGES: Modular growth architecture vs Rigid plans
export const PackagesVisual: React.FC = () => (
  <div
    data-curved-aperture
    className="group/img relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-white/10 bg-[#171822] shadow-[0_12px_32px_rgba(0,0,0,0.5)]"
  >
    <img
      data-parallax-img
      src="/images/services/video-2000.webp"
      srcSet="/images/services/video-1200.webp 1200w, /images/services/video-2000.webp 2000w"
      sizes="(min-width: 1024px) 520px, 100vw"
      alt="Modular growth architecture and flexible service tiers"
      loading="lazy"
      decoding="async"
      className="h-full w-full object-cover filter brightness-[0.9] contrast-[1.05] transition-transform duration-500 ease-out group-hover/img:scale-105"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-[#0C0D12]/90 via-[#0C0D12]/25 to-transparent" />
    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Layers className="h-3.5 w-3.5 text-[#F59E0B]" />
        <span className="font-sans text-xs font-semibold uppercase tracking-wider text-white">
          Modular Growth Tiers
        </span>
      </div>
      <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[10.5px] font-mono text-[#F59E0B]">
        Zero Lock-In
      </span>
    </div>
  </div>
);

// 7. PARTNERSHIP: Full alignment vs 5 disconnected freelancers
export const PartnershipVisual: React.FC = () => (
  <div
    data-curved-aperture
    className="group/img relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-white/10 bg-[#171822] shadow-[0_12px_32px_rgba(0,0,0,0.5)]"
  >
    <img
      data-parallax-img
      src="/images/services/web-2000.webp"
      srcSet="/images/services/web-1200.webp 1200w, /images/services/web-2000.webp 2000w"
      sizes="(min-width: 1024px) 520px, 100vw"
      alt="Unified web platform and digital marketing integration"
      loading="lazy"
      decoding="async"
      className="h-full w-full object-cover filter brightness-[0.9] contrast-[1.08] transition-transform duration-500 ease-out group-hover/img:scale-105"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-[#0C0D12]/90 via-[#0C0D12]/25 to-transparent" />
    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <ShieldCheck className="h-3.5 w-3.5 text-[#F59E0B]" />
        <span className="font-sans text-xs font-semibold text-white">
          Single-Source Alignment
        </span>
      </div>
      <span className="font-mono text-[10.5px] text-[#F59E0B]">
        Social + Web + Ads
      </span>
    </div>
  </div>
);

// 8. MANAGEMENT: Dedicated senior strategist vs Rotating junior staff
export const AccountManagementVisual: React.FC = () => (
  <div
    data-curved-aperture
    className="group/img relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-white/10 bg-[#171822] shadow-[0_12px_32px_rgba(0,0,0,0.5)]"
  >
    <img
      data-parallax-img
      src="/images/sections/team-1800.webp"
      srcSet="/images/sections/team-700.webp 700w, /images/sections/team-1200.webp 1200w, /images/sections/team-1800.webp 1800w"
      sizes="(min-width: 1024px) 520px, 100vw"
      alt="Dedicated strategic account management team"
      loading="lazy"
      decoding="async"
      className="h-full w-full object-cover filter brightness-[0.9] contrast-[1.05] transition-transform duration-500 ease-out group-hover/img:scale-105"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-[#0C0D12]/90 via-[#0C0D12]/25 to-transparent" />
    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <UserCheck className="h-3.5 w-3.5 text-[#F59E0B]" />
        <span className="font-sans text-xs font-semibold text-white">
          Dedicated Growth Strategist
        </span>
      </div>
      <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-mono text-[#F59E0B]">
        Direct WhatsApp Line
      </span>
    </div>
  </div>
);

export const COMPARISON_VISUALS = [
  StrategyVisual,
  CreativeVisual,
  ConsistencyVisual,
  CommunicationVisual,
  ReportingVisual,
  PackagesVisual,
  PartnershipVisual,
  AccountManagementVisual,
];

