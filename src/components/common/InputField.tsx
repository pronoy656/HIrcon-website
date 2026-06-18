import React from 'react';
import clsx from 'clsx';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  optional?: boolean;
  containerClassName?: string;
}

export function InputField({ 
  label, 
  optional, 
  required, 
  containerClassName, 
  className, 
  ...props 
}: InputFieldProps) {
  return (
    <div className={containerClassName}>
      <label className="block text-sm font-bold text-gray-700 mb-1.5">
        {label} 
        {required && <span className="text-red-500 ml-1">*</span>}
        {optional && <span className="text-gray-400 font-normal ml-1">(Optional)</span>}
      </label>
      <input 
        className={clsx(
          "w-full px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all",
          required ? "bg-white border border-gray-300" : "bg-gray-50 border border-gray-200",
          className
        )} 
        required={required}
        {...props} 
      />
    </div>
  );
}
