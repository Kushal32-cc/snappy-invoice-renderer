
import React, { useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { toPng } from 'html-to-image';
import { toast } from '@/hooks/use-toast';

interface InvoiceData {
  invoiceNumber: string;
  rawTo: {
    name: string;
    address: string;
  };
  billTo: {
    name: string;
    address: string;
  };
  deliveryDate: string;
  truckDriver: string;
  quantity: string;
  items: Array<{
    description: string;
    quantity: number;
    rate: number;
    amount: number;
  }>;
  total: number;
  signature: string;
  deliveryNoteLink: string;
  mapImage?: string;
}

interface InvoiceProps {
  data: InvoiceData;
}

const Invoice: React.FC<InvoiceProps> = ({ data }) => {
  const invoiceRef = useRef<HTMLDivElement>(null);

  const downloadInvoice = async () => {
    if (invoiceRef.current === null) {
      return;
    }

    try {
      const dataUrl = await toPng(invoiceRef.current, {
        quality: 0.95,
        pixelRatio: 2,
        backgroundColor: '#ffffff',
      });
      
      const link = document.createElement('a');
      link.download = `invoice-${data.invoiceNumber}.png`;
      link.href = dataUrl;
      link.click();
      
      toast({
        title: "Invoice Downloaded",
        description: "Your invoice has been saved as an image.",
      });
    } catch (error) {
      console.error('Error downloading invoice:', error);
      toast({
        title: "Download Failed",
        description: "There was an error downloading the invoice.",
        variant: "destructive",
      });
    }
  };

  const getCompanyInitial = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Invoice Management</h1>
          <Button onClick={downloadInvoice} className="flex items-center gap-2">
            <Download size={16} />
            Download Invoice
          </Button>
        </div>

        <Card ref={invoiceRef} className="p-8 bg-white shadow-lg">
          {/* Header */}
          <div className="flex justify-between items-start mb-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-orange-500 text-white rounded-lg flex items-center justify-center text-2xl font-bold">
                {getCompanyInitial(data.rawTo.name)}
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{data.rawTo.name}</h2>
              </div>
            </div>
            <div className="text-right">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">INVOICE</h1>
              <p className="text-gray-600">{data.invoiceNumber}</p>
            </div>
          </div>

          {/* Addresses */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Raw To:</h3>
              <div className="text-gray-700">
                <p className="font-medium">{data.rawTo.name}</p>
                <p className="whitespace-pre-line">{data.rawTo.address}</p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Bill To:</h3>
              <div className="text-gray-700">
                <p className="font-medium">{data.billTo.name}</p>
                <p className="whitespace-pre-line">{data.billTo.address}</p>
              </div>
            </div>
          </div>

          {/* Delivery Details */}
          <div className="grid md:grid-cols-3 gap-6 mb-8 p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="text-sm font-medium text-gray-600">Delivery Date:</p>
              <p className="text-gray-900">{data.deliveryDate}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Truck/Driver:</p>
              <p className="text-gray-900">{data.truckDriver}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Quantity:</p>
              <p className="text-gray-900">{data.quantity}</p>
            </div>
          </div>

          {/* Items Table */}
          <div className="mb-8">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 font-semibold text-gray-900">Description</th>
                  <th className="text-right py-3 font-semibold text-gray-900">Quantity</th>
                  <th className="text-right py-3 font-semibold text-gray-900">Rate</th>
                  <th className="text-right py-3 font-semibold text-gray-900">Amount</th>
                </tr>
              </thead>
              <tbody>
                {data.items.map((item, index) => (
                  <tr key={index} className="border-b border-gray-100">
                    <td className="py-3 text-gray-900">{item.description}</td>
                    <td className="py-3 text-right text-gray-900">{item.quantity}</td>
                    <td className="py-3 text-right text-gray-900">{item.rate.toFixed(2)}</td>
                    <td className="py-3 text-right text-gray-900">{item.amount.toFixed(2)}</td>
                  </tr>
                ))}
                <tr className="border-t-2 border-gray-200">
                  <td colSpan={3} className="py-4 text-right font-semibold text-gray-900">Total</td>
                  <td className="py-4 text-right font-bold text-lg text-gray-900">{data.total.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Signature and Map Section */}
          <div className="grid md:grid-cols-2 gap-8 mb-6">
            <div>
              <div className="mb-4">
                <div className="h-16 border-b border-gray-300 mb-2"></div>
                <p className="text-lg font-semibold text-gray-900">{data.signature}</p>
              </div>
            </div>
            <div className="flex justify-center">
              {data.mapImage ? (
                <img 
                  src={data.mapImage} 
                  alt="Delivery Location Map" 
                  className="w-48 h-32 object-cover rounded-lg border border-gray-200"
                />
              ) : (
                <div className="w-48 h-32 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center">
                  <p className="text-gray-500 text-sm">Map Location</p>
                </div>
              )}
            </div>
          </div>

          {/* Delivery Note Link */}
          <div className="border-t border-gray-200 pt-4">
            <p className="text-sm text-gray-600">
              Link: <a href={data.deliveryNoteLink} className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">{data.deliveryNoteLink}</a>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Invoice;
