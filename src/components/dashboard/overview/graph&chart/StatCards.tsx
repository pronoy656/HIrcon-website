"use client";

import { Package, DollarSign, Truck, AlertCircle, ArrowUpRight, ArrowDownRight } from "lucide-react";
import clsx from "clsx";

export function StatCards() {
  const stats = [
    { 
      name: "Total Shipments", 
      value: "2,543", 
      change: "+12.5%", 
      trend: "up", 
      icon: Package,
      color: "text-[#202E4A]",
      bgColor: "bg-blue-50"
    },
    { 
      name: "Total Revenue", 
      value: "$45,231", 
      change: "+8.2%", 
      trend: "up", 
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    { 
      name: "Active Deliveries", 
      value: "142", 
      change: "-2.4%", 
      trend: "down", 
      icon: Truck,
      color: "text-[#E8500A]",
      bgColor: "bg-orange-50"
    },
    { 
      name: "Pending Actions", 
      value: "5", 
      change: "Requires attention", 
      trend: "neutral", 
      icon: AlertCircle,
      color: "text-red-500",
      bgColor: "bg-red-50"
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div key={stat.name} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-4">
            <div className="flex justify-between items-start">
              <div className={clsx("w-12 h-12 rounded-xl flex items-center justify-center", stat.bgColor, stat.color)}>
                <Icon className="w-6 h-6" />
              </div>
              {stat.trend !== "neutral" && (
                <div className={clsx(
                  "flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full",
                  stat.trend === "up" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                )}>
                  {stat.trend === "up" ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {stat.change}
                </div>
              )}
            </div>
            
            <div>
              <p className="text-gray-500 text-sm font-medium mb-1">{stat.name}</p>
              <h4 className="text-2xl font-black text-gray-900 tracking-tight">{stat.value}</h4>
            </div>
            
            {stat.trend === "neutral" && (
              <div className="text-xs font-semibold text-red-500 bg-red-50 px-2.5 py-1 rounded-full inline-block self-start mt-1">
                {stat.change}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
