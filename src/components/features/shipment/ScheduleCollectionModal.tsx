import React, { useState } from 'react';
import { X, Calendar, Clock, Package, Store, MapPin, CheckCircle2 } from 'lucide-react';
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
        className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 md:px-10 md:py-8 border-b border-gray-100 shrink-0">
          <div>
            <h2 className="text-2xl font-extrabold text-[#081b4c] tracking-tight">Schedule Collection</h2>
            <p className="text-sm text-gray-500 mt-1.5 font-medium">Please provide details for your collection</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all duration-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 md:p-10 flex flex-col gap-10 overflow-y-auto max-h-[75vh]">
          
          {/* Collection Mode Selection */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { id: 'future', icon: Clock, title: 'Schedule for Future Date' },
              { id: 'already', icon: Package, title: 'Already Scheduled' },
              { id: 'depot', icon: Store, title: 'Drop at Depot/Shop' },
            ].map(mode => {
              const isSelected = collectionMode === mode.id;
              const Icon = mode.icon;
              return (
                <div 
                  key={mode.id}
                  onClick={() => setCollectionMode(mode.id)}
                  className={`relative flex flex-col items-center justify-center text-center p-6 rounded-2xl cursor-pointer transition-all duration-300 border-2 ${isSelected ? 'border-[#081b4c] bg-[#081b4c]/5 shadow-md scale-[1.02]' : 'border-gray-100 bg-white hover:border-gray-300 hover:bg-gray-50'}`}
                >
                  {isSelected && (
                    <div className="absolute top-4 right-4 text-[#081b4c]">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                  )}
                  <div className={`p-4 rounded-full mb-4 ${isSelected ? 'bg-[#081b4c] text-white' : 'bg-gray-100 text-gray-500'}`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className={`font-bold text-sm ${isSelected ? 'text-[#081b4c]' : 'text-gray-700'}`}>
                    {mode.title}
                  </h3>
                </div>
              )
            })}
          </div>

          {/* Form Fields */}
          <div className="bg-gray-50/50 p-8 rounded-3xl border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#081b4c]" />
              Time & Location Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
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
        <div className="p-6 md:px-10 md:py-6 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-6 bg-gray-50 shrink-0 rounded-b-3xl">
          <div className="flex flex-col gap-3">
            <label className="flex items-start gap-3 cursor-pointer group">
              <input type="checkbox" checked={exshipTerms} onChange={e => setExshipTerms(e.target.checked)} className="w-5 h-5 text-[#081b4c] shrink-0 border-gray-300 rounded focus:ring-[#081b4c] cursor-pointer mt-0.5" />
              <span className="text-sm font-bold text-gray-700 transition-colors">
                I acknowledge that I have read, understood and accept the <a href="#" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 hover:underline">ExShip terms and conditions</a>
              </span>
            </label>
            <label className="flex items-start gap-3 cursor-pointer group">
              <input type="checkbox" checked={courierTerms} onChange={e => setCourierTerms(e.target.checked)} className="w-5 h-5 text-[#081b4c] shrink-0 border-gray-300 rounded focus:ring-[#081b4c] cursor-pointer mt-0.5" />
              <span className="text-sm font-bold text-gray-700 transition-colors">
                I acknowledge that I have read, understood and accept the <a href="#" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 hover:underline">terms and conditions of SELECT A SERVICE COMPANY</a>
              </span>
            </label>
          </div>
          <div className="flex justify-end gap-4 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-8 py-3.5 bg-white hover:bg-gray-100 text-gray-700 font-bold rounded-xl transition-all border border-gray-200 shadow-sm"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              disabled={!exshipTerms || !courierTerms}
              className="w-full sm:w-auto px-10 py-3.5 bg-[#081b4c] hover:bg-[#06153b] text-white font-bold rounded-xl shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5 active:translate-y-0"
            >
              Ship
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
