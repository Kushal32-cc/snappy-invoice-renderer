
import React, { useState, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, FileSpreadsheet } from 'lucide-react';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';
import { toast } from '@/hooks/use-toast';
import InvoiceHeader from './invoice/InvoiceHeader';
import PartyDetails from './invoice/PartyDetails';
import ItemTable from './invoice/ItemTable';
import SummaryFooter from './invoice/SummaryFooter';
import BankDetails from './invoice/BankDetails';

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

const EditableInvoice = () => {
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

  const downloadAsPNG = async () => {
    if (!invoiceRef.current) return;
    
    try {
      const canvas = await html2canvas(invoiceRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
      });
      
      const link = document.createElement('a');
      link.download = `invoice-${invoiceData.invoiceNumber.replace('/', '-')}.png`;
      link.href = canvas.toDataURL();
      link.click();
      
      toast({
        title: "Invoice Downloaded",
        description: "Your invoice has been saved as PNG.",
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

  const exportToExcel = () => {
    const { subtotal, cgst, sgst, grandTotal } = calculateTotals();
    
    // Create detailed Excel export matching the invoice format
    const worksheetData = [
      ['TAX INVOICE'],
      [''],
      ['Invoice Number', invoiceData.invoiceNumber, '', 'Dated', invoiceData.date],
      [''],
      ['Delivery Note', invoiceData.deliveryNote, '', 'Mode/Terms of Payment', invoiceData.paymentTerms],
      ['Reference No. & Date.', `${invoiceData.referenceNo} dt. ${invoiceData.referenceDate}`, '', 'Other References', invoiceData.otherReferences],
      ['Buyer\'s Order No.', invoiceData.buyerOrderNo, '', 'Dated', invoiceData.buyerOrderDate],
      ['Dispatch Doc No.', invoiceData.dispatchDocNo, '', 'Delivery Note Date', invoiceData.deliveryNoteDate],
      ['Dispatched through', invoiceData.dispatchedThrough, '', 'Destination', invoiceData.destination],
      ['Terms of Delivery', invoiceData.termsOfDelivery],
      [''],
      ['CONSIGNEE (Ship to)', '', '', 'BUYER (Bill to)'],
      [invoiceData.seller.name, '', '', invoiceData.buyer.name],
      [invoiceData.seller.address, '', '', invoiceData.buyer.address],
      [`GSTIN/UIN: ${invoiceData.seller.gstin}`, '', '', `GSTIN/UIN: ${invoiceData.buyer.gstin}`],
      [`State Name: Maharashtra, Code: ${invoiceData.seller.stateCode}`, '', '', `State Name: Maharashtra, Code: ${invoiceData.buyer.stateCode}`],
      [''],
      ['Sl', 'Description of Goods', 'HSN/SAC', 'GST Rate', 'Quantity', 'Rate', 'per', 'Amount'],
      ['No.', '', '', '', '', '', '', ''],
      ...invoiceData.items.map((item, index) => [
        index + 1,
        item.description,
        item.hsn,
        `${item.gstRate}%`,
        item.quantity,
        item.rate.toFixed(2),
        'CFT',
        item.amount.toFixed(2)
      ]),
      [''],
      ['', '', '', '', '', 'Total', '', subtotal.toFixed(2)],
      [''],
      ['', '', '', '', '', 'Add: CGST', '', cgst.toFixed(2)],
      ['', '', '', '', '', 'Add: SGST', '', sgst.toFixed(2)],
      [''],
      ['', '', '', '', '', 'Total Tax Amount', '', (cgst + sgst).toFixed(2)],
      ['', '', '', '', '', 'Total Amount after Tax', '', grandTotal.toFixed(2)],
      [''],
      ['Amount Chargeable (in words)'],
      [`INR ${this.numberToWords(grandTotal)} Only`],
      [''],
      ['Declaration'],
      [invoiceData.declaration],
      [''],
      ['Company\'s Bank Details'],
      [`A/c Holder\'s Name: ${invoiceData.bankDetails.accountName}`],
      [`Bank Name: ${invoiceData.bankDetails.bankName}`],
      [`A/c No.: ${invoiceData.bankDetails.accountNumber}`],
      [`Branch & IFS Code: ${invoiceData.bankDetails.ifscCode}`],
      [''],
      ['for ' + invoiceData.seller.name],
      [''],
      [''],
      ['Authorised Signatory']
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    
    // Set column widths
    worksheet['!cols'] = [
      {wch: 5}, {wch: 25}, {wch: 10}, {wch: 8}, {wch: 10}, {wch: 10}, {wch: 5}, {wch: 12}
    ];
    
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Invoice');
    
    XLSX.writeFile(workbook, `invoice-${invoiceData.invoiceNumber.replace('/', '-')}.xlsx`);
    
    toast({
      title: "Excel Export Complete",
      description: "Your invoice has been exported to Excel.",
    });
  };

  // Helper function to convert numbers to words (simplified version)
  const numberToWords = (num: number): string => {
    const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
    const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
    const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
    
    if (num === 0) return 'Zero';
    
    const integerPart = Math.floor(num);
    const decimalPart = Math.round((num - integerPart) * 100);
    
    let result = '';
    
    // Convert integer part
    if (integerPart >= 10000000) {
      result += numberToWords(Math.floor(integerPart / 10000000)) + ' Crore ';
      integerPart %= 10000000;
    }
    if (integerPart >= 100000) {
      result += numberToWords(Math.floor(integerPart / 100000)) + ' Lakh ';
      integerPart %= 100000;
    }
    if (integerPart >= 1000) {
      result += numberToWords(Math.floor(integerPart / 1000)) + ' Thousand ';
      integerPart %= 1000;
    }
    if (integerPart >= 100) {
      result += ones[Math.floor(integerPart / 100)] + ' Hundred ';
      integerPart %= 100;
    }
    if (integerPart >= 20) {
      result += tens[Math.floor(integerPart / 10)] + ' ';
      integerPart %= 10;
    }
    if (integerPart >= 10) {
      result += teens[integerPart - 10] + ' ';
    } else if (integerPart > 0) {
      result += ones[integerPart] + ' ';
    }
    
    if (decimalPart > 0) {
      result += 'and ' + decimalPart + '/100 ';
    }
    
    return result.trim();
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
          <InvoiceHeader 
            invoiceNumber={invoiceData.invoiceNumber}
            date={invoiceData.date}
            deliveryDetails={{
              deliveryNote: invoiceData.deliveryNote,
              paymentTerms: invoiceData.paymentTerms,
              referenceNo: invoiceData.referenceNo,
              referenceDate: invoiceData.referenceDate,
              otherReferences: invoiceData.otherReferences,
              buyerOrderNo: invoiceData.buyerOrderNo,
              buyerOrderDate: invoiceData.buyerOrderDate,
              dispatchDocNo: invoiceData.dispatchDocNo,
              deliveryNoteDate: invoiceData.deliveryNoteDate,
              dispatchedThrough: invoiceData.dispatchedThrough,
              destination: invoiceData.destination,
              termsOfDelivery: invoiceData.termsOfDelivery
            }}
          />
          
          <PartyDetails 
            seller={invoiceData.seller}
            buyer={invoiceData.buyer}
          />
          
          <ItemTable items={invoiceData.items} />
          
          <SummaryFooter totals={totals} />
          
          <BankDetails 
            bankDetails={invoiceData.bankDetails}
            declaration={invoiceData.declaration}
            companyName={invoiceData.seller.name}
          />
        </Card>
      </div>
    </div>
  );
};

export default EditableInvoice;
