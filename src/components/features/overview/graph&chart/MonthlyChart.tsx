"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList } from 'recharts';

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
    <div className="bg-[#031E54] pt-8 pb-14 px-6 rounded-2xl shadow-xl border border-[#082E7A] flex flex-col h-full w-full relative overflow-hidden">
      <div className="flex flex-col items-center mb-10 gap-3 z-10 relative">
        <h3 className="text-[22px] md:text-[26px] font-bold text-white tracking-wide">Monthly Shipments</h3>
        
        <div className="flex flex-wrap justify-center items-center gap-5 mt-1">
          <div className="flex items-center gap-2">
            <div className="w-3.5 h-3.5 rounded-full bg-[#D6A539] border-[1.5px] border-white/20"></div>
            <span className="text-sm font-semibold text-gray-200">International Shipments</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3.5 h-3.5 rounded-full bg-[#4DB8FF] border-[1.5px] border-white/20"></div>
            <span className="text-sm font-semibold text-gray-200">UK Shipments</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3.5 h-3.5 rounded-full bg-[#8561F6] border-[1.5px] border-white/20"></div>
            <span className="text-sm font-semibold text-gray-200">Third to Third Shipments</span>
          </div>
        </div>
      </div>
      
      <div className="h-[380px] w-full mt-auto relative z-10">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 25, right: 20, left: -20, bottom: 15 }} barGap={5}>
            <CartesianGrid 
              strokeDasharray="0" 
              vertical={false} 
              stroke="rgba(255, 255, 255, 0.04)" 
              horizontalFill={['rgba(255,255,255,0.02)', 'transparent']}
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
            />
            <Tooltip 
              cursor={{ fill: 'rgba(255,255,255,0.05)' }}
              contentStyle={{ backgroundColor: '#0f172a', borderRadius: '8px', border: '1px solid #1e293b', color: '#fff' }}
              itemStyle={{ color: '#fff' }}
            />
            <Bar dataKey="International" fill="#D6A539" radius={[4, 4, 0, 0]} />
            <Bar dataKey="UK" fill="#4DB8FF" radius={[4, 4, 0, 0]} />
            <Bar dataKey="ThirdToThird" fill="#8561F6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
