import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Shield, Mail, Phone, Hash, Building, LogOut, Check, Edit3, Save } from 'lucide-react';
import { logout } from '../../services/auth';
import { useToast } from '../common/Toast';

export const ProfileSettings = ({ profile, onSaveProfile }) => {
  const navigate = useNavigate();
  const { addToast } = useToast();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...profile });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    onSaveProfile(formData);
    setIsEditing(false);
    addToast({
      title: 'Profile Saved',
      message: 'Profile updated successfully.',
      type: 'success',
    });
  };

  const handleLogout = () => {
    logout();
    addToast({
      title: 'Signed Out',
      message: 'You have been signed out successfully.',
      type: 'info',
    });
    navigate('/login', { replace: true });
  };

  return (
    <div className="space-y-6">
      {/* Profile Overview Card */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#0c1e33] text-cyan-400 font-black text-xl flex items-center justify-center shadow-md ring-4 ring-cyan-500/20">
              {formData.fullName?.split(' ').map((n) => n[0]).slice(0, 2).join('') || 'OF'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-slate-900">{formData.fullName}</h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300 uppercase">
                  Active Officer
                </span>
              </div>
              <p className="text-xs text-slate-500">{formData.role} • {formData.department}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {!isEditing ? (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-slate-800 hover:text-slate-950 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-xl transition-colors cursor-pointer shadow-2xs"
              >
                <Edit3 className="w-3.5 h-3.5 text-slate-600" />
                <span>Edit Profile</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSave}
                className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-bold text-white bg-[#0c1e33] hover:bg-slate-800 rounded-xl transition-all shadow-xs cursor-pointer"
              >
                <Save className="w-3.5 h-3.5 text-cyan-400" />
                <span>Save Changes</span>
              </button>
            )}
          </div>
        </div>

        {/* Profile Information Form */}
        <form onSubmit={handleSave} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="space-y-1.5">
            <label className="text-slate-500 font-semibold block flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-slate-400" />
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full px-3.5 py-2.5 bg-slate-50 disabled:bg-slate-50/60 border border-slate-200 disabled:border-slate-200/80 rounded-xl font-bold text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-slate-500 font-semibold block flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-slate-400" />
              Role
            </label>
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full px-3.5 py-2.5 bg-slate-50 disabled:bg-slate-50/60 border border-slate-200 disabled:border-slate-200/80 rounded-xl font-semibold text-slate-800 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-slate-500 font-semibold block flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-slate-400" />
              Department
            </label>
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full px-3.5 py-2.5 bg-slate-50 disabled:bg-slate-50/60 border border-slate-200 disabled:border-slate-200/80 rounded-xl font-semibold text-slate-800 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-slate-500 font-semibold block flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              Official Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full px-3.5 py-2.5 bg-slate-50 disabled:bg-slate-50/60 border border-slate-200 disabled:border-slate-200/80 rounded-xl font-mono text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-slate-500 font-semibold block flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-slate-400" />
              Phone
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full px-3.5 py-2.5 bg-slate-50 disabled:bg-slate-50/60 border border-slate-200 disabled:border-slate-200/80 rounded-xl font-medium text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-slate-500 font-semibold block flex items-center gap-1.5">
              <Hash className="w-3.5 h-3.5 text-slate-400" />
              Employee ID
            </label>
            <input
              type="text"
              name="employeeId"
              value={formData.employeeId}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full px-3.5 py-2.5 bg-slate-50 disabled:bg-slate-50/60 border border-slate-200 disabled:border-slate-200/80 rounded-xl font-mono font-bold text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all"
            />
          </div>

          {isEditing && (
            <div className="col-span-1 sm:col-span-2 flex justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => {
                  setFormData({ ...profile });
                  setIsEditing(false);
                }}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 bg-slate-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-bold text-white bg-[#0c1e33] hover:bg-slate-800 rounded-xl shadow-xs"
              >
                Save Changes
              </button>
            </div>
          )}
        </form>
      </div>

      {/* Account Actions Box */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h4 className="text-xs font-bold text-slate-900">Account Session</h4>
          <p className="text-[11px] text-slate-500">Sign out of this workstation session.</p>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-xl transition-colors cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};
