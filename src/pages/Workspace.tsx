import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  LayoutDashboard,
  CheckSquare,
  FolderKanban,
  Calendar,
  Layers,
  Search,
  Plus,
  TerminalSquare,
  Menu,
  X,
  ArrowLeft,
  ChevronLeft,
  DownloadCloud,
  Clock,
  AlertCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

// ─── Types ────────────────────────────────────────────────────────────────────

type WorkspaceTab = 'All' | 'Recent' | 'Last Accessed';

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
  const main: NavItemProps[] = [
    { name: 'Dashboard', icon: LayoutDashboard, to: '/dashboard' },
    { name: 'Tasks', icon: CheckSquare, to: '/tasks' },
    { name: 'Projects', icon: FolderKanban, to: '/projects' },
    { name: 'Workspace', icon: Layers, active: true, to: '/workspace' },
    { name: 'Calendar', icon: Calendar, to: '/calendar' },
  ];

  const fileTypes = [
    { name: 'HTML', color: 'bg-orange-500' },
    { name: 'CSS', color: 'bg-blue-500' },
    { name: 'JavaScript', color: 'bg-yellow-400' },
    { name: 'TypeScript', color: 'bg-blue-600' },
    { name: 'Python', color: 'bg-green-500' },
    { name: 'Java', color: 'bg-red-500' },
    { name: 'C++', color: 'bg-blue-700' },
    { name: 'C#', color: 'bg-purple-600' },
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
                  <TerminalSquare className="w-4 h-4 text-white" strokeWidth={1.5} />
                </div>
                <div>
                  <h2 className="font-serif text-base font-bold text-slate-950 leading-tight">NovaSpace</h2>
                  <p className="text-[9px] font-bold text-slate-400 tracking-wider uppercase">Workspace</p>
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

            {/* Quick Stats Widget (B&W version of the purple box) */}
            <div className="bg-slate-950 text-white rounded-2xl p-5 mb-6 shadow-xl shadow-slate-200">
              <p className="text-[9px] font-bold tracking-widest uppercase mb-4 text-slate-400">Quick Stats</p>
              <div className="flex items-center justify-between">
                <div className="text-center flex-1 border-r border-slate-800">
                  <p className="font-serif text-2xl font-bold">0</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total</p>
                </div>
                <div className="text-center flex-1">
                  <p className="font-serif text-2xl font-bold">0</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Recent</p>
                </div>
              </div>
            </div>

            {/* Filter By Type */}
            <div className="flex-1 min-h-0 border border-slate-100 rounded-2xl p-4 flex flex-col bg-slate-50/50">
              <p className="text-[9px] font-bold text-slate-900 tracking-widest uppercase px-1 mb-3">Filter by Type</p>
              <div className="flex-1 overflow-y-auto pr-2 space-y-2 custom-scrollbar">
                {fileTypes.map((type, i) => (
                  <button key={i} className="flex items-center gap-3 w-full px-2 py-1.5 hover:bg-slate-100 rounded-lg transition-colors">
                    <div className={`w-1.5 h-1.5 rounded-full ${type.color}`} />
                    <span className="text-xs font-bold text-slate-600">{type.name}</span>
                  </button>
                ))}
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

// ─── Right Sidebar ────────────────────────────────────────────────────────────

const RightSidebar = () => {
  return (
    <aside className="hidden xl:flex fixed right-0 top-0 h-screen w-80 bg-white border-l border-slate-100 flex-col py-6 px-6 z-[90]">
      {/* Top spacing to align beneath header (if floating header is narrow) 
          Wait, the header is floating so we just start our content lower down 
          Actually, the screenshot shows the header area spanning across the top, but let's push right sidebar content down to match standard spacing */}
      <div className="pt-24 flex-1 flex flex-col">
          <div className="mb-8">
            <h3 className="font-serif text-lg font-bold text-slate-900 leading-tight">Recent Activity</h3>
            <p className="text-[10px] font-bold text-slate-400 tracking-wider uppercase mt-1">Your last opened files</p>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center text-center pb-20">
             <div className="w-12 h-12 rounded-full border border-slate-100 bg-slate-50 flex items-center justify-center mb-4">
               <AlertCircle className="w-5 h-5 text-slate-300" strokeWidth={1.5} />
             </div>
             <p className="text-xs font-bold text-slate-500">No recent activity</p>
          </div>
      </div>

      <div className="pt-6 border-t border-slate-100">
          <p className="text-[9px] font-bold text-slate-400 tracking-widest uppercase mb-3">Quick Actions</p>
          <div className="space-y-2">
            <button className="w-full flex items-center gap-2 p-3 border border-slate-200 rounded-xl hover:border-slate-300 hover:bg-slate-50 transition-all font-bold text-xs text-slate-700">
               <Plus className="w-4 h-4 text-slate-400" />
               New Workspace
            </button>
            <button className="w-full flex items-center gap-2 p-3 border border-slate-200 rounded-xl hover:border-slate-300 hover:bg-slate-50 transition-all font-bold text-xs text-slate-700">
               <DownloadCloud className="w-4 h-4 text-slate-400" />
               Download All (.zip)
            </button>
          </div>
      </div>
    </aside>
  );
}

// ─── Header ───────────────────────────────────────────────────────────────────

const AppHeader = ({
  isSidebarOpen,
  toggleSidebar,
}: {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}) => (
  // We keep the header full width to right, but constrained inside the available area
  <header
    className={`fixed top-4 md:top-6 transition-all duration-500 z-[100] px-3 md:px-6 flex justify-between items-center ${
      isSidebarOpen ? 'left-0 lg:left-64 right-0 xl:right-80' : 'left-0 right-0 xl:right-80'
    }`}
  >
    <nav
      className={`w-full max-w-4xl mx-auto backdrop-blur-xl bg-white/70 border border-white/40 rounded-[2rem] px-4 md:px-8 py-2.5 md:py-3.5 flex items-center justify-between shadow-[0_8px_32px_rgba(0,0,0,0.06)] ring-1 ring-slate-900/5 transition-all duration-500`}
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
          <span className="text-slate-900">Workspace</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Replacing the old "Download All" header button with this floating one */}
        <button className="hidden sm:flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl hover:border-slate-300 hover:bg-white transition-all text-xs font-bold text-slate-700 bg-white/50">
          <DownloadCloud className="w-4 h-4" />
          Download All
        </button>
      </div>
    </nav>
  </header>
);

// ─── Main Page ────────────────────────────────────────────────────────────────

const WorkspacePage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [tab, setTab] = useState<WorkspaceTab>('All');

  return (
    <div className="min-h-screen bg-[#FDFDFD] font-sans">
      <LeftSidebar isOpen={isSidebarOpen} toggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      <AppHeader isSidebarOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      
      {/* Right Sidebar */}
      <RightSidebar />

      <main className={`transition-all duration-500 pt-24 md:pt-32 pb-12 ${isSidebarOpen ? 'lg:pl-64' : 'pl-0'} xl:pr-80`}>
        <div className="max-w-4xl mx-auto px-4 md:px-8 space-y-6 md:space-y-8">

          {/* Page header */}
          <div>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 mb-2">WorkSpace</h1>
            <p className="font-sans text-sm text-slate-500">Create, edit and manage your code & document workspaces</p>
          </div>

          {/* Search and Tabs */}
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" strokeWidth={2} />
              <input
                type="text"
                placeholder="Search workspaces..."
                className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-2xl text-sm font-bold text-slate-900 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent bg-white transition-all"
              />
            </div>

            <div className="flex items-center bg-slate-50 border border-slate-200 p-1 rounded-2xl shrink-0">
               {(['All', 'Recent', 'Last Accessed'] as WorkspaceTab[]).map(t => (
                 <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      tab === t 
                        ? 'bg-white text-slate-900 shadow-sm border border-slate-100' 
                        : 'text-slate-500 hover:text-slate-900'
                    }`}
                 >
                   {t}
                 </button>
               ))}
            </div>
          </div>

          {/* Dashed new workspace button */}
          <button className="w-full border-2 border-dashed border-slate-200 rounded-2xl py-4 flex items-center justify-center gap-2 text-slate-400 hover:text-slate-900 hover:bg-slate-50 hover:border-slate-300 transition-all text-sm font-bold">
            <Plus className="w-4 h-4" />
            New Workspace
          </button>

          {/* Empty state container */}
          <div className="border border-slate-100 border-dashed rounded-[2.5rem] bg-white flex flex-col items-center justify-center py-24 text-center mt-6">
            <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-6 shadow-sm">
                <Layers className="w-8 h-8 text-slate-200" strokeWidth={1.5} />
            </div>
            <h3 className="font-serif text-xl font-bold text-slate-900 mb-2">No workspaces yet</h3>
            <p className="text-sm text-slate-400 font-medium mb-8">
                Create your first workspace to start coding
            </p>
            <button className="flex items-center gap-2 bg-slate-900 text-white px-8 py-3.5 rounded-2xl font-bold text-sm hover:bg-black transition-all shadow-xl shadow-slate-200">
                <Plus className="w-4 h-4" /> Create Workspace
            </button>
          </div>

        </div>
      </main>

    </div>
  );
};

export default WorkspacePage;
