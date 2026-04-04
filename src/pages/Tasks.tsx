import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  CheckSquare,
  Plus,
  Search,
  ChevronDown,
  Brain,
  Bell,
  Menu,
  X,
  ArrowLeft,
  Users,
  Filter,
  SlidersHorizontal,
  LayoutDashboard,
  FolderKanban,
  Calendar,
  CheckCircle2,
  Circle,
  Clock,
  AlertCircle,
  MoreHorizontal,
  Trash2,
  ChevronLeft
} from 'lucide-react';
import { Link } from 'react-router-dom';

// ─── Types ────────────────────────────────────────────────────────────────────

type Priority = 'High' | 'Medium' | 'Low';
type Status = 'Todo' | 'In Progress' | 'Done';

interface Task {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  status: Status;
  dueDate: string;
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

const Sidebar = ({ isOpen, toggle, onAddTask }: { isOpen: boolean; toggle: () => void; onAddTask: () => void }) => {
  const quickAccess: NavItemProps[] = [
    { name: 'My Tasks', icon: CheckSquare, active: true, to: '/tasks' },
    { name: 'Team Tasks', icon: Users, to: '#' },
    { name: 'Filter Tasks', icon: Filter, to: '#' },
  ];
  const main: NavItemProps[] = [
    { name: 'Dashboard', icon: LayoutDashboard, to: '/dashboard' },
    { name: 'My Tasks', icon: CheckSquare, active: true, to: '/tasks' },
    { name: 'Projects', icon: FolderKanban, to: '#' },
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

            {/* Add Task CTA */}
            <button
              onClick={onAddTask}
              className="w-full bg-slate-950 text-white flex items-center justify-center gap-2 py-3 rounded-2xl font-bold text-sm shadow-xl shadow-slate-200 hover:bg-black transition-all mb-8 group"
            >
              <Plus className="w-4 h-4" />
              Add New Task
            </button>

            {/* Quick Access */}
            <div className="mb-6">
              <p className="text-[9px] font-bold text-slate-400 tracking-widest uppercase px-3 mb-3">Quick Access</p>
              <nav className="space-y-1">
                {quickAccess.map((item, i) => <React.Fragment key={i}><NavItem item={item} /></React.Fragment>)}
              </nav>
            </div>

            {/* Main */}
            <div className="mb-6">
              <p className="text-[9px] font-bold text-slate-400 tracking-widest uppercase px-3 mb-3">Main</p>
              <nav className="space-y-1">
                {main.map((item, i) => <React.Fragment key={i}><NavItem item={item} /></React.Fragment>)}
              </nav>
            </div>

            {/* Task Overview */}
            <div className="mt-auto pt-5 border-t border-slate-100">
              <p className="text-sm font-bold text-slate-900 px-3 py-2">Task Overview</p>
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
          <span className="text-slate-900">My Tasks</span>
        </div>
      </div>

      {/* Search */}
      <div className="flex-1 max-w-xs mx-4 hidden sm:block">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" strokeWidth={2} />
          <input
            type="text"
            placeholder="Search all tasks..."
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

// ─── Priority Badge ────────────────────────────────────────────────────────────

const PriorityBadge = ({ priority }: { priority: Priority }) => {
  const styles: Record<Priority, string> = {
    High: 'bg-slate-900 text-white',
    Medium: 'bg-slate-100 text-slate-700',
    Low: 'bg-slate-50 text-slate-400',
  };
  return (
    <span className={`text-[9px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full ${styles[priority]}`}>
      {priority}
    </span>
  );
};

// ─── Status Icon ──────────────────────────────────────────────────────────────

const StatusIcon = ({ status }: { status: Status }) => {
  if (status === 'Done') return <CheckCircle2 className="w-5 h-5 text-slate-900" strokeWidth={1.5} />;
  if (status === 'In Progress') return <Clock className="w-5 h-5 text-slate-500" strokeWidth={1.5} />;
  return <Circle className="w-5 h-5 text-slate-300" strokeWidth={1.5} />;
};

// ─── Task Card ────────────────────────────────────────────────────────────────

const TaskCard = ({
  task,
  onStatusToggle,
  onDelete,
}: {
  task: Task;
  onStatusToggle: (id: string) => void;
  onDelete: (id: string) => void;
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const isDone = task.status === 'Done';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className={`flex items-center gap-4 p-4 md:p-5 bg-white border rounded-2xl md:rounded-[1.75rem] shadow-sm hover:shadow-md hover:border-slate-200 transition-all group ${
        isDone ? 'border-slate-100 opacity-60' : 'border-slate-100'
      }`}
    >
      {/* Status toggle */}
      <button
        onClick={() => onStatusToggle(task.id)}
        className="shrink-0 hover:scale-110 transition-transform"
      >
        <StatusIcon status={task.status} />
      </button>

      {/* Task info */}
      <div className="flex-1 min-w-0">
        <p className={`font-bold text-sm text-slate-900 truncate ${isDone ? 'line-through text-slate-400' : ''}`}>
          {task.title}
        </p>
        {task.description && (
          <p className="text-xs text-slate-500 truncate mt-0.5">{task.description}</p>
        )}
      </div>

      {/* Meta */}
      <div className="hidden sm:flex items-center gap-3 shrink-0">
        <PriorityBadge priority={task.priority} />
        {task.dueDate && (
          <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400">
            <Calendar className="w-3 h-3" />
            {task.dueDate}
          </div>
        )}
      </div>

      {/* Actions menu */}
      <div className="relative shrink-0">
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
                onClick={() => { onStatusToggle(task.id); setMenuOpen(false); }}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                {isDone ? 'Mark Undone' : 'Mark Done'}
              </button>
              <button
                onClick={() => { onDelete(task.id); setMenuOpen(false); }}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-400 hover:bg-slate-50 hover:text-slate-900 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Delete
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

// ─── Create Task Modal ─────────────────────────────────────────────────────────

const CreateTaskModal = ({
  onClose,
  onCreate,
}: {
  onClose: () => void;
  onCreate: (task: Omit<Task, 'id' | 'createdAt'>) => void;
}) => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    priority: 'Medium' as Priority,
    status: 'Todo' as Status,
    dueDate: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) return;
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
          <h2 className="font-serif text-2xl font-bold text-slate-900">New Task</h2>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="font-bold text-[10px] tracking-widest uppercase text-slate-400 block mb-2">Task Title *</label>
            <input
              autoFocus
              type="text"
              value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })}
              placeholder="e.g. Design the landing page"
              className="w-full px-4 py-3 border border-slate-200 rounded-2xl text-sm font-medium text-slate-900 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="font-bold text-[10px] tracking-widest uppercase text-slate-400 block mb-2">Description</label>
            <textarea
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
              placeholder="Optional details..."
              rows={3}
              className="w-full px-4 py-3 border border-slate-200 rounded-2xl text-sm font-medium text-slate-900 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-[10px] tracking-widest uppercase text-slate-400 block mb-2">Priority</label>
              <select
                value={form.priority}
                onChange={e => setForm({ ...form, priority: e.target.value as Priority })}
                className="w-full px-4 py-3 border border-slate-200 rounded-2xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent bg-white transition-all"
              >
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
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
              <Plus className="w-4 h-4" /> Create Task
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

const Tasks = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [priorityFilter, setPriorityFilter] = useState('All Priorities');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'priority'>('date');

  const createTask = (data: Omit<Task, 'id' | 'createdAt'>) => {
    const task: Task = {
      ...data,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setTasks(prev => [task, ...prev]);
  };

  const toggleTaskStatus = (id: string) => {
    setTasks(prev =>
      prev.map(t =>
        t.id === id
          ? { ...t, status: t.status === 'Done' ? 'Todo' : 'Done' }
          : t
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const priorityOrder: Record<Priority, number> = { High: 0, Medium: 1, Low: 2 };

  const filtered = tasks
    .filter(t => priorityFilter === 'All Priorities' || t.priority === priorityFilter)
    .filter(t => statusFilter === 'All Status' || t.status === statusFilter)
    .filter(t => t.title.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) =>
      sortBy === 'priority'
        ? priorityOrder[a.priority] - priorityOrder[b.priority]
        : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

  const stats = {
    total: tasks.length,
    done: tasks.filter(t => t.status === 'Done').length,
    inProgress: tasks.filter(t => t.status === 'In Progress').length,
    high: tasks.filter(t => t.priority === 'High' && t.status !== 'Done').length,
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] font-sans">
      <Sidebar isOpen={isSidebarOpen} toggle={() => setIsSidebarOpen(!isSidebarOpen)} onAddTask={() => setShowModal(true)} />
      <AppHeader isSidebarOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

      <main className={`transition-all duration-500 pt-24 md:pt-32 pb-12 ${isSidebarOpen ? 'lg:pl-64' : 'pl-0'}`}>
        <div className="max-w-5xl mx-auto px-4 md:px-8 space-y-6 md:space-y-8">

          {/* Page header */}
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Link to="/dashboard" className="text-slate-400 hover:text-slate-900 transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-slate-900">My Tasks</h1>
            </div>
            <p className="font-sans text-sm text-slate-500 ml-8">Manage and track your tasks efficiently</p>
          </div>

          {/* Stats strip */}
          {tasks.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4">
              {[
                { label: 'Total', value: stats.total, icon: CheckSquare },
                { label: 'Completed', value: stats.done, icon: CheckCircle2 },
                { label: 'In Progress', value: stats.inProgress, icon: Clock },
                { label: 'High Priority', value: stats.high, icon: AlertCircle },
              ].map((s, i) => (
                <div key={i} className="bg-white border border-slate-100 rounded-2xl p-4 flex items-center gap-3 shadow-sm">
                  <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
                    <s.icon className="w-4 h-4 text-slate-900" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="font-serif text-xl font-bold text-slate-900">{s.value}</p>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{s.label}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Filter toolbar */}
          <div className="flex flex-wrap items-center gap-3">
            <Dropdown
              label="All Priorities"
              value={priorityFilter}
              options={['All Priorities', 'High', 'Medium', 'Low']}
              onChange={setPriorityFilter}
            />
            <Dropdown
              label="All Status"
              value={statusFilter}
              options={['All Status', 'Todo', 'In Progress', 'Done']}
              onChange={setStatusFilter}
            />

            <div className="relative flex-1 min-w-[180px]">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" strokeWidth={2} />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search tasks..."
                className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-2xl text-xs font-bold text-slate-900 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent bg-white transition-all"
              />
            </div>

            <button
              onClick={() => setSortBy(s => s === 'date' ? 'priority' : 'date')}
              className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 rounded-2xl text-xs font-bold text-slate-700 bg-white hover:border-slate-300 transition-all whitespace-nowrap ml-auto"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
              Sort: {sortBy === 'date' ? 'Date' : 'Priority'}
            </button>
          </div>

          {/* Task list */}
          <div className="space-y-3">
            <AnimatePresence mode="popLayout">
              {filtered.length > 0 ? (
                filtered.map(task => (
                  <React.Fragment key={task.id}>
                    <TaskCard
                      task={task}
                      onStatusToggle={toggleTaskStatus}
                      onDelete={deleteTask}
                    />
                  </React.Fragment>
                ))
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-24 text-center"
                >
                  <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-6 shadow-sm">
                    <CheckSquare className="w-8 h-8 text-slate-200" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-slate-900 mb-2">No tasks found</h3>
                  <p className="text-sm text-slate-400 font-medium mb-8">
                    {tasks.length > 0 ? 'Try adjusting your filters' : 'Create your first task to get started'}
                  </p>
                  {tasks.length === 0 && (
                    <button
                      onClick={() => setShowModal(true)}
                      className="flex items-center gap-2 bg-slate-900 text-white px-8 py-3.5 rounded-2xl font-bold text-sm hover:bg-black transition-all shadow-xl shadow-slate-200"
                    >
                      <Plus className="w-4 h-4" /> Create Task
                    </button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      {/* Create Task Modal */}
      <AnimatePresence>
        {showModal && (
          <CreateTaskModal onClose={() => setShowModal(false)} onCreate={createTask} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Tasks;
