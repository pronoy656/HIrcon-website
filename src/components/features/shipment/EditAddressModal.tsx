import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { InputField } from '@/components/ui/InputField';
import { SelectField } from '@/components/ui/SelectField';

interface AddressData {
  company?: string;
  contactName?: string;
  addressLine1?: string;
  addressLine2?: string;
  addressLine3?: string;
  country?: string;
  cityName?: string;
  postCode?: string;
  phone?: string;
  email?: string;
  eori?: string;
}

interface EditAddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: AddressData) => void;
  initialData?: AddressData;
  title: string;
}

export function EditAddressModal({ isOpen, onClose, onSave, initialData, title }: EditAddressModalProps) {
  const [formData, setFormData] = useState<AddressData>({});

  useEffect(() => {
    if (isOpen) {
      setFormData(initialData || {});
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const handleChange = (field: keyof AddressData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-[#081b4c]/40 backdrop-blur-sm animate-in fade-in duration-300">
      <div 
        className="bg-gray-50 rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-[#081b4c] text-white shrink-0">
          <h2 className="text-lg font-bold">{title}</h2>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <SelectField
              label="Address Book"
              options={[{ value: 'select', label: 'Select' }]}
              value="select"
              onChange={() => {}}
            />
            <InputField
              label="Company"
              value={formData.company || ''}
              onChange={(e) => handleChange('company', e.target.value)}
            />
            
            <InputField
              label="Contact Name"
              required
              value={formData.contactName || ''}
              onChange={(e) => handleChange('contactName', e.target.value)}
            />
            <InputField
              label="Address Line 1"
              required
              value={formData.addressLine1 || ''}
              onChange={(e) => handleChange('addressLine1', e.target.value)}
            />
            
            <InputField
              label="Address Line 2"
              value={formData.addressLine2 || ''}
              onChange={(e) => handleChange('addressLine2', e.target.value)}
              placeholder="Address line 2"
            />
            <InputField
              label="Address Line 3"
              value={formData.addressLine3 || ''}
              onChange={(e) => handleChange('addressLine3', e.target.value)}
              placeholder="Address line 3"
            />
            
            <SelectField
              label="Country"
              options={[{ value: 'UK', label: 'UK' }]}
              value={formData.country || 'UK'}
              onChange={(val) => handleChange('country', val)}
            />
            <InputField
              label="City Name"
              required
              value={formData.cityName || ''}
              onChange={(e) => handleChange('cityName', e.target.value)}
            />
            
            <div className="flex items-end gap-2 sm:col-span-2">
              <div className="flex-1">
                <InputField
                  label="Post Code"
                  required
                  value={formData.postCode || ''}
                  onChange={(e) => handleChange('postCode', e.target.value)}
                />
              </div>
              <button className="bg-[#081b4c] text-white px-4 py-2.5 rounded-lg text-sm font-bold hover:bg-blue-950 transition-colors whitespace-nowrap mb-0.5">
                POST CODE
              </button>
            </div>
            <InputField
              label="Phone"
              required
              value={formData.phone || ''}
              onChange={(e) => handleChange('phone', e.target.value)}
            />
            
            <InputField
              label="Email"
              value={formData.email || ''}
              onChange={(e) => handleChange('email', e.target.value)}
            />
            <div className="sm:col-span-2">
              <InputField
                label={`${title.includes('Consignor') ? 'Consignor' : 'Consignee'} EORI`}
                value={formData.eori || ''}
                onChange={(e) => handleChange('eori', e.target.value)}
                placeholder={`${title.includes('Consignor') ? 'Consignor' : 'Consignee'} EORI`}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 shrink-0 bg-white flex justify-center gap-4">
          <button 
            onClick={onClose}
            className="bg-[#081b4c] text-white px-8 py-2.5 rounded text-sm font-bold hover:bg-blue-950 transition-colors"
          >
            CANCEL
          </button>
          <button 
            onClick={handleSave}
            className="bg-[#081b4c] text-white px-8 py-2.5 rounded text-sm font-bold hover:bg-blue-950 transition-colors"
          >
            SAVE
          </button>
        </div>
      </div>
    </div>
  );
}
