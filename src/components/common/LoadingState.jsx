import React from 'react';
import { Loader2 } from 'lucide-react';

export const LoadingState = ({ message = 'Loading...', subtitle = 'Please wait while information is retrieved.' }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="relative flex items-center justify-center mb-4">
        <div className="w-12 h-12 rounded-full border-2 border-slate-200 border-t-cyan-600 animate-spin" />
        <Loader2 className="w-5 h-5 text-cyan-600 absolute" />
      </div>
      <h3 className="text-sm font-semibold text-slate-800">{message}</h3>
      {subtitle && <p className="text-xs text-slate-500 mt-1 max-w-sm">{subtitle}</p>}
    </div>
  );
};
