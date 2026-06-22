import React from 'react';
import clsx from 'clsx';
import { CircleHelp } from 'lucide-react';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: React.ReactNode;
  optional?: boolean;
  containerClassName?: string;
  tooltip?: React.ReactNode;
}

export function InputField({ 
  label, 
  optional, 
  required, 
  containerClassName, 
  className,
  tooltip,
  ...props 
}: InputFieldProps) {
  return (
    <div className={containerClassName}>
      <label className="flex items-center w-full text-sm font-bold text-gray-700 mb-1.5">
        {label} 
        {required && <span className="text-red-500 ml-1">*</span>}
        {optional && <span className="text-gray-400 font-normal ml-1">(Optional)</span>}
        {tooltip && (
          <div className="relative ml-2 group flex items-center">
            <CircleHelp className="w-5 h-5 text-red-600 cursor-help" />
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-80 md:w-96 p-4 bg-gray-900 text-white text-xs leading-relaxed rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
              {tooltip}
              <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900"></div>
            </div>
          </div>
        )}
      </label>
      <input 
        className={clsx(
          "w-full px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 transition-all",
          required ? "bg-white border border-gray-300" : "bg-gray-50 border border-gray-200",
          className
        )} 
        required={required}
        {...props} 
      />
    </div>
  );
}
