"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";

export function NavbarWrapper() {
  const pathname = usePathname();
  
  // Hide navbar on auth, support, and dashboard pages
  if (pathname?.startsWith("/auth") || pathname === "/support" || pathname?.startsWith("/dashboard")) {
    return null;
  }

  return <Navbar />;
}
