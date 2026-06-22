"use client";

import React, { useState } from "react";
import { Edit2, HelpCircle, CircleHelp } from "lucide-react";
import { InputField } from "../../common/InputField";
import { SelectField } from "../../common/SelectField";
import { Table } from "../../common/Table";

export function AddressTab() {
  const [saveToAddressBook, setSaveToAddressBook] = useState(false);
  const [residential, setResidential] = useState(false);

  // Table dummy data
  const [tableData, setTableData] = useState([
    { id: 1, number: "1", weight: "10", boxes: "2", length: "20", width: "15", height: "10", customValue: "" },
    { id: 2, number: "2", weight: "5", boxes: "1", length: "10", width: "10", height: "10", customValue: "" }
  ]);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 space-y-10">
      
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Address and details</h2>
        <p className="text-gray-500">Configure your billing, shipping addresses, and shipment defaults.</p>
      </div>

      {/* General Address Details */}
      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-bold text-gray-800 mb-6">General Address Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField label="Name" placeholder="Enter name" />
          <InputField label="Company" placeholder="Enter company" />
          <InputField label="Address 1" placeholder="Enter address line 1" containerClassName="md:col-span-2" />
          <InputField label="Address 2" placeholder="Enter address line 2" containerClassName="md:col-span-2" />
          <InputField label="Address 3" placeholder="Enter address line 3" containerClassName="md:col-span-2" />
          
          <SelectField 
            label="Country" 
            placeholder="Select a country..."
            options={[
              { value: "us", label: "United States" },
              { value: "uk", label: "United Kingdom" },
              { value: "ca", label: "Canada" },
              { value: "au", label: "Australia" },
              { value: "bd", label: "Bangladesh" },
            ]}
          />
          <InputField label="City" placeholder="Enter city" />
          <InputField label="Postal Code" placeholder="Enter postal code" />
          <InputField label="Phone" placeholder="Enter phone number" />
          <InputField label="Email" type="email" placeholder="Enter email address" containerClassName="md:col-span-2" />
        </div>
      </div>

      {/* Quick Ship Collection Address */}
      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-bold text-gray-800 mb-6">Quick Ship Collection Address</h3>
        <div className="grid grid-cols-1 gap-6">
          <InputField label="Company Name" placeholder="Enter company name" />
        </div>
      </div>

      {/* Export and Domestic Address Defaults */}
      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-bold text-gray-800 mb-6">Export and Domestic Address Defaults</h3>
        <div className="space-y-4">
          <label className="flex items-center gap-3 cursor-pointer group w-fit">
            <input 
              type="checkbox" 
              checked={saveToAddressBook}
              onChange={(e) => setSaveToAddressBook(e.target.checked)}
              className="w-5 h-5 text-[#081b4c] rounded border-gray-300 focus:ring-[#081b4c] cursor-pointer" 
            />
            <span className="text-sm font-bold text-gray-700 group-hover:text-gray-900 transition-colors">
              Save to address book
            </span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer group w-fit">
            <input 
              type="checkbox" 
              checked={residential}
              onChange={(e) => setResidential(e.target.checked)}
              className="w-5 h-5 text-[#081b4c] rounded border-gray-300 focus:ring-[#081b4c] cursor-pointer" 
            />
            <span className="text-sm font-bold text-gray-700 group-hover:text-gray-900 transition-colors">
              Residential
            </span>
          </label>
        </div>
      </div>

      {/* Export or Domestic Quick Ship Package & Shipment Service Defaults */}
      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-bold text-gray-800 mb-6">Export or Domestic Quick Ship Package & Shipment Service Defaults</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
          <SelectField label="Service Company" placeholder="Select..." options={[{value: "tnt", label: "TNT"}, {value: "dhl", label: "DHL"}]} />
          <SelectField label="Service Type" placeholder="Select..." options={[{value: "express", label: "Express"}, {value: "standard", label: "Standard"}]} />
          <SelectField label="Packaging Type" placeholder="Select..." options={[{value: "box", label: "Box"}, {value: "envelope", label: "Envelope"}]} />
          <SelectField label="Package Type" placeholder="Select..." options={[{value: "custom", label: "Custom"}, {value: "standard", label: "Standard"}]} />
          <SelectField label="Service Company Import" placeholder="Select..." options={[{value: "tnt", label: "TNT"}, {value: "dhl", label: "DHL"}]} />
          <SelectField label="Service Type Import" placeholder="Select..." options={[{value: "express", label: "Express"}, {value: "standard", label: "Standard"}]} />
          <SelectField label="Package Type Import" placeholder="Select..." options={[{value: "custom", label: "Custom"}, {value: "standard", label: "Standard"}]} />
          
          <InputField 
            label="Number of Boxes" 
            placeholder="e.g. 1" 
            tooltip="Total number of boxes for the shipment"
          />
        </div>

        {/* Defaults Table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-x-auto shadow-sm">
          <Table headers={["Number", "Weight (kg)", "Boxes", "Length (cm)", "Width (cm)", "Height (cm)", "Custom Value"]}>
            {tableData.map((row) => (
              <tr key={row.id} className="hover:bg-blue-50/50 transition-colors">
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800 font-bold">{row.number}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600 font-medium">{row.weight}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600 font-medium">{row.boxes}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600 font-medium">{row.length}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600 font-medium">{row.width}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600 font-medium">{row.height}</td>
                <td className="px-4 py-2 min-w-[150px]">
                  <select className="w-full px-3 py-1.5 rounded-lg border border-gray-200 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#081b4c]/20 focus:border-[#081b4c] bg-white cursor-pointer transition-all">
                    <option value="">Select...</option>
                    <option value="val1">Customized</option>
                    <option value="val2">Standardized</option>
                  </select>
                </td>
              </tr>
            ))}
          </Table>
        </div>

        {/* Additional Package Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 pt-6 border-t border-gray-200">
          <label className="flex items-center gap-3 cursor-pointer group w-fit">
            <input type="checkbox" className="w-5 h-5 text-[#081b4c] rounded border-gray-300 focus:ring-[#081b4c] cursor-pointer" />
            <span className="text-sm font-bold text-gray-700 group-hover:text-gray-900 transition-colors">
              Save package description
            </span>
          </label>
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-gray-700">Manage package description</span>
            <button className="text-gray-400 hover:text-[#081b4c] transition-colors"><Edit2 className="w-4 h-4" /></button>
            <div className="relative group flex items-center">
              <HelpCircle className="w-4 h-4 text-gray-400 cursor-help" />
            </div>
          </div>
          <div className="flex items-center gap-4">
             <div className="flex-1">
               <SelectField 
                 label="Enhance cover" 
                 placeholder="Select cover amount..." 
                 options={[
                   {value: "5", label: "$5"},
                   {value: "50", label: "$50"},
                   {value: "100", label: "$100"},
                   {value: "500", label: "$500"},
                   {value: "1000", label: "$1,000"},
                   {value: "5000", label: "$5,000"},
                   {value: "8000", label: "$8,000"}
                 ]} 
               />
             </div>
             <div className="relative group flex items-center mt-6">
               <CircleHelp className="w-5 h-5 text-red-600 cursor-help" />
               <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-gray-900 text-white text-xs leading-relaxed rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                 Enhance cover details will appear here.
                 <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900"></div>
               </div>
             </div>
          </div>
        </div>
      </div>

      {/* Email Notification */}
      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-bold text-gray-800 mb-6">Export or Domestic and Quick Ship Package Email Notification</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3">Email Notification Setup</label>
            <div className="flex flex-wrap gap-4">
              <label className="flex items-center gap-2 cursor-pointer group"><input type="checkbox" className="w-4 h-4 text-[#081b4c] rounded" /><span className="text-sm font-medium">Shipment</span></label>
              <label className="flex items-center gap-2 cursor-pointer group"><input type="checkbox" className="w-4 h-4 text-[#081b4c] rounded" /><span className="text-sm font-medium">Exception</span></label>
              <label className="flex items-center gap-2 cursor-pointer group"><input type="checkbox" className="w-4 h-4 text-[#081b4c] rounded" /><span className="text-sm font-medium">Delivery</span></label>
            </div>
          </div>
          <InputField label="Receive Recipient Update Email :" placeholder="Enter email" />
          <div className="md:col-span-2 mt-2">
            <label className="block text-sm font-bold text-gray-700 mb-3">Service Brands</label>
            <div className="flex flex-wrap gap-6">
              <label className="flex items-center gap-2 cursor-pointer group"><input type="checkbox" className="w-4 h-4 text-[#081b4c] rounded" /><span className="text-sm font-bold text-gray-700">TNT</span></label>
              <label className="flex items-center gap-2 cursor-pointer group"><input type="checkbox" className="w-4 h-4 text-[#081b4c] rounded" /><span className="text-sm font-bold text-gray-700">FedEx</span></label>
              <label className="flex items-center gap-2 cursor-pointer group"><input type="checkbox" className="w-4 h-4 text-[#081b4c] rounded" /><span className="text-sm font-bold text-gray-700">UPS</span></label>
            </div>
          </div>
        </div>
      </div>

      {/* Billing Details */}
      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-bold text-gray-800 mb-6">Billing Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          <SelectField label="Transportation Charges" placeholder="Select..." options={[{value: "sender", label: "Sender"}]} />
          <SelectField label="Collection Options" placeholder="Select..." options={[{value: "daily", label: "Daily"}]} />
          <SelectField label="Commercial Invoice" placeholder="Select..." options={[{value: "electronic", label: "Electronic"}]} />
          <SelectField label="Delivery Types" placeholder="Select..." options={[{value: "standard", label: "Standard"}]} />
        </div>
        <div className="space-y-4">
          <label className="flex items-center gap-3 cursor-pointer group w-fit">
            <input type="checkbox" className="w-5 h-5 text-[#081b4c] rounded border-gray-300 focus:ring-[#081b4c] cursor-pointer" />
            <span className="text-sm font-bold text-gray-700 group-hover:text-gray-900 transition-colors">Show ship charges on commercial invoice</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer group w-fit">
            <input type="checkbox" className="w-5 h-5 text-[#081b4c] rounded border-gray-300 focus:ring-[#081b4c] cursor-pointer" />
            <span className="text-sm font-bold text-gray-700 group-hover:text-gray-900 transition-colors">Always provide CS2 information</span>
          </label>
        </div>
      </div>

      {/* Quotation Settings */}
      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-bold text-gray-800 mb-6">Quotation Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <SelectField label="Delivery Country" placeholder="Select..." options={[{value: "all", label: "All over the world"}, {value: "us", label: "United States"}]} />
          <SelectField label="Default Startup Page" placeholder="Select..." options={[{value: "dashboard", label: "Dashboard"}, {value: "shipment", label: "Shipment"}]} />
          <SelectField label="Quick Quote Booking Redirect" placeholder="Select..." options={[{value: "yes", label: "Yes"}, {value: "no", label: "No"}]} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          <label className="flex items-center gap-3 cursor-pointer group w-fit">
            <input type="checkbox" className="w-5 h-5 text-[#081b4c] rounded border-gray-300 focus:ring-[#081b4c] cursor-pointer" />
            <span className="text-sm font-bold text-gray-700 group-hover:text-gray-900 transition-colors">Auto save quotation</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer group w-fit">
            <input type="checkbox" className="w-5 h-5 text-[#081b4c] rounded border-gray-300 focus:ring-[#081b4c] cursor-pointer" />
            <span className="text-sm font-bold text-gray-700 group-hover:text-gray-900 transition-colors">Show post code finder</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer group w-fit">
            <input type="checkbox" className="w-5 h-5 text-[#081b4c] rounded border-gray-300 focus:ring-[#081b4c] cursor-pointer" />
            <span className="text-sm font-bold text-gray-700 group-hover:text-gray-900 transition-colors">Show my packaging option</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer group w-fit">
            <input type="checkbox" className="w-5 h-5 text-[#081b4c] rounded border-gray-300 focus:ring-[#081b4c] cursor-pointer" />
            <span className="text-sm font-bold text-gray-700 group-hover:text-gray-900 transition-colors">Allow estimates</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer group w-fit">
            <input type="checkbox" className="w-5 h-5 text-[#081b4c] rounded border-gray-300 focus:ring-[#081b4c] cursor-pointer" />
            <span className="text-sm font-bold text-gray-700 group-hover:text-gray-900 transition-colors">Allow multi tab</span>
          </label>
        </div>
      </div>

      {/* Saved Shipment Settings */}
      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-bold text-gray-800 mb-6">Saved Shipment Settings</h3>
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-3 cursor-pointer group w-fit">
            <input type="checkbox" className="w-5 h-5 text-[#081b4c] rounded border-gray-300 focus:ring-[#081b4c] cursor-pointer" />
            <span className="text-sm font-bold text-gray-700 group-hover:text-gray-900 transition-colors">Auto delete saved option</span>
          </label>
          <div className="relative group flex items-center">
            <CircleHelp className="w-5 h-5 text-red-600 cursor-help" />
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-gray-900 text-white text-xs leading-relaxed rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
              Hover content details.
              <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end pt-4 pb-12">
        <button className="bg-[#081b4c] hover:bg-[#081b4c]/90 text-white font-semibold py-3 px-10 rounded-xl transition-colors text-lg shadow-md">
          Update
        </button>
      </div>

    </div>
  );
}
