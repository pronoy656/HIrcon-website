import React from "react";

import { Topbar } from "@/components/dashboard/Topbar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA]">
      <Topbar />
      <main className="flex-1 w-full mx-auto p-4 md:p-8">
        {children}
      </main>
    </div>
  );
}
