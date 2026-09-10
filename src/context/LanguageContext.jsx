import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { LANGUAGES, getTranslation } from '../data/translations';
import { getSettings, saveSettings } from '../data/settingsStorage';

const LanguageContext = createContext(null);

export const LanguageProvider = ({ children }) => {
  const [language, setLanguageState] = useState(() => {
    try {
      const stored = localStorage.getItem('label_setu_language');
      if (stored) return stored;
      const settings = getSettings();
      const storedLang = settings.appearance?.language;
      if (storedLang) {
        const match = LANGUAGES.find(
          (l) => l.code === storedLang || l.name.toLowerCase() === storedLang.toLowerCase()
        );
        if (match) return match.code;
      }
    } catch {
      // ignore
    }
    return 'en';
  });

  useEffect(() => {
    try {
      localStorage.setItem('label_setu_language', language);
      document.documentElement.setAttribute('lang', language);
    } catch {
      // ignore
    }
  }, [language]);

  const setLanguage = (langCode) => {
    setLanguageState(langCode);
    const match = LANGUAGES.find((l) => l.code === langCode);
    const langName = match ? match.name : 'English (India)';
    const currentSettings = getSettings();
    saveSettings({
      ...currentSettings,
      appearance: {
        ...currentSettings.appearance,
        language: langName,
      },
    });
  };

  const t = useCallback(
    (key, defaultVal = '') => {
      return getTranslation(language, key, defaultVal);
    },
    [language]
  );

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        languagesList: LANGUAGES,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
