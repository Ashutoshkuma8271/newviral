import React, { useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle, Clock } from 'lucide-react';
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import { BRAND } from '../constants/content.ts';
import { Magnetic } from './common/Magnetic.tsx';
import { VyralSignalVisual } from './VyralSignalVisual.tsx';
import { useMediaQuery } from '../lib/motion.ts';

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * CtaBanner: Cinematic 3D Call-to-Action Experience
 *
 * Feature: "The Vyral Signal"
 * Replaces legacy hexagonal geometry with custom, dimensional motion graphics:
 * - Fluid translucent glass lenses
 * - Harmonic luminous ribbons & wavefront arcs
 * - Responsive 3D card tilt & multi-layer parallax on desktop
 * - Preserves consultation and WhatsApp conversion flows
 */
export const CtaBanner: React.FC = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const phone = useMediaQuery('(max-width: 767px)');
  const canHover = useMediaQuery('(hover: hover) and (pointer: fine)');

  // Pointer position normalized from -1 to 1 relative to card center
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for card tilt
  const springConfig = { stiffness: 140, damping: 22, mass: 0.5 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Gentle 3D perspective rotation (max +/- 3.5 degrees)
  const rotateX = useTransform(smoothMouseY, [-1, 1], [3.5, -3.5]);
  const rotateY = useTransform(smoothMouseX, [-1, 1], [-3.5, 3.5]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (reduce || !canHover || !cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX.set(x * 2);
      mouseY.set(y * 2);
    },
    [reduce, canHover, mouseX, mouseY]
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  return (
    <section id="cta" aria-label="Book a consultation" className="relative bg-[#0C0D12] py-20 sm:py-28 lg:py-36 overflow-hidden">
      {/* Luminous background ambient highlight */}
      <div
        className="pointer-events-none absolute -bottom-24 left-1/2 h-[450px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-t from-[#F59E0B]/12 via-[#D97706]/05 to-transparent blur-3xl"
        aria-hidden="true"
      />
      <div className="shell max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX: reduce || phone ? 0 : rotateX,
            rotateY: reduce || phone ? 0 : rotateY,
            transformStyle: 'preserve-3d',
          }}
          initial={reduce ? false : { opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.85, ease: EASE }}
          className="group relative overflow-hidden rounded-[2.25rem] sm:rounded-[2.75rem] border border-white/10 bg-gradient-to-br from-[#1C1E2A] via-[#14151F] to-[#101118] p-8 sm:p-14 lg:p-20 text-white shadow-[0_25px_70px_-15px_rgba(8,9,14,0.9),0_0_40px_rgba(245,158,11,0.10)] transition-colors duration-500 hover:border-[#F59E0B]/50 will-change-transform [perspective:1400px]"
        >
          {/* Subtle Ambient Vignette & Interior Highlight */}
          <div
            className="pointer-events-none absolute inset-0 rounded-[2.25rem] sm:rounded-[2.75rem] shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.12)]"
            aria-hidden="true"
          />

          {/* ===================================================================
              THE VYRAL SIGNAL: Bespoke 3D Motion Graphic Canvas
              Positioned on the right side behind/beside the copy & actions
              =================================================================== */}
          <VyralSignalVisual
            mouseX={reduce || phone ? undefined : smoothMouseX}
            mouseY={reduce || phone ? undefined : smoothMouseY}
            className="absolute -right-12 -top-12 bottom-0 w-full sm:w-[85%] lg:w-[62%] h-full z-0 opacity-80 lg:opacity-95 pointer-events-none"
          />

          {/* ===================================================================
              TWO-ZONE DESKTOP COMPOSITION
              Left: Typographic Statement | Right: Supporting Copy & Conversion
              =================================================================== */}
          <div className="relative z-10 grid gap-10 lg:grid-cols-12 lg:items-center">
            {/* Zone 1: Typographic Statement (7 cols desktop) */}
            <div className="lg:col-span-7">
              {/* Handwritten Script Eyebrow with Pulsing Signal Beacon */}
              <motion.div
                initial={reduce ? false : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
                className="mb-3 sm:mb-4 flex items-center gap-2.5 font-brush text-2xl font-normal text-[#F59E0B] sm:text-3xl"
              >
                <span
                  className="h-2 w-2 rounded-full bg-[#F59E0B] shadow-[0_0_10px_rgba(245,158,11,0.95)] animate-pulse"
                  aria-hidden="true"
                />
                <span>Ready to stand out?</span>
              </motion.div>

              {/* Main Confident Headline with Pure White & Animated Liquid Shimmer */}
              <h2 className="font-display text-[clamp(2.35rem,5vw,4.5rem)] font-bold tracking-tight text-white leading-[1.05]">
                <span className="block">Ready to make your</span>
                <span className="block mt-1 sm:mt-1.5">
                  brand{' '}
                  <span className="relative isolate inline-block font-serif-display font-normal italic text-shimmer-pure drop-shadow-[0_2px_22px_rgba(245,158,11,0.55)]">
                    more visible?
                  </span>
                </span>
              </h2>

              {/* Trust & Response Time Cue */}
              <div className="mt-6 flex items-center gap-2 text-xs sm:text-[13px] font-sans text-[#CBD5E1] tracking-wide">
                <Clock className="h-4 w-4 text-[#F59E0B]" />
                <span>Response within 1 working day · No agency fluff · Direct strategist review</span>
              </div>
            </div>

            {/* Zone 2: Supporting Copy & Action CTAs (5 cols desktop) */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <motion.p
                initial={reduce ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: 0.25, ease: EASE }}
                className="max-w-md font-sans text-base sm:text-lg leading-relaxed text-[#CBD5E1]"
              >
                Tell us where you are and where you want to be. We'll come back within one working day with a plan.
              </motion.p>

              {/* Action Buttons with High-Energy Honey Amber Accents */}
              <motion.div
                initial={reduce ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.35, ease: EASE }}
                className="mt-8 flex flex-col gap-3.5 sm:flex-row sm:items-center sm:flex-wrap"
              >
                {/* Primary CTA: Consultation */}
                <Magnetic className="w-full sm:w-auto">
                  <Link
                    to="/contact"
                    className="group relative inline-flex h-14 w-full sm:w-auto items-center justify-center gap-2.5 whitespace-nowrap rounded-full bg-gradient-to-r from-[#F59E0B] via-[#EAB308] to-[#D97706] hover:from-[#EAB308] hover:to-[#F59E0B] px-8 text-base font-bold text-[#0C0D12] shadow-[0_0_28px_rgba(245,158,11,0.45)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_42px_rgba(245,158,11,0.65)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0C0D12]"
                  >
                    <span className="font-bold">Book a free consultation</span>
                    <ArrowRight className="h-5 w-5 text-[#0C0D12] transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </Magnetic>

                {/* Secondary CTA: WhatsApp */}
                <a
                  href={BRAND.contact.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-14 w-full sm:w-auto items-center justify-center gap-2.5 whitespace-nowrap rounded-full border border-white/15 bg-[#171822]/85 px-7 text-base font-semibold text-white backdrop-blur-md transition-all duration-300 hover:border-[#10B981] hover:bg-[#1E202E] hover:text-white hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#10B981] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0C0D12]"
                >
                  <MessageCircle className="h-5 w-5 text-[#10B981]" />
                  <span>WhatsApp us</span>
                </a>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CtaBanner;
