"use client";

import React, { useState } from "react";
import { Trash2 } from "lucide-react";
import { InputField } from "@/components/ui/InputField";
import { Modal } from "@/components/ui/Modal";

const PERMISSION_GROUPS = [
  {
    name: "Dashboard",
    permissions: []
  },
  {
    name: "Quote",
    permissions: ["Quick Quote", "Saved Quotation"]
  },
  {
    name: "Ship",
    permissions: ["Export", "Domestic", "Import", "Third Party", "Quick Ship", "Shipment Manager", "Saved Shipment", "Setup Shipment", "Spot Rate Freight Quote"]
  },
  {
    name: "Print",
    permissions: ["Print Manifest", "Bulk Print"]
  },
  {
    name: "Track",
    permissions: ["Tracking History", "Watch Shipment", "Spot Rate Freight History"]
  },
  {
    name: "Product",
    permissions: ["Edit Product", "Edit Packaging"]
  },
  {
    name: "Invoice",
    permissions: ["View Invoice", "Pay Invoices"]
  },
  {
    name: "Manage",
    permissions: ["CSV Mapping", "Dashboard Preferences", "Integration", "Contact", "Change Password"]
  },
  {
    name: "Ticket",
    permissions: []
  }
];

export function RolesTab() {
  const [roles, setRoles] = useState<{ id: number; name: string }[]>([
    { id: 1, name: "Admin" },
    { id: 2, name: "Manager" },
    { id: 3, name: "User" }
  ]);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newRoleName, setNewRoleName] = useState("");
  // Simple state to hold checked permissions
  const [checkedPermissions, setCheckedPermissions] = useState<Record<string, boolean>>({});

  const handleAddRole = () => {
    if (!newRoleName.trim()) return;
    setRoles([...roles, { id: Date.now(), name: newRoleName }]);
    setNewRoleName("");
    setIsModalOpen(false);
    setCheckedPermissions({});
  };

  const handleDeleteRole = (id: number) => {
    setRoles(roles.filter(role => role.id !== id));
  };

  const handleToggleGroup = (groupName: string) => {
    const group = PERMISSION_GROUPS.find(g => g.name === groupName);
    if (!group) return;

    setCheckedPermissions(prev => {
      const nextState = !prev[groupName];
      const updates: Record<string, boolean> = { [groupName]: nextState };
      
      group.permissions.forEach(perm => {
        updates[`${groupName}_${perm}`] = nextState;
      });
      
      return { ...prev, ...updates };
    });
  };

  const handleToggleChild = (groupName: string, childName: string) => {
    const group = PERMISSION_GROUPS.find(g => g.name === groupName);
    if (!group) return;

    setCheckedPermissions(prev => {
      const childKey = `${groupName}_${childName}`;
      const nextChildState = !prev[childKey];
      
      const updates: Record<string, boolean> = { [childKey]: nextChildState };
      
      // Determine new parent state
      let allChecked = true;
      group.permissions.forEach(perm => {
        const k = `${groupName}_${perm}`;
        const isChecked = k === childKey ? nextChildState : !!prev[k];
        if (!isChecked) allChecked = false;
      });
      
      updates[groupName] = allChecked;
      
      return { ...prev, ...updates };
    });
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 space-y-10">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Roles</h2>
        <p className="text-gray-500">Define custom roles and permissions for your team.</p>
      </div>

      {/* Manage Roles */}
      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 shadow-sm mb-10">
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h3 className="text-lg font-bold text-gray-800 bg-[#1a2f4c] text-white px-4 py-2 rounded-md shadow-sm">
            Manage User Roles
          </h3>
          
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-[#081b4c] hover:bg-[#081b4c]/90 text-white font-semibold py-2.5 px-6 rounded-xl transition-colors shadow-sm uppercase tracking-wide flex-shrink-0"
          >
            ADD NEW USER ROLE
          </button>
        </div>

        <div className="bg-white rounded-md border border-gray-200 overflow-x-auto shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#1a2f4c] text-white">
                <th className="px-4 py-3 text-sm font-semibold">Role Name</th>
                <th className="px-4 py-3 text-sm font-semibold w-24 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {roles.map((role) => (
                <tr key={role.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-800 font-medium">
                    {role.name}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-center">
                    <button 
                      onClick={() => handleDeleteRole(role.id)}
                      className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors inline-flex"
                      title="Delete role"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {roles.length === 0 && (
                <tr>
                  <td colSpan={2} className="px-4 py-8 text-center text-gray-500 text-sm">
                    No roles found. Add a new role above.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Update Button */}
      <div className="flex justify-end pt-4 pb-12">
        <button className="bg-[#081b4c] hover:bg-[#081b4c]/90 text-white font-semibold py-3 px-10 rounded-xl transition-colors text-lg shadow-md uppercase tracking-wide">
          UPDATE
        </button>
      </div>

      {/* Add Role Modal */}
      <Modal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New User Role"
        maxWidthClass="max-w-5xl"
        footer={
          <>
            <button 
              onClick={() => setIsModalOpen(false)}
              className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-2.5 px-6 rounded-xl transition-colors shadow-sm"
            >
              Cancel
            </button>
            <button 
              onClick={handleAddRole}
              className="bg-[#081b4c] hover:bg-[#081b4c]/90 text-white font-semibold py-2.5 px-8 rounded-xl transition-colors shadow-sm"
            >
              Create Role
            </button>
          </>
        }
      >
        <div className="space-y-8">
          <div className="max-w-md">
            <InputField 
              label="Role Name" 
              placeholder="Enter role name" 
              value={newRoleName}
              onChange={(e) => setNewRoleName(e.target.value)}
            />
          </div>

          <div>
            <h4 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b border-gray-100">Permissions</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {PERMISSION_GROUPS.map((group) => (
                <div key={group.name} className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                  <label className="flex items-center gap-3 cursor-pointer group mb-3 w-fit">
                    <input 
                      type="checkbox"
                      checked={checkedPermissions[group.name] || false}
                      onChange={() => handleToggleGroup(group.name)}
                      className="w-5 h-5 text-[#081b4c] rounded border-gray-300 focus:ring-[#081b4c] cursor-pointer" 
                    />
                    <span className="font-bold text-gray-800 group-hover:text-[#081b4c] transition-colors">
                      {group.name}
                    </span>
                  </label>
                  
                  {group.permissions.length > 0 && (
                    <div className="ml-8 space-y-2.5 flex flex-col">
                      {group.permissions.map((perm) => {
                        const key = `${group.name}_${perm}`;
                        return (
                          <label key={key} className="flex items-center gap-3 cursor-pointer group w-fit">
                            <input 
                              type="checkbox"
                              checked={checkedPermissions[key] || false}
                              onChange={() => handleToggleChild(group.name, perm)}
                              className="w-4 h-4 text-[#081b4c] rounded border-gray-300 focus:ring-[#081b4c] cursor-pointer" 
                            />
                            <span className="text-sm font-medium text-gray-600 group-hover:text-gray-900 transition-colors">
                              {perm}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Modal>

    </div>
  );
}
