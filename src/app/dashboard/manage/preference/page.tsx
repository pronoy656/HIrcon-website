"use client";

import React, { useState } from "react";

import { ProfileTab } from "../../../../components/preference-tabs/profile/ProfileTab";
import { AddressTab } from "../../../../components/preference-tabs/address/AddressTab";
import { PrintingTab } from "../../../../components/preference-tabs/printing/PrintingTab";
import { UsersTab } from "../../../../components/preference-tabs/users/UsersTab";
import { RolesTab } from "../../../../components/preference-tabs/roles/RolesTab";

import { Tabs } from "../../../../components/common/Tabs";

export default function PreferencePage() {
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { id: "profile", label: "Profile and your company" },
    { id: "address", label: "Address and details" },
    { id: "printing", label: "Printing and other settings" },
    { id: "users", label: "Users" },
    { id: "roles", label: "Roles" },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto animate-in fade-in duration-500">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2 tracking-tight">Preferences</h1>
        <p className="text-gray-500 font-medium">Manage your profile, company details, and system settings.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        
        {/* Tabs Navigation */}
        <div className="bg-gray-50 border-b border-gray-100 p-4">
          <Tabs 
            tabs={tabs}
            activeTab={activeTab}
            onChange={setActiveTab}
            variant="default"
          />
        </div>

        {/* Tab Content Areas */}
        <div className="p-8 min-h-[400px]">
          {activeTab === "profile" && <ProfileTab />}
          {activeTab === "address" && <AddressTab />}
          {activeTab === "printing" && <PrintingTab />}
          {activeTab === "users" && <UsersTab />}
          {activeTab === "roles" && <RolesTab />}
        </div>
        
      </div>
    </div>
  );
}
