import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useMediaQuery } from '../../lib/motion.ts';
import { scrollToY } from '../../lib/smoothScroll.ts';

interface Chapter {
  id: string;
  name: string;
}

const CHAPTERS: Chapter[] = [
  { id: 'hero', name: 'Intro' },
  { id: 'services', name: 'Services' },
  { id: 'statement', name: 'Vision' },
  { id: 'about', name: 'About' },
  { id: 'work-preview', name: 'Work' },
  { id: 'process-preview', name: 'Process' },
  { id: 'why-choose-us', name: 'Why Us' },
  { id: 'cta', name: 'Contact' },
];

/**
 * Film chapter indicator on laptop & desktop screens.
 * Floating dots on the right edge that highlight the active scene and jump on click.
 * Completely bypassed for touch devices and reduced-motion users.
 */
export const ChapterIndicator: React.FC = () => {
  const reduce = useReducedMotion();
  const wide = useMediaQuery('(min-width: 1200px)');
  const fine = useMediaQuery('(hover: hover) and (pointer: fine)');
  const [activeId, setActiveId] = useState<string>('hero');

  useEffect(() => {
    if (reduce || !wide || !fine) return;

    const sections = CHAPTERS.map((ch) => document.getElementById(ch.id)).filter(Boolean) as HTMLElement[];
    if (sections.length === 0) return;

    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight * 0.4;
      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i];
        if (sec.offsetTop <= scrollPos) {
          setActiveId(sec.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [reduce, wide, fine]);

  if (reduce || !wide || !fine) return null;

  const handleJump = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const targetY = window.scrollY + el.getBoundingClientRect().top;
    scrollToY(Math.max(0, targetY), false);
  };

  return (
    <nav
      aria-label="Chapter navigation"
      className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-3.5 xl:flex"
    >
      {CHAPTERS.map((ch) => {
        const isActive = ch.id === activeId;
        return (
          <button
            key={ch.id}
            type="button"
            onClick={() => handleJump(ch.id)}
            aria-label={`Jump to ${ch.name}`}
            className="group relative flex items-center justify-end py-1 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
          >
            {/* Tooltip text revealing on hover */}
            <span className="pointer-events-none mr-3 whitespace-nowrap rounded-md bg-[#0C0D12]/95 px-2 py-0.5 font-display text-xs font-semibold text-white opacity-0 shadow-lg backdrop-blur-md transition-opacity duration-200 group-hover:opacity-100 border border-white/15">
              {ch.name}
            </span>

            {/* Indicator Dot */}
            <span className="relative flex h-3 w-3 items-center justify-center">
              {isActive && (
                <motion.span
                  layoutId="active-chapter-ring"
                  transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                  className="absolute inset-0 rounded-full border border-accent"
                />
              )}
              <span
                className={`rounded-full transition-all duration-300 ${
                  isActive
                    ? 'h-1.5 w-1.5 bg-accent shadow-[0_0_8px_rgba(56, 189, 248,0.8)]'
                    : 'h-1 w-1 bg-white/30 group-hover:bg-white/70 group-hover:scale-125'
                }`}
              />
            </span>
          </button>
        );
      })}
    </nav>
  );
};
