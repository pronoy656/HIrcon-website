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
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 flex gap-4 w-max">
            <div className="bg-green-50 px-8 py-3 rounded-xl border border-green-100 shadow-md flex flex-col justify-center items-center min-w-[180px]">
              <span className="text-green-700 font-semibold text-[11px] uppercase tracking-wider">Delivered</span>
              <span className="text-2xl font-bold text-green-900 mt-1">124</span>
            </div>
            <div className="bg-orange-50 px-8 py-3 rounded-xl border border-orange-100 shadow-md flex flex-col justify-center items-center min-w-[180px]">
              <span className="text-orange-700 font-semibold text-[11px] uppercase tracking-wider">In Transit</span>
              <span className="text-2xl font-bold text-orange-900 mt-1">45</span>
            </div>
            <div className="bg-red-50 px-8 py-3 rounded-xl border border-red-100 shadow-md flex flex-col justify-center items-center min-w-[180px]">
              <span className="text-red-700 font-semibold text-[11px] uppercase tracking-wider">Exceptions</span>
              <span className="text-2xl font-bold text-red-900 mt-1">3</span>
            </div>
          </div>

          <TrackingHistoryList />
        </div>
      </div>
    </div>
  );
}
