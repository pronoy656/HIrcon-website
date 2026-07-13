"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { name: 'FedEx', value: 400 },
  { name: 'DHL', value: 300 },
  { name: 'UPS', value: 200 },
  { name: 'USPS', value: 100 },
];

// FedEx: Purple, DHL: Yellow, UPS: Light Blue, USPS: Dark Blue
const COLORS = ['#7F79FF', '#C4AA49', '#4DB8FF', '#004B87'];

export function ServiceProviderChart() {
  return (
    <div 
      className="pt-8 pb-14 px-6 rounded-2xl shadow-xl border border-[#10234a] flex flex-col h-full w-full relative overflow-hidden"
      style={{ background: 'linear-gradient(216.06deg, #01387B 3.2%, #002A5C 105.02%)' }}
    >
      {/* Top light effect */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent"></div>
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-blue-400/15 blur-[40px] rounded-full pointer-events-none z-0"></div>

      <h3 className="text-[22px] md:text-[26px] font-bold text-white tracking-wide mb-6 text-center relative z-10">Service Provider Distribution</h3>
      <div className="h-[350px] w-full mt-auto relative z-10">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={120}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ backgroundColor: '#0f172a', borderRadius: '8px', border: '1px solid #1e293b', color: '#fff' }}
              itemStyle={{ color: '#fff' }}
            />
            <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ color: '#d1d5db' }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
