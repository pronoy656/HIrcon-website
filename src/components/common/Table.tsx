import React from 'react';

interface TableProps {
  headers: string[];
  children: React.ReactNode;
}

export function Table({ headers, children }: TableProps) {
  return (
    <div className="w-full">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-[#0b215f] border-b border-[#0b215f]">
            {headers.map((header, index) => (
              <th 
                key={index} 
                className={`py-3 px-4 text-sm font-bold text-white uppercase tracking-wider 
                  ${header === 'Action' ? 'text-right' : ''}
                  ${index === 0 ? 'rounded-tl-xl' : ''}
                  ${index === headers.length - 1 ? 'rounded-tr-xl' : ''}
                `}
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
