"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  User, 
  LogOut, 
  ChevronDown, 
  Bell,
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

const submenus: Record<string, { items: { name: string, href: string }[] }> = {
  Quote: {
    items: [
      { name: "Quick Quote", href: "/dashboard/quote/quick-quote" },
      { name: "Saved Quotation", href: "/dashboard/quote/saved-quotation" },
    ]
  },
  Ship: {
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
    items: [
      { name: "Print Mainfest", href: "/dashboard/print/print-manifest" },
      { name: "Bulk Print", href: "/dashboard/print/bulk-print" },
    ]
  },
  Track: {
    items: [
      { name: "Tracking History", href: "/dashboard/track/tracking-history" },
      { name: "Watch Shipment", href: "/dashboard/track/watch-shipment" },
      { name: "Spot Rate / Freight History", href: "/dashboard/track/spot-rate-history" },
    ]
  },
  Manage: {
    items: [
      { name: "CSV Mapping", href: "/dashboard/manage/csv-mapping" },
      { name: "Dashboard Preference", href: "/dashboard/manage/dashboard-preference" },
      { name: "Contact", href: "/dashboard/manage/contact" },
      { name: "Change Password", href: "/dashboard/manage/change-password" },
    ]
  }
};

export function Topbar() {
  const pathname = usePathname();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const profileDropdownRef = useRef<HTMLDivElement>(null);
  const navTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Close profile dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(e.target as Node)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleNavMouseEnter = (name: string) => {
    if (navTimeoutRef.current) clearTimeout(navTimeoutRef.current);
    const hasSub = navItems.find(i => i.name === name)?.hasSubmenu;
    if (hasSub) {
      setHoveredMenu(name);
    } else {
      setHoveredMenu(null);
    }
  };

  const handleNavMouseLeave = () => {
    if (navTimeoutRef.current) clearTimeout(navTimeoutRef.current);
    navTimeoutRef.current = setTimeout(() => {
      setHoveredMenu(null);
    }, 150); // slight delay to allow mouse transition to the dropdown
  };

  return (
    <header className="h-[80px] bg-white border-b border-gray-100 px-6 lg:px-8 flex items-center justify-between sticky top-0 z-50 shadow-sm w-full">
      
      {/* Left: Brand */}
      <div className="flex items-center gap-2.5 shrink-0">
        <Link href="/dashboard" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-[#0b215f] rounded-[10px] flex items-center justify-center text-white shadow-md transition-transform group-hover:scale-105">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
              <polyline points="3.29 7 12 12 20.71 7"></polyline>
              <line x1="12" y1="22" x2="12" y2="12"></line>
            </svg>
          </div>
          <span className="text-xl font-black tracking-tight text-gray-900 hidden sm:block">SwiftDrop</span>
        </Link>
      </div>

      {/* Center: Navigation */}
      <nav 
        className="hidden md:flex items-center h-full gap-1 mx-8 relative flex-1 justify-center"
        onMouseLeave={handleNavMouseLeave}
      >
        {navItems.map((item) => {
          const isExactMatch = pathname === item.href;
          const isSubrouteMatch = item.hasSubmenu && pathname?.startsWith(item.href + "/");
          const isActive = isExactMatch || isSubrouteMatch;
          const isHovered = hoveredMenu === item.name;
          const Icon = item.icon;
          
          return (
            <div 
              key={item.name} 
              className="relative h-full flex items-center"
              onMouseEnter={() => handleNavMouseEnter(item.name)}
            >
              <Link 
                href={item.hasSubmenu ? "#" : item.href}
                onClick={(e) => {
                  if (item.hasSubmenu) e.preventDefault();
                }}
                className={clsx(
                  "flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-200 group relative",
                  isActive 
                    ? "text-[#0b215f] font-bold" 
                    : "text-gray-500 font-medium hover:text-gray-900 hover:bg-gray-50",
                  isHovered && "bg-gray-50"
                )}
              >
                <Icon className={clsx("w-5 h-5 transition-transform", isActive ? "text-[#0b215f]" : "text-gray-400 group-hover:text-gray-600")} strokeWidth={isActive ? 2.5 : 2} />
                <span className="text-sm tracking-wide">
                  {item.name}
                </span>
                
                {/* Active bottom indicator line */}
                {isActive && (
                  <div className="absolute bottom-[-16px] left-0 w-full h-[3px] bg-[#0b215f] rounded-t-full" />
                )}
              </Link>

              {/* Dropdown for submenus */}
              {item.hasSubmenu && isHovered && submenus[item.name] && (
                <div 
                  className="absolute top-[80px] left-1/2 -translate-x-1/2 w-[220px] bg-white border border-gray-100 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] rounded-2xl z-50 flex flex-col p-2 animate-in slide-in-from-top-2 fade-in duration-200"
                >
                  {submenus[item.name].items.map((subItem) => {
                    const isSubActive = pathname === subItem.href;
                    return (
                      <Link
                        key={subItem.name}
                        href={subItem.href}
                        onClick={() => setHoveredMenu(null)}
                        className={clsx(
                          "px-4 py-2.5 text-sm rounded-xl transition-colors font-medium",
                          isSubActive 
                            ? "bg-blue-50 text-[#0b215f]" 
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        )}
                      >
                        {subItem.name}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Right: Profile & Actions */}
      <div className="flex items-center gap-4 shrink-0">
        <button className="relative text-gray-400 hover:text-gray-900 transition-colors p-2 rounded-full hover:bg-gray-50">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-2 w-2 h-2 bg-[#0b215f] border-2 border-white rounded-full box-content"></span>
        </button>

        <div className="relative" ref={profileDropdownRef}>
          <button 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-3 hover:bg-gray-50 p-1.5 rounded-full pr-4 transition-colors border border-transparent hover:border-gray-200"
          >
            <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center text-[#0b215f] overflow-hidden">
              <User className="w-4 h-4" />
            </div>
            <div className="flex flex-col items-start hidden sm:flex">
              <span className="text-sm font-bold text-gray-900 leading-none mb-0.5">John Doe</span>
              <span className="text-xs text-gray-500 font-medium leading-none">Admin</span>
            </div>
            <ChevronDown className={clsx("w-4 h-4 text-gray-400 transition-transform duration-200", isProfileOpen && "rotate-180")} />
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 animate-in fade-in slide-in-from-top-2 z-50">
              <div className="px-4 py-3 border-b border-gray-100 mb-1">
                <p className="text-sm font-bold text-gray-900">John Doe</p>
                <p className="text-xs text-gray-500 font-medium mt-0.5 truncate">john.doe@swiftdrop.com</p>
              </div>
              
              <div className="px-2 py-1">
                <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-xl flex items-center gap-2.5 font-medium transition-colors">
                  <User className="w-4 h-4 text-gray-400" />
                  My Profile
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-xl flex items-center gap-2.5 font-medium transition-colors">
                  <Settings className="w-4 h-4 text-gray-400" />
                  Settings
                </button>
              </div>
              
              <div className="px-2 py-1 mt-1 border-t border-gray-100 pt-2">
                <button className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-xl flex items-center gap-2.5 font-medium transition-colors">
                  <LogOut className="w-4 h-4" />
                  Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
