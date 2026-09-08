import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, User, ShieldCheck, ChevronDown, Check } from 'lucide-react';
import { getCurrentUser, logout } from '../../services/auth';
import { useToast } from '../common/Toast';
import { useLanguage } from '../../context/LanguageContext';

export const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { t } = useLanguage();

  const user = getCurrentUser() || {
    name: 'Officer Rajesh Kumar',
    email: 'officer@labelsetu.gov.in',
    role: 'Officer',
    designation: 'Enforcement Official',
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    addToast({
      title: t('signedOut', 'Signed Out'),
      message: t('signedOut', 'You have been successfully signed out of the portal.'),
      type: 'info',
    });
    navigate('/login', { replace: true });
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 p-1.5 pr-2.5 rounded-lg hover:bg-slate-100 transition-colors border border-transparent hover:border-slate-200 cursor-pointer"
        aria-expanded={isOpen}
      >
        <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-xs ring-2 ring-cyan-500/30">
          {user.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}
        </div>
        
        <div className="hidden sm:flex flex-col items-start text-left">
          <span className="text-xs font-bold text-slate-800 leading-tight flex items-center gap-1">
            {user.role === 'Officer' ? t('activeOfficer', 'Officer') : user.role}
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          </span>
          <span className="text-[11px] text-slate-500 font-medium leading-tight">
            {user.designation === 'Enforcement Official' ? t('enforcementOfficial', 'Enforcement Official') : user.designation}
          </span>
        </div>

        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl border border-slate-200 shadow-xl py-1.5 z-50 animate-in fade-in zoom-in-95">
          <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/70">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded bg-cyan-100 text-cyan-800 uppercase tracking-wide">
                <ShieldCheck className="w-3 h-3" />
                {t('verifiedOfficer', 'Verified Officer')}
              </span>
            </div>
            <p className="text-xs font-bold text-slate-900 mt-1">{user.name}</p>
            <p className="text-[11px] text-slate-500 font-mono truncate">{user.email}</p>
          </div>

          <div className="p-1.5">
            <div className="px-3 py-2 text-[11px] text-slate-500 flex justify-between items-center">
              <span>{t('department', 'Department')}</span>
              <span className="font-semibold text-slate-700">{t('portalTitle', 'Legal Metrology')}</span>
            </div>
            <div className="px-3 py-1.5 text-[11px] text-slate-500 flex justify-between items-center">
              <span>{t('authStatus', 'Auth Status')}</span>
              <span className="font-medium text-emerald-600 flex items-center gap-1">
                <Check className="w-3 h-3" /> {t('activeSession', 'Active Session')}
              </span>
            </div>
          </div>

          <div className="border-t border-slate-100 p-1.5">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              {t('logout', 'Sign Out from Portal')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
