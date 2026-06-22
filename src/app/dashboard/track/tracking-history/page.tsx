import { TrackingHistoryList } from "@/components/dashboard/track/tracking-history/TrackingHistoryList";
import { TrackingFilters, TrackingActions } from "@/components/dashboard/track/tracking-history/TrackingFilterBar";

export default function TrackingHistoryPage() {
  return (
    <div className="animate-in fade-in duration-500">
      <div className="w-full xl:max-w-[1600px] mx-auto flex flex-col gap-6 overflow-x-auto pb-4">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-white mb-2 tracking-tight">Tracking History</h1>
            <p className="text-blue-100 font-medium">Monitor your active and past shipments.</p>
          </div>
          <TrackingFilters />
        </div>
        
        <TrackingActions />
        
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mt-2">
          <TrackingHistoryList />
        </div>
      </div>
    </div>
  );
}
