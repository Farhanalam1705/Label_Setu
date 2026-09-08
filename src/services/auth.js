// Authentication Service using localStorage

const AUTH_KEY = 'label_setu_auth_user';
const REMEMBER_KEY = 'label_setu_remember_email';

const VALID_OFFICER_CREDENTIALS = {
  email: 'officer@labelsetu.gov.in',
  password: 'password123',
};

const VALID_CUSTOMER_CREDENTIALS = {
  email: 'customer@labelsetu.gov.in',
  password: 'customer123',
};

const DEFAULT_OFFICER_USER = {
  id: 'OFF-8849-DL',
  name: 'Officer Rajesh Kumar',
  email: 'officer@labelsetu.gov.in',
  role: 'Officer',
  designation: 'Enforcement Official',
  department: 'Legal Metrology Department',
  zone: 'North Zone - Delhi HQ',
  badgeNumber: 'LM-ENF-2026-894',
  avatarUrl: null,
};

const DEFAULT_CUSTOMER_USER = {
  id: 'CUST-2026-001',
  name: 'Authorized Business Representative',
  email: 'customer@labelsetu.gov.in',
  role: 'Customer',
  designation: 'Registered Manufacturer / Packer',
  department: 'Customer Compliance Portal',
  zone: 'Corporate Unit',
  badgeNumber: 'LM-CUST-2026',
  avatarUrl: null,
};

/**
 * Perform login with email, password, rememberMe, and role
 * @param {string} email 
 * @param {string} password 
 * @param {boolean} rememberMe 
 * @param {string} role 'officer' | 'customer'
 * @returns {Promise<{success: boolean, user?: object, error?: string}>}
 */
export const login = async (email, password, rememberMe = false, role = 'officer') => {
  // Simulate network latency (500ms) for realistic UX
  await new Promise((resolve) => setTimeout(resolve, 500));

  const cleanEmail = email?.trim().toLowerCase();
  const normalizedRole = (role || 'officer').toLowerCase();

  if (normalizedRole === 'customer') {
    if (
      cleanEmail === VALID_CUSTOMER_CREDENTIALS.email.toLowerCase() &&
      password === VALID_CUSTOMER_CREDENTIALS.password
    ) {
      const userSession = {
        ...DEFAULT_CUSTOMER_USER,
        email: cleanEmail,
        loginTimestamp: new Date().toISOString(),
      };

      localStorage.setItem(AUTH_KEY, JSON.stringify(userSession));
      localStorage.setItem('userRole', 'customer');

      if (rememberMe) {
        localStorage.setItem(REMEMBER_KEY, cleanEmail);
      } else {
        localStorage.removeItem(REMEMBER_KEY);
      }

      return { success: true, user: userSession };
    }

    return {
      success: false,
      error: 'Invalid customer credentials.',
    };
  }

  // Officer Role (default)
  if (
    cleanEmail === VALID_OFFICER_CREDENTIALS.email.toLowerCase() &&
    password === VALID_OFFICER_CREDENTIALS.password
  ) {
    const userSession = {
      ...DEFAULT_OFFICER_USER,
      email: cleanEmail,
      loginTimestamp: new Date().toISOString(),
    };

    localStorage.setItem(AUTH_KEY, JSON.stringify(userSession));
    localStorage.setItem('userRole', 'officer');

    if (rememberMe) {
      localStorage.setItem(REMEMBER_KEY, cleanEmail);
    } else {
      localStorage.removeItem(REMEMBER_KEY);
    }

    return { success: true, user: userSession };
  }

  return {
    success: false,
    error: 'Invalid officer credentials.',
  };
};

/**
 * Log out current user
 */
export const logout = () => {
  localStorage.removeItem(AUTH_KEY);
};

/**
 * Check if the user is currently authenticated
 * @returns {boolean}
 */
export const isAuthenticated = () => {
  try {
    const stored = localStorage.getItem(AUTH_KEY);
    if (!stored) return false;
    const user = JSON.parse(stored);
    return Boolean(user && user.email);
  } catch {
    return false;
  }
};

/**
 * Get the current logged-in user profile
 * @returns {object|null}
 */
export const getCurrentUser = () => {
  try {
    const stored = localStorage.getItem(AUTH_KEY);
    if (!stored) return null;
    return JSON.parse(stored);
  } catch {
    return null;
  }
};

/**
 * Get remembered email if any
 * @returns {string}
 */
export const getRememberedEmail = () => {
  return localStorage.getItem(REMEMBER_KEY) || '';
};
