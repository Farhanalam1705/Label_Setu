/**
 * Mock findings data for the Officer Review module.
 * Derived from the 3 non-compliant/needs-review compliance checks.
 */
export const REVIEW_FINDINGS = [
  {
    id: 'chk_mrp',
    title: 'MRP Declaration',
    aiStatus: 'NEEDS REVIEW',
    confidence: 94,
    aiFinding:
      'Potential issue detected in the MRP declaration. The mandatory text "inclusive of all taxes" is partially obscured or printed below minimum statutory font ratio.',
    regionId: 'reg_mrp',
    extractedText: 'MRP Rs. 520.00 (Taxes?)',
  },
  {
    id: 'chk_care',
    title: 'Consumer Care Details',
    aiStatus: 'NON-COMPLIANT',
    confidence: 88,
    aiFinding:
      'Consumer care information requires officer verification. Toll-free helpline is masked with placeholder characters (XXX-XXXX), and no valid email address was detected on the label.',
    regionId: 'reg_care',
    extractedText: 'Customer Care: 1800-XXX-XXXX | care@ [unreadable]',
  },
  {
    id: 'chk_font',
    title: 'Font Size / Readability',
    aiStatus: 'NEEDS REVIEW',
    confidence: 76,
    aiFinding:
      'Principal display panel height may require verification. Font height for net weight is near minimum statutory threshold (3mm) for 5kg packages.',
    regionId: 'reg_qty',
    extractedText: 'Net Weight: 5 kg',
  },
];

export const CHECKLIST_ITEMS = [
  { id: 'identity', label: 'Product identity verified' },
  { id: 'declarations', label: 'Extracted declarations reviewed' },
  { id: 'evidence', label: 'Evidence reviewed' },
  { id: 'findings', label: 'Potential findings reviewed' },
  { id: 'observations', label: 'Officer observations added where required' },
];

export const FINAL_ASSESSMENT_OPTIONS = [
  {
    id: 'compliant',
    label: 'Inspection Compliant',
    description: 'No confirmed compliance issue remains after officer review.',
    color: 'emerald',
  },
  {
    id: 'further_review',
    label: 'Inspection Requires Further Review',
    description: 'Additional verification or evidence is required.',
    color: 'amber',
  },
  {
    id: 'non_compliant',
    label: 'Potential Non-Compliance Confirmed',
    description: 'One or more potential violations have been confirmed by the officer.',
    color: 'rose',
  },
];

export const DECISION_OPTIONS = [
  {
    id: 'confirm',
    label: 'Confirm Finding',
    description: 'Affirm the AI-assisted detection as a potential statutory non-compliance.',
  },
  {
    id: 'reject',
    label: 'Reject Finding',
    description: 'Label element complies upon visual manual officer inspection.',
  },
  {
    id: 'further',
    label: 'Needs Further Review',
    description: 'Requires physical lab measurement or clarification from manufacturer.',
  },
];

export const REVIEW_STORAGE_KEY = 'labelsetu_officer_review_LM-2026-00129';
