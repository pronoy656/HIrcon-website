"use client";

import React, { useState } from "react";
import { Plus, HelpCircle, Minus } from "lucide-react";
import Link from "next/link";
import { SelectField } from "@/components/ui/SelectField";
import { Modal } from "@/components/ui/Modal";

const tabs = ["Integrations", "Ship Manager Settings", "Printing & Other Settings"];

const courierOptions = [
  { value: "City Sprint", label: "City Sprint" },
  { value: "DHL", label: "DHL" },
  { value: "DPD", label: "DPD" },
  { value: "FedEx", label: "FedEx" },
  { value: "TNT", label: "TNT" },
  { value: "UPS", label: "UPS" },
];

export default function IntegrationPage() {
  const [activeTab, setActiveTab] = useState("Ship Manager Settings");
  const [showThermalModal, setShowThermalModal] = useState(false);
  
  // State for Integrations Connect Modal
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState("");
  
  // State for Ship Manager Settings
  const [rules, setRules] = useState<{ id: string, priority: string, serviceCompany: string, serviceType: string }[]>([]);
  const [enableDis, setEnableDis] = useState(false);
  const [useDefaultManager, setUseDefaultManager] = useState(false);
  const [defaultIntlService, setDefaultIntlService] = useState("");
  const [defaultIntlServiceType, setDefaultIntlServiceType] = useState("");
  const [defaultDomService, setDefaultDomService] = useState("");
  const [defaultDomServiceType, setDefaultDomServiceType] = useState("");
  const [description, setDescription] = useState("");
  const [weight, setWeight] = useState("");
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");

  const renderTabContent = () => {
    switch (activeTab) {
      case "Integrations":
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
            {/* API Keys */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-[#081b4c] mb-6 pb-4 border-b border-gray-100">API Keys</h3>
              <div className="space-y-6 max-w-2xl">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                  <label className="text-sm font-bold text-gray-700 w-full sm:w-48 shrink-0">Meta number :</label>
                  <input type="text" className="w-full sm:flex-1 px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#081b4c]/20 focus:border-[#081b4c] outline-none text-sm bg-white" />
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                  <label className="text-sm font-bold text-gray-700 w-full sm:w-48 shrink-0">Web service URL :</label>
                  <input type="text" className="w-full sm:flex-1 px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#081b4c]/20 focus:border-[#081b4c] outline-none text-sm bg-white" />
                </div>
              </div>
            </div>

            {/* Marketplace and eCommerce Connectors */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-[#081b4c] mb-6 pb-4 border-b border-gray-100">Marketplace and eCommerce Connectors</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {['eBay', 'Shopify', 'BigCommerce', 'WooCommerce', 'Etsy'].map(platform => (
                  <div key={`marketplace-${platform}`} className="border border-gray-100 rounded-2xl p-6 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-24 h-16 bg-gray-50 border border-gray-100 rounded-xl mb-4 flex items-center justify-center font-bold text-gray-400">
                      {platform} Logo
                    </div>
                    <p className="text-sm text-gray-500 mb-6 flex-1 leading-relaxed">
                      Connect your {platform} business account with ease and process your orders in bulk with Ship Manager.
                    </p>
                    <div className="flex gap-3 w-full">
                      <button 
                        onClick={() => { setSelectedPlatform(platform); setShowConnectModal(true); }}
                        className="flex-1 bg-[#10b981] hover:bg-[#059669] text-white py-2.5 rounded-xl text-sm font-bold transition-colors shadow-sm"
                      >
                        Connect
                      </button>
                      <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2.5 rounded-xl text-sm font-bold transition-colors">
                        Support
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Plugins and Applications */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-[#081b4c] mb-6 pb-4 border-b border-gray-100">Plugins and Applications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {['Wix', 'WooCommerce', 'Shopify'].map(platform => (
                  <div key={`plugin-${platform}`} className="border border-gray-100 rounded-2xl p-6 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-24 h-16 bg-gray-50 border border-gray-100 rounded-xl mb-4 flex items-center justify-center font-bold text-gray-400">
                      {platform} Logo
                    </div>
                    <p className="text-sm text-gray-500 mb-6 flex-1 leading-relaxed">
                      Integrate your {platform} store and gain access to live shipping rates at the checkout, auto order fulfillment, and auto created commercial invoices.
                    </p>
                    <div className="flex gap-3 w-full">
                      <button 
                        onClick={() => { setSelectedPlatform(platform); setShowConnectModal(true); }}
                        className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2.5 rounded-xl text-sm font-bold transition-colors shadow-sm"
                      >
                        Install
                      </button>
                      <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2.5 rounded-xl text-sm font-bold transition-colors">
                        Support
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Plugin and Application Settings */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-[#081b4c] mb-6 pb-4 border-b border-gray-100">Plugin and Application Settings</h3>
              
              <div className="space-y-6 max-w-4xl">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                  <label className="text-sm font-bold text-gray-700 w-full sm:w-64 sm:text-right shrink-0">Residential :</label>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" className="w-5 h-5 text-[#081b4c] rounded border-gray-300 focus:ring-[#081b4c]" />
                    <div className="w-5 h-5 rounded-full bg-[#081b4c] flex items-center justify-center text-white text-xs font-bold cursor-help" title="Help">?</div> 
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                  <label className="text-sm font-bold text-gray-700 w-full sm:w-64 sm:text-right shrink-0">Enhanced Cover (£) :</label>
                  <div className="flex items-center gap-2 w-full sm:flex-1">
                    <div className="flex-1">
                      <SelectField options={[{value: 'select-one', label: 'Select One'}]} value="select-one" onChange={() => {}} />
                    </div>
                    <div className="w-5 h-5 rounded-full bg-[#081b4c] flex items-center justify-center text-white text-xs font-bold cursor-help shrink-0" title="Help">?</div> 
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                  <label className="text-sm font-bold text-gray-700 w-full sm:w-64 sm:text-right shrink-0">Include Additional Cost DOM. (£) :</label>
                  <div className="flex items-center gap-2 w-full sm:flex-1">
                    <div className="flex-1">
                      <SelectField options={[{value: 'fixed', label: 'Fixed'}]} value="fixed" onChange={() => {}} />
                    </div>
                    <input type="number" defaultValue={0} className="w-full sm:flex-1 px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#081b4c]/20 focus:border-[#081b4c] outline-none text-sm bg-white" />
                    <div className="w-5 h-5 rounded-full bg-[#081b4c] flex items-center justify-center text-white text-xs font-bold cursor-help shrink-0" title="Help">?</div> 
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                  <label className="text-sm font-bold text-gray-700 w-full sm:w-64 sm:text-right shrink-0">Include Additional Cost Int. (£) :</label>
                  <div className="flex items-center gap-2 w-full sm:flex-1">
                    <div className="flex-1">
                      <SelectField options={[{value: 'fixed', label: 'Fixed'}]} value="fixed" onChange={() => {}} />
                    </div>
                    <input type="number" defaultValue={0} className="w-full sm:flex-1 px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#081b4c]/20 focus:border-[#081b4c] outline-none text-sm bg-white" />
                    <div className="w-5 h-5 rounded-full bg-[#081b4c] flex items-center justify-center text-white text-xs font-bold cursor-help shrink-0" title="Help">?</div> 
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                    <label className="text-sm font-bold text-gray-700 w-full sm:w-64 sm:text-right shrink-0">Free Reduced Shipping DOM (£) :</label>
                    <div className="flex items-center gap-3 w-full sm:flex-1">
                      <span className="text-sm text-gray-700 shrink-0">If shopping cart total greater then</span>
                      <input type="number" defaultValue={0} className="flex-1 px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#081b4c]/20 focus:border-[#081b4c] outline-none text-sm bg-white" />
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                    <div className="w-full sm:w-64 shrink-0"></div>
                    <div className="flex items-center gap-3 w-full sm:flex-1">
                      <span className="text-sm text-gray-700 shrink-0">reduce cheapest courier price by</span>
                      <input type="number" defaultValue={0} className="flex-1 px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#081b4c]/20 focus:border-[#081b4c] outline-none text-sm bg-white" />
                      <div className="w-5 h-5 rounded-full bg-[#081b4c] flex items-center justify-center text-white text-xs font-bold cursor-help shrink-0" title="Help">?</div> 
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                    <label className="text-sm font-bold text-gray-700 w-full sm:w-64 sm:text-right shrink-0">Free/Reduced Shipping Int. (£) :</label>
                    <div className="flex items-center gap-3 w-full sm:flex-1">
                      <span className="text-sm text-gray-700 shrink-0">If shopping cart total greater then</span>
                      <input type="number" defaultValue={0} className="flex-1 px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#081b4c]/20 focus:border-[#081b4c] outline-none text-sm bg-white" />
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                    <div className="w-full sm:w-64 shrink-0"></div>
                    <div className="flex items-center gap-3 w-full sm:flex-1">
                      <span className="text-sm text-gray-700 shrink-0">reduce cheapest courier price by</span>
                      <input type="number" defaultValue={0} className="flex-1 px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#081b4c]/20 focus:border-[#081b4c] outline-none text-sm bg-white" />
                      <div className="w-5 h-5 rounded-full bg-[#081b4c] flex items-center justify-center text-white text-xs font-bold cursor-help shrink-0" title="Help">?</div> 
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4">
                  <label className="text-sm font-bold text-gray-700 w-full sm:w-64 sm:text-right shrink-0 pt-2">Is Daily Collection Scheduled? :</label>
                  <div className="flex flex-wrap items-center gap-4 w-full sm:flex-1 pt-2">
                    {['CitySprint', 'DHL', 'DSV', 'FEDEX', 'Fedex_Freight_Import', 'PALLETWAYS', 'TNT', 'UPS', 'W/O Spot Rate'].map(courier => (
                      <label key={courier} className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 text-[#081b4c] rounded border-gray-300 focus:ring-[#081b4c]" />
                        <span className="text-sm text-gray-600 font-medium">{courier}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-6">
                <button className="bg-[#081b4c] hover:bg-[#081845] text-white px-8 py-3 rounded-xl font-bold shadow-sm transition-colors text-sm uppercase tracking-wide">
                  UPDATE
                </button>
              </div>
            </div>
          </div>
        );
      
      case "Printing & Other Settings":
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
             {/* Print Settings */}
             <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
               <h3 className="text-lg font-bold text-[#081b4c] mb-6 pb-4 border-b border-gray-100">Print Settings</h3>
               <div className="space-y-6 max-w-3xl">
                 <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                   <label className="text-sm font-bold text-gray-700 w-full sm:w-64 sm:text-right shrink-0">Use My Thermal Printer To Print Labels :</label>
                   <div className="flex items-center gap-3">
                     <input type="checkbox" className="w-5 h-5 text-[#081b4c] rounded border-gray-300 focus:ring-[#081b4c]" />
                     <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-[#081b4c] flex items-center justify-center text-white text-xs font-bold cursor-help" title="Help">?</div> 
                        <button 
                          onClick={() => setShowThermalModal(true)}
                          className="text-sm font-semibold text-blue-500 hover:text-blue-600 hover:underline bg-transparent border-none p-0 cursor-pointer text-left"
                        >
                          Thermal printer installation guidelines
                        </button>
                     </div>
                   </div>
                 </div>
                 
                 <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                   <label className="text-sm font-bold text-gray-700 w-full sm:w-64 sm:text-right shrink-0">Default Printer Name :</label>
                   <input type="text" className="w-full sm:flex-1 px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#081b4c]/20 focus:border-[#081b4c] outline-none text-sm bg-gray-50/50" />
                 </div>

                 <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                   <label className="text-sm font-bold text-gray-700 w-full sm:w-64 sm:text-right shrink-0">Enable Auto Print (Beta) :</label>
                   <div className="flex items-center gap-3">
                     <input type="checkbox" className="w-5 h-5 text-[#081b4c] rounded border-gray-300 focus:ring-[#081b4c]" />
                     <Link 
                       href="/dashboard/manage/preference/auto-print-guidelines" 
                       target="_blank"
                       className="text-sm font-semibold text-blue-500 hover:text-blue-600 hover:underline"
                     >
                       Auto print guidelines
                     </Link>
                   </div>
                 </div>
               </div>
             </div>

             {/* Advanced Printer Settings */}
             <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 overflow-x-auto">
               <h3 className="text-lg font-bold text-[#081b4c] mb-2">Advanced Printer Settings</h3>
               <p className="text-sm text-gray-500 mb-6 pb-4 border-b border-gray-100">Use the below settings to override default print settings</p>
               
               <div className="min-w-[600px]">
                 <div className="grid grid-cols-[150px_1fr_1fr] gap-6 mb-4 px-4">
                   <div className="font-bold text-sm text-gray-700 text-center sm:text-left">Carrier</div>
                   <div className="font-bold text-sm text-gray-700">Label Type</div>
                   <div className="font-bold text-sm text-gray-700">Printer Name</div>
                 </div>

                 <div className="space-y-4">
                   {['FedEx', 'UPS', 'TNT', 'DHL Express'].map(carrier => (
                     <div key={carrier} className="grid grid-cols-[150px_1fr_1fr] gap-6 items-center px-4 py-2 rounded-xl hover:bg-gray-50/50 transition-colors">
                       <div className="text-sm font-bold text-gray-700 text-center sm:text-left">{carrier}</div>
                       <SelectField options={[{value: 'default', label: 'Default'}]} value="default" onChange={() => {}} />
                       <input type="text" className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#081b4c]/20 focus:border-[#081b4c] outline-none text-sm bg-white" />
                     </div>
                   ))}
                 </div>
               </div>
             </div>

             {/* Other Settings */}
             <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
               <h3 className="text-lg font-bold text-[#081b4c] mb-6 pb-4 border-b border-gray-100">Other Settings</h3>
               
               <div className="space-y-6 max-w-3xl">
                 <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                   <label className="text-sm font-bold text-gray-700 w-full sm:w-64 sm:text-right shrink-0">Default Batch CSV :</label>
                   <div className="w-full sm:flex-1">
                     <SelectField options={[{value: 'select-one', label: 'Select One'}]} value="select-one" onChange={() => {}} />
                   </div>
                 </div>

                 <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                   <label className="text-sm font-bold text-gray-700 w-full sm:w-64 sm:text-right shrink-0">QubeVu :</label>
                   <input type="checkbox" className="w-5 h-5 text-[#081b4c] rounded border-gray-300 focus:ring-[#081b4c]" />
                 </div>

                 <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                   <label className="text-sm font-bold text-gray-700 w-full sm:w-64 sm:text-right shrink-0">Instant Scan :</label>
                   <div className="flex items-center gap-6 flex-wrap">
                     <label className="flex items-center gap-2 cursor-pointer">
                       <input type="radio" name="instantScan" className="w-4 h-4 text-[#081b4c] border-gray-300 focus:ring-[#081b4c]" />
                       <span className="text-sm text-gray-600 font-medium">Dimensioner</span>
                     </label>
                     <label className="flex items-center gap-2 cursor-pointer">
                       <input type="radio" name="instantScan" className="w-4 h-4 text-[#081b4c] border-gray-300 focus:ring-[#081b4c]" />
                       <span className="text-sm text-gray-600 font-medium">Scales</span>
                     </label>
                     <label className="flex items-center gap-2 cursor-pointer">
                       <input type="radio" name="instantScan" className="w-4 h-4 text-[#081b4c] border-gray-300 focus:ring-[#081b4c]" />
                       <span className="text-sm text-gray-600 font-medium">Both</span>
                     </label>
                   </div>
                 </div>

                 <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                   <label className="text-sm font-bold text-gray-700 w-full sm:w-64 sm:text-right shrink-0">Default QubeVu Host :</label>
                   <input type="text" className="w-full sm:flex-1 px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#081b4c]/20 focus:border-[#081b4c] outline-none text-sm bg-gray-50/50" />
                 </div>
               </div>
             </div>

             <div className="flex justify-end pt-4">
               <button className="bg-[#081b4c] hover:bg-[#081845] text-white px-8 py-3 rounded-xl font-bold shadow-sm transition-colors text-sm uppercase tracking-wide">
                 Update
               </button>
             </div>
          </div>
        );

      case "Ship Manager Settings":
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
            {/* Ship Manager Shipping Rules */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-lg font-bold text-[#081b4c] mb-1">Ship Manager Shipping Rules</h3>
                  <p className="text-sm text-gray-500 font-medium">Configure rules for your shipping automation</p>
                </div>
                <button 
                  onClick={() => setRules([...rules, { id: Date.now().toString(), priority: "", serviceCompany: "", serviceType: "" }])}
                  className="bg-[#081b4c] hover:bg-[#081845] text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-sm transition-colors text-sm w-full sm:w-auto justify-center hover:scale-[1.02]"
                >
                  <Plus className="w-4 h-4" />
                  Add New Rule
                </button>
              </div>

              {rules.length === 0 ? (
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center text-center mb-6 bg-gray-50/50 animate-in fade-in zoom-in-95 duration-500">
                  <div className="w-12 h-12 bg-blue-50 text-[#081b4c] rounded-full flex items-center justify-center mb-3">
                    <Plus className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-bold text-gray-900 mb-1">No Shipping Rules</h4>
                  <p className="text-sm text-gray-500 max-w-sm">Click the "Add New Rule" button above to create your first automation rule. It will appear right here.</p>
                </div>
              ) : (
                <div className="space-y-4 mb-6">
                  {rules.map((rule) => (
                    <div key={rule.id} className="flex items-start sm:items-center gap-4 p-4 sm:p-5 border border-gray-100 rounded-xl bg-gray-50/30 animate-in fade-in slide-in-from-top-2">
                      <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-sm font-bold text-gray-700">Priority</label>
                          <input 
                            type="number"
                            value={rule.priority}
                            onChange={(e) => setRules(rules.map(r => r.id === rule.id ? { ...r, priority: e.target.value } : r))}
                            className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#081b4c]/20 focus:border-[#081b4c] outline-none transition-all text-sm bg-white"
                            placeholder="e.g. 1"
                          />
                        </div>
                        <SelectField
                          label="Service Company"
                          value={rule.serviceCompany}
                          onChange={(val) => setRules(rules.map(r => r.id === rule.id ? { ...r, serviceCompany: val } : r))}
                          options={courierOptions}
                          placeholder="Select brand..."
                        />
                        <SelectField
                          label="Service Type"
                          value={rule.serviceType}
                          onChange={(val) => setRules(rules.map(r => r.id === rule.id ? { ...r, serviceType: val } : r))}
                          options={courierOptions}
                          placeholder="Select type..."
                        />
                      </div>
                      <div className="flex flex-col gap-1.5 shrink-0 mt-2 sm:mt-0">
                        <label className="text-sm font-bold opacity-0 hidden sm:block">Remove</label>
                        <button 
                          onClick={() => setRules(rules.filter(r => r.id !== rule.id))}
                          className="p-2 sm:p-2.5 bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-600 rounded-xl transition-all shadow-sm flex items-center justify-center h-[42px] w-[42px] border border-red-100"
                          title="Remove Rule"
                        >
                          <Minus className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Ship Manager Default Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-[#081b4c] mb-6 pb-4 border-b border-gray-100">Ship Manager Settings</h3>
              
              <div className="flex flex-col sm:flex-row gap-6 mb-8 pb-6 border-b border-gray-100">
                <label className="flex items-center gap-3 cursor-pointer group w-max">
                  <input 
                    type="checkbox" 
                    checked={enableDis}
                    onChange={e => setEnableDis(e.target.checked)}
                    className="w-5 h-5 text-[#081b4c] rounded border-gray-300 focus:ring-[#081b4c]" 
                  />
                  <span className="text-sm font-bold text-gray-700">Enable DIS Parcel Labels</span>
                </label>
                
                <label className="flex items-center gap-3 cursor-pointer group w-max">
                  <input 
                    type="checkbox" 
                    checked={useDefaultManager}
                    onChange={e => setUseDefaultManager(e.target.checked)}
                    className="w-5 h-5 text-[#081b4c] rounded border-gray-300 focus:ring-[#081b4c]" 
                  />
                  <span className="text-sm font-bold text-gray-700">Use Default Ship Manager</span>
                </label>
              </div>

              <div className="mb-8">
                <div className="flex items-center gap-2 mb-3">
                  <h4 className="text-sm font-bold text-gray-700">Ship Manager Default Description</h4>
                  <div className="relative group cursor-help">
                    <HelpCircle className="w-4 h-4 text-red-500 hover:text-red-600 transition-colors" />
                    <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-64 bg-gray-900 text-white text-xs font-medium rounded-lg py-2.5 px-3 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none text-center shadow-lg z-10">
                      Default description tooltip text goes here...
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                    </div>
                  </div>
                </div>
                <textarea 
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  className="w-full max-w-2xl px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#081b4c]/20 focus:border-[#081b4c] outline-none transition-all text-sm bg-gray-50/50 min-h-[100px] resize-y"
                  placeholder="Enter default description..."
                />
              </div>

              <div className="mb-2">
                <div className="flex items-center gap-2 mb-4">
                  <h4 className="text-sm font-bold text-gray-700">Ship Manager Default Dimension</h4>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 max-w-3xl bg-gray-50/50 p-4 rounded-xl border border-gray-100">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Weight (kg)</label>
                    <input 
                      type="number" 
                      value={weight}
                      onChange={e => setWeight(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#081b4c]/20 focus:border-[#081b4c] outline-none transition-all text-sm bg-white"
                      placeholder="0"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Length (cm)</label>
                    <input 
                      type="number" 
                      value={length}
                      onChange={e => setLength(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#081b4c]/20 focus:border-[#081b4c] outline-none transition-all text-sm bg-white"
                      placeholder="0"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Width (cm)</label>
                    <input 
                      type="number" 
                      value={width}
                      onChange={e => setWidth(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#081b4c]/20 focus:border-[#081b4c] outline-none transition-all text-sm bg-white"
                      placeholder="0"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Height (cm)</label>
                    <input 
                      type="number" 
                      value={height}
                      onChange={e => setHeight(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#081b4c]/20 focus:border-[#081b4c] outline-none transition-all text-sm bg-white"
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Batch Shipping Settings */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-[#081b4c] mb-6 pb-4 border-b border-gray-100">Batch Shipping Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <SelectField
                  label="Default International Service"
                  value={defaultIntlService}
                  onChange={setDefaultIntlService}
                  options={courierOptions}
                  placeholder="Select service..."
                />
                <SelectField
                  label="Default International Service Type"
                  value={defaultIntlServiceType}
                  onChange={setDefaultIntlServiceType}
                  options={courierOptions}
                  placeholder="Select service type..."
                />
                <SelectField
                  label="Default Domestic Service"
                  value={defaultDomService}
                  onChange={setDefaultDomService}
                  options={courierOptions}
                  placeholder="Select service..."
                />
                <SelectField
                  label="Default Domestic Service Type"
                  value={defaultDomServiceType}
                  onChange={setDefaultDomServiceType}
                  options={courierOptions}
                  placeholder="Select service type..."
                />
              </div>
            </div>
            
            <div className="flex justify-end pt-4">
              <button className="bg-[#081b4c] hover:bg-[#081845] text-white px-8 py-3 rounded-xl font-bold shadow-sm transition-colors text-sm">
                Save Settings
              </button>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto animate-in fade-in zoom-in-95 duration-300">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-white mb-1">Integrations</h1>
        <p className="text-blue-100 font-medium">Manage your shipping integrations and batch settings.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-visible mb-8">
        <div className="bg-gray-50 border-b border-gray-100 p-4 rounded-t-2xl">
          <div className="bg-white/50 border border-gray-200 p-1.5 rounded-xl flex w-full overflow-x-auto custom-scrollbar gap-1 shadow-sm">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 whitespace-nowrap ${
                  activeTab === tab
                    ? "bg-[#081b4c] text-white shadow-md"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        
        <div className="p-6 md:p-8">
          {renderTabContent()}
        </div>
      </div>

      {/* Modal for Thermal Printer Guidelines */}
      <Modal
        isOpen={showThermalModal}
        onClose={() => setShowThermalModal(false)}
        title="Thermal Printer Installation"
        maxWidthClass="max-w-lg"
        footer={
          <button 
            onClick={() => setShowThermalModal(false)}
            className="bg-[#081b4c] hover:bg-[#081b4c]/90 text-white font-semibold py-2 px-6 rounded-xl transition-colors shadow-sm"
          >
            Got it
          </button>
        }
      >
        <div className="space-y-6">
          <div className="space-y-2">
            <h4 className="font-bold text-gray-800">Step 1: Download Driver</h4>
            <p className="text-sm text-gray-600 leading-relaxed">Please ensure you have the latest thermal printer driver downloaded for your specific operating system.</p>
          </div>
          <div className="space-y-2">
            <h4 className="font-bold text-gray-800">Step 2: Connect Printer</h4>
            <p className="text-sm text-gray-600 leading-relaxed">Connect your printer via USB and turn it on. Wait for your computer to recognize the new device.</p>
          </div>
          <div className="space-y-2">
            <h4 className="font-bold text-gray-800">Step 3: Print Test Page</h4>
            <p className="text-sm text-gray-600 leading-relaxed">Open your system settings, navigate to Printers & Scanners, and print a test page to verify installation.</p>
          </div>
        </div>
      </Modal>

      {/* Modal for Connector Integration */}
      <Modal
        isOpen={showConnectModal}
        onClose={() => setShowConnectModal(false)}
        title={`${selectedPlatform} Connector - Information & Integration`}
        maxWidthClass="max-w-4xl"
      >
        <div className="space-y-8 p-4">
          <p className="text-gray-600 text-sm text-center">
            Connecting your {selectedPlatform} store with your ExShip account allows you to pull outstanding orders into Ship Manager to be processed in bulk.
          </p>
          
          <div className="max-w-3xl mx-auto space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <label className="text-sm font-bold text-gray-700 sm:w-32 sm:text-right shrink-0">Store Name:</label>
              <input type="text" placeholder="Shop Name" className="flex-1 px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#081b4c]/20 focus:border-[#081b4c] outline-none text-sm bg-white" />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <label className="text-sm font-bold text-gray-700 sm:w-32 sm:text-right shrink-0">API Path:</label>
              <input type="text" placeholder="API Path" className="flex-1 px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#081b4c]/20 focus:border-[#081b4c] outline-none text-sm bg-white" />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <label className="text-sm font-bold text-gray-700 sm:w-32 sm:text-right shrink-0">Access Token:</label>
              <input type="text" placeholder="Access Token" className="flex-1 px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#081b4c]/20 focus:border-[#081b4c] outline-none text-sm bg-white" />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <label className="text-sm font-bold text-gray-700 sm:w-32 sm:text-right shrink-0">Client Secret:</label>
              <input type="text" placeholder="Client Secret" className="flex-1 px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#081b4c]/20 focus:border-[#081b4c] outline-none text-sm bg-white" />
            </div>
            <div className="flex justify-end pt-2">
              <button className="bg-[#22c55e] hover:bg-[#16a34a] text-white px-6 py-2.5 rounded-lg font-bold transition-colors shadow-sm text-sm">
                Save Account
              </button>
            </div>
          </div>

          <div className="space-y-4 max-w-4xl mx-auto pl-4">
            <div className="flex gap-4 items-start">
              <div className="w-6 h-6 rounded-full border border-[#1f93c5] text-[#1f93c5] flex items-center justify-center shrink-0 font-bold text-sm bg-white mt-0.5">1</div>
              <p className="text-sm text-gray-600 leading-relaxed pt-0.5">Within your {selectedPlatform} dashboard and click on <strong className="text-gray-800">"Advanced Settings"</strong>, then select <strong className="text-gray-800">"API Accounts"</strong> in the menu.</p>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-6 h-6 rounded-full border border-[#1f93c5] text-[#1f93c5] flex items-center justify-center shrink-0 font-bold text-sm bg-white mt-0.5">2</div>
              <p className="text-sm text-gray-600 leading-relaxed pt-0.5">Click <strong className="text-gray-800">"Create API Account"</strong> in the <strong className="text-gray-800">"Name"</strong> field enter <strong className="text-gray-800">"Exship.com"</strong>, then select the modify permissions for <strong className="text-gray-800">Orders</strong> and <strong className="text-gray-800">Order Transactions</strong>.</p>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-6 h-6 rounded-full border border-[#1f93c5] text-[#1f93c5] flex items-center justify-center shrink-0 font-bold text-sm bg-white mt-0.5">3</div>
              <p className="text-sm text-gray-600 leading-relaxed pt-0.5">Copy the url from the section labelled <strong className="text-gray-800">"API Path"</strong>, then press <strong className="text-gray-800">Save</strong> towards the bottom.</p>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-6 h-6 rounded-full border border-[#1f93c5] text-[#1f93c5] flex items-center justify-center shrink-0 font-bold text-sm bg-white mt-0.5">4</div>
              <p className="text-sm text-gray-600 leading-relaxed pt-0.5">Take your generated <strong className="text-gray-800">API Path</strong> (URL copied from step 3), <strong className="text-gray-800">Client Secret</strong> and <strong className="text-gray-800">Access Token</strong>, and enter them into the fields above.</p>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-6 h-6 rounded-full border border-[#1f93c5] text-[#1f93c5] flex items-center justify-center shrink-0 font-bold text-sm bg-white mt-0.5">5</div>
              <p className="text-sm text-gray-600 leading-relaxed pt-0.5">Once the above steps have been completed. Select <strong className="text-gray-800">"Save Account"</strong> to complete the integration connection.</p>
            </div>
          </div>

          <div className="flex justify-center gap-6 pt-10">
            <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-8 py-3 rounded-xl font-bold transition-colors text-sm shadow-sm">
              I NEED MORE HELP
            </button>
            <button className="bg-[#081b4c] hover:bg-[#081845] text-white px-8 py-3 rounded-xl font-bold transition-colors text-sm shadow-sm">
              OPEN SHIP MANAGER
            </button>
          </div>
        </div>
      </Modal>

    </div>
  );
}
