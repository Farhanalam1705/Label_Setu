// Mock Data for LABEL SETU Customer Portal (Business / Product Owner)

export const CUSTOMER_PROFILE = {
  id: 'CUST-2026-001',
  name: 'Customer',
  company: 'ABC Consumer Packaged Goods Ltd.',
  email: 'customer@labelsetu.gov.in',
  role: 'Customer',
  designation: 'Authorized Business Representative',
  department: 'Customer Compliance Portal',
  registrationNo: 'REG-LM-2026-9812',
  zone: 'Corporate Unit',
  avatarUrl: null,
};

export const CUSTOMER_SUMMARY_STATS = {
  myProducts: 12,
  inspections: 8,
  compliantProducts: 7,
  needsAttention: 3,
  overallCompliance: 78,
  breakdown: {
    compliant: 7,
    needsReview: 3,
    nonCompliant: 2,
  },
};

export const CUSTOMER_RECENT_INSPECTIONS = [
  {
    id: 'LM-2026-00129',
    product: 'ABC Premium Rice',
    date: '05 Sep 2026',
    status: 'Needs Review',
    score: 82,
    category: 'Food & Grains',
    batchNo: 'B-7741',
  },
  {
    id: 'LM-2026-00128',
    product: 'XYZ Premium Atta',
    date: '04 Sep 2026',
    status: 'Compliant',
    score: 96,
    category: 'Flour & Staples',
    batchNo: 'A-2091',
  },
  {
    id: 'LM-2026-00127',
    product: 'ABC Cooking Oil',
    date: '03 Sep 2026',
    status: 'Non-Compliant',
    score: 61,
    category: 'Edible Oils',
    batchNo: 'O-5412',
  },
  {
    id: 'LM-2026-00126',
    product: 'Fresh Sugar',
    date: '02 Sep 2026',
    status: 'Needs Review',
    score: 89,
    category: 'Sweeteners',
    batchNo: 'S-1044',
  },
];

export const CUSTOMER_ATTENTION_PRODUCTS = [
  {
    id: 'prod-001',
    name: 'ABC Premium Rice',
    status: 'Needs Review',
    inspectionId: 'LM-2026-00129',
    score: 82,
    issue: 'MRP declaration typography format requires verification under Rule 6.',
    updatedAt: '05 Sep 2026',
  },
  {
    id: 'prod-002',
    name: 'XYZ Cooking Oil',
    status: 'Non-Compliant',
    inspectionId: 'LM-2026-00127',
    score: 61,
    issue: 'Consumer care contact telephone missing on primary display panel.',
    updatedAt: '03 Sep 2026',
  },
  {
    id: 'prod-003',
    name: 'Fresh Sugar',
    status: 'Needs Review',
    inspectionId: 'LM-2026-00126',
    score: 89,
    issue: 'Net quantity unit symbol spacing clarification requested by inspector.',
    updatedAt: '02 Sep 2026',
  },
];

export const CUSTOMER_RECENT_REPORTS = [
  {
    id: 'rep-001',
    name: 'LABEL_SETU_Inspection_LM-2026-00129.pdf',
    inspectionId: 'LM-2026-00129',
    product: 'ABC Premium Rice',
    date: '05 Sep 2026',
    status: 'Available',
    size: '1.4 MB',
  },
  {
    id: 'rep-002',
    name: 'LABEL_SETU_Inspection_LM-2026-00128.pdf',
    inspectionId: 'LM-2026-00128',
    product: 'XYZ Premium Atta',
    date: '04 Sep 2026',
    status: 'Available',
    size: '1.2 MB',
  },
];

export const CUSTOMER_RECENT_NOTIFICATIONS = [
  {
    id: 'notif-1',
    type: 'warning',
    title: 'Inspection requires attention',
    product: 'ABC Premium Rice',
    time: 'Today',
    desc: 'Compliance verification flagged mandatory declaration clarification.',
    inspectionId: 'LM-2026-00129',
    unread: true,
  },
  {
    id: 'notif-2',
    type: 'success',
    title: 'Inspection report available',
    product: 'XYZ Premium Atta',
    time: 'Yesterday',
    desc: 'Formal legal metrology verification report has been published.',
    inspectionId: 'LM-2026-00128',
    unread: false,
  },
  {
    id: 'notif-3',
    type: 'info',
    title: 'New inspection completed',
    product: 'ABC Cooking Oil',
    time: '2 days ago',
    desc: 'Official inspection record LM-2026-00127 completed with findings.',
    inspectionId: 'LM-2026-00127',
    unread: false,
  },
];
