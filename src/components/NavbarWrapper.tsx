"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "./navbar";

export function NavbarWrapper() {
  const pathname = usePathname();
  
  // Hide navbar on auth pages
  if (pathname?.startsWith("/auth")) {
    return null;
  }

  return <Navbar />;
}
