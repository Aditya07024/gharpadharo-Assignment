'use client';

import React from 'react';
import { X, Calendar, CheckCircle2, RefreshCw, LogOut, ShieldCheck, Zap } from 'lucide-react';
import { useCalendar } from '@/context/CalendarContext';

interface GoogleConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GoogleConnectModal: React.FC<GoogleConnectModalProps> = ({ isOpen, onClose }) => {
  const {
    isGoogleConnected,
    googleUser,
    isConnecting,
    connectGoogleCalendar,
    disconnectGoogleCalendar,
    showToast,
  } = useCalendar();

  if (!isOpen) return null;

  const handleConnect = async (isDemo = true) => {
    await connectGoogleCalendar(isDemo);
    onClose();
  };

  const handleDisconnect = () => {
    disconnectGoogleCalendar();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4 animate-in fade-in">
      <div className="bg-white rounded-3xl border border-[#E8E4DB] shadow-2xl w-full max-w-lg overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-[#FAF8F5]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <Calendar className="w-5 h-5 text-emerald-700" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-800">
                Google Calendar Integration
              </h3>
              <p className="text-[11px] text-slate-500">
                Sync upcoming events automatically
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200/50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          {isGoogleConnected && googleUser ? (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200 flex items-center gap-4">
                <img
                  src={googleUser.avatar}
                  alt={googleUser.name}
                  className="w-12 h-12 rounded-full border-2 border-white shadow-xs"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Account Connected</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-800 truncate mt-0.5">
                    {googleUser.name}
                  </h4>
                  <p className="text-xs text-slate-500 truncate">{googleUser.email}</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8E5DE] text-xs space-y-2">
                <div className="flex items-center justify-between text-slate-700 font-semibold">
                  <span>Synced Status</span>
                  <span className="text-emerald-700 font-bold">Active & Live</span>
                </div>
                <div className="flex items-center justify-between text-slate-500">
                  <span>Permissions Scope</span>
                  <span>calendar.readonly</span>
                </div>
              </div>

              <div className="flex items-center justify-between gap-3 pt-2">
                <button
                  onClick={() => {
                    showToast('Re-syncing Google Calendar events...');
                    onClose();
                  }}
                  className="px-4 py-2.5 rounded-full border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Sync Events Now</span>
                </button>

                <button
                  onClick={handleDisconnect}
                  className="px-4 py-2.5 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Disconnect</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8E5DE] text-xs text-slate-600 space-y-2">
                <div className="flex items-center gap-2 font-bold text-slate-800">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Secure Read-Only Access</span>
                </div>
                <p className="leading-relaxed text-[#64748B]">
                  Connecting your Google Calendar allows MeetPlan to fetch your upcoming meetings and render them directly into your dashboard timeline.
                </p>
              </div>

              {/* OAuth Button */}
              <button
                disabled={isConnecting}
                onClick={() => handleConnect(false)}
                className="w-full py-3 px-4 rounded-full bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-bold text-xs flex items-center justify-center gap-3 shadow-xs transition-all disabled:opacity-50"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>{isConnecting ? 'Connecting...' : 'Sign in with Google OAuth'}</span>
              </button>

              {/* Instant Test Mode Button */}
              <div className="relative py-1 flex items-center justify-center">
                <div className="border-t border-slate-200 w-full" />
                <span className="bg-white px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider absolute">
                  OR TEST INSTANTLY
                </span>
              </div>

              <button
                disabled={isConnecting}
                onClick={() => handleConnect(true)}
                className="w-full py-3 px-4 rounded-full bg-[#1B4D3E] hover:bg-[#143C30] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all disabled:opacity-50"
              >
                <Zap className="w-4 h-4 text-amber-300" />
                <span>Instant Demo Connection (Import Live Events)</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
