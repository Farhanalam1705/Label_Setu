import React from 'react';
import { Package, Building, Calendar, Phone, Hash, DollarSign } from 'lucide-react';

export const ProductInformation = ({ product = {} }) => {
  const infoItems = [
    { label: 'Product Name', value: product.name || 'Premium Basmati Rice', bold: true },
    { label: 'Manufacturer', value: product.manufacturer || 'ABC Foods Pvt. Ltd.' },
    { label: 'Packer', value: product.packer || 'ABC Foods Pvt. Ltd.' },
    { label: 'Importer', value: product.importer || 'Not Applicable' },
    { label: 'Net Quantity', value: product.netQuantity || '5 kg', bold: true },
    { label: 'MRP', value: product.mrp || '₹520', bold: true },
    { label: 'Packed Date', value: product.packedDate || '08/2026' },
    { label: 'Batch/Lot', value: product.batchNo || 'AR52026', mono: true },
    { label: 'Consumer Care', value: product.consumerCare || '1800-XXX-XXXX' },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-6 space-y-4">
      <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
        <div className="p-2 bg-slate-100 text-slate-700 rounded-lg">
          <Package className="w-4 h-4" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-slate-900">Product Information</h3>
          <p className="text-xs text-slate-500">Declared statutory packaging attributes.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
        {infoItems.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between p-3 bg-slate-50/80 rounded-xl border border-slate-200/70"
          >
            <span className="text-slate-500 font-medium">{item.label}</span>
            <span
              className={`${
                item.bold ? 'font-bold text-slate-900' : 'font-semibold text-slate-800'
              } ${item.mono ? 'font-mono' : ''} text-right max-w-[220px] truncate`}
            >
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
