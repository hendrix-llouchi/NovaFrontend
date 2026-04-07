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
  Plus,
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
  const [roleFilter, setRoleFilter] = useState('All Teams');

  const nav: NavItemProps[] = [
    { name: 'Dashboard', icon: LayoutDashboard, to: '/dashboard' },
    { name: 'Tasks', icon: CheckSquare, to: '/tasks' },
    { name: 'Team Projects', icon: FolderKanban, to: '/projects' },
    { name: 'Teams', icon: Users, active: true, to: '/teams' },
    { name: 'Team WorkSpace', icon: Layers, to: '/team-workspace' },
    { name: 'Calendar', icon: Calendar, to: '/calendar' },
  ];

  const roles = [
    { name: 'All Teams', color: 'bg-blue-500' },
    { name: 'Admin', color: 'bg-orange-500' },
    { name: 'Member', color: 'bg-green-500' },
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
                  <Users className="w-4 h-4 text-white" strokeWidth={1.5} />
                </div>
                <div>
                  <h2 className="font-serif text-base font-bold text-slate-950 leading-tight">NovaSpace</h2>
                  <p className="text-[9px] font-bold text-slate-400 tracking-wider uppercase">Teams</p>
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

            {/* Team Stats */}
            <div className="bg-slate-950 text-white rounded-2xl p-5 mb-6 shadow-xl shadow-slate-200">
              <p className="text-[9px] font-bold tracking-widest uppercase mb-4 text-slate-400">Team Stats</p>
              <div className="flex items-center justify-between gap-3">
                <div className="flex-1 bg-white/10 rounded-xl p-3 text-center border border-white/5">
                  <p className="font-serif text-2xl font-bold mb-1">0</p>
                  <p className="text-[9px] font-bold text-slate-300 uppercase tracking-wider">Total Teams</p>
                </div>
                <div className="flex-1 bg-white/10 rounded-xl p-3 text-center border border-white/5">
                  <p className="font-serif text-2xl font-bold mb-1">0</p>
                  <p className="text-[9px] font-bold text-slate-300 uppercase tracking-wider">My Teams</p>
                </div>
              </div>
            </div>

            {/* Filter by Role */}
            <div className="flex-1 min-h-0 border border-slate-100 rounded-2xl p-4 flex flex-col bg-slate-50/50">
              <p className="text-[9px] font-bold text-slate-900 tracking-widest uppercase px-1 mb-3">Filter by Role</p>
              <div className="flex-1 space-y-1 custom-scrollbar">
                {roles.map((role) => {
                  const isActive = roleFilter === role.name;
                  return (
                    <button 
                      key={role.name} 
                      onClick={() => setRoleFilter(role.name)}
                      className={`flex items-center justify-between w-full px-3 py-2.5 rounded-xl transition-all ${
                        isActive ? 'bg-slate-100/80 shadow-sm' : 'hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${role.color}`} />
                        <span className={`text-xs font-bold ${isActive ? 'text-blue-500' : 'text-slate-600'}`}>{role.name}</span>
                      </div>
                      {isActive && <Check className="w-3.5 h-3.5 text-blue-500" />}
                    </button>
                  );
                })}
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
          <span className="text-slate-900">Teams</span>
        </div>
      </div>

      <div className="flex items-center">
        <button className="flex items-center gap-2 bg-slate-950 text-white px-5 py-2.5 rounded-xl font-bold text-xs hover:bg-black transition-all shadow-md">
          <Plus className="w-4 h-4" />
          Create Team
        </button>
      </div>
    </nav>
  </header>
);

// ─── Main Page ────────────────────────────────────────────────────────────────

const TeamsPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-[#FDFDFD] font-sans">
      <LeftSidebar isOpen={isSidebarOpen} toggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      <AppHeader isSidebarOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

      <main className={`transition-all duration-500 pt-28 md:pt-32 pb-12 ${isSidebarOpen ? 'lg:pl-64' : 'pl-0'}`}>
        <div className="max-w-4xl mx-auto px-4 md:px-8 flex flex-col">

          {/* Page header */}
          <div className="mb-6">
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 mb-2">Teams</h1>
            <p className="font-sans text-sm text-slate-500">Collaborate with your team members on projects and tasks</p>
          </div>

          {/* Search bar */}
          <div className="mb-8">
            <div className="relative max-w-sm">
               <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" strokeWidth={2} />
               <input
                 type="text"
                 placeholder="Search teams..."
                 className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-2xl text-sm font-bold text-slate-900 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent bg-white transition-all shadow-sm"
               />
            </div>
          </div>

          {/* Empty State */}
          <div className="border border-slate-100 border-dashed rounded-[2.5rem] bg-white flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-6 shadow-sm">
                <Users className="w-8 h-8 text-slate-300" strokeWidth={1.5} />
            </div>
            <h3 className="font-serif text-2xl font-bold text-slate-900 mb-2">No teams yet</h3>
            <p className="text-sm text-slate-400 font-medium mb-8 max-w-xs">
                Create your first team to start collaborating
            </p>
            <button className="flex items-center gap-2 bg-slate-950 text-white px-8 py-3.5 rounded-2xl font-bold text-sm hover:bg-black transition-all shadow-xl shadow-slate-200">
                <Plus className="w-4 h-4" /> Create Team
            </button>
          </div>

        </div>
      </main>
    </div>
  );
};

export default TeamsPage;
