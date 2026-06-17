"use client";

import { useState, useRef, useEffect } from "react";
import { User, LogOut, ChevronDown, Bell } from "lucide-react";
import clsx from "clsx";

export function Topbar() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <header className="h-[80px] bg-white border-b border-gray-100 px-8 flex items-center justify-between sticky top-0 z-10 shadow-sm">
      
      <div>
        {/* Placeholder for left side of topbar if needed later (e.g. breadcrumbs or search) */}
        <h2 className="text-lg font-bold text-gray-800">Dashboard</h2>
      </div>

      <div className="flex items-center gap-6">
        <button className="relative text-gray-400 hover:text-gray-900 transition-colors">
          <Bell className="w-6 h-6" />
          <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-[#E8500A] border-2 border-white rounded-full"></span>
        </button>

        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-3 hover:bg-gray-50 p-1.5 rounded-full pr-4 transition-colors border border-transparent hover:border-gray-200"
          >
            <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-[#E8500A] overflow-hidden">
              <User className="w-5 h-5" />
            </div>
            <div className="flex flex-col items-start hidden sm:flex">
              <span className="text-sm font-bold text-gray-900 leading-tight">John Doe</span>
              <span className="text-xs text-gray-500">Admin</span>
            </div>
            <ChevronDown className={clsx("w-4 h-4 text-gray-400 transition-transform duration-200", isOpen && "rotate-180")} />
          </button>

          {isOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 py-2 animate-in fade-in slide-in-from-top-2 z-50">
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-sm font-bold text-gray-900">John Doe</p>
                <p className="text-sm text-gray-500 font-medium mt-0.5">john.doe@swiftdrop.com</p>
              </div>
              
              <div className="py-1">
                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-[#E8500A] flex items-center gap-2 font-medium">
                  <User className="w-4 h-4" />
                  My Profile
                </button>
              </div>
              
              <div className="py-1 border-t border-gray-100">
                <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 font-medium">
                  <LogOut className="w-4 h-4" />
                  Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
