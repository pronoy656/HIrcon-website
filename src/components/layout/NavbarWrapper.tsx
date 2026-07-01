"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";

export function NavbarWrapper() {
  const pathname = usePathname();
  
  // Hide navbar on auth, support, dashboard, and admin pages
  if (pathname?.startsWith("/auth") || pathname === "/support" || pathname?.startsWith("/dashboard") || pathname?.startsWith("/admin")) {
    return null;
  }

  return <Navbar />;
}
