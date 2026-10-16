import React from 'react';
import { Reveal } from './Reveal.tsx';
import { RevealWords } from './RevealWords.tsx';
import { useMediaQuery } from '../../lib/motion.ts';

interface SectionHeaderProps {
  title: React.ReactNode;
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
        {eyebrow && <p className={`mb-4 text-base font-medium ${light ? 'text-gold-dark' : 'text-gold'}`}>{eyebrow}</p>}
        <h2 className={`text-balance text-fluid-h2 font-display font-semibold ${light ? 'text-ink' : 'text-white'}`}>
          {typeof title === 'string' ? <RevealWords text={title} /> : title}
        </h2>
      </div>

      {intro && (
        <Reveal
          as="p"
          direction={wide ? 'right' : 'up'}
          delay={0.15}
          className={`mx-auto max-w-xl text-balance font-serif-display text-xl leading-relaxed sm:text-2xl lg:col-span-5 lg:mx-0 lg:max-w-md lg:justify-self-end lg:text-left ${
            light ? 'text-ink/70' : 'text-white/70'
          }`}
        >
          {intro}
        </Reveal>
      )}
    </div>
  );
};
