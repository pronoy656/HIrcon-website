"use client";

import React, { useState } from 'react';
import { TrackingFilters, TrackingActions } from '@/components/features/tracking/tracking-history/TrackingFilterBar';
import { TrackingHistoryList } from '@/components/features/tracking/tracking-history/TrackingHistoryList';
import { TrackingDetailsModal } from '@/components/features/tracking/tracking-history/TrackingDetailsModal';
import { TrackingData } from '@/components/features/tracking/tracking-history/TrackingCard';

export function TrackingHistoryClient() {
  const [selectedTracking, setSelectedTracking] = useState<TrackingData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleTrackingAndPodClick = () => {
    if (selectedTracking) {
      setIsModalOpen(true);
    }
  };

  return (
    <div className="w-full flex flex-col gap-6 overflow-x-auto pb-4">
      {/* Title and Filters row */}
      <div className="flex flex-col md:flex-row justify-start items-start md:items-center gap-4 md:gap-6 lg:gap-8">
        <div className="shrink-0">
          <h1 className="text-2xl lg:text-xl font-bold text-white mb-1 lg:mb-2 tracking-tight">Tracking History</h1>
          <p className="text-sm lg:text-base text-sm text-blue-100 font-medium">Monitor your active and past shipments.</p>
        </div>
        <div className="flex-1 min-w-0 w-full">
          <TrackingFilters />
        </div>
      </div>

      {/* Actions row */}
      <div className="mt-2">
        <TrackingActions 
          onTrackingAndPodClick={handleTrackingAndPodClick} 
          hasSelectedTracking={!!selectedTracking}
        />
      </div>
      
      {/* White section with overlapping centered cards */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mt-12 relative pt-16">
        <TrackingHistoryList 
          selectedTracking={selectedTracking}
          onSelectTracking={setSelectedTracking}
        />
      </div>

      {isModalOpen && selectedTracking && (
        <TrackingDetailsModal 
          data={selectedTracking} 
          onClose={() => setIsModalOpen(false)} 
        />
      )}
    </div>
  );
}
