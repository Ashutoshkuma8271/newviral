import React from 'react';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

/**
 * Universal Shimmer Skeleton
 * Renders an animated neutral obsidian/amber glass placeholder.
 */
export const Skeleton: React.FC<SkeletonProps> = ({ className = '', ...props }) => {
  return (
    <div
      aria-hidden="true"
      className={`relative overflow-hidden rounded-xl bg-white/[0.05] before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.8s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/[0.08] before:to-transparent ${className}`}
      {...props}
    />
  );
};

/**
 * CardSkeleton
 * Mimics service/portfolio cards during initial data loads or page transitions.
 */
export const CardSkeleton: React.FC<{ hasImage?: boolean; className?: string }> = ({
  hasImage = true,
  className = '',
}) => {
  return (
    <div
      aria-hidden="true"
      className={`relative overflow-hidden rounded-3xl border border-white/10 bg-[#161722]/80 p-6 sm:p-8 backdrop-blur-md ${className}`}
    >
      {/* Top category & indicator */}
      <div className="flex items-center justify-between pb-4">
        <Skeleton className="h-4 w-28 rounded-full" />
        <Skeleton className="h-5 w-20 rounded-full" />
      </div>

      {/* Optional image frame */}
      {hasImage && (
        <div className="my-4 aspect-[16/10] w-full overflow-hidden rounded-2xl">
          <Skeleton className="h-full w-full rounded-2xl" />
        </div>
      )}

      {/* Title */}
      <Skeleton className="mt-3 h-8 w-3/4 rounded-lg" />

      {/* Description lines */}
      <div className="mt-4 space-y-2">
        <Skeleton className="h-4 w-full rounded-md" />
        <Skeleton className="h-4 w-5/6 rounded-md" />
      </div>

      {/* Pill tags */}
      <div className="mt-6 flex flex-wrap gap-2">
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-6 w-20 rounded-full" />
        <Skeleton className="h-6 w-14 rounded-full" />
      </div>

      {/* Bottom action row */}
      <div className="mt-6 flex items-center justify-between pt-4 border-t border-white/[0.08]">
        <Skeleton className="h-4 w-24 rounded-md" />
        <Skeleton className="h-10 w-10 rounded-full" />
      </div>
    </div>
  );
};

/**
 * PageSkeletonLoader
 * Shown as Suspense fallback during route transitions.
 * Perfectly mimics hero headers and content sections with zero jarring flashes.
 */
export const PageSkeletonLoader: React.FC = () => {
  return (
    <div
      role="status"
      aria-label="Loading page"
      className="relative min-h-[85vh] w-full overflow-hidden bg-[#0C0D12] pt-24 pb-20 text-white"
    >
      {/* Background ambient lighting cones */}
      <div className="pointer-events-none absolute -top-40 left-1/4 h-[500px] w-[500px] rounded-full bg-[#F59E0B]/05 blur-[160px]" />
      <div className="pointer-events-none absolute top-1/2 -right-40 h-[500px] w-[500px] rounded-full bg-[#2563EB]/05 blur-[160px]" />

      <div className="shell relative z-10 max-w-7xl">
        {/* Page Header Skeleton */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto py-12">
          {/* Eyebrow badge */}
          <Skeleton className="h-6 w-36 rounded-full" />
          {/* Main title */}
          <Skeleton className="mt-6 h-12 sm:h-16 w-4/5 max-w-xl rounded-2xl" />
          <Skeleton className="mt-3 h-10 w-3/5 max-w-md rounded-xl" />
          {/* Intro paragraph */}
          <div className="mt-6 space-y-2 w-full max-w-lg">
            <Skeleton className="h-4 w-full rounded-md" />
            <Skeleton className="h-4 w-4/5 mx-auto rounded-md" />
          </div>
        </div>

        {/* 3-Card Grid Skeleton */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <CardSkeleton hasImage={true} />
          <CardSkeleton hasImage={true} />
          <CardSkeleton hasImage={true} />
        </div>
      </div>
      <span className="sr-only">Loading page content…</span>
    </div>
  );
};

