import React, { useState } from 'react';
import { Modal } from "@/components/common/Modal";
import { InputField } from "@/components/common/InputField";
import { SelectField } from "@/components/common/SelectField";
import { Search } from 'lucide-react';

interface ProductEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: { sku: string; name: string; qty: string; [key: string]: any };
  onSave?: (updatedProduct: any) => void;
}

export function ProductEditModal({ isOpen, onClose, product, onSave }: ProductEditModalProps) {
  const [formData, setFormData] = useState({
    name: product?.name || "",
    sku: product?.sku || "",
    qty: product?.qty || "",
    // We can add the other fields as placeholders
    length: "", width: "", height: "", dimensionUnit: "CM",
    inventoryBin: "",
    primaryImageUrl: "",
    exportDescription: "",
    commodityCode1: "00", commodityCode2: "00", commodityCode3: "00", commodityCode4: "00", commodityCode5: "00",
    unitWeight: "0",
    customsUnitValue: "",
    manufacturedIn: ""
  });

  // Update formData when product changes
  React.useEffect(() => {
    if (isOpen && product) {
      setFormData(prev => ({
        ...prev,
        name: product.name || "",
        sku: product.sku || "",
        qty: product.qty || ""
      }));
    }
  }, [isOpen, product]);

  const handleSave = () => {
    if (onSave) {
      onSave(formData);
    }
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Product Add/Edit"
      maxWidthClass="max-w-5xl"
      footer={
        <>
          <button onClick={onClose} className="px-6 py-2 text-sm font-semibold text-white bg-[#249cbd] hover:bg-[#1d82a0] rounded-md transition-colors">CANCEL</button>
          <button onClick={handleSave} className="px-6 py-2 text-sm font-semibold text-white bg-[#1d82a0] hover:bg-[#156a85] rounded-md transition-colors">SAVE</button>
        </>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-5 items-start">
        
        {/* ROW 1: Select & Search (Left side only) */}
        <div className="flex items-center gap-4">
          <div className="w-1/2">
            <SelectField
              value=""
              onChange={() => {}}
              options={[{ value: "", label: "Select One" }]}
            />
          </div>
          <div className="w-1/2 relative">
            <input 
              type="text" 
              placeholder="Search" 
              className="w-full pl-3 pr-10 py-2.5 bg-white border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#249cbd]/20 focus:border-[#249cbd] transition-all"
            />
            <Search className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>
        <div className="hidden lg:block"></div>

        {/* ROW 2: Headers */}
        <h4 className="font-semibold text-gray-600 text-sm tracking-wide mt-2">PRODUCT DATA</h4>
        <h4 className="font-semibold text-gray-600 text-sm tracking-wide mt-2 hidden lg:block">COMMERCIAL INVOICE DATA</h4>

        {/* ROW 3 */}
        <div className="flex flex-col gap-1 w-full">
          <InputField 
            label="Product Name/Listing Name(90 Characters Remaining)" 
            value={formData.name} 
            onChange={e => setFormData({...formData, name: e.target.value})} 
            placeholder="Enter product name"
            containerClassName="text-xs"
          />
        </div>
        <h4 className="font-semibold text-gray-600 text-sm tracking-wide mt-6 lg:hidden">COMMERCIAL INVOICE DATA</h4>
        <div className="flex flex-col gap-1 w-full">
          <InputField 
            label="Export Description (90 Characters Remaining)" 
            value={formData.exportDescription} 
            onChange={e => setFormData({...formData, exportDescription: e.target.value})} 
            placeholder="Enter product description"
            containerClassName="text-xs"
          />
        </div>

        {/* ROW 4 */}
        <div className="flex flex-col gap-1 w-full">
          <label className="block text-xs font-bold text-gray-700">Product Dimensions</label>
          <div className="flex items-center gap-2">
            <input type="number" value={formData.length} onChange={e => setFormData({...formData, length: e.target.value})} placeholder="0" className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#249cbd]/20 focus:border-[#249cbd] transition-all" />
            <input type="number" value={formData.width} onChange={e => setFormData({...formData, width: e.target.value})} placeholder="0" className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#249cbd]/20 focus:border-[#249cbd] transition-all" />
            <input type="number" value={formData.height} onChange={e => setFormData({...formData, height: e.target.value})} placeholder="0" className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#249cbd]/20 focus:border-[#249cbd] transition-all" />
            <div className="w-32">
              <SelectField
                value={formData.dimensionUnit}
                onChange={v => setFormData({...formData, dimensionUnit: v})}
                options={[
                  { value: "CM", label: "CM" },
                  { value: "IN", label: "IN" }
                ]}
                className="!py-2.5 rounded-md"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-1 w-full">
          <div className="flex justify-between items-end mb-1">
            <label className="block text-xs font-bold text-gray-700">Product Commodity Code (Required for exports)</label>
            <div className="text-[#249cbd] text-xs flex flex-col items-end">
              <a href="#" className="hover:underline">Trade Tariff Service lookup</a>
              <span className="text-gray-800 font-serif font-bold text-sm tracking-tighter mt-1">♔</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <input type="text" value={formData.commodityCode1} onChange={e => setFormData({...formData, commodityCode1: e.target.value})} className="w-12 h-10 text-center bg-[#c9ccdf] text-gray-700 focus:outline-none" />
            <input type="text" value={formData.commodityCode2} onChange={e => setFormData({...formData, commodityCode2: e.target.value})} className="w-12 h-10 text-center bg-[#a6cce3] text-gray-700 focus:outline-none" />
            <input type="text" value={formData.commodityCode3} onChange={e => setFormData({...formData, commodityCode3: e.target.value})} className="w-12 h-10 text-center bg-[#a6e0d3] text-gray-700 focus:outline-none" />
            <input type="text" value={formData.commodityCode4} onChange={e => setFormData({...formData, commodityCode4: e.target.value})} className="w-12 h-10 text-center bg-[#a6e0d3] text-gray-700 focus:outline-none" />
            <input type="text" value={formData.commodityCode5} onChange={e => setFormData({...formData, commodityCode5: e.target.value})} className="w-12 h-10 text-center bg-[#a6e0d3] text-gray-700 focus:outline-none" />
          </div>
        </div>

        {/* ROW 5 */}
        <div className="flex flex-col gap-1 w-full">
          <InputField 
            label="SKU/Variant SKU" 
            value={formData.sku} 
            onChange={e => setFormData({...formData, sku: e.target.value})} 
            placeholder="Enter Stock Keeping Unit"
            containerClassName="text-xs"
          />
        </div>
        <div className="flex flex-col gap-1 w-full">
          <InputField 
            label="Unit Weight" 
            value={formData.unitWeight} 
            onChange={e => setFormData({...formData, unitWeight: e.target.value})} 
            containerClassName="text-xs"
          />
        </div>

        {/* ROW 6 */}
        <div className="flex flex-col gap-1 w-full">
          <InputField 
            label="Inventory Bin (Item Location in Warehouse)" 
            value={formData.inventoryBin} 
            onChange={e => setFormData({...formData, inventoryBin: e.target.value})} 
            placeholder="E.g. 01-12-01-02 (Format = Warehouse - Aisle - Bay - Shelf)"
            containerClassName="text-xs"
          />
        </div>
        <div className="flex flex-col gap-1 w-full">
          <InputField 
            label="Customs Unit Value GB" 
            value={formData.customsUnitValue} 
            onChange={e => setFormData({...formData, customsUnitValue: e.target.value})} 
            placeholder="Enter unit value for commercial invoices"
            containerClassName="text-xs"
          />
        </div>

        {/* ROW 7 */}
        <div className="flex flex-col gap-1 w-full">
          <InputField 
            label="Primary Image URL" 
            value={formData.primaryImageUrl} 
            onChange={e => setFormData({...formData, primaryImageUrl: e.target.value})} 
            placeholder="Add image url"
            containerClassName="text-xs"
          />
        </div>
        <div className="flex flex-col gap-1 w-full">
          <SelectField
            label="Manufactured In"
            value={formData.manufacturedIn}
            onChange={v => setFormData({...formData, manufacturedIn: v})}
            options={[
              { value: "", label: "Select Country" },
              { value: "UK", label: "United Kingdom" },
              { value: "US", label: "United States" },
              { value: "CN", label: "China" }
            ]}
            containerClassName="text-xs"
          />
        </div>

      </div>
    </Modal>
  );
}
