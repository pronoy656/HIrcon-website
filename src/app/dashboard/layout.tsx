import React from "react";

import { Topbar } from "@/components/layout/Topbar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-[#f3f4f6] relative overflow-x-hidden max-w-[100vw]">
      {/* Extended Blue Background for Header */}
      <div className="absolute top-0 left-0 w-full h-[340px] bg-[#081b4c] z-0 pointer-events-none"></div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Topbar />
        <main className="flex-1 w-full mx-auto p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
