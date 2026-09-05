import React from 'react';
import { PackageSearch } from 'lucide-react';

export const EmptyState = ({
  title = 'No records found',
  description = 'There are no items matching your criteria at this moment.',
  actionText,
  onAction,
  icon: Icon = PackageSearch,
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center bg-white rounded-xl border border-dashed border-slate-200">
      <div className="p-3 bg-slate-100 rounded-full text-slate-500 mb-3">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-sm font-semibold text-slate-800">{title}</h3>
      <p className="text-xs text-slate-500 mt-1 max-w-sm">{description}</p>
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="mt-4 px-3.5 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};
