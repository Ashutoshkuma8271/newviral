# Audit log

Record of approved changes that deleted, overwrote or bulk-edited project data. Newest first.

## 2026-10-14: Replace the Packages header photo

- **Approved by:** project owner, in chat (asked for a different Packages banner photo that fits phones).
- **What:** the six files `public/images/pages/packages-*.webp` (calculator photo, created earlier the same day) were overwritten with a seedling-in-a-jar-of-coins photo; the phone sizes are cropped around the jar.
- **Backup:** `_backup/2026-10-14-packages-header/` (the 6 previous files).
- **Restore:** copy them back into `public/images/pages/`.

## 2026-10-14: Replace three service photos with brighter ones

- **Approved by:** project owner, in chat ("replace if not [representing / visible]").
- **What:** `public/images/services/design-*`, `video-*`, `web-*` (12 files, created earlier the same day) were overwritten with brighter photos (paint brushes, a filming photographer, a laptop with code).
- **Backup:** `_backup/2026-10-14-service-photos/` (the 12 previous files).
- **Restore:** copy them back into `public/images/services/`.

## 2026-10-14: Remove unused CSS utilities from the old design

- **Approved by:** project owner, in chat ("remove not used part that are unused and old components").
- **What:** eight unused rules in `src/index.css`: `.font-syne`, `.text-gold-gradient`, `.card-hive` (+ `:hover`), `.shadow-gold-subtle`, `.hairline-b`, `.hairline-t`, `.bg-noise-grid`. A search showed no `.tsx` file used any of them; build passes.
- **Backup:** `_backup/2026-10-14-css/index.css` (the file as it was before removal).
- **Restore:** copy that file back over `src/index.css`.

## 2026-10-14: Delete five leftover unused files

- **Approved by:** project owner, in chat ("remove not used part that are unused and old components"), after the assistant's message naming these exact files.
- **What:** `src/assets/hero.png`, `src/assets/typescript.svg`, `src/assets/vite.svg` (Vite starter-template leftovers), `public/icons.svg`, `src/components/common/Reveal.tsx` (a no-op wrapper no component uses any more). A search showed zero references to any of them; `tsc` passes after removal.
- **Backup:** `_backup/2026-10-14-leftovers/`.
- **Restore:** copy the files back to their original paths, or `git checkout 52cf0d5 -- <path>` for the tracked ones.

## 2026-10-14: Replace hero and page-header photos

- **Approved by:** project owner, in chat (asked for brighter, clearly visible banner images on all pages).
- **What:** the 42 files in `public/images/hero/` were overwritten with new photos in the same file names and sizes.
- **Backup:** `_backup/2026-10-14-hero-images/` (all 42 originals).
- **Restore:** copy the files back into `public/images/hero/`.

## 2026-10-14: Delete five unused components

- **Approved by:** project owner, in chat ("del things that are not in used"), in reply to the assistant's list naming these five files.
- **What:** `src/components/Portfolio.tsx`, `PricingPackages.tsx`, `Contact.tsx`, `Industries.tsx`, `BeforeAfterSlider.tsx`. Replaced by `WorkGallery`, `PackageTiers`, `ContactPanel` and `IndustriesStrip`. Confirmed with a search that nothing imports them; `tsc` passes after removal.
- **Backup:** `_backup/2026-10-14-unused/src/components/`. Originals are also in git history (commit `52cf0d5`).
- **Restore:** copy the files back from the backup folder, or `git checkout 52cf0d5 -- src/components/<name>.tsx`.
- **Not touched (not named in the approval):** `src/assets/hero.png`, `typescript.svg`, `vite.svg`, `public/icons.svg`, `src/components/common/Reveal.tsx`. Awaiting separate approval.

## 2026-10-14: Delete temporary browser-profile folders created by the screenshot script

- **Approved by:** project owner, in chat ("APPROVE"), in reply to the approval banner listing these exact folders.
- **What:** 61 folders matching `cdp-XXXXXX` in `C:\Users\91933\AppData\Local\Temp` (about 2.7 GB), created today 12:43 to 14:35 by the assistant's headless-Chrome screenshot script. None were project files or user data.
- **Why:** The C: drive was down to 0.39 GB free and screenshots and builds were failing (`ENOSPC`).
- **Result:** 61 of 61 deleted, none skipped. Free space went from 0.70 GB to 3.38 GB.
- **Backup:** none; the folders only held disposable browser cache.
- **Prevention:** the script now reuses one folder (`viralbee-shared-profile` in Temp) instead of creating a new one per run.

## 2026-10-14: Remove unused 3D hero and font packages; fix logo spelling

- **Approved by:** project owner, in chat ("APPROVE"), covering all three items below.
- **Backup:** `_backup/2026-10-14/` (contains `src/components/Hero3D.tsx`, `package.json`, `package-lock.json`, `public/logo.svg` as they were before the change). `Hero3D.tsx` and `logo.svg` are also in git history at commit `52cf0d5`.

| # | What | Action | Why |
|---|------|--------|-----|
| 1 | `src/components/Hero3D.tsx` | Deleted | No longer imported after the hero was rebuilt as a photo slider |
| 2 | `three`, `@types/three`, `@fontsource-variable/inter-tight`, `@fontsource/instrument-serif` | `npm uninstall` (edits `package.json`, `package-lock.json`) | Unused; fonts are now self-hosted Clash Display and Satoshi in `public/fonts/` |
| 3 | `public/logo.svg` | Text `VYRAL` changed to `VIRAL` (line 55 and its comment) | Brand name is spelled "Viral Bee" |

**How to restore:** copy the files from `_backup/2026-10-14/` back to the same paths and run `npm install`, or run `git checkout 52cf0d5 -- src/components/Hero3D.tsx public/logo.svg` and reinstall the packages.

## 2026-10-15: New colour palette (owner request: premium white, better yellow and black, no cream)

- **Requested by:** project owner, in chat. Code edits only; no data deleted.
- **Backup:** `_backup/2026-10-15-colors/` holds `src/index.css`, `index.html`, `src/components/PackageTiers.tsx`, `src/components/common/Spotlight.tsx`, `src/constants/content.ts` as they were before.

| Token / place | Before | After |
|---|---|---|
| gold | `#F5B90F` | `#FFC21F` |
| gold-light | `#FFD34D` | `#FFD452` |
| ink / dark-bg (also `index.html` theme colour, scrims) | `#13110D` | `#0B0B0C` |
| dark-surface / dark-card / hover | `#1A1712` / `#211D17` / `#29241C` | `#121214` / `#19191C` / `#212125` |
| wax / paper / warm-light | `#FAF5E8` | `#FAFAFA` |
| wax-deep | `#F1E9D4` | `#F0F0EE` |
| body text, muted text, scrollbar, glows | warm tints | neutral equivalents |

**How to restore:** copy the five files from `_backup/2026-10-15-colors/` back to the same paths.

## 2026-10-15: Undo the Work filter / Packages redesign and new page sections (owner request)

- **Requested by:** project owner, in chat ("make it like previous ... I do not want change").
- **What:** `FilterRail.tsx`, `WorkGallery.tsx`, `PackageTiers.tsx` and the Packages, Services, Process, About and Work pages restored to how they were before that request (colour palette kept). The three new files (`ComparePlans.tsx`, `Faq.tsx`, `constants/faqs.ts`) were moved out of `src`, not deleted.
- **Backup of the undone work:** `_backup/2026-10-15-reverted-redesign/` (edited files at the same paths; new files in `_new_files_moved/`). Copy them back to reapply.

## 2026-10-15: Restore point, then new page sections (owner request)

- **Restore point ("previous UI"):** `_backup/2026-10-15-previous-ui/` is a full copy of `src/`, `index.html`, `vite.config.ts`, `package.json`, `package-lock.json` and `vercel.json` taken before this change. To go back: copy its contents over the project root.
- **Added (new sections only, existing sections untouched):** FAQ on Packages, Services and Process (`Faq.tsx`, `constants/faqs.ts`); plan comparison table on Packages (`ComparePlans.tsx`); "Less agency friction" (`WhyChooseUs`) on About; industries (`IndustriesStrip`) on Work. `PackageTiers.tsx`: `PLAIN` is now exported (no visual change).
- **Colour previews:** `design/color-options.png` (new file; nothing on the site changed).

## 2026-10-15: Packages plan cards redesigned (owner request)

- **Restore point:** `_backup/2026-10-15-previous-ui-2/` (full `src/` and config before this change). To go back: copy its contents over the project root.
- **Changed:** `src/components/PackageTiers.tsx` intro and plan cards only (headline with gold italic accent, three plain reassurance lines, "best for" line per plan, earlier-plan items as tags, all three cards the same size, no sparkle icon or glow). "How to get started" box unchanged.
- **Colour previews:** `design/accent-options.png` (new file; site colours not changed).

## 2026-10-15: Plan names centred; accent colour changed to Honey Amber (owner chose option B)

- **Restore point:** `_backup/2026-10-15-previous-ui-3/` (full `src/` and config before this change).
- **Changed:** plan name and tagline centred in `PackageTiers.tsx`; `gold` `#FFC21F` → `#F2A516`, `gold-light` `#FFD452` → `#F7BA4A` (in `src/index.css`, `PackageTiers.tsx`, `Spotlight.tsx`, `constants/content.ts`, `docs/design.md`). Logo file not changed.

## 2026-10-15: Review follow-up, steps 2–4 (owner approved "go ahead step by step")

- **Restore point:** `_backup/2026-10-15-previous-ui-4/` (full `src/`, `index.html` and config before these steps).
- **Step 2, hero photo:** new files `public/images/hero/social-phone-{900,1400,1600,1920,2560,3840}.webp` (Unsplash photo 1512428559087, free licence, no app logos). Social Media slide and the first-load preload in `index.html` now use them; optional per-slide `position` added (`Hero.tsx`, `content.ts`). Old `social-*.webp` files left in place (not deleted).
- **Step 3, readability:** faint text brightened across 18 components (`text-white/50→60`, `/55→70`, `/60→70`, `/65→75`, `text-ink/65→75`); 15px running text → 16px; section intros left-aligned on laptops (`SectionHeader.tsx`). Home service cards untouched.
- **Step 4, phone length and amber:** home service cards and "Why us" are swipe rows on phones; industries in 2 columns on phones (`ServicesOverview`, `WhyChooseUs`, `IndustriesStrip`). Phone home page 15,646px → 10,816px. Stat numbers (`About.tsx`) and About pillar titles (`AboutStory.tsx`) changed from amber to white.

## 2026-10-15: "Your first month" cards equal size (owner request)

- **Restore point:** `_backup/2026-10-15-previous-ui-5/`.
- **Changed:** `src/components/FirstMonth.tsx` — each card stretches to the tallest in its row; four in a row from 1280px, 2×2 on tablets and small laptops, one column on phones.

## 2026-10-15: Real phone, WhatsApp and email (owner request)

- **Restore point:** `_backup/2026-10-15-previous-ui-6/`.
- **Changed:** `src/constants/content.ts` — phone `+91 85128 77877` (call link `tel:+918512877877`), WhatsApp `wa.me/918512877877`, email `info@akirafresh.in`. Replaces the `+1 (555)` and `hello@vyralbee.com` placeholders everywhere (header menu, contact page, footer, floating WhatsApp button, CTA, privacy page, error page).

## 2026-10-15: Real address and business hours (owner request)

- **Restore point:** `_backup/2026-10-15-previous-ui-7/`.
- **Changed:** `src/constants/content.ts` (address R-18, Vikas Marg, Laxmi Nagar, Near Nirman Vihar Metro Station, Pillar No. 48, New Delhi, Delhi – 110092, India; Google Maps link; hours Mon – Sat 10:00 AM – 7:00 PM), `ContactPanel.tsx` ("Visit us" with address and map link), `Footer.tsx` (address on three lines), `index.html` (structured data now includes address, phone and email).

## 2026-10-15: Contact form — country-code phone picker and optional website field (owner request)

- **Restore point:** `_backup/2026-10-15-previous-ui-8/` (includes `package.json` / `package-lock.json` from before).
- **Added:** dependency `libphonenumber-js` (phone formats and validation for every country); new `src/components/common/PhoneField.tsx` (searchable country picker with flags, example number per country, formatting when leaving the field); 256 flag images in `public/flags/` (copied from `country-flag-icons`, MIT licence — the package itself was installed only to copy them and then uninstalled).
- **Changed:** `src/components/ContactPanel.tsx` — phone checked against the chosen country's rules and sent as a full international number (e.g. "+91 85128 77877"); new optional "Your website" field, sent with the enquiry.

## 2026-10-15: Disk full on C: — temporary test files moved to D: (owner approved "APPROVE")

- **What:** my own temporary files only — the session scratchpad screenshots/test images (488 items) and the test-browser profile `viralbee-shared-profile` (~584 MB total). No project files touched.
- **Action:** moved (not deleted) to `D:\viralbee-temp-moved\`. C: went from 0 GB to 1.1 GB free.
- **Undo:** move the folders back from `D:\viralbee-temp-moved\`.

## 2026-10-15: Cinematic 3D scroll hero (owner request)

- **Restore point:** `_backup/2026-10-15-previous-ui-9/`.
- **Changed:** `Hero.tsx` (pinned scroll stage: 3D tilt, shrink to rounded frame, photo push-in, copy drift and fade, letterbox bars, dimming; opening letterbox on load; film grain and vignette; scroll cue), `index.css` (film look styles), `FloatingWhatsApp.tsx` (appears after the hero scene). Reduced-motion visitors get the normal hero.

## 2026-10-15: Cinematic 3D layer for the other sections (owner request)

- **Restore point:** `_backup/2026-10-15-previous-ui-10/`.
- **Added:** `src/components/common/Scene3D.tsx` — scroll-linked "screen lift" (block starts tilted back, smaller, dimmer; settles flat). Used on the CTA banner (every page), home services / work / industries grids, first-month cards, package cards and the Work gallery.
- **Changed:** `Reveal.tsx` — every entrance now tilts up into place (or turns in from the side); `ServicesOverview.tsx` — home service cards tilt in 3D with the mouse (mouse devices only); the hero's text fade is now one-way (fixed a bounce-back found in testing). Reduced-motion visitors get no movement.

## 2026-10-15: Master brief, Phase 1 audit + step 1 (hero art direction)

- **Restore point:** `_backup/2026-10-15-previous-ui-11/`.
- **Audit decisions:** stay on framer-motion (no GSAP: avoids a second animation system); no Three.js (CSS/SVG depth is lighter and enough); no testimonials or case-study results invented.
- **Added:** `src/components/HeroHoneycomb.tsx` — honeycomb brand motif (gold cell, frosted cell, fine outlines) floating in 3D on the photo side; turns toward the mouse, cells parallax by depth, rise at different speeds on scroll, draw in on load. Laptop/desktop only.
- **Changed:** `Hero.tsx` (mouse depth parallax on the photo, motif, `overflow-x-clip`), `index.css` (`hex-float`), `layout/Layout.tsx` (`main` gets `overflow-x-clip` so 3D tilts never cause sideways scrolling).

## 2026-10-15: Master brief step 2 — editorial services index (owner approved "go ahead")

- **Restore point:** `_backup/2026-10-15-previous-ui-12/` (has the previous card version of `ServicesOverview.tsx`).
- **Changed:** `src/components/ServicesOverview.tsx` — the home service cards became a numbered editorial index: oversized titles rising out of a mask, self-drawing dividers, description + platforms + badge, arrow; laptop: a photo of the hovered service follows the mouse (springs, leans with movement, wipe between photos) and other rows dim; below laptop size each row has its own small photo. Each row links to that service on the Services page (`/services#…`).

## 2026-10-15: Disk space — npm and pip download caches cleared (owner approved "APPROVE")

- **What:** `npm cache clean --force` (npm-cache, ~4.32 GB) and `pip cache purge` (~0.48 GB). Only re-downloadable package copies; no project or personal files.
- **Result:** C: free 7.94 GB → 12.25 GB. Undo: not needed — npm/pip re-download on demand.

## 2026-10-15: Master brief step 3 — portfolio (owner approved "go ahead")

- **Restore point:** `_backup/2026-10-15-previous-ui-13/`.
- **Changed:** `src/components/WorkPreview.tsx` — home work section: laptop/desktop pinned scene where vertical scroll moves a row of six large project panels sideways (1.5× speed to keep the scene short), photos drift inside their frames, opening and closing panels, progress line + "01 / 06" counter; phones/tablets/reduced motion: swipeable row, no pinning. `src/components/WorkGallery.tsx` — Work page grid became editorial alternating rows (large photo settling from a zoom with parallax, big faint number, category, title, description); filter kept. All items still labelled "Concept project"; no results shown.

## 2026-10-16: Master brief step 4 — scroll storytelling (owner approved "yes")

- **Restore point:** `_backup/2026-10-16-previous-ui-14/`.
- **Added:** `src/components/StatementScene.tsx` (pinned statement: positioning line grows in with a drawn underline, agency description lights up word by word, tagline last; placed after services on Home).
- **Changed:** `ProcessPreview.tsx` (laptop+: pinned six-step sequence — big current step with 3D swap, step list with filling gold line and lighting hexagons, "Step x of 6"; phones/tablets: plain list), `pages/Home.tsx` (adds the scene).
- **Fix (site-wide):** new `useRamp` helper in `lib/motion.ts`; scroll transitions that finish early (hero frame radius/bars/dimming, process line, statement scene, Work page zoom, screen-lift opacity) now use it. framer-motion's browser scroll-timeline path made them run backwards inside pinned sections.

## 2026-10-16: Master brief step 5 — navigation (owner approved "yes")

- **Restore point:** `_backup/2026-10-16-previous-ui-15/`.
- **Changed:** `src/components/Navbar.tsx` — header slides away while scrolling down and returns on scroll up (never near the top, with the menu open, or with keyboard focus inside); one gold indicator glides to the hovered link and back to the current page; phone menu opens with a circular reveal from the menu button, numbered links rise out of masks, contact block (button, email, phone) fades in last.

## 2026-10-16: Master brief step 6 — about, CTA and footer (owner approved "yes")

- **Restore point:** `_backup/2026-10-16-previous-ui-16/`.
- **Added:** `src/components/FooterWordmark.tsx` — giant edge-to-edge "Viral Bee" ("Bee" in amber) whose letters rise out of a mask in a wave as the footer arrives (decorative, hidden from screen readers).
- **Changed:** `Footer.tsx` (wordmark replaces the faint corner honeycomb; all links and contact details unchanged), `CtaBanner.tsx` (headline rises line by line; three nested honeycomb outlines draw themselves in the corner), `About.tsx` (amber italic "Working as yours."; gold line draws along each fact card).

## 2026-10-16: Master brief step 7 — performance, accessibility and final checks (owner approved "yes")

- **Restore point:** `_backup/2026-10-16-previous-ui-17/`.
- **Measured problem:** after steps 1–6, Lighthouse (production build) phone perf 56–67 (TBT 0.9–1.6 s), desktop perf 79, accessibility 96.
- **Fixes:** heavy film effects (grain with blend mode, opening blur, honeycomb) laptop-only (`Hero.tsx`); hero photo full strength from the first frame on phones so it counts as the main picture; screen lift off on phones (`Scene3D.tsx`); below-the-fold home sections built just before they are scrolled near (new `common/Deferred.tsx`, `pages/Home.tsx`); contrast of service numbers and statement-scene dim state raised; service row links no longer override their visible text for screen readers (`ServicesOverview.tsx`, `StatementScene.tsx`).
- **Result:** desktop perf 93, accessibility 100, best practices 100, SEO 100, CLS 0; phone median perf 76 over 7 runs (TBT ~0.5 s). Reduced motion: no pinning, nothing hidden, no overflow on all 8 pages; keyboard order and focus rings OK.

## 2026-10-16: Creative-director review of the rendered site (owner request)

- **Restore point:** `_backup/2026-10-16-previous-ui-18/`.
- **Reviewed:** screen-by-screen walks of all pages at 1440px and 390px.
- **Duplicates removed (each section now appears once):** kinetic word band removed from Home (it repeated the hero ticker and the tagline; `KineticBand.tsx` kept, unused); industries moved to About only (removed from Home and Work); "Why us" kept on Home only (removed from About); the Work page's inline "Want work like this?" box removed (the CTA banner right below says the same).
- **Pacing:** hero scene shorter (135svh phone / 150svh laptop) with lighter dimming and bars, so there is no empty dark screen after it; statement scene ~2 screens instead of 3; process sequence tighter; compact process list on phones. Home: 23 → 20 screens on laptop, 18 → 15 on phones.
- **Checks:** no console errors on all 9 routes (incl. 404); no sideways overflow; reduced motion clean on all pages; build OK; Lighthouse desktop perf 90, accessibility/best practices/SEO 100, CLS 0; phone perf varies 56–80 on this machine (LCP ~4 s, client-rendered — prerendering is the remaining fix).

## 2026-10-16: Published to GitHub (owner request)

- **Remote:** `origin` switched from `https://github.com/Ashutoshkuma8271/ViralBee.git` to `https://github.com/Ashutoshkuma8271/digitalagency.git` (owner chose "Switch to digitalagency"). The ViralBee repository on GitHub is untouched. To switch back: `git remote set-url origin https://github.com/Ashutoshkuma8271/ViralBee.git`.
- **Commit:** all current work (full redesign) in one commit on `main`; `_backup/`, `node_modules`, `dist` and `*.tsbuildinfo` excluded by `.gitignore`. Checked beforehand: no secrets or real `.env` files.

## 2026-10-16: Cinematic 3D hero (owner request, LOCAL ONLY — not committed or pushed)

- **Restore point:** `_backup/2026-10-16-previous-ui-19/` (previous photo-slider hero, package.json before the 3D libraries).
- **Installed (local):** three 0.186.1, @react-three/fiber 9.8.2, @react-three/drei 10.7.9, @react-three/postprocessing 3.2.0, @types/three (dev).
- **Added:** `HeroScene3D.tsx` (real-time scene: amber honeycomb prisms, chrome ring, glowing orbs, particles, bloom; camera drifts, follows the mouse, dollies on scroll), `TrustStrip.tsx` (reads `TRUST_STRIP` in content.ts — placeholder facts until the owner sends real data), `common/GlowCursor.tsx` (mouse devices only), `public/images/hero/scene-poster-{900,1400,1920,2560}.webp` (new files, rendered from the scene).
- **Changed:** `Hero.tsx` (rewritten: intro timeline dark → light sweep → 3D → headline → buttons → strip; rotating service headlines; "Start Your Project" / "View Our Work"; content fades/scales/lifts on scroll), `content.ts` (`TRUST_STRIP`, `HERO_MEDIA` with `enable3D` switch and optional video slot), `layout/Layout.tsx` (cursor), `index.html` (preloads the poster).
- **Performance safeguards:** 3D only on laptop/desktop with a hardware GPU, fetched after page load + idle, paused off-screen, DPR ≤ 1.5, auto-fallback to the poster on slow devices. Depth of field and light rays removed after measuring (too heavy on Intel UHD).
- **Measured (this machine):** phone median 75 (TBT ~0.3 s); desktop 91 when the 3D starts after measurement, 60 when Lighthouse catches the one-time ~1.8 s 3D start-up; accessibility/best practices/SEO 100.
- `HeroHoneycomb.tsx` is now unused (kept; deleting needs owner approval).

## 2026-10-16: 3D hero reverted to the previous photo slider; glow cursor removed (owner request, LOCAL ONLY)

- **Saved first:** the 3D-hero version is in `_backup/2026-10-16-previous-ui-20/`.
- **Restored from `_backup/2026-10-16-previous-ui-19/` (byte-identical):** `src/components/Hero.tsx`, `index.html` (first-photo preload), `src/components/layout/Layout.tsx` (no `GlowCursor`).
- **Left in place, unused:** `HeroScene3D.tsx`, `TrustStrip.tsx`, `common/GlowCursor.tsx`, `scene-poster-*.webp`, the Three.js packages, and the `TRUST_STRIP` / `HERO_MEDIA` settings in content.ts. They are not loaded by the site; removing them needs owner approval.

## 2026-10-16: Text and motion pass across sections (owner "go", LOCAL ONLY — not committed or pushed)

- **Restore point:** `_backup/2026-10-16-previous-ui-21/`. Decisions: footer wordmark stays weight 600; kinetic band stays off (spec 8 skipped).
- **New shared pieces:** `common/Shine.tsx` (hover light streak), `common/CheckPop.tsx` (checkmarks pop in, staggered); `RevealWords` gains `accent` + `tone` (one gold Fraunces-italic phrase, glow on dark, gold-dark on light); `TiltCard` gains `max` and `innerClassName`; `SectionHeader` and `PageHeader` pass `accent` (PageHeader H1 now reveals word by word, intro and buttons follow); `index.css`: `.accent-glow`, gold-pill/`.glint` hover glint, statement light sweep, footer wordmark gold sweep.
- **Sections:** one accent phrase on 13 headings (6 page headers + 7 section headings); services preview turns in 3D with mouse speed + glass highlight; statement light sweep behind "Visible."; About heading reveal + stats panel tilt/shine; work panels (home + Work page) tilt 5° + shine, Work page images zoom 1.06; why-us rows stagger 0.08s; CTA black pill glint; deep-dive images, first-month cards, package cards tilt 4° + shine; checkmarks pop; footer links medium weight.
- **Bug found and fixed during testing:** first version of the new RevealWords used a normal space between words, which browsers drop at inline-block edges ("Oneteamforyour"); restored the non-breaking space.
- **Checks:** tsc + build pass (main JS 94 KB gz); no horizontal scroll at 1900/1440/390 on all 7 pages; no console errors; reduced motion clean on all pages; hero and statement pins unchanged; contact form: validation + mailto hand-off OK, no network requests (test values labelled TEST).
