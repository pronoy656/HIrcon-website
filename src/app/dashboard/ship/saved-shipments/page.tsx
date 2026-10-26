"use client";

import { useState } from "react";
import { Package, Search, ChevronRight } from "lucide-react";

export default function SavedShipmentsPage() {
  const [selectedOption, setSelectedOption] = useState("");
  const [displayedOption, setDisplayedOption] = useState("");

  const handleGo = () => {
    if (selectedOption) {
      setDisplayedOption(selectedOption);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-transparent flex flex-col">
      {/* Blue Header Section */}
      <div className="bg-[#081b4c] w-full pt-12 pb-20 px-6">
        <div className="max-w-5xl mx-auto w-full">
          <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
            <Package className="w-8 h-8 text-white" />
            Saved Shipments
          </h1>
          <p className="text-white/80 mt-2 text-lg">View and manage your previously saved shipment routes.</p>
        </div>
      </div>

      {/* Main Content Area (Overlapping the Blue Header) */}
      <div className="max-w-5xl mx-auto w-full px-6 -mt-12 relative z-10">
        {/* Search Card Section */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-xl mb-8">
          <div className="flex flex-col sm:flex-row items-end gap-4">
            <div className="flex-1 w-full text-left">
              <label className="block text-sm font-bold text-gray-700 mb-2">Select a Shipment</label>
              <div className="relative">
                <select 
                  className="w-full appearance-none border border-gray-300 rounded-lg px-4 py-3 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#081b4c] focus:border-transparent transition-all"
                  value={selectedOption}
                  onChange={(e) => setSelectedOption(e.target.value)}
                >
                  <option value="" disabled>Choose from your saved routes...</option>
                  <option value="Shipment A (US to UK)">Shipment A: New York (US) ➔ London (UK)</option>
                  <option value="Shipment B (China to US)">Shipment B: Shanghai (CN) ➔ Los Angeles (US)</option>
                  <option value="Shipment C (Germany to India)">Shipment C: Hamburg (DE) ➔ Mumbai (IN)</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                  <ChevronRight className="w-5 h-5 rotate-90" />
                </div>
              </div>
            </div>
            
            <button 
              className="w-full sm:w-auto bg-[#081b4c] hover:bg-[#06153b] text-white px-8 py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleGo}
              disabled={!selectedOption}
            >
              <Search className="w-5 h-5" />
              Load Details
            </button>
          </div>
        </div>

        {/* Details Section */}
        {displayedOption && (
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                Details for: {displayedOption.split(':')[0]}
              </h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
                  <p className="text-sm text-gray-500 mb-1">Route Info</p>
                  <p className="font-medium text-gray-900">{displayedOption}</p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
                  <p className="text-sm text-gray-500 mb-1">Status</p>
                  <p className="font-medium text-green-600">Ready to Ship</p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
                  <p className="text-sm text-gray-500 mb-1">Estimated Cost</p>
                  <p className="font-medium text-gray-900">$1,250.00</p>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <button className="text-[#081b4c] hover:text-[#06153b] font-medium text-sm flex items-center gap-1 transition-colors">
                  View Full Summary <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
