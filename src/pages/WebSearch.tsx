import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  ArrowLeft,
  ExternalLink,
  Clock,
  X,
  Loader2,
  Globe,
  ArrowRight
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const QUICK_SEARCHES = [
  'Latest AI news 2026',
  'Vue 3 best practices',
  'Spring Boot REST API',
  'Open source tools',
  'Remote work productivity',
];

// Simulated search results (would connect to Google Custom Search API in production)
const simulateResults = (query: string) => [
  {
    title: `${query} — Wikipedia`,
    url: `https://en.wikipedia.org/wiki/${encodeURIComponent(query)}`,
    description: `Wikipedia article covering ${query}. A comprehensive overview with history, context and related topics.`,
    domain: 'en.wikipedia.org',
  },
  {
    title: `${query} - A Practical Guide`,
    url: `https://dev.to/search?q=${encodeURIComponent(query)}`,
    description: `Developer community articles on ${query}. Tutorials, tips and community discussions from experienced practitioners.`,
    domain: 'dev.to',
  },
  {
    title: `Mastering ${query} in 2026`,
    url: `https://medium.com/search?q=${encodeURIComponent(query)}`,
    description: `Medium articles covering ${query} with in-depth analysis, case studies and expert opinions for professionals.`,
    domain: 'medium.com',
  },
  {
    title: `${query} - Official Documentation`,
    url: `https://docs.google.com/search?q=${encodeURIComponent(query)}`,
    description: `Official documentation and guides for ${query}. Reference material, API docs, and getting started guides.`,
    domain: 'docs.google.com',
  },
  {
    title: `Best ${query} Resources & Tools`,
    url: `https://github.com/search?q=${encodeURIComponent(query)}`,
    description: `GitHub repositories related to ${query}. Open source projects, libraries, and community-maintained resources.`,
    domain: 'github.com',
  },
];

const WebSearch = () => {
  const [query, setQuery] = useState('');
  const [submittedQuery, setSubmittedQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<ReturnType<typeof simulateResults>>([]);
  const [history, setHistory] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSearch = (searchQuery: string = query) => {
    const q = searchQuery.trim();
    if (!q) return;
    setSubmittedQuery(q);
    setQuery(q);
    setIsLoading(true);
    setResults([]);
    setHistory(prev => [q, ...prev.filter(h => h !== q)].slice(0, 5));
    // Simulate API delay
    setTimeout(() => {
      setResults(simulateResults(q));
      setIsLoading(false);
    }, 900);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch();
  };

  const clearSearch = () => {
    setQuery('');
    setSubmittedQuery('');
    setResults([]);
    inputRef.current?.focus();
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] font-sans text-slate-900">

      {/* Floating glassmorphism header — matches Dashboard & Navbar */}
      <div className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-[100] w-full max-w-[calc(100%-32px)] md:max-w-4xl pointer-events-none">
        <div className="backdrop-blur-xl bg-white/70 border border-white/40 rounded-3xl md:rounded-[2rem] px-4 md:px-8 py-2.5 md:py-4 flex items-center gap-3 md:gap-6 shadow-[0_8px_32px_rgba(0,0,0,0.06)] pointer-events-auto ring-1 ring-slate-900/5">

          {/* Back button */}
          <Link
            to="/dashboard"
            className="shrink-0 flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors p-1.5 md:px-3 md:py-2 rounded-xl hover:bg-white/60"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back to Apps</span>
          </Link>

          <div className="hidden sm:block w-px h-5 bg-slate-200/60" />

          {/* Title block */}
          <div className="flex-1 flex items-center gap-3">
            <div className="w-8 h-8 shrink-0 rounded-xl bg-white/80 border border-slate-100 flex items-center justify-center shadow-sm">
              <Search className="w-3.5 h-3.5 text-slate-900" strokeWidth={2} />
            </div>
            <div className="min-w-0">
              <h1 className="font-serif text-sm md:text-base font-bold text-slate-900 leading-tight">Web Search</h1>
              <p className="hidden sm:block text-[9px] font-bold text-slate-400 tracking-wider uppercase">Powered by Google Custom Search</p>
            </div>
          </div>

          {/* Google colour dots */}
          <div className="flex items-center gap-1 md:gap-1.5 shrink-0">
            <div className="w-2.5 h-2.5 rounded-full bg-[#EA4335]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#FBBC05]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#4285F4]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#34A853]" />
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-5xl mx-auto px-4 md:px-6 pt-28 md:pt-32 pb-12">

        {/* Search input — stacks on mobile */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1 group">
              <Search className="absolute left-4 md:left-5 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-slate-400 group-focus-within:text-slate-900 transition-colors" strokeWidth={2} />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search the web..."
                className="w-full pl-11 md:pl-14 pr-10 py-4 md:py-5 bg-white border border-slate-200 rounded-[2rem] text-slate-900 font-sans font-medium text-sm md:text-base placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent shadow-sm transition-all"
              />
              {query && (
                <button
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center text-slate-300 hover:text-slate-900 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <button
              onClick={() => handleSearch()}
              className="bg-slate-900 text-white px-6 py-4 rounded-2xl font-bold text-sm hover:bg-black transition-all flex items-center justify-center gap-2 shadow-sm shrink-0"
            >
              Search <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* No search yet — show quick searches */}
        <AnimatePresence mode="wait">
          {!submittedQuery && !isLoading && (
            <motion.div
              key="suggestions"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm">
                <p className="font-bold text-[10px] tracking-widest uppercase text-slate-400 mb-6">Try a quick search</p>
                <div className="flex flex-wrap gap-3">
                  {QUICK_SEARCHES.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => handleSearch(s)}
                      className="px-5 py-2.5 rounded-full border border-slate-100 bg-slate-50 text-slate-900 text-sm font-bold hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Recent searches */}
              {history.length > 0 && (
                <div className="mt-8">
                  <p className="font-bold text-[10px] tracking-widest uppercase text-slate-400 mb-4 px-2">Recent</p>
                  <div className="space-y-2">
                    {history.map((h, i) => (
                      <button
                        key={i}
                        onClick={() => handleSearch(h)}
                        className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl bg-white border border-slate-100 hover:border-slate-900 text-slate-900 font-medium text-sm transition-all group text-left"
                      >
                        <Clock className="w-4 h-4 text-slate-300 group-hover:text-slate-900 transition-colors shrink-0" />
                        {h}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* Loading state */}
          {isLoading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-32"
            >
              <Loader2 className="w-8 h-8 text-slate-300 animate-spin mb-4" />
              <p className="text-slate-400 font-bold text-sm">Searching the web…</p>
            </motion.div>
          )}

          {/* Results */}
          {submittedQuery && !isLoading && results.length > 0 && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              {/* Results meta bar */}
              <div className="flex items-center justify-between mb-6 px-1">
                <p className="text-sm text-slate-400 font-medium">
                  Results for <span className="font-bold text-slate-900">"{submittedQuery}"</span>
                </p>
                <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">{results.length} results</p>
              </div>

              {/* Result cards */}
              <div className="space-y-4">
                {results.map((result, i) => (
                  <motion.a
                    key={i}
                    href={result.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07 }}
                    className="group block bg-white border border-slate-100 rounded-[2rem] p-6 md:p-8 hover:border-slate-900 hover:shadow-xl hover:shadow-slate-100/50 transition-all duration-300"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        {/* Domain breadcrumb */}
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-5 h-5 rounded bg-slate-50 border border-slate-100 flex items-center justify-center">
                            <Globe className="w-3 h-3 text-slate-400" />
                          </div>
                          <span className="text-[11px] font-bold text-slate-400 truncate">{result.domain}</span>
                        </div>
                        {/* Title */}
                        <h3 className="font-serif font-bold text-xl text-slate-900 group-hover:text-black mb-3 leading-tight">
                          {result.title}
                        </h3>
                        {/* Description */}
                        <p className="text-sm text-slate-500 leading-relaxed font-medium line-clamp-2">{result.description}</p>
                      </div>
                      <div className="shrink-0 w-10 h-10 rounded-xl border border-slate-100 flex items-center justify-center text-slate-300 group-hover:text-slate-900 group-hover:border-slate-900 group-hover:bg-slate-900 transition-all">
                        <ExternalLink className="w-4 h-4 group-hover:text-white transition-colors" />
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* More results nudge */}
              <div className="mt-10 text-center">
                <p className="text-sm text-slate-400 font-medium mb-4">Want more precise results?</p>
                <a
                  href={`https://www.google.com/search?q=${encodeURIComponent(submittedQuery)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-slate-900 text-white font-bold text-sm hover:bg-black transition-all"
                >
                  Open in Google <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default WebSearch;
