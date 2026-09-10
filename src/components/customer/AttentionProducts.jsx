import React from 'react';
import { AlertCircle, ArrowRight, PackageOpen, ChevronRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { StatusBadge } from '../results/StatusBadge';
import { CUSTOMER_ATTENTION_PRODUCTS } from '../../data/customerMockData';

export const AttentionProducts = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            <AlertCircle className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 tracking-tight">
              Products Requiring Attention
            </h2>
            <p className="text-xs text-slate-400">Declarations flagged for correction</p>
          </div>
        </div>

        <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
          3 Items
        </span>
      </div>

      {/* Cards List */}
      <div className="py-4 space-y-3">
        {CUSTOMER_ATTENTION_PRODUCTS.map((prod) => (
          <div
            key={prod.id}
            className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-slate-50 hover:border-slate-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-slate-900 group-hover:text-indigo-600 transition-colors">
                  {prod.name}
                </span>
                <StatusBadge status={prod.status} size="sm" />
              </div>
              <p className="text-xs text-slate-500 line-clamp-1">{prod.issue}</p>
              <div className="text-[11px] text-slate-400">
                Inspection Ref: <span className="font-mono font-medium text-slate-600">{prod.inspectionId}</span> &bull; Updated: {prod.updatedAt}
              </div>
            </div>

            <button
              onClick={() => navigate(`/customer/products/${prod.id}`)}
              className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors shrink-0 cursor-pointer self-start sm:self-auto"
            >
              <span>View Product</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      {/* Footer link */}
      <div className="pt-3 border-t border-slate-100 text-right">
        <Link
          to="/customer/products"
          className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
        >
          <span>View All Products in Catalog</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
