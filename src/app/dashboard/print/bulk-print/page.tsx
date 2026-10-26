"use client";

import { useState, useRef, useEffect } from "react";
import { Printer, Calendar, Filter, Package, FileText, Download, Search, ChevronDown } from "lucide-react";
import { SelectField } from "@/components/ui/SelectField";
import { Pagination } from "@/components/ui/Pagination";
import clsx from "clsx";

// Mock Data
const MOCK_DATA = [
  {
    id: 1,
    status: "Delivered",
    label: "Printed",
    trackingNumber: "TRK987654321",
    carrierRef: "DHL-001",
    bookedIn: "2026-06-20",
    type: "Export",
    pieces: 2,
    weight: "15.5 kg",
    dimWeight: "18.0 kg",
    destination: "London, UK",
    collectionOn: "2026-06-21",
    enhancedLiability: "No",
    quoteCharges: "$125.00",
    trackingStatus: "Delivered"
  },
  {
    id: 2,
    status: "In Transit",
    label: "Pending",
    trackingNumber: "TRK123456789",
    carrierRef: "FEDEX-002",
    bookedIn: "2026-06-23",
    type: "Domestic",
    pieces: 1,
    weight: "5.0 kg",
    dimWeight: "5.0 kg",
    destination: "New York, US",
    collectionOn: "2026-06-24",
    enhancedLiability: "Yes",
    quoteCharges: "$45.00",
    trackingStatus: "In Transit"
  },
  {
    id: 3,
    status: "Exception",
    label: "Printed",
    trackingNumber: "TRK456789123",
    carrierRef: "UPS-003",
    bookedIn: "2026-06-19",
    type: "Import",
    pieces: 5,
    weight: "50.0 kg",
    dimWeight: "65.0 kg",
    destination: "Berlin, DE",
    collectionOn: "2026-06-20",
    enhancedLiability: "Yes",
    quoteCharges: "$450.00",
    trackingStatus: "Customs Hold"
  },
  {
    id: 4,
    status: "Booked In",
    label: "Pending",
    trackingNumber: "TRK789123456",
    carrierRef: "USPS-004",
    bookedIn: "2026-06-25",
    type: "Domestic",
    pieces: 1,
    weight: "2.0 kg",
    dimWeight: "2.5 kg",
    destination: "Los Angeles, US",
    collectionOn: "2026-06-26",
    enhancedLiability: "No",
    quoteCharges: "$15.00",
    trackingStatus: "Booked In"
  },
];

const STATUS_COLORS: Record<string, string> = {
  "Booked In": "bg-blue-100 text-blue-700 border-blue-200",
  "In Transit": "bg-amber-100 text-amber-700 border-amber-200",
  "Delivered": "bg-green-100 text-green-700 border-green-200",
  "Exception": "bg-red-100 text-red-700 border-red-200",
  "Voided": "bg-gray-100 text-gray-700 border-gray-200",
};

const STATUS_DOTS: Record<string, string> = {
  "Booked In": "bg-blue-500",
  "In Transit": "bg-amber-500",
  "Delivered": "bg-green-500",
  "Exception": "bg-red-500",
  "Voided": "bg-gray-500",
};

const SORT_OPTIONS = [
  { value: "Booked In Date New To Old", label: "Booked In Date New To Old" },
  { value: "Booked In Date Old To New", label: "Booked In Date Old To New" },
  { value: "Postcode Ascending", label: "Postcode Ascending" },
  { value: "Postcode Descending", label: "Postcode Descending" },
  { value: "Receiver Company Ascending", label: "Receiver Company Ascending" },
  { value: "Receiver Company Descending", label: "Receiver Company Descending" },
  { value: "Receiver Country ASC", label: "Receiver Country ASC" },
  { value: "Receiver Country DESC", label: "Receiver Country DESC" },
];

const A4_OPTIONS = [
  "Label",
  "Packing Slip",
  "Commercial Invoice",
  "Label + Commercial Invoice",
  "Label + Packing Slip",
  "Label + Commercial Invoice + Packaging Slip"
];

const THERMAL_OPTIONS = [
  "View Label",
  "Print Label",
  "Packaging Slip",
  "Commercial Invoice",
  "Label + Commercial Invoice",
  "Label + Packaging Slip",
  "Label + Commercial Invoice + Packaging Slip"
];

export default function BulkPrintPage() {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("Booked In Date New To Old");
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="p-6 w-full mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-2">
            <Printer className="w-7 h-7 text-white" />
            Bulk Print
          </h1>
          <p className="text-white/80 mt-1">Manage and print multiple shipments and labels at once.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3" ref={menuRef}>
          <button className="px-4 py-2 bg-white border border-gray-200 text-[#081b4c] rounded-lg hover:bg-gray-50 font-bold text-sm flex items-center gap-2 transition-colors shadow-sm">
            <Download className="w-4 h-4" /> Export CSV
          </button>
          
          {/* View A4 Label Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setOpenMenu(openMenu === 'a4' ? null : 'a4')}
              className={clsx(
                "px-4 py-2 bg-white border border-gray-200 text-[#081b4c] rounded-lg font-bold text-sm flex items-center gap-2 transition-colors shadow-sm",
                openMenu === 'a4' ? "bg-gray-50 ring-2 ring-white/20" : "hover:bg-gray-50"
              )}
            >
              <FileText className="w-4 h-4" /> View A4 Label <ChevronDown className={clsx("w-4 h-4 opacity-70 transition-transform", openMenu === 'a4' && "rotate-180")} />
            </button>
            {openMenu === 'a4' && (
              <div className="absolute right-0 top-full mt-2 w-72 bg-white border border-gray-200 rounded-xl shadow-xl z-50 py-2 animate-in fade-in slide-in-from-top-2">
                {A4_OPTIONS.map((opt) => (
                  <button 
                    key={opt} 
                    onClick={() => setOpenMenu(null)}
                    className="w-full text-left px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-[#081b4c] transition-colors"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Print Thermal Label Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setOpenMenu(openMenu === 'thermal' ? null : 'thermal')}
              className={clsx(
                "px-4 py-2 bg-white border border-gray-200 text-[#081b4c] rounded-lg font-bold text-sm flex items-center gap-2 transition-colors shadow-sm",
                openMenu === 'thermal' ? "bg-gray-50 ring-2 ring-white/20" : "hover:bg-gray-50"
              )}
            >
              <Printer className="w-4 h-4" /> Print Thermal Label <ChevronDown className={clsx("w-4 h-4 opacity-70 transition-transform", openMenu === 'thermal' && "rotate-180")} />
            </button>
            {openMenu === 'thermal' && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-gray-200 rounded-xl shadow-xl z-50 py-2 animate-in fade-in slide-in-from-top-2">
                {THERMAL_OPTIONS.map((opt) => (
                  <button 
                    key={opt} 
                    onClick={() => setOpenMenu(null)}
                    className="w-full text-left px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-[#081b4c] transition-colors"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Filters & Controls Card */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 items-start">
          
          {/* Search Box */}
          <div className="lg:col-span-1">
            <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wider">Search</label>
            <div className="relative">
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search shipments..."
                className="w-full appearance-none border border-gray-300 rounded-lg pl-10 pr-4 py-2.5 bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#081b4c] focus:border-transparent transition-all"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Date Range: From -> To */}
          <div className="lg:col-span-2 flex flex-col sm:flex-row items-center gap-3">
            <div className="flex-1 w-full">
              <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wider">From Date</label>
              <div className="relative">
                <input 
                  type="date" 
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  className="w-full appearance-none border border-gray-300 rounded-lg pl-10 pr-4 py-2.5 bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#081b4c] focus:border-transparent transition-all"
                />
                <Calendar className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
            
            <span className="text-sm font-bold text-gray-400 mt-0 sm:mt-6">To</span>
            
            <div className="flex-1 w-full">
              <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wider">To Date</label>
              <div className="relative">
                <input 
                  type="date" 
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  className="w-full appearance-none border border-gray-300 rounded-lg pl-10 pr-4 py-2.5 bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#081b4c] focus:border-transparent transition-all"
                />
                <Calendar className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Sort Dropdown */}
          <div className="lg:col-span-1">
            <SelectField
              label="PRINT SORT"
              options={SORT_OPTIONS}
              value={sortOption}
              onChange={setSortOption}
              className="py-[9px]"
              containerClassName="text-xs uppercase tracking-wider"
            />
          </div>
          
          {/* Status Indicators / Marks */}
          <div className="md:col-span-2 lg:col-span-4 pt-4 mt-2 border-t border-gray-100 flex flex-wrap gap-4 items-center justify-end">
            <span className="text-sm font-medium text-gray-700 mr-2 flex items-center gap-1.5">
              <Filter className="w-4 h-4" /> Filter by Status:
            </span>
            {["Booked In", "In Transit", "Delivered", "Exception", "Voided"].map((status) => (
              <button 
                key={status}
                className={clsx(
                  "flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold border transition-colors hover:opacity-80",
                  STATUS_COLORS[status] || "bg-gray-100 text-gray-700 border-gray-200"
                )}
              >
                <span className={clsx("w-2 h-2 rounded-full", STATUS_DOTS[status] || "bg-gray-500")}></span>
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1500px] text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-200 text-xs uppercase tracking-wider font-semibold text-gray-600">
                <th className="px-4 py-3 text-center w-12">
                  <input type="checkbox" className="rounded border-gray-300 text-[#081b4c] focus:ring-[#081b4c]" />
                </th>
                <th className="px-4 py-3 whitespace-nowrap">Status</th>
                <th className="px-4 py-3 whitespace-nowrap">Label</th>
                <th className="px-4 py-3 whitespace-nowrap">Tracking Number</th>
                <th className="px-4 py-3 whitespace-nowrap">Carrier Ref</th>
                <th className="px-4 py-3 whitespace-nowrap">Booked In</th>
                <th className="px-4 py-3 whitespace-nowrap">Type</th>
                <th className="px-4 py-3 whitespace-nowrap">Pieces</th>
                <th className="px-4 py-3 whitespace-nowrap">Weight</th>
                <th className="px-4 py-3 whitespace-nowrap">Dim Weight</th>
                <th className="px-4 py-3 whitespace-nowrap">Destination</th>
                <th className="px-4 py-3 whitespace-nowrap">Collection On</th>
                <th className="px-4 py-3 whitespace-nowrap">Enhanced Liab.</th>
                <th className="px-4 py-3 whitespace-nowrap">Quote Charges</th>
                <th className="px-4 py-3 whitespace-nowrap">Tracking Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200/60 text-sm">
              {MOCK_DATA.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-3 text-center">
                    <input type="checkbox" className="rounded border-gray-300 text-[#081b4c] focus:ring-[#081b4c]" />
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={clsx(
                      "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border",
                      STATUS_COLORS[row.status] || "bg-gray-100 text-gray-700 border-gray-200"
                    )}>
                      <span className={clsx("w-1.5 h-1.5 rounded-full", STATUS_DOTS[row.status] || "bg-gray-500")}></span>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={clsx(
                      "inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium",
                      row.label === "Printed" ? "bg-emerald-50 text-emerald-700" : "bg-gray-100 text-gray-600"
                    )}>
                      {row.label === "Printed" ? <FileText className="w-3 h-3" /> : null}
                      {row.label}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap font-medium text-[#081b4c] hover:underline cursor-pointer">
                    {row.trackingNumber}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-gray-600">{row.carrierRef}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-gray-600">{row.bookedIn}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1">
                      {row.type === "Export" ? <Package className="w-3.5 h-3.5 text-blue-500" /> : <Package className="w-3.5 h-3.5 text-amber-500" />}
                      {row.type}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-gray-600 text-center">{row.pieces}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-gray-600">{row.weight}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-gray-600">{row.dimWeight}</td>
                  <td className="px-4 py-3 whitespace-nowrap font-medium text-gray-900">{row.destination}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-gray-600">{row.collectionOn}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-center">
                    {row.enhancedLiability === "Yes" ? (
                      <span className="text-green-600 font-medium">Yes</span>
                    ) : (
                      <span className="text-gray-400">No</span>
                    )}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap font-medium text-gray-900">{row.quoteCharges}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-gray-600">{row.trackingStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {MOCK_DATA.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              No shipments found for the selected criteria.
            </div>
          )}
        </div>
        <Pagination 
          currentPage={1} 
          totalPages={5} 
          totalItems={45} 
          startItem={1} 
          endItem={4} 
          itemName="shipments" 
        />
      </div>
    </div>
  );
}
