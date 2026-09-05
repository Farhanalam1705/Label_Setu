import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Scale, 
  ShieldCheck, 
  FileCheck2, 
  Lock, 
  Mail, 
  AlertCircle, 
  Loader2, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  KeyRound,
  BadgeCheck
} from 'lucide-react';
import { login, isAuthenticated, getRememberedEmail } from '../services/auth';
import { useToast } from '../components/common/Toast';
import { LabelSetuLogo } from '../components/common/LabelSetuLogo';


export const Login = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Officer');
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // If already logged in, redirect to dashboard
  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/dashboard', { replace: true });
    } else {
      const savedEmail = getRememberedEmail();
      if (savedEmail) {
        setEmail(savedEmail);
      }
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    const result = await login(email, password, rememberMe);

    setIsLoading(false);

    if (result.success) {
      addToast({
        title: 'Authentication Successful',
        message: `Welcome back, ${result.user.name}`,
        type: 'success',
      });
      navigate('/dashboard', { replace: true });
    } else {
      setErrorMessage(result.error || 'Invalid email or password. Please try again.');
    }
  };

  const handleFillDemo = () => {
    setEmail('officer@labelsetu.gov.in');
    setPassword('password123');
    setErrorMessage('');
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    addToast({
      title: 'Password Reset',
      message: 'Password reset request forwarded to Legal Metrology IT Cell administrator.',
      type: 'info',
    });
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-slate-50 text-slate-900 font-sans">
      {/* Left Column: Official Branding & Context (Original Dark Navy & Cyan Theme) */}
      <div className="lg:w-1/2 bg-gradient-to-br from-[#0a192f] via-[#0f2942] to-[#133e63] p-8 sm:p-12 lg:p-16 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-slate-800 relative overflow-hidden text-white">
        {/* Background Subtle Emblem Glow */}
        <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Centered Content Container */}
        <div className="max-w-xl mx-auto w-full relative z-10 space-y-8">
          {/* Top Header with Label Setu Emblem */}
          <div className="flex items-center gap-4">
            <LabelSetuLogo className="w-16 h-16 ring-2 ring-cyan-400/30 shadow-xl" />
            <div>
              <h1 className="text-3xl font-extrabold tracking-wider text-white">LABEL SETU</h1>
              <p className="text-sm text-cyan-200/90 font-medium mt-0.5">
                AI-Powered Legal Metrology Compliance Checker
              </p>
            </div>
          </div>

          {/* Description Content */}
          <div className="space-y-4 pt-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              Legal Metrology (Packaged Commodities) Rules, 2011
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight">
              AI-assisted inspection & compliance verification for packaged commodities.
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Empowering enforcement officials with automated detection of mandatory label declarations,
              MRP standard verification, Net Quantity accuracy, and instant statutory violation flagging.
            </p>
          </div>
        </div>
      </div>

      {/* Right Column: Login Card (Original Slate/White Theme) */}
      <div className="lg:w-1/2 bg-slate-50 text-slate-900 p-8 sm:p-12 lg:p-16 flex items-center justify-center">
        <div className="w-full max-w-md space-y-8">
          {/* Header */}
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-700 bg-cyan-50 px-2.5 py-1 rounded border border-cyan-200 inline-block shadow-2xs">
              Enforcement Portal Access
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">Welcome Back</h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Sign in to continue to the <strong className="text-slate-700">LABEL SETU</strong> enforcement portal.
            </p>
          </div>

          {/* Role selection tab */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Authorized Role</label>
            <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-200/80 rounded-xl border border-slate-300/80 shadow-2xs">
              {['Officer', 'Administrator'].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  className={`py-2 text-xs font-bold rounded-lg transition-all ${
                    role === r
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {r}
                </button>
              ))}
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
                <span>Official Email</span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="officer@labelsetu.gov.in"
                  className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-white text-slate-900 placeholder-slate-400 border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-cyan-600 focus:border-transparent transition-all shadow-2xs"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <label className="font-bold text-slate-700">Password</label>
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="font-semibold text-cyan-700 hover:text-cyan-800 hover:underline"
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
                  className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-white text-slate-900 placeholder-slate-400 border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-cyan-600 focus:border-transparent transition-all shadow-2xs"
                />
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between text-xs text-slate-600">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-300 text-cyan-600 focus:ring-cyan-500"
                />
                <span className="font-medium text-slate-700">Remember me</span>
              </label>

              <button
                type="button"
                onClick={handleFillDemo}
                className="text-[11px] font-semibold text-slate-500 hover:text-cyan-700 flex items-center gap-1 hover:underline"
              >
                <KeyRound className="w-3 h-3" />
                Fill Demo Credentials
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-[#0f2942] hover:bg-[#153a5c] text-white text-xs sm:text-sm font-bold rounded-xl shadow-md shadow-slate-900/10 transition-all flex items-center justify-center gap-2 disabled:opacity-70 active:scale-99"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-cyan-400" />
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4 text-cyan-400" />
                </>
              )}
            </button>
          </form>

          {/* Official Security Disclaimer */}
          <div className="p-3.5 rounded-xl bg-slate-100 border border-slate-200 text-[11px] text-slate-500 text-center leading-relaxed shadow-2xs">
            Authorized for use by designated Legal Metrology Officers under the Standards of Weights and Measures Act. Unauthorized access is strictly prohibited.
          </div>
        </div>
      </div>
    </div>
  );
};
