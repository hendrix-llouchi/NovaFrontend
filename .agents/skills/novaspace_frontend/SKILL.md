---
name: NovaSpace Frontend Development
description: Skill for developing and maintaining the NovaSpace AI-powered collaboration workspace landing page. Covers project structure, tech stack conventions, the definitive Black & White design system, glassmorphism patterns, component architecture, and development workflow.
---

# NovaSpace Frontend Skill

## Project Summary

**NovaSpace** is a modern, AI-powered collaboration workspace landing page. It is built with **React 19 + Vite 6** and TypeScript. The app is a single-page marketing/landing site with multiple sections: Navbar (glassmorphism), Hero, Logo Ticker, Features, Workspace, AI-Powered, Machine Learning, For Everyone, Why Choose Us, CTA (video background), Security, and a comprehensive multi-column Footer.

- **Repository Root**: `c:\Users\PC\Downloads\Projects\NovaFrontend`
- **Dev Server**: `http://localhost:3000` (run `npm run dev`)
- **Entry Point**: `src/main.tsx` → `src/App.tsx`
- **Active Branch**: `feature/homepage`

---

## Technology Stack

| Category         | Tool / Library                         | Notes                                              |
|-----------------|----------------------------------------|----------------------------------------------------|
| Framework       | React 19                               | JSX transform via `react-jsx`                      |
| Build Tool      | Vite 6                                 | Dev server on port 3000, bound to `0.0.0.0`        |
| Language        | TypeScript ~5.8 (ESNext, ES2022 target)| `noEmit: true`, use `npm run lint` to check types  |
| Styling         | Tailwind CSS v4 (`@tailwindcss/vite`)  | **CSS-first config** — no `tailwind.config.js`     |
| Icons           | Lucide React                           | Import named icons from `lucide-react`             |
| Animations      | Motion (Framer Motion v12)             | Import from `motion/react`                         |
| Video Streaming | hls.js                                 | Native `<video>` + `useEffect` — NO react-player  |
| AI Integration  | `@google/genai`                        | API key via `GEMINI_API_KEY` env variable          |
| Path Alias      | `@/`                                   | Maps to the project root `./`                      |

---

## Project Structure

```
NovaFrontend/
├── src/
│   ├── App.tsx          # All UI components and page assembly (single file currently)
│   ├── index.css        # Global styles, Tailwind import, theme tokens
│   └── main.tsx         # React root mount
├── index.html           # HTML shell
├── vite.config.ts       # Vite config (Tailwind plugin, path alias, env)
├── tsconfig.json        # TypeScript config
├── package.json         # Dependencies & scripts
└── .env.example         # Env variable template
```

> ⚠️ **Note**: Currently all React components live in `src/App.tsx`. When adding new features, prefer extracting them into `src/components/` to keep the codebase maintainable.

---

## Styling Conventions (Tailwind CSS v4)

Tailwind v4 uses a **CSS-first** configuration approach. All theme customization is done inside `src/index.css` using the `@theme` block — **not** a `tailwind.config.js` file.

### Current Theme (`src/index.css`)
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap');
@import "tailwindcss";

@theme {
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-serif: "Playfair Display", ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
}
```

### Design Tokens in Use
| Token          | Value                          | Usage                                |
|----------------|--------------------------------|--------------------------------------|
| `font-sans`    | Inter                          | Body text, UI labels, nav            |
| `font-serif`   | Playfair Display               | Headlines, brand name, stat numbers  |
| **Primary**    | `blue-600` / `blue-700`        | CTAs, icon accents, links            |
| **Background** | `white` / `slate-50`           | Page & card backgrounds              |
| **Text**       | `slate-900`, `slate-600`, `slate-500` | Heading, body, muted text     |
| **Border**     | `slate-200`, `slate-100`       | Card and section dividers            |

## ⚠️ DESIGN SYSTEM RULES — READ BEFORE ANY WORK ⚠️

Every UI implementation **MUST** strictly follow these rules. Deviating from them will break the design language.

### Colour Palette — Strictly Monochromatic (Black & White)

| Role              | Tailwind Class          | Usage                                            |
|--------------------|-------------------------|--------------------------------------------------|
| **Primary BG**     | `bg-white`              | Main page background                             |
| **Alt BG**         | `bg-slate-50`           | Card & section alternating backgrounds           |
| **Dark Section**   | `bg-slate-900` / `bg-slate-950` | CTA, dark headers, overlays               |
| **Primary Text**   | `text-slate-900`        | Headings, labels, bold copy                     |
| **Body Text**      | `text-slate-600`        | Paragraph / subtext                              |
| **Muted Text**     | `text-slate-400` / `text-slate-500` | Captions, secondary labels           |
| **Borders**        | `border-slate-100` / `border-slate-200` | Cards, dividers, input rings       |
| **Icon BG**        | `bg-white border border-slate-100` | Icon container background              |
| **Buttons (Primary)** | `bg-slate-900 text-white hover:bg-black` | Main action buttons             |
| **Buttons (Secondary)** | `bg-white text-slate-900 border border-slate-200` | Ghost/outlined buttons  |
| **Badges**         | `bg-slate-900 text-white` or `bg-slate-50 text-slate-600` | Labels & pill badges |

> 🚨 **NEVER use** `blue-600`, `blue-500`, `blue-50`, `blue-100`, `indigo-*`, `violet-*`, or any vibrant color as a primary UI element. **Blue is fully banned from this design system.** The only exception is a micro-accent (e.g., a 5% opacity tint in a very specific dark-on-dark CTA context).

### Typography

| Usage                    | Classes                                         |
|--------------------------|-------------------------------------------------|
| **Page Headlines (h1)**  | `font-serif text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight` |
| **Section Headlines (h2)** | `font-serif text-4xl md:text-5xl font-bold`   |
| **Card Titles (h3)**     | `font-serif text-2xl font-bold tracking-tight`  |
| **Badges / Labels**      | `font-sans font-bold text-[10px] tracking-widest uppercase` |
| **Body / Subtitles**     | `font-sans text-lg text-slate-600 leading-relaxed` |
| **Button Text**          | `font-sans font-bold text-sm`                   |

- `font-serif` → **Playfair Display** (all h1, h2, h3, and the brand wordmark)
- `font-sans` → **Inter** (everything else: buttons, body, labels, nav)

### Glassmorphism Navbar Pattern

The Navbar is a **floating, fixed-position glass capsule**. Always follow this implementation:

```tsx
<header className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-[100] w-full max-w-[calc(100%-48px)] md:max-w-6xl pointer-events-none">
  <nav className="backdrop-blur-xl bg-white/70 border border-white/40 rounded-3xl md:rounded-[2rem] px-5 md:px-10 py-2.5 md:py-4 flex items-center justify-between shadow-[0_8px_32px_rgba(0,0,0,0.06)] pointer-events-auto ring-1 ring-slate-900/5">
    {/* ... */}
  </nav>
</header>
```

- **Active link**: `text-slate-900 border-b-2 border-slate-900`
- **Inactive links**: `text-slate-500 hover:text-slate-900`
- **Sign up button**: `bg-slate-900 text-white rounded-2xl` (NOT rounded-full)
- **Mobile menu**: Glassmorphic `backdrop-blur-3xl bg-white/95` slide-down overlay with `<Menu>` / `<X>` toggle

### Spacing & Layout Conventions

| Element                | Pattern                                     |
|------------------------|---------------------------------------------|
| Section padding        | `py-20` to `py-32` vertical                 |
| Max content width      | `max-w-7xl mx-auto px-8`                    |
| Card grid (2 col)      | `grid grid-cols-1 md:grid-cols-2 gap-8`     |
| Card grid (3 col)      | `grid grid-cols-1 md:grid-cols-3 gap-8`     |
| Card grid (4 col)      | `grid grid-cols-2 md:grid-cols-4 gap-6`     |
| Card border-radius     | `rounded-2xl` to `rounded-[3rem]`           |
| Card padding           | `p-8` to `p-10`                             |
| Shadow (light)         | `shadow-sm` on cards                        |
| Shadow (premium)       | `shadow-2xl shadow-slate-100` on sections   |

### Section Header Pattern

All major sections use the shared `<SectionHeader>` component:
```tsx
<SectionHeader
  badge="Label Text"
  title="Main Heading Here"
  description="Supporting descriptive copy goes here..."
  centered={true} // or false for left-aligned
/>
```

### Icon Container Pattern
```tsx
<div className="w-14 h-14 rounded-2xl bg-white border border-slate-100 flex items-center justify-center shadow-sm">
  <IconName className="w-7 h-7 text-slate-900" strokeWidth={1.2} />
</div>
```
- Icons should always be `text-slate-900` on light backgrounds
- Icons should always be `text-white` on dark (`slate-900`) backgrounds

### Video Player Pattern (HLS + MP4 Fallback)

Never use `react-player`. Always use native `<video>` + `hls.js` via `useEffect`:

```tsx
const VideoBackground = ({ hlsSrc, mp4Src }) => {
  const videoRef = useRef(null);
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    let hls = null;
    if (Hls.isSupported()) {
      hls = new Hls();
      hls.loadSource(hlsSrc);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => video.play().catch(() => {}));
      hls.on(Hls.Events.ERROR, (_, data) => {
        if (data.fatal) { hls.destroy(); video.src = mp4Src; video.play().catch(() => {}); }
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = hlsSrc;
    } else {
      video.src = mp4Src;
    }
    return () => hls?.destroy();
  }, [hlsSrc, mp4Src]);
  return <video ref={videoRef} className="absolute inset-0 w-full h-full object-cover" muted loop playsInline />;
};
```

---

## Component Architecture

All components in `src/App.tsx` follow a clean, flat, functional pattern. Props are typed inline with `any` for flexibility currently — when refactoring, add proper TypeScript interfaces.

### Existing Components
| Component       | Description                                                |
|----------------|------------------------------------------------------------|
| `<Navbar />`   | Top nav with logo, links, Log In & Sign Up buttons         |
| `<Hero />`     | Full hero with headline, subtext, CTAs, and abstract graphic |
| `<FeatureCard />` | Reusable card with icon, title, description, badge, and link |
| `<Features />` | Grid layout of feature cards (2-up large + 4-up small)    |
| `<MachineLearning />` | Stats section: 10x faster, 95% accuracy, 5hrs/week   |
| `<SecurityCard />` | Inline security feature row with icon, title, badge    |
| `<Security />` | Security section with compliance badges (SOC 2, ISO 27001, GDPR, HIPAA) |
| `<Footer />`   | Multi-column footer with links and social icons            |

### Page Assembly (`App.tsx` default export)
```tsx
export default function App() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-blue-100">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <MachineLearning />
        <Security />
      </main>
      <Footer />
    </div>
  );
}
```

---

## Environment Variables

Sensitive values are loaded from a `.env` file in the project root. See `.env.example` for the template.

| Variable        | Used In              | Description                    |
|----------------|----------------------|--------------------------------|
| `GEMINI_API_KEY` | `vite.config.ts` → `process.env.GEMINI_API_KEY` | Google Gemini AI API key |

> ⚠️ Never commit the `.env` file. It is listed in `.gitignore`.

---

## NPM Scripts

```bash
npm run dev      # Start dev server on http://localhost:3000
npm run build    # Build production bundle to /dist
npm run preview  # Serve the production build locally
npm run lint     # TypeScript type-check (tsc --noEmit)
npm run clean    # Remove /dist directory
```

---

## Development Guidelines

### Adding New Components
1. Define the component as a `const` arrow function in `src/App.tsx` (for simple additions).
2. For larger features, create `src/components/ComponentName.tsx` and import it in `App.tsx`.
3. Use Lucide React for all icons — browse available icons at [lucide.dev](https://lucide.dev).
4. Use the `motion` library for animations: `import { motion } from 'motion/react'`.
5. **Always check the Design System rules above before styling anything.**

### Adding New Styles / Theme Tokens
1. Open `src/index.css`.
2. Add new CSS custom properties inside the `@theme {}` block.
3. Do **not** create a `tailwind.config.js`.

### Using the Gemini AI API
- The API key is available at `process.env.GEMINI_API_KEY` at runtime (injected by Vite).
- Import the client: `import { GoogleGenAI } from '@google/genai'`.
- Initialize: `const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })`.

### Path Aliases
Use the `@/` alias to import from the project root:
```ts
import MyComponent from '@/src/components/MyComponent'
```

---

## Visual Design Principles

NovaSpace follows a **clean, editorial, premium minimalist** design:

- **Monochromatic Only**: Strictly Black & White / Slate. No vibrant accent colours.
- **Big typography**: Hero h1 is `text-5xl` to `text-7xl` with `leading-[1.1]`. Serif font for all headlines.
- **Whitespace-heavy**: Large `py-20`–`py-32` section padding, generous `gap` values.
- **Glassmorphism Navbar**: Floating pill/capsule with `backdrop-blur`, `bg-white/70`, border, and shadow.
- **Subtle depth**: Light `shadow-sm` on cards; richer `shadow-2xl shadow-slate-100` on major sections.
- **Animated polish**: Use `motion` for floating effects, fade-ins, hover transitions, and scroll-triggered reveals.
- **Video Backgrounds**: Use native `<video>` + `hls.js` only. Never `react-player`.

---

## Known Patterns & Gotchas

- **HMR**: Hot Module Replacement is conditionally disabled via `DISABLE_HMR=true` env var (for AI Studio). Do not modify the HMR config in `vite.config.ts`.
- **Tailwind v4 vs v3**: This project uses **Tailwind v4** — many v3 guides will be wrong. There is no `purge`, no `content` array, no `tailwind.config.js`. Configuration is entirely CSS-first via `@theme` in `src/index.css`.
- **`react-dom` is `^19.0.0`**: Ensure any third-party component libraries are React 19 compatible before installing.
- **All components currently in one file**: `src/App.tsx` is large. As the project grows, extract components into `src/components/`.
- **Navbar is `fixed` positioned**: Remember to add `pt-24` or equivalent top-padding to the `<main>` element or the first section if content gets hidden behind the nav.
- **Design Drift**: The #1 risk on this project. When in doubt, refer to the Design System rules in this file — especially the colour palette. Blue/purple/any colour = WRONG.
