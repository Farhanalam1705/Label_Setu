import React from 'react';
import { Package, ClipboardList, ShieldCheck, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CUSTOMER_SUMMARY_STATS } from '../../data/customerMockData';

export const CustomerSummaryCards = () => {
  const cards = [
    {
      id: 'products',
      title: 'My Products',
      value: CUSTOMER_SUMMARY_STATS.myProducts,
      icon: Package,
      iconColor: 'text-cyan-400',
      iconBg: 'bg-cyan-500/15 border-cyan-500/30',
      cardBg: 'bg-[#0f1b2d] border-[#1e314f] hover:border-cyan-500/50',
      badge: 'Active Portfolio',
      badgeStyle: 'bg-cyan-950/80 text-cyan-300 border-cyan-500/30',
      glow: 'group-hover:shadow-cyan-500/10',
      link: '/customer/products',
    },
    {
      id: 'inspections',
      title: 'Total Inspections',
      value: CUSTOMER_SUMMARY_STATS.inspections,
      icon: ClipboardList,
      iconColor: 'text-violet-400',
      iconBg: 'bg-violet-500/15 border-violet-500/30',
      cardBg: 'bg-[#0f1b2d] border-[#1e314f] hover:border-violet-500/50',
      badge: 'Official Records',
      badgeStyle: 'bg-violet-950/80 text-violet-300 border-violet-500/30',
      glow: 'group-hover:shadow-violet-500/10',
      link: '/customer/inspections',
    },
    {
      id: 'compliant',
      title: 'Compliant Products',
      value: CUSTOMER_SUMMARY_STATS.compliantProducts,
      icon: ShieldCheck,
      iconColor: 'text-emerald-400',
      iconBg: 'bg-emerald-500/15 border-emerald-500/30',
      cardBg: 'bg-[#0f1b2d] border-[#1e314f] hover:border-emerald-500/50',
      badge: '58.3% Ratio',
      badgeStyle: 'bg-emerald-950/80 text-emerald-300 border-emerald-500/30',
      glow: 'group-hover:shadow-emerald-500/10',
      link: '/customer/products',
    },
    {
      id: 'needs-attention',
      title: 'Needs Attention',
      value: CUSTOMER_SUMMARY_STATS.needsAttention,
      icon: AlertTriangle,
      iconColor: 'text-amber-400',
      iconBg: 'bg-amber-500/15 border-amber-500/30',
      cardBg: 'bg-[#0f1b2d] border-[#1e314f] hover:border-amber-500/50',
      badge: 'Action Required',
      badgeStyle: 'bg-amber-950/80 text-amber-300 border-amber-500/30',
      glow: 'group-hover:shadow-amber-500/10',
      link: '/customer/products',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <Link
            key={card.id}
            to={card.link}
            className={`group relative rounded-2xl p-5 border shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden ${card.cardBg} ${card.glow}`}
          >
            {/* Top Row: Icon & Badge */}
            <div className="flex items-start justify-between">
              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center border ${card.iconBg} ${card.iconColor} group-hover:scale-110 transition-transform duration-300`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <span
                className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border shadow-xs ${card.badgeStyle}`}
              >
                {card.badge}
              </span>
            </div>

            {/* Bottom Row: Metric & Title */}
            <div className="mt-5">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                {card.title}
              </p>
              <div className="flex items-baseline justify-between mt-1.5">
                <span className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                  {card.value}
                </span>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};
