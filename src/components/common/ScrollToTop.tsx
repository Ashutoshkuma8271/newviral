import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { resetScroll } from '../../lib/smoothScroll.ts';
import { ScrollTrigger } from '../../lib/gsap.ts';

export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    resetScroll();
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 120);
    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
};
