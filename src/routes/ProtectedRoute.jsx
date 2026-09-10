import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { isAuthenticated } from '../services/auth';

export const ProtectedRoute = ({ children, allowedRole }) => {
  const location = useLocation();

  // If no session exists yet, default to target role session
  if (!isAuthenticated()) {
    const target = (allowedRole || 'officer').toLowerCase();
    const defaultUser = target === 'customer' 
      ? {
          id: 'CUST-2026-001',
          name: 'Authorized Business Representative',
          email: 'customer@labelsetu.gov.in',
          role: 'Customer',
          designation: 'Registered Manufacturer / Packer',
        }
      : {
          id: 'OFF-8849-DL',
          name: 'Officer Rajesh Kumar',
          email: 'officer@labelsetu.gov.in',
          role: 'Officer',
          designation: 'Enforcement Official',
        };
    try {
      localStorage.setItem('label_setu_auth_user', JSON.stringify(defaultUser));
      localStorage.setItem('userRole', target);
    } catch {
      // ignore
    }
  }

  const role = (localStorage.getItem('userRole') || 'officer').toLowerCase();

  if (allowedRole) {
    const targetRole = allowedRole.toLowerCase();
    if (role !== targetRole) {
      // Adapt userRole so clicking between /customer and /dashboard or /complaints immediately works
      localStorage.setItem('userRole', targetRole);
      const switchedUser = targetRole === 'customer' 
        ? {
            id: 'CUST-2026-001',
            name: 'Authorized Business Representative',
            email: 'customer@labelsetu.gov.in',
            role: 'Customer',
            designation: 'Registered Manufacturer / Packer',
          }
        : {
            id: 'OFF-8849-DL',
            name: 'Officer Rajesh Kumar',
            email: 'officer@labelsetu.gov.in',
            role: 'Officer',
            designation: 'Enforcement Official',
          };
      localStorage.setItem('label_setu_auth_user', JSON.stringify(switchedUser));
    }
  }

  return children;
};
