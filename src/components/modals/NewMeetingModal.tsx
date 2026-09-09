'use client';

import React, { useState } from 'react';
import { X, Calendar, Clock, Video, Users } from 'lucide-react';
import { useCalendar } from '@/context/CalendarContext';
import { MeetingPlatform } from '@/types';

interface NewMeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NewMeetingModal: React.FC<NewMeetingModalProps> = ({ isOpen, onClose }) => {
  const { addMeeting } = useCalendar();

  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [time, setTime] = useState('03:00 PM');
  const [platform, setPlatform] = useState<MeetingPlatform>('google-meet');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    addMeeting({
      title,
      subtitle: subtitle || 'Scheduled Meeting',
      time,
      dateLabel: 'Today',
      dateIso: '2025-05-20',
      platform,
      joinUrl: platform === 'google-meet' ? 'https://meet.google.com/new-meet' : 'https://zoom.us/j/999888',
      colorDot: 'bg-emerald-500',
      attendees: [
        {
          id: 'me',
          name: 'Aditya (Host)',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
        },
      ],
    });

    setTitle('');
    setSubtitle('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4 animate-in fade-in">
      <div className="bg-white rounded-3xl border border-[#E8E4DB] shadow-2xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-[#FAF8F5]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#1B4D3E] text-white flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-slate-800">Schedule New Meeting</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200/50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Meeting Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Design Review / Client Sync"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#1B4D3E] focus:ring-1 focus:ring-[#1B4D3E]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Team / Organization / Subtitle
            </label>
            <input
              type="text"
              placeholder="e.g. Acme Corp / Engineering Team"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#1B4D3E] focus:ring-1 focus:ring-[#1B4D3E]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Time
              </label>
              <input
                type="text"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#1B4D3E]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Platform
              </label>
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value as MeetingPlatform)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#1B4D3E]"
              >
                <option value="google-meet">Google Meet</option>
                <option value="zoom">Zoom</option>
                <option value="teams">Microsoft Teams</option>
              </select>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-full text-xs font-semibold text-slate-600 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-full bg-[#1B4D3E] hover:bg-[#143C30] text-white text-xs font-bold shadow-md transition-colors"
            >
              Schedule Meeting
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
