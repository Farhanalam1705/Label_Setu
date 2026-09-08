import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { ProcessingStep } from './ProcessingStep';

export const ProcessingStepper = ({ progress = 0 }) => {
  const { t } = useLanguage();

  const getStepData = () => {
    return [
      {
        id: 1,
        title: t('imagePreprocessing', 'Image Preprocessing'),
        status:
          progress >= 15
            ? 'COMPLETED'
            : progress > 0
            ? 'ACTIVE'
            : 'ACTIVE',
        description:
          progress >= 15
            ? t('imagePreprocessingComplete', 'Image preprocessing complete')
            : t('imagePreparedForAnalysis', 'Image prepared for analysis'),
      },
      {
        id: 2,
        title: t('labelRegionDetection', 'Label Region Detection'),
        status:
          progress >= 30
            ? 'COMPLETED'
            : progress >= 15
            ? 'ACTIVE'
            : 'PENDING',
        description:
          progress >= 30
            ? t('labelRegionsProcessed', 'Label regions processed')
            : progress >= 15
            ? t('labelRegionsIdentified', 'Relevant label regions identified')
            : t('waiting', 'Waiting'),
      },
      {
        id: 3,
        title: t('textRegionDetection', 'Text & Region Detection'),
        status:
          progress >= 50
            ? 'COMPLETED'
            : progress >= 30
            ? 'ACTIVE'
            : 'PENDING',
        description:
          progress >= 50
            ? t('textProcessingComplete', 'Text processing complete')
            : progress >= 30
            ? t('processingEllipsis', 'Processing...')
            : t('waiting', 'Waiting'),
      },
      {
        id: 4,
        title: t('informationExtraction', 'Information Extraction'),
        status:
          progress >= 65
            ? 'COMPLETED'
            : progress >= 50
            ? 'ACTIVE'
            : 'PENDING',
        description:
          progress >= 65
            ? t('declarationExtractionComplete', 'Declaration extraction stage complete')
            : progress >= 50
            ? t('identifyingProductDeclarations', 'Identifying product declarations...')
            : t('waiting', 'Waiting'),
      },
      {
        id: 5,
        title: t('complianceValidation', 'Compliance Validation'),
        status:
          progress >= 85
            ? 'COMPLETED'
            : progress >= 65
            ? 'ACTIVE'
            : 'PENDING',
        description:
          progress >= 85
            ? t('validationStageComplete', 'Validation stage complete')
            : progress >= 65
            ? t('preparingValidation', 'Preparing validation...')
            : t('waiting', 'Waiting'),
      },
      {
        id: 6,
        title: t('complianceAssessment', 'Compliance Assessment'),
        status:
          progress >= 100
            ? 'COMPLETED'
            : progress >= 85
            ? 'ACTIVE'
            : 'PENDING',
        description:
          progress >= 100
            ? t('complianceAssessmentComplete', 'Compliance assessment stage complete')
            : progress >= 85
            ? t('finalizingAnalysis', 'Finalizing analysis...')
            : t('waiting', 'Waiting'),
      },
    ];
  };

  const steps = getStepData();

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs">
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
        <div>
          <h3 className="text-sm font-bold text-slate-900 tracking-tight">
            {t('inspectionProtocolStages', 'Inspection Protocol Stages')}
          </h3>
          <p className="text-xs text-slate-500">
            {t('packagedCommoditiesPipeline', 'Packaged Commodities Verification Pipeline')}
          </p>
        </div>
        <span className="text-xs font-mono font-bold text-cyan-800 bg-cyan-50 px-2.5 py-1 rounded-md border border-cyan-200/70">
          {t('stage', 'Stage')} {steps.filter((s) => s.status === 'COMPLETED').length + (progress >= 100 ? 0 : 1)} {t('of', 'of')} 6
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
