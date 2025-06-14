
import React, { useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';
import { InvoiceItem } from '../EditableInvoice';

interface ItemTableProps {
  items: InvoiceItem[];
  onUpdateItem: (itemId: string, field: keyof InvoiceItem, value: any) => void;
  onAddItem: () => void;
  onRemoveItem: (itemId: string) => void;
}

const ItemTable = ({ items, onUpdateItem, onAddItem, onRemoveItem }: ItemTableProps) => {
  const updateItemWithCalculation = (itemId: string, field: keyof InvoiceItem, value: any) => {
    const item = items.find(i => i.id === itemId);
    if (!item) return;

    const updatedItem = { ...item, [field]: value };
    
    // Auto-calculate amount when quantity or rate changes
    if (field === 'quantity' || field === 'rate') {
      updatedItem.amount = updatedItem.quantity * updatedItem.rate;
    }
    
    // Update all fields at once
    Object.keys(updatedItem).forEach(key => {
      onUpdateItem(itemId, key as keyof InvoiceItem, updatedItem[key as keyof InvoiceItem]);
    });
  };

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-[#3bbceb]">Items</h3>
        <Button 
          onClick={onAddItem}
          size="sm"
          className="bg-[#3bbceb] hover:bg-[#2da8d8] flex items-center gap-2"
        >
          <Plus size={16} />
          Add Item
        </Button>
      </div>
      
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
              <th className="px-4 py-3 text-center text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="px-4 py-3 text-sm font-medium text-gray-900">
                  {index + 1}
                </td>
                <td className="px-4 py-3">
                  <Input
                    value={item.description}
                    onChange={(e) => onUpdateItem(item.id, 'description', e.target.value)}
                    className="border-transparent focus:border-[#3bbceb] focus:ring-[#3bbceb]"
                    placeholder="Item description"
                  />
                </td>
                <td className="px-4 py-3">
                  <Input
                    value={item.hsn}
                    onChange={(e) => onUpdateItem(item.id, 'hsn', e.target.value)}
                    className="border-transparent focus:border-[#3bbceb] focus:ring-[#3bbceb]"
                    placeholder="HSN Code"
                  />
                </td>
                <td className="px-4 py-3">
                  <Input
                    type="number"
                    value={item.gstRate}
                    onChange={(e) => onUpdateItem(item.id, 'gstRate', parseFloat(e.target.value) || 0)}
                    className="border-transparent focus:border-[#3bbceb] focus:ring-[#3bbceb]"
                    placeholder="5"
                  />
                </td>
                <td className="px-4 py-3">
                  <Input
                    type="number"
                    step="0.01"
                    value={item.quantity}
                    onChange={(e) => updateItemWithCalculation(item.id, 'quantity', parseFloat(e.target.value) || 0)}
                    className="border-transparent focus:border-[#3bbceb] focus:ring-[#3bbceb]"
                    placeholder="0"
                  />
                </td>
                <td className="px-4 py-3">
                  <Input
                    type="number"
                    step="0.01"
                    value={item.rate}
                    onChange={(e) => updateItemWithCalculation(item.id, 'rate', parseFloat(e.target.value) || 0)}
                    className="border-transparent focus:border-[#3bbceb] focus:ring-[#3bbceb]"
                    placeholder="0.00"
                  />
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  CFT
                </td>
                <td className="px-4 py-3">
                  <Input
                    type="number"
                    step="0.01"
                    value={item.amount}
                    onChange={(e) => onUpdateItem(item.id, 'amount', parseFloat(e.target.value) || 0)}
                    className="border-transparent focus:border-[#3bbceb] focus:ring-[#3bbceb] font-semibold text-[#3bbceb]"
                    placeholder="0.00"
                  />
                </td>
                <td className="px-4 py-3 text-center">
                  {items.length > 1 && (
                    <Button
                      onClick={() => onRemoveItem(item.id)}
                      variant="ghost"
                      size="sm"
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 size={16} />
                    </Button>
                  )}
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
