import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  FileCheck2, 
  RotateCcw,
  ShieldCheck
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const getStatusMessage = (progress, t = (k, d) => d) => {
  if (progress >= 100) return t('analysisComplete', 'Analysis complete.');
  if (progress >= 90) return t('finalizingAnalysis', 'Finalizing analysis...');
  if (progress >= 80) return t('preparingValidation', 'Preparing validation...');
  if (progress >= 65) return t('identifyingProductDeclarations', 'Identifying product declarations...');
  if (progress >= 50) return t('processingVisibleText', 'Processing visible text...');
  if (progress >= 35) return t('detectingLabelRegions', 'Detecting label regions...');
  if (progress >= 20) return t('improvingImageQuality', 'Improving image quality...');
  return t('preparingImage', 'Preparing image...');
};

export const ProcessingStatus = ({ progress = 0, onRestart = null }) => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const isComplete = progress >= 100;
  const currentMessage = getStatusMessage(progress, t);

  const completedChecklist = [
    t('imagePreprocessingComplete', 'Image preprocessing complete'),
    t('labelRegionsProcessed', 'Label regions processed'),
    t('textProcessingComplete', 'Text processing complete'),
    t('declarationExtractionComplete', 'Declaration extraction stage complete'),
    t('validationStageComplete', 'Validation stage complete'),
    t('complianceAssessmentComplete', 'Compliance assessment stage complete'),
  ];

  const handleViewResults = () => {
    navigate('/results');
  };

  if (!isComplete) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-cyan-50 border border-cyan-200 text-cyan-600 flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div className="min-w-0">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
              {t('activeStage', 'Active Stage')}
            </span>
            <p className="text-sm font-bold text-slate-900 truncate">
              {currentMessage}
            </p>
          </div>
        </div>

        <div className="text-right shrink-0">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 text-slate-700 text-xs font-mono font-bold rounded-lg border border-slate-200">
            {progress}% {t('completed', 'Completed')}
          </span>
        </div>
      </div>
    );
  }

  // Completion State (at 100%)
  return (
    <div className="bg-gradient-to-b from-white to-emerald-50/40 rounded-2xl border-2 border-emerald-500/80 p-6 sm:p-7 shadow-md space-y-6 animate-in fade-in zoom-in-98 duration-300">
      {/* Header Banner */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-600/20 shrink-0">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-black text-slate-900 tracking-tight">
                {t('analysisComplete', 'Analysis Complete')}
              </h3>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full border border-emerald-200">
                100% {t('verified', 'Verified')}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              {t('inspectionReadyToView', 'Your inspection is ready to view.')}
            </p>
          </div>
        </div>

        {onRestart && (
          <button
            type="button"
            onClick={onRestart}
            title={t('replay', 'Replay')}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Completion Summary Checklist */}
      <div className="bg-white rounded-xl border border-emerald-200/80 p-4 space-y-2.5 shadow-xs">
        <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-1.5 pb-1 border-b border-emerald-100">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>{t('completedMetrologyPipeline', 'Completed Metrology Verification Pipeline')}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          {completedChecklist.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2 text-slate-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="font-medium">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Primary CTA Button */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <FileCheck2 className="w-4 h-4 text-cyan-700" />
          <span>{t('inspectionId', 'Inspection ID')}: <strong className="text-slate-800 font-mono">LM-2026-00129</strong></span>
        </div>

        <button
          type="button"
          onClick={handleViewResults}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3 bg-[#0c1e33] hover:bg-slate-800 text-white font-bold text-sm rounded-xl transition-all shadow-md hover:shadow-lg active:scale-98 cursor-pointer group"
        >
          <span>{t('viewResults', 'View Results')}</span>
          <ArrowRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
