// Customer portal adapters derived from the shared fictional demonstration dataset.
import { CUSTOMERS, INSPECTIONS, NOTIFICATIONS, PRODUCTS, REPORTS } from './centralData';

const activeCustomer = CUSTOMERS[0];
const customerProducts = PRODUCTS.filter((item) => item.customerId === activeCustomer.customerId);
const customerInspections = INSPECTIONS.filter((item) => item.customerId === activeCustomer.customerId);
const needsAttention = customerProducts.filter((item) => item.status !== 'Compliant');

export const CUSTOMER_PROFILE = {
  id: activeCustomer.customerId, name: activeCustomer.name, company: activeCustomer.name, email: activeCustomer.email,
  role: 'Customer', designation: 'Authorized Business Representative', department: 'Customer Compliance Portal',
  registrationNo: 'REG-LM-DEMO-001', zone: 'Corporate Unit', avatarUrl: null,
};

export const CUSTOMER_SUMMARY_STATS = {
  myProducts: customerProducts.length, inspections: customerInspections.length,
  compliantProducts: customerProducts.filter((item) => item.status === 'Compliant').length,
  needsAttention: needsAttention.length,
  overallCompliance: Math.round(customerProducts.reduce((sum, item) => sum + item.complianceScore, 0) / customerProducts.length),
  breakdown: {
    compliant: customerProducts.filter((item) => item.status === 'Compliant').length,
    needsReview: customerProducts.filter((item) => item.status === 'Needs Review').length,
    nonCompliant: customerProducts.filter((item) => item.status === 'Non-Compliant').length,
  },
};

export const CUSTOMER_RECENT_INSPECTIONS = customerInspections.map((item) => ({
  id: item.inspectionId, product: item.productName, date: item.inspectionDate, status: item.status,
  score: item.complianceScore, category: item.category, batchNo: item.batchNumber,
}));

export const CUSTOMER_ATTENTION_PRODUCTS = customerProducts.map((item) => {
  const inspection = INSPECTIONS.find((record) => record.productId === item.productId);
  return {
    id: item.productId, name: item.productName, status: item.status, inspectionId: inspection?.inspectionId,
    score: item.complianceScore, issue: item.status === 'Compliant' ? 'All statutory declarations conform with Legal Metrology rules.' : 'Product-label declaration requires verification.',
    updatedAt: inspection?.inspectionDate,
  };
});

export const CUSTOMER_RECENT_REPORTS = REPORTS.filter((item) => item.customerId === activeCustomer.customerId).map((item) => ({
  id: item.reportId, name: item.name, inspectionId: item.inspectionId, product: item.productName, date: item.date, status: item.status, size: item.size,
}));

export const CUSTOMER_RECENT_NOTIFICATIONS = NOTIFICATIONS.filter((item) => item.customerId === activeCustomer.customerId);
