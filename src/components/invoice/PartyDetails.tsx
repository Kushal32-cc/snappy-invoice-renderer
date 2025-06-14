
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PartyInfo } from '../EditableInvoice';

interface PartyDetailsProps {
  seller: PartyInfo;
  buyer: PartyInfo;
  onUpdate: (field: string, value: PartyInfo) => void;
}

const PartyDetails = ({ seller, buyer, onUpdate }: PartyDetailsProps) => {
  const updateSeller = (field: keyof PartyInfo, value: string) => {
    onUpdate('seller', { ...seller, [field]: value });
  };

  const updateBuyer = (field: keyof PartyInfo, value: string) => {
    onUpdate('buyer', { ...buyer, [field]: value });
  };

  return (
    <div className="grid md:grid-cols-2 gap-8 mb-8">
      <div className="bg-gradient-to-br from-[#3bbceb]/5 to-[#3bbceb]/10 p-6 rounded-lg border border-[#3bbceb]/20">
        <h3 className="font-bold text-[#3bbceb] mb-4 text-lg">Consignee (Ship to)</h3>
        <div className="space-y-3">
          <div>
            <Label htmlFor="sellerName" className="text-sm font-medium text-gray-700">
              Company Name
            </Label>
            <Input
              id="sellerName"
              value={seller.name}
              onChange={(e) => updateSeller('name', e.target.value)}
              className="mt-1 border-[#3bbceb]/30 focus:border-[#3bbceb] focus:ring-[#3bbceb]"
            />
          </div>
          
          <div>
            <Label htmlFor="sellerAddress" className="text-sm font-medium text-gray-700">
              Address
            </Label>
            <Input
              id="sellerAddress"
              value={seller.address}
              onChange={(e) => updateSeller('address', e.target.value)}
              className="mt-1 border-[#3bbceb]/30 focus:border-[#3bbceb] focus:ring-[#3bbceb]"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label htmlFor="sellerGstin" className="text-sm font-medium text-gray-700">
                GSTIN/UIN
              </Label>
              <Input
                id="sellerGstin"
                value={seller.gstin}
                onChange={(e) => updateSeller('gstin', e.target.value)}
                className="mt-1 border-[#3bbceb]/30 focus:border-[#3bbceb] focus:ring-[#3bbceb]"
              />
            </div>
            
            <div>
              <Label htmlFor="sellerStateCode" className="text-sm font-medium text-gray-700">
                State Code
              </Label>
              <Input
                id="sellerStateCode"
                value={seller.stateCode}
                onChange={(e) => updateSeller('stateCode', e.target.value)}
                className="mt-1 border-[#3bbceb]/30 focus:border-[#3bbceb] focus:ring-[#3bbceb]"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-lg border border-gray-200">
        <h3 className="font-bold text-gray-800 mb-4 text-lg">Buyer (Bill to)</h3>
        <div className="space-y-3">
          <div>
            <Label htmlFor="buyerName" className="text-sm font-medium text-gray-700">
              Company Name
            </Label>
            <Input
              id="buyerName"
              value={buyer.name}
              onChange={(e) => updateBuyer('name', e.target.value)}
              className="mt-1 border-gray-300 focus:border-[#3bbceb] focus:ring-[#3bbceb]"
            />
          </div>
          
          <div>
            <Label htmlFor="buyerAddress" className="text-sm font-medium text-gray-700">
              Address
            </Label>
            <Input
              id="buyerAddress"
              value={buyer.address}
              onChange={(e) => updateBuyer('address', e.target.value)}
              className="mt-1 border-gray-300 focus:border-[#3bbceb] focus:ring-[#3bbceb]"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label htmlFor="buyerGstin" className="text-sm font-medium text-gray-700">
                GSTIN/UIN
              </Label>
              <Input
                id="buyerGstin"
                value={buyer.gstin}
                onChange={(e) => updateBuyer('gstin', e.target.value)}
                className="mt-1 border-gray-300 focus:border-[#3bbceb] focus:ring-[#3bbceb]"
              />
            </div>
            
            <div>
              <Label htmlFor="buyerStateCode" className="text-sm font-medium text-gray-700">
                State Code
              </Label>
              <Input
                id="buyerStateCode"
                value={buyer.stateCode}
                onChange={(e) => updateBuyer('stateCode', e.target.value)}
                className="mt-1 border-gray-300 focus:border-[#3bbceb] focus:ring-[#3bbceb]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartyDetails;
