import React from "react";
import { Contact } from "lucide-react";
import { InputField } from "@/components/ui/InputField";
import { SelectField } from "@/components/ui/SelectField";

export interface Address {
  company: string;
  contactName: string;
  addressLine1: string;
  country: string;
  cityName: string;
  postCode: string;
  phone: string;
  email: string;
  state?: string;
}

const COUNTRIES_WITH_STATES = ['us', 'ca', 'au', 'in', 'br', 'mx', 'my'];

interface SenderDetailsProps {
  collectionAddress: Address;
  setCollectionAddress: (address: Address) => void;
  setIsAddressBookOpen: (isOpen: boolean) => void;
  setPostCodeModalTarget: (target: 'collection' | 'delivery' | null) => void;
  setIsPostCodeModalOpen: (isOpen: boolean) => void;
  countryOptions: { value: string; label: React.ReactNode }[];
}

export const SenderDetails = React.memo(function SenderDetails({ 
  collectionAddress,
  setCollectionAddress,
  setIsAddressBookOpen,
  setPostCodeModalTarget,
  setIsPostCodeModalOpen,
  countryOptions
}: SenderDetailsProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col h-full">
      <div className="bg-[#081b4c] border-b border-[#081b4c] p-5 flex justify-between items-start">
        <div>
          <h2 className="text-lg font-extrabold text-white tracking-tight">Step 1: Collection Address</h2>
          <p className="text-xs text-blue-100 font-medium mt-0.5">Where is the package coming from?</p>
        </div>
      </div>
      
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-5 flex-1">
        <SelectField
          label="Address Book"
          combo
          options={[
            { value: "1", label: "Main Office", searchKey: "main office" },
            { value: "2", label: "Warehouse A", searchKey: "warehouse a" }
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

        <InputField label="Reference" type="text" containerClassName="sm:col-span-2" placeholder="e.g. REF-12345" />
        <InputField label="Company" type="text" containerClassName="sm:col-span-2" placeholder="e.g. Acme Corp" value={collectionAddress.company} onChange={(e) => setCollectionAddress({...collectionAddress, company: e.target.value})} />
        <InputField label="Contact Name" type="text" containerClassName="sm:col-span-2" placeholder="e.g. Jane Doe" value={collectionAddress.contactName} onChange={(e) => setCollectionAddress({...collectionAddress, contactName: e.target.value})} />
        <InputField label="Address Line 1" type="text" required containerClassName="sm:col-span-2" placeholder="e.g. 123 Main St" value={collectionAddress.addressLine1} onChange={(e) => setCollectionAddress({...collectionAddress, addressLine1: e.target.value})} />
        <InputField label="Address Line 2" type="text" optional containerClassName="sm:col-span-2" placeholder="e.g. Suite 100" />
        <InputField label="Address Line 3" type="text" optional containerClassName="sm:col-span-2" placeholder="e.g. Building B" />

        <SelectField
          label="Country"
          optional
          searchable
          options={countryOptions}
          placeholder="Select Country..."
          containerClassName="sm:col-span-2"
          value={collectionAddress.country}
          onChange={(val) => setCollectionAddress({...collectionAddress, country: val})}
        />

        {COUNTRIES_WITH_STATES.includes(collectionAddress.country?.toLowerCase() || '') && (
          <InputField label="State" type="text" required containerClassName="sm:col-span-2" placeholder="e.g. New York" value={collectionAddress.state || ''} onChange={(e) => setCollectionAddress({...collectionAddress, state: e.target.value})} />
        )}

        <InputField label="City Name" type="text" required placeholder="e.g. London" containerClassName="sm:col-span-2" value={collectionAddress.cityName} onChange={(e) => setCollectionAddress({...collectionAddress, cityName: e.target.value})} />
        <div className="sm:col-span-2 flex items-end gap-3">
          <InputField label="Post Code" type="text" required placeholder="e.g. SW1A 1AA" containerClassName="flex-1" value={collectionAddress.postCode} onChange={(e) => setCollectionAddress({...collectionAddress, postCode: e.target.value})} />
          <button 
            onClick={(e) => { e.preventDefault(); setPostCodeModalTarget('collection'); setIsPostCodeModalOpen(true); }}
            className="h-[42px] px-6 rounded-xl bg-[#081b4c] text-white font-bold text-sm hover:bg-blue-900 transition-colors shadow-sm whitespace-nowrap"
          >
            Post Code
          </button>
        </div>
        <InputField label="Phone" type="tel" required placeholder="e.g. +44 20 7123 4567" containerClassName="sm:col-span-2" value={collectionAddress.phone} onChange={(e) => setCollectionAddress({...collectionAddress, phone: e.target.value})} />
        <InputField label="Email" type="email" required containerClassName="sm:col-span-2" placeholder="e.g. jane.doe@example.com" value={collectionAddress.email} onChange={(e) => setCollectionAddress({...collectionAddress, email: e.target.value})} />

        <div className="sm:col-span-2 flex items-center gap-6 mt-1 pt-4 border-t border-gray-100">
          <label className="flex items-center gap-2 cursor-pointer group">
            <input type="checkbox" className="w-4 h-4 text-[#081b4c] border-gray-300 rounded focus:ring-[#081b4c]" />
            <span className="text-sm font-bold text-gray-700 group-hover:text-[#081b4c] transition-colors">Save to Contacts</span>
          </label>
        </div>
      </div>
    </div>
  );
});
