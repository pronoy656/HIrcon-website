import React from 'react';
import clsx from 'clsx';

export interface TrackingWatchItem {
  id: string;
  trackingNumber: string;
  carrier: string;
  reference: string;
  invoiceNumber: string;
  bookedIn: string; // date
  payment: string; // e.g. "Account", "Paid"
  status: string; // e.g. "Active", "Archived"
  type: string; // e.g. "Export", "Import"
  pieces: number;
  weight: string; // e.g. "10.5 kg"
  dimWeight: string; // e.g. "12.0 kg"
  destination: string; // e.g. "United States (US)"
  collectionOn: string; // date
  enhancedLiability: string; // e.g. "Yes", "No"
  quotedCharges: string; // e.g. "£45.00"
  auditedCharges: string; // e.g. "£45.00"
  trackingStatus: string; // e.g. "In Transit", "Delivered"
}

interface WatchShipmentTableProps {
  data: TrackingWatchItem[];
}

export function WatchShipmentTable({ data }: WatchShipmentTableProps) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'in transit':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'cancelled':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse whitespace-nowrap min-w-[2500px]">
          <thead>
            <tr className="bg-[#081b4c] border-b border-[#081b4c]">
              <th className="py-4 px-6 text-xs font-bold text-white uppercase tracking-wider sticky left-0 z-10 bg-[#081b4c]">Tracking Number</th>
              <th className="py-4 px-6 text-xs font-bold text-white uppercase tracking-wider">Carrier</th>
              <th className="py-4 px-6 text-xs font-bold text-white uppercase tracking-wider">Reference</th>
              <th className="py-4 px-6 text-xs font-bold text-white uppercase tracking-wider">Invoice Number</th>
              <th className="py-4 px-6 text-xs font-bold text-white uppercase tracking-wider">Booked In</th>
              <th className="py-4 px-6 text-xs font-bold text-white uppercase tracking-wider">Payment</th>
              <th className="py-4 px-6 text-xs font-bold text-white uppercase tracking-wider">Status</th>
              <th className="py-4 px-6 text-xs font-bold text-white uppercase tracking-wider">Type</th>
              <th className="py-4 px-6 text-xs font-bold text-white uppercase tracking-wider text-center">Pieces</th>
              <th className="py-4 px-6 text-xs font-bold text-white uppercase tracking-wider">Weight</th>
              <th className="py-4 px-6 text-xs font-bold text-white uppercase tracking-wider">Dim Weight</th>
              <th className="py-4 px-6 text-xs font-bold text-white uppercase tracking-wider">Destination</th>
              <th className="py-4 px-6 text-xs font-bold text-white uppercase tracking-wider">Collection On</th>
              <th className="py-4 px-6 text-xs font-bold text-white uppercase tracking-wider">Enhanced Liability</th>
              <th className="py-4 px-6 text-xs font-bold text-white uppercase tracking-wider">Quoted Charges</th>
              <th className="py-4 px-6 text-xs font-bold text-white uppercase tracking-wider">Audited Charges</th>
              <th className="py-4 px-6 text-xs font-bold text-white uppercase tracking-wider right-0">Tracking Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {data.length > 0 ? (
              data.map((item, idx) => (
                <tr key={item.id} className={clsx("hover:bg-blue-50/50 transition-colors", idx % 2 === 0 ? "bg-white" : "bg-gray-50/30")}>
                  <td className="py-4 px-6 text-sm font-black text-[#081b4c] sticky left-0 z-10 bg-inherit shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">
                    {item.trackingNumber}
                  </td>
                  <td className="py-4 px-6 text-sm font-bold text-gray-900">{item.carrier}</td>
                  <td className="py-4 px-6 text-sm text-gray-600 font-medium">{item.reference}</td>
                  <td className="py-4 px-6 text-sm text-gray-600 font-medium">{item.invoiceNumber || "--"}</td>
                  <td className="py-4 px-6 text-sm text-gray-600">{item.bookedIn}</td>
                  <td className="py-4 px-6 text-sm text-gray-600">{item.payment}</td>
                  <td className="py-4 px-6 text-sm text-gray-600">{item.status}</td>
                  <td className="py-4 px-6 text-sm text-gray-600">{item.type}</td>
                  <td className="py-4 px-6 text-sm font-bold text-gray-900 text-center">{item.pieces}</td>
                  <td className="py-4 px-6 text-sm text-gray-600">{item.weight}</td>
                  <td className="py-4 px-6 text-sm text-gray-600">{item.dimWeight}</td>
                  <td className="py-4 px-6 text-sm font-medium text-gray-900">{item.destination}</td>
                  <td className="py-4 px-6 text-sm text-gray-600">{item.collectionOn}</td>
                  <td className="py-4 px-6 text-sm text-gray-600">{item.enhancedLiability}</td>
                  <td className="py-4 px-6 text-sm font-bold text-gray-900">{item.quotedCharges}</td>
                  <td className="py-4 px-6 text-sm font-bold text-gray-900">{item.auditedCharges}</td>
                  <td className="py-4 px-6">
                    <span className={clsx(
                      "px-3 py-1 rounded-full text-xs font-bold border",
                      getStatusColor(item.trackingStatus)
                    )}>
                      {item.trackingStatus}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={17} className="py-12 text-center text-gray-500 font-medium">
                  No shipments found matching your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
