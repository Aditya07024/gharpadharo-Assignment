'use client';

import React, { useState, useEffect } from 'react';
import { Search, X, Calendar, Sliders } from 'lucide-react';
import { useCalendar } from '@/context/CalendarContext';
import { Meeting, MeetingType } from '@/types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const { meetings, meetingTypes, showToast } = useCalendar();
  const [query, setQuery] = useState('');

  // Handle ESC or Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredMeetings = meetings.filter(
    (m: Meeting) =>
      m.title.toLowerCase().includes(query.toLowerCase()) ||
      m.subtitle.toLowerCase().includes(query.toLowerCase())
  );

  const filteredMeetingTypes = meetingTypes.filter((mt: MeetingType) =>
    mt.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-slate-900/50 backdrop-blur-xs p-4 animate-in fade-in">
      <div className="bg-white rounded-3xl border border-[#E8E4DB] shadow-2xl w-full max-w-xl overflow-hidden">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-200">
          <Search className="w-5 h-5 text-slate-400" />
          <input
            type="text"
            autoFocus
            placeholder="Search meetings, contacts, meeting types..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full text-base focus:outline-none placeholder-slate-400 font-medium"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Body */}
        <div className="max-h-96 overflow-y-auto p-4 space-y-4">
          {/* Meetings Section */}
          {filteredMeetings.length > 0 && (
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2 px-2">
                Meetings ({filteredMeetings.length})
              </span>
              <div className="space-y-1">
                {filteredMeetings.map((m: Meeting) => (
                  <div
                    key={m.id}
                    onClick={() => {
                      showToast(`Opened meeting: ${m.title}`);
                      onClose();
                    }}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#FAF8F5] cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
                        <Calendar className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-800">{m.title}</h4>
                        <p className="text-[11px] text-slate-500">{m.subtitle}</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
                      {m.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Meeting Types Section */}
          {filteredMeetingTypes.length > 0 && (
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2 px-2">
                Meeting Types ({filteredMeetingTypes.length})
              </span>
              <div className="space-y-1">
                {filteredMeetingTypes.map((mt: MeetingType) => (
                  <div
                    key={mt.id}
                    onClick={() => {
                      showToast(`Copied ${mt.title} link`);
                      onClose();
                    }}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#FAF8F5] cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
                        <Sliders className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-800">{mt.title}</h4>
                        <p className="text-[11px] text-slate-500">
                          {mt.duration} • {mt.type}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {filteredMeetings.length === 0 && filteredMeetingTypes.length === 0 && (
            <div className="py-8 text-center text-slate-400 text-sm">
              No matching results found for "{query}".
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
