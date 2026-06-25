"use client";

import React, { useState, useMemo } from 'react';
import { WatchShipmentFilter } from '@/components/features/tracking/watch-shipment/WatchShipmentFilter';
import { WatchShipmentTable, TrackingWatchItem } from '@/components/features/tracking/watch-shipment/WatchShipmentTable';
import { Pagination } from '@/components/ui/Pagination';

const mockData: TrackingWatchItem[] = [
  {
    id: "1",
    trackingNumber: "SPT-1002A",
    carrier: "Maersk",
    reference: "REF-SPOT-01",
    invoiceNumber: "INV-SPOT-001",
    bookedIn: "2024-04-10",
    payment: "Account",
    status: "Active",
    type: "Freight",
    pieces: 4,
    weight: "200.0 kg",
    dimWeight: "220.0 kg",
    destination: "New York (US)",
    collectionOn: "2024-04-12",
    enhancedLiability: "Yes",
    quotedCharges: "£450.00",
    auditedCharges: "£450.00",
    trackingStatus: "In Transit"
  },
  {
    id: "2",
    trackingNumber: "SPT-1003B",
    carrier: "Hapag-Lloyd",
    reference: "REF-SPOT-02",
    invoiceNumber: "INV-SPOT-002",
    bookedIn: "2024-04-15",
    payment: "Paid",
    status: "Active",
    type: "Freight",
    pieces: 10,
    weight: "1500.0 kg",
    dimWeight: "1600.0 kg",
    destination: "Hamburg (DE)",
    collectionOn: "2024-04-18",
    enhancedLiability: "No",
    quotedCharges: "£1250.00",
    auditedCharges: "£1250.00",
    trackingStatus: "Pending"
  }
];

export default function SpotRateHistoryPage() {
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
          <h1 className="text-3xl font-black text-white tracking-tight">Spot Rate / Freight History</h1>
          <p className="text-blue-100 mt-1 font-medium text-sm">Review your past and current spot rate freight shipments.</p>
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
