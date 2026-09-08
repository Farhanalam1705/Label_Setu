import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ScanLine, 
  History,
  Settings,
  LogOut, 
  Shield, 
  Scale, 
  X,
  FileCheck2,
  ExternalLink
} from 'lucide-react';
import { getCurrentUser, logout } from '../../services/auth';
import { useToast } from '../common/Toast';
import { LabelSetuLogo } from '../common/LabelSetuLogo';
import { useLanguage } from '../../context/LanguageContext';

export const Sidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { t } = useLanguage();

  const user = getCurrentUser() || {
    name: 'Officer Rajesh Kumar',
    email: 'officer@labelsetu.gov.in',
    role: 'Officer',
    designation: 'Enforcement Official',
  };

  const handleLogout = () => {
    logout();
    addToast({
      title: t('signedOut', 'Logged Out'),
      message: t('signedOut', 'You have been signed out successfully.'),
      type: 'info',
    });
    navigate('/login', { replace: true });
  };

  const navItems = [
    {
      name: t('enforcementDashboard', 'Dashboard'),
      path: '/dashboard',
      icon: LayoutDashboard,
      badge: null,
    },
    {
      name: t('productScanner', 'Product Scanner'),
      path: '/scanner',
      icon: ScanLine,
      badge: 'Live',
    },
    {
      name: t('inspectionHistory', 'Inspection History'),
      path: '/history',
      icon: History,
      badge: null,
    },
    {
      name: t('settings', 'Settings'),
      path: '/settings',
      icon: Settings,
      badge: null,
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-[#0c1e33] text-slate-100 flex flex-col border-r border-slate-800/80 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header Branding */}
        <div className="p-5 border-b border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <LabelSetuLogo className="w-10 h-10 ring-1 ring-cyan-500/30" />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-base font-extrabold tracking-wider text-white">LABEL SETU</span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">{t('portalTitle', 'Legal Metrology Portal')}</p>
            </div>
          </div>

          {/* Close button on Mobile */}
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 cursor-pointer"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation List */}
        <div className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Core Modules
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-colors duration-150 ${
                    isActive
                      ? 'bg-cyan-600 text-white shadow-xs font-bold'
                      : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] uppercase font-bold px-1.5 py-0.2 rounded bg-cyan-400/20 text-cyan-300 border border-cyan-400/30">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </div>

        {/* Official Portal Notice */}
        <div className="p-4 mx-3 mb-2 rounded-xl bg-slate-900/90 border border-slate-800/80 text-[11px] text-slate-400 space-y-1">
          <div className="flex items-center gap-1.5 text-slate-200 font-semibold text-xs">
            <Shield className="w-3.5 h-3.5 text-cyan-400" />
            {t('officialEnforcement', 'Official Enforcement')}
          </div>
          <p className="text-[10px] text-slate-400 leading-tight">
            {t('officialEnforcementDept', 'Dept. of Consumer Affairs, Legal Metrology Division.')}
          </p>
        </div>

        {/* Bottom Officer Profile & Logout */}
        <div className="p-4 border-t border-slate-800 bg-[#091727]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-cyan-600 text-white font-bold text-xs flex items-center justify-center shrink-0 ring-1 ring-white/20">
                {user.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-white truncate">{user.role}</p>
                <p className="text-[11px] text-slate-400 truncate">{user.designation}</p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              title={t('logout', 'Logout')}
              className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors cursor-pointer"
              aria-label="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
