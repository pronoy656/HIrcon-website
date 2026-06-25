import React from 'react';
import { CheckCircle2, Printer, Download, RefreshCcw, FileText, X } from 'lucide-react';

interface ShipmentSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderNumber: string;
  totalPrice: number;
  dimensions?: string;
  onReship: () => void;
}

export function ShipmentSuccessModal({ 
  isOpen, 
  onClose, 
  orderNumber, 
  totalPrice,
  dimensions,
  onReship 
}: ShipmentSuccessModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-emerald-500 p-6 flex flex-col items-center justify-center text-center relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm">
            <CheckCircle2 className="w-8 h-8 text-emerald-500" />
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">Shipment Successful!</h2>
          <p className="text-emerald-50 mt-1 font-medium">Your shipment has been confirmed and scheduled.</p>
        </div>

        {/* Order Details */}
        <div className="p-6 flex flex-col gap-5 bg-white">
          <div className="bg-gray-50 border border-gray-100 rounded-xl p-5 flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-bold text-gray-500">Order Number</span>
              <span className="text-base font-extrabold text-[#081b4c]">{orderNumber}</span>
            </div>
            <hr className="border-gray-200" />
            <div className="flex justify-between items-center">
              <span className="text-sm font-bold text-gray-500">Dimensions</span>
              <span className="text-sm font-bold text-gray-900">{dimensions || "--"}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-bold text-gray-500">Total Price</span>
              <span className="text-sm font-black text-[#081b4c]">£{totalPrice.toFixed(2)}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
            <button className="flex items-center justify-center gap-2 py-3 px-4 bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 font-bold rounded-xl transition-colors shadow-sm text-sm">
              <Printer className="w-4 h-4" />
              Print Label
            </button>
            <button className="flex items-center justify-center gap-2 py-3 px-4 bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 font-bold rounded-xl transition-colors shadow-sm text-sm">
              <FileText className="w-4 h-4" />
              Print Thermal Label
            </button>
            <button className="flex items-center justify-center gap-2 py-3 px-4 bg-blue-50 border border-blue-100 hover:bg-blue-100 text-blue-700 font-bold rounded-xl transition-colors shadow-sm text-sm sm:col-span-2">
              <Download className="w-4 h-4" />
              Download Invoice
            </button>
            <button 
              onClick={onReship}
              className="flex items-center justify-center gap-2 py-3 px-4 bg-[#081b4c] hover:bg-[#06153b] text-white font-bold rounded-xl transition-colors shadow-sm text-sm sm:col-span-2 mt-2"
            >
              <RefreshCcw className="w-4 h-4" />
              Reship Same Package
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
