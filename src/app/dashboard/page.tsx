import { WeeklyChart } from "@/components/features/overview/graph&chart/WeeklyChart";
import { MonthlyChart } from "@/components/features/overview/graph&chart/MonthlyChart";
import { ServiceProviderChart } from "@/components/features/overview/graph&chart/ServiceProviderChart";
import { TotalWeeklyChart } from "@/components/features/overview/graph&chart/TotalWeeklyChart";
import { StatCards } from "@/components/features/overview/graph&chart/StatCards";
import { RecentShipments } from "@/components/features/overview/graph&chart/RecentShipments";
import { ExceptionList } from "@/components/features/overview/graph&chart/ExceptionList";

export default function DashboardOverview() { 
  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-extrabold text-white mb-2 tracking-tight">Overview</h1>
        <p className="text-blue-100 font-medium">Track and analyze your shipment statistics.</p>
      </div>

      <StatCards />
      
      <ExceptionList />

      {/* Row 1 */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <div className="min-w-0">
          <WeeklyChart />
        </div>
        <div className="min-w-0">
          <MonthlyChart />
        </div>
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <div className="min-w-0">
          <TotalWeeklyChart />
        </div>
        <div className="min-w-0">
          <ServiceProviderChart />
        </div>
      </div>

      <RecentShipments />
    </div>
  ); 
}

