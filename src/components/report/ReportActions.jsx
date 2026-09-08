import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Download, Printer, ArrowLeft, RotateCcw, Loader2 } from 'lucide-react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { useToast } from '../common/Toast';

export const ReportActions = ({ onGenerateAgain, inspectionId = 'LM-2026-00129' }) => {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadPDF = async () => {
    const reportElement = document.getElementById('report-print-target');
    if (!reportElement) {
      addToast({
        title: 'Download Failed',
        message: 'Report content not found for PDF export.',
        type: 'error',
      });
      return;
    }

    try {
      setIsDownloading(true);
      addToast({
        title: 'Preparing PDF',
        message: 'Rendering report document...',
        type: 'info',
      });

      // Render canvas with safe styling to avoid modern CSS color function errors
      const canvas = await html2canvas(reportElement, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false,
        backgroundColor: '#ffffff',
        windowWidth: 1200,
        onclone: (clonedDoc) => {
          // Add safe hex override stylesheet to avoid any oklch color errors from Tailwind v4
          const style = clonedDoc.createElement('style');
          style.innerHTML = `
            * {
              color: #0f172a !important;
              border-color: #cbd5e1 !important;
              box-shadow: none !important;
              text-shadow: none !important;
            }
            #report-print-target {
              background-color: #ffffff !important;
              color: #0f172a !important;
              width: 1000px !important;
              max-width: 1000px !important;
              margin: 0 auto !important;
              padding: 32px !important;
            }
            .bg-white { background-color: #ffffff !important; }
            .bg-slate-50 { background-color: #f8fafc !important; }
            .bg-slate-100 { background-color: #f1f5f9 !important; }
            .bg-slate-900, .bg-\\[\\#0c1e33\\] { background-color: #0c1e33 !important; }
            .text-white { color: #ffffff !important; }
            .text-cyan-400 { color: #22d3ee !important; }
            .text-cyan-600 { color: #0891b2 !important; }
            .text-cyan-800 { color: #155e75 !important; }
            .text-emerald-800 { color: #065f46 !important; }
            .text-emerald-600 { color: #059669 !important; }
            .bg-emerald-50 { background-color: #ecfdf5 !important; }
            .bg-emerald-100 { background-color: #d1fae5 !important; }
            .text-rose-800 { color: #9f1239 !important; }
            .text-rose-600 { color: #e11d48 !important; }
            .bg-rose-50 { background-color: #fff1f2 !important; }
            .bg-rose-100 { background-color: #ffe4e6 !important; }
            .text-amber-800 { color: #92400e !important; }
            .text-amber-900 { color: #78350f !important; }
            .text-amber-600 { color: #d97706 !important; }
            .bg-amber-50 { background-color: #fffbeb !important; }
            .text-slate-900 { color: #0f172a !important; }
            .text-slate-800 { color: #1e293b !important; }
            .text-slate-700 { color: #334155 !important; }
            .text-slate-600 { color: #475569 !important; }
            .text-slate-500 { color: #64748b !important; }
            .text-slate-400 { color: #94a3b8 !important; }
            .border-slate-200 { border-color: #e2e8f0 !important; }
            .border-slate-300 { border-color: #cbd5e1 !important; }
            .border-slate-900 { border-color: #0f172a !important; }
          `;
          clonedDoc.head.appendChild(style);
        },
      });

      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 10;
      const imgWidth = pageWidth - margin * 2;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const usablePageHeight = pageHeight - margin * 2;

      let heightLeft = imgHeight;
      let position = margin;

      // Add first page
      pdf.addImage(imgData, 'JPEG', margin, position, imgWidth, imgHeight);
      heightLeft -= usablePageHeight;

      // Add subsequent pages if content overflows A4 height
      while (heightLeft > 0) {
        position = margin - (imgHeight - heightLeft);
        pdf.addPage();
        pdf.addImage(imgData, 'JPEG', margin, position, imgWidth, imgHeight);
        heightLeft -= usablePageHeight;
      }

      const fileName = `LABEL_SETU_Inspection_${inspectionId}.pdf`;
      pdf.save(fileName);

      addToast({
        title: 'PDF Downloaded',
        message: `${fileName} saved successfully.`,
        type: 'success',
      });
    } catch (err) {
      console.error('Error generating PDF with html2canvas:', err);

      // Fallback: Direct print dialog if canvas rendering fails
      try {
        window.print();
        addToast({
          title: 'Print Dialog Opened',
          message: 'You can save as PDF directly from the print dialog.',
          type: 'info',
        });
      } catch (printErr) {
        addToast({
          title: 'PDF Generation Error',
          message: 'Could not generate PDF. Please try the Print button.',
          type: 'error',
        });
      }
    } finally {
      setIsDownloading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="no-print bg-white rounded-2xl border border-slate-200 shadow-sm p-4 flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => navigate('/results')}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-xl transition-colors cursor-pointer active:scale-98"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Results
        </button>

        <button
          type="button"
          onClick={onGenerateAgain}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-100 border border-slate-300 rounded-xl transition-colors cursor-pointer active:scale-98"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Generate Again
        </button>
      </div>

      <div className="flex items-center gap-2.5">
        <button
          type="button"
          onClick={handlePrint}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-slate-800 hover:text-slate-950 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-xl transition-colors cursor-pointer active:scale-98"
        >
          <Printer className="w-3.5 h-3.5 text-slate-600" />
          Print Report
        </button>

        <button
          type="button"
          onClick={handleDownloadPDF}
          disabled={isDownloading}
          className="inline-flex items-center gap-2 px-5 py-2 text-xs font-bold text-white bg-[#0c1e33] hover:bg-slate-800 rounded-xl transition-all shadow-sm hover:shadow-md cursor-pointer active:scale-98 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isDownloading ? (
            <>
              <Loader2 className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
              Generating PDF...
            </>
          ) : (
            <>
              <Download className="w-3.5 h-3.5 text-cyan-400" />
              Download PDF
            </>
          )}
        </button>
      </div>
    </div>
  );
};
