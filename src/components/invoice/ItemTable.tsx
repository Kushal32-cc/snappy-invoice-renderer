
import React from 'react';
import { InvoiceItem } from '../EditableInvoice';

interface ItemTableProps {
  items: InvoiceItem[];
}

const ItemTable = ({ items }: ItemTableProps) => {
  return (
    <div className="mb-8">
      <div className="overflow-x-auto bg-white rounded-lg shadow-lg border border-[#3bbceb]/20">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-[#3bbceb] to-[#2da8d8] text-white">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold">Sl No.</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Description of Goods</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">HSN/SAC</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">GST Rate</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Quantity</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Rate</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">per</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Amount</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="px-4 py-3 text-sm font-medium text-gray-900">
                  {index + 1}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900">
                  {item.description}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900">
                  {item.hsn}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900">
                  {item.gstRate}%
                </td>
                <td className="px-4 py-3 text-sm text-gray-900">
                  {item.quantity}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900">
                  {item.rate.toFixed(2)}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  CFT
                </td>
                <td className="px-4 py-3 text-sm font-semibold text-[#3bbceb]">
                  {item.amount.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ItemTable;
