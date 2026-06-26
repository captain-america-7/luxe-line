<div align="center">

# LUXE LINE

### *Where Every Sip Defines Luxury*

A cinematic, scroll-driven landing experience for a luxury café brand — built with Next.js 16, React 19, and a taste-first motion design system.

[![Next.js](https://img.shields.io/badge/Next.js-16.2.9-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19.2.4-149ECA?style=for-the-badge&logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-C7A46C?style=for-the-badge)](LICENSE)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com)

[**Live Demo**](#) · [**Report Bug**](https://github.com/captain-america-7/luxe-line/issues) · [**Request Feature**](https://github.com/captain-america-7/luxe-line/issues)

</div>

---

## About

**LUXE LINE** is a digital flagship for a fictional luxury café concept. The brief: translate a high-end hospitality brand into a web experience that feels as crafted as the espresso it serves. The result is a single-page, scroll-driven narrative built around chapter components — philosophy, signature coffee, culinary collection, interior walkthrough, gallery, testimonials, and a reservation concierge.

Every interaction is deliberate. Scroll is buttered with Lenis. Layers reveal on a choreographed timeline via Framer Motion and GSAP. A custom cursor replaces the system pointer. A particle canvas breathes in the background. Grain texture overlays every surface. Light/dark palettes flip with a gold-accented toggle.

The site is fully responsive (mobile to 4K), accessible (keyboard-navigable, reduced-motion aware), and ships at zero JavaScript cost on the critical path thanks to Next.js App Router server components — interactive sections are isolated as client components.

---

## Features

- **Cinematic scroll narrative** — nine choreographed chapters with parallax, scroll-tied reveals, and stage-managed transitions
- **Smooth scroll engine** — Lenis-powered momentum scrolling with custom easing
- **Motion design system** — Framer Motion + GSAP for layered, performant animations
- **Custom cursor** — pointer replaces system cursor with a context-aware ring on interactive elements
- **Canvas particle background** — lightweight, GPU-accelerated ambient motion
- **Light/dark themes** — gold-accented palettes (`#C7A46C`), matte black + warm ivory surfaces
- **Reservation form** — client-side validated concierge booking flow
- **Menu overlay** — fullscreen luxury concierge menu with favorites persisted to `localStorage`
- **Newsletter capture** — opt-in to *The Chronicle* mailing list
- **Audio layer** — ambient soundscape toggle in the navbar
- **Gallery** — masonry-style image presentation with hover reveals
- **Testimonials** — curated guest quotes with subtle motion
- **Interior walkthrough** — scroll-locked, sticky-positioned visual storytelling
- **Crafted daily** — time-sensitive content section
- **SEO-ready** — semantic HTML, Open Graph, Twitter cards, structured metadata
- **Performance** — Turbopack dev, optimized production builds, lazy-loaded imagery via `next/image`
- **Accessibility** — keyboard navigation, focus rings, `prefers-reduced-motion` support, ARIA labels

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org) (App Router, Turbopack) |
| UI | [React 19](https://react.dev) |
| Language | [TypeScript 5](https://www.typescriptlang.org) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) (PostCSS) |
| Motion | [Framer Motion](https://www.framer.com/motion/) · [GSAP](https://gsap.com) |
| Smooth scroll | [Lenis](https://lenis.darkroom.engineering) |
| Icons | [Lucide React](https://lucide.dev) |
| Typography | [Cormorant Garamond](https://fonts.google.com/specimen/Cormorant+Garamond) · [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) via `next/font` |
| Linting | [ESLint 9](https://eslint.org) · `eslint-config-next` |
| Deployment | [Vercel](https://vercel.com) |

---

## Getting Started

### Prerequisites

- **Node.js** 20.9+ (Next.js 16 requirement)
- **npm** 10+ (or pnpm/yarn/bun)

### Installation

```bash
# Clone the repository
git clone https://github.com/captain-america-7/luxe-line.git
cd luxe-line

# Install dependencies
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser. The page auto-updates as you edit files.

### Production Build

```bash
npm run build
npm run start
```

### Linting

```bash
npm run lint
```

---

## Project Structure

```
luxe-line/
├── public/
│   └── images/              # Hero, gallery, and signature dish photography
├── src/
│   ├── app/
│   │   ├── globals.css      # Tailwind v4 theme tokens + custom layers
│   │   ├── layout.tsx       # Root layout, fonts, metadata
│   │   ├── page.tsx         # Home — orchestrates the full scroll narrative
│   │   └── favicon.ico
│   └── components/
│       ├── AudioPlayer.tsx
│       ├── CanvasBackground.tsx
│       ├── CraftedDaily.tsx
│       ├── CulinaryCollection.tsx
│       ├── CustomCursor.tsx
│       ├── Gallery.tsx
│       ├── Hero.tsx
│       ├── InteriorWalkthrough.tsx
│       ├── MenuOverlay.tsx
│       ├── Navbar.tsx
│       ├── Philosophy.tsx
│       ├── ReservationForm.tsx
│       ├── SignatureCoffee.tsx
│       └── Testimonials.tsx
├── .gitignore
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tsconfig.json
└── vercel.json
```

---

## Design System

The visual language is built on a tight token palette defined in `src/app/globals.css`:

| Token | Hex | Use |
|---|---|---|
| `gold` | `#C7A46C` | Primary accent — buttons, hairlines, headings |
| `gold-hover` | `#B5935B` | Hover state for gold elements |
| `matte-black` | `#0B0B0B` | Dark surface base |
| `warm-ivory` | `#F8F4ED` | Light surface base |
| `espresso` | `#1E140F` | Deep warm neutral |
| `walnut` | `#4A3525` | Mid warm neutral |
| `olive` | `#4E5340` | Earth-tone accent |

Typography pairs **Cormorant Garamond** (serif, for editorial headings and the brand wordmark) with **Plus Jakarta Sans** (sans, for body and UI).

---

## Customization

- **Colors** — edit `--color-*` tokens in `src/app/globals.css`
- **Copy** — each chapter component owns its own copy in `src/components/`
- **Imagery** — replace files in `public/images/` (keep filenames; recommended max 800KB each)
- **Brand wordmark** — search `LUXE LINE` in `src/app/page.tsx` and the loading sequence
- **Favorites key** — change `luxe_favorites` in `src/app/page.tsx` if shipping multiple instances

---

## Deployment

### Vercel (recommended)

The fastest path — Vercel auto-detects Next.js and applies optimal defaults.

#### One-click

[**Deploy to Vercel →**](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fcaptain-america-7%2Fluxe-line)

#### CLI

```bash
npm i -g vercel
vercel              # first deploy (preview)
vercel --prod       # promote to production
```

#### GitHub integration

1. Push to GitHub (done ✓)
2. Visit [vercel.com/new](https://vercel.com/new)
3. Import `captain-america-7/luxe-line`
4. Accept the auto-detected framework preset
5. Deploy

Every push to `main` will trigger a production deploy. Pull requests get preview URLs automatically.

### Other platforms

The app is a standard Next.js 16 App Router project — it deploys cleanly to Netlify, Cloudflare Pages, AWS Amplify, or any Node.js host. For static export:

```bash
# Add `output: 'export'` to next.config.ts first
npm run build
```

---

## Performance Notes

- **Turbopack** powers `next dev` for sub-second HMR
- **`next/image`** auto-optimizes imagery in `public/images/`
- **`next/font`** self-hosts Google Fonts at build time — zero CLS, zero render-blocking requests
- Client components are isolated per chapter — the critical path stays lean
- Lenis is throttled via `requestAnimationFrame` to avoid scroll-jank
- Framer Motion uses `whileInView` and `useReducedMotion` to skip work on low-power devices

---

## Roadmap

- [ ] Reservation form backend (Resend + Postgres / Convex)
- [ ] Multi-language support (i18n)
- [ ] Storybook for the design system
- [ ] CMS integration for the menu and gallery
- [ ] 3D product viewer (Spline / Three.js)
- [ ] E2E tests (Playwright)

---

## Contributing

Contributions are welcome. Open an issue first to discuss what you'd like to change, then submit a PR. Keep changes focused, and follow the existing component patterns.

---

## License

Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for the full text.

---

## Author

**Aruntej (captain-america-7)** — [github.com/captain-america-7](https://github.com/captain-america-7)

Project: [github.com/captain-america-7/luxe-line](https://github.com/captain-america-7/luxe-line)

<div align="center">

*"Luxury lives in the smallest details."*

</div>
