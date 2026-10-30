import React, { Suspense, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '../Navbar.tsx';
import { Footer } from '../Footer.tsx';
import { ScrollToTop } from '../common/ScrollToTop.tsx';
import { PageLoader } from '../common/PageLoader.tsx';
import { ErrorBoundary } from '../common/ErrorBoundary.tsx';
import { resetScroll, startSmoothScroll, stopSmoothScroll } from '../../lib/smoothScroll.ts';
import { ScrollProgress } from '../common/ScrollProgress.tsx';
import { FloatingWhatsApp } from '../common/FloatingWhatsApp.tsx';

export const Layout: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    startSmoothScroll();
    return stopSmoothScroll;
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0C0D12] text-white flex flex-col selection:bg-[#F59E0B] selection:text-[#0C0D12] overflow-x-clip">
      {/* Cinematic Ambient Atmosphere (Subtle Amber & Warm Graphite Ambience, No Blue Blobs) */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-[25%] left-1/2 -translate-x-1/2 h-[750px] w-[1200px] rounded-full bg-gradient-to-b from-[#F59E0B]/08 via-[#D97706]/05 to-transparent blur-[160px]" />
        <div className="absolute top-[35%] -left-[15%] h-[650px] w-[850px] rounded-full bg-gradient-to-tr from-[#F59E0B]/06 via-transparent to-transparent blur-[150px]" />
        <div className="absolute top-[65%] -right-[15%] h-[700px] w-[900px] rounded-full bg-gradient-to-tl from-[#8B5CF6]/06 via-transparent to-transparent blur-[160px]" />
        <div className="absolute -bottom-[15%] left-1/3 h-[600px] w-[1000px] rounded-full bg-gradient-to-t from-[#F59E0B]/07 via-transparent to-transparent blur-[150px]" />
      </div>

      <ScrollToTop />
      <ScrollProgress />
      <FloatingWhatsApp />

      {/* Lets keyboard users jump past the navigation */}
      <a
        href="#main"
        className="sr-only z-[60] rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] px-5 py-3 text-sm font-semibold text-white shadow-lg focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>

      {/* Persistent Shared Header */}
      <Navbar />

      {/* Main Routed Content with Animated Route Transitions (padding = navbar height) */}
      {/* overflow-x-clip: 3D tilts may briefly reach past the screen edge; clip keeps sticky scenes working (hidden would not) */}
      <main id="main" tabIndex={-1} className="flex-grow overflow-x-clip pt-20 outline-none lg:pt-23">
        <AnimatePresence mode="wait" onExitComplete={() => resetScroll()}>
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{
              duration: 0.35,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="w-full flex flex-col"
          >
            <ErrorBoundary key={location.pathname}>
              <Suspense fallback={<PageLoader />}>
                <Outlet />
              </Suspense>
            </ErrorBoundary>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Persistent Shared Footer */}
      <Footer />
    </div>
  );
};
