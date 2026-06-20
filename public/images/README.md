# /public/images

Drop your final generated images here using these EXACT filenames, then update
the matching `image:` URL in `components/Geography.tsx` from the Unsplash link
to the local path (e.g. `image: "/images/uae-office.webp"`).

Generate at ~1600×2000 px (portrait, the cards are taller than wide), export as
.webp for small file size.

| Filename             | Used for                         | Where to wire it                         |
|----------------------|----------------------------------|------------------------------------------|
| `cis-market.webp`    | СНГ region card                  | Geography.tsx → regions[0].image         |
| `uae-office.webp`    | ОАЭ region card                  | Geography.tsx → regions[1].image         |
| `asia-market.webp`   | Китай и Индия region card        | Geography.tsx → regions[2].image         |
| `hero-bg.webp`       | (optional) ambient hero backdrop | Hero.tsx background layer                 |

## Optional: use your real logo

The header/footer logo is currently a crisp SVG recreation of the gold triangle
(`components/Logo.tsx`). To use your exact exported file instead, save a
**transparent PNG/SVG** here as `logo.svg` (or `logo.png`) and replace
`<LogoMark/>` in `Logo.tsx` with:
`<img src="/images/logo.svg" alt="BPS" width={30} height={30} />`.
Export it on a transparent background — the site is dark, a white background
will look like a box.
