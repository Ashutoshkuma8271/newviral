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

const headingClass = 'text-[15px] sm:text-base font-semibold text-white tracking-normal';

export const Footer: React.FC = () => {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#0C0D12] text-white">
      {/* Subtle top ambient glow for depth */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[600px] -translate-x-1/2 rounded-full bg-[#F59E0B]/08 blur-[160px]"
        aria-hidden="true"
      />

      <div className="shell relative z-10 grid gap-12 pb-14 pt-16 text-center sm:pt-20 lg:grid-cols-12 lg:gap-10 lg:pt-24 lg:text-left">
        {/* Brand */}
        <div className="flex flex-col items-center lg:col-span-4 lg:items-start">
          <Link to="/" aria-label="Vyral Bee home" className="inline-block">
            <Logo size="lg" />
          </Link>
          <p className="mx-auto mt-5 max-w-sm text-[14px] sm:text-[15px] leading-relaxed text-[#CBD5E1] lg:mx-0 lg:max-w-xs">
            Social media, design, video, websites and ads, planned by one team so your brand gets seen and chosen.
          </p>
          <ul className="mt-7 flex justify-center gap-3 lg:justify-start">
            {SOCIALS.map(({ key, label, href }) => {
              const brand = BRANDS[key];
              return (
                <li key={key}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[#161722]/80 text-white/75 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#F59E0B]/70 hover:bg-[#F59E0B]/15 hover:text-[#F59E0B] hover:shadow-[0_0_16px_rgba(245,158,11,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B]"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4 fill-current transition-colors"
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
          className="grid grid-cols-2 gap-x-6 gap-y-12 border-t border-[#334155]/50 pt-12 lg:col-span-8 lg:grid-cols-8 lg:border-t-0 lg:pl-8 lg:pt-0"
        >
          {/* Explore */}
          <div className="lg:col-span-2">
            <h2 className={headingClass}>Explore</h2>
            <ul className="mt-5 space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="group relative inline-flex items-center text-[14px] sm:text-[15px] font-normal text-[#CBD5E1] transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:text-white"
                  >
                    <span className="relative">
                      {link.label}
                      <span className="absolute -bottom-0.5 left-0 h-[1.5px] w-0 bg-[#F59E0B] transition-all duration-200 ease-out group-hover:w-full" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-3">
            <h2 className={headingClass}>Services</h2>
            <ul className="mt-5 space-y-3">
              {SERVICES.map((service) => (
                <li key={service.id}>
                  <Link
                    to="/services"
                    className="group relative inline-flex items-center text-[14px] sm:text-[15px] font-normal text-[#CBD5E1] transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:text-white"
                  >
                    <span className="relative">
                      {service.title}
                      <span className="absolute -bottom-0.5 left-0 h-[1.5px] w-0 bg-[#F59E0B] transition-all duration-200 ease-out group-hover:w-full" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-2 lg:col-span-3">
            <h2 className={headingClass}>Get in touch</h2>
            <ul className="mt-5 space-y-3.5 text-[14px] sm:text-[15px]">
              <li>
                <a
                  href={`mailto:${BRAND.contact.email}`}
                  className="break-all font-normal text-white transition-colors duration-200 hover:text-[#38BDF8] focus-visible:outline-none focus-visible:text-[#38BDF8]"
                >
                  {BRAND.contact.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${BRAND.contact.phone.replace(/[^+\d]/g, '')}`}
                  className="font-normal text-[#94A3B8] transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:text-white"
                >
                  {BRAND.contact.phone}
                </a>
              </li>
              <li className="flex items-start justify-center gap-3 text-left text-[#94A3B8] lg:justify-start">
                <Clock className="mt-1 h-4 w-4 shrink-0 text-[#2563EB]" aria-hidden="true" />
                <span className="leading-relaxed">{BRAND.contact.hours}</span>
              </li>
              <li className="flex items-start justify-center gap-3 text-left text-[#94A3B8] lg:justify-start">
                <MapPin className="mt-1 h-4 w-4 shrink-0 text-[#2563EB]" aria-hidden="true" />
                <address className="not-italic leading-relaxed text-[#94A3B8]">
                  {BRAND.contact.addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
              </li>
            </ul>

            {/* Premium conversion-focused strategy call CTA */}
            <Link
              to="/contact"
              className="group mt-6 inline-flex items-center gap-2.5 rounded-full border border-[#2563EB]/60 bg-[#2563EB]/15 px-5 py-2.5 text-[14px] sm:text-[15px] font-semibold text-white shadow-[0_4px_16px_rgba(37,99,235,0.18)] transition-all duration-300 hover:border-[#2563EB] hover:bg-[#2563EB] hover:shadow-[0_0_24px_rgba(37,99,235,0.35)] hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]"
            >
              <span>Book a strategy call</span>
              <ArrowUpRight className="h-4 w-4 text-[#38BDF8] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
            </Link>
          </div>
        </nav>
      </div>

      {/* Sign-off: the brand name, edge to edge with continuous bidirectional cinematic shimmer */}
      <FooterWordmark />

      {/* Bottom signature and legal row */}
      <div className="relative z-10 pb-8 pt-2 sm:pb-10 sm:pt-3">
        <div className="shell flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          {/* Copyright & legal link on shared baseline */}
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-[13px] sm:text-sm text-[#64748B] lg:order-1">
            <p>© {new Date().getFullYear()} Vyral Bee. All rights reserved.</p>
            <span className="hidden text-white/20 sm:inline-block" aria-hidden="true">•</span>
            <Link
              to="/privacy"
              className="transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:text-white"
            >
              Privacy policy
            </Link>
          </div>

          {/* Script signature */}
          <p className="font-serif-display text-lg sm:text-xl italic text-white/85 tracking-normal lg:order-2">
            We make brands visible.
          </p>
        </div>
      </div>
    </footer>
  );
};

