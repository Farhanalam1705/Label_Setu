import React, { useState } from 'react';
import { Settings as SettingsIcon, RotateCcw } from 'lucide-react';
import { getSettings, saveSettings, resetSettings } from '../data/settingsStorage';
import { SettingsNavigation } from '../components/settings/SettingsNavigation';
import { ProfileSettings } from '../components/settings/ProfileSettings';
import { InspectionPreferences } from '../components/settings/InspectionPreferences';
import { NotificationSettings } from '../components/settings/NotificationSettings';
import { AppearanceSettings } from '../components/settings/AppearanceSettings';
import { SecuritySettings } from '../components/settings/SecuritySettings';
import { AboutSettings } from '../components/settings/AboutSettings';
import { ResetSettingsModal } from '../components/settings/ResetSettingsModal';
import { useToast } from '../components/common/Toast';

export const SettingsPage = () => {
  const { addToast } = useToast();
  const [settings, setSettings] = useState(() => getSettings());
  const [activeTab, setActiveTab] = useState('profile');
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  const handleSaveProfile = (newProfile) => {
    const updated = { ...settings, profile: newProfile };
    setSettings(updated);
    saveSettings(updated);
  };

  const handleSaveInspectionPreferences = (newPrefs) => {
    const updated = { ...settings, inspectionPreferences: newPrefs };
    setSettings(updated);
    saveSettings(updated);
  };

  const handleSaveNotifications = (newNotifs) => {
    const updated = { ...settings, notifications: newNotifs };
    setSettings(updated);
    saveSettings(updated);
  };

  const handleSaveAppearance = (newApp) => {
    const updated = { ...settings, appearance: newApp };
    setSettings(updated);
    saveSettings(updated);
  };

  const handleConfirmReset = () => {
    const defaults = resetSettings();
    setSettings(defaults);
    addToast({
      title: 'Preferences Reset',
      message: 'Preferences restored to defaults.',
      type: 'info',
    });
  };

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-800 bg-cyan-50 px-2 py-0.5 rounded border border-cyan-200">
              System Configuration
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
            <SettingsIcon className="w-6 h-6 text-cyan-600" />
            Settings
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage your account, application preferences, and inspection settings.
          </p>
        </div>

        {/* Mobile Reset option trigger */}
        <div className="lg:hidden">
          <button
            type="button"
            onClick={() => setIsResetModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-amber-700 bg-white hover:bg-amber-50 border border-slate-200 rounded-xl transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Preferences</span>
          </button>
        </div>
      </div>

      {/* Main Settings 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Navigation */}
        <div className="lg:col-span-4 xl:col-span-3">
          <SettingsNavigation
            activeTab={activeTab}
            onSelectTab={setActiveTab}
            onOpenResetModal={() => setIsResetModalOpen(true)}
          />
        </div>

        {/* Right Content Area */}
        <div className="lg:col-span-8 xl:col-span-9">
          {activeTab === 'profile' && (
            <ProfileSettings
              profile={settings.profile}
              onSaveProfile={handleSaveProfile}
            />
          )}

          {activeTab === 'inspection' && (
            <InspectionPreferences
              preferences={settings.inspectionPreferences}
              onSavePreferences={handleSaveInspectionPreferences}
            />
          )}

          {activeTab === 'notifications' && (
            <NotificationSettings
              notifications={settings.notifications}
              onSaveNotifications={handleSaveNotifications}
            />
          )}

          {activeTab === 'appearance' && (
            <AppearanceSettings
              appearance={settings.appearance}
              onSaveAppearance={handleSaveAppearance}
            />
          )}

          {activeTab === 'security' && <SecuritySettings />}

          {activeTab === 'about' && <AboutSettings />}
        </div>
      </div>

      {/* Reset Preferences Confirmation Modal */}
      {isResetModalOpen && (
        <ResetSettingsModal
          isOpen={isResetModalOpen}
          onClose={() => setIsResetModalOpen(false)}
          onConfirm={handleConfirmReset}
        />
      )}
    </div>
  );
};
