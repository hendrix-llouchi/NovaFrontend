import React from 'react';
import { motion } from 'motion/react';
import { 
  Brain, 
  CheckCircle2, 
  Github, 
  Mail, 
  Lock, 
  Eye, 
  ArrowRight 
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, perform validation/API calls here
    navigate('/dashboard');
  };
  return (
    <div className="flex min-h-screen bg-white">
      {/* Left Side - Branding & Testimonial (Hidden on small screens) */}
      <div className="hidden lg:flex w-[45%] bg-slate-950 relative overflow-hidden flex-col justify-start gap-12 p-12">
        {/* Glow effect */}
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_100%_0%,rgba(255,255,255,0.08),transparent_50%)] pointer-events-none" />
        
        <div className="relative z-10">
          <Link to="/" className="flex items-center gap-2 mb-12 group">
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center group-hover:scale-105 transition-transform">
              <Brain className="w-6 h-6 text-slate-950" />
            </div>
            <span className="font-serif text-2xl font-bold tracking-tight text-white">NovaSpace</span>
          </Link>

          <h1 className="font-serif text-5xl font-bold text-white mb-6 leading-tight">
            The intelligent workspace<br />for collaboration.
          </h1>
          
          <ul className="space-y-4">
            {[
              "AI-powered collaboration tools",
              "Real-time team workspace",
              "Enterprise-grade security"
            ].map((feature, i) => (
              <motion.li 
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * i }}
                className="flex items-center gap-3 text-slate-300"
              >
                <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                  <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="text-sm font-medium">{feature}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Testimonial Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="relative z-10 backdrop-blur-xl bg-white/5 border border-white/10 rounded-[2.5rem] p-8 shadow-2xl"
        >
          <p className="text-white text-lg font-medium leading-relaxed mb-6 italic">
            "NovaSpace transformed how our team works together. The AI features are incredible and have honestly changed our workflow forever."
          </p>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center overflow-hidden">
               {/* Avatar Placeholder */}
               <div className="w-full h-full bg-gradient-to-br from-slate-700 to-slate-900" />
            </div>
            <div>
              <p className="text-white font-bold text-sm">Sarah Mitchell</p>
              <p className="text-slate-400 text-xs">CTO, TechFlow</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex flex-col items-center justify-start px-6 pt-20 lg:pt-32 pb-12 lg:px-24 overflow-y-auto">
        <div className="w-full max-w-[420px]">
          {/* Header Mobile Logo */}
          <div className="flex lg:hidden justify-center mb-8">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-slate-950 flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-slate-950">NovaSpace</span>
            </Link>
          </div>

          {/* Toggle Tabs */}
          <div className="flex items-center gap-1 p-1 bg-slate-50 border border-slate-100 rounded-2xl mb-10">
            <button className="flex-1 py-2.5 rounded-xl bg-white text-slate-900 font-bold text-sm shadow-sm ring-1 ring-slate-900/5">
              Log In
            </button>
            <Link to="/signup" className="flex-1 py-2.5 rounded-xl text-slate-500 hover:text-slate-900 font-bold text-sm transition-colors text-center">
              Sign Up
            </Link>
          </div>

          <div className="mb-10 text-center lg:text-left">
            <h2 className="font-serif text-3xl font-bold text-slate-900 mb-2">Welcome back</h2>
            <p className="text-slate-500 text-sm">Enter your credentials to access your workspace</p>
          </div>

          {/* Social Logins */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <button className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl border border-slate-200 hover:bg-slate-50 transition-all font-bold text-sm text-slate-700">
               {/* Google SVG is harder to copy, so I'll use common icons or simpler shapes */}
               <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
               </svg>
               Google
            </button>
            <button className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl border border-slate-200 hover:bg-slate-50 transition-all font-bold text-sm text-slate-700">
              <Github className="w-4 h-4 text-slate-900" />
              GitHub
            </button>
          </div>

          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-100"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase tracking-widest font-bold">
              <span className="bg-white px-4 text-slate-400">or continue with email</span>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-400 tracking-widest uppercase ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-slate-900 transition-colors" />
                <input 
                  type="email" 
                  placeholder="you@example.com"
                  className="w-full pl-11 pr-4 py-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-950 focus:border-slate-950 transition-all text-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-400 tracking-widest uppercase ml-1">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-slate-900 transition-colors" />
                <input 
                  type="password" 
                  placeholder="Enter your password"
                  className="w-full pl-11 pr-12 py-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-950 focus:border-slate-950 transition-all text-sm"
                />
                <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-900 transition-colors">
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 rounded border-slate-200 text-slate-950 focus:ring-slate-950" />
                <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900 transition-colors">Remember me</span>
              </label>
              <a href="#" className="text-sm font-bold text-slate-950 hover:underline">Forgot password?</a>
            </div>

            <button className="w-full bg-slate-950 text-white flex items-center justify-center gap-2 py-4 rounded-2xl font-bold shadow-xl shadow-slate-100 hover:bg-black transition-all hover:scale-[1.01] active:scale-[0.99]">
              Log In
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-500">
            Don't have an account? <Link to="/signup" className="font-bold text-slate-950 hover:underline">Sign up</Link>
          </p>

          <p className="mt-12 text-center text-[10px] text-slate-300 px-6">
            By continuing, you agree to our <a href="#" className="underline">Terms of Service</a> and <a href="#" className="underline">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
