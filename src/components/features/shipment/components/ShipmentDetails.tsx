import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { InputField } from "@/components/ui/InputField";
import { SelectField } from "@/components/ui/SelectField";
import { TextAreaField } from "@/components/ui/TextAreaField";

interface ShipmentDetailsProps {
  hasEnhancedCover: boolean;
  setHasEnhancedCover: (val: boolean) => void;
  serviceCompany: string;
  setServiceCompany: (val: string) => void;
  serviceType: string;
  setServiceType: (val: string) => void;
  serviceTypeOptions: { value: string; label: string }[];
  selectedService: { name: string; dimensions: string; payload: string; pallets: string; } | null | undefined;
}

export const ShipmentDetails = React.memo(function ShipmentDetails({ 
  hasEnhancedCover,
  setHasEnhancedCover,
  serviceCompany,
  setServiceCompany,
  serviceType,
  setServiceType,
  serviceTypeOptions,
  selectedService
}: ShipmentDetailsProps) {
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

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
      <div className="bg-[#081b4c] border-b border-[#081b4c] p-5 rounded-t-2xl">
        <h2 className="text-lg font-extrabold text-white tracking-tight">Step 3: Package & Shipment Details</h2>
        <p className="text-xs text-blue-100 font-medium mt-0.5">Define your package size and required service.</p>
      </div>
      
      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6 relative">
        <InputField 
          label="Customer Reference" 
          type="text" 
          placeholder="e.g. CUST-001" 
        />
        <InputField 
          label={
            <div className="flex items-center gap-2 justify-between w-full">
              <span>Enhanced Cover</span>
              <label className="flex items-center gap-1.5 cursor-pointer text-gray-500 font-normal">
                <input
                  type="checkbox"
                  checked={hasEnhancedCover}
                  onChange={(e) => setHasEnhancedCover(e.target.checked)}
                  className="w-3.5 h-3.5 text-[#081b4c] border-gray-300 rounded focus:ring-[#081b4c]"
                />
                <span className="text-xs">Optional</span>
              </label>
            </div>
          }
          type="number" 
          placeholder="e.g. 1000" 
        />
        <InputField 
          label="Sender VAT Number" 
          type="text" 
          placeholder="e.g. GB123456789" 
        />

        <SelectField
          label="Service Company"
          required
          value={serviceCompany}
          onChange={setServiceCompany}
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
            className="relative w-full px-4 py-2.5 bg-white border border-gray-300 rounded-xl text-sm cursor-pointer hover:border-blue-900 transition-all flex items-center justify-between"
            onClick={() => setIsServiceTypeOpen(!isServiceTypeOpen)}
          >
            <span className={serviceType ? "text-gray-900" : "text-gray-500"}>
              {serviceType ? serviceTypeOptions.find(o => o.value === serviceType)?.label : "Select Service Type..."}
            </span>
            <ChevronDown className="w-5 h-5 text-gray-400" />
            
            {/* Dynamic Indicator */}
            {selectedService && (
              <div className="absolute bottom-[calc(100%+12px)] left-0 z-50 animate-in fade-in slide-in-from-bottom-2 duration-300 cursor-default w-[350px] max-w-full" onClick={(e) => e.stopPropagation()}>
                {/* Arrow */}
                <div className="absolute -bottom-2 left-8 w-4 h-4 bg-white border-b border-r border-gray-200 rotate-45 transform" />
                
                {/* Tooltip Content */}
                <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.1)] relative text-left">
                  <h3 className="font-bold text-[#1f2937] text-base mb-4">
                    {selectedService.name}
                  </h3>
                  <ul className="space-y-1.5 text-sm text-gray-600">
                    <li>
                      <span className="font-bold text-[#1f2937]">Dimensions : </span>
                      {selectedService.dimensions}
                    </li>
                    <li>
                      <span className="font-bold text-[#1f2937]">Payload : </span>
                      {selectedService.payload}
                    </li>
                    <li>
                      <span className="font-bold text-[#1f2937]">Pallets : </span>
                      {selectedService.pallets}
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          {isServiceTypeOpen && (
            <div className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden">
              <ul className="max-h-60 overflow-y-auto py-1">
                {serviceTypeOptions.map((option) => (
                  <li 
                    key={option.value}
                    className="px-4 py-2.5 text-sm hover:bg-blue-50 cursor-pointer transition-colors"
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

        <TextAreaField 
          label="Exact Description" 
          required 
          rows={3}
          containerClassName="md:col-span-3"
          placeholder="e.g. Electronics"
          tooltip="Please add a short description of your package contents, this will be added to your label." 
        />
      </div>
    </div>
  );
});
