"use client";

import React, { useState } from "react";
import { CircleHelp, Download } from "lucide-react";
import Link from "next/link";
import { InputField } from "@/components/ui/InputField";
import { SelectField } from "@/components/ui/SelectField";
import { Modal } from "@/components/ui/Modal";

export function PrintingTab() {
  const [thermalPrinter, setThermalPrinter] = useState(false);
  const [autoPrint, setAutoPrint] = useState(false);
  
  const [qubeVu, setQubeVu] = useState(false);
  const [instantScanOption, setInstantScanOption] = useState("dimensioner");
  
  const [showThermalModal, setShowThermalModal] = useState(false);
  
  // These are kept from the previous audio requirements, the user only asked to fix the image's fields
  const [autoDelete, setAutoDelete] = useState(false);

  const carriers = ["FedEx", "UPS", "TNT", "DHL Express"];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 space-y-10">
      
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Printing and other settings</h2>
        <p className="text-gray-500">Set up your printing preferences and other operational settings.</p>
      </div>

      {/* Print Settings */}
      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-bold text-gray-800 mb-6">Print Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-3 cursor-pointer group w-fit">
                <input 
                  type="checkbox" 
                  checked={thermalPrinter}
                  onChange={(e) => setThermalPrinter(e.target.checked)}
                  className="w-5 h-5 text-[#081b4c] rounded border-gray-300 focus:ring-[#081b4c] cursor-pointer" 
                />
                <span className="text-sm font-bold text-gray-700 group-hover:text-gray-900 transition-colors">
                  Use My Thermal Printer To Print Labels
                </span>
              </label>
              <div className="relative group flex items-center">
                <CircleHelp className="w-5 h-5 text-blue-600 cursor-help" />
              </div>
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  setShowThermalModal(true);
                }}
                className="text-sm font-semibold text-blue-500 hover:text-blue-600 underline underline-offset-2 bg-transparent border-none p-0 cursor-pointer"
              >
                Thermal printer installation guidelines
              </button>
            </div>
            
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-3 cursor-pointer group w-fit">
                <input 
                  type="checkbox" 
                  checked={autoPrint}
                  onChange={(e) => setAutoPrint(e.target.checked)}
                  className="w-5 h-5 text-[#081b4c] rounded border-gray-300 focus:ring-[#081b4c] cursor-pointer" 
                />
                <span className="text-sm font-bold text-gray-700 group-hover:text-gray-900 transition-colors">
                  Enable Auto Print (Beta)
                </span>
              </label>
              <Link 
                href="/dashboard/manage/preference/auto-print-guidelines" 
                target="_blank"
                className="text-sm font-semibold text-blue-500 hover:text-blue-600 underline underline-offset-2"
              >
                Auto print guidelines
              </Link>
            </div>
          </div>
          <div className="-mt-14">
            <InputField label="Default Printer Name" placeholder="Enter default printer name" />
          </div>
        </div>
      </div>

      {/* Advance Printer Settings */}
      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
          <h3 className="text-lg font-bold text-gray-800">Advanced Printer Settings</h3>
          <span className="text-sm text-gray-500 font-medium">Use the below settings to override default print settings</span>
        </div>
        
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 overflow-x-auto">
          <div className="min-w-[600px]">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 pb-4 border-b border-gray-100 font-bold text-sm text-gray-700">
              <div className="col-span-3 text-right pr-4">Carrier</div>
              <div className="col-span-4">Label Type</div>
              <div className="col-span-5">Printer Name</div>
            </div>
            
            {/* Table Rows */}
            <div className="pt-4 space-y-4">
              {carriers.map((carrier) => (
                <div key={carrier} className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-3 font-bold text-gray-800 text-right pr-4 text-sm">{carrier}</div>
                  <div className="col-span-4">
                    <select className="w-full px-4 py-2 rounded-xl text-sm border border-gray-200 bg-white focus:outline-none focus:border-[#081b4c] text-gray-500">
                      <option>Default</option>
                      <option>ZPL</option>
                      <option>PDF</option>
                    </select>
                  </div>
                  <div className="col-span-5">
                    {/* Empty placeholder area for printer name based on image design */}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Other Settings */}
      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-bold text-gray-800 mb-6">Other Settings</h3>
        
        <div className="max-w-2xl space-y-6">
          <div className="grid grid-cols-3 items-center gap-4">
            <label className="text-sm font-bold text-gray-700 text-right">Default Batch CSV :</label>
            <div className="col-span-2">
              <select className="w-full px-4 py-2.5 rounded-xl text-sm border border-gray-200 bg-white focus:outline-none focus:border-[#081b4c] text-gray-700">
                <option>Select One</option>
                <option>Standard</option>
                <option>Custom</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 items-center gap-4">
            <label className="text-sm font-bold text-gray-700 text-right">QubeVu :</label>
            <div className="col-span-2 flex items-center">
              <input 
                type="checkbox" 
                checked={qubeVu}
                onChange={(e) => setQubeVu(e.target.checked)}
                className="w-5 h-5 text-[#081b4c] rounded border-gray-300 focus:ring-[#081b4c] cursor-pointer" 
              />
            </div>
          </div>

          <div className="grid grid-cols-3 items-center gap-4">
            <label className="text-sm font-bold text-gray-700 text-right">Instant Scan :</label>
            <div className="col-span-2 flex items-center gap-6">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input 
                  type="radio" 
                  name="instantScan"
                  value="dimensioner"
                  checked={instantScanOption === "dimensioner"}
                  onChange={(e) => setInstantScanOption(e.target.value)}
                  className="w-4 h-4 text-[#081b4c] border-gray-300 focus:ring-[#081b4c]" 
                />
                <span className="text-sm text-gray-500 font-semibold group-hover:text-gray-800 transition-colors">Dimensioner</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer group">
                <input 
                  type="radio" 
                  name="instantScan"
                  value="scales"
                  checked={instantScanOption === "scales"}
                  onChange={(e) => setInstantScanOption(e.target.value)}
                  className="w-4 h-4 text-[#081b4c] border-gray-300 focus:ring-[#081b4c]" 
                />
                <span className="text-sm text-gray-500 font-semibold group-hover:text-gray-800 transition-colors">Scales</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer group">
                <input 
                  type="radio" 
                  name="instantScan"
                  value="both"
                  checked={instantScanOption === "both"}
                  onChange={(e) => setInstantScanOption(e.target.value)}
                  className="w-4 h-4 text-[#081b4c] border-gray-300 focus:ring-[#081b4c]" 
                />
                <span className="text-sm text-gray-500 font-semibold group-hover:text-gray-800 transition-colors">Both</span>
              </label>
            </div>
          </div>

          <div className="grid grid-cols-3 items-center gap-4">
            <label className="text-sm font-bold text-gray-700 text-right">Default QubeVu Host :</label>
            <div className="col-span-2">
              <div className="w-full h-10 bg-gray-200/60 rounded-xl border border-gray-200/80"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Saved Shipment Settings */}
      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 shadow-sm mb-10">
        <h3 className="text-lg font-bold text-gray-800 mb-6">Saved Shipment Settings</h3>
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-3 cursor-pointer group w-fit">
            <input 
              type="checkbox" 
              checked={autoDelete}
              onChange={(e) => setAutoDelete(e.target.checked)}
              className="w-5 h-5 text-[#081b4c] rounded border-gray-300 focus:ring-[#081b4c] cursor-pointer" 
            />
            <span className="text-sm font-bold text-gray-700 group-hover:text-gray-900 transition-colors">
              Auto delete saved option
            </span>
          </label>
          <div className="relative group flex items-center">
            <CircleHelp className="w-5 h-5 text-red-600 cursor-help" />
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-gray-900 text-white text-xs leading-relaxed rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
              Check this to automatically clear saved shipment options.
              <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end pt-4 pb-12">
        <button className="bg-[#081b4c] hover:bg-[#081b4c]/90 text-white font-semibold py-3 px-10 rounded-xl transition-colors text-lg shadow-md">
          UPDATE
        </button>
      </div>

      {/* Modal for Thermal Printer Guidelines */}
      <Modal
        isOpen={showThermalModal}
        onClose={() => setShowThermalModal(false)}
        title="Thermal Printer Installation"
        maxWidthClass="max-w-lg"
        footer={
          <button 
            onClick={() => setShowThermalModal(false)}
            className="bg-[#081b4c] hover:bg-[#081b4c]/90 text-white font-semibold py-2 px-6 rounded-xl transition-colors shadow-sm"
          >
            Got it
          </button>
        }
      >
        <div className="space-y-6">
          <div className="space-y-2">
            <h4 className="font-bold text-gray-800">Step 1: Download Driver</h4>
            <p className="text-sm text-gray-600 leading-relaxed">Please ensure you have the latest thermal printer driver downloaded for your specific operating system.</p>
          </div>
          <div className="space-y-2">
            <h4 className="font-bold text-gray-800">Step 2: Connect Printer</h4>
            <p className="text-sm text-gray-600 leading-relaxed">Connect your printer via USB and turn it on. Wait for your computer to recognize the new device.</p>
          </div>
          <div className="space-y-2">
            <h4 className="font-bold text-gray-800">Step 3: Print Test Page</h4>
            <p className="text-sm text-gray-600 leading-relaxed">Open your system settings, navigate to Printers & Scanners, and print a test page to verify installation.</p>
          </div>
        </div>
      </Modal>

    </div>
  );
}
