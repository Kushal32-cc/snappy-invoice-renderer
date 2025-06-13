
import React from 'react';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const InvoiceLoader = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-10 w-36" />
        </div>

        <Card className="p-8 bg-white shadow-lg">
          {/* Header */}
          <div className="flex justify-between items-start mb-8">
            <div className="flex items-center gap-4">
              <Skeleton className="w-16 h-16 rounded-lg" />
              <Skeleton className="h-6 w-32" />
            </div>
            <div className="text-right space-y-2">
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-4 w-20" />
            </div>
          </div>

          {/* Addresses */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="space-y-2">
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-40" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-4 w-36" />
            </div>
          </div>

          {/* Delivery Details */}
          <div className="grid md:grid-cols-3 gap-6 mb-8 p-4 bg-gray-50 rounded-lg">
            <div className="space-y-1">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-20" />
            </div>
            <div className="space-y-1">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-20" />
            </div>
            <div className="space-y-1">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-16" />
            </div>
          </div>

          {/* Table */}
          <div className="mb-8">
            <div className="grid grid-cols-4 gap-4 py-3 border-b-2 border-gray-200">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-4 w-16" />
            </div>
            <div className="grid grid-cols-4 gap-4 py-3 border-b border-gray-100">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-4 w-16" />
            </div>
            <div className="grid grid-cols-4 gap-4 py-4 border-t-2 border-gray-200">
              <div></div>
              <div></div>
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-4 w-16" />
            </div>
          </div>

          {/* Bottom section */}
          <div className="grid md:grid-cols-2 gap-8 mb-6">
            <div>
              <Skeleton className="h-16 w-full mb-2" />
              <Skeleton className="h-5 w-24" />
            </div>
            <div className="flex justify-center">
              <Skeleton className="w-48 h-32 rounded-lg" />
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <Skeleton className="h-4 w-64" />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default InvoiceLoader;
