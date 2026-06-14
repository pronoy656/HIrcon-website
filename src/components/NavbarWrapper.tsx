"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "./navbar";

export function NavbarWrapper() {
  const pathname = usePathname();
  
  // Hide navbar on auth pages and support page
  if (pathname?.startsWith("/auth") || pathname === "/support") {
    return null;
  }

  return <Navbar />;
}
