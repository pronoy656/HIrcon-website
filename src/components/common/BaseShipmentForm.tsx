"use client";

import { useState, useRef, useEffect } from "react";
import { Check, ChevronRight, ChevronLeft, Package, ChevronDown } from "lucide-react";
import clsx from "clsx";
import { InputField } from "@/components/common/InputField";
import { SelectField } from "@/components/common/SelectField";

const serviceDetails: Record<string, { dimensions: string; payload: string; pallets: string; name: string; price: number; color: string; carrierLogo: string; carrier: string }> = {
  "bike": { dimensions: "0.5m (L) x 0.5m (W) x 0.5m (H)", payload: "Max 10kg", pallets: "0", name: "Bike", price: 15.00, color: "#d40511", carrierLogo: "DHL", carrier: "DHL" },
  "large-van": { dimensions: "2.0m (L) x 1.2m (W) x 1.2m (H)", payload: "Max 800kg", pallets: "2", name: "Large Van", price: 85.00, color: "#4d148c", carrierLogo: "FedEx", carrier: "FedEx" },
  "priority-bike": { dimensions: "0.5m (L) x 0.5m (W) x 0.5m (H)", payload: "Max 10kg", pallets: "0", name: "Priority Bike", price: 25.00, color: "#ffb500", carrierLogo: "UPS", carrier: "UPS" },
  "priority-transit": { dimensions: "3.0m (L) x 1.5m (W) x 1.5m (H)", payload: "Max 1000kg", pallets: "3", name: "Priority Transit", price: 120.00, color: "#d40511", carrierLogo: "DHL", carrier: "DHL" },
  "priority-van": { dimensions: "2.5m (L) x 1.4m (W) x 1.4m (H)", payload: "Max 900kg", pallets: "2", name: "Priority Van", price: 95.00, color: "#4d148c", carrierLogo: "FedEx", carrier: "FedEx" },
  "rush-bike": { dimensions: "0.5m (L) x 0.5m (W) x 0.5m (H)", payload: "Max 10kg", pallets: "0", name: "Rush Bike", price: 35.00, color: "#d40511", carrierLogo: "DHL", carrier: "DHL" },
  "small-van": { dimensions: "1.5m (L) x 1.0m (W) x 1.0m (H)", payload: "Max 400kg", pallets: "1", name: "Small Van", price: 55.00, color: "#ffb500", carrierLogo: "UPS", carrier: "UPS" },
};

interface BaseShipmentFormProps {
  title: string;
  description: string;
}

export function BaseShipmentForm({ title, description }: BaseShipmentFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [serviceCompany, setServiceCompany] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [isServiceTypeOpen, setIsServiceTypeOpen] = useState(false);
  const [showBoxesSize, setShowBoxesSize] = useState(false);
  const [numBoxes, setNumBoxes] = useState("1");
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
    { id: 1, name: "Address Details", status: "complete" },
    { id: 2, name: "Parcel Details", status: currentStep > 1 ? "complete" : "current" },
    { id: 3, name: "Summary", status: currentStep === 2 ? "current" : "upcoming" },
    { id: 4, name: "Label & Payment", status: "upcoming" },
  ];

  const selectedService = serviceType ? serviceDetails[serviceType] : null;

  const companyLogos: Record<string, { logo: string, color: string, name: string }> = {
    "dhl": { logo: "DHL", color: "#d40511", name: "DHL Express" },
    "fedex": { logo: "FedEx", color: "#4d148c", name: "FedEx" },
    "ups": { logo: "UPS", color: "#ffb500", name: "UPS" },
    "royal-mail": { logo: "RM", color: "#ff0000", name: "Royal Mail" }
  };
  
  const displayService = selectedService || (serviceCompany ? {
    carrierLogo: companyLogos[serviceCompany].logo,
    color: companyLogos[serviceCompany].color,
    name: companyLogos[serviceCompany].name,
    dimensions: "Service type not selected",
    price: 0
  } : null);

  // Price Calculation Mock
  const basePrice = selectedService ? selectedService.price * 0.72 : 0;
  const fuel = selectedService ? selectedService.price * 0.10 : 0;
  const netPrice = basePrice + fuel;
  const vat = selectedService ? selectedService.price * 0.18 : 0;
  const totalPrice = selectedService ? selectedService.price : 0;

  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-500 pb-12 max-w-5xl mx-auto w-full">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2 tracking-tight">{title}</h1>
        <p className="text-gray-500 font-medium">{description}</p>
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
                      <div className="h-1 w-full bg-[#0b215f]" />
                    </div>
                    <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-[#0b215f] hover:bg-blue-950">
                      <Check className="h-5 w-5 text-white" aria-hidden="true" />
                    </div>
                  </>
                ) : step.status === 'current' ? (
                  <>
                    <div className="absolute inset-0 flex items-center" aria-hidden="true">
                      <div className="h-1 w-full bg-gray-200" />
                    </div>
                    <div className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#0b215f] bg-white" aria-current="step">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#0b215f]" aria-hidden="true" />
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

      {currentStep === 1 && (
        <div className="flex flex-col gap-8 animate-in slide-in-from-left-4 duration-300">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {/* Step 1: Collection Address */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-[#0b215f] border-b border-[#0b215f] p-5">
                <h2 className="text-lg font-extrabold text-white tracking-tight">Step 1: Collection Address</h2>
                <p className="text-xs text-blue-100 font-medium mt-0.5">Where is the package coming from?</p>
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

                <InputField label="Reference" type="text" placeholder="e.g. REF-12345" />
                <InputField label="Company" type="text" placeholder="e.g. Acme Corp" />
                <InputField label="Contact Name" type="text" containerClassName="sm:col-span-2" placeholder="e.g. Jane Doe" />
                <InputField label="Address Line 1" type="text" required containerClassName="sm:col-span-2" placeholder="e.g. 123 Main St" />
                <InputField label="Address Line 2" type="text" optional containerClassName="sm:col-span-2" placeholder="e.g. Suite 100" />
                <InputField label="Address Line 3" type="text" optional containerClassName="sm:col-span-2" placeholder="e.g. Building B" />

                <SelectField
                  label="Country"
                  optional
                  options={[
                    { value: "UK", label: "United Kingdom" },
                    { value: "US", label: "United States" }
                  ]}
                />

                <InputField label="City Name" type="text" required placeholder="e.g. London" />
                <InputField label="Post Code" type="text" required placeholder="e.g. SW1A 1AA" />
                <InputField label="Phone" type="tel" required placeholder="e.g. +44 20 7123 4567" />
                <InputField label="Email" type="email" required containerClassName="sm:col-span-2" placeholder="e.g. jane.doe@example.com" />
              </div>
            </div>

            {/* Step 2: Delivery Address */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-[#0b215f] border-b border-[#0b215f] p-5">
                <h2 className="text-lg font-extrabold text-white tracking-tight">Step 2: Delivery Address</h2>
                <p className="text-xs text-blue-100 font-medium mt-0.5">Where is the package going to?</p>
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

                <InputField label="Reference" type="text" placeholder="e.g. DEL-67890" />
                <InputField label="Company" type="text" placeholder="e.g. Globex Inc" />
                <InputField label="Contact Name" type="text" containerClassName="sm:col-span-2" placeholder="e.g. John Smith" />
                <InputField label="Address Line 1" type="text" required containerClassName="sm:col-span-2" placeholder="e.g. 456 High St" />
                <InputField label="Address Line 2" type="text" optional containerClassName="sm:col-span-2" placeholder="e.g. Floor 2" />
                <InputField label="Address Line 3" type="text" optional containerClassName="sm:col-span-2" placeholder="e.g. Business Park" />

                <SelectField
                  label="Country"
                  optional
                  options={[
                    { value: "UK", label: "United Kingdom" },
                    { value: "US", label: "United States" }
                  ]}
                />

                <InputField label="City Name" type="text" required placeholder="e.g. Manchester" />
                <InputField label="Post Code" type="text" required placeholder="e.g. M1 1AA" />
                <InputField label="Phone" type="tel" required placeholder="e.g. +44 161 123 4567" />
                <InputField label="Email" type="email" required containerClassName="sm:col-span-2" placeholder="e.g. john.smith@example.com" />
              </div>
            </div>
          </div>
          
          {/* Step 3: Package & Shipment Details */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="bg-[#0b215f] border-b border-[#0b215f] p-5 rounded-t-2xl">
              <h2 className="text-lg font-extrabold text-white tracking-tight">Step 3: Package & Shipment Details</h2>
              <p className="text-xs text-blue-100 font-medium mt-0.5">Define your package size and required service.</p>
            </div>
            
            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6 relative">
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
                    <div className="absolute bottom-full right-0 mb-4 w-[350px] z-50 animate-in fade-in slide-in-from-bottom-4 duration-500 cursor-default" onClick={(e) => e.stopPropagation()}>
                      <div className="absolute -bottom-4 right-5 flex flex-col items-center">
                        <div className="h-5 border-l-2 border-dotted border-slate-400" />
                        <div className="w-2.5 h-2.5 rounded-full bg-slate-800 -mt-1 relative z-10 shadow-sm" />
                      </div>
                      
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

              <InputField 
                label="Customer Reference" 
                type="text" 
                placeholder="e.g. CUST-001" 
              />
              <InputField 
                label="Exact Description" 
                type="text" 
                required 
                placeholder="e.g. Electronics"
                tooltip="Please add a short description of your package contents, this will be added to your label." 
              />
              <InputField 
                label="Enhanced Cover" 
                type="text" 
                placeholder="e.g. £1000" 
              />
              <InputField label="Sender VAT Number (Applicable if Limited Company)" type="text" placeholder="e.g. GB123456789" containerClassName="md:col-span-2" />
              <div className="flex flex-col gap-2">
                <SelectField
                  label="Number of Boxes"
                  value={numBoxes}
                  onChange={setNumBoxes}
                  options={Array.from({ length: 10 }, (_, i) => ({ value: String(i + 1), label: String(i + 1) }))}
                />
                <div className="flex items-center gap-2 mt-1">
                  <input
                    type="checkbox"
                    id="showBoxesSize"
                    checked={showBoxesSize}
                    onChange={(e) => setShowBoxesSize(e.target.checked)}
                    className="w-4 h-4 text-[#0b215f] border-gray-300 rounded focus:ring-[#0b215f]"
                  />
                  <label htmlFor="showBoxesSize" className="text-sm text-gray-700 font-bold">
                    Show Boxes Size
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Box / Unit Details Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-[#0b215f] border-b border-[#0b215f] p-5 rounded-t-2xl">
              <h2 className="text-lg font-extrabold text-white tracking-tight">Box Details</h2>
              <p className="text-xs text-blue-100 font-medium mt-0.5">Specify the dimensions, weight, and customs for each box.</p>
            </div>
            
            <div className="p-6 flex flex-col gap-6 relative">
              {Array.from({ length: parseInt(numBoxes) || 1 }).map((_, idx) => (
                <div key={idx} className="grid grid-cols-1 md:grid-cols-6 gap-4 p-5 bg-gray-50/50 rounded-xl border border-gray-100">
                  <div className="flex flex-col md:col-span-1">
                    <label className="block text-sm font-bold text-gray-700 mb-1.5">Box</label>
                    <div className="text-gray-900 font-extrabold text-xl h-[42px] flex items-center">
                      #{idx + 1}
                    </div>
                  </div>
                  
                  <div className="relative md:col-span-1">
                    <InputField label="Weight" type="number" placeholder="e.g. 10" />
                    <span className="absolute right-3 top-[34px] text-sm font-medium text-gray-500">kg</span>
                  </div>

                  <div className="md:col-span-1">
                    <InputField label="Customs" type="text" placeholder="e.g. $100" />
                  </div>

                  <div className={`flex flex-col gap-1.5 ${showBoxesSize ? "md:col-span-6" : "md:col-span-3"}`}>
                    <label className="text-sm font-bold text-gray-700">Dimensions (L × W × H cm)</label>
                    <div className="grid grid-cols-3 gap-3">
                      <input type="number" placeholder="L" className="w-full px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 transition-all bg-white border border-gray-300" />
                      <input type="number" placeholder="W" className="w-full px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 transition-all bg-white border border-gray-300" />
                      <input type="number" placeholder="H" className="w-full px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 transition-all bg-white border border-gray-300" />
                    </div>
                  </div>
                  {showBoxesSize && (
                    <SelectField
                      label="Box"
                      options={[
                        { value: "my-packaging", label: "My Packaging" },
                        { value: "carrier-stationary", label: "Carrier Stationary" }
                      ]}
                      placeholder="Select Box..."
                      containerClassName="md:col-span-3"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 mt-2">
            <button className="px-6 py-2.5 text-sm font-bold text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
              Save as Draft
            </button>
            <button 
              onClick={() => setCurrentStep(2)}
              className="px-6 py-2.5 text-sm font-bold text-white bg-[#0b215f] rounded-xl hover:bg-blue-950 transition-colors shadow-sm flex items-center gap-2"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {currentStep === 2 && (
        <div className="flex flex-col gap-8 animate-in slide-in-from-right-8 duration-500">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Quote Details Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
              <div className="bg-[#0b215f] border-b border-[#0b215f] p-5">
                <h2 className="text-lg font-extrabold text-white tracking-tight">Quote Details</h2>
                <p className="text-xs text-blue-100 font-medium mt-0.5">Review your selected service and parcel details</p>
              </div>
              <div className="p-6 flex flex-col gap-6">
                {displayService ? (
                  <div className="flex items-center gap-5 p-5 rounded-xl border border-gray-100 bg-gray-50/50">
                    <div 
                      className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm overflow-hidden bg-white" 
                      style={{ borderColor: displayService.color, borderWidth: 2 }}
                    >
                      <span className="font-black text-xl tracking-tighter" style={{ color: displayService.color }}>{displayService.carrierLogo}</span>
                    </div>
                    <div>
                      <h3 className="font-extrabold text-gray-900 text-lg tracking-tight">{displayService.name}</h3>
                      <p className="text-sm text-gray-500 font-medium">{displayService.dimensions}</p>
                    </div>
                  </div>
                ) : (
                  <div className="p-5 text-center text-gray-500 font-medium border border-dashed border-gray-200 rounded-xl">
                    No service selected. Please go back and select a service type.
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl border border-gray-100 bg-white shadow-sm flex flex-col gap-1">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Number of Boxes</span>
                    <span className="text-lg font-extrabold text-gray-900">{numBoxes}</span>
                  </div>
                  <div className="p-4 rounded-xl border border-gray-100 bg-white shadow-sm flex flex-col gap-1">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Weight</span>
                    <span className="text-lg font-extrabold text-gray-900">-- kg</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Price Details Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
              <div className="bg-[#0b215f] border-b border-[#0b215f] p-5">
                <h2 className="text-lg font-extrabold text-white tracking-tight">Price Details</h2>
                <p className="text-xs text-blue-100 font-medium mt-0.5">Breakdown of your shipment costs</p>
              </div>
              <div className="p-6 flex flex-col flex-grow justify-center">
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500 font-medium">Base Charge</span>
                    <span className="font-bold text-gray-900">£{basePrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500 font-medium">Fuel Surcharge</span>
                    <span className="font-bold text-gray-900">£{fuel.toFixed(2)}</span>
                  </div>
                  <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                    <span className="text-gray-700 font-bold">Net Price</span>
                    <span className="font-extrabold text-xl text-gray-900">£{netPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500 font-medium">VAT (20%)</span>
                    <span className="font-bold text-gray-900">£{vat.toFixed(2)}</span>
                  </div>
                  <div className="pt-4 border-t border-gray-900 flex justify-between items-center">
                    <span className="text-gray-900 font-black text-lg">Total Price</span>
                    <span className="font-black text-3xl text-[#0b215f] tracking-tight">£{totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between gap-4 mt-2">
            <button 
              onClick={() => setCurrentStep(1)}
              className="px-6 py-2.5 text-sm font-bold text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors flex items-center gap-2 shadow-sm"
            >
              <ChevronLeft className="w-4 h-4" />
              Back to Form
            </button>
            <button 
              onClick={() => alert("Proceeding to payment...")}
              className="px-6 py-2.5 text-sm font-bold text-white bg-[#0b215f] rounded-xl hover:bg-blue-950 transition-colors shadow-sm flex items-center gap-2"
            >
              Proceed to Payment
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
