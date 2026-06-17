"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  FileText, 
  Truck, 
  Printer, 
  MapPin, 
  Package, 
  Receipt, 
  Settings, 
  Link2 
} from "lucide-react";
import clsx from "clsx";

const navItems = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Quote", href: "/dashboard/quote", icon: FileText, hasSubmenu: true },
  { name: "Ship", href: "/dashboard/ship", icon: Truck, hasSubmenu: true },
  { name: "Print", href: "/dashboard/print", icon: Printer, hasSubmenu: true },
  { name: "Track", href: "/dashboard/track", icon: MapPin, hasSubmenu: true },
  { name: "Products", href: "/dashboard/products", icon: Package },
  { name: "Invoice", href: "/dashboard/invoice", icon: Receipt },
  { name: "Manage", href: "/dashboard/manage", icon: Settings, hasSubmenu: true },
  { name: "Integration", href: "/dashboard/integration", icon: Link2 },
];

const submenus: Record<string, { title: string, subtitle: string, topOffset: string, items: { name: string, href: string }[] }> = {
  Quote: {
    title: "Quotations",
    subtitle: "Manage your quotes",
    topOffset: "top-[100px]", // Arbitrary offsets to make them align roughly with their icons
    items: [
      { name: "Quick Quote", href: "/dashboard/quote/quick-quote" },
      { name: "Saved Quotation", href: "/dashboard/quote/saved-quotation" },
    ]
  },
  Ship: {
    title: "Shipments",
    subtitle: "Manage dispatch options",
    topOffset: "top-[160px]",
    items: [
      { name: "Export Domestic", href: "/dashboard/ship/export-domestic" },
      { name: "Import", href: "/dashboard/ship/import" },
      { name: "Pallet", href: "/dashboard/ship/pallet" },
      { name: "Quick Ship", href: "/dashboard/ship/quick-ship" },
      { name: "Spot Rate / Freight", href: "/dashboard/ship/spot-rate" },
      { name: "Ship Manager", href: "/dashboard/ship/ship-manager" },
      { name: "Saved Shipments", href: "/dashboard/ship/saved-shipments" },
    ]
  },
  Print: {
    title: "Printing",
    subtitle: "Print documents",
    topOffset: "top-[220px]",
    items: [
      { name: "Print Mainfest", href: "/dashboard/print/print-manifest" },
      { name: "Bulk Print", href: "/dashboard/print/bulk-print" },
    ]
  },
  Track: {
    title: "Tracking",
    subtitle: "Track your shipments",
    topOffset: "top-[280px]",
    items: [
      { name: "Tracking History", href: "/dashboard/track/tracking-history" },
      { name: "Watch Shipment", href: "/dashboard/track/watch-shipment" },
      { name: "Spot Rate / Freight History", href: "/dashboard/track/spot-rate-history" },
    ]
  },
  Manage: {
    title: "Management",
    subtitle: "Account settings",
    topOffset: "top-[460px]",
    items: [
      { name: "CSV Mapping", href: "/dashboard/manage/csv-mapping" },
      { name: "Dashboard Preference", href: "/dashboard/manage/dashboard-preference" },
      { name: "Contact", href: "/dashboard/manage/contact" },
      { name: "Change Password", href: "/dashboard/manage/change-password" },
    ]
  }
};

export function Sidebar() {
  const pathname = usePathname();
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (name: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    const hasSub = navItems.find(i => i.name === name)?.hasSubmenu;
    if (hasSub) {
      setActiveMenu(name);
    } else {
      setActiveMenu(null);
    }
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 150); // slight delay to allow mouse transition to the flyout
  };

  const activeSubmenuData = activeMenu ? submenus[activeMenu] : null;

  return (
    <div className="sticky top-0 z-30 flex h-screen" onMouseLeave={handleMouseLeave}>
      <aside className="w-[100px] bg-white border-r border-gray-200 h-full flex flex-col items-center py-6 flex-shrink-0 shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-20">
        {/* Brand */}
        <Link href="/dashboard" className="flex flex-col items-center mb-8 gap-2 group">
          <div className="w-10 h-10 bg-[#E8500A] rounded-[10px] flex items-center justify-center text-white shadow-md transition-transform group-hover:scale-105">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
              <polyline points="3.29 7 12 12 20.71 7"></polyline>
              <line x1="12" y1="22" x2="12" y2="12"></line>
            </svg>
          </div>
          <span className="text-[12px] font-black tracking-tight text-gray-900">SwiftDrop</span>
        </Link>

        {/* Navigation */}
        <nav className="flex flex-col w-full gap-2 px-3 flex-1 overflow-y-auto overflow-x-hidden no-scrollbar">
          {navItems.map((item) => {
            // An item is considered active if we are exactly on it, or if it has submenus and we are on one of its subroutes
            const isExactMatch = pathname === item.href;
            const isSubrouteMatch = item.hasSubmenu && pathname?.startsWith(item.href + "/");
            const isActive = isExactMatch || isSubrouteMatch;
            const Icon = item.icon;
            
            return (
              <Link 
                key={item.name} 
                href={item.hasSubmenu ? "#" : item.href}
                onClick={(e) => {
                  if (item.hasSubmenu) {
                    e.preventDefault();
                    setActiveMenu(activeMenu === item.name ? null : item.name);
                  }
                }}
                onMouseEnter={() => handleMouseEnter(item.name)}
                className={clsx(
                  "flex flex-col items-center justify-center gap-1.5 py-3.5 px-1 rounded-xl transition-all duration-200 group relative",
                  isActive 
                    ? "bg-orange-50 text-[#E8500A] shadow-sm ring-1 ring-orange-100" 
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900",
                  activeMenu === item.name && "bg-gray-50"
                )}
              >
                <Icon className={clsx("w-6 h-6 transition-transform", isActive ? "text-[#E8500A] scale-110" : "text-gray-400 group-hover:text-gray-600 group-hover:scale-110")} strokeWidth={isActive ? 2.5 : 2} />
                <span className={clsx("text-[10px] tracking-wide text-center", isActive ? "text-[#E8500A] font-bold" : "font-medium")}>
                  {item.name}
                </span>
                
                {/* Visual Indicator when submenu is active */}
                {item.hasSubmenu && activeMenu === item.name && (
                  <div className="absolute right-[-12px] top-1/2 -translate-y-1/2 w-1.5 h-8 bg-gray-200 rounded-l-md" />
                )}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Flyout Panel */}
      {activeMenu && activeSubmenuData && (
        <div 
          className={clsx(
            "absolute left-[100px] w-[240px] bg-white border border-gray-200 shadow-[4px_4px_24px_rgba(0,0,0,0.06)] rounded-r-2xl z-10 flex flex-col animate-in slide-in-from-left-2 fade-in duration-200",
            activeSubmenuData.topOffset
          )}
          onMouseEnter={() => handleMouseEnter(activeMenu)}
        >
          <div className="p-5 border-b border-gray-100">
            <h2 className="text-lg font-extrabold text-gray-900 tracking-tight">{activeSubmenuData.title}</h2>
            <p className="text-xs text-gray-500 font-medium mt-0.5">{activeSubmenuData.subtitle}</p>
          </div>
          
          <div className="flex flex-col p-3 gap-1">
            {activeSubmenuData.items.map((subItem) => {
              const isSubActive = pathname === subItem.href;
              return (
                <Link
                  key={subItem.name}
                  href={subItem.href}
                  onClick={() => setActiveMenu(null)}
                  className={clsx(
                    "px-4 py-2.5 text-sm font-medium rounded-xl transition-colors",
                    isSubActive 
                      ? "bg-orange-50 text-[#E8500A]" 
                      : "text-gray-600 hover:bg-orange-50 hover:text-[#E8500A]"
                  )}
                >
                  {subItem.name}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
