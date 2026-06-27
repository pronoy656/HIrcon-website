import React from "react";
import { Files, ArrowDownToLine, ChevronDown } from "lucide-react";
import { InputField } from "@/components/ui/InputField";
import { SelectField } from "@/components/ui/SelectField";

export interface BoxData {
  weight: string;
  customs: string;
  length: string;
  width: string;
  height: string;
  boxType: string;
}

interface BoxDetailsProps {
  packageType: string;
  setPackageType: (val: string) => void;
  isDocument: boolean;
  setIsDocument: (val: boolean) => void;
  isCommodity: boolean;
  setIsCommodity: (val: boolean) => void;
  numBoxes: string;
  setNumBoxes: (val: string) => void;
  showBoxesSize: boolean;
  setShowBoxesSize: (val: boolean) => void;
  currency: string;
  setCurrency: (val: string) => void;
  currencyOptions: { value: string; label: string; searchKey: string }[];
  boxesData: BoxData[];
  handleBoxChange: (index: number, field: string, value: string) => void;
  handleCopyAllBoxes: () => void;
  handleCopyNextBox: (index: number) => void;
}

export const BoxDetails = React.memo(function BoxDetails({
  packageType, setPackageType,
  isDocument, setIsDocument,
  isCommodity, setIsCommodity,
  numBoxes, setNumBoxes,
  showBoxesSize, setShowBoxesSize,
  currency, setCurrency, currencyOptions,
  boxesData, handleBoxChange, handleCopyAllBoxes, handleCopyNextBox
}: BoxDetailsProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="bg-[#081b4c] border-b border-[#081b4c] p-5 rounded-t-2xl">
        <h2 className="text-lg font-extrabold text-white tracking-tight">Box Details</h2>
        <p className="text-xs text-blue-100 font-medium mt-0.5">Specify the dimensions, weight, and customs for each box.</p>
      </div>
      
      <div className="p-6 flex flex-col gap-6 relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-b border-gray-100 pb-6">
          <div className="flex flex-col">
            <SelectField
              label="Package Type"
              required
              value={packageType}
              onChange={setPackageType}
              options={[
                { value: "parcel", label: "Parcel" }
              ]}
              placeholder="Select Package Type..."
            />
            <div className="flex flex-col items-start gap-3 mt-3 pl-1">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input 
                  type="checkbox" 
                  checked={isDocument}
                  onChange={(e) => setIsDocument(e.target.checked)}
                  className="w-4 h-4 text-[#081b4c] border-gray-300 rounded focus:ring-[#081b4c]" 
                />
                <span className="text-sm font-bold text-gray-700 group-hover:text-[#081b4c] transition-colors">Documents</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer group">
                <input 
                  type="checkbox" 
                  checked={isCommodity}
                  onChange={(e) => setIsCommodity(e.target.checked)}
                  className="w-4 h-4 text-[#081b4c] border-gray-300 rounded focus:ring-[#081b4c]" 
                />
                <span className="text-sm font-bold text-gray-700 group-hover:text-[#081b4c] transition-colors">Products and Commodities</span>
              </label>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-start gap-4">
              <SelectField
                label="Number of Boxes"
                value={numBoxes}
                onChange={setNumBoxes}
                options={Array.from({ length: 10 }, (_, i) => ({ value: String(i + 1), label: String(i + 1) }))}
                containerClassName="flex-1"
              />
            </div>
            <div className="flex items-center gap-2 mt-1">
              <input
                type="checkbox"
                id="showBoxesSize"
                checked={showBoxesSize}
                onChange={(e) => setShowBoxesSize(e.target.checked)}
                className="w-4 h-4 text-[#081b4c] border-gray-300 rounded focus:ring-[#081b4c]"
              />
              <label htmlFor="showBoxesSize" className="text-sm text-gray-700 font-bold">
                Show Boxes Size
              </label>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between -mb-2">
          <div className="w-64">
            <SelectField
              searchable
              value={currency}
              onChange={setCurrency}
              options={currencyOptions}
              placeholder="Currency"
            />
          </div>
          <button 
            onClick={(e) => { e.preventDefault(); handleCopyAllBoxes(); }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-50 text-[#081b4c] hover:bg-[#081b4c] hover:text-white transition-colors border border-blue-100 shadow-sm font-bold text-sm"
            title="Copy Box 1 to all boxes"
          >
            <Files className="w-4 h-4" />
            Copy All
          </button>
        </div>

        {boxesData.map((box, idx) => (
          <div key={idx} className="flex flex-col gap-2">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-5 bg-gray-50/50 rounded-xl border border-gray-100">
              <div className="flex flex-col md:col-span-1">
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Box</label>
                <div className="text-gray-900 font-extrabold text-xl h-[42px] flex items-center">
                  #{idx + 1}
                </div>
              </div>
              
              <div className="relative md:col-span-2">
                <InputField label="Weight" type="number" placeholder="e.g. 10" value={box.weight} onChange={(e) => handleBoxChange(idx, 'weight', e.target.value)} />
                <span className="absolute right-3 top-[34px] text-sm font-medium text-gray-500">kg</span>
              </div>

              <div className={`flex flex-col gap-1.5 ${showBoxesSize ? "md:col-span-12" : "md:col-span-6"}`}>
                <label className="text-sm font-bold text-gray-700">Dimensions (L × W × H cm)</label>
                <div className="grid grid-cols-3 gap-3">
                  <input type="number" placeholder="L" className="w-full px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 transition-all bg-white border border-gray-300" value={box.length} onChange={(e) => handleBoxChange(idx, 'length', e.target.value)} />
                  <input type="number" placeholder="W" className="w-full px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 transition-all bg-white border border-gray-300" value={box.width} onChange={(e) => handleBoxChange(idx, 'width', e.target.value)} />
                  <input type="number" placeholder="H" className="w-full px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 transition-all bg-white border border-gray-300" value={box.height} onChange={(e) => handleBoxChange(idx, 'height', e.target.value)} />
                </div>
              </div>

              {showBoxesSize && (
                <div className="md:col-span-12 grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  <SelectField
                    label="Box Type"
                    value={box.boxType}
                    onChange={(val) => handleBoxChange(idx, 'boxType', val)}
                    options={[
                      { value: "custom", label: "Custom Box" },
                      { value: "flyer", label: "Flyer" },
                      { value: "small", label: "Small Box" },
                      { value: "medium", label: "Medium Box" },
                      { value: "large", label: "Large Box" }
                    ]}
                  />
                  <div className="flex flex-col justify-end">
                    <button 
                      className="h-[42px] px-4 rounded-xl border border-gray-300 bg-white text-gray-700 font-bold text-sm hover:bg-gray-50 transition-colors shadow-sm w-full md:w-auto"
                    >
                      Save as Custom Box
                    </button>
                  </div>
                </div>
              )}

              <div className={`flex flex-col gap-1.5 ${showBoxesSize ? "md:col-span-12" : "md:col-span-3"}`}>
                <label className="text-sm font-bold text-gray-700">Customs Value</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-gray-400">
                    {currencyOptions.find(c => c.value === currency)?.label.split(" ")[0] || "£"}
                  </span>
                  <input type="number" placeholder="0.00" className="w-full pl-8 pr-4 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 transition-all bg-white border border-gray-300 font-bold" value={box.customs} onChange={(e) => handleBoxChange(idx, 'customs', e.target.value)} />
                </div>
              </div>

            </div>
            
            {idx < boxesData.length - 1 && (
              <div className="flex justify-end -mt-3 -mb-1 relative z-10 pr-4">
                <button 
                  onClick={(e) => { e.preventDefault(); handleCopyNextBox(idx); }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-gray-200 shadow-sm hover:bg-gray-50 text-xs font-bold text-gray-600 transition-colors"
                  title="Copy to next box"
                  aria-label="Copy to next box"
                >
                  <ArrowDownToLine className="w-3.5 h-3.5" />
                  Copy to Next
                </button>
              </div>
            )}
          </div>
        ))}

      </div>
    </div>
  );
});
