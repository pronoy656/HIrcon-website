import React from "react";
import { Modal } from "../../common/Modal";
import { SelectField } from "../../common/SelectField";

interface AddContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  modalMode: "add" | "edit";
  activeContact: any;
  setActiveContact: (contact: any) => void;
  onSave: () => void;
}

export function AddContactModal({
  isOpen,
  onClose,
  modalMode,
  activeContact,
  setActiveContact,
  onSave,
}: AddContactModalProps) {
  const renderModalInput = (label: string, field: string, type: string = "text", colSpan: boolean = false) => (
    <div className={`flex flex-col gap-1.5 ${colSpan ? 'md:col-span-2' : ''}`}>
      <label className="text-sm font-bold text-gray-700">{label}</label>
      <input 
        type={type} 
        value={activeContact?.[field] || ""}
        onChange={e => setActiveContact({...activeContact, [field]: e.target.value})}
        className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#081b4c]/20 focus:border-[#081b4c] outline-none transition-all text-sm"
      />
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={modalMode === "edit" ? "Edit Contact" : "Add New Contact"}
      maxWidthClass="max-w-4xl"
      footer={
        <>
          <button onClick={onClose} className="px-5 py-2 font-bold text-gray-600 hover:bg-gray-100 rounded-xl transition-colors">
            Cancel
          </button>
          <button onClick={onSave} className="px-5 py-2 font-bold text-white bg-[#081b4c] hover:bg-[#081845] rounded-xl transition-colors shadow-sm">
            {modalMode === "edit" ? "Save Changes" : "Create Contact"}
          </button>
        </>
      }
    >
      {activeContact && (
        <div className="space-y-8">
          
          {/* General Info */}
          <div>
            <h4 className="text-base font-bold text-[#081b4c] border-b border-gray-100 pb-2 mb-4">General Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {renderModalInput("Name", "name")}
              {renderModalInput("Reference", "reference")}
              {renderModalInput("Company", "company")}
            </div>
          </div>

          {/* Address Details */}
          <div>
            <h4 className="text-base font-bold text-[#081b4c] border-b border-gray-100 pb-2 mb-4">Address Details</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {renderModalInput("Address 1", "address")}
              {renderModalInput("Address 2", "address2")}
              {renderModalInput("Address 3", "address3")}
              {renderModalInput("Country", "country")}
              {renderModalInput("State", "state")}
              {renderModalInput("City", "city")}
              {renderModalInput("Postal Code", "post")}
              <label className="flex items-center gap-3 cursor-pointer group pt-6">
                <input 
                  type="checkbox" 
                  checked={activeContact.residential || false}
                  onChange={e => setActiveContact({...activeContact, residential: e.target.checked})}
                  className="w-5 h-5 text-[#081b4c] rounded border-gray-300 focus:ring-[#081b4c]" 
                />
                <span className="text-sm font-bold text-gray-700">Residential Address</span>
              </label>
            </div>
          </div>

          {/* Contact & Notifications */}
          <div>
            <h4 className="text-base font-bold text-[#081b4c] border-b border-gray-100 pb-2 mb-4">Contact & Notification</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {renderModalInput("Phone", "phone")}
              {renderModalInput("Fax", "fax")}
              {renderModalInput("Email", "email")}
              
              <SelectField
                label="Notification Option"
                value={activeContact.notificationOption || "Email"}
                onChange={val => setActiveContact({...activeContact, notificationOption: val})}
                options={[
                  { value: "Email", label: "Email" },
                  { value: "SMS", label: "SMS" },
                  { value: "Both", label: "Both" },
                  { value: "None", label: "None" },
                ]}
                required
              />
              
              <SelectField
                label="Addtl Notification Option"
                value={activeContact.additionalNotificationOption || "None"}
                onChange={val => setActiveContact({...activeContact, additionalNotificationOption: val})}
                options={[
                  { value: "Email", label: "Email" },
                  { value: "SMS", label: "SMS" },
                  { value: "Both", label: "Both" },
                  { value: "None", label: "None" },
                ]}
                required
              />
              
              {renderModalInput("Other Email", "otherEmail")}
            </div>
          </div>

          {/* Business & Delivery Settings */}
          <div>
            <h4 className="text-base font-bold text-[#081b4c] border-b border-gray-100 pb-2 mb-4">Business & Delivery Settings</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {renderModalInput("VAT/Tax/EIN Number", "vatNumber")}
              {renderModalInput("EORI", "eori")}
              {renderModalInput("Collection Address", "collectionAddress")}
              
              <SelectField
                label="Delivery Services"
                value={activeContact.deliveryServices || "Standard"}
                onChange={val => setActiveContact({...activeContact, deliveryServices: val})}
                options={[
                  { value: "Standard", label: "Standard" },
                  { value: "Express", label: "Express" },
                  { value: "Next Day", label: "Next Day" },
                  { value: "Economy", label: "Economy" },
                ]}
                required
              />
              
              {renderModalInput("Earlier Delivery Time", "earlierDeliveryTime", "time")}
              {renderModalInput("Latest Delivery Time", "latestDeliveryTime", "time")}

              <div className="md:col-span-3 mt-2">
                <SelectField
                  label="Account Status"
                  value={activeContact.response || "Active"}
                  onChange={val => setActiveContact({...activeContact, response: val})}
                  options={[
                    { value: "Active", label: "Active" },
                    { value: "Pending", label: "Pending" },
                    { value: "Inactive", label: "Inactive" },
                  ]}
                  required
                />
              </div>
            </div>
          </div>

        </div>
      )}
    </Modal>
  );
}
