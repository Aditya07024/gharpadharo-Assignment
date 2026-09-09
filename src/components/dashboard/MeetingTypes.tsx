'use client';

import React from 'react';
import { Video, Copy, Check, MoreVertical, Monitor, Users, Sparkles } from 'lucide-react';
import { useCalendar } from '@/context/CalendarContext';
import { MeetingType } from '@/types';

export const MeetingTypes: React.FC = () => {
  const { meetingTypes, showToast } = useCalendar();
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  const handleCopyLink = (link: string, id: string, title: string) => {
    navigator.clipboard?.writeText(link);
    setCopiedId(id);
    showToast(`Link for "${title}" copied to clipboard!`);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const getTypeIcon = (type: MeetingType['iconType']) => {
    switch (type) {
      case 'video':
        return <Video className="w-5 h-5 text-emerald-700" />;
      case 'strategy':
        return <Sparkles className="w-5 h-5 text-amber-600" />;
      case 'demo':
        return <Monitor className="w-5 h-5 text-blue-600" />;
      case 'interview':
        return <Users className="w-5 h-5 text-rose-600" />;
      default:
        return <Video className="w-5 h-5 text-emerald-700" />;
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-[#1E293B]">Your Meeting Types</h2>
        <button
          onClick={() => showToast('Managing all meeting types...')}
          className="text-xs font-semibold text-[#1B4D3E] hover:underline"
        >
          Manage all
        </button>
      </div>

      {/* Grid Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {meetingTypes.map((mt: MeetingType) => {
          const isCopied = copiedId === mt.id;
          return (
            <div
              key={mt.id}
              className="p-5 rounded-2xl bg-white border border-[#E8E4DB] shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Icon square */}
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${mt.bgColor}`}
                >
                  {getTypeIcon(mt.iconType)}
                </div>

                {/* Title */}
                <h3 className="text-sm font-bold text-[#1E293B] tracking-tight">
                  {mt.title}
                </h3>
                <p className="text-xs text-[#64748B] mt-1 font-medium">
                  {mt.duration} • {mt.type}
                </p>
              </div>

              {/* Actions Footer */}
              <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-100">
                <button
                  onClick={() => handleCopyLink(mt.link, mt.id, mt.title)}
                  className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full transition-all ${
                    isCopied
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'text-[#64748B] hover:text-[#1E293B] hover:bg-slate-100'
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
                  onClick={() => showToast(`Settings for ${mt.title}`)}
                  className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                >
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
