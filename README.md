<div align="center">
<img width="1200" height="475" alt="NovaSpace Banner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# NovaSpace — AI-Powered Collaboration Workspace

**NovaSpace** is a premium, AI-driven collaboration workspace. Originally designed as a landing page, it has evolved into a full-scale multi-page React Application complete with user authentication flows, dynamic dashboard modules, team management hubs, integrated conferencing, an AI chat assistant, AI document notebooks, and a multi-category app marketplace.

The application strictly adheres to a **Monochromatic Black & White** editorial aesthetic using custom glassmorphism components and fluid Framer Motion animations, built with React 19 and Tailwind CSS v4.

---

## ✨ Implemented Modules

NovaSpace utilises **React Router DOM** to manage fully-responsive modular sections:

### 🌐 Public Views
| Route | Description |
|---|---|
| `/` | Marketing landing page — hero, feature sections, logo ticker, CTA, security compliance, footer |
| `/about` | About page with team story and feature overview |
| `/login` | Split-screen editorial login with social auth |
| `/signup` | Split-screen registration with MFA toggle |

### 🖥️ Dashboard Ecosystem
| Route | Description |
|---|---|
| `/dashboard` | Aggregated stats, activity feed, deadlines panel, sidebar navigation |
| `/tasks` | Kanban-ready task management with filters and creation flow |
| `/projects` | Project cards with status, progress bars, due dates, and create/delete modals |
| `/workspace` | Personal and shared isolated environments |
| `/calendar` | Scheduling grid with day / week / month navigation and embedded clock |
| `/meetings` | Video conferencing hub — public, live, and private room states |
| `/teams` | Searchable member directory with role filtering |
| `/team-workspace` | Admin and user privilege hub for team isolated workspaces |

### 🤖 AI Ecosystem (New)
| Route | Description |
|---|---|
| `/ai-assistant` | Full AI chat interface — multi-chat history, model selector (LLM / Cerebras / Search), quick action prompts, typing indicator, star/bookmark |
| `/notebooks` | AI Document Processing — drag-and-drop file upload, document list sidebar, AI summary tab, AI chat-with-document tab |
| `/apps` | Nova Apps marketplace — 6 category sidebar (Featured, Lifestyle, Productivity, Programming, Education, Business), featured banner per category, 3-col app grid, cross-category live search |

---

## 🛠️ Tech Stack

| Category   | Tool                          |
|------------|-------------------------------|
| Framework  | React 19 + Vite 6             |
| Language   | TypeScript ~5.8               |
| Routing    | React Router DOM              |
| Styling    | Tailwind CSS v4 (CSS-first)   |
| Animations | Motion (Framer Motion v12)    |
| Icons      | Lucide React                  |
| Video      | hls.js (native `<video>`)     |
| AI         | `@google/genai` (Gemini API)  |

---

## 🎨 Design System

- **Palette**: Strictly **Black & White / Monochromatic** (`slate-950`, `slate-900`, `slate-600`, `white`, `slate-50`). No vibrant accent colours permitted — app icon colours inside the Apps marketplace are the only exception.
- **Floating Glassmorphism Header**: Every single view universally uses a dynamically floating `backdrop-blur-xl` capsule nav with `bg-white/70`, `rounded-[2rem]`, and `ring-1 ring-slate-900/5`. Rigid headers are never used.
- **Typography**: `Playfair Display` (serif) for all headlines and brand wordmarks. `Inter` (sans) for UI labels, body, and buttons.
- **Sidebars**: Spring-animated slide-in panels (`type: spring, damping: 25`) acting as overlays on mobile and layout anchors on desktop (`lg:ml-64`).
- **Routing rule**: All internal navigation uses `<Link to="...">` from React Router DOM. Native `<a href>` is reserved for true external links only.

---

## 🚀 Run Locally

**Prerequisites:** Node.js 18+

```bash
# Install dependencies
npm install

# Start the dev server (http://localhost:3000)
npm run dev

# Type-check
npm run lint
```

---

## 📁 Project Structure

```
NovaFrontend/
├── src/
│   ├── App.tsx               # Application router — all 17 routes
│   ├── index.css             # Tailwind v4 @theme tokens (Inter, Playfair Display)
│   ├── main.tsx              # React root mount
│   ├── components/
│   │   └── layout/
│   │       └── Navbar.tsx    # Glassmorphic floating capsule navbar (public pages)
│   └── pages/
│       ├── Home.tsx          # Landing page
│       ├── About.tsx         # About page
│       ├── Login.tsx         # Auth — Login
│       ├── Signup.tsx        # Auth — Signup
│       ├── Dashboard.tsx     # Main dashboard overview
│       ├── Tasks.tsx         # Task management
│       ├── Projects.tsx      # Project tracking
│       ├── Workspace.tsx     # Personal workspace
│       ├── Calendar.tsx      # Calendar & scheduling
│       ├── Meetings.tsx      # Video conferencing hub
│       ├── Teams.tsx         # Team member directory
│       ├── TeamWorkspace.tsx # Team workspace hub
│       ├── WebSearch.tsx     # AI web search
│       ├── AIAssistant.tsx   # AI chat assistant ← NEW
│       ├── Notebooks.tsx     # AI document processing ← NEW
│       └── Apps.tsx          # Nova Apps marketplace ← NEW
├── .agents/
│   └── skills/
│       └── novaspace_frontend/
│           └── SKILL.md      # AI development directives & design system
├── vite.config.ts
└── package.json
```

---

*Built with ❤️ in Ghana*
