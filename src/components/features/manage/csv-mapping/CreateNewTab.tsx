import React from "react";
import { Button } from "@/components/ui/button";

export function CreateNewTab() {
  return (
    <div className="space-y-6">
      <label
        htmlFor="file-upload"
        className="flex flex-col items-center justify-center py-16 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer w-full"
      >
        <div className="text-center">
          <div className="bg-white p-4 rounded-full shadow-sm inline-block mb-4">
            <svg
              className="h-10 w-10 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
          </div>
          <div className="flex text-sm justify-center">
            <span className="font-semibold text-blue-600">Click to upload</span>
            <span className="pl-1 text-gray-600">or drag and drop</span>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            CSV or Excel files up to 10MB
          </p>
        </div>
        <input
          id="file-upload"
          name="file-upload"
          type="file"
          className="sr-only"
        />
      </label>

      <div className="flex justify-end mt-4">
        <Button className="bg-[#081b4c] hover:bg-[#081b4c]/90 text-white px-6 h-[44px]">
          Save
        </Button>
      </div>
    </div>
  );
}
