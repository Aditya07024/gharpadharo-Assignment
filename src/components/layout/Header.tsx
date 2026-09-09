'use client';

import React, { useState } from 'react';
import { Search, Bell, Menu, Calendar, CheckCircle2, ChevronDown } from 'lucide-react';
import { useCalendar } from '@/context/CalendarContext';

interface HeaderProps {
  onOpenMobileSidebar: () => void;
  onOpenSearchModal: () => void;
  onOpenGoogleConnectModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenMobileSidebar,
  onOpenSearchModal,
  onOpenGoogleConnectModal,
}) => {
  const { isGoogleConnected, googleUser, showToast } = useCalendar();
  const [showNotifications, setShowNotifications] = useState(false);

  const mockNotifications = [
    { id: 1, title: 'New meeting invitation from Acme Corp', time: '10m ago' },
    { id: 2, title: 'Design Review updated to 09:30 AM', time: '1h ago' },
    { id: 3, title: 'Monthly revenue report is ready', time: '3h ago' },
  ];

  return (
    <header className="sticky top-0 z-30 h-16 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#E8E5DE] px-4 md:px-8 flex items-center justify-between transition-all">
      {/* Left: Mobile Drawer Trigger + Search Bar */}
      <div className="flex items-center gap-3 flex-1 max-w-xl">
        <button
          onClick={onOpenMobileSidebar}
          className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 transition-colors"
          aria-label="Open Sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Global Search Bar Input Trigger */}
        <div
          onClick={onOpenSearchModal}
          className="flex-1 flex items-center gap-3 bg-white hover:border-slate-300 border border-[#E8E5DE] rounded-full px-4 py-2 text-sm text-slate-500 cursor-pointer shadow-2xs transition-all"
        >
          <Search className="w-4 h-4 text-slate-400" />
          <span className="truncate flex-1">Search meetings, contacts, etc...</span>
          <div className="hidden sm:flex items-center gap-1 bg-[#FAF8F5] border border-[#E8E5DE] px-2 py-0.5 rounded-md text-[11px] font-mono text-slate-500">
            <span>⌘</span>
            <span>K</span>
          </div>
        </div>
      </div>

      {/* Right Actions: Google Sync Button + Notifications + Profile Avatar */}
      <div className="flex items-center gap-3 md:gap-4">
        {/* Google Calendar Connection Status Badge / Connect Button */}
        <button
          onClick={onOpenGoogleConnectModal}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all ${
            isGoogleConnected
              ? 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100'
              : 'bg-white border-[#1B4D3E]/30 text-[#1B4D3E] hover:bg-[#1B4D3E]/5 shadow-2xs'
          }`}
        >
          {isGoogleConnected ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span className="hidden sm:inline">Google Synced</span>
            </>
          ) : (
            <>
              <Calendar className="w-4 h-4 text-[#1B4D3E]" />
              <span>Connect Google Calendar</span>
            </>
          )}
        </button>

        {/* Notifications Popover Trigger */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2.5 rounded-full bg-white border border-[#E8E5DE] text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-4 h-4 bg-amber-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
              3
            </span>
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-[#E8E5DE] py-2 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center justify-between px-4 py-2 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-800">Notifications</span>
                <button
                  onClick={() => showToast('All marked as read')}
                  className="text-[11px] font-medium text-[#1B4D3E] hover:underline"
                >
                  Mark all as read
                </button>
              </div>
              <div className="divide-y divide-slate-100 max-h-64 overflow-y-auto">
                {mockNotifications.map((n) => (
                  <div
                    key={n.id}
                    onClick={() => {
                      showToast(`Opening notification: ${n.title}`);
                      setShowNotifications(false);
                    }}
                    className="p-3 hover:bg-slate-50 cursor-pointer transition-colors"
                  >
                    <p className="text-xs font-medium text-slate-700">{n.title}</p>
                    <span className="text-[10px] text-slate-400 mt-1 block">{n.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Avatar */}
        <div className="flex items-center gap-2 cursor-pointer group">
          <div className="relative">
            {googleUser ? (
              <img
                src={googleUser.avatar}
                alt={googleUser.name}
                className="w-9 h-9 rounded-full object-cover border border-slate-200"
              />
            ) : (
              <div className="w-9 h-9 rounded-full bg-[#E5EBE8] text-[#1B4D3E] font-bold text-sm flex items-center justify-center border border-white">
                A
              </div>
            )}
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white" />
          </div>
        </div>
      </div>
    </header>
  );
};
