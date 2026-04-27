# BRAND

Design tokens for the GitHub profile, mirrored from [`jinhyuk.kim`](https://jinhyuk.kim) so the two surfaces feel coherent.

## Palette

| Token | Hex | Used for |
| --- | --- | --- |
| `--color-dark` | `#0a0a0a` | Hero background, stats card surface, snake background |
| `--color-dark-card` | `#1a1a1a` | Project card border, snake dot base |
| `--color-neon-mint` | `#2dd4bf` | Eyebrow, glyphs, links, snake body, hero glow, accent serif italic |
| `--color-neon-mint-light` | `#5eead4` | Snake gradient secondary, hover state |
| `--color-muted` | `#71717a` | Tagline, meta text, footer |
| `--color-fg` | `#fafafa` | Primary text |

URL-encoded for shields/snake parameters: `%232dd4bf` (mint), `%230a0a0a` (dark).

## Type

| Use | Stack |
| --- | --- |
| Body, headings, eyebrow | `Inter, system-ui, -apple-system, "Segoe UI", sans-serif` |
| Accent italic (one or two words per paragraph) | `"Instrument Serif", "Iowan Old Style", Georgia, serif` (italic) |

The italic serif is the brand's *voice* moment — use it on a single carefully chosen word: `Kim.`, `companions`, `소프트웨어`, `No cloud.`. Never a whole phrase.

## Glyphs

Section headers in the README use a single-tone glyph palette in mint. No emoji clusters.

| Glyph | Meaning |
| --- | --- |
| ✦ | Featured work / showcase |
| ✎ | Writing / thinking |
| ⚙ | Stack / tooling |
| ◐ | Activity / status |
| → | Pointer / link / footer |

## Voice

- English base. Korean appears as one accent line per major section (tagline, footer line).
- One italic-serif word per paragraph at most.
- No "Hi there 👋", no rocket emoji, no `<details>` accordions hiding important content.
- Stats and badges use the brand palette; default shields colors are off-brand.

## Cross-surface map

| Element | Token applied |
| --- | --- |
| `assets/hero-banner.svg` | dark + mint glow + grain |
| Pill row badges (shields.io) | `color=2dd4bf&labelColor=0a0a0a&style=for-the-badge` |
| Stack pills (shields.io) | `color=1a1a1a&labelColor=0a0a0a&style=flat-square` |
| Snake (`Platane/snk`) | `color_snake=%232dd4bf&color_dots=%231a1a1a,%23404040,%232dd4bf,%235eead4,%23fafafa` |
| Stats / top-langs (`github-readme-stats`) | `bg_color=0a0a0a&title_color=2dd4bf&text_color=fafafa&icon_color=2dd4bf&hide_border=true` |

Cached SVGs live on the `output` branch and are referenced from README via `raw.githubusercontent.com` so the live README never blocks on third-party services.
