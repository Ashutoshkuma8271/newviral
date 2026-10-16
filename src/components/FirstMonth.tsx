import React from 'react';
import { Check } from 'lucide-react';
import { FIRST_MONTH } from '../constants/content.ts';
import { SectionHeader } from './common/SectionHeader.tsx';
import { Reveal } from './common/Reveal.tsx';
import { Scene3D } from './common/Scene3D.tsx';

/** About page: the four weeks after a client signs, shown as a connected row of stages. */
export const FirstMonth: React.FC = () => {
  return (
    <section className="relative bg-dark-surface py-24 sm:py-32">
      <div className="shell">
        <SectionHeader
          title="Your first month with us."
          intro="From the kick-off call to the first report, here is what happens after you say yes."
        />

        <Scene3D>
          <ol className="relative mt-14 grid gap-6 sm:mt-20 sm:grid-cols-2 xl:grid-cols-4 xl:gap-0">
            {/* Connector through the week markers on wide screens */}
            <span className="absolute left-0 right-0 top-[27px] hidden h-px bg-white/12 xl:block" aria-hidden="true" />

            {FIRST_MONTH.map((stage, idx) => (
              <Reveal as="li" key={stage.week} delay={idx * 0.1} className="relative flex flex-col xl:pr-8">
                <span
                  className={`relative z-10 inline-flex h-14 items-center self-start rounded-full px-6 font-display text-lg font-semibold ${
                    idx === 0 ? 'bg-gold text-ink' : 'border border-white/15 bg-dark-surface text-white'
                  }`}
                >
                  {stage.week}
                </span>
                {/* flex-1: every card stretches to the tallest in its row, so all four end on the same line */}
                <div className="mt-6 flex-1 rounded-3xl border border-white/8 bg-dark-card p-7 xl:mt-8">
                  <h3 className="font-display text-2xl font-semibold text-white">{stage.title}</h3>
                  <ul className="mt-5 space-y-3">
                    {stage.points.map((point) => (
                      <li key={point} className="flex items-start gap-3 text-base leading-snug text-white/70">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={2.5} aria-hidden="true" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </ol>
        </Scene3D>
      </div>
    </section>
  );
};
