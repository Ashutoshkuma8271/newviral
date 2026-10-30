import React from 'react';

interface ShimmerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  shimmerColor?: string;
  shimmerSize?: string;
  borderRadius?: string;
  shimmerDuration?: string;
  background?: string;
  className?: string;
  children?: React.ReactNode;
}

/**
 * 21st.dev inspired ShimmerButton component:
 * A modern button with a radiant shimmering light ring and fluid hover state.
 */
export const ShimmerButton = React.forwardRef<HTMLButtonElement, ShimmerButtonProps>(
  (
    {
      shimmerColor = '#38BDF8',
      shimmerSize = '0.1em',
      shimmerDuration = '2.5s',
      borderRadius = '9999px',
      background = 'rgba(11, 16, 32, 0.85)',
      className = '',
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        style={
          {
            '--spread': '90deg',
            '--shimmer-color': shimmerColor,
            '--radius': borderRadius,
            '--speed': shimmerDuration,
            '--cut': shimmerSize,
            '--bg': background,
          } as React.CSSProperties
        }
        className={`group relative z-0 flex cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap border border-white/15 px-6 py-3 text-white [background:var(--bg)] [border-radius:var(--radius)] transition-all duration-300 hover:scale-[1.02] hover:border-[#38BDF8]/50 hover:shadow-[0_0_28px_rgba(56,189,248,0.35)] active:scale-[0.98] ${className}`}
        ref={ref}
        {...props}
      >
        {/* Spark container */}
        <div className="absolute inset-0 -z-30 overflow-visible [container-type:size]">
          <div className="absolute inset-0 h-[100cqh] animate-spin [aspect-ratio:1] [border-radius:0] [mask:none]">
            <div className="absolute inset-[-100%] w-auto rotate-0 [background:conic-gradient(from_calc(270deg-(var(--spread)*0.5)),transparent_0,var(--shimmer-color)_var(--spread),transparent_var(--spread))] [translate:0_0]" />
          </div>
        </div>

        {/* Inner backdrop */}
        <div className="absolute [inset:var(--cut)] -z-20 rounded-[inherit] bg-[#0C0D12]/90 backdrop-blur-md transition-colors group-hover:bg-[#0C0D12]/80" />

        {/* Content */}
        <span className="relative z-10 flex items-center gap-2 font-sans font-semibold text-sm sm:text-base text-white tracking-wide">
          {children}
        </span>
      </button>
    );
  },
);

ShimmerButton.displayName = 'ShimmerButton';

export default ShimmerButton;
