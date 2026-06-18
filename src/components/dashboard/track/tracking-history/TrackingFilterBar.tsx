"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown, MessageSquare, Filter, Calendar, ChevronRight } from 'lucide-react';
import clsx from 'clsx';

export function TrackingFilterBar() {
  const [applyDateFilter, setApplyDateFilter] = useState(true);
  const [hideMail, setHideMail] = useState(true);
  const [showDocsDropdown, setShowDocsDropdown] = useState(false);
  const [showLabelSubMenu, setShowLabelSubMenu] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDocsDropdown(false);
        setShowLabelSubMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col gap-5 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm w-full min-w-max">
      
      {/* Top Row: Filters & Search */}
      <div className="flex items-end gap-5 flex-wrap">
        
        {/* Date Filters Container */}
        <div className="flex items-center gap-3 p-2 rounded-xl border border-gray-100 bg-gray-50/50">
          <div className="flex items-center gap-2 px-2">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">From</span>
            <input 
              type="date" 
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-[#0b215f] focus:ring-1 focus:ring-[#0b215f] w-[140px] bg-white"
              defaultValue="2026-06-13"
            />
          </div>
          <div className="w-2 h-[1px] bg-gray-300"></div>
          <div className="flex items-center gap-2 px-2">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">To</span>
            <input 
              type="date" 
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-[#0b215f] focus:ring-1 focus:ring-[#0b215f] w-[140px] bg-white"
              defaultValue="2026-06-19"
            />
          </div>
        </div>

        {/* Other Filters */}
        <div className="flex items-center gap-4 h-[42px]">
          <label className="flex items-center gap-2 cursor-pointer text-sm font-bold text-gray-700 select-none ml-2">
            <input 
              type="checkbox" 
              checked={hideMail} 
              onChange={(e) => setHideMail(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 text-[#0b215f] focus:ring-[#0b215f]"
            />
            Hide Mail
          </label>

          <select className="px-4 py-2 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 focus:outline-none focus:border-[#0b215f] focus:ring-1 focus:ring-[#0b215f] min-w-[140px] bg-white cursor-pointer hover:border-gray-300 transition-colors">
            <option value="">Filter by Status</option>
            <option value="transit">In Transit</option>
            <option value="delivered">Delivered</option>
          </select>
        </div>

        {/* Search */}
        <div className="flex items-center gap-2 ml-auto h-[42px]">
          <input 
            type="text" 
            placeholder="Search by ID, location..."
            className="px-4 py-2 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:border-[#0b215f] focus:ring-1 focus:ring-[#0b215f] min-w-[220px] bg-white"
          />
          <button className="bg-[#0b215f] hover:bg-[#0a205a] text-white px-4 py-2 rounded-xl flex items-center justify-center transition-colors shadow-sm h-full">
            <Search className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="h-[1px] w-full bg-gray-100 my-1"></div>

      {/* Bottom Row: Actions */}
      <div className="flex items-center gap-3 flex-wrap">
        
        <button className="bg-blue-50 hover:bg-blue-100 text-[#0b215f] px-5 py-2.5 text-sm font-bold rounded-xl transition-colors">
          Tracking & POD
        </button>

        <div 
          className="relative" 
          ref={dropdownRef}
        >
          <button 
            onClick={() => setShowDocsDropdown(!showDocsDropdown)}
            className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-5 py-2.5 text-sm font-bold rounded-xl transition-colors flex items-center gap-2"
          >
            Shipment Documents
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </button>

          {showDocsDropdown && (
            <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-gray-200 shadow-lg rounded-xl z-50 py-2">
              <div 
                className="relative px-4 py-2 hover:bg-gray-50 text-sm font-medium text-gray-700 cursor-pointer flex justify-between items-center group"
                onMouseEnter={() => setShowLabelSubMenu(true)}
                onMouseLeave={() => setShowLabelSubMenu(false)}
              >
                View Label
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-700" />
                
                {showLabelSubMenu && (
                  <div className="absolute top-0 left-full ml-1 w-48 bg-white border border-gray-200 shadow-lg rounded-xl z-50 py-2">
                    <div className="px-4 py-2 hover:bg-gray-50 text-sm font-medium text-gray-700 cursor-pointer">Label</div>
                    <div className="px-4 py-2 hover:bg-gray-50 text-sm font-medium text-gray-700 cursor-pointer">Label + Packing Slip</div>
                    <div className="px-4 py-2 hover:bg-gray-50 text-sm font-medium text-gray-700 cursor-pointer">Packing Slip</div>
                  </div>
                )}
              </div>
              <div className="px-4 py-2 hover:bg-gray-50 text-sm font-medium text-gray-700 cursor-pointer">Commercial Invoice</div>
              <div className="px-4 py-2 hover:bg-gray-50 text-sm font-medium text-gray-700 cursor-pointer">Receipt</div>
              <div className="px-4 py-2 hover:bg-gray-50 text-sm font-medium text-gray-700 cursor-pointer">Manifest</div>
              <div className="px-4 py-2 hover:bg-gray-50 text-sm font-medium text-gray-700 cursor-pointer">EXT Description</div>
              <div className="px-4 py-2 hover:bg-gray-50 text-sm font-medium text-gray-700 cursor-pointer">Send Documents</div>
              <div className="px-4 py-2 hover:bg-gray-50 text-sm font-medium text-gray-700 cursor-pointer">View Certificates</div>
              <div className="px-4 py-2 hover:bg-gray-50 text-sm font-medium text-gray-700 cursor-pointer">Indemnity Bond</div>
            </div>
          )}
        </div>

        <button className="bg-white border border-gray-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200 text-gray-700 px-5 py-2.5 text-sm font-bold rounded-xl transition-colors">
          Void
        </button>

        <button className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-5 py-2.5 text-sm font-bold rounded-xl transition-colors">
          Watch Shipment
        </button>

        <button className="bg-[#0b215f] hover:bg-[#0a205a] text-white px-5 py-2.5 text-sm font-bold rounded-xl transition-colors shadow-sm">
          Book Collection
        </button>

        <button className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-5 py-2.5 text-sm font-bold rounded-xl transition-colors flex items-center gap-2">
          More
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </button>

        <button className="ml-auto bg-[#E8500A] hover:bg-[#c44308] text-white px-5 py-2.5 text-sm font-bold rounded-xl transition-colors shadow-sm flex items-center gap-2">
          Support
          <MessageSquare className="w-4 h-4" />
        </button>

      </div>
    </div>
  );
}
