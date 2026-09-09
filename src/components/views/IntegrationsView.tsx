'use client';

import React from 'react';
import { Blocks, CheckCircle2, Calendar, Video, CreditCard, MessageSquare, Zap, ExternalLink } from 'lucide-react';
import { useCalendar } from '@/context/CalendarContext';

interface IntegrationsViewProps {
  onOpenGoogleConnect: () => void;
}

export const IntegrationsView: React.FC<IntegrationsViewProps> = ({ onOpenGoogleConnect }) => {
  const { isGoogleConnected, showToast } = useCalendar();

  const integrations = [
    {
      id: 'gcal',
      name: 'Google Calendar',
      category: 'Calendar Sync',
      description: 'Sync your Google Calendar meetings and upcoming schedule in real time.',
      connected: isGoogleConnected,
      iconBg: 'bg-emerald-50 text-emerald-700',
      action: onOpenGoogleConnect,
    },
    {
      id: 'zoom',
      name: 'Zoom Video',
      category: 'Video Conferencing',
      description: 'Automatically generate Zoom meeting links when clients book calls.',
      connected: true,
      iconBg: 'bg-blue-50 text-blue-600',
      action: () => showToast('Configured Zoom Integration'),
    },
    {
      id: 'teams',
      name: 'Microsoft Teams',
      category: 'Video Conferencing',
      description: 'Create Teams meetings seamlessly for internal team interviews.',
      connected: true,
      iconBg: 'bg-indigo-50 text-indigo-600',
      action: () => showToast('Configured Teams Integration'),
    },
    {
      id: 'stripe',
      name: 'Stripe Payments',
      category: 'Billing & Payments',
      description: 'Collect paid consultation fees at the time of booking.',
      connected: true,
      iconBg: 'bg-amber-50 text-amber-700',
      action: () => showToast('Configured Stripe Integration'),
    },
    {
      id: 'slack',
      name: 'Slack Notifications',
      category: 'Messaging',
      description: 'Receive instant Slack alerts when a new meeting is scheduled.',
      connected: false,
      iconBg: 'bg-[#FAF8F5] text-slate-700 border-slate-200',
      action: () => showToast('Connected Slack Integration'),
    },
    {
      id: 'zapier',
      name: 'Zapier Automation',
      category: 'Workflow Automation',
      description: 'Connect MeetPlan to 5,000+ apps using automated Zaps.',
      connected: false,
      iconBg: 'bg-[#FAF8F5] text-slate-700 border-slate-200',
      action: () => showToast('Connected Zapier Integration'),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white border border-[#E8E4DB] shadow-2xs">
        <div>
          <h1 className="text-2xl font-bold text-[#1E293B]">Integrations Directory</h1>
          <p className="text-xs text-[#64748B] mt-1">
            Connect your calendar, video conferencing, payment, and messaging tools.
          </p>
        </div>
      </div>

      {/* Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {integrations.map((item) => (
          <div
            key={item.id}
            className="p-6 rounded-3xl bg-white border border-[#E8E4DB] shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-base ${item.iconBg}`}>
                  <Blocks className="w-6 h-6" />
                </div>
                {item.connected ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Connected
                  </span>
                ) : (
                  <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                    Available
                  </span>
                )}
              </div>

              <h3 className="text-base font-bold text-[#1E293B]">{item.name}</h3>
              <span className="text-[11px] font-semibold text-[#1B4D3E] block mb-2">{item.category}</span>
              <p className="text-xs text-[#64748B] leading-relaxed">{item.description}</p>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-100">
              <button
                onClick={item.action}
                className={`w-full py-2.5 px-4 rounded-full text-xs font-bold transition-all ${
                  item.connected
                    ? 'bg-[#FAF8F5] text-slate-700 hover:bg-[#EAF4EF] hover:text-[#1B4D3E] border border-slate-200'
                    : 'bg-[#1B4D3E] text-white hover:bg-[#143C30]'
                }`}
              >
                {item.connected ? 'Configure Settings' : 'Connect Account'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
