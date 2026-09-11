import React, { createContext, useContext, useState, useEffect } from 'react';

const RegionalContext = createContext(null);

const LS_DATE_KEY = 'label_setu_date_format';
const LS_UNIT_KEY = 'label_setu_unit_system';

export const RegionalProvider = ({ children }) => {
  const [dateFormat, setDateFormatState] = useState(() => {
    try {
      return localStorage.getItem(LS_DATE_KEY) || 'DD/MM/YYYY';
    } catch {
      return 'DD/MM/YYYY';
    }
  });

  const [unitSystem, setUnitSystemState] = useState(() => {
    try {
      return localStorage.getItem(LS_UNIT_KEY) || 'metric_pcr';
    } catch {
      return 'metric_pcr';
    }
  });

  useEffect(() => {
    try { localStorage.setItem(LS_DATE_KEY, dateFormat); } catch { /* ignore */ }
  }, [dateFormat]);

  useEffect(() => {
    try { localStorage.setItem(LS_UNIT_KEY, unitSystem); } catch { /* ignore */ }
  }, [unitSystem]);

  /**
   * Format a Date object or ISO string according to the current dateFormat setting.
   */
  const formatDate = (dateInput) => {
    if (!dateInput) return '';
    const d = dateInput instanceof Date ? dateInput : new Date(dateInput);
    if (isNaN(d)) return String(dateInput);

    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const yyyy = String(d.getFullYear());
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const mmm = monthNames[d.getMonth()];

    switch (dateFormat) {
      case 'DD MMM YYYY': return `${dd} ${mmm} ${yyyy}`;
      case 'YYYY-MM-DD':  return `${yyyy}-${mm}-${dd}`;
      case 'DD/MM/YYYY':
      default:            return `${dd}/${mm}/${yyyy}`;
    }
  };

  /**
   * Returns the display label for the current unit system.
   */
  const unitLabel = unitSystem === 'si_standard'
    ? 'SI International Standard Units'
    : 'Metric Units – PCR 2011 Sch. II (kg, g, L, ml, m, cm)';

  return (
    <RegionalContext.Provider
      value={{
        dateFormat,
        setDateFormat: setDateFormatState,
        unitSystem,
        setUnitSystem: setUnitSystemState,
        formatDate,
        unitLabel,
      }}
    >
      {children}
    </RegionalContext.Provider>
  );
};

export const useRegional = () => {
  const ctx = useContext(RegionalContext);
  if (!ctx) throw new Error('useRegional must be used within a RegionalProvider');
  return ctx;
};
