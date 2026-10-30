import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showWordmark?: boolean;
  showTagline?: boolean;
}

const markSize = {
  sm: 'h-8 w-8',
  md: 'h-10 w-10 lg:h-12 lg:w-12',
  lg: 'h-12 w-12 sm:h-14 sm:w-14',
  xl: 'h-16 w-16 sm:h-20 sm:w-20',
};

const wordSize = {
  sm: 'text-lg',
  md: 'text-[22px] lg:text-[26px]',
  lg: 'text-2xl sm:text-3xl',
  xl: 'text-3xl sm:text-4xl',
};

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  showWordmark = true,
  showTagline = false,
}) => {
  return (
    <div className={`group flex select-none items-center gap-3 ${className}`}>
      <div className="relative shrink-0">
        <div
          className="pointer-events-none absolute inset-0 -m-1 rounded-full opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-75 bg-accent/40"
          aria-hidden="true"
        />
        <img
          src="/logo.svg"
          alt="Vyral Bee logo mark"
          aria-hidden="true"
          width={40}
          height={40}
          className={`${markSize[size]} relative shrink-0 object-contain transition-transform duration-300 ease-out group-hover:scale-105`}
          loading="eager"
          decoding="async"
        />
      </div>

      {showWordmark && (
        <div className="flex flex-col justify-center text-left">
          <span className={`font-display font-bold leading-none tracking-[-0.02em] text-[#F8FAFC] ${wordSize[size]}`}>
            Vyral{' '}
            <span className="bg-gradient-to-r from-[#2563EB] via-[#38BDF8] to-[#C4B5FD] bg-clip-text text-transparent">
              Bee
            </span>
          </span>
          {showTagline && (
            <span className="mt-1 text-[11px] font-medium uppercase tracking-[0.16em] text-[#94A3B8]">
              Create • Connect • Convert
            </span>
          )}
        </div>
      )}
    </div>
  );
};
