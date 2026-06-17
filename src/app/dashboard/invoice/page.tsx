import { Search, Plus, Filter, Download, FileText, MoreHorizontal } from "lucide-react";
import clsx from "clsx";
import { Pagination } from "@/components/common/Pagination";

const invoices = [
  { id: "INV-2026-001", date: "18 Jun, 2026", client: "Acme Corporation", clientEmail: "billing@acmecorp.com", amount: "$1,240.00", status: "Paid" },
  { id: "INV-2026-002", date: "15 Jun, 2026", client: "TechFlow Ltd", clientEmail: "finance@techflow.co.uk", amount: "$850.50", status: "Pending" },
  { id: "INV-2026-003", date: "10 Jun, 2026", client: "Global Industries", clientEmail: "accounts@globalind.com", amount: "$3,420.00", status: "Overdue" },
  { id: "INV-2026-004", date: "05 Jun, 2026", client: "Maple Retail", clientEmail: "payables@mapleretail.ca", amount: "$450.25", status: "Paid" },
  { id: "INV-2026-005", date: "01 Jun, 2026", client: "Oceanic Co.", clientEmail: "invoice@oceanic.au", amount: "$2,100.00", status: "Paid" },
];

export default function InvoicePage() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Paid": return "bg-green-100 text-green-700";
      case "Pending": return "bg-orange-100 text-orange-700";
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
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 font-bold text-sm transition-colors w-full sm:w-auto shadow-sm">
            <Download className="w-4 h-4" />
            Export
          </button>
          <button className="bg-[#E8500A] hover:bg-orange-700 text-white px-5 py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors shadow-sm w-full sm:w-auto">
            <Plus className="w-5 h-5" />
            New Invoice
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Toolbar */}
        <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search by invoice ID or client..." 
              className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
            />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select className="px-4 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 cursor-pointer w-full sm:w-auto appearance-none">
              <option>All Status</option>
              <option>Paid</option>
              <option>Pending</option>
              <option>Overdue</option>
            </select>
            <button className="flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 font-medium text-sm transition-colors w-full sm:w-auto">
              <Filter className="w-4 h-4 text-gray-500" />
              Filter
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Invoice ID</th>
                <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Client</th>
                <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-gray-50/80 transition-colors group">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-orange-50 border border-orange-100 flex items-center justify-center flex-shrink-0">
                        <FileText className="w-5 h-5 text-[#E8500A]" />
                      </div>
                      <span className="text-sm font-bold text-gray-900">{invoice.id}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-500 font-medium">{invoice.date}</td>
                  <td className="py-4 px-6">
                    <div>
                      <p className="text-sm font-bold text-gray-900">{invoice.client}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{invoice.clientEmail}</p>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm font-black text-gray-900">{invoice.amount}</td>
                  <td className="py-4 px-6">
                    <span className={clsx("px-3 py-1.5 rounded-full text-xs font-bold", getStatusColor(invoice.status))}>
                      {invoice.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="text-sm font-bold text-[#E8500A] hover:text-orange-700 px-3 py-1.5 rounded-lg hover:bg-orange-50 transition-colors">
                        View
                      </button>
                      <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                        <MoreHorizontal className="w-5 h-5" />
                      </button>
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
