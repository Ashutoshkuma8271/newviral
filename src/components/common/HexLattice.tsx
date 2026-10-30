import React from 'react';

interface HexLatticeProps {
  className?: string;
  width?: number | string;
  height?: number | string;
}

/**
 * Geometric honeycomb lattice unit, echoing the brand's architectural hexagon motif.
 * Faint decorative backdrop element with subtle gold stroke.
 */
export const HexLattice: React.FC<HexLatticeProps> = ({ className = '', width = 360, height = 396 }) => {
  return (
    <svg
      viewBox="0 0 300 330"
      fill="none"
      stroke="#8B5CF6"
      strokeWidth="1.5"
      width={width}
      height={height}
      className={`pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      <defs>
        <g id="hex-cell">
          <path d="M50 5 93 30v50L50 105 7 80V30z" />
        </g>
      </defs>
      <use href="#hex-cell" x="0" y="0" />
      <use href="#hex-cell" x="86" y="0" />
      <use href="#hex-cell" x="172" y="0" />
      <use href="#hex-cell" x="43" y="75" />
      <use href="#hex-cell" x="129" y="75" />
      <use href="#hex-cell" x="215" y="75" />
      <use href="#hex-cell" x="0" y="150" />
      <use href="#hex-cell" x="86" y="150" />
      <use href="#hex-cell" x="172" y="150" />
      <use href="#hex-cell" x="43" y="225" />
      <use href="#hex-cell" x="129" y="225" />
      <use href="#hex-cell" x="215" y="225" />
    </svg>
  );
};
