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
  
  // New fields for inline details
  totalWeight?: string;
  totalDimWeight?: string;
  shipmentDetails?: string;
  customerReference?: string;
  labelDeliveryMethod?: string;
  collectionDropOff?: string;
  transportationCharges?: string;
  paymentGateway?: string;
  paymentTransactionId?: string;
  dimensionsDetails?: string;
  deliveryDropOff?: string;

  // Kept for backward compatibility if needed by modal
  eta?: string;
  checkpoints?: Checkpoint[];
};

interface TrackingCardProps {
  data: TrackingData;
  isSelected?: boolean;
  onClick?: () => void;
}

const getTransportIcon = (type: TrackingData['type'], className?: string) => {
  switch (type) {
    case 'ship': return <Ship className={className || "w-5 h-5 text-white"} />;
    case 'truck': return <Truck className={className || "w-5 h-5 text-white"} />;
  }
};

export function TrackingCard({ data, isSelected = false, onClick }: TrackingCardProps) {
  // Common cell styling
  const cellClass = clsx("flex flex-col justify-center text-sm px-3", isSelected ? "text-white/90" : "text-gray-700");
  const valueClass = clsx("font-semibold text-[15px] truncate", isSelected ? "text-white" : "text-gray-600");
  const boldValueClass = clsx("font-bold text-[15px] truncate", isSelected ? "text-white" : "text-gray-900");
  const labelClass = clsx("text-[13px] truncate", isSelected ? "text-white/70" : "text-gray-500");

  return (
    <div 
      onClick={onClick}
      className={clsx(
        "w-full rounded-xl p-4 relative transition-shadow",
        isSelected 
          ? "bg-blue-600 border-transparent shadow-lg scale-[1.01] z-10 text-white" 
          : "bg-white border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border",
        onClick && !isSelected ? "cursor-pointer hover:shadow-lg hover:border-gray-200" : onClick ? "cursor-pointer" : ""
      )}
    >
      <div className={clsx("grid grid-cols-[1.5fr_1fr_1fr_1fr_1.4fr_1.4fr_0.8fr_1fr_1.3fr_1.3fr] w-full divide-x", isSelected ? "divide-white/20" : "divide-gray-100")}>
        {/* Col 1: Tracking / Carrier / Invoice */}
        <div className="flex items-center gap-3 px-3 min-w-0">
          <div className={clsx("w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-md", isSelected ? "bg-white text-blue-600" : "bg-[#081b4c] text-white")}>
            <div className="flex items-center justify-center w-full h-full text-inherit">
              {data.type === 'ship' ? <Ship className="w-5 h-5" /> : <Truck className="w-5 h-5" />}
            </div>
          </div>
          <div className="flex flex-col gap-0.5 min-w-0">
            <span className={clsx("text-[18px] font-black leading-tight truncate", isSelected ? "text-white" : "text-[#081b4c]")}>{data.id}</span>
            <div className="flex flex-col">
              {data.carrierReference && (
                <span className={clsx("text-[13px] font-medium truncate", isSelected ? "text-white/80" : "text-gray-500")}>Ref: {data.carrierReference}</span>
              )}
              {data.invoiceNumber && (
                <span className={clsx("text-[13px] font-medium truncate", isSelected ? "text-white/80" : "text-gray-500")}>Inv: {data.invoiceNumber}</span>
              )}
            </div>
          </div>
        </div>

        {/* Col 2: Tracking Status */}
        <div className={clsx(cellClass, "items-start min-w-0")}>
          <div className="flex flex-col gap-1.5 w-full min-w-0">
            {data.tags.filter(t => t.text !== 'Clearance in progress' && t.text !== 'ETA' && t.text !== 'Delete').map((tag, idx) => {
              // Special case: if row is selected, make tags white outline or subtle fill to stand out from purple
              const selectedTagClass = "bg-white/20 text-white border-white/30";
              const normalTagClass = clsx(
                tag.text === 'Booked In' && "bg-blue-100 text-blue-700 border-blue-200",
                tag.text === 'Delivered' && "bg-green-100 text-green-700 border-green-200",
                tag.text === 'In Transit' && "bg-orange-100 text-orange-700 border-orange-200",
                (tag.text === 'Exceptions' || tag.text === 'Delayed') && "bg-red-100 text-red-700 border-red-200",
                tag.text === 'Voided' && "bg-gray-100 text-gray-700 border-gray-200",
                !['Booked In', 'Delivered', 'In Transit', 'Exceptions', 'Delayed', 'Voided'].includes(tag.text) && tag.type === 'info' && "bg-blue-50 text-[#0f52ba] border-blue-100",
                !['Booked In', 'Delivered', 'In Transit', 'Exceptions', 'Delayed', 'Voided'].includes(tag.text) && tag.type === 'error' && "bg-red-50 text-red-600 border-red-100",
                !['Booked In', 'Delivered', 'In Transit', 'Exceptions', 'Delayed', 'Voided'].includes(tag.text) && tag.type === 'warning' && "bg-orange-50 text-orange-600 border-orange-100",
                !['Booked In', 'Delivered', 'In Transit', 'Exceptions', 'Delayed', 'Voided'].includes(tag.text) && tag.type === 'success' && "bg-green-50 text-green-700 border-green-100"
              );

              return (
                <div 
                  key={idx} 
                  className={clsx(
                    "px-3 py-1.5 rounded-full text-[13px] font-bold flex items-center gap-1.5 w-fit border truncate max-w-full",
                    isSelected ? selectedTagClass : normalTagClass
                  )}
                >
                  {tag.type === 'info' && <Truck className="w-3 h-3 flex-shrink-0" />}
                  {tag.type === 'error' && <AlertCircle className="w-3 h-3 flex-shrink-0" />}
                  {tag.type === 'warning' && <Info className="w-3 h-3 flex-shrink-0" />}
                  {tag.type === 'success' && <CheckCircle className="w-3 h-3 flex-shrink-0" />}
                  <span className="truncate">{tag.text}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Col 3: Booked In Payment Status */}
        <div className={clsx(cellClass, "min-w-0")}>
          {typeof data.bookedInPaymentStatus === 'object' && data.bookedInPaymentStatus !== null ? (
            <div className="flex flex-col text-[13px] gap-0.5">
              <span className={clsx("font-semibold truncate", isSelected ? "text-white" : "text-gray-900")}>{data.bookedInPaymentStatus.date}</span>
              <span className={clsx("truncate", isSelected ? "text-white/80" : "text-gray-500")}>{data.bookedInPaymentStatus.time}</span>
              <span className={clsx("font-medium truncate", isSelected ? "text-white/80" : "text-gray-500")}>{data.bookedInPaymentStatus.account}</span>
            </div>
          ) : (
            <span className={valueClass}>
              {data.bookedInPaymentStatus || "-"}
            </span>
          )}
        </div>

        {/* Col 4: Collection On */}
        <div className={clsx(cellClass, "min-w-0")}>
          <span className={valueClass}>{data.collectionOn || "-"}</span>
        </div>

        {/* Col 5: Pieces / Weight / DIM Weight */}
        <div className={clsx(cellClass, "min-w-0")}>
          <span className={valueClass}>{data.piecesWeightDim || "-"}</span>
        </div>

        {/* Col 6: Destination */}
        <div className={clsx(cellClass, "min-w-0")}>
          <span className={valueClass} title={data.destination}>{data.destination || "-"}</span>
        </div>

        {/* Col 7: Type */}
        <div className={clsx(cellClass, "min-w-0")}>
          {data.shipmentType === "Your Packaging" || data.shipmentType === "My Packaging" ? (
            <div className={clsx("flex flex-col font-semibold text-[15px] leading-snug", isSelected ? "text-white" : "text-gray-800")}>
              <span className="truncate">{data.shipmentType.split(' ')[0]}</span>
              <span className="truncate">{data.shipmentType.split(' ')[1]}</span>
            </div>
          ) : (
            <span className={valueClass}>{data.shipmentType || "-"}</span>
          )}
        </div>

        {/* Col 8: Insurance Liability */}
        <div className={clsx(cellClass, "min-w-0")}>
          <span className={valueClass}>{data.insuranceLiability || "-"}</span>
        </div>

        {/* Col 9: Quoted Charges */}
        <div className={clsx(cellClass, "min-w-0")}>
          {typeof data.codeCharges === 'object' && data.codeCharges !== null ? (
            <div className="flex flex-col text-[13px] gap-0.5 w-full">
              {data.codeCharges.basePrice && <div className="flex justify-between gap-1 w-full"><span className={labelClass}>Base:</span> <span className={boldValueClass}>{data.codeCharges.basePrice}</span></div>}
              {data.codeCharges.fuel && <div className="flex justify-between gap-1 w-full"><span className={labelClass}>Fuel:</span> <span className={boldValueClass}>{data.codeCharges.fuel}</span></div>}
              {data.codeCharges.vat && <div className="flex justify-between gap-1 w-full"><span className={labelClass}>VAT:</span> <span className={boldValueClass}>{data.codeCharges.vat}</span></div>}
              {data.codeCharges.total && <div className={clsx("flex justify-between gap-1 w-full mt-0.5 pt-0.5 border-t", isSelected ? "border-white/20" : "border-gray-100")}><span className={clsx("font-bold truncate", isSelected ? "text-white" : "text-gray-600")}>Total:</span> <span className={clsx("font-bold", isSelected ? "text-white" : "text-[#081b4c]")}>{data.codeCharges.total}</span></div>}
            </div>
          ) : (
            <span className={valueClass}>{data.codeCharges || "-"}</span>
          )}
        </div>

        {/* Col 10: Audit Charges */}
        <div className={clsx(cellClass, "min-w-0")}>
          {typeof data.auditCharges === 'object' && data.auditCharges !== null ? (
            <div className="flex flex-col text-[13px] gap-0.5 w-full">
              {data.auditCharges.weight && <div className="flex justify-between gap-1 w-full"><span className={labelClass}>Weight:</span> <span className={boldValueClass}>{data.auditCharges.weight}</span></div>}
              {data.auditCharges.dimensions && <div className="flex justify-between gap-1 w-full"><span className={labelClass}>Dim:</span> <span className={boldValueClass}>{data.auditCharges.dimensions}</span></div>}
              {data.auditCharges.basePrice && <div className="flex justify-between gap-1 w-full"><span className={labelClass}>Base:</span> <span className={boldValueClass}>{data.auditCharges.basePrice}</span></div>}
              {data.auditCharges.fuel && <div className="flex justify-between gap-1 w-full"><span className={labelClass}>Fuel:</span> <span className={boldValueClass}>{data.auditCharges.fuel}</span></div>}
              {data.auditCharges.temporaryCharge && <div className="flex justify-between gap-1 w-full"><span className={labelClass}>Temp:</span> <span className={boldValueClass}>{data.auditCharges.temporaryCharge}</span></div>}
              {data.auditCharges.nonStackable && <div className="flex justify-between gap-1 w-full"><span className={labelClass}>Non-Stack:</span> <span className={boldValueClass}>{data.auditCharges.nonStackable}</span></div>}
              {data.auditCharges.surcharge && <div className="flex justify-between gap-1 w-full"><span className={labelClass}>Surchg:</span> <span className={boldValueClass}>{data.auditCharges.surcharge}</span></div>}
              {data.auditCharges.total && <div className={clsx("flex justify-between gap-1 w-full mt-0.5 pt-0.5 border-t", isSelected ? "border-white/20" : "border-gray-100")}><span className={clsx("font-bold truncate", isSelected ? "text-white" : "text-gray-600")}>Total:</span> <span className={clsx("font-bold", isSelected ? "text-white" : "text-[#081b4c]")}>{data.auditCharges.total}</span></div>}
            </div>
          ) : (
            <span className={valueClass}>{data.auditCharges || "-"}</span>
          )}
        </div>

      </div>
    </div>
  );
}

