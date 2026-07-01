"use client";

import { Package, Truck, Users, DollarSign, Clock, XCircle, TrendingUp, CheckCircle, Server, Globe } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const chartData = [
  { name: 'Mon', shipments: 4000 },
  { name: 'Tue', shipments: 3500 },
  { name: 'Wed', shipments: 5200 },
  { name: 'Thu', shipments: 4800 },
  { name: 'Fri', shipments: 6890 },
  { name: 'Sat', shipments: 7500 },
  { name: 'Sun', shipments: 8400 },
];

const metrics = [
  { title: "Total Shipments", value: "842,450", change: "+18%", icon: Package, color: "from-blue-500/20 to-indigo-500/20 text-indigo-600 dark:text-indigo-400" },
  { title: "Today's Shipments", value: "12,842", change: "+22%", icon: Package, color: "from-emerald-500/20 to-teal-500/20 text-emerald-600 dark:text-emerald-400" },
  { title: "Active Couriers", value: "14", change: "+2", icon: Truck, color: "from-amber-500/20 to-orange-500/20 text-orange-600 dark:text-orange-400" },
  { title: "Total Revenue", value: "$1.2M", change: "+34%", icon: DollarSign, color: "from-purple-500/20 to-pink-500/20 text-purple-600 dark:text-purple-400" },
];

const secondaryMetrics = [
  { title: "In Transit", value: "45,432", icon: Truck, color: "text-blue-500 bg-blue-500/10" },
  { title: "Pending Shipments", value: "3,212", icon: Clock, color: "text-amber-500 bg-amber-500/10" },
  { title: "Delivered", value: "780,123", icon: CheckCircle, color: "text-emerald-500 bg-emerald-500/10" },
  { title: "Failed Delivery", value: "421", icon: XCircle, color: "text-destructive bg-destructive/10" },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Global Shipments Dashboard</h1>
        <p className="text-muted-foreground text-lg">
          Live overview of shipment volumes, revenue, and active courier API connections.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <div key={metric.title} className="relative overflow-hidden rounded-2xl border border-border/50 bg-card p-6 shadow-sm hover:shadow-md transition-shadow group">
            <div className={`absolute top-0 right-0 p-32 bg-gradient-to-bl opacity-20 -z-10 group-hover:scale-110 transition-transform duration-500 ${metric.color}`} />
            <div className="flex flex-row items-center justify-between pb-4">
              <h3 className="tracking-tight text-sm font-medium text-muted-foreground">{metric.title}</h3>
              <div className={`p-2 rounded-xl bg-gradient-to-br ${metric.color}`}>
                <metric.icon className="h-5 w-5" />
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold">{metric.value}</div>
              <p className="text-sm font-medium mt-2 flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                <TrendingUp className="h-4 w-4" />
                {metric.change} <span className="text-muted-foreground font-normal ml-1">vs last month</span>
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {secondaryMetrics.map((metric) => (
          <div key={metric.title} className="rounded-2xl border border-border/50 bg-card p-4 shadow-sm flex items-center gap-4">
            <div className={`p-3 rounded-xl ${metric.color}`}>
              <metric.icon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
              <h4 className="text-2xl font-bold">{metric.value}</h4>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <div className="rounded-2xl border border-border/50 bg-card shadow-sm lg:col-span-4 p-6 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-lg tracking-tight">Global Shipment Volume</h3>
            <select className="bg-muted/50 border-none text-sm rounded-lg px-3 py-1.5 focus:ring-1 focus:ring-primary/50 outline-none">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>This Year</option>
            </select>
          </div>
          <div className="flex-1 min-h-[300px] w-full bg-muted/20 rounded-xl border border-border/30 p-4 pt-6">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorShipments" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" className="opacity-10" />
                <XAxis dataKey="name" stroke="currentColor" className="opacity-50 text-xs" tickLine={false} axisLine={false} />
                <YAxis stroke="currentColor" className="opacity-50 text-xs" tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '0.75rem', fontSize: '12px' }}
                  itemStyle={{ color: 'hsl(var(--foreground))' }}
                />
                <Area type="monotone" dataKey="shipments" stroke="#3b82f6" fillOpacity={1} fill="url(#colorShipments)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="rounded-2xl border border-border/50 bg-card shadow-sm lg:col-span-3 p-6 flex flex-col">
          <h3 className="font-semibold text-lg tracking-tight mb-6">Courier API Health</h3>
          <div className="space-y-4 flex-1 overflow-y-auto pr-2 custom-scrollbar">
            {['FedEx', 'DHL', 'UPS', 'USPS', 'Aramex'].map((courier, index) => (
              <div key={courier} className="flex items-center justify-between p-3 rounded-xl border border-border/50 bg-muted/30">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shadow-sm">
                    <Server className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{courier}</p>
                    <p className="text-xs text-emerald-500 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Connected
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-medium">Latency</p>
                  <p className="text-sm font-bold">{45 + index * 12}ms</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
