'use client';

import React from 'react';
import { UserGroup, Plus, Mail, ShieldCheck, MoreVertical } from 'lucide-react';
import { useCalendar } from '@/context/CalendarContext';

export const TeamView: React.FC = () => {
  const { showToast } = useCalendar();

  const teamMembers = [
    {
      id: 'tm1',
      name: 'Aditya (You)',
      email: 'aditya.dev@gmail.com',
      role: 'Owner',
      assignedLink: 'meetplan.com/aditya',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    },
    {
      id: 'tm2',
      name: 'Elena Rostova',
      email: 'elena.r@meetplan.com',
      role: 'Admin',
      assignedLink: 'meetplan.com/elena',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80',
    },
    {
      id: 'tm3',
      name: 'James Wilson',
      email: 'james.w@meetplan.com',
      role: 'Member',
      assignedLink: 'meetplan.com/james',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white border border-[#E8E4DB] shadow-2xs">
        <div>
          <h1 className="text-2xl font-bold text-[#1E293B]">Team Workspace</h1>
          <p className="text-xs text-[#64748B] mt-1">
            Manage organization team members, scheduling permissions, and shared booking links.
          </p>
        </div>
        <button
          onClick={() => showToast('Opened Invite Team Member dialog')}
          className="px-5 py-2.5 rounded-full bg-[#1B4D3E] hover:bg-[#143C30] text-white text-xs font-bold shadow-md transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Invite Member</span>
        </button>
      </div>

      {/* Team Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {teamMembers.map((member) => (
          <div
            key={member.id}
            className="p-6 rounded-3xl bg-white border border-[#E8E4DB] shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-2xs"
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-[#1E293B] truncate">{member.name}</h3>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-bold">
                      {member.role}
                    </span>
                  </div>
                  <p className="text-xs text-[#64748B] truncate mt-0.5">{member.email}</p>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-[#FAF8F5] border border-[#E8E5DE] text-xs">
                <span className="text-[11px] font-bold text-slate-500 block mb-1">Booking Link</span>
                <span className="font-mono text-[#1B4D3E] font-semibold">{member.assignedLink}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 mt-6 border-t border-slate-100">
              <button
                onClick={() => showToast(`Managing permissions for ${member.name}`)}
                className="px-3.5 py-1.5 rounded-full bg-[#FAF8F5] text-slate-700 text-xs font-bold hover:bg-[#EAF4EF] hover:text-[#1B4D3E] transition-colors"
              >
                Edit Role
              </button>
              <button
                onClick={() => showToast(`Options for ${member.name}`)}
                className="p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
