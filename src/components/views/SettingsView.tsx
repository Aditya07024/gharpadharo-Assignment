'use client';

import React, { useState } from 'react';
import { Settings, User, Bell, Lock, Palette, Save } from 'lucide-react';
import { useCalendar } from '@/context/CalendarContext';

export const SettingsView: React.FC = () => {
  const { showToast } = useCalendar();
  const [activeSubTab, setActiveSubTab] = useState<'profile' | 'notifications' | 'security'>('profile');

  const [name, setName] = useState('Aditya');
  const [email, setEmail] = useState('aditya.dev@gmail.com');
  const [company, setCompany] = useState('Gharpadharo Tech');
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [reminderSms, setReminderSms] = useState(false);

  const handleSave = () => {
    showToast('Settings saved successfully!');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white border border-[#E8E4DB] shadow-2xs">
        <div>
          <h1 className="text-2xl font-bold text-[#1E293B]">Account Settings</h1>
          <p className="text-xs text-[#64748B] mt-1">
            Manage your personal details, email notification preferences, and security settings.
          </p>
        </div>
        <button
          onClick={handleSave}
          className="px-5 py-2.5 rounded-full bg-[#1B4D3E] hover:bg-[#143C30] text-white text-xs font-bold shadow-md transition-all flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          <span>Save Preferences</span>
        </button>
      </div>

      {/* Sub Tabs */}
      <div className="flex items-center gap-2 border-b border-[#E8E5DE] pb-2">
        {[
          { id: 'profile', label: 'Profile & Details', icon: User },
          { id: 'notifications', label: 'Notifications', icon: Bell },
          { id: 'security', label: 'Security & Password', icon: Lock },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as typeof activeSubTab)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all ${
                isActive
                  ? 'bg-[#1B4D3E] text-white shadow-xs'
                  : 'text-[#64748B] hover:text-[#1E293B] hover:bg-white'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Panels */}
      {activeSubTab === 'profile' && (
        <div className="bg-white rounded-3xl border border-[#E8E4DB] p-6 shadow-2xs space-y-4">
          <h2 className="text-base font-bold text-[#1E293B]">Personal Profile</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 bg-[#FAF8F5] focus:outline-none focus:border-[#1B4D3E]"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 bg-[#FAF8F5] focus:outline-none focus:border-[#1B4D3E]"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Company / Organization</label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 bg-[#FAF8F5] focus:outline-none focus:border-[#1B4D3E]"
              />
            </div>
          </div>
        </div>
      )}

      {activeSubTab === 'notifications' && (
        <div className="bg-white rounded-3xl border border-[#E8E4DB] p-6 shadow-2xs space-y-4">
          <h2 className="text-base font-bold text-[#1E293B]">Notification Settings</h2>
          <div className="space-y-3 text-xs font-medium text-slate-700">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={() => setEmailAlerts(!emailAlerts)}
                className="w-4 h-4 rounded text-[#1B4D3E]"
              />
              <span>Send instant email notification when a client schedules a new meeting</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={reminderSms}
                onChange={() => setReminderSms(!reminderSms)}
                className="w-4 h-4 rounded text-[#1B4D3E]"
              />
              <span>Send 15-minute SMS reminder before scheduled calls</span>
            </label>
          </div>
        </div>
      )}

      {activeSubTab === 'security' && (
        <div className="bg-white rounded-3xl border border-[#E8E4DB] p-6 shadow-2xs space-y-4">
          <h2 className="text-base font-bold text-[#1E293B]">Security & Password</h2>
          <div className="max-w-md space-y-3">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Current Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-2 rounded-xl border border-slate-200 text-xs bg-[#FAF8F5]"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">New Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-2 rounded-xl border border-slate-200 text-xs bg-[#FAF8F5]"
              />
            </div>

            <button
              onClick={() => showToast('Password updated successfully')}
              className="px-4 py-2 rounded-full bg-[#1B4D3E] text-white text-xs font-bold"
            >
              Update Password
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
