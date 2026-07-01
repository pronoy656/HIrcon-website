"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Search, FileText, Download, CheckCircle, ArrowUpRight, ArrowDownLeft, Filter, CreditCard, MoreHorizontal, X } from "lucide-react";

const invoices = [
  { id: "INV-2026-001", customer: "Acme Corp", amount: "$1,245.00", date: "Oct 24, 2026", status: "Paid", type: "Incoming" },
  { id: "INV-2026-002", customer: "FedEx API Payout", amount: "$8,500.00", date: "Oct 23, 2026", status: "Pending", type: "Outgoing" },
  { id: "INV-2026-003", customer: "TechNova", amount: "$450.50", date: "Oct 21, 2026", status: "Paid", type: "Incoming" },
  { id: "INV-2026-004", customer: "DHL API Payout", amount: "$2,100.00", date: "Oct 20, 2026", status: "Failed", type: "Outgoing" },
];

export default function AdminBillingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-1.5">
          <h1 className="text-3xl font-extrabold tracking-tight">Billing & Invoices</h1>
          <p className="text-muted-foreground">Manage customer payments, courier payouts, and invoices.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input type="text" placeholder="Search invoices..." className="pl-9 pr-4 py-2 bg-card border border-border/50 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary/50" />
          </div>
          <Button variant="outline" className="gap-2 bg-background/50 backdrop-blur-sm">
            <Filter className="h-4 w-4" /> Filter
          </Button>
          <Button onClick={() => setIsModalOpen(true)} className="gap-2 bg-primary text-primary-foreground shadow-md hover:shadow-lg transition-shadow">
            <FileText className="h-4 w-4" /> Generate Invoice
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-6">
        <div className="rounded-2xl border border-border/50 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 p-6 shadow-sm border-emerald-500/20">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">Total Receivables</p>
              <h4 className="text-3xl font-bold mt-1 text-emerald-700 dark:text-emerald-300">$45,230.00</h4>
            </div>
            <div className="p-3 bg-emerald-500/20 rounded-xl text-emerald-600"><ArrowDownLeft className="h-6 w-6" /></div>
          </div>
        </div>
        <div className="rounded-2xl border border-border/50 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 p-6 shadow-sm border-blue-500/20">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Total Payables (Couriers)</p>
              <h4 className="text-3xl font-bold mt-1 text-blue-700 dark:text-blue-300">$12,450.00</h4>
            </div>
            <div className="p-3 bg-blue-500/20 rounded-xl text-blue-600"><ArrowUpRight className="h-6 w-6" /></div>
          </div>
        </div>
        <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Pending Payments</p>
              <h4 className="text-3xl font-bold mt-1">24</h4>
            </div>
            <div className="p-3 bg-amber-500/10 rounded-xl text-amber-500"><CreditCard className="h-6 w-6" /></div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-border/50 bg-card/80 backdrop-blur-md shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/40 border-b border-border/50">
              <tr>
                <th className="px-6 py-4 font-semibold tracking-wider">Invoice ID</th>
                <th className="px-6 py-4 font-semibold tracking-wider">Entity (Customer/Courier)</th>
                <th className="px-6 py-4 font-semibold tracking-wider">Amount</th>
                <th className="px-6 py-4 font-semibold tracking-wider">Date</th>
                <th className="px-6 py-4 font-semibold tracking-wider">Status</th>
                <th className="px-6 py-4 font-semibold tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${invoice.type === 'Incoming' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-blue-500/10 text-blue-500'}`}>
                        {invoice.type === 'Incoming' ? <ArrowDownLeft className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                      </div>
                      <span className="font-semibold text-foreground text-base">{invoice.id}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium">{invoice.customer}</td>
                  <td className="px-6 py-4 font-bold text-lg">{invoice.amount}</td>
                  <td className="px-6 py-4 text-muted-foreground">{invoice.date}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${
                      invoice.status === 'Paid' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600' :
                      invoice.status === 'Pending' ? 'bg-amber-500/10 border-amber-500/20 text-amber-600' :
                      'bg-destructive/10 border-destructive/20 text-destructive'
                    }`}>
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end items-center gap-2">
                      <Button variant="outline" size="sm" className="gap-2 text-xs">
                        <Download className="h-3.5 w-3.5" /> PDF
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-card border border-border/50 rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-6 border-b border-border/50">
              <h2 className="text-xl font-bold">Generate Invoice</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-muted-foreground hover:text-foreground p-1 rounded-md hover:bg-muted"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Customer</label>
                <select className="w-full bg-muted/50 border border-border/50 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50">
                  <option>Acme Corp</option>
                  <option>TechNova</option>
                  <option>John Smith</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Amount ($)</label>
                <input type="number" placeholder="100.00" className="w-full bg-muted/50 border border-border/50 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Due Date</label>
                <input type="date" className="w-full bg-muted/50 border border-border/50 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Notes</label>
                <textarea rows={3} placeholder="Monthly shipping charges..." className="w-full bg-muted/50 border border-border/50 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50"></textarea>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 p-6 border-t border-border/50 bg-muted/10">
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button onClick={() => setIsModalOpen(false)}>Create Invoice</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
