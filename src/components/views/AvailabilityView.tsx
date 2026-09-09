'use client';

import React, { useState } from 'react';
import { Clock, Globe, Plus, Trash2, Check, Save } from 'lucide-react';
import { useCalendar } from '@/context/CalendarContext';

export const AvailabilityView: React.FC = () => {
  const { showToast } = useCalendar();
  const [timezone, setTimezone] = useState('Asia/Kolkata (GMT+05:30)');
  const [bufferBefore, setBufferBefore] = useState('10 mins');
  const [bufferAfter, setBufferAfter] = useState('15 mins');

  const [schedule, setSchedule] = useState([
    { day: 'Monday', enabled: true, startTime: '09:00 AM', endTime: '05:00 PM' },
    { day: 'Tuesday', enabled: true, startTime: '09:00 AM', endTime: '05:00 PM' },
    { day: 'Wednesday', enabled: true, startTime: '09:00 AM', endTime: '05:00 PM' },
    { day: 'Thursday', enabled: true, startTime: '09:00 AM', endTime: '05:00 PM' },
    { day: 'Friday', enabled: true, startTime: '09:00 AM', endTime: '04:00 PM' },
    { day: 'Saturday', enabled: false, startTime: '10:00 AM', endTime: '02:00 PM' },
    { day: 'Sunday', enabled: false, startTime: '10:00 AM', endTime: '02:00 PM' },
  ]);

  const toggleDay = (index: number) => {
    setSchedule((prev) =>
      prev.map((item, i) => (i === index ? { ...item, enabled: !item.enabled } : item))
    );
  };

  const handleSave = () => {
    showToast('Availability settings saved successfully!');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white border border-[#E8E4DB] shadow-2xs">
        <div>
          <h1 className="text-2xl font-bold text-[#1E293B]">Availability Settings</h1>
          <p className="text-xs text-[#64748B] mt-1">
            Configure your available working hours, timezone, and meeting buffer times.
          </p>
        </div>
        <button
          onClick={handleSave}
          className="px-5 py-2.5 rounded-full bg-[#1B4D3E] hover:bg-[#143C30] text-white text-xs font-bold shadow-md transition-all flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </div>

      {/* Timezone & Buffer Settings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl border border-[#E8E4DB] p-6 shadow-2xs space-y-3">
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-[#1B4D3E]" />
            <h3 className="text-sm font-bold text-[#1E293B]">Timezone</h3>
          </div>
          <select
            value={timezone}
            onChange={(e) => setTimezone(e.target.value)}
            className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 text-xs font-semibold text-slate-800 bg-[#FAF8F5] focus:outline-none focus:border-[#1B4D3E]"
          >
            <option value="Asia/Kolkata (GMT+05:30)">Asia/Kolkata (IST • GMT+05:30)</option>
            <option value="America/New_York (GMT-05:00)">America/New_York (EST • GMT-05:00)</option>
            <option value="Europe/London (GMT+00:00)">Europe/London (GMT • GMT+00:00)</option>
            <option value="Asia/Tokyo (GMT+09:00)">Asia/Tokyo (JST • GMT+09:00)</option>
          </select>
        </div>

        <div className="bg-white rounded-3xl border border-[#E8E4DB] p-6 shadow-2xs space-y-3">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-[#1B4D3E]" />
            <h3 className="text-sm font-bold text-[#1E293B]">Meeting Buffers</h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-bold text-slate-500 block mb-1">Before Event</label>
              <input
                type="text"
                value={bufferBefore}
                onChange={(e) => setBufferBefore(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 bg-[#FAF8F5]"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-500 block mb-1">After Event</label>
              <input
                type="text"
                value={bufferAfter}
                onChange={(e) => setBufferAfter(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 bg-[#FAF8F5]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Hours Schedule */}
      <div className="bg-white rounded-3xl border border-[#E8E4DB] p-6 shadow-2xs space-y-4">
        <h2 className="text-base font-bold text-[#1E293B] border-b border-slate-100 pb-3">
          Weekly Hours
        </h2>

        <div className="space-y-3">
          {schedule.map((item, index) => (
            <div
              key={item.day}
              className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${
                item.enabled
                  ? 'bg-[#FAF8F5] border-[#E8E5DE]'
                  : 'bg-slate-50/50 border-slate-200/50 opacity-60'
              }`}
            >
              <div className="flex items-center gap-4 min-w-[140px]">
                <input
                  type="checkbox"
                  checked={item.enabled}
                  onChange={() => toggleDay(index)}
                  className="w-4 h-4 rounded text-[#1B4D3E] focus:ring-[#1B4D3E]"
                />
                <span className="text-xs font-bold text-slate-800">{item.day}</span>
              </div>

              {item.enabled ? (
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={item.startTime}
                    onChange={(e) => {
                      const val = e.target.value;
                      setSchedule((prev) =>
                        prev.map((s, i) => (i === index ? { ...s, startTime: val } : s))
                      );
                    }}
                    className="w-24 px-3 py-1.5 rounded-xl border border-slate-200 text-xs text-center bg-white font-semibold text-slate-700"
                  />
                  <span className="text-xs font-bold text-slate-400">-</span>
                  <input
                    type="text"
                    value={item.endTime}
                    onChange={(e) => {
                      const val = e.target.value;
                      setSchedule((prev) =>
                        prev.map((s, i) => (i === index ? { ...s, endTime: val } : s))
                      );
                    }}
                    className="w-24 px-3 py-1.5 rounded-xl border border-slate-200 text-xs text-center bg-white font-semibold text-slate-700"
                  />
                </div>
              ) : (
                <span className="text-xs font-bold text-slate-400">Unavailable</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
