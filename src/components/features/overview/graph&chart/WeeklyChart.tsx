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
    <div 
      className="pt-8 pb-14 px-6 rounded-2xl shadow-xl border border-[#10234a] flex flex-col h-full w-full relative overflow-hidden"
      style={{ background: 'linear-gradient(216.06deg, #01387B 3.2%, #002A5C 105.02%)' }}
    >
      {/* Top light effect */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent"></div>
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-blue-400/15 blur-[40px] rounded-full pointer-events-none z-0"></div>

      <div className="flex flex-col items-center mb-10 gap-3 z-10 relative">
        <h3 className="text-[22px] md:text-[26px] font-bold text-white tracking-wide">Weekly Shipments</h3>
        
        <div className="flex items-center gap-5 mt-1">
          <div className="flex items-center gap-2">
            <div className="w-3.5 h-3.5 rounded-full bg-[#f97316] border-[1.5px] border-white/20"></div>
            <span className="text-sm font-semibold text-gray-200">International Shipments</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3.5 h-3.5 rounded-full bg-[#7F79FF] border-[1.5px] border-white/20"></div>
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
              stroke="transparent" 
              horizontalFill={['#033D86', 'transparent']}
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
              domain={[0, 120]}
              ticks={[0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 105, 110, 115, 120]}
              interval={0}
              tickFormatter={(value) => (value % 30 === 0 ? value : '')}
            />
            <Tooltip 
              cursor={{ fill: 'rgba(255,255,255,0.05)' }}
              contentStyle={{ backgroundColor: '#0f172a', borderRadius: '8px', border: '1px solid #1e293b', color: '#fff' }}
              itemStyle={{ color: '#fff' }}
            />
            <Bar dataKey="International" fill="#f97316" radius={[4, 4, 0, 0]} barSize={25}>
              <LabelList dataKey="International" position="top" fill="#ffffff" fontSize={11} fontWeight={600} dy={-6} />
            </Bar>
            <Bar dataKey="UK" fill="#7F79FF" radius={[4, 4, 0, 0]} barSize={25}>
              <LabelList dataKey="UK" position="top" fill="#ffffff" fontSize={11} fontWeight={600} dy={-6} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
