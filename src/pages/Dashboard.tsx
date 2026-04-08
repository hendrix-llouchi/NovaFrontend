import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  CheckSquare, 
  FolderKanban, 
  Calendar, 
  Video, 
  Users, 
  MessageSquare, 
  Plus, 
  Search, 
  ChevronDown,
  Brain,
  Bell,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  Menu,
  ChevronLeft,
  X,
  Globe,
  Folder
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Sidebar = ({ isOpen, toggle }: { isOpen: boolean, toggle: () => void }) => {
  const menuItems = [
    { section: 'MAIN', items: [
      { name: 'Dashboard', icon: LayoutDashboard, active: true, to: '/dashboard' },
      { name: 'My Tasks', icon: CheckSquare, to: '/tasks' },
      { name: 'Projects', icon: FolderKanban, to: '/projects' },
      { name: 'Calendar', icon: Calendar, to: '/calendar' },
    ]},
    { section: 'COLLABORATION', items: [
      { name: 'Conferencing', icon: Video, badge: 'NEW', to: '/meetings' },
      { name: 'Teams', icon: Users, to: '/teams' },
      { name: 'Messages', icon: MessageSquare, count: 2 },
    ]}
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
            className="fixed left-0 top-0 h-screen w-72 bg-white border-r border-slate-100 flex flex-col p-6 z-[200] shadow-2xl lg:shadow-none"
          >
            <div className="flex items-center justify-between mb-10 px-2 text-slate-950">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-slate-950 flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" strokeWidth={1.5} />
                </div>
                <div>
                  <h2 className="font-serif text-lg font-bold leading-tight">NovaSpace</h2>
                  <p className="text-[10px] font-bold text-slate-400 tracking-wider">FREE PLAN</p>
                </div>
              </div>
              <button 
                onClick={toggle} 
                className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:text-slate-950 transition-colors lg:hidden"
              >
                <X className="w-4 h-4" />
              </button>
              <button 
                onClick={toggle} 
                className="hidden lg:flex w-8 h-8 rounded-xl bg-slate-50 items-center justify-center text-slate-400 hover:text-slate-950 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>

            <Link to="/projects" className="w-full bg-slate-950 text-white flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold text-sm shadow-xl shadow-slate-200 hover:bg-black transition-all mb-10 group">
              <Plus className="w-4 h-4 text-white" />
              New Project
            </Link>

            <nav className="flex-1 space-y-8 overflow-y-auto custom-scrollbar">
              {menuItems.map((sec, i) => (
                <div key={i} className="space-y-2">
                  <h3 className="text-[10px] font-bold text-slate-400 tracking-widest uppercase px-3 mb-4">{sec.section}</h3>
                  {sec.items.map((item, j) => {
                    const className = `flex items-center justify-between p-3 rounded-2xl transition-all group ${item.active ? 'bg-slate-50 text-slate-950' : 'text-slate-500 hover:bg-slate-50/50 hover:text-slate-950'}`;
                    const inner = (
                      <>
                        <div className="flex items-center gap-3">
                          <item.icon className={`w-5 h-5 ${item.active ? 'text-slate-950' : 'text-slate-400 group-hover:text-slate-950'}`} strokeWidth={1.5} />
                          <span className="text-sm font-bold">{item.name}</span>
                        </div>
                        {item.badge && <span className="bg-slate-950 text-white text-[9px] font-bold px-2 py-0.5 rounded-full">{item.badge}</span>}
                        {item.count && <span className="bg-black text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">{item.count}</span>}
                      </>
                    );
                    return item.to
                      ? <Link key={j} to={item.to} className={className}>{inner}</Link>
                      : <a key={j} href="#" className={className}>{inner}</a>;
                  })}
                </div>
              ))}
            </nav>

            <div className="pt-6 border-t border-slate-100 flex items-center gap-3">
              <button className="flex-1 p-3 rounded-xl bg-slate-50 flex items-center justify-center"><Bell className="w-5 h-5 text-slate-500" /></button>
              <button className="flex-1 p-3 rounded-xl bg-slate-50 flex items-center justify-center"><Brain className="w-5 h-5 text-slate-500" /></button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
      
      {/* Mobile Back-drop */}
      {isOpen && (
        <div 
          onClick={toggle}
          className="lg:hidden fixed inset-0 bg-slate-950/20 backdrop-blur-sm z-[150]"
        />
      )}
    </>
  );
};

const dashboardFeatureLinks = [
  { title: "AI Assistant", desc: "Smart chat & adaptive learning", icon: Brain, to: '/ai-assistant' },
  { title: "WorkSpace", desc: "Code & document workspace manager", icon: Folder, to: '/workspace' },
  { title: "Teams", desc: "Collaborate with team members", icon: Users, to: '/teams' },
  { title: "Conferencing", desc: "HD virtual classrooms & meetings", icon: Video, to: '/meetings' },
  { title: "Live Chat", desc: "Real-time messaging & Q&A", icon: MessageSquare, to: '/chat' },
  { title: "Web Search", desc: "AI-powered web search", icon: Globe, to: '/web-search' },
];

// Adapted Header to match the "Floating Capsule" design from the landing page
const Header = ({ isSidebarOpen, toggleSidebar }: { isSidebarOpen: boolean, toggleSidebar: () => void }) => {
  const [isFeaturesOpen, setIsFeaturesOpen] = useState(false);
  const featuresRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (featuresRef.current && !featuresRef.current.contains(e.target as Node)) {
        setIsFeaturesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <header className={`fixed top-4 md:top-6 transition-all duration-500 z-[100] px-4 md:px-0 flex justify-center ${isSidebarOpen ? 'left-72 right-0' : 'left-0 right-0'}`}>
      <nav className={`w-full ${isSidebarOpen ? 'max-w-6xl' : 'max-w-7xl'} backdrop-blur-xl bg-white/70 border border-white/40 rounded-[2rem] px-5 md:px-8 py-2 md:py-3.5 flex items-center justify-between shadow-[0_8px_32px_rgba(0,0,0,0.06)] ring-1 ring-slate-900/5 transition-all duration-500`}>
          <div className="flex items-center gap-4">
              <button 
                  onClick={toggleSidebar}
                  className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white hover:bg-black transition-all shadow-sm shrink-0"
              >
                  <Menu className="w-5 h-5" />
              </button>

              {/* Breadcrumb nav links - integrated directly into the capsule */}
              <div className="hidden lg:flex items-center gap-6 xl:gap-8 ml-4">
                  <Link to="/" className="text-[13px] font-bold text-slate-500 hover:text-slate-950 transition-colors">Home</Link>

                  {/* Features dropdown */}
                  <div
                    ref={featuresRef}
                    className="relative"
                    onMouseEnter={() => setIsFeaturesOpen(true)}
                    onMouseLeave={() => setIsFeaturesOpen(false)}
                  >
                    <button
                      onClick={() => setIsFeaturesOpen(!isFeaturesOpen)}
                      className={`flex items-center gap-1 text-[13px] font-bold transition-all ${isFeaturesOpen ? 'text-slate-950' : 'text-slate-500 hover:text-slate-950'}`}
                    >
                      Features
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isFeaturesOpen ? 'rotate-180' : ''}`} />
                    </button>

                    <motion.div
                      initial={false}
                      animate={isFeaturesOpen ? { opacity: 1, y: 0, scale: 1, display: 'block' } : { opacity: 0, y: 10, scale: 0.95, transitionEnd: { display: 'none' } }}
                      className="absolute top-full left-0 pt-4 z-[200] min-w-[300px]"
                    >
                      <div className="backdrop-blur-2xl bg-white/95 border border-white/50 rounded-[2rem] shadow-2xl p-4 ring-1 ring-slate-900/5">
                        <div className="space-y-1">
                          {dashboardFeatureLinks.map((link, i) => (
                            <Link key={i} to={link.to} onClick={() => setIsFeaturesOpen(false)} className="flex items-center gap-3 p-3 rounded-2xl hover:bg-slate-50 transition-all group/item">
                              <div className="w-9 h-9 rounded-xl bg-white border border-slate-100 shadow-sm flex items-center justify-center group-hover/item:border-slate-900 transition-all shrink-0">
                                <link.icon className="w-4 h-4 text-slate-900" strokeWidth={1.5} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <span className="font-bold text-[12px] text-slate-900 block">{link.title}</span>
                                <p className="text-[10px] text-slate-500 truncate group-hover/item:text-slate-700 transition-colors">{link.desc}</p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  <Link to="/dashboard" className="text-[13px] font-bold text-slate-950 border-b-2 border-slate-950 pb-0.5">Dashboard</Link>
                  <Link to="/projects" className="text-[13px] font-bold text-slate-500 hover:text-slate-950 transition-colors">Projects</Link>
                  <Link to="/ai-assistant" className="flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-lg border border-white/50 hover:bg-slate-200 transition-colors">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-900 animate-pulse" />
                      <span className="text-[11px] font-bold text-slate-900">AI Assistant</span>
                  </Link>
              </div>
          </div>

          <div className="flex-1 flex justify-center px-4 max-w-sm hidden md:flex">
               {/* Integrated Search */}
              <div className="w-full relative group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" strokeWidth={2.5} />
                  <input 
                      type="text" 
                      placeholder="Search tools..."
                      className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 border-transparent focus:bg-white focus:border-slate-100 focus:outline-none transition-all text-xs font-bold text-slate-900"
                  />
              </div>
          </div>

          <div className="flex items-center gap-3">
              <div className="flex items-center gap-3 p-1.5 pr-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-all cursor-pointer group whitespace-nowrap overflow-hidden">
                  <div className="w-8 h-8 rounded-xl bg-slate-200 overflow-hidden shrink-0 border border-white shadow-sm ring-1 ring-slate-900/5">
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Henry" alt="User" />
                  </div>
                  <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-700 group-hover:text-slate-950 transition-colors">Henry</span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                  </div>
              </div>
          </div>
      </nav>
    </header>
  );
};

const StatCard = ({ title, value, icon: Icon, desc, badge }: any) => (
  <motion.div 
    whileHover={{ y: -4 }}
    className="bg-white border border-slate-100 rounded-[2.5rem] p-6 md:p-8 shadow-sm hover:shadow-xl transition-all group"
  >
    <div className="flex items-start justify-between mb-6 md:mb-8">
      <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:border-slate-950 transition-all">
        <Icon className="w-6 h-6 md:w-7 md:h-7 text-slate-950" strokeWidth={1.2} />
      </div>
      {badge && <span className="text-[8px] font-bold tracking-widest uppercase bg-slate-50 text-slate-500 px-2 py-0.5 rounded-full border border-slate-100">{badge}</span>}
    </div>
    <p className="text-[10px] font-bold text-slate-400 tracking-widest uppercase mb-1">{title}</p>
    <div className="flex items-end gap-2">
      <h3 className="font-serif text-3xl md:text-5xl font-bold text-slate-950 leading-none">{value}</h3>
      <ArrowUpRight className="w-4 h-4 text-slate-300 mb-1" />
    </div>
    <p className="mt-4 text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-wide truncate">{desc}</p>
  </motion.div>
);

const DashboardPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('Today');

  return (
    <div className="min-h-screen bg-[#FDFDFD] font-sans overflow-x-hidden">
      <Sidebar isOpen={isSidebarOpen} toggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      <Header isSidebarOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      
      <main className={`transition-all duration-500 pt-32 pb-12 ${isSidebarOpen ? 'pl-0 lg:pl-72' : 'pl-0'}`}>
        <div className="max-w-7xl mx-auto p-6 md:p-12 space-y-10 md:space-y-14">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="font-serif text-3xl md:text-5xl font-bold text-slate-950 mb-4 leading-tight">Dashboard Overview</h1>
              <p className="text-slate-500 font-medium text-base md:text-lg">
                Welcome back, <span className="text-slate-950 font-bold underline underline-offset-8 decoration-slate-200 text-xl font-serif">Henry!</span>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            <StatCard title="Active Tasks" value="0" icon={CheckSquare} desc="0 completed · 0 in progress" />
            <StatCard title="Active Projects" value="0" icon={FolderKanban} desc="0 in progress · 0 done" />
            <StatCard title="Team Members" value="0" icon={Users} desc="Across 0 teams" badge="0 ONLINE" />
            <StatCard title="Completed" value="0" icon={CheckCircle2} desc="0 items this month" badge="THIS MONTH" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-10">
            <div className="lg:col-span-2 bg-white border border-slate-100 rounded-[2.5rem] md:rounded-[3.5rem] p-8 md:p-12 shadow-sm">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-12">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center"><Clock className="w-5 h-5 text-slate-950" /></div>
                   <h3 className="font-serif text-2xl font-bold text-slate-950">Recent Activity</h3>
                </div>
                
                <div className="flex items-center gap-1 p-1 bg-slate-50 border border-slate-100 rounded-2xl">
                    {['Today', 'Week', 'Month'].map((tab) => (
                        <button 
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 md:px-6 py-2 rounded-xl font-bold text-[10px] md:text-xs transition-all ${activeTab === tab ? 'bg-white text-slate-950 shadow-sm ring-1 ring-slate-900/5' : 'text-slate-400 hover:text-slate-950'}`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
              </div>
              <div className="py-20 flex flex-col items-center justify-center text-center">
                 <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center mb-6"><LayoutDashboard className="w-8 h-8 text-slate-100" /></div>
                 <p className="text-slate-400 font-medium text-xs max-w-[180px]">No activity for <span className="font-bold text-slate-600">{activeTab}</span> yet.</p>
              </div>
            </div>

            <div className="bg-white border border-slate-100 rounded-[2.5rem] md:rounded-[3.5rem] p-8 md:p-12 shadow-sm">
              <div className="flex items-center gap-3 mb-10">
                 <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center"><Calendar className="w-5 h-5 text-slate-950" /></div>
                 <h3 className="font-serif text-2xl font-bold text-slate-950">Deadlines</h3>
              </div>
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                 <div className="w-12 h-12 rounded-full bg-slate-50 border border-dashed border-slate-200 flex items-center justify-center mb-4"><Plus className="w-4 h-4 text-slate-200" /></div>
                 <p className="text-slate-400 font-medium text-xs">Nothing due soon.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
