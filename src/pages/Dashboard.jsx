import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  Filter, 
  ExternalLink, 
  Eye, 
  Scale, 
  FileSpreadsheet, 
  Download,
  AlertCircle,
  Calendar,
  CheckCircle2,
  PieChart as PieChartIcon
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { StatCard } from '../components/common/StatCard';
import { StatusBadge } from '../components/results/StatusBadge';
import { useToast } from '../components/common/Toast';
import { STATS_DATA, COMPLIANCE_CHART_DATA, RECENT_INSPECTIONS } from '../data/mockData';
import { useLanguage } from '../context/LanguageContext';

export const Dashboard = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Handle "+ New Inspection" CTA
  const handleNewInspection = () => {
    navigate('/scanner');
  };

  // Handle "View" Inspection
  const handleViewInspection = (inspection) => {
    navigate(`/history/${inspection.id}`);
  };

  // Filter inspections
  const filteredInspections = RECENT_INSPECTIONS.filter((item) => {
    const matchesSearch =
      item.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.manufacturer.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'All' || item.status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  const getTranslatedStat = (stat) => {
    switch (stat.id) {
      case 'total':
        return {
          ...stat,
          title: t('totalInspectionsDash', stat.title),
          description: t('packComEval', stat.description),
        };
      case 'compliant':
        return {
          ...stat,
          title: t('compliantProducts', stat.title),
          description: t('satisfiesMandate', stat.description),
        };
      case 'violations':
        return {
          ...stat,
          title: t('violations', stat.title),
          description: t('nonCompliantDetected', stat.description),
        };
      case 'review':
        return {
          ...stat,
          title: t('needsReview', stat.title),
          description: t('requiresConfirmation', stat.description),
        };
      default:
        return stat;
    }
  };

  const getTranslatedChartItemName = (name) => {
    if (name === 'Compliant') return t('compliant', 'Compliant');
    if (name === 'Violations') return t('violations', 'Violations');
    if (name === 'Needs Review') return t('needsReview', 'Needs Review');
    return name;
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-500">
      {/* Top Welcome Header & Primary CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs animate-in fade-in slide-in-from-top-4 duration-500">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              {t('goodMorning', 'Good Morning, Officer')}
            </h1>
            <span className="hidden sm:inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse-glow"></span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500">
            {t('complianceOverviewSubtitle', "Here's your compliance inspection overview.")}
          </p>
        </div>

        {/* Primary CTA Button with Shimmer and scale effect */}
        <button
          onClick={handleNewInspection}
          className="shimmer-button inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md shadow-cyan-900/20 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shrink-0"
        >
          <Plus className="w-4 h-4 transition-transform duration-200 group-hover:rotate-90" />
          <span>{t('newInspection', 'New Inspection')}</span>
        </button>
      </div>

      {/* Statistics Cards (4 Cards with subtle stagger) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-in fade-in slide-in-from-bottom-3 duration-500">
        {STATS_DATA.map((stat) => {
          const trans = getTranslatedStat(stat);
          return (
            <StatCard
              key={stat.id}
              title={trans.title}
              value={stat.value}
              percentage={stat.percentage}
              change={stat.change}
              trend={stat.trend}
              color={stat.color}
              icon={stat.icon}
              description={trans.description}
            />
          );
        })}
      </div>

      {/* Middle Section: Compliance Overview Chart & Quick Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-600">
        {/* Compliance Donut Chart Card */}
        <div className="lg:col-span-1 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow duration-300">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-cyan-50 text-cyan-700 border border-cyan-200">
                  <PieChartIcon className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-slate-900">{t('complianceOverview', 'Compliance Overview')}</h3>
              </div>
              <span className="text-[11px] font-semibold text-slate-400">{t('allBatches', 'All Batches')}</span>
            </div>

            {/* Donut Chart Container */}
            <div className="relative h-56 w-full my-2 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip
                    formatter={(val, name, item) => [`${val}% (${item.payload.count} items)`, getTranslatedChartItemName(name)]}
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      borderRadius: '8px',
                      border: 'none',
                      color: '#fff',
                      fontSize: '11px',
                    }}
                  />
                  <Pie
                    data={COMPLIANCE_CHART_DATA}
                    cx="50%"
                    cy="50%"
                    innerRadius={58}
                    outerRadius={82}
                    paddingAngle={4}
                    dataKey="value"
                    isAnimationActive={true}
                    animationDuration={1000}
                    animationEasing="ease-out"
                  >
                    {COMPLIANCE_CHART_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="#ffffff" strokeWidth={2} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>

              {/* Center Overlay Text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none animate-in zoom-in-90 duration-700">
                <span className="text-2xl font-extrabold text-slate-900">74.8%</span>
                <span className="text-[10px] font-semibold uppercase text-emerald-600 tracking-wider">
                  {t('statusCompliant', 'COMPLIANT')}
                </span>
              </div>
            </div>
          </div>

          {/* Custom Legend */}
          <div className="space-y-2 pt-3 border-t border-slate-100">
            {COMPLIANCE_CHART_DATA.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-xs hover:bg-slate-50 p-1 rounded-md transition-colors">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full transition-transform hover:scale-125" style={{ backgroundColor: item.color }}></span>
                  <span className="text-slate-600 font-medium">{getTranslatedChartItemName(item.name)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-800">{item.value}%</span>
                  <span className="text-slate-400 text-[11px]">({item.count})</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Commodity Category Compliance & Operational Activity Card */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow duration-300">
          <div>
            {/* Card Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-4 border-b border-slate-100 gap-2">
              <div>
                <h3 className="text-sm font-bold text-slate-900">{t('categoryComplianceBreakdown', 'Category Compliance Breakdown')}</h3>
                <p className="text-xs text-slate-500">{t('categoryComplianceDesc', 'Inspection compliance performance grouped by commodity type')}</p>
              </div>
              <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-lg self-start sm:self-auto">
                {t('currentMonth', 'Current Month')}
              </span>
            </div>

            {/* Content: Progress Bars & Key Operational Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5">
              {/* Category Progress Bars */}
              <div className="space-y-3.5">
                <div className="group">
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-slate-800">{t('foodGrains', 'Food & Grains (Rice, Atta, Pulses)')}</span>
                    <span className="text-emerald-600 font-mono font-bold">91.2%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200">
                    <div className="bg-emerald-500 h-2 rounded-full transition-all duration-1000 ease-out group-hover:bg-emerald-400" style={{ width: '91.2%' }}></div>
                  </div>
                </div>

                <div className="group">
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-slate-800">{t('beveragesDairy', 'Beverages & Dairy (Tea, Ghee, Milk)')}</span>
                    <span className="text-emerald-600 font-mono font-bold">86.0%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200">
                    <div className="bg-emerald-500 h-2 rounded-full transition-all duration-1000 ease-out group-hover:bg-emerald-400" style={{ width: '86.0%' }}></div>
                  </div>
                </div>

                <div className="group">
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-slate-800">{t('edibleOils', 'Edible Oils (Mustard, Sunflower)')}</span>
                    <span className="text-amber-600 font-mono font-bold">78.4%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200">
                    <div className="bg-amber-500 h-2 rounded-full transition-all duration-1000 ease-out group-hover:bg-amber-400" style={{ width: '78.4%' }}></div>
                  </div>
                </div>

                <div className="group">
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-slate-800">{t('bakerySnacks', 'Bakery & Snacks (Biscuits, Chips)')}</span>
                    <span className="text-rose-600 font-mono font-bold">68.5%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200">
                    <div className="bg-rose-500 h-2 rounded-full transition-all duration-1000 ease-out group-hover:bg-rose-400" style={{ width: '68.5%' }}></div>
                  </div>
                </div>
              </div>

              {/* Quick Operational Summary Widgets */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between hover:bg-slate-100/80 transition-all duration-200 hover:-translate-y-0.5">
                  <span className="text-[11px] font-semibold text-slate-500">{t('avgInspectionSpeed', 'Avg. Inspection Speed')}</span>
                  <div className="mt-2">
                    <span className="text-lg font-bold text-slate-900">0.45s</span>
                    <span className="text-[10px] text-emerald-600 block font-medium mt-0.5">{t('highPerformance', 'High Performance')}</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between hover:bg-slate-100/80 transition-all duration-200 hover:-translate-y-0.5">
                  <span className="text-[11px] font-semibold text-slate-500">{t('labelDetectionRate', 'Label Detection Rate')}</span>
                  <div className="mt-2">
                    <span className="text-lg font-bold text-slate-900">99.4%</span>
                    <span className="text-[10px] text-cyan-600 block font-medium mt-0.5">{t('mandatoryDeclarations', 'Mandatory Declarations')}</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between hover:bg-slate-100/80 transition-all duration-200 hover:-translate-y-0.5">
                  <span className="text-[11px] font-semibold text-slate-500">{t('activeBatches', 'Active Batches')}</span>
                  <div className="mt-2">
                    <span className="text-lg font-bold text-slate-900">48</span>
                    <span className="text-[10px] text-slate-500 block font-medium mt-0.5">{t('inCurrentCycle', 'In Current Cycle')}</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between hover:bg-slate-100/80 transition-all duration-200 hover:-translate-y-0.5">
                  <span className="text-[11px] font-semibold text-slate-500">{t('syncStatus', 'Sync Status')}</span>
                  <div className="mt-2">
                    <span className="text-sm font-bold text-emerald-700 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse-glow"></span>
                      {t('connected', 'Connected')}
                    </span>
                    <span className="text-[10px] text-slate-500 block font-medium mt-0.5">{t('centralDatabase', 'Central Database')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card Footer */}
          <div className="pt-4 mt-5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>{t('dataUpdatedRealTime', 'Data updated in real time from field inspections')}</span>
            <button
              onClick={handleNewInspection}
              className="text-cyan-700 hover:text-cyan-800 font-bold flex items-center gap-1 hover:underline transition-all hover:translate-x-1 cursor-pointer"
            >
              {t('startNewInspection', 'Start New Inspection →')}
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Section: Recent Inspections Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-700 hover:shadow-md transition-shadow duration-300">
        {/* Table Header & Controls */}
        <div className="p-5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900">{t('recentInspections', 'Recent Inspections')}</h3>
            <p className="text-xs text-slate-500">
              {t('auditLogDesc', 'Audit log of recently verified packaged commodities')}
            </p>
          </div>

          {/* Search & Filter */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={t('searchProductIdBrand', 'Search product, ID, brand...')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-cyan-600 focus:bg-white transition-all w-48 sm:w-56"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-cyan-600 font-medium text-slate-700 transition-colors"
            >
              <option value="All">{t('allStatuses', 'All Statuses')}</option>
              <option value="Compliant">{t('compliant', 'Compliant')}</option>
              <option value="Violation">{t('violations', 'Violation')}</option>
              <option value="Needs Review">{t('needsReview', 'Needs Review')}</option>
            </select>
          </div>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <th className="py-3 px-5">{t('inspectionId', 'Inspection ID')}</th>
                <th className="py-3 px-5">{t('product', 'Product')}</th>
                <th className="py-3 px-5">{t('date', 'Date')}</th>
                <th className="py-3 px-5">{t('status', 'Status')}</th>
                <th className="py-3 px-5">{t('complianceScore', 'Compliance Score')}</th>
                <th className="py-3 px-5 text-right">{t('action', 'Action')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
              {filteredInspections.length > 0 ? (
                filteredInspections.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/90 transition-all duration-150 group">
                    <td className="py-3.5 px-5 font-mono font-semibold text-slate-900 group-hover:text-cyan-700 transition-colors">
                      {item.id}
                    </td>
                    <td className="py-3.5 px-5">
                      <div className="font-semibold text-slate-900">{item.product}</div>
                      <div className="text-[11px] text-slate-400">{item.manufacturer}</div>
                    </td>
                    <td className="py-3.5 px-5 text-slate-500 whitespace-nowrap">
                      {item.date}
                    </td>
                    <td className="py-3.5 px-5">
                      <StatusBadge status={item.status} size="sm" />
                    </td>
                    <td className="py-3.5 px-5">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-slate-100 rounded-full h-1.5 overflow-hidden border border-slate-200">
                          <div
                            className={`h-1.5 rounded-full transition-all duration-700 ${
                              item.complianceScore >= 90
                                ? 'bg-emerald-500'
                                : item.complianceScore >= 70
                                ? 'bg-amber-500'
                                : 'bg-rose-500'
                            }`}
                            style={{ width: `${item.complianceScore}%` }}
                          ></div>
                        </div>
                        <span className="font-mono font-bold text-slate-800 text-xs">
                          {item.complianceScore}%
                        </span>
                      </div>
                    </td>
                    <td className="py-3.5 px-5 text-right">
                      <button
                        onClick={() => handleViewInspection(item)}
                        className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold text-cyan-700 hover:text-cyan-800 bg-cyan-50 hover:bg-cyan-100 border border-cyan-200 rounded-lg transition-all duration-150 hover:scale-105 active:scale-95 shadow-2xs cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>{t('view', 'View')}</span>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-500 text-xs">
                    {t('noInspectionsMatchFilter', 'No inspections found matching the current search/filter.')}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};



