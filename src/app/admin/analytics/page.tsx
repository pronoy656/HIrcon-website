import { BarChart3, TrendingUp, PieChart, Activity } from "lucide-react";

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
      <div className="flex flex-col gap-1.5">
        <h1 className="text-3xl font-extrabold tracking-tight">Analytics & Insights</h1>
        <p className="text-muted-foreground">
          Deep dive into platform performance and user engagement.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-2xl border border-border/50 bg-card/80 backdrop-blur-md p-6 shadow-sm flex flex-col items-center justify-center min-h-[250px]">
          <PieChart className="w-12 h-12 text-primary/40 mb-4" />
          <h3 className="font-medium text-lg">User Demographics</h3>
          <p className="text-sm text-muted-foreground mt-1 text-center">Chart placeholder for user segments</p>
        </div>
        <div className="rounded-2xl border border-border/50 bg-card/80 backdrop-blur-md p-6 shadow-sm flex flex-col items-center justify-center min-h-[250px]">
          <TrendingUp className="w-12 h-12 text-emerald-500/40 mb-4" />
          <h3 className="font-medium text-lg">Job Posting Trends</h3>
          <p className="text-sm text-muted-foreground mt-1 text-center">Chart placeholder for job growth</p>
        </div>
        <div className="rounded-2xl border border-border/50 bg-card/80 backdrop-blur-md p-6 shadow-sm flex flex-col items-center justify-center min-h-[250px]">
          <Activity className="w-12 h-12 text-indigo-500/40 mb-4" />
          <h3 className="font-medium text-lg">System Health</h3>
          <p className="text-sm text-muted-foreground mt-1 text-center">Uptime and API usage metrics</p>
        </div>
      </div>
    </div>
  );
}
