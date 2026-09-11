import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes/AppRoutes';
import { ToastProvider } from './components/common/Toast';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { RegionalProvider } from './context/RegionalContext';

export function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <LanguageProvider>
          <RegionalProvider>
            <ToastProvider>
              <AppRoutes />
            </ToastProvider>
          </RegionalProvider>
        </LanguageProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;

