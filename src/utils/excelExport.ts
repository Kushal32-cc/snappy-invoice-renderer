
import * as XLSX from 'xlsx';
import { InvoiceData } from '../components/EditableInvoice';

export const exportInvoiceToExcel = (invoiceData: InvoiceData, totals: any) => {
  const { subtotal, cgst, sgst, grandTotal } = totals;
  
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
    [`INR ${grandTotal.toFixed(2)} Only`],
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
};
