import React from "react";
import { Contact } from "lucide-react";
import { InputField } from "@/components/ui/InputField";
import { SelectField } from "@/components/ui/SelectField";
import { Address } from "./SenderDetails";

interface ReceiverDetailsProps {
  deliveryAddress: Address;
  setDeliveryAddress: (address: Address) => void;
  setIsAddressBookOpen: (isOpen: boolean) => void;
  setPostCodeModalTarget: (target: 'collection' | 'delivery' | null) => void;
  setIsPostCodeModalOpen: (isOpen: boolean) => void;
  countryOptions: { value: string; label: React.ReactNode }[];
}

const COUNTRIES_WITH_STATES = ['us', 'ca', 'au', 'in', 'br', 'mx', 'my'];

export const ReceiverDetails = React.memo(function ReceiverDetails({ 
  deliveryAddress,
  setDeliveryAddress,
  setIsAddressBookOpen,
  setPostCodeModalTarget,
  setIsPostCodeModalOpen,
  countryOptions
}: ReceiverDetailsProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full">
      <div className="bg-[#081b4c] border-b border-[#081b4c] p-5 flex justify-between items-start">
        <div>
          <h2 className="text-lg font-extrabold text-white tracking-tight">Step 2: Delivery Address</h2>
          <p className="text-xs text-blue-100 font-medium mt-0.5">Where is the package going to?</p>
        </div>
      </div>
      
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
        <SelectField
          label="Address Book"
          combo
          options={[
            { value: "1", label: "Client A", searchKey: "client a" },
            { value: "2", label: "Client B", searchKey: "client b" }
          ]}
          placeholder="Select from Address Book..."
          containerClassName="sm:col-span-2"
          actionButton={
            <button 
              onClick={(e) => { e.preventDefault(); setIsAddressBookOpen(true); }}
              className="w-11 h-[42px] shrink-0 rounded-xl bg-[#081b4c] text-white hover:bg-[#06153b] transition-colors flex items-center justify-center shadow-sm" 
              title="Address Book"
            >
              <Contact className="w-5 h-5" />
            </button>
          }
        />

        <InputField label="Reference" type="text" containerClassName="sm:col-span-2" placeholder="e.g. DEL-67890" />
        <InputField label="Company" type="text" containerClassName="sm:col-span-2" placeholder="e.g. Globex Inc" value={deliveryAddress.company} onChange={(e) => setDeliveryAddress({...deliveryAddress, company: e.target.value})} />
        <InputField label="Contact Name" type="text" containerClassName="sm:col-span-2" placeholder="e.g. John Smith" value={deliveryAddress.contactName} onChange={(e) => setDeliveryAddress({...deliveryAddress, contactName: e.target.value})} />
        <InputField label="Address Line 1" type="text" required containerClassName="sm:col-span-2" placeholder="e.g. 456 High St" value={deliveryAddress.addressLine1} onChange={(e) => setDeliveryAddress({...deliveryAddress, addressLine1: e.target.value})} />
        <InputField label="Address Line 2" type="text" optional containerClassName="sm:col-span-2" placeholder="e.g. Floor 2" />
        <InputField label="Address Line 3" type="text" optional containerClassName="sm:col-span-2" placeholder="e.g. Business Park" />

        <SelectField
          label="Country"
          optional
          autocomplete
          options={countryOptions}
          placeholder="Select Country..."
          containerClassName="sm:col-span-2"
          value={deliveryAddress.country}
          onChange={(val) => setDeliveryAddress({...deliveryAddress, country: val})}
        />

        {COUNTRIES_WITH_STATES.includes(deliveryAddress.country?.toLowerCase() || '') && (
          <InputField label="State" type="text" required containerClassName="sm:col-span-2" placeholder="e.g. New York" value={deliveryAddress.state || ''} onChange={(e) => setDeliveryAddress({...deliveryAddress, state: e.target.value})} />
        )}

        <InputField label="City Name" type="text" required placeholder="e.g. New York" containerClassName="sm:col-span-2" value={deliveryAddress.cityName} onChange={(e) => setDeliveryAddress({...deliveryAddress, cityName: e.target.value})} />
        <div className="sm:col-span-2 flex items-end gap-3">
          <InputField label="Post Code" type="text" required placeholder="e.g. 10001" containerClassName="flex-1" value={deliveryAddress.postCode} onChange={(e) => setDeliveryAddress({...deliveryAddress, postCode: e.target.value})} />
          <button 
            onClick={(e) => { e.preventDefault(); setPostCodeModalTarget('delivery'); setIsPostCodeModalOpen(true); }}
            className="h-[42px] px-6 rounded-xl bg-[#081b4c] text-white font-bold text-sm hover:bg-blue-900 transition-colors shadow-sm whitespace-nowrap"
          >
            Post Code
          </button>
        </div>
        <InputField label="Phone" type="tel" required placeholder="e.g. +1 212 555 1234" containerClassName="sm:col-span-2" value={deliveryAddress.phone} onChange={(e) => setDeliveryAddress({...deliveryAddress, phone: e.target.value})} />
        <InputField label="Email" type="email" required containerClassName="sm:col-span-2" placeholder="e.g. john.smith@example.com" value={deliveryAddress.email} onChange={(e) => setDeliveryAddress({...deliveryAddress, email: e.target.value})} />

        <div className="sm:col-span-2 flex items-center gap-6 mt-1 pt-4 border-t border-gray-100">
          <label className="flex items-center gap-2 cursor-pointer group">
            <input type="checkbox" className="w-4 h-4 text-[#081b4c] border-gray-300 rounded focus:ring-[#081b4c]" />
            <span className="text-sm font-bold text-gray-700 group-hover:text-[#081b4c] transition-colors">Save to Contacts</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer group">
            <input type="checkbox" className="w-4 h-4 text-[#081b4c] border-gray-300 rounded focus:ring-[#081b4c]" />
            <span className="text-sm font-bold text-gray-700 group-hover:text-[#081b4c] transition-colors">Residential</span>
          </label>
        </div>
      </div>
    </div>
  );
});
