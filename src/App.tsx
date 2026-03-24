import React from 'react';
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
  Facebook,
  Youtube,
  Instagram
} from 'lucide-react';

const Navbar = () => (
  <nav className="flex items-center justify-between py-6 px-8 max-w-7xl mx-auto">
    <div className="flex items-center gap-2">
      <span className="font-serif text-2xl font-bold tracking-tight">NovaSpace</span>
    </div>
    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
      <a href="#" className="text-slate-900">Home</a>
      <a href="#" className="hover:text-slate-900 transition-colors">Features</a>
      <a href="#" className="hover:text-slate-900 transition-colors">About</a>
    </div>
    <div className="flex items-center gap-4">
      <button className="text-sm font-medium text-slate-600 hover:text-slate-900 px-4 py-2 rounded-full border border-slate-200 hover:border-slate-300 transition-all">
        Log In
      </button>
      <button className="text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-full transition-colors shadow-sm">
        Sign Up
      </button>
    </div>
  </nav>
);

const Hero = () => (
  <section className="max-w-7xl mx-auto px-8 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
    <div className="max-w-2xl">
      <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight text-slate-900 mb-6">
        Powering Intelligent Collaboration with Nova Space.
      </h1>
      <p className="text-lg text-slate-600 mb-8 max-w-lg leading-relaxed">
        A unified AI-powered workspace for collaboration, live chat, conferencing, and multi-format document creation.
      </p>
      <div className="flex flex-wrap items-center gap-4">
        <button className="text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-full transition-colors shadow-sm">
          Get Started Free
        </button>
        <button className="flex items-center gap-2 text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 px-6 py-3 rounded-full transition-colors shadow-sm">
          <PlayCircle className="w-4 h-4 text-blue-600" />
          Watch Demo
        </button>
      </div>
    </div>
    <div className="relative">
      {/* Placeholder for the 3D abstract graphic */}
      <div className="aspect-square w-full max-w-md mx-auto relative">
        <img 
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop" 
          alt="Abstract 3D shape" 
          className="w-full h-full object-cover rounded-full mix-blend-multiply opacity-90"
          style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
        />
        {/* Decorative elements to mimic the design */}
        <div className="absolute top-10 right-10 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center shadow-sm">
           <MousePointerClick className="w-4 h-4 text-blue-600" />
        </div>
      </div>
    </div>
  </section>
);

const FeatureCard = ({ icon: Icon, title, description, badge, large = false }: any) => (
  <div className={`bg-slate-50/80 border border-slate-200 rounded-2xl p-8 flex flex-col ${large ? 'h-full' : ''}`}>
    <div className="flex justify-between items-start mb-6">
      <div className="w-12 h-12 rounded-xl bg-white border border-slate-100 shadow-sm flex items-center justify-center">
        <Icon className="w-6 h-6 text-slate-700" strokeWidth={1.5} />
      </div>
      {badge && (
        <span className="text-[10px] font-bold tracking-wider uppercase text-slate-600 bg-slate-200/50 px-3 py-1 rounded-full">
          {badge}
        </span>
      )}
    </div>
    <h3 className="font-serif text-xl font-bold text-slate-900 mb-3">{title}</h3>
    <p className="text-sm text-slate-600 mb-6 flex-grow leading-relaxed">{description}</p>
    <a href="#" className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors mt-auto">
      Learn more <ArrowRight className="w-4 h-4" />
    </a>
  </div>
);

const Features = () => (
  <section className="max-w-7xl mx-auto px-8 py-20">
    <div className="mb-12">
      <span className="text-sm font-medium text-slate-500 mb-2 block">Features</span>
      <h2 className="font-serif text-4xl md:text-5xl font-bold text-slate-900 max-w-2xl leading-tight">
        Everything You Need in One Intelligent Workspace
      </h2>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <FeatureCard 
        icon={Brain}
        title="Smart AI Assistant"
        description="A unified AI-powered workspace for collaboration, live chat, conferencing, and multi-format document creation."
        badge="AI-POWERED"
        large={true}
      />
      <FeatureCard 
        icon={MousePointerClick}
        title="Real-Time Collaboration"
        description="A unified AI-powered workspace for collaboration, live chat, conferencing, and multi-format document creation."
        badge="TEAM SYNC"
        large={true}
      />
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <FeatureCard 
        icon={MessageSquare}
        title="Live Chat & Messaging"
        description="Unified live chat & messaging, and chat, collaborate the messages."
      />
      <FeatureCard 
        icon={Video}
        title="Video Conferencing"
        description="Video conferencing and pre-conversation with video conferencing."
      />
      <FeatureCard 
        icon={FileText}
        title="Document Formats"
        description="Document formats, with documents conferencing, and multi-format document."
        badge="DOCUMENTS"
      />
      <FeatureCard 
        icon={Code}
        title="Code & Scripts"
        description="Code & scripts sensitive and comprehensive for in-app data and collaboration."
        badge="PROGRAMMING"
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
        
        <div className="grid grid-cols-3 gap-4 w-full divide-x divide-slate-200">
          <div className="flex flex-col items-center text-center px-4">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mb-4">
              <Zap className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-2xl font-serif font-bold text-slate-900 mb-1">10x</span>
            <span className="text-xs text-slate-600 font-medium">Faster Code<br/>Generation</span>
          </div>
          
          <div className="flex flex-col items-center text-center px-4">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mb-4">
              <Target className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-2xl font-serif font-bold text-slate-900 mb-1">95%</span>
            <span className="text-xs text-slate-600 font-medium">Accuracy<br/>Rate</span>
          </div>
          
          <div className="flex flex-col items-center text-center px-4">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mb-4">
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-2xl font-serif font-bold text-slate-900 mb-1">5hrs</span>
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

const Footer = () => (
  <footer className="max-w-7xl mx-auto px-8 py-12">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
      <div className="col-span-1">
        <span className="font-serif text-2xl font-bold tracking-tight text-slate-900">NovaSpace</span>
      </div>
      
      <div>
        <h4 className="font-bold text-xs tracking-wider uppercase text-slate-900 mb-6">Platform</h4>
        <ul className="space-y-4 text-sm text-slate-600">
          <li><a href="#" className="hover:text-slate-900">About</a></li>
          <li><a href="#" className="hover:text-slate-900">Features</a></li>
          <li><a href="#" className="hover:text-slate-900">Nova Space</a></li>
        </ul>
      </div>
      
      <div>
        <h4 className="font-bold text-xs tracking-wider uppercase text-slate-900 mb-6">Workspace</h4>
        <ul className="space-y-4 text-sm text-slate-600">
          <li><a href="#" className="hover:text-slate-900">Workspace</a></li>
          <li><a href="#" className="hover:text-slate-900">Careers</a></li>
          <li><a href="#" className="hover:text-slate-900">Contact</a></li>
        </ul>
      </div>
      
      <div>
        <h4 className="font-bold text-xs tracking-wider uppercase text-slate-900 mb-6">AI & Tools</h4>
        <ul className="space-y-4 text-sm text-slate-600">
          <li><a href="#" className="hover:text-slate-900">AI Resources</a></li>
          <li><a href="#" className="hover:text-slate-900">AI Stable Centers</a></li>
          <li><a href="#" className="hover:text-slate-900">Privacy & Scripts</a></li>
        </ul>
      </div>
    </div>
    
    <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-slate-200">
      <p className="text-xs text-slate-500 mb-4 md:mb-0">
        © 2024 NovaSpace. All rights reserved.
      </p>
      <div className="flex items-center gap-4 text-slate-400">
        <a href="#" className="hover:text-slate-600"><Twitter className="w-4 h-4" /></a>
        <a href="#" className="hover:text-slate-600"><Facebook className="w-4 h-4" /></a>
        <a href="#" className="hover:text-slate-600"><Youtube className="w-4 h-4" /></a>
        <a href="#" className="hover:text-slate-600"><Instagram className="w-4 h-4" /></a>
      </div>
    </div>
  </footer>
);

export default function App() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-blue-100">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <MachineLearning />
        <Security />
      </main>
      <Footer />
    </div>
  );
}
