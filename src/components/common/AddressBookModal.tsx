import React, { useState } from 'react';
import { Search, X } from 'lucide-react';

export interface AddressEntry {
  id: string;
  reference: string;
  name: string;
  company: string;
  address: string;
  city: string;
  country: string;
  state: string;
  postcode: string;
  response: string;
}

const dummyData: AddressEntry[] = [
  { id: '1', reference: 'REF-001', name: 'Jane Doe', company: 'Acme Corp', address: '123 Main St', city: 'London', country: 'UK', state: 'Greater London', postcode: 'SW1A 1AA', response: 'Yes' },
  { id: '2', reference: 'REF-002', name: 'John Smith', company: 'Globex Inc', address: '456 High St', city: 'Manchester', country: 'UK', state: 'Greater Manchester', postcode: 'M1 1AA', response: 'No' },
  { id: '3', reference: 'REF-003', name: 'Alice Johnson', company: 'Stark Ind', address: '789 Park Ave', city: 'New York', country: 'USA', state: 'NY', postcode: '10001', response: 'Yes' },
];

interface AddressBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (entry: AddressEntry) => void;
}

export function AddressBookModal({ isOpen, onClose, onSelect }: AddressBookModalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const filteredData = dummyData.filter(entry => 
    Object.values(entry).some(val => val.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleOk = () => {
    if (selectedId) {
      const selected = dummyData.find(d => d.id === selectedId);
      if (selected) onSelect(selected);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-6xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 bg-[#081b4c] text-white">
          <h2 className="text-xl font-bold tracking-tight">Address Book</h2>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 flex flex-col flex-1 overflow-hidden">
          {/* Search */}
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#081b4c]/20 focus:border-[#081b4c] focus:bg-white transition-all outline-none"
              placeholder="Search by Reference, Contact Name, Company, Address, City, Country, Postcode..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Table */}
          <div className="flex-1 overflow-auto border border-gray-200 rounded-xl">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-gray-50 text-gray-500 font-bold sticky top-0 z-10 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-center w-12">Select</th>
                  <th className="px-4 py-3">Reference</th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Company</th>
                  <th className="px-4 py-3">Address</th>
                  <th className="px-4 py-3">City</th>
                  <th className="px-4 py-3">Country</th>
                  <th className="px-4 py-3">State</th>
                  <th className="px-4 py-3">Postcode</th>
                  <th className="px-4 py-3">Response</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredData.length > 0 ? (
                  filteredData.map((entry) => (
                    <tr 
                      key={entry.id} 
                      className={`hover:bg-blue-50/50 cursor-pointer transition-colors ${selectedId === entry.id ? 'bg-blue-50' : ''}`}
                      onClick={() => setSelectedId(entry.id)}
                    >
                      <td className="px-4 py-3 text-center">
                        <input
                          type="checkbox"
                          checked={selectedId === entry.id}
                          onChange={() => setSelectedId(entry.id)}
                          className="w-4 h-4 text-[#081b4c] border-gray-300 rounded focus:ring-[#081b4c] cursor-pointer"
                        />
                      </td>
                      <td className="px-4 py-3 font-medium text-gray-900">{entry.reference}</td>
                      <td className="px-4 py-3 text-gray-600">{entry.name}</td>
                      <td className="px-4 py-3 text-gray-600">{entry.company}</td>
                      <td className="px-4 py-3 text-gray-600 truncate max-w-[200px]" title={entry.address}>{entry.address}</td>
                      <td className="px-4 py-3 text-gray-600">{entry.city}</td>
                      <td className="px-4 py-3 text-gray-600">{entry.country}</td>
                      <td className="px-4 py-3 text-gray-600">{entry.state}</td>
                      <td className="px-4 py-3 text-gray-600">{entry.postcode}</td>
                      <td className="px-4 py-3 text-gray-600">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${entry.response === 'Yes' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {entry.response}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={10} className="px-4 py-8 text-center text-gray-500">
                      No addresses found matching your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-gray-100 bg-white flex justify-end">
          <button
            onClick={handleOk}
            disabled={!selectedId}
            className="px-8 py-2.5 bg-[#081b4c] text-white font-bold rounded-xl hover:bg-blue-950 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}
