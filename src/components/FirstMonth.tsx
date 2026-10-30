import React from 'react';
import { Check } from 'lucide-react';
import { FIRST_MONTH } from '../constants/content.ts';
import { SectionHeader } from './common/SectionHeader.tsx';
import { Reveal } from './common/Reveal.tsx';
import { Scene3D } from './common/Scene3D.tsx';
import { TiltCard } from './common/TiltCard.tsx';
import { Shine } from './common/Shine.tsx';
import { CheckPop } from './common/CheckPop.tsx';

/** About page: the four weeks after a client signs, shown as a connected row of stages. */
export const FirstMonth: React.FC = () => {
  return (
    <section className="relative bg-[#0C0D12] py-24 sm:py-32">
      <div className="shell">
        <SectionHeader
          eyebrow="Onboarding Roadmap"
          title="Your first month with us."
          accent="first month"
          intro="From the kick-off call to the first report, here is what happens after you say yes."
        />

        <Scene3D>
          <ol className="relative mt-14 grid gap-6 sm:mt-20 sm:grid-cols-2 xl:grid-cols-4 xl:gap-0">
            {/* Connector through the week markers on wide screens */}
            <span className="absolute left-0 right-0 top-[27px] hidden h-px bg-white/10 xl:block" aria-hidden="true" />

            {FIRST_MONTH.map((stage, idx) => (
              <Reveal as="li" key={stage.week} delay={idx * 0.1} className="relative flex flex-col xl:pr-8">
                <span
                  className={`relative z-10 inline-flex h-14 items-center self-start rounded-full px-6 font-display text-lg font-semibold shadow-md ${
                    idx === 0
                      ? 'bg-gradient-to-r from-[#F59E0B] to-[#FBBF24] text-[#0C0D12] shadow-[0_0_20px_rgba(245,158,11,0.4)]'
                      : 'border border-white/10 bg-[#171822] text-[#CBD5E1]'
                  }`}
                >
                  {stage.week}
                </span>
                {/* flex-1: every card stretches to the tallest in its row, so all four end on the same line */}
                <TiltCard max={4} className="mt-6 flex flex-1 flex-col xl:mt-8" innerClassName="flex-1">
                  <div className="group relative h-full rounded-3xl border border-white/10 bg-[#171822] p-7 transition-all duration-300 hover:border-amber-400/50 hover:shadow-[0_8px_32px_rgba(245,158,11,0.2)]">
                    <Shine />
                    <h3 className="font-editorial text-2xl font-medium text-white">{stage.title}</h3>
                    <ul className="mt-5 space-y-3">
                      {stage.points.map((point, i) => (
                        <li key={point} className="flex items-start gap-3 text-base leading-snug text-[#CBD5E1]">
                          <CheckPop index={i} className="mt-0.5 shrink-0">
                            <Check className="h-4 w-4 text-[#F59E0B]" strokeWidth={2.5} aria-hidden="true" />
                          </CheckPop>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </ol>
        </Scene3D>
      </div>
    </section>
  );
};
