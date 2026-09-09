'use client';

import React, { useState } from 'react';
import {
  LayoutDashboard,
  CalendarCheck,
  CalendarDays,
  Clock,
  Sliders,
  Users,
  BarChart3,
  Blocks,
  UserGroup,
  CreditCard,
  Settings,
  ChevronDown,
  Sparkles,
  X,
  User,
  LogOut,
  Calendar,
} from 'lucide-react';
import { useCalendar } from '@/context/CalendarContext';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  activeTab?: string;
  setActiveTab?: (tab: string) => void;
  onOpenUpgradeModal?: () => void;
  onOpenGoogleConnectModal?: () => void;
}

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'meetings', label: 'Meetings', icon: CalendarCheck },
  { id: 'calendar', label: 'Calendar', icon: CalendarDays },
  { id: 'availability', label: 'Availability', icon: Clock },
  { id: 'meeting-types', label: 'Meeting Types', icon: Sliders },
  { id: 'contacts', label: 'Contacts', icon: Users },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'integrations', label: 'Integrations', icon: Blocks },
  { id: 'team', label: 'Team', icon: UserGroup },
  { id: 'billing', label: 'Billing', icon: CreditCard },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen = false,
  onClose,
  activeTab = 'dashboard',
  setActiveTab,
  onOpenUpgradeModal,
  onOpenGoogleConnectModal,
}) => {
  const { showToast, googleUser } = useCalendar();
  const [showAccountMenu, setShowAccountMenu] = useState(false);

  const handleNavClick = (id: string, label: string) => {
    if (setActiveTab) {
      setActiveTab(id);
    }
    if (onClose) onClose();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs lg:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-[#FAF8F5] border-r border-[#E8E5DE] flex flex-col transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
      >
        {/* Logo & Brand Header */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-[#E8E5DE]/60">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-[#1B4D3E] flex items-center justify-center text-white shadow-sm">
              <CalendarCheck className="w-5 h-5" />
            </div>
            <span className="font-bold text-xl tracking-tight text-[#1E293B]">
              MeetPlan
            </span>
          </div>

          {/* Mobile Close Button */}
          {onClose && (
            <button
              onClick={onClose}
              className="lg:hidden p-1.5 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id, item.label)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-full text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-[#1B4D3E] text-white shadow-sm'
                    : 'text-[#525866] hover:text-[#1E293B] hover:bg-[#EFECE6]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#64748B]'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Upgrade to Pro Card */}
        <div className="px-4 py-3">
          <div className="p-4 rounded-2xl bg-[#EAF3EE] border border-[#D5E6DC] relative overflow-hidden">
            <div className="flex items-center justify-center mb-3">
              <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-xs text-[#1B4D3E]">
                <Sparkles className="w-6 h-6 text-amber-500" />
              </div>
            </div>
            <h4 className="text-sm font-semibold text-[#1E293B] text-center mb-1">
              Upgrade to Pro
            </h4>
            <p className="text-xs text-[#64748B] text-center mb-3 leading-relaxed">
              Unlock advanced features and grow your business.
            </p>
            <button
              onClick={() => {
                if (onOpenUpgradeModal) onOpenUpgradeModal();
                else showToast('Opening Upgrade Pro Modal...');
              }}
              className="w-full py-2.5 px-4 rounded-full bg-[#1B4D3E] hover:bg-[#143C30] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            >
              Upgrade Now
            </button>
          </div>
        </div>

        {/* User Footer Profile */}
        <div className="p-4 border-t border-[#E8E5DE] relative">
          <div
            onClick={() => setShowAccountMenu(!showAccountMenu)}
            className="flex items-center justify-between p-2 rounded-xl hover:bg-[#EFECE6] cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                {googleUser ? (
                  <img
                    src={googleUser.avatar}
                    alt={googleUser.name}
                    className="w-9 h-9 rounded-full object-cover border border-white"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-[#D1E2D9] text-[#1B4D3E] font-bold text-sm flex items-center justify-center border border-white">
                    A
                  </div>
                )}
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs font-bold text-[#1E293B]">Account</span>
                <span className="text-[11px] text-[#64748B]">Starter Plan</span>
              </div>
            </div>
            <ChevronDown
              className={`w-4 h-4 text-[#94A3B8] transition-transform ${
                showAccountMenu ? 'rotate-180' : ''
              }`}
            />
          </div>

          {/* Account Popover Menu */}
          {showAccountMenu && (
            <div className="absolute bottom-16 left-4 right-4 bg-white rounded-2xl shadow-xl border border-[#E8E5DE] py-2 z-50 animate-in fade-in slide-in-from-bottom-2 text-xs font-medium space-y-1">
              <button
                onClick={() => {
                  if (setActiveTab) setActiveTab('settings');
                  setShowAccountMenu(false);
                }}
                className="w-full text-left px-4 py-2 hover:bg-[#FAF8F5] text-slate-700 flex items-center gap-2"
              >
                <User className="w-3.5 h-3.5 text-[#1B4D3E]" />
                <span>Profile & Settings</span>
              </button>

              <button
                onClick={() => {
                  if (setActiveTab) setActiveTab('billing');
                  setShowAccountMenu(false);
                }}
                className="w-full text-left px-4 py-2 hover:bg-[#FAF8F5] text-slate-700 flex items-center gap-2"
              >
                <CreditCard className="w-3.5 h-3.5 text-[#1B4D3E]" />
                <span>Billing & Subscription</span>
              </button>

              <button
                onClick={() => {
                  if (onOpenGoogleConnectModal) onOpenGoogleConnectModal();
                  setShowAccountMenu(false);
                }}
                className="w-full text-left px-4 py-2 hover:bg-[#FAF8F5] text-slate-700 flex items-center gap-2"
              >
                <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                <span>Google Sync Status</span>
              </button>

              <button
                onClick={() => {
                  if (onOpenUpgradeModal) onOpenUpgradeModal();
                  setShowAccountMenu(false);
                }}
                className="w-full text-left px-4 py-2 hover:bg-[#FAF8F5] text-[#1B4D3E] font-bold flex items-center gap-2"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Upgrade to Pro</span>
              </button>

              <div className="border-t border-slate-100 my-1" />

              <button
                onClick={() => {
                  showToast('Logged out of MeetPlan');
                  setShowAccountMenu(false);
                }}
                className="w-full text-left px-4 py-2 hover:bg-rose-50 text-rose-600 flex items-center gap-2"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};
