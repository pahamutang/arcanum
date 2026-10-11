# Arcanum Design & Construct

A fully self-contained, ready-to-run React + Vite project. This is your
original single ~4,300-line `App.jsx` split into 30 organized files, plus
everything else needed to actually run it standalone.

## Run it

```
npm install
npm run dev
```

Then open the URL it prints (usually `http://localhost:5173`).

To build for production:
```
npm run build
```

## This was actually tested, not just written

Before zipping this up, I:
1. Compiled every file individually through Babel to catch syntax errors
2. Ran a real `npm run build` (Vite + PostCSS) — caught and fixed a stray
   extra `}` in the splash-screen CSS that browsers silently tolerated but
   a real build tool rejected outright
3. Ran the actual dev server in a headless browser and checked the console
   for errors on page load
4. Clicked through the real user flow — Enter → splash menu → Portfolio
   page → opening a project modal → opening its enquiry form — and
   confirmed zero JavaScript errors at every step
5. Fixed a leftover bug this surfaced: an orphaned `<style>{styles}</style>`
   reference in `App.jsx` left over from converting that stylesheet to a
   real `.css` file, which would have crashed the whole app on load

## Two things I had to invent — swap these when you can

I only had your `App.jsx` to work from. A few files it depends on weren't
part of that — your original project has real versions of these that I
don't have access to:

- **`public/arcanum_ultra_hd.png`** — a generated placeholder wordmark
  (gold "ARCANUM" text). Swap in your real logo file at the same path.
- **`public/team/daven.jpg`, `public/team/charles.jpg`** — placeholder
  initials avatars for the Team section on the About Us page (Daven Niel
  Pahamutang — Web Developer, Charles B. Caderao — Architect). Drop real
  photos in at those exact paths (same filenames) and they'll show up
  automatically — the `TeamPhoto` component in `AboutUs.jsx` gracefully
  falls back to the initials avatar if a photo is ever missing or fails
  to load, so it never breaks even if a file is renamed or removed.
- **`public/elfone.jpg`** — a simple placeholder character on a white
  background (the app's `ElfCanvas` component removes white pixels from
  whatever image is here, so it needs a plain white/light background to
  work correctly — keep that in mind for whatever image replaces it).
- **`src/JapaneseHouse.jsx` / `JapaneseHouse.css`** — your real project
  has a Three.js-based 3D house component here. Since I never had that
  file, I built a working, dependency-free stand-in: a mouse-tilt CSS 3D
  illustration (no WebGL, so guaranteed to render everywhere) so the
  "Interactive 3D" section on your Portfolio page has something real and
  functional instead of a blank gap. Swap this out for your original
  component whenever you're ready — nothing else in the app depends on
  its internals, just the default export.

Everything else — every page, every form, every animation, the elf, the
splash menu, the page transitions — is your real code, just reorganized.

## Structure

```
src/
├── App.jsx                    Top-level layout, section routing, page transitions
├── JapaneseHouse.jsx/.css     ⚠ placeholder — see above
├── components/
│   ├── IntroScreen.jsx/.css   Cinematic logo opener (plays once on load)
│   ├── SplashScreen.jsx/.css  RPG menu (elf, wings, dialogue HUD)
│   ├── ElfCanvas.jsx          Canvas-based white-background removal for the elf image
│   ├── WingSvg.jsx            Decorative wing SVG (left/right)
│   ├── HudDialogue.jsx        Typewriter dialogue box on the splash screen
│   ├── PageTransition.jsx     Blueprint-panel wipe between pages
│   ├── Reveal.jsx             Shared scroll-reveal wrapper (framer-motion)
│   ├── Navbar.jsx             Top nav + mobile drawer
│   ├── Hero.jsx, Marquee.jsx, Stats.jsx, Project.jsx,
│   │   Services.jsx, Process.jsx, Portfolio.jsx,
│   │   AboutUs.jsx, Contact.jsx, Footer.jsx    One file per page section
│   ├── PortfolioModal.jsx     Project detail / enquiry lightbox
│   ├── ServiceModal.jsx       Service detail / enquiry lightbox
│   └── ErrorBoundary.jsx      Catches render errors, shows a real fallback UI
├── data/
│   ├── menuItems.js           Splash screen menu entries
│   ├── shards.js               Intro screen crystal-shard positions
│   └── splashData.js          Dialogue HUD script lines
├── hooks/
│   └── useCounter.js          Animated count-up hook (used by Stats)
├── utils/
│   ├── api.js                 API_BASE + submitEnquiry (shared by all 3 forms)
│   └── audio.js                Intro → menu music crossfade manager
└── styles/
    └── global.css             Shared site-wide stylesheet
```

## Backend

This is frontend-only. Your Express backend (`arcanum-backend/`) is a
separate project — run it alongside this one, and set `VITE_API_URL` in a
`.env` file here if it's not on `http://localhost:3001`.

## Cleanup done during the split

- Removed dead code that had no reason to carry forward: `SP_STARS`,
  `SP_FF`, `SP_PETALS` (defined, never rendered — one even had a matching
  CSS rule that was just `display: none`), unused `.sp-elf-idle` /
  `.sp-elf-attack` sprite-sheet CSS (leftover from an earlier version of
  the elf, no longer referenced anywhere), and a duplicated leftover
  doc-comment above `submitEnquiry`.
- Three large CSS-in-JS template literals are now real `.css` files.
