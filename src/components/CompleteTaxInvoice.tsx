
import React, { useState, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, FileSpreadsheet } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { exportToPNG } from '../utils/pngExport';
import { exportInvoiceToExcel } from '../utils/excelExport';

export interface InvoiceItem {
  id: string;
  description: string;
  hsn: string;
  quantity: number;
  rate: number;
  gstRate: number;
  amount: number;
}

export interface PartyInfo {
  name: string;
  address: string;
  gstin: string;
  stateCode: string;
}

export interface BankInfo {
  accountName: string;
  bankName: string;
  accountNumber: string;
  ifscCode: string;
}

export interface InvoiceData {
  invoiceNumber: string;
  date: string;
  seller: PartyInfo;
  buyer: PartyInfo;
  items: InvoiceItem[];
  bankDetails: BankInfo;
  declaration: string;
  deliveryNote: string;
  paymentTerms: string;
  referenceNo: string;
  referenceDate: string;
  otherReferences: string;
  buyerOrderNo: string;
  buyerOrderDate: string;
  dispatchDocNo: string;
  deliveryNoteDate: string;
  dispatchedThrough: string;
  destination: string;
  termsOfDelivery: string;
}

const CompleteTaxInvoice = () => {
  const invoiceRef = useRef<HTMLDivElement>(null);
  
  // Mock data that would come from backend
  const [invoiceData] = useState<InvoiceData>({
    invoiceNumber: '020/25-26',
    date: '24-Apr-25',
    seller: {
      name: 'NAVNEET ULTRALITE',
      address: 'Shop No 4, Niharika Complex, Appartment. Mankapur Ring Road, Nagpur 440030',
      gstin: '27AWFPG8630F1ZL',
      stateCode: '27'
    },
    buyer: {
      name: 'B C Biyani Projects Pvt Ltd',
      address: 'Nagpur',
      gstin: '27AACCB3617R1ZB',
      stateCode: '27'
    },
    items: [
      {
        id: '1',
        description: 'Metal Mix',
        hsn: '251710',
        quantity: 912.5,
        rate: 30.00,
        gstRate: 5,
        amount: 27375.00
      }
    ],
    bankDetails: {
      accountName: 'NAVNEET ULTRALITE',
      bankName: 'Punjab National Bank',
      accountNumber: '6226005000000886',
      ifscCode: 'PUNB0622600'
    },
    declaration: 'we declare that this invoice the actual price of the goods described and that all the particulars are correct and true',
    deliveryNote: 'DN-2025-001',
    paymentTerms: 'Net 30 Days',
    referenceNo: 'REF-2025-ABC',
    referenceDate: '20-Apr-25',
    otherReferences: 'PO-2025-XYZ',
    buyerOrderNo: 'BO-2025-123',
    buyerOrderDate: '18-Apr-25',
    dispatchDocNo: 'DD-2025-456',
    deliveryNoteDate: '24-Apr-25',
    dispatchedThrough: 'Road Transport',
    destination: 'Nagpur, Maharashtra',
    termsOfDelivery: 'FOB Destination'
  });

  const calculateTotals = () => {
    const subtotal = invoiceData.items.reduce((sum, item) => sum + item.amount, 0);
    const totalTax = invoiceData.items.reduce((sum, item) => {
      const taxAmount = (item.amount * item.gstRate) / 100;
      return sum + taxAmount;
    }, 0);
    const cgst = totalTax / 2;
    const sgst = totalTax / 2;
    const grandTotal = subtotal + totalTax;
    
    return { subtotal, cgst, sgst, totalTax, grandTotal };
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const numberToWords = (num: number): string => {
    const units = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
    const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
    const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
    const scales = ['', 'Thousand', 'Lakh', 'Crore'];

    if (num === 0) return 'Zero';

    const convertChunk = (chunk: number): string => {
      let result = '';
      
      if (chunk >= 100) {
        result += units[Math.floor(chunk / 100)] + ' Hundred ';
        chunk %= 100;
      }
      
      if (chunk >= 20) {
        result += tens[Math.floor(chunk / 10)] + ' ';
        chunk %= 10;
      } else if (chunk >= 10) {
        result += teens[chunk - 10] + ' ';
        chunk = 0;
      }
      
      if (chunk > 0) {
        result += units[chunk] + ' ';
      }
      
      return result.trim();
    };

    const integerPart = Math.floor(num);
    const decimalPart = Math.round((num - integerPart) * 100);
    
    let result = '';
    let scaleIndex = 0;
    let remaining = integerPart;
    
    while (remaining > 0) {
      let chunk: number;
      
      if (scaleIndex === 0) {
        chunk = remaining % 1000;
        remaining = Math.floor(remaining / 1000);
      } else {
        chunk = remaining % 100;
        remaining = Math.floor(remaining / 100);
      }
      
      if (chunk > 0) {
        const chunkWords = convertChunk(chunk);
        const scale = scales[scaleIndex] ? scales[scaleIndex] + ' ' : '';
        result = chunkWords + ' ' + scale + result;
      }
      
      scaleIndex++;
    }
    
    result = result.trim();
    
    if (decimalPart > 0) {
      result += ' and ' + convertChunk(decimalPart) + ' Paise';
    }
    
    return result + ' Only';
  };

  const downloadAsPNG = async () => {
    const result = await exportToPNG(invoiceRef, invoiceData.invoiceNumber);
    
    if (result?.success) {
      toast({
        title: "Invoice Downloaded",
        description: "Your invoice has been saved as PNG.",
      });
    } else {
      toast({
        title: "Download Failed",
        description: "There was an error downloading the invoice.",
        variant: "destructive",
      });
    }
  };

  const exportToExcel = () => {
    const totals = calculateTotals();
    exportInvoiceToExcel(invoiceData, totals);
    
    toast({
      title: "Excel Export Complete",
      description: "Your invoice has been exported to Excel.",
    });
  };

  const totals = calculateTotals();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Invoice Preview</h1>
          <div className="flex gap-3">
            <Button 
              onClick={downloadAsPNG} 
              className="flex items-center gap-2 bg-[#3bbceb] hover:bg-[#2da8d8]"
            >
              <Download size={16} />
              Download PNG
            </Button>
            <Button 
              onClick={exportToExcel} 
              variant="outline"
              className="flex items-center gap-2 border-[#3bbceb] text-[#3bbceb] hover:bg-[#3bbceb] hover:text-white"
            >
              <FileSpreadsheet size={16} />
              Export Excel
            </Button>
          </div>
        </div>

        <Card 
          ref={invoiceRef} 
          className="p-8 bg-white shadow-2xl border-0 backdrop-blur-sm"
          style={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
        >
          {/* Invoice Header */}
          <div className="border-b-2 border-[#3bbceb] pb-6 mb-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-4xl font-bold text-[#3bbceb] mb-2">TAX INVOICE</h1>
                <p className="text-sm text-gray-600">Original Copy</p>
              </div>
              
              <div className="text-right space-y-2">
                <div className="grid grid-cols-2 gap-8 text-sm">
                  <div>
                    <span className="text-gray-600">Invoice No.</span>
                  </div>
                  <div>
                    <span className="font-semibold">{invoiceData.invoiceNumber}</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-8 text-sm">
                  <div>
                    <span className="text-gray-600">Dated</span>
                  </div>
                  <div>
                    <span className="font-semibold">{invoiceData.date}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery Details Table */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 px-4 font-medium text-gray-700 bg-gray-100 w-1/4">Delivery Note</td>
                    <td className="py-3 px-4">{invoiceData.deliveryNote}</td>
                    <td className="py-3 px-4 font-medium text-gray-700 bg-gray-100 w-1/4">Mode/Terms of Payment</td>
                    <td className="py-3 px-4">{invoiceData.paymentTerms}</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 px-4 font-medium text-gray-700 bg-gray-100">Reference No. & Date.</td>
                    <td className="py-3 px-4">{invoiceData.referenceNo} dt. {invoiceData.referenceDate}</td>
                    <td className="py-3 px-4 font-medium text-gray-700 bg-gray-100">Other References</td>
                    <td className="py-3 px-4">{invoiceData.otherReferences}</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 px-4 font-medium text-gray-700 bg-gray-100">Buyer's Order No.</td>
                    <td className="py-3 px-4">{invoiceData.buyerOrderNo}</td>
                    <td className="py-3 px-4 font-medium text-gray-700 bg-gray-100">Dated</td>
                    <td className="py-3 px-4">{invoiceData.buyerOrderDate}</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 px-4 font-medium text-gray-700 bg-gray-100">Dispatch Doc No.</td>
                    <td className="py-3 px-4">{invoiceData.dispatchDocNo}</td>
                    <td className="py-3 px-4 font-medium text-gray-700 bg-gray-100">Delivery Note Date</td>
                    <td className="py-3 px-4">{invoiceData.deliveryNoteDate}</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 px-4 font-medium text-gray-700 bg-gray-100">Dispatched through</td>
                    <td className="py-3 px-4">{invoiceData.dispatchedThrough}</td>
                    <td className="py-3 px-4 font-medium text-gray-700 bg-gray-100">Destination</td>
                    <td className="py-3 px-4">{invoiceData.destination}</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-gray-700 bg-gray-100">Terms of Delivery</td>
                    <td className="py-3 px-4 colspan-3">{invoiceData.termsOfDelivery}</td>
                    <td className="py-3 px-4"></td>
                    <td className="py-3 px-4"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Party Details */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-gradient-to-br from-[#3bbceb]/5 to-[#3bbceb]/10 p-6 rounded-lg border border-[#3bbceb]/20">
              <h3 className="font-bold text-[#3bbceb] mb-4 text-lg">Consignee (Ship to)</h3>
              <div className="space-y-3">
                <div>
                  <div className="text-sm font-medium text-gray-700 mb-1">Company Name</div>
                  <div className="text-gray-900 font-semibold">{invoiceData.seller.name}</div>
                </div>
                
                <div>
                  <div className="text-sm font-medium text-gray-700 mb-1">Address</div>
                  <div className="text-gray-900">{invoiceData.seller.address}</div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-1">GSTIN/UIN</div>
                    <div className="text-gray-900 font-mono">{invoiceData.seller.gstin}</div>
                  </div>
                  
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-1">State Code</div>
                    <div className="text-gray-900">{invoiceData.seller.stateCode}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-lg border border-gray-200">
              <h3 className="font-bold text-gray-800 mb-4 text-lg">Buyer (Bill to)</h3>
              <div className="space-y-3">
                <div>
                  <div className="text-sm font-medium text-gray-700 mb-1">Company Name</div>
                  <div className="text-gray-900 font-semibold">{invoiceData.buyer.name}</div>
                </div>
                
                <div>
                  <div className="text-sm font-medium text-gray-700 mb-1">Address</div>
                  <div className="text-gray-900">{invoiceData.buyer.address}</div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-1">GSTIN/UIN</div>
                    <div className="text-gray-900 font-mono">{invoiceData.buyer.gstin}</div>
                  </div>
                  
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-1">State Code</div>
                    <div className="text-gray-900">{invoiceData.buyer.stateCode}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Item Table */}
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
                  {invoiceData.items.map((item, index) => (
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
          
          {/* Summary Footer */}
          <div className="mb-8">
            {/* Tax Summary Table */}
            <div className="bg-gradient-to-r from-[#3bbceb]/5 to-[#3bbceb]/10 p-6 rounded-lg border border-[#3bbceb]/20 mb-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-[#3bbceb] mb-3">Tax Summary</h4>
                  <div className="overflow-hidden rounded-lg border border-[#3bbceb]/20">
                    <table className="w-full text-sm">
                      <thead className="bg-[#3bbceb] text-white">
                        <tr>
                          <th className="px-3 py-2 text-left">HSN/SAC</th>
                          <th className="px-3 py-2 text-right">Taxable Value</th>
                          <th className="px-3 py-2 text-right">CGST Rate</th>
                          <th className="px-3 py-2 text-right">CGST Amount</th>
                          <th className="px-3 py-2 text-right">SGST/UTGST Rate</th>
                          <th className="px-3 py-2 text-right">SGST/UTGST Amount</th>
                          <th className="px-3 py-2 text-right">Total Tax Amount</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white">
                        <tr className="border-b border-gray-100">
                          <td className="px-3 py-2">251710</td>
                          <td className="px-3 py-2 text-right">{formatCurrency(totals.subtotal)}</td>
                          <td className="px-3 py-2 text-right">2.50%</td>
                          <td className="px-3 py-2 text-right">{formatCurrency(totals.cgst)}</td>
                          <td className="px-3 py-2 text-right">2.50%</td>
                          <td className="px-3 py-2 text-right">{formatCurrency(totals.sgst)}</td>
                          <td className="px-3 py-2 text-right font-semibold text-[#3bbceb]">{formatCurrency(totals.totalTax)}</td>
                        </tr>
                        <tr className="bg-gray-50 font-semibold">
                          <td className="px-3 py-2">Total</td>
                          <td className="px-3 py-2 text-right">{formatCurrency(totals.subtotal)}</td>
                          <td className="px-3 py-2"></td>
                          <td className="px-3 py-2 text-right">{formatCurrency(totals.cgst)}</td>
                          <td className="px-3 py-2"></td>
                          <td className="px-3 py-2 text-right">{formatCurrency(totals.sgst)}</td>
                          <td className="px-3 py-2 text-right text-[#3bbceb]">{formatCurrency(totals.totalTax)}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg border border-[#3bbceb]/20">
                    <div className="text-right space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Subtotal:</span>
                        <span className="font-semibold">{formatCurrency(totals.subtotal)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>CGST:</span>
                        <span>{formatCurrency(totals.cgst)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>SGST:</span>
                        <span>{formatCurrency(totals.sgst)}</span>
                      </div>
                      <div className="border-t border-[#3bbceb]/20 pt-2">
                        <div className="flex justify-between text-lg font-bold text-[#3bbceb]">
                          <span>Grand Total:</span>
                          <span>{formatCurrency(totals.grandTotal)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-[#3bbceb]/10 p-4 rounded-lg border border-[#3bbceb]/20">
                    <h5 className="font-semibold text-[#3bbceb] mb-2">Amount Chargeable (in words)</h5>
                    <p className="text-sm text-gray-700 font-medium">
                      Indian Rupees {numberToWords(totals.grandTotal)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Bank Details */}
          <div className="border-t-2 border-[#3bbceb] pt-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-[#3bbceb] mb-4">Company's Bank Details</h4>
                <div className="bg-gradient-to-br from-[#3bbceb]/5 to-[#3bbceb]/10 p-4 rounded-lg border border-[#3bbceb]/20 space-y-3">
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-1">A/c Holder's Name:</div>
                    <div className="text-gray-900 font-semibold">{invoiceData.bankDetails.accountName}</div>
                  </div>
                  
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-1">Bank Name:</div>
                    <div className="text-gray-900">{invoiceData.bankDetails.bankName}</div>
                  </div>
                  
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-1">A/c No.:</div>
                    <div className="text-gray-900 font-mono">{invoiceData.bankDetails.accountNumber}</div>
                  </div>
                  
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-1">Branch & IFS Code:</div>
                    <div className="text-gray-900 font-mono">{invoiceData.bankDetails.ifscCode}</div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <div className="text-sm font-medium text-gray-700 mb-2">Declaration</div>
                  <div className="text-sm text-gray-900 p-3 bg-gray-50 rounded-md border">
                    {invoiceData.declaration}
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col justify-between">
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-16">Company's VAT TIN : 27161064144</p>
                  <div className="border-b-2 border-gray-300 mb-2 w-48 mx-auto"></div>
                  <p className="font-semibold text-[#3bbceb] text-lg">{invoiceData.seller.name}</p>
                  <p className="text-sm text-gray-600">(Authorised Signatory)</p>
                </div>
                
                <div className="text-center mt-8">
                  <p className="text-xs text-gray-500">This is a Computer Generated Invoice</p>
                  <div className="mt-4 text-[#3bbceb] font-bold text-lg tracking-wider">
                    PROPRIETOR
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CompleteTaxInvoice;
