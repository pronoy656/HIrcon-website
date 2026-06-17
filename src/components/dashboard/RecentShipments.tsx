"use client";

import clsx from "clsx";

export function RecentShipments() {
  const shipments = [
    { id: "SHP-1024", date: "18 Jun, 2026", destination: "New York, USA", client: "Acme Corp", status: "Delivered", amount: "$340.00" },
    { id: "SHP-1023", date: "17 Jun, 2026", destination: "London, UK", client: "TechFlow Ltd", status: "In Transit", amount: "$120.00" },
    { id: "SHP-1022", date: "17 Jun, 2026", destination: "Berlin, DE", client: "Global Industries", status: "Pending", amount: "$850.50" },
    { id: "SHP-1021", date: "15 Jun, 2026", destination: "Toronto, CA", client: "Maple Retail", status: "Delivered", amount: "$210.25" },
    { id: "SHP-1020", date: "14 Jun, 2026", destination: "Sydney, AU", client: "Oceanic Co.", status: "Delayed", amount: "$530.00" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered": return "bg-green-100 text-green-700";
      case "In Transit": return "bg-blue-100 text-blue-700";
      case "Pending": return "bg-orange-100 text-orange-700";
      case "Delayed": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 w-full overflow-hidden">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-gray-900">Recent Shipments</h3>
        <button className="text-sm font-bold text-[#E8500A] hover:text-orange-700">View All</button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="pb-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Tracking ID</th>
              <th className="pb-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Date</th>
              <th className="pb-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Client</th>
              <th className="pb-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Destination</th>
              <th className="pb-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Amount</th>
              <th className="pb-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {shipments.map((shipment) => (
              <tr key={shipment.id} className="hover:bg-gray-50 transition-colors">
                <td className="py-4 text-sm font-bold text-gray-900">{shipment.id}</td>
                <td className="py-4 text-sm text-gray-500 font-medium">{shipment.date}</td>
                <td className="py-4 text-sm text-gray-900 font-medium">{shipment.client}</td>
                <td className="py-4 text-sm text-gray-500">{shipment.destination}</td>
                <td className="py-4 text-sm font-semibold text-gray-900">{shipment.amount}</td>
                <td className="py-4 text-sm">
                  <span className={clsx("px-3 py-1 rounded-full text-xs font-bold", getStatusColor(shipment.status))}>
                    {shipment.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
