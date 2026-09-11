import { INSPECTIONS, PRODUCTS } from './centralData';

export const HISTORY_STORAGE_KEY = 'labelsetu_inspection_history';

export const INITIAL_MOCK_INSPECTIONS = INSPECTIONS.map((inspection) => {
  const product = PRODUCTS.find((item) => item.productId === inspection.productId);
  return {
    inspectionId: inspection.inspectionId, productName: inspection.productName, category: inspection.category,
    categoryGroup: inspection.category, manufacturer: inspection.manufacturer, netQuantity: product?.packSize || '',
    mrp: `₹${product?.mrp || ''}`, date: inspection.inspectionDate, rawDate: inspection.inspectionDate,
    officer: inspection.officerName, complianceScore: inspection.complianceScore,
    status: inspection.status.toUpperCase().replace(' ', '-'), hasReport: true, hasEvidence: true,
  };
});

export const getInspectionHistory = () => {
  try {
    const stored = localStorage.getItem(HISTORY_STORAGE_KEY);
    if (stored !== null) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) return parsed;
    }
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(INITIAL_MOCK_INSPECTIONS));
  } catch (error) {
    console.warn('Failed to load inspection history from localStorage', error);
  }
  return INITIAL_MOCK_INSPECTIONS;
};

export const saveInspectionToHistory = (inspection) => {
  try {
    const history = getInspectionHistory();
    const existingIndex = history.findIndex((item) => item.inspectionId === inspection.inspectionId);
    const updated = existingIndex >= 0
      ? history.map((item, index) => index === existingIndex ? { ...item, ...inspection } : item)
      : [inspection, ...history];
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (error) {
    console.error('Failed to save inspection to history', error);
    return getInspectionHistory();
  }
};

export const deleteInspectionFromHistory = (inspectionId) => {
  const updated = getInspectionHistory().filter((item) => item.inspectionId !== inspectionId);
  localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updated));
  return updated;
};

export const deleteMultipleInspections = (inspectionIds = []) => {
  const selected = new Set(inspectionIds);
  const updated = getInspectionHistory().filter((item) => !selected.has(item.inspectionId));
  localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updated));
  return updated;
};

export const clearAllInspectionHistory = () => {
  localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify([]));
  return [];
};
