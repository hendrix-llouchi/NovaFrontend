import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import Hls from 'hls.js';
import {
  Brain,
  MousePointerClick,
  MessageSquare,
  Video,
  FileText,
  Code,
  Zap,
  Target,
  Clock,
  ShieldCheck,
  Lock,
  Cloud,
  Database,
  PlayCircle,
  ArrowRight,
  CheckCircle2,
  Globe,
  Shield,
  HeartPulse,
  Twitter,
  Youtube,
  Linkedin,
  Github,
  GraduationCap,
  Building2,
  Rocket,
  Headphones,
  Layout
} from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import { Link } from 'react-router-dom';

const Hero = () => (
  <section className="max-w-7xl mx-auto px-8 py-32 md:py-48 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
    <div className="max-w-2xl">
      <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight text-slate-900 mb-6">
        Powering Intelligent Collaboration with Nova Space.
      </h1>
      <p className="text-lg text-slate-600 mb-8 max-w-lg leading-relaxed">
        A unified AI-powered workspace for collaboration, live chat, conferencing, and multi-format document creation.
      </p>
      <div className="flex flex-wrap items-center gap-4">
        <button className="text-sm font-medium text-white bg-slate-900 hover:bg-black px-6 py-3 rounded-full transition-all shadow-sm">
          Get Started Free
        </button>
        <button className="flex items-center gap-2 text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 px-6 py-3 rounded-full transition-all shadow-sm group">
          <PlayCircle className="w-4 h-4 text-slate-900 group-hover:scale-110 transition-transform" />
          Watch Demo
        </button>
      </div>
    </div>
    <div className="relative">
      <div className="aspect-square w-full max-w-md mx-auto relative">
        <img 
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop" 
          alt="Abstract 3D shape" 
          className="w-full h-full object-cover rounded-full mix-blend-multiply opacity-90"
          style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
        />
        <div className="absolute top-10 right-10 w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center shadow-sm">
           <MousePointerClick className="w-4 h-4 text-slate-900" />
        </div>
      </div>
    </div>
  </section>
);

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
    <p className="text-lg text-slate-500 max-w-2xl leading-relaxed">
      {description}
    </p>
  </div>
);

const FeatureCard = ({ icon: Icon, title, description, badge, list, large = false }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className={`bg-white border border-slate-100 rounded-[2rem] p-8 flex flex-col shadow-sm hover:shadow-xl hover:shadow-slate-100/50 transition-all duration-500 group ${large ? 'md:col-span-2' : ''}`}
  >
    <div className="flex justify-between items-start mb-8">
      <div className="w-14 h-14 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center group-hover:border-slate-900 group-hover:shadow-slate-50 transition-all duration-500">
        <Icon className="w-7 h-7 text-slate-900" strokeWidth={1.2} />
      </div>
      {badge && (
        <span className="text-[10px] font-bold tracking-widest uppercase text-slate-500 bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
          {badge}
        </span>
      )}
    </div>
    <h3 className="font-serif text-2xl font-bold text-slate-900 mb-4">{title}</h3>
    <p className="text-slate-500 mb-8 leading-relaxed text-sm font-medium">{description}</p>
    
    {list && (
      <ul className="space-y-3 mb-8">
        {list.map((item: string, i: number) => (
          <li key={i} className="flex items-center gap-3 text-sm text-slate-600 font-medium">
            <div className="w-5 h-5 rounded-full bg-slate-50 flex items-center justify-center">
              <CheckCircle2 className="w-3 h-3 text-slate-900" />
            </div>
            {item}
          </li>
        ))}
      </ul>
    )}

    <a href="#" className="inline-flex items-center gap-2 text-sm font-bold text-slate-900 hover:text-black transition-all mt-auto group-hover:gap-3">
      View details <ArrowRight className="w-4 h-4" />
    </a>
  </motion.div>
);

const FeaturesSection = () => (
  <section className="max-w-7xl mx-auto px-8 py-32">
    <SectionHeader 
      badge="Features"
      title="Everything You Need in One Intelligent Workspace"
      description="Powerful features designed to supercharge your team's productivity and collaboration"
    />

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <FeatureCard 
        icon={Brain}
        title="Smart AI Assistant"
        description="Intelligent assistance powered by advanced AI to accelerate your workflow and decision making process."
        badge="AI-POWERED"
      />
      <FeatureCard 
        icon={MousePointerClick}
        title="Real-Time Collaboration"
        description="Work together seamlessly with your team from anywhere in the world with zero latency sync."
        badge="TEAM SYNC"
      />
      <FeatureCard 
        icon={MessageSquare}
        title="Live Chat & Messaging"
        description="Instant communication with powerful features for seamless team interaction and knowledge sharing."
        badge="INSTANT"
      />
      <FeatureCard 
        large
        icon={Video}
        title="Video Conferencing"
        description="Crystal-clear HD meetings with enterprise-grade features built in for global connectivity."
        badge="HD QUALITY"
        list={[
          "Full HD video meetings",
          "Screen & window sharing",
          "Advanced host controls"
        ]}
      />
    </div>
  </section>
);

const WorkspaceSection = () => (
  <section className="max-w-7xl mx-auto px-8 py-32 bg-slate-50/50 rounded-[3rem]">
    <SectionHeader 
      badge="Workspace"
      title="Create and Manage Work in Any Format"
      description="Powerful multi-format workspace supporting all your favorite file types and languages"
    />

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
      <FeatureCard 
        icon={FileText}
        title="Document Formats"
        description="Create and edit professional documents in multiple formats including PDF, DOCX, and MD."
        badge="DOCUMENTS"
      />
      <FeatureCard 
        icon={Code}
        title="Code & Scripts"
        description="Write and manage code in all major programming languages with built-in syntax highlighting."
        badge="PROGRAMMING"
      />
      <FeatureCard 
        icon={Database}
        title="Data Formats"
        description="Handle structured data with ease across various standard industry formats."
        badge="DATA"
        list={["JSON", "XML", "SQL", "YAML", "CSV"]}
      />
      <FeatureCard 
        icon={Globe}
        title="Web Development"
        description="Build modern web applications with native support for the world's most popular frameworks."
        badge="WEB"
        list={["HTML", "CSS", "React", "Vue", "Angular"]}
      />
    </div>
  </section>
);

const AIPoweredSection = () => (
  <section className="max-w-7xl mx-auto px-8 py-32">
    <SectionHeader 
      badge="AI-Powered"
      title="Intelligent AI That Works With You"
      description="Advanced artificial intelligence built into every feature to accelerate your productivity and enhance collaboration"
    />

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <FeatureCard 
        icon={Code}
        title="AI Coding Assistant"
        description="Intelligent code generation and optimization."
        badge="CODE AI"
      />
      <FeatureCard 
        icon={Brain}
        title="Smart Organization"
        description="AI-driven workspace and folder intelligence."
        badge="SMART AI"
      />
      <FeatureCard 
        icon={FileText}
        title="Content Generator"
        description="Create professional content in seconds."
        badge="CONTENT AI"
      />
      <FeatureCard 
        icon={Database}
        title="Powered Analytics"
        description="Deep insights and recommendations."
        badge="ANALYTICS AI"
      />
    </div>
  </section>
);

const ForEveryoneSection = () => (
  <section className="max-w-7xl mx-auto px-8 py-32 bg-slate-50/50 rounded-[3rem]">
    <SectionHeader 
      badge="For Everyone"
      title="Built for Teams, Students & Enterprises"
      description="Whether you're a solo developer, student team, or global enterprise, NovaSpace adapts to your workflow"
    />

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <FeatureCard 
        icon={GraduationCap}
        title="Students & Educators"
        description="Perfect for academic success and multi-format collaboration."
        badge="ACADEMIC"
      />
      <FeatureCard 
        icon={Code}
        title="Developers & Engineers"
        description="Built for software teams who want to move fast and stay organized."
        badge="ENGINEERING"
      />
      <FeatureCard 
        icon={Building2}
        title="Teams & Enterprises"
        description="Scale effortlessly with enterprise-level security and tools."
        badge="CORPORATE"
      />
      <FeatureCard 
        icon={Rocket}
        title="Startups & Agencies"
        description="Move fast and stay organized with agile collaboration tools."
        badge="GROWTH"
      />
    </div>
  </section>
);

const WhyChooseUsSection = () => (
  <section className="max-w-7xl mx-auto px-8 py-32">
    <SectionHeader 
      badge="Why Choose Us"
      title="Why Teams Choose NovaSpace"
      description="Bank-level encryption and high-performance tools designed for the modern workspace"
    />

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <FeatureCard 
        icon={ShieldCheck}
        title="Enterprise Security"
        description="Bank-level encryption and compliance certifications across all platforms."
      />
      <FeatureCard 
        icon={Clock}
        title="24/7 Availability"
        description="Work from anywhere, anytime with 99.9% guaranteed uptime."
      />
      <FeatureCard 
        icon={Headphones}
        title="Expert Support"
        description="Dedicated support team ready to help you succeed 24/7."
      />
      <FeatureCard 
        icon={Zap}
        title="Lightning Fast"
        description="Optimized performance for a smooth and responsive experience."
      />
      <FeatureCard 
        icon={Target}
        title="Scalable Growth"
        description="From small teams to global organizations, we grow with you."
      />
      <FeatureCard 
        icon={Layout}
        title="Easy Integration"
        description="Connect with your favorite tools seamlessly via our open API."
      />
    </div>
  </section>
);

const MachineLearning = () => (
  <section className="max-w-7xl mx-auto px-8 py-20">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      <div>
        <span className="text-sm font-medium text-slate-500 mb-2 block">AI-Powered Learning</span>
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
          Powered by Advanced Machine Learning
        </h2>
      </div>
      
      <div className="bg-slate-50/80 border border-slate-200 rounded-3xl p-10 flex flex-col items-center justify-center">
        <Brain className="w-20 h-20 text-slate-800 mb-12" strokeWidth={1} />
        
        <div className="grid grid-cols-3 gap-4 w-full divide-x divide-slate-200 text-slate-900">
          <div className="flex flex-col items-center text-center px-4">
            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center mb-4">
              <Zap className="w-5 h-5 text-slate-900" />
            </div>
            <span className="text-2xl font-serif font-bold mb-1">10x</span>
            <span className="text-xs text-slate-600 font-medium">Faster Code<br/>Generation</span>
          </div>
          
          <div className="flex flex-col items-center text-center px-4">
            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center mb-4">
              <Target className="w-5 h-5 text-slate-900" />
            </div>
            <span className="text-2xl font-serif font-bold mb-1">95%</span>
            <span className="text-xs text-slate-600 font-medium">Accuracy<br/>Rate</span>
          </div>
          
          <div className="flex flex-col items-center text-center px-4">
            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center mb-4">
              <Clock className="w-5 h-5 text-slate-900" />
            </div>
            <span className="text-2xl font-serif font-bold mb-1">5hrs</span>
            <span className="text-xs text-slate-600 font-medium">Saved Per<br/>Week</span>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const SecurityCard = ({ icon: Icon, title, description, badge }: any) => (
  <div className="flex flex-col">
    <div className="flex items-center gap-3 mb-4">
      <Icon className="w-6 h-6 text-slate-800" strokeWidth={1.5} />
      <h3 className="font-serif text-lg font-bold text-slate-900">{title}</h3>
      {badge && (
        <span className="text-[10px] font-bold tracking-wider uppercase text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
          {badge}
        </span>
      )}
    </div>
    <p className="text-sm text-slate-600 leading-relaxed">{description}</p>
  </div>
);

const Security = () => (
  <section className="max-w-7xl mx-auto px-8 py-20 border-b border-slate-200">
    <div className="mb-16">
      <span className="text-sm font-medium text-slate-500 mb-2 block">Security & Compliance</span>
      <div className="flex items-center gap-4">
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
          Bank-Grade Security & Compliance
        </h2>
        <div className="hidden md:flex items-center gap-2">
           <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center">
             <Shield className="w-5 h-5 text-slate-600" />
           </div>
           <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center">
             <Lock className="w-5 h-5 text-slate-600" />
           </div>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
      <SecurityCard 
        icon={ShieldCheck}
        title="Data Encryption"
        badge="CRITICAL"
        description="Data encryption and data security controls, end-to-end security and exceeds compliance."
      />
      <SecurityCard 
        icon={Lock}
        title="Access Control"
        description="Access control and security, continuous monitoring and identity management."
      />
      <SecurityCard 
        icon={Cloud}
        title="Infrastructure Security"
        badge="HIGH"
        description="Infrastructure security and continuous monitoring and security threat-hunting."
      />
      <SecurityCard 
        icon={Database}
        title="Data Privacy"
        badge="CRITICAL"
        description="Privacy data privacy communication, enterprise corporate security, and alignment."
      />
    </div>

    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="flex items-center justify-center gap-2 py-4 px-6 bg-slate-50 border border-slate-200 rounded-xl">
        <CheckCircle2 className="w-5 h-5 text-slate-800" />
        <span className="font-serif font-bold text-slate-900">SOC 2 Type II</span>
      </div>
      <div className="flex items-center justify-center gap-2 py-4 px-6 bg-slate-50 border border-slate-200 rounded-xl">
        <Globe className="w-5 h-5 text-slate-800" />
        <span className="font-serif font-bold text-slate-900">ISO 27001</span>
      </div>
      <div className="flex items-center justify-center gap-2 py-4 px-6 bg-slate-50 border border-slate-200 rounded-xl">
        <Shield className="w-5 h-5 text-slate-800" strokeDasharray="2 2" />
        <span className="font-serif font-bold text-slate-900">GDPR</span>
      </div>
      <div className="flex items-center justify-center gap-2 py-4 px-6 bg-slate-50 border border-slate-200 rounded-xl">
        <HeartPulse className="w-5 h-5 text-slate-800" />
        <span className="font-serif font-bold text-slate-900">HIPAA</span>
      </div>
    </div>
  </section>
);

const VideoBackground = ({ hlsSrc, mp4Src }: { hlsSrc: string, mp4Src: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    let hls: Hls | null = null;
    const video = videoRef.current;
    if (!video) return;

    const playVideo = () => {
      video.play().catch(() => {});
    };

    if (Hls.isSupported()) {
      hls = new Hls({ enableWorker: true, lowLatencyMode: true });
      hls.loadSource(hlsSrc);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, playVideo);
      hls.on(Hls.Events.ERROR, (_, data) => {
        if (data.fatal) {
          hls?.destroy();
          video.src = mp4Src;
          playVideo();
        }
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = hlsSrc;
      video.addEventListener('loadedmetadata', playVideo);
    } else {
      video.src = mp4Src;
      video.addEventListener('loadedmetadata', playVideo);
    }
    return () => {
      hls?.destroy();
      video.removeEventListener('loadedmetadata', playVideo);
    };
  }, [hlsSrc, mp4Src]);

  return (
    <video
      ref={videoRef}
      className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      muted
      loop
      playsInline
      controls={false}
    />
  );
};

const CTASection = () => {
  const playbackId = "f0c78f536d5f21a047fb7792723a36f9d647daa1";
  const hlsUrl = `/_videos/v1/${playbackId}.m3u8`;
  const mp4Url = `/_videos/v1/${playbackId}`;

  return (
    <section className="max-w-7xl mx-auto px-8 py-24">
      <div className="bg-slate-900 rounded-[3rem] px-8 py-24 text-center relative overflow-hidden shadow-2xl">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black opacity-60 z-10" />
          <VideoBackground hlsSrc={hlsUrl} mp4Src={mp4Url} />
        </div>
        
        <div className="relative z-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/10 border border-white/20 text-white font-bold text-[10px] tracking-widest uppercase mb-10"
          >
            <Rocket className="w-3.5 h-3.5" />
            Get Started Today
          </motion.div>
          <h2 className="font-serif text-5xl md:text-7xl font-bold text-white mb-10 max-w-4xl mx-auto leading-[1.1] tracking-tight">
            Ready to Transform Your Workspace?
          </h2>
          <p className="text-xl text-slate-300 mb-14 max-w-2xl mx-auto leading-relaxed">
            Join thousands of teams already using NovaSpace to collaborate smarter, work faster, and achieve more together.
          </p>
          <button className="bg-white text-slate-950 px-12 py-5 rounded-2xl font-bold text-lg hover:bg-slate-100 transition-all flex items-center gap-2 mx-auto shadow-xl hover:scale-105 active:scale-95 group">
            Get Started <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.1),transparent_70%)] pointer-events-none z-30" />
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="max-w-7xl mx-auto px-8 py-20">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-20">
      <div className="max-w-md">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <span className="font-serif text-3xl font-bold tracking-tight text-slate-900">NovaSpace</span>
        </div>
        <p className="text-slate-500 mb-8 leading-relaxed font-medium">
          Empowering teams with intelligent collaboration tools and AI-powered workspace solutions.
        </p>
        <div className="flex items-center gap-3">
          {[
            { icon: Linkedin, href: '#' },
            { icon: Twitter, href: '#' },
            { icon: Github, href: '#' },
            { icon: Youtube, href: '#' }
          ].map((social, i) => (
            <a key={i} href={social.href} className="w-12 h-12 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-900 hover:border-slate-300 transition-all shadow-sm">
              <social.icon className="w-5 h-5" />
            </a>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-12">
        {/* Platform */}
        <div>
          <h4 className="font-bold text-xs tracking-widest uppercase text-slate-900 mb-8">Platform</h4>
          <ul className="space-y-4 text-sm text-slate-500 font-medium">
            <li><Link to="/dashboard" className="hover:text-slate-900 transition-colors">Dashboard</Link></li>
            <li><a href="#" className="hover:text-slate-900 transition-colors">Projects</a></li>
            <li><a href="#" className="hover:text-slate-900 transition-colors">Tasks</a></li>
            <li><a href="#" className="hover:text-slate-900 transition-colors">Notebooks</a></li>
            <li><a href="#" className="hover:text-slate-900 transition-colors">Calendar</a></li>
          </ul>
        </div>
        {/* Workspace */}
        <div>
          <h4 className="font-bold text-xs tracking-widest uppercase text-slate-900 mb-8">Workspace</h4>
          <ul className="space-y-4 text-sm text-slate-500 font-medium">
            <li><a href="#" className="hover:text-slate-900 transition-colors">My Workspace</a></li>
            <li><a href="#" className="hover:text-slate-900 transition-colors">Teams</a></li>
            <li><a href="#" className="hover:text-slate-900 transition-colors">Team Workspace</a></li>
            <li><a href="#" className="hover:text-slate-900 transition-colors">Team Projects</a></li>
            <li><a href="#" className="hover:text-slate-900 transition-colors">Chat</a></li>
          </ul>
        </div>
        {/* AI & Tools */}
        <div>
          <h4 className="font-bold text-xs tracking-widest uppercase text-slate-900 mb-8">AI & Tools</h4>
          <ul className="space-y-4 text-sm text-slate-500 font-medium">
            <li><Link to="/ai-assistant" className="hover:text-slate-900 transition-colors">AI Assistant</Link></li>
            <li><a href="#" className="hover:text-slate-900 transition-colors">Apps</a></li>
            <li><Link to="/web-search" className="hover:text-slate-900 transition-colors">Web Search</Link></li>
            <li><a href="#" className="hover:text-slate-900 transition-colors">Meeting</a></li>
            <li><Link to="/about" className="hover:text-slate-900 transition-colors">About</Link></li>
          </ul>
        </div>
      </div>
    </div>
    
    <div className="flex flex-col md:flex-row items-center justify-between pt-10 border-t border-slate-100 font-medium">
      <p className="text-sm text-slate-400 mb-4 md:mb-0">© 2026 NovaSpace. All rights reserved.</p>
      <div className="flex items-center gap-8 text-sm text-slate-400">
        <a href="#" className="hover:text-slate-900">Privacy</a>
        <a href="#" className="hover:text-slate-900">Terms</a>
        <div className="flex items-center gap-2">Made with <span className="text-red-500">❤️</span> in Ghana</div>
      </div>
    </div>
  </footer>
);

const LogoTicker = () => {
  const logos = [
    { icon: Database, title: 'DataCore' },
    { icon: Cloud, title: 'CloudSync' },
    { icon: Shield, title: 'SecureNet' },
    { icon: Code, title: 'DevBox' },
    { icon: Zap, title: 'ApexLogic' },
    { icon: Globe, title: 'GlobalConnect' },
  ];
  const duplicatedLogos = [...logos, ...logos, ...logos];

  return (
    <section className="py-24 overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-8 mb-20 flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-slate-50 text-slate-500 font-bold text-[10px] tracking-widest uppercase mb-8 border border-slate-100"
        >
          Trusted by Industry Leaders
        </motion.div>
      </div>
      <div className="flex relative">
        <motion.div 
          className="flex gap-24 whitespace-nowrap"
          animate={{ x: [0, -1824] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        >
          {duplicatedLogos.map((logo, i) => (
            <div key={i} className="flex items-center gap-4 text-slate-300 hover:text-slate-900 transition-colors group cursor-default">
              <logo.icon className="w-10 h-10 opacity-50 group-hover:opacity-100" strokeWidth={1.5} />
              <span className="font-serif text-3xl font-bold opacity-50 group-hover:opacity-100">{logo.title}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const Home = () => {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 pt-20">
      <Navbar />
      <main>
        <Hero />
        <LogoTicker />
        <FeaturesSection />
        <WorkspaceSection />
        <AIPoweredSection />
        <MachineLearning />
        <ForEveryoneSection />
        <WhyChooseUsSection />
        <CTASection />
        <Security />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
