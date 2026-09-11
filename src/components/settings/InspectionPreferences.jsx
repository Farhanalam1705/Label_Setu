import React, { useState } from 'react';
import { Sliders, FileCheck, Tag } from 'lucide-react';
import { Toggle } from './Toggle';
import { useToast } from '../common/Toast';
import { useLanguage } from '../../context/LanguageContext';

export const InspectionPreferences = ({ preferences, onSavePreferences }) => {
  const { addToast } = useToast();
  const { t } = useLanguage();
  const [formData, setFormData] = useState({ ...preferences });

  const applyChange = (key, val) => {
    const updated = { ...formData, [key]: val };
    setFormData(updated);
    onSavePreferences(updated);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-6 space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-slate-100 text-slate-700 rounded-lg">
            <Sliders className="w-4 h-4 text-cyan-600" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">{t('inspectionPrefsTitle', 'Inspection Preferences')}</h3>
            <p className="text-xs text-slate-500">{t('inspectionPrefsSubtitle', 'Configure default verification behavior and workflow constraints.')}</p>
          </div>
        </div>
      </div>

      <form className="space-y-6">
        {/* Toggle options */}
        <div className="space-y-3">
          <Toggle
            id="autoSave"
            label={t('autoSave', 'Auto-save inspections')}
            description={t('autoSaveDesc', 'Automatically log scanned products and intermediate analysis states to local registry.')}
            checked={formData.autoSave}
            onChange={(val) => applyChange('autoSave', val)}
          />

          <Toggle
            id="showConfidenceScores"
            label={t('showConfidenceScores', 'Show AI confidence scores')}
            description={t('showConfidenceScoresDesc', 'Display quantitative confidence percentages (e.g. 94%) on findings and checks.')}
            checked={formData.showConfidenceScores}
            onChange={(val) => applyChange('showConfidenceScores', val)}
          />

          <Toggle
            id="showEvidenceHighlights"
            label={t('showEvidenceHighlights', 'Show evidence highlights')}
            description={t('showEvidenceHighlightsDesc', 'Overlay bounding boxes and visual region crops when reviewing target label declarations.')}
            checked={formData.showEvidenceHighlights}
            onChange={(val) => applyChange('showEvidenceHighlights', val)}
          />

          <Toggle
            id="requireOfficerReview"
            label={t('requireOfficerReview', 'Require officer review before report generation')}
            description={t('requireOfficerReviewDesc', 'Enforce mandatory officer sign-off before generating official statutory compliance reports.')}
            checked={formData.requireOfficerReview}
            onChange={(val) => applyChange('requireOfficerReview', val)}
          />
        </div>

        {/* Dropdowns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100 text-xs">
          <div className="space-y-1.5">
            <label className="text-slate-700 font-bold block flex items-center gap-1.5">
              <FileCheck className="w-3.5 h-3.5 text-cyan-600" />
              {t('defaultReportFormat', 'Default Report Format')}
            </label>
            <select
              value={formData.defaultReportFormat}
              onChange={(e) => applyChange('defaultReportFormat', e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 cursor-pointer"
            >
              <option value="PDF">PDF Document (.pdf)</option>
              <option value="Print">Print (A4 Format)</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-slate-700 font-bold block flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-cyan-600" />
              {t('defaultInspectionCategory', 'Default Inspection Category')}
            </label>
            <select
              value={formData.defaultCategory}
              onChange={(e) => applyChange('defaultCategory', e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 cursor-pointer"
            >
              <option value="Packaged Commodities">Packaged Commodities</option>
              <option value="Food Grains & Pulses">Food Grains & Pulses</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
      </form>
    </div>
  );
};
