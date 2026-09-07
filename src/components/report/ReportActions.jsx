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

      const canvas = await html2canvas(reportElement, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
      });

      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pdfWidth - 20; // 10mm margins on each side
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 10;

      pdf.addImage(imgData, 'JPEG', 10, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight - 20;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight + 10;
        pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 10, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight - 20;
      }

      const fileName = `LABEL_SETU_Inspection_${inspectionId}.pdf`;
      pdf.save(fileName);

      addToast({
        title: 'PDF Downloaded',
        message: `${fileName} saved successfully.`,
        type: 'success',
      });
    } catch (err) {
      console.error('Error generating PDF:', err);
      addToast({
        title: 'PDF Generation Error',
        message: 'Could not generate PDF. You can also use the Print button.',
        type: 'error',
      });
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
