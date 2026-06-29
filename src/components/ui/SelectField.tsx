"use client";

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { ChevronDown, CheckCircle2, Search } from 'lucide-react';
import clsx from 'clsx';

interface SelectFieldProps {
  label?: React.ReactNode;
  optional?: boolean;
  required?: boolean;
  containerClassName?: string;
  className?: string;
  options: { value: string; label: React.ReactNode; searchKey?: string }[];
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  name?: string;
  dropdownPosition?: 'top' | 'bottom';
  searchable?: boolean;
  combo?: boolean;
  disabled?: boolean;
  actionButton?: React.ReactNode;
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
  searchable = false,
  combo = false,
  disabled = false,
  actionButton,
}: SelectFieldProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [internalValue, setInternalValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [comboInputValue, setComboInputValue] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const value = externalValue !== undefined ? externalValue : internalValue;
  const isFilled = value !== undefined && value !== null && String(value).trim().length > 0;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setSearchTerm("");
      // If combo, we don't clear comboInputValue because it's the actual value
    }
  }, [isOpen]);

  const selectedOption = options.find(o => o.value === value);

  useEffect(() => {
    if (combo) {
      if (selectedOption) {
        setComboInputValue(String(selectedOption.label));
      } else {
        setComboInputValue(value || "");
      }
    }
  }, [value, selectedOption, combo]);

  const handleComboInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setComboInputValue(val);
    setIsOpen(true);
    if (externalValue === undefined) {
      setInternalValue(val);
    }
    if (onChange) onChange(val);
  };

  const filteredOptions = useMemo(() => {
    const term = combo ? comboInputValue : searchTerm;
    if (!searchable && !combo) return options;
    if (!term) return options;
    const lowerSearchTerm = term.toLowerCase();
    return options.filter(option => {
      if (option.searchKey) {
        return option.searchKey.toLowerCase().includes(lowerSearchTerm);
      }
      if (typeof option.label === 'string') {
        return option.label.toLowerCase().includes(lowerSearchTerm);
      }
      return option.value.toLowerCase().includes(lowerSearchTerm);
    });
  }, [options, searchable, searchTerm]);

  return (
    <div className={clsx("relative", isOpen && "z-[60]", containerClassName)} ref={dropdownRef}>
      {label && (
        <label className={clsx("flex items-center w-full text-sm font-bold text-gray-700 mb-1.5", disabled && "opacity-50")}>
          {label} 
          {required && !isFilled && <span className="text-red-500 ml-1">*</span>}
          {optional && <span className="text-gray-400 font-normal ml-1">(Optional)</span>}
        </label>
      )}
      <div className="flex items-center gap-3">
        <div 
          className={clsx(
            "relative w-full flex-1 px-4 py-2.5 rounded-xl text-sm border transition-all flex items-center justify-between",
            disabled ? "bg-gray-100 border-gray-200 cursor-not-allowed opacity-60" : "bg-white border-gray-300 cursor-pointer",
            !disabled && isOpen && "border-blue-900 ring-2 ring-blue-900/20",
            !disabled && !isOpen && "hover:border-blue-900",
            className
          )}
          onClick={() => {
            if (!disabled) {
              if (combo && !isOpen) setIsOpen(true);
              else setIsOpen(!isOpen);
            }
          }}
        >
          {combo ? (
            <input
              type="text"
              className={clsx(
                "w-full bg-transparent outline-none truncate",
                disabled ? "cursor-not-allowed text-gray-500" : "text-gray-900 placeholder:text-gray-500"
              )}
              placeholder={placeholder || "Select or type..."}
              value={comboInputValue}
              onChange={handleComboInputChange}
              disabled={disabled}
              onFocus={() => !disabled && setIsOpen(true)}
            />
          ) : (
            <span className={value ? "text-gray-900 truncate" : "text-gray-500 truncate"}>
              {selectedOption ? selectedOption.label : (placeholder || "Select...")}
            </span>
          )}
          <ChevronDown className={clsx("w-5 h-5 text-gray-400 transition-transform duration-300 shrink-0", isOpen && "rotate-180")} />
        </div>
        {actionButton && (
          <div className="shrink-0">{actionButton}</div>
        )}
        <div className="w-5 flex justify-center shrink-0">
          {isFilled && (
            <CheckCircle2 className="w-5 h-5 text-green-500" />
          )}
        </div>
      </div>

      {!disabled && isOpen && (
        <div className={clsx(
          "absolute left-0 w-full bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden animate-in fade-in duration-200",
          dropdownPosition === 'top' ? "bottom-full mb-2 slide-in-from-bottom-2" : "top-full mt-2 slide-in-from-top-2"
        )}>
          {searchable && !combo && (
            <div className="p-2 border-b border-gray-100 bg-white sticky top-0 z-10">
              <div className="relative">
                <Search className="w-4 h-4 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-sm rounded-lg border border-gray-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            </div>
          )}
          <ul className="max-h-60 overflow-y-auto py-1">
            {filteredOptions.length > 0 ? filteredOptions.map((option) => (
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
                  if (combo) setComboInputValue(typeof option.label === 'string' ? option.label : String(option.label));
                  setIsOpen(false);
                }}
              >
                {option.label}
              </li>
            )) : (
              <li className="px-4 py-3 text-sm text-gray-500 text-center">No results found</li>
            )}
          </ul>
        </div>
      )}
      {/* Hidden input for native form submission if needed */}
      {name && <input type="hidden" name={name} value={value} required={required} />}
    </div>
  );
}
