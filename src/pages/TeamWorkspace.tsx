import React from 'react';
import { motion } from 'motion/react';
import {
  Layers,
  ArrowLeft,
  User,
  Users
} from 'lucide-react';
import { Link } from 'react-router-dom';

const TeamWorkspacePage = () => {
  return (
    <div className="min-h-screen bg-[#FDFDFD] font-sans flex flex-col">
      {/* Floating Glassmorphism Navbar */}
      <header className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-[100] w-full max-w-[calc(100%-48px)] md:max-w-6xl pointer-events-none transition-all duration-500">
        <nav className="backdrop-blur-xl bg-white/70 border border-white/40 rounded-[2rem] px-5 md:px-8 py-2.5 md:py-3.5 flex items-center justify-between shadow-[0_8px_32px_rgba(0,0,0,0.06)] pointer-events-auto ring-1 ring-slate-900/5">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-950 flex items-center justify-center shrink-0 shadow-sm">
              <Layers className="w-4 h-4 text-white" strokeWidth={1.5} />
            </div>
            <div className="hidden sm:block">
              <h2 className="font-serif text-sm font-bold text-slate-950 leading-tight">NovaSpace</h2>
              <p className="text-[9px] font-bold text-slate-400 tracking-wider uppercase">Team WorkSpace</p>
            </div>
          </div>

          {/* Breadcrumb */}
          <div className="hidden lg:flex items-center gap-2 text-sm font-bold text-slate-500">
            <Link to="/dashboard" className="hover:text-slate-900 transition-colors">Dashboard</Link>
            <span className="text-slate-200">/</span>
            <span className="text-slate-900">Team WorkSpace</span>
          </div>

          {/* Action */}
          <Link 
            to="/dashboard"
            className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl bg-white/50 text-xs font-bold text-slate-700 hover:border-slate-300 hover:bg-white transition-all shadow-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-slate-400" />
            Back to Dashboard
          </Link>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12 max-w-4xl mx-auto w-full pt-32">
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
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 px-6 py-3 rounded-full border border-slate-100 bg-white shadow-sm w-full sm:w-auto mt-4 text-xs">
            <div className="flex items-center gap-3">
               <span className="bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-md text-[9px] font-bold tracking-widest uppercase">Admin</span>
               <span className="text-slate-500 font-medium whitespace-nowrap">Create & manage workspaces, approve contributions</span>
            </div>
            <div className="hidden sm:block w-px h-6 bg-slate-100"></div>
            <div className="flex items-center gap-3">
               <span className="bg-slate-800 text-white px-2.5 py-0.5 rounded-md text-[9px] font-bold tracking-widest uppercase">Member</span>
               <span className="text-slate-500 font-medium whitespace-nowrap">Browse workspaces & submit contributions</span>
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

      </main>
    </div>
  );
};

export default TeamWorkspacePage;
