
import { useState, useEffect } from 'react';

interface InvoiceData {
  invoiceNumber: string;
  rawTo: {
    name: string;
    address: string;
  };
  billTo: {
    name: string;
    address: string;
  };
  deliveryDate: string;
  truckDriver: string;
  quantity: string;
  items: Array<{
    description: string;
    quantity: number;
    rate: number;
    amount: number;
  }>;
  total: number;
  signature: string;
  deliveryNoteLink: string;
  mapImage?: string;
}

export const useInvoiceData = () => {
  const [invoiceData, setInvoiceData] = useState<InvoiceData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data from an API
    const fetchInvoiceData = async () => {
      setLoading(true);
      
      // Simulated API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const data: InvoiceData = {
        invoiceNumber: 'INV-0001',
        rawTo: {
          name: 'Ram Corporation',
          address: '722 Business St.,\nCity, State 12345'
        },
        billTo: {
          name: 'Sanjay Kumar',
          address: '456 Commerce Ave.\nCity/State 67830'
        },
        deliveryDate: 'A3/10/2024',
        truckDriver: 'ABC-1234',
        quantity: '1501',
        items: [
          {
            description: 'Bricks',
            quantity: 3000,
            rate: 0.50,
            amount: 1500.00
          }
        ],
        total: 1500.00,
        signature: 'Sanjay Kumar',
        deliveryNoteLink: 'https://rdms.app/view/DEL12345678',
        mapImage: '/lovable-uploads/cc819707-e9c8-41b5-8b67-a090c90f0093.png'
      };

      setInvoiceData(data);
      setLoading(false);
    };

    fetchInvoiceData();
  }, []);

  return { invoiceData, loading, setInvoiceData };
};
