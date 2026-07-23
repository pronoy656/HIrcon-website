"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Globe, ArrowRight, Menu, X } from "lucide-react";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="fixed top-4 sm:top-6 left-0 right-0 z-50 flex justify-center px-3 sm:px-4 pointer-events-none">
      <nav className="w-full max-w-[1400px] bg-white/70 backdrop-blur-xl rounded-2xl sm:rounded-[2rem] shadow-[0_8px_32px_rgba(0,0,0,0.06)] border border-white/80 relative overflow-hidden pointer-events-auto transition-all duration-300 hover:bg-white/80">
        
        <div className="relative z-10 flex items-center justify-between px-4 sm:px-8 py-3 sm:py-3.5">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="/ExShip logo-01.png" 
              alt="ExShip Logo" 
              className="h-7 sm:h-8 w-auto object-contain transition-transform group-hover:scale-105" 
            />
          </Link>

          {/* Center Links - Desktop */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-8 ml-6 xl:ml-12 min-w-0">
            <div className="flex items-center gap-1 cursor-pointer group">
              <span className="text-xs xl:text-sm font-medium text-slate-700 group-hover:text-[#4f46e5] transition-colors whitespace-nowrap">Products</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#4f46e5] transition-colors shrink-0" />
            </div>
            <div className="flex items-center gap-1 cursor-pointer group">
              <span className="text-xs xl:text-sm font-medium text-slate-700 group-hover:text-[#4f46e5] transition-colors whitespace-nowrap">Solutions</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#4f46e5] transition-colors shrink-0" />
            </div>
            <Link href="#integrations" className="text-xs xl:text-sm font-medium text-slate-700 hover:text-[#4f46e5] transition-colors whitespace-nowrap">
              Integrations
            </Link>
            <div className="flex items-center gap-1 cursor-pointer group">
              <span className="text-xs xl:text-sm font-medium text-slate-700 group-hover:text-[#4f46e5] transition-colors whitespace-nowrap">Resources</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#4f46e5] transition-colors shrink-0" />
            </div>
            <div className="flex items-center gap-1 cursor-pointer group">
              <span className="text-xs xl:text-sm font-medium text-slate-700 group-hover:text-[#4f46e5] transition-colors whitespace-nowrap">Company</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#4f46e5] transition-colors shrink-0" />
            </div>
            <Link href="#pricing" className="text-xs xl:text-sm font-medium text-slate-700 hover:text-[#4f46e5] transition-colors whitespace-nowrap">
              Pricing
            </Link>
          </div>

          <div className="flex-1 min-w-0"></div>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <div className="hidden md:flex items-center gap-1.5 cursor-pointer text-slate-600 hover:text-[#4f46e5] transition-colors">
              <Globe className="w-4 h-4" />
              <span className="text-xs xl:text-sm font-medium">EN</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-70" />
            </div>
            
            <div className="flex items-center gap-2 sm:gap-3">
              <Link href="/auth/login" className="text-xs sm:text-sm font-medium text-slate-700 hover:text-slate-900 px-3 sm:px-5 py-1.5 sm:py-2 rounded-full border border-slate-300/60 hover:bg-slate-100/50 transition-colors shadow-sm whitespace-nowrap">
                Login
              </Link>
              <Link href="/auth/register" className="flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-[#0a192f] to-[#3b82f6] hover:opacity-90 text-white text-xs sm:text-sm font-medium px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full shadow-md transition-all whitespace-nowrap">
                <span>Get Started</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white/80 shrink-0" />
              </Link>
            </div>

            {/* Mobile Hamburger Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors ml-1"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200/60 bg-white/95 px-6 py-5 space-y-4 animate-in slide-in-from-top-2 fade-in duration-200">
            <div className="space-y-3">
              <div className="font-semibold text-slate-800 text-sm py-1 border-b border-slate-100">Products</div>
              <div className="font-semibold text-slate-800 text-sm py-1 border-b border-slate-100">Solutions</div>
              <Link href="#integrations" onClick={() => setIsMobileMenuOpen(false)} className="block font-semibold text-slate-800 text-sm py-1 border-b border-slate-100">
                Integrations
              </Link>
              <div className="font-semibold text-slate-800 text-sm py-1 border-b border-slate-100">Resources</div>
              <div className="font-semibold text-slate-800 text-sm py-1 border-b border-slate-100">Company</div>
              <Link href="#pricing" onClick={() => setIsMobileMenuOpen(false)} className="block font-semibold text-slate-800 text-sm py-1 border-b border-slate-100">
                Pricing
              </Link>
            </div>

            <div className="pt-2 flex items-center justify-between text-sm text-slate-600 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-slate-500" />
                <span>Language: EN</span>
              </div>
            </div>
          </div>
        )}

      </nav>
    </div>
  );
}
