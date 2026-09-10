/**
 * Shared Complaint Service for LABEL SETU
 * Provides synchronized frontend mock persistence across Customer & Officer portals
 * Persists in localStorage under 'labelsetu_complaints' and broadcasts updates across tabs/windows.
 */

const STORAGE_KEY = 'labelsetu_complaints';
const NOTIFICATIONS_STORAGE_KEY = 'labelsetu_complaint_notifications';
const COMPLAINTS_EVENT = 'labelsetu_complaints_updated';
const NOTIFICATIONS_EVENT = 'labelsetu_notifications_updated';

export const INITIAL_COMPLAINTS_DATA = [
  {
    complaintId: 'CMP-2026-0001',
    id: 'CMP-2026-0001',
    customerId: 'CUS-001',
    customerName: 'Customer',
    customerEmail: 'customer@labelsetu.gov.in',
    productId: 'PRD-001',
    productName: 'ABC Premium Rice',
    product: 'ABC Premium Rice',
    inspectionId: 'LM-2026-00129',
    category: 'Consumer Care Issue',
    description: 'Consumer care contact telephone number appears truncated or masked on the rear packaging panel.',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=600',
    imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=600',
    aiAnalysis: {
      issueDetected: true,
      confidence: 88,
      issue: 'Consumer care contact information appears incomplete.',
    },
    eligibility: 'ELIGIBLE',
    status: 'SUBMITTED', // SUBMITTED | UNDER_REVIEW | ADDITIONAL_EVIDENCE_REQUIRED | RESOLVED | REJECTED
    officerRemarks: '',
    officerDecision: '',
    additionalEvidence: [],
    submittedAt: '2026-09-09T09:30:00.000Z',
    updatedAt: '2026-09-09T09:30:00.000Z',
    date: '09 Sep 2026',
    timeline: [
      {
        status: 'SUBMITTED',
        title: 'Complaint Submitted',
        date: '09 Sep 2026, 09:30 AM',
        note: 'Customer submitted grievance with AI preliminary verification.',
        by: 'Customer',
      },
    ],
  },
  {
    complaintId: 'CMP-2026-0002',
    id: 'CMP-2026-0002',
    customerId: 'CUS-002',
    customerName: 'Rahul Verma',
    customerEmail: 'customer2@labelsetu.gov.in',
    productId: 'PRD-002',
    productName: 'XYZ Premium Atta',
    product: 'XYZ Premium Atta',
    inspectionId: 'LM-2026-00094',
    category: 'Missing Information',
    description: 'MRP declaration and inclusive of all taxes wording is smudged and requires regulatory verification.',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=600',
    imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=600',
    aiAnalysis: {
      issueDetected: true,
      confidence: 91,
      issue: 'MRP declaration requires verification.',
    },
    eligibility: 'ELIGIBLE',
    status: 'UNDER_REVIEW',
    officerRemarks: 'Enforcement review initiated by Legal Metrology team.',
    officerDecision: '',
    additionalEvidence: [],
    submittedAt: '2026-09-08T14:15:00.000Z',
    updatedAt: '2026-09-09T10:00:00.000Z',
    date: '08 Sep 2026',
    timeline: [
      {
        status: 'SUBMITTED',
        title: 'Complaint Submitted',
        date: '08 Sep 2026, 02:15 PM',
        note: 'Customer submitted grievance.',
        by: 'Customer',
      },
      {
        status: 'UNDER_REVIEW',
        title: 'Under Officer Review',
        date: '09 Sep 2026, 10:00 AM',
        note: 'Enforcement official started label compliance review.',
        by: 'Officer',
      },
    ],
  },
  {
    complaintId: 'CMP-2026-0003',
    id: 'CMP-2026-0003',
    customerId: 'CUS-003',
    customerName: 'Anita Sharma',
    customerEmail: 'customer3@labelsetu.gov.in',
    productId: 'PRD-003',
    productName: 'Fresh Sugar',
    product: 'Fresh Sugar',
    inspectionId: 'LM-2026-00052',
    category: 'Incorrect Quantity',
    description: 'Reported net weight symbol formatting issue without sufficient high-resolution packaging proof.',
    image: 'https://images.unsplash.com/photo-1581441363689-1f3c3c414635?auto=format&fit=crop&q=80&w=600',
    imageUrl: 'https://images.unsplash.com/photo-1581441363689-1f3c3c414635?auto=format&fit=crop&q=80&w=600',
    aiAnalysis: {
      issueDetected: false,
      confidence: 72,
      issue: 'No sufficient evidence.',
    },
    eligibility: 'REJECTED',
    status: 'REJECTED',
    officerRemarks: 'Insufficient evidence provided to establish statutory PCR 2011 declaration breach.',
    officerDecision: 'Complaint rejected due to lack of verifiable evidence.',
    additionalEvidence: [],
    submittedAt: '2026-09-07T11:20:00.000Z',
    updatedAt: '2026-09-08T09:45:00.000Z',
    date: '07 Sep 2026',
    timeline: [
      {
        status: 'SUBMITTED',
        title: 'Complaint Submitted',
        date: '07 Sep 2026, 11:20 AM',
        note: 'Customer submitted grievance.',
        by: 'Customer',
      },
      {
        status: 'UNDER_REVIEW',
        title: 'Under Officer Review',
        date: '07 Sep 2026, 04:00 PM',
        note: 'Enforcement official started review.',
        by: 'Officer',
      },
      {
        status: 'REJECTED',
        title: 'Complaint Rejected',
        date: '08 Sep 2026, 09:45 AM',
        note: 'Insufficient evidence to validate the reported issue.',
        by: 'Officer',
      },
    ],
  },
];

/**
 * Broadcast update event locally and to storage
 */
const notifyComplaintsChanged = () => {
  try {
    window.dispatchEvent(new Event(COMPLAINTS_EVENT));
  } catch (e) {
    // ignore
  }
};

const notifyNotificationsChanged = () => {
  try {
    window.dispatchEvent(new Event(NOTIFICATIONS_EVENT));
  } catch (e) {
    // ignore
  }
};

/**
 * Get all complaints from shared persistence
 */
export const getComplaints = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_COMPLAINTS_DATA));
      return INITIAL_COMPLAINTS_DATA;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    // Fallback if empty array
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_COMPLAINTS_DATA));
    return INITIAL_COMPLAINTS_DATA;
  } catch (err) {
    console.error('Failed to load complaints from localStorage:', err);
    return INITIAL_COMPLAINTS_DATA;
  }
};

/**
 * Get single complaint by ID
 */
export const getComplaintById = (complaintId) => {
  if (!complaintId) return null;
  const list = getComplaints();
  const normalized = complaintId.trim().toUpperCase();
  return (
    list.find(
      (c) =>
        (c.complaintId && c.complaintId.toUpperCase() === normalized) ||
        (c.id && c.id.toUpperCase() === normalized)
    ) || null
  );
};

/**
 * Create a new complaint from customer submission
 */
export const createComplaint = (data) => {
  const list = getComplaints();
  
  // Generate ID: CMP-2026-000X
  const nextNum = list.length + 1;
  const padNum = String(nextNum).padStart(4, '0');
  const complaintId = data.complaintId || `CMP-2026-${padNum}`;

  const now = new Date();
  const formattedDate = now.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
  const formattedTime = now.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  const newComplaint = {
    complaintId,
    id: complaintId,
    customerId: data.customerId || 'CUS-001',
    customerName: data.customerName || 'Customer',
    customerEmail: data.customerEmail || 'customer@labelsetu.gov.in',
    productId: data.productId || `PRD-${padNum}`,
    productName: data.productName || data.product || 'Packaged Commodity',
    product: data.productName || data.product || 'Packaged Commodity',
    inspectionId: data.inspectionId || `LM-2026-00${130 + nextNum}`,
    category: data.category || 'Consumer Care Issue',
    description: data.description || '',
    image: data.image || data.imageUrl || 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=600',
    imageUrl: data.image || data.imageUrl || 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=600',
    aiAnalysis: {
      issueDetected: data.aiAnalysis?.issueDetected ?? true,
      confidence: data.aiAnalysis?.confidence ?? 88,
      issue: data.aiAnalysis?.issue || 'Potential declaration discrepancy detected.',
    },
    eligibility: data.eligibility || 'ELIGIBLE',
    status: 'SUBMITTED',
    officerRemarks: '',
    officerDecision: '',
    additionalEvidence: data.additionalEvidence || [],
    submittedAt: now.toISOString(),
    updatedAt: now.toISOString(),
    date: formattedDate,
    timeline: [
      {
        status: 'SUBMITTED',
        title: 'Complaint Submitted',
        date: `${formattedDate}, ${formattedTime}`,
        note: 'Grievance submitted by Customer for enforcement review.',
        by: 'Customer',
      },
    ],
  };

  const updatedList = [newComplaint, ...list];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
  } catch (e) {
    console.error('Failed to save complaint:', e);
  }

  // Create notification for Officer
  addComplaintNotification({
    recipient: 'officer',
    title: 'New Complaint Received',
    message: `Customer lodged complaint ${complaintId} for product ${newComplaint.productName}.`,
    complaintId,
    type: 'warning',
    product: newComplaint.productName,
  });

  notifyComplaintsChanged();
  return newComplaint;
};

/**
 * Update complaint fields
 */
export const updateComplaint = (complaintId, updates) => {
  const list = getComplaints();
  const index = list.findIndex(
    (c) =>
      (c.complaintId && c.complaintId === complaintId) ||
      (c.id && c.id === complaintId)
  );

  if (index === -1) return null;

  const now = new Date();
  const current = list[index];
  const updatedItem = {
    ...current,
    ...updates,
    updatedAt: now.toISOString(),
  };

  list[index] = updatedItem;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch (e) {
    console.error('Failed to update complaint:', e);
  }

  notifyComplaintsChanged();
  return updatedItem;
};

/**
 * Update complaint status with officer workflow
 * @param {string} complaintId
 * @param {'SUBMITTED'|'UNDER_REVIEW'|'ADDITIONAL_EVIDENCE_REQUIRED'|'RESOLVED'|'REJECTED'} newStatus
 * @param {string} officerRemarks
 * @param {string} officerDecision
 */
export const updateComplaintStatus = (
  complaintId,
  newStatus,
  officerRemarks = '',
  officerDecision = ''
) => {
  const complaint = getComplaintById(complaintId);
  if (!complaint) return null;

  const now = new Date();
  const formattedDate = now.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
  const formattedTime = now.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  const timelineNote = officerRemarks || (
    newStatus === 'UNDER_REVIEW'
      ? 'Enforcement official initiated preliminary label verification.'
      : newStatus === 'RESOLVED' || newStatus === 'VALIDATED'
      ? 'Complaint verified and validated for enforcement action.'
      : newStatus === 'REJECTED'
      ? 'Complaint rejected following verification.'
      : newStatus === 'ADDITIONAL_EVIDENCE_REQUIRED'
      ? `Additional evidence requested: ${officerRemarks}`
      : 'Status updated by Officer.'
  );

  const timelineTitle = 
    newStatus === 'UNDER_REVIEW' ? 'Under Officer Review' :
    newStatus === 'RESOLVED' || newStatus === 'VALIDATED' ? 'Complaint Validated & Resolved' :
    newStatus === 'REJECTED' ? 'Complaint Rejected' :
    newStatus === 'ADDITIONAL_EVIDENCE_REQUIRED' ? 'Additional Evidence Required' :
    'Status Updated';

  const newTimelineEntry = {
    status: newStatus,
    title: timelineTitle,
    date: `${formattedDate}, ${formattedTime}`,
    note: timelineNote,
    by: 'Officer',
  };

  const currentTimeline = Array.isArray(complaint.timeline) ? complaint.timeline : [];

  const updates = {
    status: newStatus,
    officerRemarks: officerRemarks !== undefined ? officerRemarks : complaint.officerRemarks,
    officerDecision: officerDecision !== undefined ? officerDecision : complaint.officerDecision,
    timeline: [...currentTimeline, newTimelineEntry],
  };

  const updated = updateComplaint(complaintId, updates);

  // Dispatch appropriate customer notification
  if (newStatus === 'UNDER_REVIEW') {
    addComplaintNotification({
      recipient: 'customer',
      title: 'Complaint Under Review',
      message: `Your complaint ${complaintId} (${complaint.productName}) is now being reviewed by an enforcement official.`,
      complaintId,
      type: 'info',
      product: complaint.productName,
    });
  } else if (newStatus === 'ADDITIONAL_EVIDENCE_REQUIRED') {
    addComplaintNotification({
      recipient: 'customer',
      title: 'Additional Evidence Required',
      message: `Officer requested additional evidence for ${complaintId}: "${officerRemarks}".`,
      complaintId,
      type: 'warning',
      product: complaint.productName,
    });
  } else if (newStatus === 'RESOLVED' || newStatus === 'VALIDATED') {
    addComplaintNotification({
      recipient: 'customer',
      title: 'Complaint Resolved',
      message: `Your complaint ${complaintId} has been validated and resolved by the enforcement team.`,
      complaintId,
      type: 'success',
      product: complaint.productName,
    });
  } else if (newStatus === 'REJECTED') {
    addComplaintNotification({
      recipient: 'customer',
      title: 'Complaint Rejected',
      message: `Your complaint ${complaintId} has been rejected. Remarks: ${officerRemarks || 'Insufficient evidence.'}`,
      complaintId,
      type: 'error',
      product: complaint.productName,
    });
  }

  return updated;
};

/**
 * Add additional evidence uploaded by Customer
 */
export const addAdditionalEvidence = (complaintId, evidenceData) => {
  const complaint = getComplaintById(complaintId);
  if (!complaint) return null;

  const now = new Date();
  const formattedDate = now.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
  const formattedTime = now.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  const evidenceItem = {
    id: `EVD-${Date.now()}`,
    url: evidenceData.url || evidenceData.image,
    name: evidenceData.name || 'Additional Evidence Document',
    notes: evidenceData.notes || 'Submitted by customer in response to officer request.',
    uploadedAt: now.toISOString(),
    date: `${formattedDate}, ${formattedTime}`,
  };

  const currentEvidence = Array.isArray(complaint.additionalEvidence)
    ? complaint.additionalEvidence
    : [];

  const currentTimeline = Array.isArray(complaint.timeline) ? complaint.timeline : [];

  const newTimelineEntry = {
    status: 'UNDER_REVIEW',
    title: 'Additional Evidence Submitted',
    date: `${formattedDate}, ${formattedTime}`,
    note: `Customer uploaded supplementary evidence (${evidenceItem.name}).`,
    by: 'Customer',
  };

  const updates = {
    status: 'UNDER_REVIEW',
    additionalEvidence: [...currentEvidence, evidenceItem],
    timeline: [...currentTimeline, newTimelineEntry],
  };

  const updated = updateComplaint(complaintId, updates);

  // Notify Officer
  addComplaintNotification({
    recipient: 'officer',
    title: 'New Evidence Submitted',
    message: `Customer provided supplementary evidence for complaint ${complaintId} (${complaint.productName}).`,
    complaintId,
    type: 'info',
    product: complaint.productName,
  });

  return updated;
};

/**
 * Delete complaints by ID array
 */
export const deleteComplaints = (ids) => {
  if (!Array.isArray(ids) || ids.length === 0) return [];
  const idSet = new Set(ids);
  const list = getComplaints();
  const filtered = list.filter(
    (c) => !idSet.has(c.complaintId) && !idSet.has(c.id)
  );

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  } catch (e) {
    console.error('Failed to delete complaints:', e);
  }

  notifyComplaintsChanged();
  return filtered;
};

/**
 * Subscribe to complaints state changes (same-tab and multi-tab)
 */
export const subscribeComplaints = (callback) => {
  const handler = () => {
    callback(getComplaints());
  };

  window.addEventListener(COMPLAINTS_EVENT, handler);
  window.addEventListener('storage', (e) => {
    if (e.key === STORAGE_KEY || e.key === null) {
      handler();
    }
  });

  return () => {
    window.removeEventListener(COMPLAINTS_EVENT, handler);
    window.removeEventListener('storage', handler);
  };
};

/**
 * Notification management
 */
export const getComplaintNotifications = (recipient = 'customer') => {
  try {
    const raw = localStorage.getItem(NOTIFICATIONS_STORAGE_KEY);
    if (!raw) return [];
    const list = JSON.parse(raw);
    if (Array.isArray(list)) {
      return list.filter((n) => !recipient || n.recipient === recipient);
    }
    return [];
  } catch {
    return [];
  }
};

export const addComplaintNotification = (notif) => {
  try {
    const raw = localStorage.getItem(NOTIFICATIONS_STORAGE_KEY);
    const list = raw ? JSON.parse(raw) : [];
    const newNotif = {
      id: `NOTIF-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      recipient: notif.recipient || 'customer',
      title: notif.title || 'Notification',
      message: notif.message || '',
      complaintId: notif.complaintId || null,
      product: notif.product || '',
      type: notif.type || 'info', // info, warning, success, error
      unread: true,
      time: 'Just now',
      createdAt: new Date().toISOString(),
    };
    const updated = [newNotif, ...list].slice(0, 50);
    localStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(updated));
    notifyNotificationsChanged();
    return newNotif;
  } catch (e) {
    console.error('Failed to store notification:', e);
    return null;
  }
};
