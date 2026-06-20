"use client";

import React, { useState } from 'react';

import { Search, Plus, Filter, Download, FileText, MoreHorizontal, ChevronDown } from "lucide-react";
import clsx from "clsx";
import { Pagination } from "@/components/common/Pagination";

const invoices = [
  { 
    id: "INV-2026-001", 
    invoiceDate: "18 Jun, 2026", 
    dueDate: "25 Jun, 2026",
    paymentDate: "18 Jun, 2026",
    shipment: "SHP-9021",
    net: 1033.33,
    vat: 206.67,
    total: 1240.00,
    amountPaid: 1240.00,
    status: "Paid" 
  },
  { 
    id: "INV-2026-002", 
    invoiceDate: "15 Jun, 2026", 
    dueDate: "22 Jun, 2026",
    paymentDate: "-",
    shipment: "SHP-8032",
    net: 708.75,
    vat: 141.75,
    total: 850.50,
    amountPaid: 0.00,
    status: "Pending" 
  },
  { 
    id: "INV-2026-003", 
    invoiceDate: "10 Jun, 2026", 
    dueDate: "17 Jun, 2026",
    paymentDate: "-",
    shipment: "SHP-7721",
    net: 2850.00,
    vat: 570.00,
    total: 3420.00,
    amountPaid: 0.00,
    status: "Overdue" 
  },
  { 
    id: "INV-2026-004", 
    invoiceDate: "05 Jun, 2026", 
    dueDate: "12 Jun, 2026",
    paymentDate: "06 Jun, 2026",
    shipment: "SHP-6610",
    net: 375.21,
    vat: 75.04,
    total: 450.25,
    amountPaid: 450.25,
    status: "Paid" 
  },
  { 
    id: "INV-2026-005", 
    invoiceDate: "01 Jun, 2026", 
    dueDate: "08 Jun, 2026",
    paymentDate: "02 Jun, 2026",
    shipment: "SHP-5509",
    net: 1750.00,
    vat: 350.00,
    total: 2100.00,
    amountPaid: 2100.00,
    status: "Paid" 
  },
];

export default function InvoicePage() {
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Paid": return "bg-green-100 text-green-700";
      case "Pending": return "bg-blue-100 text-blue-950";
      case "Overdue": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2 tracking-tight">Invoices</h1>
          <p className="text-gray-500 font-medium">Manage and track all your billing invoices.</p>
        </div>
  
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Toolbar */}
        <div className="p-5 border-b border-gray-100 flex flex-col lg:flex-row justify-between items-center gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
            {/* Date Filters */}
            <div className="flex flex-col sm:flex-row items-center gap-2 p-1.5 rounded-xl border border-gray-200 bg-gray-50/50 w-full sm:w-auto">
              <div className="flex items-center justify-between sm:justify-start gap-2 px-2 w-full sm:w-auto">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">From</span>
                <input 
                  type="date" 
                  className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-[#0b215f] focus:ring-1 focus:ring-[#0b215f] w-[130px] bg-white"
                />
              </div>
              <div className="w-full sm:w-px h-px sm:h-6 bg-gray-300"></div>
              <div className="flex items-center justify-between sm:justify-start gap-2 px-2 w-full sm:w-auto">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">To</span>
                <input 
                  type="date" 
                  className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-[#0b215f] focus:ring-1 focus:ring-[#0b215f] w-[130px] bg-white"
                />
              </div>
            </div>

            {/* Search */}
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search invoices..." 
                className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 transition-all"
              />
            </div>
          </div>
          <div className="flex items-center gap-2 w-full lg:w-auto mt-2 lg:mt-0">
            <select className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 cursor-pointer w-full sm:w-auto appearance-none">
              <option>All Status</option>
              <option>Paid</option>
              <option>Pending</option>
              <option>Overdue</option>
            </select>
            <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 font-medium text-sm transition-colors w-full sm:w-auto">
              <Filter className="w-4 h-4 text-gray-500" />
              Filter
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-[#0b215f] border-b border-[#0b215f]">
                <th className="py-4 px-4 text-[12px] font-bold text-white uppercase tracking-wider whitespace-nowrap">Invoice #</th>
                <th className="py-4 px-4 text-[12px] font-bold text-white uppercase tracking-wider whitespace-nowrap">Invoice Date</th>
                <th className="py-4 px-4 text-[12px] font-bold text-white uppercase tracking-wider whitespace-nowrap">Due Date</th>
                <th className="py-4 px-4 text-[12px] font-bold text-white uppercase tracking-wider whitespace-nowrap">Payment Date</th>
                <th className="py-4 px-4 text-[12px] font-bold text-white uppercase tracking-wider whitespace-nowrap">Shipment</th>
                <th className="py-4 px-4 text-[12px] font-bold text-white uppercase tracking-wider text-right whitespace-nowrap">Net</th>
                <th className="py-4 px-4 text-[12px] font-bold text-white uppercase tracking-wider text-right whitespace-nowrap">VAT</th>
                <th className="py-4 px-4 text-[12px] font-bold text-white uppercase tracking-wider text-right whitespace-nowrap">Total</th>
                <th className="py-4 px-4 text-[12px] font-bold text-white uppercase tracking-wider text-right whitespace-nowrap">Amount Paid</th>
                <th className="py-4 px-4 text-[12px] font-bold text-white uppercase tracking-wider whitespace-nowrap">Status</th>
                <th className="py-4 px-4 text-[12px] font-bold text-white uppercase tracking-wider text-right whitespace-nowrap">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-gray-50/80 transition-colors group">
                  <td className="py-4 px-4 text-sm font-bold text-gray-900 whitespace-nowrap">{invoice.id}</td>
                  <td className="py-4 px-4 text-sm text-gray-600 whitespace-nowrap">{invoice.invoiceDate}</td>
                  <td className="py-4 px-4 text-sm text-gray-600 whitespace-nowrap">{invoice.dueDate}</td>
                  <td className="py-4 px-4 text-sm text-gray-600 whitespace-nowrap">{invoice.paymentDate}</td>
                  <td className="py-4 px-4 text-sm font-medium text-blue-600 whitespace-nowrap hover:underline cursor-pointer">{invoice.shipment}</td>
                  <td className="py-4 px-4 text-sm font-medium text-gray-900 text-right whitespace-nowrap">£{invoice.net.toFixed(2)}</td>
                  <td className="py-4 px-4 text-sm font-medium text-gray-900 text-right whitespace-nowrap">£{invoice.vat.toFixed(2)}</td>
                  <td className="py-4 px-4 text-sm font-black text-[#0b215f] text-right whitespace-nowrap">£{invoice.total.toFixed(2)}</td>
                  <td className="py-4 px-4 text-sm font-bold text-green-700 text-right whitespace-nowrap">£{invoice.amountPaid.toFixed(2)}</td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    <span className={clsx("px-2.5 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider", getStatusColor(invoice.status))}>
                      {invoice.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => alert(`Viewing details for ${invoice.id}...`)}
                        className="text-xs font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg transition-colors inline-flex items-center gap-1.5"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        View
                      </button>

                      <div className="relative inline-block">
                        <button 
                          onClick={() => setOpenDropdownId(openDropdownId === invoice.id ? null : invoice.id)}
                          className="text-xs font-bold text-white bg-[#0b215f] hover:bg-blue-950 px-3 py-1.5 rounded-lg transition-colors shadow-sm inline-flex items-center gap-1.5"
                        >
                          <Download className="w-3.5 h-3.5" />
                          Download
                          <ChevronDown className={clsx("w-3 h-3 opacity-70 transition-transform", openDropdownId === invoice.id && "rotate-180")} />
                        </button>
                        <div className={clsx(
                          "absolute right-0 top-[calc(100%+0.25rem)] w-32 bg-white rounded-xl shadow-xl border border-gray-100 transition-all z-50 flex flex-col overflow-hidden",
                          openDropdownId === invoice.id ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"
                        )}>
                          <button 
                            onClick={() => {
                              alert(`Downloading PDF for ${invoice.id}...`);
                              setOpenDropdownId(null);
                            }}
                            className="px-4 py-2 text-xs font-bold text-gray-700 hover:bg-blue-50 hover:text-[#0b215f] text-left w-full transition-colors"
                          >
                            PDF Document
                          </button>
                          <button 
                            onClick={() => {
                              alert(`Downloading CSV for ${invoice.id}...`);
                              setOpenDropdownId(null);
                            }}
                            className="px-4 py-2 text-xs font-bold text-gray-700 hover:bg-blue-50 hover:text-[#0b215f] text-left w-full transition-colors border-t border-gray-50"
                          >
                            CSV File
                          </button>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <Pagination 
          currentPage={1}
          totalPages={3}
          totalItems={42}
          startItem={1}
          endItem={5}
          itemName="invoices"
        />
      </div>
    </div>
  );
}
