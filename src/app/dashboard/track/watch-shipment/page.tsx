"use client";

import React, { useState, useMemo } from 'react';
import { WatchShipmentFilter } from '@/components/dashboard/track/watch-shipment/WatchShipmentFilter';
import { WatchShipmentTable, TrackingWatchItem } from '@/components/dashboard/track/watch-shipment/WatchShipmentTable';
import { Pagination } from '@/components/common/Pagination';

const mockData: TrackingWatchItem[] = [
  {
    id: "1",
    trackingNumber: "NYP-234GA",
    carrier: "DHL Express",
    reference: "REF-001",
    invoiceNumber: "INV-2024-001",
    bookedIn: "2024-03-20",
    payment: "Account",
    status: "Active",
    type: "Export",
    pieces: 2,
    weight: "15.0 kg",
    dimWeight: "16.5 kg",
    destination: "United States (US)",
    collectionOn: "2024-03-21",
    enhancedLiability: "Yes",
    quotedCharges: "£85.00",
    auditedCharges: "£85.00",
    trackingStatus: "In Transit"
  },
  {
    id: "2",
    trackingNumber: "NDY-304CD",
    carrier: "FedEx",
    reference: "REF-002",
    invoiceNumber: "INV-2024-002",
    bookedIn: "2024-03-18",
    payment: "Paid",
    status: "Active",
    type: "Import",
    pieces: 1,
    weight: "5.0 kg",
    dimWeight: "5.0 kg",
    destination: "United Kingdom (UK)",
    collectionOn: "2024-03-19",
    enhancedLiability: "No",
    quotedCharges: "£35.00",
    auditedCharges: "£35.00",
    trackingStatus: "Delivered"
  },
  {
    id: "3",
    trackingNumber: "NYI-708AG",
    carrier: "UPS",
    reference: "REF-003",
    invoiceNumber: "",
    bookedIn: "2024-03-25",
    payment: "Pending",
    status: "Active",
    type: "Export",
    pieces: 5,
    weight: "50.0 kg",
    dimWeight: "60.0 kg",
    destination: "Germany (DE)",
    collectionOn: "2024-03-26",
    enhancedLiability: "Yes",
    quotedCharges: "£150.00",
    auditedCharges: "--",
    trackingStatus: "Pending"
  },
  {
    id: "4",
    trackingNumber: "DSY-901ER",
    carrier: "Royal Mail",
    reference: "CUST-X99",
    invoiceNumber: "INV-2024-004",
    bookedIn: "2024-03-15",
    payment: "Paid",
    status: "Archived",
    type: "Domestic",
    pieces: 1,
    weight: "1.2 kg",
    dimWeight: "1.5 kg",
    destination: "London (UK)",
    collectionOn: "2024-03-16",
    enhancedLiability: "No",
    quotedCharges: "£8.50",
    auditedCharges: "£8.50",
    trackingStatus: "Delivered"
  }
];

export default function WatchShipmentPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredData = useMemo(() => {
    return mockData.filter((item) => {
      // Date filtering
      if (fromDate && new Date(item.bookedIn) < new Date(fromDate)) return false;
      if (toDate && new Date(item.bookedIn) > new Date(toDate)) return false;

      // Search query filtering
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch = 
          item.trackingNumber.toLowerCase().includes(query) ||
          item.carrier.toLowerCase().includes(query) ||
          item.reference.toLowerCase().includes(query);
        
        if (!matchesSearch) return false;
      }

      return true;
    });
  }, [searchQuery, fromDate, toDate]);

  // Reset page to 1 when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, fromDate, toDate]);

  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const paginatedData = filteredData.slice(startIndex, endIndex);

  return (
    <div className="flex flex-col gap-8 max-w-[1600px] mx-auto w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 animate-in fade-in slide-in-from-top-4 duration-500">
        <div>
          <h1 className="text-3xl font-black text-[#0b215f] tracking-tight">Watch Shipment</h1>
          <p className="text-gray-500 mt-1 font-medium text-sm">Monitor and track all your ongoing and past shipments.</p>
        </div>
      </div>

      <WatchShipmentFilter 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        fromDate={fromDate}
        setFromDate={setFromDate}
        toDate={toDate}
        setToDate={setToDate}
      />

      <div className="flex flex-col">
        <WatchShipmentTable data={paginatedData} />
        {totalItems > 0 && (
          <div className="mt-4 bg-white rounded-2xl shadow-sm border border-gray-100">
            <Pagination 
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={totalItems}
              startItem={startIndex + 1}
              endItem={endIndex}
              itemName="shipments"
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </div>
    </div>
  );
}
