import React, { useState } from 'react';
import { Modal } from "@/components/ui/Modal";
import { InputField } from "@/components/ui/InputField";
import { SelectField } from "@/components/ui/SelectField";
import { Plus, Minus, Edit, HelpCircle } from 'lucide-react';
import clsx from 'clsx';
import { SoldToAddressModal } from "@/components/features/shipment/ship-manager/SoldToAddressModal";
import { ProductEditModal } from "@/components/features/shipment/ship-manager/ProductEditModal";

interface CommercialInvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (items: any[]) => void;
}

export function CommercialInvoiceModal({ isOpen, onClose, onSave }: CommercialInvoiceModalProps) {
  // General details state
  const [shipmentDetails, setShipmentDetails] = useState({
    typeOfShipment: "B2B (Business)",
    commercialInvoice: "Generate Commercial Invoice",
    invoiceType: "paperless",
    vatNumber: "",
    eori: "GB764431527000",
    senderUkims: "",
    receiverUkims: "",
    invoiceNumber: "",
    soldToAddress: "A B Motors, Pronoy Paul, 98 Dunnamona Road, Omagh, County Tyrone, Tyrone, BT78 1SW",
    typeOfExport: "Permanent",
    reasonForExport: "Sale",
    totalCustomsValue: "300.00",
    additionalComments: ""
  });

  const [isSoldToAddressModalOpen, setIsSoldToAddressModalOpen] = useState(false);

  // Invoice items state
  const [items, setItems] = useState([
    { id: Date.now(), sku: "", description: "", unitWeight: "0", manufacturedIn: "UK", commodityCode: "", quantity: "0", unitPrice: "0" }
  ]);

  const [editingProductItemId, setEditingProductItemId] = useState<number | null>(null);

  const handleAddItem = () => {
    setItems([...items, { id: Date.now(), sku: "", description: "", unitWeight: "0", manufacturedIn: "UK", commodityCode: "", quantity: "0", unitPrice: "0" }]);
  };

  const handleRemoveItem = (idToRemove: number) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== idToRemove));
    }
  };

  const handleChange = (id: number, field: string, value: string) => {
    setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const handleSave = () => {
    if (onSave) onSave(items);
    onClose();
  };

  const totalUnitWeight = items.reduce((sum, item) => sum + (parseFloat(item.unitWeight) || 0), 0);
  const totalWeight = items.reduce((sum, item) => sum + ((parseFloat(item.unitWeight) || 0) * (parseFloat(item.quantity) || 0)), 0);
  const totalLinePrice = items.reduce((sum, item) => sum + ((parseFloat(item.unitPrice) || 0) * (parseFloat(item.quantity) || 0)), 0);

  // Helper for form rows
  const FormRow = ({ label, children, rightContent, colSpan = 1 }: { label: string, children: React.ReactNode, rightContent?: React.ReactNode, colSpan?: number }) => (
    <div className={clsx("flex flex-col gap-1.5 mb-2", colSpan === 2 && "md:col-span-2")}>
      <span className="font-bold text-gray-700 text-sm">{label}</span>
      <div className="flex items-center gap-4 w-full">
        <div className="flex-1">
          {children}
        </div>
        {rightContent && (
          <div className="flex-shrink-0">
            {rightContent}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Additional Shipment Details"
      maxWidthClass="max-w-6xl"
      footer={
        <>
          <button onClick={onClose} className="px-6 py-2 text-sm font-semibold text-white bg-[#081b4c] hover:bg-[#06143c] rounded-md transition-colors">CANCEL</button>
          <button onClick={handleSave} className="px-6 py-2 text-sm font-semibold text-white bg-[#081b4c] hover:bg-[#06143c] rounded-md transition-colors">SAVE</button>
        </>
      }
    >
      <div className="flex flex-col gap-6">
        
        {/* Top Details Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 w-full max-w-5xl mx-auto py-2">
          
          <div className="md:col-span-2 flex flex-col md:flex-row gap-8 w-full">
            <div className="w-full md:w-1/2">
              <FormRow label="Type of Shipment">
                <SelectField
                  value={shipmentDetails.typeOfShipment}
                  onChange={(val) => setShipmentDetails({ ...shipmentDetails, typeOfShipment: val })}
                  options={[{ value: "B2B (Business)", label: "B2B (Business)" }, { value: "B2C (Consumer)", label: "B2C (Consumer)" }]}
                />
              </FormRow>
            </div>

            <div className="w-full md:w-1/2">
              <FormRow label="Commercial Invoice">
                <div className="w-full">
                  <SelectField
                    value={shipmentDetails.commercialInvoice}
                    onChange={(val) => setShipmentDetails({ ...shipmentDetails, commercialInvoice: val })}
                    className="bg-gray-200 border-gray-300"
                    options={[{ value: "Generate Commercial Invoice", label: "Generate Commercial Invoice" }]}
                  />
                </div>
                <div className="flex flex-row items-center gap-6 mt-3">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="invoiceType" 
                      value="paper" 
                      checked={shipmentDetails.invoiceType === 'paper'}
                      onChange={() => setShipmentDetails({...shipmentDetails, invoiceType: 'paper'})}
                      className="w-4 h-4 text-[#249cbd] border-gray-300 focus:ring-[#249cbd] accent-[#249cbd]" 
                    />
                    <span className="text-xs font-semibold text-gray-600">Paper Commercial Invoice (Attach to box)</span>
                  </label>
                  <div className="flex items-center gap-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="radio" 
                        name="invoiceType" 
                        value="paperless" 
                        checked={shipmentDetails.invoiceType === 'paperless'}
                        onChange={() => setShipmentDetails({...shipmentDetails, invoiceType: 'paperless'})}
                        className="w-4 h-4 text-[#249cbd] border-gray-300 focus:ring-[#249cbd] accent-[#249cbd]" 
                      />
                      <span className="text-xs font-semibold text-gray-600">paperless (automatically transmits)</span>
                    </label>
                    <div className="w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center ml-2">
                      <span className="text-[10px] font-bold">?</span>
                    </div>
                  </div>
                </div>
              </FormRow>
            </div>
          </div>

          <FormRow label="VAT Number (Applicable if VAT registered)">
            <input 
              type="text" 
              value={shipmentDetails.vatNumber}
              onChange={(e) => setShipmentDetails({...shipmentDetails, vatNumber: e.target.value})}
              placeholder="VAT number"
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#249cbd]/20 focus:border-[#249cbd] transition-all"
            />
          </FormRow>

          <FormRow label="EORI">
            <input 
              type="text" 
              value={shipmentDetails.eori}
              onChange={(e) => setShipmentDetails({...shipmentDetails, eori: e.target.value})}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#249cbd]/20 focus:border-[#249cbd] transition-all"
            />
          </FormRow>

          <FormRow label="Sender UKIMS Number" rightContent={
            <div className="w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center">
              <span className="text-xs font-bold">?</span>
            </div>
          }>
            <input 
              type="text" 
              value={shipmentDetails.senderUkims}
              onChange={(e) => setShipmentDetails({...shipmentDetails, senderUkims: e.target.value})}
              placeholder="Sender UKIMS Number"
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#249cbd]/20 focus:border-[#249cbd] transition-all"
            />
          </FormRow>

          <FormRow label="Receiver UKIMS Number">
            <input 
              type="text" 
              value={shipmentDetails.receiverUkims}
              onChange={(e) => setShipmentDetails({...shipmentDetails, receiverUkims: e.target.value})}
              placeholder="Receiver UKIMS Number"
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#249cbd]/20 focus:border-[#249cbd] transition-all"
            />
          </FormRow>

          <FormRow label="Sold To Address" colSpan={2}>
            <div className="flex items-center gap-3 pt-0.5 w-full md:w-[calc(50%-1rem)]">
              <span className="text-sm font-medium text-gray-700 bg-gray-50 px-3 py-2 rounded-md border border-gray-200 w-full flex-1 truncate">{shipmentDetails.soldToAddress || "Click edit to add address"}</span>
              <Edit 
                className="w-5 h-5 text-[#249cbd] cursor-pointer hover:text-[#1d82a0] transition-colors flex-shrink-0" 
                onClick={() => setIsSoldToAddressModalOpen(true)}
              />
            </div>
          </FormRow>

          <FormRow label="Invoice Number (Mandatory for DHL)" colSpan={2}>
            <div className="w-full md:w-[calc(50%-1rem)]">
              <input 
                type="text" 
                value={shipmentDetails.invoiceNumber}
                onChange={(e) => setShipmentDetails({...shipmentDetails, invoiceNumber: e.target.value})}
                placeholder="Invoice number"
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#249cbd]/20 focus:border-[#249cbd] transition-all"
              />
            </div>
          </FormRow>

          <FormRow label="Type of Export">
            <SelectField
              value={shipmentDetails.typeOfExport}
              onChange={(val) => setShipmentDetails({ ...shipmentDetails, typeOfExport: val })}
              options={[{ value: "Permanent", label: "Permanent" }, { value: "Temporary", label: "Temporary" }]}
            />
          </FormRow>

          <FormRow label="Reason for Export">
            <SelectField
              value={shipmentDetails.reasonForExport}
              onChange={(val) => setShipmentDetails({ ...shipmentDetails, reasonForExport: val })}
              options={[{ value: "Sale", label: "Sale" }, { value: "Gift", label: "Gift" }]}
            />
          </FormRow>
        </div>

        {/* Divider and Commercial Invoice Details Section */}
        <div className="w-full mt-2">
          <div className="bg-[#1e2a38] text-white text-sm font-semibold px-4 py-2 inline-block rounded-sm mb-4">
            Commercial Invoice Details
          </div>
          
          <div className="flex flex-col gap-6">
            {items.map((item, index) => {
              const qty = parseFloat(item.quantity) || 0;
              const price = parseFloat(item.unitPrice) || 0;
              const lineTotal = (qty * price).toFixed(2);

              return (
                <div key={item.id} className="border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow relative pt-5 pb-5 px-6 bg-white">
                  
                  <div className="flex items-end gap-4 w-full">
                    <div className="flex flex-col items-center mb-2 w-8">
                      <span className="text-xs font-bold text-gray-700 mb-2">No.</span>
                      <span className="text-sm font-medium text-gray-600">{index + 1}</span>
                    </div>

                    <div className="flex-1 min-w-[120px]">
                      <InputField
                        label="SKU"
                        value={item.sku}
                        onChange={(e) => handleChange(item.id, "sku", e.target.value)}
                        placeholder="SKU"
                        containerClassName="text-xs"
                      />
                    </div>

                    <div className="flex-[2.5] relative">
                      <InputField
                        label="Exact Description Of Goods ( 90 )"
                        value={item.description}
                        onChange={(e) => handleChange(item.id, "description", e.target.value)}
                        placeholder="Add Product/Type Exact Description of Goods"
                        containerClassName="text-xs"
                        className="pr-8"
                      />
                      <div 
                        className="absolute right-3 bottom-2.5 cursor-pointer text-gray-400 hover:text-[#081b4c] transition-colors z-10"
                        onClick={() => setEditingProductItemId(item.id)}
                      >
                        <Edit className="w-4 h-4 text-inherit" />
                      </div>
                    </div>

                    <div className="flex-1 min-w-[100px]">
                      <InputField
                        label="Unit Weight (kg)"
                        value={item.unitWeight}
                        onChange={(e) => handleChange(item.id, "unitWeight", e.target.value)}
                        containerClassName="text-xs"
                      />
                    </div>

                    <div className="flex-1 min-w-[140px]">
                      <SelectField
                        label="Manufactured In"
                        value={item.manufacturedIn}
                        onChange={(val) => handleChange(item.id, "manufacturedIn", val)}
                        options={[
                          { value: "UK", label: "UK" },
                          { value: "US", label: "US" },
                          { value: "CN", label: "CN" }
                        ]}
                        containerClassName="text-xs"
                      />
                    </div>

                    <div className="flex items-center justify-center mb-1 w-10">
                      {index === 0 ? (
                        <button
                          onClick={handleAddItem}
                          className="w-7 h-7 rounded-full bg-[#5cb85c] hover:bg-[#4cae4c] flex items-center justify-center text-white transition-colors"
                          title="Add Item"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="w-7 h-7 rounded-full bg-[#d9534f] hover:bg-[#c9302c] flex items-center justify-center text-white transition-colors"
                          title="Remove Item"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Bottom Row */}
                  <div className="flex items-center gap-4 mt-4 pl-12 w-full">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-gray-700">Commodity Code</span>
                      <input
                        type="text"
                        value={item.commodityCode}
                        onChange={(e) => handleChange(item.id, "commodityCode", e.target.value)}
                        placeholder="Commodity Code"
                        className="w-40 px-3 py-2 bg-white border border-gray-200 rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-[#249cbd]/20 focus:border-[#249cbd] transition-all"
                      />
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-gray-700">Quantity</span>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => handleChange(item.id, "quantity", e.target.value)}
                        placeholder="0"
                        className="w-24 px-3 py-2 bg-white border border-gray-200 rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-[#249cbd]/20 focus:border-[#249cbd] transition-all"
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-gray-700">Unit Price</span>
                      <input
                        type="number"
                        value={item.unitPrice}
                        onChange={(e) => handleChange(item.id, "unitPrice", e.target.value)}
                        placeholder="0"
                        className="w-24 px-3 py-2 bg-white border border-gray-200 rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-[#249cbd]/20 focus:border-[#249cbd] transition-all"
                      />
                    </div>

                    <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-sm ml-2">
                      <span className="text-sm font-semibold text-gray-600">Line Total : {lineTotal}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Calculations & Comments */}
          <div className="flex flex-col gap-4 mt-6 items-end w-full">
            <div className="text-sm text-gray-800 font-bold mb-2">
              Total Unit Weight: {totalUnitWeight.toFixed(2)} (kg) <span className="font-normal text-gray-400 mx-1">|</span> Total Weight: {totalWeight.toFixed(2)} (kg)
            </div>

            <div className="flex items-center gap-4 w-[400px]">
              <span className="text-sm font-semibold text-gray-700 w-1/3 text-right">Total</span>
              <div className="flex-1">
                <input 
                  type="text" 
                  value={`KM${totalLinePrice.toFixed(2)}`} 
                  readOnly 
                  className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-sm text-sm outline-none text-gray-600"
                />
              </div>
            </div>

            <div className="flex items-center gap-4 w-[400px]">
              <span className="text-sm font-semibold text-gray-700 w-1/3 text-right">Total Customs Value</span>
              <div className="flex-1 relative">
                <input 
                  type="text" 
                  value={`KM${shipmentDetails.totalCustomsValue}`}
                  onChange={(e) => setShipmentDetails({...shipmentDetails, totalCustomsValue: e.target.value.replace('KM', '')})}
                  className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-[#249cbd]/20 focus:border-[#249cbd] transition-all pr-8"
                />
                <Edit className="w-4 h-4 text-gray-600 absolute right-3 top-[12px] cursor-pointer" />
              </div>
            </div>

            <div className="flex items-center gap-4 w-full mt-4">
              <span className="text-sm font-semibold text-gray-700 w-1/4 max-w-[200px] text-right">Additional Comments</span>
              <div className="flex-1">
                <input 
                  type="text" 
                  value={shipmentDetails.additionalComments}
                  onChange={(e) => setShipmentDetails({...shipmentDetails, additionalComments: e.target.value})}
                  className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-[#249cbd]/20 focus:border-[#249cbd] transition-all"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <SoldToAddressModal
        isOpen={isSoldToAddressModalOpen}
        onClose={() => setIsSoldToAddressModalOpen(false)}
        onSave={(data) => {
          // Format the address for display
          const addressString = [
            data.company, 
            data.contactName, 
            data.addressLine1, 
            data.city, 
            data.country, 
            data.postCode
          ].filter(Boolean).join(", ");
          setShipmentDetails({ ...shipmentDetails, soldToAddress: addressString });
        }}
      />

      {/* Product Edit Modal */}
      {editingProductItemId !== null && (
        <ProductEditModal
          isOpen={editingProductItemId !== null}
          onClose={() => setEditingProductItemId(null)}
          product={{
            ...items.find(i => i.id === editingProductItemId),
            name: items.find(i => i.id === editingProductItemId)?.description || "",
            qty: items.find(i => i.id === editingProductItemId)?.quantity || "",
            sku: items.find(i => i.id === editingProductItemId)?.sku || "",
          }}
          onSave={(updatedProduct) => {
            setItems(items.map(item => item.id === editingProductItemId ? {
              ...item,
              sku: updatedProduct.sku || item.sku,
              description: updatedProduct.name || item.description,
              quantity: updatedProduct.qty || item.quantity,
              unitWeight: updatedProduct.unitWeight || item.unitWeight,
            } : item));
            setEditingProductItemId(null);
          }}
        />
      )}
    </Modal>
  );
}
