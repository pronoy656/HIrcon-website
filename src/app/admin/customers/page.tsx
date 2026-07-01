"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Search, Plus, Building2, User, Phone, Mail, MoreHorizontal, X } from "lucide-react";

const customers = [
  { id: "CUST-001", type: "Business", name: "Acme Corp", contact: "John Smith", email: "contact@acme.com", shipments: 1245 },
  { id: "CUST-002", type: "Individual", name: "Jane Doe", contact: "Jane Doe", email: "jane@example.com", shipments: 12 },
  { id: "CUST-003", type: "Business", name: "TechNova", contact: "Sarah Williams", email: "sarah@technova.io", shipments: 843 },
  { id: "CUST-004", type: "Individual", name: "Mike Brown", contact: "Mike Brown", email: "mike@example.com", shipments: 5 },
];

export default function AdminCustomersPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-1.5">
          <h1 className="text-3xl font-extrabold tracking-tight">Customers</h1>
          <p className="text-muted-foreground">Manage B2B and B2C shipping clients and accounts.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input type="text" placeholder="Search customers..." className="pl-9 pr-4 py-2 bg-card border border-border/50 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary/50" />
          </div>
          <Button onClick={() => setIsModalOpen(true)} className="gap-2 bg-primary text-primary-foreground shadow-md hover:shadow-lg transition-shadow">
            <Plus className="h-4 w-4" /> Add Customer
          </Button>
        </div>
      </div>

      <div className="rounded-2xl border border-border/50 bg-card/80 backdrop-blur-md shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/40 border-b border-border/50">
              <tr>
                <th className="px-6 py-4 font-semibold tracking-wider">Customer Name</th>
                <th className="px-6 py-4 font-semibold tracking-wider">Type</th>
                <th className="px-6 py-4 font-semibold tracking-wider">Contact Info</th>
                <th className="px-6 py-4 font-semibold tracking-wider">Total Shipments</th>
                <th className="px-6 py-4 font-semibold tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {customers.map((cust) => (
                <tr key={cust.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-xl text-white ${cust.type === 'Business' ? 'bg-blue-500' : 'bg-emerald-500'}`}>
                        {cust.type === 'Business' ? <Building2 className="w-4 h-4" /> : <User className="w-4 h-4" />}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-semibold text-foreground text-base">{cust.name}</span>
                        <span className="text-muted-foreground text-xs">{cust.id}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${cust.type === 'Business' ? 'bg-blue-500/10 border-blue-500/20 text-blue-600' : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600'}`}>
                      {cust.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">
                    <div className="flex flex-col gap-1">
                      <span className="flex items-center gap-1.5 text-xs"><Mail className="w-3.5 h-3.5" /> {cust.email}</span>
                      <span className="flex items-center gap-1.5 text-xs"><Phone className="w-3.5 h-3.5" /> {cust.contact}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-bold text-lg">{cust.shipments}</td>
                  <td className="px-6 py-4 text-right">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
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
              <h2 className="text-xl font-bold">Add New Customer</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-muted-foreground hover:text-foreground p-1 rounded-md hover:bg-muted"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Customer Type</label>
                <select className="w-full bg-muted/50 border border-border/50 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50">
                  <option>Business (B2B)</option>
                  <option>Individual (B2C)</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Full Name / Company Name</label>
                <input type="text" placeholder="e.g. Acme Corp" className="w-full bg-muted/50 border border-border/50 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email Address</label>
                <input type="email" placeholder="contact@company.com" className="w-full bg-muted/50 border border-border/50 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Phone Number</label>
                <input type="tel" placeholder="+1 (555) 000-0000" className="w-full bg-muted/50 border border-border/50 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50" />
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 p-6 border-t border-border/50 bg-muted/10">
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button onClick={() => setIsModalOpen(false)}>Save Customer</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
