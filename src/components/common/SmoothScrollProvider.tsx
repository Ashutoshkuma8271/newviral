import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from '../../lib/gsap.ts';
import { setGlobalLenis } from '../../lib/smoothScroll.ts';

export interface SmoothScrollContextValue {
  lenis: Lenis | null;
  scrollTo: (
    target: string | number | HTMLElement,
    options?: { offset?: number; immediate?: boolean; duration?: number }
  ) => void;
  lockScroll: (locked: boolean) => void;
  resetScroll: () => void;
}

const SmoothScrollContext = createContext<SmoothScrollContextValue>({
  lenis: null,
  scrollTo: () => {},
  lockScroll: () => {},
  resetScroll: () => {},
});

export const useSmoothScroll = () => useContext(SmoothScrollContext);

interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

/**
 * SmoothScrollProvider: Production-grade Lenis Smooth Scroll Integration
 *
 * Architecture:
 * - Initializes a single global Lenis instance across the entire application.
 * - Synchronizes with GSAP ScrollTrigger using the official GSAP ticker pattern.
 * - Uses ONLY ONE animation loop (gsap.ticker.add) with zero duplicate RAF calls.
 * - Disables GSAP ticker lagSmoothing (lagSmoothing(0)) to prevent jumpiness.
 * - Handles smooth scrolling for in-page anchor links (e.g. #services, #why-choose-us).
 * - Honors `prefers-reduced-motion` accessibility preferences.
 * - Properly cleans up GSAP ticker callbacks, event listeners, and Lenis instance on unmount.
 * - Preserves native mobile touch gestures, sticky headers, modals, and input fields.
 */
export const SmoothScrollProvider: React.FC<SmoothScrollProviderProps> = ({ children }) => {
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // 1. Accessibility Check: Respect reduced motion
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReducedMotion) {
      setGlobalLenis(null);
      return;
    }

    // 2. Initialize Lenis instance
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      autoResize: true,
    });

    lenisRef.current = lenis;
    setLenisInstance(lenis);
    setGlobalLenis(lenis);

    // 3. Official GSAP ScrollTrigger Synchronization
    // Update ScrollTrigger on every Lenis scroll event
    const handleScroll = () => {
      ScrollTrigger.update();
    };
    lenis.on('scroll', handleScroll);

    // 4. Single Animation Loop: Feed GSAP ticker into Lenis
    const handleTicker = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(handleTicker);

    // Turn off lagSmoothing so GSAP animations don't stutter or jump during smooth scrolling
    gsap.ticker.lagSmoothing(0);

    // 5. In-Page Anchor Smooth Scrolling (Preserving normal anchor navigation)
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a');
      if (!target) return;

      const href = target.getAttribute('href');
      // Only capture hash anchors pointing to current page elements
      if (href && href.startsWith('#') && href.length > 1) {
        const targetElement = document.querySelector(href);
        if (targetElement) {
          e.preventDefault();
          lenis.scrollTo(targetElement as HTMLElement, {
            offset: -80, // Accommodate sticky navbar height
            duration: 1.2,
          });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    // 6. Complete Cleanup on Unmount
    return () => {
      document.removeEventListener('click', handleAnchorClick);
      gsap.ticker.remove(handleTicker);
      lenis.off('scroll', handleScroll);
      lenis.destroy();
      lenisRef.current = null;
      setLenisInstance(null);
      setGlobalLenis(null);
    };
  }, []);

  const scrollTo = (
    target: string | number | HTMLElement,
    options?: { offset?: number; immediate?: boolean; duration?: number }
  ) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, options);
    } else if (typeof window !== 'undefined') {
      if (typeof target === 'number') {
        window.scrollTo({ top: target, behavior: options?.immediate ? 'instant' : 'smooth' });
      } else if (typeof target === 'string') {
        const el = document.querySelector(target);
        el?.scrollIntoView({ behavior: options?.immediate ? 'instant' : 'smooth' });
      } else if (target instanceof HTMLElement) {
        target.scrollIntoView({ behavior: options?.immediate ? 'instant' : 'smooth' });
      }
    }
  };

  const lockScroll = (locked: boolean) => {
    if (lenisRef.current) {
      if (locked) lenisRef.current.stop();
      else lenisRef.current.start();
    }
    document.body.style.overflow = locked ? 'hidden' : '';
  };

  const resetScroll = () => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true, force: true });
    } else if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    }
  };

  return (
    <SmoothScrollContext.Provider
      value={{
        lenis: lenisInstance,
        scrollTo,
        lockScroll,
        resetScroll,
      }}
    >
      {children}
    </SmoothScrollContext.Provider>
  );
};

export default SmoothScrollProvider;
