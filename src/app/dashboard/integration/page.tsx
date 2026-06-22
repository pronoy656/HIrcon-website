"use client";

import React, { useState } from "react";
import { Plus, HelpCircle, Minus } from "lucide-react";
import { SelectField } from "../../../components/common/SelectField";

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
        return <div className="text-gray-500 py-12 text-center font-medium bg-white rounded-2xl border border-gray-100 shadow-sm animate-in fade-in">Integrations settings coming soon...</div>;
      
      case "Printing & Other Settings":
        return <div className="text-gray-500 py-12 text-center font-medium bg-white rounded-2xl border border-gray-100 shadow-sm animate-in fade-in">Printing & Other settings coming soon...</div>;

      case "Ship Manager Settings":
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
            {/* Ship Manager Shipping Rules */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-lg font-bold text-[#0b215f] mb-1">Ship Manager Shipping Rules</h3>
                  <p className="text-sm text-gray-500 font-medium">Configure rules for your shipping automation</p>
                </div>
                <button 
                  onClick={() => setRules([...rules, { id: Date.now().toString(), priority: "", serviceCompany: "", serviceType: "" }])}
                  className="bg-[#0b215f] hover:bg-[#081845] text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-sm transition-colors text-sm w-full sm:w-auto justify-center hover:scale-[1.02]"
                >
                  <Plus className="w-4 h-4" />
                  Add New Rule
                </button>
              </div>

              {rules.length === 0 ? (
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center text-center mb-6 bg-gray-50/50 animate-in fade-in zoom-in-95 duration-500">
                  <div className="w-12 h-12 bg-blue-50 text-[#0b215f] rounded-full flex items-center justify-center mb-3">
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
                            className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0b215f]/20 focus:border-[#0b215f] outline-none transition-all text-sm bg-white"
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
              <h3 className="text-lg font-bold text-[#0b215f] mb-6 pb-4 border-b border-gray-100">Ship Manager Settings</h3>
              
              <div className="flex flex-col sm:flex-row gap-6 mb-8 pb-6 border-b border-gray-100">
                <label className="flex items-center gap-3 cursor-pointer group w-max">
                  <input 
                    type="checkbox" 
                    checked={enableDis}
                    onChange={e => setEnableDis(e.target.checked)}
                    className="w-5 h-5 text-[#0b215f] rounded border-gray-300 focus:ring-[#0b215f]" 
                  />
                  <span className="text-sm font-bold text-gray-700">Enable DIS Parcel Labels</span>
                </label>
                
                <label className="flex items-center gap-3 cursor-pointer group w-max">
                  <input 
                    type="checkbox" 
                    checked={useDefaultManager}
                    onChange={e => setUseDefaultManager(e.target.checked)}
                    className="w-5 h-5 text-[#0b215f] rounded border-gray-300 focus:ring-[#0b215f]" 
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
                  className="w-full max-w-2xl px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0b215f]/20 focus:border-[#0b215f] outline-none transition-all text-sm bg-gray-50/50 min-h-[100px] resize-y"
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
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0b215f]/20 focus:border-[#0b215f] outline-none transition-all text-sm bg-white"
                      placeholder="0"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Length (cm)</label>
                    <input 
                      type="number" 
                      value={length}
                      onChange={e => setLength(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0b215f]/20 focus:border-[#0b215f] outline-none transition-all text-sm bg-white"
                      placeholder="0"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Width (cm)</label>
                    <input 
                      type="number" 
                      value={width}
                      onChange={e => setWidth(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0b215f]/20 focus:border-[#0b215f] outline-none transition-all text-sm bg-white"
                      placeholder="0"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Height (cm)</label>
                    <input 
                      type="number" 
                      value={height}
                      onChange={e => setHeight(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0b215f]/20 focus:border-[#0b215f] outline-none transition-all text-sm bg-white"
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Batch Shipping Settings */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-[#0b215f] mb-6 pb-4 border-b border-gray-100">Batch Shipping Settings</h3>
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
              <button className="bg-[#0b215f] hover:bg-[#081845] text-white px-8 py-3 rounded-xl font-bold shadow-sm transition-colors text-sm">
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
        <h1 className="text-3xl font-extrabold text-gray-900 mb-1">Integrations</h1>
        <p className="text-gray-500 font-medium">Manage your shipping integrations and batch settings.</p>
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
                    ? "bg-[#0b215f] text-white shadow-md"
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
    </div>
  );
}
