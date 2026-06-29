import React, { useState } from 'react';
import { X, Calendar, Clock, Package, Store, MapPin, CheckCircle2, Truck } from 'lucide-react';
import { InputField } from '@/components/ui/InputField';
import { SelectField } from '@/components/ui/SelectField';

interface ScheduleCollectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (details: any) => void;
}

export function ScheduleCollectionModal({ isOpen, onClose, onConfirm }: ScheduleCollectionModalProps) {
  const [collectionMode, setCollectionMode] = useState('future');
  const [date, setDate] = useState('');
  const [readyFrom, setReadyFrom] = useState('');
  const [latestTime, setLatestTime] = useState('');
  const [location, setLocation] = useState('');
  const [locationDesc, setLocationDesc] = useState('');
  
  const [exshipTerms, setExshipTerms] = useState(false);
  const [courierTerms, setCourierTerms] = useState(false);

  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm({ collectionMode, date, readyFrom, latestTime, location, locationDesc });
    onClose();
  };

  const timeOptions = Array.from({length: 48}, (_, i) => {
    const hr = String(Math.floor(i/2)).padStart(2, '0');
    const min = i%2===0 ? '00' : '30';
    return { value: `${hr}:${min}`, label: `${hr}:${min}` };
  });

  const locationOptions = [
    { value: 'None', label: 'None' },
    { value: 'Front Door', label: 'Front Door' },
    { value: 'Back Door', label: 'Back Door' },
    { value: 'Reception', label: 'Reception' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#081b4c]/40 backdrop-blur-md animate-in fade-in duration-300">
      <div 
        className="bg-white rounded-2xl md:rounded-3xl shadow-2xl w-full max-w-4xl max-h-[95vh] md:max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 md:px-8 md:py-6 border-b border-gray-100 shrink-0">
          <div>
            <h2 className="text-xl md:text-2xl font-extrabold text-[#081b4c] tracking-tight">Schedule Collection</h2>
            <p className="text-xs md:text-sm text-gray-500 mt-1 font-medium">Please provide details for your collection</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all duration-200"
          >
            <X className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>

        <div className="p-5 md:p-8 flex flex-col gap-6 md:gap-8 overflow-y-auto flex-1 min-h-0">
          
          {/* Collection Mode Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {[
              { id: 'future', icon: Clock, title: 'Schedule for Future Date' },
              { id: 'already', icon: Package, title: 'Already Scheduled' },
              { id: 'depot', icon: Store, title: 'Drop at Depot/Shop' },
              { id: 'collection', icon: Truck, title: 'I have a daily collection' },
            ].map(mode => {
              const isSelected = collectionMode === mode.id;
              const Icon = mode.icon;
              return (
                <div 
                  key={mode.id}
                  onClick={() => setCollectionMode(mode.id)}
                  className={`relative flex flex-col items-center justify-center text-center p-4 md:p-5 rounded-2xl cursor-pointer transition-all duration-300 border-2 ${isSelected ? 'border-[#081b4c] bg-[#081b4c]/5 shadow-md scale-[1.02]' : 'border-gray-100 bg-white hover:border-gray-300 hover:bg-gray-50'}`}
                >
                  {isSelected && (
                    <div className="absolute top-3 right-3 text-[#081b4c]">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                  )}
                  <div className={`p-3 rounded-full mb-3 ${isSelected ? 'bg-[#081b4c] text-white' : 'bg-gray-100 text-gray-500'}`}>
                    <Icon className="w-6 h-6 md:w-7 md:h-7" />
                  </div>
                  <h3 className={`font-bold text-sm ${isSelected ? 'text-[#081b4c]' : 'text-gray-700'}`}>
                    {mode.title}
                  </h3>
                </div>
              )
            })}
          </div>

          {/* Form Fields */}
          <div className="bg-gray-50/50 p-5 md:p-6 rounded-2xl border border-gray-100">
            <h3 className="text-base font-bold text-gray-800 mb-5 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#081b4c]" />
              Time & Location Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
              <InputField 
                label="Date of Collection"
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />

              <SelectField 
                label="Collection Location"
                value={location}
                onChange={setLocation}
                options={locationOptions}
                placeholder="Select location..."
              />

              <SelectField 
                label="Parcel Ready From"
                value={readyFrom}
                onChange={setReadyFrom}
                options={timeOptions}
                placeholder="Select time..."
              />

              <SelectField 
                label="Latest Collection Time"
                value={latestTime}
                onChange={setLatestTime}
                options={timeOptions}
                placeholder="Select time..."
              />

              <div className="md:col-span-2">
                <InputField 
                  label="Location Description"
                  type="text"
                  placeholder="E.g reception or gatehouse"
                  value={locationDesc}
                  onChange={(e) => setLocationDesc(e.target.value)}
                  optional
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-5 md:px-8 md:py-5 border-t border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-5 bg-gray-50 shrink-0 rounded-b-2xl md:rounded-b-3xl">
          <div className="flex flex-col gap-2">
            <label className="flex items-start gap-2.5 cursor-pointer group">
              <input type="checkbox" checked={exshipTerms} onChange={e => setExshipTerms(e.target.checked)} className="w-4 h-4 md:w-5 md:h-5 text-[#081b4c] shrink-0 border-gray-300 rounded focus:ring-[#081b4c] cursor-pointer mt-0.5" />
              <span className="text-xs md:text-sm font-bold text-gray-700 transition-colors leading-tight">
                I acknowledge that I have read, understood and accept the <a href="#" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 hover:underline">ExShip terms and conditions</a>
              </span>
            </label>
            <label className="flex items-start gap-2.5 cursor-pointer group">
              <input type="checkbox" checked={courierTerms} onChange={e => setCourierTerms(e.target.checked)} className="w-4 h-4 md:w-5 md:h-5 text-[#081b4c] shrink-0 border-gray-300 rounded focus:ring-[#081b4c] cursor-pointer mt-0.5" />
              <span className="text-xs md:text-sm font-bold text-gray-700 transition-colors leading-tight">
                I acknowledge that I have read, understood and accept the <a href="#" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 hover:underline">terms and conditions of SELECT A SERVICE COMPANY</a>
              </span>
            </label>
          </div>
          <div className="flex justify-end gap-3 w-full md:w-auto shrink-0">
            <button
              onClick={onClose}
              className="w-full md:w-auto px-6 py-2.5 bg-white hover:bg-gray-100 text-gray-700 font-bold rounded-xl transition-all border border-gray-200 shadow-sm text-sm"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              disabled={!exshipTerms || !courierTerms}
              className="w-full md:w-auto px-8 py-2.5 bg-[#081b4c] hover:bg-[#06153b] text-white font-bold rounded-xl shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5 active:translate-y-0 text-sm"
            >
              Ship
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
