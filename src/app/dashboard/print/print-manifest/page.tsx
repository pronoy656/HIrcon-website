"use client";

import React, { useState } from 'react';
import { SelectField } from '@/components/common/SelectField';
import { InputField } from '@/components/common/InputField';
import { FileText, Truck, Printer } from 'lucide-react';

export default function PrintManifestPage() {
  // State for Generic Manifest
  const [genericService, setGenericService] = useState('all');
  const [genericDate, setGenericDate] = useState('');

  // State for Driver Manifest
  const [driverService, setDriverService] = useState('all');
  const [driverDate, setDriverDate] = useState('');

  const genericServiceOptions = [
    { value: 'all', label: 'All' },
    { value: 'city-print', label: 'City Print' },
    { value: 'dhl-gb', label: 'DHL GB' },
    { value: 'dhl-international', label: 'DHL International' },
    { value: 'dsv', label: 'DSV' },
    { value: 'fedex', label: 'FedEx' },
    { value: 'palletways', label: 'Palletways' },
    { value: 'tnt', label: 'TNT' },
    { value: 'ups-gb', label: 'UPS GB' },
    { value: 'ups-int', label: 'UPS INT' },
    { value: 'spot-rate', label: 'Spot Rate' },
  ];

  const driverServiceOptions = [
    { value: 'all', label: 'All' },
  ];

  const handleGenerateGeneric = () => {
    // Replace with real logic if needed
    alert(`Generating Generic Manifest for service: ${genericService} on date: ${genericDate || 'Not selected'}`);
  };

  const handleGenerateDriver = () => {
    // Replace with real logic if needed
    alert(`Generating Driver Manifest for service: ${driverService} on date: ${driverDate || 'Not selected'}`);
  };

  return (
    <div className="p-8 max-w-6xl mx-auto animate-in fade-in duration-500">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Print Manifests</h1>
        <p className="text-blue-100 mt-2 font-medium">Generate generic and driver manifests based on service type and date.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Generic Manifest Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
          <div className="bg-[#081b4c] p-6 border-b border-[#081b4c]">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <FileText className="w-6 h-6 text-blue-100" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Generic Manifest</h2>
                <p className="text-sm text-blue-200 mt-1">Generate manifest for all or specific services</p>
              </div>
            </div>
          </div>
          
          <div className="p-8 flex flex-col gap-6 flex-grow">
            <SelectField
              label="Service"
              options={genericServiceOptions}
              value={genericService}
              onChange={setGenericService}
              placeholder="Select Service"
              required
            />
            
            <InputField 
              label="Date" 
              type="date" 
              value={genericDate}
              onChange={(e) => setGenericDate(e.target.value)}
              required
            />
          </div>

          <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-end">
            <button 
              onClick={handleGenerateGeneric}
              className="px-6 py-2.5 bg-[#081b4c] hover:bg-blue-950 text-white font-bold rounded-xl transition-colors shadow-sm flex items-center gap-2"
            >
              <Printer className="w-4 h-4" />
              Generate Manifest
            </button>
          </div>
        </div>

        {/* Driver Manifest Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
          <div className="bg-[#081b4c] p-6 border-b border-[#081b4c]">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <Truck className="w-6 h-6 text-blue-100" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Driver Manifest</h2>
                <p className="text-sm text-blue-200 mt-1">Generate manifest for drivers</p>
              </div>
            </div>
          </div>
          
          <div className="p-8 flex flex-col gap-6 flex-grow">
            <SelectField
              label="Service"
              options={driverServiceOptions}
              value={driverService}
              onChange={setDriverService}
              placeholder="Select Service"
              required
            />
            
            <InputField 
              label="Date" 
              type="date" 
              value={driverDate}
              onChange={(e) => setDriverDate(e.target.value)}
              required
            />
          </div>

          <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-end">
            <button 
              onClick={handleGenerateDriver}
              className="px-6 py-2.5 bg-[#081b4c] hover:bg-blue-950 text-white font-bold rounded-xl transition-colors shadow-sm flex items-center gap-2"
            >
              <Printer className="w-4 h-4" />
              Generate Manifest
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
