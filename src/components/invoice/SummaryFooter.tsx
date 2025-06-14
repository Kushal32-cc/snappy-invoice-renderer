
import React from 'react';

interface SummaryFooterProps {
  totals: {
    subtotal: number;
    cgst: number;
    sgst: number;
    totalTax: number;
    grandTotal: number;
  };
}

const SummaryFooter = ({ totals }: SummaryFooterProps) => {
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

  return (
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
  );
};

export default SummaryFooter;
