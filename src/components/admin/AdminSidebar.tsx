"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, Package, Truck, Users, Calculator, 
  MapPin, CreditCard, BarChart3, LifeBuoy, Settings 
} from "lucide-react";

const navGroups = [
  {
    title: "Main",
    items: [
      { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    ]
  },
  {
    title: "Logistics",
    items: [
      { name: "Shipments", href: "/admin/shipments", icon: Package },
      { name: "Courier Partners", href: "/admin/couriers", icon: Truck },
      { name: "Tracking", href: "/admin/tracking", icon: MapPin },
    ]
  },
  {
    title: "Business",
    items: [
      { name: "Customers", href: "/admin/customers", icon: Users },
      { name: "Pricing", href: "/admin/pricing", icon: Calculator },
      { name: "Billing", href: "/admin/billing", icon: CreditCard },
    ]
  },
  {
    title: "Administration",
    items: [
      { name: "Reports", href: "/admin/reports", icon: BarChart3 },
      { name: "Support", href: "/admin/support", icon: LifeBuoy },
      { name: "Settings", href: "/admin/settings", icon: Settings },
    ]
  }
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-background/80 backdrop-blur-xl border-r border-border/50 flex-shrink-0 hidden md:flex flex-col h-[calc(100vh-4rem)] sticky top-16 z-20">
      <nav className="flex-1 p-4 space-y-4 overflow-y-auto custom-scrollbar">
        {navGroups.map((group) => (
          <div key={group.title} className="space-y-1.5">
            <div className="px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              {group.title}
            </div>
            {group.items.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ease-in-out ${
                    isActive 
                      ? "bg-primary/10 text-primary font-semibold shadow-sm shadow-primary/5" 
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/60 hover:shadow-sm"
                  }`}
                >
                  <item.icon className={`h-4 w-4 transition-transform duration-200 ${isActive ? "scale-110" : "group-hover:scale-110"}`} />
                  <span className="text-sm">{item.name}</span>
                </Link>
              );
            })}
          </div>
        ))}
      </nav>
      <div className="p-4 border-t border-border/50 bg-muted/20">
        <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-card shadow-sm border border-border/50">
          <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-primary to-primary/60 flex items-center justify-center text-primary-foreground font-bold text-sm shadow-sm">
            SA
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="text-sm font-medium leading-none truncate">Super Admin</span>
            <span className="text-xs text-muted-foreground mt-1 truncate">admin@company.com</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
