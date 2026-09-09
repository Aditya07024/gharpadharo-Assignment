'use client';

import React from 'react';
import { CheckCircle2, X } from 'lucide-react';
import { useCalendar } from '@/context/CalendarContext';

export const Toast: React.FC = () => {
  const { toastMessage, showToast } = useCalendar();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
      <div className="bg-[#1E293B] text-white px-4 py-3 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-3 text-xs font-semibold max-w-sm">
        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
        <span className="flex-1">{toastMessage}</span>
        <button
          onClick={() => showToast('')}
          className="p-1 text-slate-400 hover:text-white rounded-lg"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
