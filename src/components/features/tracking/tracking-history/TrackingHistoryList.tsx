"use client";

import React, { useState } from 'react';
import { TrackingCard, TrackingData } from '@/components/features/tracking/tracking-history/TrackingCard';
import { TrackingDetailsModal } from '@/components/features/tracking/tracking-history/TrackingDetailsModal';

const mockTrackingData: TrackingData[] = [
  {
    id: "NYP-2540A",
    type: "ship",
    status: "In Transit",
    tags: [
      { text: "In Transit", type: "info" },
      { text: "Clearance in progress", type: "error" }
    ],
    eta: "May 29, 2025 10:30 AM",
    checkpoints: [
      {
        title: "Order Confirmed",
        date: "May 20, 2025 09:15 AM",
        location: "New York, USA",
        status: "completed"
      },
      {
        title: "Customs Clearance",
        date: "May 23, 2025 02:45 PM",
        location: "JFK Airport, New York",
        status: "in_progress"
      },
      {
        title: "Inland Transfer",
        date: null,
        location: null,
        status: "pending"
      },
      {
        title: "Out for Delivery",
        date: null,
        location: null,
        status: "pending"
      }
    ]
  },
  {
    id: "MDY-304CD",
    type: "plane",
    status: "Exceptions",
    tags: [
      { text: "In Transit", type: "info" },
      { text: "Delayed", type: "error" }
    ],
    eta: "Jun 02, 2025 05:00 PM",
    checkpoints: [
      {
        title: "Order Confirmed",
        date: "May 18, 2025 10:20 AM",
        location: "Miami, USA",
        status: "completed"
      },
      {
        title: "In Transit",
        date: "May 20, 2025 11:30 AM",
        location: "Miami, USA",
        status: "completed"
      },
      {
        title: "Arrived at Destination",
        date: "May 24, 2025 08:10 AM",
        location: "Madrid, Spain",
        status: "in_progress"
      },
      {
        title: "Out for Delivery",
        date: null,
        location: null,
        status: "pending"
      }
    ]
  },
  {
    id: "DSY-901ER",
    type: "ship",
    status: "Booked In",
    tags: [
      { text: "Booked In", type: "info" }
    ],
    eta: "Jun 10, 2025 09:00 AM",
    checkpoints: [
      {
        title: "Order Confirmed",
        date: "Jun 01, 2025 08:00 AM",
        location: "London, UK",
        status: "completed"
      },
      {
        title: "Customs Clearance",
        date: null,
        location: null,
        status: "pending"
      },
      {
        title: "Inland Transfer",
        date: null,
        location: null,
        status: "pending"
      },
      {
        title: "Out for Delivery",
        date: null,
        location: null,
        status: "pending"
      }
    ]
  },
  {
    id: "XPA-456GD",
    type: "truck",
    status: "Delivered",
    tags: [
      { text: "Delivered", type: "success" }
    ],
    eta: "May 15, 2025 04:00 PM",
    checkpoints: [
      {
        title: "Order Confirmed",
        date: "May 14, 2025 06:00 AM",
        location: "New York, USA",
        status: "completed"
      },
      {
        title: "In Transit",
        date: "May 14, 2025 09:00 AM",
        location: "Philadelphia, PA",
        status: "completed"
      },
      {
        title: "Arrived at Destination",
        date: "May 15, 2025 10:00 AM",
        location: "Baltimore, MD",
        status: "completed"
      },
      {
        title: "Out for Delivery",
        date: "May 15, 2025 04:00 PM",
        location: "Washington, DC",
        status: "completed"
      }
    ]
  }
];

export function TrackingHistoryList() {
  const [selectedTracking, setSelectedTracking] = useState<TrackingData | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("All");

  const filteredData = filterStatus === "All" 
    ? mockTrackingData 
    : mockTrackingData.filter(d => d.status === filterStatus);

  return (
    <>
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 flex gap-4 w-max z-10">
        <div 
          onClick={() => setFilterStatus(filterStatus === "Booked In" ? "All" : "Booked In")}
          className={`px-8 py-3 rounded-xl border flex flex-col justify-center items-center min-w-[150px] md:min-w-[180px] cursor-pointer hover:shadow-lg transition-all ${filterStatus === "Booked In" ? "bg-blue-600 border-blue-700 shadow-lg scale-105" : "bg-blue-50 border-blue-100 hover:bg-blue-100 shadow-sm"}`}
        >
          <span className={`font-semibold text-[11px] uppercase tracking-wider ${filterStatus === "Booked In" ? "text-blue-100" : "text-blue-700"}`}>Booked In</span>
          <span className={`text-2xl font-bold mt-1 ${filterStatus === "Booked In" ? "text-white" : "text-blue-900"}`}>1</span>
        </div>
        <div 
          onClick={() => setFilterStatus(filterStatus === "Delivered" ? "All" : "Delivered")}
          className={`px-8 py-3 rounded-xl border flex flex-col justify-center items-center min-w-[150px] md:min-w-[180px] cursor-pointer hover:shadow-lg transition-all ${filterStatus === "Delivered" ? "bg-green-600 border-green-700 shadow-lg scale-105" : "bg-green-50 border-green-100 hover:bg-green-100 shadow-sm"}`}
        >
          <span className={`font-semibold text-[11px] uppercase tracking-wider ${filterStatus === "Delivered" ? "text-green-100" : "text-green-700"}`}>Delivered</span>
          <span className={`text-2xl font-bold mt-1 ${filterStatus === "Delivered" ? "text-white" : "text-green-900"}`}>1</span>
        </div>
        <div 
          onClick={() => setFilterStatus(filterStatus === "In Transit" ? "All" : "In Transit")}
          className={`px-8 py-3 rounded-xl border flex flex-col justify-center items-center min-w-[150px] md:min-w-[180px] cursor-pointer hover:shadow-lg transition-all ${filterStatus === "In Transit" ? "bg-orange-500 border-orange-600 shadow-lg scale-105" : "bg-orange-50 border-orange-100 hover:bg-orange-100 shadow-sm"}`}
        >
          <span className={`font-semibold text-[11px] uppercase tracking-wider ${filterStatus === "In Transit" ? "text-orange-50" : "text-orange-700"}`}>In Transit</span>
          <span className={`text-2xl font-bold mt-1 ${filterStatus === "In Transit" ? "text-white" : "text-orange-900"}`}>1</span>
        </div>
        <div 
          onClick={() => setFilterStatus(filterStatus === "Exceptions" ? "All" : "Exceptions")}
          className={`px-8 py-3 rounded-xl border flex flex-col justify-center items-center min-w-[150px] md:min-w-[180px] cursor-pointer hover:shadow-lg transition-all ${filterStatus === "Exceptions" ? "bg-red-600 border-red-700 shadow-lg scale-105" : "bg-red-50 border-red-100 hover:bg-red-100 shadow-sm"}`}
        >
          <span className={`font-semibold text-[11px] uppercase tracking-wider ${filterStatus === "Exceptions" ? "text-red-100" : "text-red-700"}`}>Exceptions</span>
          <span className={`text-2xl font-bold mt-1 ${filterStatus === "Exceptions" ? "text-white" : "text-red-900"}`}>1</span>
        </div>
        <div 
          onClick={() => setFilterStatus(filterStatus === "Voided" ? "All" : "Voided")}
          className={`px-8 py-3 rounded-xl border flex flex-col justify-center items-center min-w-[150px] md:min-w-[180px] cursor-pointer hover:shadow-lg transition-all ${filterStatus === "Voided" ? "bg-gray-700 border-gray-800 shadow-lg scale-105" : "bg-gray-50 border-gray-200 hover:bg-gray-100 shadow-sm"}`}
        >
          <span className={`font-semibold text-[11px] uppercase tracking-wider ${filterStatus === "Voided" ? "text-gray-200" : "text-gray-700"}`}>Voided</span>
          <span className={`text-2xl font-bold mt-1 ${filterStatus === "Voided" ? "text-white" : "text-gray-900"}`}>1</span>
        </div>
      </div>
      <div className="flex items-center justify-center gap-8 mt-20 mb-2">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />
          <span className="text-[11px] font-bold text-gray-500">Completed</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full border-[2.5px] border-blue-600 bg-white" />
          <span className="text-[11px] font-bold text-gray-500">In Progress</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full border-[2.5px] border-gray-300 bg-white" />
          <span className="text-[11px] font-bold text-gray-500">Pending</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-red-600" />
          <span className="text-[11px] font-bold text-gray-500">Delayed</span>
        </div>
      </div>

      <div className="flex flex-col gap-6 w-full animate-in fade-in duration-500 mt-4">
        {filteredData.map((data) => (
          <TrackingCard 
            key={data.id} 
            data={data} 
            onClick={() => setSelectedTracking(data)} 
          />
        ))}
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
