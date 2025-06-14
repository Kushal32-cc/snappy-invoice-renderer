
export const numberToWords = (num: number): string => {
  const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
  const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
  
  if (num === 0) return 'Zero';
  
  let integerPart = Math.floor(num);
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
