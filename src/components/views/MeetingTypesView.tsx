'use client';

import React, { useState } from 'react';
import { Sliders, Plus, Copy, Check, Video, Monitor, Users, Sparkles, Code, ExternalLink, MoreVertical } from 'lucide-react';
import { useCalendar } from '@/context/CalendarContext';
import { MeetingType } from '@/types';

export const MeetingTypesView: React.FC = () => {
  const { meetingTypes, addMeetingType, showToast } = useCalendar();
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDuration, setNewDuration] = useState('30 mins');

  const handleCopyLink = (link: string, id: string, title: string) => {
    navigator.clipboard?.writeText(link);
    setCopiedId(id);
    showToast(`Booking link for "${title}" copied to clipboard!`);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    addMeetingType({
      title: newTitle,
      duration: newDuration,
      type: 'One-on-One',
      link: `https://meetplan.com/aditya/${newTitle.toLowerCase().replace(/\s+/g, '-')}`,
      iconType: 'video',
      bgColor: 'bg-emerald-50 text-emerald-700 border-emerald-100',
      iconColor: 'text-emerald-700',
    });

    setNewTitle('');
    setIsCreating(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white border border-[#E8E4DB] shadow-2xs">
        <div>
          <h1 className="text-2xl font-bold text-[#1E293B]">Meeting Types</h1>
          <p className="text-xs text-[#64748B] mt-1">
            Create and configure booking links for clients and team members.
          </p>
        </div>
        <button
          onClick={() => setIsCreating(true)}
          className="px-5 py-2.5 rounded-full bg-[#1B4D3E] hover:bg-[#143C30] text-white text-xs font-bold shadow-md transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>New Meeting Type</span>
        </button>
      </div>

      {/* Inline Create Form Modal / Collapse */}
      {isCreating && (
        <form onSubmit={handleCreate} className="p-6 rounded-3xl bg-white border border-[#1B4D3E]/30 shadow-lg space-y-4 animate-in fade-in">
          <h3 className="text-sm font-bold text-slate-800">Create New Meeting Type</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-600 block mb-1">Title</label>
              <input
                type="text"
                required
                placeholder="e.g. 15 Min Discovery Call"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full px-4 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#1B4D3E]"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-600 block mb-1">Duration</label>
              <select
                value={newDuration}
                onChange={(e) => setNewDuration(e.target.value)}
                className="w-full px-4 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#1B4D3E]"
              >
                <option value="15 mins">15 mins</option>
                <option value="30 mins">30 mins</option>
                <option value="45 mins">45 mins</option>
                <option value="60 mins">60 mins</option>
              </select>
            </div>
          </div>
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsCreating(false)}
              className="px-4 py-2 rounded-full text-xs font-semibold text-slate-600 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-full bg-[#1B4D3E] text-white text-xs font-bold"
            >
              Create
            </button>
          </div>
        </form>
      )}

      {/* Grid of Meeting Types */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {meetingTypes.map((mt: MeetingType) => {
          const isCopied = copiedId === mt.id;
          return (
            <div
              key={mt.id}
              className="p-6 rounded-3xl bg-white border border-[#E8E4DB] shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${mt.bgColor}`}>
                    <Video className="w-5 h-5" />
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-[11px] font-bold">
                    {mt.duration}
                  </span>
                </div>

                <h3 className="text-base font-bold text-[#1E293B]">{mt.title}</h3>
                <p className="text-xs text-[#64748B] mt-1 font-medium">{mt.type} Meeting</p>
                <p className="text-[11px] font-mono text-[#1B4D3E] mt-3 truncate bg-[#FAF8F5] p-2 rounded-xl border border-slate-200/60">
                  {mt.link}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 mt-6 border-t border-slate-100">
                <button
                  onClick={() => handleCopyLink(mt.link, mt.id, mt.title)}
                  className={`flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-full transition-all ${
                    isCopied
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-[#FAF8F5] text-slate-700 hover:bg-[#EAF4EF] hover:text-[#1B4D3E]'
                  }`}
                >
                  {isCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy link</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => showToast(`Generated embed code for ${mt.title}`)}
                  className="p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                >
                  <Code className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
