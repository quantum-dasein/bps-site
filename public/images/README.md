# /public/images

Drop your final generated images here using these EXACT filenames, then update
the matching `image:` URL in `components/Geography.tsx` from the Unsplash link
to the local path (e.g. `image: "/images/uae-office.webp"`).

Generate at ~1600×2000 px (portrait). Save as PNG (ChatGPT default) — that works fine.

| Filename                  | Used for                         | Auto-detected? |
|---------------------------|----------------------------------|----------------|
| `hero-pyramid.png`        | Big gold pyramid in the hero     | ✅ auto (falls back to WebGL prism) |
| `methodology-radar.png`   | Radar visual in «Как мы работаем»| ✅ auto (falls back to SVG radar)   |
| `contact-globe.png`       | Globe glow in contacts           | ✅ auto (hidden if absent)          |
| `cis-market.png/.jpg`     | СНГ region card                  | wired in Geography.tsx              |
| `uae-office.png`          | ОАЭ region card                  | wired in Geography.tsx              |
| `asia-market.png`         | Китай и Индия region card        | wired in Geography.tsx              |

The first three are picked up **automatically** — just drop the file with the exact
name into this folder and the site swaps the placeholder visual for your render.
No code changes needed.

## Optional: use your real logo

The header/footer logo is currently a crisp SVG recreation of the gold triangle
(`components/Logo.tsx`). To use your exact exported file instead, save a
**transparent PNG/SVG** here as `logo.svg` (or `logo.png`) and replace
`<LogoMark/>` in `Logo.tsx` with:
`<img src="/images/logo.svg" alt="BPS" width={30} height={30} />`.
Export it on a transparent background — the site is dark, a white background
will look like a box.
