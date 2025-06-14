
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface InvoiceHeaderProps {
  invoiceNumber: string;
  date: string;
  onUpdate: (field: string, value: string) => void;
}

const InvoiceHeader = ({ invoiceNumber, date, onUpdate }: InvoiceHeaderProps) => {
  return (
    <div className="border-b-2 border-[#3bbceb] pb-6 mb-8">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-bold text-[#3bbceb] mb-2">INVOICE</h1>
          <p className="text-sm text-gray-600">Original Copy</p>
        </div>
        
        <div className="text-right space-y-4 min-w-[300px]">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <Label htmlFor="invoiceNumber" className="text-gray-700 font-medium">
                Invoice No.
              </Label>
              <Input
                id="invoiceNumber"
                value={invoiceNumber}
                onChange={(e) => onUpdate('invoiceNumber', e.target.value)}
                className="border-[#3bbceb] focus:ring-[#3bbceb]"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="date" className="text-gray-700 font-medium">
                Dated
              </Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => onUpdate('date', e.target.value)}
                className="border-[#3bbceb] focus:ring-[#3bbceb]"
              />
            </div>
          </div>
          
          <div className="text-xs text-gray-500 space-y-1">
            <div>Delivery Note</div>
            <div>Mode/Terms of Payment</div>
            <div>Reference No. & Date.</div>
            <div>Other References</div>
            <div>Buyer's Order No.</div>
            <div>Dated</div>
            <div>Dispatch Doc No.</div>
            <div>Delivery Note Date</div>
            <div>Dispatched through</div>
            <div>Destination</div>
            <div>Terms of Delivery</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceHeader;
