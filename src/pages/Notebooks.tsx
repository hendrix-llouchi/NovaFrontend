import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  BookOpen,
  Plus,
  Search,
  ChevronLeft,
  Menu,
  Upload,
  FileText,
  File,
  FilePlus,
  Trash2,
  MoreHorizontal,
  MessageSquare,
  Brain,
  ChevronRight,
  X,
  Clock,
  Download,
  Eye,
  Sparkles,
  LayoutDashboard,
} from 'lucide-react';
import { Link } from 'react-router-dom';

// ─── Types ─────────────────────────────────────────────────────────────────────

type DocStatus = 'processing' | 'ready' | 'error';

interface Document {
  id: string;
  name: string;
  size: string;
  type: string;
  status: DocStatus;
  uploadedAt: Date;
  pages?: number;
}

// ─── Helpers ───────────────────────────────────────────────────────────────────

function timeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function getFileType(filename: string): string {
  const ext = filename.split('.').pop()?.toUpperCase() ?? 'FILE';
  return ext;
}

// ─── Document Card ─────────────────────────────────────────────────────────────

const DocumentCard = ({
  doc,
  onDelete,
  onSelect,
  isActive,
}: {
  doc: Document;
  onDelete: (id: string) => void;
  onSelect: (id: string) => void;
  isActive: boolean;
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <motion.button
      layout
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      onClick={() => onSelect(doc.id)}
      className={`w-full flex items-start gap-3 px-3 py-3 rounded-2xl text-left transition-all group ${
        isActive ? 'bg-slate-50' : 'hover:bg-slate-50/60'
      }`}
    >
      {/* File icon */}
      <div className="w-9 h-9 rounded-xl bg-white border border-slate-100 flex items-center justify-center shrink-0 shadow-sm">
        <FileText className="w-4 h-4 text-slate-500" strokeWidth={1.5} />
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-xs font-bold text-slate-900 truncate">{doc.name}</p>
        <div className="flex items-center gap-1.5 mt-0.5">
          {doc.status === 'processing' ? (
            <span className="text-[10px] font-bold text-slate-400 animate-pulse">Processing…</span>
          ) : doc.status === 'error' ? (
            <span className="text-[10px] font-bold text-red-400">Error</span>
          ) : (
            <span className="text-[10px] text-slate-400 font-medium">{doc.size} · {timeAgo(doc.uploadedAt)}</span>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="relative shrink-0" onClick={e => e.stopPropagation()}>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="w-6 h-6 rounded-lg opacity-0 group-hover:opacity-100 flex items-center justify-center text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-all"
        >
          <MoreHorizontal className="w-3.5 h-3.5" />
        </button>
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -4 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="absolute right-0 top-7 z-50 bg-white rounded-2xl border border-slate-100 shadow-xl p-1.5 min-w-[130px]"
            >
              <button
                onClick={() => setMenuOpen(false)}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
              >
                <Eye className="w-3.5 h-3.5" /> Preview
              </button>
              <button
                onClick={() => setMenuOpen(false)}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
              >
                <Download className="w-3.5 h-3.5" /> Download
              </button>
              <button
                onClick={() => { onDelete(doc.id); setMenuOpen(false); }}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-400 hover:bg-slate-50 hover:text-red-500 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" /> Delete
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.button>
  );
};

// ─── Sidebar ───────────────────────────────────────────────────────────────────

const Sidebar = ({
  isOpen,
  toggle,
  docs,
  activeDocId,
  onDeleteDoc,
  onSelectDoc,
  onNewProject,
  searchQuery,
  setSearchQuery,
}: {
  isOpen: boolean;
  toggle: () => void;
  docs: Document[];
  activeDocId: string | null;
  onDeleteDoc: (id: string) => void;
  onSelectDoc: (id: string) => void;
  onNewProject: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}) => {
  const filtered = docs.filter(d =>
    d.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-slate-100 flex flex-col z-[200] shadow-2xl lg:shadow-none"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 pb-3">
              <div className="flex items-center gap-2.5 px-1">
                <div className="w-8 h-8 rounded-xl bg-slate-950 flex items-center justify-center shrink-0">
                  <BookOpen className="w-4 h-4 text-white" strokeWidth={1.5} />
                </div>
                <h2 className="font-serif text-base font-bold text-slate-950">Notebooks</h2>
              </div>
              <button
                onClick={toggle}
                className="w-7 h-7 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* New Project */}
            <div className="px-4 pb-3">
              <button
                onClick={onNewProject}
                className="w-full flex items-center gap-2 px-4 py-2.5 rounded-2xl border border-slate-200 text-sm font-bold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all"
              >
                <Plus className="w-4 h-4" />
                New Project
              </button>
            </div>

            {/* Search */}
            <div className="px-4 pb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" strokeWidth={2} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search documents..."
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 text-xs font-bold text-slate-900 placeholder:text-slate-400 border border-transparent focus:bg-white focus:border-slate-200 focus:outline-none transition-all"
                />
              </div>
            </div>

            {/* Documents List */}
            <div className="flex-1 overflow-y-auto px-4">
              <p className="text-[9px] font-bold text-slate-400 tracking-widest uppercase mb-3">Your Documents</p>
              {filtered.length === 0 ? (
                <div className="flex flex-col items-center py-10 text-center">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-3">
                    <File className="w-4 h-4 text-slate-200" strokeWidth={1.5} />
                  </div>
                  <p className="text-xs text-slate-400 font-medium">No documents yet</p>
                </div>
              ) : (
                <AnimatePresence>
                  {filtered.map(doc => (
                    <React.Fragment key={doc.id}>
                      <DocumentCard
                        doc={doc}
                        onDelete={onDeleteDoc}
                        onSelect={onSelectDoc}
                        isActive={activeDocId === doc.id}
                      />
                    </React.Fragment>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Footer Links */}
            <div className="px-4 pb-4 border-t border-slate-100 pt-4 space-y-1">
              <Link
                to="/ai-assistant"
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-2xl text-sm font-bold text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-all"
              >
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-4 h-4 text-slate-400" strokeWidth={1.5} />
                  Back to Chat
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
              </Link>
              <Link
                to="/dashboard"
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-2xl text-sm font-bold text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-all"
              >
                <div className="flex items-center gap-3">
                  <LayoutDashboard className="w-4 h-4 text-slate-400" strokeWidth={1.5} />
                  Dashboard
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
              </Link>
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

// ─── Header ────────────────────────────────────────────────────────────────────

const AppHeader = ({
  isSidebarOpen,
  toggleSidebar,
  activeDoc,
}: {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  activeDoc: Document | null;
}) => (
  <header
    className={`fixed top-4 md:top-6 transition-all duration-500 z-[100] px-3 md:px-4 flex justify-center ${
      isSidebarOpen ? 'left-0 lg:left-64 right-0' : 'left-0 right-0'
    }`}
  >
    <nav
      className={`w-full ${
        isSidebarOpen ? 'max-w-4xl' : 'max-w-5xl'
      } backdrop-blur-xl bg-white/70 border border-white/40 rounded-[2rem] px-4 md:px-6 py-2.5 md:py-3 flex items-center justify-between shadow-[0_8px_32px_rgba(0,0,0,0.06)] ring-1 ring-slate-900/5 transition-all duration-500`}
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
          <span className="text-slate-900">
            {activeDoc ? 'AI Document Processing' : 'Notebooks'}
          </span>
          {activeDoc && (
            <>
              <span className="text-slate-200">/</span>
              <span className="text-slate-500 truncate max-w-[180px]">{activeDoc.name}</span>
            </>
          )}
        </div>
      </div>

      {activeDoc && (
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-xl">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wide">AI Ready</span>
          </div>
        </div>
      )}
    </nav>
  </header>
);

// ─── Upload Zone ───────────────────────────────────────────────────────────────

const UploadZone = ({ onUpload }: { onUpload: (files: FileList) => void }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      if (e.dataTransfer.files.length > 0) onUpload(e.dataTransfer.files);
    },
    [onUpload]
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center flex-1 px-6 py-12"
    >
      {/* Icon */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, type: 'spring', damping: 15 }}
        className="w-16 h-16 rounded-2xl bg-slate-950 flex items-center justify-center mb-8 shadow-xl shadow-slate-200"
      >
        <FileText className="w-8 h-8 text-white" strokeWidth={1.2} />
      </motion.div>

      <h1 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 mb-3 text-center">
        Upload your documents
      </h1>
      <p className="text-sm text-slate-400 font-medium text-center max-w-sm mb-10 leading-relaxed">
        Analyze, summarize, and chat with your PDFs and documents using AI
      </p>

      {/* Drop zone */}
      <div
        onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`w-full max-w-lg rounded-[2rem] border-2 border-dashed transition-all cursor-pointer p-14 flex flex-col items-center justify-center gap-4 ${
          isDragging
            ? 'border-slate-900 bg-slate-50 scale-[1.02]'
            : 'border-slate-200 bg-white hover:border-slate-400 hover:bg-slate-50'
        }`}
      >
        <motion.div
          animate={isDragging ? { y: [-4, 0, -4] } : { y: 0 }}
          transition={{ duration: 0.8, repeat: isDragging ? Infinity : 0 }}
        >
          <Upload className="w-10 h-10 text-slate-400" strokeWidth={1.2} />
        </motion.div>
        <div className="text-center">
          <p className="font-bold text-slate-900 text-base mb-1">Drop your documents here</p>
          <p className="text-xs text-slate-400 font-medium">
            Supports PDF, DOC, DOCX · Max 50MB
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={e => { e.stopPropagation(); fileInputRef.current?.click(); }}
          className="mt-2 px-8 py-3 bg-slate-900 text-white rounded-2xl font-bold text-sm hover:bg-black transition-all shadow-xl shadow-slate-200"
        >
          Choose Files
        </motion.button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        multiple
        accept=".pdf,.doc,.docx,.txt,.md"
        onChange={e => e.target.files && onUpload(e.target.files)}
      />

      {/* Supported formats */}
      <div className="flex items-center gap-3 mt-8 flex-wrap justify-center">
        {['PDF', 'DOC', 'DOCX', 'TXT', 'MD'].map(fmt => (
          <span
            key={fmt}
            className="px-3 py-1.5 bg-white border border-slate-100 rounded-xl text-[10px] font-bold text-slate-500 tracking-wider uppercase shadow-sm"
          >
            {fmt}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

// ─── Document Viewer ───────────────────────────────────────────────────────────

const DocumentViewer = ({
  doc,
  onClose,
}: {
  doc: Document;
  onClose: () => void;
}) => {
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([]);
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [activeTab, setActiveTab] = useState<'summary' | 'chat'>('summary');

  const sendMessage = async () => {
    if (!chatInput.trim() || isAiTyping) return;
    const text = chatInput.trim();
    setChatMessages(prev => [...prev, { role: 'user', text }]);
    setChatInput('');
    setIsAiTyping(true);
    await new Promise(r => setTimeout(r, 1200 + Math.random() * 600));
    setChatMessages(prev => [
      ...prev,
      {
        role: 'ai',
        text: `Based on the document "${doc.name}", here is what I found: This is an AI-generated response that would analyze and answer your question about the uploaded document content. In the full version, the document would be parsed and processed by the AI model.`,
      },
    ]);
    setIsAiTyping(false);
  };

  const SUMMARY_POINTS = [
    'Document has been successfully processed and indexed',
    'Key topics and sections have been identified',
    'Ready to answer questions about the document content',
    'Supports multi-turn conversations about this document',
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col flex-1 max-w-4xl mx-auto w-full px-4 md:px-8 py-8"
    >
      {/* Document header */}
      <div className="flex items-start justify-between mb-6 gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5 text-slate-600" strokeWidth={1.5} />
          </div>
          <div className="min-w-0">
            <h2 className="font-serif text-xl font-bold text-slate-900 truncate">{doc.name}</h2>
            <p className="text-xs text-slate-400 font-medium mt-0.5">{doc.size} · {doc.pages && `${doc.pages} pages · `}{timeAgo(doc.uploadedAt)}</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-all shrink-0"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 p-1 bg-slate-50 border border-slate-100 rounded-2xl mb-6 w-fit">
        {(['summary', 'chat'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-xl font-bold text-xs transition-all capitalize ${
              activeTab === tab
                ? 'bg-white text-slate-900 shadow-sm ring-1 ring-slate-900/5'
                : 'text-slate-400 hover:text-slate-900'
            }`}
          >
            {tab === 'chat' ? 'AI Chat' : 'Summary'}
          </button>
        ))}
      </div>

      {activeTab === 'summary' ? (
        /* Summary tab */
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white border border-slate-100 rounded-[2rem] p-8 shadow-sm flex-1"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-slate-950 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" strokeWidth={1.2} />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-slate-900">AI Summary</h3>
              <p className="text-xs text-slate-400 font-medium">Generated automatically</p>
            </div>
          </div>
          <ul className="space-y-3">
            {SUMMARY_POINTS.map((pt, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="flex items-start gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100"
              >
                <div className="w-5 h-5 rounded-full bg-slate-900 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-[9px] font-bold text-white">{i + 1}</span>
                </div>
                <p className="text-sm text-slate-700 font-medium leading-relaxed">{pt}</p>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      ) : (
        /* Chat tab */
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col flex-1 bg-white border border-slate-100 rounded-[2rem] shadow-sm overflow-hidden"
        >
          <div className="flex-1 overflow-y-auto p-6 space-y-4 min-h-[240px]">
            {chatMessages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-12">
                <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-4">
                  <Brain className="w-6 h-6 text-slate-300" strokeWidth={1.5} />
                </div>
                <p className="text-sm text-slate-400 font-medium max-w-[220px]">
                  Ask anything about this document
                </p>
              </div>
            ) : (
              chatMessages.map((msg, i) => (
                <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.role === 'ai' && (
                    <div className="w-7 h-7 rounded-xl bg-slate-950 flex items-center justify-center shrink-0">
                      <Brain className="w-3.5 h-3.5 text-white" strokeWidth={1.5} />
                    </div>
                  )}
                  <div
                    className={`max-w-[78%] px-4 py-3 rounded-2xl text-sm font-medium leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-slate-900 text-white rounded-br-md'
                        : 'bg-slate-50 border border-slate-100 text-slate-900 rounded-bl-md'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))
            )}
            {isAiTyping && (
              <div className="flex gap-3 justify-start">
                <div className="w-7 h-7 rounded-xl bg-slate-950 flex items-center justify-center shrink-0">
                  <Brain className="w-3.5 h-3.5 text-white" strokeWidth={1.5} />
                </div>
                <div className="bg-slate-50 border border-slate-100 rounded-2xl rounded-bl-md px-4 py-3 flex items-center gap-1">
                  {[0, 1, 2].map(i => (
                    <motion.div
                      key={i}
                      className="w-1.5 h-1.5 bg-slate-400 rounded-full"
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Chat input */}
          <div className="border-t border-slate-100 p-4">
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMessage()}
                placeholder="Ask about this document..."
                className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-slate-400 transition-all"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={sendMessage}
                disabled={!chatInput.trim() || isAiTyping}
                className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all ${
                  chatInput.trim() && !isAiTyping
                    ? 'bg-slate-900 text-white hover:bg-black shadow-sm'
                    : 'bg-slate-100 text-slate-300 cursor-not-allowed'
                }`}
              >
                <Brain className="w-4 h-4" strokeWidth={1.5} />
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

// ─── Main Page ─────────────────────────────────────────────────────────────────

const Notebooks = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [docs, setDocs] = useState<Document[]>([]);
  const [activeDocId, setActiveDocId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const activeDoc = docs.find(d => d.id === activeDocId) ?? null;

  const handleUpload = (files: FileList) => {
    const newDocs: Document[] = Array.from(files).map(file => ({
      id: Date.now().toString() + Math.random(),
      name: file.name,
      size: formatBytes(file.size),
      type: getFileType(file.name),
      status: 'processing' as DocStatus,
      uploadedAt: new Date(),
    }));

    setDocs(prev => [...newDocs, ...prev]);

    // Simulate processing
    newDocs.forEach(doc => {
      setTimeout(() => {
        setDocs(prev =>
          prev.map(d =>
            d.id === doc.id
              ? { ...d, status: 'ready', pages: Math.floor(Math.random() * 40) + 5 }
              : d
          )
        );
        setActiveDocId(doc.id);
      }, 1500 + Math.random() * 1000);
    });
  };

  const deleteDoc = (id: string) => {
    setDocs(prev => prev.filter(d => d.id !== id));
    if (activeDocId === id) setActiveDocId(null);
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] font-sans flex">
      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        toggle={() => setIsSidebarOpen(!isSidebarOpen)}
        docs={docs}
        activeDocId={activeDocId}
        onDeleteDoc={deleteDoc}
        onSelectDoc={id => setActiveDocId(id)}
        onNewProject={() => setActiveDocId(null)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Main */}
      <div
        className={`flex-1 flex flex-col transition-all duration-500 min-h-screen ${
          isSidebarOpen ? 'lg:ml-64' : 'ml-0'
        }`}
      >
        {/* Header */}
        <AppHeader
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          activeDoc={activeDoc}
        />

        {/* Content */}
        <div className="flex-1 flex flex-col pt-24 md:pt-28">
          <AnimatePresence mode="wait">
            {activeDoc ? (
              <React.Fragment key={activeDoc.id}>
                <DocumentViewer
                  doc={activeDoc}
                  onClose={() => setActiveDocId(null)}
                />
              </React.Fragment>
            ) : (
              <React.Fragment key="upload">
                <UploadZone onUpload={handleUpload} />
              </React.Fragment>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Notebooks;
