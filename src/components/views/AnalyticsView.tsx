'use client';

import React from 'react';
import { BarChart3, TrendingUp, Clock, Calendar, IndianRupee, Video, Users } from 'lucide-react';
import { useCalendar } from '@/context/CalendarContext';

export const AnalyticsView: React.FC = () => {
  const { showToast } = useCalendar();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white border border-[#E8E4DB] shadow-2xs">
        <div>
          <h1 className="text-2xl font-bold text-[#1E293B]">Analytics & Insights</h1>
          <p className="text-xs text-[#64748B] mt-1">
            Track meeting volume, revenue growth, and platform performance metrics.
          </p>
        </div>
        <button
          onClick={() => showToast('Exporting analytics report as CSV...')}
          className="px-5 py-2.5 rounded-full bg-[#1B4D3E] hover:bg-[#143C30] text-white text-xs font-bold shadow-md transition-all flex items-center gap-2"
        >
          <BarChart3 className="w-4 h-4" />
          <span>Export Report</span>
        </button>
      </div>

      {/* Top 4 Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Meetings Booked', value: '142', trend: '+14.2%', icon: Calendar, bg: 'bg-emerald-50 text-emerald-700' },
          { label: 'Completion Rate', value: '96.4%', trend: '+2.1%', icon: TrendingUp, bg: 'bg-teal-50 text-teal-700' },
          { label: 'Avg Call Duration', value: '38 mins', trend: '-4 mins', icon: Clock, bg: 'bg-amber-50 text-amber-700' },
          { label: 'Total Revenue', value: '₹2,46,800', trend: '+18.5%', icon: IndianRupee, bg: 'bg-amber-100 text-amber-800' },
        ].map((item, i) => {
          const Icon = item.icon;
          return (
            <div key={i} className="p-5 rounded-3xl bg-white border border-[#E8E4DB] shadow-2xs space-y-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.bg}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-semibold text-[#64748B] block">{item.label}</span>
                <span className="text-2xl font-extrabold text-[#1E293B] tracking-tight">{item.value}</span>
              </div>
              <span className="text-xs font-bold text-emerald-600 block">{item.trend} vs last month</span>
            </div>
          );
        })}
      </div>

      {/* Visual Progress & Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Weekly Density Chart (8 Cols) */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-[#E8E4DB] p-6 shadow-2xs space-y-4">
          <h2 className="text-base font-bold text-[#1E293B]">Weekly Meeting Density</h2>
          <div className="h-48 flex items-end justify-between gap-3 pt-6 px-4">
            {[
              { day: 'Mon', count: 18, height: 'h-28' },
              { day: 'Tue', count: 26, height: 'h-40' },
              { day: 'Wed', count: 32, height: 'h-44' },
              { day: 'Thu', count: 22, height: 'h-36' },
              { day: 'Fri', count: 15, height: 'h-24' },
              { day: 'Sat', count: 6, height: 'h-10' },
              { day: 'Sun', count: 4, height: 'h-8' },
            ].map((bar) => (
              <div key={bar.day} className="flex-1 flex flex-col items-center gap-2 group">
                <span className="text-[10px] font-bold text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">
                  {bar.count}
                </span>
                <div className={`w-full max-w-[36px] rounded-t-xl bg-[#1B4D3E] ${bar.height} group-hover:bg-[#143C30] transition-colors`} />
                <span className="text-xs font-bold text-slate-600">{bar.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Platform Share (4 Cols) */}
        <div className="lg:col-span-4 bg-white rounded-3xl border border-[#E8E4DB] p-6 shadow-2xs space-y-4">
          <h2 className="text-base font-bold text-[#1E293B]">Platform Breakdown</h2>
          <div className="space-y-4">
            {[
              { platform: 'Google Meet', percentage: 58, color: 'bg-emerald-600' },
              { platform: 'Zoom Video', percentage: 28, color: 'bg-blue-500' },
              { platform: 'Microsoft Teams', percentage: 14, color: 'bg-indigo-600' },
            ].map((p) => (
              <div key={p.platform} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                  <span>{p.platform}</span>
                  <span>{p.percentage}%</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
                  <div className={`h-full rounded-full ${p.color}`} style={{ width: `${p.percentage}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
