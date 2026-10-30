import React from 'react';
import { motion } from 'framer-motion';
import {
  Share2,
  Palette,
  Video,
  Globe,
  TrendingUp,
  Target,
  ArrowUpRight,
  Award,
  Play,
  Code2,
  Check,
  Zap,
} from 'lucide-react';

interface ServiceVisualProps {
  serviceId: string;
}

/**
 * 1. Social Media Management: Social Feed & Community Growth UI Mockup
 */
const SocialMediaVisual: React.FC = () => (
  <div className="relative h-full w-full rounded-2xl bg-[#161F36] p-5 border border-[#334155]/80 text-[#F8FAFC] flex flex-col justify-between overflow-hidden shadow-2xl">
    {/* Ambient Glow */}
    <div className="absolute -top-12 -right-12 h-36 w-36 rounded-full bg-[#2563EB]/20 blur-2xl" />

    {/* Header */}
    <div className="flex items-center justify-between border-b border-[#334155]/60 pb-3">
      <div className="flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#2563EB]/20 text-[#38BDF8]">
          <Share2 className="h-4 w-4" />
        </div>
        <div>
          <p className="text-xs font-semibold text-[#F8FAFC]">Vyral Bee Community Hub</p>
          <p className="text-[10px] text-[#94A3B8]">Multi-Channel Sync • Active</p>
        </div>
      </div>
      <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-400">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
        Live Tracking
      </span>
    </div>

    {/* Stats Cards */}
    <div className="grid grid-cols-2 gap-2.5 my-3">
      <div className="rounded-xl border border-white/10 bg-[#171822] p-3">
        <p className="text-[10px] font-medium text-[#CBD5E1]">Monthly Reach</p>
        <p className="font-display text-xl font-bold text-[#F59E0B]">1.84M</p>
        <p className="text-[10px] font-medium text-emerald-400">▲ +312% Growth</p>
      </div>
      <div className="rounded-xl border border-white/10 bg-[#171822] p-3">
        <p className="text-[10px] font-medium text-[#CBD5E1]">Engagement Rate</p>
        <p className="font-display text-xl font-bold text-white">8.4%</p>
        <p className="text-[10px] font-medium text-[#F59E0B]">Top 1% Tier</p>
      </div>
    </div>

    {/* Mini Post Feed Representation */}
    <div className="rounded-xl border border-white/10 bg-[#171822]/80 p-2.5 space-y-2">
      <div className="flex items-center justify-between text-[11px]">
        <span className="font-medium text-white/90">Latest Viral Campaign</span>
        <span className="text-[10px] text-[#F59E0B] font-mono">148.5K Shares</span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-[#0C0D12] overflow-hidden">
        <motion.div
          initial={{ width: '0%' }}
          animate={{ width: '88%' }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="h-full rounded-full bg-gradient-to-r from-[#F59E0B] to-[#FBBF24]"
        />
      </div>
    </div>
  </div>
);

/**
 * 2. Creative & Graphic Design: Figma/Design Composition Canvas Mockup
 */
const GraphicDesignVisual: React.FC = () => (
  <div className="relative h-full w-full rounded-2xl bg-[#171822] p-5 border border-white/10 text-white flex flex-col justify-between overflow-hidden shadow-2xl">
    <div className="absolute -bottom-12 -left-12 h-36 w-36 rounded-full bg-[#F59E0B]/10 blur-2xl" />

    {/* Header */}
    <div className="flex items-center justify-between border-b border-white/10 pb-3">
      <div className="flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F59E0B]/20 text-[#F59E0B]">
          <Palette className="h-4 w-4" />
        </div>
        <div>
          <p className="text-xs font-semibold text-white">Brand Architecture Lab</p>
          <p className="text-[10px] text-[#CBD5E1]">Vector Geometry & Identity</p>
        </div>
      </div>
      <span className="text-[11px] font-mono text-[#CBD5E1]">1920 × 1080 • Vector</span>
    </div>

    {/* Creative Palette & Type Specimen */}
    <div className="my-3 space-y-3">
      {/* Type specimen */}
      <div className="rounded-xl border border-white/10 bg-[#141520] p-3 flex items-center justify-between">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-[#CBD5E1] block">Primary Display Font</span>
          <span className="font-display text-2xl font-bold tracking-tight text-white">Clash Display</span>
        </div>
        <span className="font-mono text-xs text-[#F59E0B]">Semibold / 600</span>
      </div>

      {/* Swatches */}
      <div className="flex items-center gap-2">
        {[
          { label: 'Obsidian Slate', hex: '#0C0D12' },
          { label: 'Honey Amber', hex: '#F59E0B' },
          { label: 'Warm Gold', hex: '#FBBF24' },
          { label: 'Pure White', hex: '#FFFFFF' },
        ].map((c) => (
          <div key={c.hex} className="flex-1 flex flex-col items-center gap-1">
            <div className="h-8 w-full rounded-lg border border-white/15" style={{ backgroundColor: c.hex }} />
            <span className="text-[9px] font-mono text-[#CBD5E1]">{c.hex}</span>
          </div>
        ))}
      </div>
    </div>

    {/* Design Status Tag */}
    <div className="flex items-center justify-between rounded-xl bg-[#F59E0B]/15 px-3 py-2 text-[11px] text-[#F59E0B] border border-[#F59E0B]/30">
      <span className="font-medium">100% Bespoke Art Direction</span>
      <Award className="h-3.5 w-3.5" />
    </div>
  </div>
);

/**
 * 3. Reels & Video Content: Cinematic Video Editing Timeline Mockup
 */
const VideoReelsVisual: React.FC = () => (
  <div className="relative h-full w-full rounded-2xl bg-[#171822] p-5 border border-white/10 text-white flex flex-col justify-between overflow-hidden shadow-2xl">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-36 w-36 rounded-full bg-[#F59E0B]/10 blur-3xl" />

    {/* Header */}
    <div className="flex items-center justify-between border-b border-white/10 pb-3">
      <div className="flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F59E0B]/20 text-[#F59E0B]">
          <Video className="h-4 w-4" />
        </div>
        <div>
          <p className="text-xs font-semibold text-white">Cinematic Post-Production</p>
          <p className="text-[10px] text-[#CBD5E1]">4K 60FPS • Anamorphic Grade</p>
        </div>
      </div>
      <div className="flex items-center gap-1.5 rounded-full bg-[#F59E0B]/15 px-2 py-0.5 text-[10px] font-semibold text-[#F59E0B]">
        <Play className="h-2.5 w-2.5 fill-current" />
        00:18:24
      </div>
    </div>

    {/* Timeline Tracks */}
    <div className="my-3 space-y-2 rounded-xl border border-white/10 bg-[#141520] p-3">
      {/* Track 1: Video clips */}
      <div>
        <div className="flex justify-between text-[10px] text-[#CBD5E1] mb-1">
          <span>V1 • Hook & B-Roll</span>
          <span className="text-[#F59E0B] font-mono">Cut #04</span>
        </div>
        <div className="flex gap-1.5 h-6">
          <div className="flex-1 rounded bg-[#F59E0B]/25 border border-[#F59E0B]/40 flex items-center px-2 text-[9px] font-medium text-white">Intro Hook</div>
          <div className="flex-[2] rounded bg-gradient-to-r from-[#F59E0B]/30 to-[#FBBF24]/30 border border-[#FBBF24]/40 flex items-center px-2 text-[9px] font-medium text-white">Dynamic Montage</div>
          <div className="flex-1 rounded bg-[#FBBF24]/25 border border-[#FBBF24]/40 flex items-center px-2 text-[9px] font-medium text-white">CTA Reveal</div>
        </div>
      </div>

      {/* Track 2: Audio waveform */}
      <div>
        <div className="flex justify-between text-[10px] text-[#CBD5E1] mb-1">
          <span>A1 • Sound Design & Score</span>
          <span className="text-emerald-400 font-mono">-0.4dB</span>
        </div>
        <div className="h-4 rounded bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-around px-1">
          {[40, 75, 100, 60, 85, 30, 90, 50, 80, 100, 65, 45, 90, 35].map((h, i) => (
            <div key={i} className="w-1 rounded-full bg-emerald-400/70" style={{ height: `${h}%` }} />
          ))}
        </div>
      </div>
    </div>

    <div className="flex items-center justify-between text-[11px] text-[#CBD5E1]">
      <span>Retention Optimized: <strong className="text-white">92% at 3s</strong></span>
      <span className="text-[#F59E0B] font-semibold">Short-Form Ready</span>
    </div>
  </div>
);

/**
 * 4. Website Design & Development: Interactive Code & Browser Viewport Mockup
 */
const WebDevVisual: React.FC = () => (
  <div className="relative h-full w-full rounded-2xl bg-[#171822] p-5 border border-white/10 text-white flex flex-col justify-between overflow-hidden shadow-2xl">
    <div className="absolute -top-12 -left-12 h-36 w-36 rounded-full bg-[#F59E0B]/10 blur-2xl" />

    {/* Header with browser dots */}
    <div className="flex items-center justify-between border-b border-white/10 pb-3">
      <div className="flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full bg-rose-500/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
        <span className="ml-2 font-mono text-[10px] text-[#CBD5E1]">agency.vyralbee.com</span>
      </div>
      <div className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-400">
        <Zap className="h-2.5 w-2.5" />
        100 Lighthouse
      </div>
    </div>

    {/* Clean code preview */}
    <div className="my-3 rounded-xl border border-white/10 bg-[#141520] p-3 font-mono text-[11px] leading-relaxed text-[#CBD5E1]">
      <p><span className="text-[#F59E0B]">const</span> <span className="text-[#FBBF24]">growthEngine</span> = <span className="text-[#F59E0B]">await</span> <span className="text-white">VyralBee</span>.<span className="text-[#FBBF24]">deploy</span>({'{'}</p>
      <p className="pl-4"><span className="text-[#94A3B8]">threeJs:</span> <span className="text-emerald-400">true</span>,</p>
      <p className="pl-4"><span className="text-[#94A3B8]">theme:</span> <span className="text-[#F59E0B]">"obsidian-amber"</span>,</p>
      <p className="pl-4"><span className="text-[#94A3B8]">seoOptimized:</span> <span className="text-emerald-400">true</span>,</p>
      <p>{'}'});</p>
    </div>

    <div className="flex items-center justify-between text-[11px]">
      <span className="text-[#CBD5E1]">React 19 • Next-Gen Vite</span>
      <span className="text-[#F59E0B] font-semibold">Zero-Lag Animations</span>
    </div>
  </div>
);

/**
 * 5. Meta & Google Ads: Real-Time Performance Marketing Dashboard Mockup
 */
const AdsVisual: React.FC = () => (
  <div className="relative h-full w-full rounded-2xl bg-[#171822] p-5 border border-white/10 text-white flex flex-col justify-between overflow-hidden shadow-2xl">
    <div className="absolute -bottom-12 -right-12 h-36 w-36 rounded-full bg-[#F59E0B]/10 blur-2xl" />

    {/* Header */}
    <div className="flex items-center justify-between border-b border-white/10 pb-3">
      <div className="flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F59E0B]/20 text-[#F59E0B]">
          <TrendingUp className="h-4 w-4" />
        </div>
        <div>
          <p className="text-xs font-semibold text-white">Performance Command</p>
          <p className="text-[10px] text-[#CBD5E1]">Meta & Google Ads Engine</p>
        </div>
      </div>
      <span className="text-xs font-mono font-bold text-[#F59E0B]">4.82x ROAS</span>
    </div>

    {/* Metric Blocks */}
    <div className="grid grid-cols-3 gap-2 my-3">
      <div className="rounded-xl border border-white/10 bg-[#141520] p-2.5 text-center">
        <span className="text-[9px] uppercase tracking-wider text-[#CBD5E1] block">Spent</span>
        <span className="font-display text-sm font-bold text-white">$4.2K</span>
      </div>
      <div className="rounded-xl border border-white/10 bg-[#141520] p-2.5 text-center">
        <span className="text-[9px] uppercase tracking-wider text-[#CBD5E1] block">Revenue</span>
        <span className="font-display text-sm font-bold text-[#F59E0B]">$20.2K</span>
      </div>
      <div className="rounded-xl border border-white/10 bg-[#141520] p-2.5 text-center">
        <span className="text-[9px] uppercase tracking-wider text-[#CBD5E1] block">CPA</span>
        <span className="font-display text-sm font-bold text-emerald-400">$11.80</span>
      </div>
    </div>

    {/* Funnel Graph */}
    <div className="space-y-1.5 rounded-xl border border-white/10 bg-[#141520] p-2.5">
      <div className="flex justify-between text-[10px]">
        <span className="text-[#CBD5E1]">Impressions → Purchases</span>
        <span className="text-emerald-400 font-semibold">+42% MoM</span>
      </div>
      <div className="flex items-end gap-1 h-8">
        {[25, 35, 45, 40, 60, 55, 75, 70, 85, 95, 100].map((val, idx) => (
          <div
            key={idx}
            className="flex-1 rounded-t bg-gradient-to-t from-[#F59E0B] to-[#FBBF24]"
            style={{ height: `${val}%` }}
          />
        ))}
      </div>
    </div>
  </div>
);

/**
 * 6. Digital Marketing & Lead Generation: Full-Funnel Pipeline Mockup
 */
const LeadGenVisual: React.FC = () => (
  <div className="relative h-full w-full rounded-2xl bg-[#171822] p-5 border border-white/10 text-white flex flex-col justify-between overflow-hidden shadow-2xl">
    <div className="absolute top-0 right-0 h-36 w-36 rounded-full bg-[#F59E0B]/10 blur-2xl" />

    {/* Header */}
    <div className="flex items-center justify-between border-b border-white/10 pb-3">
      <div className="flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F59E0B]/20 text-[#F59E0B]">
          <Target className="h-4 w-4" />
        </div>
        <div>
          <p className="text-xs font-semibold text-white">Full-Funnel Lead Engine</p>
          <p className="text-[10px] text-[#CBD5E1]">Automated Pipeline & CRM</p>
        </div>
      </div>
      <span className="text-xs font-mono font-bold text-emerald-400">98.2% Qualified</span>
    </div>

    {/* Stage Progress */}
    <div className="my-3 space-y-2">
      {[
        { stage: '1. High-Intent Traffic', count: '48,200', pct: 100 },
        { stage: '2. Nurtured Prospects', count: '6,420', pct: 72 },
        { stage: '3. Booked Sales Calls', count: '480', pct: 45 },
      ].map((item, i) => (
        <div key={i} className="rounded-xl border border-white/10 bg-[#141520] p-2.5">
          <div className="flex justify-between text-[11px] mb-1">
            <span className="text-white font-medium">{item.stage}</span>
            <span className="font-mono text-[#F59E0B]">{item.count}</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-[#0C0D12] overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#F59E0B] to-[#FBBF24]"
              style={{ width: `${item.pct}%` }}
            />
          </div>
        </div>
      ))}
    </div>

    <div className="flex items-center justify-between text-[11px] rounded-xl bg-[#141520] border border-white/10 px-3 py-1.5">
      <span className="text-[#CBD5E1]">Seamless WhatsApp & CRM Routing</span>
      <Check className="h-3.5 w-3.5 text-emerald-400" />
    </div>
  </div>
);

export const ServiceShowcaseVisual: React.FC<ServiceVisualProps> = ({ serviceId }) => {
  switch (serviceId) {
    case 'social-media':
      return <SocialMediaVisual />;
    case 'creative-design':
      return <GraphicDesignVisual />;
    case 'reels-video':
      return <VideoReelsVisual />;
    case 'website-dev':
      return <WebDevVisual />;
    case 'meta-google-ads':
      return <AdsVisual />;
    case 'lead-gen':
      return <LeadGenVisual />;
    default:
      return <SocialMediaVisual />;
  }
};
