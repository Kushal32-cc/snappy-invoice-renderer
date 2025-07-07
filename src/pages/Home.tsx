
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Globe, FilePlus } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">Invoice Manager</h1>
        <p className="text-xl text-gray-600 mb-12">Choose how you want to work with your tax invoices</p>
        
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="p-8 hover:shadow-xl transition-shadow cursor-pointer group"
                onClick={() => navigate('/web-invoice')}>
            <div className="flex flex-col items-center space-y-4">
              <div className="w-16 h-16 bg-[#3bbceb] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Web Invoice</h2>
              <p className="text-gray-600 text-center">
                View your tax invoice in an interactive web format with export options
              </p>
              <Button className="mt-4 bg-[#3bbceb] hover:bg-[#2da8d8]">
                Open Web Invoice
              </Button>
            </div>
          </Card>

          <Card className="p-8 hover:shadow-xl transition-shadow cursor-pointer group"
                onClick={() => navigate('/pdf-viewer')}>
            <div className="flex flex-col items-center space-y-4">
              <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">PDF Viewer</h2>
              <p className="text-gray-600 text-center">
                View your tax invoice as a PDF document with print and download options
              </p>
              <Button className="mt-4 bg-red-500 hover:bg-red-600">
                Open PDF Viewer
              </Button>
            </div>
          </Card>

          <Card className="p-8 hover:shadow-xl transition-shadow cursor-pointer group"
                onClick={() => navigate('/invoices')}>
            <div className="flex flex-col items-center space-y-4">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <FilePlus className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Generate PDF</h2>
              <p className="text-gray-600 text-center">
                Create a new tax invoice PDF with custom details using pdf-lib
              </p>
              <Button className="mt-4 bg-green-500 hover:bg-green-600">
                Generate Invoice PDF
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Home;
