# Vyral Bee Design System & Architectural Reference

This document provides a verified, production-grade reference for all typography, color tokens, animation systems, curved-card mechanics, and component conventions across the Vyral Bee digital agency website.

---

## 1. Verified Typography Architecture

All primary brand fonts are self-hosted in `/public/fonts/` for maximum first-paint performance and zero third-party layout shifts. Font families are exposed as Tailwind/CSS variables in `src/index.css`.

| Font Family | Weights Available | Source Files | CSS / Tailwind Class | Primary Role & Intended Usage |
| :--- | :--- | :--- | :--- | :--- |
| **Qurova** | 400, 500, 600, 700 | `/fonts/qurova-{regular,medium,semibold,bold}.otf` | `font-display`, `font-qurova` | Primary Architectural Display Sans. Main section headlines, hero lead, bold impact titles. |
| **Outside Boston** | 400 (Regular) | `/fonts/outside-boston.otf` | `font-serif-display`, `font-outside-boston` | High-Contrast Luxury Editorial Serif. Distinctive italic headline accents ("More results."). |
| **Rosehot** | 400 (Regular) | `/fonts/rosehot-regular.ttf` | `font-editorial`, `font-rosehot` | Editorial Luxury Serif. Accent keywords, editorial subheadings, luxury statements. |
| **Satoshi** | 400, 500, 700 | `/fonts/satoshi-{400,500,700}.woff2` | `font-sans`, `font-body`, `font-mono` | Primary Workhorse Interface Sans. Body paragraphs, card descriptions, data badges, navigation. |
| **Clash Display** | 500, 600, 700 | `/fonts/clash-display-{500,600,700}.woff2` | `font-display` (fallback stack) | Geometric Display Sans fallback for large numerals and high-impact stats. |
| **Compart Pyapari**| 400, 700 | `/fonts/compart-pyapari-{regular,bold}.ttf` | `font-serif`, `font-compart` | Structured Editorial Sub-headings and numerals. |
| **Articullare** | 400 (Regular) | `/fonts/articullare-regular.otf` | `font-signature`, `font-brush`, `font-accent` | Bespoke Calligraphic / Handwritten Script. Organic brand signatures and creative flourishes. |
| **Qilka** | 700 (Bold) | `/fonts/qilka-bold.otf` | `font-impact`, `font-qilka` | Avant-Garde Ultra-Bold Display. Kinetic marquees and high-impact tickers. |

---

## 2. Multicolor Brand Color System & Token Architecture

The Vyral Bee visual identity employs an intentionally orchestrated multicolor agency palette inspired by premier digital studios and cinematic web design. Rather than relying on a single purple accent, colors are assigned clear, distinct functional roles across surfaces, typography, interactive states, and decorative lighting.

### Core Brand Palette
- **Midnight Navy (`#0B1020` / `--color-midnight-navy`)**:
  *Main canvas background across the website, primary dark surfaces, deep scrim overlays, and mobile drawers.*
- **Deep Navy (`#111827` / `--color-deep-navy`)**:
  *Alternate section backgrounds (Services, Capabilities, Why Choose Us, Compare Plans, Process, Faq, etc.) providing clear spatial pacing without high-contrast jarring breaks.*
- **Electric Blue (`#2563EB` / `--color-electric-blue`, hover `#1D4ED8`)**:
  *Primary brand CTA button background, active tab indicators, key conversion accents, technology indicators, and focal halo emitters.*
- **Bright Cyan (`#38BDF8` / `--color-bright-cyan`)**:
  *Interactive highlights, eyebrow labels, beacon pulse dots, focal halos, specular lens glows, and secondary gradient stops.*
- **Soft Lavender (`#C4B5FD` / `--color-soft-lavender`)**:
  *Editorial script typography emphasis, creative accents, elegant decorative cues, and tertiary gradient endpoints.*
- **Premium White (`#F8FAFC` / `--color-premium-white`)**:
  *Primary headings on dark surfaces, card titles, and high-visibility data points.*
- **Muted Slate (`#94A3B8` / `--color-muted-slate`, subtle `#64748B`)**:
  *Secondary descriptions, paragraph body text, meta labels, and inactive border tokens.*

### Supporting Accent Palette
- **Signature Violet (`#7C3AED` / `--color-signature-violet`)**:
  *Occasional signature branding elements and multi-stop gradient transitions.*
- **Soft Pink (`#F472B6` / `--color-soft-pink`)**:
  *Creative brush accents (manifesto underline, tagline highlight, campaign moments).*
- **Emerald (`#10B981` / `--color-emerald`)**:
  *Success indicators, live status badges, verified ROI metrics, and dedicated WhatsApp action buttons.*
- **Champagne Gold (`#D4AF37` / `--color-champagne-gold`)**:
  *Subtle premium decorative details and refined metadata badges.*

### Surface & Structural Tones
- **Navy Surface (`#161F36` / `--color-navy-surface`)**:
  *Primary card shells, input backgrounds, and content blocks.*
- **Navy Elevated Surface (`#1E293B` / `--color-navy-elevated`)**:
  *Hover state card elevations and secondary surface highlights.*
- **Structural Slate Border (`#334155` / `--color-navy-border`)**:
  *Subtle structural dividers, card outlines, and container frames.*
- **Interactive Border Hover (`#2563EB` / `#38BDF8`)**:
  *Luminous focus and hover boundary feedback.*

### Semantic Functional Role Mapping
| Design Role | Semantic Token | Exact Value | Usage Guidelines |
|:---|:---|:---|:---|
| **Main Canvas** | `bg-midnight-navy` | `#0B1020` | Base background for Hero, Work, Footer, Deep Dives |
| **Alternate Sections**| `bg-deep-navy` | `#111827` | Background for Services, Standards, Plans, Process, Faq |
| **Card Shells** | `bg-navy-surface` | `#161F36` | Feature cards, form containers, stat blocks |
| **Hover Surfaces** | `bg-navy-elevated` | `#1E293B` | Card hover elevations and table row hovers |
| **Primary Headings** | `text-premium-white` | `#F8FAFC` | Main `<h1>`, `<h2>`, and card titles |
| **Secondary Copy** | `text-muted-slate` | `#94A3B8` | Subheadings, paragraphs, feature descriptions |
| **Primary CTA** | `bg-electric-blue` | `#2563EB` | Main conversion buttons (`hover:bg-[#1D4ED8]`) |
| **Interactive Glow** | `text-bright-cyan` | `#38BDF8` | Eyebrow badges, active indicator dots, specular glow |
| **Editorial Accent** | `text-soft-lavender`| `#C4B5FD` | Italic serif accents, handwritten notes |
| **Live / WhatsApp** | `text-emerald` | `#10B981` | Positive status badges, verified ROAS, WhatsApp CTA |
| **Container Borders** | `border-navy-border`| `#334155` | Card borders, section dividers, input boundaries |

---

## 3. Premium Curved Card & Curved Text Animation Suite

### A. The Signature Curved Half-Circle Card (`CurvedHalfCircleCard.tsx`)
- **Mechanism**:
  1. **GSAP + ScrollTrigger Scrubbed Transformations**:
     - Morphing border-radius: Animates from an organic curved silhouette (`border-radius: 4rem 1.25rem 4rem 1.25rem`) into a balanced `2rem` container as it enters view.
     - Half-circle / Elliptical clip-path reveal: Scrubbed aperture mask (`ellipse(70% 55% at 50% 0%)` -> `ellipse(135% 120% at 50% 0%)`).
  2. **Motion for React**: Spring-based hover lift (`y: -5`), fine-pointer spotlight follow, and button feedback.
  3. **Luminous Boundary Rim**: An inset horizontal line and atmospheric radial glow track the curve boundary (`inset 0 0 40px rgba(139, 92, 246, 0.35)`).
  4. **Accessibility**: Instant `rounded-[2rem]` layout with no motion distortion when `prefers-reduced-motion` is detected.

### B. Rotating Circular Curved Text (`CircularText.tsx`)
- **Inspired By**: React Bits & 21st.dev circular typography patterns.
- **Mechanism**:
  1. SVG `<textPath>` wrapping uppercase monospace typography around a calculated circle geometry.
  2. Continuous organic rotation (`360deg`) with hover pause / acceleration.
  3. Centered status badge or glowing brand spark.
  4. Fully scalable, responsive, and accessible (`aria-label`).

### C. Fluid Bezier Wave Text Ribbon (`CurvedLoop.tsx`)
- **Inspired By**: React Bits Curved Loop & editorial fashion brand ribbons.
- **Mechanism**:
  1. Seamless Bezier spline path (`M -200,60 Q 200,10 600,60 T 1400,60 T 2200,60`) spanning the viewport.
  2. Repeating editorial brand phrases flowing continuously along the wave.
  3. GSAP ScrollTrigger velocity booster that smoothly accelerates text offset based on user scroll velocity.
  4. Placed as an editorial transition ribbon above "The Vyral Bee Standard".

---

## 4. The 8 Commercial Standards Comparison Matrix

Preserved in `src/constants/content.ts` and rendered in `src/components/WhyChooseUs.tsx`:

1. **01 // STRATEGY**:
   - *Friction*: "Chasing likes and vanity metrics"
   - *Standard*: **Business-focused strategy**
   - *Visual*: Attribution funnel showing real revenue generation (4.8x ROAS, -38% CAC).
2. **02 // CREATIVE**:
   - *Friction*: "Generic templates reused for every client"
   - *Standard*: **Creative content that fits your brand**
   - *Visual*: Editorial Artboard with custom Qurova/Rosehot typography and HSL brand swatches.
3. **03 // CONSISTENCY**:
   - *Friction*: "Posting whenever someone remembers"
   - *Standard*: **Consistent brand presence**
   - *Visual*: Multi-channel publishing matrix across Reels, Carousels, Stories, and Ads with live status.
4. **04 // COMMUNICATION**:
   - *Friction*: "Jargon, vague updates and surprises"
   - *Standard*: **Transparent communication**
   - *Visual*: Executive communications bridge with direct Slack/WhatsApp channel & <14 min response badge.
5. **05 // REPORTING**:
   - *Friction*: "Reports full of numbers that mean nothing"
   - *Standard*: **Performance tracking & reporting**
   - *Visual*: Financial-grade SVG spline curve chart with conversion velocity & blended ROAS telemetry.
6. **06 // PACKAGES**:
   - *Friction*: "One fixed plan, whatever your business"
   - *Standard*: **Customized packages**
   - *Visual*: Modular growth tier architecture (Sprint, Scale, Enterprise) with zero lock-in.
7. **07 // PARTNERSHIP**:
   - *Friction*: "Five freelancers who never talk to each other"
   - *Standard*: **One agency for social, web & ads**
   - *Visual*: Unified multi-node architecture connecting Creative, Web Dev, and Performance Ads into one core.
8. **08 // MANAGEMENT**:
   - *Friction*: "A different person every time you call"
   - *Standard*: **Dedicated account management**
   - *Visual*: Senior Strategist direct capsule with live status and quarterly milestone roadmap.

---

## 5. Lenis Smooth Scroll & GSAP Synchronization Architecture

### Production Integration (`SmoothScrollProvider.tsx`)
- **Global Provider**: Wrapped at application root (`src/App.tsx`) via `<SmoothScrollProvider>`.
- **CSS Import**: `import 'lenis/dist/lenis.css';` imported once statically at entry (`src/main.tsx`).
- **Official GSAP ScrollTrigger Synchronization**:
  ```ts
  // 1. Synchronize ScrollTrigger on Lenis scroll updates
  lenis.on('scroll', ScrollTrigger.update);

  // 2. Single Animation Loop: Feed GSAP ticker into Lenis
  const handleTicker = (time: number) => {
    lenis.raf(time * 1000);
  };
  gsap.ticker.add(handleTicker);

  // 3. Disable GSAP ticker lagSmoothing to eliminate stutter during scrolling
  gsap.ticker.lagSmoothing(0);
  ```
- **Single Loop Guarantee**: No competing `requestAnimationFrame` loops. GSAP's high-precision ticker acts as the sole driver for both timeline tweens and Lenis scroll physics.
- **Anchor Link Handling**: Automatic smooth scrolling to hash anchors (e.g. `#services`, `#why-choose-us`) with an offset of `-80px` to accommodate the sticky navigation bar.
- **Scroll Isolation (`data-lenis-prevent`)**: Applied to overflowing modals, dropdown lists (`PhoneField`), and filter rails to preserve internal scrolling.
- **Accessibility**: Automatically bypasses smooth scrolling when `(prefers-reduced-motion: reduce)` is active.
- **Cleanups**: Unregisters ticker callback via `gsap.ticker.remove`, detaches scroll listeners, removes anchor event listeners, and calls `lenis.destroy()` on unmount.
