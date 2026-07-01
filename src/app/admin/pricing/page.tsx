"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Search, Plus, Calculator, Map, Scale, DollarSign, Settings2, X, MoreHorizontal } from "lucide-react";

const pricingRules = [
  { id: "PRC-001", name: "Domestic Standard", type: "Zone-Based", baseRate: "$5.00", perKg: "$1.20", status: "Active", couriers: "USPS, FedEx" },
  { id: "PRC-002", name: "International Express", type: "Weight-Based", baseRate: "$25.00", perKg: "$5.50", status: "Active", couriers: "DHL, FedEx" },
  { id: "PRC-003", name: "Heavy Freight", type: "Custom", baseRate: "$150.00", perKg: "$0.80", status: "Active", couriers: "UPS" },
  { id: "PRC-004", name: "Local Promo 2026", type: "Flat Rate", baseRate: "$10.00", perKg: "N/A", status: "Disabled", couriers: "All" },
];

export default function AdminPricingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-1.5">
          <h1 className="text-3xl font-extrabold tracking-tight">Pricing & Rates</h1>
          <p className="text-muted-foreground">Configure shipping margins, zone rules, and base rates.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input type="text" placeholder="Search pricing rules..." className="pl-9 pr-4 py-2 bg-card border border-border/50 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary/50" />
          </div>
          <Button onClick={() => setIsModalOpen(true)} className="gap-2 bg-primary text-primary-foreground shadow-md hover:shadow-lg transition-shadow">
            <Plus className="h-4 w-4" /> Create Pricing Rule
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-6">
        <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-sm flex flex-col gap-3">
          <div className="p-3 rounded-xl bg-blue-500/10 text-blue-500 w-fit"><Map className="h-6 w-6" /></div>
          <div>
            <h4 className="text-lg font-bold">Zone Rates</h4>
            <p className="text-sm text-muted-foreground">Pricing based on origin/destination regions.</p>
          </div>
          <Button variant="outline" className="w-full mt-2">Manage Zones</Button>
        </div>
        <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-sm flex flex-col gap-3">
          <div className="p-3 rounded-xl bg-purple-500/10 text-purple-500 w-fit"><Scale className="h-6 w-6" /></div>
          <div>
            <h4 className="text-lg font-bold">Weight Rates</h4>
            <p className="text-sm text-muted-foreground">Tiered pricing for heavy shipments.</p>
          </div>
          <Button variant="outline" className="w-full mt-2">Manage Tiers</Button>
        </div>
        <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-sm flex flex-col gap-3">
          <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-500 w-fit"><DollarSign className="h-6 w-6" /></div>
          <div>
            <h4 className="text-lg font-bold">Platform Margin</h4>
            <p className="text-sm text-muted-foreground">Global markup on courier API rates.</p>
          </div>
          <Button variant="outline" className="w-full mt-2">Configure Markup</Button>
        </div>
      </div>

      <div className="rounded-2xl border border-border/50 bg-card/80 backdrop-blur-md shadow-sm overflow-hidden">
        <div className="p-4 border-b border-border/50 bg-muted/20 flex items-center gap-2">
          <Settings2 className="w-4 h-4 text-muted-foreground" />
          <h3 className="font-semibold text-sm">Active Pricing Rules</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/40 border-b border-border/50">
              <tr>
                <th className="px-6 py-4 font-semibold tracking-wider">Rule Name</th>
                <th className="px-6 py-4 font-semibold tracking-wider">Pricing Type</th>
                <th className="px-6 py-4 font-semibold tracking-wider">Base Rate</th>
                <th className="px-6 py-4 font-semibold tracking-wider">Per Kg Cost</th>
                <th className="px-6 py-4 font-semibold tracking-wider">Applied Couriers</th>
                <th className="px-6 py-4 font-semibold tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {pricingRules.map((rule) => (
                <tr key={rule.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg text-primary"><Calculator className="w-4 h-4" /></div>
                      <div className="flex flex-col">
                        <span className="font-semibold text-foreground text-base">{rule.name}</span>
                        <span className="text-muted-foreground text-xs">{rule.id}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded-full text-xs font-medium border bg-muted border-border text-muted-foreground">
                      {rule.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-bold text-lg">{rule.baseRate}</td>
                  <td className="px-6 py-4 font-medium text-muted-foreground">{rule.perKg}</td>
                  <td className="px-6 py-4 text-xs font-semibold text-muted-foreground">{rule.couriers}</td>
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
              <h2 className="text-xl font-bold">Create Pricing Rule</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-muted-foreground hover:text-foreground p-1 rounded-md hover:bg-muted"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Rule Name</label>
                <input type="text" placeholder="e.g. Peak Season Surcharge" className="w-full bg-muted/50 border border-border/50 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Pricing Model</label>
                <select className="w-full bg-muted/50 border border-border/50 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50">
                  <option>Zone-Based (Origin &rarr; Dest)</option>
                  <option>Weight-Based (Tiered)</option>
                  <option>Flat Rate</option>
                  <option>Percentage Markup</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Base Rate ($)</label>
                  <input type="number" placeholder="5.00" className="w-full bg-muted/50 border border-border/50 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Per Kg Cost ($)</label>
                  <input type="number" placeholder="1.20" className="w-full bg-muted/50 border border-border/50 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Apply to Couriers</label>
                <select multiple className="w-full bg-muted/50 border border-border/50 rounded-lg px-3 py-2 text-sm h-24 focus:outline-none focus:ring-1 focus:ring-primary/50">
                  <option>FedEx</option>
                  <option>DHL</option>
                  <option>UPS</option>
                  <option>USPS</option>
                </select>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 p-6 border-t border-border/50 bg-muted/10">
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button onClick={() => setIsModalOpen(false)}>Save Rule</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
