import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Brain,
  Plus,
  Search,
  MessageSquare,
  ChevronLeft,
  Menu,
  Send,
  Paperclip,
  Star,
  ChevronDown,
  ChevronRight,
  LayoutDashboard,
  Grid3X3,
  BookOpen,
  User,
  Sparkles,
  X,
  Lightbulb,
  Bug,
  FileText,
  Globe,
  Check,
  Circle,
  Zap,
} from 'lucide-react';
import { Link } from 'react-router-dom';

// ─── Types ─────────────────────────────────────────────────────────────────────

type ModelOption = {
  id: string;
  name: string;
  desc: string;
  color: string;
};

type Chat = {
  id: string;
  title: string;
  messageCount: number;
  createdAt: Date;
};

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt: Date;
};

// ─── Constants ─────────────────────────────────────────────────────────────────

const MODELS: ModelOption[] = [
  { id: 'llm', name: 'LLM', desc: 'Llama 3.1 8B via Hugging Face', color: 'bg-slate-900' },
  { id: 'cerebras', name: 'Cerebras', desc: 'Fast Cerebras inference', color: 'bg-slate-600' },
  { id: 'search', name: 'Search', desc: 'Web search powered results', color: 'bg-emerald-500' },
];

const QUICK_ACTIONS = [
  { icon: Lightbulb, label: 'Explain this concept simply', prompt: 'Explain this concept simply: ' },
  { icon: Bug, label: 'Help me debug my code', prompt: 'Help me debug this code: ' },
  { icon: FileText, label: 'Write a project summary', prompt: 'Write a project summary for: ' },
  { icon: Globe, label: 'Search for latest trends', prompt: 'Search for the latest trends in: ' },
];

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

// ─── Model Selector ────────────────────────────────────────────────────────────

const ModelSelector = ({
  selected,
  onSelect,
}: {
  selected: ModelOption;
  onSelect: (m: ModelOption) => void;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative mt-auto">
      {/* Label */}
      <p className="text-[9px] font-bold text-slate-400 tracking-widest uppercase px-3 mb-3">Model</p>

      {/* Selected */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl hover:bg-slate-50 transition-all"
      >
        <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${selected.color}`} />
        <span className="text-sm font-bold text-slate-900 flex-1 text-left">{selected.name}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -5, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -5, scale: 0.96 }}
            className="absolute bottom-full left-0 right-0 mb-2 bg-white border border-slate-100 rounded-2xl shadow-xl p-1.5 z-50"
          >
            {MODELS.map((m) => (
              <button
                key={m.id}
                onClick={() => { onSelect(m); setOpen(false); }}
                className="w-full flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-all text-left group"
              >
                <span className={`w-2.5 h-2.5 rounded-full shrink-0 mt-1 ${m.color}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-900">{m.name}</span>
                    {m.id === selected.id && <Check className="w-3 h-3 text-slate-900" />}
                  </div>
                  <p className="text-[10px] text-slate-400 font-medium truncate">{m.desc}</p>
                </div>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── Sidebar ───────────────────────────────────────────────────────────────────

const Sidebar = ({
  isOpen,
  toggle,
  chats,
  activeChatId,
  onNewChat,
  onSelectChat,
  selectedModel,
  onSelectModel,
}: {
  isOpen: boolean;
  toggle: () => void;
  chats: Chat[];
  activeChatId: string | null;
  onNewChat: () => void;
  onSelectChat: (id: string) => void;
  selectedModel: ModelOption;
  onSelectModel: (m: ModelOption) => void;
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = chats.filter(c =>
    c.title.toLowerCase().includes(searchQuery.toLowerCase())
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
            <div className="flex items-center justify-between p-4 pb-0">
              <div className="flex items-center gap-2.5 px-1">
                <div className="w-8 h-8 rounded-xl bg-slate-950 flex items-center justify-center shrink-0">
                  <Brain className="w-4 h-4 text-white" strokeWidth={1.5} />
                </div>
                <h2 className="font-serif text-base font-bold text-slate-950">Nova AI</h2>
              </div>
              <button
                onClick={toggle}
                className="w-7 h-7 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* New Chat */}
            <div className="px-4 pt-4 pb-2">
              <button
                onClick={onNewChat}
                className="w-full flex items-center gap-2 px-4 py-2.5 rounded-2xl border border-slate-200 text-sm font-bold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all"
              >
                <Plus className="w-4 h-4" />
                New chat
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
                  placeholder="Search chats..."
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 text-xs font-bold text-slate-900 placeholder:text-slate-400 border border-transparent focus:bg-white focus:border-slate-200 focus:outline-none transition-all"
                />
              </div>
            </div>

            {/* Chat History */}
            <div className="flex-1 overflow-y-auto px-4 space-y-1">
              {filtered.length === 0 ? (
                <p className="text-xs text-slate-400 font-medium text-center py-6">No chats yet</p>
              ) : (
                filtered.map(chat => (
                  <button
                    key={chat.id}
                    onClick={() => onSelectChat(chat.id)}
                    className={`w-full flex items-start gap-3 px-3 py-3 rounded-2xl text-left transition-all group ${
                      activeChatId === chat.id ? 'bg-slate-50' : 'hover:bg-slate-50/50'
                    }`}
                  >
                    <MessageSquare className="w-4 h-4 text-slate-300 shrink-0 mt-0.5 group-hover:text-slate-500 transition-colors" strokeWidth={1.5} />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-slate-900 truncate">{chat.title}</p>
                      <p className="text-[10px] text-slate-400 font-medium mt-0.5">
                        {chat.messageCount} msgs · {timeAgo(chat.createdAt)}
                      </p>
                    </div>
                  </button>
                ))
              )}
            </div>

            {/* Bottom Section */}
            <div className="px-4 pb-4 border-t border-slate-100 pt-4 space-y-1">
              <ModelSelector selected={selectedModel} onSelect={onSelectModel} />

              <div className="mt-3 space-y-1">
                <button className="w-full flex items-center justify-between px-3 py-2.5 rounded-2xl text-sm font-bold text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-all">
                  <div className="flex items-center gap-3">
                    <Grid3X3 className="w-4 h-4 text-slate-400" strokeWidth={1.5} />
                    Apps
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
                </button>
                <Link
                  to="/notebooks"
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-2xl text-sm font-bold text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <BookOpen className="w-4 h-4 text-slate-400" strokeWidth={1.5} />
                    Notebooks
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
                </Link>
                <Link
                  to="/dashboard"
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-2xl text-sm font-bold text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <LayoutDashboard className="w-4 h-4 text-slate-400" strokeWidth={1.5} />
                    Back to Dashboard
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
                </Link>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Mobile Backdrop */}
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
  selectedModel,
  isStarred,
  onToggleStar,
}: {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  selectedModel: ModelOption;
  isStarred: boolean;
  onToggleStar: () => void;
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
        {/* Sidebar Toggle */}
        <button
          onClick={toggleSidebar}
          className="w-9 h-9 rounded-xl bg-slate-900 flex items-center justify-center text-white hover:bg-black transition-all shadow-sm shrink-0"
        >
          <Menu className="w-4 h-4" />
        </button>

        {/* Model Pill */}
        <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl">
          <span className={`w-2 h-2 rounded-full shrink-0 ${selectedModel.color}`} />
          <span className="text-xs font-bold text-slate-700">{selectedModel.name}</span>
        </div>
      </div>

      {/* Star */}
      <button
        onClick={onToggleStar}
        className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
          isStarred
            ? 'bg-slate-900 text-white'
            : 'bg-slate-50 text-slate-400 hover:text-slate-900 hover:bg-slate-100'
        }`}
      >
        <Star className="w-4 h-4" fill={isStarred ? 'currentColor' : 'none'} />
      </button>
    </nav>
  </header>
);

// ─── Message Bubble ────────────────────────────────────────────────────────────

const MessageBubble = ({ message }: { message: Message }) => {
  const isUser = message.role === 'user';
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      {!isUser && (
        <div className="w-8 h-8 rounded-xl bg-slate-950 flex items-center justify-center shrink-0">
          <Brain className="w-4 h-4 text-white" strokeWidth={1.5} />
        </div>
      )}
      <div
        className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm font-medium leading-relaxed ${
          isUser
            ? 'bg-slate-900 text-white rounded-br-md'
            : 'bg-white border border-slate-100 text-slate-900 rounded-bl-md shadow-sm'
        }`}
      >
        {message.content}
      </div>
      {isUser && (
        <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
          <User className="w-4 h-4 text-slate-600" strokeWidth={1.5} />
        </div>
      )}
    </motion.div>
  );
};

// ─── Typing Indicator ──────────────────────────────────────────────────────────

const TypingIndicator = () => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0 }}
    className="flex gap-3 justify-start"
  >
    <div className="w-8 h-8 rounded-xl bg-slate-950 flex items-center justify-center shrink-0">
      <Brain className="w-4 h-4 text-white" strokeWidth={1.5} />
    </div>
    <div className="bg-white border border-slate-100 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm flex items-center gap-1">
      {[0, 1, 2].map(i => (
        <motion.div
          key={i}
          className="w-1.5 h-1.5 bg-slate-400 rounded-full"
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </div>
  </motion.div>
);

// ─── Welcome State ─────────────────────────────────────────────────────────────

const WelcomeScreen = ({
  onQuickAction,
  selectedModel,
}: {
  onQuickAction: (prompt: string) => void;
  selectedModel: ModelOption;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    className="flex flex-col items-center justify-center flex-1 px-6 py-12"
  >
    {/* Icon */}
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.1, type: 'spring', damping: 15 }}
      className="w-16 h-16 rounded-2xl bg-slate-950 flex items-center justify-center mb-8 shadow-xl shadow-slate-200"
    >
      <Sparkles className="w-8 h-8 text-white" strokeWidth={1.2} />
    </motion.div>

    {/* Title */}
    <h1 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 mb-3 text-center">
      How can I help you today?
    </h1>
    <p className="text-sm text-slate-400 font-medium text-center max-w-xs mb-10 leading-relaxed">
      Ask me anything about your projects, code, or generate new ideas.
    </p>

    {/* Current model badge */}
    <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-200 rounded-2xl mb-10">
      <span className={`w-2 h-2 rounded-full shrink-0 ${selectedModel.color}`} />
      <span className="text-xs font-bold text-slate-600">Powered by {selectedModel.desc}</span>
    </div>

    {/* Quick Actions */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg">
      {QUICK_ACTIONS.map((action, i) => (
        <motion.button
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 + i * 0.07 }}
          onClick={() => onQuickAction(action.prompt)}
          className="flex items-center gap-3 px-5 py-4 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 hover:bg-slate-50 hover:border-slate-300 hover:text-slate-900 transition-all text-left group shadow-sm"
        >
          <action.icon className="w-4 h-4 text-slate-400 group-hover:text-slate-700 shrink-0 transition-colors" strokeWidth={1.5} />
          {action.label}
        </motion.button>
      ))}
    </div>
  </motion.div>
);

// ─── Main Page ─────────────────────────────────────────────────────────────────

const AIAssistant = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [chats, setChats] = useState<Chat[]>([
    { id: '1', title: 'New Chat', messageCount: 0, createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) },
  ]);
  const [activeChatId, setActiveChatId] = useState<string | null>('1');
  const [messages, setMessages] = useState<Record<string, Message[]>>({ '1': [] });
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedModel, setSelectedModel] = useState<ModelOption>(MODELS[0]);
  const [isStarred, setIsStarred] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const activeMessages = activeChatId ? (messages[activeChatId] ?? []) : [];
  const hasMessages = activeMessages.length > 0;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeMessages, isTyping]);

  const createNewChat = () => {
    const id = Date.now().toString();
    const chat: Chat = { id, title: 'New Chat', messageCount: 0, createdAt: new Date() };
    setChats(prev => [chat, ...prev]);
    setMessages(prev => ({ ...prev, [id]: [] }));
    setActiveChatId(id);
    setInputValue('');
  };

  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || !activeChatId) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: trimmed,
      createdAt: new Date(),
    };

    // Update messages
    setMessages(prev => ({
      ...prev,
      [activeChatId]: [...(prev[activeChatId] ?? []), userMsg],
    }));

    // Update chat title if first message
    setChats(prev =>
      prev.map(c =>
        c.id === activeChatId
          ? { ...c, title: trimmed.slice(0, 36) + (trimmed.length > 36 ? '...' : ''), messageCount: c.messageCount + 1 }
          : c
      )
    );

    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    await new Promise(r => setTimeout(r, 1200 + Math.random() * 800));

    const aiResponses = [
      `I've received your message. This is a demonstration of the NovaSpace AI Assistant using the ${selectedModel.name} model (${selectedModel.desc}). In the full implementation, this would connect to the AI backend and provide intelligent responses.`,
      `Great question! The ${selectedModel.name} model is processing your request. Here's what I can help you with: analyzing your projects, generating content, debugging code, summarizing documents, and much more. What would you like to explore?`,
      `I'm Nova AI, your intelligent workspace assistant powered by ${selectedModel.desc}. I can help you with project management, code review, content creation, and real-time collaboration insights.`,
    ];

    const aiMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: aiResponses[Math.floor(Math.random() * aiResponses.length)],
      createdAt: new Date(),
    };

    setIsTyping(false);
    setMessages(prev => ({
      ...prev,
      [activeChatId]: [...(prev[activeChatId] ?? []), aiMsg],
    }));
    setChats(prev =>
      prev.map(c =>
        c.id === activeChatId ? { ...c, messageCount: c.messageCount + 1 } : c
      )
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputValue);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] font-sans flex">
      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        toggle={() => setIsSidebarOpen(!isSidebarOpen)}
        chats={chats}
        activeChatId={activeChatId}
        onNewChat={createNewChat}
        onSelectChat={id => setActiveChatId(id)}
        selectedModel={selectedModel}
        onSelectModel={setSelectedModel}
      />

      {/* Main */}
      <div
        className={`flex-1 flex flex-col transition-all duration-500 ${
          isSidebarOpen ? 'lg:ml-64' : 'ml-0'
        }`}
      >
        {/* Header */}
        <AppHeader
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          selectedModel={selectedModel}
          isStarred={isStarred}
          onToggleStar={() => setIsStarred(!isStarred)}
        />

        {/* Chat Area */}
        <div className="flex-1 flex flex-col pt-24 md:pt-28 pb-0 min-h-0">
          <div className="flex-1 overflow-y-auto">
            <AnimatePresence mode="wait">
              {!hasMessages ? (
                <React.Fragment key="welcome">
                  <WelcomeScreen
                    onQuickAction={prompt => {
                      setInputValue(prompt);
                      inputRef.current?.focus();
                    }}
                    selectedModel={selectedModel}
                  />
                </React.Fragment>
              ) : (
                <motion.div
                  key="messages"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="max-w-3xl mx-auto px-4 md:px-8 py-8 space-y-6"
                >
                  {activeMessages.map(msg => (
                    <React.Fragment key={msg.id}>
                      <MessageBubble message={msg} />
                    </React.Fragment>
                  ))}
                  <AnimatePresence>
                    {isTyping && <TypingIndicator key="typing" />}
                  </AnimatePresence>
                  <div ref={messagesEndRef} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Input Bar */}
          <div className={`px-4 md:px-8 pb-6 pt-4 ${hasMessages ? 'border-t border-slate-100 bg-white/80 backdrop-blur-xl' : ''}`}>
            <div className="max-w-3xl mx-auto">
              <div className="relative bg-white border border-slate-200 rounded-[1.5rem] shadow-sm hover:border-slate-300 hover:shadow-md transition-all focus-within:border-slate-400 focus-within:shadow-md">
                <textarea
                  ref={inputRef}
                  value={inputValue}
                  onChange={e => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={`Message ${selectedModel.name}...`}
                  rows={1}
                  className="w-full px-5 pt-4 pb-12 bg-transparent resize-none text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none leading-relaxed"
                  style={{ minHeight: '56px', maxHeight: '180px' }}
                />
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                  <button className="w-8 h-8 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-50 transition-all">
                    <Paperclip className="w-4 h-4" strokeWidth={1.5} />
                  </button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => sendMessage(inputValue)}
                    disabled={!inputValue.trim() || isTyping}
                    className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${
                      inputValue.trim() && !isTyping
                        ? 'bg-slate-900 text-white hover:bg-black shadow-sm'
                        : 'bg-slate-100 text-slate-300 cursor-not-allowed'
                    }`}
                  >
                    {isTyping ? (
                      <Zap className="w-3.5 h-3.5 animate-pulse" />
                    ) : (
                      <Send className="w-3.5 h-3.5" strokeWidth={2} />
                    )}
                  </motion.button>
                </div>
              </div>
              <p className="text-center text-[10px] text-slate-400 font-medium mt-3">
                Nova AI can make mistakes. Consider checking important information.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
