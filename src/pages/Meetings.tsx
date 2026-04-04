import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  LayoutDashboard,
  CheckSquare,
  FolderKanban,
  Calendar,
  Layers,
  Video,
  Menu,
  ChevronLeft,
  Search,
  RefreshCw,
  Plus,
  LogIn,
  Globe,
  Radio,
  Lock,
  CalendarDays
} from 'lucide-react';
import { Link } from 'react-router-dom';

// ─── Types ────────────────────────────────────────────────────────────────────

type FilterType = 'All' | 'Live' | 'Public' | 'Private';

// ─── Sidebar ──────────────────────────────────────────────────────────────────

interface NavItemProps { key?: React.Key; name: string; icon: React.ElementType; active?: boolean; to: string; badge?: string; count?: number; }
const NavItem = ({ item }: { item: NavItemProps }) => (
  <Link
    to={item.to}
    className={`flex items-center justify-between px-3 py-2.5 rounded-2xl transition-all group ${
      item.active
        ? 'bg-slate-50 text-slate-900'
        : 'text-slate-500 hover:bg-slate-50/50 hover:text-slate-900'
    }`}
  >
    <div className="flex items-center gap-3">
      <item.icon
        className={`w-4 h-4 shrink-0 ${item.active ? 'text-slate-900' : 'text-slate-400 group-hover:text-slate-900'}`}
        strokeWidth={1.5}
      />
      <span className="text-sm font-bold truncate">{item.name}</span>
    </div>
    {item.badge && <span className="bg-slate-950 text-white text-[9px] font-bold px-2 py-0.5 rounded-full">{item.badge}</span>}
  </Link>
);

const LeftSidebar = ({ isOpen, toggle }: { isOpen: boolean; toggle: () => void }) => {
  const main: NavItemProps[] = [
    { name: 'Dashboard', icon: LayoutDashboard, to: '/dashboard' },
    { name: 'Tasks', icon: CheckSquare, to: '/tasks' },
    { name: 'Projects', icon: FolderKanban, to: '/projects' },
    { name: 'Workspace', icon: Layers, to: '/workspace' },
    { name: 'Calendar', icon: Calendar, to: '/calendar' },
  ];

  const collaboration: NavItemProps[] = [
    { name: 'Conferencing', icon: Video, active: true, to: '/meetings', badge: 'NEW' },
  ];

  return (
    <>
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.aside
            initial={{ x: -288 }}
            animate={{ x: 0 }}
            exit={{ x: -288 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-slate-100 flex flex-col p-5 z-[200] shadow-2xl lg:shadow-none overflow-y-auto"
          >
            {/* Logo */}
            <div className="flex items-center justify-between mb-8 px-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-slate-950 flex items-center justify-center shrink-0">
                  <Video className="w-4 h-4 text-white" strokeWidth={1.5} />
                </div>
                <div>
                  <h2 className="font-serif text-base font-bold text-slate-950 leading-tight">NovaMeet</h2>
                  <p className="text-[9px] font-bold text-slate-400 tracking-wider uppercase">Free Plan</p>
                </div>
              </div>
              <button
                onClick={toggle}
                className="w-7 h-7 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 hover:text-slate-950 transition-colors"
              >
                {isOpen ? <ChevronLeft className="w-3.5 h-3.5" /> : <Menu className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Navigation */}
            <div className="flex-1 min-h-0 overflow-y-auto space-y-6 custom-scrollbar">
              <div>
                <p className="text-[9px] font-bold text-slate-400 tracking-widest uppercase px-3 mb-3">Collaboration</p>
                <nav className="space-y-1">
                  {collaboration.map((item, i) => <React.Fragment key={i}><NavItem item={item} /></React.Fragment>)}
                </nav>
              </div>

              <div>
                <p className="text-[9px] font-bold text-slate-400 tracking-widest uppercase px-3 mb-3">Main</p>
                <nav className="space-y-1">
                  {main.map((item, i) => <React.Fragment key={i}><NavItem item={item} /></React.Fragment>)}
                </nav>
              </div>
            </div>

            {/* Bottom Stats Widget */}
            <div className="border border-slate-100 rounded-2xl p-4 mt-6 bg-slate-50/50 shadow-sm shrink-0">
               <div className="flex items-center justify-between">
                 <div className="text-center flex-1 border-r border-slate-200">
                    <p className="font-serif font-bold text-lg text-slate-900">0</p>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Total</p>
                 </div>
                 <div className="text-center flex-1 border-r border-slate-200">
                    <p className="font-serif font-bold text-lg text-red-500">0</p>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Live</p>
                 </div>
                 <div className="text-center flex-1">
                    <p className="font-serif font-bold text-lg text-slate-900">0</p>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Private</p>
                 </div>
               </div>
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
};

// ─── Header ───────────────────────────────────────────────────────────────────

const AppHeader = ({
  isSidebarOpen,
  toggleSidebar,
}: {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}) => (
  <header
    className={`fixed top-4 md:top-6 transition-all duration-500 z-[100] px-3 md:px-6 flex justify-center ${
      isSidebarOpen ? 'left-0 lg:left-64 right-0' : 'left-0 right-0'
    }`}
  >
    <nav
      className={`w-full max-w-5xl mx-auto backdrop-blur-xl bg-white/70 border border-white/40 rounded-[2rem] px-4 md:px-8 py-2.5 md:py-3.5 flex flex-col md:flex-row md:items-center justify-between shadow-[0_8px_32px_rgba(0,0,0,0.06)] ring-1 ring-slate-900/5 transition-all duration-500 gap-4 md:gap-0`}
    >
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          className="w-9 h-9 rounded-xl bg-slate-900 flex items-center justify-center text-white hover:bg-black transition-all shadow-sm shrink-0"
        >
          <Menu className="w-4 h-4" />
        </button>
        <div className="flex items-center gap-2 text-sm font-bold text-slate-500">
          <Link to="/dashboard" className="hover:text-slate-900 transition-colors hidden sm:block">Dashboard</Link>
          <span className="text-slate-200 hidden sm:block">/</span>
          <span className="text-slate-900">My Meetings</span>
        </div>
      </div>

      <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
        <button className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 rounded-xl hover:border-slate-300 hover:bg-slate-50 transition-all text-xs font-bold text-slate-700 bg-white shadow-sm shrink-0">
          <LogIn className="w-4 h-4" />
          Join meeting
        </button>
        <button className="flex items-center gap-2 bg-slate-950 text-white px-5 py-2.5 rounded-xl font-bold text-xs hover:bg-black transition-all shadow-md shrink-0">
          <Plus className="w-4 h-4" />
          New meeting
        </button>
      </div>
    </nav>
  </header>
);

// ─── Main Page ────────────────────────────────────────────────────────────────

const MeetingsPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [filter, setFilter] = useState<FilterType>('All');

  const stats = [
    { label: 'Public Rooms', value: 0, icon: Globe, color: 'text-blue-500', bg: 'bg-blue-50' },
    { label: 'Live Now', value: 0, icon: Radio, color: 'text-red-500', bg: 'bg-red-50' },
    { label: 'Private', value: 0, icon: Lock, color: 'text-purple-500', bg: 'bg-purple-50' },
    { label: 'This Week', value: 0, icon: CalendarDays, color: 'text-amber-500', bg: 'bg-amber-50' },
  ];

  const filters: { name: FilterType, count: number }[] = [
    { name: 'All', count: 0 },
    { name: 'Live', count: 0 },
    { name: 'Public', count: 0 },
    { name: 'Private', count: 0 },
  ];

  return (
    <div className="min-h-screen bg-[#FDFDFD] font-sans">
      <LeftSidebar isOpen={isSidebarOpen} toggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      
      {/* We adjust header padding on mobile because it contains two rows of items now */}
      <AppHeader isSidebarOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

      <main className={`transition-all duration-500 pt-36 md:pt-32 pb-12 ${isSidebarOpen ? 'lg:pl-64' : 'pl-0'}`}>
        <div className="max-w-5xl mx-auto px-4 md:px-8">

          {/* Stat Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, i) => (
              <div key={i} className="bg-white border border-slate-100 rounded-[1.5rem] p-5 shadow-sm flex items-center justify-center md:justify-start gap-4 transition-all hover:shadow-md hover:border-slate-200">
                 <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${stat.bg}`}>
                   <stat.icon className={`w-5 h-5 ${stat.color}`} strokeWidth={1.5} />
                 </div>
                 <div className="min-w-0">
                   <p className="font-serif text-2xl font-bold text-slate-900 leading-none">{stat.value}</p>
                   <p className="text-[9px] font-bold text-slate-400 tracking-widest uppercase mt-1 truncate">{stat.label}</p>
                 </div>
              </div>
            ))}
          </div>

          {/* Filter & Search */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
            {/* Filter Pills */}
            <div className="flex items-center bg-slate-50 border border-slate-100 p-1 rounded-2xl w-full sm:w-auto overflow-x-auto">
              {filters.map(f => (
                <button
                  key={f.name}
                  onClick={() => setFilter(f.name)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                    filter === f.name 
                      ? 'bg-white text-slate-900 shadow-sm border border-slate-100' 
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  {f.name}
                  <span className={`w-5 h-5 flex items-center justify-center rounded-full text-[9px] ${
                    filter === f.name ? 'bg-slate-100 text-slate-900' : 'bg-slate-200/50 text-slate-500'
                  }`}>
                    {f.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" strokeWidth={2} />
                <input
                  type="text"
                  placeholder="Search rooms..."
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-2xl text-xs font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent bg-white transition-all shadow-sm"
                />
              </div>
              <button className="w-10 h-10 rounded-2xl border border-slate-200 bg-white flex items-center justify-center text-slate-400 hover:text-slate-900 transition-all shadow-sm shrink-0">
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Empty State */}
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 rounded-[2rem] bg-slate-50 border border-slate-100 flex items-center justify-center mb-6 shadow-sm">
                <Video className="w-8 h-8 text-slate-300" strokeWidth={1.5} />
            </div>
            <h3 className="font-serif text-2xl font-bold text-slate-900 mb-2">No meetings yet</h3>
            <p className="text-sm text-slate-400 font-medium mb-8 max-w-sm">
                Create your first meeting and share the code to invite others.
            </p>
            <button className="flex items-center gap-2 bg-slate-950 text-white px-8 py-3.5 rounded-2xl font-bold text-sm hover:bg-black transition-all shadow-xl shadow-slate-200">
                <Plus className="w-4 h-4" /> Create meeting
            </button>
          </div>

        </div>
      </main>
    </div>
  );
};

export default MeetingsPage;
