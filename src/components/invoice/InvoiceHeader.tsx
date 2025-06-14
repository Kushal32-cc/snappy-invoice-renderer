
import React from 'react';

interface DeliveryDetails {
  deliveryNote: string;
  paymentTerms: string;
  referenceNo: string;
  referenceDate: string;
  otherReferences: string;
  buyerOrderNo: string;
  buyerOrderDate: string;
  dispatchDocNo: string;
  deliveryNoteDate: string;
  dispatchedThrough: string;
  destination: string;
  termsOfDelivery: string;
}

interface InvoiceHeaderProps {
  invoiceNumber: string;
  date: string;
  deliveryDetails: DeliveryDetails;
}

const InvoiceHeader = ({ invoiceNumber, date, deliveryDetails }: InvoiceHeaderProps) => {
  return (
    <div className="border-b-2 border-[#3bbceb] pb-6 mb-8">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-4xl font-bold text-[#3bbceb] mb-2">TAX INVOICE</h1>
          <p className="text-sm text-gray-600">Original Copy</p>
        </div>
        
        <div className="text-right space-y-2">
          <div className="grid grid-cols-2 gap-8 text-sm">
            <div>
              <span className="text-gray-600">Invoice No.</span>
            </div>
            <div>
              <span className="font-semibold">{invoiceNumber}</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-8 text-sm">
            <div>
              <span className="text-gray-600">Dated</span>
            </div>
            <div>
              <span className="font-semibold">{date}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Delivery Details Table */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <tbody>
            <tr className="border-b border-gray-200">
              <td className="py-3 px-4 font-medium text-gray-700 bg-gray-100 w-1/4">Delivery Note</td>
              <td className="py-3 px-4">{deliveryDetails.deliveryNote}</td>
              <td className="py-3 px-4 font-medium text-gray-700 bg-gray-100 w-1/4">Mode/Terms of Payment</td>
              <td className="py-3 px-4">{deliveryDetails.paymentTerms}</td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className="py-3 px-4 font-medium text-gray-700 bg-gray-100">Reference No. & Date.</td>
              <td className="py-3 px-4">{deliveryDetails.referenceNo} dt. {deliveryDetails.referenceDate}</td>
              <td className="py-3 px-4 font-medium text-gray-700 bg-gray-100">Other References</td>
              <td className="py-3 px-4">{deliveryDetails.otherReferences}</td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className="py-3 px-4 font-medium text-gray-700 bg-gray-100">Buyer's Order No.</td>
              <td className="py-3 px-4">{deliveryDetails.buyerOrderNo}</td>
              <td className="py-3 px-4 font-medium text-gray-700 bg-gray-100">Dated</td>
              <td className="py-3 px-4">{deliveryDetails.buyerOrderDate}</td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className="py-3 px-4 font-medium text-gray-700 bg-gray-100">Dispatch Doc No.</td>
              <td className="py-3 px-4">{deliveryDetails.dispatchDocNo}</td>
              <td className="py-3 px-4 font-medium text-gray-700 bg-gray-100">Delivery Note Date</td>
              <td className="py-3 px-4">{deliveryDetails.deliveryNoteDate}</td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className="py-3 px-4 font-medium text-gray-700 bg-gray-100">Dispatched through</td>
              <td className="py-3 px-4">{deliveryDetails.dispatchedThrough}</td>
              <td className="py-3 px-4 font-medium text-gray-700 bg-gray-100">Destination</td>
              <td className="py-3 px-4">{deliveryDetails.destination}</td>
            </tr>
            <tr>
              <td className="py-3 px-4 font-medium text-gray-700 bg-gray-100">Terms of Delivery</td>
              <td className="py-3 px-4 colspan-3">{deliveryDetails.termsOfDelivery}</td>
              <td className="py-3 px-4"></td>
              <td className="py-3 px-4"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvoiceHeader;
