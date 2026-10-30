# Design System Master File: Vyral Bee (Noir & Honey Premium)

> **LOGIC:** Global Source of Truth for Vyral Bee UI/UX redesign based on UI UX Pro Max design intelligence.
> Derived from: `dark-mode-oled` + `exaggerated-minimalism` + `interactive-cursor-design` + `trust-authority-conversion`.

---

**Project:** Vyral Bee  
**Category:** Creative Digital Marketing & Media Agency  
**Target Audience:** High-growth founders, direct-to-consumer brands, B2B leaders seeking premium social, web, video, and paid performance advertising.  
**Visual Style:** Noir & Honey Luxury Minimalist Dark Mode with 3D Centerpiece, Kinetic Typography, Frosted Glass, and Tactile Micro-Interactions.

---

## 1. Color System (OLED Dark & Amber Gold)

| Role | Hex / Value | Usage |
|------|-------------|-------|
| Background (Ink) | `#0B0B0C` | Master page background, OLED deep tone |
| Dark Surface | `#121214` | Section backgrounds, contrast depth |
| Dark Card | `#19191C` | Elevated card surfaces, bento items |
| Dark Card Hover | `#212125` | Card hover state elevation |
| Brand Honey Gold | `#F2A516` | Primary accent, badges, icons, focus rings |
| Gold Light | `#F7BA4A` | Interactive hover states, light sweeps |
| Gold Ambient Glow | `rgba(242, 165, 22, 0.28)` | Ambient backdrops, button glow |
| Primary Text | `#FFFFFF` / `#F5F5F4` | Headlines, high contrast titles (>=12:1) |
| Secondary Text | `#A1A1AA` / `#D4D4D8` | Body copy, subtitles (>=4.8:1) |
| Border Default | `rgba(255, 255, 255, 0.10)` | Default card and section dividers |
| Border Hover | `rgba(242, 165, 22, 0.40)` | Interactive focus & hover rim |

---

## 2. Typography Hierarchy

- **Display & Headlines:** `Clash Display` (500, 600, 700) + `Inter` system fallback. Tight tracking, fluid sizing via clamp.
- **Body & Sans:** `Satoshi` (400, 500, 700) / `-apple-system`. Optimal line height (1.6 - 1.7) for maximum readability.
- **Editorial Accents:** `Cormorant Garamond` (Italic 400/500) for select signature words (e.g. *in one place*, *to choose*, *more visible*).
- **Expressive Calligraphy:** `Satisfy` & `Shalimar` for signature sub-labels (e.g. *— transparent tiers*, *~ precision execution*).

---

## 3. Spacing & Touch Standards (4/8dp Rhythm)

- **Touch Targets:** Minimum 44x44px for all buttons, links, slide dots, and menu toggles.
- **Vertical Rhythm:** 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px, 96px, 128px.
- **Container Shell:** Max-width 1720px, responsive horizontal gutters (`px-5` on mobile, `px-8` on tablet, `px-12` on desktop).

---

## 4. Key Component Elevation Rules

### A. Navigation Bar
- Dynamic glassmorphism: `backdrop-blur-xl bg-ink/85 border-b border-white/10`.
- Active link pill indicator with spring motion.
- Magnetic "Let's talk" CTA with rotating arrow token.
- Accessible full-screen mobile drawer with numbered chapters and direct call/email links.

### B. Hero Section
- 3D spatial depth & pinned stage easing smoothly into content.
- Ambient live status badge ("ACCEPTING BRANDS FOR Q2 • FAST-TRACK ONBOARDING").
- Double CTAs: Luminous gold primary with soft ambient bloom + Frosted glass secondary.
- Touch-friendly carousel indicators (minimum 44px tap zone).

### C. Product Cards (Package Tiers)
- Distinct tiered hierarchy: Starter (Clean glass), Growth (Featured luminous gold rim + obsidian glass + animated popular badge), Premium (Executive frosted dark glass).
- Clear plain-English inclusions with checkmark pop animations.
- Hover lift without layout shifts (`transform: translateY(-4px)` with spring).
- Tactile CTA button with glint animation.

### D. Micro-Interactions & Cursor
- `GlowCursor`: Soft amber halo following mouse on desktop, scaling up 2x over interactive controls.
- `Magnetic`: Subtle pull on primary CTAs.
- No emojis as UI icons; consistent Lucide React & Simple Icons.
- Accessible `:focus-visible` with 2px gold outline and 3px offset.
- Complete `prefers-reduced-motion` compliance.

---

## 5. Pre-Delivery Checklist
- [x] No emoji as structural icons
- [x] Minimum 44x44px touch targets
- [x] WCAG AA/AAA text contrast (>=4.5:1)
- [x] No layout-shifting hover transforms
- [x] Responsive from 320px to 4K displays
- [x] Reduced motion gracefully turns off heavy animations and leaves readable final states
- [x] Preserved all existing business logic, routes, and forms
