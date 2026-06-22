"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Table } from "@/components/common/Table";
import { SelectField } from "@/components/common/SelectField";
import { Pagination } from "@/components/common/Pagination";

export function ExistingTab() {
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [showTable, setShowTable] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const platforms = [
    "BigCommerce",
    "Shopify",
    "WooCommerce",
    "Wix",
    "OpenCart",
    "Magento",
    "World Options",
  ];

  const platformOptions = platforms.map(p => ({ value: p, label: p }));

  const handleGoClick = () => {
    if (selectedPlatform) {
      setShowTable(true);
      setCurrentPage(1);
    }
  };

  const dummyData = [
    { id: 1, woField: "Order ID", isMandatory: true, mappedField: "" },
    { id: 2, woField: "Customer First Name", isMandatory: true, mappedField: "" },
    { id: 3, woField: "Customer Last Name", isMandatory: true, mappedField: "" },
    { id: 4, woField: "Customer Email", isMandatory: false, mappedField: "" },
    { id: 5, woField: "Customer Phone", isMandatory: false, mappedField: "" },
    { id: 6, woField: "Shipping Address 1", isMandatory: true, mappedField: "" },
    { id: 7, woField: "Shipping Address 2", isMandatory: false, mappedField: "" },
    { id: 8, woField: "Shipping City", isMandatory: true, mappedField: "" },
    { id: 9, woField: "Shipping State/Province", isMandatory: true, mappedField: "" },
    { id: 10, woField: "Shipping Zip/Postal Code", isMandatory: true, mappedField: "" },
    { id: 11, woField: "Shipping Country", isMandatory: true, mappedField: "" },
    { id: 12, woField: "Billing First Name", isMandatory: false, mappedField: "" },
    { id: 13, woField: "Billing Last Name", isMandatory: false, mappedField: "" },
    { id: 14, woField: "Billing Address 1", isMandatory: false, mappedField: "" },
    { id: 15, woField: "Billing City", isMandatory: false, mappedField: "" },
    { id: 16, woField: "Billing Zip", isMandatory: false, mappedField: "" },
    { id: 17, woField: "Billing Country", isMandatory: false, mappedField: "" },
    { id: 18, woField: "Package Weight", isMandatory: true, mappedField: "" },
    { id: 19, woField: "Package Length", isMandatory: false, mappedField: "" },
    { id: 20, woField: "Package Width", isMandatory: false, mappedField: "" },
    { id: 21, woField: "Package Height", isMandatory: false, mappedField: "" },
    { id: 22, woField: "Currency", isMandatory: true, mappedField: "" },
    { id: 23, woField: "Total Value", isMandatory: true, mappedField: "" },
    { id: 24, woField: "Shipping Method", isMandatory: true, mappedField: "" },
    { id: 25, woField: "Notes", isMandatory: false, mappedField: "" },
  ];

  const ITEMS_PER_PAGE = 15;
  const totalPages = Math.ceil(dummyData.length / ITEMS_PER_PAGE);
  const startItem = (currentPage - 1) * ITEMS_PER_PAGE + 1;
  const endItem = Math.min(currentPage * ITEMS_PER_PAGE, dummyData.length);
  const paginatedData = dummyData.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const mappedFieldOptions = [
    { value: "name", label: "Name" },
    { value: "email", label: "Email" },
    { value: "financial_status", label: "Financial Status" },
    { value: "paid_at", label: "Paid at" },
    { value: "fulfillment_status", label: "Fulfillment Status" },
    { value: "fulfilled_at", label: "Fulfilled at" },
    { value: "accepts_marketing", label: "Accepts Marketing" },
    { value: "currency", label: "Currency" },
    { value: "subtotal", label: "Subtotal" },
    { value: "shipping", label: "Shipping" },
    { value: "taxes", label: "Taxes" },
    { value: "total", label: "Total" },
    { value: "discount_code", label: "Discount Code" },
    { value: "discount_amount", label: "Discount Amount" },
    { value: "shipping_method", label: "Shipping Method" },
    { value: "created_at", label: "Created at" },
    { value: "lineitem_quantity", label: "Lineitem quantity" },
    { value: "lineitem_name", label: "Lineitem name" },
    { value: "lineitem_price", label: "Lineitem price" },
    { value: "lineitem_compare_at_price", label: "Lineitem compare at price" },
    { value: "lineitem_sku", label: "Lineitem sku" },
    { value: "lineitem_requires_shipping", label: "Lineitem requires shipping" },
    { value: "lineitem_taxable", label: "Lineitem taxable" },
    { value: "lineitem_fulfillment_status", label: "Lineitem fulfillment status" },
    { value: "billing_name", label: "Billing Name" },
    { value: "billing_street", label: "Billing Street" },
    { value: "billing_address_1", label: "Billing Address 1" },
    { value: "billing_address_2", label: "Billing Address 2" },
    { value: "billing_company", label: "Billing Company" },
    { value: "billing_city", label: "Billing City" },
    { value: "billing_zip", label: "Billing Zip" },
    { value: "billing_province", label: "Billing Province" },
    { value: "billing_country", label: "Billing Country" },
    { value: "billing_phone", label: "Billing Phone" },
    { value: "shipping_name", label: "Shipping Name" },
    { value: "shipping_street", label: "Shipping Street" },
    { value: "shipping_address_1", label: "Shipping Address 1" },
    { value: "shipping_address_2", label: "Shipping Address 2" },
    { value: "shipping_company", label: "Shipping Company" },
    { value: "shipping_city", label: "Shipping City" },
    { value: "shipping_zip", label: "Shipping Zip" },
    { value: "shipping_province", label: "Shipping Province" },
    { value: "shipping_country", label: "Shipping Country" },
    { value: "shipping_phone", label: "Shipping Phone" },
    { value: "notes", label: "Notes" },
    { value: "note_attributes", label: "Note Attributes" },
    { value: "cancelled_at", label: "Cancelled at" },
    { value: "payment_method", label: "Payment Method" },
    { value: "payment_reference", label: "Payment Reference" },
    { value: "refund_amount", label: "Refund Amount" },
    { value: "vendor", label: "Vendor" },
    { value: "outstanding_balance", label: "Outstanding Balance" },
    { value: "employee", label: "Employee" },
    { value: "location", label: "Location" },
    { value: "device_id", label: "Device ID" },
    { value: "id", label: "Id" },
    { value: "tags", label: "Tags" },
    { value: "risk_level", label: "Risk Level" },
    { value: "source", label: "Source" },
    { value: "lineitem_discount", label: "Lineitem discount" },
    { value: "tax_1_name", label: "Tax 1 Name" },
    { value: "tax_1_value", label: "Tax 1 Value" },
    { value: "tax_2_name", label: "Tax 2 Name" },
    { value: "tax_2_value", label: "Tax 2 Value" },
    { value: "tax_3_name", label: "Tax 3 Name" },
    { value: "tax_3_value", label: "Tax 3 Value" },
    { value: "tax_4_name", label: "Tax 4 Name" },
    { value: "tax_4_value", label: "Tax 4 Value" },
    { value: "tax_5_name", label: "Tax 5 Name" },
    { value: "tax_5_value", label: "Tax 5 Value" }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-end">
        <div className="flex-1 w-full max-w-sm">
          <SelectField
            label="Select Platform"
            options={platformOptions}
            value={selectedPlatform}
            onChange={(value) => {
              setSelectedPlatform(value);
              setShowTable(false);
              setCurrentPage(1);
            }}
            placeholder="Choose a platform..."
          />
        </div>
        <Button
          onClick={handleGoClick}
          disabled={!selectedPlatform}
          className="w-full sm:w-auto min-w-[120px] bg-[#0b215f] hover:bg-[#0b215f]/90 text-white h-[44px]"
        >
          Go
        </Button>
      </div>

      {/* Mapped Fields Table */}
      {showTable && (
        <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h3 className="text-lg font-bold text-[#0b215f] mb-4">
            Mapping for {selectedPlatform}
          </h3>
          
          <div className="rounded-xl border border-gray-200 overflow-visible">
            <Table headers={["World Options Field", "Is Mandatory", "Mapped Field"]}>
              {paginatedData.map((row) => (
                <tr key={row.id} className="hover:bg-blue-50/50 transition-colors">
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-semibold text-gray-800">
                    {row.woField}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${
                        row.isMandatory
                          ? "bg-red-100 text-red-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {row.isMandatory ? "True" : "False"}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    <SelectField
                      options={mappedFieldOptions}
                      placeholder="Select mapped field..."
                    />
                  </td>
                </tr>
              ))}
            </Table>
            
            {/* Pagination Component */}
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={dummyData.length}
                startItem={startItem}
                endItem={endItem}
                itemName="fields"
                onPageChange={(page) => setCurrentPage(page)}
              />
            )}
          </div>
          
          <div className="mt-6 flex justify-end">
            <Button className="bg-[#0b215f] hover:bg-[#0b215f]/90 text-white px-6 h-[44px]">
              Save Mapping
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
