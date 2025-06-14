
import html2canvas from 'html2canvas';

export const exportToPNG = async (elementRef: React.RefObject<HTMLDivElement>, invoiceNumber: string) => {
  if (!elementRef.current) return;
  
  try {
    const canvas = await html2canvas(elementRef.current, {
      scale: 2,
      backgroundColor: '#ffffff',
    });
    
    const link = document.createElement('a');
    link.download = `invoice-${invoiceNumber.replace('/', '-')}.png`;
    link.href = canvas.toDataURL();
    link.click();
    
    return { success: true };
  } catch (error) {
    console.error('Error downloading invoice:', error);
    return { success: false, error };
  }
};
