"use client";

import React from 'react';

interface PaginationProps {
  currentPage?: number;
  totalPages?: number;
  totalItems?: number;
  startItem?: number;
  endItem?: number;
  itemName?: string;
  onPageChange?: (page: number) => void;
}

export function Pagination({
  currentPage = 1,
  totalPages = 3,
  totalItems = 24,
  startItem = 1,
  endItem = 6,
  itemName = "items",
  onPageChange
}: PaginationProps) {
  return (
    <div className="p-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
      <p>
        Showing {startItem} to {endItem} of {totalItems} {itemName}
      </p>
      <div className="flex gap-1">
        <button 
          className="px-3 py-1 border border-gray-200 rounded-md hover:bg-gray-50 disabled:opacity-50 transition-colors"
          disabled={currentPage === 1}
          onClick={() => onPageChange?.(currentPage - 1)}
        >
          Prev
        </button>
        
        {Array.from({ length: totalPages }).map((_, i) => {
          const page = i + 1;
          const isActive = page === currentPage;
          return (
            <button 
              key={page}
              onClick={() => onPageChange?.(page)}
              className={`px-3 py-1 border border-gray-200 rounded-md transition-colors ${
                isActive 
                  ? "bg-gray-50 font-bold text-gray-900" 
                  : "hover:bg-gray-50"
              }`}
            >
              {page}
            </button>
          );
        })}

        <button 
          className="px-3 py-1 border border-gray-200 rounded-md hover:bg-gray-50 disabled:opacity-50 transition-colors"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange?.(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
