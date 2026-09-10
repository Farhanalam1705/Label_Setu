import React from 'react';
import { Package, ArrowLeft, Search, Filter } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { CUSTOMER_ATTENTION_PRODUCTS } from '../../data/customerMockData';
import { StatusBadge } from '../../components/results/StatusBadge';

export const CustomerProducts = () => {
  const { productId } = useParams();

  const allMockProducts = [
    ...CUSTOMER_ATTENTION_PRODUCTS,
    {
      id: 'prod-004',
      name: 'XYZ Premium Atta',
      status: 'Compliant',
      inspectionId: 'LM-2026-00128',
      score: 96,
      issue: 'All statutory declarations conform with Legal Metrology rules.',
      updatedAt: '04 Sep 2026',
    },
    {
      id: 'prod-005',
      name: 'DEF Energy Biscuits',
      status: 'Compliant',
      inspectionId: 'LM-2026-00125',
      score: 94,
      issue: 'Net weight, MRP and best before declarations validated.',
      updatedAt: '01 Sep 2026',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header & Back */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-rose-700 mb-1">
            <Link to="/customer/dashboard" className="hover:underline flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
            </Link>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            {productId ? `Product: ${productId}` : 'My Products'}
          </h1>
        </div>
      </div>

      {/* Product List */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/50">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search product name or SKU..."
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-white focus:outline-hidden focus:ring-2 focus:ring-rose-500"
              readOnly
            />
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span>Filter: All Categories</span>
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {allMockProducts.map((prod) => (
            <div
              key={prod.id}
              className={`p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50 transition-colors ${
                productId === prod.id ? 'bg-rose-50/30 ring-2 ring-rose-500/20' : ''
              }`}
            >
              <div className="space-y-1 max-w-xl">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-700 flex items-center justify-center font-bold shrink-0 border border-rose-200/60">
                    <Package className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-900">{prod.name}</h3>
                    <span className="text-[11px] text-slate-400 font-mono">SKU ID: {prod.id}</span>
                  </div>
                  <StatusBadge status={prod.status} size="sm" />
                </div>
                <p className="text-xs text-slate-500 pt-1">{prod.issue}</p>
              </div>

              <div className="flex items-center gap-4 self-start md:self-auto text-xs">
                <div className="text-right">
                  <span className="text-[11px] text-slate-400 block">Inspection Score</span>
                  <span className="font-black text-slate-900 text-sm">{prod.score}%</span>
                </div>
                <Link
                  to={`/customer/inspections/${prod.inspectionId}`}
                  className="px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold text-xs transition-colors border border-rose-200/60"
                >
                  View Inspection
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
