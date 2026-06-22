"use client";

import React, { useState } from "react";
import { Search, Plus, Package, Edit, Trash2, Check, X } from "lucide-react";
import { Pagination } from "@/components/common/Pagination";
import { SelectField } from "@/components/common/SelectField";
import { ConfirmationModal } from "@/components/common/ConfirmationModal";
import clsx from "clsx";

interface PackagingItem {
  id: number;
  boxName: string;
  weightOpt: string;
  weightRangeMin: string;
  weightRangeMax: string;
  packagingWeight: string;
  dimL: string;
  dimW: string;
  dimH: string;
  stockStatus: "In Stock" | "Low Stock" | "Out of Stock" | string;
  isNew?: boolean;
}

const initialData: PackagingItem[] = [
  { id: 1, boxName: "Small Box", weightOpt: "1.5", weightRangeMin: "0", weightRangeMax: "5", packagingWeight: "0.2", dimL: "20", dimW: "15", dimH: "10", stockStatus: "In Stock" },
  { id: 2, boxName: "Medium Box", weightOpt: "3.0", weightRangeMin: "5.1", weightRangeMax: "15", packagingWeight: "0.45", dimL: "40", dimW: "30", dimH: "20", stockStatus: "Low Stock" },
  { id: 3, boxName: "Large Box", weightOpt: "5.5", weightRangeMin: "15.1", weightRangeMax: "30", packagingWeight: "0.8", dimL: "60", dimW: "45", dimH: "40", stockStatus: "Out of Stock" },
  { id: 4, boxName: "Heavy Duty Crate", weightOpt: "12.0", weightRangeMin: "30.1", weightRangeMax: "100", packagingWeight: "2.5", dimL: "80", dimW: "60", dimH: "50", stockStatus: "In Stock" },
  { id: 5, boxName: "Document Mailer", weightOpt: "", weightRangeMin: "0", weightRangeMax: "1", packagingWeight: "0.05", dimL: "35", dimW: "25", dimH: "1", stockStatus: "In Stock" },
];

export default function EditPackagingPage() {
  const [items, setItems] = useState<PackagingItem[]>(initialData);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editDraft, setEditDraft] = useState<PackagingItem | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Stock": return "bg-green-100 text-green-700";
      case "Low Stock": return "bg-amber-100 text-amber-700";
      case "Out of Stock": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const handleEdit = (item: PackagingItem) => {
    setEditingId(item.id);
    setEditDraft({ ...item });
  };

  const handleCancel = () => {
    if (editDraft?.isNew) {
      setItems(items.filter(i => i.id !== editDraft.id));
    }
    setEditingId(null);
    setEditDraft(null);
  };

  const handleSave = () => {
    if (!editDraft) return;
    
    setItems(items.map(item => 
      item.id === editDraft.id ? { ...editDraft, isNew: false } : item
    ));
    setEditingId(null);
    setEditDraft(null);
  };

  const handleDeleteClick = (id: number) => {
    setDeleteId(id);
  };

  const executeDelete = () => {
    if (deleteId !== null) {
      setItems(items.filter(item => item.id !== deleteId));
      setDeleteId(null);
    }
  };

  const handleAddRow = () => {
    // Prevent adding a new row if we are currently editing one
    if (editingId !== null) {
      alert("Please save or cancel your current edits first.");
      return;
    }

    const newId = Date.now(); // Simple ID generation
    const newItem: PackagingItem = {
      id: newId,
      boxName: "",
      weightOpt: "",
      weightRangeMin: "",
      weightRangeMax: "",
      packagingWeight: "",
      dimL: "",
      dimW: "",
      dimH: "",
      stockStatus: "In Stock",
      isNew: true
    };

    setItems([...items, newItem]);
    setEditingId(newId);
    setEditDraft(newItem);
  };

  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white mb-2 tracking-tight">Edit Packaging</h1>
          <p className="text-blue-100 font-medium">Manage your shipping boxes and packaging materials.</p>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        {/* Toolbar */}
        <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search packaging by name..." 
              className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 transition-all"
            />
          </div>
        </div>

        {/* Table */}
        <div className={clsx("overflow-x-auto transition-all duration-300", editingId !== null ? "pb-40" : "")}>
          <table className="w-full text-left border-collapse min-w-[1100px]">
            <thead>
              <tr className="bg-[#081b4c] border-b border-[#081b4c]">
                <th className="py-4 px-4 text-sm font-bold text-white uppercase tracking-wider">Box Name</th>
                <th className="py-4 px-4 text-sm font-bold text-white uppercase tracking-wider">Weight (Optional)</th>
                <th className="py-4 px-4 text-sm font-bold text-white uppercase tracking-wider">Weight Range</th>
                <th className="py-4 px-4 text-sm font-bold text-white uppercase tracking-wider">Packaging Weight</th>
                <th className="py-4 px-4 text-sm font-bold text-white uppercase tracking-wider">Dimensions (Min 1cm)</th>
                <th className="py-4 px-4 text-sm font-bold text-white uppercase tracking-wider">Stock Status</th>
                <th className="py-4 px-4 text-sm font-bold text-white uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {items.map((item) => {
                const isEditing = editingId === item.id;
                
                return (
                  <tr key={item.id} className={clsx("hover:bg-gray-50/80 transition-colors group relative", isEditing ? "bg-gray-50/50 z-10" : "z-0")}>
                    
                    {/* Box Name */}
                    <td className="py-3 px-4 align-middle">
                      {isEditing ? (
                        <input 
                          type="text" 
                          className="w-full min-w-[120px] px-2 py-1.5 border border-red-500 rounded text-[15px] text-gray-600 focus:outline-none placeholder-gray-400"
                          value={editDraft?.boxName || ""}
                          onChange={(e) => setEditDraft({ ...editDraft!, boxName: e.target.value })}
                          autoFocus
                          placeholder="Enter N"
                        />
                      ) : (
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0">
                            <Package className="w-4 h-4 text-[#081b4c]" />
                          </div>
                          <span className="text-[15px] font-bold text-gray-900">{item.boxName}</span>
                        </div>
                      )}
                    </td>

                    {/* Weight Optional */}
                    <td className="py-3 px-4 align-middle">
                      {isEditing ? (
                        <div className="flex border border-gray-300 rounded overflow-hidden w-full min-w-[100px] bg-white">
                          <input 
                            type="text" 
                            className="w-full min-w-0 px-2 py-1.5 text-[15px] text-gray-600 focus:outline-none placeholder-gray-400"
                            value={editDraft?.weightOpt || ""}
                            onChange={(e) => setEditDraft({ ...editDraft!, weightOpt: e.target.value })}
                            placeholder="Unit"
                          />
                          <span className="bg-gray-100 text-[#081b4c] px-2 py-1.5 border-l border-gray-300 text-xs font-medium flex items-center">KG</span>
                        </div>
                      ) : (
                        <span className="text-[15px] text-gray-600 font-medium">{item.weightOpt ? `${item.weightOpt} kg` : "-"}</span>
                      )}
                    </td>

                    {/* Weight Range */}
                    <td className="py-3 px-4 align-middle">
                      {isEditing ? (
                        <div className="flex items-center gap-1.5">
                          <div className="flex border border-gray-300 rounded overflow-hidden w-16 bg-white">
                            <input 
                              type="text" 
                              className="w-full min-w-0 px-1.5 py-1.5 text-[15px] text-gray-600 text-center focus:outline-none"
                              value={editDraft?.weightRangeMin || ""}
                              onChange={(e) => setEditDraft({ ...editDraft!, weightRangeMin: e.target.value })}
                              placeholder="0"
                            />
                            <span className="bg-gray-100 text-[#081b4c] px-1.5 py-1.5 border-l border-gray-300 text-[10px] font-medium flex items-center">KG</span>
                          </div>
                          <div className="flex border border-gray-300 rounded overflow-hidden w-16 bg-white">
                            <input 
                              type="text" 
                              className="w-full min-w-0 px-1.5 py-1.5 text-[15px] text-gray-600 text-center focus:outline-none"
                              value={editDraft?.weightRangeMax || ""}
                              onChange={(e) => setEditDraft({ ...editDraft!, weightRangeMax: e.target.value })}
                              placeholder="0"
                            />
                            <span className="bg-gray-100 text-[#081b4c] px-1.5 py-1.5 border-l border-gray-300 text-[10px] font-medium flex items-center">KG</span>
                          </div>
                        </div>
                      ) : (
                        <span className="text-[15px] text-gray-600 font-medium">{item.weightRangeMin} - {item.weightRangeMax} kg</span>
                      )}
                    </td>

                    {/* Packaging Weight */}
                    <td className="py-3 px-4 align-middle">
                      {isEditing ? (
                        <div className="flex border border-gray-300 rounded overflow-hidden w-20 bg-white">
                          <input 
                            type="text" 
                            className="w-full min-w-0 px-2 py-1.5 text-[15px] text-gray-600 focus:outline-none placeholder-gray-400"
                            value={editDraft?.packagingWeight || ""}
                            onChange={(e) => setEditDraft({ ...editDraft!, packagingWeight: e.target.value })}
                            placeholder="0"
                          />
                          <span className="bg-gray-100 text-[#081b4c] px-1.5 py-1.5 border-l border-gray-300 text-[10px] font-medium flex items-center">KG</span>
                        </div>
                      ) : (
                        <span className="text-[15px] text-gray-600 font-medium">{item.packagingWeight} kg</span>
                      )}
                    </td>

                    {/* Dimensions */}
                    <td className="py-3 px-4 align-middle">
                      {isEditing ? (
                        <div className="flex border border-gray-300 rounded overflow-hidden bg-white min-w-[140px]">
                          <input 
                            type="text" 
                            className="w-10 min-w-0 px-1.5 py-1.5 text-[15px] text-center text-gray-600 border-r border-gray-300 focus:outline-none placeholder-gray-400"
                            value={editDraft?.dimL || ""}
                            onChange={(e) => setEditDraft({ ...editDraft!, dimL: e.target.value })}
                            placeholder="L"
                          />
                          <input 
                            type="text" 
                            className="w-10 min-w-0 px-1.5 py-1.5 text-[15px] text-center text-gray-600 border-r border-gray-300 focus:outline-none placeholder-gray-400"
                            value={editDraft?.dimW || ""}
                            onChange={(e) => setEditDraft({ ...editDraft!, dimW: e.target.value })}
                            placeholder="W"
                          />
                          <input 
                            type="text" 
                            className="w-10 min-w-0 px-1.5 py-1.5 text-[15px] text-center text-gray-600 focus:outline-none placeholder-gray-400"
                            value={editDraft?.dimH || ""}
                            onChange={(e) => setEditDraft({ ...editDraft!, dimH: e.target.value })}
                            placeholder="H"
                          />
                          <span className="bg-gray-100 text-[#081b4c] px-1.5 py-1.5 border-l border-gray-300 text-[10px] font-medium flex items-center">CM</span>
                        </div>
                      ) : (
                        <span className="text-[15px] text-gray-600 font-medium">{item.dimL} x {item.dimW} x {item.dimH} cm</span>
                      )}
                    </td>

                    {/* Stock Status */}
                    <td className="py-3 px-4 align-middle">
                      {isEditing ? (
                        <SelectField
                          containerClassName="min-w-[130px]"
                          className="!py-1.5 !rounded-md"
                          value={editDraft?.stockStatus || "In Stock"}
                          onChange={(val) => setEditDraft({ ...editDraft!, stockStatus: val })}
                          options={[
                            { value: "In Stock", label: "In Stock" },
                            { value: "Low Stock", label: "Low Stock" },
                            { value: "Out of Stock", label: "Out of Stock" }
                          ]}
                        />
                      ) : (
                        <span className={clsx("px-2.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider inline-block", getStatusColor(item.stockStatus))}>
                          {item.stockStatus}
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right align-middle">
                      <div className="flex items-center justify-end gap-1.5">
                        {isEditing ? (
                          <>
                            <button onClick={handleSave} className="p-1.5 text-white hover:bg-green-600 bg-green-500 rounded-lg transition-colors shadow-sm" title="Save">
                              <Check className="w-4 h-4" />
                            </button>
                            <button onClick={handleCancel} className="p-1.5 text-white hover:bg-gray-500 bg-gray-400 rounded-lg transition-colors shadow-sm" title="Cancel">
                              <X className="w-4 h-4" />
                            </button>
                          </>
                        ) : (
                          <>
                            <button onClick={() => handleEdit(item)} className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button onClick={() => handleDeleteClick(item.id)} className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                              <Trash2 className="w-4 h-4" />
                            </button>
                            {/* The green Plus button for adding new rows right from the table row as shown in user image */}
                            <button onClick={handleAddRow} className="p-1.5 text-white hover:bg-green-600 bg-green-500 rounded-full transition-colors shadow-sm ml-1" title="Add New Packaging">
                              <Plus className="w-4 h-4" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <Pagination 
          currentPage={1}
          totalPages={2}
          totalItems={items.length}
          startItem={1}
          endItem={items.length}
          itemName="packaging items"
        />
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={deleteId !== null}
        onClose={() => setDeleteId(null)}
        onConfirm={executeDelete}
        title="Delete Packaging"
        message="Are you sure you want to delete this packaging item? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
}
