"use client";

import React, { useState } from 'react';
import { TrackingCard, TrackingData, TagType } from '@/components/features/tracking/tracking-history/TrackingCard';
import { TrackingDetailsModal } from '@/components/features/tracking/tracking-history/TrackingDetailsModal';

const mockTrackingData: TrackingData[] = [
  {
    id: "NYP-2540A",
    carrierReference: "DHL-98213",
    invoiceNumber: "INV-001",
    type: "ship",
    status: "In Transit",
    tags: [
      { text: "In Transit", type: "info" }
    ],
    bookedInPaymentStatus: { date: "May 19, 2025", time: "10:30 AM", account: "ACC-12345" },
    collectionOn: "May 19, 2025",
    piecesWeightDim: "2 / 45kg / 50kg",
    destination: "New York, USA",
    shipmentType: "Your Packaging",
    insuranceLiability: "£1,500",
    codeCharges: { basePrice: "£35.00", fuel: "£2.00", vat: "£8.00", total: "£45.00" },
    auditCharges: "-",
  },
  {
    id: "MDY-304CD",
    invoiceNumber: "INV-002",
    type: "truck",
    status: "Exceptions",
    tags: [
      { text: "Exceptions", type: "error" }
    ],
    bookedInPaymentStatus: { date: "May 17, 2025", time: "11:45 AM", account: "ACC-98765" },
    collectionOn: "May 17, 2025",
    piecesWeightDim: "1 / 12kg / 15kg",
    destination: "Madrid, Spain",
    shipmentType: "Pallet",
    insuranceLiability: "£500",
    codeCharges: "-",
    auditCharges: {
      weight: "12kg",
      dimensions: "15x15x20cm",
      basePrice: "£10.00",
      fuel: "£2.00",
      total: "£12.00"
    },
  },
  {
    id: "DSY-901ER",
    carrierReference: "UPS-55421",
    type: "ship",
    status: "Booked In",
    tags: [
      { text: "Booked In", type: "info" }
    ],
    bookedInPaymentStatus: { date: "May 31, 2025", time: "09:15 AM", account: "ACC-54321" },
    collectionOn: "May 31, 2025",
    piecesWeightDim: "5 / 120kg / 135kg",
    destination: "London, UK",
    shipmentType: "My Packaging",
    insuranceLiability: "£5,000",
    codeCharges: { basePrice: "£100.00", vat: "£20.00", total: "£120.00" },
    auditCharges: "-",
  },
  {
    id: "XPA-456GD",
    type: "truck",
    status: "Delivered",
    tags: [
      { text: "Delivered", type: "success" }
    ],
    bookedInPaymentStatus: { date: "May 12, 2025", time: "02:20 PM", account: "ACC-11223" },
    collectionOn: "May 12, 2025",
    piecesWeightDim: "1 / 5kg / 5kg",
    destination: "Washington, DC",
    shipmentType: "Your Packaging",
    insuranceLiability: "-",
    codeCharges: { basePrice: "£50.00", total: "£50.00" },
    auditCharges: "-",
  }
];

const additionalMockData: TrackingData[] = Array.from({ length: 17 }).map((_, i) => ({
  id: `GEN-${1000 + i}`,
  carrierReference: `DHL-${9000 + i}`,
  type: i % 3 === 0 ? "ship" : "truck",
  status: i % 4 === 0 ? "Delivered" : i % 3 === 0 ? "Booked In" : "In Transit",
  tags: [
    { text: i % 4 === 0 ? "Delivered" : i % 3 === 0 ? "Booked In" : "In Transit", type: (i % 4 === 0 ? "success" : "info") as TagType }
  ],
  bookedInPaymentStatus: i % 3 === 0 ? { date: "May 20, 2025", time: "08:00 AM", account: "ACC-10001" } : i % 3 === 1 ? { date: "May 21, 2025", time: "01:30 PM", account: "ACC-10002" } : { date: "May 22, 2025", time: "04:45 PM", account: "ACC-10003" },
  collectionOn: `May ${10 + (i % 20)}, 2025`,
  piecesWeightDim: `${(i % 5) + 1} / ${(i * 2) + 15}kg / ${(i * 2) + 20}kg`,
  destination: i % 2 === 0 ? "Berlin, Germany" : "Paris, France",
  shipmentType: i % 3 === 0 ? "Your Packaging" : i % 3 === 1 ? "Pallet" : "My Packaging",
  insuranceLiability: i % 2 === 0 ? `£${(i + 1) * 500}` : "-",
  codeCharges: i % 3 === 0 
    ? { basePrice: `£${30 + i}.00`, fuel: "£5.00", vat: "£7.00", total: `£${42 + i}.00` } 
    : i % 2 === 0 
      ? { basePrice: `£${20 + i}.00`, total: `£${20 + i}.00` } 
      : { basePrice: `£${50 + i}.00`, vat: `£${10 + i}.00`, total: `£${60 + i}.00` },
  auditCharges: i % 4 === 0 ? {
    weight: `${15 + i}kg`,
    dimensions: `${10 + i}x${15 + i}x${20 + i}cm`,
    basePrice: `£${40 + i}.00`,
    surcharge: "£5.00",
    total: `£${45 + i}.00`
  } : i % 4 === 1 ? {
    weight: `${5 + i}kg`,
    basePrice: `£${25 + i}.00`,
    fuel: "£3.00",
    nonStackable: "£10.00",
    total: `£${38 + i}.00`
  } : i % 4 === 2 ? {
    basePrice: `£${50 + i}.00`,
    temporaryCharge: "£5.00",
    total: `£${55 + i}.00`
  } : "-",
}));

const fullMockData = [...mockTrackingData, ...additionalMockData];

export function TrackingHistoryList() {
  const [selectedTracking, setSelectedTracking] = useState<TrackingData | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  const filteredData = filterStatus === "All" 
    ? fullMockData 
    : fullMockData.filter(d => d.status === filterStatus);

  const totalPages = Math.max(1, Math.ceil(filteredData.length / itemsPerPage));
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleFilterChange = (status: string) => {
    setFilterStatus(filterStatus === status ? "All" : status);
    setCurrentPage(1);
  };

  return (
    <>
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 flex gap-4 w-max z-10">
        <div 
          onClick={() => handleFilterChange("Booked In")}
          className={`px-8 py-3 rounded-xl border flex flex-col justify-center items-center min-w-[150px] md:min-w-[180px] cursor-pointer hover:shadow-lg transition-all ${filterStatus === "Booked In" ? "bg-blue-600 border-blue-700 shadow-lg scale-105" : "bg-blue-100 border-blue-200 hover:bg-blue-200 shadow-sm"}`}
        >
          <span className={`font-semibold text-[11px] uppercase tracking-wider ${filterStatus === "Booked In" ? "text-blue-100" : "text-blue-700"}`}>Booked In</span>
          <span className={`text-2xl font-bold mt-1 ${filterStatus === "Booked In" ? "text-white" : "text-blue-900"}`}>{fullMockData.filter(d => d.status === "Booked In").length}</span>
        </div>
        <div 
          onClick={() => handleFilterChange("Delivered")}
          className={`px-8 py-3 rounded-xl border flex flex-col justify-center items-center min-w-[150px] md:min-w-[180px] cursor-pointer hover:shadow-lg transition-all ${filterStatus === "Delivered" ? "bg-green-600 border-green-700 shadow-lg scale-105" : "bg-green-100 border-green-200 hover:bg-green-200 shadow-sm"}`}
        >
          <span className={`font-semibold text-[11px] uppercase tracking-wider ${filterStatus === "Delivered" ? "text-green-100" : "text-green-700"}`}>Delivered</span>
          <span className={`text-2xl font-bold mt-1 ${filterStatus === "Delivered" ? "text-white" : "text-green-900"}`}>{fullMockData.filter(d => d.status === "Delivered").length}</span>
        </div>
        <div 
          onClick={() => handleFilterChange("In Transit")}
          className={`px-8 py-3 rounded-xl border flex flex-col justify-center items-center min-w-[150px] md:min-w-[180px] cursor-pointer hover:shadow-lg transition-all ${filterStatus === "In Transit" ? "bg-orange-500 border-orange-600 shadow-lg scale-105" : "bg-orange-100 border-orange-200 hover:bg-orange-200 shadow-sm"}`}
        >
          <span className={`font-semibold text-[11px] uppercase tracking-wider ${filterStatus === "In Transit" ? "text-orange-50" : "text-orange-700"}`}>In Transit</span>
          <span className={`text-2xl font-bold mt-1 ${filterStatus === "In Transit" ? "text-white" : "text-orange-900"}`}>{fullMockData.filter(d => d.status === "In Transit").length}</span>
        </div>
        <div 
          onClick={() => handleFilterChange("Exceptions")}
          className={`px-8 py-3 rounded-xl border flex flex-col justify-center items-center min-w-[150px] md:min-w-[180px] cursor-pointer hover:shadow-lg transition-all ${filterStatus === "Exceptions" ? "bg-red-600 border-red-700 shadow-lg scale-105" : "bg-red-100 border-red-200 hover:bg-red-200 shadow-sm"}`}
        >
          <span className={`font-semibold text-[11px] uppercase tracking-wider ${filterStatus === "Exceptions" ? "text-red-100" : "text-red-700"}`}>Exceptions</span>
          <span className={`text-2xl font-bold mt-1 ${filterStatus === "Exceptions" ? "text-white" : "text-red-900"}`}>{fullMockData.filter(d => d.status === "Exceptions").length}</span>
        </div>
        <div 
          onClick={() => handleFilterChange("Voided")}
          className={`px-8 py-3 rounded-xl border flex flex-col justify-center items-center min-w-[150px] md:min-w-[180px] cursor-pointer hover:shadow-lg transition-all ${filterStatus === "Voided" ? "bg-gray-700 border-gray-800 shadow-lg scale-105" : "bg-gray-100 border-gray-200 hover:bg-gray-200 shadow-sm"}`}
        >
          <span className={`font-semibold text-[11px] uppercase tracking-wider ${filterStatus === "Voided" ? "text-gray-200" : "text-gray-700"}`}>Voided</span>
          <span className={`text-2xl font-bold mt-1 ${filterStatus === "Voided" ? "text-white" : "text-gray-900"}`}>{fullMockData.filter(d => d.status === "Voided").length}</span>
        </div>
      </div>
      <div className="flex flex-col gap-3 w-full animate-in fade-in duration-500 mt-16 overflow-x-auto custom-scrollbar pb-4">
        <div className="min-w-[1600px]">
          {/* Table Header */}
          <div className="grid grid-cols-[1.5fr_1fr_1fr_1fr_1.4fr_1.4fr_0.8fr_1fr_1.3fr_1.3fr] w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 mb-3 text-xs font-bold text-gray-500 uppercase tracking-wider items-center divide-x divide-gray-200">
            <div className="px-3">Tracking / Carrier / Invoice</div>
            <div className="px-3 flex flex-col">
              <span>Booked In</span>
              <span>Payment Status</span>
            </div>
            <div className="px-3">Tracking Status</div>
            <div className="px-3">Collection On</div>
            <div className="px-3 flex flex-col">
              <span>Pieces / Weight</span>
              <span>DIM Weight</span>
            </div>
            <div className="px-3">Destination</div>
            <div className="px-3">Type</div>
            <div className="px-3">Enhanced Liability</div>
            <div className="px-3">Quoted Charges</div>
            <div className="px-3">Audit Charges</div>
          </div>

          {/* Table Rows (Cards) */}
          <div className="flex flex-col gap-3">
            {paginatedData.map((data) => (
              <TrackingCard 
                key={data.id} 
                data={data} 
                onClick={() => setSelectedTracking(data)} 
              />
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-6 px-4 bg-white py-4 rounded-xl border border-gray-200 shadow-sm">
              <span className="text-sm text-gray-500 font-medium">
                Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length} entries
              </span>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1.5 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold transition-colors ${currentPage === page ? "bg-[#081b4c] text-white" : "text-gray-600 hover:bg-gray-100"}`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                <button 
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1.5 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      {selectedTracking && (
        <TrackingDetailsModal 
          data={selectedTracking} 
          onClose={() => setSelectedTracking(null)} 
        />
      )}
    </>
  );
}
