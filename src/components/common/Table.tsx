import React from 'react';

interface TableProps {
  headers: string[];
  children: React.ReactNode;
}

export function Table({ headers, children }: TableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse min-w-[1000px]">
        <thead>
          <tr className="bg-[#0b215f] border-b border-[#0b215f]">
            {headers.map((header, index) => (
              <th 
                key={index} 
                className={`py-4 px-6 text-sm font-bold text-white uppercase tracking-wider ${header === 'Action' ? 'text-right' : ''}`}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {children}
        </tbody>
      </table>
    </div>
  );
}
