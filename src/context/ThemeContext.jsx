import React, { createContext, useContext, useState, useEffect } from 'react';
import { getSettings, saveSettings } from '../data/settingsStorage';

const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  const [theme, setThemeState] = useState(() => {
    try {
      const storedTheme = localStorage.getItem('label_setu_theme');
      if (storedTheme) return storedTheme;
      const settings = getSettings();
      return settings.appearance?.theme || 'plum';
    } catch {
      return 'plum';
    }
  });

  const [density, setDensityState] = useState(() => {
    try {
      const storedDensity = localStorage.getItem('label_setu_density');
      if (storedDensity) return storedDensity;
      const settings = getSettings();
      return settings.appearance?.density || 'comfortable';
    } catch {
      return 'comfortable';
    }
  });

  // Apply Theme to DOM root
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;

    // Clear previous theme classes
    root.classList.remove('theme-plum', 'theme-light', 'theme-dark', 'theme-contrast', 'dark');
    body.classList.remove('theme-plum', 'theme-light', 'theme-dark', 'theme-contrast', 'dark');

    const effectiveTheme = theme || 'plum';
    root.setAttribute('data-theme', effectiveTheme);
    body.setAttribute('data-theme', effectiveTheme);
    root.classList.add(`theme-${effectiveTheme}`);
    body.classList.add(`theme-${effectiveTheme}`);

    if (effectiveTheme === 'dark' || effectiveTheme === 'contrast') {
      root.classList.add('dark');
      body.classList.add('dark');
    }

    try {
      localStorage.setItem('label_setu_theme', effectiveTheme);
    } catch {
      // ignore
    }
  }, [theme]);

  // Apply Density to DOM root
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;

    root.classList.remove('density-compact', 'density-comfortable');
    body.classList.remove('density-compact', 'density-comfortable');

    const effectiveDensity = density === 'compact' ? 'density-compact' : 'density-comfortable';
    root.classList.add(effectiveDensity);
    body.classList.add(effectiveDensity);

    try {
      localStorage.setItem('label_setu_density', density);
    } catch {
      // ignore
    }
  }, [density]);

  const setTheme = (newTheme) => {
    setThemeState(newTheme);
    const currentSettings = getSettings();
    saveSettings({
      ...currentSettings,
      appearance: {
        ...currentSettings.appearance,
        theme: newTheme,
      },
    });
  };

  const setDensity = (newDensity) => {
    setDensityState(newDensity);
    const currentSettings = getSettings();
    saveSettings({
      ...currentSettings,
      appearance: {
        ...currentSettings.appearance,
        density: newDensity,
      },
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, density, setDensity }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
