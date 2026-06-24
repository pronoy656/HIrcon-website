"use client";

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Plus, Minus, ChevronRight, Printer, Search, Edit, Phone, Mail } from 'lucide-react';
import clsx from 'clsx';
import { Modal } from "@/components/common/Modal";
import { SelectField } from "@/components/common/SelectField";
import { InputField } from "@/components/common/InputField";
import { PostCodeModal } from "@/components/common/PostCodeModal";
import { ProductEditModal } from "@/components/dashboard/ship/ship-manager/ProductEditModal";
import { CommercialInvoiceModal } from "@/components/dashboard/ship/ship-manager/CommercialInvoiceModal";

const collectionCompaniesData: Record<string, { address1: string; address2: string; phone: string; email: string }> = {
  "AB Motors": {
    address1: "98 Dunnamona Road Omagh Tyrone",
    address2: "BT78 1SW, UK",
    phone: "07921618 178",
    email: "contact@abmotors.com"
  },
  "A Ready": {
    address1: "12 Ready Street, London",
    address2: "E14 5AB, UK",
    phone: "07888123456",
    email: "info@aready.com"
  },
  "A Bookcan": {
    address1: "34 Bookcan Avenue, Manchester",
    address2: "M1 1AA, UK",
    phone: "07777123456",
    email: "hello@abookcan.com"
  },
  "A Corican": {
    address1: "56 Corican Road, Birmingham",
    address2: "B1 1BB, UK",
    phone: "07666123456",
    email: "support@acorican.com"
  },
  "AD Tyres": {
    address1: "78 Tyres Lane, Leeds",
    address2: "LS1 1CC, UK",
    phone: "07555123456",
    email: "sales@adtyres.com"
  }
};

export function ShipManager() {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [isSpecificCarrierOpen, setIsSpecificCarrierOpen] = useState(false);
  const [isBatchProcessing, setIsBatchProcessing] = useState(false);
  
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [collectionOption, setCollectionOption] = useState("");
  const [collectionAddress, setCollectionAddress] = useState("");

  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isEcommerceOpen, setIsEcommerceOpen] = useState(false);
  const [activePlatform, setActivePlatform] = useState<string | null>(null);
  const [activeAction, setActiveAction] = useState<string | null>(null);

  const [isNewRecordOpen, setIsNewRecordOpen] = useState(false);
  const [newRecordPackageType, setNewRecordPackageType] = useState("Non Document");
  const [commercialInvoiceOption, setCommercialInvoiceOption] = useState("Generate commercial invoice");
  const [dutiesTaxesOption, setDutiesTaxesOption] = useState("Duties to be paid by receiver");
  const [newRecordPackages, setNewRecordPackages] = useState([
    { id: 1, weight: "", boxSize: "My Packaging", length: "", width: "", height: "" }
  ]);
  
  const [isReceiverOpen, setIsReceiverOpen] = useState(false);
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
  const [isPostCodeModalOpen, setIsPostCodeModalOpen] = useState(false);
  const [isCommercialInvoiceModalOpen, setIsCommercialInvoiceModalOpen] = useState(false);
  
  const [receiverData, setReceiverData] = useState({
    addressBook: "", company: "", contactName: "",
    addressLine1: "", addressLine2: "", addressLine3: "",
    country: "", city: "", postCode: "", phone: "", email: "",
    collectionCompany: ""
  });
  const [descriptionData, setDescriptionData] = useState({
    exactDescription: "", leaveSafe: "", labelSafe: ""
  });

  const [products, setProducts] = useState([
    { id: 1, sku: "", name: "", qty: "" }
  ]);
  const [editingProductIndex, setEditingProductIndex] = useState<number | null>(null);

  const handleAddProduct = () => {
    setProducts([
      ...products,
      { id: Date.now(), sku: "", name: "", qty: "" }
    ]);
  };

  const handleRemoveProduct = (indexToRemove: number) => {
    setProducts(products.filter((_, index) => index !== indexToRemove));
  };

  const handleAddPackage = () => {
    setNewRecordPackages([
      ...newRecordPackages,
      { id: newRecordPackages.length + 1, weight: "", boxSize: "My Packaging", length: "", width: "", height: "" }
    ]);
  };

  const quoteRef = useRef<HTMLDivElement>(null);
  const moreRef = useRef<HTMLDivElement>(null);
  const ecommerceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (quoteRef.current && !quoteRef.current.contains(event.target as Node)) {
        setIsQuoteOpen(false);
        setIsSpecificCarrierOpen(false);
      }
      if (moreRef.current && !moreRef.current.contains(event.target as Node)) {
        setIsMoreOpen(false);
      }
      if (ecommerceRef.current && !ecommerceRef.current.contains(event.target as Node)) {
        setIsEcommerceOpen(false);
        setActivePlatform(null);
        setActiveAction(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="p-6 bg-[#f4f7f9] min-h-screen font-sans">
      
      {/* Top Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        
        {/* Left Side Actions */}
        <div className="flex flex-wrap items-center gap-2">
          <button 
            onClick={() => setIsNewRecordOpen(!isNewRecordOpen)}
            className="bg-[#081b4c] hover:bg-[#06143c] text-white text-xs font-semibold px-4 py-2.5 rounded-sm flex items-center gap-2 transition-colors border border-[#081b4c]"
          >
            NEW RECORD <Plus className="w-4 h-4" />
          </button>
          
          <button className="bg-white hover:bg-gray-50 text-[#081b4c] border border-[#081b4c] text-xs font-semibold px-4 py-2.5 rounded-sm transition-colors">
            UPLOAD CSV
          </button>
          
          <button className="bg-[#081b4c] hover:bg-[#06143c] text-white border border-[#081b4c] text-xs font-semibold px-4 py-2.5 rounded-sm transition-colors">
            SAVE CHANGES
          </button>
          
          {/* More Dropdown */}
          <div className={clsx("relative", isMoreOpen && "z-[60]")} ref={moreRef}>
            <button 
              onClick={() => setIsMoreOpen(!isMoreOpen)}
              className="bg-white hover:bg-gray-50 text-[#081b4c] border border-[#081b4c] text-xs font-semibold px-4 py-2.5 rounded-sm flex items-center gap-1 transition-colors"
            >
              MORE <ChevronDown className="w-4 h-4" />
            </button>
            {isMoreOpen && (
              <div className="absolute top-full left-0 mt-1 w-56 bg-white border border-gray-200 shadow-lg rounded-sm py-1 z-50">
                {[
                  'CSV Mapping', 'Cancel Changes', 'Merge', 'Duplicate', 
                  'Delete Selected', 'Delete All', 'Bulk Com.Invoice', 
                  'Bulk Update Selected', 'Bulk Update All', 'Spreadsheet Edit', 
                  'Reports', 'Bulk Add Tag'
                ].map(item => (
                  <button key={item} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-medium">
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Ecommerce Dropdown */}
          <div className={clsx("relative", isEcommerceOpen && "z-[60]")} ref={ecommerceRef}>
            <button 
              onClick={() => setIsEcommerceOpen(!isEcommerceOpen)}
              className="bg-white hover:bg-gray-50 text-[#081b4c] border border-[#081b4c] text-xs font-semibold px-4 py-2.5 rounded-sm flex items-center gap-1 transition-colors"
            >
              ECOMMERCE <ChevronDown className="w-4 h-4" />
            </button>
            {isEcommerceOpen && (
              <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 shadow-lg rounded-sm py-1 z-50">
                {['eBay', 'Shopify', 'WooCommerce', 'BigCommerce', 'Etsy', 'Magento 2'].map(platform => (
                  <div 
                    key={platform}
                    className="relative group"
                    onMouseEnter={() => setActivePlatform(platform)}
                    onMouseLeave={() => setActivePlatform(null)}
                  >
                    <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-medium flex items-center justify-between">
                      {platform} <ChevronRight className="w-4 h-4" />
                    </button>
                    
                    {activePlatform === platform && (
                      <div className="absolute top-0 left-full ml-1 w-48 bg-white border border-gray-200 shadow-lg rounded-sm py-1 z-50">
                        {['Pull Order', 'Push Tracking'].map(action => (
                          <div 
                            key={action}
                            className="relative group"
                            onMouseEnter={() => setActiveAction(action)}
                            onMouseLeave={() => setActiveAction(null)}
                          >
                            <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-medium flex items-center justify-between">
                              {action} <ChevronRight className="w-4 h-4" />
                            </button>
                            
                            {activeAction === action && (
                              <div className="absolute top-0 left-full ml-1 w-32 bg-white border border-gray-200 shadow-lg rounded-sm py-1 z-50">
                                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-medium">
                                  ALL
                                </button>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Toggle Switch */}
          <div 
            className="flex items-center gap-3 ml-4 cursor-pointer group" 
            onClick={() => setIsBatchProcessing(!isBatchProcessing)}
          >
            <button 
              className={clsx(
                "w-12 h-6 rounded-full relative transition-colors duration-200 ease-in-out border border-gray-300 flex-shrink-0",
                isBatchProcessing ? "bg-[#081b4c] border-[#081b4c]" : "bg-white"
              )}
            >
              <div 
                className={clsx(
                  "w-5 h-5 rounded-full absolute top-[1px] transition-transform duration-200 ease-in-out",
                  isBatchProcessing ? "translate-x-[25px] bg-white" : "translate-x-[1px] bg-[#081b4c]"
                )}
              />
            </button>
            <span className="text-xs text-[#081b4c] font-bold tracking-wider uppercase select-none group-hover:text-[#06143c] transition-colors">
              {isBatchProcessing ? 'Switch to Ship Manager' : 'Switch to Batch Processing'}
            </span>
          </div>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-2">
          {!isBatchProcessing ? (
            <>
              {/* Quote Dropdown */}
              <div className={clsx("relative", isQuoteOpen && "z-[60]")} ref={quoteRef}>
                <button 
                  onClick={() => setIsQuoteOpen(!isQuoteOpen)}
                  className="bg-white hover:bg-gray-50 text-[#081b4c] border border-[#081b4c] text-xs font-semibold px-4 py-2.5 rounded-sm flex items-center gap-1 transition-colors"
                >
                  QUOTE <ChevronDown className="w-4 h-4" />
                </button>
                
                {isQuoteOpen && (
                  <div className="absolute top-full right-0 mt-1 w-48 bg-white border border-gray-200 shadow-lg rounded-sm py-1 z-50">
                    <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-medium">Fastest Service</button>
                    <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-medium">Cheapest Service</button>
                    
                    <div 
                      className="relative group"
                      onMouseEnter={() => setIsSpecificCarrierOpen(true)}
                      onMouseLeave={() => setIsSpecificCarrierOpen(false)}
                    >
                      <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-medium flex items-center justify-between">
                        Specific Carrier <ChevronRight className="w-4 h-4" />
                      </button>
                      
                      {isSpecificCarrierOpen && (
                        <div className="absolute top-0 right-full mr-1 w-48 bg-white border border-gray-200 shadow-lg rounded-sm py-1 z-50">
                          {['City Sprint', 'DHL', 'DPD', 'FedEx', 'FedEx UK', 'FedEx TNT', 'UPS'].map(carrier => (
                            <button key={carrier} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-medium">
                              {carrier}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <button className="bg-[#081b4c] hover:bg-[#06143c] text-white border border-[#081b4c] text-xs font-semibold px-4 py-2.5 rounded-sm transition-colors">
                SHIP
              </button>
              
              <button className="bg-white hover:bg-gray-50 text-[#081b4c] border border-[#081b4c] text-xs font-semibold px-4 py-2.5 rounded-sm flex items-center gap-1 transition-colors">
                PRINT <Printer className="w-3.5 h-3.5 ml-1" />
              </button>
            </>
          ) : (
            <>
              <button className="bg-[#081b4c] hover:bg-[#06143c] text-white border border-[#081b4c] text-xs font-semibold px-4 py-2.5 rounded-sm transition-colors">
                SHIP
              </button>
              <button className="bg-white hover:bg-gray-50 text-[#081b4c] border border-[#081b4c] text-xs font-semibold px-4 py-2.5 rounded-sm transition-colors">
                BATCH LABEL
              </button>
            </>
          )}
        </div>
      </div>

      {/* New Record Panel */}
      {isNewRecordOpen && (
        <div className="bg-white rounded-sm p-6 mb-6 shadow-md border border-gray-200 overflow-x-auto">
          
          {/* Receiver & Description Section */}
          <div className="grid grid-cols-2 gap-16 mb-6 pb-6 border-b border-gray-100 min-w-[900px]">
            <div className="flex flex-col">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center text-gray-800">
                  <span className="font-bold text-base mr-1 text-[#081b4c]">Receiver:</span>
                  <span className="text-[15px]">{receiverData.contactName} {receiverData.company ? `(${receiverData.company})` : ''}</span>
                </div>
                <button onClick={() => setIsReceiverOpen(true)} className="text-gray-600 hover:text-[#249cbd] transition-colors" title="Edit Receiver">
                  <Edit className="w-5 h-5" />
                </button>
              </div>
              <div className="text-[15px] text-gray-600 space-y-1.5">
                <div>
                  {[receiverData.addressLine1, receiverData.addressLine2, receiverData.addressLine3, receiverData.city, receiverData.country, receiverData.postCode].filter(Boolean).join(", ")}
                </div>
                {receiverData.phone && (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-[#1e2a38] rounded-sm flex items-center justify-center flex-shrink-0">
                      <Phone className="w-3 h-3 text-white" />
                    </div>
                    <span>{receiverData.phone}</span>
                  </div>
                )}
                {receiverData.email && (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-[#1e2a38] rounded-sm flex items-center justify-center flex-shrink-0">
                      <Mail className="w-3 h-3 text-white" />
                    </div>
                    <span>{receiverData.email}</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center text-gray-800">
                  <span className="font-bold text-base mr-1 text-[#081b4c]">Exact Description:</span>
                  <span className="text-[15px]">{descriptionData.exactDescription}</span>
                </div>
                <button onClick={() => setIsDescriptionOpen(true)} className="text-gray-600 hover:text-[#249cbd] transition-colors" title="Edit Description">
                  <Edit className="w-5 h-5" />
                </button>
              </div>
              <div className="text-[15px] text-gray-800 space-y-1.5 mt-1">
                <div className="flex items-center">
                  <span className="font-bold text-base mr-1 text-[#081b4c]">Leave Safe:</span>
                  <span>{descriptionData.leaveSafe}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-bold text-base mr-1 text-[#081b4c]">Reference:</span>
                  <span>{descriptionData.labelSafe}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6 pb-6 border-b border-gray-100 min-w-[900px]">
            <button className="w-full bg-[#081b4c] hover:bg-[#0a2463] text-white font-bold py-3.5 rounded-md transition-all tracking-widest shadow-sm">
              QUOTE
            </button>
          </div>

          {/* Products Section */}
          <div className="mb-6 pb-6 border-b border-gray-100 min-w-[900px]">
            <div className="flex items-center w-3/4 mb-4">
              <button 
                onClick={handleAddProduct}
                className="flex items-center gap-1.5 px-4 py-2 bg-green-50 text-green-700 hover:bg-green-100 hover:text-green-800 rounded-md font-semibold text-sm transition-colors border border-green-200"
              >
                <Plus className="w-4 h-4" />
                Add Product
              </button>
            </div>
            
            <div className="flex flex-col gap-4">
              {products.map((prod, index) => (
                <div key={prod.id} className="flex items-end gap-4 w-3/4">
                  <div className="flex-1">
                    <InputField label="SKU" value={prod.sku} onChange={(e) => {
                      const newProds = [...products];
                      newProds[index].sku = e.target.value;
                      setProducts(newProds);
                    }} />
                  </div>
                  <div className="flex-[2]">
                    <InputField label="Name" value={prod.name} onChange={(e) => {
                      const newProds = [...products];
                      newProds[index].name = e.target.value;
                      setProducts(newProds);
                    }} />
                  </div>
                  <div className="w-32">
                    <InputField label="Quantity (QTY)" type="number" value={prod.qty} onChange={(e) => {
                      const newProds = [...products];
                      newProds[index].qty = e.target.value;
                      setProducts(newProds);
                    }} />
                  </div>
                  <div className="flex items-center gap-2 h-[42px]">
                    <button 
                      onClick={() => handleRemoveProduct(index)}
                      className="w-10 h-10 rounded-full bg-red-50 hover:bg-red-100 flex items-center justify-center text-red-500 transition-colors flex-shrink-0"
                      title="Remove Product"
                    >
                      <Minus className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => setEditingProductIndex(index)}
                      className="w-10 h-10 rounded-full bg-gray-50 hover:bg-gray-100 flex items-center justify-center text-gray-500 transition-colors flex-shrink-0"
                      title="Edit Product"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4 min-w-[900px] w-full">
            {newRecordPackages.map((pkg, index) => (
              <div key={pkg.id} className="flex flex-wrap items-end gap-4 border-b border-gray-100 pb-4 last:border-0 last:pb-0 w-full">
                {index === 0 && (
                  <div className="w-48 flex-shrink-0">
                    <SelectField
                      label="Packaging Type"
                      value={newRecordPackageType}
                      onChange={setNewRecordPackageType}
                      options={[
                        { value: "Non Document", label: "Non Document" },
                        { value: "Document", label: "Document" },
                        { value: "Pallet", label: "Pallet" },
                        { value: "LTL", label: "LTL" },
                        { value: "FCL", label: "FCL" },
                      ]}
                    />
                  </div>
                )}
                {index > 0 && <div className="w-48 flex-shrink-0"></div>}

                <div className="flex flex-col gap-1 w-12 text-center flex-shrink-0">
                  <span className="text-xs font-bold text-gray-700">No.</span>
                  <div className="h-[42px] flex items-center justify-center font-bold text-[#081b4c] bg-gray-50 rounded-xl border border-gray-200">
                    {index + 1}
                  </div>
                </div>
                
                <div className="flex-1 min-w-[100px]">
                  <label className="block text-xs font-bold text-gray-700 mb-1">Weight (kg)</label>
                  <input type="number" className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 transition-all" />
                </div>
                
                <div className="flex-1 min-w-[100px]">
                  <SelectField
                    label="Box Size"
                    value={pkg.boxSize}
                    onChange={(val) => {
                      const updated = [...newRecordPackages];
                      updated[index].boxSize = val;
                      setNewRecordPackages(updated);
                    }}
                    options={[
                      { value: "My Packaging", label: "My Packaging" },
                      { value: "Default 10x10x10", label: "Default 10x10x10" }
                    ]}
                  />
                </div>

                <div className="flex-[2] min-w-[250px] flex items-center gap-2">
                  <div className="flex-1">
                    <label className="block text-xs font-bold text-gray-700 mb-1">Length (cm)</label>
                    <input type="number" className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 transition-all" />
                  </div>
                  <span className="text-gray-400 font-bold mt-5 flex-shrink-0">x</span>
                  <div className="flex-1">
                    <label className="block text-xs font-bold text-gray-700 mb-1">Width (cm)</label>
                    <input type="number" className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 transition-all" />
                  </div>
                  <span className="text-gray-400 font-bold mt-5 flex-shrink-0">x</span>
                  <div className="flex-1">
                    <label className="block text-xs font-bold text-gray-700 mb-1">Height (cm)</label>
                    <input type="number" className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 transition-all" />
                  </div>
                </div>

                <div className="flex items-center ml-2 h-[42px] gap-2 flex-shrink-0">
                  <button 
                    onClick={handleAddPackage}
                    className="w-10 h-10 rounded-full bg-green-100 hover:bg-green-200 flex items-center justify-center text-green-600 transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                  {newRecordPackages.length > 1 && (
                    <button 
                      onClick={() => {
                        setNewRecordPackages(newRecordPackages.filter((_, i) => i !== index));
                      }}
                      className="w-10 h-10 rounded-full bg-red-50 hover:bg-red-100 flex items-center justify-center text-red-500 transition-colors"
                    >
                      <Minus className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Commercial Invoice & Duties */}
          <div className="mt-8 flex items-end gap-6 border-t border-gray-100 pt-6 w-full lg:w-[80%]">
            <div className="flex-1 relative flex items-end gap-2">
              <div className="flex-1">
                <SelectField
                  label="Commercial Invoice"
                  value={commercialInvoiceOption}
                  onChange={setCommercialInvoiceOption}
                  dropdownPosition="top"
                  options={[
                    { value: "Generate commercial invoice", label: "Generate commercial invoice" },
                    { value: "Use my own commercial invoice", label: "Use my own commercial invoice" },
                    { value: "Upload commercial invoice (PDF only)", label: "Upload commercial invoice (PDF only)" }
                  ]}
                />
              </div>
              <button 
                onClick={() => setIsCommercialInvoiceModalOpen(true)}
                className="w-10 h-10 rounded-full bg-gray-50 hover:bg-gray-100 flex items-center justify-center text-gray-500 transition-colors flex-shrink-0 mb-0.5 border border-gray-200 shadow-sm"
                title="Edit Commercial Invoice"
              >
                <Edit className="w-4 h-4" />
              </button>
            </div>
            
            <div className="flex-1">
              <SelectField
                label="Duties/Taxes/Fees"
                value={dutiesTaxesOption}
                onChange={setDutiesTaxesOption}
                dropdownPosition="top"
                options={[
                  { value: "Duties to be paid by receiver", label: "Duties to be paid by receiver" },
                  { value: "Duties to be paid by sender", label: "Duties to be paid by sender" }
                ]}
              />
            </div>
          </div>

        </div>
      )}

      {/* Table Section */}
      <div className="bg-white border border-gray-200 rounded-sm p-4 text-gray-800 overflow-x-auto shadow-sm">
        
        {/* Table Toolbar */}
        <div className="flex flex-wrap items-center justify-end gap-3 mb-4">
          <div className="bg-white border border-gray-300 rounded-sm flex items-center overflow-hidden h-9">
            <select className="bg-transparent text-gray-600 text-sm px-3 py-1 outline-none border-r border-gray-300 cursor-pointer">
              <option>Search By</option>
              <option>Reference</option>
              <option>Company</option>
            </select>
            <div className="flex items-center px-3 bg-white w-48">
              <input type="text" className="bg-transparent outline-none text-gray-700 text-sm w-full" />
              <Search className="w-4 h-4 text-gray-400" />
            </div>
          </div>
          
          <button className="bg-white border border-gray-300 hover:bg-gray-50 text-[#081b4c] text-xs font-bold px-3 h-9 rounded-sm transition-colors">
            ASC
          </button>
          <button className="bg-[#081b4c] hover:bg-[#06143c] border border-[#081b4c] text-white text-xs font-bold px-3 h-9 rounded-sm transition-colors">
            DESC
          </button>
        </div>

        {/* Table structure as requested instead of simple list row */}
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="bg-[#081b4c] text-xs font-semibold text-white uppercase tracking-wider">
              <th className="py-3 px-4 w-12 text-center">
                <input type="checkbox" className="w-4 h-4 rounded-sm border-gray-300 text-[#081b4c] focus:ring-[#081b4c]" />
              </th>
              <th className="py-3 px-4">Collection Details</th>
              <th className="py-3 px-4 w-24 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-gray-50 transition-colors border-b border-gray-200 last:border-0 group">
              <td className="py-4 px-4 text-center">
                <input type="checkbox" defaultChecked className="w-4 h-4 rounded-sm border-gray-300 text-[#081b4c] focus:ring-[#081b4c]" />
              </td>
              <td className="py-4 px-4">
                <div className="flex flex-col text-sm">
                  <span className="font-bold text-[#081b4c]">Collection: I Already Have Collection Scheduled</span>
                  <span className="text-gray-500 uppercase mt-0.5">JAMES WATKINSON THORNTON 4X4 BREAKERS</span>
                  <span className="text-gray-500 uppercase">HOLDSWORTH ROAD HALIFAX HX3 6SN, UK</span>
                </div>
              </td>
              <td className="py-4 px-4 text-center">
                <button onClick={() => setIsEditModalOpen(true)} className="text-gray-400 hover:text-[#081b4c] transition-colors" title="Edit">
                  <Edit className="w-4 h-4 inline-block" />
                </button>
              </td>
            </tr>
            {/* Example row 2 to demonstrate tabular layout */}
             <tr className="hover:bg-gray-50 transition-colors border-b border-gray-200 last:border-0 group">
              <td className="py-4 px-4 text-center">
                <input type="checkbox" className="w-4 h-4 rounded-sm border-gray-300 text-[#081b4c] focus:ring-[#081b4c]" />
              </td>
              <td className="py-4 px-4">
                <div className="flex flex-col text-sm">
                  <span className="font-bold text-[#081b4c]">Collection: Pending Schedule</span>
                  <span className="text-gray-500 uppercase mt-0.5">ACME CORP LOGISTICS</span>
                  <span className="text-gray-500 uppercase">123 WAREHOUSE LN LONDON E1 6AN, UK</span>
                </div>
              </td>
              <td className="py-4 px-4 text-center">
                <button onClick={() => setIsEditModalOpen(true)} className="text-gray-400 hover:text-[#081b4c] transition-colors" title="Edit">
                  <Edit className="w-4 h-4 inline-block" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <Modal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)} 
        title="Edit Collection Details"
        footer={
          <>
            <button onClick={() => setIsEditModalOpen(false)} className="px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 rounded-md transition-colors">Cancel</button>
            <button onClick={() => setIsEditModalOpen(false)} className="px-4 py-2 text-sm font-semibold text-white bg-[#249cbd] hover:bg-[#1d82a0] rounded-md transition-colors">Save Changes</button>
          </>
        }
      >
        <div className="flex flex-col gap-5">
          <SelectField
            label="Collection Options"
            value={collectionOption}
            onChange={setCollectionOption}
            options={[
              { value: "", label: "Select Collection Option" },
              { value: "Schedule for future date", label: "Schedule for future date" },
              { value: "I already have collection scheduled", label: "I already have collection scheduled" },
              { value: "I have daily collection", label: "I have daily collection" },
              { value: "Drop at depot or shop", label: "Drop at depot or shop" },
            ]}
          />
          <SelectField
            label="Collection Address"
            value={collectionAddress}
            onChange={setCollectionAddress}
            options={[
              { value: "", label: "Select Collection Address" },
              { value: "A Brady", label: "A Brady" },
              { value: "AB Motors", label: "AB Motors" },
              { value: "A Corican", label: "A Corican" },
              { value: "AB Tyres", label: "AB Tyres" },
              { value: "A Gilly", label: "A Gilly" },
              { value: "A Golizar", label: "A Golizar" },
              { value: "A Graham Motors", label: "A Graham Motors" },
              { value: "A J", label: "A J" },
              { value: "A Holmsley", label: "A Holmsley" },
            ]}
          />
        </div>
      </Modal>

      {/* Receiver Modal */}
      <Modal 
        isOpen={isReceiverOpen} 
        onClose={() => setIsReceiverOpen(false)} 
        title="Receiver Details"
        maxWidthClass="max-w-3xl"
        footer={
          <>
            <button onClick={() => setIsReceiverOpen(false)} className="px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 rounded-md transition-colors">Cancel</button>
            <button onClick={() => setIsReceiverOpen(false)} className="px-4 py-2 text-sm font-semibold text-white bg-[#081b4c] hover:bg-[#06143c] rounded-md transition-colors">Save</button>
          </>
        }
      >
        <div className="flex flex-col gap-4">
          <SelectField
            label="Address Book"
            value={receiverData.addressBook}
            onChange={v => setReceiverData({...receiverData, addressBook: v})}
            options={[
              { value: "", label: "Select from Address Book" },
              { value: "Address 1", label: "Address 1" },
            ]}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField label="Company" value={receiverData.company} onChange={e => setReceiverData({...receiverData, company: e.target.value})} />
            <InputField label="Contact Name" value={receiverData.contactName} onChange={e => setReceiverData({...receiverData, contactName: e.target.value})} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <InputField label="Address Line 1" value={receiverData.addressLine1} onChange={e => setReceiverData({...receiverData, addressLine1: e.target.value})} />
            <InputField label="Address Line 2" value={receiverData.addressLine2} onChange={e => setReceiverData({...receiverData, addressLine2: e.target.value})} />
            <InputField label="Address Line 3" value={receiverData.addressLine3} onChange={e => setReceiverData({...receiverData, addressLine3: e.target.value})} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SelectField
              label="Country"
              value={receiverData.country}
              onChange={v => setReceiverData({...receiverData, country: v})}
              options={[
                { value: "", label: "Select Country" },
                { value: "United Kingdom", label: "United Kingdom" },
                { value: "United States", label: "United States" },
                { value: "Canada", label: "Canada" },
              ]}
            />
            <InputField required label="City Name" value={receiverData.city} onChange={e => setReceiverData({...receiverData, city: e.target.value})} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
            <div className="flex gap-2 items-end">
              <InputField required label="Post Code" value={receiverData.postCode} onChange={e => setReceiverData({...receiverData, postCode: e.target.value})} containerClassName="flex-1" />
              <button 
                onClick={() => setIsPostCodeModalOpen(true)}
                className="h-[42px] px-4 bg-[#081b4c] hover:bg-[#06143c] text-white text-xs font-semibold rounded-xl transition-colors whitespace-nowrap"
              >
                Post Code
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField label="Phone Number" value={receiverData.phone} onChange={e => setReceiverData({...receiverData, phone: e.target.value})} />
            <InputField label="Email" type="email" value={receiverData.email} onChange={e => setReceiverData({...receiverData, email: e.target.value})} />
          </div>
          
          <div className="border-t border-gray-200 my-2"></div>
          
          <SelectField
            label="Collection Company"
            dropdownPosition="top"
            value={receiverData.collectionCompany}
            onChange={v => setReceiverData({...receiverData, collectionCompany: v})}
            options={[
              { value: "", label: "Select Collection Company" },
              { value: "AB Motors", label: "AB Motors" },
              { value: "A Ready", label: "A Ready" },
              { value: "A Bookcan", label: "A Bookcan" },
              { value: "A Corican", label: "A Corican" },
              { value: "AD Tyres", label: "AD Tyres" },
            ]}
          />

          {receiverData.collectionCompany && collectionCompaniesData[receiverData.collectionCompany] && (
            <div className="mt-2 text-sm text-[#1e2a38]">
              <div className="font-bold text-base mb-1 text-gray-800">{receiverData.collectionCompany}</div>
              <div className="text-gray-500">{collectionCompaniesData[receiverData.collectionCompany].address1}</div>
              <div className="text-gray-500 mb-2">{collectionCompaniesData[receiverData.collectionCompany].address2}</div>
              <div className="flex items-center gap-4 text-gray-500 mt-2">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-[#1e2a38] text-white rounded shadow-sm flex items-center justify-center">
                    <Phone className="w-3 h-3 fill-current" />
                  </div>
                  <span className="font-medium">{collectionCompaniesData[receiverData.collectionCompany].phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-[#1e2a38] text-white rounded shadow-sm flex items-center justify-center">
                    <Mail className="w-3 h-3" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </Modal>

      {/* Description Modal */}
      <Modal 
        isOpen={isDescriptionOpen} 
        onClose={() => setIsDescriptionOpen(false)} 
        title="Description and Reference"
        footer={
          <>
            <button onClick={() => setIsDescriptionOpen(false)} className="px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 rounded-md transition-colors">Cancel</button>
            <button onClick={() => setIsDescriptionOpen(false)} className="px-4 py-2 text-sm font-semibold text-white bg-[#081b4c] hover:bg-[#06143c] rounded-md transition-colors">Save</button>
          </>
        }
      >
        <div className="flex flex-col gap-4">
          <InputField 
            label="Exact Description" 
            value={descriptionData.exactDescription} 
            onChange={e => setDescriptionData({...descriptionData, exactDescription: e.target.value})} 
          />
          <InputField 
            label="Leave Safe" 
            value={descriptionData.leaveSafe} 
            onChange={e => setDescriptionData({...descriptionData, leaveSafe: e.target.value})} 
          />
          <InputField 
            label="Label Safe" 
            value={descriptionData.labelSafe} 
            onChange={e => setDescriptionData({...descriptionData, labelSafe: e.target.value})} 
          />
        </div>
      </Modal>

      <PostCodeModal
        isOpen={isPostCodeModalOpen}
        onClose={() => setIsPostCodeModalOpen(false)}
        onSelect={(address) => {
          setReceiverData({ ...receiverData, city: "London", postCode: "E14 5AA" }); 
        }}
      />

      {/* Product Edit Modal */}
      <ProductEditModal 
        isOpen={editingProductIndex !== null}
        onClose={() => setEditingProductIndex(null)}
        product={editingProductIndex !== null ? products[editingProductIndex] : undefined}
        onSave={(updatedProduct) => {
          if (editingProductIndex !== null) {
            const newProds = [...products];
            newProds[editingProductIndex] = { ...newProds[editingProductIndex], ...updatedProduct };
            setProducts(newProds);
          }
        }}
      />

      {/* Commercial Invoice Modal */}
      <CommercialInvoiceModal
        isOpen={isCommercialInvoiceModalOpen}
        onClose={() => setIsCommercialInvoiceModalOpen(false)}
        onSave={(items) => {
          console.log("Saved items:", items);
          // In the future we can save this data to the parent component state
        }}
      />
    </div>
  );
}
