import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  FolderKanban,
  LayoutDashboard,
  CheckSquare,
  Calendar,
  Layers,
  Plus,
  Search,
  ChevronDown,
  Brain,
  Bell,
  Menu,
  X,
  ArrowLeft,
  ChevronLeft,
  Grid,
  List,
  MoreHorizontal,
  Clock,
  CheckCircle2,
  Trash2
} from 'lucide-react';
import { Link } from 'react-router-dom';

// ─── Types ────────────────────────────────────────────────────────────────────

type Status = 'Planning' | 'Active' | 'Completed';

interface Project {
  id: string;
  name: string;
  description: string;
  status: Status;
  dueDate: string;
  progress: number;
  createdAt: string;
}

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

const Sidebar = ({ isOpen, toggle, onAddProject }: { isOpen: boolean; toggle: () => void; onAddProject: () => void }) => {
  const main: NavItemProps[] = [
    { name: 'Dashboard', icon: LayoutDashboard, to: '/dashboard' },
    { name: 'My Tasks', icon: CheckSquare, to: '/tasks' },
    { name: 'Projects', icon: FolderKanban, active: true, to: '/projects' },
    { name: 'Workspace', icon: Layers, to: '#' },
    { name: 'Calendar', icon: Calendar, to: '#' },
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
            className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-slate-100 flex flex-col p-5 z-[200] shadow-2xl lg:shadow-none"
          >
            {/* Logo */}
            <div className="flex items-center justify-between mb-8 px-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-slate-950 flex items-center justify-center shrink-0">
                  <Brain className="w-4 h-4 text-white" strokeWidth={1.5} />
                </div>
                <div>
                  <h2 className="font-serif text-base font-bold text-slate-950 leading-tight">NovaSpace</h2>
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

            {/* Add Project CTA */}
            <button
              onClick={onAddProject}
              className="w-full bg-slate-950 text-white flex items-center justify-center gap-2 py-3 rounded-2xl font-bold text-sm shadow-xl shadow-slate-200 hover:bg-black transition-all mb-8 group"
            >
              <Plus className="w-4 h-4" />
              New Project
            </button>

            {/* Main */}
            <div className="mb-6">
              <p className="text-[9px] font-bold text-slate-400 tracking-widest uppercase px-3 mb-3">Main</p>
              <nav className="space-y-1">
                {main.map((item, i) => <React.Fragment key={i}><NavItem item={item} /></React.Fragment>)}
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
    className={`fixed top-4 md:top-6 transition-all duration-500 z-[100] px-3 md:px-0 flex justify-center ${
      isSidebarOpen ? 'left-0 lg:left-64 right-0' : 'left-0 right-0'
    }`}
  >
    <nav
      className={`w-full ${isSidebarOpen ? 'max-w-5xl' : 'max-w-7xl'} backdrop-blur-xl bg-white/70 border border-white/40 rounded-[2rem] px-4 md:px-8 py-2.5 md:py-3.5 flex items-center justify-between shadow-[0_8px_32px_rgba(0,0,0,0.06)] ring-1 ring-slate-900/5 transition-all duration-500`}
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
          <span className="text-slate-900">Projects</span>
        </div>
      </div>

      {/* Search */}
      <div className="flex-1 max-w-xs mx-4 hidden sm:block">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" strokeWidth={2} />
          <input
            type="text"
            placeholder="Search projects..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-transparent focus:bg-white focus:border-slate-200 focus:outline-none text-xs font-bold text-slate-900 placeholder:text-slate-400 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-all">
          <Bell className="w-4 h-4" />
        </button>
      </div>
    </nav>
  </header>
);

// ─── Status Icon ──────────────────────────────────────────────────────────────

const StatusIcon = ({ status }: { status: Status }) => {
  if (status === 'Completed') return <CheckCircle2 className="w-4 h-4 text-slate-900" strokeWidth={1.5} />;
  if (status === 'Active') return <Clock className="w-4 h-4 text-slate-500" strokeWidth={1.5} />;
  return <FolderKanban className="w-4 h-4 text-slate-300" strokeWidth={1.5} />;
};

// ─── Project Card ─────────────────────────────────────────────────────────────

const ProjectCard = ({
  project,
  onStatusToggle,
  onDelete,
}: {
  project: Project;
  onStatusToggle: (id: string) => void;
  onDelete: (id: string) => void;
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const isCompleted = project.status === 'Completed';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={`p-5 bg-white border rounded-[1.75rem] shadow-sm hover:shadow-md hover:border-slate-200 transition-all group flex flex-col ${
        isCompleted ? 'border-slate-100 opacity-60' : 'border-slate-100'
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
           <StatusIcon status={project.status} />
        </div>
        
        {/* Actions menu */}
        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-8 h-8 rounded-xl opacity-0 group-hover:opacity-100 flex items-center justify-center text-slate-400 hover:text-slate-900 hover:bg-slate-50 transition-all"
          >
            <MoreHorizontal className="w-4 h-4" />
          </button>
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -5 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="absolute right-0 top-10 z-50 bg-white rounded-2xl border border-slate-100 shadow-xl p-1.5 min-w-[140px]"
              >
                <button
                  onClick={() => { onStatusToggle(project.id); setMenuOpen(false); }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {isCompleted ? 'Mark Active' : 'Mark Completed'}
                </button>
                <button
                  onClick={() => { onDelete(project.id); setMenuOpen(false); }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-400 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Delete
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      
      <h3 className={`font-serif text-lg font-bold text-slate-900 mb-1 truncate ${isCompleted ? 'text-slate-500' : ''}`}>
        {project.name}
      </h3>
      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4 flex-1">
        {project.description || 'No description provided.'}
      </p>

      <div className="mt-auto pt-4 border-t border-slate-50 gap-4 flex flex-col">
          <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{project.status}</span>
              {project.dueDate && (
                  <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400">
                    <Calendar className="w-3 h-3" />
                    {project.dueDate}
                  </div>
              )}
          </div>
          {/* Progress bar */}
          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
              <div 
                  className={`h-full rounded-full transition-all duration-500 ${isCompleted ? 'bg-slate-300' : 'bg-slate-900'}`}
                  style={{ width: `${project.progress}%` }}
              />
          </div>
      </div>
    </motion.div>
  );
};

// ─── Create Project Modal ─────────────────────────────────────────────────────

const CreateProjectModal = ({
  onClose,
  onCreate,
}: {
  onClose: () => void;
  onCreate: (project: Omit<Project, 'id' | 'createdAt'>) => void;
}) => {
  const [form, setForm] = useState({
    name: '',
    description: '',
    status: 'Planning' as Status,
    dueDate: '',
    progress: 0
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    onCreate(form);
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-slate-950/30 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        onClick={e => e.stopPropagation()}
        className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200 border border-slate-100 p-8 w-full max-w-md"
      >
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-serif text-2xl font-bold text-slate-900">New Project</h2>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="font-bold text-[10px] tracking-widest uppercase text-slate-400 block mb-2">Project Name *</label>
            <input
              autoFocus
              type="text"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              placeholder="e.g. Website Redesign"
              className="w-full px-4 py-3 border border-slate-200 rounded-2xl text-sm font-medium text-slate-900 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="font-bold text-[10px] tracking-widest uppercase text-slate-400 block mb-2">Description</label>
            <textarea
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
              placeholder="Project details..."
              rows={3}
              className="w-full px-4 py-3 border border-slate-200 rounded-2xl text-sm font-medium text-slate-900 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-[10px] tracking-widest uppercase text-slate-400 block mb-2">Status</label>
              <select
                value={form.status}
                onChange={e => setForm({ ...form, status: e.target.value as Status })}
                className="w-full px-4 py-3 border border-slate-200 rounded-2xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent bg-white transition-all"
              >
                <option>Planning</option>
                <option>Active</option>
                <option>Completed</option>
              </select>
            </div>
            <div>
              <label className="font-bold text-[10px] tracking-widest uppercase text-slate-400 block mb-2">Due Date</label>
              <input
                type="date"
                value={form.dueDate}
                onChange={e => setForm({ ...form, dueDate: e.target.value })}
                className="w-full px-4 py-3 border border-slate-200 rounded-2xl text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent bg-white transition-all"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-2xl border border-slate-200 font-bold text-sm text-slate-500 hover:text-slate-900 hover:border-slate-300 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 rounded-2xl bg-slate-900 text-white font-bold text-sm hover:bg-black transition-all flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" /> Create Project
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

// ─── Dropdown ─────────────────────────────────────────────────────────────────

const Dropdown = ({
  value,
  options,
  onChange,
  label,
}: {
  value: string;
  options: string[];
  onChange: (v: string) => void;
  label: string;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 rounded-2xl text-xs font-bold text-slate-700 bg-white hover:border-slate-300 transition-all whitespace-nowrap"
      >
        {value === options[0] ? label : value}
        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -5, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -5, scale: 0.95 }}
            className="absolute top-11 left-0 z-50 bg-white border border-slate-100 rounded-2xl shadow-xl p-1.5 min-w-[140px]"
          >
            {options.map((opt) => (
              <button
                key={opt}
                onClick={() => { onChange(opt); setOpen(false); }}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                  value === opt ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                {opt}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────

const Projects = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [search, setSearch] = useState('');

  const createProject = (data: Omit<Project, 'id' | 'createdAt'>) => {
    const project: Project = {
      ...data,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setProjects(prev => [project, ...prev]);
  };

  const toggleProjectStatus = (id: string) => {
    setProjects(prev =>
      prev.map(p =>
        p.id === id
          ? { 
              ...p, 
              status: p.status === 'Completed' ? 'Active' : 'Completed',
              progress: p.status !== 'Completed' ? 100 : p.progress // Set to 100 if completing
            }
          : p
      )
    );
  };

  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  const filtered = projects
    .filter(p => statusFilter === 'All Status' || p.status === statusFilter)
    .filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <div className="min-h-screen bg-[#FDFDFD] font-sans">
      <Sidebar isOpen={isSidebarOpen} toggle={() => setIsSidebarOpen(!isSidebarOpen)} onAddProject={() => setShowModal(true)} />
      <AppHeader isSidebarOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

      <main className={`transition-all duration-500 pt-24 md:pt-32 pb-12 ${isSidebarOpen ? 'lg:pl-64' : 'pl-0'}`}>
        <div className="max-w-5xl mx-auto px-4 md:px-8 space-y-6 md:space-y-8">

          {/* Page header */}
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Link to="/dashboard" className="text-slate-400 hover:text-slate-900 transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-slate-900">Projects</h1>
            </div>
            <p className="font-sans text-sm text-slate-500 ml-8">Manage and track your project progress</p>
          </div>

          {/* Filter toolbar */}
          <div className="flex flex-wrap items-center gap-3">
            <Dropdown
              label="All Status"
              value={statusFilter}
              options={['All Status', 'Planning', 'Active', 'Completed']}
              onChange={setStatusFilter}
            />

            <div className="relative flex-1 min-w-[180px]">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" strokeWidth={2} />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search projects..."
                className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-2xl text-xs font-bold text-slate-900 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent bg-white transition-all"
              />
            </div>

            <div className="flex bg-slate-50 rounded-2xl p-1 border border-slate-200 ml-auto items-center">
                <button className="w-8 h-8 rounded-xl bg-white shadow-sm flex items-center justify-center text-slate-900 transition-all">
                    <Grid className="w-4 h-4" />
                </button>
                <button className="w-8 h-8 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-900 transition-all">
                    <List className="w-4 h-4" />
                </button>
            </div>
          </div>

          {/* Projects list */}
          <div>
            <AnimatePresence mode="popLayout">
              {filtered.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filtered.map(project => (
                    <React.Fragment key={project.id}>
                      <ProjectCard
                        project={project}
                        onStatusToggle={toggleProjectStatus}
                        onDelete={deleteProject}
                      />
                    </React.Fragment>
                  ))}
                </div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-24 text-center mt-6 border rounded-[2rem] border-slate-100 bg-white"
                >
                  <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-6 shadow-sm">
                    <FolderKanban className="w-8 h-8 text-slate-200" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-slate-900 mb-2">No projects found</h3>
                  <p className="text-sm text-slate-400 font-medium mb-8">
                    {projects.length > 0 ? 'Try adjusting your filters' : 'Create your first project to get started'}
                  </p>
                  {projects.length === 0 && (
                    <button
                      onClick={() => setShowModal(true)}
                      className="flex items-center gap-2 bg-slate-900 text-white px-8 py-3.5 rounded-2xl font-bold text-sm hover:bg-black transition-all shadow-xl shadow-slate-200"
                    >
                      New Project
                    </button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      {/* Create Project Modal */}
      <AnimatePresence>
        {showModal && (
          <CreateProjectModal onClose={() => setShowModal(false)} onCreate={createProject} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Projects;
