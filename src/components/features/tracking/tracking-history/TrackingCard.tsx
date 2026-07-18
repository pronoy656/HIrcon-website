import React from 'react';
import { Ship, Truck, Plane, MapPin, Calendar, MoreVertical, AlertCircle, CheckCircle, Navigation, Info } from 'lucide-react';
import clsx from 'clsx';

export type TagType = 'info' | 'error' | 'success' | 'warning';

export type Tag = {
  text: string;
  type: TagType;
};

export type CheckpointStatus = 'completed' | 'in_progress' | 'pending' | 'delayed';

export type Checkpoint = {
  title: string;
  date: string | null;
  location: string | null;
  status: CheckpointStatus;
};

export type TrackingData = {
  id: string;
  type: 'ship' | 'truck' | 'plane';
  status?: string;
  tags: Tag[];
  eta: string;
  checkpoints: Checkpoint[];
};

interface TrackingCardProps {
  data: TrackingData;
  onClick?: () => void;
}

const getTransportIcon = (type: TrackingData['type'], className?: string) => {
  switch (type) {
    case 'ship': return <Ship className={className || "w-6 h-6 text-white"} />;
    case 'truck': return <Truck className={className || "w-6 h-6 text-white"} />;
    case 'plane': return <Plane className={className || "w-6 h-6 text-white"} />;
  }
};

export function TrackingCard({ data, onClick }: TrackingCardProps) {
  // Determine if there is a delayed status anywhere
  const hasDelayed = data.checkpoints.some(cp => cp.status === 'delayed');

  return (
    <div 
      onClick={onClick}
      className={clsx(
        "w-full bg-white border border-gray-100 rounded-xl p-8 flex flex-col xl:flex-row gap-8 relative shadow-[0_2px_10px_rgba(0,0,0,0.02)] transition-shadow",
        onClick ? "cursor-pointer hover:shadow-lg hover:border-gray-200" : ""
      )}
    >
      {/* 3-Dot Menu */}
      <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 p-2">
        <MoreVertical className="w-5 h-5" />
      </button>

      {/* Left Column: Details */}
      <div className="flex flex-col gap-4 w-full xl:w-[280px] flex-shrink-0">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-[#081b4c] rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
            {getTransportIcon(data.type)}
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-xs text-gray-500 font-medium">Shipment ID</span>
            <span className="text-[22px] font-black text-[#081b4c] leading-none tracking-tight">{data.id}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2.5 mt-2">
          {data.tags.map((tag, idx) => (
            <div 
              key={idx} 
              className={clsx(
                "px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 w-fit border",
                tag.type === 'info' && "bg-blue-50/50 text-[#0f52ba] border-blue-100",
                tag.type === 'error' && "bg-red-50/50 text-red-600 border-red-100",
                tag.type === 'warning' && "bg-orange-50/50 text-orange-600 border-orange-100",
                tag.type === 'success' && "bg-green-50/50 text-green-700 border-green-100"
              )}
            >
              {tag.type === 'info' && <Truck className="w-3.5 h-3.5" />}
              {tag.type === 'error' && <AlertCircle className="w-3.5 h-3.5" />}
              {tag.type === 'warning' && <Info className="w-3.5 h-3.5" />}
              {tag.type === 'success' && <CheckCircle className="w-3.5 h-3.5" />}
              {tag.text}
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 mt-2 text-xs font-semibold text-gray-500">
          <Calendar className="w-4 h-4 text-gray-400" />
          ETA: {data.eta}
        </div>
      </div>

      {/* Right Column: Horizontal Timeline */}
      <div className="flex-1 flex flex-col justify-center py-4 xl:py-0 w-full overflow-x-auto custom-scrollbar">
        <div className="relative flex items-start w-full min-w-[700px] px-4 xl:px-8 pt-6 pb-2">
          
          {/* Background Connecting Line */}
          <div className="absolute top-[38px] left-[12.5%] right-[12.5%] h-[2px] bg-gray-200 border-t-2 border-dashed border-gray-300 -z-10" />
          
          {/* Active Connecting Lines */}
          {data.checkpoints.map((cp, idx) => {
            if (idx === data.checkpoints.length - 1) return null;
            const nextCp = data.checkpoints[idx + 1];
            const isCompleted = cp.status === 'completed' && (nextCp.status === 'completed' || nextCp.status === 'in_progress');
            
            if (isCompleted) {
              return (
                <div 
                  key={`line-${idx}`}
                  className="absolute top-[38px] h-[3px] bg-blue-600 z-0" 
                  style={{ 
                    left: `${(idx + 0.5) * (100 / data.checkpoints.length)}%`,
                    width: `${100 / data.checkpoints.length}%`
                  }}
                />
              );
            }
            return null;
          })}

          {data.checkpoints.map((cp, idx) => {
            return (
              <div key={idx} className="relative flex-1 flex flex-col items-center">
                
                {/* Node Icon */}
                <div className="relative z-10 flex items-center justify-center h-12 mb-4 bg-white px-2">
                  {cp.status === 'in_progress' ? (
                    <div className="w-10 h-10 bg-[#081b4c] rounded-full shadow-md flex items-center justify-center border-4 border-white ring-1 ring-gray-100">
                      {getTransportIcon(data.type, "w-5 h-5 text-white")}
                    </div>
                  ) : cp.status === 'completed' ? (
                    <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center ring-4 ring-white">
                      <CheckCircle className="w-3.5 h-3.5 text-white" />
                    </div>
                  ) : cp.status === 'delayed' ? (
                    <div className="w-5 h-5 bg-white border-2 border-red-500 rounded-full ring-4 ring-white" />
                  ) : (
                    <div className="w-5 h-5 bg-white border-2 border-gray-300 rounded-full ring-4 ring-white" />
                  )}
                </div>

                {/* Details under Node */}
                <div className="flex flex-col items-center text-center gap-2 w-full px-2">
                  <span className="text-[13px] font-extrabold text-[#081b4c] whitespace-normal">
                    {cp.title}
                  </span>
                  
                  <div className="flex flex-col items-center gap-1.5">
                    <div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-500 font-medium whitespace-nowrap">
                      <Calendar className="w-3.5 h-3.5 flex-shrink-0" />
                      {cp.date ? cp.date : <span className="text-gray-400">-</span>}
                    </div>
                    <div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-500 font-medium whitespace-nowrap">
                      <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                      {cp.location ? cp.location : <span className="text-gray-400">Pending</span>}
                    </div>
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
