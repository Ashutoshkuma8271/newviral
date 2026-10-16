import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Clock, MapPin } from 'lucide-react';
import { Logo } from './Logo.tsx';
import { FooterWordmark } from './FooterWordmark.tsx';
import { BRANDS } from './common/PlatformLogos.tsx';
import { BRAND, NAV_LINKS, SERVICES } from '../constants/content.ts';

const SOCIALS = [
  { key: 'instagram', label: 'Instagram', href: BRAND.socials.instagram },
  { key: 'facebook', label: 'Facebook', href: BRAND.socials.facebook },
  { key: 'linkedin', label: 'LinkedIn', href: BRAND.socials.linkedin },
  { key: 'whatsapp', label: 'WhatsApp', href: BRAND.contact.whatsapp },
];

const headingClass = 'text-base font-bold text-white';
const linkClass = 'text-[15px] text-white/70 transition-colors hover:text-white link-draw-gold';

export const Footer: React.FC = () => {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-ink text-white">

      <div className="shell relative z-10 grid gap-14 pb-14 pt-16 text-center sm:pt-20 lg:grid-cols-12 lg:gap-10 lg:pt-24 lg:text-left">
        {/* Brand */}
        <div className="flex flex-col items-center lg:col-span-4 lg:items-start">
          <Link to="/" aria-label="Viral Bee home" className="inline-block">
            <Logo size="lg" />
          </Link>
          <p className="mx-auto mt-6 max-w-sm text-base leading-relaxed text-white/70 lg:mx-0 lg:max-w-xs">
            Social media, design, video, websites and ads, planned by one team so your brand gets seen and chosen.
          </p>
          <ul className="mt-8 flex justify-center gap-3 lg:justify-start">
            {SOCIALS.map(({ key, label, href }) => {
              const brand = BRANDS[key];
              return (
                <li key={key}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="group flex h-11 w-11 items-center justify-center rounded-full border border-white/15 transition-colors hover:border-transparent hover:bg-white"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="h-[18px] w-[18px] fill-white/70 transition-colors group-hover:fill-[var(--brand)]"
                      style={{ ['--brand' as string]: `#${brand.hex}` }}
                      aria-hidden="true"
                    >
                      <path d={brand.path} />
                    </svg>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Link columns */}
        <nav
          aria-label="Footer"
          className="grid grid-cols-2 gap-x-6 gap-y-12 border-t border-white/10 pt-12 lg:col-span-8 lg:grid-cols-8 lg:border-t-0 lg:pl-8 lg:pt-0"
        >
          <div className="lg:col-span-2">
            <h2 className={headingClass}>Explore</h2>
            <ul className="mt-5 space-y-3.5">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h2 className={headingClass}>Services</h2>
            <ul className="mt-5 space-y-3.5">
              {SERVICES.map((service) => (
                <li key={service.id}>
                  <Link to="/services" className={linkClass}>
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 lg:col-span-3">
            <h2 className={headingClass}>Get in touch</h2>
            <ul className="mt-5 space-y-3.5 text-[15px]">
              <li>
                <a
                  href={`mailto:${BRAND.contact.email}`}
                  className="break-all text-white transition-colors hover:text-gold"
                >
                  {BRAND.contact.email}
                </a>
              </li>
              <li>
                <a href={`tel:${BRAND.contact.phone.replace(/[^+\d]/g, '')}`} className={linkClass}>
                  {BRAND.contact.phone}
                </a>
              </li>
              <li className="flex items-start justify-center gap-2.5 text-white/70 lg:justify-start">
                <Clock className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                {BRAND.contact.hours}
              </li>
              <li className="flex items-start justify-center gap-2.5 text-white/70 lg:justify-start">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                <address className="not-italic">
                  {BRAND.contact.addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
              </li>
            </ul>
            <Link
              to="/contact"
              className="group mt-7 inline-flex items-center gap-1.5 text-[15px] font-semibold text-gold transition-colors hover:text-gold-light"
            >
              Book a strategy call
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </nav>
      </div>

      {/* Sign-off: the brand name, edge to edge */}
      <FooterWordmark />

      {/* Bottom bar: stacked and centred below 1024px, copyright left and tagline right above it */}
      <div className="relative z-10 border-t border-white/10">
        <div className="shell flex flex-col items-center gap-4 py-8 text-sm text-white/70 lg:flex-row lg:justify-between">
          <p className="font-serif-display text-lg text-white/80 lg:order-2">We make brands visible.</p>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1 lg:order-1">
            <p>© {new Date().getFullYear()} Viral Bee. All rights reserved.</p>
            <Link to="/privacy" className="underline-offset-4 transition-colors hover:text-white hover:underline">
              Privacy policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
