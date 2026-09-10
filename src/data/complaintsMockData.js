// Mock Data for Customer Complaints & Grievance Workflow

export const INITIAL_COMPLAINTS = [
  {
    id: 'CMP-2026-0001',
    product: 'ABC Premium Rice',
    date: 'Today',
    issue: 'Consumer Care Issue',
    category: 'Consumer Care Issue',
    status: 'Submitted',
    description: 'Consumer care contact telephone number appears truncated or masked on the rear packaging panel.',
    imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=400',
    confidence: 88,
  },
  {
    id: 'CMP-2026-0002',
    product: 'ABC Cooking Oil',
    date: '03 Sep 2026',
    issue: 'Missing Information',
    category: 'Missing Information',
    status: 'Under Review',
    description: 'Registered manufacturer postal address details missing state pin code declaration.',
    imageUrl: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=400',
    confidence: 91,
  },
  {
    id: 'CMP-2026-0003',
    product: 'Fresh Sugar',
    date: '01 Sep 2026',
    issue: 'Incorrect Quantity',
    category: 'Incorrect Quantity',
    status: 'Resolved',
    description: 'Net weight symbol font spacing does not match mandatory PCR 2011 formatting standards.',
    imageUrl: 'https://images.unsplash.com/photo-1581441363689-1f3c3c414635?auto=format&fit=crop&q=80&w=400',
    confidence: 85,
  },
];

export const DEMO_PRESET_SCENARIOS = {
  eligible: {
    product: 'ABC Premium Rice',
    issueDetected: true,
    issue: 'Consumer care contact number appears truncated or masked.',
    confidence: 88,
    category: 'Consumer Care Issue',
    result: 'ELIGIBLE',
    imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=600',
  },
  rejected: {
    product: 'XYZ Premium Atta',
    issueDetected: false,
    issue: 'None detected.',
    confidence: 96,
    category: 'Other',
    result: 'REJECTED',
    reason: 'No sufficient evidence of a potential label compliance issue.',
    message: 'Based on the submitted image, no potential compliance issue was identified. Your complaint cannot be submitted through this workflow.',
    imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=600',
  },
};
