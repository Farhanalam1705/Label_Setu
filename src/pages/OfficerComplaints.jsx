import React, { useState, useEffect } from 'react';
import { 
  AlertCircle, 
  Search, 
  Filter, 
  Eye, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  XCircle, 
  Sparkles,
  ArrowUpDown,
  FileText,
  User,
  Shield,
  HelpCircle,
  Layers,
  ChevronRight,
  RefreshCw,
  ExternalLink
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { getComplaints, subscribeComplaints } from '../services/complaintService';
import { useToast } from '../components/common/Toast';
import { useLanguage } from '../context/LanguageContext';

export const OfficerComplaints = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { t } = useLanguage();

  const [complaints, setComplaints] = useState(() => getComplaints());
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [isLoading, setIsLoading] = useState(false);

  // Subscribe to live multi-tab updates
  useEffect(() => {
    setComplaints(getComplaints());
    const unsubscribe = subscribeComplaints((updated) => {
      setComplaints(updated);
    });
    return () => unsubscribe();
  }, []);

  // Summary Metrics calculated dynamically from shared complaints data
  const totalCount = complaints.length;
  const submittedCount = complaints.filter(
    (c) => c.status?.toUpperCase() === 'SUBMITTED'
  ).length;
  const underReviewCount = complaints.filter(
    (c) =>
      c.status?.toUpperCase() === 'UNDER_REVIEW' ||
      c.status?.toUpperCase() === 'UNDER REVIEW' ||
      c.status?.toUpperCase() === 'ADDITIONAL_EVIDENCE_REQUIRED'
  ).length;
  const resolvedCount = complaints.filter(
    (c) =>
      c.status?.toUpperCase() === 'RESOLVED' ||
      c.status?.toUpperCase() === 'VALIDATED'
  ).length;
  const rejectedCount = complaints.filter(
    (c) => c.status?.toUpperCase() === 'REJECTED'
  ).length;

  // Filtered List
  const filteredComplaints = complaints.filter((item) => {
    const pName = item.productName || item.product || '';
    const cId = item.complaintId || item.id || '';
    const cust = item.customerName || item.customerEmail || '';
    const cat = item.category || '';
    const status = item.status?.toUpperCase() || '';

    const matchesSearch =
      pName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cust.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cat.toLowerCase().includes(searchQuery.toLowerCase());

    let matchesStatus = true;
    if (statusFilter !== 'ALL') {
      if (statusFilter === 'SUBMITTED') {
        matchesStatus = status === 'SUBMITTED';
      } else if (statusFilter === 'UNDER_REVIEW') {
        matchesStatus = status === 'UNDER_REVIEW' || status === 'UNDER REVIEW';
      } else if (statusFilter === 'ADDITIONAL_EVIDENCE') {
        matchesStatus = status === 'ADDITIONAL_EVIDENCE_REQUIRED';
      } else if (statusFilter === 'RESOLVED') {
        matchesStatus = status === 'RESOLVED' || status === 'VALIDATED';
      } else if (statusFilter === 'REJECTED') {
        matchesStatus = status === 'REJECTED';
      }
    }

    let matchesCategory = true;
    if (categoryFilter !== 'ALL') {
      matchesCategory = cat.toLowerCase() === categoryFilter.toLowerCase();
    }

    return matchesSearch && matchesStatus && matchesCategory;
  });

  const getStatusBadge = (statusStr) => {
    const s = (statusStr || '').toUpperCase();
    if (s === 'SUBMITTED') {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
          <Clock className="w-3 h-3" /> Submitted
        </span>
      );
    }
    if (s === 'UNDER_REVIEW' || s === 'UNDER REVIEW') {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-sky-500/10 text-sky-400 border border-sky-500/20">
          <RefreshCw className="w-3 h-3 animate-spin-slow" /> Under Review
        </span>
      );
    }
    if (s === 'ADDITIONAL_EVIDENCE_REQUIRED') {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-purple-500/10 text-purple-300 border border-purple-500/20">
          <AlertTriangle className="w-3 h-3 text-purple-400" /> Evidence Requested
        </span>
      );
    }
    if (s === 'RESOLVED' || s === 'VALIDATED') {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <CheckCircle2 className="w-3 h-3" /> Resolved
        </span>
      );
    }
    if (s === 'REJECTED') {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20">
          <XCircle className="w-3 h-3" /> Rejected
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-800 text-slate-300 border border-slate-700">
        {statusStr}
      </span>
    );
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 mb-1">
            <span>Officer Portal</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-slate-300">Grievance Enforcement</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
            <AlertCircle className="w-7 h-7 text-cyan-400" />
            Complaint Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Review and manage customer complaints submitted through LABEL SETU.
          </p>
        </div>

        <button
          onClick={() => {
            setComplaints(getComplaints());
            addToast({
              type: 'info',
              title: 'Complaints Refreshed',
              message: 'Shared complaints data reloaded from storage.',
            });
          }}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 shadow-xs transition-colors cursor-pointer self-start sm:self-auto"
        >
          <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
          <span>Refresh Feed</span>
        </button>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        {/* Total */}
        <div 
          onClick={() => setStatusFilter('ALL')}
          className={`p-4 rounded-2xl border transition-all cursor-pointer ${
            statusFilter === 'ALL'
              ? 'bg-[#0e2238] border-cyan-500 shadow-md ring-1 ring-cyan-500/30'
              : 'bg-white dark:bg-[#0c1e33] border-slate-200 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Total</span>
            <Layers className="w-4 h-4 text-cyan-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-2 font-mono">
            {totalCount}
          </p>
          <span className="text-[10px] text-slate-400 font-medium">All logged grievances</span>
        </div>

        {/* Submitted */}
        <div 
          onClick={() => setStatusFilter('SUBMITTED')}
          className={`p-4 rounded-2xl border transition-all cursor-pointer ${
            statusFilter === 'SUBMITTED'
              ? 'bg-[#291e10] border-amber-500 shadow-md ring-1 ring-amber-500/30'
              : 'bg-white dark:bg-[#0c1e33] border-slate-200 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-500 dark:text-amber-400">Submitted</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-2 font-mono">
            {submittedCount}
          </p>
          <span className="text-[10px] text-amber-500/80 dark:text-amber-400/70 font-medium">Awaiting initial review</span>
        </div>

        {/* Under Review */}
        <div 
          onClick={() => setStatusFilter('UNDER_REVIEW')}
          className={`p-4 rounded-2xl border transition-all cursor-pointer ${
            statusFilter === 'UNDER_REVIEW'
              ? 'bg-[#0f2238] border-sky-500 shadow-md ring-1 ring-sky-500/30'
              : 'bg-white dark:bg-[#0c1e33] border-slate-200 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-sky-500 dark:text-sky-400">Under Review</span>
            <RefreshCw className="w-4 h-4 text-sky-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-2 font-mono">
            {underReviewCount}
          </p>
          <span className="text-[10px] text-sky-500/80 dark:text-sky-400/70 font-medium">In active verification</span>
        </div>

        {/* Resolved */}
        <div 
          onClick={() => setStatusFilter('RESOLVED')}
          className={`p-4 rounded-2xl border transition-all cursor-pointer ${
            statusFilter === 'RESOLVED'
              ? 'bg-[#0f2d22] border-emerald-500 shadow-md ring-1 ring-emerald-500/30'
              : 'bg-white dark:bg-[#0c1e33] border-slate-200 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-500 dark:text-emerald-400">Resolved</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-2 font-mono">
            {resolvedCount}
          </p>
          <span className="text-[10px] text-emerald-500/80 dark:text-emerald-400/70 font-medium">Validated complaints</span>
        </div>

        {/* Rejected */}
        <div 
          onClick={() => setStatusFilter('REJECTED')}
          className={`p-4 rounded-2xl border transition-all cursor-pointer col-span-2 sm:col-span-1 ${
            statusFilter === 'REJECTED'
              ? 'bg-[#2d1118] border-rose-500 shadow-md ring-1 ring-rose-500/30'
              : 'bg-white dark:bg-[#0c1e33] border-slate-200 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-rose-500 dark:text-rose-400">Rejected</span>
            <XCircle className="w-4 h-4 text-rose-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-2 font-mono">
            {rejectedCount}
          </p>
          <span className="text-[10px] text-rose-500/80 dark:text-rose-400/70 font-medium">Dismissed / Ineligible</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-[#0c1e33] rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800/80 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3.5">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Complaint ID, Product name, Customer email, or Category..."
              className="w-full pl-10 pr-4 py-2 rounded-xl text-xs bg-slate-50 dark:bg-[#071220] text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 focus:outline-hidden focus:border-cyan-500 placeholder:text-slate-400"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="p-2 rounded-xl text-xs bg-slate-50 dark:bg-[#071220] text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 focus:outline-hidden focus:border-cyan-500 cursor-pointer"
            >
              <option value="ALL">All Categories</option>
              <option value="Consumer Care Issue">Consumer Care Issue</option>
              <option value="Missing Information">Missing Information</option>
              <option value="Incorrect MRP">Incorrect MRP</option>
              <option value="Incorrect Quantity">Incorrect Quantity</option>
              <option value="Labeling Issue">Labeling Issue</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        {/* Status Pill Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs font-semibold scrollbar-none">
          {[
            { id: 'ALL', label: 'All Complaints', count: totalCount },
            { id: 'SUBMITTED', label: 'Submitted', count: submittedCount },
            { id: 'UNDER_REVIEW', label: 'Under Review', count: underReviewCount },
            { id: 'ADDITIONAL_EVIDENCE', label: 'Evidence Requested' },
            { id: 'RESOLVED', label: 'Resolved / Validated', count: resolvedCount },
            { id: 'REJECTED', label: 'Rejected', count: rejectedCount },
          ].map((tab) => {
            const isActive = statusFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setStatusFilter(tab.id)}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer text-xs ${
                  isActive
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span className={`ml-1.5 px-1.5 py-0.2 rounded text-[10px] font-mono ${
                    isActive ? 'bg-slate-950/20 text-slate-950 font-bold' : 'bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Table / Cards View */}
      <div className="bg-white dark:bg-[#0c1e33] rounded-2xl border border-slate-200 dark:border-slate-800/80 shadow-xs overflow-hidden">
        {filteredComplaints.length === 0 ? (
          /* Empty State */
          <div className="p-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto text-slate-400">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">No complaints found</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto mt-1">
                {searchQuery || statusFilter !== 'ALL' || categoryFilter !== 'ALL'
                  ? 'Try clearing the search query or status filter to view all customer complaints.'
                  : 'No customer grievances are currently registered in the system.'}
              </p>
            </div>
            {(searchQuery || statusFilter !== 'ALL' || categoryFilter !== 'ALL') && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setStatusFilter('ALL');
                  setCategoryFilter('ALL');
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-colors cursor-pointer"
              >
                Reset Filters
              </button>
            )}
          </div>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/75 dark:bg-[#071220]/75 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                    <th className="py-3.5 px-4">Complaint ID</th>
                    <th className="py-3.5 px-4">Product</th>
                    <th className="py-3.5 px-4">Customer</th>
                    <th className="py-3.5 px-4">Category</th>
                    <th className="py-3.5 px-4">AI Result</th>
                    <th className="py-3.5 px-4">Confidence</th>
                    <th className="py-3.5 px-4">Submitted</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium">
                  {filteredComplaints.map((item) => {
                    const cId = item.complaintId || item.id;
                    const pName = item.productName || item.product;
                    const confidence = item.aiAnalysis?.confidence ?? item.confidence ?? 88;
                    const hasIssue = item.aiAnalysis?.issueDetected ?? true;
                    const isSubmitted = item.status?.toUpperCase() === 'SUBMITTED';

                    return (
                      <tr 
                        key={cId}
                        className="hover:bg-slate-50 dark:hover:bg-[#0f233a] transition-colors group cursor-pointer"
                        onClick={() => navigate(`/complaints/${cId}`)}
                      >
                        {/* ID */}
                        <td className="py-3.5 px-4 font-mono font-bold text-cyan-500 dark:text-cyan-400">
                          {cId}
                        </td>

                        {/* Product */}
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-2.5">
                            <img
                              src={item.image || item.imageUrl}
                              alt={pName}
                              className="w-8 h-8 rounded-lg object-cover border border-slate-200 dark:border-slate-700 shrink-0"
                            />
                            <span className="font-bold text-slate-900 dark:text-white truncate max-w-[150px]">
                              {pName}
                            </span>
                          </div>
                        </td>

                        {/* Customer */}
                        <td className="py-3.5 px-4">
                          <div>
                            <p className="font-bold text-slate-800 dark:text-slate-200">{item.customerName || 'Customer'}</p>
                            <p className="text-[10px] text-slate-400 truncate max-w-[130px] font-mono">
                              {item.customerEmail || 'customer@labelsetu.gov.in'}
                            </p>
                          </div>
                        </td>

                        {/* Category */}
                        <td className="py-3.5 px-4 text-slate-700 dark:text-slate-300 font-medium">
                          {item.category || 'Consumer Care Issue'}
                        </td>

                        {/* AI Result */}
                        <td className="py-3.5 px-4">
                          {hasIssue ? (
                            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-500 dark:text-amber-400">
                              <AlertTriangle className="w-3 h-3" /> Issue Detected
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-500 dark:text-emerald-400">
                              <CheckCircle2 className="w-3 h-3" /> Clear
                            </span>
                          )}
                        </td>

                        {/* Confidence */}
                        <td className="py-3.5 px-4 font-mono font-bold text-slate-700 dark:text-slate-300">
                          {confidence}%
                        </td>

                        {/* Submitted */}
                        <td className="py-3.5 px-4 text-slate-500 dark:text-slate-400 whitespace-nowrap text-[11px]">
                          {item.date || '09 Sep 2026'}
                        </td>

                        {/* Status */}
                        <td className="py-3.5 px-4">
                          {getStatusBadge(item.status)}
                        </td>

                        {/* Action */}
                        <td className="py-3.5 px-4 text-right">
                          <Link
                            to={`/complaints/${cId}`}
                            onClick={(e) => e.stopPropagation()}
                            className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                              isSubmitted
                                ? 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-xs'
                                : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200'
                            }`}
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>{isSubmitted ? 'Review' : 'View'}</span>
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile Card List View */}
            <div className="md:hidden divide-y divide-slate-200 dark:divide-slate-800">
              {filteredComplaints.map((item) => {
                const cId = item.complaintId || item.id;
                const pName = item.productName || item.product;
                const confidence = item.aiAnalysis?.confidence ?? item.confidence ?? 88;
                const isSubmitted = item.status?.toUpperCase() === 'SUBMITTED';

                return (
                  <div
                    key={cId}
                    onClick={() => navigate(`/complaints/${cId}`)}
                    className="p-4 space-y-3 hover:bg-slate-50 dark:hover:bg-[#0f233a] transition-colors cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-xs text-cyan-400">{cId}</span>
                      {getStatusBadge(item.status)}
                    </div>

                    <div className="flex items-center gap-3">
                      <img
                        src={item.image || item.imageUrl}
                        alt={pName}
                        className="w-12 h-12 rounded-xl object-cover border border-slate-700 shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="font-bold text-sm text-slate-900 dark:text-white truncate">{pName}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{item.category}</p>
                        <p className="text-[11px] text-slate-400 mt-0.5">{item.customerEmail}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100 dark:border-slate-800/80">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] text-slate-400">AI Match:</span>
                        <span className="font-mono font-bold text-emerald-400">{confidence}%</span>
                      </div>
                      <span className="text-[11px] text-slate-400">{item.date || '09 Sep 2026'}</span>
                    </div>

                    <div className="pt-1 flex justify-end">
                      <Link
                        to={`/complaints/${cId}`}
                        onClick={(e) => e.stopPropagation()}
                        className={`w-full text-center py-2 rounded-xl text-xs font-bold transition-all ${
                          isSubmitted
                            ? 'bg-cyan-500 hover:bg-cyan-400 text-slate-950'
                            : 'bg-slate-800 text-slate-200'
                        }`}
                      >
                        {isSubmitted ? 'Start Review' : 'View Details'} &rarr;
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
