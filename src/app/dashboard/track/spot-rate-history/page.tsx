"use client";

import React, { useState, useMemo } from 'react';
import { WatchShipmentFilter } from '@/components/dashboard/track/watch-shipment/WatchShipmentFilter';
import { WatchShipmentTable, TrackingWatchItem } from '@/components/dashboard/track/watch-shipment/WatchShipmentTable';

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

  return (
    <div className="flex flex-col gap-8 max-w-[1600px] mx-auto w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 animate-in fade-in slide-in-from-top-4 duration-500">
        <div>
          <h1 className="text-3xl font-black text-[#0b215f] tracking-tight">Spot Rate / Freight History</h1>
          <p className="text-gray-500 mt-1 font-medium text-sm">Review your past and current spot rate freight shipments.</p>
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

      <WatchShipmentTable data={filteredData} />
    </div>
  );
}
