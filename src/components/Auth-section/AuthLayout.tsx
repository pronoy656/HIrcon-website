import React from "react";
import Image from "next/image";
import "@/styles/custom-shapes.css";

export function AuthLayout({ children, bottomText }: { children: React.ReactNode, bottomText?: React.ReactNode }) {
  return (
    <div className="auth-container">
      {/* Left Panel — Full Image with Gradient Overlay and Centered Logo */}
      <div className="auth-left-panel relative overflow-hidden bg-gray-900">
        
        {/* Full coverage Image - Natural Colors */}
        <Image
          src="/container-bg.png"
          alt="Shipping Background"
          fill
          className="object-cover object-center"
          priority
          unoptimized
        />

        {/* Standard bottom-to-top dark gradient just for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Centered Large Logo */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none pb-40">
          <div className="w-24 h-24 bg-[#081b4c] rounded-[24px] flex items-center justify-center text-white shadow-2xl mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
              <polyline points="3.29 7 12 12 20.71 7"></polyline>
              <line x1="12" y1="22" x2="12" y2="12"></line>
            </svg>
          </div>
          <div className="flex items-center text-[3.5rem] font-black tracking-tight drop-shadow-2xl">
            <span className="text-white">Ex</span>
            <span className="text-[#60A5FA]">Ship</span>
          </div>
        </div>

        {/* Bottom Left Text & Features */}
        <div className="absolute bottom-16 left-12 right-12 z-20">
          <h1 className="text-[2.5rem] font-bold text-white leading-snug mb-8 drop-shadow-md">
            Join the world&apos;s leading<br />delivery network.
          </h1>

          <ul className="space-y-4">
            <li className="flex items-center gap-4 text-white/95 text-[1.1rem] font-medium drop-shadow-sm">
              <div className="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center flex-shrink-0">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </div>
              Fastest cross-border shipping
            </li>
            <li className="flex items-center gap-4 text-white/95 text-[1.1rem] font-medium drop-shadow-sm">
              <div className="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center flex-shrink-0">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </div>
              Access thousands of potential clients
            </li>
            <li className="flex items-center gap-4 text-white/95 text-[1.1rem] font-medium drop-shadow-sm">
              <div className="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center flex-shrink-0">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </div>
              Handle scheduling and tracking in one place
            </li>
          </ul>
        </div>
      </div>

      {/* Right Form Panel — no shape/swoosh */}
      <div className="auth-right-panel relative">
        <div className="auth-form-wrapper pt-10">
          {/* Logo at the top of the form */}
          <div className="flex items-center gap-2.5 mb-12">
            <div className="w-10 h-10 bg-[#081b4c] rounded-[10px] flex items-center justify-center text-white shadow-lg shadow-blue-900/30">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                <polyline points="3.29 7 12 12 20.71 7"></polyline>
                <line x1="12" y1="22" x2="12" y2="12"></line>
              </svg>
            </div>
            <span className="text-2xl font-black tracking-tight text-gray-900">Ex<span className="text-[#081b4c]">Ship</span></span>
          </div>

          {children}
        </div>
        {bottomText && (
          <div className="absolute bottom-6 w-full text-center z-10 text-xs text-muted-foreground">
            {bottomText}
          </div>
        )}
      </div>
    </div>
  );
}
