<div align="center">
<img width="1200" height="475" alt="NovaSpace Banner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# NovaSpace — AI-Powered Collaboration Workspace

**NovaSpace** is a premium, AI-driven collaboration workspace. Originally designed as a landing page, it has evolved into a full-scale multi-page React Application complete with user authentication flows, dynamic dashboard modules, team management hubs, and integrated conferencing pages.

The application rigidly strictly adheres to a **Monochromatic Black & White** editorial aesthetic using custom glassmorphism components and fluid framer-motion animations, built with React 19 and Tailwind CSS v4.

## ✨ Implemented Modules

NovaSpace utilizes **React Router** to manage fully-responsive modular sections:

- **Public Views**
  - **Landing Page (`/`)** — Marketing funnel with infinite scrolling tickers, pricing logic, video streaming, and feature overviews.
- **Authentication Flow**
  - **Login / Signup (`/login`, `/signup`)** — Split-screen editorial authentication with social provider integrations and 2FA features.
- **Dashboard Ecosystem**
  - **Overview (`/dashboard`)** — Aggregated statistics, quick-access apps, recent team activities, and global search.
  - **Tasks (`/tasks`)** — Kanban-ready task management interfaces.
  - **Projects (`/projects`)** — Comprehensive project tracking and file sorting.
  - **Workspaces (`/workspace`)** — Personal and shared isolated environments.
  - **Calendar (`/calendar`)** — Advanced scheduling grid with day/week/month navigation and embedded clock functionality.
  - **Conferencing / Meetings (`/meetings`)** — Video hub structure detailing public, live, and private meeting rooms.
  - **Teams (`/teams`)** — Searchable member directory and filtered role mapping.
  - **Team WorkSpace Hub (`/team-workspace`)** — Central isolated hub displaying distinct capabilities for Admins and standard user privileges.

## 🛠️ Tech Stack

| Category   | Tool                        |
|------------|-----------------------------|
| Framework  | React 19 + Vite 6           |
| Language   | TypeScript ~5.8             |
| Routing    | React Router DOM            |
| Styling    | Tailwind CSS v4 (CSS-first) |
| Animations | Motion (Framer Motion)      |
| Icons      | Lucide React                |
| Video      | hls.js (native `<video>`)   |

## 🎨 Design System & Rules

- **Palette**: Strictly **Black & White / Monochromatic** (`slate-900`, `slate-600`, `white`, `slate-50`). No vibrant colors are permitted.
- **Floating Glassmorphism Header**: *Every single dashboard view* universally utilizes a dynamic floating `backdrop-blur-xl` capsule nav bounded by `bg-white/70` and `ring-1 ring-slate-900/5` rules. Rigid headers do not exist here.
- **Typography**: `Playfair Display` (serif) orchestrates major headlines, accompanied by `Inter` (sans) for crisp UI precision.
- **Sidebars**: Spring-animated glass slide-over menus (mobile) and structural anchor elements (desktop).

## 🚀 Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the dev server:
   ```bash
   npm run dev
   ```
3. Open [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
NovaFrontend/
├── src/
│   ├── components/      # Shared components (Navbars, Footers, Modals)
│   ├── pages/           # Dedicated route views (Calendar, Teams, Dashboard)
│   ├── App.tsx          # Application router configuration
│   └── index.css        # Core Tailwind @theme injections
├── .agents/skills/      # AI Contextual Development Directives
├── vite.config.ts       # Build configuration
└── package.json
```

---

*Built with ❤️ in Ghana*
