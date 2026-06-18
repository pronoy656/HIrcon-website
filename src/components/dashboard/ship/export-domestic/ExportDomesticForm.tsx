"use client";

import { useState, useRef, useEffect } from "react";
import { Check, ChevronRight, Info, ChevronDown } from "lucide-react";
import clsx from "clsx";
import { InputField } from "@/components/common/InputField";
import { SelectField } from "@/components/common/SelectField";

const serviceDetails: Record<string, { dimensions: string; payload: string; pallets: string; name: string }> = {
  "bike": { dimensions: "0.5m (L) x 0.5m (W) x 0.5m (H)", payload: "Max 10kg", pallets: "0", name: "Bike" },
  "large-van": { dimensions: "2.0m (L) x 1.2m (W) x 1.2m (H)", payload: "Max 800kg", pallets: "2", name: "Large Van" },
  "priority-bike": { dimensions: "0.5m (L) x 0.5m (W) x 0.5m (H)", payload: "Max 10kg", pallets: "0", name: "Priority Bike" },
  "priority-transit": { dimensions: "3.0m (L) x 1.5m (W) x 1.5m (H)", payload: "Max 1000kg", pallets: "3", name: "Priority Transit" },
  "priority-van": { dimensions: "2.5m (L) x 1.4m (W) x 1.4m (H)", payload: "Max 900kg", pallets: "2", name: "Priority Van" },
  "rush-bike": { dimensions: "0.5m (L) x 0.5m (W) x 0.5m (H)", payload: "Max 10kg", pallets: "0", name: "Rush Bike" },
  "small-van": { dimensions: "1.5m (L) x 1.0m (W) x 1.0m (H)", payload: "Max 400kg", pallets: "1", name: "Small Van" },
};

export function ExportDomesticForm() {
  const [serviceType, setServiceType] = useState("");
  const [isServiceTypeOpen, setIsServiceTypeOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsServiceTypeOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const serviceTypeOptions = [
    { value: "bike", label: "Bike" },
    { value: "large-van", label: "Large Van" },
    { value: "priority-bike", label: "Priority Bike" },
    { value: "priority-transit", label: "Priority Transit" },
    { value: "priority-van", label: "Priority Van" },
    { value: "rush-bike", label: "Rush Bike" },
    { value: "small-van", label: "Small Van" },
  ];

  const steps = [
    { id: 1, name: "Address Details", status: "current" },
    { id: 2, name: "Parcel Details", status: "upcoming" },
    { id: 3, name: "Summary", status: "upcoming" },
    { id: 4, name: "Label & Payment", status: "upcoming" },
  ];

  const selectedService = serviceType ? serviceDetails[serviceType] : null;

  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-500 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2 tracking-tight">Export Domestic</h1>
        <p className="text-gray-500 font-medium">Create a new domestic shipment request.</p>
      </div>

      {/* Progress Bar */}
      <div className="pb-4">
        <nav aria-label="Progress">
          <ol role="list" className="flex items-center justify-between w-full max-w-4xl mx-auto">
            {steps.map((step, stepIdx) => (
              <li key={step.name} className={clsx(stepIdx !== steps.length - 1 ? "flex-1" : "", "relative")}>
                {step.status === 'complete' ? (
                  <>
                    <div className="absolute inset-0 flex items-center" aria-hidden="true">
                      <div className="h-1 w-full bg-[#E8500A]" />
                    </div>
                    <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-[#E8500A] hover:bg-orange-700">
                      <Check className="h-5 w-5 text-white" aria-hidden="true" />
                    </div>
                  </>
                ) : step.status === 'current' ? (
                  <>
                    <div className="absolute inset-0 flex items-center" aria-hidden="true">
                      <div className="h-1 w-full bg-gray-200" />
                    </div>
                    <div className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#E8500A] bg-white" aria-current="step">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#E8500A]" aria-hidden="true" />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="absolute inset-0 flex items-center" aria-hidden="true">
                      <div className="h-1 w-full bg-gray-200" />
                    </div>
                    <div className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white hover:border-gray-400">
                      <span className="h-2.5 w-2.5 rounded-full bg-transparent group-hover:bg-gray-300" aria-hidden="true" />
                    </div>
                  </>
                )}
                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-bold text-gray-500 whitespace-nowrap">
                  {step.name}
                </span>
              </li>
            ))}
          </ol>
        </nav>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Step 1: Collection Address */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-gray-50/50 border-b border-gray-100 p-5">
            <h2 className="text-lg font-extrabold text-gray-900 tracking-tight">Step 1: Collection Address</h2>
            <p className="text-xs text-gray-500 font-medium mt-0.5">Where is the package coming from?</p>
          </div>
          
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
            <SelectField
              label="Address Book"
              options={[
                { value: "1", label: "Main Office" },
                { value: "2", label: "Warehouse A" }
              ]}
              placeholder="Select from Address Book..."
              containerClassName="sm:col-span-2"
            />

            <InputField label="Reference" type="text" />
            <InputField label="Company" type="text" />
            <InputField label="Contact Name" type="text" containerClassName="sm:col-span-2" />
            <InputField label="Address Line 1" type="text" required containerClassName="sm:col-span-2" />
            <InputField label="Address Line 2" type="text" optional containerClassName="sm:col-span-2" />
            <InputField label="Address Line 3" type="text" optional containerClassName="sm:col-span-2" />

            <SelectField
              label="Country"
              optional
              options={[
                { value: "UK", label: "United Kingdom" },
                { value: "US", label: "United States" }
              ]}
            />

            <InputField label="City Name" type="text" required />
            <InputField label="Post Code" type="text" required />
            <InputField label="Phone" type="tel" required />
            <InputField label="Email" type="email" required containerClassName="sm:col-span-2" />
          </div>
        </div>

        {/* Step 2: Delivery Address */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-gray-50/50 border-b border-gray-100 p-5">
            <h2 className="text-lg font-extrabold text-gray-900 tracking-tight">Step 2: Delivery Address</h2>
            <p className="text-xs text-gray-500 font-medium mt-0.5">Where is the package going to?</p>
          </div>
          
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
            <SelectField
              label="Address Book"
              options={[
                { value: "1", label: "Client A" },
                { value: "2", label: "Client B" }
              ]}
              placeholder="Select from Address Book..."
              containerClassName="sm:col-span-2"
            />

            <InputField label="Reference" type="text" />
            <InputField label="Company" type="text" />
            <InputField label="Contact Name" type="text" containerClassName="sm:col-span-2" />
            <InputField label="Address Line 1" type="text" required containerClassName="sm:col-span-2" />
            <InputField label="Address Line 2" type="text" optional containerClassName="sm:col-span-2" />
            <InputField label="Address Line 3" type="text" optional containerClassName="sm:col-span-2" />

            <SelectField
              label="Country"
              optional
              options={[
                { value: "UK", label: "United Kingdom" },
                { value: "US", label: "United States" }
              ]}
            />

            <InputField label="City Name" type="text" required />
            <InputField label="Post Code" type="text" required />
            <InputField label="Phone" type="tel" required />
            <InputField label="Email" type="email" required containerClassName="sm:col-span-2" />
          </div>
        </div>
      </div>

      {/* Step 3: Package & Shipment Details */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="bg-gray-50/50 border-b border-gray-100 p-5 rounded-t-2xl">
          <h2 className="text-lg font-extrabold text-gray-900 tracking-tight">Step 3: Package & Shipment Details</h2>
          <p className="text-xs text-gray-500 font-medium mt-0.5">Define your package size and required service.</p>
        </div>
        
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          <SelectField
            label="Service Company"
            required
            options={[
              { value: "dhl", label: "DHL" },
              { value: "fedex", label: "FedEx" },
              { value: "ups", label: "UPS" },
              { value: "royal-mail", label: "Royal Mail" }
            ]}
            placeholder="Select Service Company..."
          />

          <div className="relative" ref={dropdownRef}>
            <label className="block text-sm font-bold text-gray-700 mb-1.5">
              Service Type <span className="text-red-500">*</span>
            </label>
            <div 
              className="relative w-full px-4 py-2.5 bg-white border border-gray-300 rounded-xl text-sm cursor-pointer hover:border-orange-500 transition-all flex items-center justify-between"
              onClick={() => setIsServiceTypeOpen(!isServiceTypeOpen)}
            >
              <span className={serviceType ? "text-gray-900" : "text-gray-500"}>
                {serviceType ? serviceTypeOptions.find(o => o.value === serviceType)?.label : "Select Service Type..."}
              </span>
              <ChevronDown className="w-5 h-5 text-gray-400" />
              
              {/* Dynamic Indicator */}
              {selectedService && (
                <div className="absolute bottom-full right-0 mb-4 w-[350px] z-50 animate-in fade-in slide-in-from-bottom-4 duration-500 cursor-default" onClick={(e) => e.stopPropagation()}>
                  {/* Dotted Line pointing down to the arrow */}
                  <div className="absolute -bottom-4 right-5 flex flex-col items-center">
                    <div className="h-5 border-l-2 border-dotted border-slate-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-800 -mt-1 relative z-10 shadow-sm" />
                  </div>
                  
                  {/* Premium Indicator Card */}
                  <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)] border border-slate-200/60 p-5 w-full text-left">
                    <h3 className="font-bold text-slate-800 text-base mb-4">
                      {selectedService.name}
                    </h3>
                    <ul className="space-y-2 text-sm text-slate-600">
                      <li>
                        <span className="font-bold text-slate-800">Dimensions : </span>
                        {selectedService.dimensions}
                      </li>
                      <li>
                        <span className="font-bold text-slate-800">Payload : </span>
                        {selectedService.payload}
                      </li>
                      <li>
                        <span className="font-bold text-slate-800">Pallets : </span>
                        {selectedService.pallets}
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Custom Dropdown List */}
            {isServiceTypeOpen && (
              <div className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden">
                <ul className="max-h-60 overflow-y-auto py-1">
                  {serviceTypeOptions.map((option) => (
                    <li 
                      key={option.value}
                      className="px-4 py-2.5 text-sm hover:bg-orange-50 cursor-pointer transition-colors"
                      onClick={() => {
                        setServiceType(option.value);
                        setIsServiceTypeOpen(false);
                      }}
                    >
                      {option.label}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <SelectField
            label="Package Type"
            required
            options={[
              { value: "box", label: "Box" },
              { value: "envelope", label: "Envelope" },
              { value: "pallet", label: "Pallet" },
              { value: "tube", label: "Tube" }
            ]}
            placeholder="Select Package Type..."
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4 mt-2">
        <button className="px-6 py-2.5 text-sm font-bold text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
          Save as Draft
        </button>
        <button className="px-6 py-2.5 text-sm font-bold text-white bg-[#E8500A] rounded-xl hover:bg-orange-700 transition-colors shadow-sm flex items-center gap-2">
          Continue to Summary
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
