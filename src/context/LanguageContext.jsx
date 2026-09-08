import React, { createContext, useContext, useState, useCallback } from 'react';
import { LANGUAGES, getTranslation } from '../data/translations';
import { getSettings, saveSettings } from '../data/settingsStorage';

const LanguageContext = createContext(null);

export const LanguageProvider = ({ children }) => {
  const [language, setLanguageState] = useState(() => {
    const settings = getSettings();
    const storedLang = settings.appearance?.language;
    // check if matches code or name
    if (storedLang) {
      const match = LANGUAGES.find(
        (l) => l.code === storedLang || l.name.toLowerCase() === storedLang.toLowerCase()
      );
      if (match) return match.code;
    }
    return 'en';
  });

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
