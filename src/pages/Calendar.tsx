import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  LayoutDashboard,
  CheckSquare,
  FolderKanban,
  Calendar as CalendarIcon,
  Plus,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  DownloadCloud
} from 'lucide-react';
import { Link } from 'react-router-dom';

// ─── Types ────────────────────────────────────────────────────────────────────

type ViewMode = 'Month' | 'Week' | 'Day';

// ─── Left Sidebar ─────────────────────────────────────────────────────────────

interface NavItemProps { key?: React.Key; name: string; icon: React.ElementType; active?: boolean; to: string; }
const NavItem = ({ item }: { item: NavItemProps }) => (
  <Link
    to={item.to}
    className={`flex items-center gap-3 px-3 py-2.5 rounded-2xl transition-all group ${
      item.active
        ? 'bg-slate-50 text-slate-900'
        : 'text-slate-500 hover:bg-slate-50/50 hover:text-slate-900'
    }`}
  >
    <item.icon
      className={`w-4 h-4 shrink-0 ${item.active ? 'text-slate-900' : 'text-slate-400 group-hover:text-slate-900'}`}
      strokeWidth={1.5}
    />
    <span className="text-sm font-bold truncate">{item.name}</span>
  </Link>
);

const LeftSidebar = ({ isOpen, toggle }: { isOpen: boolean; toggle: () => void }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const main: NavItemProps[] = [
    { name: 'Dashboard', icon: LayoutDashboard, to: '/dashboard' },
    { name: 'Tasks', icon: CheckSquare, to: '/tasks' },
    { name: 'Projects', icon: FolderKanban, to: '/projects' },
    { name: 'Calendar', icon: CalendarIcon, active: true, to: '/calendar' },
  ];

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour12: true, hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  const formatDay = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  };

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
                  <CalendarIcon className="w-4 h-4 text-white" strokeWidth={1.5} />
                </div>
                <div>
                  <h2 className="font-serif text-base font-bold text-slate-950 leading-tight">NovaSpace</h2>
                  <p className="text-[9px] font-bold text-slate-400 tracking-wider uppercase">Calendar</p>
                </div>
              </div>
              <button
                onClick={toggle}
                className="w-7 h-7 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 hover:text-slate-950 transition-colors"
              >
                {isOpen ? <ChevronLeft className="w-3.5 h-3.5" /> : <Menu className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Main Navigation */}
            <div className="mb-6">
              <p className="text-[9px] font-bold text-slate-400 tracking-widest uppercase px-3 mb-3">Navigation</p>
              <nav className="space-y-1">
                {main.map((item, i) => <React.Fragment key={i}><NavItem item={item} /></React.Fragment>)}
              </nav>
            </div>

            {/* Time Widget */}
            <div className="bg-slate-950 text-white rounded-2xl p-6 text-center shadow-xl shadow-slate-200 mb-6">
              <p className="font-sans text-2xl font-bold tracking-tight mb-2">{formatTime(time)}</p>
              <p className="text-xs font-medium text-slate-300 mb-1">{formatDate(time)}</p>
              <p className="text-[10px] font-bold tracking-widest uppercase text-slate-400">{formatDay(time)}</p>
            </div>

            {/* Mini Calendar (Static Representation) */}
            <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex-1 min-h-0 hidden sm:block">
               <div className="flex items-center justify-between mb-4">
                 <button className="text-slate-400 hover:text-slate-900"><ChevronLeft className="w-4 h-4" /></button>
                 <span className="text-xs font-bold text-slate-900">Mar 2026</span>
                 <button className="text-slate-400 hover:text-slate-900"><ChevronRight className="w-4 h-4" /></button>
               </div>
               <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-slate-400 mb-2">
                  <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
               </div>
               <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-slate-700">
                  {/* Dummy tiny calendar grid */}
                  <span className="text-slate-300">1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span>
                  <span>8</span><span>9</span><span>10</span><span>11</span><span>12</span><span>13</span><span>14</span>
                  <span>15</span><span>16</span><span>17</span><span>18</span><span>19</span><span>20</span><span>21</span>
                  <span>22</span><span>23</span><span>24</span><span className="bg-slate-900 text-white rounded flex items-center justify-center aspect-square">25</span><span>26</span><span>27</span><span>28</span>
                  <span>29</span><span>30</span><span>31</span><span className="text-slate-300">1</span><span className="text-slate-300">2</span><span className="text-slate-300">3</span><span className="text-slate-300">4</span>
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
      className={`w-full max-w-5xl mx-auto backdrop-blur-xl bg-white/70 border border-white/40 rounded-[2rem] px-4 md:px-8 py-2.5 md:py-3.5 flex items-center justify-between shadow-[0_8px_32px_rgba(0,0,0,0.06)] ring-1 ring-slate-900/5 transition-all duration-500`}
    >
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          className="w-9 h-9 rounded-xl bg-slate-900 flex items-center justify-center text-white hover:bg-black transition-all shadow-sm shrink-0"
        >
          <Menu className="w-4 h-4" />
        </button>
        <div className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-500">
          <Link to="/dashboard" className="hover:text-slate-900 transition-colors">Dashboard</Link>
          <span className="text-slate-200">/</span>
          <span className="text-slate-900">Calendar</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Export & Create Event */}
        <button className="hidden sm:flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl hover:border-slate-300 hover:bg-white transition-all text-xs font-bold text-slate-700 bg-white/50">
          <DownloadCloud className="w-4 h-4 text-slate-400" />
          Export
        </button>
        <button className="flex items-center gap-2 bg-slate-950 text-white px-5 py-2.5 rounded-xl font-bold text-xs hover:bg-black transition-all shadow-md">
          <Plus className="w-4 h-4" />
          Create Event
        </button>
      </div>
    </nav>
  </header>
);

// ─── Main Page ────────────────────────────────────────────────────────────────

const CalendarPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [viewMode, setViewMode] = useState<ViewMode>('Month');

  // Hardcoded generic calendar days (March 2026 roughly based on screenshot)
  const calendarDays = Array.from({ length: 35 }, (_, i) => i + 1);

  return (
    <div className="min-h-screen bg-[#FDFDFD] font-sans">
      <LeftSidebar isOpen={isSidebarOpen} toggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      <AppHeader isSidebarOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

      <main className={`transition-all duration-500 pt-24 md:pt-32 pb-12 h-screen flex flex-col ${isSidebarOpen ? 'lg:pl-64' : 'pl-0'}`}>
        <div className="max-w-6xl mx-auto px-4 md:px-8 w-full flex-1 flex flex-col">

          {/* Page header */}
          <div className="mb-6 shrink-0">
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 mb-2">Calendar</h1>
            <p className="font-sans text-sm text-slate-500">Manage your schedule and events</p>
          </div>

          {/* Calendar Toolbar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 shrink-0">
            
            <div className="flex items-center gap-4">
              <button className="w-9 h-9 rounded-xl border border-slate-200 bg-white flex items-center justify-center text-slate-500 hover:text-slate-900 hover:border-slate-300 transition-all">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <h2 className="font-serif text-xl font-bold text-slate-900 min-w-[140px] text-center">March 2026</h2>
              <button className="w-9 h-9 rounded-xl border border-slate-200 bg-white flex items-center justify-center text-slate-500 hover:text-slate-900 hover:border-slate-300 transition-all">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center bg-slate-50 border border-slate-200 p-1 rounded-2xl">
               {(['Month', 'Week', 'Day'] as ViewMode[]).map(mode => (
                 <button
                    key={mode}
                    onClick={() => setViewMode(mode)}
                    className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                      viewMode === mode 
                        ? 'bg-white text-slate-900 shadow-sm border border-slate-100' 
                        : 'text-slate-500 hover:text-slate-900'
                    }`}
                 >
                   {mode}
                 </button>
               ))}
            </div>

            <button className="bg-slate-950 text-white px-6 py-2.5 rounded-xl font-bold text-xs hover:bg-black transition-all shadow-md">
              Today
            </button>
          </div>

          {/* Calendar Grid Container */}
          <div className="bg-white border border-slate-100 rounded-3xl flex-1 flex flex-col overflow-hidden shadow-sm">
            {/* Days Header */}
            <div className="grid grid-cols-7 border-b border-slate-100 bg-slate-50/50 shrink-0">
              {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((day) => (
                <div key={day} className="py-4 text-center text-[10px] font-bold text-slate-400 tracking-widest uppercase border-r border-slate-100 last:border-r-0">
                  {day}
                </div>
              ))}
            </div>

            {/* Grid Body */}
            <div className="flex-1 grid grid-cols-7 grid-rows-5 bg-slate-100 gap-px">
              {calendarDays.map((dayNum, i) => (
                 <div key={i} className="bg-white p-2 md:p-4 hover:bg-slate-50 transition-colors flex flex-col min-h-[100px]">
                    <span className="text-xs font-bold text-slate-700">{dayNum <= 31 ? dayNum : dayNum - 31}</span>
                    {/* Event placeholders could go here */}
                 </div>
              ))}
            </div>
          </div>

        </div>
      </main>

    </div>
  );
};

export default CalendarPage;
