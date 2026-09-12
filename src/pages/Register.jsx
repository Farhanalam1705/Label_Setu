import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AlertCircle,
  Building2,
  CheckCircle2,
  Eye,
  EyeOff,
  Lock,
  Mail,
  UserRound,
} from 'lucide-react';
import { LabelSetuLogo } from '../components/common/LabelSetuLogo';

const CUSTOMERS_KEY = 'labelsetu_customers';

export const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    customerName: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
    terms: false,
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: '' }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = {};
    const email = form.email.trim().toLowerCase();

    if (!form.customerName.trim()) nextErrors.customerName = 'Customer / Business Name is required.';
    if (!email) {
      nextErrors.email = 'Email Address is required.';
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      nextErrors.email = 'Enter a valid email address.';
    }
    if (!form.mobile.trim()) nextErrors.mobile = 'Mobile Number is required.';
    if (!form.password) {
      nextErrors.password = 'Password is required.';
    } else if (form.password.length < 8) {
      nextErrors.password = 'Password must be at least 8 characters.';
    }
    if (!form.confirmPassword) {
      nextErrors.confirmPassword = 'Please confirm your password.';
    } else if (form.confirmPassword !== form.password) {
      nextErrors.confirmPassword = 'Passwords do not match.';
    }
    if (!form.terms) nextErrors.terms = 'You must accept the Terms and Conditions.';

    let customers = [];
    try {
      const storedCustomers = JSON.parse(localStorage.getItem(CUSTOMERS_KEY) || '[]');
      customers = Array.isArray(storedCustomers) ? storedCustomers : [];
    } catch {
      customers = [];
    }

    if (email && customers.some((customer) => customer.email?.toLowerCase() === email)) {
      nextErrors.email = 'An account with this email already exists.';
    }

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    localStorage.setItem(
      CUSTOMERS_KEY,
      JSON.stringify([
        ...customers,
        {
          customerName: form.customerName.trim(),
          email,
          mobile: form.mobile.trim(),
          role: 'customer',
        },
      ])
    );
    setIsComplete(true);
  };

  const inputClass = (hasError) => `w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-white text-slate-900 placeholder-slate-400 border rounded-xl focus:outline-hidden focus:ring-2 focus:border-transparent transition-all shadow-2xs ${
    hasError ? 'border-rose-400 focus:ring-rose-500' : 'border-slate-300 focus:ring-rose-600'
  }`;

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-slate-50 text-slate-900 font-sans">
      <div className="lg:w-1/2 p-8 sm:p-12 lg:p-16 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-slate-800 relative overflow-hidden text-white bg-gradient-to-br from-[#1b0a1a] via-[#2f102c] to-[#4c163f]">
        <div className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full blur-3xl pointer-events-none bg-rose-500/15" />
        <div className="max-w-xl mx-auto w-full relative z-10 space-y-8">
          <div className="flex items-center gap-4">
            <LabelSetuLogo className="w-16 h-16 shadow-xl ring-2 ring-rose-400/30" />
            <div>
              <h1 className="text-3xl font-extrabold tracking-wider text-white">LABEL SETU</h1>
              <p className="text-sm font-medium mt-0.5 text-rose-200/90">AI-Assisted Legal Metrology Compliance Checker</p>
            </div>
          </div>

          <div className="space-y-4 pt-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold border bg-rose-950/70 border-rose-500/30 text-rose-300">
              <Building2 className="w-4 h-4 text-rose-400" />
              <span>Manufacturer & Packer Self-Verification Portal</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight">
              Track product compliance, verification results & statutory label reports.
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Empowering manufacturers, packers, importers, and brand owners to monitor packaging declarations, view verification status, and ensure regulatory standards compliance.
            </p>
          </div>
        </div>
      </div>

      <div className="lg:w-1/2 bg-slate-50 text-slate-900 p-8 sm:p-12 lg:p-16 flex items-center justify-center">
        <div className="w-full max-w-md space-y-7">
          {isComplete ? (
            <div className="space-y-7 text-center">
              <div className="space-y-3">
                <div className="w-14 h-14 mx-auto rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center">
                  <CheckCircle2 className="w-7 h-7 text-emerald-600" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">Account Created Successfully</h2>
                <p className="text-xs sm:text-sm text-slate-500">Your customer account has been created successfully.</p>
              </div>
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="w-full py-3 px-4 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 active:scale-99 cursor-pointer bg-[#431238] hover:bg-[#57184a] shadow-rose-950/20"
              >
                Back to Login
              </button>
            </div>
          ) : (
            <>
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded border inline-block shadow-2xs text-rose-700 bg-rose-50 border-rose-200">LABEL SETU</span>
                <p className="text-xs font-bold uppercase tracking-wider text-rose-800">AI-Assisted Legal Metrology Compliance Checker</p>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">Create Customer Account</h2>
                <p className="text-xs sm:text-sm text-slate-500">Register your account to access LABEL SETU.</p>
              </div>

              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <Field label="Customer / Business Name" error={errors.customerName}>
                  <UserRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input value={form.customerName} onChange={(event) => updateField('customerName', event.target.value)} className={inputClass(errors.customerName)} placeholder="Business name" />
                </Field>
                <Field label="Email Address" error={errors.email}>
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input type="email" value={form.email} onChange={(event) => updateField('email', event.target.value)} className={inputClass(errors.email)} placeholder="name@business.com" />
                </Field>
                <Field label="Mobile Number" error={errors.mobile}>
                  <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input type="tel" value={form.mobile} onChange={(event) => updateField('mobile', event.target.value)} className={inputClass(errors.mobile)} placeholder="Mobile number" />
                </Field>
                <Field label="Password" error={errors.password}>
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input type={showPassword ? 'text' : 'password'} value={form.password} onChange={(event) => updateField('password', event.target.value)} className={inputClass(errors.password) + ' pr-11'} placeholder="••••••••" />
                  <PasswordToggle shown={showPassword} onClick={() => setShowPassword((shown) => !shown)} />
                </Field>
                <Field label="Confirm Password" error={errors.confirmPassword}>
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input type={showConfirmPassword ? 'text' : 'password'} value={form.confirmPassword} onChange={(event) => updateField('confirmPassword', event.target.value)} className={inputClass(errors.confirmPassword) + ' pr-11'} placeholder="••••••••" />
                  <PasswordToggle shown={showConfirmPassword} onClick={() => setShowConfirmPassword((shown) => !shown)} />
                </Field>

                <div className="space-y-1.5">
                  <label className="flex items-start gap-2 cursor-pointer select-none text-xs text-slate-600">
                    <input type="checkbox" checked={form.terms} onChange={(event) => updateField('terms', event.target.checked)} className="mt-0.5 w-4 h-4 rounded border-slate-300 text-rose-600 focus:ring-rose-500" />
                    <span className="font-medium text-slate-700">I agree to the Terms and Conditions</span>
                  </label>
                  {errors.terms && <ErrorText>{errors.terms}</ErrorText>}
                </div>

                <button type="submit" className="w-full py-3 px-4 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 active:scale-99 cursor-pointer bg-[#431238] hover:bg-[#57184a] shadow-rose-950/20">
                  Create Account
                </button>
              </form>

              <div className="pt-2 text-center text-xs text-slate-500 border-t border-slate-200">
                <span>Already have an account? </span>
                <button type="button" onClick={() => navigate('/login')} className="font-bold text-rose-700 hover:text-rose-800 hover:underline cursor-pointer ml-1">Login</button>
              </div>
            </>
          )}

          <div className="p-3.5 rounded-xl bg-slate-100 border border-slate-200 text-[11px] text-slate-500 text-center leading-relaxed shadow-2xs">
            Authorized for registered manufacturers, packers, importers, and brand owners for tracking compliance and reports. Unauthorized access is strictly prohibited.
          </div>
        </div>
      </div>
    </div>
  );
};

const Field = ({ label, error, children }) => (
  <div className="space-y-1.5">
    <label className="text-xs font-bold text-slate-700">{label}</label>
    <div className="relative">{children}</div>
    {error && <ErrorText>{error}</ErrorText>}
  </div>
);

const ErrorText = ({ children }) => (
  <p className="text-xs font-medium text-rose-700 flex items-center gap-1.5">
    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
    {children}
  </p>
);

const PasswordToggle = ({ shown, onClick }) => (
  <button type="button" onClick={onClick} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-rose-700 cursor-pointer" aria-label={shown ? 'Hide password' : 'Show password'}>
    {shown ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
  </button>
);
