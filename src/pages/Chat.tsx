import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MessageCircle,
  Search,
  UserPlus,
  RefreshCw,
  Users,
  Send,
  Paperclip,
  LayoutDashboard,
  CheckSquare,
  FolderKanban,
  Calendar,
  Layers,
  Menu,
  ChevronLeft,
  LogOut,
  Circle,
  Brain,
  Video,
  MessageSquare,
  ArrowLeft,
} from 'lucide-react';
import { Link } from 'react-router-dom';

// ─── Types ────────────────────────────────────────────────────────────────────

interface Friend {
  id: string;
  name: string;
  email: string;
  avatar: string;
  online: boolean;
  lastMessage?: string;
  unread?: number;
}

interface Message {
  id: string;
  senderId: string;
  text: string;
  time: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const CURRENT_USER = {
  id: 'me',
  name: 'Henry',
  email: 'henricobb2@gmail.com',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Henry',
};

// ─── Nav Sidebar (app-level) ──────────────────────────────────────────────────

const NavSidebar = ({ isOpen, toggle }: { isOpen: boolean; toggle: () => void }) => {
  const nav = [
    { name: 'Dashboard',      icon: LayoutDashboard, to: '/dashboard' },
    { name: 'Tasks',          icon: CheckSquare,     to: '/tasks' },
    { name: 'Projects',       icon: FolderKanban,    to: '/projects' },
    { name: 'Teams',          icon: Users,           to: '/teams' },
    { name: 'Team WorkSpace', icon: Layers,          to: '/team-workspace' },
    { name: 'Calendar',       icon: Calendar,        to: '/calendar' },
    { name: 'Meetings',       icon: Video,           to: '/meetings' },
    { name: 'Chat',           icon: MessageSquare,   to: '/chat', active: true },
  ];

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: -256 }}
            animate={{ x: 0 }}
            exit={{ x: -256 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-slate-100 flex flex-col p-5 z-[200] shadow-2xl"
          >
            <div className="flex items-center justify-between mb-8 px-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-slate-950 flex items-center justify-center shrink-0">
                  <Brain className="w-4 h-4 text-white" strokeWidth={1.5} />
                </div>
                <div>
                  <h2 className="font-serif text-base font-bold text-slate-950 leading-tight">NovaSpace</h2>
                  <p className="text-[9px] font-bold text-slate-400 tracking-wider uppercase">Chat</p>
                </div>
              </div>
              <button
                onClick={toggle}
                className="w-7 h-7 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 hover:text-slate-950 transition-colors"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
            </div>

            <p className="text-[9px] font-bold text-slate-400 tracking-widest uppercase px-3 mb-3">Navigation</p>
            <nav className="space-y-1 overflow-y-auto flex-1">
              {nav.map((item, i) => (
                <Link
                  key={i}
                  to={item.to}
                  onClick={toggle}
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
              ))}
            </nav>
          </motion.aside>
        )}
      </AnimatePresence>

      {isOpen && (
        <div
          onClick={toggle}
          className="fixed inset-0 bg-slate-950/20 backdrop-blur-sm z-[150]"
        />
      )}
    </>
  );
};

// ─── App Header ───────────────────────────────────────────────────────────────

const AppHeader = ({ toggleNav }: { toggleNav: () => void }) => (
  <header className="fixed top-3 sm:top-4 md:top-6 left-0 right-0 z-[100] px-3 sm:px-4 md:px-6 flex justify-center pointer-events-none">
    <nav className="w-full max-w-6xl backdrop-blur-xl bg-white/80 border border-white/40 rounded-2xl sm:rounded-[2rem] px-3 sm:px-5 py-2.5 sm:py-3 flex items-center justify-between shadow-[0_8px_32px_rgba(0,0,0,0.06)] ring-1 ring-slate-900/5 pointer-events-auto">

      {/* Left */}
      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
        <button
          onClick={toggleNav}
          className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-slate-900 flex items-center justify-center text-white hover:bg-black transition-all shadow-sm shrink-0"
        >
          <Menu className="w-4 h-4" />
        </button>
        <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-slate-950 flex items-center justify-center shrink-0">
            <MessageCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" strokeWidth={1.5} />
          </div>
          <span className="font-bold text-xs sm:text-sm text-slate-900 leading-tight">NovaTech Chat</span>
        </div>
      </div>

      {/* Center search — md+ only */}
      <div className="hidden md:flex flex-1 max-w-xs mx-6 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
        <input
          type="text"
          placeholder="Search friends..."
          className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-100 text-xs font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all"
        />
      </div>

      {/* Right */}
      <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
        {/* Active badge — sm+ */}
        <div className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slate-50 border border-slate-100">
          <Circle className="w-2 h-2 fill-emerald-400 text-emerald-400" />
          <span className="text-[9px] sm:text-[10px] font-bold text-slate-600">Active</span>
        </div>

        {/* Avatar pill */}
        <div className="flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-2xl bg-slate-50 border border-slate-100">
          <img
            src={CURRENT_USER.avatar}
            alt={CURRENT_USER.name}
            className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg border border-slate-200 shrink-0"
          />
          <div className="hidden md:block min-w-0">
            <p className="text-[10px] font-bold text-slate-900 leading-tight truncate max-w-[120px]">{CURRENT_USER.email}</p>
            <div className="flex items-center gap-1">
              <Circle className="w-1.5 h-1.5 fill-emerald-400 text-emerald-400" />
              <span className="text-[9px] font-bold text-emerald-500">Online</span>
            </div>
          </div>
        </div>

        {/* Logout */}
        <Link
          to="/login"
          className="flex items-center gap-1 px-2 sm:px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300 transition-all text-[10px] font-bold"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Logout</span>
        </Link>
      </div>
    </nav>
  </header>
);

// ─── Chat Panel Sidebar (friends list) ────────────────────────────────────────

const ChatSidebar = ({
  friends,
  selectedFriend,
  onSelectFriend,
  onAddFriend,
  onStartChat,
  className = '',
}: {
  friends: Friend[];
  selectedFriend: Friend | null;
  onSelectFriend: (f: Friend) => void;
  onAddFriend: (email: string) => void;
  onStartChat: (username: string) => void;
  className?: string;
}) => {
  const [chatInput, setChatInput] = useState('');
  const [addInput, setAddInput] = useState('');
  const [friendSearch, setFriendSearch] = useState('');

  const handleAdd = () => {
    if (addInput.trim()) { onAddFriend(addInput.trim()); setAddInput(''); }
  };
  const handleChat = () => {
    if (chatInput.trim()) { onStartChat(chatInput.trim()); setChatInput(''); }
  };

  const filtered = friends.filter(
    f => f.name.toLowerCase().includes(friendSearch.toLowerCase()) ||
         f.email.toLowerCase().includes(friendSearch.toLowerCase())
  );

  return (
    <aside className={`flex flex-col border-r border-slate-100 bg-white overflow-hidden ${className}`}>

      {/* NEW CHAT */}
      <div className="p-4 border-b border-slate-100 shrink-0">
        <p className="text-[9px] font-bold text-slate-400 tracking-widest uppercase mb-3 text-right">New Chat</p>
        <div className="space-y-2">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Username or email"
              value={chatInput}
              onChange={e => setChatInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleChat()}
              className="flex-1 min-w-0 px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 bg-slate-50 transition-all"
            />
            <button
              onClick={handleChat}
              className="flex items-center gap-1 px-3 py-2.5 rounded-xl bg-slate-900 text-white text-[10px] font-bold hover:bg-black transition-all shrink-0"
            >
              <MessageCircle className="w-3 h-3" />
              Chat
            </button>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Add friend..."
              value={addInput}
              onChange={e => setAddInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleAdd()}
              className="flex-1 min-w-0 px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 bg-slate-50 transition-all"
            />
            <button
              onClick={handleAdd}
              className="flex items-center gap-1 px-3 py-2.5 rounded-xl bg-slate-900 text-white text-[10px] font-bold hover:bg-black transition-all shrink-0"
            >
              <UserPlus className="w-3 h-3" />
              Add
            </button>
          </div>
        </div>
      </div>

      {/* FRIEND REQUESTS */}
      <div className="p-4 border-b border-slate-100 shrink-0">
        <div className="flex items-center justify-between mb-2">
          <p className="text-[9px] font-bold text-slate-400 tracking-widest uppercase">Friend Requests</p>
          <button className="w-5 h-5 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors">
            <RefreshCw className="w-3 h-3" />
          </button>
        </div>
        <p className="text-xs text-slate-400 font-medium text-center py-2">No pending requests</p>
      </div>

      {/* ACTIVE FRIENDS */}
      <div className="flex-1 flex flex-col p-4 overflow-hidden">
        <div className="flex items-center justify-between mb-3 shrink-0">
          <div className="flex items-center gap-1.5">
            <Users className="w-3 h-3 text-slate-400" />
            <p className="text-[9px] font-bold text-slate-400 tracking-widest uppercase">Active Friends</p>
          </div>
          <button className="w-5 h-5 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors">
            <RefreshCw className="w-3 h-3" />
          </button>
        </div>

        {friends.length === 0 ? (
          <div className="flex flex-col items-center justify-center flex-1 text-center py-8">
            <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center mb-3">
              <Users className="w-5 h-5 text-slate-300" strokeWidth={1.5} />
            </div>
            <p className="text-xs text-slate-400 font-medium">No friends yet</p>
            <p className="text-[10px] text-slate-300 font-medium mt-1">Add a friend above to get started</p>
          </div>
        ) : (
          <>
            <div className="relative mb-3 shrink-0">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-400" />
              <input
                type="text"
                placeholder="Search friends..."
                value={friendSearch}
                onChange={e => setFriendSearch(e.target.value)}
                className="w-full pl-7 pr-3 py-2 rounded-xl border border-slate-200 text-[10px] font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-900 bg-slate-50 transition-all"
              />
            </div>
            <div className="flex-1 overflow-y-auto space-y-1">
              <AnimatePresence>
                {filtered.map(friend => (
                  <motion.button
                    key={friend.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={() => onSelectFriend(friend)}
                    className={`w-full flex items-center gap-3 p-3 rounded-2xl transition-all text-left ${
                      selectedFriend?.id === friend.id
                        ? 'bg-slate-900 text-white'
                        : 'hover:bg-slate-50 text-slate-900'
                    }`}
                  >
                    <div className="relative shrink-0">
                      <img src={friend.avatar} alt={friend.name} className="w-9 h-9 rounded-xl border border-slate-100" />
                      {friend.online && (
                        <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-white" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-xs font-bold truncate ${selectedFriend?.id === friend.id ? 'text-white' : 'text-slate-900'}`}>
                        {friend.name}
                      </p>
                      {friend.lastMessage && (
                        <p className="text-[10px] text-slate-400 truncate">{friend.lastMessage}</p>
                      )}
                    </div>
                    {friend.unread && friend.unread > 0 && (
                      <span className="shrink-0 w-4 h-4 rounded-full bg-slate-900 text-white text-[8px] font-bold flex items-center justify-center">
                        {friend.unread}
                      </span>
                    )}
                  </motion.button>
                ))}
              </AnimatePresence>
            </div>
          </>
        )}
      </div>
    </aside>
  );
};

// ─── Empty State ──────────────────────────────────────────────────────────────

const EmptyState = () => (
  <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', damping: 20, stiffness: 200 }}
      className="flex flex-col items-center max-w-xs"
    >
      <div className="w-16 h-16 rounded-[1.5rem] bg-slate-100 flex items-center justify-center mb-6 shadow-inner">
        <MessageSquare className="w-8 h-8 text-slate-400" strokeWidth={1.2} />
      </div>
      <h2 className="font-serif text-2xl font-bold text-slate-900 mb-2">Welcome to NovaTech Chat</h2>
      <p className="text-sm text-slate-400 font-medium leading-relaxed">
        Select a friend from the sidebar to start messaging
      </p>
    </motion.div>
  </div>
);

// ─── Chat Window ──────────────────────────────────────────────────────────────

const ChatWindow = ({
  friend,
  messages,
  onSend,
  onBack,
}: {
  friend: Friend;
  messages: Message[];
  onSend: (text: string) => void;
  onBack?: () => void; // mobile only
}) => {
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (input.trim()) { onSend(input.trim()); setInput(''); }
  };

  return (
    <div className="flex-1 flex flex-col min-h-0">
      {/* Chat header */}
      <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-slate-100 flex items-center gap-3 bg-white/80 backdrop-blur-sm shrink-0">
        {/* Back button — mobile only */}
        {onBack && (
          <button
            onClick={onBack}
            className="md:hidden w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-all shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
        )}
        <div className="relative shrink-0">
          <img src={friend.avatar} alt={friend.name} className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl border border-slate-100" />
          {friend.online && (
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-400 border-2 border-white" />
          )}
        </div>
        <div>
          <p className="text-sm font-bold text-slate-900">{friend.name}</p>
          <p className="text-[10px] font-medium text-emerald-500">{friend.online ? 'Online' : 'Offline'}</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3 sm:space-y-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center mb-4">
              <MessageCircle className="w-6 h-6 text-slate-300" />
            </div>
            <p className="text-sm font-bold text-slate-900 mb-1">Say hi to {friend.name}!</p>
            <p className="text-xs text-slate-400 font-medium">Send a message to start the conversation</p>
          </div>
        ) : (
          messages.map(msg => {
            const isMe = msg.senderId === 'me';
            return (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex items-end gap-2 ${isMe ? 'flex-row-reverse' : ''}`}
              >
                {!isMe && (
                  <img src={friend.avatar} alt={friend.name} className="w-7 h-7 rounded-xl border border-slate-100 shrink-0" />
                )}
                <div
                  className={`max-w-[80%] sm:max-w-[72%] px-4 py-2.5 rounded-2xl text-sm font-medium ${
                    isMe
                      ? 'bg-slate-900 text-white rounded-br-sm'
                      : 'bg-white border border-slate-100 text-slate-900 rounded-bl-sm shadow-sm'
                  }`}
                >
                  {msg.text}
                  <p className={`text-[9px] font-bold mt-1 ${isMe ? 'text-slate-400 text-right' : 'text-slate-400'}`}>
                    {msg.time}
                  </p>
                </div>
              </motion.div>
            );
          })
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input bar */}
      <div className="px-3 sm:px-4 py-3 sm:py-4 border-t border-slate-100 bg-white/80 backdrop-blur-sm shrink-0">
        <div className="flex items-center gap-2 sm:gap-3 bg-slate-50 border border-slate-200 rounded-2xl px-3 sm:px-4 py-2.5 sm:py-3 focus-within:ring-2 focus-within:ring-slate-900 focus-within:border-transparent transition-all">
          <button className="text-slate-400 hover:text-slate-900 transition-colors shrink-0">
            <Paperclip className="w-4 h-4" />
          </button>
          <input
            type="text"
            placeholder="Type a message..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            className="flex-1 bg-transparent text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none min-w-0"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="w-8 h-8 rounded-xl bg-slate-900 flex items-center justify-center text-white hover:bg-black transition-all disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Page ─────────────────────────────────────────────────────────────────────

const ChatPage = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [friends] = useState<Friend[]>([]);
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);
  const [conversations, setConversations] = useState<Record<string, Message[]>>({});
  const [notifications, setNotifications] = useState<string[]>([]);

  const notify = (msg: string) => {
    setNotifications(p => [...p, msg]);
    setTimeout(() => setNotifications(p => p.slice(1)), 3000);
  };

  const handleSendMessage = (text: string) => {
    if (!selectedFriend) return;
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const msg: Message = { id: Date.now().toString(), senderId: 'me', text, time: timeStr };
    setConversations(prev => ({
      ...prev,
      [selectedFriend.id]: [...(prev[selectedFriend.id] ?? []), msg],
    }));
  };

  // On mobile: show sidebar OR chat window (not both)
  // On desktop (md+): always show both
  const showChatSidebar = !selectedFriend; // mobile: hide sidebar when chat is open

  return (
    <div className="h-screen bg-[#FDFDFD] font-sans flex flex-col overflow-hidden">
      {/* App nav sidebar */}
      <NavSidebar isOpen={isNavOpen} toggle={() => setIsNavOpen(o => !o)} />

      {/* Floating header */}
      <AppHeader toggleNav={() => setIsNavOpen(o => !o)} />

      {/* Toast */}
      <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-[300] space-y-2 pointer-events-none">
        <AnimatePresence>
          {notifications.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.95 }}
              className="bg-slate-900 text-white text-xs font-bold px-4 py-3 rounded-2xl shadow-xl"
            >
              {msg}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/*
        Main layout — below the header.
        Header height: ~56px mobile, ~68px desktop
        We push content down with pt on the wrapper.
      */}
      <div className="flex flex-1 min-h-0 pt-[56px] sm:pt-[64px] md:pt-[76px]">

        {/*
          MOBILE: Show either the sidebar (friends list) or the chat window.
          DESKTOP (md+): Show both side by side.
        */}

        {/* Chat sidebar — always visible on md+, only visible on mobile when no friend selected */}
        <ChatSidebar
          friends={friends}
          selectedFriend={selectedFriend}
          onSelectFriend={f => setSelectedFriend(f)}
          onAddFriend={email => notify(`Friend request sent to "${email}"`)}
          onStartChat={u => notify(`Looking for "${u}"...`)}
          className={`
            flex-shrink-0
            md:w-64 md:block
            ${showChatSidebar ? 'flex w-full' : 'hidden md:flex'}
          `}
        />

        {/* Chat area — full width on mobile when friend selected, flex-1 on desktop */}
        <div className={`
          flex-1 flex flex-col min-w-0 bg-slate-50/40
          ${!showChatSidebar ? 'flex' : 'hidden md:flex'}
        `}>
          {selectedFriend ? (
            <ChatWindow
              friend={selectedFriend}
              messages={conversations[selectedFriend.id] ?? []}
              onSend={handleSendMessage}
              onBack={() => setSelectedFriend(null)}
            />
          ) : (
            <EmptyState />
          )}
        </div>

      </div>
    </div>
  );
};

export default ChatPage;
