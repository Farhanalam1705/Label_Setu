import React from 'react';
import { FileText, ArrowLeft, Download } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { CUSTOMER_RECENT_REPORTS } from '../../data/customerMockData';

export const CustomerReports = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-rose-700 mb-1">
            <Link to="/customer/dashboard" className="hover:underline flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
            </Link>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Inspection Reports
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Official compliance certificates and signed verification summaries
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-rose-50 text-rose-700 border border-rose-200">
            2 Reports Available
          </span>
        </div>
      </div>

      {/* Reports List */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <span className="text-xs font-bold text-slate-700">Archived Documents</span>
          <span className="text-xs text-slate-400">PDF Format &bull; Government Digitally Stamped</span>
        </div>

        <div className="divide-y divide-slate-100">
          {CUSTOMER_RECENT_REPORTS.map((rep) => (
            <div
              key={rep.id}
              className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-mono font-bold text-xs text-slate-900">{rep.name}</h3>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mt-1">
                    <span>Product: {rep.product}</span>
                    <span>&bull;</span>
                    <span>Issued: {rep.date}</span>
                    <span>&bull;</span>
                    <span className="text-emerald-700 font-semibold">{rep.status}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto">
                <button
                  onClick={() => navigate(`/customer/inspections/${rep.inspectionId}`)}
                  className="px-3.5 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold text-xs transition-colors cursor-pointer border border-rose-200/60"
                >
                  View Details
                </button>
                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#57184a] hover:bg-[#431238] text-white font-semibold text-xs transition-colors shadow-2xs cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
