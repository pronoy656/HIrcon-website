"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList } from 'recharts';

const data = [
  { day: '1st Jun', International: 40, UK: 60 },
  { day: '2nd Jun', International: 50, UK: 80 },
  { day: '3rd Jun', International: 60, UK: 70 },
  { day: '4th Jun', International: 80, UK: 100 },
  { day: '5th Jun', International: 70, UK: 90 },
  { day: '6th Jun', International: 100, UK: 120 },
  { day: '7th Jun', International: 85, UK: 95 },
];

export function WeeklyChart() {
  return (
    <div className="bg-[#031E54] pt-8 pb-14 px-6 rounded-2xl shadow-xl border border-[#082E7A] flex flex-col h-full w-full relative overflow-hidden">
      <div className="flex flex-col items-center mb-10 gap-3 z-10 relative">
        <h3 className="text-[22px] md:text-[26px] font-bold text-white tracking-wide">Weekly Shipments</h3>
        
        <div className="flex items-center gap-5 mt-1">
          <div className="flex items-center gap-2">
            <div className="w-3.5 h-3.5 rounded-full bg-[#D6A539] border-[1.5px] border-white/20"></div>
            <span className="text-sm font-semibold text-gray-200">International Shipments</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3.5 h-3.5 rounded-full bg-[#8561F6] border-[1.5px] border-white/20"></div>
            <span className="text-sm font-semibold text-gray-200">UK Shipments</span>
          </div>
        </div>
      </div>
      
      <div className="h-[380px] w-full mt-auto relative z-10">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 25, right: 20, left: -20, bottom: 15 }} barGap={10}>
            <CartesianGrid 
              strokeDasharray="0" 
              vertical={false} 
              stroke="rgba(255, 255, 255, 0.04)" 
              horizontalFill={['rgba(255,255,255,0.02)', 'transparent']}
            />
            <XAxis 
              dataKey="day" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#ffffff', fontSize: 13, fontWeight: 500 }}
              dy={15}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#d1d5db', fontSize: 12, fontWeight: 500 }}
            />
            <Tooltip 
              cursor={{ fill: 'rgba(255,255,255,0.05)' }}
              contentStyle={{ backgroundColor: '#0f172a', borderRadius: '8px', border: '1px solid #1e293b', color: '#fff' }}
              itemStyle={{ color: '#fff' }}
            />
            <Bar dataKey="International" fill="#D6A539" radius={[4, 4, 0, 0]} barSize={25}>
              <LabelList dataKey="International" position="top" fill="#ffffff" fontSize={11} fontWeight={600} dy={-6} />
            </Bar>
            <Bar dataKey="UK" fill="#8561F6" radius={[4, 4, 0, 0]} barSize={25}>
              <LabelList dataKey="UK" position="top" fill="#ffffff" fontSize={11} fontWeight={600} dy={-6} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
