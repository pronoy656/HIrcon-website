"use client";

import React, { useState, useMemo } from "react";
import { countries } from "@/lib/countries";
import { saveQuote } from "@/lib/savedQuotes";
import { Modal } from "@/components/ui/Modal";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Mail,
  Save,
  Star,
  Clock,
  Zap,
  Package,
  Truck,
  ShoppingBag,
  CheckCircle,
  SlidersHorizontal,
  MapPin,
  ChevronDown,
  ChevronRight,
  Filter,
  ArrowRight,
  ArrowUp,
  ArrowDown,
} from "lucide-react";

/* ─────────────────────────────────────────
   Types
───────────────────────────────────────── */
export interface QuoteFormData {
  fromCountry: string;
  fromCity: string;
  fromPostCode: string;
  toCountry: string;
  toCity: string;
  toPostCode: string;
  parcelType: string;
  units: Array<{
    id: number;
    weight?: string;
    weightUnit?: string;
    packaging?: string;
    length?: string;
    width?: string;
    height?: string;
  }>;
  activeType: string;
}

interface DeliveryService {
  id: string;
  carrier: string;
  carrierLogo: string;
  serviceName: string;
  serviceCode: string;
  category: "economy-standard" | "express" | "dropoff";
  deliveryDays: string;
  price: number;
  originalPrice?: number;
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

/* ─────────────────────────────────────────
   Mock Data  (economy + standard merged)
───────────────────────────────────────── */
const MOCK_SERVICES: DeliveryService[] = [
  // Economy & Standard
  {
    id: "1",
    carrier: "Royal Mail",
    carrierLogo: "https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://royalmail.com&size=128",
    serviceName: "Tracked 48",
    serviceCode: "RM-T48",
    category: "economy-standard",
    deliveryDays: "2-3 days",
    price: 4.99,
    currency: "GBP",
    features: ["Tracked", "Signature on delivery", "Up to 20kg"],
    rating: 4.1,
    isBestValue: true,
    color: "#C8102E",
    collectionType: "Drop-off",
    transitType: "By Ship",
  },
  {
    id: "2",
    carrier: "Hermes",
    carrierLogo: "https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://evri.com&size=128",
    serviceName: "Standard Parcel",
    serviceCode: "HE-STD",
    category: "economy-standard",
    deliveryDays: "3-5 days",
    price: 3.49,
    currency: "GBP",
    features: ["Tracked", "Safe place options", "Up to 15kg"],
    rating: 3.8,
    color: "#8B0000",
    collectionType: "Collection",
    transitType: "By Ship",
  },
  {
    id: "3",
    carrier: "Yodel",
    carrierLogo: "https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://yodel.co.uk&size=128",
    serviceName: "Economy Collect",
    serviceCode: "YO-EC",
    category: "economy-standard",
    deliveryDays: "3-4 days",
    price: 3.99,
    currency: "GBP",
    features: ["Tracked", "Collect from local store", "Up to 10kg"],
    rating: 3.5,
    color: "#FF6B00",
    collectionType: "Drop-off",
    transitType: "By Ship",
  },
  {
    id: "4",
    carrier: "DHL",
    carrierLogo: "https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://dhl.com&size=128",
    serviceName: "Parcel Connect",
    serviceCode: "DHL-PC",
    category: "economy-standard",
    deliveryDays: "1-2 days",
    price: 8.99,
    originalPrice: 11.99,
    currency: "GBP",
    features: ["Full tracking", "Real-time updates", "Proof of delivery", "Up to 30kg"],
    rating: 4.5,
    isPopular: true,
    color: "#D40511",
    collectionType: "Collection",
    transitType: "By Air",
  },
  {
    id: "5",
    carrier: "UPS",
    carrierLogo: "https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://ups.com&size=128",
    serviceName: "Standard",
    serviceCode: "UPS-STD",
    category: "economy-standard",
    deliveryDays: "2-3 days",
    price: 9.49,
    currency: "GBP",
    features: ["End-to-end tracking", "Delivery notifications", "Up to 70kg", "Insurance included"],
    rating: 4.3,
    color: "#351C15",
    collectionType: "Collection",
    transitType: "By Ship",
  },
  {
    id: "6",
    carrier: "FedEx",
    carrierLogo: "https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://fedex.com&size=128",
    serviceName: "Ground",
    serviceCode: "FX-GRD",
    category: "economy-standard",
    deliveryDays: "2-4 days",
    price: 10.99,
    currency: "GBP",
    features: ["Door-to-door", "Signature required", "Up to 68kg", "Money-back guarantee"],
    rating: 4.4,
    color: "#4D148C",
    collectionType: "Collection",
    transitType: "By Ship",
  },
  // Express & Timed
  {
    id: "7",
    category: "express",
    carrier: "DHL",
    carrierLogo: "https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://dhl.com&size=128",
    serviceName: "Express Worldwide",
    serviceCode: "DHL-EW",
    deliveryDays: "Next day by 9am",
    price: 24.99,
    currency: "GBP",
    features: ["Next day delivery", "Before 9am option", "Full insurance", "Priority handling"],
    rating: 4.8,
    isFastest: true,
    color: "#D40511",
    collectionType: "Collection",
    transitType: "By Air",
  },
  {
    id: "8",
    category: "express",
    carrier: "TNT",
    carrierLogo: "https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://tnt.com&size=128",
    serviceName: "Express",
    serviceCode: "TNT-EXP",
    deliveryDays: "Next day by 12pm",
    price: 19.99,
    currency: "GBP",
    features: ["Time-definite", "Before noon delivery", "Real-time tracking", "Dedicated courier"],
    rating: 4.6,
    isPopular: true,
    color: "#FF6600",
    collectionType: "Collection",
    transitType: "By Air",
  },
  {
    id: "9",
    category: "express",
    carrier: "City Sprint",
    carrierLogo: "CS",
    serviceName: "Same Day Express",
    serviceCode: "CS-SD",
    deliveryDays: "Same day",
    price: 39.99,
    currency: "GBP",
    features: ["Same day delivery", "Dedicated courier", "Real-time GPS", "2-hour slots"],
    rating: 4.7,
    color: "#00A651",
    collectionType: "Collection",
    transitType: "By Ship",
  },
  {
    id: "10",
    category: "express",
    carrier: "FedEx",
    carrierLogo: "https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://fedex.com&size=128",
    serviceName: "Priority Overnight",
    serviceCode: "FX-PO",
    deliveryDays: "Next day by 10:30am",
    price: 29.99,
    currency: "GBP",
    features: ["Before 10:30am", "Money back guarantee", "Full tracking", "Fragile handling"],
    rating: 4.7,
    color: "#4D148C",
    collectionType: "Drop-off",
    transitType: "By Air",
  },
  // Drop Off
  {
    id: "11",
    category: "dropoff",
    carrier: "UPS",
    carrierLogo: "https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://ups.com&size=128",
    serviceName: "Access Point",
    serviceCode: "UPS-AP",
    deliveryDays: "2-3 days",
    price: 5.99,
    currency: "GBP",
    features: ["Drop off at store", "7-day collection", "Tracking included", "Up to 20kg"],
    rating: 4.2,
    isBestValue: true,
    color: "#351C15",
    collectionType: "Drop-off",
    transitType: "By Ship",
  },
  {
    id: "12",
    category: "dropoff",
    carrier: "Parcelforce",
    carrierLogo: "https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://parcelforce.com&size=128",
    serviceName: "Drop & Go",
    serviceCode: "PF-DG",
    deliveryDays: "3-5 days",
    price: 6.49,
    currency: "GBP",
    features: ["Post Office drop off", "Tracked service", "Email notifications"],
    rating: 4.0,
    color: "#003399",
    collectionType: "Drop-off",
    transitType: "By Ship",
  },
  {
    id: "13",
    category: "dropoff",
    carrier: "Hermes",
    carrierLogo: "https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://evri.com&size=128",
    serviceName: "Parcelshop Drop Off",
    serviceCode: "HE-DO",
    deliveryDays: "2-4 days",
    price: 4.49,
    currency: "GBP",
    features: ["1000+ locations", "Tracked delivery", "Up to 15kg"],
    rating: 3.9,
    color: "#8B0000",
    collectionType: "Drop-off",
    transitType: "By Ship",
  },
];

/* ─────────────────────────────────────────
   Unique lists (for filters)
───────────────────────────────────────── */
const ALL_CARRIERS = Array.from(
  new Map(MOCK_SERVICES.map((s) => [s.carrier, { name: s.carrier, logo: s.carrierLogo, color: s.color }])).values()
);
const ALL_COLLECTIONS = ["Drop-off", "Collection"];
const ALL_TRANSITS = ["By Air", "By Ship"];

/* ─────────────────────────────────────────
   Category config
───────────────────────────────────────── */
const CATEGORY_CONFIG = {
  "economy-standard": {
    label: "Economy & Standard",
    icon: Package,
    headerBg: "from-emerald-500 to-teal-600",
    tabActive: "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/30",
    tabInactive: "bg-white text-gray-600 hover:bg-emerald-50 hover:text-emerald-700",
    accent: "text-emerald-600",
    border: "border-emerald-200",
    countBg: "bg-emerald-100 text-emerald-700",
  },
  express: {
    label: "Express & Timed",
    icon: Zap,
    headerBg: "from-orange-500 to-red-500",
    tabActive: "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/30",
    tabInactive: "bg-white text-gray-600 hover:bg-orange-50 hover:text-orange-700",
    accent: "text-orange-600",
    border: "border-orange-200",
    countBg: "bg-orange-100 text-orange-700",
  },
  dropoff: {
    label: "Drop Off",
    icon: ShoppingBag,
    headerBg: "from-purple-500 to-violet-600",
    tabActive: "bg-gradient-to-r from-purple-500 to-violet-600 text-white shadow-lg shadow-purple-500/30",
    tabInactive: "bg-white text-gray-600 hover:bg-purple-50 hover:text-purple-700",
    accent: "text-purple-600",
    border: "border-purple-200",
    countBg: "bg-purple-100 text-purple-700",
  },
} as const;

type Category = keyof typeof CATEGORY_CONFIG;

/* ─────────────────────────────────────────
   Sub-components
───────────────────────────────────────── */
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-3 h-3 ${
            star <= Math.round(rating)
              ? "fill-amber-400 text-amber-400"
              : "text-gray-200 fill-gray-200"
          }`}
        />
      ))}
      <span className="text-xs font-semibold text-gray-500 ml-0.5">{rating}</span>
    </div>
  );
}

function CarrierLogo({ logo, color }: { logo: string; color: string }) {
  return (
    <div
      className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-black text-xs tracking-tight shadow-md flex-shrink-0 select-none overflow-hidden"
      style={{ backgroundColor: color }}
    >
      {logo.startsWith("http") ? (
        <img src={logo} alt="carrier logo" className="w-full h-full object-contain bg-white p-1" />
      ) : (
        logo
      )}
    </div>
  );
}

function ServiceCard({ service }: { service: DeliveryService }) {
  const router = useRouter();
  // Mock breakdown calculation
  const basePrice = service.price * 0.72;
  const fuel = service.price * 0.10;
  const vat = service.price * 0.18;

  return (
    <div className="bg-white border border-gray-200 rounded-xl flex flex-col overflow-hidden">
      {/* Dark Top Section */}
      <div className="bg-[#202738] text-white p-5 flex justify-between items-start">
        {/* Logo */}
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
        
        {/* Right Info */}
        <div className="text-right flex-1 ml-4">
          <h4 className="font-black text-sm uppercase tracking-wide text-gray-100">{service.serviceName}</h4>
          <p className="text-[11px] text-gray-400 mt-0.5 uppercase tracking-wide">{service.deliveryDays}</p>
          <div className="mt-2.5">
            <span className="text-2xl font-bold tracking-tight">£{service.price.toFixed(2)}</span>
            <span className="text-xs text-gray-400 ml-1.5 font-medium">exc VAT</span>
          </div>
          <div className="mt-3 border-t border-gray-600/60 pt-3 text-xs text-gray-300 flex flex-col items-end gap-1">
             <span className="font-medium text-gray-400">Chargeable Weight</span>
             <div className="flex items-center gap-1.5">
               <span className="font-bold text-gray-100">10.0 kg(s)</span>
               <Package className="w-3.5 h-3.5 text-gray-400" />
             </div>
          </div>
        </div>
      </div>
      
      {/* Light Bottom Section */}
      <div className="p-5 flex flex-col">
        {/* Price Breakdown */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm mb-5">
           <div className="flex justify-between items-center">
             <span className="text-gray-500 font-medium">Base:</span> 
             <span className="font-bold text-gray-800">£{basePrice.toFixed(2)}</span>
           </div>
           <div className="flex justify-between items-center">
             <span className="text-gray-500 font-medium">Fuel:</span> 
             <span className="font-bold text-gray-800">£{fuel.toFixed(2)}</span>
           </div>
           <div className="flex justify-between items-center">
             <span className="text-gray-500 font-medium">VAT:</span> 
             <span className="font-bold text-gray-800">£{vat.toFixed(2)}</span>
           </div>
           <div className="flex justify-between items-center">
             <span className="text-gray-500 font-medium">Total:</span> 
             <span className="font-bold text-gray-800">£{service.price.toFixed(2)}</span>
           </div>
        </div>
        
        {/* Date Bar */}
        <div className="bg-gray-100/80 -mx-5 px-5 py-3 flex items-center justify-center gap-2.5 text-[13px] text-gray-700 font-bold mb-5 border-y border-gray-200/60">
          <Clock className="w-4 h-4 text-gray-500" />
          <span>Thu, 18 Jun 2026 - 12:00</span>
        </div>
        
        {/* Collect/Deliver */}
        <div className="flex justify-between items-center text-center mb-4 px-2">
          <div className="flex-1">
            <p className="text-[11px] text-[#081b4c] font-bold uppercase tracking-wide mb-1">Collect</p>
            <p className="font-black text-gray-800 tracking-wider">---</p>
          </div>
          <ChevronRight className="w-8 h-8 text-[#202738] flex-shrink-0" />
          <div className="flex-1">
            <p className="text-[11px] text-[#081b4c] font-bold uppercase tracking-wide mb-1">Deliver by</p>
            <p className="font-black text-gray-800 tracking-wider">---</p>
          </div>
        </div>
        
        <div className="text-center text-xs text-gray-500 mb-5">
          Book by: <span className="font-bold text-gray-800">---</span>
        </div>
        
        {/* Book Now button */}
        <button 
          onClick={() => router.push('/dashboard/ship/export-domestic')}
          className="w-full py-3.5 rounded-[100px] font-black text-sm tracking-wide bg-[#081b4c] text-white hover:bg-[#081844] hover:shadow-md hover:shadow-[#081b4c]/30 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
        >
          BOOK NOW
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Main component
───────────────────────────────────────── */
interface QuoteResultsProps {
  formData: QuoteFormData;
  onEditQuote: () => void;
}

export function QuoteResults({ formData, onEditQuote }: QuoteResultsProps) {
  // Filters
  const [selectedCarriers, setSelectedCarriers] = useState<Set<string>>(new Set());
  const [selectedCollections, setSelectedCollections] = useState<Set<string>>(new Set());
  const [selectedTransits, setSelectedTransits] = useState<Set<string>>(new Set());
  const [sortByPrice, setSortByPrice] = useState<"low-to-high" | "high-to-low" | "none">("none");
  const [savedToast, setSavedToast] = useState(false);
  const [saveModalOpen, setSaveModalOpen] = useState(false);
  const [quoteReference, setQuoteReference] = useState("");
  const router = useRouter();

  const [courierOpen, setCourierOpen] = useState(false);
  const [collectionOpen, setCollectionOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [transitOpen, setTransitOpen] = useState(false);

  /* toggle functions */
  const toggleSet = (set: Set<string>, val: string, setter: React.Dispatch<React.SetStateAction<Set<string>>>) => {
    setter((prev) => {
      const next = new Set(prev);
      if (next.has(val)) {
        if (next.size > 1) next.delete(val);
      } else {
        next.add(val);
      }
      return next;
    });
  };

  /* filtered services */
  const { allFilteredServices, servicesByCategory } = useMemo(() => {
    let filtered = MOCK_SERVICES.filter(
      (s) => 
        (selectedCarriers.size === 0 || selectedCarriers.has(s.carrier)) &&
        (selectedCollections.size === 0 || selectedCollections.has(s.collectionType)) &&
        (selectedTransits.size === 0 || selectedTransits.has(s.transitType))
    );

    if (sortByPrice === "low-to-high") {
      filtered = filtered.sort((a, b) => a.price - b.price);
    } else if (sortByPrice === "high-to-low") {
      filtered = filtered.sort((a, b) => b.price - a.price);
    }

    return {
      allFilteredServices: filtered,
      servicesByCategory: {
        "economy-standard": filtered.filter((s) => s.category === "economy-standard"),
        express: filtered.filter((s) => s.category === "express"),
        dropoff: filtered.filter((s) => s.category === "dropoff"),
      }
    };
  }, [selectedCarriers, selectedCollections, selectedTransits, sortByPrice]);

  const totalCount =
    servicesByCategory["economy-standard"].length +
    servicesByCategory.express.length +
    servicesByCategory.dropoff.length;

  /* helpers */
  const getCountryName = (code: string) => {
    if (!code) return "—";
    const c = countries.find((c) => c.code === code);
    return c ? c.name : code;
  };

  const handleSaveClick = () => {
    setSaveModalOpen(true);
  };

  const handleConfirmSave = () => {
    const prices = allFilteredServices.map((s) => s.price);
    // Deduplicate carriers
    const seenCarriers = new Set<string>();
    const carriers = allFilteredServices
      .filter((s) => {
        if (seenCarriers.has(s.carrier)) return false;
        seenCarriers.add(s.carrier);
        return true;
      })
      .map((s) => ({ name: s.carrier, logo: s.carrierLogo, color: s.color }));

    saveQuote({
      formData,
      totalServices: allFilteredServices.length,
      lowestPrice: prices.length > 0 ? Math.min(...prices) : 0,
      currency: "GBP",
      carriers,
      reference: quoteReference,
    });
    setSaveModalOpen(false);
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 3000);
    setQuoteReference("");
  };

  const firstUnit = formData.units[0];
  const parcelSummary =
    formData.units.length > 0
      ? `${formData.units.length} parcel${formData.units.length !== 1 ? "s" : ""}`
      : "—";

  return (
    <div className="w-full max-w-[1400px] mx-auto space-y-6">
      {/* ── TOP BANNER ── */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 md:p-8">
          {/* Title row */}
          <div className="mb-5">
            <h2 className="text-2xl font-black text-gray-900 tracking-tight">
              Available <span className="text-[#081b4c]">Services</span>
            </h2>
            <p className="text-gray-500 text-sm mt-1 font-medium">
              {totalCount} delivery option{totalCount !== 1 ? "s" : ""} found for your shipment
            </p>
          </div>

          {/* Combined Shipment summary & Action buttons bar */}
          <div className="flex flex-col xl:flex-row gap-4 items-center bg-gray-50/50 border border-gray-100 rounded-3xl p-3">
            {/* Route & Parcel */}
            <div className="flex flex-col sm:flex-row gap-3 flex-1 w-full">
              {/* Route Card */}
              <div className="flex-1 bg-gradient-to-br from-[#081b4c]/5 to-blue-50/50 border border-blue-100 rounded-2xl p-4 shadow-sm flex flex-col justify-center transition-all hover:shadow-md">
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="w-4 h-4 text-[#081b4c]" />
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Route</span>
                </div>
                <div className="flex items-center gap-4">
                  {/* FROM */}
                  <div className="flex-1 min-w-0">
                    <p className="font-black text-[#081b4c] text-sm leading-tight truncate">
                      {getCountryName(formData.fromCountry) || "—"}
                    </p>
                    {(formData.fromCity || formData.fromPostCode) && (
                      <p className="text-xs text-gray-500 font-medium truncate mt-0.5 flex flex-wrap gap-x-2">
                        {formData.fromCity && <span><span className="text-gray-400">City:</span> {formData.fromCity}</span>}
                        {formData.fromPostCode && <span><span className="text-gray-400">Post Code:</span> {formData.fromPostCode}</span>}
                      </p>
                    )}
                  </div>

                  {/* Arrow */}
                  <div className="flex-shrink-0 text-[#081b4c]/60 px-1">
                    <ArrowRight className="w-7 h-7 stroke-[1.5]" />
                  </div>

                  {/* TO */}
                  <div className="flex-1 min-w-0 text-right">
                    <p className="font-black text-[#081b4c] text-sm leading-tight truncate">
                      {getCountryName(formData.toCountry) || "—"}
                    </p>
                    {(formData.toCity || formData.toPostCode) && (
                      <p className="text-xs text-gray-500 font-medium truncate mt-0.5 flex flex-wrap justify-end gap-x-2">
                        {formData.toCity && <span><span className="text-gray-400">City:</span> {formData.toCity}</span>}
                        {formData.toPostCode && <span><span className="text-gray-400">Post Code:</span> {formData.toPostCode}</span>}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Parcel info & Dimensions */}
              <div className="flex-1 bg-gradient-to-br from-emerald-50/50 to-green-50/50 border border-emerald-100 rounded-2xl shadow-sm grid grid-cols-2 items-center transition-all hover:shadow-md">
                <div className="p-4 border-r border-emerald-200/60 h-full flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-2">
                    <Package className="w-4 h-4 text-emerald-600" />
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Parcel Info</span>
                  </div>
                  <p className="font-black text-gray-900 text-sm">{parcelSummary}</p>
                  <p className="text-xs text-gray-500 font-medium capitalize mt-0.5">{formData.parcelType || "—"}</p>
                </div>

                {firstUnit ? (
                  <div className="text-right p-4 h-full flex flex-col justify-center">
                    <div className="flex items-center justify-end gap-1.5 mb-1.5">
                      <SlidersHorizontal className="w-3 h-3 text-emerald-600" />
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Dimensions</span>
                    </div>
                    <p className="font-black text-gray-900 text-sm">
                      {firstUnit.length || "—"} × {firstUnit.width || "—"} × {firstUnit.height || "—"} <span className="text-xs font-semibold text-gray-400">cm</span>
                    </p>
                    <p className="text-xs text-gray-500 font-medium mt-0.5">
                      Weight: <span className="font-bold text-gray-700">{firstUnit.weight || "—"} {firstUnit.weightUnit || "kg"}</span>
                    </p>
                  </div>
                ) : (
                  <div className="p-4"></div>
                )}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-2.5 shrink-0 w-full xl:w-auto justify-end px-2">
              <button
                onClick={onEditQuote}
                className="flex items-center gap-2 px-5 py-3 rounded-xl border-2 border-[#081b4c] text-[#081b4c] font-bold text-sm hover:bg-[#081b4c] hover:text-white transition-all whitespace-nowrap shadow-sm bg-white"
              >
                <ArrowLeft className="w-4 h-4" />
                Edit
              </button>
              <button className="flex items-center gap-2 px-4 py-3 rounded-xl border-2 border-gray-200 text-gray-700 font-bold text-sm hover:border-gray-400 hover:bg-gray-50 transition-all whitespace-nowrap shadow-sm bg-white">
                <Mail className="w-4 h-4" />
                Email
              </button>
              <button 
                onClick={handleSaveClick}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#081b4c] text-white font-bold text-sm hover:bg-[#081844] hover:shadow-md transition-all whitespace-nowrap shadow-sm"
              >
                <Save className="w-4 h-4" />
                Save
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── SAVE MODAL ── */}
      <Modal
        isOpen={saveModalOpen}
        onClose={() => setSaveModalOpen(false)}
        title="Save Quote Details"
        footer={
          <button 
            onClick={handleConfirmSave} 
            className="px-6 py-2.5 font-bold text-white bg-[#081b4c] hover:bg-[#081844] rounded-lg transition-colors shadow-sm"
          >
            SUBMIT
          </button>
        }
      >
        <div className="py-4">
          <input
            type="text"
            placeholder="Please enter quote reference."
            value={quoteReference}
            onChange={(e) => setQuoteReference(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#187E9F]/20 focus:border-[#187E9F] outline-none transition-all text-sm"
          />
        </div>
      </Modal>

      {/* ── SAVE TOAST ── */}
      {savedToast && (
        <div className="fixed top-[90px] right-6 z-[200] bg-[#081b4c] text-white px-5 py-3.5 rounded-2xl shadow-xl flex items-center gap-3 animate-in slide-in-from-top-4 fade-in duration-300">
          <CheckCircle className="w-5 h-5 text-green-300" />
          <div>
            <p className="font-bold text-sm">Quote Saved!</p>
            <p className="text-xs text-white/70">View it in Saved Quotations</p>
          </div>
          <button 
            onClick={() => router.push("/dashboard/quote/saved-quotation")}
            className="ml-2 px-3 py-1.5 bg-white/15 rounded-xl text-xs font-bold hover:bg-white/25 transition-colors"
          >
            View
          </button>
        </div>
      )}

      {/* ── MAIN: Sidebar + Results ── */}
      <div className="flex gap-6 items-start">
        {/* ── LEFT SIDEBAR ── */}
        <div className="w-64 flex-shrink-0 sticky top-6 space-y-4">
          
          {/* Main Filter Panel */}
          <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden flex flex-col divide-y divide-gray-100">
            <div className="px-5 py-4 bg-gray-50/50">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 bg-[#081b4c]/10 rounded-xl flex items-center justify-center">
                  <Filter className="w-4 h-4 text-[#081b4c]" />
                </div>
                <span className="font-black text-gray-900 text-sm">Refine Services</span>
              </div>
            </div>

            {/* 1. Courier Filter */}
            <div className="flex flex-col">
              <button
                onClick={() => setCourierOpen(!courierOpen)}
                className="w-full flex items-center justify-between px-5 py-3.5 hover:bg-gray-50 transition-colors"
              >
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  Courier / Brand
                </p>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${courierOpen ? "" : "-rotate-90"}`} />
              </button>
              {courierOpen && (
                <div className="px-4 pb-4 space-y-2">
                  <div className="flex items-center justify-end px-1 mb-2">
                    <button onClick={() => setSelectedCarriers(new Set(ALL_CARRIERS.map(c => c.name)))} className="text-[10px] font-bold text-[#081b4c] hover:underline">Select All</button>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    {ALL_CARRIERS.map((carrier) => {
                      const isActive = selectedCarriers.has(carrier.name);
                      return (
                        <label
                          key={carrier.name}
                          className={`flex items-center gap-3 p-2.5 rounded-xl cursor-pointer transition-all border-2 ${
                            isActive
                              ? "border-[#081b4c]/20 bg-[#081b4c]/5"
                              : "border-transparent hover:bg-gray-50"
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isActive}
                            onChange={() => toggleSet(selectedCarriers, carrier.name, setSelectedCarriers)}
                            className="w-4 h-4 rounded accent-[#081b4c] cursor-pointer flex-shrink-0"
                          />
                          <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-black text-[9px] tracking-tight flex-shrink-0 shadow-sm bg-white border border-gray-100 overflow-hidden"
                            title={carrier.name}
                          >
                            {carrier.logo?.startsWith("http") ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img src={carrier.logo} alt={carrier.name} className="w-full h-full object-contain p-1" />
                            ) : (
                              <span style={{ color: carrier.color }}>{carrier.logo}</span>
                            )}
                          </div>
                          <p className="text-sm font-bold text-gray-800 leading-tight flex-1 truncate">{carrier.name}</p>
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* 2. Collection Type */}
            <div className="flex flex-col">
              <button
                onClick={() => setCollectionOpen(!collectionOpen)}
                className="w-full flex items-center justify-between px-5 py-3.5 hover:bg-gray-50 transition-colors"
              >
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  Collection Type
                </p>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${collectionOpen ? "" : "-rotate-90"}`} />
              </button>
              {collectionOpen && (
                <div className="px-4 pb-4 space-y-2">
                  <div className="flex flex-col gap-1.5">
                    {ALL_COLLECTIONS.map((c) => {
                      const isActive = selectedCollections.has(c);
                      return (
                        <label key={c} className="flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                          <input
                            type="checkbox"
                            checked={isActive}
                            onChange={() => toggleSet(selectedCollections, c, setSelectedCollections)}
                            className="w-4 h-4 rounded accent-[#081b4c] cursor-pointer"
                          />
                          <span className={`text-sm font-semibold ${isActive ? "text-gray-900" : "text-gray-500"}`}>{c}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* 3. Sort by Price */}
            <div className="flex flex-col">
              <button
                onClick={() => setSortOpen(!sortOpen)}
                className="w-full flex items-center justify-between px-5 py-3.5 hover:bg-gray-50 transition-colors"
              >
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  Sort by Price
                </p>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${sortOpen ? "" : "-rotate-90"}`} />
              </button>
              {sortOpen && (
                <div className="px-4 pb-4 space-y-2">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSortByPrice(sortByPrice === "low-to-high" ? "none" : "low-to-high")}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border text-xs font-bold transition-colors ${
                        sortByPrice === "low-to-high"
                          ? "border-[#081b4c] bg-[#081b4c]/5 text-[#081b4c]"
                          : "border-gray-200 text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <ArrowUp className="w-3 h-3" /> Low-High
                    </button>
                    <button
                      onClick={() => setSortByPrice(sortByPrice === "high-to-low" ? "none" : "high-to-low")}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border text-xs font-bold transition-colors ${
                        sortByPrice === "high-to-low"
                          ? "border-[#081b4c] bg-[#081b4c]/5 text-[#081b4c]"
                          : "border-gray-200 text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <ArrowDown className="w-3 h-3" /> High-Low
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* 4. Transit Type */}
            <div className="flex flex-col">
              <button
                onClick={() => setTransitOpen(!transitOpen)}
                className="w-full flex items-center justify-between px-5 py-3.5 hover:bg-gray-50 transition-colors"
              >
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  Transit Type
                </p>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${transitOpen ? "" : "-rotate-90"}`} />
              </button>
              {transitOpen && (
                <div className="px-4 pb-4 space-y-2">
                  <div className="flex flex-col gap-1.5">
                    {ALL_TRANSITS.map((t) => {
                      const isActive = selectedTransits.has(t);
                      return (
                        <label key={t} className="flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                          <input
                            type="checkbox"
                            checked={isActive}
                            onChange={() => toggleSet(selectedTransits, t, setSelectedTransits)}
                            className="w-4 h-4 rounded accent-[#081b4c] cursor-pointer"
                          />
                          <span className={`text-sm font-semibold ${isActive ? "text-gray-900" : "text-gray-500"}`}>{t}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

          </div>

        
        </div>

        {/* ── RIGHT CONTENT ── */}
        <div className="flex-1 min-w-0">
          {allFilteredServices.length === 0 ? (
            <div className="bg-white rounded-3xl border border-gray-200 p-14 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="font-black text-gray-700 text-lg mb-2">No services found</h3>
              <p className="text-gray-500 text-sm">
                Try adjusting your filters to see available options.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {(["economy-standard", "express", "dropoff"] as Category[]).map((cat) => {
                const services = servicesByCategory[cat];
                if (services.length === 0) return null;
                
                const cfg = CATEGORY_CONFIG[cat];
                const CatIcon = cfg.icon;
                
                return (
                  <div key={cat} className="flex flex-col items-center w-full">
                    {/* Category Header Card */}
                    <div className="relative flex flex-col items-center gap-2 p-4 rounded-2xl border font-bold text-sm bg-white text-gray-700 border-gray-100 w-full z-10">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-gray-50">
                        <CatIcon className={`w-5 h-5 ${cfg.accent}`} />
                      </div>
                      <span className="leading-tight text-center">{cfg.label}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${cfg.countBg}`}>
                        {services.length} service{services.length !== 1 ? "s" : ""}
                      </span>

                      {/* Arrow pointing down */}
                      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center">
                        <div className="w-0.5 h-4 bg-[#081b4c]"></div>
                        <ChevronDown className="w-5 h-5 text-[#081b4c] -mt-2" />
                      </div>
                    </div>

                    {/* Services Column Stack */}
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
        </div>
      </div>
    </div>
  );
}
