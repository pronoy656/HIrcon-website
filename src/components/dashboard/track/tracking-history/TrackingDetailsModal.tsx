import React from 'react';
import { X, Package, MapPin, Calendar, CheckCircle2, Clock, Truck, FileText, ArrowRight } from 'lucide-react';
import { TrackingData } from './TrackingCard';
import clsx from 'clsx';

interface TrackingDetailsModalProps {
  data: TrackingData;
  onClose: () => void;
}

export function TrackingDetailsModal({ data, onClose }: TrackingDetailsModalProps) {
  // Prevent clicks inside the modal from bubbling to the overlay
  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  // Mock tracking history data for the table
  const trackingHistory = [
    {
      date: '2026-06-18',
      time: '14:30',
      status: 'Delivered',
      location: 'New York, NY',
      notes: 'Signed by: J. Smith',
      isCurrent: true
    },
    {
      date: '2026-06-18',
      time: '08:15',
      status: 'Out for Delivery',
      location: 'New York, NY',
      notes: 'Package is with the courier'
    },
    {
      date: '2026-06-17',
      time: '22:45',
      status: 'In Transit',
      location: 'Newark Hub, NJ',
      notes: 'Departed sorting facility'
    },
    {
      date: '2026-06-16',
      time: '10:00',
      status: 'Collected',
      location: 'Los Angeles, CA',
      notes: 'Package picked up from sender'
    }
  ];

  // Pipeline stages
  const stages = [
    { label: 'Collected', isCompleted: true, isCurrent: false, colorClass: 'bg-cyan-500', textClass: 'text-cyan-600', ringClass: 'ring-cyan-500/20' },
    { label: 'In Transit', isCompleted: true, isCurrent: false, colorClass: 'bg-amber-500', textClass: 'text-amber-600', ringClass: 'ring-amber-500/20' },
    { label: 'Out for Delivery', isCompleted: true, isCurrent: false, colorClass: 'bg-purple-500', textClass: 'text-purple-600', ringClass: 'ring-purple-500/20' },
    { label: 'Delivered', isCompleted: true, isCurrent: true, colorClass: 'bg-emerald-500', textClass: 'text-emerald-600', ringClass: 'ring-emerald-500/20' }
  ];

  const currentStageIndex = stages.findIndex(s => s.isCurrent);

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-[#0b215f]/20 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col animate-in slide-in-from-bottom-8 duration-300"
        onClick={handleModalClick}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50/50">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#0b215f] text-white rounded-2xl flex items-center justify-center shadow-md">
              <Package className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">Tracking Details</p>
              <h2 className="text-2xl font-black text-gray-900 leading-tight">{data.id}</h2>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          
          {/* Progress Pipeline */}
          <div className="relative pt-6 pb-2">
            <div className="absolute top-[35px] left-[10%] right-[10%] h-1 bg-gray-100 rounded-full" />
            {currentStageIndex >= 0 && (
              <div 
                className={clsx("absolute top-[35px] left-[10%] h-1 rounded-full transition-all duration-500", stages[currentStageIndex].colorClass)}
                style={{ width: `${(currentStageIndex / (stages.length - 1)) * 80}%` }}
              />
            )}

            <div className="flex justify-between relative z-10 px-[5%]">
              {stages.map((stage, idx) => {
                const isPast = idx < currentStageIndex;
                const isCurrent = idx === currentStageIndex;
                
                return (
                  <div key={idx} className="flex flex-col items-center gap-3 w-32">
                    <div className={clsx(
                      "w-8 h-8 rounded-full flex items-center justify-center border-[3px] transition-colors",
                      isCurrent ? `${stage.colorClass} border-white shadow-md ring-4 ${stage.ringClass}` : 
                      isPast ? `${stage.colorClass} border-white` : 
                      "bg-white border-gray-200"
                    )}>
                      {isCurrent || isPast ? (
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      ) : (
                        <div className="w-2 h-2 bg-gray-200 rounded-full" />
                      )}
                    </div>
                    <span className={clsx(
                      "text-xs font-bold text-center",
                      isCurrent ? stage.textClass : isPast ? "text-gray-900" : "text-gray-400"
                    )}>
                      {stage.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Shipment Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="bg-gray-50/50 rounded-2xl p-4 border border-gray-100 flex flex-col justify-between lg:col-span-2">
              <span className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                <MapPin className="w-3 h-3" /> Route
              </span>
              
              <div className="flex items-center justify-between mt-1 gap-2">
                <div className="flex flex-col flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-900 truncate">Los Angeles, CA</p>
                  <p className="text-[10px] font-medium text-gray-500 mt-0.5 truncate">Started: 16 Jun 2026</p>
                </div>
                
                <div className="flex items-center justify-center flex-shrink-0 text-gray-300 px-1">
                  <ArrowRight className="w-4 h-4" />
                </div>

                <div className="flex flex-col flex-1 min-w-0 items-end text-right">
                  <p className="text-sm font-bold text-gray-900 truncate">New York, NY</p>
                  <p className="text-[10px] font-medium text-[#0b215f] mt-0.5 truncate">Est. Delivery: 19 Jun 2026</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50/50 rounded-2xl p-4 border border-gray-100">
              <span className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                <FileText className="w-3 h-3" /> References
              </span>
              <div className="space-y-2">
                <div>
                  <p className="text-[10px] text-gray-500 font-medium">Tracking Number</p>
                  <p className="text-sm font-bold text-gray-900 truncate">{data.id}</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 font-medium">Customer Ref</p>
                  <p className="text-sm font-bold text-gray-900 truncate">REF-98422</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50/50 rounded-2xl p-4 border border-gray-100">
              <span className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                <Truck className="w-3 h-3" /> Service
              </span>
              <div className="space-y-2">
                <div>
                  <p className="text-[10px] text-gray-500 font-medium">Brand</p>
                  <p className="text-sm font-bold text-[#0b215f] truncate">FedEx Express</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 font-medium">Weight</p>
                  <p className="text-sm font-bold text-gray-900 truncate">12.5 kg</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50/50 rounded-2xl p-4 border border-gray-100">
              <span className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                <CheckCircle2 className="w-3 h-3" /> Delivery
              </span>
              <div className="space-y-2">
                <div>
                  <p className="text-[10px] text-gray-500 font-medium">Deliver To</p>
                  <p className="text-sm font-bold text-gray-900 truncate">Main Office, Level 4</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 font-medium">Signed By</p>
                  <p className="text-sm font-bold text-green-700 truncate">J. Smith</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tracking History Table */}
          <div className="border border-gray-200 rounded-2xl overflow-hidden bg-white">
            <div className="bg-gray-50 px-5 py-3 border-b border-gray-200">
              <h3 className="text-sm font-black text-gray-800">Tracking Event History</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="bg-white border-b border-gray-100">
                    <th className="px-5 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Date & Time</th>
                    <th className="px-5 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Status</th>
                    <th className="px-5 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Location</th>
                    <th className="px-5 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {trackingHistory.map((event, idx) => (
                    <tr key={idx} className={clsx("hover:bg-gray-50/50 transition-colors", event.isCurrent && "bg-blue-50/30")}>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3.5 h-3.5 text-gray-400" />
                          <span className="text-sm font-bold text-gray-900">{event.date}</span>
                          <span className="text-xs font-medium text-gray-500">{event.time}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <span className={clsx(
                          "px-2.5 py-1 rounded-md text-[11px] font-bold",
                          event.status === 'Delivered' ? "bg-green-100 text-green-700" :
                          event.status === 'Out for Delivery' ? "bg-blue-100 text-blue-700" :
                          "bg-gray-100 text-gray-700"
                        )}>
                          {event.status}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <span className="text-sm font-medium text-gray-700">{event.location}</span>
                      </td>
                      <td className="px-5 py-4">
                        <span className="text-xs text-gray-500">{event.notes}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
