import React from 'react';
import { motion } from 'motion/react';
import { 
  Github, 
  Linkedin, 
  Twitter,
  Youtube,
  Mail, 
  Brain, 
  Rocket, 
  MessageSquare,
  Video,
  FileText,
  Code,
  Layout,
  Calendar,
  Globe,
  Database,
  Search,
  Users,
  Folder,
  CheckCircle2,
  ArrowRight,
  Monitor,
  Zap,
  Lock,
  MessageCircle,
  Layers,
  Sparkles,
  PlayCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';

// Reuse the SectionHeader pattern from SKILL.md
const SectionHeader = ({ badge, title, description, centered = true }: any) => (
  <div className={`mb-16 ${centered ? 'text-center flex flex-col items-center' : ''}`}>
    <motion.span 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="inline-flex items-center justify-center px-4 py-1 rounded-full bg-slate-50 text-slate-500 font-bold text-[10px] tracking-widest uppercase mb-6 border border-slate-100"
    >
      {badge}
    </motion.span>
    <h2 className="font-serif text-4xl md:text-5xl font-bold text-slate-900 mb-6 max-w-3xl leading-[1.1]">
      {title}
    </h2>
    <p className="text-lg text-slate-500 max-w-2xl leading-relaxed font-sans">
      {description}
    </p>
  </div>
);

const AboutHero = () => (
  <section className="max-w-7xl mx-auto px-6 md:px-8 pt-28 md:pt-40 pb-12 md:pb-20 relative overflow-hidden">
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
      {/* Orbital — smaller on mobile, hidden below sm */}
      <div className="lg:col-span-4 flex justify-center">
        <div className="relative group flex items-center justify-center w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 xl:w-96 xl:h-96">

          {/* Outer decorative ring */}
          <div className="absolute inset-0 rounded-full border-2 border-dashed border-slate-200 animate-[spin_40s_linear_infinite]" />
          {/* Mid ring */}
          <div className="absolute inset-6 rounded-full border border-slate-100" />

          {/* Central icon container */}
          <div className="relative z-10 w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 rounded-full bg-slate-50 border-2 border-slate-100 shadow-2xl shadow-slate-100 flex items-center justify-center group-hover:scale-105 transition-transform duration-700">
            <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-2xl bg-slate-900 flex items-center justify-center shadow-xl">
              <Brain className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white" strokeWidth={1.2} />
            </div>
          </div>

          {/* Floating badge — top */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 z-20 bg-white border border-slate-100 shadow-lg rounded-2xl p-2 sm:p-3 animate-bounce" style={{ animationDuration: '3s' }}>
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-xl bg-slate-900 flex items-center justify-center">
              <Code className="w-3 h-3 sm:w-4 sm:h-4 text-white" strokeWidth={1.5} />
            </div>
          </div>

          {/* Floating badge — right */}
          <div className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white border border-slate-100 shadow-lg rounded-2xl p-2 sm:p-3 animate-bounce" style={{ animationDuration: '3.8s', animationDelay: '0.5s' }}>
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-xl bg-slate-900 flex items-center justify-center">
              <Video className="w-3 h-3 sm:w-4 sm:h-4 text-white" strokeWidth={1.5} />
            </div>
          </div>

          {/* Floating badge — bottom */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 bg-white border border-slate-100 shadow-lg rounded-2xl p-2 sm:p-3 animate-bounce" style={{ animationDuration: '4.2s', animationDelay: '1s' }}>
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-xl bg-slate-900 flex items-center justify-center">
              <MessageSquare className="w-3 h-3 sm:w-4 sm:h-4 text-white" strokeWidth={1.5} />
            </div>
          </div>

          {/* Floating badge — left */}
          <div className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white border border-slate-100 shadow-lg rounded-2xl p-2 sm:p-3 animate-bounce" style={{ animationDuration: '3.5s', animationDelay: '0.2s' }}>
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-xl bg-slate-900 flex items-center justify-center">
              <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-white" strokeWidth={1.5} />
            </div>
          </div>

        </div>
      </div>
      
      <div className="lg:col-span-8">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 text-slate-600 font-bold text-[10px] tracking-widest uppercase mb-6 border border-slate-100"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-slate-900 animate-pulse" />
          Open to opportunities
        </motion.div>
        
        <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl font-bold text-slate-900 mb-4 tracking-tight leading-tight">
          Chuks Ottih<span className="text-slate-400">.</span>
        </h1>
        
        <p className="text-base sm:text-xl md:text-2xl font-sans font-bold text-slate-900 mb-6 md:mb-8">
          Full-Stack Developer & Creator of NovaSpace
        </p>
        
        <p className="font-sans text-sm md:text-lg text-slate-600 mb-8 md:mb-10 max-w-2xl leading-relaxed">
          I build intelligent, human-centered software. NovaSpace is my flagship platform — an EdTech AI workspace designed to help teams collaborate, learn, and ship faster. I care deeply about clean architecture, great UX, and tools that actually make people's lives easier.
        </p>
        
        <div className="flex flex-col sm:flex-row flex-wrap sm:items-center gap-3">
          <button className="bg-slate-900 text-white px-6 md:px-8 py-3 md:py-4 rounded-2xl font-sans font-bold text-sm hover:bg-black transition-all flex items-center justify-center gap-2 shadow-xl shadow-slate-200">
            <Mail className="w-4 h-4" /> Get in touch
          </button>
          <button className="bg-white text-slate-900 border border-slate-200 px-6 md:px-8 py-3 md:py-4 rounded-2xl font-sans font-bold text-sm hover:bg-slate-50 transition-all flex items-center justify-center gap-2 shadow-sm">
            <Github className="w-4 h-4" /> GitHub
          </button>
          <button className="bg-white text-slate-900 border border-slate-200 px-6 md:px-8 py-3 md:py-4 rounded-2xl font-sans font-bold text-sm hover:bg-slate-50 transition-all flex items-center justify-center gap-2 shadow-sm">
            <Linkedin className="w-4 h-4" /> LinkedIn
          </button>
        </div>
      </div>
    </div>
  </section>
);

const StatsSection = () => (
  <section className="bg-white py-10 md:py-14 border-y border-slate-100">
    <div className="max-w-7xl mx-auto px-6 md:px-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12">
        {[
          { value: "30+", label: "ROUTES & VIEWS" },
          { value: "10+", label: "AI-POWERED TOOLS" },
          { value: "1", label: "PLATFORM, MANY POSSIBILITIES" },
          { value: "2026", label: "BUILT & SHIPPED" }
        ].map((stat, i) => (
          <div key={i} className="flex flex-col items-center md:items-start group">
            <span className="font-serif text-5xl md:text-6xl font-bold text-slate-950 mb-3 transition-transform cursor-default">{stat.value}</span>
            <div className="w-8 h-1 bg-slate-900 group-hover:w-full transition-all duration-500 mb-3" />
            <span className="font-sans text-[10px] font-bold text-slate-400 tracking-widest uppercase group-hover:text-slate-900 transition-colors">{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const WhatIsNovaSpace = () => (
  <section className="max-w-7xl mx-auto px-8 py-32">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
      <div>
        <span className="font-sans text-[10px] font-bold text-slate-500 tracking-widest uppercase mb-4 block">THE PROJECT</span>
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-slate-900 mb-8 leading-[1.1]">
          What is NovaSpace?
        </h2>
        
        <div className="font-sans space-y-6 text-slate-500 leading-relaxed text-lg mb-10">
          <p>
            NovaSpace is a full-stack EdTech AI platform I designed and built from scratch. It brings together project management, team collaboration, AI assistance, meetings, notebooks, and a suite of productivity apps — all under one roof.
          </p>
          <p>
            The goal was simple: give individuals and teams a single intelligent workspace that adapts to how they actually work — not the other way around.
          </p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            "AI Assistant", "Real-time Chat", "Video Meetings", 
            "Project Tracking", "Smart Notebooks", "Team Workspaces"
          ].map((tag, i) => (
            <span key={i} className="font-sans px-4 py-3 rounded-2xl border border-slate-100 bg-slate-50 text-slate-900 text-xs font-bold text-center hover:bg-slate-900 hover:text-white transition-all cursor-default">
              {tag}
            </span>
          ))}
        </div>
      </div>
      
      <div className="relative">
        <div className="bg-white rounded-[2.5rem] shadow-[0_32px_64px_rgba(30,41,59,0.06)] border border-slate-100 overflow-hidden transform hover:-translate-y-2 transition-transform duration-700">
          {/* Browser chrome bar */}
          <div className="bg-slate-50 border-b border-slate-100 px-4 py-3 flex items-center justify-between">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-200" />
              <div className="w-2.5 h-2.5 rounded-full bg-slate-200" />
              <div className="w-2.5 h-2.5 rounded-full bg-slate-200" />
            </div>
            <div className="font-sans bg-white border border-slate-200 rounded-lg px-3 py-1 text-[10px] text-slate-400 font-bold tracking-widest uppercase">NovaSpace Dashboard</div>
          </div>
          {/* Wireframe dashboard body */}
          <div className="p-5 bg-white space-y-4">
            {/* Top bar */}
            <div className="h-7 bg-slate-900 rounded-xl w-3/4" />
            {/* Two card row */}
            <div className="grid grid-cols-2 gap-3">
              <div className="h-16 bg-slate-100 rounded-2xl" />
              <div className="h-16 bg-slate-100 rounded-2xl" />
            </div>
            {/* Three card row */}
            <div className="grid grid-cols-3 gap-3">
              <div className="h-10 bg-slate-50 border border-slate-100 rounded-xl" />
              <div className="h-10 bg-slate-50 border border-slate-100 rounded-xl" />
              <div className="h-10 bg-slate-50 border border-slate-100 rounded-xl" />
            </div>
            {/* Wide bar */}
            <div className="h-4 bg-slate-100 rounded-full w-2/3" />
            <div className="h-4 bg-slate-50 rounded-full w-1/2" />
          </div>
        </div>
      </div>
    </div>
  </section>
);

const TechStack = () => (
  <section className="bg-slate-50 py-32 rounded-[4rem] mx-4 md:mx-8">
    <SectionHeader 
      badge="Tech Stack"
      title="Built with Modern Tools"
      description="Every part of NovaSpace was chosen deliberately — fast, scalable, and maintainable."
    />
    
    <div className="max-w-6xl mx-auto px-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
        {[
          { name: "Vue 3", sub: "Frontend", icon: Monitor },
          { name: "Vue Router", sub: "Routing", icon: Layers },
          { name: "JavaScript", sub: "Core", icon: Zap },
          { name: "Spring Boot", sub: "Backend", icon: Layout },
          { name: "Java", sub: "Language", icon: Code },
          { name: "REST API", sub: "Data Layer", icon: Database },
          { name: "JWT Auth", sub: "Auth", icon: Lock },
          { name: "WebRTC", sub: "Meetings", icon: Video },
          { name: "WebSockets", sub: "Real-time", icon: MessageCircle },
          { name: "PostgreSQL", sub: "Database", icon: Database }
        ].map((tech, i) => (
          <div key={i} className="bg-white border border-slate-100 rounded-[2rem] p-8 flex flex-col items-center text-center hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500 group">
            <div className={`w-14 h-14 rounded-2xl bg-white border border-slate-100 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-slate-900 transition-all shadow-sm`}>
              <tech.icon className="w-7 h-7 text-slate-900 group-hover:text-white" strokeWidth={1.2} />
            </div>
            <h4 className="font-serif font-bold text-sm text-slate-900 mb-1">{tech.name}</h4>
            <p className="font-sans text-[10px] text-slate-400 uppercase tracking-widest font-extrabold">{tech.sub}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const ToolsSection = () => (
  <section className="max-w-7xl mx-auto px-8 py-32">
    <SectionHeader 
      badge="What's Inside"
      title="Every Tool You Need"
      description="A complete ecosystem for the modern developer and student."
    />
    
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[
        { title: "Dashboard", desc: "Your personal command centre", icon: Layout },
        { title: "Projects", desc: "Track and manage your projects", icon: Folder },
        { title: "Tasks", desc: "Stay on top of every to-do", icon: CheckCircle2 },
        { title: "AI Assistant", desc: "Your intelligent co-pilot", icon: Brain },
        { title: "Notebooks", desc: "Smart notes and ideas", icon: FileText },
        { title: "Workspace", desc: "Your personal workspace", icon: Globe },
        { title: "Teams", desc: "Collaborate with your crew", icon: Users },
        { title: "Meetings", desc: "Video calls in browser", icon: Video },
        { title: "Chat", desc: "Real-time messaging", icon: MessageSquare },
        { title: "Calendar", desc: "Schedule and stay organised", icon: Calendar },
        { title: "Apps", desc: "Extra tools and mini-apps", icon: Database },
        { title: "Web Search", desc: "Google-powered search", icon: Search }
      ].map((tool, i) => (
        <div key={i} className="flex items-center gap-4 p-5 rounded-[2rem] bg-white border border-slate-100 hover:border-slate-900 transition-all group cursor-pointer shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-50 flex items-center justify-center group-hover:bg-slate-900 transition-colors">
            <tool.icon className="w-5 h-5 text-slate-900 group-hover:text-white transition-colors" strokeWidth={1.2} />
          </div>
          <div className="flex-1">
            <h4 className="font-serif font-bold text-slate-900 text-sm">{tool.title}</h4>
            <p className="font-sans text-xs text-slate-500">{tool.desc}</p>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-slate-900 group-hover:translate-x-1 transition-all" />
        </div>
      ))}
    </div>
  </section>
);

const AboutCTA = () => (
  <section className="max-w-7xl mx-auto px-8 pt-20 pb-32">
    <div className="bg-slate-950 rounded-[3rem] px-8 py-24 text-center relative overflow-hidden shadow-2xl">
      <div className="relative z-10 text-center flex flex-col items-center">
        <h2 className="font-serif text-5xl md:text-7xl font-bold text-white mb-8 leading-tight tracking-tight">
          Ready to explore?
        </h2>
        <p className="font-sans text-xl text-slate-400 mb-12 max-w-2xl leading-relaxed">
          Sign in and see everything NovaSpace has to offer.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button className="bg-white text-slate-950 px-10 py-4 rounded-2xl font-bold text-lg hover:bg-slate-100 transition-all flex items-center gap-2 shadow-xl">
            Get started <ArrowRight className="w-5 h-5" />
          </button>
          <button className="bg-transparent text-white border border-slate-700 px-10 py-4 rounded-2xl font-bold text-lg hover:bg-white/5 transition-all">
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="max-w-7xl mx-auto px-8 py-20 border-t border-slate-100">
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-20">
      <div className="lg:col-span-1">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <span className="font-serif text-3xl font-bold tracking-tight text-slate-900">NovaSpace</span>
        </div>
        <p className="font-sans text-slate-500 mb-8 leading-relaxed text-sm font-medium">
          Empowering teams with intelligent collaboration tools and AI-powered workspace solutions.
        </p>
      </div>
      
      <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-12">
        <div>
          <h4 className="font-bold text-xs tracking-widest uppercase text-slate-900 mb-8">Platform</h4>
          <ul className="space-y-4 text-sm text-slate-500 font-medium font-sans">
            <li><a href="#" className="hover:text-slate-900 transition-colors">Dashboard</a></li>
            <li><a href="#" className="hover:text-slate-900 transition-colors">Projects</a></li>
            <li><a href="#" className="hover:text-slate-900 transition-colors">Tasks</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-xs tracking-widest uppercase text-slate-900 mb-8">Workspace</h4>
          <ul className="space-y-4 text-sm text-slate-500 font-medium font-sans">
            <li><a href="#" className="hover:text-slate-900 transition-colors">My Workspace</a></li>
            <li><a href="#" className="hover:text-slate-900 transition-colors">Teams</a></li>
            <li><a href="#" className="hover:text-slate-900 transition-colors">Team Workspace</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-xs tracking-widest uppercase text-slate-900 mb-8">AI & Tools</h4>
          <ul className="space-y-4 text-sm text-slate-500 font-medium font-sans">
            <li><a href="#" className="hover:text-slate-900 transition-colors">AI Assistant</a></li>
            <li><a href="#" className="hover:text-slate-900 transition-colors">Apps</a></li>
            <li><a href="#" className="hover:text-slate-900 transition-colors">Web Search</a></li>
          </ul>
        </div>
      </div>
    </div>
    
    <div className="border-t border-slate-100 pt-10">
      <div className="flex items-center gap-3 mb-10">
        {[Linkedin, Twitter, Github, Youtube].map((Icon, i) => (
          <a key={i} href="#" className="w-12 h-12 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-900 hover:border-slate-300 transition-all shadow-sm">
            <Icon className="w-5 h-5" />
          </a>
        ))}
      </div>
      
      <div className="flex flex-col md:flex-row items-center justify-between pt-10 border-t border-slate-50 font-medium">
        <p className="text-sm text-slate-400 mb-4 md:mb-0">© 2026 NovaSpace. All rights reserved.</p>
        <div className="flex items-center gap-8 text-sm text-slate-400 font-sans">
          <a href="#" className="hover:text-slate-900">Sitemap</a>
          <a href="#" className="hover:text-slate-900">Accessibility</a>
          <div className="flex items-center gap-2">Made with <span className="text-red-500">❤️</span> in Ghana</div>
        </div>
      </div>
    </div>
  </footer>
);

const About = () => {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      <Navbar />
      <main>
        <AboutHero />
        <StatsSection />
        <WhatIsNovaSpace />
        <TechStack />
        <ToolsSection />
        <AboutCTA />
      </main>
      <Footer />
    </div>
  );
};

export default About;
