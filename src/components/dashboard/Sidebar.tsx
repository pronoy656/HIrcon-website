"use client";

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
  { name: "Quote", href: "/dashboard/quote", icon: FileText },
  { name: "Ship", href: "/dashboard/ship", icon: Truck },
  { name: "Print", href: "/dashboard/print", icon: Printer },
  { name: "Track", href: "/dashboard/track", icon: MapPin },
  { name: "Products", href: "/dashboard/products", icon: Package },
  { name: "Invoice", href: "/dashboard/invoice", icon: Receipt },
  { name: "Manage", href: "/dashboard/manage", icon: Settings },
  { name: "Integration", href: "/dashboard/integration", icon: Link2 },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-[100px] bg-white border-r border-gray-200 h-screen flex flex-col items-center py-6 sticky top-0 flex-shrink-0 z-20 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
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
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link 
              key={item.name} 
              href={item.href}
              className={clsx(
                "flex flex-col items-center justify-center gap-1.5 py-3.5 px-1 rounded-xl transition-all duration-200 group",
                isActive 
                  ? "bg-orange-50 text-[#E8500A] shadow-sm ring-1 ring-orange-100" 
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <Icon className={clsx("w-6 h-6 transition-transform", isActive ? "text-[#E8500A] scale-110" : "text-gray-400 group-hover:text-gray-600 group-hover:scale-110")} strokeWidth={isActive ? 2.5 : 2} />
              <span className={clsx("text-[10px] tracking-wide", isActive ? "text-[#E8500A] font-bold" : "font-medium")}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
