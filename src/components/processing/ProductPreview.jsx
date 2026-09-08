import React from 'react';
import { 
  FileText, 
  HardDrive, 
  Image as ImageIcon, 
  Scan, 
  ShieldCheck, 
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

/**
 * Formats file size in bytes into human-readable string
 */
const formatSize = (bytes) => {
  if (!bytes || bytes <= 0) return '2.4 MB';
  if (typeof bytes === 'string') return bytes;
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

export const ProductPreview = ({ 
  imageSrc, 
  fileName = 'product-label.jpg', 
  fileSize = '2.4 MB', 
  isAnalyzing = true,
  progress = 0 
}) => {
  const { t } = useLanguage();
  const displaySize = formatSize(fileSize);
  const isComplete = progress >= 100;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden flex flex-col">
      {/* Card Header */}
      <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-cyan-600 animate-pulse"></div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
            {t('uploadedProductImage', 'Uploaded Product Image')}
          </span>
        </div>
        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500 bg-white px-2.5 py-0.5 rounded-full border border-slate-200">
          <Scan className="w-3 h-3 text-cyan-600" />
          <span>{t('stageAnalysis', 'Stage: Analysis')}</span>
        </span>
      </div>

      {/* Main Image Viewport */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-center">
        {imageSrc ? (
          <div className="relative bg-[#0c1e33] rounded-xl overflow-hidden border border-slate-800 flex items-center justify-center min-h-[300px] sm:min-h-[380px] max-h-[440px] group shadow-inner">
            {/* Background Grid Pattern for Tech Aesthetic */}
            <div 
              className="absolute inset-0 opacity-10 pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(#38bdf8 1px, transparent 1px)',
                backgroundSize: '20px 20px'
              }}
            />

            {/* Uploaded Image */}
            <img
              src={imageSrc}
              alt={t('uploadedProductImage', 'Uploaded Product Label')}
              className="max-h-[360px] sm:max-h-[420px] w-auto max-w-full object-contain mx-auto transition-transform duration-300 relative z-10"
            />

            {/* Scanning Line Animation overlay while active */}
            {isAnalyzing && !isComplete && (
              <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_12px_#38bdf8] animate-scanline z-20 pointer-events-none"></div>
            )}

            {/* Target Crosshairs / Corner Markers */}
            <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-cyan-500/60 pointer-events-none z-20"></div>
            <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-cyan-500/60 pointer-events-none z-20"></div>
            <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-cyan-500/60 pointer-events-none z-20"></div>
            <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-cyan-500/60 pointer-events-none z-20"></div>

            {/* Overlay Badge */}
            <div className="absolute top-3 left-8 bg-slate-900/85 backdrop-blur-xs text-white text-[11px] font-semibold px-2.5 py-1 rounded-md border border-slate-700/80 z-20 flex items-center gap-1.5 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
              <span>{t('productImage', 'PRODUCT IMAGE')}</span>
            </div>

            {/* Inspection Status Chip on Bottom */}
            <div className="absolute bottom-3 right-3 bg-slate-900/85 backdrop-blur-xs text-slate-200 text-[10px] font-mono px-2.5 py-1 rounded-md border border-slate-700/80 z-20">
              {isComplete ? (
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> {t('readyForReview', 'Ready for Review')}
                </span>
              ) : (
                <span className="text-cyan-400 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 animate-spin" /> {t('scanningLabel', 'Scanning Label')}
                </span>
              )}
            </div>
          </div>
        ) : (
          /* Graceful Fallback if No Image Available */
          <div className="bg-slate-50 rounded-xl border-2 border-dashed border-slate-200 p-8 sm:p-12 text-center flex flex-col items-center justify-center min-h-[300px]">
            <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 text-slate-400 flex items-center justify-center shadow-xs mb-3">
              <ImageIcon className="w-7 h-7" />
            </div>
            <h4 className="text-sm font-bold text-slate-700">{t('noProductImage', 'No product image available')}</h4>
            <p className="text-xs text-slate-500 max-w-xs mt-1 mb-4 leading-relaxed">
              {t('noImageDetectedMsg', 'No label photo was detected for this inspection session. You can upload an image from the scanner.')}
            </p>
            <Link
              to="/scanner"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-700 hover:text-cyan-800 bg-cyan-50 hover:bg-cyan-100/80 px-3.5 py-2 rounded-lg border border-cyan-200 transition-colors"
            >
              <span>{t('goToScanner', 'Go to Product Scanner')}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}

        {/* File Metadata Details */}
        <div className="mt-4 grid grid-cols-2 gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 text-xs">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-500 shrink-0">
              <FileText className="w-4 h-4 text-cyan-700" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">{t('file', 'File')}</span>
              <p className="font-semibold text-slate-800 truncate" title={fileName}>
                {fileName || 'product-label.jpg'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 min-w-0">
            <div className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-500 shrink-0">
              <HardDrive className="w-4 h-4 text-cyan-700" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">{t('size', 'Size')}</span>
              <p className="font-semibold text-slate-800 font-mono">
                {displaySize}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
