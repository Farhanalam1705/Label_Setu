import React, { useState } from 'react';
import { Palette, Sun, Moon, Laptop, LayoutGrid, List, Globe, Save } from 'lucide-react';
import { useToast } from '../common/Toast';

export const AppearanceSettings = ({ appearance, onSaveAppearance }) => {
  const { addToast } = useToast();
  const [formData, setFormData] = useState({ ...appearance });

  const handleSave = (e) => {
    e.preventDefault();
    onSaveAppearance(formData);
    addToast({
      title: 'Appearance Saved',
      message: 'Appearance settings saved.',
      type: 'success',
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-6 space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-slate-100 text-slate-700 rounded-lg">
            <Palette className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">Appearance</h3>
            <p className="text-xs text-slate-500">Customize interface theme, display density, and language settings.</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6 text-xs">
        {/* Theme Selection */}
        <div className="space-y-2.5">
          <label className="text-xs font-bold text-slate-900 block">
            Interface Theme
          </label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: 'light', label: 'Light', icon: Sun, desc: 'Clean government daylight mode' },
              { id: 'dark', label: 'Dark', icon: Moon, desc: 'High contrast dark theme' },
              { id: 'system', label: 'System', icon: Laptop, desc: 'Follow device preference' },
            ].map((t) => {
              const Icon = t.icon;
              const isSelected = formData.theme === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, theme: t.id }))}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-cyan-50/40 border-cyan-500 ring-1 ring-cyan-500/30'
                      : 'bg-slate-50/60 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold text-slate-900 mb-1">
                    <Icon className={`w-4 h-4 ${isSelected ? 'text-cyan-600' : 'text-slate-500'}`} />
                    <span>{t.label}</span>
                  </div>
                  <p className="text-[10px] text-slate-500">{t.desc}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Density Selection */}
        <div className="space-y-2.5 pt-2 border-t border-slate-100">
          <label className="text-xs font-bold text-slate-900 block">
            Display Density
          </label>
          <div className="grid grid-cols-2 gap-3">
            {[
              { id: 'comfortable', label: 'Comfortable', icon: LayoutGrid, desc: 'Optimized spacing for readability (Default)' },
              { id: 'compact', label: 'Compact', icon: List, desc: 'Dense data presentation for quick scanning' },
            ].map((d) => {
              const Icon = d.icon;
              const isSelected = formData.density === d.id;
              return (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, density: d.id }))}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-cyan-50/40 border-cyan-500 ring-1 ring-cyan-500/30'
                      : 'bg-slate-50/60 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold text-slate-900 mb-1">
                    <Icon className={`w-4 h-4 ${isSelected ? 'text-cyan-600' : 'text-slate-500'}`} />
                    <span>{d.label}</span>
                  </div>
                  <p className="text-[10px] text-slate-500">{d.desc}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Language Selection */}
        <div className="space-y-2 pt-2 border-t border-slate-100">
          <label className="text-xs font-bold text-slate-900 block flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-cyan-600" />
            Portal Language
          </label>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
            <span className="font-semibold text-slate-800">English (India)</span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-200/80 text-slate-600">
              Default
            </span>
          </div>
        </div>

        {/* Save button */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-[#0c1e33] hover:bg-slate-800 rounded-xl transition-all shadow-xs cursor-pointer"
          >
            <Save className="w-3.5 h-3.5 text-cyan-400" />
            <span>Save Appearance</span>
          </button>
        </div>
      </form>
    </div>
  );
};
