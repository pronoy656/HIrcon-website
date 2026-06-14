import React from "react";
import Image from "next/image";
import "@/styles/custom-shapes.css";

export function AuthLayout({ children, bottomText }: { children: React.ReactNode, bottomText?: React.ReactNode }) {
  return (
    <div className="auth-container">
      {/* Left Purple Panel */}
      <div className="auth-left-panel">
        <div className="flex flex-col items-center justify-center max-w-md text-center">
          <Image 
            src="/logo.png" 
            alt="Hirconn Logo" 
            width={160} 
            height={160} 
            className="mb-6"
          />
          <h1 className="text-4xl md:text-5xl font-bold mb-4 mt-4">
            Connect with the best.
          </h1>
          <p className="text-lg text-white/90 mb-12 px-4 leading-relaxed">
            Join over 2 million professionals and companies worldwide on Hirconn. High-end networking for the modern era.
          </p>
          
          <div className="flex gap-4 w-full justify-center">
            {/* Stat Card 1 */}
            <div className="bg-white text-black py-3 px-6 rounded-xl flex flex-col items-center flex-1 shadow-lg shadow-black/10">
              <Image src="/add-user 1.png" alt="Users" width={24} height={24} className="mb-2" />
              <span className="font-semibold text-sm">2M+ Users</span>
            </div>
            
            {/* Stat Card 2 */}
            <div className="bg-white text-black py-3 px-6 rounded-xl flex flex-col items-center flex-1 shadow-lg shadow-black/10">
              <Image src="/Work1 1.png" alt="Jobs" width={24} height={24} className="mb-2" />
              <span className="font-semibold text-sm">50k+ Jobs</span>
            </div>
            
            {/* Stat Card 3 */}
            <div className="bg-white text-black py-3 px-6 rounded-xl flex flex-col items-center flex-1 shadow-lg shadow-black/10">
              <Image src="/verified (1) 4.png" alt="Verified" width={24} height={24} className="mb-2" />
              <span className="font-semibold text-sm">Verified</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Form Panel */}
      <div className="auth-right-panel">
        <div className="auth-form-wrapper">
          {children}
        </div>
        <div className="bottom-swoosh"></div>
        {bottomText && (
          <div className="absolute bottom-6 w-full text-center z-10 text-xs text-muted-foreground">
            {bottomText}
          </div>
        )}
      </div>
    </div>
  );
}
