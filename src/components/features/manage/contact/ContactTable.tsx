import React from "react";
import { Edit2, Trash2, MapPin, ChevronLeft, ChevronRight } from "lucide-react";

interface ContactTableProps {
  paginatedContacts: any[];
  filteredContactsLength: number;
  currentPage: number;
  itemsPerPage: number;
  totalPages: number;
  handlePageChange: (newPage: number) => void;
  onEditClick: (contact: any) => void;
  onDeleteClick: (contact: any) => void;
}

export function ContactTable({
  paginatedContacts,
  filteredContactsLength,
  currentPage,
  itemsPerPage,
  totalPages,
  handlePageChange,
  onEditClick,
  onDeleteClick,
}: ContactTableProps) {
  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-600 whitespace-nowrap">
          <thead className="bg-gray-50 text-gray-700 font-bold border-b border-gray-100 uppercase text-xs tracking-wider">
            <tr>
              <th className="px-6 py-4">Reference</th>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Company</th>
              <th className="px-6 py-4">Address</th>
              <th className="px-6 py-4">City</th>
              <th className="px-6 py-4">Country</th>
              <th className="px-6 py-4">State</th>
              <th className="px-6 py-4">Post</th>
              <th className="px-6 py-4">Response</th>
              <th className="px-6 py-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {paginatedContacts.length > 0 ? (
              paginatedContacts.map((contact) => (
                <tr key={contact.id} className="hover:bg-blue-50/50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-[#081b4c]">{contact.reference}</td>
                  <td className="px-6 py-4 font-bold text-gray-900">{contact.name}</td>
                  <td className="px-6 py-4">{contact.company}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 max-w-[150px] lg:max-w-[200px] truncate" title={contact.address}>
                      <MapPin className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                      <span className="truncate">{contact.address}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium">{contact.city}</td>
                  <td className="px-6 py-4">{contact.country}</td>
                  <td className="px-6 py-4">{contact.state}</td>
                  <td className="px-6 py-4">{contact.post}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                      contact.response === 'Active' ? 'bg-green-100 text-green-800' :
                      contact.response === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {contact.response}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button 
                        onClick={() => onEditClick(contact)}
                        className="p-1.5 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors" 
                        title="Edit Contact"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => onDeleteClick(contact)}
                        className="p-1.5 text-red-600 hover:bg-red-100 rounded-lg transition-colors" 
                        title="Delete Contact"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={10} className="px-6 py-12 text-center text-gray-500 font-medium">
                  No contacts found matching your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer / Pagination */}
      {totalPages > 0 && (
        <div className="p-4 border-t border-gray-100 bg-gray-50/50 flex flex-col sm:flex-row items-center justify-between text-sm text-gray-500 font-medium gap-4">
          <div>
            Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredContactsLength)} of {filteredContactsLength} entries
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <div className="flex gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum = i + 1;
                if (totalPages > 5 && currentPage > 3) {
                  pageNum = currentPage - 2 + i;
                  if (pageNum > totalPages) pageNum = totalPages - 4 + i;
                }
                
                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold transition-colors ${
                      currentPage === pageNum 
                        ? "bg-[#081b4c] text-white" 
                        : "hover:bg-gray-200 text-gray-700"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            <button 
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
