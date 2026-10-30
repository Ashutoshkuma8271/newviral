import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { Logo } from './Logo.tsx';
import { NAV_LINKS, BRAND } from '../constants/content.ts';
import { lockScroll } from '../lib/smoothScroll.ts';
import { Magnetic } from './common/Magnetic.tsx';
import { EASE } from '../lib/motion.ts';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

export const Navbar: React.FC = () => {
  const reduceMotion = useReducedMotion();
  const [isScrolled, setIsScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredHref, setHoveredHref] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const lastY = useRef(0);
  const location = useLocation();

  // Solid after a little scroll; slides away while scrolling down, comes back as soon as you scroll up.
  // Never hidden near the top, or while keyboard focus is inside the header.
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setIsScrolled(y > 24);
      const delta = y - lastY.current;
      if (Math.abs(delta) > 6) {
        const focusInside = headerRef.current?.contains(document.activeElement);
        setHidden(delta > 0 && y > 160 && !focusInside);
        lastY.current = y;
      }
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Lock page scroll while the mobile menu is open
  useEffect(() => {
    lockScroll(mobileMenuOpen);
    return () => lockScroll(false);
  }, [mobileMenuOpen]);

  const solid = isScrolled || mobileMenuOpen;
  const tucked = hidden && !mobileMenuOpen && !reduceMotion;

  return (
    <>
      <header
        ref={headerRef}
        onFocus={() => setHidden(false)}
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,transform,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          solid
            ? 'border-b border-white/10 bg-[#0C0D12]/92 backdrop-blur-2xl shadow-[0_4px_30px_rgba(8,9,14,0.7)]'
            : 'border-b border-transparent bg-transparent'
        } ${tucked ? '-translate-y-full' : 'translate-y-0'}`}
      >
        <div
          className={`shell flex h-20 items-center justify-between transition-[height] duration-300 ease-out ${
            isScrolled ? 'lg:h-18' : 'lg:h-23'
          }`}
        >
          <Link to="/" className="shrink-0 transition-transform duration-300 hover:scale-[1.02]" aria-label="Vyral Bee home">
            <Logo size="md" />
          </Link>

          <nav className="hidden items-center gap-1.5 rounded-full border border-white/10 bg-[#161722]/85 p-1.5 backdrop-blur-md lg:flex xl:gap-2" aria-label="Main" onMouseLeave={() => setHoveredHref(null)}>
            {NAV_LINKS.filter((link) => link.href !== '/contact').map((link) => {
              const current = link.href === '/' ? location.pathname === '/' : location.pathname.startsWith(link.href);
              const marked = hoveredHref ? hoveredHref === link.href : current;
              return (
                <NavLink
                  key={link.label}
                  to={link.href}
                  end={link.href === '/'}
                  onMouseEnter={() => setHoveredHref(link.href)}
                  onFocus={() => setHoveredHref(link.href)}
                  onBlur={() => setHoveredHref(null)}
                  className={({ isActive }) =>
                    `relative rounded-full px-4 py-2 text-[14px] font-medium transition-all duration-200 xl:px-5 xl:text-[15px] ${
                      isActive || marked ? 'text-white' : 'text-[#CBD5E1] hover:text-white'
                    }`
                  }
                >
                  {marked && (
                    <motion.span
                      layoutId="nav-pill"
                      transition={reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 500, damping: 35 }}
                      className="absolute inset-0 rounded-full bg-[#222434] border border-white/15"
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    {link.label}
                    {current && (
                      <span className="h-1.5 w-1.5 rounded-full bg-[#F59E0B] shadow-[0_0_8px_#F59E0B]" />
                    )}
                  </span>
                </NavLink>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <Magnetic>
              <Link
                to="/contact"
                className="group relative hidden items-center gap-2.5 overflow-hidden rounded-full border border-amber-300/40 bg-gradient-to-r from-[#F59E0B] via-[#EAB308] to-[#D97706] px-5 py-2 text-sm font-bold text-[#0C0D12] shadow-[0_4px_16px_rgba(245,158,11,0.45),inset_0_1px_1px_rgba(255,255,255,0.6)] backdrop-blur-md transition-all duration-300 ease-out hover:scale-105 hover:border-amber-200 hover:shadow-[0_0_24px_rgba(245,158,11,0.75)] active:scale-[0.98] sm:inline-flex"
              >
                <span className="relative z-10 tracking-[-0.01em] font-bold">Let's talk</span>
                <span className="relative z-10 flex h-6 w-6 items-center justify-center rounded-full bg-[#0C0D12]/20 text-[#0C0D12] backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-[#0C0D12] group-hover:text-[#F59E0B]">
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
              </Link>
            </Magnetic>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-[#161722]/80 text-white backdrop-blur-md transition-colors hover:border-[#F59E0B]/50 hover:bg-[#202230] lg:hidden touch-manipulation"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Rendered outside <header>: the header's backdrop blur would otherwise trap this fixed panel inside the 80px bar */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={reduceMotion ? false : { clipPath: 'circle(0% at calc(100% - 42px) -40px)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 42px) -40px)' }}
            exit={reduceMotion ? { opacity: 0 } : { clipPath: 'circle(0% at calc(100% - 42px) -40px)' }}
            transition={{ duration: 0.65, ease: EASE }}
            data-lenis-prevent
            className="fixed inset-x-0 bottom-0 top-20 z-40 flex flex-col justify-between overflow-y-auto bg-[#0C0D12]/98 px-5 pb-8 pt-4 backdrop-blur-3xl sm:px-8 lg:hidden"
          >
            <nav className="flex flex-col" aria-label="Mobile">
              {NAV_LINKS.map((link, i) => (
                <div key={link.label} className="overflow-hidden border-b border-border/40">
                  <motion.div
                    initial={reduceMotion ? false : { y: '110%' }}
                    animate={{ y: '0%' }}
                    transition={{ duration: 0.55, delay: 0.15 + i * 0.04, ease: EASE }}
                  >
                    <NavLink
                      to={link.href}
                      end={link.href === '/'}
                      onClick={() => setMobileMenuOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-4 py-4 font-display text-3xl font-medium transition-colors sm:text-4xl ${
                          isActive ? 'text-[#F59E0B]' : 'text-white hover:text-[#FBBF24]'
                        }`
                      }
                    >
                      <span className="w-7 text-sm font-semibold tabular-nums text-white/35">{String(i + 1).padStart(2, '0')}</span>
                      <span className="flex-1">{link.label}</span>
                      <ArrowUpRight className="h-5 w-5 text-white/30" />
                    </NavLink>
                  </motion.div>
                </div>
              ))}
            </nav>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45, ease: EASE }}
              className="flex flex-col gap-3.5 pt-8"
            >
              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="group relative flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-full border border-white/20 bg-gradient-to-r from-[#2563EB] to-[#0284C7] py-3.5 text-center text-base font-bold text-white shadow-[0_4px_20px_rgba(37,99,235,0.45),inset_0_1px_1px_rgba(255,255,255,0.4)] transition-all duration-300 hover:scale-[1.02] hover:border-[#38BDF8] active:scale-[0.98]"
              >
                <span className="relative z-10">Get a free strategy call</span>
                <ArrowUpRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
              </Link>
              <div className="flex items-center justify-center gap-6 pt-2">
                <a
                  href={`mailto:${BRAND.contact.email}`}
                  className="text-sm font-medium text-lavender hover:text-white"
                >
                  {BRAND.contact.email}
                </a>
                <span className="h-1 w-1 rounded-full bg-white/30" />
                <a
                  href={`tel:${BRAND.contact.phone.replace(/[^+\d]/g, '')}`}
                  className="text-sm font-medium text-lavender hover:text-white"
                >
                  {BRAND.contact.phone}
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
