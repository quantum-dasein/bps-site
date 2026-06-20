# BEST PRACTICE SOLUTION (BPS) — Premium SPA

Elite B2B Executive Search & Recruitment agency website.
Dark luxurious aesthetic, metallic-gold accents, WebGL 3D hero pyramid,
smooth scrolling and reveal-on-scroll animations.

> All UI copy is in **Russian** (per spec). Code, comments and names are in English.

## Tech stack

- **Next.js 14** (App Router) + **React 18** + **TypeScript**
- **Tailwind CSS** (custom dark + gold design system)
- **Three.js / @react-three/fiber / @react-three/drei** — 3D metallic gold pyramid
- **Framer Motion** — reveal & micro-interactions
- **Lenis** — smooth scrolling
- **lucide-react** — icons

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve production build
```

## Structure

```
app/
  layout.tsx        Fonts (Inter + Manrope, Cyrillic), metadata, smooth-scroll wrapper
  page.tsx          Section composition
  globals.css       Design tokens, gold gradients, grid/noise backgrounds
components/
  Navbar.tsx        Sticky glass nav + mobile menu
  Hero.tsx          Headline + dynamically-imported 3D scene
  PyramidScene.tsx  R3F metallic gold pyramid, mouse-reactive
  Marquee.tsx       Infinite keyword ribbon
  About.tsx         Company intro (B2B)
  Geography.tsx     СНГ / ОАЭ / Китай и Индия cards
  Expertise.tsx     Executive Search / Cross-border / Screening
  WhyUs.tsx         Reasons + "Главный итог"
  Footer.tsx        Contacts (email / phone / address)
  Reveal.tsx        Scroll-reveal helper
  Logo.tsx          Gold triangle wordmark
public/images/      Drop final custom images here (see images/README.md)
```

## Custom images

The Geography cards currently use Unsplash placeholders. Replace them with your
own generated images in `/public/images/` and swap the `image:` paths in
`components/Geography.tsx`. See `public/images/README.md` for filenames.
