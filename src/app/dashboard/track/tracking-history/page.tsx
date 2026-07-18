import { TrackingHistoryList } from "@/components/features/tracking/tracking-history/TrackingHistoryList";
import { TrackingFilters, TrackingActions } from "@/components/features/tracking/tracking-history/TrackingFilterBar";

export default function TrackingHistoryPage() {
  return (
    <div className="animate-in fade-in duration-500">
      <div className="w-full xl:max-w-[1600px] mx-auto flex flex-col gap-6 overflow-x-auto pb-4">
        {/* Title and Filters row */}
        <div className="flex flex-col xl:flex-row justify-start items-start xl:items-center gap-8 xl:gap-12">
          <div>
            <h1 className="text-3xl font-extrabold text-white mb-2 tracking-tight">Tracking History</h1>
            <p className="text-blue-100 font-medium">Monitor your active and past shipments.</p>
          </div>
          <div>
            <TrackingFilters />
          </div>
        </div>

        {/* Actions row */}
        <div className="mt-2">
          <TrackingActions />
        </div>
        
        {/* White section with overlapping centered cards */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mt-12 relative pt-16">


          <TrackingHistoryList />
        </div>
      </div>
    </div>
  );
}
