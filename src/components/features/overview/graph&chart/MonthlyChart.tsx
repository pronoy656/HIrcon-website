"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', International: 120, UK: 180, ThirdToThird: 80 },
  { month: 'Feb', International: 150, UK: 160, ThirdToThird: 90 },
  { month: 'Mar', International: 180, UK: 220, ThirdToThird: 110 },
  { month: 'Apr', International: 140, UK: 200, ThirdToThird: 95 },
  { month: 'May', International: 210, UK: 240, ThirdToThird: 130 },
  { month: 'Jun', International: 250, UK: 280, ThirdToThird: 160 },
  { month: 'Jul', International: 220, UK: 260, ThirdToThird: 150 },
  { month: 'Aug', International: 190, UK: 210, ThirdToThird: 120 },
  { month: 'Sep', International: 230, UK: 270, ThirdToThird: 140 },
  { month: 'Oct', International: 260, UK: 310, ThirdToThird: 170 },
  { month: 'Nov', International: 290, UK: 340, ThirdToThird: 190 },
  { month: 'Dec', International: 320, UK: 380, ThirdToThird: 210 },
];

export function MonthlyChart() {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h3 className="text-lg font-bold text-gray-900">Monthly Shipments</h3>
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#D6A539]"></div>
            <span className="text-xs font-semibold text-gray-500">International Shipments</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#081b4c]"></div>
            <span className="text-xs font-semibold text-gray-500">UK Shipments</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#8561F6]"></div>
            <span className="text-xs font-semibold text-gray-500">Third to Third Shipments</span>
          </div>
        </div>
      </div>
      
      <div className="h-[350px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
            <XAxis 
              dataKey="month" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#6B7280', fontSize: 12 }}
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#6B7280', fontSize: 12 }}
            />
            <Tooltip 
              cursor={{ fill: '#F3F4F6' }}
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Bar dataKey="International" fill="#D6A539" radius={[4, 4, 0, 0]} />
            <Bar dataKey="UK" fill="#081b4c" radius={[4, 4, 0, 0]} />
            <Bar dataKey="ThirdToThird" fill="#8561F6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
