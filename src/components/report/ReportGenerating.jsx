import React, { useState, useEffect } from 'react';
import { Loader2, CheckCircle2, FileText, Sparkles } from 'lucide-react';

const GENERATION_STEPS = [
  'Preparing inspection data...',
  'Preparing product information...',
  'Preparing compliance findings...',
  'Preparing evidence summary...',
  'Preparing officer review...',
  'Finalizing report...',
];

export const ReportGenerating = ({ onComplete }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    // Progress through each step every 400ms
    const interval = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev < GENERATION_STEPS.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setIsCompleted(true);
          // Auto advance to preview after short delay
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 800);
          return prev;
        }
      });
    }, 450);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-8 sm:p-12 max-w-lg mx-auto text-center space-y-6 animate-fadeIn">
      {!isCompleted ? (
        <>
          <div className="relative flex justify-center">
            <div className="w-16 h-16 rounded-2xl bg-slate-900 flex items-center justify-center shadow-md">
              <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-bold text-slate-900">Generating Report...</h3>
            <p className="text-xs text-slate-500">
              Synthesizing statutory checks, evidence citations, and officer remarks.
            </p>
          </div>

          {/* Animated Stepper */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 space-y-2 text-left">
            {GENERATION_STEPS.map((stepText, idx) => {
              const isPast = idx < currentStepIndex;
              const isCurrent = idx === currentStepIndex;
              return (
                <div
                  key={stepText}
                  className={`flex items-center gap-2.5 text-xs transition-all duration-200 ${
                    isPast
                      ? 'text-emerald-700 font-medium'
                      : isCurrent
                      ? 'text-slate-900 font-bold scale-[1.01]'
                      : 'text-slate-400'
                  }`}
                >
                  {isPast ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  ) : isCurrent ? (
                    <span className="w-3.5 h-3.5 rounded-full border-2 border-cyan-600 border-t-transparent animate-spin shrink-0" />
                  ) : (
                    <span className="w-3.5 h-3.5 rounded-full border border-slate-300 shrink-0" />
                  )}
                  <span>{stepText}</span>
                </div>
              );
            })}
          </div>

          {/* Progress bar */}
          <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-cyan-600 h-full transition-all duration-300 rounded-full"
              style={{
                width: `${((currentStepIndex + 1) / GENERATION_STEPS.length) * 100}%`,
              }}
            />
          </div>
        </>
      ) : (
        <div className="space-y-4 py-4 animate-scaleUp">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
            <CheckCircle2 className="w-9 h-9" />
          </div>
          <div className="space-y-1">
            <h3 className="text-xl font-extrabold text-slate-900">Report Generated Successfully</h3>
            <p className="text-sm font-medium text-emerald-700">Your inspection report is ready.</p>
          </div>
        </div>
      )}
    </div>
  );
};
