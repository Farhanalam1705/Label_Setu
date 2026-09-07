import React from 'react';
import { User, Sliders, Bell, Palette, Shield, Info, RotateCcw } from 'lucide-react';

export const SETTINGS_TABS = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'inspection', label: 'Inspection Preferences', icon: Sliders },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'appearance', label: 'Appearance', icon: Palette },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'about', label: 'About LABEL SETU', icon: Info },
];

export const SettingsNavigation = ({ activeTab, onSelectTab, onOpenResetModal }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-3 space-y-1">
      <div className="hidden lg:block px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
        Navigation
      </div>

      {/* Desktop Navigation list / Mobile horizontal scrollable tabs */}
      <div className="flex lg:flex-col overflow-x-auto lg:overflow-visible gap-1 pb-1 lg:pb-0 scrollbar-none">
        {SETTINGS_TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onSelectTab(tab.id)}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap text-left shrink-0 lg:shrink ${
                isActive
                  ? 'bg-[#0c1e33] text-white shadow-2xs font-bold'
                  : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Reset Preferences CTA button at bottom */}
      <div className="hidden lg:block pt-3 mt-3 border-t border-slate-100">
        <button
          type="button"
          onClick={onOpenResetModal}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:text-amber-700 hover:bg-amber-50 transition-colors cursor-pointer text-left"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Preferences</span>
        </button>
      </div>
    </div>
  );
};
