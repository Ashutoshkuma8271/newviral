import type Lenis from 'lenis';

/**
 * Global reference to the active Lenis instance managed by SmoothScrollProvider.
 * Provides unified helper functions for programmatic scrolling, locking, and resetting.
 */
let activeLenis: Lenis | null = null;

export function setGlobalLenis(instance: Lenis | null) {
  activeLenis = instance;
}

export function getLenis(): Lenis | null {
  return activeLenis;
}

/**
 * Legacy start function maintained for backward compatibility.
 * The primary lifecycle is now managed by SmoothScrollProvider.
 */
export function startSmoothScroll() {
  if (activeLenis) {
    activeLenis.start();
  }
}

/**
 * Legacy stop function maintained for backward compatibility.
 */
export function stopSmoothScroll() {
  if (activeLenis) {
    activeLenis.stop();
  }
}

/**
 * Jump to the top without animation (e.g. on route changes).
 */
export function resetScroll() {
  if (activeLenis) {
    activeLenis.scrollTo(0, { immediate: true, force: true });
  } else if (typeof window !== 'undefined') {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }
}

/**
 * Freeze or release page scrolling, e.g. while the mobile menu or modal is open.
 */
export function lockScroll(locked: boolean) {
  if (activeLenis) {
    if (locked) activeLenis.stop();
    else activeLenis.start();
  }
  if (typeof document !== 'undefined') {
    document.body.style.overflow = locked ? 'hidden' : '';
  }
}

/**
 * Scroll smoothly to a vertical coordinate, respecting Lenis and reduced motion.
 */
export function scrollToY(targetY: number, immediate = false) {
  if (typeof window === 'undefined') return;
  const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (activeLenis && !immediate && !isReduced) {
    activeLenis.scrollTo(targetY, { duration: 1.2 });
  } else {
    window.scrollTo({ top: targetY, behavior: immediate || isReduced ? 'instant' : 'smooth' });
  }
}

export default {
  setGlobalLenis,
  getLenis,
  startSmoothScroll,
  stopSmoothScroll,
  resetScroll,
  lockScroll,
  scrollToY,
};
