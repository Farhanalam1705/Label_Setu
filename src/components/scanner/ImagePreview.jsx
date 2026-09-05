import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  RotateCcw, 
  Trash2, 
  FileText, 
  HardDrive, 
  Maximize2, 
  ShieldCheck, 
  ArrowRight,
  Info
} from 'lucide-react';
import { useToast } from '../common/Toast';

export const ImagePreview = ({ file, onReplace, onRemove }) => {
  const [previewUrl, setPreviewUrl] = useState(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const { addToast } = useToast();

  useEffect(() => {
    if (!file) {
      setPreviewUrl(null);
      return;
    }

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    // Get image dimensions
    const img = new Image();
    img.onload = () => {
      setDimensions({ width: img.naturalWidth, height: img.naturalHeight });
    };
    img.src = url;

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [file]);

  const formatFileSize = (bytes) => {
    if (!bytes) return '0 B';
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  const handleContinueAnalysis = () => {
    addToast({
      title: 'Analysis Engine Staged',
      message: 'OCR extraction, AI compliance scoring, and Legal Metrology rule verification will occur in Phase 2.',
      type: 'info',
    });
  };

  if (!file || !previewUrl) return null;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
      {/* Top Banner Status */}
      <div className="bg-emerald-50/90 border-b border-emerald-200/80 px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-emerald-950 uppercase tracking-wide">
              Image ready for inspection
            </h4>
            <p className="text-[11px] text-emerald-800">
              Valid format and resolution verified for Packaged Commodities compliance checks.
            </p>
          </div>
        </div>

        <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-100/70 px-2.5 py-0.5 rounded-full border border-emerald-200">
          <ShieldCheck className="w-3.5 h-3.5" />
          Pre-validated
        </span>
      </div>

      <div className="p-6 sm:p-8 space-y-6">
        {/* Main Image Viewport */}
        <div className="relative bg-slate-900 rounded-xl overflow-hidden border border-slate-800 flex items-center justify-center min-h-[320px] max-h-[460px] group">
          <img
            src={previewUrl}
            alt="Product Label Preview"
            className="max-h-[440px] w-auto max-w-full object-contain mx-auto"
          />

          {/* Subtitle badge overlay */}
          <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-semibold px-3 py-1 rounded-md border border-slate-700">
            PRODUCT IMAGE PREVIEW
          </div>
        </div>

        {/* Metadata Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-white border border-slate-200 text-slate-600 shrink-0">
              <FileText className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-bold uppercase text-slate-400 block">File Name</span>
              <p className="text-xs font-semibold text-slate-800 truncate" title={file.name}>
                {file.name}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-white border border-slate-200 text-slate-600 shrink-0">
              <HardDrive className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-bold uppercase text-slate-400 block">File Size</span>
              <p className="text-xs font-semibold text-slate-800 font-mono">
                {formatFileSize(file.size)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-white border border-slate-200 text-slate-600 shrink-0">
              <Maximize2 className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-bold uppercase text-slate-400 block">Image Type & Res</span>
              <p className="text-xs font-semibold text-slate-800 font-mono">
                {file.type || 'image/jpeg'} {dimensions.width ? `(${dimensions.width}×${dimensions.height})` : ''}
              </p>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              type="button"
              onClick={onReplace}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl transition-colors shadow-xs active:scale-98"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
              <span>Replace Image</span>
            </button>

            <button
              type="button"
              onClick={onRemove}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-xl transition-colors active:scale-98"
            >
              <Trash2 className="w-3.5 h-3.5 text-rose-500" />
              <span>Remove</span>
            </button>
          </div>

          {/* Continue to Analysis Placeholder CTA */}
          <div className="w-full sm:w-auto flex flex-col sm:items-end">
            <button
              type="button"
              onClick={handleContinueAnalysis}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 text-xs font-bold text-slate-400 bg-slate-100 border border-slate-200 rounded-xl cursor-not-allowed opacity-80"
              title="Next stage will implement OCR and rule compliance engine"
            >
              <span>Continue to Analysis</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <span className="text-[10px] text-slate-400 mt-1 text-center sm:text-right">
              OCR & Compliance Engine will be connected in Phase 2
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
