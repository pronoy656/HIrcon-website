import React, { useState } from 'react';
import { X, Calendar, MapPin, Clock } from 'lucide-react';
import { InputField } from './InputField';
import { SelectField } from './SelectField';

interface ScheduleCollectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (details: { location: string; date: string; time: string }) => void;
}

export function ScheduleCollectionModal({ isOpen, onClose, onConfirm }: ScheduleCollectionModalProps) {
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm({ location, date, time });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-[#081b4c] shrink-0">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">Schedule Collection</h2>
            <p className="text-sm text-blue-200 mt-1">Confirm when and where to pick up</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 flex flex-col gap-5 bg-white">
          <div className="relative">
            <InputField 
              label={
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span>Collection Location</span>
                </div>
              }
              type="text" 
              placeholder="e.g. Main Warehouse, London" 
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-bold text-gray-700 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span>Collection Date</span>
            </label>
            <div className="relative">
              <input 
                type="date" 
                value={date} 
                onChange={(e) => setDate(e.target.value)} 
                className="w-full pl-4 pr-10 py-2.5 bg-white border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 transition-all [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:left-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer" 
              />
              <Calendar className="w-4 h-4 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div className="relative">
             <SelectField
                label={
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span>Collection Time</span>
                  </div>
                }
                value={time}
                onChange={setTime}
                options={[
                  { value: "Morning (08:00 - 12:00)", label: "Morning (08:00 - 12:00)" },
                  { value: "Afternoon (12:00 - 17:00)", label: "Afternoon (12:00 - 17:00)" },
                  { value: "Evening (17:00 - 20:00)", label: "Evening (17:00 - 20:00)" },
                  { value: "Anytime", label: "Anytime" }
                ]}
                placeholder="Select Time..."
              />
          </div>
        </div>

        <div className="p-6 border-t border-gray-100 flex justify-end gap-3 bg-gray-50/50">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-white hover:bg-gray-100 text-gray-700 font-bold rounded-xl transition-colors border border-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={!location || !date || !time}
            className="px-6 py-2.5 bg-[#081b4c] hover:bg-[#06153b] text-white font-bold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
