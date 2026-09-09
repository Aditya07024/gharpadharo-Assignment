'use client';

import React, { useState } from 'react';
import { Search, Calendar, Video, ExternalLink, Filter, Plus, CheckCircle2, MoreVertical } from 'lucide-react';
import { useCalendar } from '@/context/CalendarContext';
import { Meeting, MeetingPlatform, Attendee } from '@/types';

interface MeetingsViewProps {
  onOpenNewMeeting: () => void;
}

export const MeetingsView: React.FC<MeetingsViewProps> = ({ onOpenNewMeeting }) => {
  const { meetings, showToast } = useCalendar();
  const [filterTab, setFilterTab] = useState<'all' | 'upcoming' | 'today' | 'synced'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMeetings = meetings.filter((meeting: Meeting) => {
    const matchesSearch =
      meeting.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      meeting.subtitle.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (filterTab === 'today') return meeting.dateLabel === 'Today';
    if (filterTab === 'synced') return meeting.isGoogleSynced;
    if (filterTab === 'upcoming') return meeting.dateLabel !== 'Past';
    return true;
  });

  const getPlatformIcon = (platform: MeetingPlatform) => {
    switch (platform) {
      case 'google-meet':
        return (
          <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-100 flex items-center justify-center font-bold text-amber-600 shadow-2xs">
            <Video className="w-4 h-4 text-emerald-600" />
          </div>
        );
      case 'zoom':
        return (
          <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center text-white shadow-2xs">
            <Video className="w-4 h-4" />
          </div>
        );
      case 'teams':
        return (
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-xs shadow-2xs">
            T
          </div>
        );
      default:
        return (
          <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white shadow-2xs">
            <Video className="w-4 h-4" />
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white border border-[#E8E4DB] shadow-2xs">
        <div>
          <h1 className="text-2xl font-bold text-[#1E293B]">Meetings</h1>
          <p className="text-xs text-[#64748B] mt-1">
            Manage your scheduled calls, sync calendar events, and join upcoming sessions.
          </p>
        </div>
        <button
          onClick={onOpenNewMeeting}
          className="px-5 py-2.5 rounded-full bg-[#1B4D3E] hover:bg-[#143C30] text-white text-xs font-bold shadow-md transition-all flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Schedule Meeting</span>
        </button>
      </div>

      {/* Controls Bar: Search & Filter Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-full bg-white border border-[#E8E4DB] shadow-2xs overflow-x-auto">
          {[
            { id: 'all', label: `All (${meetings.length})` },
            { id: 'today', label: 'Today' },
            { id: 'upcoming', label: 'Upcoming' },
            { id: 'synced', label: 'Google Synced' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterTab(tab.id as typeof filterTab)}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                filterTab === tab.id
                  ? 'bg-[#1B4D3E] text-white shadow-xs'
                  : 'text-[#64748B] hover:text-[#1E293B] hover:bg-[#FAF8F5]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search meetings by title or host..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-full bg-white border border-[#E8E4DB] text-xs focus:outline-none focus:border-[#1B4D3E]"
          />
        </div>
      </div>

      {/* Meetings Table/List */}
      <div className="bg-white rounded-3xl border border-[#E8E4DB] p-5 shadow-2xs">
        <div className="space-y-3">
          {filteredMeetings.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-sm">
              No meetings found matching your filter criteria.
            </div>
          ) : (
            filteredMeetings.map((meeting: Meeting) => (
              <div
                key={meeting.id}
                className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-2xl bg-[#FAF8F5] hover:bg-[#F3EFE7] border border-[#E8E5DE] transition-all gap-4"
              >
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  {/* Time & Date Column */}
                  <div className="min-w-[90px]">
                    <span className="text-xs font-bold text-[#1E293B] block">{meeting.time}</span>
                    <span className="text-[11px] font-medium text-[#64748B]">
                      {meeting.dateLabel}
                    </span>
                  </div>

                  {getPlatformIcon(meeting.platform)}

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-[#1E293B] truncate">{meeting.title}</h3>
                      {meeting.isGoogleSynced && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                          <CheckCircle2 className="w-3 h-3" />
                          Synced
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#64748B] truncate mt-0.5">{meeting.subtitle}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-4">
                  {/* Attendee avatars */}
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

                  <a
                    href={meeting.joinUrl || '#'}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => {
                      if (!meeting.joinUrl) {
                        e.preventDefault();
                        showToast(`Joining ${meeting.title}...`);
                      }
                    }}
                    className="px-4 py-1.5 rounded-full bg-[#EAF4EF] hover:bg-[#D5EADF] text-[#1B4D3E] text-xs font-bold transition-colors"
                  >
                    Join
                  </a>

                  <button
                    onClick={() => showToast(`Meeting options for ${meeting.title}`)}
                    className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-200/50"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
