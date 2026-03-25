---
name: NovaSpace Frontend Development
description: Skill for developing and maintaining the NovaSpace AI-powered collaboration workspace landing page. Covers project structure, tech stack conventions, styling rules, component patterns, and development workflow.
---

# NovaSpace Frontend Skill

## Project Summary

**NovaSpace** is a modern, AI-powered collaboration workspace landing page. It is built with **React 19 + Vite 6** and TypeScript. The app is a single-page marketing/landing site with multiple sections: Hero, Features, Machine Learning stats, Security & Compliance, and a Footer.

- **Repository Root**: `c:\Users\PC\Downloads\Projects\NovaFrontend`
- **Dev Server**: `http://localhost:3000` (run `npm run dev`)
- **Entry Point**: `src/main.tsx` → `src/App.tsx`

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

### Key Styling Rules
- Use `font-serif` for all headings (`h1`, `h2`, `h3`) and the brand name.
- Use `font-sans` (the default) for all body text, buttons, and labels.
- Badge/label pattern: `text-[10px] font-bold tracking-wider uppercase`.
- Rounded pills for buttons: `rounded-full`.
- Card pattern: `bg-slate-50/80 border border-slate-200 rounded-2xl p-8`.
- Max content width: `max-w-7xl mx-auto px-8`.
- Do **not** add a `tailwind.config.js` — extend the theme via `@theme` in `index.css`.

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

NovaSpace follows a **clean, editorial, minimalist** design inspired by premium SaaS products:

- **Light mode only** (for now): White base, slate grey tones.
- **Big typography**: Hero h1 is `text-5xl` to `text-7xl` with `leading-[1.1]`.
- **Whitespace-heavy**: Large `py-20` section padding, generous `gap` values.
- **Subtle depth**: Light `shadow-sm` on cards and buttons; no hard drop shadows.
- **Blue accents**: `blue-600` is the single brand accent color for CTAs and interactive elements.
- **Animated polish**: Use `motion` for floating effects, fade-ins, and hover transitions where applicable.

---

## Known Patterns & Gotchas

- **HMR**: Hot Module Replacement is conditionally disabled via `DISABLE_HMR=true` env var (for AI Studio). Do not modify the HMR config in `vite.config.ts`.
- **Tailwind v4 vs v3**: This project uses **Tailwind v4** — many v3 guides will be wrong. There is no `purge`, no `content` array, no `tailwind.config.js`. Configuration is entirely CSS-first.
- **`react-dom` is `^19.0.0`**: Ensure any third-party component libraries are React 19 compatible before installing.
- **All components currently in one file**: `src/App.tsx` is 346 lines. As the project grows, refactor components into `src/components/`.
