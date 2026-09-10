import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { WelcomeSection } from '../components/customer/WelcomeSection';
import { CustomerSummaryCards } from '../components/customer/CustomerSummaryCards';
import { ComplianceOverview } from '../components/customer/ComplianceOverview';
import { RecentInspections } from '../components/customer/RecentInspections';

export const CustomerDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 sm:space-y-8 pb-8">
      {/* 1. Welcome Section */}
      <WelcomeSection />

      {/* 2. Key Summary Cards */}
      <CustomerSummaryCards />

      {/* 3. Streamlined Compliance Overview */}
      <ComplianceOverview />

      {/* 4. Recent Inspection History with Selection & Deletion Controls */}
      <RecentInspections />
    </div>
  );
};
