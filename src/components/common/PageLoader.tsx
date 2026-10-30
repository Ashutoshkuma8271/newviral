import React from 'react';
import { PageSkeletonLoader } from './Skeleton.tsx';

/**
 * PageLoader: Editorial Shimmer Skeleton Screen
 * Used as the Suspense fallback while on-demand route chunks load.
 */
export const PageLoader: React.FC = () => {
  return <PageSkeletonLoader />;
};

export default PageLoader;
