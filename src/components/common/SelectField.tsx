"use client";

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import clsx from 'clsx';

interface SelectFieldProps {
  label?: string;
  optional?: boolean;
  required?: boolean;
  containerClassName?: string;
  className?: string;
  options: { value: string; label: React.ReactNode }[];
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  name?: string;
  dropdownPosition?: 'top' | 'bottom';
}

export function SelectField({ 
  label, 
  optional, 
  required, 
  containerClassName, 
  className,
  options,
  placeholder,
  value: externalValue,
  onChange,
  name,
  dropdownPosition = 'bottom',
}: SelectFieldProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [internalValue, setInternalValue] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const value = externalValue !== undefined ? externalValue : internalValue;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find(o => o.value === value);

  return (
    <div className={clsx("relative", isOpen && "z-[60]", containerClassName)} ref={dropdownRef}>
      {label && (
        <label className="block text-sm font-bold text-gray-700 mb-1.5">
          {label} 
          {required && <span className="text-red-500 ml-1">*</span>}
          {optional && <span className="text-gray-400 font-normal ml-1">(Optional)</span>}
        </label>
      )}
      <div 
        className={clsx(
          "relative w-full px-4 py-2.5 rounded-xl text-sm cursor-pointer border transition-all flex items-center justify-between",
          required ? "bg-white border-gray-300" : "bg-gray-50 border-gray-200",
          isOpen ? "border-blue-900 ring-2 ring-blue-900/20" : "hover:border-blue-900",
          className
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={value ? "text-gray-900" : "text-gray-500"}>
          {selectedOption ? selectedOption.label : (placeholder || "Select...")}
        </span>
        <ChevronDown className={clsx("w-5 h-5 text-gray-400 transition-transform duration-300", isOpen && "rotate-180")} />
      </div>

      {isOpen && (
        <div className={clsx(
          "absolute left-0 w-full bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden animate-in fade-in duration-200",
          dropdownPosition === 'top' ? "bottom-full mb-2 slide-in-from-bottom-2" : "top-full mt-2 slide-in-from-top-2"
        )}>
          <ul className="max-h-60 overflow-y-auto py-1">
            {options.map((option) => (
              <li 
                key={option.value}
                className={clsx(
                  "px-4 py-2.5 text-sm cursor-pointer transition-colors",
                  option.value === value ? "bg-blue-50 text-blue-950 font-bold" : "hover:bg-blue-50 text-gray-700"
                )}
                onClick={() => {
                  if (externalValue === undefined) {
                    setInternalValue(option.value);
                  }
                  if (onChange) onChange(option.value);
                  setIsOpen(false);
                }}
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
      {/* Hidden input for native form submission if needed */}
      {name && <input type="hidden" name={name} value={value} required={required} />}
    </div>
  );
}
