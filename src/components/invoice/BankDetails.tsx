
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BankInfo } from '../EditableInvoice';

interface BankDetailsProps {
  bankDetails: BankInfo;
  declaration: string;
  onUpdate: (field: string, value: any) => void;
}

const BankDetails = ({ bankDetails, declaration, onUpdate }: BankDetailsProps) => {
  const updateBankDetails = (field: keyof BankInfo, value: string) => {
    onUpdate('bankDetails', { ...bankDetails, [field]: value });
  };

  return (
    <div className="border-t-2 border-[#3bbceb] pt-6">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h4 className="font-semibold text-[#3bbceb] mb-4">Company's Bank Details</h4>
          <div className="bg-gradient-to-br from-[#3bbceb]/5 to-[#3bbceb]/10 p-4 rounded-lg border border-[#3bbceb]/20 space-y-3">
            <div>
              <Label htmlFor="accountName" className="text-sm font-medium text-gray-700">
                A/c Holder's Name:
              </Label>
              <Input
                id="accountName"
                value={bankDetails.accountName}
                onChange={(e) => updateBankDetails('accountName', e.target.value)}
                className="mt-1 border-[#3bbceb]/30 focus:border-[#3bbceb] focus:ring-[#3bbceb]"
              />
            </div>
            
            <div>
              <Label htmlFor="bankName" className="text-sm font-medium text-gray-700">
                Bank Name:
              </Label>
              <Input
                id="bankName"
                value={bankDetails.bankName}
                onChange={(e) => updateBankDetails('bankName', e.target.value)}
                className="mt-1 border-[#3bbceb]/30 focus:border-[#3bbceb] focus:ring-[#3bbceb]"
              />
            </div>
            
            <div>
              <Label htmlFor="accountNumber" className="text-sm font-medium text-gray-700">
                A/c No.:
              </Label>
              <Input
                id="accountNumber"
                value={bankDetails.accountNumber}
                onChange={(e) => updateBankDetails('accountNumber', e.target.value)}
                className="mt-1 border-[#3bbceb]/30 focus:border-[#3bbceb] focus:ring-[#3bbceb]"
              />
            </div>
            
            <div>
              <Label htmlFor="ifscCode" className="text-sm font-medium text-gray-700">
                Branch & IFS Code:
              </Label>
              <Input
                id="ifscCode"
                value={bankDetails.ifscCode}
                onChange={(e) => updateBankDetails('ifscCode', e.target.value)}
                className="mt-1 border-[#3bbceb]/30 focus:border-[#3bbceb] focus:ring-[#3bbceb]"
              />
            </div>
          </div>
          
          <div className="mt-6">
            <Label htmlFor="declaration" className="text-sm font-medium text-gray-700">
              Declaration
            </Label>
            <textarea
              id="declaration"
              value={declaration}
              onChange={(e) => onUpdate('declaration', e.target.value)}
              rows={3}
              className="mt-1 w-full p-3 border border-[#3bbceb]/30 rounded-md focus:border-[#3bbceb] focus:ring-[#3bbceb] focus:ring-1 text-sm"
              placeholder="Declaration text..."
            />
          </div>
        </div>
        
        <div className="flex flex-col justify-between">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-16">Company's VAT TIN : 27161064144</p>
            <div className="border-b-2 border-gray-300 mb-2 w-48 mx-auto"></div>
            <p className="font-semibold text-[#3bbceb] text-lg">NAVNEET ULTRALITE</p>
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
