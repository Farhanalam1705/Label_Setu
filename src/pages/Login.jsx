import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  Lock, 
  Mail, 
  AlertCircle, 
  Loader2, 
  ArrowRight,
  KeyRound,
  UserCheck,
  Building2
} from 'lucide-react';
import { login, isAuthenticated, getRememberedEmail } from '../services/auth';
import { useToast } from '../components/common/Toast';
import { LabelSetuLogo } from '../components/common/LabelSetuLogo';

export const Login = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();

  const [role, setRole] = useState('officer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const isOfficer = role === 'officer';

  // If already logged in, redirect to appropriate dashboard
  useEffect(() => {
    if (isAuthenticated()) {
      const userRole = localStorage.getItem('userRole');
      if (userRole === 'customer') {
        navigate('/customer/dashboard', { replace: true });
      } else {
        navigate('/dashboard', { replace: true });
      }
    } else {
      const savedEmail = getRememberedEmail();
      if (savedEmail) {
        setEmail(savedEmail);
      }
    }
  }, [navigate]);

  const handleRoleChange = (newRole) => {
    setRole(newRole);
    setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    const result = await login(email, password, rememberMe, role);

    setIsLoading(false);

    if (result.success) {
      addToast({
        title: 'Authentication Successful',
        message: `Welcome back, ${result.user.name}`,
        type: 'success',
      });
      if (role === 'customer') {
        navigate('/customer/dashboard', { replace: true });
      } else {
        navigate('/dashboard', { replace: true });
      }
    } else {
      setErrorMessage(
        result.error || (isOfficer ? 'Invalid officer credentials.' : 'Invalid customer credentials.')
      );
    }
  };

  const handleFillDemo = () => {
    if (isOfficer) {
      setEmail('officer@labelsetu.gov.in');
      setPassword('password123');
    } else {
      setEmail('customer@labelsetu.gov.in');
      setPassword('customer123');
    }
    setErrorMessage('');
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    addToast({
      title: 'Password Reset',
      message: 'Password reset request forwarded to Legal Metrology support desk.',
      type: 'info',
    });
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-slate-50 text-slate-900 font-sans">
      {/* Left Column: Official Branding & Context */}
      <div 
        className={`lg:w-1/2 p-8 sm:p-12 lg:p-16 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-slate-800 relative overflow-hidden text-white transition-all duration-500 ${
          isOfficer
            ? 'bg-gradient-to-br from-[#0a192f] via-[#0f2942] to-[#133e63]'
            : 'bg-gradient-to-br from-[#1b0a1a] via-[#2f102c] to-[#4c163f]'
        }`}
      >
        {/* Background Subtle Glow */}
        <div 
          className={`absolute -right-20 -bottom-20 w-96 h-96 rounded-full blur-3xl pointer-events-none transition-colors duration-500 ${
            isOfficer ? 'bg-cyan-500/10' : 'bg-rose-500/15'
          }`}
        />

        {/* Centered Content Container */}
        <div className="max-w-xl mx-auto w-full relative z-10 space-y-8">
          {/* Top Header with Label Setu Emblem */}
          <div className="flex items-center gap-4">
            <LabelSetuLogo className={`w-16 h-16 shadow-xl ring-2 ${isOfficer ? 'ring-cyan-400/30' : 'ring-rose-400/30'}`} />
            <div>
              <h1 className="text-3xl font-extrabold tracking-wider text-white">LABEL SETU</h1>
              <p className={`text-sm font-medium mt-0.5 ${isOfficer ? 'text-cyan-200/90' : 'text-rose-200/90'}`}>
                AI-Assisted Legal Metrology Compliance Checker
              </p>
            </div>
          </div>

          {/* Description Content */}
          <div className="space-y-4 pt-2">
            <div 
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold border ${
                isOfficer
                  ? 'bg-cyan-950/70 border-cyan-500/30 text-cyan-300'
                  : 'bg-rose-950/70 border-rose-500/30 text-rose-300'
              }`}
            >
              {isOfficer ? (
                <>
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  <span>Legal Metrology (Packaged Commodities) Rules, 2011</span>
                </>
              ) : (
                <>
                  <Building2 className="w-4 h-4 text-rose-400" />
                  <span>Manufacturer & Packer Self-Verification Portal</span>
                </>
              )}
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight">
              {isOfficer
                ? 'AI-assisted inspection & compliance verification for packaged commodities.'
                : 'Track product compliance, verification results & statutory label reports.'}
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {isOfficer
                ? 'Empowering enforcement officials with AI-assisted detection of mandatory label declarations, MRP standard verification, Net Quantity accuracy, and instant statutory violation flagging.'
                : 'Empowering manufacturers, packers, importers, and brand owners to monitor packaging declarations, view verification status, and ensure regulatory standards compliance.'}
            </p>
          </div>
        </div>
      </div>

      {/* Right Column: Login Card */}
      <div className="lg:w-1/2 bg-slate-50 text-slate-900 p-8 sm:p-12 lg:p-16 flex items-center justify-center">
        <div className="w-full max-w-md space-y-7">
          {/* Header */}
          <div className="space-y-2">
            <span 
              className={`text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded border inline-block shadow-2xs ${
                isOfficer
                  ? 'text-cyan-700 bg-cyan-50 border-cyan-200'
                  : 'text-rose-700 bg-rose-50 border-rose-200'
              }`}
            >
              LABEL SETU
            </span>
            <p className={`text-xs font-bold uppercase tracking-wider ${isOfficer ? 'text-cyan-800' : 'text-rose-800'}`}>
              AI-Assisted Legal Metrology Compliance Checker
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
              {isOfficer ? 'Officer Login' : 'Customer Login'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              {isOfficer
                ? 'Access inspections, evidence, compliance results and reports.'
                : 'Track your products, compliance status and inspection reports.'}
            </p>
          </div>

          {/* Role selection tab (Segmented Control) */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700">
              LOGIN AS
            </label>
            <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-200/80 rounded-xl border border-slate-300/80 shadow-2xs">
              <button
                type="button"
                onClick={() => handleRoleChange('officer')}
                className={`py-2.5 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  isOfficer
                    ? 'bg-white text-slate-900 shadow-xs ring-1 ring-slate-900/5'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <UserCheck className={`w-4 h-4 ${isOfficer ? 'text-cyan-600' : 'text-slate-400'}`} />
                <span>Officer</span>
              </button>

              <button
                type="button"
                onClick={() => handleRoleChange('customer')}
                className={`py-2.5 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  !isOfficer
                    ? 'bg-white text-slate-900 shadow-xs ring-1 ring-slate-900/5'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Building2 className={`w-4 h-4 ${!isOfficer ? 'text-rose-600' : 'text-slate-400'}`} />
                <span>Customer</span>
              </button>
            </div>
          </div>

          {/* Error Message Box */}
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2.5 animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div className="flex-1 font-medium">{errorMessage}</div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
                <span>{isOfficer ? 'Email / Officer ID' : 'Customer ID / Email'}</span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={isOfficer ? 'officer@labelsetu.gov.in' : 'customer@labelsetu.gov.in'}
                  className={`w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-white text-slate-900 placeholder-slate-400 border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:border-transparent transition-all shadow-2xs ${
                    isOfficer ? 'focus:ring-cyan-600' : 'focus:ring-rose-600'
                  }`}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <label className="font-bold text-slate-700">Password</label>
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className={`font-semibold hover:underline ${
                    isOfficer ? 'text-cyan-700 hover:text-cyan-800' : 'text-rose-700 hover:text-rose-800'
                  }`}
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className={`w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-white text-slate-900 placeholder-slate-400 border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:border-transparent transition-all shadow-2xs ${
                    isOfficer ? 'focus:ring-cyan-600' : 'focus:ring-rose-600'
                  }`}
                />
              </div>
            </div>

            {/* Remember Me & Demo Fill */}
            <div className="flex items-center justify-between text-xs text-slate-600">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className={`w-4 h-4 rounded border-slate-300 ${
                    isOfficer ? 'text-cyan-600 focus:ring-cyan-500' : 'text-rose-600 focus:ring-rose-500'
                  }`}
                />
                <span className="font-medium text-slate-700">Remember me</span>
              </label>

              <button
                type="button"
                onClick={handleFillDemo}
                className={`text-[11px] font-semibold flex items-center gap-1 hover:underline cursor-pointer ${
                  isOfficer ? 'text-slate-500 hover:text-cyan-700' : 'text-slate-500 hover:text-rose-700'
                }`}
              >
                <KeyRound className="w-3 h-3" />
                Fill Demo Credentials
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-4 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-70 active:scale-99 cursor-pointer ${
                isOfficer
                  ? 'bg-[#0f2942] hover:bg-[#153a5c] shadow-slate-900/10'
                  : 'bg-[#431238] hover:bg-[#57184a] shadow-rose-950/20'
              }`}
            >
              {isLoading ? (
                <>
                  <Loader2 className={`w-4 h-4 animate-spin ${isOfficer ? 'text-cyan-400' : 'text-rose-300'}`} />
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <span>{isOfficer ? 'Sign In' : 'Customer Sign In'}</span>
                  <ArrowRight className={`w-4 h-4 ${isOfficer ? 'text-cyan-400' : 'text-rose-300'}`} />
                </>
              )}
            </button>
          </form>

          {/* Role Switch Footer Prompt */}
          <div className="pt-2 text-center text-xs text-slate-500 border-t border-slate-200">
            {isOfficer ? (
              <p>
                <span>Are you a customer? </span>
                <button
                  type="button"
                  onClick={() => handleRoleChange('customer')}
                  className="font-bold text-cyan-700 hover:text-cyan-800 hover:underline cursor-pointer ml-1"
                >
                  Switch to Customer Login
                </button>
              </p>
            ) : (
              <p>
                <span>Are you an officer? </span>
                <button
                  type="button"
                  onClick={() => handleRoleChange('officer')}
                  className="font-bold text-rose-700 hover:text-rose-800 hover:underline cursor-pointer ml-1"
                >
                  Switch to Officer Login
                </button>
              </p>
            )}
          </div>

          {!isOfficer && (
            <div className="text-center text-xs text-slate-500">
              <span>New customer? </span>
              <button
                type="button"
                onClick={() => navigate('/register')}
                className="font-bold text-rose-700 hover:text-rose-800 hover:underline cursor-pointer ml-1"
              >
                Create an account
              </button>
            </div>
          )}

          {isOfficer && (
            <div className="text-center text-xs text-slate-500">
              <span>New officer? </span>
              <button
                type="button"
                onClick={() => navigate('/officer/register')}
                className="font-bold text-cyan-700 hover:text-cyan-800 hover:underline cursor-pointer ml-1"
              >
                Register as Officer
              </button>
            </div>
          )}

          {/* Official Security Disclaimer */}
          <div className="p-3.5 rounded-xl bg-slate-100 border border-slate-200 text-[11px] text-slate-500 text-center leading-relaxed shadow-2xs">
            {isOfficer
              ? 'Authorized for use by designated Legal Metrology Officers under the Standards of Weights and Measures Act. Unauthorized access is strictly prohibited.'
              : 'Authorized for registered manufacturers, packers, importers, and brand owners for tracking compliance and reports. Unauthorized access is strictly prohibited.'}
          </div>
        </div>
      </div>
    </div>
  );
};
