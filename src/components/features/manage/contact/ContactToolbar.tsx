import React from "react";
import { Search, Filter } from "lucide-react";
import { SelectField } from "@/components/ui/SelectField";

interface ContactToolbarProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  selectedCountry: string;
  setSelectedCountry: (val: string) => void;
  selectedCity: string;
  setSelectedCity: (val: string) => void;
  uniqueCountries: string[];
  uniqueCities: string[];
  setCurrentPage: (val: number) => void;
}

export function ContactToolbar({
  searchQuery,
  setSearchQuery,
  selectedCountry,
  setSelectedCountry,
  selectedCity,
  setSelectedCity,
  uniqueCountries,
  uniqueCities,
  setCurrentPage,
}: ContactToolbarProps) {
  return (
    <div className="p-4 border-b border-gray-100 flex flex-wrap lg:flex-nowrap items-center justify-between gap-4 bg-gray-50/50">
      <div className="relative max-w-md w-full">
        <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input 
          type="text" 
          placeholder="Search contacts by name, company, or reference..." 
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#081b4c]/20 focus:border-[#081b4c] transition-all bg-white font-medium text-sm"
        />
      </div>
      
      <div className="flex items-center gap-3 w-full lg:w-auto">
        <div className="flex-1 lg:flex-none w-full lg:w-48">
          <SelectField 
            value={selectedCountry}
            onChange={val => { setSelectedCountry(val); setCurrentPage(1); }}
            options={[
              { value: "", label: "All Countries" },
              ...uniqueCountries.map(c => ({ value: c, label: c }))
            ]}
            placeholder="All Countries"
            required
          />
        </div>
        <div className="flex-1 lg:flex-none w-full lg:w-48">
          <SelectField 
            value={selectedCity}
            onChange={val => { setSelectedCity(val); setCurrentPage(1); }}
            options={[
              { value: "", label: "All Cities" },
              ...uniqueCities.map(c => ({ value: c, label: c }))
            ]}
            placeholder="All Cities"
            required
          />
        </div>
      </div>
    </div>
  );
}
