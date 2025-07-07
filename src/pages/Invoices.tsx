
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { ArrowLeft, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { generateInvoicePDF } from '@/utils/pdfGenerator';
import { toast } from '@/hooks/use-toast';

const Invoices = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    date: ''
  });
  const [isGenerating, setIsGenerating] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleGeneratePDF = async () => {
    if (!formData.name || !formData.date) {
      toast({
        title: "Missing Information",
        description: "Please fill in both name and date.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    try {
      const pdfBlob = await generateInvoicePDF(formData.name, formData.date);
      const pdfUrl = URL.createObjectURL(pdfBlob);
      window.open(pdfUrl, '_blank');
      
      toast({
        title: "PDF Generated",
        description: "Your invoice PDF has been generated and opened in a new tab.",
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast({
        title: "Error",
        description: "Failed to generate PDF. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="bg-white shadow-sm border-b mb-6">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="flex items-center gap-2"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-4">
        <Card className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Generate Invoice PDF</h1>
            <p className="text-gray-600">Enter the details to generate your tax invoice PDF</p>
          </div>

          <div className="space-y-6">
            <div>
              <Label htmlFor="name" className="text-base font-medium">Company Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter company name"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="date" className="text-base font-medium">Invoice Date</Label>
              <Input
                id="date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleInputChange}
                className="mt-2"
              />
            </div>

            <Button 
              onClick={handleGeneratePDF}
              disabled={isGenerating}
              className="w-full bg-[#3bbceb] hover:bg-[#2da8d8] text-white py-3 text-lg"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Generating PDF...
                </>
              ) : (
                <>
                  <FileText size={20} className="mr-2" />
                  Generate PDF
                </>
              )}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Invoices;
