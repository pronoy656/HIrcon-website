import { Users, Briefcase, FileText, ArrowUpRight } from "lucide-react";

const metrics = [
  { title: "Total Users", value: "12,450", change: "+12%", icon: Users },
  { title: "Active Jobs", value: "842", change: "+5%", icon: Briefcase },
  { title: "Applications", value: "3,210", change: "+18%", icon: FileText },
  { title: "New Connections", value: "8,432", change: "+24%", icon: ArrowUpRight },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
        <p className="text-muted-foreground mt-2">
          Monitor your platform's health and core metrics.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <div key={metric.title} className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
            <div className="flex flex-row items-center justify-between pb-2 space-y-0">
              <h3 className="tracking-tight text-sm font-medium">{metric.title}</h3>
              <metric.icon className="h-4 w-4 text-muted-foreground" />
            </div>
            <div>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-emerald-500 font-medium">{metric.change}</span> from last month
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm lg:col-span-4 p-6">
          <h3 className="font-semibold leading-none tracking-tight mb-4">Overview</h3>
          <div className="h-[300px] w-full bg-muted/50 rounded-md flex items-center justify-center text-muted-foreground">
            {/* Placeholder for Recharts implementation */}
            Chart Data Visualization
          </div>
        </div>
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm lg:col-span-3 p-6">
          <h3 className="font-semibold leading-none tracking-tight mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="h-9 w-9 rounded-full bg-muted flex items-center justify-center text-xs font-medium">
                  {`U${i}`}
                </div>
                <div className="grid gap-1 text-sm">
                  <p className="font-medium leading-none">New user registered</p>
                  <p className="text-muted-foreground">user{i}@example.com</p>
                </div>
                <div className="ml-auto text-xs text-muted-foreground">
                  Just now
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
