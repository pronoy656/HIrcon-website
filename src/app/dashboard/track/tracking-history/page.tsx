import { TrackingHistoryList } from "@/components/dashboard/track/tracking-history/TrackingHistoryList";
import { TrackingFilterBar } from "@/components/dashboard/track/tracking-history/TrackingFilterBar";

export default function TrackingHistoryPage() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] p-8">
      <div className="w-full xl:max-w-[1600px] mx-auto flex flex-col gap-6 overflow-x-auto pb-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2 tracking-tight">Tracking History</h1>
          <p className="text-gray-500 font-medium">Monitor your active and past shipments.</p>
        </div>
        
        <TrackingFilterBar />
        <TrackingHistoryList />
      </div>
    </div>
  );
}
