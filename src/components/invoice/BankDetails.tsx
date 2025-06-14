
import React from 'react';
import { BankInfo } from '../EditableInvoice';

interface BankDetailsProps {
  bankDetails: BankInfo;
  declaration: string;
  companyName: string;
}

const BankDetails = ({ bankDetails, declaration, companyName }: BankDetailsProps) => {
  return (
    <div className="border-t-2 border-[#3bbceb] pt-6">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h4 className="font-semibold text-[#3bbceb] mb-4">Company's Bank Details</h4>
          <div className="bg-gradient-to-br from-[#3bbceb]/5 to-[#3bbceb]/10 p-4 rounded-lg border border-[#3bbceb]/20 space-y-3">
            <div>
              <div className="text-sm font-medium text-gray-700 mb-1">A/c Holder's Name:</div>
              <div className="text-gray-900 font-semibold">{bankDetails.accountName}</div>
            </div>
            
            <div>
              <div className="text-sm font-medium text-gray-700 mb-1">Bank Name:</div>
              <div className="text-gray-900">{bankDetails.bankName}</div>
            </div>
            
            <div>
              <div className="text-sm font-medium text-gray-700 mb-1">A/c No.:</div>
              <div className="text-gray-900 font-mono">{bankDetails.accountNumber}</div>
            </div>
            
            <div>
              <div className="text-sm font-medium text-gray-700 mb-1">Branch & IFS Code:</div>
              <div className="text-gray-900 font-mono">{bankDetails.ifscCode}</div>
            </div>
          </div>
          
          <div className="mt-6">
            <div className="text-sm font-medium text-gray-700 mb-2">Declaration</div>
            <div className="text-sm text-gray-900 p-3 bg-gray-50 rounded-md border">
              {declaration}
            </div>
          </div>
        </div>
        
        <div className="flex flex-col justify-between">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-16">Company's VAT TIN : 27161064144</p>
            <div className="border-b-2 border-gray-300 mb-2 w-48 mx-auto"></div>
            <p className="font-semibold text-[#3bbceb] text-lg">{companyName}</p>
            <p className="text-sm text-gray-600">(Authorised Signatory)</p>
          </div>
          
          <div className="text-center mt-8">
            <p className="text-xs text-gray-500">This is a Computer Generated Invoice</p>
            <div className="mt-4 text-[#3bbceb] font-bold text-lg tracking-wider">
              PROPRIETOR
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankDetails;
