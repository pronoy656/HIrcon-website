"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Search, Globe, ShieldCheck, CreditCard, Power, KeyRound, CheckCircle2, AlertCircle } from "lucide-react";

const couriers = [
  { id: "C-01", name: "FedEx", logo: "FE", status: "Active", api: "Connected", priority: 1, countries: "190+", type: "Express" },
  { id: "C-02", name: "DHL", logo: "DH", status: "Active", api: "Connected", priority: 2, countries: "220+", type: "Global" },
  { id: "C-03", name: "UPS", logo: "UP", status: "Active", api: "Warning", priority: 3, countries: "200+", type: "Freight" },
  { id: "C-04", name: "Aramex", logo: "AR", status: "Disabled", api: "Disconnected", priority: 4, countries: "Middle East & Global", type: "Standard" },
  { id: "C-05", name: "USPS", logo: "US", status: "Active", api: "Connected", priority: 5, countries: "USA & Intl", type: "Postal" },
  { id: "C-06", name: "BlueDart", logo: "BD", status: "Disabled", api: "Disconnected", priority: 6, countries: "India Region", type: "Domestic" },
];

export default function AdminCouriersPage() {
  const [isCredsOpen, setIsCredsOpen] = useState(false);
  const [selectedCourier, setSelectedCourier] = useState<string | null>(null);

  const openCreds = (name: string) => {
    setSelectedCourier(name);
    setIsCredsOpen(true);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-1.5">
          <h1 className="text-3xl font-extrabold tracking-tight">Courier Partners</h1>
          <p className="text-muted-foreground">Manage API connections, routing priorities, and global delivery rates.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input type="text" placeholder="Search couriers..." className="pl-9 pr-4 py-2 bg-card border border-border/50 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary/50" />
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <div className="rounded-2xl border border-border/50 bg-card p-4 shadow-sm flex items-center gap-4">
          <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-500"><ShieldCheck className="h-6 w-6" /></div>
          <div><p className="text-sm font-medium text-muted-foreground">Active APIs</p><h4 className="text-2xl font-bold">4 / 6</h4></div>
        </div>
        <div className="rounded-2xl border border-border/50 bg-card p-4 shadow-sm flex items-center gap-4">
          <div className="p-3 rounded-xl bg-blue-500/10 text-blue-500"><Globe className="h-6 w-6" /></div>
          <div><p className="text-sm font-medium text-muted-foreground">Countries Reach</p><h4 className="text-2xl font-bold">220+</h4></div>
        </div>
      </div>

      <div className="rounded-2xl border border-border/50 bg-card/80 backdrop-blur-md shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/40 border-b border-border/50">
              <tr>
                <th className="px-6 py-4 font-semibold tracking-wider">Courier Partner</th>
                <th className="px-6 py-4 font-semibold tracking-wider">Coverage</th>
                <th className="px-6 py-4 font-semibold tracking-wider">Routing Priority</th>
                <th className="px-6 py-4 font-semibold tracking-wider">API Status</th>
                <th className="px-6 py-4 font-semibold tracking-wider">Service State</th>
                <th className="px-6 py-4 font-semibold tracking-wider text-right">Settings</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {couriers.map((courier) => (
                <tr key={courier.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary font-bold flex items-center justify-center">
                        {courier.logo}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-semibold text-foreground text-base">{courier.name}</span>
                        <span className="text-muted-foreground text-xs">{courier.type}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground font-medium flex items-center gap-1.5 mt-2">
                    <Globe className="w-4 h-4" /> {courier.countries}
                  </td>
                  <td className="px-6 py-4 font-bold text-lg text-primary text-center">
                    #{courier.priority}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5">
                      {courier.api === 'Connected' && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                      {courier.api === 'Warning' && <AlertCircle className="w-4 h-4 text-amber-500" />}
                      {courier.api === 'Disconnected' && <AlertCircle className="w-4 h-4 text-destructive" />}
                      <span className="font-medium text-muted-foreground">{courier.api}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button className={`px-3 py-1 text-xs font-semibold rounded-full border transition-colors ${
                      courier.status === 'Active' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 hover:bg-emerald-500/20' 
                      : 'bg-muted border-border text-muted-foreground hover:bg-muted-foreground/10'
                    }`}>
                      <span className="flex items-center gap-1"><Power className="w-3 h-3" /> {courier.status}</span>
                    </button>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end items-center gap-2">
                      <Button onClick={() => openCreds(courier.name)} variant="outline" size="sm" className="gap-2 text-xs">
                        <KeyRound className="h-3.5 w-3.5" /> API Keys
                      </Button>
                      <Button variant="ghost" size="sm" className="gap-2 text-xs text-muted-foreground">
                        <CreditCard className="h-3.5 w-3.5" /> Rates
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isCredsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-card border border-border/50 rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-6 border-b border-border/50">
              <h2 className="text-xl font-bold">{selectedCourier} API Credentials</h2>
              <button onClick={() => setIsCredsOpen(false)} className="text-muted-foreground hover:text-foreground p-1 rounded-md hover:bg-muted">✕</button>
            </div>
            <div className="p-6 space-y-4">
              <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg flex gap-3 text-sm text-blue-700 dark:text-blue-300">
                <ShieldCheck className="w-5 h-5 shrink-0" />
                <p>These credentials are used to generate shipping labels, fetch live tracking, and calculate checkout rates securely via {selectedCourier}'s REST API.</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Environment</label>
                <select className="w-full bg-muted/50 border border-border/50 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50">
                  <option>Production (Live)</option>
                  <option>Sandbox (Test)</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Account Number</label>
                <input type="text" placeholder="XXXXXXXXX" className="w-full bg-muted/50 border border-border/50 rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:ring-1 focus:ring-primary/50" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">API Key / Client ID</label>
                <input type="text" placeholder="••••••••••••••••••••••••••••••••" className="w-full bg-muted/50 border border-border/50 rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:ring-1 focus:ring-primary/50" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">API Secret / Password</label>
                <input type="password" placeholder="••••••••••••••••••••••••••••••••" className="w-full bg-muted/50 border border-border/50 rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:ring-1 focus:ring-primary/50" />
              </div>
            </div>
            <div className="flex items-center justify-between p-6 border-t border-border/50 bg-muted/10">
              <Button variant="ghost" className="text-destructive hover:bg-destructive/10 hover:text-destructive">Test Connection</Button>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setIsCredsOpen(false)}>Cancel</Button>
                <Button onClick={() => setIsCredsOpen(false)}>Save Settings</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
