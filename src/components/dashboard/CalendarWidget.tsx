'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { useCalendar } from '@/context/CalendarContext';

export const CalendarWidget: React.FC = () => {
  const { selectedDate, setSelectedDate, showToast } = useCalendar();
  const [currentMonthIndex, setCurrentMonthIndex] = useState(4); // 4 = May

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const weekDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  // Days matrix matching May 2025 (May 1st is Thursday)
  // Prev month padded dates (April 27..30)
  const prevMonthDates = [27, 28, 29, 30];
  const currentMonthDays = Array.from({ length: 31 }, (_, i) => i + 1);

  // Dates with scheduled meetings
  const datesWithMeetings = new Set([6, 12, 14, 16, 20, 21, 27, 30]);

  const handlePrevMonth = () => {
    setCurrentMonthIndex((prev) => (prev > 0 ? prev - 1 : 11));
  };

  const handleNextMonth = () => {
    setCurrentMonthIndex((prev) => (prev < 11 ? prev + 1 : 0));
  };

  return (
    <div className="bg-white rounded-3xl border border-[#E8E4DB] p-5 shadow-2xs">
      {/* Month & Navigation Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-bold text-[#1E293B]">
          {months[currentMonthIndex]} 2025
        </h3>
        <div className="flex items-center gap-1">
          <button
            onClick={handlePrevMonth}
            className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors"
            aria-label="Previous Month"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleNextMonth}
            className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors"
            aria-label="Next Month"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Weekday Names Header */}
      <div className="grid grid-cols-7 gap-1 text-center mb-2">
        {weekDays.map((day) => (
          <span key={day} className="text-[10px] font-bold text-[#94A3B8] tracking-wider">
            {day}
          </span>
        ))}
      </div>

      {/* Dates Grid */}
      <div className="grid grid-cols-7 gap-1 text-center text-xs">
        {/* Previous Month Padding */}
        {prevMonthDates.map((day) => (
          <div key={`prev-${day}`} className="h-8 flex items-center justify-center text-slate-300">
            {day}
          </div>
        ))}

        {/* Current Month Days */}
        {currentMonthDays.map((day) => {
          const isSelected = selectedDate === day;
          const hasMeeting = datesWithMeetings.has(day);

          return (
            <button
              key={day}
              onClick={() => {
                setSelectedDate(day);
                showToast(`Selected date May ${day}, 2025`);
              }}
              className="h-8 flex flex-col items-center justify-center relative rounded-full transition-all hover:bg-slate-100 group"
            >
              <span
                className={`w-7 h-7 flex items-center justify-center rounded-full text-xs font-semibold ${
                  isSelected
                    ? 'bg-[#1B4D3E] text-white shadow-xs'
                    : 'text-[#1E293B] group-hover:text-[#1B4D3E]'
                }`}
              >
                {day}
              </span>
              {hasMeeting && !isSelected && (
                <span className="w-1 h-1 bg-emerald-600 rounded-full absolute bottom-0.5" />
              )}
            </button>
          );
        })}
      </div>

      {/* View Full Calendar Button */}
      <button
        onClick={() => showToast('Opening Full Calendar view')}
        className="w-full mt-4 py-2.5 px-4 rounded-xl border border-[#E8E4DB] hover:bg-[#FAF8F5] text-[#1B4D3E] text-xs font-bold flex items-center justify-center gap-2 transition-colors"
      >
        <CalendarIcon className="w-4 h-4" />
        <span>View full calendar</span>
      </button>
    </div>
  );
};
