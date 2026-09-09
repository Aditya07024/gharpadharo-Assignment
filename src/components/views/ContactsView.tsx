'use client';

import React, { useState } from 'react';
import { Search, Users, Plus, Mail, Calendar, MoreVertical, Phone } from 'lucide-react';
import { useCalendar } from '@/context/CalendarContext';

export const ContactsView: React.FC = () => {
  const { showToast } = useCalendar();
  const [searchQuery, setSearchQuery] = useState('');

  const [contacts, setContacts] = useState([
    {
      id: 'c1',
      name: 'Alex Johnson',
      email: 'alex.johnson@acme.corp',
      company: 'Acme Corporation',
      role: 'Product Manager',
      meetingsCount: 12,
      lastMet: 'Yesterday',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    },
    {
      id: 'c2',
      name: 'Marcus Chen',
      email: 'm.chen@globalsolutions.io',
      company: 'Global Solutions',
      role: 'Engineering Lead',
      meetingsCount: 8,
      lastMet: '3 days ago',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    },
    {
      id: 'c3',
      name: 'Sarah Jenkins',
      email: 'sarah.j@innovate.co',
      company: 'Innovate Tech',
      role: 'Head of Design',
      meetingsCount: 15,
      lastMet: 'May 18, 2025',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
    },
    {
      id: 'c4',
      name: 'David Kim',
      email: 'david.k@hiringteam.org',
      company: 'Gharpadharo Hiring',
      role: 'Senior Recruiter',
      meetingsCount: 4,
      lastMet: 'Today',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
    },
  ]);

  const filteredContacts = contacts.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white border border-[#E8E4DB] shadow-2xs">
        <div>
          <h1 className="text-2xl font-bold text-[#1E293B]">Contacts</h1>
          <p className="text-xs text-[#64748B] mt-1">
            Manage client directory, track past meetings, and quickly schedule calls.
          </p>
        </div>
        <button
          onClick={() => showToast('Opened Add Contact dialog')}
          className="px-5 py-2.5 rounded-full bg-[#1B4D3E] hover:bg-[#143C30] text-white text-xs font-bold shadow-md transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Contact</span>
        </button>
      </div>

      {/* Search Input */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
        <input
          type="text"
          placeholder="Search contacts by name, company, or email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white border border-[#E8E4DB] text-xs focus:outline-none focus:border-[#1B4D3E]"
        />
      </div>

      {/* Contacts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredContacts.map((c) => (
          <div
            key={c.id}
            className="p-5 rounded-3xl bg-white border border-[#E8E4DB] shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={c.avatar}
                  alt={c.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-2xs"
                />
                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-[#1E293B] truncate">{c.name}</h3>
                  <p className="text-xs text-[#64748B] truncate">{c.role}</p>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-[#FAF8F5] border border-[#E8E5DE] text-xs space-y-1.5">
                <div className="flex items-center justify-between text-slate-600 font-semibold">
                  <span>Company</span>
                  <span className="text-slate-800 font-bold">{c.company}</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span>Meetings</span>
                  <span className="text-[#1B4D3E] font-bold">{c.meetingsCount} calls</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span>Last Met</span>
                  <span className="text-slate-500">{c.lastMet}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-100">
              <button
                onClick={() => showToast(`Drafting email to ${c.email}...`)}
                className="px-3.5 py-1.5 rounded-full bg-[#EAF4EF] text-[#1B4D3E] text-xs font-bold hover:bg-[#D5EADF] transition-colors flex items-center gap-1.5"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Email</span>
              </button>

              <button
                onClick={() => showToast(`Scheduling meeting with ${c.name}`)}
                className="px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-colors flex items-center gap-1.5"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
