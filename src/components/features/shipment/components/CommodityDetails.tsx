import React from "react";
import { Minus, Plus, Pen } from "lucide-react";
import { InputField } from "@/components/ui/InputField";
import { SelectField } from "@/components/ui/SelectField";

interface InvoiceItem {
  id: number;
}

interface CommodityDetailsProps {
  invoiceItems: InvoiceItem[];
  setInvoiceItems: (items: InvoiceItem[]) => void;
  countryOptions: { value: string; label: React.ReactNode }[];
  isCustomValueEditable: boolean;
  setIsCustomValueEditable: (val: boolean) => void;
}

export function CommodityDetails({
  invoiceItems,
  setInvoiceItems,
  countryOptions,
  isCustomValueEditable,
  setIsCustomValueEditable
}: CommodityDetailsProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mt-4">
      <div className="bg-[#081b4c] border-b border-[#081b4c] p-5 flex justify-between items-center rounded-t-2xl">
        <div>
          <h2 className="text-lg font-extrabold text-white tracking-tight">Commercial Invoice Details</h2>
          <p className="text-xs text-blue-100 font-medium mt-0.5">Provide itemized details for customs clearance.</p>
        </div>
      </div>
      
      <div className="p-6">
        <div className="space-y-6 mb-6 pb-6 border-b border-gray-100">
          {invoiceItems.map((item, index) => (
            <div key={item.id} className="grid grid-cols-1 md:grid-cols-6 gap-6 relative p-5 pt-10 bg-gray-50/50 rounded-xl border border-gray-100 mt-4 first:mt-0">
              <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-[#081b4c] text-white flex items-center justify-center font-bold text-sm border-4 border-white shadow-sm">
                {index + 1}
              </div>
              {invoiceItems.length > 1 && (
                <button
                  onClick={(e) => { e.preventDefault(); setInvoiceItems(invoiceItems.filter(i => i.id !== item.id)); }}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white text-red-500 hover:bg-red-50 hover:text-red-600 flex items-center justify-center transition-colors border border-gray-200 shadow-sm"
                  title="Remove Item"
                >
                  <Minus className="w-4 h-4" />
                </button>
              )}
              <div className="md:col-span-6 lg:col-span-3">
                <InputField 
                  label="Exact description of goods" 
                  type="text" 
                  required 
                  placeholder="Max 90 characters" 
                  maxLength={90} 
                  tooltip={
                    <div className="flex flex-col gap-3 font-normal">
                      <p><strong>Exact Description of Goods:</strong> please provide accurate commodities description, using detailed, precise & plain language, with sufficient details about the nature of goods. The detailed description per commodity should indicate what the goods are, for which purpose the goods are used and what they are made of – for example: "Women's T-shirts made of 100% Cotton".</p>
                      <p>You should not add generic, low quality descriptions such as "Goods", "Sample", "T-Shirts" or "Gift", this may cause the carrier to reject shipments as well as delaying customs clearance.</p>
                    </div>
                  }
                />
              </div>
              <div className="md:col-span-3 lg:col-span-1">
                <InputField label="Unit / Weight" type="number" required placeholder="e.g. 10" />
              </div>
              <div className="md:col-span-3 lg:col-span-2">
                <SelectField
                  label="Manufactured In"
                  options={countryOptions}
                  placeholder="Select Country..."
                />
              </div>
              <div className="md:col-span-3 lg:col-span-2">
                <InputField label="Commodity code" type="text" placeholder="e.g. 85044030" />
              </div>
              <div className="md:col-span-3 lg:col-span-1">
                <InputField label="Quantity" type="number" required placeholder="e.g. 1" />
              </div>
              <div className="md:col-span-3 lg:col-span-1">
                <InputField label="Unit price" type="number" required placeholder="e.g. 50" />
              </div>
              <div className="md:col-span-3 lg:col-span-2 flex flex-col justify-end">
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Line Total</label>
                <div className="text-lg font-extrabold text-gray-900 h-[42px] flex items-center">
                  £0.00
                </div>
              </div>
            </div>
          ))}
          <button
            onClick={(e) => { e.preventDefault(); setInvoiceItems([...invoiceItems, { id: Date.now() }]); }}
            className="w-full py-3 mt-4 border-2 border-dashed border-green-400/60 rounded-xl bg-green-50 text-green-700 font-bold text-sm hover:bg-green-100 transition-colors flex items-center justify-center gap-2 shadow-sm"
          >
            <Plus className="w-5 h-5" />
            Add Another Item
          </button>
        </div>

        {/* Totals */}
        <div className="flex flex-col items-end pt-2">
          <div className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="font-bold text-gray-500 uppercase tracking-wide">Total Unit Weight</span>
              <span className="font-black text-gray-900">0.00 kg</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="font-bold text-gray-500 uppercase tracking-wide">Total Price</span>
              <span className="font-black text-gray-900">£0.00</span>
            </div>
            <div className="pt-3 border-t-2 border-gray-900 flex justify-between items-center text-sm">
              <span className="font-bold text-[#081b4c] uppercase tracking-wide">Total Custom Value</span>
              <div className="flex items-center gap-2">
                <span className="text-[#081b4c] font-black">£</span>
                {isCustomValueEditable ? (
                  <input 
                    type="number" 
                    defaultValue="0.00" 
                    autoFocus
                    onBlur={() => setIsCustomValueEditable(false)}
                    className="w-24 px-2 py-1 text-right font-black text-[#081b4c] bg-white border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#081b4c] focus:border-transparent shadow-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                ) : (
                  <div 
                    className="flex items-center gap-2 cursor-pointer group"
                    onClick={() => setIsCustomValueEditable(true)}
                    title="Edit Custom Value"
                  >
                    <span className="text-right font-black text-[#081b4c] min-w-[3rem]">0.00</span>
                    <Pen className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#081b4c] transition-colors" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
