import Link from "next/link";
import { ChevronDown, Globe, LogIn, ArrowRight } from "lucide-react";

export function Navbar() {
  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <nav className="w-full max-w-[1400px] bg-white/80 backdrop-blur-lg rounded-[2rem] shadow-sm border border-white/50 relative overflow-hidden pointer-events-auto">
        
        {/* Dark gradient on the right side of the navbar */}
        <div className="absolute top-0 right-0 h-full w-[400px] bg-gradient-to-l from-[#1e293b] via-[#334155]/80 to-transparent z-0 opacity-95"></div>

        <div className="relative z-10 flex items-center justify-between px-8 py-3.5">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="text-[#1e293b]">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 20h.01M7 20v-4M12 20v-8M17 20V8M22 4v16" />
                <path d="m2 20 20-16" />
              </svg>
            </div>
            <div className="flex flex-col -gap-1">
              <span className="text-xl font-bold text-[#1e293b] leading-tight tracking-tight">Array</span>
              <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest leading-none">Logistics</span>
            </div>
          </Link>

          {/* Center Links */}
          <div className="hidden lg:flex items-center gap-8 ml-12">
            <div className="flex items-center gap-1 cursor-pointer group">
              <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900">Products</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600" />
            </div>
            <div className="flex items-center gap-1 cursor-pointer group">
              <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900">Solutions</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600" />
            </div>
            <Link href="#integrations" className="text-sm font-medium text-slate-700 hover:text-slate-900">Integrations</Link>
            <div className="flex items-center gap-1 cursor-pointer group">
              <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900">Resources</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600" />
            </div>
            <div className="flex items-center gap-1 cursor-pointer group">
              <span className="text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors text-white lg:text-slate-700 lg:group-hover:text-slate-900 z-10" style={{ mixBlendMode: 'difference' }}>Company</span>
              <ChevronDown className="w-3.5 h-3.5 text-white/70 lg:text-slate-400 z-10" style={{ mixBlendMode: 'difference' }} />
            </div>
            <Link href="#pricing" className="text-sm font-medium text-white/90 hover:text-white transition-colors z-10">Pricing</Link>
          </div>

          <div className="flex-1"></div>

          {/* Right Actions */}
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-1.5 cursor-pointer text-white/90 hover:text-white">
              <Globe className="w-4 h-4" />
              <span className="text-sm font-medium">EN</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-70" />
            </div>
            
            <div className="flex items-center gap-3">
              <Link href="/auth/login" className="text-sm font-medium text-white/90 hover:text-white px-5 py-2 rounded-full border border-white/20 hover:bg-white/10 transition-colors">
                Login
              </Link>
              <Link href="/auth/register" className="flex items-center gap-2 bg-[#0f172a] hover:bg-black text-white text-sm font-medium px-5 py-2 rounded-full shadow-lg transition-all">
                Get Started
                <ArrowRight className="w-4 h-4 text-white/70" />
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
