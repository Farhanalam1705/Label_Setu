import { COMPLAINTS, PRODUCTS } from './centralData';

export const INITIAL_COMPLAINTS = COMPLAINTS.map((item) => ({
  id: item.complaintId, product: item.productName, date: item.date, issue: item.category,
  category: item.category, status: item.status, description: item.description, confidence: item.aiConfidence,
}));

export const DEMO_PRESET_SCENARIOS = {
  eligible: {
    product: PRODUCTS[0].productName, issueDetected: true, issue: 'MRP declaration requires verification.',
    confidence: 88, category: 'MRP Declaration', result: 'ELIGIBLE', imageUrl: '',
  },
  rejected: {
    product: PRODUCTS[1].productName, issueDetected: false, issue: 'No potential declaration issue identified.',
    confidence: 96, category: 'Other', result: 'REJECTED', imageUrl: '',
    reason: 'No sufficient evidence of a potential label compliance issue.',
    message: 'Based on the submitted image, no potential compliance issue was identified. Your complaint cannot be submitted through this workflow.',
  },
};
