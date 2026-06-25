import React, { useState } from 'react';
import { Modal } from "@/components/common/Modal";
import { InputField } from "@/components/common/InputField";
import { SelectField } from "@/components/common/SelectField";
import { PostCodeModal } from "@/components/common/PostCodeModal";

interface SoldToAddressData {
  addressBook: string;
  company: string;
  contactName: string;
  addressLine1: string;
  addressLine2: string;
  addressLine3: string;
  country: string;
  city: string;
  postCode: string;
  phone: string;
  email: string;
  soldToEori: string;
  soldToTaxId: string;
}

interface SoldToAddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: SoldToAddressData) => void;
  initialData?: SoldToAddressData;
}

export function SoldToAddressModal({ isOpen, onClose, onSave, initialData }: SoldToAddressModalProps) {
  const [data, setData] = useState<SoldToAddressData>(initialData || {
    addressBook: "",
    company: "",
    contactName: "",
    addressLine1: "",
    addressLine2: "",
    addressLine3: "",
    country: "",
    city: "",
    postCode: "",
    phone: "",
    email: "",
    soldToEori: "",
    soldToTaxId: ""
  });
  const [isPostCodeModalOpen, setIsPostCodeModalOpen] = useState(false);

  const handleSave = () => {
    onSave(data);
    onClose();
  };

  return (
    <>
      <Modal 
        isOpen={isOpen} 
        onClose={onClose} 
        title="Sold To Address Details"
        maxWidthClass="max-w-3xl"
        footer={
          <>
            <button onClick={onClose} className="px-6 py-2 text-sm font-semibold text-white bg-[#081b4c] hover:bg-[#06143c] rounded-md transition-colors">CANCEL</button>
            <button onClick={handleSave} className="px-6 py-2 text-sm font-semibold text-white bg-[#081b4c] hover:bg-[#06143c] rounded-md transition-colors">SAVE</button>
          </>
        }
      >
        <div className="flex flex-col gap-4">
          <SelectField
            label="Address Book"
            value={data.addressBook}
            onChange={(val) => setData({ ...data, addressBook: val })}
            options={[
              { value: "", label: "Select from Address Book" },
              { value: "address1", label: "Address 1" },
              { value: "address2", label: "Address 2" }
            ]}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField label="Company" value={data.company} onChange={e => setData({...data, company: e.target.value})} />
            <InputField label="Contact Name" value={data.contactName} onChange={e => setData({...data, contactName: e.target.value})} />
          </div>

          <InputField required label="Address Line 1" value={data.addressLine1} onChange={e => setData({...data, addressLine1: e.target.value})} />
          <InputField label="Address Line 2" value={data.addressLine2} onChange={e => setData({...data, addressLine2: e.target.value})} />
          <InputField label="Address Line 3" value={data.addressLine3} onChange={e => setData({...data, addressLine3: e.target.value})} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SelectField
              required
              label="Country"
              value={data.country}
              onChange={(val) => setData({ ...data, country: val })}
              options={[
                { value: "", label: "Select Country" },
                { value: "UK", label: "United Kingdom" },
                { value: "US", label: "United States" },
                { value: "CN", label: "China" }
              ]}
            />
            <InputField required label="City Name" value={data.city} onChange={e => setData({...data, city: e.target.value})} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
            <div className="flex gap-2 items-end">
              <InputField required label="Post Code" value={data.postCode} onChange={e => setData({...data, postCode: e.target.value})} containerClassName="flex-1" />
              <button 
                onClick={() => setIsPostCodeModalOpen(true)}
                className="h-[42px] px-4 bg-[#081b4c] hover:bg-[#06143c] text-white text-xs font-semibold rounded-md transition-colors whitespace-nowrap"
              >
                Post Code
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField label="Phone Number" value={data.phone} onChange={e => setData({...data, phone: e.target.value})} />
            <InputField label="Email" type="email" value={data.email} onChange={e => setData({...data, email: e.target.value})} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField label="Sold to EORI" value={data.soldToEori} onChange={e => setData({...data, soldToEori: e.target.value})} />
            <InputField label="Sold to Tax ID" value={data.soldToTaxId} onChange={e => setData({...data, soldToTaxId: e.target.value})} />
          </div>
        </div>
      </Modal>

      {/* Post Code Popup inside Sold To Address */}
      <PostCodeModal
        isOpen={isPostCodeModalOpen}
        onClose={() => setIsPostCodeModalOpen(false)}
        onSelect={(address) => {
          setData({ ...data, city: "London", postCode: "E14 5AA" });
        }}
      />
    </>
  );
}
