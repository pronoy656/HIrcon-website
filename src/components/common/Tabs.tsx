import React from "react";
import clsx from "clsx";

export interface TabItem {
  id: string;
  label: string;
}

export interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (id: string) => void;
  fullWidth?: boolean;
  containerClassName?: string;
  tabClassName?: string;
  variant?: "default" | "blue";
}

export function Tabs({
  tabs,
  activeTab,
  onChange,
  fullWidth = false,
  containerClassName,
  tabClassName,
  variant = "default",
}: TabsProps) {
  return (
    <div
      className={clsx(
        "p-1.5 rounded-xl inline-flex overflow-x-auto max-w-full custom-scrollbar shadow-sm",
        variant === "default" ? "bg-white/50 border border-gray-200 gap-1" : "bg-blue-50 space-x-2",
        fullWidth ? "flex w-full" : "",
        containerClassName
      )}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={clsx(
              "py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 whitespace-nowrap",
              fullWidth ? "w-full" : "px-5",
              isActive
                ? "bg-[#081b4c] text-white shadow-md"
                : variant === "default"
                ? "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                : "text-gray-500 hover:bg-white/60 hover:text-blue-900",
              tabClassName
            )}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
