"use client";

import { Package, Edit2, MoreHorizontal } from "lucide-react";
import clsx from "clsx";
import { Table } from "@/components/common/Table";

const products = [
  { id: "PRD-001", sku: "SKU-8921", name: "Wireless Bluetooth Headphones", category: "Electronics", price: "$129.99", stock: "In Stock", stockCount: 145 },
  { id: "PRD-002", sku: "SKU-8922", name: "Ergonomic Office Chair", category: "Furniture", price: "$249.50", stock: "Low Stock", stockCount: 12 },
  { id: "PRD-003", sku: "SKU-8923", name: "Mechanical Gaming Keyboard", category: "Electronics", price: "$159.00", stock: "In Stock", stockCount: 89 },
  { id: "PRD-004", sku: "SKU-8924", name: "Ceramic Coffee Mug Set", category: "Kitchen", price: "$34.99", stock: "Out of Stock", stockCount: 0 },
  { id: "PRD-005", sku: "SKU-8925", name: "Yoga Mat with Alignment Lines", category: "Fitness", price: "$45.00", stock: "In Stock", stockCount: 230 },
  { id: "PRD-006", sku: "SKU-8926", name: "Noise Cancelling Earbuds", category: "Electronics", price: "$199.99", stock: "In Stock", stockCount: 56 },
];

export function ProductTable() {
  const getStockColor = (status: string) => {
    switch (status) {
      case "In Stock": return "bg-green-100 text-green-700";
      case "Low Stock": return "bg-orange-100 text-orange-700";
      case "Out of Stock": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const headers = [
    "Product ID", "Product Name", "SKU", "Category", 
    "Price", "Stock Status", "Quantity", "Action"
  ];

  return (
    <Table headers={headers}>
      {products.map((product) => (
        <tr key={product.id} className="hover:bg-gray-50/80 transition-colors group">
          <td className="py-4 px-6 text-sm text-gray-500 font-medium">{product.id}</td>
          <td className="py-4 px-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center flex-shrink-0">
                <Package className="w-5 h-5 text-gray-400" />
              </div>
              <p className="text-sm font-bold text-gray-900">{product.name}</p>
            </div>
          </td>
          <td className="py-4 px-6 text-sm text-gray-600 font-medium">{product.sku}</td>
          <td className="py-4 px-6">
            <span className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs font-semibold">
              {product.category}
            </span>
          </td>
          <td className="py-4 px-6 text-sm font-bold text-gray-900">{product.price}</td>
          <td className="py-4 px-6">
            <span className={clsx("px-2.5 py-1 rounded-full text-xs font-bold whitespace-nowrap", getStockColor(product.stock))}>
              {product.stock}
            </span>
          </td>
          <td className="py-4 px-6 text-sm font-medium text-gray-600">
            {product.stockCount}
          </td>
          <td className="py-4 px-6">
            <div className="flex items-center justify-end gap-2">
              <button className="p-2 text-gray-400 hover:text-[#E8500A] hover:bg-orange-50 rounded-lg transition-colors">
                <Edit2 className="w-4 h-4" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
          </td>
        </tr>
      ))}
    </Table>
  );
}
