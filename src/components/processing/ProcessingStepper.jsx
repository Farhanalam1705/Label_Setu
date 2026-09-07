import React from 'react';
import { ProcessingStep } from './ProcessingStep';

export const ProcessingStepper = ({ progress = 0 }) => {
  // Determine step status and dynamic descriptions according to progress thresholds:
  // 0–15%: Image Preprocessing
  // 15–30%: Label Region Detection
  // 30–50%: Text & Region Detection
  // 50–65%: Information Extraction
  // 65–85%: Rule Validation
  // 85–100%: Compliance Assessment
  // 100%: All completed

  const getStepData = () => {
    return [
      {
        id: 1,
        title: 'Image Preprocessing',
        status:
          progress >= 15
            ? 'COMPLETED'
            : progress > 0
            ? 'ACTIVE'
            : 'ACTIVE', // Active at start 0%
        description:
          progress >= 15
            ? 'Image preprocessing complete'
            : 'Image prepared for analysis',
      },
      {
        id: 2,
        title: 'Label Region Detection',
        status:
          progress >= 30
            ? 'COMPLETED'
            : progress >= 15
            ? 'ACTIVE'
            : 'PENDING',
        description:
          progress >= 30
            ? 'Label regions processed'
            : progress >= 15
            ? 'Relevant label regions identified'
            : 'Waiting',
      },
      {
        id: 3,
        title: 'Text & Region Detection',
        status:
          progress >= 50
            ? 'COMPLETED'
            : progress >= 30
            ? 'ACTIVE'
            : 'PENDING',
        description:
          progress >= 50
            ? 'Text processing complete'
            : progress >= 30
            ? 'Processing...'
            : 'Waiting',
      },
      {
        id: 4,
        title: 'Information Extraction',
        status:
          progress >= 65
            ? 'COMPLETED'
            : progress >= 50
            ? 'ACTIVE'
            : 'PENDING',
        description:
          progress >= 65
            ? 'Declaration extraction stage complete'
            : progress >= 50
            ? 'Identifying product declarations...'
            : 'Waiting',
      },
      {
        id: 5,
        title: 'Rule Validation',
        status:
          progress >= 85
            ? 'COMPLETED'
            : progress >= 65
            ? 'ACTIVE'
            : 'PENDING',
        description:
          progress >= 85
            ? 'Validation stage complete'
            : progress >= 65
            ? 'Preparing validation...'
            : 'Waiting',
      },
      {
        id: 6,
        title: 'Compliance Assessment',
        status:
          progress >= 100
            ? 'COMPLETED'
            : progress >= 85
            ? 'ACTIVE'
            : 'PENDING',
        description:
          progress >= 100
            ? 'Compliance assessment stage complete'
            : progress >= 85
            ? 'Finalizing analysis...'
            : 'Waiting',
      },
    ];
  };

  const steps = getStepData();

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs">
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
        <div>
          <h3 className="text-sm font-bold text-slate-900 tracking-tight">
            Inspection Protocol Stages
          </h3>
          <p className="text-xs text-slate-500">
            Legal Metrology (Packaged Commodities) Rules Verification
          </p>
        </div>
        <span className="text-xs font-mono font-bold text-cyan-800 bg-cyan-50 px-2.5 py-1 rounded-md border border-cyan-200/70">
          Stage {steps.filter((s) => s.status === 'COMPLETED').length + (progress >= 100 ? 0 : 1)} of 6
        </span>
      </div>

      <div className="space-y-1">
        {steps.map((step, idx) => (
          <ProcessingStep
            key={step.id}
            stepNumber={step.id}
            title={step.title}
            description={step.description}
            status={step.status}
            isLast={idx === steps.length - 1}
          />
        ))}
      </div>
    </div>
  );
};
