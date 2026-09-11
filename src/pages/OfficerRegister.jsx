import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AlertCircle,
  Building2,
  CheckCircle2,
  Eye,
  EyeOff,
  IdCard,
  Lock,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  UserRound,
} from 'lucide-react';
import { LabelSetuLogo } from '../components/common/LabelSetuLogo';

const OFFICERS_KEY = 'labelsetu_officer_registrations';

export const OfficerRegister = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    officerId: '',
    department: '',
    office: '',
    mobile: '',
    password: '',
    confirmPassword: '',
    policy: false,
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
    const officerId = form.officerId.trim();

    if (!form.name.trim()) nextErrors.name = 'Officer Name is required.';
    if (!email) {
      nextErrors.email = 'Official Email is required.';
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      nextErrors.email = 'Enter a valid official email address.';
    }
    if (!officerId) nextErrors.officerId = 'Employee / Officer ID is required.';
    if (!form.department.trim()) nextErrors.department = 'Department is required.';
    if (!form.office.trim()) nextErrors.office = 'Office / District is required.';
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
    if (!form.policy) nextErrors.policy = 'You must agree to the authorized officer usage policy.';

    let registrations = [];
    try {
      const storedRegistrations = JSON.parse(localStorage.getItem(OFFICERS_KEY) || '[]');
      registrations = Array.isArray(storedRegistrations) ? storedRegistrations : [];
    } catch {
      registrations = [];
    }

    if (email && registrations.some((officer) => officer.email?.toLowerCase() === email)) {
      nextErrors.email = 'An officer registration with this email already exists.';
    }
    if (officerId && registrations.some((officer) => officer.officerId?.toLowerCase() === officerId.toLowerCase())) {
      nextErrors.officerId = 'An officer registration with this ID already exists.';
    }

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    localStorage.setItem(
      OFFICERS_KEY,
      JSON.stringify([
        ...registrations,
        {
          officerId,
          name: form.name.trim(),
          email,
          department: form.department.trim(),
          office: form.office.trim(),
          mobile: form.mobile.trim(),
          role: 'officer',
          status: 'PENDING_APPROVAL',
        },
      ])
    );
    setIsComplete(true);
  };

  const inputClass = (hasError) => `w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-white text-slate-900 placeholder-slate-400 border rounded-xl focus:outline-hidden focus:ring-2 focus:border-transparent transition-all shadow-2xs ${
    hasError ? 'border-rose-400 focus:ring-rose-500' : 'border-slate-300 focus:ring-cyan-600'
  }`;

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-slate-50 text-slate-900 font-sans">
      <div className="lg:w-1/2 p-8 sm:p-12 lg:p-16 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-slate-800 relative overflow-hidden text-white bg-gradient-to-br from-[#0a192f] via-[#0f2942] to-[#133e63]">
        <div className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full blur-3xl pointer-events-none bg-cyan-500/10" />
        <div className="max-w-xl mx-auto w-full relative z-10 space-y-8">
          <div className="flex items-center gap-4">
            <LabelSetuLogo className="w-16 h-16 shadow-xl ring-2 ring-cyan-400/30" />
            <div>
              <h1 className="text-3xl font-extrabold tracking-wider text-white">LABEL SETU</h1>
              <p className="text-sm font-medium mt-0.5 text-cyan-200/90">AI-Powered Legal Metrology Compliance Checker</p>
            </div>
          </div>
          <div className="space-y-4 pt-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold border bg-cyan-950/70 border-cyan-500/30 text-cyan-300">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Legal Metrology (Packaged Commodities) Rules, 2011</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight">AI-assisted inspection &amp; compliance verification for packaged commodities.</h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">Register for authorization to access LABEL SETU’s officer tools for inspections, evidence review, compliance results, and reports.</p>
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
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">Officer Registration Submitted</h2>
                <p className="text-xs sm:text-sm text-slate-500">Your officer account registration has been submitted for authorization.</p>
              </div>
              <div className="rounded-xl bg-slate-100 border border-slate-200 p-4 text-left text-xs space-y-2">
                <p><span className="font-bold text-slate-700">Officer ID:</span> <span className="text-slate-600">{form.officerId.trim()}</span></p>
                <p><span className="font-bold text-slate-700">Official Email:</span> <span className="text-slate-600">{form.email.trim().toLowerCase()}</span></p>
              </div>
              <button type="button" onClick={() => navigate('/login')} className="w-full py-3 px-4 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 active:scale-99 cursor-pointer bg-[#0f2942] hover:bg-[#153a5c] shadow-slate-900/10">
                Back to Login
              </button>
            </div>
          ) : (
            <>
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded border inline-block shadow-2xs text-cyan-700 bg-cyan-50 border-cyan-200">LABEL SETU</span>
                <p className="text-xs font-bold uppercase tracking-wider text-cyan-800">AI-Powered Legal Metrology Compliance Checker</p>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">Officer Registration</h2>
                <p className="text-xs sm:text-sm text-slate-500">Register an authorized Legal Metrology Officer account.</p>
              </div>

              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <Field label="Officer Name" error={errors.name}><UserRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" /><input value={form.name} onChange={(event) => updateField('name', event.target.value)} className={inputClass(errors.name)} placeholder="Officer name" /></Field>
                <Field label="Official Email" error={errors.email}><Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" /><input type="email" value={form.email} onChange={(event) => updateField('email', event.target.value)} className={inputClass(errors.email)} placeholder="officer@department.gov.in" /></Field>
                <Field label="Employee / Officer ID" error={errors.officerId}><IdCard className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" /><input value={form.officerId} onChange={(event) => updateField('officerId', event.target.value)} className={inputClass(errors.officerId)} placeholder="Officer ID" /></Field>
                <Field label="Department" error={errors.department}><Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" /><input value={form.department} onChange={(event) => updateField('department', event.target.value)} className={inputClass(errors.department)} placeholder="Legal Metrology Department" /></Field>
                <Field label="Office / District" error={errors.office}><MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" /><input value={form.office} onChange={(event) => updateField('office', event.target.value)} className={inputClass(errors.office)} placeholder="Office or district" /></Field>
                <Field label="Mobile Number" error={errors.mobile}><Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" /><input type="tel" value={form.mobile} onChange={(event) => updateField('mobile', event.target.value)} className={inputClass(errors.mobile)} placeholder="Mobile number" /></Field>
                <Field label="Password" error={errors.password}><Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" /><input type={showPassword ? 'text' : 'password'} value={form.password} onChange={(event) => updateField('password', event.target.value)} className={inputClass(errors.password) + ' pr-11'} placeholder="••••••••" /><PasswordToggle shown={showPassword} onClick={() => setShowPassword((shown) => !shown)} /></Field>
                <Field label="Confirm Password" error={errors.confirmPassword}><Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" /><input type={showConfirmPassword ? 'text' : 'password'} value={form.confirmPassword} onChange={(event) => updateField('confirmPassword', event.target.value)} className={inputClass(errors.confirmPassword) + ' pr-11'} placeholder="••••••••" /><PasswordToggle shown={showConfirmPassword} onClick={() => setShowConfirmPassword((shown) => !shown)} /></Field>
                <div className="space-y-1.5">
                  <label className="flex items-start gap-2 cursor-pointer select-none text-xs text-slate-600"><input type="checkbox" checked={form.policy} onChange={(event) => updateField('policy', event.target.checked)} className="mt-0.5 w-4 h-4 rounded border-slate-300 text-cyan-600 focus:ring-cyan-500" /><span className="font-medium text-slate-700">I agree to the authorized officer usage policy.</span></label>
                  {errors.policy && <ErrorText>{errors.policy}</ErrorText>}
                </div>
                <button type="submit" className="w-full py-3 px-4 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 active:scale-99 cursor-pointer bg-[#0f2942] hover:bg-[#153a5c] shadow-slate-900/10">Register Officer</button>
              </form>
              <div className="pt-2 text-center text-xs text-slate-500 border-t border-slate-200"><span>Already have an account? </span><button type="button" onClick={() => navigate('/login')} className="font-bold text-cyan-700 hover:text-cyan-800 hover:underline cursor-pointer ml-1">Login</button></div>
            </>
          )}
          <div className="p-3.5 rounded-xl bg-slate-100 border border-slate-200 text-[11px] text-slate-500 text-center leading-relaxed shadow-2xs">Officer registrations are subject to authorization by the Legal Metrology Department. Submission does not grant access to officer tools.</div>
        </div>
      </div>
    </div>
  );
};

const Field = ({ label, error, children }) => <div className="space-y-1.5"><label className="text-xs font-bold text-slate-700">{label}</label><div className="relative">{children}</div>{error && <ErrorText>{error}</ErrorText>}</div>;

const ErrorText = ({ children }) => <p className="text-xs font-medium text-rose-700 flex items-center gap-1.5"><AlertCircle className="w-3.5 h-3.5 shrink-0" />{children}</p>;

const PasswordToggle = ({ shown, onClick }) => <button type="button" onClick={onClick} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-cyan-700 cursor-pointer" aria-label={shown ? 'Hide password' : 'Show password'}>{shown ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button>;
