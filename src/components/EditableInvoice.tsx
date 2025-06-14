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
}

const EditableInvoice = () => {
  const invoiceRef = useRef<HTMLDivElement>(null);
  
  const [invoiceData, setInvoiceData] = useState<InvoiceData>({
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
    declaration: 'we declare that this invoice the actual price of the goods described and that all the particulars are correct and true'
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
    
    const worksheetData = [
      ['Invoice Number', invoiceData.invoiceNumber],
      ['Date', invoiceData.date],
      [''],
      ['SELLER DETAILS'],
      ['Name', invoiceData.seller.name],
      ['Address', invoiceData.seller.address],
      ['GSTIN/UIN', invoiceData.seller.gstin],
      ['State Code', invoiceData.seller.stateCode],
      [''],
      ['BUYER DETAILS'],
      ['Name', invoiceData.buyer.name],
      ['Address', invoiceData.buyer.address],
      ['GSTIN/UIN', invoiceData.buyer.gstin],
      ['State Code', invoiceData.buyer.stateCode],
      [''],
      ['ITEMS'],
      ['S.No', 'Description', 'HSN/SAC', 'Quantity', 'Rate', 'GST Rate', 'Amount'],
      ...invoiceData.items.map((item, index) => [
        index + 1,
        item.description,
        item.hsn,
        item.quantity,
        item.rate,
        `${item.gstRate}%`,
        item.amount
      ]),
      [''],
      ['SUMMARY'],
      ['Subtotal', subtotal],
      ['CGST', cgst],
      ['SGST', sgst],
      ['Total Tax', cgst + sgst],
      ['Grand Total', grandTotal]
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Invoice');
    
    XLSX.writeFile(workbook, `invoice-${invoiceData.invoiceNumber.replace('/', '-')}.xlsx`);
    
    toast({
      title: "Excel Export Complete",
      description: "Your invoice has been exported to Excel.",
    });
  };

  const updateInvoiceData = (field: keyof InvoiceData, value: any) => {
    setInvoiceData(prev => ({ ...prev, [field]: value }));
  };

  const updateItem = (itemId: string, field: keyof InvoiceItem, value: any) => {
    setInvoiceData(prev => ({
      ...prev,
      items: prev.items.map(item => 
        item.id === itemId ? { ...item, [field]: value } : item
      )
    }));
  };

  const addItem = () => {
    const newItem: InvoiceItem = {
      id: Date.now().toString(),
      description: '',
      hsn: '',
      quantity: 0,
      rate: 0,
      gstRate: 0,
      amount: 0
    };
    setInvoiceData(prev => ({
      ...prev,
      items: [...prev.items, newItem]
    }));
  };

  const removeItem = (itemId: string) => {
    setInvoiceData(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== itemId)
    }));
  };

  const totals = calculateTotals();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Editable Invoice</h1>
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
            onUpdate={updateInvoiceData}
          />
          
          <PartyDetails 
            seller={invoiceData.seller}
            buyer={invoiceData.buyer}
            onUpdate={updateInvoiceData}
          />
          
          <ItemTable 
            items={invoiceData.items}
            onUpdateItem={updateItem}
            onAddItem={addItem}
            onRemoveItem={removeItem}
          />
          
          <SummaryFooter totals={totals} />
          
          <BankDetails 
            bankDetails={invoiceData.bankDetails}
            declaration={invoiceData.declaration}
            onUpdate={updateInvoiceData}
          />
        </Card>
      </div>
    </div>
  );
};

export default EditableInvoice;
