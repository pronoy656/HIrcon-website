"use client";

import React, { useState } from "react";
import { WeeklyChart } from "@/components/features/overview/graph&chart/WeeklyChart";
import { MonthlyChart } from "@/components/features/overview/graph&chart/MonthlyChart";
import { ServiceProviderChart } from "@/components/features/overview/graph&chart/ServiceProviderChart";
import { TotalWeeklyChart } from "@/components/features/overview/graph&chart/TotalWeeklyChart";
import { ExceptionList } from "@/components/features/overview/graph&chart/ExceptionList";

export default function DashboardPreferencePage() {
  return (
    <div className="p-8 max-w-7xl mx-auto animate-in fade-in duration-500">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-white mb-2 tracking-tight">Dashboard Preferences</h1>
        <p className="text-blue-100 font-medium">Manage and preview the graphs displayed on your overview dashboard.</p>
      </div>

      <div className="space-y-8">
        {/* Exception List Section */}
        <ExceptionList />

        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 shadow-inner">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Active Graphs Preview</h2>
          
          <div className="space-y-8">
            {/* Row 1 */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              <div className="min-w-0 transition-transform duration-300 hover:scale-[1.01]">
                <WeeklyChart />
              </div>
              <div className="min-w-0 transition-transform duration-300 hover:scale-[1.01]">
                <MonthlyChart />
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              <div className="min-w-0 transition-transform duration-300 hover:scale-[1.01]">
                <TotalWeeklyChart />
              </div>
              <div className="min-w-0 transition-transform duration-300 hover:scale-[1.01]">
                <ServiceProviderChart />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
