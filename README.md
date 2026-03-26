<div align="center">
<img width="1200" height="475" alt="NovaSpace Banner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# NovaSpace — AI-Powered Collaboration Workspace

**NovaSpace** is a premium, AI-driven collaboration workspace landing page. It features a clean **Black & White** editorial aesthetic with glassmorphism UI components, fluid animations, and a multi-section marketing layout built with React 19 and Tailwind CSS v4.

## ✨ Features

- **Glassmorphism Navbar** — Floating, frosted-glass navigation capsule with interactive Features dropdown and mobile menu
- **Hero Section** — Bold serif headline, subtext, and dual CTAs
- **Logo Ticker** — Infinite-scroll marquee of partner brands
- **Features / Workspace / AI-Powered Sections** — Rich feature cards with Lucide icons
- **Machine Learning Stats** — Animated key performance metrics
- **For Everyone Section** — 4-column audience targeting (Students, Developers, Enterprises, Startups)
- **Why Choose Us** — Efficiency-focused 6-card grid
- **CTA Section** — Video-background call-to-action with HLS streaming + MP4 fallback
- **Security & Compliance** — SOC 2, ISO 27001, GDPR, HIPAA badges
- **Multi-column Footer** — Social links (LinkedIn, Twitter, GitHub, YouTube) and site navigation

## 🛠️ Tech Stack

| Category   | Tool                        |
|------------|-----------------------------|
| Framework  | React 19 + Vite 6           |
| Language   | TypeScript ~5.8             |
| Styling    | Tailwind CSS v4 (CSS-first) |
| Animations | Motion (Framer Motion v12)  |
| Icons      | Lucide React                |
| Video      | hls.js (native `<video>`)   |
| AI         | @google/genai               |

## 🎨 Design System

- **Palette**: Strictly **Black & White / Monochromatic** — `slate-900`, `slate-600`, `white`, `slate-50`
- **Typography**: `Playfair Display` (serif) for all headlines · `Inter` (sans) for UI/body text
- **Glassmorphism**: `backdrop-blur-xl`, `bg-white/70`, `border border-white/40`, `ring-1 ring-slate-900/5`
- **No blue, purple, or vibrant colors** — the design system is strictly monochromatic

## 🚀 Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   ```bash
   npm install
   ```
2. Set your Gemini API key (optional — only needed for AI features):
   ```bash
   cp .env.example .env.local
   # Edit .env.local and add: GEMINI_API_KEY=your_key_here
   ```
3. Start the dev server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
NovaFrontend/
├── src/
│   ├── App.tsx          # All UI components and page assembly
│   ├── index.css        # Global styles, Tailwind @theme tokens
│   └── main.tsx         # React root mount
├── .agents/
│   └── skills/
│       └── novaspace_frontend/
│           └── SKILL.md # Design system, component patterns, B&W rules
├── index.html
├── vite.config.ts
└── package.json
```

## 🔐 Security

- `GEMINI_API_KEY` is loaded from `.env.local` — **never committed to git**
- `.env.local` is included in `.gitignore`

---

*Made with ❤️ in Ghana*
