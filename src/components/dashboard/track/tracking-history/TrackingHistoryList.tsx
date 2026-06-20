"use client";

import React, { useState } from 'react';
import { TrackingCard, TrackingData } from './TrackingCard';
import { TrackingDetailsModal } from './TrackingDetailsModal';

const mockTrackingData: TrackingData[] = [
  {
    id: "NYP-234GA",
    type: "ship",
    tags: [
      { text: "In transit", type: "info" },
      { text: "2 hours late to pickup", type: "error" }
    ],
    lastUpdate: "03/29/2024 04:00 PM",
    checkpoints: [
      {
        location: "Port of NY and NJ",
        isCompleted: true,
        isCurrent: false,
        sublines: [
          { label: "Cargo ready", value: "03/18/2024 08:00 AM" },
          { label: "Departure", value: "03/18/2024 09:00 AM" }
        ]
      },
      {
        location: "Port of Baltimore, MD",
        isCompleted: true,
        isCurrent: true,
        sublines: [
          { label: "Est. arrival", value: "03/20/2024 02:00 PM" },
          { label: "Est. pick-up", value: "03/20/2024 08:30 PM" }
        ]
      },
      {
        location: "Port of Norfolk, VA",
        isCompleted: false,
        isCurrent: false,
        sublines: [
          { label: "Est. arrival", value: "03/23/2024 5:00 PM" },
          { label: "Est. pick-up", value: "03/23/2024 10:00 PM" }
        ]
      },
      {
        location: "Port of Charleston, SC",
        isCompleted: false,
        isCurrent: false,
        sublines: [
          { label: "Est. delivery", value: "03/29/2024 04:00 PM" }
        ]
      }
    ]
  },
  {
    id: "NDY-304CD",
    type: "truck",
    tags: [
      { text: "In transit", type: "info" },
      { text: "Weather delay", type: "error" }
    ],
    lastUpdate: "03/20/2024 03:00 PM",
    checkpoints: [
      {
        location: "Albany, NY",
        isCompleted: true,
        isCurrent: false,
        sublines: [
          { label: "Cargo ready", value: "03/16/2024 05:00 AM" },
          { label: "Departure", value: "03/16/2024 08:00 AM" }
        ]
      },
      {
        location: "Syracuse, NY",
        isCompleted: true,
        isCurrent: false,
        sublines: [
          { label: "Delivered", value: "03/17/2024 02:00 PM" },
          { label: "Departed", value: "03/18/2024 10:00 AM" }
        ]
      },
      {
        location: "Rochester, NY",
        isCompleted: false,
        isCurrent: true,
        sublines: [
          { label: "Est. delivery", value: "03/20/2024 03:00 PM" }
        ]
      }
    ]
  },
  {
    id: "NYI-708AG",
    type: "plane",
    tags: [
      { text: "In transit", type: "info" },
      { text: "On time to delivery", type: "success" }
    ],
    lastUpdate: "03/17/2024 11:00 AM",
    checkpoints: [
      {
        location: "ALB, NY",
        isCompleted: true,
        isCurrent: false,
        sublines: [
          { label: "Cargo ready", value: "03/16/2024 11:00 AM" },
          { label: "Departure", value: "03/16/2024 09:00 PM" }
        ]
      },
      {
        location: "CLT, NC",
        isCompleted: true,
        isCurrent: true,
        sublines: [
          { label: "Est. arrival", value: "03/17/2024 01:00 AM" },
          { label: "Est. pick-up", value: "03/17/2024 07:00 AM" }
        ]
      },
      {
        location: "ATL, GA",
        isCompleted: false,
        isCurrent: false,
        sublines: [
          { label: "Est. delivery", value: "03/17/2024 11:00 AM" }
        ]
      }
    ]
  },
  {
    id: "DSY-901ER",
    type: "ship",
    tags: [
      { text: "Preparing for departure", type: "info" }
    ],
    lastUpdate: "03/17/2024 11:00 AM",
    checkpoints: [
      {
        location: "Port of NY and NJ",
        isCompleted: false,
        isCurrent: true,
        sublines: [
          { label: "Cargo ready", value: "03/18/2024 08:00 AM" },
          { label: "Departure", value: "03/18/2024 09:00 AM" }
        ]
      },
      {
        location: "Port of Savannah, GA",
        isCompleted: false,
        isCurrent: false,
        sublines: [
          { label: "Est. arrival", value: "03/20/2024 02:00 PM" },
          { label: "Est. pick-up", value: "03/20/2024 08:30 PM" }
        ]
      },
      {
        location: "Port of Miami, FL",
        isCompleted: false,
        isCurrent: false,
        sublines: [
          { label: "Est. arrival", value: "03/23/2024 5:00 PM" },
          { label: "Est. pick-up", value: "03/23/2024 10:00 PM" }
        ]
      },
      {
        location: "Port of Jacksonville, FL",
        isCompleted: false,
        isCurrent: false,
        sublines: [
          { label: "Est. delivery", value: "03/29/2024 04:00 PM" }
        ]
      }
    ]
  },
  {
    id: "XPA-456GD",
    type: "truck",
    tags: [
      { text: "In transit", type: "info" }
    ],
    lastUpdate: "03/15/2024 08:00 AM",
    checkpoints: [
      {
        location: "New York, NY",
        isCompleted: true,
        isCurrent: false,
        sublines: [
          { label: "Departure", value: "03/14/2024 06:00 AM" }
        ]
      },
      {
        location: "Philadelphia, PA",
        isCompleted: true,
        isCurrent: false,
        sublines: [
          { label: "Arrival", value: "03/14/2024 09:00 AM" }
        ]
      },
      {
        location: "Baltimore, MD",
        isCompleted: true,
        isCurrent: true,
        sublines: [
          { label: "Est. departure", value: "03/15/2024 10:00 AM" }
        ]
      },
      {
        location: "Washington, DC",
        isCompleted: false,
        isCurrent: false,
        sublines: [
          { label: "Est. delivery", value: "03/15/2024 04:00 PM" }
        ]
      }
    ]
  }
];

export function TrackingHistoryList() {
  const [selectedTracking, setSelectedTracking] = useState<TrackingData | null>(null);

  return (
    <>
      <div className="flex flex-col gap-6 w-full animate-in fade-in duration-500">
        {mockTrackingData.map((data) => (
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
