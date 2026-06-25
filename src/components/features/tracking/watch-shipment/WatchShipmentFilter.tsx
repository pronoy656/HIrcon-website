import React from 'react';
import { Search, Calendar } from 'lucide-react';

interface WatchShipmentFilterProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  fromDate: string;
  setFromDate: (date: string) => void;
  toDate: string;
  setToDate: (date: string) => void;
}

export function WatchShipmentFilter({
  searchQuery,
  setSearchQuery,
  fromDate,
  setFromDate,
  toDate,
  setToDate
}: WatchShipmentFilterProps) {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 mb-6 flex flex-col md:flex-row gap-4 justify-between items-center animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="relative w-full md:w-1/2 lg:w-1/3">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Filtered by tracking number, customer reference, carrier..."
          className="block w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 transition-all placeholder:text-gray-400 text-gray-900 font-medium"
        />
      </div>

      <div className="flex items-center gap-3 w-full md:w-auto">
        <div className="relative flex-1 md:w-40">
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 transition-all text-gray-900 font-medium cursor-pointer"
            title="From Date"
          />
        </div>
        <span className="text-gray-400 font-medium text-sm">to</span>
        <div className="relative flex-1 md:w-40">
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 transition-all text-gray-900 font-medium cursor-pointer"
            title="To Date"
          />
        </div>
      </div>
    </div>
  );
}
