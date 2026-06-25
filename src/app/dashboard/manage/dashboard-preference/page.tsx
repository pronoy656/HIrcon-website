"use client";

import React, { useState } from "react";
import { WeeklyChart } from "@/components/features/overview/graph&chart/WeeklyChart";
import { MonthlyChart } from "@/components/features/overview/graph&chart/MonthlyChart";
import { ServiceProviderChart } from "@/components/features/overview/graph&chart/ServiceProviderChart";
import { TotalWeeklyChart } from "@/components/features/overview/graph&chart/TotalWeeklyChart";
import { Table } from "@/components/ui/Table";

export default function DashboardPreferencePage() {
  const [exceptions, setExceptions] = useState([
    { id: 1, carrier: 'TNT', tracking: 'TNT123456789', selected: false },
    { id: 2, carrier: 'DHL', tracking: 'DHL987654321', selected: false },
    { id: 3, carrier: 'UPS', tracking: 'UPS555555555', selected: false },
  ]);

  const toggleException = (id: number) => {
    setExceptions(prev => prev.map(e => e.id === id ? { ...e, selected: !e.selected } : e));
  };

  return (
    <div className="p-8 max-w-7xl mx-auto animate-in fade-in duration-500">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-white mb-2 tracking-tight">Dashboard Preferences</h1>
        <p className="text-blue-100 font-medium">Manage and preview the graphs displayed on your overview dashboard.</p>
      </div>

      <div className="space-y-8">
        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 shadow-inner">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Active Graphs Preview</h2>
          
          <div className="space-y-8">
            {/* Row 1 */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              <div className="min-w-0 transition-transform duration-300 hover:scale-[1.01]">
                <WeeklyChart />
              </div>
              <div className="min-w-0 transition-transform duration-300 hover:scale-[1.01]">
                <MonthlyChart />
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              <div className="min-w-0 transition-transform duration-300 hover:scale-[1.01]">
                <TotalWeeklyChart />
              </div>
              <div className="min-w-0 transition-transform duration-300 hover:scale-[1.01]">
                <ServiceProviderChart />
              </div>
            </div>
          </div>
        </div>

        {/* Exception List Section */}
        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 shadow-inner mt-8">
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

      </div>
    </div>
  );
}
