import React from 'react';
import { Ship, Truck, Plane, MapPin, Clock, MoreVertical, AlertCircle, CheckCircle, Navigation } from 'lucide-react';
import clsx from 'clsx';

export type TrackingStatus = 'In transit' | 'Preparing for departure' | 'Delivered';
export type TagType = 'info' | 'error' | 'success';

export type Tag = {
  text: string;
  type: TagType;
};

export type Checkpoint = {
  location: string;
  sublines: { label: string; value: string }[];
  isCompleted: boolean;
  isCurrent: boolean;
};

export type TrackingData = {
  id: string;
  type: 'ship' | 'truck' | 'plane';
  tags: Tag[];
  lastUpdate: string;
  checkpoints: Checkpoint[];
};

interface TrackingCardProps {
  data: TrackingData;
  onClick?: () => void;
}

const getTransportIcon = (type: TrackingData['type']) => {
  switch (type) {
    case 'ship': return <Ship className="w-5 h-5 text-white" />;
    case 'truck': return <Truck className="w-5 h-5 text-white" />;
    case 'plane': return <Plane className="w-5 h-5 text-white" />;
  }
};

const getTransportIconSmall = (type: TrackingData['type'], className?: string) => {
  switch (type) {
    case 'ship': return <Ship className={className} />;
    case 'truck': return <Truck className={className} />;
    case 'plane': return <Plane className={className} />;
  }
};

export function TrackingCard({ data, onClick }: TrackingCardProps) {
  // Find index of current checkpoint to determine line fills
  const currentIndex = data.checkpoints.findIndex(cp => cp.isCurrent);
  
  return (
    <div 
      onClick={onClick}
      className={clsx(
        "min-w-[1100px] bg-white border border-gray-200 rounded-xl p-6 flex flex-col md:flex-row gap-8 relative overflow-visible transition-shadow",
        onClick ? "cursor-pointer hover:shadow-lg hover:border-[#0b215f]/30" : "hover:shadow-md"
      )}
    >
      {/* 3-Dot Menu */}
      <button className="absolute top-6 right-4 text-gray-400 hover:text-gray-700">
        <MoreVertical className="w-5 h-5" />
      </button>

      {/* Left Column: Details */}
      <div className="flex flex-col gap-4 w-full md:w-[280px] flex-shrink-0">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-[#0b215f] rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
            {getTransportIcon(data.type)}
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 font-medium">Shipping ID</span>
            <span className="text-lg font-bold text-gray-900 leading-tight">{data.id}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-2">
          {data.tags.map((tag, idx) => (
            <div 
              key={idx} 
              className={clsx(
                "px-2.5 py-1 rounded-md text-[11px] font-bold flex items-center gap-1.5",
                tag.type === 'info' && "bg-blue-50 text-[#0b215f]",
                tag.type === 'error' && "bg-red-50 text-red-600",
                tag.type === 'success' && "bg-green-50 text-green-700"
              )}
            >
              {tag.type === 'info' && <Navigation className="w-3 h-3" />}
              {tag.type === 'error' && <AlertCircle className="w-3 h-3" />}
              {tag.type === 'success' && <CheckCircle className="w-3 h-3" />}
              {tag.text}
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 mt-auto text-xs font-bold text-gray-700 bg-gray-50 py-1.5 px-3 rounded-lg w-fit">
          <Clock className="w-3.5 h-3.5 text-gray-500" />
          {data.lastUpdate}
        </div>
      </div>

      {/* Right Column: Timeline */}
      <div className="flex-1 flex flex-col justify-center pt-12 md:pt-6 pr-8">
        <div className="relative flex items-start justify-between min-w-[750px] w-full h-[120px]">
          
          {/* Connecting Background Line */}
          <div className="absolute top-[11px] left-0 right-0 h-[3px] bg-red-100 rounded-full" />
          
          {/* Active Line Fill */}
          {currentIndex >= 0 && (
            <div 
              className="absolute top-[11px] left-0 h-[3px] bg-blue-600 transition-all duration-500 rounded-full" 
              style={{ width: `${(currentIndex / (data.checkpoints.length - 1)) * 100}%` }}
            />
          )}

          {data.checkpoints.map((cp, idx) => {
            const isPast = idx < currentIndex;
            const isCurrent = idx === currentIndex;
            const isFuture = idx > currentIndex;

            return (
              <div key={idx} className="relative flex flex-col w-[120px] items-center -ml-[60px] first:ml-0 first:items-start last:items-end">
                
                {/* Node Icon */}
                <div className="relative z-10 bg-white p-1">
                  {isCurrent ? (
                    <div className="relative w-4 h-4 bg-[#0b215f] rounded-full border-[3px] border-white shadow-sm ring-1 ring-[#0b215f]/20 flex items-center justify-center">
                      {/* Floating Transport Icon for current node */}
                      <div className="absolute -top-8 bg-[#0b215f] text-white p-1.5 rounded-lg shadow-md animate-bounce">
                        {getTransportIconSmall(data.type, "w-4 h-4")}
                        {/* Down arrow triangle */}
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-[4px] border-transparent border-t-[#0b215f]" />
                      </div>
                    </div>
                  ) : isPast ? (
                    <div className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center border-2 border-white">
                      <div className="w-1.5 h-1.5 bg-white rounded-full" />
                    </div>
                  ) : (
                    <div className="w-4 h-4 bg-white border-[3px] border-red-200 rounded-full" />
                  )}
                </div>

                {/* Details under Node */}
                <div className={clsx(
                  "mt-4 flex flex-col gap-1.5 min-w-[140px]",
                  idx === 0 ? "text-left items-start" : idx === data.checkpoints.length - 1 ? "text-right items-end" : "text-center items-center"
                )}>
                  <span className="text-[13px] font-bold text-gray-900 leading-tight">
                    {cp.location}
                  </span>
                  
                  <div className={clsx(
                    "flex flex-col gap-0.5",
                    idx === 0 ? "items-start" : idx === data.checkpoints.length - 1 ? "items-end" : "items-center"
                  )}>
                    {cp.sublines.map((sub, sIdx) => (
                      <span key={sIdx} className="text-[10px] text-gray-500 whitespace-nowrap">
                        <span className="font-medium text-gray-400">{sub.label}</span> - <span className="font-semibold text-gray-600">{sub.value}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
