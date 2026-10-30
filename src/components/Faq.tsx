import React, { useId, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Plus } from 'lucide-react';
import type { FaqItem } from '../constants/faqs.ts';
import { Reveal } from './common/Reveal.tsx';
import { RevealWords } from './common/RevealWords.tsx';

interface FaqProps {
  items: FaqItem[];
  title?: string;
  intro?: string;
}

/**
 * Questions and answers on a white section. Laptop and up: heading and a contact prompt on the left, the questions on
 * the right. Phones and tablets: one centred column. One answer is open at a time; the first starts open.
 */
export const Faq: React.FC<FaqProps> = ({
  items,
  title = 'Questions, answered.',
  intro = 'The things people usually ask before we start working together.',
}) => {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <section className="relative bg-[#0C0D12] py-24 text-white sm:py-32 overflow-hidden">
      {/* Soft ambient lighting */}
      <div
        className="pointer-events-none absolute -bottom-32 right-1/4 h-[450px] w-[450px] rounded-full bg-[#F59E0B]/06 blur-[130px]"
        aria-hidden="true"
      />
      <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="text-center lg:col-span-5 lg:text-left">
          <p className="flex items-center justify-center lg:justify-start gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#F59E0B]">
            FAQ
            <span className="font-satisfy text-[#FBBF24] lowercase tracking-normal text-sm">— common enquiries</span>
          </p>
          <h2 className="mt-4 text-balance font-display text-fluid-h2 font-semibold text-white">
            <RevealWords text={title} />
          </h2>
          <p className="mx-auto mt-5 max-w-md font-editorial text-2xl leading-relaxed text-[#CBD5E1] lg:mx-0">{intro}</p>
          <Link
            to="/contact"
            className="group mt-8 inline-flex h-12 items-center gap-2 rounded-full border border-amber-300/40 bg-gradient-to-r from-[#F59E0B] via-[#EAB308] to-[#D97706] px-6 text-[15px] font-bold text-[#0C0D12] shadow-[0_4px_20px_rgba(245,158,11,0.4)] transition-all hover:scale-[1.02] hover:shadow-[0_8px_30px_rgba(245,158,11,0.6)]"
          >
            Ask us anything
            <ArrowRight className="h-4 w-4 text-[#0C0D12] transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <ul className="border-t border-white/10 lg:col-span-7">
          {items.map((item, idx) => {
            const isOpen = open === idx;
            const panelId = `${baseId}-panel-${idx}`;
            const buttonId = `${baseId}-button-${idx}`;
            return (
              <Reveal as="li" key={item.q} delay={idx * 0.05} className="border-b border-white/10">
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : idx)}
                    className="group flex w-full cursor-pointer items-center justify-between gap-6 py-6 text-left"
                  >
                    <span className="font-display text-lg font-semibold leading-snug text-white transition-colors duration-200 group-hover:text-[#F59E0B] sm:text-xl">{item.q}</span>
                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                        isOpen
                          ? 'rotate-45 bg-[#F59E0B] text-[#0C0D12] shadow-[0_0_15px_rgba(245,158,11,0.4)]'
                          : 'border border-white/10 bg-[#171822] text-[#CBD5E1] group-hover:border-amber-400/60 group-hover:text-white'
                      }`}
                    >
                      <Plus className="h-5 w-5" aria-hidden="true" />
                    </span>
                  </button>
                </h3>
                {/* Height animates through the grid-rows trick, so no measuring is needed */}
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className={`grid transition-[grid-template-rows] duration-400 ease-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                >
                  <div className="overflow-hidden" inert={!isOpen}>
                    <p className="max-w-[60ch] pb-6 pr-14 text-base leading-relaxed text-[#CBD5E1]">{item.a}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
};
