import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Login } from '../pages/Login';
import { Register } from '../pages/Register';
import { OfficerRegister } from '../pages/OfficerRegister';
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
import { OfficerComplaints } from '../pages/OfficerComplaints';
import { OfficerComplaintDetail } from '../pages/OfficerComplaintDetail';

// Customer Portal Pages & Layout
import { CustomerLayout } from '../components/customer/CustomerLayout';
import { CustomerDashboard } from '../pages/CustomerDashboard';
import { CustomerProducts } from '../pages/customer/CustomerProducts';
import { CustomerInspections } from '../pages/customer/CustomerInspections';
import { CustomerInspectionDetail } from '../pages/customer/CustomerInspectionDetail';
import { CustomerComplaints } from '../pages/customer/CustomerComplaints';
import { CustomerComplaintCreate } from '../pages/customer/CustomerComplaintCreate';
import { CustomerReports } from '../pages/customer/CustomerReports';
import { CustomerNotifications } from '../pages/customer/CustomerNotifications';
import { CustomerSettings } from '../pages/customer/CustomerSettings';

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Route: Login */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/officer/register" element={<OfficerRegister />} />

      {/* Customer Portal Protected Routes */}
      <Route
        path="/customer"
        element={
          <ProtectedRoute allowedRole="customer">
            <CustomerLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/customer/dashboard" replace />} />
        <Route path="dashboard" element={<CustomerDashboard />} />
        <Route path="products" element={<CustomerProducts />} />
        <Route path="products/:productId" element={<CustomerProducts />} />
        <Route path="inspections" element={<CustomerInspections />} />
        <Route path="inspections/:inspectionId" element={<CustomerInspectionDetail />} />
        <Route path="complaints" element={<CustomerComplaints />} />
        <Route path="complaints/new" element={<CustomerComplaintCreate />} />
        <Route path="complaints/:complaintId" element={<CustomerComplaints />} />
        <Route path="reports" element={<CustomerReports />} />
        <Route path="notifications" element={<CustomerNotifications />} />
        <Route path="settings" element={<CustomerSettings />} />
      </Route>

      {/* Officer Protected Routes enclosed in MainLayout */}
      <Route
        path="/"
        element={
          <ProtectedRoute allowedRole="officer">
            <MainLayout />
          </ProtectedRoute>
        }
      >
        {/* Default index route redirects to dashboard */}
        <Route index element={<Navigate to="/dashboard" replace />} />
        
        {/* Dashboard */}
        <Route path="dashboard" element={<Dashboard />} />
        
        {/* Scanner / New Inspection */}
        <Route path="scanner" element={<Scanner />} />
        <Route path="new-inspection" element={<Scanner />} />

        {/* AI Analysis / Processing */}
        <Route path="processing" element={<Processing />} />

        {/* Results & Review */}
        <Route path="results" element={<Results />} />
        <Route path="evidence" element={<EvidenceViewer />} />
        <Route path="review/:inspectionId" element={<OfficerReviewPage />} />
        <Route path="reports/generate" element={<ReportGeneratorPage />} />
        <Route path="report/generate" element={<ReportGeneratorPage />} />
        <Route path="history" element={<InspectionHistoryPage />} />
        <Route path="history/:inspectionId" element={<InspectionDetailsPage />} />
        
        {/* Officer Complaint Management */}
        <Route path="complaints" element={<OfficerComplaints />} />
        <Route path="complaints/:complaintId" element={<OfficerComplaintDetail />} />

        <Route path="settings" element={<SettingsPage />} />
      </Route>

      {/* Fallback catch-all route */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};
