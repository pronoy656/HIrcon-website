import React from 'react';
import { Ship, Truck, Plane, CheckCircle, Info, AlertCircle } from 'lucide-react';
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
  id: string; // Col 1 (Tracking Number)
  invoiceNumber?: string; // Col 1 (Invoice Number)
  carrierReference?: string; // Col 1 (Carrier Reference)
  type: 'ship' | 'truck';
  status?: string;
  tags: Tag[]; // Col 2 (Tracking Status)
  
  // New fields for table
  bookedInPaymentStatus?: {
    date: string;
    time: string;
    account: string;
  } | string; // Col 2
  collectionOn: string; // Col 4
  piecesWeightDim: string; // Col 5
  destination: string; // Col 6
  shipmentType: string; // Col 7 (Type)
  insuranceLiability: string; // Col 8
  codeCharges?: {
    basePrice?: string;
    fuel?: string;
    vat?: string;
    total?: string;
  } | string; // Col 9 (Quoted Charges)
  auditCharges?: {
    weight?: string;
    dimensions?: string;
    basePrice?: string;
    fuel?: string;
    temporaryCharge?: string;
    nonStackable?: string;
    surcharge?: string;
    total?: string;
  } | string; // Col 10
  
  // Kept for backward compatibility if needed by modal
  eta?: string;
  checkpoints?: Checkpoint[];
};

interface TrackingCardProps {
  data: TrackingData;
  onClick?: () => void;
}

const getTransportIcon = (type: TrackingData['type'], className?: string) => {
  switch (type) {
    case 'ship': return <Ship className={className || "w-5 h-5 text-white"} />;
    case 'truck': return <Truck className={className || "w-5 h-5 text-white"} />;
  }
};

export function TrackingCard({ data, onClick }: TrackingCardProps) {
  // Common cell styling
  const cellClass = "flex flex-col justify-center text-sm text-gray-700 px-3";

  return (
    <div 
      onClick={onClick}
      className={clsx(
        "w-full bg-white border border-gray-100 rounded-xl p-4 relative shadow-[0_2px_10px_rgba(0,0,0,0.02)] transition-shadow",
        onClick ? "cursor-pointer hover:shadow-lg hover:border-gray-200" : ""
      )}
    >
      <div className="grid grid-cols-[1.5fr_1fr_1fr_1fr_1.4fr_1.4fr_0.8fr_1fr_1.3fr_1.3fr] w-full divide-x divide-gray-100">
        {/* Col 1: Tracking / Carrier / Invoice */}
        <div className="flex items-center gap-3 px-3 min-w-0">
          <div className="w-10 h-10 bg-[#081b4c] rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
            {getTransportIcon(data.type)}
          </div>
          <div className="flex flex-col gap-0.5 min-w-0">
            <span className="text-[18px] font-black text-[#081b4c] leading-tight truncate">{data.id}</span>
            <div className="flex flex-col">
              {data.carrierReference && (
                <span className="text-[13px] text-gray-500 font-medium truncate">Ref: {data.carrierReference}</span>
              )}
              {data.invoiceNumber && (
                <span className="text-[13px] text-gray-500 font-medium truncate">Inv: {data.invoiceNumber}</span>
              )}
            </div>
          </div>
        </div>

        {/* Col 2: Booked In Payment Status */}
        <div className={clsx(cellClass, "min-w-0")}>
          {typeof data.bookedInPaymentStatus === 'object' && data.bookedInPaymentStatus !== null ? (
            <div className="flex flex-col text-[13px] gap-0.5">
              <span className="font-semibold text-gray-900 truncate">{data.bookedInPaymentStatus.date}</span>
              <span className="text-gray-500 truncate">{data.bookedInPaymentStatus.time}</span>
              <span className="text-gray-500 font-medium truncate">{data.bookedInPaymentStatus.account}</span>
            </div>
          ) : (
            <span className="font-semibold text-[15px] truncate text-gray-600">
              {data.bookedInPaymentStatus || "-"}
            </span>
          )}
        </div>

        {/* Col 3: Tracking Status */}
        <div className={clsx(cellClass, "items-start min-w-0")}>
          <div className="flex flex-col gap-1.5 w-full min-w-0">
            {data.tags.filter(t => t.text !== 'Clearance in progress' && t.text !== 'ETA' && t.text !== 'Delete').map((tag, idx) => (
              <div 
                key={idx} 
                className={clsx(
                  "px-3 py-1.5 rounded-full text-[13px] font-bold flex items-center gap-1.5 w-fit border truncate max-w-full",
                  tag.text === 'Booked In' && "bg-blue-100 text-blue-700 border-blue-200",
                  tag.text === 'Delivered' && "bg-green-100 text-green-700 border-green-200",
                  tag.text === 'In Transit' && "bg-orange-100 text-orange-700 border-orange-200",
                  (tag.text === 'Exceptions' || tag.text === 'Delayed') && "bg-red-100 text-red-700 border-red-200",
                  tag.text === 'Voided' && "bg-gray-100 text-gray-700 border-gray-200",
                  !['Booked In', 'Delivered', 'In Transit', 'Exceptions', 'Delayed', 'Voided'].includes(tag.text) && tag.type === 'info' && "bg-blue-50 text-[#0f52ba] border-blue-100",
                  !['Booked In', 'Delivered', 'In Transit', 'Exceptions', 'Delayed', 'Voided'].includes(tag.text) && tag.type === 'error' && "bg-red-50 text-red-600 border-red-100",
                  !['Booked In', 'Delivered', 'In Transit', 'Exceptions', 'Delayed', 'Voided'].includes(tag.text) && tag.type === 'warning' && "bg-orange-50 text-orange-600 border-orange-100",
                  !['Booked In', 'Delivered', 'In Transit', 'Exceptions', 'Delayed', 'Voided'].includes(tag.text) && tag.type === 'success' && "bg-green-50 text-green-700 border-green-100"
                )}
              >
                {tag.type === 'info' && <Truck className="w-3 h-3 flex-shrink-0" />}
                {tag.type === 'error' && <AlertCircle className="w-3 h-3 flex-shrink-0" />}
                {tag.type === 'warning' && <Info className="w-3 h-3 flex-shrink-0" />}
                {tag.type === 'success' && <CheckCircle className="w-3 h-3 flex-shrink-0" />}
                <span className="truncate">{tag.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Col 4: Collection On */}
        <div className={clsx(cellClass, "min-w-0")}>
          <span className="font-medium text-[15px] truncate">{data.collectionOn || "-"}</span>
        </div>

        {/* Col 5: Pieces / Weight / DIM Weight */}
        <div className={clsx(cellClass, "min-w-0")}>
          <span className="font-medium text-[15px] truncate">{data.piecesWeightDim || "-"}</span>
        </div>

        {/* Col 6: Destination */}
        <div className={clsx(cellClass, "min-w-0")}>
          <span className="font-medium text-[15px] truncate" title={data.destination}>{data.destination || "-"}</span>
        </div>

        {/* Col 7: Type */}
        <div className={clsx(cellClass, "min-w-0")}>
          {data.shipmentType === "Your Packaging" || data.shipmentType === "My Packaging" ? (
            <div className="flex flex-col font-semibold text-[15px] leading-snug">
              <span className="truncate">{data.shipmentType.split(' ')[0]}</span>
              <span className="truncate">{data.shipmentType.split(' ')[1]}</span>
            </div>
          ) : (
            <span className="font-semibold text-[15px] truncate">{data.shipmentType || "-"}</span>
          )}
        </div>

        {/* Col 8: Insurance Liability */}
        <div className={clsx(cellClass, "min-w-0")}>
          <span className="font-medium text-[15px] truncate">{data.insuranceLiability || "-"}</span>
        </div>

        {/* Col 9: Quoted Charges */}
        <div className={clsx(cellClass, "min-w-0")}>
          {typeof data.codeCharges === 'object' && data.codeCharges !== null ? (
            <div className="flex flex-col text-[13px] gap-0.5 w-full">
              {data.codeCharges.basePrice && <div className="flex justify-between gap-1 w-full"><span className="text-gray-500 truncate">Base:</span> <span className="font-semibold text-gray-900">{data.codeCharges.basePrice}</span></div>}
              {data.codeCharges.fuel && <div className="flex justify-between gap-1 w-full"><span className="text-gray-500 truncate">Fuel:</span> <span className="font-semibold text-gray-900">{data.codeCharges.fuel}</span></div>}
              {data.codeCharges.vat && <div className="flex justify-between gap-1 w-full"><span className="text-gray-500 truncate">VAT:</span> <span className="font-semibold text-gray-900">{data.codeCharges.vat}</span></div>}
              {data.codeCharges.total && <div className="flex justify-between gap-1 w-full mt-0.5 pt-0.5 border-t border-gray-100"><span className="text-gray-600 font-bold truncate">Total:</span> <span className="font-bold text-[#081b4c]">{data.codeCharges.total}</span></div>}
            </div>
          ) : (
            <span className="font-medium text-[15px] truncate">{data.codeCharges || "-"}</span>
          )}
        </div>

        {/* Col 10: Audit Charges */}
        <div className={clsx(cellClass, "min-w-0")}>
          {typeof data.auditCharges === 'object' && data.auditCharges !== null ? (
            <div className="flex flex-col text-[13px] gap-0.5 w-full">
              {data.auditCharges.weight && <div className="flex justify-between gap-1 w-full"><span className="text-gray-500 truncate">Weight:</span> <span className="font-semibold text-gray-900">{data.auditCharges.weight}</span></div>}
              {data.auditCharges.dimensions && <div className="flex justify-between gap-1 w-full"><span className="text-gray-500 truncate">Dim:</span> <span className="font-semibold text-gray-900">{data.auditCharges.dimensions}</span></div>}
              {data.auditCharges.basePrice && <div className="flex justify-between gap-1 w-full"><span className="text-gray-500 truncate">Base:</span> <span className="font-semibold text-gray-900">{data.auditCharges.basePrice}</span></div>}
              {data.auditCharges.fuel && <div className="flex justify-between gap-1 w-full"><span className="text-gray-500 truncate">Fuel:</span> <span className="font-semibold text-gray-900">{data.auditCharges.fuel}</span></div>}
              {data.auditCharges.temporaryCharge && <div className="flex justify-between gap-1 w-full"><span className="text-gray-500 truncate">Temp:</span> <span className="font-semibold text-gray-900">{data.auditCharges.temporaryCharge}</span></div>}
              {data.auditCharges.nonStackable && <div className="flex justify-between gap-1 w-full"><span className="text-gray-500 truncate">Non-Stack:</span> <span className="font-semibold text-gray-900">{data.auditCharges.nonStackable}</span></div>}
              {data.auditCharges.surcharge && <div className="flex justify-between gap-1 w-full"><span className="text-gray-500 truncate">Surchg:</span> <span className="font-semibold text-gray-900">{data.auditCharges.surcharge}</span></div>}
              {data.auditCharges.total && <div className="flex justify-between gap-1 w-full mt-0.5 pt-0.5 border-t border-gray-100"><span className="text-gray-600 font-bold truncate">Total:</span> <span className="font-bold text-[#081b4c]">{data.auditCharges.total}</span></div>}
            </div>
          ) : (
            <span className="font-medium text-[15px] truncate">{data.auditCharges || "-"}</span>
          )}
        </div>

      </div>
    </div>
  );
}

