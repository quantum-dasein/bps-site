# BEST PRACTICE SOLUTION (BPS)

Premium, dark-luxury single-page site for an elite **B2B Executive Search &
Recruitment** agency. Awwwards-grade: 3D WebGL gold prism, custom cursor,
preloader, kinetic typography, layered parallax and scroll animations.

> All visible copy is **Russian** (per brand). Code/comments are English.

## Tech stack

- **Next.js 14** (App Router) + **React 18** + **TypeScript**
- **Tailwind CSS** — custom dark + metallic-gold design system
- **React Three Fiber / drei / postprocessing** — 3D gold prism with bloom
- **Framer Motion** — reveals, counters, magnetic buttons, scroll progress
- **Lenis** — smooth scrolling
- **lucide-react** — icons

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

## Deploy to Vercel (recommended)

The repo is already a git repo with an initial commit on `main`.

1. **Push to GitHub.** In VS Code: open the `bps-site` folder → Source Control
   panel → "Publish Branch" (sign in to GitHub). Or via CLI:
   ```bash
   git remote add origin https://github.com/<you>/bps-site.git
   git push -u origin main
   ```
2. Go to **vercel.com → Add New → Project**, import the GitHub repo.
   Vercel auto-detects Next.js — just click **Deploy**. No config needed.
3. **Custom domain:** Project → Settings → Domains → add
   `bestpracticesolution.uz`. Point the domain's DNS to Vercel (A/CNAME records
   Vercel shows you). Email (Yandex MX records) stays untouched — Vercel only
   handles the website's A/CNAME, your MX records keep mail working.

## Structure

```
app/
  layout.tsx        Fonts (Manrope/Inter/JetBrains Mono, Cyrillic) + global chrome
  page.tsx          Section composition
  globals.css       Tokens, gold gradients, grid/noise, cursor, reduced-motion
components/
  Preloader.tsx     0→100 counter + animated logo, locks scroll
  Cursor.tsx        Custom gold dot + easing ring (desktop only)
  ScrollProgress.tsx Gold top progress bar
  Navbar.tsx        Glass nav, numbered links, magnetic CTA
  Hero.tsx          Kinetic headline + parallax + 3D scene
  PyramidScene.tsx  R3F extruded gold triangular prism, bloom, particles
  Marquee.tsx       Infinite keyword ribbon
  About.tsx         Company intro (B2B)
  Stats.tsx         Animated count-up metrics
  Geography.tsx     Interactive СНГ / ОАЭ / Китай-Индия switcher
  Expertise.tsx     Executive Search / Cross-border / Screening
  WhyUs.tsx         Reasons + "Главный итог"
  Footer.tsx        Contacts + giant BPS wordmark
  Logo.tsx          SVG gold-triangle mark + wordmark
  AnimatedText/Reveal/Magnetic/Counter  motion helpers
public/images/      Drop final generated images here (see its README)
```

## Custom images

Geography cards use Unsplash placeholders. Replace with your own images in
`/public/images/` and switch the `image:` paths in `components/Geography.tsx`
to local `/images/...` paths. See `public/images/README.md` for exact filenames.
