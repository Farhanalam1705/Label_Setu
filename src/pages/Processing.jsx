import React, { useState, useEffect, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { 
  ChevronRight, 
  FileCheck2, 
  Sparkles, 
  ShieldCheck, 
  Play, 
  Pause, 
  RotateCcw, 
  FastForward 
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { ProductPreview } from '../components/processing/ProductPreview';
import { ProgressBar } from '../components/processing/ProgressBar';
import { ProcessingStepper } from '../components/processing/ProcessingStepper';
import { ProcessingStatus, getStatusMessage } from '../components/processing/ProcessingStatus';
import { AIInfoBox } from '../components/processing/AIInfoBox';

// Simulated step milestones
const PROGRESS_STAGES = [0, 10, 20, 35, 50, 65, 80, 90, 100];
const STAGE_INTERVAL_MS = 1300; // ~1.3 seconds per stage for a smooth, realistic ~10s feel

export const Processing = () => {
  const location = useLocation();
  const { t } = useLanguage();

  // Retrieve image from React Router state or sessionStorage fallback
  const [imageInfo] = useState(() => {
    // 1. Check React Router location state
    if (location.state?.image) {
      return {
        src: location.state.image,
        name: location.state.fileName || 'product-label.jpg',
        size: location.state.fileSize || '2.4 MB',
      };
    }

    // 2. Check sessionStorage
    try {
      const storedImage = sessionStorage.getItem('label_setu_inspection_image');
      const storedMeta = sessionStorage.getItem('label_setu_inspection_meta');
      if (storedImage) {
        let meta = { name: 'product-label.jpg', size: '2.4 MB' };
        if (storedMeta) {
          meta = { ...meta, ...JSON.parse(storedMeta) };
        }
        return {
          src: storedImage,
          name: meta.name,
          size: meta.size,
        };
      }
    } catch (e) {
      console.warn('Could not read stored inspection image from sessionStorage', e);
    }

    // 3. Fallback: return null (ProductPreview will display clean placeholder)
    return null;
  });

  // Simulation state
  const [stageIndex, setStageIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  const currentProgress = PROGRESS_STAGES[stageIndex];
  const isComplete = currentProgress >= 100;
  const statusMessage = getStatusMessage(currentProgress);

  // Automatic frontend simulation progress loop
  useEffect(() => {
    if (isPaused || isComplete) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setStageIndex((prev) => {
        if (prev < PROGRESS_STAGES.length - 1) {
          return prev + 1;
        }
        clearInterval(timerRef.current);
        return prev;
      });
    }, STAGE_INTERVAL_MS);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, isComplete]);

  // Simulation controls
  const handleRestart = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setStageIndex(0);
    setIsPaused(false);
  };

  const handleTogglePause = () => {
    setIsPaused((prev) => !prev);
  };

  const handleSkipToEnd = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setStageIndex(PROGRESS_STAGES.length - 1);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Top Breadcrumb & Page Identification */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-200 pb-5">
        <div className="space-y-1.5">
          {/* Breadcrumb: Dashboard / New Inspection / Analysis */}
          <nav className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
            <Link to="/dashboard" className="hover:text-slate-900 transition-colors">
              {t('dashboard', 'Dashboard')}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <Link to="/scanner" className="hover:text-slate-900 transition-colors">
              {t('newInspection', 'New Inspection')}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-cyan-700 font-bold">{t('analysis', 'Analysis')}</span>
          </nav>

          {/* Main Heading & Subtitle */}
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight transition-all">
                {isComplete ? t('analysisComplete', 'Analysis Complete') : t('analyzingProduct', 'Analyzing Product')}
              </h1>
              {isComplete ? (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  {t('inspectionVerified', 'Inspection Verified')}
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-cyan-50 text-cyan-800 border border-cyan-200">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-600 animate-spin" />
                  {t('stage2of4', 'Stage 2 of 4')}
                </span>
              )}
            </div>

            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {isComplete
                ? t('inspectionReadyToView', 'Your inspection is ready to view.')
                : t('analyzingWaitMessage', 'Please wait while your product image is being prepared for analysis.')}
            </p>
          </div>
        </div>

        {/* Portal & Inspection ID Header Box */}
        <div className="flex flex-col sm:items-end gap-1.5 self-start sm:self-auto bg-white sm:bg-transparent p-3 sm:p-0 rounded-xl border sm:border-0 border-slate-200 w-full sm:w-auto">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-900">LABEL SETU</span>
            <span className="text-[10px] text-slate-400">|</span>
            <span className="text-[11px] text-slate-500 font-medium">
              {t('aiPoweredChecker', 'AI-Powered Legal Metrology Compliance Checker')}
            </span>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 border border-slate-200 text-slate-700 text-xs rounded-lg">
            <FileCheck2 className="w-3.5 h-3.5 text-cyan-600" />
            <span>{t('inspectionId', 'Inspection ID')}:</span>
            <strong className="font-mono text-slate-900">INS-2026-0001</strong>
          </div>
        </div>
      </div>

      {/* Inspection Pipeline Status Bar */}
      <div className="bg-slate-100/70 border border-slate-200/80 rounded-xl px-4 py-2 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5 text-slate-600">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-600"></span>
          </span>
          <span className="font-bold text-slate-800 tracking-tight">{t('automatedInspectionPipeline', 'Automated Inspection Pipeline')}</span>
          <span className="text-slate-400 text-[11px] font-medium">({t('legalMetrologySession', 'Legal Metrology Verification Session')})</span>
        </div>

        <div className="flex items-center gap-1.5">
          {!isComplete && (
            <button
              type="button"
              onClick={handleTogglePause}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-md transition-colors shadow-2xs"
            >
              {isPaused ? <Play className="w-3 h-3 text-emerald-600" /> : <Pause className="w-3 h-3 text-slate-600" />}
              <span>{isPaused ? t('resume', 'Resume') : t('pause', 'Pause')}</span>
            </button>
          )}

          {!isComplete && (
            <button
              type="button"
              onClick={handleSkipToEnd}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium text-cyan-700 bg-cyan-50 hover:bg-cyan-100 border border-cyan-200 rounded-md transition-colors"
            >
              <FastForward className="w-3 h-3" />
              <span>{t('fastForward', 'Fast-Forward')}</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleRestart}
            className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200 rounded-md transition-colors shadow-2xs"
          >
            <RotateCcw className="w-3 h-3 text-slate-500" />
            <span>{t('replay', 'Replay')}</span>
          </button>
        </div>
      </div>

      {/* Main Two-Column Layout (Responsive: Stack on Mobile, 2 Columns on Desktop) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: Uploaded Product Image Preview */}
        <div className="lg:col-span-5 space-y-4">
          <ProductPreview
            imageSrc={imageInfo?.src}
            fileName={imageInfo?.name}
            fileSize={imageInfo?.size}
            isAnalyzing={!isComplete}
            progress={currentProgress}
          />
        </div>

        {/* RIGHT COLUMN: Processing Status, Stepper & AI Info Box */}
        <div className="lg:col-span-7 space-y-5">
          {/* Progress Bar with Percentage and Status Message */}
          <ProgressBar
            progress={currentProgress}
            statusMessage={statusMessage}
          />

          {/* Dynamic Status / Completion State Card */}
          <ProcessingStatus
            progress={currentProgress}
            onRestart={handleRestart}
          />

          {/* 6-Step Vertical Stepper */}
          <ProcessingStepper
            progress={currentProgress}
          />

          {/* AI-Assisted Information Advisory Box */}
          <AIInfoBox />
        </div>
      </div>
    </div>
  );
};
