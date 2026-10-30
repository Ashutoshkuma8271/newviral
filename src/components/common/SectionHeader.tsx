import React from 'react';
import { Reveal } from './Reveal.tsx';
import { RevealWords } from './RevealWords.tsx';
import { useMediaQuery } from '../../lib/motion.ts';

interface SectionHeaderProps {
  title: React.ReactNode;
  /** One phrase of a text title to set as the gold accent */
  accent?: string;
  intro?: React.ReactNode;
  /** Optional small line above the title; use only when it adds information */
  eyebrow?: string;
  tone?: 'dark' | 'light';
  className?: string;
}

/**
 * Shared section heading.
 * Below 1024px (phone and tablet): heading then intro, both centred in one column.
 * From 1024px (laptop and desktop): heading on the left and intro on the right, vertically centred against each
 * other so they sit on the same horizontal line and use the whole width. A section's button is placed by the section
 * itself, centred beneath its content.
 */
export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  accent,
  intro,
  eyebrow,
  tone = 'dark',
  className = '',
}) => {
  const light = tone === 'light';
  const wide = useMediaQuery('(min-width: 1024px)');
  return (
    <div className={`grid gap-6 text-center lg:grid-cols-12 lg:items-center lg:gap-14 lg:text-left ${className}`}>
      <div className="mx-auto max-w-3xl lg:col-span-7 lg:mx-0 lg:max-w-none">
        {eyebrow && (
          <Reveal
            as="p"
            className="mb-4 text-[13px] font-semibold uppercase tracking-[0.18em] text-[#F59E0B]"
          >
            {eyebrow}
          </Reveal>
        )}
        <h2 className="text-balance text-fluid-h2 font-display font-semibold text-white">
          {typeof title === 'string' ? (
            <RevealWords text={title} accent={accent} tone={tone} delay={eyebrow ? 0.12 : 0} />
          ) : (
            title
          )}
        </h2>
      </div>

      {intro && (
        <Reveal
          as="p"
          direction={wide ? 'right' : 'up'}
          delay={0.15}
          className="mx-auto max-w-xl text-balance font-serif-display text-[clamp(1.125rem,1.55vw,1.45rem)] font-normal italic leading-[1.5] text-[#CBD5E1] sm:text-xl lg:col-span-5 lg:mx-0 lg:max-w-[34ch] lg:justify-self-end lg:text-left"
        >
          {intro}
        </Reveal>
      )}
    </div>
  );
};
