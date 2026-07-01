"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Search, Plus, Upload, Filter, Package, Truck, Calendar, MapPin, MoreHorizontal, X, FileText } from "lucide-react";

const shipments = [
  { id: "SHP-10928", customer: "Acme Corp", origin: "New York, USA", destination: "London, UK", courier: "FedEx", status: "In Transit", date: "Oct 24, 2026" },
  { id: "SHP-10927", customer: "TechNova", origin: "San Francisco, USA", destination: "Berlin, DE", courier: "DHL", status: "Pending", date: "Oct 24, 2026" },
  { id: "SHP-10926", customer: "John Smith", origin: "Miami, USA", destination: "Toronto, CA", courier: "UPS", status: "Delivered", date: "Oct 23, 2026" },
  { id: "SHP-10925", customer: "Global Trade", origin: "Seattle, USA", destination: "Sydney, AU", courier: "Aramex", status: "Failed", date: "Oct 22, 2026" },
];

export default function AdminShipmentsPage() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-1.5">
          <h1 className="text-3xl font-extrabold tracking-tight">Shipment Management</h1>
          <p className="text-muted-foreground">Manage global shipments, create labels, and track deliveries.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input type="text" placeholder="Tracking Number..." className="pl-9 pr-4 py-2 bg-card border border-border/50 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary/50" />
          </div>
          <Button variant="outline" className="gap-2 bg-background/50 backdrop-blur-sm">
            <Upload className="h-4 w-4" /> Bulk CSV
          </Button>
          <Button onClick={() => setIsCreateOpen(true)} className="gap-2 bg-primary text-primary-foreground shadow-md hover:shadow-lg transition-shadow">
            <Plus className="h-4 w-4" /> Create Shipment
          </Button>
        </div>
      </div>

      <div className="rounded-2xl border border-border/50 bg-card/80 backdrop-blur-md shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/40 border-b border-border/50">
              <tr>
                <th className="px-6 py-4 font-semibold tracking-wider">Tracking #</th>
                <th className="px-6 py-4 font-semibold tracking-wider">Customer</th>
                <th className="px-6 py-4 font-semibold tracking-wider">Route (Orig &rarr; Dest)</th>
                <th className="px-6 py-4 font-semibold tracking-wider">Courier</th>
                <th className="px-6 py-4 font-semibold tracking-wider">Status</th>
                <th className="px-6 py-4 font-semibold tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {shipments.map((shipment) => (
                <tr key={shipment.id} className="hover:bg-muted/30 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg text-primary"><Package className="w-4 h-4" /></div>
                      <div className="flex flex-col">
                        <span className="font-bold text-foreground group-hover:text-primary transition-colors cursor-pointer">{shipment.id}</span>
                        <span className="text-muted-foreground text-xs flex items-center gap-1 mt-0.5"><Calendar className="w-3 h-3" /> {shipment.date}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium">{shipment.customer}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1.5"><MapPin className="w-3 h-3 text-blue-500" /> {shipment.origin}</span>
                      <span className="flex items-center gap-1.5"><MapPin className="w-3 h-3 text-emerald-500" /> {shipment.destination}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 bg-muted rounded-md text-xs font-semibold border border-border/50 flex items-center gap-1.5 w-fit">
                      <Truck className="w-3 h-3" /> {shipment.courier}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${
                      shipment.status === 'Delivered' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600' :
                      shipment.status === 'In Transit' ? 'bg-blue-500/10 border-blue-500/20 text-blue-600' :
                      shipment.status === 'Pending' ? 'bg-amber-500/10 border-amber-500/20 text-amber-600' :
                      'bg-destructive/10 border-destructive/20 text-destructive'
                    }`}>
                      {shipment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end items-center gap-2">
                      <Button variant="outline" size="sm" className="gap-2 text-xs">
                        <FileText className="h-3.5 w-3.5" /> Label
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

      {isCreateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-card border border-border/50 rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between p-6 border-b border-border/50 shrink-0">
              <h2 className="text-xl font-bold">Create Single Shipment</h2>
              <button onClick={() => setIsCreateOpen(false)} className="text-muted-foreground hover:text-foreground p-1 rounded-md hover:bg-muted"><X className="w-5 h-5" /></button>
            </div>
            
            <div className="p-6 space-y-6 overflow-y-auto custom-scrollbar flex-1">
              {/* Sender Details */}
              <div className="space-y-4">
                <h3 className="font-semibold border-b border-border/50 pb-2 flex items-center gap-2"><MapPin className="w-4 h-4 text-blue-500" /> Sender Information (Origin)</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Sender Name</label>
                    <input type="text" className="w-full bg-muted/50 border border-border/50 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-primary/50 outline-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Sender Phone</label>
                    <input type="text" className="w-full bg-muted/50 border border-border/50 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-primary/50 outline-none" />
                  </div>
                  <div className="col-span-2 space-y-2">
                    <label className="text-sm font-medium">Origin Address</label>
                    <textarea rows={2} className="w-full bg-muted/50 border border-border/50 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-primary/50 outline-none"></textarea>
                  </div>
                </div>
              </div>

              {/* Recipient Details */}
              <div className="space-y-4">
                <h3 className="font-semibold border-b border-border/50 pb-2 flex items-center gap-2"><MapPin className="w-4 h-4 text-emerald-500" /> Recipient Information (Destination)</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Recipient Name</label>
                    <input type="text" className="w-full bg-muted/50 border border-border/50 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-primary/50 outline-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Recipient Phone</label>
                    <input type="text" className="w-full bg-muted/50 border border-border/50 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-primary/50 outline-none" />
                  </div>
                  <div className="col-span-2 space-y-2">
                    <label className="text-sm font-medium">Destination Address</label>
                    <textarea rows={2} className="w-full bg-muted/50 border border-border/50 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-primary/50 outline-none"></textarea>
                  </div>
                </div>
              </div>

              {/* Package Details */}
              <div className="space-y-4">
                <h3 className="font-semibold border-b border-border/50 pb-2 flex items-center gap-2"><Package className="w-4 h-4 text-purple-500" /> Package & Courier</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Weight (kg)</label>
                    <input type="number" className="w-full bg-muted/50 border border-border/50 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-primary/50 outline-none" />
                  </div>
                  <div className="col-span-2 space-y-2">
                    <label className="text-sm font-medium">Select Courier</label>
                    <select className="w-full bg-muted/50 border border-border/50 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-primary/50 outline-none">
                      <option>FedEx - Express (Rate: $45.00)</option>
                      <option>DHL - Global (Rate: $38.50)</option>
                      <option>UPS - Standard (Rate: $32.00)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-6 border-t border-border/50 bg-muted/10 shrink-0">
              <span className="font-bold text-lg">Total Rate: <span className="text-primary">$45.00</span></span>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setIsCreateOpen(false)}>Cancel</Button>
                <Button onClick={() => setIsCreateOpen(false)} className="gap-2"><Truck className="w-4 h-4" /> Generate Label</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
