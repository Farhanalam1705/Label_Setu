// Officer dashboard adapters derived from the shared fictional demonstration dataset.
import { INSPECTIONS } from './centralData';

const total = INSPECTIONS.length;
const count = (status) => INSPECTIONS.filter((item) => item.status === status).length;
const compliant = count('Compliant');
const nonCompliant = count('Non-Compliant');
const needsReview = count('Needs Review');
const percentage = (value) => `${((value / total) * 100).toFixed(1)}%`;

export const STATS_DATA = [
  { id: 'total', title: 'Total Inspections', value: String(total), change: 'Current demonstration records', trend: 'neutral', color: 'blue', icon: 'ClipboardCheck', description: 'Packaged commodities evaluated' },
  { id: 'compliant', title: 'Compliant Products', value: String(compliant), percentage: percentage(compliant), trend: 'up', color: 'emerald', icon: 'ShieldCheck', description: 'Satisfies all Legal Metrology mandates' },
  { id: 'violations', title: 'Violations', value: String(nonCompliant), percentage: percentage(nonCompliant), trend: 'down', color: 'rose', icon: 'AlertTriangle', description: 'Non-compliant declarations detected' },
  { id: 'review', title: 'Needs Review', value: String(needsReview), percentage: percentage(needsReview), trend: 'neutral', color: 'amber', icon: 'Clock', description: 'Requires officer confirmation' },
];

export const COMPLIANCE_CHART_DATA = [
  { name: 'Compliant', value: Number(((compliant / total) * 100).toFixed(1)), count: compliant, color: '#10b981' },
  { name: 'Violations', value: Number(((nonCompliant / total) * 100).toFixed(1)), count: nonCompliant, color: '#ef4444' },
  { name: 'Needs Review', value: Number(((needsReview / total) * 100).toFixed(1)), count: needsReview, color: '#f59e0b' },
];

export const RECENT_INSPECTIONS = INSPECTIONS.slice(0, 6).map((item) => ({
  id: item.inspectionId, product: item.productName, category: item.category, date: item.inspectionDate,
  status: item.status === 'Non-Compliant' ? 'Violation' : item.status, complianceScore: item.complianceScore,
  manufacturer: item.manufacturer, batchNo: item.batchNumber,
}));
