"use client";

import { MapPin, Navigation, Truck, User } from "lucide-react";

export default function AdminTrackingPage() {
  return (
    <div className="h-[calc(100vh-10rem)] animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out flex flex-col gap-6">
      <div className="flex flex-col gap-1.5">
        <h1 className="text-3xl font-extrabold tracking-tight">Live Tracking</h1>
        <p className="text-muted-foreground">Monitor real-time driver locations and route histories.</p>
      </div>

      <div className="flex-1 grid lg:grid-cols-4 gap-6 min-h-0">
        {/* Map Area */}
        <div className="lg:col-span-3 rounded-2xl border border-border/50 bg-card/80 shadow-sm overflow-hidden relative">
          <div className="absolute inset-0 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=New+York,NY&zoom=13&size=1000x800&maptype=roadmap&sensor=false')] bg-cover bg-center opacity-40 grayscale blur-[0.5px]"></div>
          
          {/* Mock Markers */}
          <div className="absolute top-[30%] left-[40%] flex flex-col items-center animate-bounce">
            <div className="bg-primary text-primary-foreground p-2 rounded-full shadow-lg">
              <Truck className="w-5 h-5" />
            </div>
            <div className="mt-1 bg-background/90 backdrop-blur text-xs font-semibold px-2 py-1 rounded shadow border border-border">John Doe (ETA: 5m)</div>
          </div>

          <div className="absolute top-[60%] left-[70%] flex flex-col items-center">
            <div className="bg-amber-500 text-white p-2 rounded-full shadow-lg">
              <MapPin className="w-5 h-5" />
            </div>
            <div className="mt-1 bg-background/90 backdrop-blur text-xs font-semibold px-2 py-1 rounded shadow border border-border">Delivery Drop-off</div>
          </div>
          
          <div className="absolute top-4 left-4 z-10 bg-background/80 backdrop-blur-md p-4 rounded-xl shadow-md border border-border/50">
            <h3 className="font-semibold flex items-center gap-2"><Navigation className="w-4 h-4 text-primary" /> Active Region</h3>
            <p className="text-sm text-muted-foreground mt-1">Downtown, New York</p>
          </div>
        </div>

        {/* Sidebar Data */}
        <div className="rounded-2xl border border-border/50 bg-card/80 backdrop-blur-md shadow-sm p-4 flex flex-col gap-4 overflow-y-auto custom-scrollbar">
          <h3 className="font-semibold text-lg border-b border-border/50 pb-3">Active Drivers</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="p-3 rounded-xl border border-border/50 bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer group">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                      <User className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold group-hover:text-primary transition-colors">Driver {i}</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">ORD-982{i}</p>
                    </div>
                  </div>
                  <span className="text-xs font-medium text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full">En Route</span>
                </div>
                <div className="mt-3 pt-3 border-t border-border/50 flex justify-between text-xs text-muted-foreground">
                  <span>Speed: 45km/h</span>
                  <span>ETA: {i * 5} min</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
