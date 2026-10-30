import React from 'react';
import { motion } from 'framer-motion';
import { TRUST_STRIP } from '../constants/content.ts';

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Hero trust strip. Everything comes from TRUST_STRIP in constants/content.ts: client logos (shown when provided)
 * and short value/label facts. Swap the data there; this component does not need to change.
 */
export const TrustStrip: React.FC<{ delay?: number; animate?: boolean }> = ({ delay = 0, animate = true }) => {
  const { label, items, clientLogos } = TRUST_STRIP;
  if (!items.length && !clientLogos.length) return null;

  return (
    <motion.div
      initial={animate ? { opacity: 0, y: 14 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay, ease: EASE }}
      className="mt-10 w-full border-t border-[#334155]/60 pt-6 lg:mt-9 lg:flex lg:max-w-3xl lg:items-center lg:gap-8 lg:pt-5"
    >
      <p className="shrink-0 text-xs font-semibold uppercase tracking-[0.22em] text-[#94A3B8]">{label}</p>
      {clientLogos.length > 0 && (
        <ul className="mt-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 lg:justify-start">
          {clientLogos.map((logo) => (
            <li key={logo.name}>
              <img src={logo.src} alt={logo.name} className="h-7 w-auto opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0" />
            </li>
          ))}
        </ul>
      )}
      <ul className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-2 lg:mt-0 lg:flex-nowrap lg:justify-start">
        {items.map((item) => (
          <li key={item.label} className="flex items-baseline gap-2 whitespace-nowrap">
            <span className="font-display text-xl font-semibold text-[#F8FAFC] lg:text-2xl">{item.value}</span>
            <span className="text-sm text-[#94A3B8]">{item.label}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};
