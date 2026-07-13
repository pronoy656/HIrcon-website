"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { day: '1st Jun', shipments: 120 },
  { day: '2nd Jun', shipments: 180 },
  { day: '3rd Jun', shipments: 150 },
  { day: '4th Jun', shipments: 220 },
  { day: '5th Jun', shipments: 190 },
  { day: '6th Jun', shipments: 280 },
  { day: '7th Jun', shipments: 210 },
];

export function TotalWeeklyChart() {
  return (
    <div 
      className="pt-8 pb-14 px-6 rounded-2xl shadow-xl border border-[#10234a] flex flex-col h-full w-full relative overflow-hidden"
      style={{ background: 'linear-gradient(216.06deg, #01387B 3.2%, #002A5C 105.02%)' }}
    >
      {/* Top light effect */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent"></div>
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-blue-400/15 blur-[40px] rounded-full pointer-events-none z-0"></div>

      <h3 className="text-[22px] md:text-[26px] font-bold text-white tracking-wide mb-6 text-center relative z-10">Total Weekly Shipments</h3>
      <div className="h-[350px] w-full mt-auto relative z-10">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="0" vertical={false} stroke="transparent" horizontalFill={['#033D86', 'transparent']} />
            <XAxis 
              dataKey="day" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#ffffff', fontSize: 13, fontWeight: 500 }}
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#d1d5db', fontSize: 12, fontWeight: 500 }}
              domain={[0, 300]}
              ticks={[0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300]}
              interval={0}
              tickFormatter={(value) => (value % 100 === 0 ? value : '')}
            />
            <Tooltip 
              cursor={{ fill: 'rgba(255,255,255,0.05)' }}
              contentStyle={{ backgroundColor: '#0f172a', borderRadius: '8px', border: '1px solid #1e293b', color: '#fff' }}
              itemStyle={{ color: '#fff' }}
            />
            <Bar dataKey="shipments" fill="#7F79FF" radius={[4, 4, 0, 0]} barSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
