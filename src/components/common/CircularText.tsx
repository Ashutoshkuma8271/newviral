import React, { useId } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface CircularTextProps {
  /** Text to render in a circle */
  text?: string;
  /** Radius of the circular text path in pixels */
  radius?: number;
  /** Spin duration in seconds */
  spinDuration?: number;
  /** Text color class */
  className?: string;
  /** Optional center element (e.g. icon or badge) */
  centerContent?: React.ReactNode;
  /** Direction of rotation */
  direction?: 'clockwise' | 'counter-clockwise';
  /** Whether to speed up on hover */
  hoverSpeedUp?: boolean;
}

/**
 * CircularText: Premium Curved Text Animation Component
 * Inspired by React Bits & 21st.dev circular typography patterns.
 *
 * Renders high-legibility text seamlessly wrapped around a circular SVG path,
 * rotating with organic continuous motion, interactive hover reactivity,
 * and full accessibility support for reduced motion.
 */
export const CircularText: React.FC<CircularTextProps> = ({
  text = '• VYRAL BEE DIGITAL AGENCY • EST. 2024 • WE MAKE BRANDS VISIBLE ',
  radius = 56,
  spinDuration = 22,
  className = '',
  centerContent,
  direction = 'clockwise',
  hoverSpeedUp = true,
}) => {
  const reduce = useReducedMotion();
  const rawId = useId();
  const pathId = `circle-path-${rawId.replace(/[^a-zA-Z0-9_-]/g, '')}`;

  const diameter = radius * 2;
  const viewBoxSize = diameter + 36;
  const center = viewBoxSize / 2;

  // Path coordinates for a perfect circle
  const pathData = `
    M ${center},${center - radius}
    a ${radius},${radius} 0 1,1 0,${radius * 2}
    a ${radius},${radius} 0 1,1 0,-${radius * 2}
  `;

  return (
    <div
      className={`group relative inline-flex items-center justify-center select-none ${className}`}
      style={{ width: viewBoxSize, height: viewBoxSize }}
      aria-label={text}
    >
      {/* Rotating SVG Circular Path */}
      <motion.svg
        viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
        className="h-full w-full overflow-visible will-change-transform"
        animate={
          reduce
            ? undefined
            : {
                rotate: direction === 'clockwise' ? 360 : -360,
              }
        }
        transition={
          reduce
            ? undefined
            : {
                repeat: Infinity,
                duration: spinDuration,
                ease: 'linear',
              }
        }
      >
        <defs>
          <path id={pathId} d={pathData} fill="none" />
        </defs>
        <text className="font-mono text-[9px] font-bold uppercase tracking-[0.22em] fill-current text-[#C5BED2] group-hover:text-white transition-colors duration-300">
          <textPath
            href={`#${pathId}`}
            startOffset="0%"
            textLength={`${Math.PI * 2 * radius - 8}`}
            lengthAdjust="spacingAndGlyphs"
          >
            {text}
          </textPath>
        </text>
      </motion.svg>

      {/* Central Content Node */}
      {centerContent && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {centerContent}
        </div>
      )}
    </div>
  );
};

export default CircularText;
