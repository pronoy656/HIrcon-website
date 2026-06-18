import { Search, Plus, Filter } from "lucide-react";
import { ProductTable } from "@/components/dashboard/products/ProductTable";
import { Pagination } from "@/components/common/Pagination";

export default function ProductsPage() {

  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2 tracking-tight">Products</h1>
          <p className="text-gray-500 font-medium">Manage your product inventory and catalogs.</p>
        </div>
        <button className="bg-[#0b215f] hover:bg-blue-950 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-colors shadow-sm">
          <Plus className="w-5 h-5" />
          Add Product
        </button>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Toolbar */}
        <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search products by name or SKU..." 
              className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 transition-all"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 font-medium text-sm transition-colors w-full sm:w-auto justify-center">
            <Filter className="w-4 h-4 text-gray-500" />
            Filter
          </button>
        </div>

        {/* Table */}
        <ProductTable />
        
        {/* Pagination */}
        <Pagination 
          currentPage={1}
          totalPages={4}
          totalItems={24}
          startItem={1}
          endItem={6}
          itemName="products"
        />
      </div>
    </div>
  );
}
