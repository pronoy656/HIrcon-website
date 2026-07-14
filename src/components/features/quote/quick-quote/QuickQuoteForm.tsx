"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Package, Truck, Clock, Calculator, MapPin, Globe, Building, ChevronDown, Plus, Minus, HelpCircle, ArrowUpDown, Contact } from 'lucide-react';
import clsx from 'clsx';
import { countries } from '@/lib/countries';
import { QuoteResults, type QuoteFormData } from '@/components/features/quote/quick-quote/QuoteResults';
import { AddressBookModal, type AddressEntry } from '@/components/features/shipment/AddressBookModal';
import { SelectField } from '@/components/ui/SelectField';

function FlagImg({ code }: { code: string }) {
  if (!code) return null;
  return (
    <img
      src={`https://flagcdn.com/w20/${code.toLowerCase()}.png`}
      srcSet={`https://flagcdn.com/w40/${code.toLowerCase()}.png 2x`}
      width="24"
      height="18"
      alt={`${code} flag`}
      className="rounded-sm object-cover border border-gray-100 shadow-sm"
    />
  );
}

const CountrySelect = ({ label, value, onChange }: any) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  const selectedCountry = countries.find(c => c.code === value);

  useEffect(() => {
    if (!open && selectedCountry) {
      setSearch(selectedCountry.name);
    } else if (!open && !selectedCountry) {
      setSearch("");
    }
  }, [value, open, selectedCountry]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredCountries = countries.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    c.code.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4 relative" ref={ref}>
      <label className="text-sm font-semibold text-gray-500 tracking-wide uppercase">{label}</label>
      <div className="w-full px-0 pt-3 pb-3 border-b-2 border-gray-200 text-gray-900 text-lg font-bold focus-within:border-[#081b4c] transition-colors bg-transparent flex items-center justify-between">
        <div className="flex items-center gap-3 w-full overflow-hidden">
          {selectedCountry && !open && <FlagImg code={selectedCountry.code} />}
          <input 
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setOpen(true);
            }}
            onFocus={(e) => {
              setOpen(true);
              e.target.select();
            }}
            placeholder="Select Country"
            className="w-full bg-transparent focus:outline-none placeholder:font-normal placeholder:text-gray-400 text-lg font-bold truncate"
          />
        </div>
        <ChevronDown 
          onClick={() => setOpen(!open)}
          className={`w-5 h-5 text-gray-400 transition-transform cursor-pointer shrink-0 ${open ? 'rotate-180' : ''}`} 
        />
      </div>

      {open && (
        <div className="absolute top-[calc(100%-8px)] left-0 w-full mt-2 bg-white border border-gray-200 shadow-xl rounded-xl z-50 overflow-hidden flex flex-col max-h-60">
          <div className="overflow-y-auto flex-1 p-2 custom-scrollbar">
            {filteredCountries.map(c => (
              <div 
                key={c.code}
                onClick={() => { 
                  onChange(c.code); 
                  setSearch(c.name);
                  setOpen(false); 
                }}
                className="flex items-center gap-3 px-3 py-2.5 hover:bg-gray-50 rounded-xl cursor-pointer transition-colors"
              >
                <FlagImg code={c.code} />
                <span className="font-medium text-gray-700">{c.name}</span>
              </div>
            ))}
            {filteredCountries.length === 0 && (
              <div className="px-3 py-4 text-center text-sm text-gray-500">No countries found.</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const PremiumSelect = ({ label, value, options, onChange }: any) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex-1 space-y-2 relative" ref={ref}>
      {label && <label className="text-xs font-semibold text-gray-500 uppercase">{label}</label>}
      <div 
        onClick={() => setOpen(!open)}
        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:border-[#081b4c] focus:ring-1 focus:ring-[#081b4c] cursor-pointer flex items-center justify-between transition-all"
      >
        <span className="font-medium text-gray-700 text-sm truncate">{value || options[0]}</span>
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`} />
      </div>

      {open && (
        <div className="absolute top-full left-0 w-full mt-2 bg-white border border-gray-200 shadow-xl rounded-xl z-50 overflow-y-auto max-h-60 flex flex-col py-1">
          {options.map((opt: string) => (
            <div 
              key={opt}
              onClick={() => { onChange(opt); setOpen(false); }}
              className="px-4 py-2.5 hover:bg-gray-50 cursor-pointer font-medium text-gray-700 text-sm transition-colors"
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const PremiumBox = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 3l9 5.25v10.5L12 24l-9-5.25V8.25L12 3z" fill="currentColor" fillOpacity="0.1" />
    <path d="M12 3l9 5.25v10.5L12 24l-9-5.25V8.25L12 3z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3 8.25L12 13.5l9-5.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 13.5v10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M7.5 5.625l9 5.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="2 2" opacity="0.6"/>
  </svg>
);

const PremiumTruck = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="2" y="6" width="13" height="11" rx="1.5" fill="currentColor" fillOpacity="0.1"/>
    <rect x="2" y="6" width="13" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M15 9h3.5a2 2 0 011.8 1.1l1.7 3.4V17h-7V9z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="6.5" cy="17.5" r="2.5" fill="white" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="17.5" cy="17.5" r="2.5" fill="white" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M9 17h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M18 13h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
  </svg>
);

const PremiumClock = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="9" fill="currentColor" fillOpacity="0.1"/>
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 7v5l3.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M19 3l2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M5 3l-2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M3 12h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
    <path d="M19 12h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
  </svg>
);

const PremiumCalculator = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="4" y="2" width="16" height="20" rx="2" fill="currentColor" fillOpacity="0.1"/>
    <rect x="4" y="2" width="16" height="20" rx="2" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M8 7h8v3H8z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="8.5" cy="14.5" r="1.5" fill="currentColor"/>
    <circle cx="12.5" cy="14.5" r="1.5" fill="currentColor"/>
    <circle cx="15.5" cy="14.5" r="1.5" fill="currentColor"/>
    <circle cx="8.5" cy="18.5" r="1.5" fill="currentColor"/>
    <circle cx="12.5" cy="18.5" r="1.5" fill="currentColor"/>
    <circle cx="15.5" cy="18.5" r="1.5" fill="currentColor"/>
  </svg>
);

const quoteTypes = [
  { id: 'parcels', label: 'Parcels & Documents', icon: PremiumBox },
  { id: 'pallets', label: 'Pallets & Freight', icon: PremiumTruck },
  { id: 'sameday', label: 'Same Day & Dedicated', icon: PremiumClock },
  { id: 'spotrate', label: 'Spot Rate Freight', icon: PremiumCalculator },
];

const COUNTRIES_WITH_STATES = ['US', 'CA', 'AU', 'IN', 'BR', 'MX', 'MY'];

const MOCK_ADDRESSES = [
  "John Doe - 123 Main St, New York, NY",
  "Jane Smith - 456 Market St, San Francisco, CA",
  "Acme Corp - 789 Industrial Blvd, Chicago, IL",
  "TechFlow Ltd - 100 Innovation Way, Austin, TX",
  "Global Industries - 200 Corporate Dr, Seattle, WA"
];

const AddressBookInput = ({ label, value, onChange, onContactClick, residential, onResidentialChange }: any) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredAddresses = value 
    ? MOCK_ADDRESSES.filter(addr => addr.toLowerCase().includes(value.toLowerCase()))
    : MOCK_ADDRESSES;

  return (
    <div className="space-y-4 relative" ref={ref}>
      <label className="text-sm font-semibold text-gray-500 tracking-wide uppercase">{label}</label>
      <input 
        type="text"
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        className="w-full px-0 py-3 border-b-2 border-gray-200 text-gray-900 text-lg font-bold focus:outline-none focus:border-[#081b4c] transition-colors bg-transparent placeholder:font-normal placeholder:text-gray-300"
        placeholder="Type to search..."
      />
      <button 
        type="button" 
        onClick={onContactClick} 
        className="absolute right-0 top-0 bg-[#081b4c] text-white hover:bg-[#06153b] p-1 rounded transition-colors shadow-sm" 
        title="Select from Address Book"
      >
        <Contact className="w-4 h-4" />
      </button>

      {open && (
        <div className="absolute top-[75px] left-0 w-full bg-white border border-gray-200 shadow-xl rounded-xl z-50 overflow-hidden flex flex-col max-h-60">
          <div className="overflow-y-auto flex-1 p-2 custom-scrollbar">
            {filteredAddresses.length > 0 ? (
              filteredAddresses.map((addr, idx) => (
                <div 
                  key={idx}
                  onClick={() => {
                    onChange(addr);
                    setOpen(false);
                  }}
                  className="px-3 py-2.5 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors text-sm font-medium text-gray-700"
                >
                  {addr}
                </div>
              ))
            ) : (
              <div className="px-3 py-3 text-sm text-gray-500 text-center">No matching addresses</div>
            )}
          </div>
        </div>
      )}

      <label className="flex items-center gap-2 cursor-pointer mt-2 text-sm text-gray-600 font-medium">
        <input 
          type="checkbox" 
          checked={residential}
          onChange={(e) => onResidentialChange(e.target.checked)}
          className="w-4 h-4 text-[#081b4c] border-gray-300 rounded focus:ring-[#081b4c]" 
        />
        Residential Address
      </label>
    </div>
  );
};

export function QuickQuoteForm() {
  // View state
  const [view, setView] = useState<'form' | 'results'>('form');
  const [quoteData, setQuoteData] = useState<QuoteFormData | null>(null);

  const [activeType, setActiveType] = useState('parcels');
  const [fromCountry, setFromCountry] = useState('');
  const [fromState, setFromState] = useState('');
  const [fromCity, setFromCity] = useState('');
  const [fromPostCode, setFromPostCode] = useState('');
  const [fromAddressBook, setFromAddressBook] = useState('');
  const [fromResidential, setFromResidential] = useState(false);
  const [toCountry, setToCountry] = useState('');
  const [toState, setToState] = useState('');
  const [toCity, setToCity] = useState('');
  const [toPostCode, setToPostCode] = useState('');
  const [toAddressBook, setToAddressBook] = useState('');
  const [toResidential, setToResidential] = useState(false);
  
  const [addressBookTarget, setAddressBookTarget] = useState<'from' | 'to' | null>(null);

  const [subTab, setSubTab] = useState<'parcels' | 'envelopes'>('parcels');
  
  const [units, setUnits] = useState<any[]>([{ 
    id: Date.now(), 
    packaging: 'My Packaging' 
  }]);

  const updateUnit = (id: number, field: string, value: any) => {
    setUnits(units.map(u => u.id === id ? { ...u, [field]: value } : u));
  };

  // Pallets State
  const [palletTab, setPalletTab] = useState<'boxes' | 'containers'>('boxes');
  const [palletMode, setPalletMode] = useState('All');
  const [palletUnits, setPalletUnits] = useState<any[]>([{ 
    id: Date.now(), 
    packaging: 'My Packaging' 
  }]);

  const updatePalletUnit = (id: number, field: string, value: any) => {
    setPalletUnits(palletUnits.map(u => u.id === id ? { ...u, [field]: value } : u));
  };

  const [pickupService, setPickupService] = useState('');
  const [deliveryService, setDeliveryService] = useState('');
  const [earliestTime, setEarliestTime] = useState('');
  const [latestTime, setLatestTime] = useState('');

  // Same Day State
  const [samedayTab, setSamedayTab] = useState<'parcels' | 'envelopes'>('parcels');
  const [samedayUnits, setSamedayUnits] = useState<any[]>([{ 
    id: Date.now(), 
    packaging: 'My Packaging' 
  }]);

  const updateSamedayUnit = (id: number, field: string, value: any) => {
    setSamedayUnits(samedayUnits.map(u => u.id === id ? { ...u, [field]: value } : u));
  };

  // Spot Rate State
  const [spotrateTab, setSpotrateTab] = useState<'boxes' | 'containers'>('boxes');
  const [spotrateUnits, setSpotrateUnits] = useState<any[]>([{ 
    id: Date.now(), 
    packaging: 'My Packaging',
    unitType: '',
    commodity: ''
  }]);
  const [spotratePickupService, setSpotratePickupService] = useState('');
  const [spotrateDeliveryService, setSpotrateDeliveryService] = useState('');
  const [spotrateEarliestTime, setSpotrateEarliestTime] = useState('');
  const [spotrateLatestTime, setSpotrateLatestTime] = useState('');
  
  const [spotrateTransportMode, setSpotrateTransportMode] = useState('');
  const [spotrateBusinessType, setSpotrateBusinessType] = useState('');
  const [spotrateIncoterms, setSpotrateIncoterms] = useState('');

  const updateSpotrateUnit = (id: number, field: string, value: any) => {
    setSpotrateUnits(spotrateUnits.map(u => u.id === id ? { ...u, [field]: value } : u));
  };

  const timeOptions = Array.from({length: 48}, (_, i) => `${String(Math.floor(i/2)).padStart(2, '0')}:${i%2===0 ? '00' : '30'}`);

  const handleGetQuote = (currentUnits: any[], parcelType: string) => {
    const data: QuoteFormData = {
      fromCountry,
      fromCity,
      fromPostCode,
      toCountry,
      toCity,
      toPostCode,
      parcelType,
      units: currentUnits.map(u => ({ ...u, weight: u.weight || '', weightUnit: u.weightUnit || 'kg' })),
      activeType,
    };
    setQuoteData(data);
    setView('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (view === 'results' && quoteData) {
    return <QuoteResults formData={quoteData} onEditQuote={() => setView('form')} />;
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Page Title on Blue Background */}
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold text-white mb-2 tracking-tight">Quick Quote</h1>
        <p className="text-blue-100 font-medium">Get instant quotes for your shipments across different services.</p>
      </div>

      {/* Top Header & Type Selector */}
      <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm mt-20">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {quoteTypes.map((type) => {
            const Icon = type.icon;
            const isActive = activeType === type.id;
            
            return (
              <button
                key={type.id}
                onClick={() => setActiveType(type.id)}
                className={clsx(
                  "relative flex flex-col items-center justify-center gap-3 p-5 rounded-2xl border-2 transition-all duration-300",
                  isActive 
                    ? "border-[#081b4c] bg-[#081b4c] shadow-md transform scale-[1.02]" 
                    : "border-gray-100 bg-white hover:border-[#081b4c]/30 hover:bg-gray-50"
                )}
              >
                <div className={clsx(
                  "p-3.5 rounded-full transition-colors",
                  isActive ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"
                )}>
                  <Icon className="w-7 h-7" />
                </div>
                <span className={clsx(
                  "font-bold text-sm text-center",
                  isActive ? "text-white" : "text-gray-600"
                )}>
                  {type.label}
                </span>
                
                {/* Active Indicator */}
                {isActive && (
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#081b4c] rotate-45 border-r-2 border-b-2 border-transparent" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Form Section: From and To */}
      {/* Form Section: From and To Stacked Layout */}
      <div className="bg-white p-10 rounded-3xl border border-gray-200 shadow-sm relative group hover:shadow-md transition-all duration-300">
        
        <div className="flex">
          {/* Left Timeline Connector */}
          <div className="flex flex-col items-center mr-10 relative pt-2 pb-2">
            {/* Top Dot (From) */}
            <div className="w-10 h-10 rounded-full bg-blue-50 border-2 border-white shadow-sm flex items-center justify-center z-10 relative">
              <MapPin className="w-5 h-5 text-[#081b4c]" />
            </div>
            
            {/* Dotted Line */}
            <div className="w-[3px] flex-1 border-l-[3px] border-dotted border-gray-300 my-2 min-h-[4rem]" />
            
            {/* Switch Locations Button */}
            <button 
              type="button"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white border border-gray-200 rounded-full shadow-md flex items-center justify-center text-gray-500 hover:text-[#081b4c] hover:bg-gray-50 transition-all z-20 group"
              title="Switch locations"
            >
              <ArrowUpDown className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />
            </button>
            
            {/* Bottom Dot (To) */}
            <div className="w-10 h-10 rounded-full bg-blue-50 border-2 border-white shadow-sm flex items-center justify-center z-10 relative">
              <MapPin className="w-5 h-5 text-[#081b4c]" />
            </div>
          </div>

          {/* Right Content Fields */}
          <div className="flex-1 flex flex-col justify-between">
            
            {/* From Row */}
            <div className="w-full">
              <div className={clsx("grid grid-cols-1 gap-12", COUNTRIES_WITH_STATES.includes(fromCountry) ? "md:grid-cols-5" : "md:grid-cols-4")}>
                <CountrySelect label="From" value={fromCountry} onChange={setFromCountry} />
                
                {COUNTRIES_WITH_STATES.includes(fromCountry) && (
                  <div className="space-y-4">
                    <label className="text-sm font-semibold text-gray-500 tracking-wide uppercase">State</label>
                    <input 
                      type="text"
                      value={fromState}
                      onChange={(e) => setFromState(e.target.value)}
                      className="w-full px-0 py-3 border-b-2 border-gray-200 text-gray-900 text-lg font-bold focus:outline-none focus:border-[#081b4c] transition-colors bg-transparent placeholder:font-normal placeholder:text-gray-300"
                    />
                  </div>
                )}

                <div className="space-y-4">
                  <label className="text-sm font-semibold text-gray-500 tracking-wide uppercase">City</label>
                  <input 
                    type="text"
                    value={fromCity}
                    onChange={(e) => setFromCity(e.target.value)}
                    className="w-full px-0 py-3 border-b-2 border-gray-200 text-gray-900 text-lg font-bold focus:outline-none focus:border-[#081b4c] transition-colors bg-transparent placeholder:font-normal placeholder:text-gray-300"
                  />
                </div>

                <div className="space-y-4">
                  <label className="text-sm font-semibold text-gray-500 tracking-wide uppercase">Post Code</label>
                  <input 
                    type="text"
                    value={fromPostCode}
                    onChange={(e) => setFromPostCode(e.target.value)}
                    className="w-full px-0 py-3 border-b-2 border-gray-200 text-gray-900 text-lg font-bold focus:outline-none focus:border-[#081b4c] transition-colors bg-transparent uppercase placeholder:font-normal placeholder:text-gray-300"
                  />
                </div>

                <AddressBookInput
                  label="Address Book"
                  value={fromAddressBook}
                  onChange={setFromAddressBook}
                  onContactClick={() => setAddressBookTarget('from')}
                  residential={fromResidential}
                  onResidentialChange={setFromResidential}
                />
              </div>
            </div>

            {/* To Row */}
            <div className="w-full mt-10">
              <div className={clsx("grid grid-cols-1 gap-12", COUNTRIES_WITH_STATES.includes(toCountry) ? "md:grid-cols-5" : "md:grid-cols-4")}>
                <CountrySelect label="To" value={toCountry} onChange={setToCountry} />

                {COUNTRIES_WITH_STATES.includes(toCountry) && (
                  <div className="space-y-4">
                    <label className="text-sm font-semibold text-gray-500 tracking-wide uppercase">State</label>
                    <input 
                      type="text"
                      value={toState}
                      onChange={(e) => setToState(e.target.value)}
                      className="w-full px-0 py-3 border-b-2 border-gray-200 text-gray-900 text-lg font-bold focus:outline-none focus:border-[#081b4c] transition-colors bg-transparent uppercase"
                    />
                  </div>
                )}

                <div className="space-y-4">
                  <label className="text-sm font-semibold text-gray-500 tracking-wide uppercase">City</label>
                  <input 
                    type="text"
                    value={toCity}
                    onChange={(e) => setToCity(e.target.value)}
                    className="w-full px-0 py-3 border-b-2 border-gray-200 text-gray-900 text-lg font-bold focus:outline-none focus:border-[#081b4c] transition-colors bg-transparent uppercase"
                  />
                </div>

                <div className="space-y-4">
                  <label className="text-sm font-semibold text-gray-500 tracking-wide uppercase">Post Code</label>
                  <input 
                    type="text"
                    value={toPostCode}
                    onChange={(e) => setToPostCode(e.target.value)}
                    className="w-full px-0 py-3 border-b-2 border-gray-200 text-gray-900 text-lg font-bold focus:outline-none focus:border-[#081b4c] transition-colors bg-transparent uppercase"
                  />
                </div>

                <AddressBookInput
                  label="Address Book"
                  value={toAddressBook}
                  onChange={setToAddressBook}
                  onContactClick={() => setAddressBookTarget('to')}
                  residential={toResidential}
                  onResidentialChange={setToResidential}
                />
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Dynamic Parcels Section */}
      {activeType === 'parcels' && (
        <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm relative group transition-all duration-300">
          {/* Top Controls: Tabs and Number of Boxes */}
          <div className="mb-6 px-5">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
              <div className="md:col-span-10 flex">
                <div className="inline-flex bg-gray-100 p-1 rounded-full">
                  <button 
                    onClick={() => setSubTab('parcels')}
                    className={clsx(
                      "px-6 py-2.5 rounded-full text-sm font-bold transition-all",
                      subTab === 'parcels' ? "bg-[#081b4c] text-white shadow-md" : "text-gray-500 hover:text-gray-700"
                    )}
                  >
                    Parcels & Packages
                  </button>
                  <button 
                    onClick={() => setSubTab('envelopes')}
                    className={clsx(
                      "px-6 py-2.5 rounded-full text-sm font-bold transition-all",
                      subTab === 'envelopes' ? "bg-[#081b4c] text-white shadow-md" : "text-gray-500 hover:text-gray-700"
                    )}
                  >
                    Courier Envelopes
                  </button>
                </div>
              </div>

              <div className="md:col-span-2 w-full">
                <PremiumSelect 
                  label="No. of Boxes" 
                  value={String(units.length)}
                  options={['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']}
                  onChange={(val: string) => {
                    const count = parseInt(val) || 1;
                    if (units.length === count) return;
                    if (units.length < count) {
                      const additionalUnits = Array(count - units.length).fill(null).map((_, i) => ({
                        id: Date.now() + i,
                        packaging: 'My Packaging'
                      }));
                      setUnits([...units, ...additionalUnits]);
                    } else {
                      setUnits(units.slice(0, count));
                    }
                  }}
                />
              </div>
            </div>
          </div>

          {/* Tab Content (shows for both tabs) */}
          <div className="space-y-6">
              {units.map((unit, index) => {
                const isIntlEnv = fromCountry.toLowerCase() === 'gb' && toCountry.toLowerCase() !== 'gb' && subTab === 'envelopes';
                return (
                <div key={unit.id} className="grid grid-cols-1 md:grid-cols-12 items-end gap-4 p-5 rounded-2xl border border-gray-100 bg-gray-50 relative group/unit">
                  <div className="md:col-span-3 space-y-1">
                    <label className="text-xs font-semibold text-gray-500 uppercase pl-1">Weight</label>
                    <div className="flex items-center bg-white border border-gray-200 rounded-xl overflow-hidden focus-within:border-[#081b4c] focus-within:ring-1 focus-within:ring-[#081b4c] transition-all">
                      <input type="number" placeholder="0.0" value={unit.weight || ''} onChange={(e) => updateUnit(unit.id, 'weight', e.target.value)} className="w-full px-4 py-3 outline-none font-bold text-gray-900 bg-transparent" />
                      <select value={unit.weightUnit || 'kg'} onChange={(e) => updateUnit(unit.id, 'weightUnit', e.target.value)} className="px-3 py-3 bg-gray-50 text-gray-700 font-bold border-l border-gray-200 outline-none cursor-pointer">
                        <option value="kg">kg</option>
                        {!isIntlEnv && <option value="lbs">lbs</option>}
                      </select>
                    </div>
                  </div>

                  {!isIntlEnv && (
                    <>
                      <div className="md:col-span-3">
                        <PremiumSelect 
                          label="Packaging" 
                          value={unit.packaging} 
                          options={['My Packaging', 'Carrier Stationary', 'Default 10x10x10']}
                          onChange={(val: string) => updateUnit(unit.id, 'packaging', val)}
                        />
                      </div>

                      <div className="md:col-span-2 space-y-1">
                        <label className="text-xs font-semibold text-gray-500 uppercase pl-1">Length</label>
                        <input type="number" placeholder="L" value={unit.length || ''} onChange={(e) => updateUnit(unit.id, 'length', e.target.value)} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:border-[#081b4c] focus:ring-1 focus:ring-[#081b4c] font-bold text-gray-900 transition-all" />
                      </div>
                      
                      <div className="md:col-span-2 space-y-1">
                        <label className="text-xs font-semibold text-gray-500 uppercase pl-1">Width</label>
                        <input type="number" placeholder="W" value={unit.width || ''} onChange={(e) => updateUnit(unit.id, 'width', e.target.value)} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:border-[#081b4c] focus:ring-1 focus:ring-[#081b4c] font-bold text-gray-900 transition-all" />
                      </div>

                      <div className="md:col-span-2 space-y-1">
                        <label className="text-xs font-semibold text-gray-500 uppercase pl-1">Height</label>
                        <input type="number" placeholder="H" value={unit.height || ''} onChange={(e) => updateUnit(unit.id, 'height', e.target.value)} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:border-[#081b4c] focus:ring-1 focus:ring-[#081b4c] font-bold text-gray-900 transition-all" />
                      </div>
                    </>
                  )}

                  {/* Remove Button */}
                  {units.length > 1 && (
                    <button 
                      onClick={() => setUnits(units.filter(u => u.id !== unit.id))}
                      className="absolute -right-3 -top-3 w-7 h-7 flex items-center justify-center rounded-full bg-red-100 text-red-500 hover:bg-red-600 hover:text-white transition-colors shadow-sm border border-red-200 z-10"
                      title="Remove unit"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                  )}
                </div>
                );
              })}

              <button 
                onClick={() => setUnits([...units, { id: Date.now(), packaging: 'My Packaging' }])}
                className="flex items-center gap-2 text-green-600 font-bold hover:text-green-700 transition-colors px-2 py-2"
              >
                <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center">
                  <Plus className="w-5 h-5" />
                </div>
                Add Another Unit
              </button>
            </div>

            <div className="pt-6 mt-8">
              <button
                onClick={() => handleGetQuote(units, subTab)}
                className="w-full py-4 bg-emerald-100 text-emerald-700 border border-emerald-300 font-bold rounded-xl shadow-lg shadow-emerald-600/10 hover:bg-emerald-200 hover:shadow-emerald-600/20 hover:-translate-y-0.5 transition-all text-lg tracking-wide"
              >
                Get Quote
              </button>
            </div>
        </div>
      )}

      {/* Dynamic Pallets Section */}
      {activeType === 'pallets' && (
        <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm relative group transition-all duration-300">
          {/* Top Controls: Tabs and Mode side-by-side */}
          <div className="mb-8 flex flex-wrap items-center justify-between gap-6 bg-gray-50 p-2 rounded-2xl border border-gray-100">
            <div className="inline-flex bg-gray-100 p-1 rounded-xl">
              <button 
                onClick={() => setPalletTab('boxes')}
                className={clsx(
                  "px-8 py-2.5 rounded-lg text-sm font-bold transition-all",
                  palletTab === 'boxes' ? "bg-white text-[#081b4c] shadow-sm" : "text-gray-500 hover:text-gray-700 hover:bg-white/50"
                )}
              >
                Pallet Boxes
              </button>
              <button 
                onClick={() => setPalletTab('containers')}
                className={clsx(
                  "px-8 py-2.5 rounded-lg text-sm font-bold transition-all",
                  palletTab === 'containers' ? "bg-white text-[#081b4c] shadow-sm" : "text-gray-500 hover:text-gray-700 hover:bg-white/50"
                )}
              >
                Containers
              </button>
            </div>

            <div className="flex-1 min-w-[200px] max-w-[240px] flex items-center gap-3">
              <span className="text-sm font-bold text-gray-600 whitespace-nowrap">Mode:</span>
              <div className="flex-1">
                <PremiumSelect 
                  label="" 
                  value={palletMode} 
                  options={['Ocean', 'Air', 'All']}
                  onChange={setPalletMode}
                />
              </div>
            </div>
          </div>

          {/* Unit Fields */}
          <div className="space-y-6">
            {palletUnits.map((unit, index) => (
              <div key={unit.id} className="flex flex-wrap items-end gap-4 p-5 rounded-2xl border border-gray-100 bg-gray-50 relative group/unit">
                <div className="flex-1 min-w-[140px] space-y-2">
                  <label className="text-xs font-semibold text-gray-500 uppercase">Weight</label>
                  <div className="flex items-center bg-white border border-gray-200 rounded-xl overflow-hidden focus-within:border-[#081b4c] focus-within:ring-1 focus-within:ring-[#081b4c] transition-all">
                    <input type="number" placeholder="0.0" value={unit.weight || ''} onChange={(e) => updatePalletUnit(unit.id, 'weight', e.target.value)} className="w-full px-4 py-3 outline-none font-bold text-gray-900 bg-transparent" />
                    <select value={unit.weightUnit || 'kg'} onChange={(e) => updatePalletUnit(unit.id, 'weightUnit', e.target.value)} className="px-3 py-3 bg-gray-50 text-gray-700 font-bold border-l border-gray-200 outline-none cursor-pointer">
                      <option value="kg">kg</option>
                      <option value="lbs">lbs</option>
                    </select>
                  </div>
                </div>

                <div className="flex-[1.5] min-w-[200px]">
                  <PremiumSelect 
                    label="Packaging" 
                    value={unit.packaging} 
                    options={['My Packaging', 'Default 10x10x10']}
                    onChange={(val: string) => updatePalletUnit(unit.id, 'packaging', val)}
                  />
                </div>

                <div className="flex-1 min-w-[100px] space-y-2">
                  <label className="text-xs font-semibold text-gray-500 uppercase">Length</label>
                  <input type="number" placeholder="L" value={unit.length || ''} onChange={(e) => updatePalletUnit(unit.id, 'length', e.target.value)} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:border-[#081b4c] focus:ring-1 focus:ring-[#081b4c] font-bold text-gray-900 transition-all" />
                </div>
                
                <div className="flex-1 min-w-[100px] space-y-2">
                  <label className="text-xs font-semibold text-gray-500 uppercase">Width</label>
                  <input type="number" placeholder="W" value={unit.width || ''} onChange={(e) => updatePalletUnit(unit.id, 'width', e.target.value)} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:border-[#081b4c] focus:ring-1 focus:ring-[#081b4c] font-bold text-gray-900 transition-all" />
                </div>

                <div className="flex-1 min-w-[100px] space-y-2">
                  <label className="text-xs font-semibold text-gray-500 uppercase">Height</label>
                  <input type="number" placeholder="H" value={unit.height || ''} onChange={(e) => updatePalletUnit(unit.id, 'height', e.target.value)} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:border-[#081b4c] focus:ring-1 focus:ring-[#081b4c] font-bold text-gray-900 transition-all" />
                </div>

                {palletUnits.length > 1 && (
                  <button 
                    onClick={() => setPalletUnits(palletUnits.filter(u => u.id !== unit.id))}
                    className="w-12 h-[50px] flex items-center justify-center rounded-xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-colors"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))}

            <button 
              onClick={() => setPalletUnits([...palletUnits, { id: Date.now(), packaging: 'My Packaging' }])}
              className="flex items-center gap-2 text-green-600 font-bold hover:text-green-700 transition-colors px-2 py-2"
            >
              <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center">
                <Plus className="w-5 h-5" />
              </div>
              Add Another Unit
            </button>
          </div>

          <hr className="my-10 border-gray-100" />

          {/* Pickup & Delivery Services */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-[#081b4c] border-b border-gray-100 pb-3">Pickup Services</h3>
              <div className="space-y-5">
                <div className="space-y-2 relative">
                  <PremiumSelect 
                    label="Service Type"
                    value={pickupService}
                    options={[
                      'Select Service',
                      'Airline Pickup',
                      'Collection Notification',
                      'Construction Site',
                      'Hotel',
                      'Lift Gate',
                      'Ocean CFS Pickup',
                      'Residential',
                      'School',
                      'Appointment',
                      'Inside',
                      'Limited Access',
                      'Military Base'
                    ]}
                    onChange={setPickupService}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-500 uppercase">Date</label>
                  <input type="date" className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-[#081b4c] font-medium text-gray-800 text-sm transition-all" />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-bold text-[#081b4c] border-b border-gray-100 pb-3">Delivery Services</h3>
              <div className="space-y-5">
                <div className="space-y-2">
                  <PremiumSelect 
                    label="Service Type"
                    value={deliveryService}
                    options={[
                      'Select Service',
                      'Airline Pickup',
                      'Collection Notification',
                      'Construction Site',
                      'Hotel',
                      'Lift Gate',
                      'Ocean CFS Pickup',
                      'Residential',
                      'School',
                      'Appointment',
                      'Inside',
                      'Limited Access',
                      'Military Base'
                    ]}
                    onChange={setDeliveryService}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-500 uppercase">Date</label>
                  <input type="date" className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-[#081b4c] font-medium text-gray-800 text-sm transition-all" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2 relative">
                    <PremiumSelect 
                      label="Earliest Delivery Time"
                      value={earliestTime}
                      options={['Select Time', ...timeOptions]}
                      onChange={setEarliestTime}
                    />
                  </div>
                  <div className="space-y-2 relative">
                    <PremiumSelect 
                      label="Latest Delivery Time"
                      value={latestTime}
                      options={['Select Time', ...timeOptions]}
                      onChange={setLatestTime}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <hr className="my-10 border-gray-100" />

          {/* Additional Details */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-[#081b4c] border-b border-gray-100 pb-3">Additional Details</h3>
            
            <div className="flex flex-wrap items-center gap-8">
              <div className="flex items-center gap-2 group/tooltip w-max relative">
                <input type="checkbox" id="non-stackable" className="w-5 h-5 rounded border-gray-300 text-[#081b4c] focus:ring-[#081b4c] cursor-pointer" />
                <label htmlFor="non-stackable" className="font-semibold text-gray-700 cursor-pointer">Non-stackable</label>
                <HelpCircle className="w-4 h-4 text-gray-400 cursor-help" />
                
                {/* Tooltip */}
                <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 w-64 bg-gray-900 text-white text-xs p-3 rounded-lg opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all z-10 shadow-lg pointer-events-none">
                  A non-stackable shipment is one that cannot be stacked with other freight due to its nature, shape, or fragility.
                  {/* Arrow */}
                  <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input type="checkbox" id="hazardous" className="w-5 h-5 rounded border-gray-300 text-[#081b4c] focus:ring-[#081b4c] cursor-pointer" />
                <label htmlFor="hazardous" className="font-semibold text-gray-700 cursor-pointer">This is a hazardous shipment <span className="text-gray-400 font-normal">(i.e. batteries, liquids)</span></label>
              </div>
            </div>

            <div className="space-y-2 mt-4">
              <label className="text-xs font-semibold text-gray-500 uppercase">Description of Goods</label>
              <textarea 
                rows={3}
                className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-[#081b4c] font-medium text-gray-800 text-sm transition-all resize-none"
                placeholder="Provide a brief description of the items being shipped..."
              ></textarea>
            </div>
          </div>

          <div className="pt-6 mt-8">
            <button
              onClick={() => handleGetQuote(palletUnits, palletTab)}
              className="w-full py-4 bg-emerald-100 text-emerald-700 border border-emerald-300 font-bold rounded-xl shadow-lg shadow-emerald-600/10 hover:bg-emerald-200 hover:shadow-emerald-600/20 hover:-translate-y-0.5 transition-all text-lg tracking-wide"
            >
              Get Quote
            </button>
          </div>
        </div>
      )}

      {/* Dynamic Same Day Section */}
      {activeType === 'sameday' && (
        <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm relative group transition-all duration-300">
          {/* Sub tabs as segmented control */}
          <div className="mb-8 flex justify-center sm:justify-start">
            <div className="inline-flex bg-gray-100 p-1 rounded-full">
              <button 
                onClick={() => setSamedayTab('parcels')}
                className={clsx(
                  "px-6 py-2.5 rounded-full text-sm font-bold transition-all",
                  samedayTab === 'parcels' ? "bg-[#081b4c] text-white shadow-md" : "text-gray-500 hover:text-gray-700"
                )}
              >
                Parcel and Packages
              </button>
              <button 
                onClick={() => setSamedayTab('envelopes')}
                className={clsx(
                  "px-6 py-2.5 rounded-full text-sm font-bold transition-all",
                  samedayTab === 'envelopes' ? "bg-[#081b4c] text-white shadow-md" : "text-gray-500 hover:text-gray-700"
                )}
              >
                Carrier Envelopes
              </button>
            </div>
          </div>

          {/* Unit Fields */}
          <div className="space-y-6">
            {samedayUnits.map((unit, index) => {
              const isIntlEnv = fromCountry.toLowerCase() === 'gb' && toCountry.toLowerCase() !== 'gb' && samedayTab === 'envelopes';
              return (
              <div key={unit.id} className="flex flex-wrap items-end gap-4 p-5 rounded-2xl border border-gray-100 bg-gray-50 relative group/unit">
                <div className="flex-1 min-w-[140px] space-y-2">
                  <label className="text-xs font-semibold text-gray-500 uppercase">Weight</label>
                  <div className="flex items-center bg-white border border-gray-200 rounded-xl overflow-hidden focus-within:border-[#081b4c] focus-within:ring-1 focus-within:ring-[#081b4c] transition-all">
                    <input type="number" placeholder="0.0" value={unit.weight || ''} onChange={(e) => updateSamedayUnit(unit.id, 'weight', e.target.value)} className="w-full px-4 py-3 outline-none font-bold text-gray-900 bg-transparent" />
                    <select value={unit.weightUnit || 'kg'} onChange={(e) => updateSamedayUnit(unit.id, 'weightUnit', e.target.value)} className="px-3 py-3 bg-gray-50 text-gray-700 font-bold border-l border-gray-200 outline-none cursor-pointer">
                      <option value="kg">kg</option>
                      {!isIntlEnv && <option value="lbs">lbs</option>}
                    </select>
                  </div>
                </div>

                {!isIntlEnv && (
                  <>
                    <div className="flex-[1.5] min-w-[200px]">
                      <PremiumSelect 
                        label="Packaging" 
                        value={unit.packaging} 
                        options={['My Packaging', 'Carrier Stationary', 'Default 10x10x10']}
                        onChange={(val: string) => updateSamedayUnit(unit.id, 'packaging', val)}
                      />
                    </div>

                    <div className="flex-1 min-w-[100px] space-y-2">
                      <label className="text-xs font-semibold text-gray-500 uppercase">Length</label>
                      <input type="number" placeholder="L" value={unit.length || ''} onChange={(e) => updateSamedayUnit(unit.id, 'length', e.target.value)} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:border-[#081b4c] focus:ring-1 focus:ring-[#081b4c] font-bold text-gray-900 transition-all" />
                    </div>
                    
                    <div className="flex-1 min-w-[100px] space-y-2">
                      <label className="text-xs font-semibold text-gray-500 uppercase">Width</label>
                      <input type="number" placeholder="W" value={unit.width || ''} onChange={(e) => updateSamedayUnit(unit.id, 'width', e.target.value)} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:border-[#081b4c] focus:ring-1 focus:ring-[#081b4c] font-bold text-gray-900 transition-all" />
                    </div>

                    <div className="flex-1 min-w-[100px] space-y-2">
                      <label className="text-xs font-semibold text-gray-500 uppercase">Height</label>
                      <input type="number" placeholder="H" value={unit.height || ''} onChange={(e) => updateSamedayUnit(unit.id, 'height', e.target.value)} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:border-[#081b4c] focus:ring-1 focus:ring-[#081b4c] font-bold text-gray-900 transition-all" />
                    </div>
                  </>
                )}

                {/* Remove Button */}
                {samedayUnits.length > 1 && (
                  <button 
                    onClick={() => setSamedayUnits(samedayUnits.filter(u => u.id !== unit.id))}
                    className="w-12 h-[50px] flex items-center justify-center rounded-xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-colors"
                    title="Remove unit"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                )}
              </div>
              );
            })}

            <button 
              onClick={() => setSamedayUnits([...samedayUnits, { id: Date.now(), packaging: 'My Packaging' }])}
              className="flex items-center gap-2 text-green-600 font-bold hover:text-green-700 transition-colors px-2 py-2"
            >
              <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center">
                <Plus className="w-5 h-5" />
              </div>
              Add Another Unit
            </button>
          </div>

          <div className="pt-6 mt-8">
            <button
              onClick={() => handleGetQuote(samedayUnits, samedayTab)}
              className="w-full py-4 bg-emerald-100 text-emerald-700 border border-emerald-300 font-bold rounded-xl shadow-lg shadow-emerald-600/10 hover:bg-emerald-200 hover:shadow-emerald-600/20 hover:-translate-y-0.5 transition-all text-lg tracking-wide"
            >
              Get Quote
            </button>
          </div>
        </div>
      )}

      {/* Dynamic Spot Rate Section */}
      {activeType === 'spotrate' && (
        <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm relative group transition-all duration-300">
          {/* Sub tabs as segmented control */}
          <div className="mb-8 flex justify-center sm:justify-start">
            <div className="inline-flex bg-gray-100 p-1 rounded-full">
              <button 
                onClick={() => setSpotrateTab('boxes')}
                className={clsx(
                  "px-6 py-2.5 rounded-full text-sm font-bold transition-all",
                  spotrateTab === 'boxes' ? "bg-[#081b4c] text-white shadow-md" : "text-gray-500 hover:text-gray-700"
                )}
              >
                Pallet or Boxes
              </button>
              <button 
                onClick={() => setSpotrateTab('containers')}
                className={clsx(
                  "px-6 py-2.5 rounded-full text-sm font-bold transition-all",
                  spotrateTab === 'containers' ? "bg-[#081b4c] text-white shadow-md" : "text-gray-500 hover:text-gray-700"
                )}
              >
                Containers
              </button>
            </div>
          </div>

          {/* Unit Fields */}
          <div className="space-y-6">
            {spotrateUnits.map((unit, index) => (
              <div key={unit.id} className="flex flex-col gap-4 p-5 rounded-2xl border border-gray-100 bg-gray-50 relative group/unit">
                <div className="flex flex-wrap items-end gap-4">
                  <div className="flex-1 min-w-[130px] space-y-2">
                    <label className="text-xs font-semibold text-gray-500 uppercase">Weight</label>
                    <div className="flex items-center bg-white border border-gray-200 rounded-xl overflow-hidden focus-within:border-[#081b4c] focus-within:ring-1 focus-within:ring-[#081b4c] transition-all">
                      <input type="number" placeholder="0.0" value={unit.weight || ''} onChange={(e) => updateSpotrateUnit(unit.id, 'weight', e.target.value)} className="w-full px-4 py-3 outline-none font-bold text-gray-900 bg-transparent" />
                      <select value={unit.weightUnit || 'kg'} onChange={(e) => updateSpotrateUnit(unit.id, 'weightUnit', e.target.value)} className="px-3 py-3 bg-gray-50 text-gray-700 font-bold border-l border-gray-200 outline-none cursor-pointer">
                        <option value="kg">kg</option>
                        <option value="lbs">lbs</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex-1 min-w-[150px]">
                    <PremiumSelect 
                      label="Packaging" 
                      value={unit.packaging} 
                      options={['My Packaging', 'Carrier Stationary', 'Default 10x10x10']}
                      onChange={(val: string) => updateSpotrateUnit(unit.id, 'packaging', val)}
                    />
                  </div>

                  <div className="flex-1 min-w-[150px] relative">
                    <PremiumSelect 
                      label="Unit Type" 
                      value={unit.unitType} 
                      options={[
                        'Pallets',
                        'Pallets non standard',
                        'Bags',
                        'Bales',
                        'Boxes',
                        'Bunches',
                        'Carpets',
                        'Coils',
                        'Crates',
                        'Cylinders',
                        'Drums',
                        'Pails',
                        'Reels',
                        'Rolls',
                        'Tubes',
                        'Pipes',
                        'Loose',
                        'Bundles'
                      ]}
                      onChange={(val: string) => updateSpotrateUnit(unit.id, 'unitType', val)}
                    />
                  </div>

                  <div className="flex-[0.6] min-w-[70px] space-y-2">
                    <label className="text-xs font-semibold text-gray-500 uppercase">L</label>
                    <input type="number" placeholder="L" value={unit.length || ''} onChange={(e) => updateSpotrateUnit(unit.id, 'length', e.target.value)} className="w-full px-3 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:border-[#081b4c] focus:ring-1 focus:ring-[#081b4c] font-bold text-gray-900 transition-all" />
                  </div>
                  
                  <div className="flex-[0.6] min-w-[70px] space-y-2">
                    <label className="text-xs font-semibold text-gray-500 uppercase">W</label>
                    <input type="number" placeholder="W" value={unit.width || ''} onChange={(e) => updateSpotrateUnit(unit.id, 'width', e.target.value)} className="w-full px-3 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:border-[#081b4c] focus:ring-1 focus:ring-[#081b4c] font-bold text-gray-900 transition-all" />
                  </div>

                  <div className="flex-[0.6] min-w-[70px] space-y-2">
                    <label className="text-xs font-semibold text-gray-500 uppercase">H</label>
                    <input type="number" placeholder="H" value={unit.height || ''} onChange={(e) => updateSpotrateUnit(unit.id, 'height', e.target.value)} className="w-full px-3 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:border-[#081b4c] focus:ring-1 focus:ring-[#081b4c] font-bold text-gray-900 transition-all" />
                  </div>
                  
                  {spotrateUnits.length > 1 && (
                    <button 
                      onClick={() => setSpotrateUnits(spotrateUnits.filter(u => u.id !== unit.id))}
                      className="w-10 h-[50px] flex items-center justify-center rounded-xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-colors"
                      title="Remove unit"
                    >
                      <Minus className="w-5 h-5" />
                    </button>
                  )}
                </div>

                <div className="w-full space-y-2">
                  <label className="text-xs font-semibold text-gray-500 uppercase">Description / Commodity</label>
                  <input 
                    type="text" 
                    placeholder="Enter description of goods..." 
                    value={unit.commodity}
                    onChange={(e) => updateSpotrateUnit(unit.id, 'commodity', e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:border-[#081b4c] focus:ring-1 focus:ring-[#081b4c] font-medium text-gray-900 transition-all" 
                  />
                </div>
              </div>
            ))}

            <button 
              onClick={() => setSpotrateUnits([...spotrateUnits, { id: Date.now(), packaging: 'My Packaging', unitType: '', commodity: '' }])}
              className="flex items-center gap-2 text-green-600 font-bold hover:text-green-700 transition-colors px-2 py-2"
            >
              <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center">
                <Plus className="w-5 h-5" />
              </div>
              Add Another Unit
            </button>
          </div>

          <hr className="my-10 border-gray-100" />

          {/* Pickup & Delivery Services */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-[#081b4c] border-b border-gray-100 pb-3">Pickup Services</h3>
              <div className="space-y-5">
                <div className="space-y-2 relative">
                  <PremiumSelect 
                    label="Service Type"
                    value={spotratePickupService}
                    options={[
                      'Select Service',
                      'Airline Pickup',
                      'Collection Notification',
                      'Construction Site',
                      'Hotel',
                      'Lift Gate',
                      'Ocean CFS Pickup',
                      'Residential',
                      'School',
                      'Appointment',
                      'Inside',
                      'Limited Access',
                      'Military Base'
                    ]}
                    onChange={setSpotratePickupService}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-500 uppercase">Date</label>
                  <input type="date" className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-[#081b4c] font-medium text-gray-800 text-sm transition-all" />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-bold text-[#081b4c] border-b border-gray-100 pb-3">Delivery Services</h3>
              <div className="space-y-5">
                <div className="space-y-2 relative">
                  <PremiumSelect 
                    label="Service Type"
                    value={spotrateDeliveryService}
                    options={[
                      'Select Service',
                      'Airline Pickup',
                      'Collection Notification',
                      'Construction Site',
                      'Hotel',
                      'Lift Gate',
                      'Ocean CFS Pickup',
                      'Residential',
                      'School',
                      'Appointment',
                      'Inside',
                      'Limited Access',
                      'Military Base'
                    ]}
                    onChange={setSpotrateDeliveryService}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-500 uppercase">Date</label>
                  <input type="date" className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-[#081b4c] font-medium text-gray-800 text-sm transition-all" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2 relative">
                    <PremiumSelect 
                      label="Earliest Delivery Time"
                      value={spotrateEarliestTime}
                      options={['Select Time', ...timeOptions]}
                      onChange={setSpotrateEarliestTime}
                    />
                  </div>
                  <div className="space-y-2 relative">
                    <PremiumSelect 
                      label="Latest Delivery Time"
                      value={spotrateLatestTime}
                      options={['Select Time', ...timeOptions]}
                      onChange={setSpotrateLatestTime}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <hr className="my-10 border-gray-100" />

          {/* Additional Details */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-[#081b4c] border-b border-gray-100 pb-3">Additional Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="space-y-2 relative">
                <PremiumSelect 
                  label="Mode of Transport"
                  value={spotrateTransportMode}
                  options={['Select Mode', 'Sea', 'Air', 'Road']}
                  onChange={setSpotrateTransportMode}
                />
              </div>
              <div className="space-y-2 relative">
                <PremiumSelect 
                  label="Business Type"
                  value={spotrateBusinessType}
                  options={['Select Type', 'Business to Business', 'Business to Consumer']}
                  onChange={setSpotrateBusinessType}
                />
              </div>
              <div className="space-y-2 relative">
                <PremiumSelect 
                  label="Incoterms"
                  value={spotrateIncoterms}
                  options={[
                    'Select Type', 
                    'Free Carrier', 
                    'Delivered at Place', 
                    'Delivered Duty Paid', 
                    'Ex Works', 
                    'Carriage Paid To', 
                    'Carriage and Insurance Paid To', 
                    'Delivered at Place Unloaded'
                  ]}
                  onChange={setSpotrateIncoterms}
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-8">
              <div className="flex items-center gap-2 group/tooltip w-max relative">
                <input type="checkbox" id="sr-non-stackable" className="w-5 h-5 rounded border-gray-300 text-[#081b4c] focus:ring-[#081b4c] cursor-pointer" />
                <label htmlFor="sr-non-stackable" className="font-semibold text-gray-700 cursor-pointer">Non-stackable</label>
                <HelpCircle className="w-4 h-4 text-gray-400 cursor-help" />
                
                <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 w-64 bg-gray-900 text-white text-xs p-3 rounded-lg opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all z-10 shadow-lg pointer-events-none">
                  A non-stackable shipment is one that cannot be stacked with other freight due to its nature, shape, or fragility.
                  <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input type="checkbox" id="sr-hazardous" className="w-5 h-5 rounded border-gray-300 text-[#081b4c] focus:ring-[#081b4c] cursor-pointer" />
                <label htmlFor="sr-hazardous" className="font-semibold text-gray-700 cursor-pointer">This is a hazardous shipment <span className="text-gray-400 font-normal">(i.e. batteries, liquids)</span></label>
              </div>
            </div>

            <div className="space-y-2 mt-4">
              <label className="text-xs font-semibold text-gray-500 uppercase">Note</label>
              <textarea 
                rows={3}
                className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-[#081b4c] font-medium text-gray-800 text-sm transition-all resize-none"
                placeholder="Add any additional notes here..."
              ></textarea>
            </div>
          </div>

          <div className="pt-6 mt-8">
            <button
              onClick={() => handleGetQuote(spotrateUnits, spotrateTab)}
              className="w-full py-4 bg-emerald-100 text-emerald-700 border border-emerald-300 font-bold rounded-xl shadow-lg shadow-emerald-600/10 hover:bg-emerald-200 hover:shadow-emerald-600/20 hover:-translate-y-0.5 transition-all text-lg tracking-wide"
            >
              Get Quote
            </button>
          </div>
        </div>
      )}

      {/* Address Book Modal */}
      {addressBookTarget && (
        <AddressBookModal
          isOpen={true}
          onClose={() => setAddressBookTarget(null)}
          onSelect={(entry) => {
            if (addressBookTarget === 'from') {
              setFromCountry(entry.country);
              setFromCity(entry.city);
              setFromPostCode(entry.postcode);
            } else {
              setToCountry(entry.country);
              setToCity(entry.city);
              setToPostCode(entry.postcode);
            }
            setAddressBookTarget(null);
          }}
        />
      )}
    </div>
  );
}
