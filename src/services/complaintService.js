import { COMPLAINTS, NOTIFICATIONS } from '../data/centralData';

const STORAGE_KEY = 'labelsetu_complaints';
const NOTIFICATIONS_STORAGE_KEY = 'labelsetu_complaint_notifications';
const COMPLAINTS_EVENT = 'labelsetu_complaints_updated';
const NOTIFICATIONS_EVENT = 'labelsetu_notifications_updated';

export const INITIAL_COMPLAINTS_DATA = COMPLAINTS;

const emit = (event) => window.dispatchEvent(new Event(event));
const read = (key, fallback) => {
  try {
    const saved = JSON.parse(localStorage.getItem(key));
    if (Array.isArray(saved)) return saved;
    localStorage.setItem(key, JSON.stringify(fallback));
  } catch (_) {}
  return fallback;
};

export const getComplaints = () => read(STORAGE_KEY, INITIAL_COMPLAINTS_DATA);
export const getComplaintById = (complaintId) => getComplaints().find((item) => item.complaintId === complaintId || item.id === complaintId) || null;

const saveComplaints = (items) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    emit(COMPLAINTS_EVENT);
    return items;
  } catch (error) {
    // Camera photos can exceed localStorage's size limit. Keep the complaint and
    // evidence filename so the workflow remains available even without the image payload.
    const compactItems = items.map((item) => ({
      ...item,
      image: '',
      imageUrl: '',
      evidence: (item.evidence || []).map((evidence) => ({ name: evidence.name || 'Evidence image' })),
      additionalEvidence: (item.additionalEvidence || []).map((evidence) => ({ name: evidence.name || 'Evidence image' })),
    }));
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(compactItems));
      emit(COMPLAINTS_EVENT);
      return compactItems;
    } catch (_) {
      console.error('Unable to save complaint data.', error);
      return items;
    }
  }
};

export const createComplaint = (data) => {
  const items = getComplaints();
  const complaintId = data.complaintId || `CMP-2026-${String(items.length + 1).padStart(4, '0')}`;
  const now = new Date().toISOString();
  const item = {
    complaintId, id: complaintId, customerId: data.customerId || 'CUS-001', customerName: data.customerName || 'Aster Foods Pvt. Ltd.',
    customerEmail: data.customerEmail || 'customer@labelsetu.gov.in', productId: data.productId || '', productName: data.productName || data.product || 'Packaged Commodity',
    product: data.productName || data.product || 'Packaged Commodity', inspectionId: data.inspectionId || '', category: data.category || 'Packaging Declaration', complaintType: data.complaintType || data.category || 'Packaging Declaration',
    description: data.description || '', image: data.image || data.imageUrl || '', imageUrl: data.image || data.imageUrl || '',
    aiConfidence: data.aiAnalysis?.confidence || 0, aiAnalysis: data.aiAnalysis || { issueDetected: true, confidence: 0, issue: 'Potential declaration discrepancy detected.' },
    eligibility: data.eligibility || 'ELIGIBLE', status: 'SUBMITTED', officerRemarks: '', officerDecision: '', additionalEvidence: data.additionalEvidence || [], evidence: data.evidence || [],
    submittedAt: now, createdAt: now, updatedAt: now, date: now.slice(0, 10), timeline: [{ status: 'SUBMITTED', title: 'Complaint Submitted', date: now, note: 'Customer submitted a product-label grievance.', by: 'Customer' }, { status: 'AI_ANALYSIS_COMPLETED', title: 'AI Analysis Completed', date: now, note: 'AI analysis completed for officer review.', by: 'System' }, { status: 'ELIGIBILITY_CONFIRMED', title: 'Eligibility Confirmed', date: now, note: 'Complaint is eligible for officer review.', by: 'System' }],
  };
  saveComplaints([item, ...items]);
  try {
    addComplaintNotification({ recipient: 'officer', title: 'New Complaint Received', message: `${complaintId}: ${item.productName}`, complaintId, product: item.productName, type: 'warning' });
  } catch (error) {
    console.warn('Complaint saved without a notification.', error);
  }
  return item;
};

export const updateComplaint = (complaintId, updates) => {
  const updated = getComplaints().map((item) => (item.complaintId === complaintId || item.id === complaintId) ? { ...item, ...updates, updatedAt: new Date().toISOString() } : item);
  saveComplaints(updated);
  return updated.find((item) => item.complaintId === complaintId || item.id === complaintId) || null;
};

export const updateComplaintStatus = (complaintId, status, officerRemarks = '', officerDecision = '') => {
  const now = new Date().toISOString();
  const titles = { UNDER_REVIEW: 'Under Officer Review', ADDITIONAL_EVIDENCE_REQUIRED: 'Additional Evidence Requested', EVIDENCE_SUBMITTED: 'Additional Evidence Submitted', RESOLVED: 'Complaint Resolved', REJECTED: 'Complaint Rejected' };
  const updated = getComplaints().map((item) => (item.complaintId === complaintId || item.id === complaintId) ? {
    ...item, status, officerRemarks, officerDecision, updatedAt: now,
    timeline: [...(item.timeline || []), { status, title: titles[status] || status, date: now, note: officerRemarks || titles[status] || status, by: 'Officer' }],
  } : item);
  saveComplaints(updated);
  const complaint = updated.find((item) => item.complaintId === complaintId || item.id === complaintId);
  if (complaint) addComplaintNotification({ recipient: 'customer', customerId: complaint.customerId, title: titles[status] || status, message: `${complaintId}: ${complaint.productName}`, complaintId, product: complaint.productName, type: status === 'RESOLVED' ? 'success' : 'info' });
  return complaint;
};

export const addAdditionalEvidence = (complaintId, evidenceData) => updateComplaint(complaintId, { additionalEvidence: [...(getComplaintById(complaintId)?.additionalEvidence || []), evidenceData] });
export const deleteComplaints = (ids) => saveComplaints(getComplaints().filter((item) => !ids.includes(item.complaintId || item.id)));
export const subscribeComplaints = (callback) => { const handler = () => callback(getComplaints()); window.addEventListener(COMPLAINTS_EVENT, handler); window.addEventListener('storage', handler); return () => { window.removeEventListener(COMPLAINTS_EVENT, handler); window.removeEventListener('storage', handler); }; };

export const getComplaintNotifications = (recipient = 'customer') => read(NOTIFICATIONS_STORAGE_KEY, NOTIFICATIONS).filter((item) => item.recipient === recipient);
export const addComplaintNotification = (notification) => { const items = read(NOTIFICATIONS_STORAGE_KEY, NOTIFICATIONS); const next = [{ id: `NOT-${Date.now()}`, unread: true, ...notification }, ...items]; localStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(next)); emit(NOTIFICATIONS_EVENT); return next[0]; };
export const clearComplaintNotifications = (recipient = 'customer') => {
  const retained = read(NOTIFICATIONS_STORAGE_KEY, NOTIFICATIONS).filter((item) => item.recipient !== recipient);
  localStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(retained));
  emit(NOTIFICATIONS_EVENT);
};
