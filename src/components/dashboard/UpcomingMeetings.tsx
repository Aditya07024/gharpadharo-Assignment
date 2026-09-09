'use client';

import React, { useState } from 'react';
import { MoreVertical, Video, ExternalLink, Calendar, CheckCircle2 } from 'lucide-react';
import { useCalendar } from '@/context/CalendarContext';
import { MeetingPlatform, Attendee, Meeting } from '@/types';

export const UpcomingMeetings: React.FC = () => {
  const { meetings, showToast } = useCalendar();
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  const getPlatformIcon = (platform: MeetingPlatform) => {
    switch (platform) {
      case 'google-meet':
        return (
          <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 font-bold text-xs shadow-2xs">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5V19M5 12H19" stroke="#EA4335" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="12" cy="12" r="9" stroke="#4285F4" strokeWidth="2" />
            </svg>
          </div>
        );
      case 'zoom':
        return (
          <div className="w-9 h-9 rounded-xl bg-blue-500 flex items-center justify-center text-white shadow-2xs">
            <Video className="w-4 h-4" />
          </div>
        );
      case 'teams':
        return (
          <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold text-xs shadow-2xs">
            <span className="text-[11px] tracking-tighter">T</span>
          </div>
        );
      default:
        return (
          <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-2xs">
            <Video className="w-4 h-4" />
          </div>
        );
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-[#E8E4DB] p-5 md:p-6 shadow-2xs">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-bold text-[#1E293B]">Upcoming Meetings</h2>
          <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold">
            {meetings.length} Total
          </span>
        </div>
        <button
          onClick={() => showToast('Displaying all upcoming meetings')}
          className="text-xs font-semibold text-[#1B4D3E] hover:underline"
        >
          View all
        </button>
      </div>

      {/* Meetings List */}
      <div className="space-y-3">
        {meetings.length === 0 ? (
          <div className="py-8 text-center text-slate-400 text-sm">
            No upcoming meetings scheduled.
          </div>
        ) : (
          meetings.map((meeting: Meeting) => (
            <div
              key={meeting.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 md:p-4 rounded-2xl bg-[#FAF8F5]/80 hover:bg-[#F4F1EA] border border-[#E8E5DE]/80 transition-all gap-4"
            >
              {/* Left Info: Time + Platform + Title */}
              <div className="flex items-center gap-3 md:gap-4 flex-1">
                {/* Date/Time Column */}
                <div className="min-w-[80px]">
                  <div className="text-xs font-bold text-[#1E293B]">{meeting.time}</div>
                  <div className="text-[11px] font-medium text-[#64748B]">
                    {meeting.dateLabel}
                  </div>
                </div>

                {/* Platform Badge */}
                {getPlatformIcon(meeting.platform)}

                {/* Title & Subtitle */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-[#1E293B] truncate">
                      {meeting.title}
                    </h3>
                    {meeting.isGoogleSynced && (
                      <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3 h-3" />
                        Synced
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#64748B] truncate mt-0.5">
                    {meeting.subtitle}
                  </p>
                </div>
              </div>

              {/* Right Side: Attendees + Join Button + Menu */}
              <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200/60">
                {/* Attendees Stack */}
                <div className="flex items-center -space-x-2">
                  {meeting.attendees.map((attendee: Attendee) => (
                    <img
                      key={attendee.id}
                      src={attendee.avatar}
                      alt={attendee.name}
                      title={attendee.name}
                      className="w-7 h-7 rounded-full object-cover border-2 border-white shadow-2xs"
                    />
                  ))}
                  {meeting.extraAttendeesCount && (
                    <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-600 font-bold text-[10px] flex items-center justify-center border-2 border-white shadow-2xs">
                      +{meeting.extraAttendeesCount}
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <a
                    href={meeting.joinUrl || '#'}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => {
                      if (!meeting.joinUrl) {
                        e.preventDefault();
                        showToast(`Launching ${meeting.title}...`);
                      }
                    }}
                    className="px-4 py-1.5 rounded-full bg-[#EAF4EF] hover:bg-[#D5EADF] text-[#1B4D3E] text-xs font-bold transition-colors flex items-center gap-1"
                  >
                    <span>Join</span>
                  </a>

                  {/* Dropdown Menu Toggle */}
                  <div className="relative">
                    <button
                      onClick={() =>
                        setActiveMenuId(activeMenuId === meeting.id ? null : meeting.id)
                      }
                      className="p-1.5 rounded-full hover:bg-slate-200/60 text-slate-500 transition-colors"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>

                    {activeMenuId === meeting.id && (
                      <div className="absolute right-0 mt-1 w-40 bg-white rounded-xl shadow-lg border border-[#E8E5DE] py-1 z-20 text-xs font-medium">
                        <button
                          onClick={() => {
                            showToast(`Copied meeting link for ${meeting.title}`);
                            setActiveMenuId(null);
                          }}
                          className="w-full text-left px-3 py-2 hover:bg-slate-50 text-slate-700"
                        >
                          Copy Link
                        </button>
                        <button
                          onClick={() => {
                            showToast(`Rescheduled ${meeting.title}`);
                            setActiveMenuId(null);
                          }}
                          className="w-full text-left px-3 py-2 hover:bg-slate-50 text-slate-700"
                        >
                          Reschedule
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
