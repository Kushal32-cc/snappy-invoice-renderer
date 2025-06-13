
import React from 'react';
import Invoice from '@/components/Invoice';
import InvoiceLoader from '@/components/InvoiceLoader';
import { useInvoiceData } from '@/hooks/useInvoiceData';

const Index = () => {
  const { invoiceData, loading } = useInvoiceData();

  if (loading || !invoiceData) {
    return <InvoiceLoader />;
  }

  return <Invoice data={invoiceData} />;
};

export default Index;
