"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown, MessageSquare, Filter, Calendar, ChevronRight } from 'lucide-react';
import clsx from 'clsx';

export function TrackingFilters() {
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [status, setStatus] = useState("Select...");
  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (statusRef.current && !statusRef.current.contains(event.target as Node)) {
        setShowStatusDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex items-center gap-5 flex-wrap">
      {/* Date Filters Container */}
      <div className="flex items-center gap-3 p-1.5 px-3 h-[42px] rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-white uppercase tracking-wider mt-0.5">From</span>
          <input 
            type="date" 
            className="px-3 py-1 border border-transparent rounded-lg text-sm text-gray-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 w-[130px] bg-white shadow-sm h-full"
            defaultValue="2026-06-13"
          />
        </div>
        <div className="w-3 h-[1px] bg-white/40"></div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-white uppercase tracking-wider mt-0.5">To</span>
          <input 
            type="date" 
            className="px-3 py-1 border border-transparent rounded-lg text-sm text-gray-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 w-[130px] bg-white shadow-sm h-full"
            defaultValue="2026-06-19"
          />
        </div>
      </div>

      {/* Other Filters */}
      <div className="flex items-center gap-4 h-[42px] relative" ref={statusRef}>
        <div 
          onClick={() => setShowStatusDropdown(!showStatusDropdown)}
          className="px-4 py-2 border border-white/20 rounded-xl text-sm font-bold text-gray-800 focus:outline-none focus:border-[#081b4c] focus:ring-1 focus:ring-[#081b4c] min-w-[240px] bg-white cursor-pointer hover:bg-gray-50 transition-colors flex items-center justify-between h-full shadow-sm"
        >
          <span className="truncate pr-2">{status}</span>
          <ChevronDown className={`w-4 h-4 shrink-0 text-gray-400 transition-transform ${showStatusDropdown ? 'rotate-180' : ''}`} />
        </div>

        {showStatusDropdown && (
          <div className="absolute top-full left-0 min-w-full w-max mt-2 bg-white border border-gray-200 shadow-xl rounded-xl z-50 py-1">
            {[
              "Select...",
              "Tracking Number",
              "Customer Reference",
              "Carrier",
              "Destination Postcode",
              "Tracking Status",
              "Receiver Company",
              "Shipper Company",
              "Payment Status",
              "Origin Country",
              "Destination Country",
              "Invoice Number",
              "Alternative Tracking Number"
            ].map((opt) => (
              <div 
                key={opt}
                onClick={() => { setStatus(opt); setShowStatusDropdown(false); }}
                className="px-4 py-2 hover:bg-gray-50 text-sm font-medium text-gray-700 cursor-pointer whitespace-nowrap"
              >
                {opt}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 h-[42px]">
        <input 
          type="text" 
          placeholder="Search by ID, location..."
          className="px-4 py-2 border border-white/20 rounded-xl text-sm text-gray-700 focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/40 min-w-[220px] bg-white shadow-sm"
        />
        <button className="bg-green-100 hover:bg-green-200 text-green-800 px-4 py-2 rounded-xl flex items-center justify-center transition-colors shadow-sm h-full border border-green-200">
          <Search className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export function TrackingActions({ 
  onTrackingAndPodClick, 
  hasSelectedTracking 
}: { 
  onTrackingAndPodClick?: () => void;
  hasSelectedTracking?: boolean;
}) {
  const [showDocsDropdown, setShowDocsDropdown] = useState(false);
  const [showLabelSubMenu, setShowLabelSubMenu] = useState(false);
  const [showMoreDropdown, setShowMoreDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const moreDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDocsDropdown(false);
        setShowLabelSubMenu(false);
      }
      if (moreDropdownRef.current && !moreDropdownRef.current.contains(event.target as Node)) {
        setShowMoreDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex items-center gap-3 flex-wrap w-full min-w-max mb-6">
      <button 
        onClick={onTrackingAndPodClick}
        className={`px-5 py-2.5 text-sm font-bold rounded-xl transition-all ${hasSelectedTracking ? 'bg-[#4DB8FF] hover:bg-[#3baee6] text-white shadow-md cursor-pointer' : 'bg-blue-50 text-[#081b4c] opacity-70 cursor-not-allowed'}`}
      >
        Tracking & POD
      </button>

      <div className="relative" ref={dropdownRef}>
        <button 
          onClick={() => setShowDocsDropdown(!showDocsDropdown)}
          className="bg-white border border-gray-200 hover:bg-gray-50 text-[#081b4c] px-5 py-2.5 text-sm font-bold rounded-xl transition-colors flex items-center gap-2 shadow-sm"
        >
          Shipment Documents
          <ChevronDown className="w-4 h-4 text-[#081b4c]" />
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

      <button className="bg-white border border-gray-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200 text-gray-700 px-5 py-2.5 text-sm font-bold rounded-xl transition-colors shadow-sm">
        Void
      </button>

      <button className="bg-white border border-gray-200 hover:bg-gray-50 text-[#081b4c] px-5 py-2.5 text-sm font-bold rounded-xl transition-colors shadow-sm">
        Watch Shipment
      </button>

      <button 
        style={{ background: 'linear-gradient(216.06deg, #01387B 3.2%, #002A5C 105.02%)' }}
        className="hover:opacity-90 text-white px-5 py-2.5 text-sm font-bold rounded-xl transition-all shadow-sm"
      >
        Book Collection
      </button>

      <div className="relative" ref={moreDropdownRef}>
        <button 
          onClick={() => setShowMoreDropdown(!showMoreDropdown)}
          className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-5 py-2.5 text-sm font-bold rounded-xl transition-colors flex items-center gap-2 shadow-sm"
        >
          More
          <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${showMoreDropdown ? 'rotate-180' : ''}`} />
        </button>

        {showMoreDropdown && (
          <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-xl z-50 py-2 animate-in fade-in zoom-in-95 duration-200">
            {[
              "Export CSV",
              "Return Service",
              "Rebook",
              "Print Invoice",
              "Refresh Status",
              "Refresh Status All"
            ].map((opt) => (
              <div 
                key={opt}
                onClick={() => setShowMoreDropdown(false)}
                className="px-4 py-2 hover:bg-gray-50 text-sm font-medium text-gray-700 cursor-pointer"
              >
                {opt}
              </div>
            ))}
          </div>
        )}
      </div>

      <button className="ml-auto bg-[#f97316] hover:bg-[#ea580c] text-white px-5 py-2.5 text-sm font-bold rounded-xl transition-colors shadow-sm flex items-center gap-2">
        Support
        <MessageSquare className="w-4 h-4" />
      </button>
    </div>
  );
}
