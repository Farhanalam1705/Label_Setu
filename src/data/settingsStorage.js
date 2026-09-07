/**
 * Storage helpers for LABEL SETU Settings.
 * Storage key: labelsetu_settings
 */

export const SETTINGS_STORAGE_KEY = 'labelsetu_settings';

export const DEFAULT_SETTINGS = {
  profile: {
    fullName: 'Officer',
    role: 'Enforcement Official',
    department: 'Legal Metrology',
    email: 'officer@labelsetu.gov.in',
    phone: '+91 XXXXX XXXXX',
    employeeId: 'LM-OFFICER-001',
  },
  inspectionPreferences: {
    autoSave: true,
    showConfidenceScores: true,
    showEvidenceHighlights: true,
    requireOfficerReview: true,
    defaultReportFormat: 'PDF',
    defaultCategory: 'Packaged Commodities',
  },
  notifications: {
    inspectionCompleted: true,
    officerReviewRequired: true,
    reportGenerated: true,
    violationDetected: true,
    systemUpdates: false,
  },
  appearance: {
    theme: 'light',
    density: 'comfortable',
    language: 'English',
  },
};

/**
 * Get current settings from localStorage or defaults
 */
export const getSettings = () => {
  try {
    const stored = localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return {
        profile: { ...DEFAULT_SETTINGS.profile, ...parsed.profile },
        inspectionPreferences: {
          ...DEFAULT_SETTINGS.inspectionPreferences,
          ...parsed.inspectionPreferences,
        },
        notifications: {
          ...DEFAULT_SETTINGS.notifications,
          ...parsed.notifications,
        },
        appearance: {
          ...DEFAULT_SETTINGS.appearance,
          ...parsed.appearance,
        },
      };
    }
  } catch (e) {
    console.warn('Failed to parse settings from localStorage', e);
  }
  return DEFAULT_SETTINGS;
};

/**
 * Save settings to localStorage
 */
export const saveSettings = (newSettings) => {
  try {
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(newSettings));
    return true;
  } catch (e) {
    console.error('Failed to save settings to localStorage', e);
    return false;
  }
};

/**
 * Reset settings to default values
 */
export const resetSettings = () => {
  try {
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(DEFAULT_SETTINGS));
    return DEFAULT_SETTINGS;
  } catch (e) {
    console.error('Failed to reset settings in localStorage', e);
    return DEFAULT_SETTINGS;
  }
};
