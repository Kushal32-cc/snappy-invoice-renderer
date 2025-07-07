
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

export const generateInvoicePDF = async (companyName: string, date: string): Promise<Blob> => {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595, 842]); // A4 size
  
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  
  const { width, height } = page.getSize();
  const margin = 50;
  let currentY = height - margin;

  // Colors
  const primaryColor = rgb(0.23, 0.74, 0.92); // #3bbceb
  const blackColor = rgb(0, 0, 0);
  const grayColor = rgb(0.5, 0.5, 0.5);

  // Helper function to format currency without rupee symbol
  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  // Header - TAX INVOICE
  page.drawText('TAX INVOICE', {
    x: margin,
    y: currentY,
    size: 24,
    font: boldFont,
    color: primaryColor,
  });

  page.drawText('Original Copy', {
    x: margin,
    y: currentY - 25,
    size: 10,
    font: font,
    color: grayColor,
  });

  // Invoice details (top right)
  page.drawText('Invoice No.: 020/25-26', {
    x: width - 200,
    y: currentY,
    size: 12,
    font: font,
    color: blackColor,
  });

  page.drawText(`Dated: ${date}`, {
    x: width - 200,
    y: currentY - 20,
    size: 12,
    font: font,
    color: blackColor,
  });

  currentY -= 80;

  // Delivery details table
  const tableData = [
    ['Delivery Note', 'DN-2025-001', 'Mode/Terms of Payment', 'Net 30 Days'],
    ['Reference No. & Date.', 'REF-2025-ABC dt. 20-Apr-25', 'Other References', 'PO-2025-XYZ'],
    ['Buyer\'s Order No.', 'BO-2025-123', 'Dated', '18-Apr-25'],
    ['Dispatch Doc No.', 'DD-2025-456', 'Delivery Note Date', '24-Apr-25'],
    ['Dispatched through', 'Road Transport', 'Destination', 'Nagpur, Maharashtra'],
    ['Terms of Delivery', 'FOB Destination', '', '']
  ];

  const tableHeight = 120;
  const rowHeight = 20;
  
  // Draw table border
  page.drawRectangle({
    x: margin,
    y: currentY - tableHeight,
    width: width - 2 * margin,
    height: tableHeight,
    borderColor: grayColor,
    borderWidth: 1,
  });

  // Draw table rows
  tableData.forEach((row, rowIndex) => {
    const y = currentY - (rowIndex + 1) * rowHeight;
    
    // Draw row separator
    if (rowIndex > 0) {
      page.drawLine({
        start: { x: margin, y: y + rowHeight },
        end: { x: width - margin, y: y + rowHeight },
        color: grayColor,
        thickness: 0.5,
      });
    }

    // Draw column separators
    page.drawLine({
      start: { x: margin + 150, y: y },
      end: { x: margin + 150, y: y + rowHeight },
      color: grayColor,
      thickness: 0.5,
    });

    page.drawLine({
      start: { x: margin + 350, y: y },
      end: { x: margin + 350, y: y + rowHeight },
      color: grayColor,
      thickness: 0.5,
    });

    // Draw text
    page.drawText(row[0], {
      x: margin + 5,
      y: y + 5,
      size: 8,
      font: font,
      color: blackColor,
    });

    page.drawText(row[1], {
      x: margin + 155,
      y: y + 5,
      size: 8,
      font: font,
      color: blackColor,
    });

    if (row[2]) {
      page.drawText(row[2], {
        x: margin + 355,
        y: y + 5,
        size: 8,
        font: font,
        color: blackColor,
      });
    }

    if (row[3]) {
      page.drawText(row[3], {
        x: margin + 455,
        y: y + 5,
        size: 8,
        font: font,
        color: blackColor,
      });
    }
  });

  currentY -= tableHeight + 40;

  // Party Details
  page.drawText('Consignee (Ship to)', {
    x: margin,
    y: currentY,
    size: 12,
    font: boldFont,
    color: primaryColor,
  });

  page.drawText('Buyer (Bill to)', {
    x: width / 2 + 20,
    y: currentY,
    size: 12,
    font: boldFont,
    color: blackColor,
  });

  currentY -= 20;

  // Seller details
  page.drawText(companyName || 'NAVNEET ULTRALITE', {
    x: margin,
    y: currentY,
    size: 10,
    font: boldFont,
    color: blackColor,
  });

  page.drawText('Shop No 4, Niharika Complex, Appartment.', {
    x: margin,
    y: currentY - 15,
    size: 9,
    font: font,
    color: blackColor,
  });

  page.drawText('Mankapur Ring Road, Nagpur 440030', {
    x: margin,
    y: currentY - 30,
    size: 9,
    font: font,
    color: blackColor,
  });

  page.drawText('GSTIN/UIN: 27AWFPG8630F1ZL', {
    x: margin,
    y: currentY - 50,
    size: 9,
    font: font,
    color: blackColor,
  });

  page.drawText('State Code: 27', {
    x: margin,
    y: currentY - 65,
    size: 9,
    font: font,
    color: blackColor,
  });

  // Buyer details
  page.drawText('B C Biyani Projects Pvt Ltd', {
    x: width / 2 + 20,
    y: currentY,
    size: 10,
    font: boldFont,
    color: blackColor,
  });

  page.drawText('Nagpur', {
    x: width / 2 + 20,
    y: currentY - 15,
    size: 9,
    font: font,
    color: blackColor,
  });

  page.drawText('GSTIN/UIN: 27AACCB3617R1ZB', {
    x: width / 2 + 20,
    y: currentY - 50,
    size: 9,
    font: font,
    color: blackColor,
  });

  page.drawText('State Code: 27', {
    x: width / 2 + 20,
    y: currentY - 65,
    size: 9,
    font: font,
    color: blackColor,
  });

  currentY -= 100;

  // Items table header
  const itemsTableY = currentY;
  const itemsTableHeight = 60;
  
  // Draw items table
  page.drawRectangle({
    x: margin,
    y: itemsTableY - itemsTableHeight,
    width: width - 2 * margin,
    height: itemsTableHeight,
    borderColor: primaryColor,
    borderWidth: 1,
  });

  // Header background
  page.drawRectangle({
    x: margin,
    y: itemsTableY - 20,
    width: width - 2 * margin,
    height: 20,
    color: primaryColor,
  });

  // Table headers
  const headers = ['Sl No.', 'Description of Goods', 'HSN/SAC', 'GST Rate', 'Quantity', 'Rate', 'per', 'Amount'];
  const colWidths = [40, 120, 60, 60, 60, 60, 40, 80];
  let currentX = margin;

  headers.forEach((header, index) => {
    page.drawText(header, {
      x: currentX + 5,
      y: itemsTableY - 15,
      size: 8,
      font: boldFont,
      color: rgb(1, 1, 1),
    });
    currentX += colWidths[index];
  });

  // Item row
  currentX = margin;
  const itemY = itemsTableY - 35;
  const itemData = ['1', 'Metal Mix', '251710', '5%', '912.5', '30.00', 'CFT', '27375.00'];
  
  itemData.forEach((item, index) => {
    page.drawText(item, {
      x: currentX + 5,
      y: itemY,
      size: 8,
      font: font,
      color: blackColor,
    });
    currentX += colWidths[index];
  });

  currentY -= itemsTableHeight + 40;

  // Tax Summary Section
  page.drawRectangle({
    x: margin,
    y: currentY - 100,
    width: width - 2 * margin,
    height: 100,
    color: rgb(0.95, 0.98, 1),
    borderColor: primaryColor,
    borderWidth: 1,
  });

  page.drawText('Tax Summary', {
    x: margin + 10,
    y: currentY - 20,
    size: 12,
    font: boldFont,
    color: primaryColor,
  });

  // Tax table header
  page.drawRectangle({
    x: margin + 10,
    y: currentY - 50,
    width: 300,
    height: 15,
    color: primaryColor,
  });

  const taxHeaders = ['HSN/SAC', 'Taxable Value', 'CGST', 'SGST', 'Total Tax'];
  let taxHeaderX = margin + 15;
  const taxColWidths = [60, 80, 60, 60, 60];

  taxHeaders.forEach((header, index) => {
    page.drawText(header, {
      x: taxHeaderX,
      y: currentY - 45,
      size: 8,
      font: boldFont,
      color: rgb(1, 1, 1),
    });
    taxHeaderX += taxColWidths[index];
  });

  // Tax table data
  const taxData = ['251710', formatCurrency(27375), formatCurrency(684.38), formatCurrency(684.38), formatCurrency(1368.75)];
  let taxDataX = margin + 15;

  taxData.forEach((data, index) => {
    page.drawText(data, {
      x: taxDataX,
      y: currentY - 65,
      size: 8,
      font: font,
      color: blackColor,
    });
    taxDataX += taxColWidths[index];
  });

  // Summary on right side
  page.drawText('Subtotal: ' + formatCurrency(27375), {
    x: width - 200,
    y: currentY - 30,
    size: 10,
    font: font,
    color: blackColor,
  });

  page.drawText('CGST (2.5%): ' + formatCurrency(684.38), {
    x: width - 200,
    y: currentY - 45,
    size: 10,
    font: font,
    color: blackColor,
  });

  page.drawText('SGST (2.5%): ' + formatCurrency(684.38), {
    x: width - 200,
    y: currentY - 60,
    size: 10,
    font: font,
    color: blackColor,
  });

  page.drawText('Grand Total: ' + formatCurrency(28743.75), {
    x: width - 200,
    y: currentY - 80,
    size: 12,
    font: boldFont,
    color: primaryColor,
  });

  currentY -= 120;

  // Amount in words
  page.drawText('Amount Chargeable (in words)', {
    x: margin,
    y: currentY,
    size: 10,
    font: boldFont,
    color: primaryColor,
  });

  page.drawText('Indian Rupees Twenty Eight Thousand Seven Hundred Forty Three and Seventy Five Paise Only', {
    x: margin,
    y: currentY - 15,
    size: 9,
    font: font,
    color: blackColor,
  });

  currentY -= 50;

  // Bank Details
  page.drawText('Company\'s Bank Details', {
    x: margin,
    y: currentY,
    size: 10,
    font: boldFont,
    color: primaryColor,
  });

  page.drawText('A/c Holder\'s Name: NAVNEET ULTRALITE', {
    x: margin,
    y: currentY - 20,
    size: 9,
    font: font,
    color: blackColor,
  });

  page.drawText('Bank Name: Punjab National Bank', {
    x: margin,
    y: currentY - 35,
    size: 9,
    font: font,
    color: blackColor,
  });

  page.drawText('A/c No.: 6226005000000886', {
    x: margin,
    y: currentY - 50,
    size: 9,
    font: font,
    color: blackColor,
  });

  page.drawText('Branch & IFS Code: PUNB0622600', {
    x: margin,
    y: currentY - 65,
    size: 9,
    font: font,
    color: blackColor,
  });

  // Signature section
  page.drawText('NAVNEET ULTRALITE', {
    x: width - 200,
    y: currentY - 20,
    size: 10,
    font: boldFont,
    color: primaryColor,
  });

  page.drawText('(Authorised Signatory)', {
    x: width - 200,
    y: currentY - 35,
    size: 8,
    font: font,
    color: blackColor,
  });

  page.drawText('PROPRIETOR', {
    x: width - 200,
    y: currentY - 60,
    size: 10,
    font: boldFont,
    color: primaryColor,
  });

  // Footer
  page.drawText('This is a Computer Generated Invoice', {
    x: margin,
    y: 40,
    size: 8,
    font: font,
    color: grayColor,
  });

  const pdfBytes = await pdfDoc.save();
  return new Blob([pdfBytes], { type: 'application/pdf' });
};
