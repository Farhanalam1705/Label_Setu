import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Login } from '../pages/Login';
import { Dashboard } from '../pages/Dashboard';
import { Scanner } from '../pages/Scanner';
import { Processing } from '../pages/Processing';
import { Results } from '../pages/Results';
import { MainLayout } from '../components/layout/MainLayout';
import { ProtectedRoute } from './ProtectedRoute';
import { EvidenceViewer } from '../pages/EvidenceViewer';
import { OfficerReviewPage } from '../pages/OfficerReviewPage';
import { ReportGeneratorPage } from '../pages/ReportGeneratorPage';
import { InspectionHistoryPage } from '../pages/InspectionHistoryPage';
import { InspectionDetailsPage } from '../pages/InspectionDetailsPage';
import { SettingsPage } from '../pages/SettingsPage';
import { CustomerDashboard } from '../pages/CustomerDashboard';

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Route: Login */}
      <Route path="/login" element={<Login />} />

      {/* Customer Dashboard Route */}
      <Route
        path="/customer/dashboard"
        element={
          <ProtectedRoute>
            <CustomerDashboard />
          </ProtectedRoute>
        }
      />

      {/* Protected Routes enclosed in MainLayout */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        {/* Default index route redirects to dashboard */}
        <Route index element={<Navigate to="/dashboard" replace />} />
        
        {/* Dashboard Stage 2 */}
        <Route path="dashboard" element={<Dashboard />} />
        
        {/* New Inspection / Scanner Stages 3 & 4 */}
        <Route path="scanner" element={<Scanner />} />
        <Route path="new-inspection" element={<Scanner />} />

        {/* AI Analysis / Processing */}
        <Route path="processing" element={<Processing />} />

        {/* Compliance Results Placeholder */}
        <Route path="results" element={<Results />} />
        <Route path="evidence" element={<EvidenceViewer />} />
        <Route path="review/:inspectionId" element={<OfficerReviewPage />} />
        <Route path="reports/generate" element={<ReportGeneratorPage />} />
        <Route path="report/generate" element={<ReportGeneratorPage />} />
        <Route path="history" element={<InspectionHistoryPage />} />
        <Route path="history/:inspectionId" element={<InspectionDetailsPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>

      {/* Fallback catch-all route */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};
