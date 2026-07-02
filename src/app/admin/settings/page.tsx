import { Button } from "@/components/ui/button";
import { Settings, Save, Globe, Lock, User, KeyRound, Upload } from "lucide-react";

export default function AdminSettingsPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out max-w-4xl pb-10">
      <div className="flex flex-col gap-1.5">
        <h1 className="text-3xl font-extrabold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account profile, security, and global platform preferences.
        </p>
      </div>

      <div className="grid gap-8">
        
        {/* Profile Settings */}
        <div className="rounded-2xl border border-border/50 bg-card/80 backdrop-blur-md shadow-sm overflow-hidden">
          <div className="p-6 border-b border-border/50 bg-muted/20 flex items-center gap-3">
            <User className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-lg">Profile Details</h3>
          </div>
          <div className="p-6 space-y-6">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-full bg-slate-200 border-4 border-white shadow-sm flex items-center justify-center overflow-hidden shrink-0">
                <img src="https://ui-avatars.com/api/?name=Admin+User&background=0D8ABC&color=fff" alt="Admin" className="w-full h-full object-cover" />
              </div>
              <div>
                <Button variant="outline" className="gap-2 mb-2"><Upload className="w-4 h-4" /> Upload New Picture</Button>
                <p className="text-xs text-muted-foreground">Recommended size: 256x256px. Max 2MB.</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 pt-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Full Name</label>
                <input type="text" defaultValue="Admin User" className="w-full bg-muted/50 border border-border/50 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email Address</label>
                <input type="email" defaultValue="admin@transvia.com" className="w-full bg-muted/50 border border-border/50 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Phone Number</label>
                <input type="tel" defaultValue="+1 (555) 123-4567" className="w-full bg-muted/50 border border-border/50 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Role</label>
                <input type="text" defaultValue="Super Admin" disabled className="w-full bg-muted/30 border border-border/30 rounded-lg px-3 py-2 text-sm text-muted-foreground cursor-not-allowed" />
              </div>
            </div>
          </div>
        </div>

        {/* Change Password */}
        <div className="rounded-2xl border border-border/50 bg-card/80 backdrop-blur-md shadow-sm overflow-hidden">
          <div className="p-6 border-b border-border/50 bg-muted/20 flex items-center gap-3">
            <KeyRound className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-lg">Change Password</h3>
          </div>
          <div className="p-6 space-y-6">
            <div className="grid sm:grid-cols-3 gap-4 items-center">
              <label className="text-sm font-medium">Current Password</label>
              <input type="password" placeholder="Enter current password" className="sm:col-span-2 w-full bg-muted/50 border border-border/50 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50" />
            </div>
            <div className="grid sm:grid-cols-3 gap-4 items-center">
              <label className="text-sm font-medium">New Password</label>
              <input type="password" placeholder="Enter new password" className="sm:col-span-2 w-full bg-muted/50 border border-border/50 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50" />
            </div>
            <div className="grid sm:grid-cols-3 gap-4 items-center">
              <label className="text-sm font-medium">Confirm Password</label>
              <input type="password" placeholder="Confirm new password" className="sm:col-span-2 w-full bg-muted/50 border border-border/50 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50" />
            </div>
          </div>
        </div>

        {/* Platform Settings */}
        <div className="rounded-2xl border border-border/50 bg-card/80 backdrop-blur-md shadow-sm overflow-hidden">
          <div className="p-6 border-b border-border/50 bg-muted/20 flex items-center gap-3">
            <Globe className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-lg">Platform Preferences</h3>
          </div>
          <div className="p-6 space-y-6">
            <div className="grid sm:grid-cols-3 gap-4 items-center">
              <label className="text-sm font-medium">Platform Name</label>
              <input type="text" defaultValue="Transvia Logistics" className="sm:col-span-2 w-full bg-muted/50 border border-border/50 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50" />
            </div>
            
            <div className="flex items-center justify-between pt-4 border-t border-border/50">
              <div>
                <h4 className="text-sm font-medium">Maintenance Mode</h4>
                <p className="text-xs text-muted-foreground mt-1">Temporarily disable access to the platform for all non-admin users.</p>
              </div>
              <div className="w-11 h-6 bg-muted rounded-full relative cursor-pointer border border-border/50">
                <div className="w-4 h-4 bg-background rounded-full absolute top-1 left-1 shadow-sm"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 sticky bottom-6 bg-background/80 backdrop-blur-md p-4 rounded-xl border border-border/50 shadow-sm">
          <Button variant="outline">Discard Changes</Button>
          <Button className="gap-2"><Save className="w-4 h-4" /> Save Configuration</Button>
        </div>
      </div>
    </div>
  );
}
