import { WeeklyChart } from "../../components/dashboard/overview/graph&chart/WeeklyChart";
import { MonthlyChart } from "../../components/dashboard/overview/graph&chart/MonthlyChart";
import { StatCards } from "../../components/dashboard/overview/graph&chart/StatCards";
import { RecentShipments } from "../../components/dashboard/overview/graph&chart/RecentShipments";

export default function DashboardOverview() { 
  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2 tracking-tight">Overview</h1>
        <p className="text-gray-500 font-medium">Track and analyze your shipment statistics.</p>
      </div>

      <StatCards />

      <div className="flex flex-col xl:flex-row gap-8">
        <div className="flex-1 min-w-0">
          <WeeklyChart />
        </div>
        <div className="flex-1 min-w-0">
          <MonthlyChart />
        </div>
      </div>

      <RecentShipments />
    </div>
  ); 
}

