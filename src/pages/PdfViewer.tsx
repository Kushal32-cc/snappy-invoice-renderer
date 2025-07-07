
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Download, Printer } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PdfViewer = () => {
  const navigate = useNavigate();

  // Sample PDF URL - in a real app, this would come from your backend
  const pdfUrl = "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'tax-invoice.pdf';
    link.click();
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="flex items-center gap-2"
            >
              <ArrowLeft size={16} />
              Back to Home
            </Button>
            <h1 className="text-2xl font-bold text-gray-900">PDF Invoice Viewer</h1>
          </div>
          
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={handlePrint}
              className="flex items-center gap-2"
            >
              <Printer size={16} />
              Print
            </Button>
            <Button 
              onClick={handleDownload}
              className="flex items-center gap-2 bg-[#3bbceb] hover:bg-[#2da8d8]"
            >
              <Download size={16} />
              Download
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <iframe
            src={pdfUrl}
            width="100%"
            height="800px"
            className="border-0"
            title="Tax Invoice PDF"
          />
        </div>
      </div>
    </div>
  );
};

export default PdfViewer;
