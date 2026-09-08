import React, { createContext, useContext, useState, useEffect } from 'react';
import { getSettings, saveSettings } from '../data/settingsStorage';

const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  const [theme, setThemeState] = useState(() => {
    const settings = getSettings();
    return settings.appearance?.theme || 'light';
  });

  const [density, setDensityState] = useState(() => {
    const settings = getSettings();
    return settings.appearance?.density || 'comfortable';
  });

  // Apply Theme to DOM root
  useEffect(() => {
    const root = document.documentElement;
    const applyTheme = (isDark) => {
      if (isDark) {
        root.classList.add('dark');
        document.body.classList.add('dark');
      } else {
        root.classList.remove('dark');
        document.body.classList.remove('dark');
      }
    };

    if (theme === 'dark') {
      applyTheme(true);
    } else if (theme === 'light') {
      applyTheme(false);
    } else if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      applyTheme(mediaQuery.matches);

      const handler = (e) => applyTheme(e.matches);
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    }
  }, [theme]);

  // Apply Density to DOM root
  useEffect(() => {
    const root = document.documentElement;
    if (density === 'compact') {
      root.classList.add('density-compact');
      document.body.classList.add('density-compact');
    } else {
      root.classList.remove('density-compact');
      document.body.classList.remove('density-compact');
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
