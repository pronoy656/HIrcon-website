"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList } from 'recharts';

const data = [
  { month: 'Jan', International: 120, UK: 180 },
  { month: 'Feb', International: 150, UK: 160 },
  { month: 'Mar', International: 180, UK: 220 },
  { month: 'Apr', International: 140, UK: 200 },
  { month: 'May', International: 210, UK: 240 },
  { month: 'Jun', International: 250, UK: 280 },
  { month: 'Jul', International: 220, UK: 260 },
  { month: 'Aug', International: 190, UK: 210 },
  { month: 'Sep', International: 230, UK: 270 },
  { month: 'Oct', International: 260, UK: 310 },
  { month: 'Nov', International: 290, UK: 340 },
  { month: 'Dec', International: 320, UK: 380 },
];

export function MonthlyChart() {
  return (
    <div 
      className="pt-8 pb-14 px-6 rounded-2xl shadow-xl border border-[#10234a] flex flex-col h-full w-full relative overflow-hidden"
      style={{ background: 'linear-gradient(216.06deg, #01387B 3.2%, #002A5C 105.02%)' }}
    >
      {/* Top light effect */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent"></div>
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-blue-400/15 blur-[40px] rounded-full pointer-events-none z-0"></div>

      <div className="flex flex-col items-center mb-10 gap-3 z-10 relative">
        <h3 className="text-[22px] md:text-[26px] font-bold text-white tracking-wide">Monthly Shipments</h3>
        
        <div className="flex flex-wrap justify-center items-center gap-5 mt-1">
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
          <BarChart data={data} margin={{ top: 25, right: 20, left: -20, bottom: 15 }} barGap={5}>
            <CartesianGrid 
              strokeDasharray="0" 
              vertical={false} 
              stroke="transparent" 
              horizontalFill={['#033D86', 'transparent']}
            />
            <XAxis 
              dataKey="month" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#ffffff', fontSize: 13, fontWeight: 500 }}
              dy={15}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#d1d5db', fontSize: 12, fontWeight: 500 }}
              domain={[0, 400]}
              ticks={[0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 320, 340, 360, 380, 400]}
              interval={0}
              tickFormatter={(value) => (value % 100 === 0 ? value : '')}
            />
            <Tooltip 
              cursor={{ fill: 'rgba(255,255,255,0.05)' }}
              contentStyle={{ backgroundColor: '#0f172a', borderRadius: '8px', border: '1px solid #1e293b', color: '#fff' }}
              itemStyle={{ color: '#fff' }}
            />
            <Bar dataKey="International" fill="#f97316" radius={[4, 4, 0, 0]} />
            <Bar dataKey="UK" fill="#7F79FF" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
