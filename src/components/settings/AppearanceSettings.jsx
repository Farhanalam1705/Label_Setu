import React, { useState } from 'react';
import { Palette, Sun, Moon, LayoutGrid, List, Globe, Save, Check } from 'lucide-react';
import { useToast } from '../common/Toast';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';

export const AppearanceSettings = ({ appearance, onSaveAppearance }) => {
  const { addToast } = useToast();
  const { theme, setTheme, density, setDensity } = useTheme();
  const { language, setLanguage, t, languagesList } = useLanguage();

  const [formData, setFormData] = useState({
    theme: theme || appearance?.theme || 'light',
    density: density || appearance?.density || 'comfortable',
    language: language || 'en',
  });

  const handleThemeChange = (newTheme) => {
    setFormData((prev) => ({ ...prev, theme: newTheme }));
    setTheme(newTheme);
  };

  const handleDensityChange = (newDensity) => {
    setFormData((prev) => ({ ...prev, density: newDensity }));
    setDensity(newDensity);
  };

  const handleLanguageChange = (langCode) => {
    setFormData((prev) => ({ ...prev, language: langCode }));
    setLanguage(langCode);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (onSaveAppearance) {
      onSaveAppearance(formData);
    }
    addToast({
      title: t('appearanceSaved', 'Appearance Saved'),
      message: t('appearanceSavedDesc', 'Appearance settings saved successfully.'),
      type: 'success',
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-6 space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-slate-100 text-slate-700 rounded-lg">
            <Palette className="w-4 h-4 text-cyan-600" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">{t('appearanceTitle', 'Appearance')}</h3>
            <p className="text-xs text-slate-500">{t('appearanceSubtitle', 'Customize interface theme, display density, and language settings.')}</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6 text-xs">
        {/* Theme Selection */}
        <div className="space-y-2.5">
          <label className="text-xs font-bold text-slate-900 block">
            {t('interfaceTheme', 'Interface Theme')}
          </label>
          <div className="grid grid-cols-2 gap-3">
            {[
              { id: 'light', label: t('themeLight', 'Light'), icon: Sun },
              { id: 'dark', label: t('themeDark', 'Dark'), icon: Moon },
            ].map((item) => {
              const Icon = item.icon;
              const isSelected = formData.theme === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleThemeChange(item.id)}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer relative ${
                    isSelected
                      ? 'bg-cyan-50/50 border-cyan-500 ring-2 ring-cyan-500/20 shadow-xs'
                      : 'bg-slate-50/60 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between font-bold text-slate-900">
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-4 h-4 ${isSelected ? 'text-cyan-600' : 'text-slate-500'}`} />
                      <span className="text-xs">{item.label}</span>
                    </div>
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Density Selection */}
        <div className="space-y-2.5 pt-2 border-t border-slate-100">
          <label className="text-xs font-bold text-slate-900 block">
            {t('displayDensity', 'Display Density')}
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { id: 'comfortable', label: t('densityComfortable', 'Comfortable'), icon: LayoutGrid, desc: t('densityComfortableDesc', 'Optimized spacing for readability (Default)') },
              { id: 'compact', label: t('densityCompact', 'Compact'), icon: List, desc: t('densityCompactDesc', 'Dense data presentation for quick scanning') },
            ].map((item) => {
              const Icon = item.icon;
              const isSelected = formData.density === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleDensityChange(item.id)}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-cyan-50/50 border-cyan-500 ring-2 ring-cyan-500/20 shadow-xs'
                      : 'bg-slate-50/60 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between font-bold text-slate-900 mb-1">
                    <div className="flex items-center gap-2">
                      <Icon className={`w-4 h-4 ${isSelected ? 'text-cyan-600' : 'text-slate-500'}`} />
                      <span>{item.label}</span>
                    </div>
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
                    )}
                  </div>
                  <p className="text-[10px] text-slate-500">{item.desc}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Multi-Language Selection */}
        <div className="space-y-3 pt-2 border-t border-slate-100">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-900 block flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-cyan-600" />
              <span>{t('portalLanguage', 'Portal Language')}</span>
            </label>
            <span className="text-[10px] text-slate-500 font-medium">
              {languagesList.length} {t('selectLanguage', 'Languages Available')}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
            {languagesList.map((lang) => {
              const isSelected = formData.language === lang.code;
              return (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-cyan-50/60 border-cyan-500 ring-2 ring-cyan-500/20 shadow-xs'
                      : 'bg-slate-50/60 border-slate-200 hover:border-slate-300 hover:bg-slate-100/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-slate-900">{lang.native}</span>
                    {isSelected ? (
                      <Check className="w-3.5 h-3.5 text-cyan-600" />
                    ) : lang.default ? (
                      <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-slate-200/80 text-slate-600">
                        Default
                      </span>
                    ) : null}
                  </div>
                  <span className="text-[10px] text-slate-500 truncate">{lang.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Save button */}
        <div className="flex justify-end pt-3 border-t border-slate-100">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-[#0c1e33] hover:bg-slate-800 rounded-xl transition-all shadow-xs cursor-pointer"
          >
            <Save className="w-3.5 h-3.5 text-cyan-400" />
            <span>{t('saveAppearance', 'Save Appearance')}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
