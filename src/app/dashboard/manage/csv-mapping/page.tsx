"use client";

import React, { useState } from "react";
import { Tabs } from "@/components/common/Tabs";
import { CreateNewTab } from "@/components/manage/csv-mapping/CreateNewTab";
import { ExistingTab } from "@/components/manage/csv-mapping/ExistingTab";

export default function CsvMappingPage() {
  const [activeTab, setActiveTab] = useState("new");

  const tabs = [
    { id: "new", label: "Create New" },
    { id: "existing", label: "Use Existing" },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto animate-in fade-in zoom-in-95 duration-300">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-white mb-1">CSV Mapping</h1>
        <p className="text-blue-100 mt-1 font-medium">
          Configure how your uploaded files map to ExShip fields.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-visible">
        
        <div className="p-6">
          {/* Tabs */}
          <div className="flex justify-center mb-8">
            <Tabs 
              tabs={tabs} 
              activeTab={activeTab} 
              onChange={setActiveTab} 
              variant="blue" 
              fullWidth={true}
              containerClassName="max-w-md"
            />
          </div>

          {/* Tab Content Areas */}
          {activeTab === "new" && <CreateNewTab />}
          {activeTab === "existing" && <ExistingTab />}
        </div>
      </div>
    </div>
  );
}
