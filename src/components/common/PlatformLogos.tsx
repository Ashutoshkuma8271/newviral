import React from 'react';
import {
  siFacebook,
  siFigma,
  siGoogleads,
  siGoogleanalytics,
  siGooglesearchconsole,
  siInstagram,
  siMeta,
  siWhatsapp,
  siYoutube,
} from 'simple-icons';

interface Brand {
  title: string;
  hex: string;
  path: string;
}

const linkedin: Brand = {
  title: 'LinkedIn',
  hex: '0A66C2',
  path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
};

export const BRANDS: Record<string, Brand> = {
  instagram: siInstagram,
  facebook: siFacebook,
  linkedin,
  youtube: siYoutube,
  figma: siFigma,
  whatsapp: siWhatsapp,
  searchconsole: siGooglesearchconsole,
  analytics: siGoogleanalytics,
  meta: siMeta,
  googleads: siGoogleads,
};

export interface PlatformLogosProps {
  platforms: string[];
  className?: string;
  variant?: 'authentic' | 'glass' | 'white';
}

/**
 * Authentic Official Social & Tech Platform Logos
 * High-definition multi-color official badges with specular highlights and hover bloom.
 */
export const PlatformLogos: React.FC<PlatformLogosProps> = ({
  platforms,
  className = '',
  variant = 'authentic',
}) => {
  const renderLogo = (key: string) => {
    switch (key) {
      case 'instagram':
        return (
          <svg viewBox="0 0 32 32" className="h-full w-full rounded-full" aria-hidden="true">
            <defs>
              <radialGradient id="ig-grad-auth" cx="20%" cy="110%" r="130%">
                <stop offset="0%" stopColor="#fdf497" />
                <stop offset="15%" stopColor="#fdf497" />
                <stop offset="50%" stopColor="#fd5949" />
                <stop offset="75%" stopColor="#d6249f" />
                <stop offset="100%" stopColor="#285aeb" />
              </radialGradient>
            </defs>
            <rect width="32" height="32" rx="16" fill="url(#ig-grad-auth)" />
            <path
              fill="#FFFFFF"
              d="M16 9.2c2.2 0 2.5.01 3.4.05.9.04 1.4.19 1.7.32.4.17.8.38 1.1.72.34.34.55.71.72 1.11.13.33.28.84.32 1.71.04.88.05 1.15.05 3.39s-.01 2.51-.05 3.39c-.04.87-.19 1.38-.32 1.71-.17.4-.38.77-.72 1.11-.34.34-.71.55-1.11.72-.33.13-.84.28-1.71.32-.88.04-1.15.05-3.39.05s-2.51-.01-3.39-.05c-.87-.04-1.38-.19-1.71-.32-.4-.17-.77-.38-1.11-.72-.34-.34-.55-.71-.72-1.11-.13-.33-.28-.84-.32-1.71-.04-.88-.05-1.15-.05-3.39s.01-2.51.05-3.39c.04-.87.19-1.38.32-1.71.17-.4.38-.77.72-1.11.34-.34.71-.55 1.11-.72.33-.13.84-.28 1.71-.32.88-.04 1.15-.05 3.39-.05zm0-2.2c-2.44 0-2.75.01-3.71.05-.96.04-1.62.2-2.19.42a4.6 4.6 0 0 0-1.66 1.08 4.6 4.6 0 0 0-1.08 1.66c-.22.57-.38 1.23-.42 2.19-.04.96-.05 1.27-.05 3.71s.01 2.75.05 3.71c.04.96.2 1.62.42 2.19.23.59.54 1.1 1.08 1.66.55.54 1.07.85 1.66 1.08.57.22 1.23.38 2.19.42.96.04 1.27.05 3.71.05s2.75-.01 3.71-.05c.96-.04 1.62-.2 2.19-.42.59-.23 1.1-.54 1.66-1.08.54-.55.85-1.07 1.08-1.66.22-.57.38-1.23.42-2.19.04-.96.05-1.27.05-3.71s-.01-2.75-.05-3.71c-.04-.96-.2-1.62-.42-2.19a4.6 4.6 0 0 0-1.08-1.66 4.6 4.6 0 0 0-1.66-1.08c-.57-.22-1.23-.38-2.19-.42-.96-.04-1.27-.05-3.71-.05z"
            />
            <circle cx="16" cy="16" r="3.4" fill="none" stroke="#FFFFFF" strokeWidth="2" />
            <circle cx="21.8" cy="10.2" r="1.05" fill="#FFFFFF" />
          </svg>
        );

      case 'facebook':
        return (
          <svg viewBox="0 0 32 32" className="h-full w-full rounded-full" aria-hidden="true">
            <circle cx="16" cy="16" r="16" fill="#1877F2" />
            <path
              fill="#FFFFFF"
              d="M18.8 16.5h2.6l.4-3.2h-3v-2.1c0-.9.3-1.6 1.6-1.6h1.7V6.7c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.4h-2.8v3.2h2.8V25h3.4v-8.5z"
            />
          </svg>
        );

      case 'linkedin':
        return (
          <svg viewBox="0 0 32 32" className="h-full w-full rounded-full" aria-hidden="true">
            <rect width="32" height="32" rx="16" fill="#0A66C2" />
            <path
              fill="#FFFFFF"
              d="M10.8 13.5v10.2H7.4V13.5h3.4zm.2-3.4c0 1-.8 1.8-1.9 1.8s-1.9-.8-1.9-1.8c0-1 .8-1.8 1.9-1.8s1.9.8 1.9 1.8zm13.8 7.3v6.3h-3.4v-5.9c0-1.4-.5-2.4-1.8-2.4-1 0-1.6.7-1.9 1.4-.1.3-.1.6-.1.9v6h-3.4s.05-9.2 0-10.2h3.4v1.5c.5-.7 1.3-1.7 3.1-1.7 2.3 0 4.1 1.5 4.1 4.7z"
            />
          </svg>
        );

      case 'youtube':
        return (
          <svg viewBox="0 0 32 32" className="h-full w-full rounded-full" aria-hidden="true">
            <rect width="32" height="32" rx="16" fill="#FF0000" />
            <polygon points="13,10.8 21.8,16 13,21.2" fill="#FFFFFF" />
          </svg>
        );

      case 'whatsapp':
        return (
          <svg viewBox="0 0 32 32" className="h-full w-full rounded-full" aria-hidden="true">
            <circle cx="16" cy="16" r="16" fill="#25D366" />
            <path
              fill="#FFFFFF"
              d="M16 6.8c-5.1 0-9.2 4.1-9.2 9.2 0 1.6.4 3.2 1.2 4.6L6.8 25.2l4.8-1.3c1.3.7 2.8 1.1 4.4 1.1 5.1 0 9.2-4.1 9.2-9.2S21.1 6.8 16 6.8zm5.4 13.1c-.2.6-1.2 1.2-1.7 1.3-.5.1-1.1.2-3.2-.7-2.5-1-4.1-3.6-4.2-3.8-.1-.2-1.1-1.5-1.1-2.7 0-1.3.7-1.9 1-2.2.2-.2.5-.3.8-.3.1 0 .2 0 .3 0 .3 0 .4 0 .6.4.2.5.7 1.7.8 1.8.1.2.1.3 0 .5s-.2.3-.3.4c-.1.2-.3.3-.4.5-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2 1.2 1 2 1.4 2.4 1.5.3.1.5.1.7-.1.2-.2.9-1.1 1.1-1.4.2-.3.5-.3.8-.2.3.1 1.9.9 2.2 1.1.3.2.6.2.7.3 0 .3-.1 1.1-.3 1.7z"
            />
          </svg>
        );

      case 'figma':
        return (
          <svg viewBox="0 0 32 32" className="h-full w-full rounded-full" aria-hidden="true">
            <circle cx="16" cy="16" r="16" fill="#1E1E1E" />
            <g transform="translate(7, 5) scale(0.75)">
              <path d="M12 0H6a6 6 0 0 0 0 12h6V0z" fill="#F24E1E" />
              <path d="M12 0h6a6 6 0 0 1 0 12h-6V0z" fill="#FF7262" />
              <path d="M12 12H6a6 6 0 0 0 0 12h6V12z" fill="#A259FF" />
              <path d="M6 24a6 6 0 0 0 6 6v-6H6z" fill="#0ACF83" />
              <circle cx="18" cy="18" r="6" fill="#1ABCFE" />
            </g>
          </svg>
        );

      case 'googleads':
        return (
          <svg viewBox="0 0 32 32" className="h-full w-full rounded-full" aria-hidden="true">
            <circle cx="16" cy="16" r="16" fill="#FFFFFF" />
            <g transform="translate(4.5, 4.5) scale(0.72)">
              <path
                d="M4.3 17.5l7.5-13a4.5 4.5 0 0 1 6.1-1.6l.3.2a4.5 4.5 0 0 1 1.6 6.1l-7.5 13a4.5 4.5 0 0 1-6.1 1.6l-.3-.2a4.5 4.5 0 0 1-1.6-6.1z"
                fill="#4285F4"
              />
              <path
                d="M18.8 4.2a4.5 4.5 0 0 1 6.1 1.6l.3.2a4.5 4.5 0 0 1 1.6 6.1l-7.5 13a4.5 4.5 0 0 1-6.1 1.6l-.3-.2a4.5 4.5 0 0 1-1.6-6.1l7.5-13z"
                fill="#FBBC04"
              />
              <circle cx="7.5" cy="20.5" r="4.5" fill="#34A853" />
            </g>
          </svg>
        );

      case 'meta':
        return (
          <svg viewBox="0 0 32 32" className="h-full w-full rounded-full" aria-hidden="true">
            <circle cx="16" cy="16" r="16" fill="#0081FB" />
            <path
              fill="#FFFFFF"
              d="M16 17.8c-1.3-1.8-2.6-3.2-3.8-3.2-1.4 0-2.4 1.1-2.4 2.6 0 1.8 1.4 3 2.9 3 1.4 0 2.4-.8 3.3-2.4zm0 0c1.3 1.8 2.6 3.2 3.8 3.2 1.4 0 2.4-1.1 2.4-2.6 0-1.8-1.4-3-2.9-3-1.4 0-2.4.8-3.3 2.4zm-9.8-.6c0-3.3 2.3-5.7 5.2-5.7 2.2 0 4 1.4 5.3 3.3 1.3-1.9 3.1-3.3 5.3-3.3 2.9 0 5.2 2.4 5.2 5.7 0 3.7-2.6 6.4-5.7 6.4-2.1 0-3.8-1.2-4.9-2.8-1.1 1.6-2.8 2.8-4.9 2.8-3.1 0-5.7-2.7-5.7-6.4z"
            />
          </svg>
        );

      case 'analytics':
      case 'searchconsole':
      default:
        return (
          <svg viewBox="0 0 32 32" className="h-full w-full rounded-full" aria-hidden="true">
            <circle cx="16" cy="16" r="16" fill="#FFFFFF" />
            <g transform="translate(6.5, 6.5) scale(0.6)">
              <rect x="0" y="14" width="6" height="18" rx="3" fill="#F4B400" />
              <rect x="10" y="8" width="6" height="24" rx="3" fill="#E37400" />
              <rect x="20" y="0" width="6" height="32" rx="3" fill="#E37400" />
            </g>
          </svg>
        );
    }
  };

  return (
    <ul
      className={`flex flex-wrap items-center gap-2.5 sm:gap-3 ${className}`}
      aria-label={`Platforms: ${platforms.join(', ')}`}
    >
      {platforms.map((key) => (
        <li
          key={key}
          title={key.toUpperCase()}
          className="group/brand relative flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full p-0.5 shadow-[0_4px_14px_rgba(0,0,0,0.4)] transition-all duration-300 ease-out hover:scale-120 hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(0,0,0,0.6)] cursor-pointer"
        >
          {/* Subtle outer specular ring */}
          <span className="pointer-events-none absolute -inset-0.5 rounded-full border border-white/25 opacity-70 group-hover/brand:opacity-100 group-hover/brand:border-white/60 transition-opacity" />
          <div className="relative z-10 h-full w-full overflow-hidden rounded-full transition-transform duration-300 group-hover/brand:scale-105">
            {renderLogo(key)}
          </div>
        </li>
      ))}
    </ul>
  );
};
