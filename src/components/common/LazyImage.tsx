import React, { useState } from 'react';
import { ImageIcon } from 'lucide-react';
import { Skeleton } from './Skeleton.tsx';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /** Sources used below 768px wide (e.g. portrait crops) */
  mobileSrcSet?: string;
  mobileSizes?: string;
  /** Classes for the wrapper, which owns size and aspect ratio */
  wrapperClassName?: string;
  /** Whether this image is high priority above the fold */
  priority?: boolean;
}

/**
 * Universal LazyImage with Built-in Shimmer Skeleton & Fade-In Animation.
 * Prevents layout shift (CLS), displays an animated obsidian skeleton while loading,
 * and cross-fades smoothly into view once decoded.
 */
export const LazyImage: React.FC<LazyImageProps> = ({
  src,
  srcSet,
  mobileSrcSet,
  mobileSizes = '100vw',
  wrapperClassName = '',
  className = '',
  alt = '',
  priority = false,
  onLoad,
  ...img
}) => {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  // Position class for wrapper
  const position = /\b(absolute|fixed)\b/.test(wrapperClassName) ? '' : 'relative';

  return (
    <div className={`${position} overflow-hidden bg-[#161722] ${wrapperClassName}`}>
      {/* Animated Shimmer Skeleton Placeholder */}
      {!loaded && !failed && (
        <Skeleton className="absolute inset-0 z-[1] h-full w-full rounded-none" />
      )}

      {/* Fallback state if image cannot be loaded */}
      {failed ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#161722] text-white/40 p-4 text-center">
          <ImageIcon className="h-8 w-8 mb-2 opacity-50" aria-hidden="true" />
          <span className="text-xs font-mono tracking-wider uppercase">{alt || 'Image Preview'}</span>
        </div>
      ) : (
        <picture>
          {mobileSrcSet && <source media="(max-width: 767px)" srcSet={mobileSrcSet} sizes={mobileSizes} />}
          <img
            ref={(el) => {
              if (el?.complete && el.naturalWidth) setLoaded(true);
            }}
            src={src}
            srcSet={srcSet}
            alt={alt}
            loading={priority ? 'eager' : 'lazy'}
            decoding={priority ? 'sync' : 'async'}
            fetchPriority={priority ? 'high' : 'auto'}
            onLoad={(e) => {
              setLoaded(true);
              onLoad?.(e);
            }}
            onError={() => setFailed(true)}
            className={`h-full w-full object-cover transition-all duration-700 ease-out ${
              loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            } ${className}`}
            {...img}
          />
        </picture>
      )}
    </div>
  );
};

export default LazyImage;
