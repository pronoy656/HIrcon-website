import { Button } from "@/components/ui/button";
import { Settings, Save, Globe, Lock, BellRing } from "lucide-react";

export default function AdminSettingsPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out max-w-4xl">
      <div className="flex flex-col gap-1.5">
        <h1 className="text-3xl font-extrabold tracking-tight">Platform Settings</h1>
        <p className="text-muted-foreground">
          Configure global platform preferences and system toggles.
        </p>
      </div>

      <div className="grid gap-6">
        {/* General Settings */}
        <div className="rounded-2xl border border-border/50 bg-card/80 backdrop-blur-md shadow-sm overflow-hidden">
          <div className="p-6 border-b border-border/50 bg-muted/20 flex items-center gap-3">
            <Globe className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-lg">General Settings</h3>
          </div>
          <div className="p-6 space-y-6">
            <div className="grid sm:grid-cols-3 gap-4 items-center">
              <label className="text-sm font-medium">Platform Name</label>
              <input type="text" defaultValue="ExShip" className="sm:col-span-2 w-full bg-muted/50 border border-border/50 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50" />
            </div>
            <div className="grid sm:grid-cols-3 gap-4 items-center">
              <label className="text-sm font-medium">Support Email</label>
              <input type="email" defaultValue="support@exship.com" className="sm:col-span-2 w-full bg-muted/50 border border-border/50 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50" />
            </div>
          </div>
        </div>

        {/* Security & Access */}
        <div className="rounded-2xl border border-border/50 bg-card/80 backdrop-blur-md shadow-sm overflow-hidden">
          <div className="p-6 border-b border-border/50 bg-muted/20 flex items-center gap-3">
            <Lock className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-lg">Security & Access</h3>
          </div>
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium">Maintenance Mode</h4>
                <p className="text-xs text-muted-foreground mt-1">Temporarily disable access to the platform for all non-admin users.</p>
              </div>
              <div className="w-11 h-6 bg-muted rounded-full relative cursor-pointer border border-border/50">
                <div className="w-4 h-4 bg-background rounded-full absolute top-1 left-1 shadow-sm"></div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium">Allow New Registrations</h4>
                <p className="text-xs text-muted-foreground mt-1">Enable or disable new user signups.</p>
              </div>
              <div className="w-11 h-6 bg-primary rounded-full relative cursor-pointer">
                <div className="w-4 h-4 bg-background rounded-full absolute top-1 right-1 shadow-sm"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button variant="outline">Discard Changes</Button>
          <Button className="gap-2"><Save className="w-4 h-4" /> Save Configuration</Button>
        </div>
      </div>
    </div>
  );
}
