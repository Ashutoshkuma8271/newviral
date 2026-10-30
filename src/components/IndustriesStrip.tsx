import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { INDUSTRIES } from '../constants/content.ts';
import { SectionHeader } from './common/SectionHeader.tsx';
import { Reveal } from './common/Reveal.tsx';
import { Spotlight } from './common/Spotlight.tsx';
import { Scene3D } from './common/Scene3D.tsx';

/** Home: who we work with. Eight equal tiles, each with the sector and what we do there. */
export const IndustriesStrip: React.FC = () => {
  return (
    <section className="relative border-t border-white/10 bg-[#0C0D12] py-24 sm:py-32">
      <div className="shell">
        <SectionHeader
          title="Built for businesses like yours."
          accent="like yours."
          intro="Eight sectors we know well, and the kind of work that moves the needle in each."
        />

        <Scene3D>
          <ul className="mt-14 grid grid-cols-2 gap-3 sm:mt-16 sm:gap-4 lg:grid-cols-4">
            {INDUSTRIES.map((industry, idx) => (
              <Reveal
                as="li"
                key={industry.name}
                delay={(idx % 4) * 0.08}
                className="relative overflow-hidden group flex min-h-36 flex-col justify-between rounded-3xl text-center sm:min-h-44 sm:text-left border border-[#087F5B]/35 bg-gradient-to-b from-[#14241C] via-[#0E1A14] to-[#0B130E] p-4 transition-all duration-300 hover:border-[#10B981]/60 hover:shadow-[0_12px_36px_rgba(8,127,91,0.3)] sm:p-7 hover:-translate-y-1"
              >
                <Spotlight />
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#10B981]">
                    Sector 0{idx + 1}
                  </span>
                  <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37] shadow-[0_0_6px_#D4AF37]" />
                </div>
                <h3 className="relative font-serif-display text-xl leading-tight sm:text-2xl text-white transition-[color,font-weight] duration-500 group-hover:font-semibold group-hover:text-[#D4AF37]">
                  {industry.name}
                </h3>
                <p className="relative mt-2 text-sm leading-snug text-[#CBD5E1] sm:mt-4 sm:text-base">{industry.desc}</p>
              </Reveal>
            ))}
          </ul>
        </Scene3D>

        <div className="mt-14 flex justify-center sm:mt-16">
          <Link
            to="/contact"
            className="group inline-flex h-12 items-center gap-2 rounded-full border border-amber-300/40 bg-gradient-to-r from-[#F59E0B] via-[#EAB308] to-[#D97706] px-6 text-[15px] font-bold text-[#0C0D12] shadow-[0_4px_20px_rgba(245,158,11,0.4)] transition-all hover:scale-[1.02] hover:shadow-[0_8px_30px_rgba(245,158,11,0.6)]"
          >
            <span>Talk about your sector</span>
            <ArrowUpRight className="h-4 w-4 text-[#D4AF37] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
};
