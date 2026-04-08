import React from 'react';
import { motion } from 'motion/react';
import { 
  Brain, 
  ChevronDown, 
  Video, 
  Users, 
  Folder, 
  MessageCircle, 
  Menu, 
  X 
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isFeaturesOpen, setIsFeaturesOpen] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const featureLinks = [
    { title: "AI Assistant", desc: "Smart tutoring, chat & adaptive learning", icon: Brain, isNew: true, to: '/ai-assistant' },
    { title: "WorkSpace", desc: "Code & document workspace manager", icon: Folder, isNew: true, to: '/workspace' },
    { title: "Teams", desc: "Collaborate with team members", icon: Users, isNew: true, to: '/teams' },
    { title: "Conferencing", desc: "HD virtual classrooms & meetings", icon: Video, to: '/meetings' },
    { title: "Live Chat", desc: "Real-time messaging & Q&A sessions", icon: MessageCircle, to: '/chat' }
  ];

  return (
    <>
    <header className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-[100] w-full max-w-[calc(100%-48px)] md:max-w-6xl px-0 pointer-events-none">
      <nav className="backdrop-blur-xl bg-white/70 border border-white/40 rounded-3xl md:rounded-[2rem] px-5 md:px-10 py-2.5 md:py-4 flex items-center justify-between shadow-[0_8px_32px_rgba(0,0,0,0.06)] pointer-events-auto ring-1 ring-slate-900/5">
        {/* Logo & Brand */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center shrink-0">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <span className="hidden sm:inline font-serif text-lg md:text-2xl font-bold tracking-tight text-slate-900">NovaSpace</span>
        </Link>
        
        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-12">
          <Link to="/" className="text-sm font-bold text-slate-900 border-b-2 border-slate-900 pb-0.5">Home</Link>
          <div 
            className="relative"
            onMouseEnter={() => setIsFeaturesOpen(true)}
            onMouseLeave={() => setIsFeaturesOpen(false)}
          >
            <button className={`flex items-center gap-1 text-sm font-bold transition-all ${isFeaturesOpen ? 'text-slate-900' : 'text-slate-500 hover:text-slate-900'}`}>
              Features <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isFeaturesOpen ? 'rotate-180' : ''}`} />
            </button>

            <motion.div 
              initial={false}
              animate={isFeaturesOpen ? { opacity: 1, y: 0, scale: 1, display: 'block' } : { opacity: 0, y: 10, scale: 0.95, transitionEnd: { display: 'none' } }}
              className="absolute top-full -left-1/2 pt-5 z-50 min-w-[340px]"
            >
              <div className="backdrop-blur-2xl bg-white/95 border border-white/50 rounded-[2.5rem] shadow-2xl p-6 relative ring-1 ring-slate-900/5">
                <div className="space-y-1 relative">
                  {featureLinks.map((link, i) => (
                    <Link key={i} to={link.to} className="flex items-start gap-4 p-4 rounded-3xl hover:bg-slate-50 transition-all group/item">
                      <div className="w-11 h-11 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center group-hover/item:border-slate-900 group-hover/item:shadow-slate-50 transition-all shrink-0">
                        <link.icon className="w-5 h-5 text-slate-900" strokeWidth={1.5} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-0.5">
                          <span className="font-bold text-sm text-slate-900">{link.title}</span>
                          {link.isNew && <span className="text-[9px] font-bold text-white bg-slate-900 px-2.5 py-0.5 rounded-full">New</span>}
                        </div>
                        <p className="text-[11px] text-slate-500 leading-snug truncate group-hover/item:text-slate-900 transition-colors">{link.desc}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
          <Link to="/about" className="text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors">About</Link>
        </div>
        
        {/* Desktop & Mobile Actions */}
        <div className="flex items-center gap-2 md:gap-8">
          <Link to="/login" className="hidden sm:inline-block text-sm font-bold text-slate-900 hover:text-slate-500 transition-colors">Log in</Link>
          <Link to="/signup" className="bg-slate-900 text-white px-4 md:px-8 py-2 md:py-3 rounded-2xl font-bold text-[11px] md:text-sm shadow-xl shadow-slate-200 hover:bg-black transition-all hover:scale-105 active:scale-95 whitespace-nowrap">
            Sign up
          </Link>
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-900 hover:bg-slate-200 transition-colors shadow-sm"
          >
            {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </nav>
    </header>

      {/* Mobile Menu Overlay */}
      <motion.div
        initial={{ opacity: 0, y: -20, pointerEvents: 'none' }}
        animate={isMobileMenuOpen ? { opacity: 1, y: 0, pointerEvents: 'auto' } : { opacity: 0, y: -20, pointerEvents: 'none' }}
        className="fixed inset-0 z-[90] md:hidden px-4 pt-24"
      >
        <div className="backdrop-blur-3xl bg-white/95 border border-slate-100 rounded-[2.5rem] shadow-2xl p-6 overflow-hidden max-h-[80vh] overflow-y-auto">
          <div className="space-y-6">
            <div className="space-y-2">
              <p className="text-[10px] font-bold text-slate-400 tracking-widest uppercase mb-4">Main Menu</p>
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="block p-4 rounded-2xl bg-slate-50 font-bold text-slate-900">Home</Link>
              <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className="block p-4 rounded-2xl hover:bg-slate-50 font-bold text-slate-900 transition-colors">About</Link>
            </div>
            
            <div className="space-y-4">
              <p className="text-[10px] font-bold text-slate-400 tracking-widest uppercase mb-4">Features</p>
              <div className="grid grid-cols-1 gap-2">
                {featureLinks.map((link, i) => (
                  <Link key={i} to={link.to} onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-4 p-4 rounded-2xl border border-slate-50 hover:bg-slate-50 transition-all">
                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center shrink-0">
                      <link.icon className="w-5 h-5 text-slate-900" strokeWidth={1.5} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="font-bold text-sm text-slate-900">{link.title}</span>
                        {link.isNew && <span className="text-[9px] font-bold text-white bg-slate-900 px-2 py-0.5 rounded-full">New</span>}
                      </div>
                      <p className="text-[11px] text-slate-500">{link.desc}</p>
                    </div>
                   </Link>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 flex flex-col gap-3">
              <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="block py-4 text-center font-bold text-slate-900">Log in</Link>
              <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)} className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold shadow-xl shadow-slate-100 text-center">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Navbar;
