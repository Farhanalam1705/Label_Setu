// Deterministic fictional demonstration records shared across LABEL SETU.
// These records represent product-label examples only; they are not government records.

export const CUSTOMERS = [
  ['CUS-001', 'Aster Foods Pvt. Ltd.', 'customer@labelsetu.gov.in'], ['CUS-002', 'Daily Choice Foods', 'customer2@example.com'],
  ['CUS-003', 'Saffron Valley Foods', 'customer3@example.com'], ['CUS-004', 'Greenfield Staples', 'customer4@example.com'],
  ['CUS-005', 'Harbor Consumer Products', 'customer5@example.com'], ['CUS-006', 'Meadow Beverages', 'customer6@example.com'],
  ['CUS-007', 'Northstar Homecare', 'customer7@example.com'], ['CUS-008', 'Pure Harvest Traders', 'customer8@example.com'],
  ['CUS-009', 'Cedar Pantry Foods', 'customer9@example.com'], ['CUS-010', 'Bright Basket Foods', 'customer10@example.com'],
].map(([customerId, name, email]) => ({ customerId, name, email, role: 'customer', status: 'ACTIVE' }));

export const OFFICERS = Array.from({ length: 10 }, (_, index) => ({
  officerId: `OFF-${String(index + 1).padStart(3, '0')}`,
  name: `Officer ${String.fromCharCode(65 + index)}.`,
  department: 'Legal Metrology Department',
  office: ['North District', 'Central District', 'East District', 'West District', 'South District'][index % 5],
  status: 'ACTIVE',
}));

const productRows = [
  ['Premium Basmati Rice', 'Food Grains', 'Aster Foods Pvt. Ltd.', 'BR260810', '5 kg', 450, '2026-08-10', '2027-08-10', 'Compliant', 96],
  ['Daily Choice Wheat Flour', 'Flour & Staples', 'Daily Choice Foods', 'AT260812', '10 kg', 410, '2026-08-12', '2027-02-12', 'Needs Review', 82],
  ['Crystal White Sugar', 'Sweeteners', 'Saffron Valley Foods', 'SG260814', '1 kg', 58, '2026-08-14', '2028-08-14', 'Non-Compliant', 61],
  ['Refined Sunflower Oil', 'Edible Oils', 'Greenfield Staples', 'SO260816', '1 L', 178, '2026-08-16', '2027-02-16', 'Compliant', 94],
  ['Iodized Crystal Salt', 'Staples', 'Harbor Consumer Products', 'SL260818', '1 kg', 28, '2026-08-18', '2028-08-18', 'Compliant', 98],
  ['Garden Leaf Tea', 'Beverages', 'Meadow Beverages', 'TE260820', '250 g', 165, '2026-08-20', '2028-08-20', 'Needs Review', 84],
  ['Select Masoor Dal', 'Pulses', 'Pure Harvest Traders', 'PL260822', '1 kg', 142, '2026-08-22', '2027-08-22', 'Compliant', 95],
  ['Crisp Morning Biscuits', 'Bakery & Confectionery', 'Cedar Pantry Foods', 'BS260824', '200 g', 45, '2026-08-24', '2027-02-24', 'Non-Compliant', 58],
  ['Golden Turmeric Powder', 'Packaged Spices', 'Bright Basket Foods', 'SP260826', '200 g', 72, '2026-08-26', '2028-08-26', 'Compliant', 97],
  ['Nutri Milk Powder', 'Dairy Products', 'Aster Foods Pvt. Ltd.', 'MP260828', '500 g', 320, '2026-08-28', '2027-08-28', 'Needs Review', 79],
  ['Mango Fruit Drink', 'Packaged Juice', 'Meadow Beverages', 'JU260830', '1 L', 110, '2026-08-30', '2027-02-28', 'Compliant', 93],
  ['Quick Masala Noodles', 'Instant Foods', 'Daily Choice Foods', 'ND260901', '280 g', 68, '2026-09-01', '2027-03-01', 'Non-Compliant', 64],
  ['Fresh Wash Detergent Powder', 'Home Care', 'Northstar Homecare', 'DT260902', '1 kg', 135, '2026-09-02', '2028-09-02', 'Compliant', 96],
  ['Soft Care Bath Soap', 'Personal Care', 'Harbor Consumer Products', 'SP260903', '125 g', 42, '2026-09-03', '2028-09-03', 'Needs Review', 86],
  ['Royal Mixed Dry Fruits', 'Dry Fruits', 'Pure Harvest Traders', 'DF260904', '250 g', 390, '2026-09-04', '2027-09-04', 'Compliant', 95],
];

export const PRODUCTS = productRows.map(([productName, category, manufacturer, batchNumber, packSize, mrp, manufacturingDate, expiryDate, status, complianceScore], index) => ({
  productId: `PRD-${String(index + 1).padStart(3, '0')}`,
  productName, category, manufacturer, batchNumber, packSize, mrp, manufacturingDate, expiryDate, status, complianceScore,
  customerId: CUSTOMERS[index % CUSTOMERS.length].customerId,
}));

const inspectionStatuses = ['Compliant', 'Needs Review', 'Non-Compliant', 'Compliant', 'Compliant', 'Needs Review', 'Compliant', 'Non-Compliant', 'Compliant', 'Needs Review', 'Compliant', 'Non-Compliant', 'Compliant', 'Needs Review', 'Compliant'];
export const INSPECTIONS = PRODUCTS.map((product, index) => {
  const inspectionDate = index < 5
    ? `2026-09-${String(5 - index).padStart(2, '0')}`
    : `2026-08-${String(31 - (index - 5)).padStart(2, '0')}`;
  const officer = OFFICERS[index % OFFICERS.length];
  const status = inspectionStatuses[index];
  return {
    inspectionId: `INS-2026-${String(index + 1).padStart(4, '0')}`,
    productId: product.productId, productName: product.productName, inspectionDate,
    officerId: officer.officerId, officerName: officer.name, status,
    complianceScore: product.complianceScore, issueCount: status === 'Compliant' ? 0 : status === 'Needs Review' ? 1 : 2,
    category: product.category, manufacturer: product.manufacturer, batchNumber: product.batchNumber,
    customerId: product.customerId,
  };
});

export const REPORTS = INSPECTIONS.map((inspection, index) => ({
  reportId: `REP-2026-${String(index + 1).padStart(4, '0')}`,
  inspectionId: inspection.inspectionId, productId: inspection.productId, productName: inspection.productName,
  status: 'Available', date: inspection.inspectionDate, customerId: inspection.customerId,
  name: `LABEL_SETU_Inspection_${inspection.inspectionId}.pdf`, size: `${(1.1 + (index % 5) * 0.1).toFixed(1)} MB`,
}));

const complaintRows = [
  [0, 'SUBMITTED', 'MRP declaration requires verification', 88], [1, 'UNDER_REVIEW', 'Consumer care information appears incomplete', 91],
  [2, 'REJECTED', 'Net quantity declaration requires verification', 72], [5, 'ADDITIONAL_EVIDENCE_REQUIRED', 'Date marking requires verification', 86],
  [7, 'EVIDENCE_SUBMITTED', 'Packaging declaration requires verification', 89], [9, 'RESOLVED', 'Consumer care information appears incomplete', 93],
  [11, 'UNDER_REVIEW', 'MRP declaration requires verification', 84], [13, 'SUBMITTED', 'Date marking requires verification', 87],
  [3, 'RESOLVED', 'Net quantity declaration requires verification', 90], [8, 'ADDITIONAL_EVIDENCE_REQUIRED', 'Packaging declaration requires verification', 85],
];
const statusTitle = (status) => ({ SUBMITTED: 'Complaint Submitted', UNDER_REVIEW: 'Under Officer Review', ADDITIONAL_EVIDENCE_REQUIRED: 'Additional Evidence Requested', EVIDENCE_SUBMITTED: 'Additional Evidence Submitted', RESOLVED: 'Complaint Resolved', REJECTED: 'Complaint Rejected' }[status]);
export const COMPLAINTS = complaintRows.map(([productIndex, status, issue, aiConfidence], index) => {
  const product = PRODUCTS[productIndex]; const customer = CUSTOMERS[productIndex % CUSTOMERS.length]; const inspection = INSPECTIONS[productIndex];
  const complaintId = `CMP-2026-${String(index + 1).padStart(4, '0')}`; const submittedAt = `2026-09-${String(10 - index % 6).padStart(2, '0')}T10:00:00.000Z`;
  return {
    complaintId, id: complaintId, customerId: customer.customerId, customerName: customer.name, customerEmail: customer.email,
    productId: product.productId, productName: product.productName, product: product.productName, inspectionId: inspection.inspectionId,
    category: issue, description: `${issue} on the package of ${product.productName}.`, aiConfidence, aiAnalysis: { issueDetected: status !== 'REJECTED', confidence: aiConfidence, issue },
    eligibility: status === 'REJECTED' ? 'REJECTED' : 'ELIGIBLE', status, officerRemarks: status === 'RESOLVED' ? 'Verification completed and the complaint has been resolved.' : '', officerDecision: '', additionalEvidence: [], reportAvailable: false, reportGenerated: false, generatedReportId: null, generatedAt: null, generatedBy: null, submittedAt, updatedAt: submittedAt, date: submittedAt.slice(0, 10),
    timeline: [{ status: 'SUBMITTED', title: 'Complaint Submitted', date: submittedAt, note: 'Customer submitted a product-label grievance.', by: 'Customer' }, ...(status === 'SUBMITTED' ? [] : [{ status, title: statusTitle(status), date: submittedAt, note: `${statusTitle(status)} for demonstration workflow.`, by: status === 'EVIDENCE_SUBMITTED' ? 'Customer' : 'Officer' }])],
  };
});

export const NOTIFICATIONS = COMPLAINTS.map((complaint, index) => ({
  id: `NOT-2026-${String(index + 1).padStart(4, '0')}`, recipient: 'customer', customerId: complaint.customerId,
  type: complaint.status === 'RESOLVED' ? 'success' : complaint.status === 'REJECTED' ? 'error' : complaint.status === 'ADDITIONAL_EVIDENCE_REQUIRED' ? 'warning' : 'info',
  title: statusTitle(complaint.status), message: `${complaint.complaintId}: ${complaint.productName}`, product: complaint.productName,
  complaintId: complaint.complaintId, inspectionId: complaint.inspectionId, unread: index < 3, time: complaint.date, desc: `${statusTitle(complaint.status)} for ${complaint.productName}.`,
}));
