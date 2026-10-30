import React, { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface FilterRailProps {
  options: readonly string[];
  value: string;
  onChange: (value: string) => void;
  label: string;
  className?: string;
}

/** One-line filter pills. Wide screens show them all; narrow screens swipe sideways with faded edges. */
export const FilterRail: React.FC<FilterRailProps> = ({ options, value, onChange, label, className = '' }) => {
  const railRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // Keep the selected pill in view when the rail is scrollable
  useEffect(() => {
    const rail = railRef.current;
    const active = rail?.querySelector<HTMLElement>('[aria-pressed="true"]');
    if (!rail || !active || rail.scrollWidth <= rail.clientWidth) return;
    rail.scrollTo({ left: active.offsetLeft - (rail.clientWidth - active.clientWidth) / 2, behavior: reduce ? 'instant' : 'smooth' });
  }, [value, reduce]);

  return (
    <div
      ref={railRef}
      role="group"
      aria-label={label}
      data-lenis-prevent-touch
      className={`relative -mx-5 flex snap-x self-stretch md:self-auto items-center gap-1.5 overflow-x-auto rounded-full border border-white/10 bg-[#161F36]/70 p-1.5 backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.08),0_4px_20px_rgba(0,0,0,0.3)] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 ${className}`}
    >
      {options.map((option) => {
        const active = option === value;
        return (
          <button
            key={option}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(option)}
            className={`relative isolate h-10 shrink-0 snap-start cursor-pointer whitespace-nowrap rounded-full px-4 sm:px-5 text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#38BDF8] ${
              active
                ? 'text-white'
                : 'text-[#94A3B8] hover:text-white hover:bg-white/5'
            }`}
          >
            {active && (
              <motion.span
                layoutId={reduce ? undefined : 'active-filter-pill'}
                transition={{ type: 'spring', stiffness: 450, damping: 34 }}
                className="absolute inset-0 -z-10 rounded-full border border-white/25 bg-gradient-to-r from-[#2563EB] to-[#0284C7] shadow-[0_2px_16px_rgba(37,99,235,0.45),inset_0_1px_1px_rgba(255,255,255,0.4)]"
              />
            )}
            <span className="relative z-10 tracking-[-0.01em]">{option}</span>
          </button>
        );
      })}
    </div>
  );
};

