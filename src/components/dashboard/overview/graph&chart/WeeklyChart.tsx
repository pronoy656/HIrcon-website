"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { day: '1st Jun', International: 40, UK: 60, ThirdToThird: 20 },
  { day: '2nd Jun', International: 50, UK: 80, ThirdToThird: 50 },
  { day: '3rd Jun', International: 60, UK: 70, ThirdToThird: 20 },
  { day: '4th Jun', International: 80, UK: 100, ThirdToThird: 40 },
  { day: '5th Jun', International: 70, UK: 90, ThirdToThird: 30 },
  { day: '6th Jun', International: 100, UK: 120, ThirdToThird: 60 },
  { day: '7th Jun', International: 85, UK: 95, ThirdToThird: 30 },
];

export function WeeklyChart() {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h3 className="text-lg font-bold text-gray-900">Weekly Shipments</h3>
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#202E4A]"></div>
            <span className="text-xs font-semibold text-gray-500">International Shipments</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#081b4c]"></div>
            <span className="text-xs font-semibold text-gray-500">UK Shipments</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#4DB8FF]"></div>
            <span className="text-xs font-semibold text-gray-500">Third to Third</span>
          </div>
        </div>
      </div>
      
      <div className="h-[350px] w-full mt-auto">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
            <XAxis 
              dataKey="day" 
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
            <Bar dataKey="International" fill="#202E4A" radius={[4, 4, 0, 0]} />
            <Bar dataKey="UK" fill="#081b4c" radius={[4, 4, 0, 0]} />
            <Bar dataKey="ThirdToThird" fill="#4DB8FF" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
