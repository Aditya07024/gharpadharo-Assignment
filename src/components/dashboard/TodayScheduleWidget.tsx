'use client';

import React from 'react';
import { MoreVertical, Video } from 'lucide-react';
import { useCalendar } from '@/context/CalendarContext';
import { MeetingPlatform, Meeting } from '@/types';

export const TodayScheduleWidget: React.FC = () => {
  const { meetings, showToast } = useCalendar();

  const getPlatformIcon = (platform: MeetingPlatform) => {
    switch (platform) {
      case 'google-meet':
        return (
          <div className="w-8 h-8 rounded-xl bg-amber-50 border border-amber-100/80 flex items-center justify-center flex-shrink-0 shadow-2xs">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5V19M5 12H19" stroke="#EA4335" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="12" cy="12" r="8" stroke="#4285F4" strokeWidth="2" />
            </svg>
          </div>
        );
      case 'zoom':
        return (
          <div className="w-8 h-8 rounded-xl bg-blue-500 flex items-center justify-center text-white flex-shrink-0 shadow-2xs">
            <Video className="w-4 h-4" />
          </div>
        );
      case 'teams':
        return (
          <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold text-xs flex-shrink-0 shadow-2xs">
            T
          </div>
        );
      default:
        return (
          <div className="w-8 h-8 rounded-xl bg-emerald-600 flex items-center justify-center text-white flex-shrink-0 shadow-2xs">
            <Video className="w-4 h-4" />
          </div>
        );
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-[#E8E4DB] p-5 md:p-6 shadow-2xs">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-base font-bold text-[#1E293B]">Today's Schedule</h3>
        <button
          onClick={() => showToast('Viewing full day schedule timeline')}
          className="text-xs font-semibold text-[#1B4D3E] hover:underline"
        >
          See full day
        </button>
      </div>

      {/* Timeline Wrapper */}
      <div className="relative space-y-4">
        {/* Continuous vertical timeline track line */}
        <div className="absolute left-[72px] top-3 bottom-3 w-[2px] bg-slate-200/80 pointer-events-none" />

        {meetings.slice(0, 5).map((meeting: Meeting) => (
          <div key={`sched-${meeting.id}`} className="relative flex items-center gap-3 group">
            {/* Time Label (Fixed width for exact alignment) */}
            <div className="w-[62px] text-right flex-shrink-0">
              <span className="text-[11px] font-bold text-[#64748B] block tracking-tight">
                {meeting.time}
              </span>
            </div>

            {/* Timeline Dot Node (Centered over vertical line) */}
            <div className="relative z-10 flex items-center justify-center w-5 flex-shrink-0">
              <span
                className={`w-3 h-3 rounded-full block border-2 border-white shadow-xs transition-transform group-hover:scale-125 ${
                  meeting.colorDot || 'bg-emerald-500'
                }`}
              />
            </div>

            {/* Event Card */}
            <div className="flex-1 bg-[#FAF8F5] hover:bg-[#F3EFE7] border border-[#E8E5DE] rounded-2xl p-3 flex items-center justify-between transition-all min-w-0">
              <div className="flex items-center gap-3 min-w-0">
                {getPlatformIcon(meeting.platform)}
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-[#1E293B] truncate">
                    {meeting.title}
                  </h4>
                  <p className="text-[11px] text-[#64748B] truncate mt-0.5">
                    {meeting.subtitle}
                  </p>
                </div>
              </div>

              <button
                onClick={() => showToast(`Options for ${meeting.title}`)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-200/50 flex-shrink-0 ml-2"
              >
                <MoreVertical className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
