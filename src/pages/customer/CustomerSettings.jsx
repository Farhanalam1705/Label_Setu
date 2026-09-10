import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Save, 
  User, 
  Building, 
  Palette, 
  Globe, 
  Bell, 
  Shield, 
  Download, 
  Check, 
  RotateCcw, 
  Moon, 
  Sun, 
  Sparkles, 
  Mail, 
  Phone, 
  Lock, 
  KeyRound, 
  Smartphone, 
  FileText, 
  CheckCircle2, 
  HelpCircle,
  Laptop,
  Layers,
  MapPin,
  FileSpreadsheet
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { CUSTOMER_PROFILE } from '../../data/customerMockData';
import { useToast } from '../../components/common/Toast';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';

export const CustomerSettings = () => {
  const { addToast } = useToast();
  const { theme: selectedTheme, setTheme: setSelectedTheme, density, setDensity } = useTheme();
  const { language: selectedLanguage, setLanguage: setSelectedLanguage, t } = useLanguage();

  // Active Tab: 'profile' | 'appearance' | 'language' | 'notifications' | 'security' | 'data'
  const [activeTab, setActiveTab] = useState('appearance');

  // Form State: Profile & Organization
  const [companyName, setCompanyName] = useState(CUSTOMER_PROFILE.company);
  const [contactName, setContactName] = useState(CUSTOMER_PROFILE.name);
  const [designation, setDesignation] = useState(CUSTOMER_PROFILE.designation);
  const [email, setEmail] = useState(CUSTOMER_PROFILE.email);
  const [phone, setPhone] = useState('+91 98765 43210');
  const [registrationNo, setRegistrationNo] = useState(CUSTOMER_PROFILE.registrationNo);
  const [zone, setZone] = useState(CUSTOMER_PROFILE.zone);
  const [gstin, setGstin] = useState('07AAAAA0000A1Z5');
  const [address, setAddress] = useState('Plot 42, Sector 62, Industrial Area, Noida, UP 201301');

  // Appearance State
  const [animationsEnabled, setAnimationsEnabled] = useState(true);

  // Language & Regional State
  const [dateFormat, setDateFormat] = useState('DD/MM/YYYY');
  const [unitSystem, setUnitSystem] = useState('metric_pcr');

  // Notification Preferences State
  const [notifEmailInspections, setNotifEmailInspections] = useState(true);
  const [notifEmailGrievances, setNotifEmailGrievances] = useState(true);
  const [notifSmsAlerts, setNotifSmsAlerts] = useState(true);
  const [notifWhatsappUpdates, setNotifWhatsappUpdates] = useState(false);
  const [notifWeeklyDigest, setNotifWeeklyDigest] = useState(true);

  // Security State
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Handle Save
  const handleSaveAll = (e) => {
    e?.preventDefault();
    addToast({
      type: 'success',
      title: 'Settings Saved',
      message: 'Your customer portal preferences and profile details have been updated.',
    });
  };

  const languages = [
    { code: 'en', name: 'English (India)', native: 'English', region: 'Default' },
    { code: 'hi', name: 'Hindi', native: 'हिन्दी', region: 'National' },
    { code: 'bn', name: 'Bengali', native: 'বাংলা', region: 'Eastern' },
    { code: 'mr', name: 'Marathi', native: 'मराठी', region: 'Western' },
    { code: 'ta', name: 'Tamil', native: 'தமிழ்', region: 'Southern' },
    { code: 'te', name: 'Telugu', native: 'తెలుగు', region: 'Southern' },
    { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી', region: 'Western' },
    { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ', region: 'Southern' },
  ];

  const themeOptions = [
    {
      id: 'plum',
      name: 'Customer Plum (Default)',
      desc: 'Signature Legal Metrology deep wine and rich plum theme.',
      previewBg: 'bg-[#1b0a1a]',
      previewAccent: 'bg-[#57184a]',
      border: 'border-rose-400',
    },
    {
      id: 'light',
      name: 'Clean Light Slate',
      desc: 'Crisp minimal white background with soft slate contrast.',
      previewBg: 'bg-slate-100',
      previewAccent: 'bg-rose-600',
      border: 'border-slate-300',
    },
    {
      id: 'dark',
      name: 'Midnight Navy',
      desc: 'High-focus dark navy palette for low-light environments.',
      previewBg: 'bg-[#0a1526]',
      previewAccent: 'bg-cyan-500',
      border: 'border-cyan-500',
    },
    {
      id: 'contrast',
      name: 'High Contrast Legal',
      desc: 'Maximum accessibility and sharp element borders.',
      previewBg: 'bg-black',
      previewAccent: 'bg-amber-400',
      border: 'border-amber-400',
    },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-rose-700 mb-1">
            <Link to="/customer/dashboard" className="hover:underline flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" /> {t('backToDashboard', 'Back to Dashboard')}
            </Link>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {t('accountSettings', 'Account & Organization Settings')}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {t('accountSettingsSubtitle', 'Manage your registered business profile, theme preferences, language, and security controls')}
          </p>
        </div>

        <button
          type="button"
          onClick={handleSaveAll}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-[#57184a] hover:bg-[#431238] text-white shadow-md shadow-purple-950/15 transition-all cursor-pointer active:scale-98 self-start sm:self-auto"
        >
          <Save className="w-4 h-4" />
          <span>{t('saveChanges', 'Save Changes')}</span>
        </button>
      </div>

      {/* Main Settings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Navigation Tabs (Sidebar Column) */}
        <div className="space-y-4">
          {/* Business Profile Mini-Card */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#57184a] text-white flex items-center justify-center font-black text-lg ring-2 ring-rose-400/30">
                CU
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900">{contactName}</h3>
                <p className="text-[11px] text-slate-500">{designation}</p>
                <span className="text-[10px] font-mono font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200/60 inline-block mt-0.5">
                  {registrationNo}
                </span>
              </div>
            </div>
            <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500 space-y-1">
              <p className="truncate"><strong className="text-slate-700">{t('companyName', 'Company')}:</strong> {companyName}</p>
              <p><strong className="text-slate-700">{t('assignedEnforcementZone', 'Zone')}:</strong> {zone}</p>
            </div>
          </div>

          {/* Navigation Tab Menu */}
          <div className="bg-white rounded-2xl p-2 border border-slate-200/90 shadow-2xs space-y-1">
            {[
              { id: 'profile', label: t('organizationProfile', 'Organization & Profile'), icon: Building },
              { id: 'appearance', label: t('themeAppearance', 'Theme & Appearance'), icon: Palette },
              { id: 'language', label: t('languageRegionalStandards', 'Language & Regional Standards'), icon: Globe },
              { id: 'notifications', label: t('notificationPreferences', 'Notification Preferences'), icon: Bell },
              { id: 'security', label: t('securityAccess', 'Security & Access'), icon: Shield },
              { id: 'data', label: t('dataComplianceExport', 'Data & Compliance Export'), icon: Download },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer text-left ${
                    isActive
                      ? 'bg-[#57184a] text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-rose-300' : 'text-slate-400'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Pane (3 Columns) */}
        <div className="lg:col-span-3 space-y-6">
          {/* ───────────────────────────────────────────────────────── */}
          {/* TAB 1: PROFILE & ORGANIZATION */}
          {/* ───────────────────────────────────────────────────────── */}
          {activeTab === 'profile' && (
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-2xs space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-base font-bold text-slate-900">{t('organizationProfile', 'Organization & Business Profile')}</h2>
                  <p className="text-xs text-slate-500">{t('organizationProfileSubtitle', 'Official enterprise records registered with Legal Metrology')}</p>
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {t('verifiedBusiness', 'Verified Business')}
                </span>
              </div>

              <form onSubmit={handleSaveAll} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-700">{t('companyName', 'Company Name')}</label>
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 font-medium"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-700">{t('gstinTaxId', 'GSTIN / Tax ID')}</label>
                    <input
                      type="text"
                      value={gstin}
                      onChange={(e) => setGstin(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 font-mono font-medium"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-700">{t('authorizedRepresentative', 'Authorized Representative')}</label>
                    <input
                      type="text"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 font-medium"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-700">{t('designationRole', 'Designation / Role')}</label>
                    <input
                      type="text"
                      value={designation}
                      onChange={(e) => setDesignation(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 font-medium"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-700">{t('registeredEmail', 'Registered Email Address')}</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 font-mono font-medium"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-700">{t('directContactPhone', 'Direct Contact Phone')}</label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 font-medium"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-700">{t('legalMetrologyRegId', 'Legal Metrology Registration ID')}</label>
                    <input
                      type="text"
                      value={registrationNo}
                      readOnly
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-500 font-mono cursor-not-allowed"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-700">{t('assignedEnforcementZone', 'Assigned Enforcement Zone')}</label>
                    <input
                      type="text"
                      value={zone}
                      readOnly
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-500 cursor-not-allowed"
                    />
                  </div>

                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="font-bold text-slate-700">{t('registeredAddress', 'Registered Manufacturing / Packaging Address')}</label>
                    <textarea
                      rows={3}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 font-medium"
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-[#57184a] hover:bg-[#431238] text-white shadow-sm transition-colors cursor-pointer"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>{t('saveProfileDetails', 'Save Profile Details')}</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* ───────────────────────────────────────────────────────── */}
          {/* TAB 2: THEME & APPEARANCE */}
          {/* ───────────────────────────────────────────────────────── */}
          {activeTab === 'appearance' && (
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-2xs space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-base font-bold text-slate-900">{t('themeAppearance', 'Theme & Interface Appearance')}</h2>
                  <p className="text-xs text-slate-500">{t('themeAppearanceSubtitle', 'Customize the visual theme, contrast, and layout density')}</p>
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-purple-50 text-[#57184a] border border-purple-200">
                  {selectedTheme.toUpperCase()} {t('active', 'ACTIVE')}
                </span>
              </div>

              {/* Theme Palette Selection Grid */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-slate-800 block">{t('colorThemes', 'Color Themes')}</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {themeOptions.map((theme) => {
                    const isSelected = selectedTheme === theme.id;
                    return (
                      <div
                        key={theme.id}
                        onClick={() => {
                          setSelectedTheme(theme.id);
                          addToast({
                            type: 'info',
                            title: 'Theme Updated',
                            message: `Switched active theme to ${theme.name}.`,
                          });
                        }}
                        className={`p-4 rounded-xl border-2 transition-all cursor-pointer space-y-2.5 ${
                          isSelected
                            ? `${theme.border} bg-slate-50 shadow-xs ring-2 ring-rose-500/20`
                            : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className={`w-6 h-6 rounded-lg ${theme.previewBg} border border-white/20 shadow-xs flex items-center justify-center`}>
                              <div className={`w-2.5 h-2.5 rounded-full ${theme.previewAccent}`} />
                            </div>
                            <span className="font-bold text-xs text-slate-900">{theme.name}</span>
                          </div>
                          {isSelected && <CheckCircle2 className="w-4 h-4 text-rose-700" />}
                        </div>
                        <p className="text-[11px] text-slate-500 leading-normal">{theme.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Layout Density & Animation Options */}
              <div className="pt-4 border-t border-slate-100 space-y-4 text-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div>
                    <span className="font-bold text-slate-900 block">{t('layoutDensity', 'Layout Density')}</span>
                    <span className="text-[11px] text-slate-500">{t('layoutDensityDesc', 'Control table row spacing and cards padding')}</span>
                  </div>
                  <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 shadow-2xs">
                    <button
                      onClick={() => setDensity('comfortable')}
                      className={`px-3 py-1.5 rounded-lg font-bold text-xs transition-colors cursor-pointer ${
                        density === 'comfortable' ? 'bg-[#57184a] text-white shadow-xs' : 'text-slate-600'
                      }`}
                    >
                      {t('comfortable', 'Comfortable')}
                    </button>
                    <button
                      onClick={() => setDensity('compact')}
                      className={`px-3 py-1.5 rounded-lg font-bold text-xs transition-colors cursor-pointer ${
                        density === 'compact' ? 'bg-[#57184a] text-white shadow-xs' : 'text-slate-600'
                      }`}
                    >
                      {t('compact', 'Compact')}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div>
                    <span className="font-bold text-slate-900 block">{t('microAnimations', 'Micro-Animations & Transitions')}</span>
                    <span className="text-[11px] text-slate-500">{t('microAnimationsDesc', 'Enable smooth card hovers and pipeline animations')}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setAnimationsEnabled(!animationsEnabled)}
                    className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer p-0.5 ${
                      animationsEnabled ? 'bg-[#57184a]' : 'bg-slate-300'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full bg-white transition-transform ${
                        animationsEnabled ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ───────────────────────────────────────────────────────── */}
          {/* TAB 3: LANGUAGE & REGIONAL */}
          {/* ───────────────────────────────────────────────────────── */}
          {activeTab === 'language' && (
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-2xs space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-base font-bold text-slate-900">{t('languageRegionalStandards', 'Language & Regional Standards')}</h2>
                  <p className="text-xs text-slate-500">{t('languageRegionalSubtitle', 'Configure Indian official languages and statutory measurement units')}</p>
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-rose-50 text-rose-700 border border-rose-200">
                  {t('languagesSupported', '8 Languages Supported')}
                </span>
              </div>

              {/* Language Selection Grid */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-slate-800 block">{t('selectPortalLanguage', 'Select Portal Language')}</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                  {languages.map((lang) => {
                    const isSelected = selectedLanguage === lang.code;
                    return (
                      <div
                        key={lang.code}
                        onClick={() => {
                          setSelectedLanguage(lang.code);
                          addToast({
                            type: 'success',
                            title: 'Language Selected',
                            message: `Portal language switched to ${lang.native} (${lang.name}).`,
                          });
                        }}
                        className={`p-3.5 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
                          isSelected
                            ? 'border-rose-600 bg-rose-50/50 shadow-xs ring-1 ring-rose-500/20'
                            : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold text-slate-400 uppercase">{lang.region}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-rose-700 font-bold" />}
                        </div>
                        <div>
                          <p className="font-black text-sm text-slate-900">{lang.native}</p>
                          <p className="text-[11px] text-slate-500">{lang.name}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Date & Standards Form */}
              <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700">{t('dateFormat', 'Date Format')}</label>
                  <select
                    value={dateFormat}
                    onChange={(e) => setDateFormat(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 font-medium focus:outline-hidden focus:border-rose-500 cursor-pointer"
                  >
                    <option value="DD/MM/YYYY">DD/MM/YYYY (e.g. 09/09/2026 - Standard India)</option>
                    <option value="DD MMM YYYY">DD MMM YYYY (e.g. 09 Sep 2026)</option>
                    <option value="YYYY-MM-DD">YYYY-MM-DD (ISO Technical Standard)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700">{t('statutoryUnitStandard', 'Statutory Unit Rule Standard')}</label>
                  <select
                    value={unitSystem}
                    onChange={(e) => setUnitSystem(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 font-medium focus:outline-hidden focus:border-rose-500 cursor-pointer"
                  >
                    <option value="metric_pcr">Metric Units - PCR 2011 Schedule II (kg, g, L, ml, m, cm)</option>
                    <option value="si_standard">SI International Standard Units</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* ───────────────────────────────────────────────────────── */}
          {/* TAB 4: NOTIFICATIONS & ALERTS */}
          {/* ───────────────────────────────────────────────────────── */}
          {activeTab === 'notifications' && (
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-2xs space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-base font-bold text-slate-900">{t('notificationPreferences', 'Notification Preferences')}</h2>
                  <p className="text-xs text-slate-500">{t('notificationPreferencesSubtitle', 'Configure regulatory alerts, inspection updates, and grievance dispatches')}</p>
                </div>
                <Bell className="w-5 h-5 text-rose-700" />
              </div>

              <div className="space-y-3.5 text-xs">
                {/* Notification Item 1 */}
                <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="space-y-0.5 max-w-lg">
                    <span className="font-bold text-slate-900 block">{t('inspectionLogUpdates', 'Inspection Log Updates')}</span>
                    <p className="text-slate-500 text-[11px]">
                      {t('inspectionLogUpdatesDesc', 'Receive automated email notifications whenever an enforcement officer completes a product label review.')}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setNotifEmailInspections(!notifEmailInspections)}
                    className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer p-0.5 shrink-0 ml-3 ${
                      notifEmailInspections ? 'bg-[#57184a]' : 'bg-slate-300'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full bg-white transition-transform ${
                        notifEmailInspections ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                {/* Notification Item 2 */}
                <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="space-y-0.5 max-w-lg">
                    <span className="font-bold text-slate-900 block">{t('grievanceAlerts', 'Grievance & Complaint Tracking Alerts')}</span>
                    <p className="text-slate-500 text-[11px]">
                      {t('grievanceAlertsDesc', 'Instant notifications for status changes (Submitted → Under Review → Resolved / Rejected).')}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setNotifEmailGrievances(!notifEmailGrievances)}
                    className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer p-0.5 shrink-0 ml-3 ${
                      notifEmailGrievances ? 'bg-[#57184a]' : 'bg-slate-300'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full bg-white transition-transform ${
                        notifEmailGrievances ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                {/* Notification Item 3 */}
                <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="space-y-0.5 max-w-lg">
                    <span className="font-bold text-slate-900 block">{t('urgentSmsAlerts', 'Urgent SMS Alerts for Non-Compliance Notices')}</span>
                    <p className="text-slate-500 text-[11px]">
                      {t('urgentSmsAlertsDesc', 'Receive direct priority SMS for any flagged packaging non-compliance needing 48-hour response.')}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setNotifSmsAlerts(!notifSmsAlerts)}
                    className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer p-0.5 shrink-0 ml-3 ${
                      notifSmsAlerts ? 'bg-[#57184a]' : 'bg-slate-300'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full bg-white transition-transform ${
                        notifSmsAlerts ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                {/* Notification Item 4 */}
                <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="space-y-0.5 max-w-lg">
                    <span className="font-bold text-slate-900 block">{t('whatsappDigest', 'WhatsApp Statutory Digest')}</span>
                    <p className="text-slate-500 text-[11px]">
                      {t('whatsappDigestDesc', 'Receive weekly summary digests and legal metrology amendments via verified WhatsApp business line.')}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setNotifWhatsappUpdates(!notifWhatsappUpdates)}
                    className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer p-0.5 shrink-0 ml-3 ${
                      notifWhatsappUpdates ? 'bg-[#57184a]' : 'bg-slate-300'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full bg-white transition-transform ${
                        notifWhatsappUpdates ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ───────────────────────────────────────────────────────── */}
          {/* TAB 5: SECURITY & ACCESS */}
          {/* ───────────────────────────────────────────────────────── */}
          {activeTab === 'security' && (
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-2xs space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-base font-bold text-slate-900">{t('securityAccess', 'Security & Authentication')}</h2>
                  <p className="text-xs text-slate-500">{t('securityAccessSubtitle', 'Manage credentials, two-factor authentication, and active enterprise sessions')}</p>
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200">
                  2FA {t('active', 'Active')}
                </span>
              </div>

              {/* 2FA Card */}
              <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <div className="space-y-0.5">
                    <h3 className="text-xs font-bold text-slate-900">{t('twoFactorAuth', 'Two-Factor Authentication (2FA)')}</h3>
                    <p className="text-[11px] text-slate-600">{t('twoFactorAuthDesc', 'OTP required on registered mobile (+91 98765 43210)')}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setTwoFactorEnabled(!twoFactorEnabled);
                    addToast({
                      type: twoFactorEnabled ? 'warning' : 'success',
                      title: '2FA Status',
                      message: twoFactorEnabled ? 'Two-Factor Authentication disabled.' : 'Two-Factor Authentication enabled.',
                    });
                  }}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-white text-slate-700 border border-slate-200 shadow-2xs hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  {twoFactorEnabled ? t('configure', 'Configure') : t('enable', 'Enable')}
                </button>
              </div>

              {/* Password Change Section */}
              <div className="space-y-3 pt-2">
                <span className="text-xs font-bold text-slate-800 block">{t('changePassword', 'Change Account Password')}</span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-slate-600">{t('currentPassword', 'Current Password')}</label>
                    <input
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 focus:outline-hidden focus:border-rose-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-slate-600">{t('newPassword', 'New Password')}</label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 focus:outline-hidden focus:border-rose-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-slate-600">{t('confirmPassword', 'Confirm Password')}</label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 focus:outline-hidden focus:border-rose-500"
                    />
                  </div>
                </div>
                <div className="flex justify-end pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      if (!currentPassword || !newPassword) {
                        addToast({
                          type: 'error',
                          title: 'Password Update',
                          message: 'Please enter your current and new password.',
                        });
                        return;
                      }
                      setCurrentPassword('');
                      setNewPassword('');
                      setConfirmPassword('');
                      addToast({
                        type: 'success',
                        title: 'Password Changed',
                        message: 'Your portal login password has been updated securely.',
                      });
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white transition-colors cursor-pointer"
                  >
                    <KeyRound className="w-3.5 h-3.5" />
                    <span>{t('updatePassword', 'Update Password')}</span>
                  </button>
                </div>
              </div>

              {/* Active Session Info */}
              <div className="pt-4 border-t border-slate-100 space-y-2 text-xs">
                <span className="font-bold text-slate-800 block">{t('activeSession', 'Current Active Session')}</span>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Laptop className="w-4 h-4 text-emerald-600" />
                    <div>
                      <span className="font-bold text-slate-900">Chrome on Windows &bull; New Delhi, India</span>
                      <span className="text-[11px] text-slate-400 block font-mono">IP: 103.21.244.12 &bull; Active Now</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    This Device
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* ───────────────────────────────────────────────────────── */}
          {/* TAB 6: DATA & COMPLIANCE EXPORT */}
          {/* ───────────────────────────────────────────────────────── */}
          {activeTab === 'data' && (
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-2xs space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-base font-bold text-slate-900">{t('dataComplianceExport', 'Data & Compliance Export')}</h2>
                  <p className="text-xs text-slate-500">{t('dataComplianceExportSubtitle', 'Download complete audit logs, certification dossiers, and inspection histories')}</p>
                </div>
                <Download className="w-5 h-5 text-rose-700" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3 flex flex-col justify-between">
                  <div className="space-y-1">
                    <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-700 flex items-center justify-center font-bold">
                      <FileSpreadsheet className="w-4 h-4" />
                    </div>
                    <h3 className="font-bold text-slate-900">{t('inspectionAuditHistoryCsv', 'Inspection & Audit History (CSV)')}</h3>
                    <p className="text-[11px] text-slate-500">
                      {t('inspectionAuditHistoryCsvDesc', 'Complete tabular export of all 8 verification logs with compliance scores and date stamps.')}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      addToast({
                        type: 'success',
                        title: 'Export Started',
                        message: 'Downloading Legal_Metrology_Inspection_Log_2026.csv',
                      });
                    }}
                    className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl font-bold text-xs bg-white text-slate-800 border border-slate-200 hover:bg-slate-100 transition-colors shadow-2xs cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{t('downloadCsvLog', 'Download CSV Log')}</span>
                  </button>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3 flex flex-col justify-between">
                  <div className="space-y-1">
                    <div className="w-8 h-8 rounded-lg bg-purple-50 text-[#57184a] flex items-center justify-center font-bold">
                      <FileText className="w-4 h-4" />
                    </div>
                    <h3 className="font-bold text-slate-900">Grievances & Complaints Archive (JSON)</h3>
                    <p className="text-[11px] text-slate-500">
                      Full structured record of submitted product complaints with preliminary AI analysis ratings.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      addToast({
                        type: 'success',
                        title: 'Export Started',
                        message: 'Downloading Customer_Complaints_Archive_2026.json',
                      });
                    }}
                    className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl font-bold text-xs bg-[#57184a] text-white hover:bg-[#431238] transition-colors shadow-2xs cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export JSON Archive</span>
                  </button>
                </div>
              </div>

              {/* Cache Management */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                <div className="space-y-0.5">
                  <span className="font-bold text-slate-900 block">Local Data Synchronization</span>
                  <span className="text-[11px] text-slate-500">Reset local draft caches and refresh latest rules from server</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    addToast({
                      type: 'success',
                      title: 'Cache Cleared',
                      message: 'Local browser verification cache synchronized.',
                    });
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white text-slate-700 border border-slate-200 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Sync Cache</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
