import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Grid3X3,
  ChevronLeft,
  ChevronRight,
  Menu,
  Search,
  Star,
  Music,
  BarChart2,
  Code2,
  GraduationCap,
  Briefcase,
  ArrowRight,
  Brain,
  BookOpen,
  LayoutDashboard,
  MessageSquare,
  Dumbbell,
  Apple,
  Zap,
  Cloud,
  Globe,
  FileText,
  Clock,
  Mail,
  Calendar,
  CheckSquare,
  Terminal,
  Database,
  GitBranch,
  FlaskConical,
  BookMarked,
  PenTool,
  Users,
  DollarSign,
  TrendingUp,
  Headphones,
  Film,
  Sun,
  MapPin,
  Smartphone,
  Coffee,
} from 'lucide-react';
import { Link } from 'react-router-dom';

// ─── Types ─────────────────────────────────────────────────────────────────────

type CategoryId = 'featured' | 'lifestyle' | 'productivity' | 'programming' | 'education' | 'business';

interface App {
  id: string;
  name: string;
  description: string;
  category: CategoryId | CategoryId[];
  featured?: boolean;
  iconBg: string;
  iconColor: string;
  icon: React.ElementType;
  accentBg?: string; // for featured banner gradient
}

// ─── App Data ──────────────────────────────────────────────────────────────────

const ALL_APPS: App[] = [
  // ── Lifestyle ──────────────────────────────────────────────────────────
  {
    id: 'spotify',
    name: 'Spotify',
    description: 'Listen to music and podcasts. Discover new tracks and artists.',
    category: ['lifestyle', 'featured'],
    featured: true,
    iconBg: 'bg-[#1DB954]',
    iconColor: 'text-white',
    icon: Music,
    accentBg: 'from-[#1DB954] to-[#158a3e]',
  },
  {
    id: 'netflix',
    name: 'Netflix',
    description: 'Stream movies and TV shows. Find your next binge-worthy series.',
    category: 'lifestyle',
    iconBg: 'bg-[#E50914]',
    iconColor: 'text-white',
    icon: Film,
  },
  {
    id: 'workout',
    name: 'Workout Planner',
    description: 'Get AI-personalized fitness plans tailored to your goals.',
    category: 'lifestyle',
    iconBg: 'bg-[#E02424]',
    iconColor: 'text-white',
    icon: Dumbbell,
  },
  {
    id: 'nutrition',
    name: 'Nutrition Advisor',
    description: 'Get personalized meal plans and expert nutrition advice.',
    category: 'lifestyle',
    iconBg: 'bg-[#FB923C]',
    iconColor: 'text-white',
    icon: Apple,
  },
  {
    id: 'exercise',
    name: 'Exercise Guide',
    description: 'Learn proper form and techniques for any exercise.',
    category: 'lifestyle',
    iconBg: 'bg-[#F97316]',
    iconColor: 'text-white',
    icon: Zap,
  },
  {
    id: 'city-weather',
    name: 'City Weather',
    description: 'Get current weather by city. Plan your day smartly.',
    category: 'lifestyle',
    iconBg: 'bg-[#F59E0B]',
    iconColor: 'text-white',
    icon: Sun,
  },
  {
    id: 'country-weather',
    name: 'Country Weather',
    description: 'Get weather info for any country. Check forecasts.',
    category: 'lifestyle',
    iconBg: 'bg-[#3B82F6]',
    iconColor: 'text-white',
    icon: Cloud,
  },
  {
    id: 'song-rec',
    name: 'Song Recognition',
    description: 'Identify songs playing around you instantly.',
    category: 'lifestyle',
    iconBg: 'bg-[#1769FF]',
    iconColor: 'text-white',
    icon: Headphones,
  },

  // ── Productivity ────────────────────────────────────────────────────────
  {
    id: 'task-manager',
    name: 'Task Manager',
    description: 'Organize your tasks with AI-powered prioritization and scheduling.',
    category: ['productivity', 'featured'],
    featured: true,
    iconBg: 'bg-slate-900',
    iconColor: 'text-white',
    icon: CheckSquare,
    accentBg: 'from-slate-800 to-slate-950',
  },
  {
    id: 'focus-timer',
    name: 'Focus Timer',
    description: 'Pomodoro-based deep work sessions to maximize your productivity.',
    category: 'productivity',
    iconBg: 'bg-[#EF4444]',
    iconColor: 'text-white',
    icon: Clock,
  },
  {
    id: 'email-ai',
    name: 'Email Assistant',
    description: 'Draft, summarize, and reply to emails 10× faster with AI.',
    category: 'productivity',
    iconBg: 'bg-[#6366F1]',
    iconColor: 'text-white',
    icon: Mail,
  },
  {
    id: 'calendar-ai',
    name: 'Smart Calendar',
    description: 'Schedule meetings effortlessly with AI conflict resolution.',
    category: 'productivity',
    iconBg: 'bg-[#10B981]',
    iconColor: 'text-white',
    icon: Calendar,
  },
  {
    id: 'doc-creator',
    name: 'Document Creator',
    description: 'Generate professional documents, reports, and proposals.',
    category: 'productivity',
    iconBg: 'bg-[#3B82F6]',
    iconColor: 'text-white',
    icon: FileText,
  },
  {
    id: 'note-ai',
    name: 'AI Note Taker',
    description: 'Smart notes that auto-organize, tag, and connect your ideas.',
    category: 'productivity',
    iconBg: 'bg-[#FBBF24]',
    iconColor: 'text-white',
    icon: PenTool,
  },

  // ── Programming ─────────────────────────────────────────────────────────
  {
    id: 'code-assist',
    name: 'Code Assistant',
    description: 'AI pair programmer that writes, reviews, and debugs your code.',
    category: ['programming', 'featured'],
    featured: true,
    iconBg: 'bg-[#7C3AED]',
    iconColor: 'text-white',
    icon: Terminal,
    accentBg: 'from-[#7C3AED] to-[#4C1D95]',
  },
  {
    id: 'github',
    name: 'GitHub Helper',
    description: 'Manage repos, PRs, and issues without leaving your workspace.',
    category: 'programming',
    iconBg: 'bg-slate-900',
    iconColor: 'text-white',
    icon: GitBranch,
  },
  {
    id: 'api-tester',
    name: 'API Tester',
    description: 'Test REST and GraphQL APIs with AI-assisted request building.',
    category: 'programming',
    iconBg: 'bg-[#059669]',
    iconColor: 'text-white',
    icon: Globe,
  },
  {
    id: 'sql-query',
    name: 'SQL Query AI',
    description: 'Write complex SQL queries in plain English with AI translation.',
    category: 'programming',
    iconBg: 'bg-[#2563EB]',
    iconColor: 'text-white',
    icon: Database,
  },
  {
    id: 'regex',
    name: 'Regex Builder',
    description: 'Build and test regular expressions with AI explanations.',
    category: 'programming',
    iconBg: 'bg-[#DC2626]',
    iconColor: 'text-white',
    icon: Code2,
  },
  {
    id: 'docker',
    name: 'Docker Assistant',
    description: 'Write Dockerfiles, compose configs, and debug containers.',
    category: 'programming',
    iconBg: 'bg-[#0EA5E9]',
    iconColor: 'text-white',
    icon: Smartphone,
  },

  // ── Education ───────────────────────────────────────────────────────────
  {
    id: 'math-tutor',
    name: 'Math Tutor',
    description: 'Step-by-step math problem solving from algebra to calculus.',
    category: ['education', 'featured'],
    featured: true,
    iconBg: 'bg-[#10B981]',
    iconColor: 'text-white',
    icon: FlaskConical,
    accentBg: 'from-[#10B981] to-[#065F46]',
  },
  {
    id: 'language',
    name: 'Language Learner',
    description: 'Learn any language with AI conversations and grammar coaching.',
    category: 'education',
    iconBg: 'bg-[#3B82F6]',
    iconColor: 'text-white',
    icon: Globe,
  },
  {
    id: 'quiz',
    name: 'Quiz Generator',
    description: 'Auto-generate quizzes on any topic to test your knowledge.',
    category: 'education',
    iconBg: 'bg-[#F59E0B]',
    iconColor: 'text-white',
    icon: Brain,
  },
  {
    id: 'study',
    name: 'Study Planner',
    description: 'Build optimal study schedules with spaced repetition AI.',
    category: 'education',
    iconBg: 'bg-[#8B5CF6]',
    iconColor: 'text-white',
    icon: BookMarked,
  },
  {
    id: 'essay',
    name: 'Essay Helper',
    description: 'Outline, draft, and refine academic essays with AI guidance.',
    category: 'education',
    iconBg: 'bg-[#EC4899]',
    iconColor: 'text-white',
    icon: PenTool,
  },
  {
    id: 'flashcards',
    name: 'Flashcard Maker',
    description: 'Turn any notes or text into smart, AI-powered flashcards.',
    category: 'education',
    iconBg: 'bg-[#14B8A6]',
    iconColor: 'text-white',
    icon: Coffee,
  },

  // ── Business ────────────────────────────────────────────────────────────
  {
    id: 'crm',
    name: 'CRM Assistant',
    description: 'Manage leads, contacts, and deals with AI-powered insights.',
    category: ['business', 'featured'],
    featured: true,
    iconBg: 'bg-[#2563EB]',
    iconColor: 'text-white',
    icon: Users,
    accentBg: 'from-[#2563EB] to-[#1E3A8A]',
  },
  {
    id: 'invoice',
    name: 'Invoice Generator',
    description: 'Create professional invoices and track payments effortlessly.',
    category: 'business',
    iconBg: 'bg-[#10B981]',
    iconColor: 'text-white',
    icon: DollarSign,
  },
  {
    id: 'analytics',
    name: 'Analytics Dashboard',
    description: 'Transform raw data into actionable business intelligence.',
    category: 'business',
    iconBg: 'bg-[#F59E0B]',
    iconColor: 'text-white',
    icon: TrendingUp,
  },
  {
    id: 'meeting-planner',
    name: 'Meeting Planner',
    description: 'Schedule and summarize meetings with AI-generated minutes.',
    category: 'business',
    iconBg: 'bg-[#8B5CF6]',
    iconColor: 'text-white',
    icon: Calendar,
  },
  {
    id: 'financial',
    name: 'Financial Tracker',
    description: 'Monitor budgets, expenses, and forecasts for your business.',
    category: 'business',
    iconBg: 'bg-[#EC4899]',
    iconColor: 'text-white',
    icon: BarChart2,
  },
  {
    id: 'web-search',
    name: 'Web Search',
    description: 'Find information on the web. Get instant AI-powered answers.',
    category: ['featured', 'business', 'lifestyle'],
    iconBg: 'bg-white border border-slate-200',
    iconColor: 'text-slate-700',
    icon: Globe,
  },
];

// ─── Category Config ───────────────────────────────────────────────────────────

const CATEGORIES: { id: CategoryId; label: string; icon: React.ElementType; color: string }[] = [
  { id: 'featured',    label: 'Featured',    icon: Star,          color: 'text-amber-400' },
  { id: 'lifestyle',   label: 'Lifestyle',   icon: Music,         color: 'text-pink-400'  },
  { id: 'productivity',label: 'Productivity',icon: BarChart2,     color: 'text-emerald-400'},
  { id: 'programming', label: 'Programming', icon: Code2,         color: 'text-blue-400'  },
  { id: 'education',   label: 'Education',   icon: GraduationCap, color: 'text-violet-400' },
  { id: 'business',    label: 'Business',    icon: Briefcase,     color: 'text-slate-600'  },
];

function getAppsForCategory(catId: CategoryId): App[] {
  return ALL_APPS.filter(app =>
    Array.isArray(app.category) ? app.category.includes(catId) : app.category === catId
  );
}

function getFeaturedAppForCategory(catId: CategoryId): App | null {
  const apps = getAppsForCategory(catId);
  return apps.find(a => a.featured) ?? apps[0] ?? null;
}

// ─── Featured Banner ────────────────────────────────────────────────────────────

const FeaturedBanner = ({ app }: { app: App }) => {
  const Icon = app.icon;
  const gradient = app.accentBg ?? 'from-slate-800 to-slate-950';

  return (
    <motion.div
      key={app.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative w-full rounded-[2rem] bg-gradient-to-r ${gradient} overflow-hidden p-8 md:p-10 flex items-center gap-8 shadow-xl mb-8`}
    >
      {/* Decorative circles */}
      <div className="absolute right-0 top-0 w-64 h-64 rounded-full bg-white/10 -translate-y-1/3 translate-x-1/4 pointer-events-none" />
      <div className="absolute right-16 bottom-0 w-44 h-44 rounded-full bg-white/10 translate-y-1/3 pointer-events-none" />

      {/* Icon */}
      <div className="relative shrink-0">
        <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center shadow-xl">
          <Icon className="w-8 h-8 text-slate-900" strokeWidth={1.5} />
        </div>
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0 relative">
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-white mb-2">{app.name}</h2>
        <p className="text-sm text-white/75 font-medium max-w-sm leading-relaxed">{app.description}</p>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="mt-6 inline-flex items-center gap-2 px-6 py-2.5 bg-white text-slate-900 rounded-2xl font-bold text-sm shadow-lg hover:bg-slate-50 transition-all"
        >
          Open {app.name} <ArrowRight className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.div>
  );
};

// ─── App Card ──────────────────────────────────────────────────────────────────

const AppCard = ({ app }: { app: App }) => {
  const Icon = app.icon;
  return (
    <motion.button
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      className="w-full flex items-center gap-4 p-5 bg-white border border-slate-100 rounded-[1.75rem] hover:border-slate-300 hover:shadow-md transition-all group text-left"
    >
      <div className={`w-12 h-12 rounded-2xl ${app.iconBg} flex items-center justify-center shrink-0 shadow-sm`}>
        <Icon className={`w-6 h-6 ${app.iconColor}`} strokeWidth={1.5} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-bold text-sm text-slate-900 truncate">{app.name}</p>
        <p className="text-xs text-slate-500 font-medium mt-0.5 line-clamp-2 leading-relaxed">{app.description}</p>
      </div>
      <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 shrink-0 transition-colors" />
    </motion.button>
  );
};

// ─── Sidebar ───────────────────────────────────────────────────────────────────

const Sidebar = ({
  isOpen,
  toggle,
  activeCategory,
  setActiveCategory,
  searchQuery,
  setSearchQuery,
}: {
  isOpen: boolean;
  toggle: () => void;
  activeCategory: CategoryId;
  setActiveCategory: (c: CategoryId) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}) => (
  <>
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.aside
          initial={{ x: -280 }}
          animate={{ x: 0 }}
          exit={{ x: -280 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-slate-100 flex flex-col z-[200] shadow-2xl lg:shadow-none"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 pb-3">
            <div className="flex items-center gap-2.5 px-1">
              <div className="w-8 h-8 rounded-xl bg-slate-950 flex items-center justify-center shrink-0">
                <Grid3X3 className="w-4 h-4 text-white" strokeWidth={1.5} />
              </div>
              <h2 className="font-serif text-base font-bold text-slate-950">Nova Apps</h2>
            </div>
            <button
              onClick={toggle}
              className="w-7 h-7 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Search */}
          <div className="px-4 pb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" strokeWidth={2} />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search apps..."
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 text-xs font-bold text-slate-900 placeholder:text-slate-400 border border-transparent focus:bg-white focus:border-slate-200 focus:outline-none transition-all"
              />
            </div>
          </div>

          {/* Categories */}
          <div className="flex-1 overflow-y-auto px-4">
            <p className="text-[9px] font-bold text-slate-400 tracking-widest uppercase mb-3">Categories</p>
            <nav className="space-y-1">
              {CATEGORIES.map(cat => {
                const CatIcon = cat.icon;
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl text-left transition-all ${
                      isActive
                        ? 'bg-slate-50 text-slate-900'
                        : 'text-slate-500 hover:bg-slate-50/60 hover:text-slate-900'
                    }`}
                  >
                    <CatIcon
                      className={`w-4 h-4 shrink-0 ${isActive ? cat.color : 'text-slate-300'}`}
                      strokeWidth={1.5}
                    />
                    <span className="text-sm font-bold">{cat.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Footer */}
          <div className="px-4 pb-4 border-t border-slate-100 pt-4 space-y-1">
            <Link
              to="/ai-assistant"
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-2xl text-sm font-bold text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-all"
            >
              <div className="flex items-center gap-3">
                <Brain className="w-4 h-4 text-slate-400" strokeWidth={1.5} />
                AI Assistant
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
            </Link>
            <Link
              to="/notebooks"
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-2xl text-sm font-bold text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-all"
            >
              <div className="flex items-center gap-3">
                <BookOpen className="w-4 h-4 text-slate-400" strokeWidth={1.5} />
                Notebooks
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
            </Link>
            <Link
              to="/dashboard"
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-2xl text-sm font-bold text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-all"
            >
              <div className="flex items-center gap-3">
                <LayoutDashboard className="w-4 h-4 text-slate-400" strokeWidth={1.5} />
                Dashboard
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
            </Link>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>

    {/* Mobile backdrop */}
    {isOpen && (
      <div
        onClick={toggle}
        className="lg:hidden fixed inset-0 bg-slate-950/20 backdrop-blur-sm z-[150]"
      />
    )}
  </>
);

// ─── Header ────────────────────────────────────────────────────────────────────

const AppHeader = ({
  isSidebarOpen,
  toggleSidebar,
  activeCategory,
}: {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  activeCategory: CategoryId;
}) => {
  const cat = CATEGORIES.find(c => c.id === activeCategory);
  return (
    <header
      className={`fixed top-4 md:top-6 transition-all duration-500 z-[100] px-3 md:px-4 flex justify-center ${
        isSidebarOpen ? 'left-0 lg:left-64 right-0' : 'left-0 right-0'
      }`}
    >
      <nav
        className={`w-full ${
          isSidebarOpen ? 'max-w-4xl' : 'max-w-5xl'
        } backdrop-blur-xl bg-white/70 border border-white/40 rounded-[2rem] px-4 md:px-6 py-2.5 md:py-3 flex items-center gap-4 shadow-[0_8px_32px_rgba(0,0,0,0.06)] ring-1 ring-slate-900/5 transition-all duration-500`}
      >
        <button
          onClick={toggleSidebar}
          className="w-9 h-9 rounded-xl bg-slate-900 flex items-center justify-center text-white hover:bg-black transition-all shadow-sm shrink-0"
        >
          <Menu className="w-4 h-4" />
        </button>
        <div className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-500 min-w-0">
          <Link to="/dashboard" className="hover:text-slate-900 transition-colors shrink-0">Dashboard</Link>
          <span className="text-slate-200">/</span>
          <span className="text-slate-900 shrink-0">Apps</span>
          {cat && (
            <>
              <span className="text-slate-200">/</span>
              <span className="text-slate-500">{cat.label}</span>
            </>
          )}
        </div>
        <div className="ml-auto hidden sm:flex items-center">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Chat with your favorite apps in Nova-Space
          </span>
        </div>
      </nav>
    </header>
  );
};

// ─── Main Page ─────────────────────────────────────────────────────────────────

const NovaApps = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeCategory, setActiveCategory] = useState<CategoryId>('featured');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter apps for current view
  const visibleApps = searchQuery
    ? ALL_APPS.filter(a =>
        a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : getAppsForCategory(activeCategory);

  const featuredApp = !searchQuery ? getFeaturedAppForCategory(activeCategory) : null;
  // Grid apps: skip the featured one to avoid duplication when not searching
  const gridApps = searchQuery
    ? visibleApps
    : visibleApps.filter(a => a.id !== featuredApp?.id);

  const activeCatLabel = CATEGORIES.find(c => c.id === activeCategory)?.label ?? 'Apps';

  return (
    <div className="min-h-screen bg-[#FDFDFD] font-sans flex">
      <Sidebar
        isOpen={isSidebarOpen}
        toggle={() => setIsSidebarOpen(!isSidebarOpen)}
        activeCategory={activeCategory}
        setActiveCategory={cat => { setActiveCategory(cat); setSearchQuery(''); }}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <div
        className={`flex-1 flex flex-col transition-all duration-500 ${
          isSidebarOpen ? 'lg:ml-64' : 'ml-0'
        }`}
      >
        <AppHeader
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          activeCategory={activeCategory}
        />

        <main className="flex-1 pt-24 md:pt-28 pb-16 px-4 md:px-8 max-w-5xl mx-auto w-full">
          {/* Section title */}
          <div className="mb-6">
            <h1 className="font-serif text-2xl md:text-3xl font-bold text-slate-900">
              {searchQuery ? `Results for "${searchQuery}"` : activeCatLabel}
            </h1>
            {!searchQuery && (
              <p className="text-xs text-slate-400 font-medium mt-1">
                {visibleApps.length} app{visibleApps.length !== 1 ? 's' : ''} available
              </p>
            )}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory + searchQuery}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              {/* Featured banner */}
              {featuredApp && <FeaturedBanner app={featuredApp} />}

              {/* Grid */}
              {gridApps.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {gridApps.map((app, i) => (
                    <motion.div
                      key={app.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.04 }}
                    >
                      <AppCard app={app} />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-24 text-center border border-slate-100 rounded-[2rem] bg-white">
                  <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-5">
                    <Grid3X3 className="w-6 h-6 text-slate-200" strokeWidth={1.5} />
                  </div>
                  <p className="font-serif text-lg font-bold text-slate-900 mb-2">No apps found</p>
                  <p className="text-xs text-slate-400 font-medium">Try a different search term</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default NovaApps;
