import React from 'react';

interface PillMarqueeProps {
  items: { label: string; href: string }[];
  /** Seconds for one full loop */
  duration?: number;
  className?: string;
}

/**
 * Endless sliding row of link pills (same motion as the gold ticker). Pauses on hover, touch and keyboard focus so the
 * links are easy to hit; the edges fade out; with reduced motion it becomes a normal swipeable row.
 */
export const PillMarquee: React.FC<PillMarqueeProps> = ({ items, duration = 36, className = '' }) => {
  const row = (copy: number) => (
    <ul className="flex shrink-0 items-center gap-3 pr-3" aria-hidden={copy > 0 || undefined}>
      {items.map((item) => (
        <li key={`${copy}-${item.href}`}>
          <a
            href={item.href}
            tabIndex={copy > 0 ? -1 : undefined}
            className="inline-flex h-11 items-center whitespace-nowrap rounded-full border border-[#334155] bg-[#161F36]/80 px-5 text-[15px] font-medium text-[#F8FAFC] backdrop-blur-md transition-all hover:border-[#38BDF8] hover:bg-[#2563EB]/25 hover:text-white focus-visible:border-[#38BDF8] focus-visible:bg-[#2563EB]/25 focus-visible:text-white"
          >
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  );

  return (
    <nav
      aria-label="Jump to a section"
      className={`marquee marquee-pills overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)] ${className}`}
    >
      <div className="marquee-track" style={{ ['--marquee-duration' as string]: `${duration}s` }}>
        {row(0)}
        {row(1)}
      </div>
    </nav>
  );
};
