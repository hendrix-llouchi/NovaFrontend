import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  LayoutDashboard,
  CheckSquare,
  FolderKanban,
  Calendar,
  Layers,
  Users,
  Menu,
  ChevronLeft,
  Search,
  User,
  Check
} from 'lucide-react';
import { Link } from 'react-router-dom';

// ─── Sidebar ──────────────────────────────────────────────────────────────────

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
  const nav: NavItemProps[] = [
    { name: 'Dashboard', icon: LayoutDashboard, to: '/dashboard' },
    { name: 'Tasks', icon: CheckSquare, to: '/tasks' },
    { name: 'Team Projects', icon: FolderKanban, to: '#' },
    { name: 'Teams', icon: Users, to: '/teams' },
    { name: 'Team WorkSpace', icon: Layers, active: true, to: '/team-workspace' },
    { name: 'Calendar', icon: Calendar, to: '/calendar' },
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
                  <Layers className="w-4 h-4 text-white" strokeWidth={1.5} />
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

            {/* Navigation */}
            <div className="mb-6">
              <p className="text-[9px] font-bold text-slate-400 tracking-widest uppercase px-3 mb-3">Navigation</p>
              <nav className="space-y-1">
                {nav.map((item, i) => <React.Fragment key={i}><NavItem item={item} /></React.Fragment>)}
              </nav>
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
      className={`w-full max-w-[calc(100%-48px)] md:max-w-6xl backdrop-blur-xl bg-white/70 border border-white/40 rounded-[2rem] px-5 md:px-8 py-2.5 md:py-3.5 flex items-center justify-between shadow-[0_8px_32px_rgba(0,0,0,0.06)] pointer-events-auto ring-1 ring-slate-900/5 min-h-[64px] md:min-h-[72px] transition-all duration-500`}
    >
      {/* Left Side: Toggle and Breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          className="w-9 h-9 rounded-xl bg-slate-900 flex items-center justify-center text-white hover:bg-black transition-all shadow-sm shrink-0"
        >
          <Menu className="w-4 h-4" />
        </button>
        <div className="flex items-center gap-2 text-sm font-bold text-slate-500">
          <Link to="/dashboard" className="hover:text-slate-900 transition-colors">Dashboard</Link>
          <span className="text-slate-200">/</span>
          <span className="text-slate-900">Team WorkSpace</span>
        </div>
      </div>

      {/* Right Side: Empty for now (matching requested structure) */}
      <div></div>
    </nav>
  </header>
);

// ─── Main Page ────────────────────────────────────────────────────────────────

const TeamWorkspacePage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-[#FDFDFD] font-sans flex flex-col">
      <LeftSidebar isOpen={isSidebarOpen} toggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      <AppHeader isSidebarOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

      {/* Main Content */}
      <main className={`flex-1 transition-all duration-500 flex flex-col items-center p-6 sm:p-12 w-full pt-32 sm:pt-40 pb-20 mt-10 ${isSidebarOpen ? 'lg:pl-64' : 'pl-0'}`}>
        <div className="max-w-4xl mx-auto w-full flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full flex flex-col items-center text-center space-y-6 mb-12"
          >
            {/* Top Badge */}
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-slate-600 text-[10px] font-bold uppercase tracking-widest">
              <Users className="w-3.5 h-3.5 text-slate-400" />
              0 teams found
            </div>

            <div>
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">Team WorkSpace Hub</h1>
              <p className="text-sm font-medium text-slate-500 max-w-md mx-auto leading-relaxed">
                Select a team to browse, contribute, or manage workspaces based on your role
              </p>
            </div>

            {/* Role definitions pill */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 px-5 sm:px-6 py-4 sm:py-3 rounded-3xl sm:rounded-full border border-slate-100 bg-white shadow-sm w-full max-w-sm sm:max-w-none mx-auto mt-4 text-xs">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 text-left sm:text-center">
                <span className="bg-slate-100 text-slate-700 w-fit px-2.5 py-0.5 rounded-md text-[9px] font-bold tracking-widest uppercase">Admin</span>
                <span className="text-slate-500 font-medium leading-tight">Create & manage workspaces, approve contributions</span>
              </div>
              <div className="hidden sm:block w-px h-6 bg-slate-100"></div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 text-left sm:text-center">
                <span className="bg-slate-800 text-white w-fit px-2.5 py-0.5 rounded-md text-[9px] font-bold tracking-widest uppercase">Member</span>
                <span className="text-slate-500 font-medium leading-tight">Browse workspaces & submit contributions</span>
              </div>
            </div>
          </motion.div>

          {/* Empty State */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="w-full border border-slate-100 border-dashed rounded-[3rem] bg-white flex flex-col items-center justify-center py-24 px-4 text-center"
          >
            <div className="w-20 h-20 rounded-3xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-6 shadow-sm">
                <User className="w-8 h-8 text-slate-300" strokeWidth={1.5} />
            </div>
            <h3 className="font-serif text-2xl font-bold text-slate-900 mb-3">No Teams Found</h3>
            <p className="text-sm text-slate-400 font-medium mb-10 max-w-sm leading-relaxed">
                You're not a member of any team yet. Ask someone to invite you or create a team.
            </p>
            <Link 
              to="/teams"
              className="flex items-center gap-2 bg-slate-950 text-white px-8 py-3.5 rounded-2xl font-bold text-sm hover:bg-black transition-all shadow-xl shadow-slate-200"
            >
                Go to Teams
            </Link>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default TeamWorkspacePage;
