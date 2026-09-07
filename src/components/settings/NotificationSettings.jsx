import React, { useState } from 'react';
import { Bell, Save } from 'lucide-react';
import { Toggle } from './Toggle';
import { useToast } from '../common/Toast';

export const NotificationSettings = ({ notifications, onSaveNotifications }) => {
  const { addToast } = useToast();
  const [formData, setFormData] = useState({ ...notifications });

  const handleToggle = (key, val) => {
    setFormData((prev) => ({ ...prev, [key]: val }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    onSaveNotifications(formData);
    addToast({
      title: 'Notifications Saved',
      message: 'Notification settings saved.',
      type: 'success',
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-6 space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-slate-100 text-slate-700 rounded-lg">
            <Bell className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">Notification Settings</h3>
            <p className="text-xs text-slate-500">Configure alert preferences for inspection milestones and enforcement actions.</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <div className="space-y-3">
          <Toggle
            id="inspectionCompleted"
            label="Inspection completed"
            description="Send an alert when an AI image analysis scan and classification finishes."
            checked={formData.inspectionCompleted}
            onChange={(val) => handleToggle('inspectionCompleted', val)}
          />

          <Toggle
            id="officerReviewRequired"
            label="Officer review required"
            description="Notify when an inspection contains non-compliant or unverified findings needing review."
            checked={formData.officerReviewRequired}
            onChange={(val) => handleToggle('officerReviewRequired', val)}
          />

          <Toggle
            id="reportGenerated"
            label="Report generated"
            description="Send notification confirmation when an official PDF inspection report is finalized."
            checked={formData.reportGenerated}
            onChange={(val) => handleToggle('reportGenerated', val)}
          />

          <Toggle
            id="violationDetected"
            label="Potential violation detected"
            description="High-priority statutory alerts when high-confidence non-compliance is identified."
            checked={formData.violationDetected}
            onChange={(val) => handleToggle('violationDetected', val)}
          />

          <Toggle
            id="systemUpdates"
            label="System updates"
            description="Receive notices regarding regulatory rule updates and portal maintenance."
            checked={formData.systemUpdates}
            onChange={(val) => handleToggle('systemUpdates', val)}
          />
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-[#0c1e33] hover:bg-slate-800 rounded-xl transition-all shadow-xs cursor-pointer"
          >
            <Save className="w-3.5 h-3.5 text-cyan-400" />
            <span>Save Notification Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
};
