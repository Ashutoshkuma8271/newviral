import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { WHY_CHOOSE_US } from '../constants/content.ts';
import { SectionHeader } from './common/SectionHeader.tsx';
import { Reveal } from './common/Reveal.tsx';

/**
 * Home: why work with us. Each of the eight points is one clean block: the usual agency problem struck through in
 * a soft serif, then our answer and what it means. Same content as before, set so it scans in seconds.
 */
export const WhyChooseUs: React.FC = () => {
  return (
    <section className="relative bg-wax py-24 text-ink sm:py-32">
      <div className="shell">
        <SectionHeader
          tone="light"
          title="Less agency friction. More results."
          intro="What working with Viral Bee looks like, compared with what most businesses put up with."
        />

        <ul className="mt-14 -mx-5 flex snap-x snap-mandatory overflow-x-auto px-5 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden gap-4 sm:-mx-8 sm:mt-20 sm:px-8 md:mx-0 md:grid md:grid-cols-2 md:gap-x-10 md:gap-y-12 md:overflow-visible md:px-0 md:pb-0 lg:gap-x-16">
          {WHY_CHOOSE_US.map((item, idx) => (
            <Reveal
              as="li"
              key={item.title}
              delay={(idx % 2) * 0.08}
              className="w-[84%] shrink-0 snap-center rounded-3xl border border-ink/10 bg-white p-7 text-center sm:w-[60%] md:w-auto md:rounded-none md:border-0 md:border-t md:border-ink/15 md:bg-transparent md:p-0 md:pt-7 md:text-left"
            >
              <p className="font-serif-display text-lg italic text-ink/75 line-through decoration-ink/35 decoration-1">
                <span className="sr-only">Instead of: </span>
                {item.usual}
              </p>
              <h3 className="mt-3 font-display text-2xl font-semibold leading-snug text-ink">
                <span className="sr-only">With Viral Bee: </span>
                {item.title}
              </h3>
              <p className="mx-auto mt-3 max-w-[52ch] text-base leading-relaxed text-ink/70 md:mx-0">
                {item.description}
              </p>
            </Reveal>
          ))}
        </ul>

        <div className="mt-14 flex justify-center sm:mt-16">
          <Link
            to="/contact"
            className="group inline-flex h-12 items-center gap-2 rounded-full bg-ink px-6 text-[15px] font-semibold text-wax transition-colors hover:bg-black"
          >
            Start a conversation
            <ArrowRight className="h-4 w-4 text-gold transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
};
