import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { SERVICES } from '../constants/content.ts';
import { PlatformLogos } from './common/PlatformLogos.tsx';
import { serviceSrc, serviceSrcSet } from '../lib/images.ts';
import { Skeleton } from './common/Skeleton.tsx';
import { gsap, ScrollTrigger, useGSAP } from '../lib/gsap.ts';

interface ServicesOverviewProps {
  /** Show the "all services" link and row links to /services (off on the Services page itself) */
  linked?: boolean;
}

/**
 * Individual Cinematic Horizontal Service Card:
 * Features horizontal layout with generous spacing/gap, GSAP 3D interactive tilt,
 * cursor spotlight lighting, and scroll-linked image parallax.
 */
interface ServiceCardProps {
  service: (typeof SERVICES)[number];
  idx: number;
  total: number;
  linked: boolean;
  isHovered: boolean;
  onHover: (idx: number | null) => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  idx,
  total,
  linked,
  isHovered: _isHovered,
  onHover,
}) => {
  const cardRef = useRef<HTMLLIElement>(null);
  const cardInnerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [imgLoaded, setImgLoaded] = useState(false);

  // GSAP 3D Tilt, Cursor Spotlight & Scroll Parallax
  useGSAP(
    () => {
      const card = cardRef.current;
      const inner = cardInnerRef.current;
      const img = imageRef.current;
      const spotlight = spotlightRef.current;

      if (!card || !inner) return;

      const isMobile = window.matchMedia('(max-width: 1023px)').matches;
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // 1. Scroll-scrubbed image parallax inside the card
      if (img && !reduceMotion) {
        gsap.to(img, {
          yPercent: -10,
          ease: 'none',
          scrollTrigger: {
            trigger: card,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        });
      }

      // 2. Interactive 3D Tilt & Spotlight (Desktop fine pointer)
      if (!isMobile && !reduceMotion) {
        const xTo = gsap.quickTo(inner, 'rotateY', { duration: 0.45, ease: 'power2.out' });
        const yTo = gsap.quickTo(inner, 'rotateX', { duration: 0.45, ease: 'power2.out' });

        const handlePointerMove = (e: PointerEvent) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;

          // Subtle tilt: max +/- 3 deg
          const rotateY = ((x - centerX) / centerX) * 3;
          const rotateX = -((y - centerY) / centerY) * 3;

          xTo(rotateY);
          yTo(rotateX);

          // Update spotlight position
          if (spotlight) {
            spotlight.style.opacity = '1';
            spotlight.style.background = `radial-gradient(circle 380px at ${x}px ${y}px, rgba(37, 99, 235, 0.22), rgba(56, 189, 248, 0.08) 40%, transparent 70%)`;
          }
        };

        const handlePointerLeave = () => {
          xTo(0);
          yTo(0);
          if (spotlight) {
            gsap.to(spotlight, { opacity: 0, duration: 0.6, ease: 'power2.out' });
          }
        };

        card.addEventListener('pointermove', handlePointerMove);
        card.addEventListener('pointerleave', handlePointerLeave);

        return () => {
          card.removeEventListener('pointermove', handlePointerMove);
          card.removeEventListener('pointerleave', handlePointerLeave);
        };
      }
    },
    { scope: cardRef }
  );

  const paletteClass = (service as any).paletteClass || 'card-palette-1';
  const accentColor = (service as any).accentColor || '#38BDF8';
  const primaryColor = service.color || '#2563EB';
  const badgeClass = (service as any).badgeClass || 'badge-p1';
  const tagline = (service as any).tagline || 'Core Capability';

  const cardContent = (
    <div
      ref={cardInnerRef}
      className={`service-card-inner relative rounded-3xl p-6 sm:p-8 lg:p-10 backdrop-blur-md [transform-style:preserve-3d] ${paletteClass}`}
    >
      {/* Interactive Cursor Spotlight */}
      <div
        ref={spotlightRef}
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300"
        aria-hidden="true"
      />

      {/* Horizontal Layout with Generous Horizontal Gap */}
      <div className="relative z-10 grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-10 xl:gap-12">
        {/* Left Column: Title & Badge */}
        <div className="flex flex-col justify-center lg:col-span-5">
          {/* Active Accent */}
          <div className="flex items-center gap-3">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: primaryColor, boxShadow: `0 0 10px ${primaryColor}` }}
            />
            <span
              className="text-xs font-semibold uppercase tracking-[0.2em]"
              style={{ color: accentColor }}
            >
              {tagline}
            </span>
          </div>

          {/* Service Title — High-Contrast Pure White */}
          <h3
            ref={titleRef}
            className="mt-4 font-display text-[clamp(2.1rem,3.4vw,3.75rem)] font-bold leading-[1.04] text-white tracking-tight transition-all duration-300 group-hover:translate-x-1 drop-shadow-sm"
          >
            {service.title}
          </h3>

          {/* Badge */}
          <div className="mt-4 flex flex-wrap items-center gap-2.5">
            <span className={`inline-flex items-center rounded-full px-3.5 py-1 text-xs font-semibold backdrop-blur-sm transition-all duration-300 ${badgeClass}`}>
              {service.badge}
            </span>
          </div>
        </div>

        {/* Center Column: Clean Authentic Image Showcase with Parallax */}
        <div className="lg:col-span-4">
          <div className="group/card relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-white/10 bg-[#0C0D12]/60 shadow-[0_20px_50px_rgba(0,0,0,0.6)] transition-all duration-500">
            {/* High-res WebP Service Image with GSAP Parallax & Skeleton Placeholder */}
            <div className="relative h-full w-full overflow-hidden bg-[#161722]">
              {!imgLoaded && (
                <Skeleton className="absolute inset-0 z-[1] h-full w-full rounded-none" />
              )}
              <img
                ref={(el) => {
                  (imageRef as React.MutableRefObject<HTMLImageElement | null>).current = el;
                  if (el?.complete && el.naturalWidth) setImgLoaded(true);
                }}
                src={serviceSrc(service.image)}
                srcSet={serviceSrcSet(service.image)}
                sizes="(min-width: 1024px) 420px, 100vw"
                alt={`${service.title} visual demonstration`}
                loading="lazy"
                decoding="async"
                onLoad={() => setImgLoaded(true)}
                className={`h-[120%] w-full object-cover -mt-[10%] transition-all duration-700 ease-out group-hover/card:scale-105 ${
                  imgLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                }`}
              />
            </div>

            {/* Subtle Gradient Scrim for Contrast */}
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0C0D12]/70 via-transparent to-transparent"
              aria-hidden="true"
            />
          </div>
        </div>

        {/* Right Column: Description, Channels & Circular Arrow CTA */}
        <div className="flex flex-col justify-between gap-6 lg:col-span-3 lg:pl-3">
          <div>
            {/* Supporting Copy — High-Contrast Crisp Silver */}
            <p className="max-w-[38ch] font-sans text-[15.5px] sm:text-[16.5px] lg:text-[17px] font-normal leading-[1.65] tracking-[-0.01em] text-[#CBD5E1]">
              {service.description}
            </p>

            {/* Deployment Channels Section */}
            <div className="mt-6 sm:mt-7">
              <span className="mb-3 block font-mono text-[11.5px] font-semibold uppercase tracking-[0.14em] text-[#CBD5E1]">
                Deployment Channels
              </span>
              <div className="flex items-center">
                <PlatformLogos platforms={service.platforms} />
              </div>
            </div>
          </div>

          {/* Action Row & Circular Navigation Button */}
          <div className="flex items-center justify-between pt-4 sm:pt-5 border-t border-white/[0.08]">
            {/* “View details” CTA: Highlight accent */}
            <span
              className="inline-flex items-center gap-2 font-sans text-[15px] sm:text-[16px] font-semibold tracking-wide transition-colors duration-250 group-hover:text-white"
              style={{ color: accentColor }}
            >
              <span>View details</span>
              <span
                className="inline-block transition-transform duration-250 ease-out group-hover:translate-x-1.5"
                aria-hidden="true"
              >
                →
              </span>
            </span>

            {/* Circular Arrow Button */}
            {linked && (
              <span
                ref={arrowRef}
                className="flex h-13 w-13 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white shadow-lg transition-all duration-300 ease-out group-hover:scale-105 group-focus-visible:ring-2"
                style={{
                  borderColor: `${accentColor}55`,
                }}
                aria-hidden="true"
              >
                <ArrowUpRight
                  className="h-5 w-5 text-white transition-transform duration-250 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <li
      ref={cardRef}
      className="service-card-item relative lg:sticky lg:top-[var(--sticky-top)] will-change-transform [perspective:1400px] mb-6 sm:mb-8 lg:mb-0"
      style={{
        '--sticky-top': `calc(88px + ${idx * 14}px)`,
        zIndex: idx + 1,
        marginBottom: `${(total - 1 - idx) * 8}px`,
      } as React.CSSProperties}
      onMouseEnter={() => onHover(idx)}
      onFocus={() => onHover(idx)}
      onMouseLeave={() => onHover(null)}
    >
      {linked ? (
        <Link
          to={`/services#${service.id}`}
          className="group block rounded-3xl outline-offset-8 focus-visible:outline-accent"
        >
          {cardContent}
        </Link>
      ) : (
        <div className="group block">{cardContent}</div>
      )}
    </li>
  );
};

/**
 * Cinematic Capabilities Section:
 * Features a wide horizontal editorial header composition (68% left / 32% right),
 * sticky 3D stacking card parallax scroll, and interactive cursor depth.
 */
export const ServicesOverview: React.FC<ServicesOverviewProps> = ({ linked = true }) => {
  const containerRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  // GSAP ScrollTrigger Timelines for Text Entrance & 3D Stacking Parallax
  useGSAP(
    () => {
      const header = headerRef.current;
      const list = listRef.current;
      if (!header || !list) return;

      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduceMotion) return;

      // 1. Editorial Header Entrance Animation
      const eyebrow = header.querySelector('.capabilities-eyebrow');
      const lines = header.querySelectorAll('.capabilities-line');
      const accent = header.querySelector('.capabilities-accent');
      const intro = header.querySelector('.capabilities-intro');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: header,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });

      if (eyebrow) {
        tl.fromTo(
          eyebrow,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' }
        );
      }

      if (lines.length > 0) {
        tl.fromTo(
          lines,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.75, stagger: 0.1, ease: 'power3.out' },
          '-=0.3'
        );
      }

      if (accent) {
        tl.fromTo(
          accent,
          { opacity: 0, scale: 0.95 },
          { opacity: 1, scale: 1, duration: 0.65, ease: 'power2.out' },
          '-=0.35'
        );
      }

      if (intro) {
        tl.fromTo(
          intro,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
          '-=0.25'
        );
      }

      // 2. Cinematic 3D Stacking Cards Parallax Scroll (Desktop Only: cards stack one over the other smoothly)
      const isMobile = window.matchMedia('(max-width: 1023px)').matches;
      if (!isMobile) {
        const cards = list.querySelectorAll<HTMLElement>('.service-card-item');
        cards.forEach((card, i) => {
          if (i < cards.length - 1) {
            const inner = card.querySelector<HTMLElement>('.service-card-inner');
            const nextCard = cards[i + 1];
            if (inner && nextCard) {
              gsap.to(inner, {
                scale: 0.95 - (cards.length - 1 - i) * 0.01,
                opacity: 0.55,
                filter: 'brightness(0.72)',
                transformOrigin: 'top center',
                ease: 'none',
                scrollTrigger: {
                  trigger: nextCard,
                  start: 'top 75%',
                  end: 'top 25%',
                  scrub: true,
                },
              });
            }
          }
        });
      }
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="services"
      className="relative bg-[#0C0D12] pt-12 pb-24 text-white sm:pt-16 sm:pb-32 lg:pt-20 lg:pb-36 overflow-visible"
    >
      {/* Ambient lighting cones */}
      <div
        className="pointer-events-none absolute -top-40 left-1/4 h-[550px] w-[550px] rounded-full bg-[#F59E0B]/06 blur-[160px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/2 -right-40 h-[600px] w-[600px] rounded-full bg-[#F59E0B]/05 blur-[160px]"
        aria-hidden="true"
      />

      <div className="shell relative z-10">
        {/* ===================================================================
            CAPABILITIES EDITORIAL TEXT COMPOSITION
            Wide Two-Column Layout: Left (~68% width) | Right (~32% width)
            =================================================================== */}
        <div
          ref={headerRef}
          className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center lg:gap-12 xl:gap-16 mb-16 sm:mb-20"
        >
          {/* Left Column (approx 68% of width - 8 of 12 cols): Large, bold, horizontal headline */}
          <div className="lg:col-span-8">
            {/* Section Eyebrow Label */}
            <div className="capabilities-eyebrow mb-4 inline-flex items-center gap-2">
              <span className="font-mono text-xs sm:text-[13px] font-semibold uppercase tracking-[0.22em] text-[#F59E0B]">
                [ 02 // CAPABILITIES ]
              </span>
            </div>

            {/* Main Headline: Pure White Typography with Animated Liquid Shimmer Accent */}
            <h2 className="capabilities-headline font-display text-[clamp(2.4rem,4.4vw,4.6rem)] font-bold leading-[1.06] tracking-tight text-white">
              <span className="capabilities-line block">
                Everything your brand needs{' '}
              </span>
              <span className="capabilities-line block mt-1">
                to be seen,{' '}
                <span className="capabilities-accent inline-block font-serif-display font-light italic text-shimmer-pure drop-shadow-[0_2px_24px_rgba(245,158,11,0.45)]">
                  in one place.
                </span>
              </span>
            </h2>
          </div>

          {/* Right Column (approx 32% of width - 4 of 12 cols): Supporting script text, vertically centered */}
          <div className="capabilities-intro lg:col-span-4 lg:self-center">
            <p className="font-brush text-[clamp(1.35rem,1.85vw,1.85rem)] font-normal text-[#E2E8F0] leading-[1.65] max-w-[34ch] tracking-wide">
              Six services, one plan. Start with what you need now and add the rest as you grow.
            </p>
          </div>
        </div>

        {/* 3D Stacking Parallax Horizontal Service Cards with Ample Bottom Clearance */}
        <ul ref={listRef} className="relative space-y-6 sm:space-y-10 lg:space-y-12 pb-20 sm:pb-28 lg:pb-36">
          {SERVICES.map((service, idx) => (
            <ServiceCard
              key={service.id}
              service={service}
              idx={idx}
              total={SERVICES.length}
              linked={linked}
              isHovered={hovered === idx}
              onHover={setHovered}
            />
          ))}
        </ul>

        {/* Section Climax Actions */}
        {linked && (
          <div className="mt-16 flex flex-col items-center justify-center gap-4 text-center sm:flex-row sm:mt-24">
            <Link
              to="/services"
              className="group relative inline-flex h-14 items-center justify-center gap-3 overflow-hidden rounded-full border border-amber-400/40 bg-gradient-to-r from-[#F59E0B] via-[#EAB308] to-[#D97706] px-9 text-base font-bold text-[#0C0D12] shadow-[0_4px_24px_rgba(245,158,11,0.4),inset_0_1px_1px_rgba(255,255,255,0.4)] backdrop-blur-md transition-all duration-300 hover:scale-[1.02] hover:border-amber-300 hover:shadow-[0_8px_36px_rgba(245,158,11,0.6)] active:scale-[0.98]"
            >
              <span className="relative z-10">Explore All 6 Services</span>
              <ArrowUpRight className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[#0C0D12]" />
              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
            </Link>
            <Link
              to="/contact"
              className="group relative inline-flex h-14 items-center justify-center overflow-hidden rounded-full border border-white/20 bg-[#171822]/90 px-8 text-base font-semibold text-white shadow-[0_4px_20px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.1)] backdrop-blur-xl transition-all duration-300 hover:border-white/40 hover:bg-[#1D1F2C] hover:text-white hover:scale-[1.02] active:scale-[0.98]"
            >
              <span className="relative z-10">Book a Strategy Call</span>
              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default ServicesOverview;
