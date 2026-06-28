"use client";

import { useState, useRef, useEffect } from "react";
import { Check, ChevronRight, ChevronLeft, Package, ChevronDown, Plus, Minus, Pen, CircleHelp, Contact, RefreshCcw, Copy, Files, ArrowDownToLine, Calendar, ArrowRight, ArrowLeftRight } from "lucide-react";
import clsx from "clsx";
import { InputField } from "@/components/ui/InputField";
import { SelectField } from "@/components/ui/SelectField";
import { TextAreaField } from "@/components/ui/TextAreaField";
import { AddressBookModal, AddressEntry } from "@/components/features/shipment/AddressBookModal";
import { PostCodeModal } from "@/components/features/shipment/PostCodeModal";
import { ScheduleCollectionModal } from "@/components/features/shipment/ScheduleCollectionModal";
import { ShipmentSuccessModal } from "@/components/features/shipment/ShipmentSuccessModal";
import { SenderDetails } from "./components/SenderDetails";
import { ReceiverDetails } from "./components/ReceiverDetails";
import { BoxDetails } from "./components/BoxDetails";
import { CommodityDetails } from "./components/CommodityDetails";
import { ShipmentDetails } from "./components/ShipmentDetails";
import { countries } from "@/lib/countries";

const countryOptions = countries.map(c => ({
  value: c.code.toLowerCase(),
  searchKey: c.name,
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

const currencyOptions = [
  { value: "GBP", label: "GBP (£)", searchKey: "gbp british pound sterling uk" },
  { value: "USD", label: "USD ($)", searchKey: "usd united states us dollar usa" },
  { value: "EUR", label: "EUR (€)", searchKey: "eur euro europe" },
  { value: "AUD", label: "AUD ($)", searchKey: "aud australian dollar australia" },
  { value: "CAD", label: "CAD ($)", searchKey: "cad canadian dollar canada" },
  { value: "INR", label: "INR (₹)", searchKey: "inr indian rupee india" },
  { value: "BDT", label: "BDT (৳)", searchKey: "bdt bangladeshi taka bangladesh" },
  { value: "AED", label: "AED", searchKey: "aed united arab emirates dirham uae" },
  { value: "SAR", label: "SAR", searchKey: "sar saudi riyal arabia" },
  { value: "SGD", label: "SGD", searchKey: "sgd singapore dollar" },
  { value: "CHF", label: "CHF", searchKey: "chf swiss franc switzerland" },
  { value: "MYR", label: "MYR", searchKey: "myr malaysian ringgit malaysia" },
  { value: "ZAR", label: "ZAR", searchKey: "zar south african rand south africa" },
];

const serviceDetails: Record<string, { dimensions: string; payload: string; pallets: string; name: string; price: number; color: string; carrierLogo: string; carrier: string }> = {
  "bike": { dimensions: "0.5m (L) x 0.5m (W) x 0.5m (H)", payload: "Max 10kg", pallets: "0", name: "Bike", price: 15.00, color: "#d40511", carrierLogo: "DHL", carrier: "DHL" },
  "large-van": { dimensions: "2.0m (L) x 1.2m (W) x 1.2m (H)", payload: "Max 800kg", pallets: "2", name: "Large Van", price: 85.00, color: "#4d148c", carrierLogo: "FedEx", carrier: "FedEx" },
  "priority-bike": { dimensions: "0.5m (L) x 0.5m (W) x 0.5m (H)", payload: "Max 10kg", pallets: "0", name: "Priority Bike", price: 25.00, color: "#ffb500", carrierLogo: "UPS", carrier: "UPS" },
  "priority-transit": { dimensions: "3.0m (L) x 1.5m (W) x 1.5m (H)", payload: "Max 1000kg", pallets: "3", name: "Priority Transit", price: 120.00, color: "#d40511", carrierLogo: "DHL", carrier: "DHL" },
  "priority-van": { dimensions: "2.5m (L) x 1.4m (W) x 1.4m (H)", payload: "Max 900kg", pallets: "2", name: "Priority Van", price: 95.00, color: "#4d148c", carrierLogo: "FedEx", carrier: "FedEx" },
  "push-bike": { dimensions: "30cm (L) x 21cm (W) x 5.5cm (H)", payload: "0 - 2kg", pallets: "0", name: "PushBike", price: 35.00, color: "#d40511", carrierLogo: "DHL", carrier: "DHL" },
  "small-van": { dimensions: "1.5m (L) x 1.0m (W) x 1.0m (H)", payload: "Max 400kg", pallets: "1", name: "Small Van", price: 55.00, color: "#ffb500", carrierLogo: "UPS", carrier: "UPS" },
};

interface BaseShipmentFormProps {
  title: string;
  description: string;
}

export function BaseShipmentForm({ title, description }: BaseShipmentFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isScheduleCollectionModalOpen, setIsScheduleCollectionModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [serviceCompany, setServiceCompany] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [packageType, setPackageType] = useState("");
  const [isDocument, setIsDocument] = useState(false);
  const [isCommodity, setIsCommodity] = useState(false);
    const [showBoxesSize, setShowBoxesSize] = useState(false);
  const [hasEnhancedCover, setHasEnhancedCover] = useState(false);
  const [isAddressBookOpen, setIsAddressBookOpen] = useState(false);
  
  // Pallet-specific states
  const [tailLift, setTailLift] = useState(true);
  const [sameDayCollection, setSameDayCollection] = useState(false);
  const [amazonShipment, setAmazonShipment] = useState(false);
  const [timedDelivery, setTimedDelivery] = useState(false);
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [senderVatNumber, setSenderVatNumber] = useState("GB764431527");
  const [customerRef, setCustomerRef] = useState("");
  const [termsOptions, setTermsOptions] = useState(false);
  const [termsService, setTermsService] = useState(false);
  const [collectionAddress, setCollectionAddress] = useState({
    company: "",
    contactName: "",
    addressLine1: "",
    country: "",
    cityName: "",
    postCode: "",
    phone: "",
    email: ""
  });
  const [deliveryAddress, setDeliveryAddress] = useState({
    company: "",
    contactName: "",
    addressLine1: "",
    country: "",
    cityName: "",
    postCode: "",
    phone: "",
    email: ""
  });

  const isUkToUsa = collectionAddress.country === 'gb' && deliveryAddress.country === 'us';

  // Quick Ship Billing Details state
  const [billingDetails, setBillingDetails] = useState({
    collectionAddress: "HOLDSWORTH ROAD HALIFAX HX3 6SN,GB",
    transportation: "Bill to Sender",
    collectionOptions: "Schedule for Future Date",
    dateOfCollection: "23/06/2026",
    readyFrom: "21:45",
    latestPickup: "23:30",
    collectionLocation: "None",
    locationDesc: "",
    personalMessage: "",
    notificationShipment: false,
    notificationException: false,
    notificationDelivery: false,
    recipientEmail: "",
    additionalShipment: false,
    additionalException: false,
    additionalDelivery: false,
    otherEmail: ""
  });

  // Spot Rate Details state
  const [spotRateDetails, setSpotRateDetails] = useState({
    pickupRequestDate: "23/06/2026",
    deliveryRequestDate: "23/06/2026",
    liveSameDayCollection: false,
    liveSameDayDelivery: false,
    earliestDeliveryTime: "",
    latestDeliveryTime: "",
    additionalComments: "",
    enhancedCoverValue: "",
    nonStackableItems: false,
    hazardousGoods: false,
    pickupServices: "",
    deliveryServices: "",
    modeOfTransport: "",
    b2bOrB2c: "",
    incoterms: ""
  });

  const handleReturnShipment = () => {
    setDeliveryAddress({
      company: "Default Return Corp",
      contactName: "Return Admin",
      addressLine1: "123 Return Ave",
      country: "gb",
      cityName: "London",
      postCode: "RT1 1RN",
      phone: "+44 20 1234 5678",
      email: "returns@defaultcorp.com"
    });
  };

  const handleReset = () => {
    setCurrentStep(1);
    setServiceCompany("");
    setServiceType("");
    setPackageType("");
    setIsDocument(false);
    setIsCommodity(false);
    setShowBoxesSize(false);
    setHasEnhancedCover(false);
    setIsAddressBookOpen(false);
    setIsPostCodeModalOpen(false);
    setDeliveryAddress({
      company: "",
      contactName: "",
      addressLine1: "",
      country: "",
      cityName: "",
      postCode: "",
      phone: "",
      email: ""
    });
    setNumBoxes("1");
    setInvoiceItems([{ id: 1 }]);
    setIsCustomValueEditable(false);
    setTradeDocuments([{ id: 1 }]);
  };

  const [numBoxes, setNumBoxes] = useState("1");
  const [currency, setCurrency] = useState("GBP");
  const [boxesData, setBoxesData] = useState([
    { weight: '', customs: '', length: '', width: '', height: '', boxType: '' }
  ]);
  const [isPostCodeModalOpen, setIsPostCodeModalOpen] = useState(false);
  const [postCodeModalTarget, setPostCodeModalTarget] = useState<'collection' | 'delivery' | null>(null);

  const handlePostCodeSelect = (address: string) => {
    let postcode = '';
    let city = '';
    
    const postcodeRegex = /[A-Z]{1,2}[0-9R][0-9A-Z]?\s?[0-9][A-Z]{2}$/i;
    const postcodeMatch = address.match(postcodeRegex);
    
    if (postcodeMatch) {
      postcode = postcodeMatch[0];
      const beforePostcode = address.substring(0, postcodeMatch.index).trim().replace(/,$/, '').trim();
      const parts = beforePostcode.split(',');
      const lastPart = parts[parts.length - 1].trim();
      const words = lastPart.split(' ');
      
      if (words.length > 3) {
        city = words[words.length - 1];
      } else {
        city = lastPart;
      }
    } else {
      // Fallback
      const parts = address.split(',');
      const lastPart = parts[parts.length - 1].trim();
      city = lastPart;
    }
    
    if (postCodeModalTarget === 'collection') {
      setCollectionAddress({...collectionAddress, cityName: city, postCode: postcode});
    } else if (postCodeModalTarget === 'delivery') {
      setDeliveryAddress({...deliveryAddress, cityName: city, postCode: postcode});
    }
  };

  useEffect(() => {
    const count = parseInt(numBoxes) || 1;
    setBoxesData(prev => {
      if (prev.length === count) return prev;
      if (prev.length < count) {
        return [...prev, ...Array(count - prev.length).fill({ weight: '', customs: '', length: '', width: '', height: '', boxType: '' })];
      }
      return prev.slice(0, count);
    });
  }, [numBoxes]);

  const handleBoxChange = (index: number, field: string, value: string) => {
    const newBoxes = [...boxesData];
    newBoxes[index] = { ...newBoxes[index], [field]: value };
    setBoxesData(newBoxes);
  };

  const handleCopyNextBox = (index: number) => {
    if (index >= boxesData.length - 1) return;
    const newBoxes = [...boxesData];
    newBoxes[index + 1] = { ...newBoxes[index] };
    setBoxesData(newBoxes);
  };

  const handleCopyAllBoxes = () => {
    if (boxesData.length <= 1) return;
    const firstBox = { ...boxesData[0] };
    const newBoxes = boxesData.map((_, i) => i === 0 ? boxesData[0] : { ...firstBox });
    setBoxesData(newBoxes);
  };

  const [invoiceItems, setInvoiceItems] = useState([{ id: 1 }]);
  const [isCustomValueEditable, setIsCustomValueEditable] = useState(false);
  const [tradeDocuments, setTradeDocuments] = useState([{ id: 1 }]);
  const [packingListFile, setPackingListFile] = useState<File | null>(null);


  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentStep]);

  const serviceTypeOptions = [
    { value: "bike", label: "Bike" },
    { value: "large-van", label: "Large Van" },
    { value: "priority-bike", label: "Priority Bike" },
    { value: "priority-transit", label: "Priority Transit" },
    { value: "priority-van", label: "Priority Van" },
    { value: "push-bike", label: "PushBike" },
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
    "royal-mail": { logo: "RM", color: "#ff0000", name: "Royal Mail" },
    "palletways": { logo: "PW", color: "#0055a4", name: "PalletWays" }
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

  // Pallet Service Info Mock
  const palletServiceInfo: Record<string, string> = {
    "by 1200": "UK: Delivery Day(s) - 2-5",
    "by 1700": "UK: Delivery Day(s) - 3-5",
    "by 2100": "UK: Delivery Day(s) - 4-6",
    "Saturday by 1400": "UK: Delivery Day(s) - 1",
    "Timed": "UK: Delivery Day(s) - 2-3",
    "Timed 1300 to 1700": "UK: Delivery Day(s) - 2-3",
    "Next Day by 1200": "UK: Delivery Day(s) - 1",
    "Next Day by 1700": "UK: Delivery Day(s) - 1",
    "Next Day by 2100": "UK: Delivery Day(s) - 1",
    "Next Day Timed": "UK: Delivery Day(s) - 1",
    "Next Day Timed 1300 to 1700": "UK: Delivery Day(s) - 1"
  };

  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-500 pb-12 max-w-[1400px] mx-auto w-full">
      <AddressBookModal 
        isOpen={isAddressBookOpen} 
        onClose={() => setIsAddressBookOpen(false)} 
        onSelect={(entry: AddressEntry) => {
          console.log("Selected address:", entry);
        }} 
      />
      <PostCodeModal
        isOpen={isPostCodeModalOpen}
        onClose={() => setIsPostCodeModalOpen(false)}
        onSelect={handlePostCodeSelect}
      />
      <ScheduleCollectionModal
        isOpen={isScheduleCollectionModalOpen}
        onClose={() => setIsScheduleCollectionModalOpen(false)}
        onConfirm={(details) => {
          console.log("Collection scheduled:", details);
          setIsSuccessModalOpen(true);
        }}
      />
      <ShipmentSuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        orderNumber="WO-987654321"
        totalPrice={totalPrice}
        dimensions={displayService?.dimensions}
        onReship={() => {
          setIsSuccessModalOpen(false);
          console.log("Reship requested");
        }}
      />
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-white mb-2 tracking-tight">{title}</h1>
        <p className="text-blue-100 font-medium">{description}</p>
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
                      <div className="h-1 w-full bg-blue-400" />
                    </div>
                    <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 hover:bg-blue-400 border-2 border-blue-500 shadow-sm">
                      <Check className="h-5 w-5 text-white" aria-hidden="true" />
                    </div>
                  </>
                ) : step.status === 'current' ? (
                  <>
                    <div className="absolute inset-0 flex items-center" aria-hidden="true">
                      <div className="h-1 w-full bg-white/20" />
                    </div>
                    <div className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-[#081b4c]" aria-current="step">
                      <span className="h-2.5 w-2.5 rounded-full bg-white" aria-hidden="true" />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="absolute inset-0 flex items-center" aria-hidden="true">
                      <div className="h-1 w-full bg-white/20" />
                    </div>
                    <div className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-white/30 bg-[#081b4c] hover:border-white/50">
                      <span className="h-2.5 w-2.5 rounded-full bg-transparent group-hover:bg-white/30" aria-hidden="true" />
                    </div>
                  </>
                )}
                <span className={clsx(
                  "absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-bold whitespace-nowrap",
                  step.status === 'complete' || step.status === 'current' ? "text-white" : "text-white/50"
                )}>
                  {step.name}
                </span>
              </li>
            ))}
          </ol>
        </nav>
      </div>

      {currentStep === 1 && (
        <div className="flex flex-col gap-8 animate-in slide-in-from-left-4 duration-300">
          {title === 'Quick Ship' ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Delivery Address */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
                <div className="bg-[#081b4c] border-b border-[#081b4c] p-5 flex justify-between items-start rounded-t-2xl">
                  <h2 className="text-lg font-bold text-white tracking-tight">Delivery Address</h2>
                  <div className="flex items-center gap-2">
                    <button onClick={() => setIsAddressBookOpen(true)} className="w-10 h-10 rounded bg-white/10 text-white hover:bg-white hover:text-[#081b4c] transition-colors flex items-center justify-center shadow-sm">
                      <Contact className="w-5 h-5" />
                    </button>
                  </div>
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

                  <InputField label="Reference" type="text" containerClassName="sm:col-span-2" placeholder="Search/create contact reference" />
                  <InputField label="Company" type="text" containerClassName="sm:col-span-2" placeholder="Company" value={deliveryAddress.company} onChange={(e) => setDeliveryAddress({...deliveryAddress, company: e.target.value})} />
                  <InputField label="Contact Name" type="text" required containerClassName="sm:col-span-2" placeholder="Contact name" value={deliveryAddress.contactName} onChange={(e) => setDeliveryAddress({...deliveryAddress, contactName: e.target.value})} />
                  <InputField label="Address Line 1" type="text" required containerClassName="sm:col-span-2" placeholder="Address line 1" value={deliveryAddress.addressLine1} onChange={(e) => setDeliveryAddress({...deliveryAddress, addressLine1: e.target.value})} />
                  <InputField label="Address Line 2" type="text" optional containerClassName="sm:col-span-2" placeholder="Address line 2" />
                  <InputField label="Address Line 3" type="text" optional containerClassName="sm:col-span-2" placeholder="Address line 3" />

                  <SelectField
                    label="Country"
                    options={[{value:'uk', label:'UK'}, ...countryOptions]}
                    value={deliveryAddress.country || 'uk'}
                    onChange={(val) => setDeliveryAddress({...deliveryAddress, country: val})}
                    containerClassName="sm:col-span-2"
                  />

                  <InputField label="City Name" type="text" required placeholder="City" value={deliveryAddress.cityName} onChange={(e) => setDeliveryAddress({...deliveryAddress, cityName: e.target.value})} containerClassName="sm:col-span-2" />
                  
                  <div className="sm:col-span-2 flex items-end gap-3">
                    <InputField label="Post Code" type="text" required placeholder="Post code" value={deliveryAddress.postCode} onChange={(e) => setDeliveryAddress({...deliveryAddress, postCode: e.target.value})} containerClassName="flex-1" />
                    <button 
                      onClick={(e) => { e.preventDefault(); setPostCodeModalTarget('delivery'); setIsPostCodeModalOpen(true); }}
                      className="h-[42px] px-6 rounded-xl bg-[#081b4c] text-white font-bold text-sm hover:bg-[#061438] transition-colors shadow-sm whitespace-nowrap"
                    >
                      POST CODE
                    </button>
                  </div>
                  <InputField label="Phone" type="tel" required placeholder="Phone number" value={deliveryAddress.phone} onChange={(e) => setDeliveryAddress({...deliveryAddress, phone: e.target.value})} containerClassName="sm:col-span-2" />
                  <InputField label="Email" type="email" containerClassName="sm:col-span-2" placeholder="Email address" value={deliveryAddress.email} onChange={(e) => setDeliveryAddress({...deliveryAddress, email: e.target.value})} />

                  <div className="sm:col-span-2 flex items-center gap-6 mt-1 pt-4 border-t border-gray-100">
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input type="checkbox" defaultChecked className="w-4 h-4 text-[#081b4c] border-gray-300 rounded focus:ring-[#081b4c]" />
                      <span className="text-sm font-bold text-gray-700">Save to contacts</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input type="checkbox" className="w-4 h-4 text-[#081b4c] border-gray-300 rounded focus:ring-[#081b4c]" />
                      <span className="text-sm font-bold text-gray-700">Residential</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Billing Details */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
                <div className="bg-[#081b4c] border-b border-[#081b4c] p-5 flex justify-between items-center rounded-t-2xl">
                  <h2 className="text-lg font-bold text-white tracking-tight">Billing Details</h2>
                  <button className="w-10 h-10 rounded bg-white/10 text-white hover:bg-white hover:text-[#081b4c] transition-colors flex items-center justify-center shadow-sm" title="Refresh">
                    <RefreshCcw className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="p-6 grid grid-cols-1 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-bold text-gray-700">Collection Address</label>
                      <a href="#" className="text-xs text-blue-500 hover:underline">Change Collection Address</a>
                    </div>
                    <SelectField value={billingDetails.collectionAddress} onChange={(val) => setBillingDetails({...billingDetails, collectionAddress: val})} options={[{value:"HOLDSWORTH ROAD HALIFAX HX3 6SN,GB", label:"HOLDSWORTH ROAD HALIFAX HX3 6SN,GB"}]} />
                  </div>

                  <SelectField label="Transportation" value={billingDetails.transportation} onChange={(val) => setBillingDetails({...billingDetails, transportation: val})} options={[{value:"Bill to Sender", label:"Bill to Sender"}]} />
                  
                  <SelectField label="Collection Options" value={billingDetails.collectionOptions} onChange={(val) => setBillingDetails({...billingDetails, collectionOptions: val})} options={[{value:"Schedule for Future Date", label:"Schedule for Future Date"}]} />

                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-bold text-gray-700">Date of Collection</label>
                    <div className="relative">
                      <input type="date" value={billingDetails.dateOfCollection} onChange={(e) => setBillingDetails({...billingDetails, dateOfCollection: e.target.value})} className="w-full pl-4 pr-10 py-2.5 bg-white border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 transition-all [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:left-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer" />
                      <Calendar className="w-4 h-4 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  <SelectField label="Ready From" value={billingDetails.readyFrom} onChange={(val) => setBillingDetails({...billingDetails, readyFrom: val})} options={[{value:"21:45", label:"21:45"}]} />
                  <SelectField label="Latest Pickup" value={billingDetails.latestPickup} onChange={(val) => setBillingDetails({...billingDetails, latestPickup: val})} options={[{value:"23:30", label:"23:30"}]} />
                  <SelectField label="Collection Location" value={billingDetails.collectionLocation} onChange={(val) => setBillingDetails({...billingDetails, collectionLocation: val})} options={[{value:"None", label:"None"}]} />
                  
                  <InputField label="Location Desc." type="text" placeholder="Please enter location desc." value={billingDetails.locationDesc} onChange={(e) => setBillingDetails({...billingDetails, locationDesc: e.target.value})} />
                  <InputField label="Personal Message" type="text" value={billingDetails.personalMessage} onChange={(e) => setBillingDetails({...billingDetails, personalMessage: e.target.value})} />

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-gray-700">Notification Options</label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-1.5 cursor-pointer group text-sm">
                        <input type="checkbox" checked={billingDetails.notificationShipment} onChange={(e) => setBillingDetails({...billingDetails, notificationShipment: e.target.checked})} className="w-4 h-4 border-gray-300 rounded text-[#081b4c] focus:ring-[#081b4c]" />
                        Shipment
                      </label>
                      <label className="flex items-center gap-1.5 cursor-pointer group text-sm">
                        <input type="checkbox" checked={billingDetails.notificationException} onChange={(e) => setBillingDetails({...billingDetails, notificationException: e.target.checked})} className="w-4 h-4 border-gray-300 rounded text-[#081b4c] focus:ring-[#081b4c]" />
                        Exception
                      </label>
                      <label className="flex items-center gap-1.5 cursor-pointer group text-sm">
                        <input type="checkbox" checked={billingDetails.notificationDelivery} onChange={(e) => setBillingDetails({...billingDetails, notificationDelivery: e.target.checked})} className="w-4 h-4 border-gray-300 rounded text-[#081b4c] focus:ring-[#081b4c]" />
                        Delivery
                      </label>
                    </div>
                  </div>

                  <InputField label="Recipient Email" type="text" value={billingDetails.recipientEmail} onChange={(e) => setBillingDetails({...billingDetails, recipientEmail: e.target.value})} />

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-gray-700">Additional Notification Options</label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-1.5 cursor-pointer group text-sm">
                        <input type="checkbox" checked={billingDetails.additionalShipment} onChange={(e) => setBillingDetails({...billingDetails, additionalShipment: e.target.checked})} className="w-4 h-4 border-gray-300 rounded text-[#081b4c] focus:ring-[#081b4c]" />
                        Shipment
                      </label>
                      <label className="flex items-center gap-1.5 cursor-pointer group text-sm">
                        <input type="checkbox" checked={billingDetails.additionalException} onChange={(e) => setBillingDetails({...billingDetails, additionalException: e.target.checked})} className="w-4 h-4 border-gray-300 rounded text-[#081b4c] focus:ring-[#081b4c]" />
                        Exception
                      </label>
                      <label className="flex items-center gap-1.5 cursor-pointer group text-sm">
                        <input type="checkbox" checked={billingDetails.additionalDelivery} onChange={(e) => setBillingDetails({...billingDetails, additionalDelivery: e.target.checked})} className="w-4 h-4 border-gray-300 rounded text-[#081b4c] focus:ring-[#081b4c]" />
                        Delivery
                      </label>
                    </div>
                  </div>

                  <InputField label="Other Email" type="text" placeholder="Please enter other email address" value={billingDetails.otherEmail} onChange={(e) => setBillingDetails({...billingDetails, otherEmail: e.target.value})} />
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className={clsx("grid gap-8 xl:gap-12 relative", isUkToUsa ? "grid-cols-1" : "grid-cols-1 xl:grid-cols-[1fr_320px]")}>
                
                {/* Left Side: Collection and Delivery */}
                <div className="flex flex-col gap-12 relative">
                  
                  {/* Switch Addresses Button */}
                  <div className="hidden md:flex absolute top-[280px] left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                    <button 
                      type="button"
                      className="w-10 h-10 bg-[#081b4c] rounded-full shadow-md flex items-center justify-center hover:bg-[#06153b] transition-all group"
                      title="Switch Addresses"
                    >
                      <ArrowLeftRight className="w-5 h-5 text-white group-hover:rotate-180 transition-transform duration-300" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Step 1: Collection Address */}
                    <SenderDetails 
                      collectionAddress={collectionAddress}
                      setCollectionAddress={setCollectionAddress}
                      setIsAddressBookOpen={setIsAddressBookOpen}
                      setPostCodeModalTarget={setPostCodeModalTarget}
                      setIsPostCodeModalOpen={setIsPostCodeModalOpen}
                      countryOptions={countryOptions}
                    />

                    {/* Step 2: Delivery Address */}
                    <ReceiverDetails 
                      deliveryAddress={deliveryAddress}
                      setDeliveryAddress={setDeliveryAddress}
                      setIsAddressBookOpen={setIsAddressBookOpen}
                      setPostCodeModalTarget={setPostCodeModalTarget}
                      setIsPostCodeModalOpen={setIsPostCodeModalOpen}
                      countryOptions={countryOptions}
                    />
                  </div>
                </div>

                {/* Right Side: Quote & Price Details */}
              {!isUkToUsa && (
                <div className="flex flex-col gap-8">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col sticky top-6">
                  <div className="bg-[#081b4c] border-b border-[#081b4c] p-4">
                    <h2 className="text-base font-extrabold text-white tracking-tight">Summary</h2>
                  </div>
                  <div className="p-5 flex flex-col gap-5">
                    {/* Quote Details */}
                    <div className="flex flex-col gap-3">
                      <h3 className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-2">Quote Details</h3>
                      {displayService ? (
                        <div className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 bg-gray-50/50">
                          <div 
                            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm overflow-hidden bg-white border" 
                            style={{ borderColor: displayService.color }}
                          >
                            <span className="font-black text-xs tracking-tighter" style={{ color: displayService.color }}>{displayService.carrierLogo}</span>
                          </div>
                          <div className="flex flex-col overflow-hidden">
                            <h3 className="font-extrabold text-gray-900 text-sm tracking-tight truncate">{displayService.name}</h3>
                            <p className="text-[10px] text-gray-500 font-medium truncate">{displayService.dimensions}</p>
                          </div>
                        </div>
                      ) : (
                        <div className="p-3 text-center text-xs text-gray-500 font-medium border border-dashed border-gray-200 rounded-xl">
                          No service selected.
                        </div>
                      )}

                      <div className="flex flex-col gap-2.5 mt-1 px-1">
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-gray-500 font-medium">Package</span>
                          <span className="font-bold text-gray-900 capitalize">{packageType || "--"}</span>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-gray-500 font-medium">Weight</span>
                          <span className="font-bold text-gray-900">-- kg</span>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-gray-500 font-medium">Dim Weight</span>
                          <span className="font-bold text-gray-900">-- kg</span>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-gray-500 font-medium">Dimensions</span>
                          <span className="font-bold text-gray-900 truncate max-w-[120px]" title={displayService?.dimensions || "--"}>
                            {displayService?.dimensions || "--"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <hr className="border-gray-100" />

                    {/* Price Details */}
                    <div className="flex flex-col gap-3">
                      <h3 className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-2">Price Details</h3>
                      <div className="space-y-2 px-1">
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-gray-500 font-medium">Base Charge</span>
                          <span className="font-bold text-gray-900">£{basePrice.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-gray-500 font-medium">Fuel Surcharge</span>
                          <span className="font-bold text-gray-900">£{fuel.toFixed(2)}</span>
                        </div>
                        <div className="pt-2 border-t border-gray-100 flex justify-between items-center">
                          <span className="text-gray-700 font-bold text-xs">Net Price</span>
                          <span className="font-extrabold text-sm text-gray-900">£{netPrice.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-gray-500 font-medium">VAT (20%)</span>
                          <span className="font-bold text-gray-900">£{vat.toFixed(2)}</span>
                        </div>
                        <div className="pt-2 border-t border-gray-900 flex justify-between items-center mt-1">
                          <span className="text-gray-900 font-black text-xs">Total Price</span>
                          <span className="font-black text-lg text-[#081b4c] tracking-tight">£{totalPrice.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>

                    <button 
                      onClick={() => setIsScheduleCollectionModalOpen(true)}
                      className="w-full py-3 mt-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 border border-emerald-200 font-bold rounded-xl transition-colors shadow-sm"
                    >
                      Schedule Collection
                    </button>
                  </div>
                </div>
              </div>
              )}
            </div>
          </>
          )}
          {title === 'Spot Rate' ? (
            <>
              {/* Spot Rate Specific Step 3 */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-8 mt-8">
                <div className="bg-[#081b4c] border-b border-[#081b4c] p-5 rounded-t-2xl">
                  <h2 className="text-lg font-extrabold text-white tracking-tight">Step 3 - Shipment & Package Details</h2>
                </div>
                
                <div className="p-6 flex flex-col gap-6">
                  {/* Top row with Service Info and Spot Rate Info Box */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative">
                    <div className="flex flex-col gap-5">
                      <SelectField
                        label="Service Company"
                        value="WO Spot Rate"
                        onChange={() => {}}
                        options={[{ value: "WO Spot Rate", label: "WO Spot Rate" }]}
                        disabled
                      />
                      
                      <div className="relative">
                        <SelectField
                          label="Service Type"
                          value="Spot Rate Freight"
                          onChange={() => {}}
                          options={[{ value: "Spot Rate Freight", label: "Spot Rate Freight" }]}
                          disabled
                        />
                        <div className="hidden lg:flex items-center gap-4 absolute top-[47px] -translate-y-1/2 -right-6 translate-x-full">
                          <ArrowRight className="w-4 h-4 text-gray-400 shrink-0" />
                          <div className="border border-gray-200 rounded-xl p-5 w-80 min-h-[160px] flex flex-col items-start justify-start shadow-sm bg-gray-50/50 text-left">
                            <span className="font-extrabold text-gray-900 text-sm">Spot Rate Freight</span>
                          </div>
                        </div>
                      </div>

                      <SelectField
                        label="Package Type"
                        value={packageType}
                        onChange={setPackageType}
                        options={[
                          { value: "Select one", label: "Select one" },
                          { value: "freight", label: "Freight" },
                          { value: "full-container", label: "Full Container" }
                        ]}
                        placeholder="Select one"
                      />
                      <label className="flex items-center gap-2 cursor-pointer group mt-1">
                        <input type="checkbox" checked={spotRateDetails.liveSameDayCollection} onChange={(e) => setSpotRateDetails({...spotRateDetails, liveSameDayCollection: e.target.checked})} className="w-4 h-4 text-[#081b4c] border-gray-300 rounded focus:ring-[#081b4c]" />
                        <span className="text-sm font-bold text-gray-700 group-hover:text-[#081b4c] transition-colors">Live Same Day Collection Required</span>
                      </label>
                    </div>
                  </div>

                  <hr className="border-gray-100" />

                  {/* Rest of fields arranged beautifully */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
                    <div className="flex flex-col gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-bold text-gray-700">Pickup Request Date</label>
                        <div className="relative">
                          <input type="date" value={spotRateDetails.pickupRequestDate} onChange={(e) => setSpotRateDetails({...spotRateDetails, pickupRequestDate: e.target.value})} className="w-full pl-4 pr-10 py-2.5 bg-white border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 transition-all [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:left-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer" />
                          <Calendar className="w-4 h-4 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>
                      <label className="flex items-center gap-2 cursor-pointer group">
                        <input type="checkbox" checked={spotRateDetails.liveSameDayDelivery} onChange={(e) => setSpotRateDetails({...spotRateDetails, liveSameDayDelivery: e.target.checked})} className="w-4 h-4 text-[#081b4c] border-gray-300 rounded focus:ring-[#081b4c]" />
                        <span className="text-sm font-bold text-gray-700 group-hover:text-[#081b4c] transition-colors">Live Same Day Delivery Required</span>
                      </label>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-bold text-gray-700">Delivery Request Date</label>
                      <div className="relative">
                        <input type="date" value={spotRateDetails.deliveryRequestDate} onChange={(e) => setSpotRateDetails({...spotRateDetails, deliveryRequestDate: e.target.value})} className="w-full pl-4 pr-10 py-2.5 bg-white border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 transition-all [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:left-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer" />
                        <Calendar className="w-4 h-4 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>

                    <SelectField 
                      label="Earliest Delivery Time" 
                      value={spotRateDetails.earliestDeliveryTime} 
                      onChange={(val) => setSpotRateDetails({...spotRateDetails, earliestDeliveryTime: val})} 
                      options={[
                        {value: "Select", label: "Select"},
                        ...Array.from({ length: 24 * 4 }, (_, i) => {
                          const hours = Math.floor(i / 4).toString().padStart(2, '0');
                          const minutes = ((i % 4) * 15).toString().padStart(2, '0');
                          return { value: `${hours}:${minutes}`, label: `${hours}:${minutes}` };
                        })
                      ]} 
                    />
                    <SelectField 
                      label="Latest Delivery Time" 
                      value={spotRateDetails.latestDeliveryTime} 
                      onChange={(val) => setSpotRateDetails({...spotRateDetails, latestDeliveryTime: val})} 
                      options={[
                        {value: "Select", label: "Select"},
                        ...Array.from({ length: 24 * 4 }, (_, i) => {
                          const hours = Math.floor(i / 4).toString().padStart(2, '0');
                          const minutes = ((i % 4) * 15).toString().padStart(2, '0');
                          return { value: `${hours}:${minutes}`, label: `${hours}:${minutes}` };
                        })
                      ]} 
                    />

                    <div className="sm:col-span-2">
                      <InputField 
                        label={
                          <div className="flex items-center gap-1.5">
                            <span>Customer Reference</span>
                            <span className="text-[11px] text-gray-500 font-medium">(Optional) Customer reference will appear on your invoice</span>
                          </div>
                        }
                        type="text" 
                        placeholder="Enter Customer Reference" 
                        value={customerRef}
                        onChange={(e) => setCustomerRef(e.target.value)}
                      />
                    </div>

                    <div className="sm:col-span-2 relative">
                      <TextAreaField 
                        label="Additional Comments" 
                        placeholder="Description" 
                        rows={4}
                        value={spotRateDetails.additionalComments}
                        onChange={(e) => setSpotRateDetails({...spotRateDetails, additionalComments: e.target.value})}
                      />
                      <CircleHelp className="w-4 h-4 text-blue-400 absolute right-0 top-0 mt-0.5" />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-bold text-gray-700">Enhanced Cover (£)</label>
                      <div className="flex items-center gap-4">
                        <label className="flex items-center gap-2 cursor-pointer text-gray-700 font-bold whitespace-nowrap">
                          <input type="checkbox" checked={hasEnhancedCover} onChange={(e) => setHasEnhancedCover(e.target.checked)} className="w-4 h-4 text-[#081b4c] border-gray-300 rounded focus:ring-[#081b4c]" />
                          <span className="text-sm">Optional</span>
                        </label>
                        <input type="number" className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 transition-all" value={spotRateDetails.enhancedCoverValue} onChange={(e) => setSpotRateDetails({...spotRateDetails, enhancedCoverValue: e.target.value})} />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-2">
                        <label className="text-sm font-bold text-gray-700">Sender VAT Number</label>
                        <span className="text-[11px] text-gray-500 font-medium">(Applicable if Limited Company)</span>
                      </div>
                      <input type="text" className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 transition-all" value={senderVatNumber} onChange={(e) => setSenderVatNumber(e.target.value)} placeholder="GB764431527" />
                    </div>

                    <div className="sm:col-span-2 flex items-center gap-6 mt-2 mb-2">
                      <label className="flex items-center gap-2 cursor-pointer font-bold text-gray-700 text-sm group">
                        <span className="group-hover:text-[#081b4c] transition-colors">Non Stackable Items?</span>
                        <input type="checkbox" checked={spotRateDetails.nonStackableItems} onChange={(e) => setSpotRateDetails({...spotRateDetails, nonStackableItems: e.target.checked})} className="w-4 h-4 text-[#081b4c] border-gray-300 rounded focus:ring-[#081b4c]" />
                        <CircleHelp className="w-4 h-4 text-blue-400 ml-1" />
                      </label>
                      
                      <label className="flex items-center gap-2 cursor-pointer font-bold text-gray-700 text-sm group">
                        <span className="group-hover:text-[#081b4c] transition-colors">Hazardous Goods</span>
                        <input type="checkbox" checked={spotRateDetails.hazardousGoods} onChange={(e) => setSpotRateDetails({...spotRateDetails, hazardousGoods: e.target.checked})} className="w-4 h-4 text-[#081b4c] border-gray-300 rounded focus:ring-[#081b4c]" />
                      </label>
                    </div>

                    <SelectField label="Pickup Services" value={spotRateDetails.pickupServices} onChange={(val) => setSpotRateDetails({...spotRateDetails, pickupServices: val})} options={[{value: "Select Services", label: "Select Services"}]} />
                    <SelectField label="Delivery Services" value={spotRateDetails.deliveryServices} onChange={(val) => setSpotRateDetails({...spotRateDetails, deliveryServices: val})} options={[{value: "Select Services", label: "Select Services"}]} />
                    
                    <SelectField label="Mode Of Transport" value={spotRateDetails.modeOfTransport} onChange={(val) => setSpotRateDetails({...spotRateDetails, modeOfTransport: val})} options={[{value: "Mode Of Transport", label: "Mode Of Transport"}]} />
                    <SelectField label="B2B or B2C" value={spotRateDetails.b2bOrB2c} onChange={(val) => setSpotRateDetails({...spotRateDetails, b2bOrB2c: val})} options={[{value: "B2B or B2C", label: "B2B or B2C"}]} />
                    
                    <SelectField label="Incoterms" value={spotRateDetails.incoterms} onChange={(val) => setSpotRateDetails({...spotRateDetails, incoterms: val})} options={[{value: "Incoterms", label: "Incoterms"}]} />

                    <div className="sm:col-span-2 mt-2 flex flex-col gap-4">
                      <div className="flex flex-col gap-2 w-full">
                        <label className="text-sm font-bold text-gray-700">Supporting Documents</label>
                        <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-300 rounded-xl w-full h-32 hover:border-blue-500 hover:bg-blue-50/50 transition-all group bg-white cursor-pointer relative">
                          <input 
                            type="file" 
                            className="hidden" 
                            onChange={(e) => {
                              if (e.target.files && e.target.files[0]) {
                                setPackingListFile(e.target.files[0]);
                              }
                            }}
                          />
                          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                            <Files className="w-5 h-5 text-gray-500 group-hover:text-blue-600" />
                          </div>
                          <div className="flex flex-col items-center gap-1">
                            <span className="text-sm font-bold text-gray-700 group-hover:text-blue-600 transition-colors">
                              {packingListFile ? packingListFile.name : "Click to upload Packing List"}
                            </span>
                            {!packingListFile && <span className="text-xs text-gray-500">or drag and drop your file here</span>}
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : title !== 'Pallet Shipment' ? (
            <>
              {/* Step 3: Package & Shipment Details */}
              <ShipmentDetails
                hasEnhancedCover={hasEnhancedCover}
                setHasEnhancedCover={setHasEnhancedCover}
                serviceCompany={serviceCompany}
                setServiceCompany={setServiceCompany}
                serviceType={serviceType}
                setServiceType={setServiceType}
                serviceTypeOptions={serviceTypeOptions}
                selectedService={selectedService}
              />
            </>
          ) : null}

          {/* Box / Unit Details Section (for non-pallet shipments) */}
          {title !== 'Pallet Shipment' && (
            <>
          {/* Box Details Section */}
          <BoxDetails
            packageType={packageType}
            setPackageType={setPackageType}
            isDocument={isDocument}
            setIsDocument={setIsDocument}
            isCommodity={isCommodity}
            setIsCommodity={setIsCommodity}
            numBoxes={numBoxes}
            setNumBoxes={setNumBoxes}
            showBoxesSize={showBoxesSize}
            setShowBoxesSize={setShowBoxesSize}
            currency={currency}
            setCurrency={setCurrency}
            currencyOptions={currencyOptions}
            boxesData={boxesData}
            handleBoxChange={handleBoxChange}
            handleCopyAllBoxes={handleCopyAllBoxes}
            handleCopyNextBox={handleCopyNextBox}
          />
          

          </>
          )}

          {title === 'Pallet Shipment' && (
          <>
            {/* Pallet Specific Step 3 */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-8">
              <div className="bg-[#081b4c] border-b border-[#081b4c] p-5 rounded-t-2xl">
                <h2 className="text-lg font-extrabold text-white tracking-tight">Step 3 - Shipment & Package Details</h2>
              </div>
              
              <div className="p-6 flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
                  {/* Service Company */}
                  <SelectField
                    label={
                      <div className="flex items-center gap-2">
                        Service Company
                        <CircleHelp className="w-4 h-4 text-blue-500" />
                      </div>
                    }
                    value={serviceCompany}
                    onChange={setServiceCompany}
                    options={[
                      { value: "palletways", label: "PalletWays" }
                    ]}
                    placeholder="Select one"
                  />

                  {/* Info Box */}
                  <div className="md:row-span-2 border border-gray-200 rounded-xl p-4 flex flex-col justify-center h-full min-h-[90px]">
                    {serviceCompany === 'palletways' && serviceType ? (
                      <>
                        <span className="font-bold text-gray-900 mb-1 uppercase">{serviceType}</span>
                        <span className="text-sm text-gray-500">{palletServiceInfo[serviceType] || "UK: Delivery Day(s) - 2-5"}</span>
                      </>
                    ) : (
                      <>
                        <span className="font-bold text-gray-900 mb-1">Select one</span>
                        <span className="text-sm text-gray-500">Please select service type to view the details.</span>
                      </>
                    )}
                  </div>

                  {/* Service Type */}
                  <SelectField
                    label="Service Type"
                    value={serviceType}
                    onChange={setServiceType}
                    options={serviceCompany === 'palletways' ? [
                      { value: "by 1200", label: "by 1200" },
                      { value: "by 1700", label: "by 1700" },
                      { value: "by 2100", label: "by 2100" },
                      { value: "Saturday by 1400", label: "Saturday by 1400" },
                      { value: "Timed", label: "Timed" },
                      { value: "Timed 1300 to 1700", label: "Timed 1300 to 1700" },
                      { value: "Next Day by 1200", label: "Next Day by 1200" },
                      { value: "Next Day by 1700", label: "Next Day by 1700" },
                      { value: "Next Day by 2100", label: "Next Day by 2100" },
                      { value: "Next Day Timed", label: "Next Day Timed" },
                      { value: "Next Day Timed 1300 to 1700", label: "Next Day Timed 1300 to 1700" }
                    ] : [{ value: "standard", label: "Standard" }]}
                    placeholder="Select One"
                  />                  {/* Row 1: Number of Pallets & Special Instructions */}
                  <div className="md:col-span-1">
                    <InputField 
                      label="Number of Pallets" 
                      type="text" 
                      value="Number of Pallets"
                      disabled
                      className="bg-gray-200 text-gray-500 border-none opacity-50"
                      containerClassName="pointer-events-none"
                    />
                  </div>
                  <div className="md:col-span-1">
                    <InputField 
                      label="Special Instructions" 
                      type="text" 
                      value={specialInstructions}
                      onChange={(e) => setSpecialInstructions(e.target.value)}
                      placeholder="Special Instructions" 
                    />
                  </div>

                  {/* Row 2: Customer Reference & Sender VAT Number */}
                  <div className="md:col-span-1">
                    <InputField 
                      label="Customer Reference" 
                      type="text" 
                      value={customerRef}
                      onChange={(e) => setCustomerRef(e.target.value)}
                      placeholder="Customer Reference" 
                    />
                  </div>
                  <div className="md:col-span-1">
                    <InputField 
                      label={
                        <div className="flex items-center gap-1">
                          Sender VAT Number 
                          <span className="text-xs text-gray-500 font-medium">(Applicable if Limited Company)</span>
                        </div>
                      }
                      type="text" 
                      value={senderVatNumber}
                      onChange={(e) => setSenderVatNumber(e.target.value)}
                      placeholder="GB764431527" 
                    />
                  </div>

                  {/* Row 3: Checkboxes (under Customer Reference) */}
                  <div className="md:col-start-1 md:col-span-1 flex flex-col gap-4 pt-2">
                    <label className="flex items-center gap-2 cursor-pointer font-bold text-gray-700 text-sm group w-fit">
                      <input 
                        type="checkbox" 
                        checked={tailLift}
                        onChange={(e) => setTailLift(e.target.checked)}
                        className="w-4 h-4 text-[#081b4c] border-gray-300 rounded focus:ring-[#081b4c]" 
                      />
                      <span className="group-hover:text-[#081b4c] transition-colors">Tail Lift?</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer font-bold text-gray-700 text-sm group w-fit">
                      <input 
                        type="checkbox" 
                        checked={sameDayCollection}
                        onChange={(e) => setSameDayCollection(e.target.checked)}
                        className="w-4 h-4 text-[#081b4c] border-gray-300 rounded focus:ring-[#081b4c]" 
                      />
                      <span className="group-hover:text-[#081b4c] transition-colors">Same day collection needed?</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer font-bold text-gray-700 text-sm group w-fit">
                      <input 
                        type="checkbox" 
                        checked={amazonShipment}
                        onChange={(e) => setAmazonShipment(e.target.checked)}
                        className="w-4 h-4 text-[#081b4c] border-gray-300 rounded focus:ring-[#081b4c]" 
                      />
                      <span className="group-hover:text-[#081b4c] transition-colors">Amazon Shipment</span>
                    </label>
                    <div className="flex items-start gap-2 cursor-pointer group w-fit">
                      <input 
                        type="checkbox" 
                        checked={timedDelivery}
                        onChange={(e) => setTimedDelivery(e.target.checked)}
                        className="w-4 h-4 mt-0.5 text-[#081b4c] border-gray-300 rounded focus:ring-[#081b4c]" 
                        id="timed-delivery"
                      />
                      <div className="flex flex-col">
                        <label htmlFor="timed-delivery" className="font-bold text-gray-700 text-sm group-hover:text-[#081b4c] transition-colors cursor-pointer">
                          Timed delivery slot needed?
                        </label>
                        <span className="text-xs text-gray-500 font-normal">(Extra charges may apply!)</span>
                      </div>
                      <CircleHelp className="w-4 h-4 text-blue-500 ml-1 mt-0.5 cursor-help" />
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Box Details Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-8">
              <div className="bg-[#081b4c] border-b border-[#081b4c] p-5 rounded-t-2xl">
                <h2 className="text-lg font-extrabold text-white tracking-tight">Box Details</h2>
                <p className="text-xs text-blue-100 font-medium mt-0.5">Specify the dimensions and weight for each box.</p>
              </div>
              
              <div className="p-6 flex flex-col gap-6 relative">
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
                    {/* No. of Boxes */}
                    <div className="md:col-span-1">
                      <SelectField
                        label="No. of Boxes"
                        value={numBoxes}
                        onChange={setNumBoxes}
                        options={[...Array(10)].map((_, i) => ({ value: String(i + 1), label: String(i + 1) }))}
                      />
                    </div>
                  </div>

                  <div className="flex justify-end -mb-2 mt-2">
                    <button 
                      onClick={(e) => { e.preventDefault(); handleCopyAllBoxes(); }}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-50 text-[#081b4c] hover:bg-[#081b4c] hover:text-white transition-colors border border-blue-100 shadow-sm font-bold text-sm"
                      title="Copy Box 1 to all boxes"
                    >
                      <Files className="w-4 h-4" />
                      Copy All
                    </button>
                  </div>

                  {/* Dimensions Table */}
                  <div className="border border-gray-200 rounded-xl overflow-hidden mt-2">
                    <div className="grid grid-cols-12 gap-4 p-4 bg-gray-50 border-b border-gray-200 text-sm font-bold text-gray-700">
                      <div className="col-span-1">No.</div>
                      <div className="col-span-3">Weight</div>
                      <div className="col-span-7">Dimensions (Minimum of 1cm)</div>
                      <div className="col-span-1"></div>
                    </div>
                    <div className="flex flex-col p-4 gap-4">
                      {boxesData.map((box, idx) => (
                        <div key={idx} className="grid grid-cols-12 gap-4 items-center">
                          <div className="col-span-1 text-sm text-gray-600">{idx + 1}</div>
                          <div className="col-span-3 relative">
                            <input 
                              type="number" 
                              className="w-full pl-3 pr-10 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 transition-all text-sm" 
                              placeholder="Unit" 
                              value={box.weight}
                              onChange={(e) => handleBoxChange(idx, 'weight', e.target.value)}
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center px-3 bg-gray-100 border-l border-gray-200 rounded-r-xl text-xs font-bold text-gray-500">
                              KG
                            </div>
                          </div>
                          <div className="col-span-7 grid grid-cols-3 gap-0 rounded-xl overflow-hidden border border-gray-200 relative">
                            <input type="number" placeholder="L" className="w-full px-3 py-2.5 bg-white border-r border-gray-200 focus:outline-none text-sm" value={box.length} onChange={(e) => handleBoxChange(idx, 'length', e.target.value)} />
                            <input type="number" placeholder="W" className="w-full px-3 py-2.5 bg-white border-r border-gray-200 focus:outline-none text-sm" value={box.width} onChange={(e) => handleBoxChange(idx, 'width', e.target.value)} />
                            <input type="number" placeholder="H" className="w-full px-3 py-2.5 bg-white focus:outline-none text-sm" value={box.height} onChange={(e) => handleBoxChange(idx, 'height', e.target.value)} />
                          </div>
                          <div className="col-span-1 flex items-center justify-end">
                            <button 
                              onClick={(e) => { e.preventDefault(); handleCopyNextBox(idx); }}
                              className="h-10 w-10 flex items-center justify-center rounded-xl bg-blue-50 text-blue-500 hover:bg-blue-100 transition-colors border border-blue-100 shadow-sm"
                              title="Copy to next box"
                            >
                              <ArrowDownToLine className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
                
                <div className="bg-[#fff9e6] border border-[#ffe066] rounded-xl p-4 flex items-start gap-3 mt-4">
                  <div className="w-6 h-6 rounded-full bg-[#ffc107] flex items-center justify-center text-white font-bold flex-shrink-0 text-sm mt-0.5">!</div>
                  <div className="text-sm font-bold text-gray-800 flex flex-col gap-1.5">
                    <span>Note: Collections and deliveries are between the hours of 8:30am to 5:30pm</span>
                    <span className="font-medium text-gray-700">If the collection is cancelled after the shipment has been booked, a £15.00 cancellation fee will be applied.</span>
                    <span className="font-medium text-gray-700">Same day collection charge is £12.50 and needs to be booked before 11:30am.</span>
                    <span className="font-medium text-gray-700">Same Day Collection from Northern Ireland will be within 48 hours.</span>
                  </div>
                </div>


              </div>
            </div>
          </>
        )}

          {/* Action Buttons */}
          <div className="flex justify-between items-center gap-4 mt-2">
            <button className="px-6 py-2.5 text-sm font-bold text-blue-600 bg-blue-50 border border-blue-100 rounded-xl hover:bg-blue-100 transition-colors">
              Quote
            </button>
            <div className="flex justify-end gap-4">
              <button 
                onClick={handleReset}
                className="px-6 py-2.5 text-sm font-bold text-red-600 bg-red-50 border border-red-100 rounded-xl hover:bg-red-100 transition-colors"
              >
                Reset
              </button>
              <button className="px-6 py-2.5 text-sm font-bold text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
                Save as Draft
              </button>
              <button 
                onClick={() => setCurrentStep(2)}
                className="px-6 py-2.5 text-sm font-bold text-white bg-[#081b4c] rounded-xl hover:bg-blue-950 transition-colors shadow-sm flex items-center gap-2"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {currentStep === 2 && (
        <div className="flex flex-col gap-8 animate-in slide-in-from-right-8 duration-500">
          {/* Step 4: Additional Shipment Details */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mt-4">
            <div className="bg-[#081b4c] border-b border-[#081b4c] p-5 rounded-t-2xl">
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
          <CommodityDetails
            invoiceItems={invoiceItems}
            setInvoiceItems={setInvoiceItems}
            countryOptions={countryOptions}
            isCustomValueEditable={isCustomValueEditable}
            setIsCustomValueEditable={setIsCustomValueEditable}
          />

          {/* Additional Comments */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mt-4">
            <div className="bg-[#081b4c] border-b border-[#081b4c] p-4 rounded-t-2xl">
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
            <div className="bg-[#081b4c] border-b border-[#081b4c] p-4 flex justify-between items-center rounded-t-2xl">
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
              className="px-6 py-2.5 text-sm font-bold text-white bg-[#081b4c] rounded-xl hover:bg-blue-950 transition-colors shadow-sm flex items-center gap-2"
            >
              Proceed to Summary
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {currentStep === 3 && (
        <div className="flex flex-col gap-6 animate-in slide-in-from-right-8 duration-500">
          <div className="bg-[#081b4c] p-5 rounded-2xl text-white shadow-sm">
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
              <div><span className="block text-xs font-bold text-gray-500 uppercase mb-1">Package Type</span><span className="font-semibold text-gray-900 capitalize">{packageType || "Box"}</span></div>
              <div><span className="block text-xs font-bold text-gray-500 uppercase mb-1">Total Weight</span><span className="font-semibold text-gray-900">10 kg</span></div>
              <div><span className="block text-xs font-bold text-gray-500 uppercase mb-1">Service</span><span className="font-semibold text-gray-900">{displayService?.name || "DHL Express"}</span></div>
              <div><span className="block text-xs font-bold text-gray-500 uppercase mb-1">Dimensions</span><span className="font-semibold text-gray-900">{displayService?.dimensions || "Standard"}</span></div>
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
                <span className="font-semibold text-[#081b4c]">Total Custom Value</span>
                <span className="font-black text-[#081b4c]">£50.00</span>
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
                <span className="font-black text-xl text-[#081b4c]">£{totalPrice.toFixed(2)}</span>
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
              className="px-6 py-2.5 text-sm font-bold text-white bg-[#081b4c] rounded-xl hover:bg-blue-950 transition-colors shadow-sm flex items-center gap-2"
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
