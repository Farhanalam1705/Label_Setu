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
      c.status?.toUpperCase() === 'ADDITIONAL_EVIDENCE_REQUIRED' ||
      c.status?.toUpperCase() === 'EVIDENCE_REQUESTED'
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

  const getTranslatedCategory = (cat) => {
    if (!cat) return t('consumerCareIssue', 'Consumer Care Issue');
    if (cat.includes('MRP')) return t('incorrectMrp', 'Incorrect MRP');
    if (cat.includes('Quantity')) return t('incorrectQuantity', 'Incorrect Quantity');
    if (cat.includes('Missing')) return t('missingInformation', 'Missing Information');
    if (cat.includes('Labeling')) return t('labelingIssue', 'Labeling Issue');
    if (cat.includes('Consumer')) return t('consumerCareIssue', 'Consumer Care Issue');
    return cat;
  };

  const getComplaintEvidenceImage = (complaint) =>
    complaint?.evidence?.find((evidence) => evidence?.url)?.url ||
    complaint?.image ||
    complaint?.imageUrl ||
    null;

  const getStatusBadge = (statusStr) => {
    const s = (statusStr || '').toUpperCase();
    if (s === 'SUBMITTED') {
      return (
        <span className="inline-flex max-w-full items-center justify-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] leading-tight font-bold bg-amber-50 text-amber-700 border border-amber-200/80 whitespace-normal">
          <Clock className="w-3 h-3" /> {t('submitted', 'Submitted')}
        </span>
      );
    }
    if (s === 'UNDER_REVIEW' || s === 'UNDER REVIEW') {
      return (
        <span className="inline-flex max-w-full items-center justify-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] leading-tight font-bold bg-sky-50 text-sky-700 border border-sky-200/80 whitespace-normal">
          <RefreshCw className="w-3 h-3" /> {t('underReview', 'Under Review')}
        </span>
      );
    }
    if (s === 'ADDITIONAL_EVIDENCE_REQUIRED' || s === 'EVIDENCE_REQUESTED') {
      return (
        <span className="inline-flex max-w-full items-center justify-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] leading-tight font-bold bg-purple-50 text-purple-700 border border-purple-200/80 whitespace-normal">
          <AlertTriangle className="w-3 h-3 text-purple-600" /> {t('evidenceRequested', 'Evidence Requested')}
        </span>
      );
    }
    if (s === 'RESOLVED' || s === 'VALIDATED') {
      return (
        <span className="inline-flex max-w-full items-center justify-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] leading-tight font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/80 whitespace-normal">
          <CheckCircle2 className="w-3 h-3" /> {t('resolved', 'Resolved')}
        </span>
      );
    }
    if (s === 'REJECTED') {
      return (
        <span className="inline-flex max-w-full items-center justify-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] leading-tight font-bold bg-rose-50 text-rose-700 border border-rose-200/80 whitespace-normal">
          <XCircle className="w-3 h-3" /> {t('rejected', 'Rejected')}
        </span>
      );
    }
    return (
      <span className="inline-flex max-w-full items-center justify-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] leading-tight font-bold bg-slate-100 text-slate-700 border border-slate-200 whitespace-normal">
        {statusStr}
      </span>
    );
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-800 bg-cyan-50 px-2.5 py-0.5 rounded-md border border-cyan-200 flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-cyan-600" /> {t('grievanceEnforcement', 'Grievance Enforcement')}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
            <AlertCircle className="w-7 h-7 text-cyan-600" />
            {t('complaintManagement', 'Complaint Management')}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {t('complaintManagementSubtitle', 'Review and manage customer complaints submitted through LABEL SETU.')}
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setComplaints(getComplaints());
            addToast({
              type: 'info',
              title: t('complaintsRefreshed', 'Complaints Refreshed'),
              message: t('complaintsRefreshedMsg', 'Shared complaints data reloaded from storage.'),
            });
          }}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-2xs transition-colors cursor-pointer self-start sm:self-auto"
        >
          <RefreshCw className="w-3.5 h-3.5 text-cyan-600" />
          <span>{t('refreshFeed', 'Refresh Feed')}</span>
        </button>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        {/* Total */}
        <div 
          onClick={() => setStatusFilter('ALL')}
          className={`p-4 rounded-2xl border transition-all cursor-pointer bg-white shadow-2xs ${
            statusFilter === 'ALL'
              ? 'border-cyan-500 ring-2 ring-cyan-500/20 bg-cyan-50/20'
              : 'border-slate-200/90 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">{t('total', 'Total')}</span>
            <Layers className="w-4 h-4 text-cyan-600" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-slate-900 mt-2 font-mono">
            {totalCount}
          </p>
          <span className="text-[10px] text-slate-400 font-medium">{t('allLoggedGrievances', 'All logged grievances')}</span>
        </div>

        {/* Submitted */}
        <div 
          onClick={() => setStatusFilter('SUBMITTED')}
          className={`p-4 rounded-2xl border transition-all cursor-pointer bg-white shadow-2xs ${
            statusFilter === 'SUBMITTED'
              ? 'border-amber-500 ring-2 ring-amber-500/20 bg-amber-50/20'
              : 'border-slate-200/90 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-700">{t('submitted', 'Submitted')}</span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-amber-800 mt-2 font-mono">
            {submittedCount}
          </p>
          <span className="text-[10px] text-amber-600/80 font-medium">{t('awaitingInitialReview', 'Awaiting initial review')}</span>
        </div>

        {/* Under Review */}
        <div 
          onClick={() => setStatusFilter('UNDER_REVIEW')}
          className={`p-4 rounded-2xl border transition-all cursor-pointer bg-white shadow-2xs ${
            statusFilter === 'UNDER_REVIEW'
              ? 'border-sky-500 ring-2 ring-sky-500/20 bg-sky-50/20'
              : 'border-slate-200/90 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-sky-700">{t('underReview', 'Under Review')}</span>
            <RefreshCw className="w-4 h-4 text-sky-600" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-sky-800 mt-2 font-mono">
            {underReviewCount}
          </p>
          <span className="text-[10px] text-sky-600/80 font-medium">{t('inActiveVerification', 'In active verification')}</span>
        </div>

        {/* Resolved */}
        <div 
          onClick={() => setStatusFilter('RESOLVED')}
          className={`p-4 rounded-2xl border transition-all cursor-pointer bg-white shadow-2xs ${
            statusFilter === 'RESOLVED'
              ? 'border-emerald-500 ring-2 ring-emerald-500/20 bg-emerald-50/20'
              : 'border-slate-200/90 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-700">{t('resolved', 'Resolved')}</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-emerald-800 mt-2 font-mono">
            {resolvedCount}
          </p>
          <span className="text-[10px] text-emerald-600/80 font-medium">{t('validatedComplaints', 'Validated complaints')}</span>
        </div>

        {/* Rejected */}
        <div 
          onClick={() => setStatusFilter('REJECTED')}
          className={`p-4 rounded-2xl border transition-all cursor-pointer col-span-2 sm:col-span-1 bg-white shadow-2xs ${
            statusFilter === 'REJECTED'
              ? 'border-rose-500 ring-2 ring-rose-500/20 bg-rose-50/20'
              : 'border-slate-200/90 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-rose-700">{t('rejected', 'Rejected')}</span>
            <XCircle className="w-4 h-4 text-rose-600" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-rose-800 mt-2 font-mono">
            {rejectedCount}
          </p>
          <span className="text-[10px] text-rose-600/80 font-medium">{t('dismissedIneligible', 'Dismissed / Ineligible')}</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-2xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3.5">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('searchComplaintsOfficerPlaceholder', 'Search by Complaint ID, Product name, Customer email, or Category...')}
              className="w-full pl-10 pr-4 py-2 rounded-xl text-xs bg-slate-50 text-slate-900 border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-cyan-500 focus:bg-white placeholder:text-slate-400 transition-all"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="text-xs bg-slate-50 text-slate-700 font-semibold px-3 py-2 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-cyan-500 cursor-pointer"
            >
              <option value="ALL">{t('allCategories', 'All Categories')}</option>
              <option value="Incorrect MRP">{t('incorrectMrp', 'Incorrect MRP')}</option>
              <option value="Incorrect Quantity">{t('incorrectQuantity', 'Incorrect Quantity')}</option>
              <option value="Missing Information">{t('missingInformation', 'Missing Information')}</option>
              <option value="Labeling Issue">{t('labelingIssue', 'Labeling Issue')}</option>
              <option value="Consumer Care Issue">{t('consumerCareIssue', 'Consumer Care Issue')}</option>
            </select>
          </div>
        </div>

        {/* Status Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1 border-t border-slate-100">
          {[
            { key: 'ALL', label: t('allComplaints', 'All Complaints'), count: totalCount },
            { key: 'SUBMITTED', label: t('submitted', 'Submitted'), count: submittedCount },
            { key: 'UNDER_REVIEW', label: t('underReview', 'Under Review'), count: underReviewCount },
            { 
              key: 'ADDITIONAL_EVIDENCE', 
              label: t('evidenceRequested', 'Evidence Requested'), 
              count: complaints.filter(c => c.status === 'ADDITIONAL_EVIDENCE_REQUIRED').length 
            },
            { key: 'RESOLVED', label: t('resolvedValidated', 'Resolved / Validated'), count: resolvedCount },
            { key: 'REJECTED', label: t('rejected', 'Rejected'), count: rejectedCount },
          ].map((pill) => (
            <button
              key={pill.key}
              onClick={() => setStatusFilter(pill.key)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                statusFilter === pill.key
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <span>{pill.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                statusFilter === pill.key ? 'bg-slate-800 text-cyan-400' : 'bg-slate-200 text-slate-600'
              }`}>
                {pill.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Complaints Table Container */}
      <div className="min-w-0 max-w-full bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-700">{t('complaintRecords', 'Complaint Records')}</span>
            <span className="text-[11px] font-mono text-slate-400">({filteredComplaints.length} {t('recordsFound', 'records found')})</span>
          </div>
        </div>

        {filteredComplaints.length > 0 ? (
          <>
            {/* Single Frame Desktop & Tablet Table (No Horizontal Scrolling) */}
            <div className="hidden md:block min-w-0 w-full max-w-full">
              <table className="w-full table-fixed text-left text-xs text-slate-700 border-collapse">
                <colgroup>
                  <col className="w-[8.75rem]" />
                  <col />
                  <col className="w-[9rem]" />
                  <col className="w-[7.25rem]" />
                  <col className="w-[7rem]" />
                  <col className="w-[4.5rem]" />
                </colgroup>
                <thead className="bg-slate-50/90 text-slate-500 font-bold uppercase tracking-wider text-[10px] border-b border-slate-100">
                  <tr>
                    <th className="py-3 px-3 font-mono">{t('complaintId', 'Complaint ID')}</th>
                    <th className="py-3 px-3">{t('product', 'Product')} & {t('customer', 'Customer')}</th>
                    <th className="py-3 px-2.5">{t('category', 'Category')}</th>
                    <th className="py-3 px-2.5">{t('aiResult', 'AI Result')}</th>
                    <th className="py-3 px-2 text-center">{t('status', 'Status')}</th>
                    <th className="py-3 px-2 text-center">{t('view', 'View')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {filteredComplaints.map((item) => {
                    const cId = item.complaintId || item.id;
                    const pName = item.productName || item.product;
                    const confidence = item.aiAnalysis?.confidence ?? item.confidence ?? 88;
                    const hasIssue = item.aiAnalysis?.issueDetected ?? true;
                    const isSubmitted = item.status?.toUpperCase() === 'SUBMITTED';
                    const evidenceImage = getComplaintEvidenceImage(item);

                    return (
                      <tr 
                        key={cId}
                        className="hover:bg-slate-50/80 transition-colors"
                      >
                        {/* Complaint ID & Date */}
                        <td className="py-2.5 px-3 align-middle">
                          <div className="font-mono font-bold text-cyan-700 text-xs whitespace-nowrap">{cId}</div>
                          <div className="text-[10px] text-slate-400 mt-0.5">{item.date || '09 Sep 2026'}</div>
                        </td>

                        {/* Product & Customer Combined */}
                        <td className="py-2.5 px-3 align-middle min-w-0">
                          <div className="flex min-w-0 items-center gap-2">
                            {evidenceImage ? <img src={evidenceImage} alt={`Evidence for ${pName}`} className="w-9 h-9 rounded-lg object-cover border border-slate-200 shrink-0" /> : <div className="w-9 h-9 rounded-lg border border-dashed border-slate-300 bg-slate-50 text-[8px] leading-tight text-slate-400 flex items-center justify-center text-center shrink-0">No evidence</div>}
                            <div className="min-w-0 flex-1">
                              <p className="font-bold text-slate-900 text-xs leading-snug break-words">{pName}</p>
                              <p className="mt-0.5 text-[10px] leading-snug text-slate-400 break-words">
                                {item.customerName || t('customer', 'Customer')} &bull; <span className="font-mono">{item.customerEmail || 'customer@labelsetu.gov.in'}</span>
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Category */}
                        <td className="py-2.5 px-2.5 align-middle">
                          <span className="inline-block max-w-full whitespace-normal break-words bg-slate-100/90 text-slate-700 px-2 py-0.5 rounded-md text-[10px] leading-tight font-medium border border-slate-200/80">
                            {getTranslatedCategory(item.category)}
                          </span>
                        </td>

                        {/* AI Screening & Confidence */}
                        <td className="py-2.5 px-2.5 align-middle">
                          <div className="space-y-0.5 leading-tight">
                            {hasIssue ? (
                              <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-amber-700">
                                <AlertTriangle className="w-3 h-3 text-amber-600 shrink-0" /> {t('issueDetected', 'Issue Detected')}
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700">
                                <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" /> {t('clear', 'Clear')}
                              </span>
                            )}
                            <div className="text-[10px] text-slate-400 font-mono">
                              {t('confidence', 'Confidence')}: <strong className="text-slate-700 font-semibold">{confidence}%</strong>
                            </div>
                          </div>
                        </td>

                        {/* Status */}
                        <td className="py-2.5 px-2 align-middle text-center">
                          {getStatusBadge(item.status)}
                        </td>

                        {/* Action */}
                        <td className="py-2.5 px-2 align-middle text-center">
                          <button
                            type="button"
                            onClick={() => navigate(`/complaints/${cId}`)}
                            title={t('viewComplaint', 'View Complaint')}
                            aria-label={t('viewComplaint', 'View Complaint')}
                            className={`inline-flex h-8 w-8 items-center justify-center rounded-lg transition-all cursor-pointer shadow-2xs ${
                              isSubmitted
                                ? 'bg-cyan-600 hover:bg-cyan-700 text-white'
                                : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200/80'
                            }`}
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile Card List View */}
            <div className="md:hidden divide-y divide-slate-100">
              {filteredComplaints.map((item) => {
                const cId = item.complaintId || item.id;
                const pName = item.productName || item.product;
                const confidence = item.aiAnalysis?.confidence ?? item.confidence ?? 88;
                const isSubmitted = item.status?.toUpperCase() === 'SUBMITTED';
                const evidenceImage = getComplaintEvidenceImage(item);

                return (
                  <div key={cId} className="p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-xs text-cyan-700">{cId}</span>
                      {getStatusBadge(item.status)}
                    </div>

                    <div className="flex items-center gap-3">
                      {evidenceImage ? <img src={evidenceImage} alt={`Evidence for ${pName}`} className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0" /> : <div className="w-12 h-12 rounded-xl border border-dashed border-slate-300 bg-slate-50 text-[9px] leading-tight text-slate-400 flex items-center justify-center text-center shrink-0">No evidence<br />uploaded</div>}
                      <div className="min-w-0">
                        <p className="font-bold text-sm text-slate-900 truncate">{pName}</p>
                        <p className="text-xs text-slate-500">{getTranslatedCategory(item.category)}</p>
                        <p className="text-[11px] text-slate-400 mt-0.5">{item.customerEmail}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[11px] text-slate-500">{t('aiConfidence', 'AI Confidence:')}</span>
                        <span className="font-mono font-bold text-slate-800">{confidence}%</span>
                      </div>
                      <span className="text-[11px] text-slate-500">{item.date || '09 Sep 2026'}</span>
                    </div>

                    <div className="pt-1">
                      <button
                        type="button"
                        onClick={() => navigate(`/complaints/${cId}`)}
                        className={`w-full py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs ${
                          isSubmitted
                            ? 'bg-cyan-600 hover:bg-cyan-700 text-white'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200/80'
                        }`}
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>{isSubmitted ? t('reviewComplaint', 'Review Complaint') : t('viewDetails', 'View Details')}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <div className="p-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-sm text-slate-800">{t('noComplaintsFound', 'No complaints found')}</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              {searchQuery || statusFilter !== 'ALL' || categoryFilter !== 'ALL'
                ? t('adjustFilterPrompt', 'Try adjusting your search filters or status criteria.')
                : t('noRegisteredComplaints', 'No customer complaints are currently registered in the database.')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
