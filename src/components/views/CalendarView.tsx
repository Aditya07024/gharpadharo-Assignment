'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Plus, CheckCircle2, Clock } from 'lucide-react';
import { useCalendar } from '@/context/CalendarContext';
import { Meeting } from '@/types';

interface CalendarViewProps {
  onOpenNewMeeting: () => void;
}

export const CalendarView: React.FC<CalendarViewProps> = ({ onOpenNewMeeting }) => {
  const { meetings, selectedDate, setSelectedDate, showToast } = useCalendar();
  const [currentMonthIndex, setCurrentMonthIndex] = useState(4); // May

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const prevMonthDates = [27, 28, 29, 30];
  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);

  // Filter events for currently selected day
  const selectedDayEvents = meetings.filter((m: Meeting) => {
    if (selectedDate === 20 && m.dateLabel === 'Today') return true;
    if (selectedDate === 21 && m.dateLabel === 'Tomorrow') return true;
    return false;
  });

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white border border-[#E8E4DB] shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#1B4D3E] text-white flex items-center justify-center font-bold">
            <CalendarIcon className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[#1E293B]">Calendar Overview</h1>
            <p className="text-xs text-[#64748B]">View and manage all scheduled events across your calendars.</p>
          </div>
        </div>
        <button
          onClick={onOpenNewMeeting}
          className="px-5 py-2.5 rounded-full bg-[#1B4D3E] hover:bg-[#143C30] text-white text-xs font-bold shadow-md transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>New Event</span>
        </button>
      </div>

      {/* Grid Layout: Calendar (8 Cols) + Agenda Panel (4 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Monthly Grid */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-[#E8E4DB] p-6 shadow-2xs">
          {/* Controls */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentMonthIndex((prev) => (prev > 0 ? prev - 1 : 11))}
                className="p-2 rounded-xl hover:bg-slate-100 text-slate-600 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <h2 className="text-lg font-extrabold text-[#1E293B]">
                {months[currentMonthIndex]} 2025
              </h2>
              <button
                onClick={() => setCurrentMonthIndex((prev) => (prev < 11 ? prev + 1 : 0))}
                className="p-2 rounded-xl hover:bg-slate-100 text-slate-600 transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <button
              onClick={() => {
                setSelectedDate(20);
                showToast('Reset view to Today (May 20, 2025)');
              }}
              className="px-3.5 py-1.5 rounded-full border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50"
            >
              Today
            </button>
          </div>

          {/* Weekday Headers */}
          <div className="grid grid-cols-7 text-center font-bold text-xs text-[#94A3B8] mb-3">
            {weekDays.map((d) => (
              <span key={d}>{d}</span>
            ))}
          </div>

          {/* Days Matrix */}
          <div className="grid grid-cols-7 gap-2 text-center text-xs">
            {prevMonthDates.map((d) => (
              <div key={`p-${d}`} className="h-20 p-2 rounded-2xl bg-[#FAF8F5]/40 text-slate-300">
                {d}
              </div>
            ))}

            {daysInMonth.map((day) => {
              const isSelected = selectedDate === day;
              const hasEvents = day === 20 || day === 21 || day === 14 || day === 27;

              return (
                <button
                  key={day}
                  onClick={() => {
                    setSelectedDate(day);
                    showToast(`Selected May ${day}, 2025`);
                  }}
                  className={`h-20 p-2 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'border-[#1B4D3E] bg-[#EAF4EF] shadow-2xs'
                      : 'border-slate-100 hover:border-slate-300 bg-white'
                  }`}
                >
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                      isSelected ? 'bg-[#1B4D3E] text-white' : 'text-slate-800'
                    }`}
                  >
                    {day}
                  </span>

                  {hasEvents && (
                    <div className="w-full truncate px-1.5 py-0.5 rounded-md bg-[#1B4D3E]/10 text-[#1B4D3E] text-[10px] font-bold">
                      {day === 20 ? '4 Meetings' : day === 21 ? '3 Synced' : '2 Events'}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Side Agenda Panel */}
        <div className="lg:col-span-4 bg-white rounded-3xl border border-[#E8E4DB] p-6 shadow-2xs space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-base font-bold text-[#1E293B]">
              Agenda • May {selectedDate}, 2025
            </h3>
            <p className="text-xs text-[#64748B] mt-0.5">
              {selectedDayEvents.length} meeting(s) scheduled
            </p>
          </div>

          <div className="space-y-3">
            {selectedDayEvents.length === 0 ? (
              <div className="py-8 text-center text-slate-400 text-xs">
                No events scheduled for May {selectedDate}.
              </div>
            ) : (
              selectedDayEvents.map((m: Meeting) => (
                <div
                  key={m.id}
                  className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#E8E5DE] space-y-2"
                >
                  <div className="flex items-center justify-between text-xs font-bold text-[#1E293B]">
                    <span>{m.title}</span>
                    <span className="text-[#1B4D3E] bg-emerald-50 px-2 py-0.5 rounded-md">
                      {m.time}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">{m.subtitle}</p>
                  {m.isGoogleSynced && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                      <CheckCircle2 className="w-3 h-3" />
                      Google Calendar Synced
                    </span>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
