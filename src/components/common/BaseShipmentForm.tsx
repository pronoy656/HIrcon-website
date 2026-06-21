"use client";

import { useState, useRef, useEffect } from "react";
import { Check, ChevronRight, ChevronLeft, Package, ChevronDown, Plus, Minus, Pen, CircleHelp } from "lucide-react";
import clsx from "clsx";
import { InputField } from "@/components/common/InputField";
import { SelectField } from "@/components/common/SelectField";
import { countries } from "@/lib/countries";

const countryOptions = countries.map(c => ({
  value: c.code.toLowerCase(),
  label: (
    <div className="flex items-center gap-2">
      <img 
        src={`https://flagcdn.com/w20/${c.code.toLowerCase()}.png`}
        srcSet={`https://flagcdn.com/w40/${c.code.toLowerCase()}.png 2x`}
        width="20"
        alt={c.name}
        className="rounded-sm shadow-sm"
      />
      <span className="truncate">{c.name}</span>
    </div>
  )
}));

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
  const [packageType, setPackageType] = useState("");
  const [isServiceTypeOpen, setIsServiceTypeOpen] = useState(false);
  const [showBoxesSize, setShowBoxesSize] = useState(false);
  const [numBoxes, setNumBoxes] = useState("1");
  const [invoiceItems, setInvoiceItems] = useState([{ id: 1 }]);
  const [isCustomValueEditable, setIsCustomValueEditable] = useState(false);
  const [tradeDocuments, setTradeDocuments] = useState([{ id: 1 }]);
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

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentStep]);

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
    { id: 1, name: "Address Details", status: currentStep > 1 ? "complete" : "current" },
    { id: 2, name: "Parcel Details", status: currentStep > 2 ? "complete" : currentStep === 2 ? "current" : "upcoming" },
    { id: 3, name: "Summary", status: currentStep > 3 ? "complete" : currentStep === 3 ? "current" : "upcoming" },
    { id: 4, name: "Label & Payment", status: currentStep > 4 ? "complete" : currentStep === 4 ? "current" : "upcoming" },
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
                  options={countryOptions}
                  placeholder="Select Country..."
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
                  options={countryOptions}
                  placeholder="Select Country..."
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
                value={packageType}
                onChange={setPackageType}
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

                <div className="rounded-xl border border-gray-200 bg-white overflow-hidden shadow-sm">
                  <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-gray-100">
                    <div className="p-4 flex flex-col gap-1 border-b lg:border-b-0 border-gray-100">
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Package Type</span>
                      <span className="text-base font-extrabold text-gray-900 capitalize">{packageType || "--"}</span>
                    </div>
                    <div className="p-4 flex flex-col gap-1 border-b lg:border-b-0 border-gray-100">
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Weight</span>
                      <span className="text-base font-extrabold text-gray-900">-- kg</span>
                    </div>
                    <div className="p-4 flex flex-col gap-1">
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Dim Weight</span>
                      <span className="text-base font-extrabold text-gray-900">-- kg</span>
                    </div>
                    <div className="p-4 flex flex-col gap-1">
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Dimensions</span>
                      <span className="text-sm font-extrabold text-gray-900 truncate" title={displayService?.dimensions || "--"}>
                        {displayService?.dimensions || "--"}
                      </span>
                    </div>
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
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500 font-medium">Base Charge</span>
                    <span className="font-bold text-gray-900">£{basePrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500 font-medium">Fuel Surcharge</span>
                    <span className="font-bold text-gray-900">£{fuel.toFixed(2)}</span>
                  </div>
                  <div className="pt-3 border-t border-gray-100 flex justify-between items-center">
                    <span className="text-gray-700 font-bold text-sm">Net Price</span>
                    <span className="font-extrabold text-lg text-gray-900">£{netPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500 font-medium">VAT (20%)</span>
                    <span className="font-bold text-gray-900">£{vat.toFixed(2)}</span>
                  </div>
                  <div className="pt-3 border-t border-gray-900 flex justify-between items-center">
                    <span className="text-gray-900 font-black text-base">Total Price</span>
                    <span className="font-black text-2xl text-[#0b215f] tracking-tight">£{totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 4: Additional Shipment Details */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mt-4">
            <div className="bg-[#0b215f] border-b border-[#0b215f] p-5 rounded-t-2xl">
              <h2 className="text-lg font-extrabold text-white tracking-tight">Step 4: Additional Shipment Details</h2>
              <p className="text-xs text-blue-100 font-medium mt-0.5">Provide customs and additional information for your shipment.</p>
            </div>
            
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 relative">
              <SelectField
                label="Type of Shipment"
                options={[
                  { value: "b2b", label: "B2B Business" },
                  { value: "b2c", label: "B2C Private Individual" }
                ]}
                placeholder="Select Type..."
              />
              <SelectField
                label="Commercial Invoice"
                options={[
                  { value: "generate", label: "Generate Commercial Invoice" },
                  { value: "use_own", label: "Use My Own Commercial Invoice" },
                  { value: "upload", label: "Upload Commercial Invoice (PDF only)" }
                ]}
                placeholder="Select Invoice Option..."
              />
              <InputField label="Sender EORI" type="text" placeholder="e.g. GB123456789000" />
              <InputField label="Receiver VAT or EIN number" type="text" placeholder="e.g. 12-3456789" />
              <InputField label="Invoice number" type="text" required placeholder="e.g. INV-100234" />
              <InputField label="Consignor Address" type="text" placeholder="e.g. 123 Exporter St" />
              <InputField label="Consignee or Sold to Address" type="text" placeholder="e.g. 456 Importer Ave" />
              <SelectField
                label="Type of Export"
                options={[
                  { value: "permanent", label: "Permanent" },
                  { value: "temporary", label: "Temporary" },
                  { value: "re-export", label: "Re-export" }
                ]}
                placeholder="Select Export Type..."
              />
              <SelectField
                label="Reason for Export"
                options={[
                  { value: "sale", label: "Sale" },
                  { value: "sample", label: "Sample" },
                  { value: "gift", label: "Gift" },
                  { value: "return-repair", label: "Return/Repair" },
                  { value: "exhibition", label: "Exhibition" },
                  { value: "personal-effects", label: "Personal Effects" },
                  { value: "return", label: "Return" },
                  { value: "other", label: "Other" }
                ]}
                placeholder="Select Reason..."
              />
            </div>
          </div>

          {/* Commercial Invoice Details */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mt-4">
            <div className="bg-[#0b215f] border-b border-[#0b215f] p-5 flex justify-between items-center rounded-t-2xl">
              <div>
                <h2 className="text-lg font-extrabold text-white tracking-tight">Commercial Invoice Details</h2>
                <p className="text-xs text-blue-100 font-medium mt-0.5">Provide itemized details for customs clearance.</p>
              </div>
            </div>
            
            <div className="p-6">
              <div className="space-y-6 mb-6 pb-6 border-b border-gray-100">
                {invoiceItems.map((item, index) => (
                  <div key={item.id} className="grid grid-cols-1 md:grid-cols-6 gap-6 relative p-5 pt-10 bg-gray-50/50 rounded-xl border border-gray-100 mt-4 first:mt-0">
                    <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-[#0b215f] text-white flex items-center justify-center font-bold text-sm border-4 border-white shadow-sm">
                      {index + 1}
                    </div>
                    {invoiceItems.length > 1 && (
                      <button
                        onClick={() => setInvoiceItems(invoiceItems.filter(i => i.id !== item.id))}
                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white text-red-500 hover:bg-red-50 hover:text-red-600 flex items-center justify-center transition-colors border border-gray-200 shadow-sm"
                        title="Remove Item"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                    )}
                    <div className="md:col-span-6 lg:col-span-3">
                      <InputField 
                        label="Exact description of goods" 
                        type="text" 
                        required 
                        placeholder="Max 90 characters" 
                        maxLength={90} 
                        tooltip={
                          <div className="flex flex-col gap-3 font-normal">
                            <p><strong>Exact Description of Goods:</strong> please provide accurate commodities description, using detailed, precise & plain language, with sufficient details about the nature of goods. The detailed description per commodity should indicate what the goods are, for which purpose the goods are used and what they are made of – for example: "Women's T-shirts made of 100% Cotton".</p>
                            <p>You should not add generic, low quality descriptions such as "Goods", "Sample", "T-Shirts" or "Gift", this may cause the carrier to reject shipments as well as delaying customs clearance.</p>
                          </div>
                        }
                      />
                    </div>
                    <div className="md:col-span-3 lg:col-span-1">
                      <InputField label="Unit / Weight" type="number" required placeholder="e.g. 10" />
                    </div>
                    <div className="md:col-span-3 lg:col-span-2">
                      <SelectField
                        label="Manufactured In"
                        options={countryOptions}
                        placeholder="Select Country..."
                      />
                    </div>
                    <div className="md:col-span-3 lg:col-span-2">
                      <InputField label="Commodity code" type="text" placeholder="e.g. 85044030" />
                    </div>
                    <div className="md:col-span-3 lg:col-span-1">
                      <InputField label="Quantity" type="number" required placeholder="e.g. 1" />
                    </div>
                    <div className="md:col-span-3 lg:col-span-1">
                      <InputField label="Unit price" type="number" required placeholder="e.g. 50" />
                    </div>
                    <div className="md:col-span-3 lg:col-span-2 flex flex-col justify-end">
                      <label className="block text-sm font-bold text-gray-700 mb-1.5">Line Total</label>
                      <div className="text-lg font-extrabold text-gray-900 h-[42px] flex items-center">
                        £0.00
                      </div>
                    </div>
                  </div>
                ))}
                <button
                  onClick={() => setInvoiceItems([...invoiceItems, { id: Date.now() }])}
                  className="w-full py-3 mt-4 border-2 border-dashed border-green-400/60 rounded-xl bg-green-50 text-green-700 font-bold text-sm hover:bg-green-100 transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <Plus className="w-5 h-5" />
                  Add Another Item
                </button>
              </div>

              {/* Totals */}
              <div className="flex flex-col items-end pt-2">
                <div className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-bold text-gray-500 uppercase tracking-wide">Total Unit Weight</span>
                    <span className="font-black text-gray-900">0.00 kg</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-bold text-gray-500 uppercase tracking-wide">Total Price</span>
                    <span className="font-black text-gray-900">£0.00</span>
                  </div>
                  <div className="pt-3 border-t-2 border-gray-900 flex justify-between items-center text-sm">
                    <span className="font-bold text-[#0b215f] uppercase tracking-wide">Total Custom Value</span>
                    <div className="flex items-center gap-2">
                      <span className="text-[#0b215f] font-black">£</span>
                      {isCustomValueEditable ? (
                        <input 
                          type="number" 
                          defaultValue="0.00" 
                          autoFocus
                          onBlur={() => setIsCustomValueEditable(false)}
                          className="w-24 px-2 py-1 text-right font-black text-[#0b215f] bg-white border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#0b215f] focus:border-transparent shadow-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                      ) : (
                        <div 
                          className="flex items-center gap-2 cursor-pointer group"
                          onClick={() => setIsCustomValueEditable(true)}
                          title="Edit Custom Value"
                        >
                          <span className="text-right font-black text-[#0b215f] min-w-[3rem]">0.00</span>
                          <Pen className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#0b215f] transition-colors" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Comments */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mt-4">
            <div className="bg-[#0b215f] border-b border-[#0b215f] p-4 rounded-t-2xl">
              <h2 className="text-base font-extrabold text-white tracking-tight">Additional Comments</h2>
            </div>
            <div className="p-6">
              <label className="flex items-center text-sm font-bold text-gray-700 mb-1.5">Comments</label>
              <textarea 
                className="w-full px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 transition-all bg-gray-50 border border-gray-200 resize-y" 
                rows={4}
                placeholder="Add any comments here..." 
              ></textarea>
            </div>
          </div>

          {/* Additional Trade Documents */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mt-4">
            <div className="bg-[#0b215f] border-b border-[#0b215f] p-4 flex justify-between items-center rounded-t-2xl">
              <div className="flex items-center gap-2">
                <h2 className="text-base font-extrabold text-white tracking-tight">Additional Trade Documents</h2>
                <div className="relative group flex items-center">
                  <CircleHelp className="w-4 h-4 text-blue-200 cursor-help" />
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-80 md:w-96 p-4 bg-gray-900 text-white text-xs leading-relaxed rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                    <p className="font-normal mb-3">You can upload extra documents to support your shipment and help reduce the risk of customs delays. These are optional and intended to provide additional detail alongside your required documents, such as the commercial invoice or packing list.</p>
                    <p className="font-normal mb-3">Only PDF files are supported (maximum size: 8MB per file)</p>
                    <p className="font-normal">Multiple documents can be uploaded if required</p>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {tradeDocuments.map((doc) => (
                  <div key={doc.id} className="flex flex-col sm:flex-row gap-4 sm:items-end relative">
                    <SelectField
                      label="Document Type"
                      options={[
                        { value: "proforma_invoice", label: "Proforma Invoice" },
                        { value: "certificate_of_origin", label: "Certificate of Origin" },
                        { value: "nafta_certificate", label: "NAFTA Certificate" },
                        { value: "consignee_information", label: "Consignee Information" },
                        { value: "declaration", label: "Declaration" }
                      ]}
                      placeholder="Select file upload type..."
                      containerClassName="flex-1"
                    />
                    <div className="flex items-center gap-4">
                      <button className="px-6 py-2.5 bg-gray-100 border border-gray-300 text-gray-700 rounded-xl font-bold text-sm hover:bg-gray-200 transition-colors h-[42px] whitespace-nowrap">
                        Upload File
                      </button>
                      <button 
                        onClick={() => setTradeDocuments([...tradeDocuments, { id: Date.now() }])}
                        className="w-[42px] h-[42px] rounded-xl bg-green-50 text-green-600 hover:bg-green-100 flex items-center justify-center transition-colors border border-green-200 shadow-sm shrink-0"
                        title="Add Document"
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                      {tradeDocuments.length > 1 && (
                        <button
                          onClick={() => setTradeDocuments(tradeDocuments.filter(d => d.id !== doc.id))}
                          className="w-[42px] h-[42px] rounded-xl bg-white text-red-500 hover:bg-red-50 hover:text-red-600 flex items-center justify-center transition-colors border border-gray-200 shadow-sm shrink-0"
                          title="Remove Document"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
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
              onClick={() => setCurrentStep(3)}
              className="px-6 py-2.5 text-sm font-bold text-white bg-[#0b215f] rounded-xl hover:bg-blue-950 transition-colors shadow-sm flex items-center gap-2"
            >
              Proceed to Summary
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {currentStep === 3 && (
        <div className="flex flex-col gap-6 animate-in slide-in-from-right-8 duration-500">
          <div className="bg-[#0b215f] p-5 rounded-2xl text-white shadow-sm">
            <h2 className="text-xl font-extrabold tracking-tight">Shipment Summary</h2>
            <p className="text-sm text-blue-100 mt-1">Please review all details before proceeding to payment.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-lg text-gray-900 border-b border-gray-100 pb-3 mb-4">Collection Address</h3>
              <div className="text-sm text-gray-600 space-y-1.5">
                <p><span className="font-semibold text-gray-900">Name:</span> Jane Doe</p>
                <p><span className="font-semibold text-gray-900">Company:</span> Acme Corp</p>
                <p><span className="font-semibold text-gray-900">Address:</span> 123 Main St, Suite 100</p>
                <p><span className="font-semibold text-gray-900">City/Postcode:</span> London, SW1A 1AA</p>
                <p><span className="font-semibold text-gray-900">Country:</span> United Kingdom</p>
                <p><span className="font-semibold text-gray-900">Phone:</span> +44 20 7123 4567</p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-lg text-gray-900 border-b border-gray-100 pb-3 mb-4">Delivery Address</h3>
              <div className="text-sm text-gray-600 space-y-1.5">
                <p><span className="font-semibold text-gray-900">Name:</span> John Smith</p>
                <p><span className="font-semibold text-gray-900">Company:</span> Globex Inc</p>
                <p><span className="font-semibold text-gray-900">Address:</span> 456 High St, Floor 2</p>
                <p><span className="font-semibold text-gray-900">City/Postcode:</span> Manchester, M1 1AA</p>
                <p><span className="font-semibold text-gray-900">Country:</span> United Kingdom</p>
                <p><span className="font-semibold text-gray-900">Phone:</span> +44 161 123 4567</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-lg text-gray-900 border-b border-gray-100 pb-3 mb-4">Parcel Details & Service</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
              <div><span className="block text-xs font-bold text-gray-400 uppercase mb-1">Package Type</span><span className="font-semibold text-gray-900 capitalize">{packageType || "Box"}</span></div>
              <div><span className="block text-xs font-bold text-gray-400 uppercase mb-1">Total Weight</span><span className="font-semibold text-gray-900">10 kg</span></div>
              <div><span className="block text-xs font-bold text-gray-400 uppercase mb-1">Service</span><span className="font-semibold text-gray-900">{displayService?.name || "DHL Express"}</span></div>
              <div><span className="block text-xs font-bold text-gray-400 uppercase mb-1">Dimensions</span><span className="font-semibold text-gray-900">{displayService?.dimensions || "Standard"}</span></div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-lg text-gray-900 border-b border-gray-100 pb-3 mb-4">Commercial Invoice Summary</h3>
            <div className="text-sm text-gray-600 space-y-2">
              <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-100">
                <span className="font-semibold text-gray-900">1x T-Shirts (100% Cotton)</span>
                <span className="font-bold text-gray-900">£50.00</span>
              </div>
              <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-100">
                <span className="font-semibold text-[#0b215f]">Total Custom Value</span>
                <span className="font-black text-[#0b215f]">£50.00</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-2xl shadow-sm border border-gray-200">
            <h3 className="font-bold text-lg text-gray-900 border-b border-gray-200 pb-3 mb-4">Price Summary</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex justify-between"><span>Base Charge</span><span className="font-semibold text-gray-900">£{basePrice.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>Fuel Surcharge</span><span className="font-semibold text-gray-900">£{fuel.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>VAT (20%)</span><span className="font-semibold text-gray-900">£{vat.toFixed(2)}</span></div>
              <div className="flex justify-between pt-3 border-t border-gray-200 mt-2">
                <span className="font-bold text-gray-900 text-base">Total Payable</span>
                <span className="font-black text-xl text-[#0b215f]">£{totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="flex justify-between gap-4 mt-2">
            <button 
              onClick={() => setCurrentStep(2)}
              className="px-6 py-2.5 text-sm font-bold text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors flex items-center gap-2 shadow-sm"
            >
              <ChevronLeft className="w-4 h-4" />
              Back to Parcel Details
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
