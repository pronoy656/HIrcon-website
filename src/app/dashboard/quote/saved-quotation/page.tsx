"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import {
  FileText,
  
  MapPin,
  Package,
  Clock,
  ArrowRight,
  ChevronDown,
  BookOpen,

  Zap,
  ShoppingBag,
  CheckCircle,
} from "lucide-react";
import { getSavedQuotes, deleteSavedQuote, type SavedQuote } from "@/lib/savedQuotes";

import { countries } from "@/lib/countries";
import clsx from "clsx";

/* ─── helpers ─── */
function getCountryName(code: string): string {
  if (!code) return "—";
  const c = countries.find((c) => c.code === code);
  return c ? c.name : code;
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function timeAgo(iso: string): string {
  const diff = (Date.now() - new Date(iso).getTime()) / 1000;
  if (diff < 60) return "Just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

function quoteLabel(q: SavedQuote): string {
  const from = getCountryName(q.formData.fromCountry);
  const to = getCountryName(q.formData.toCountry);
  return `${from} → ${to} (${timeAgo(q.savedAt)})`;
}

/* ─── Mock services (same data as QuoteResults) ─── */
interface MockService {
  id: string;
  carrier: string;
  carrierLogo: string;
  serviceName: string;
  serviceCode: string;
  category: "economy-standard" | "express" | "dropoff";
  deliveryDays: string;
  price: number;
  currency: string;
  features: string[];
  rating: number;
  isPopular?: boolean;
  isBestValue?: boolean;
  isFastest?: boolean;
  color: string;
  collectionType: "Drop-off" | "Collection";
  transitType: "By Air" | "By Ship";
}

const MOCK_SERVICES: MockService[] = [
  { id:"1", carrier:"Royal Mail", carrierLogo:"https://logo.clearbit.com/royalmail.com", serviceName:"Tracked 48", serviceCode:"RM-T48", category:"economy-standard", deliveryDays:"2-3 days", price:4.99, currency:"GBP", features:["Tracked","Signature on delivery","Up to 20kg"], rating:4.1, isBestValue:true, color:"#C8102E", collectionType:"Drop-off", transitType:"By Ship" },
  { id:"2", carrier:"Hermes", carrierLogo:"https://logo.clearbit.com/evri.com", serviceName:"Standard Parcel", serviceCode:"HE-STD", category:"economy-standard", deliveryDays:"3-5 days", price:3.49, currency:"GBP", features:["Tracked","Safe place options","Up to 15kg"], rating:3.8, color:"#8B0000", collectionType:"Collection", transitType:"By Ship" },
  { id:"3", carrier:"Yodel", carrierLogo:"https://logo.clearbit.com/yodel.co.uk", serviceName:"Economy Collect", serviceCode:"YO-EC", category:"economy-standard", deliveryDays:"3-4 days", price:3.99, currency:"GBP", features:["Tracked","Collect from local store","Up to 10kg"], rating:3.5, color:"#FF6B00", collectionType:"Drop-off", transitType:"By Ship" },
  { id:"4", carrier:"DHL", carrierLogo:"https://logo.clearbit.com/dhl.com", serviceName:"Parcel Connect", serviceCode:"DHL-PC", category:"economy-standard", deliveryDays:"1-2 days", price:8.99, currency:"GBP", features:["Full tracking","Real-time updates","Proof of delivery","Up to 30kg"], rating:4.5, isPopular:true, color:"#D40511", collectionType:"Collection", transitType:"By Air" },
  { id:"5", carrier:"UPS", carrierLogo:"https://logo.clearbit.com/ups.com", serviceName:"Standard", serviceCode:"UPS-STD", category:"economy-standard", deliveryDays:"2-3 days", price:9.49, currency:"GBP", features:["End-to-end tracking","Delivery notifications","Up to 70kg","Insurance included"], rating:4.3, color:"#351C15", collectionType:"Collection", transitType:"By Ship" },
  { id:"6", carrier:"FedEx", carrierLogo:"https://logo.clearbit.com/fedex.com", serviceName:"Ground", serviceCode:"FX-GRD", category:"economy-standard", deliveryDays:"2-4 days", price:10.99, currency:"GBP", features:["Door-to-door","Signature required","Up to 68kg","Money-back guarantee"], rating:4.4, color:"#4D148C", collectionType:"Collection", transitType:"By Ship" },
  { id:"7", carrier:"DHL", carrierLogo:"https://logo.clearbit.com/dhl.com", serviceName:"Express Worldwide", serviceCode:"DHL-EW", category:"express", deliveryDays:"Next day by 9am", price:24.99, currency:"GBP", features:["Next day delivery","Before 9am option","Full insurance","Priority handling"], rating:4.8, isFastest:true, color:"#D40511", collectionType:"Collection", transitType:"By Air" },
  { id:"8", carrier:"TNT", carrierLogo:"https://logo.clearbit.com/tnt.com", serviceName:"Express", serviceCode:"TNT-EXP", category:"express", deliveryDays:"Next day by 12pm", price:19.99, currency:"GBP", features:["Time-definite","Before noon delivery","Real-time tracking","Dedicated courier"], rating:4.6, isPopular:true, color:"#FF6600", collectionType:"Collection", transitType:"By Air" },
  { id:"9", carrier:"City Sprint", carrierLogo:"CS", serviceName:"Same Day Express", serviceCode:"CS-SD", category:"express", deliveryDays:"Same day", price:39.99, currency:"GBP", features:["Same day delivery","Dedicated courier","Real-time GPS","2-hour slots"], rating:4.7, color:"#00A651", collectionType:"Collection", transitType:"By Ship" },
  { id:"10", carrier:"FedEx", carrierLogo:"https://logo.clearbit.com/fedex.com", serviceName:"Priority Overnight", serviceCode:"FX-PO", category:"express", deliveryDays:"Next day by 10:30am", price:29.99, currency:"GBP", features:["Before 10:30am","Money back guarantee","Full tracking","Fragile handling"], rating:4.7, color:"#4D148C", collectionType:"Drop-off", transitType:"By Air" },
  { id:"11", carrier:"UPS", carrierLogo:"https://logo.clearbit.com/ups.com", serviceName:"Access Point", serviceCode:"UPS-AP", category:"dropoff", deliveryDays:"2-3 days", price:5.99, currency:"GBP", features:["Drop off at store","7-day collection","Tracking included","Up to 20kg"], rating:4.2, isBestValue:true, color:"#351C15", collectionType:"Drop-off", transitType:"By Ship" },
  { id:"12", carrier:"Parcelforce", carrierLogo:"https://logo.clearbit.com/parcelforce.com", serviceName:"Drop & Go", serviceCode:"PF-DG", category:"dropoff", deliveryDays:"3-5 days", price:6.49, currency:"GBP", features:["Post Office drop off","Tracked service","Email notifications"], rating:4.0, color:"#003399", collectionType:"Drop-off", transitType:"By Ship" },
  { id:"13", carrier:"Hermes", carrierLogo:"https://logo.clearbit.com/evri.com", serviceName:"Parcelshop Drop Off", serviceCode:"HE-DO", category:"dropoff", deliveryDays:"2-4 days", price:4.49, currency:"GBP", features:["1000+ locations","Tracked delivery","Up to 15kg"], rating:3.9, color:"#8B0000", collectionType:"Drop-off", transitType:"By Ship" },
];

const CATEGORY_CONFIG = {
  "economy-standard": { label: "Economy & Standard", icon: Package, accent: "text-emerald-600", countBg: "bg-emerald-100 text-emerald-700" },
  express:            { label: "Express & Timed",    icon: Zap,     accent: "text-orange-600",  countBg: "bg-orange-100 text-orange-700" },
  dropoff:            { label: "Drop Off",           icon: ShoppingBag, accent: "text-purple-600", countBg: "bg-purple-100 text-purple-700" },
} as const;



/* ─── Service Card (same design as QuoteResults) ─── */
function ServiceCard({ service }: { service: MockService }) {
  const basePrice = service.price * 0.72;
  const fuel = service.price * 0.10;
  const vat = service.price * 0.18;

  return (
    <div className="bg-white border border-gray-200 rounded-xl flex flex-col overflow-hidden">
      {/* Dark top */}
      <div className="bg-[#202738] text-white p-5 flex justify-between items-start">
        <div 
          className="w-20 h-20 rounded-full flex items-center justify-center flex-shrink-0 shadow-md overflow-hidden bg-white" 
          style={{ borderColor: service.color, borderWidth: 3 }}
        >
          {service.carrierLogo.startsWith("http") ? (
            <img src={service.carrierLogo} alt={service.carrier} className="w-14 h-14 object-contain" />
          ) : (
            <span className="font-bold text-2xl tracking-tighter" style={{ color: service.color }}>{service.carrierLogo}</span>
          )}
        </div>
        <div className="text-right flex-1 ml-4">
          {/* Badges */}
          <div className="flex justify-end gap-1 mb-1.5 flex-wrap">
            {service.isBestValue && <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 text-[9px] font-black rounded-full uppercase tracking-wide">Best Value</span>}
            {service.isPopular && <span className="px-2 py-0.5 bg-amber-500/20 text-amber-300 text-[9px] font-black rounded-full uppercase tracking-wide">Popular</span>}
            {service.isFastest && <span className="px-2 py-0.5 bg-red-500/20 text-red-300 text-[9px] font-black rounded-full uppercase tracking-wide">Fastest</span>}
          </div>
          <h4 className="font-black text-sm uppercase tracking-wide text-gray-100">{service.serviceName}</h4>
          <p className="text-[11px] text-gray-400 mt-0.5 uppercase tracking-wide">{service.deliveryDays}</p>
          <div className="mt-2.5">
            <span className="text-2xl font-bold tracking-tight">£{service.price.toFixed(2)}</span>
            <span className="text-xs text-gray-400 ml-1.5 font-medium">exc VAT</span>
          </div>
   
        </div>
      </div>

      {/* Light bottom */}
      <div className="p-5 flex flex-col">
        {/* Features */}
        <div className="flex flex-col gap-1.5 mb-4">
          {service.features.map((f) => (
            <div key={f} className="flex items-center gap-2">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
              <span className="text-xs text-gray-600 font-medium">{f}</span>
            </div>
          ))}
        </div>

        {/* Price breakdown */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm mb-4 border-t border-gray-100 pt-4">
          <div className="flex justify-between items-center"><span className="text-gray-500 font-medium text-xs">Base:</span><span className="font-bold text-gray-800 text-xs">£{basePrice.toFixed(2)}</span></div>
          <div className="flex justify-between items-center"><span className="text-gray-500 font-medium text-xs">Fuel:</span><span className="font-bold text-gray-800 text-xs">£{fuel.toFixed(2)}</span></div>
          <div className="flex justify-between items-center"><span className="text-gray-500 font-medium text-xs">VAT:</span><span className="font-bold text-gray-800 text-xs">£{vat.toFixed(2)}</span></div>
          <div className="flex justify-between items-center"><span className="text-gray-500 font-medium text-xs">Total:</span><span className="font-bold text-gray-800 text-xs">£{service.price.toFixed(2)}</span></div>
        </div>

        {/* Tags */}
        <div className="flex gap-1.5 flex-wrap mb-4">
          <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-[10px] font-bold rounded-full">{service.collectionType}</span>
          <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-[10px] font-bold rounded-full">{service.transitType}</span>
        </div>

        {/* Book button */}
        <button className="w-full py-3 rounded-[100px] font-black text-sm tracking-wide bg-[#0b215f] text-white hover:bg-[#081844] hover:shadow-md hover:shadow-[#0b215f]/30 hover:-translate-y-0.5 transition-all duration-200">
          BOOK NOW
        </button>
      </div>
    </div>
  );
}

/* ─── Quote Dropdown ─── */
function QuoteDropdown({ quotes, selected, onSelect }: {
  quotes: SavedQuote[];
  selected: SavedQuote | null;
  onSelect: (q: SavedQuote) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative w-full max-w-xl" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-3 px-4 py-3.5 bg-white border-2 border-gray-200 rounded-2xl text-left hover:border-[#0b215f]/40 focus:outline-none focus:border-[#0b215f] transition-all shadow-sm"
      >
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-[#0b215f]/10 flex items-center justify-center flex-shrink-0">
            <MapPin className="w-4 h-4 text-[#0b215f]" />
          </div>
          {selected ? (
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-black text-gray-900 text-sm truncate">{getCountryName(selected.formData.fromCountry)}</span>
                <ArrowRight className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                <span className="font-black text-gray-900 text-sm truncate">{getCountryName(selected.formData.toCountry)}</span>
              </div>
              <p className="text-xs text-gray-400 font-medium mt-0.5">{formatDate(selected.savedAt)}</p>
            </div>
          ) : (
            <span className="text-gray-400 font-medium text-sm">Select a saved quote to view services...</span>
          )}
        </div>
        <ChevronDown className={clsx("w-5 h-5 text-gray-400 transition-transform duration-200 flex-shrink-0", open && "rotate-180")} />
      </button>

      {open && quotes.length > 0 && (
        <div className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-200 rounded-2xl shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="p-2 max-h-72 overflow-y-auto">
            {quotes.map((q) => {
              const isSelected = selected?.id === q.id;
              return (
                <button
                  key={q.id}
                  onClick={() => { onSelect(q); setOpen(false); }}
                  className={clsx(
                    "w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all text-left",
                    isSelected ? "bg-[#0b215f]/5 border border-[#0b215f]/20" : "hover:bg-gray-50"
                  )}
                >
                  <div className={clsx("w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0", isSelected ? "bg-[#0b215f]" : "bg-gray-100")}>
                    <MapPin className={clsx("w-4 h-4", isSelected ? "text-white" : "text-gray-500")} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-black text-gray-900 text-sm truncate">{getCountryName(q.formData.fromCountry)}</span>
                      <ArrowRight className="w-3 h-3 text-gray-400 flex-shrink-0" />
                      <span className="font-black text-gray-900 text-sm truncate">{getCountryName(q.formData.toCountry)}</span>
                    </div>
                    <div className="flex items-center gap-3 mt-0.5">
                      <span className="text-xs text-gray-400 font-medium">{timeAgo(q.savedAt)}</span>
                      <span className="text-xs text-[#0b215f] font-bold">{q.totalServices} services</span>
                      {q.lowestPrice > 0 && <span className="text-xs text-green-600 font-bold">from £{q.lowestPrice.toFixed(2)}</span>}
                    </div>
                  </div>
                  {isSelected && <CheckCircle className="w-4 h-4 text-[#0b215f] flex-shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Main Page ─── */
export default function SavedQuotationPage() {
  const [quotes, setQuotes] = useState<SavedQuote[]>([]);
  const [selectedQuote, setSelectedQuote] = useState<SavedQuote | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    const saved = getSavedQuotes();
    setQuotes(saved);
    if (saved.length > 0) setSelectedQuote(saved[0]);
  }, []);

  const handleDelete = () => {
    if (!deleteId) return;
    deleteSavedQuote(deleteId);
    const updated = getSavedQuotes();
    setQuotes(updated);
    if (selectedQuote?.id === deleteId) {
      setSelectedQuote(updated.length > 0 ? updated[0] : null);
    }
    setDeleteId(null);
  };

  // Filter mock services by the carriers available in the selected quote
  const availableServices = selectedQuote
    ? MOCK_SERVICES.filter((s) =>
        selectedQuote.carriers?.some((c) => c.name === s.carrier)
      )
    : [];

  const servicesByCategory = {
    "economy-standard": availableServices.filter((s) => s.category === "economy-standard"),
    express: availableServices.filter((s) => s.category === "express"),
    dropoff: availableServices.filter((s) => s.category === "dropoff"),
  };

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500 max-w-6xl mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Saved Quotations</h1>
          <p className="text-gray-500 font-medium mt-1">
            {quotes.length} saved quote{quotes.length !== 1 ? "s" : ""}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/quote/quick-quote"
            className="flex items-center gap-2 px-5 py-2.5 bg-[#0b215f] text-white rounded-xl font-bold text-sm hover:bg-[#081844] transition-colors shadow-sm self-start sm:self-auto"
          >
            <FileText className="w-4 h-4" />
            New Quote
          </Link>
        </div>
      </div>

      {/* Empty state */}
      {quotes.length === 0 && (
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-16 text-center">
          <div className="mx-auto w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center mb-5">
            <BookOpen className="w-10 h-10 text-[#0b215f]" />
          </div>
          <h2 className="text-xl font-black text-gray-800 mb-2">No saved quotes yet</h2>
          <p className="text-gray-500 text-sm mb-6 max-w-xs mx-auto">
            Run a Quick Quote and hit the <strong>Save</strong> button — it will appear here.
          </p>
          <Link
            href="/dashboard/quote/quick-quote"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#0b215f] text-white rounded-xl font-bold text-sm hover:bg-[#081844] transition-colors"
          >
            <FileText className="w-4 h-4" />
            Go to Quick Quote
          </Link>
        </div>
      )}

      {/* Dropdown + services */}
      {quotes.length > 0 && (
        <>
          {/* Quote selector */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Select Saved Quote</p>
            <QuoteDropdown quotes={quotes} selected={selectedQuote} onSelect={setSelectedQuote} />

            {/* Selected quote summary (Detailed) */}
            {selectedQuote && (
              <div className="mt-6 p-6 bg-gray-50 border border-gray-100 rounded-2xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12">
                  {/* Left Column */}
                  <div className="flex flex-col gap-3">
                    <div className="flex gap-2">
                      <span className="text-sm font-bold text-gray-800 min-w-[140px]">Quotation Date :</span>
                      <span className="text-sm text-gray-600">{formatDate(selectedQuote.savedAt)}</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-sm font-bold text-gray-800 min-w-[140px]">Collection Country :</span>
                      <span className="text-sm text-gray-600">{getCountryName(selectedQuote.formData.fromCountry)}</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-sm font-bold text-gray-800 min-w-[140px]">Collection PostCode :</span>
                      <span className="text-sm text-gray-600">{selectedQuote.formData.fromPostCode || '—'}</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-sm font-bold text-gray-800 min-w-[140px]">Package Type :</span>
                      <span className="text-sm text-gray-600 capitalize">{selectedQuote.formData.parcelType || '—'}</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-sm font-bold text-gray-800 min-w-[140px]">Delivery City :</span>
                      <span className="text-sm text-gray-600">{selectedQuote.formData.toCity || '—'}</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-sm font-bold text-gray-800 min-w-[140px]">Weight :</span>
                      <span className="text-sm text-gray-600">
                        {selectedQuote.formData.units.reduce((acc, u) => acc + Number(u.weight || 0), 0)} KG
                      </span>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="flex flex-col gap-3">
                    <div className="flex gap-2">
                      <span className="text-sm font-bold text-gray-800 min-w-[150px]">Shipment Type :</span>
                      <span className="text-sm text-gray-600">Export</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-sm font-bold text-gray-800 min-w-[150px]">Collection City :</span>
                      <span className="text-sm text-gray-600">{selectedQuote.formData.fromCity || '—'}</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-sm font-bold text-gray-800 min-w-[150px]">No Of Packages :</span>
                      <span className="text-sm text-gray-600">{selectedQuote.formData.units.length}</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-sm font-bold text-gray-800 min-w-[150px]">Delivery Country :</span>
                      <span className="text-sm text-gray-600">{getCountryName(selectedQuote.formData.toCountry)}</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-sm font-bold text-gray-800 min-w-[150px]">Delivery PostCode :</span>
                      <span className="text-sm text-gray-600">{selectedQuote.formData.toPostCode || '—'}</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-sm font-bold text-gray-800 min-w-[150px]">Dimensions( LXBXH ) :</span>
                      <span className="text-sm text-gray-600">
                        {selectedQuote.formData.units.map(u => `${u.length || 0}.00X${u.width || 0}.00X${u.height || 0}.00`).join("  ")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Services (same layout as QuoteResults) */}
          {selectedQuote && (
            <>
              {availableServices.length === 0 ? (
                <div className="bg-white rounded-3xl border border-gray-200 p-14 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Package className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="font-black text-gray-700 text-lg mb-2">No services found</h3>
                  <p className="text-gray-500 text-sm">
                    This quote was saved before carrier data was tracked. Please create a new quote.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                  {(["economy-standard", "express", "dropoff"] as const).map((cat) => {
                    const services = servicesByCategory[cat];
                    if (services.length === 0) return null;
                    const cfg = CATEGORY_CONFIG[cat];
                    const CatIcon = cfg.icon;
                    return (
                      <div key={cat} className="flex flex-col items-center w-full">
                        <div className="relative flex flex-col items-center gap-2 p-4 rounded-2xl border font-bold text-sm bg-white text-gray-700 border-gray-100 w-full z-10">
                          <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-gray-50">
                            <CatIcon className={clsx("w-5 h-5", cfg.accent)} />
                          </div>
                          <span className="leading-tight text-center">{cfg.label}</span>
                          <span className={clsx("px-2 py-0.5 rounded-full text-[10px] font-bold", cfg.countBg)}>
                            {services.length} service{services.length !== 1 ? "s" : ""}
                          </span>
                          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center">
                            <div className="w-0.5 h-4 bg-[#0b215f]"></div>
                            <ChevronDown className="w-5 h-5 text-[#0b215f] -mt-2" />
                          </div>
                        </div>

                        {/* Service cards */}
                        <div className="w-full flex flex-col gap-4 mt-8 bg-gray-50/50 p-4 rounded-3xl border border-gray-100 min-h-[100px]">
                          {services.map((service) => (
                            <ServiceCard key={service.id} service={service} />
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </>
      )}

  
    </div>
  );
}
