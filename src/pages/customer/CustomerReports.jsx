import React, { useEffect, useState } from 'react';
import { FileText, ArrowLeft, Download, Image as ImageIcon, ShieldCheck, Sparkles } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { CUSTOMER_RECENT_REPORTS } from '../../data/customerMockData';
import { useLanguage } from '../../context/LanguageContext';
import { getComplaintByInspectionId, subscribeComplaints } from '../../services/complaintService';

export const CustomerReports = () => {
  const navigate = useNavigate();
  const { inspectionId } = useParams();
  const { t } = useLanguage();
  const [complaint, setComplaint] = useState(() => getComplaintByInspectionId(inspectionId));
  const reports = inspectionId
    ? CUSTOMER_RECENT_REPORTS.filter((report) => report.inspectionId === inspectionId)
    : CUSTOMER_RECENT_REPORTS;

  useEffect(() => {
    setComplaint(getComplaintByInspectionId(inspectionId));
    return subscribeComplaints(() => setComplaint(getComplaintByInspectionId(inspectionId)));
  }, [inspectionId]);

  const submittedEvidence = complaint?.evidence?.length ? complaint.evidence : complaint?.imageUrl || complaint?.image
    ? [{ name: 'Submitted evidence', url: complaint.imageUrl || complaint.image }]
    : [];
  const filedDate = complaint?.submittedAt || complaint?.createdAt || complaint?.date;
  const officerVerificationStatus = complaint?.officerDecision || complaint?.officerRemarks
    ? complaint.status?.replaceAll('_', ' ')
    : complaint?.status === 'SUBMITTED'
      ? 'Pending officer verification'
      : complaint?.status?.replaceAll('_', ' ');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-rose-700 mb-1">
            <Link to="/customer/dashboard" className="hover:underline flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" /> {t('backToDashboard', 'Back to Dashboard')}
            </Link>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            {t('reports', 'Inspection Reports')}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            {t('officialReportsSubtitle', 'Official compliance certificates and signed verification summaries')}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-rose-50 text-rose-700 border border-rose-200">
            {reports.length} {t('reports', 'Reports Available')}
          </span>
        </div>
      </div>

      {/* Reports List */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <span className="text-xs font-bold text-slate-700">{t('archivedDocuments', 'Archived Documents')}</span>
          <span className="text-xs text-slate-400">PDF Format &bull; Government Digitally Stamped</span>
        </div>

        <div className="divide-y divide-slate-100">
          {reports.map((rep) => (
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
                    <span>{t('product', 'Product')}: {rep.product}</span>
                    <span>&bull;</span>
                    <span>{t('date', 'Issued')}: {rep.date}</span>
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
                  {t('details', 'View Details')}
                </button>
                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#57184a] hover:bg-[#431238] text-white font-semibold text-xs transition-colors shadow-2xs cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{t('downloadCsvLog', 'Download')}</span>
                </button>
              </div>
            </div>
          ))}
          {inspectionId && reports.length === 0 && (
            <div className="p-5 text-xs text-slate-500">
              No inspection report is available for {inspectionId}.
            </div>
          )}
        </div>
      </div>

      {complaint && (
        <section className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center gap-2.5 bg-slate-50/50">
            <div className="w-8 h-8 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 flex items-center justify-center"><FileText className="w-4 h-4" /></div>
            <div><h2 className="text-base font-black text-slate-900">Complaint Details</h2><p className="text-xs text-slate-500 mt-0.5">Complaint submitted for this inspection</p></div>
          </div>
          <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <ReportDetail label="Complaint ID" value={complaint.complaintId || complaint.id} mono />
            <ReportDetail label="Complaint Category" value={complaint.category || complaint.complaintType} />
            <ReportDetail label="Date Filed" value={filedDate ? new Date(filedDate).toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' }) : '—'} />
            <ReportDetail label="Status" value={(complaint.status || 'SUBMITTED').replaceAll('_', ' ')} />
            <div className="sm:col-span-2 rounded-xl bg-slate-50 border border-slate-100 p-3"><span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Complaint Description</span><p className="mt-1.5 font-medium text-slate-800 leading-relaxed">{complaint.description || '—'}</p></div>
            <div className="sm:col-span-2 rounded-xl bg-slate-50 border border-slate-100 p-3"><span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Submitted Evidence</span>{submittedEvidence.length ? <div className="mt-2 flex flex-wrap gap-2">{submittedEvidence.map((evidence, index) => <div key={`${evidence.name || 'evidence'}-${index}`} className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white p-2"><ImageIcon className="w-4 h-4 text-rose-600" />{evidence.url && <img src={evidence.url} alt="Submitted complaint evidence" className="h-8 w-8 rounded object-cover" />}<span className="font-semibold text-slate-700">{evidence.name || 'Evidence image'}</span></div>)}</div> : <p className="mt-1.5 text-slate-500">No evidence file metadata available.</p>}</div>
            {complaint.aiAnalysis && <div className="sm:col-span-2 rounded-xl bg-purple-50 border border-purple-100 p-3"><span className="flex items-center gap-1.5 text-[10px] font-bold text-purple-700 uppercase tracking-wider"><Sparkles className="w-3.5 h-3.5" />AI Preliminary Analysis</span><p className="mt-1.5 font-medium text-slate-800">{complaint.aiAnalysis.issue || 'Analysis available for officer review.'}</p>{complaint.aiAnalysis.confidence ? <p className="mt-1 text-[11px] font-semibold text-purple-700">Confidence: {complaint.aiAnalysis.confidence}%</p> : null}</div>}
            <div className="sm:col-span-2 rounded-xl bg-amber-50 border border-amber-100 p-3"><span className="flex items-center gap-1.5 text-[10px] font-bold text-amber-700 uppercase tracking-wider"><ShieldCheck className="w-3.5 h-3.5" />Officer Verification Status</span><p className="mt-1.5 font-semibold text-slate-800">{officerVerificationStatus || 'Pending officer verification'}</p></div>
          </div>
        </section>
      )}
    </div>
  );
};

const ReportDetail = ({ label, value, mono = false }) => (
  <div className="rounded-xl bg-slate-50 border border-slate-100 p-3">
    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">{label}</span>
    <p className={`mt-1.5 font-bold text-slate-800 ${mono ? 'font-mono' : ''}`}>{value || '—'}</p>
  </div>
);
