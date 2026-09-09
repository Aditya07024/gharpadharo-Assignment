'use client';

import React, { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { WelcomeBanner } from '@/components/dashboard/WelcomeBanner';
import { MetricsGrid } from '@/components/dashboard/MetricsGrid';
import { UpcomingMeetings } from '@/components/dashboard/UpcomingMeetings';
import { MeetingTypes } from '@/components/dashboard/MeetingTypes';
import { CalendarWidget } from '@/components/dashboard/CalendarWidget';
import { TodayScheduleWidget } from '@/components/dashboard/TodayScheduleWidget';
import { NewMeetingButton } from '@/components/dashboard/NewMeetingButton';

import { MeetingsView } from '@/components/views/MeetingsView';
import { CalendarView } from '@/components/views/CalendarView';
import { AvailabilityView } from '@/components/views/AvailabilityView';
import { MeetingTypesView } from '@/components/views/MeetingTypesView';
import { ContactsView } from '@/components/views/ContactsView';
import { AnalyticsView } from '@/components/views/AnalyticsView';
import { IntegrationsView } from '@/components/views/IntegrationsView';
import { TeamView } from '@/components/views/TeamView';
import { BillingView } from '@/components/views/BillingView';
import { SettingsView } from '@/components/views/SettingsView';

import { SearchModal } from '@/components/modals/SearchModal';
import { NewMeetingModal } from '@/components/modals/NewMeetingModal';
import { GoogleConnectModal } from '@/components/modals/GoogleConnectModal';
import { UpgradeProModal } from '@/components/modals/UpgradeProModal';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNewMeetingOpen, setIsNewMeetingOpen] = useState(false);
  const [isGoogleConnectOpen, setIsGoogleConnectOpen] = useState(false);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);

  const renderMainView = () => {
    switch (activeTab) {
      case 'meetings':
        return <MeetingsView onOpenNewMeeting={() => setIsNewMeetingOpen(true)} />;
      case 'calendar':
        return <CalendarView onOpenNewMeeting={() => setIsNewMeetingOpen(true)} />;
      case 'availability':
        return <AvailabilityView />;
      case 'meeting-types':
        return <MeetingTypesView />;
      case 'contacts':
        return <ContactsView />;
      case 'analytics':
        return <AnalyticsView />;
      case 'integrations':
        return <IntegrationsView onOpenGoogleConnect={() => setIsGoogleConnectOpen(true)} />;
      case 'team':
        return <TeamView />;
      case 'billing':
        return <BillingView />;
      case 'settings':
        return <SettingsView />;
      case 'dashboard':
      default:
        return (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: Main Dashboard Content (8 Cols on Desktop) */}
            <div className="lg:col-span-8 space-y-6">
              {/* Greeting Banner */}
              <WelcomeBanner />

              {/* 4 Metric Cards */}
              <MetricsGrid />

              {/* Upcoming Meetings List */}
              <UpcomingMeetings />

              {/* Meeting Types Grid */}
              <MeetingTypes />
            </div>

            {/* Right Column: Widgets Panel (4 Cols on Desktop) */}
            <div className="lg:col-span-4 space-y-6">
              {/* May 2025 Month Calendar Widget */}
              <CalendarWidget />

              {/* Today's Schedule Timeline Widget */}
              <TodayScheduleWidget />

              {/* + New Meeting Primary Action Button */}
              <div className="pt-2">
                <NewMeetingButton onClick={() => setIsNewMeetingOpen(true)} />
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#FAF8F5]">
      {/* Sidebar Navigation */}
      <Sidebar
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenUpgradeModal={() => setIsUpgradeModalOpen(true)}
        onOpenGoogleConnectModal={() => setIsGoogleConnectOpen(true)}
      />

      {/* Main Content Workspace */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* Top Header Bar */}
        <Header
          onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
          onOpenSearchModal={() => setIsSearchOpen(true)}
          onOpenGoogleConnectModal={() => setIsGoogleConnectOpen(true)}
        />

        {/* Scrollable Dashboard Body */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="max-w-[1600px] mx-auto">{renderMainView()}</div>
        </main>
      </div>

      {/* Modals */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      <NewMeetingModal
        isOpen={isNewMeetingOpen}
        onClose={() => setIsNewMeetingOpen(false)}
      />

      <GoogleConnectModal
        isOpen={isGoogleConnectOpen}
        onClose={() => setIsGoogleConnectOpen(false)}
      />

      <UpgradeProModal
        isOpen={isUpgradeModalOpen}
        onClose={() => setIsUpgradeModalOpen(false)}
      />
    </div>
  );
}
