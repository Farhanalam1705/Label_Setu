import React from 'react';
import { Building2, ArrowLeft, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../services/auth';

export const CustomerDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      {/* Top Navigation */}
      <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center font-bold">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <span className="font-bold text-slate-900 text-sm">LABEL SETU</span>
            <span className="text-slate-400 text-xs ml-2">| Customer Portal</span>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-lg border border-slate-200 transition-colors cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </header>

      {/* Main Content Placeholder */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center space-y-4 p-8 bg-white rounded-2xl border border-slate-200 shadow-sm">
          <div className="w-14 h-14 rounded-2xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center mx-auto shadow-xs">
            <Building2 className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Customer Dashboard
            </h1>
            <p className="text-sm text-slate-500 mt-2">
              Customer portal is ready for the next module.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};
