
import React from 'react';
import { PartyInfo } from '../EditableInvoice';

interface PartyDetailsProps {
  seller: PartyInfo;
  buyer: PartyInfo;
}

const PartyDetails = ({ seller, buyer }: PartyDetailsProps) => {
  return (
    <div className="grid md:grid-cols-2 gap-8 mb-8">
      <div className="bg-gradient-to-br from-[#3bbceb]/5 to-[#3bbceb]/10 p-6 rounded-lg border border-[#3bbceb]/20">
        <h3 className="font-bold text-[#3bbceb] mb-4 text-lg">Consignee (Ship to)</h3>
        <div className="space-y-3">
          <div>
            <div className="text-sm font-medium text-gray-700 mb-1">Company Name</div>
            <div className="text-gray-900 font-semibold">{seller.name}</div>
          </div>
          
          <div>
            <div className="text-sm font-medium text-gray-700 mb-1">Address</div>
            <div className="text-gray-900">{seller.address}</div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm font-medium text-gray-700 mb-1">GSTIN/UIN</div>
              <div className="text-gray-900 font-mono">{seller.gstin}</div>
            </div>
            
            <div>
              <div className="text-sm font-medium text-gray-700 mb-1">State Code</div>
              <div className="text-gray-900">{seller.stateCode}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-lg border border-gray-200">
        <h3 className="font-bold text-gray-800 mb-4 text-lg">Buyer (Bill to)</h3>
        <div className="space-y-3">
          <div>
            <div className="text-sm font-medium text-gray-700 mb-1">Company Name</div>
            <div className="text-gray-900 font-semibold">{buyer.name}</div>
          </div>
          
          <div>
            <div className="text-sm font-medium text-gray-700 mb-1">Address</div>
            <div className="text-gray-900">{buyer.address}</div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm font-medium text-gray-700 mb-1">GSTIN/UIN</div>
              <div className="text-gray-900 font-mono">{buyer.gstin}</div>
            </div>
            
            <div>
              <div className="text-sm font-medium text-gray-700 mb-1">State Code</div>
              <div className="text-gray-900">{buyer.stateCode}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartyDetails;
