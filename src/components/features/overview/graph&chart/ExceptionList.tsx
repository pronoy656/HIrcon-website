"use client";

import React, { useState } from "react";
import { Table } from "@/components/ui/Table";

export function ExceptionList() {
  const [exceptions, setExceptions] = useState([
    { id: 1, carrier: 'TNT', tracking: 'TNT123456789', selected: false },
    { id: 2, carrier: 'DHL', tracking: 'DHL987654321', selected: false },
    { id: 3, carrier: 'UPS', tracking: 'UPS555555555', selected: false },
  ]);

  const toggleException = (id: number) => {
    setExceptions(prev => prev.map(e => e.id === id ? { ...e, selected: !e.selected } : e));
  };

  return (
    <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 shadow-inner w-full">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Exception List</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-green-50 p-6 rounded-xl border border-green-100 shadow-sm flex flex-col justify-center items-center">
          <span className="text-green-700 font-medium text-sm">Delivered</span>
          <span className="text-3xl font-bold text-green-900 mt-2">124</span>
        </div>
        <div className="bg-orange-50 p-6 rounded-xl border border-orange-100 shadow-sm flex flex-col justify-center items-center">
          <span className="text-orange-700 font-medium text-sm">In Transit</span>
          <span className="text-3xl font-bold text-orange-900 mt-2">45</span>
        </div>
        <div className="bg-red-50 p-6 rounded-xl border border-red-100 shadow-sm flex flex-col justify-center items-center">
          <span className="text-red-700 font-medium text-sm">Exceptions</span>
          <span className="text-3xl font-bold text-red-900 mt-2">3</span>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        <Table headers={["Carrier", "Tracking Number", "Select"]}>
          {exceptions.map((row) => (
            <tr key={row.id} className="hover:bg-blue-50/50 transition-colors">
              <td className="px-4 py-3 whitespace-nowrap text-sm font-semibold text-gray-800">
                {row.carrier}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600 font-medium">
                {row.tracking}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm">
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 text-[#081b4c] rounded focus:ring-[#081b4c] cursor-pointer"
                    checked={row.selected}
                    onChange={() => toggleException(row.id)}
                  />
                </div>
              </td>
            </tr>
          ))}
        </Table>
      </div>
    </div>
  );
}
