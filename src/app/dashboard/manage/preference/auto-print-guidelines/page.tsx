"use client";

import React from "react";
import { Printer, Settings, Download } from "lucide-react";

export default function AutoPrintGuidelinesPage() {

  return (
    <div className="min-h-screen bg-[#f9fafb] flex justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div 
        className="max-w-3xl w-full bg-white rounded-2xl overflow-hidden p-8 sm:p-12 relative"
        style={{ boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
      >
        
        <button 
          onClick={() => window.print()}
          className="absolute top-6 right-6 flex items-center gap-2 bg-[#0b215f] hover:bg-[#081845] text-white font-semibold px-4 py-2 rounded-xl transition-colors print:hidden"
        >
          <Download className="w-4 h-4" />
          <span className="text-sm">Download PDF</span>
        </button>

        <div className="text-center mb-10 mt-2">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-[#dbeafe] rounded-full flex items-center justify-center border-4 border-white" style={{ boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
              <Printer className="w-8 h-8 text-[#2563eb]" />
            </div>
          </div>
          <h1 className="text-3xl font-extrabold text-[#111827] mb-4">Automatic Printing</h1>
          <p className="text-lg text-[#4b5563] leading-relaxed max-w-2xl mx-auto">
            Once you’ve connected your label printer and followed the previous guides to setting up your printer you will be ready to install Auto Print functionality.
          </p>
        </div>

        <div className="mb-10 bg-[#eff6ff] border border-[#dbeafe] rounded-2xl p-6">
          <h2 className="text-xl font-bold text-[#0b215f] mb-4 flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Automatic Print Settings
          </h2>
          <div className="space-y-3 mb-4">
            <div className="flex items-start gap-3 bg-white p-4 rounded-xl border border-[#f3f4f6]" style={{ boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
              <div className="w-2 h-2 mt-2 rounded-full bg-[#3b82f6] flex-shrink-0"></div>
              <div>
                <p className="font-bold text-[#1f2937]">Auto Print <span className="font-medium text-[#6b7280]">- Checks for labels every 5 minutes - (Free)</span></p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-white p-4 rounded-xl border border-[#f3f4f6]" style={{ boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
              <div className="w-2 h-2 mt-2 rounded-full bg-[#3b82f6] flex-shrink-0"></div>
              <div>
                <p className="font-bold text-[#1f2937]">Rapid Print <span className="font-medium text-[#6b7280]">- Checks for labels every 8 Seconds - (Paid)</span></p>
              </div>
            </div>
          </div>
          <p className="text-sm font-semibold text-[#1e40af] bg-[#edf5ff] p-3 rounded-lg">
            Please let your account manager know which print settings you want.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-[#111827] mb-6 border-b border-[#f3f4f6] pb-4">
            Add Automatic Printing
          </h2>
          
          <ol className="space-y-6 relative border-l border-[#e5e7eb] ml-4">
            {[
              "To use Auto Print / Rapid Print you will need to use Google Chrome for all World Options Activity.",
              "If you do not already have Chrome installed, this will be your first step.",
              <span key="3">Click Here to go to the <a href="#" className="text-[#2563eb] hover:underline font-semibold">World Options Auto Print - Google Chrome Extension</a></span>,
              "Choose Add to Chrome,",
              "Log into your Portal account.",
              "Click Manage > Preferences.",
              "Choose Other Settings tab.",
              "Make sure you select the box “Enable Auto Print”",
              "Scroll to the bottom of the page and click the update button.",
              "Installation is now complete. Once you have completed your first shipment labels will now automatically print without clicking any print features. If shipments originate for our third party applications, labels will automatically print whilst Google Chrome browser is active."
            ].map((step, index) => (
              <li key={index} className="relative pl-8">
                <span className="absolute -left-3.5 top-0 w-7 h-7 bg-[#2563eb] text-white rounded-full flex items-center justify-center text-sm font-bold border-4 border-white" style={{ boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
                  {index + 1}
                </span>
                <p className="text-[#374151] pt-0.5 leading-relaxed font-medium">
                  {step}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
