'use client';

import React, { createContext, useContext, useState } from 'react';
import { Meeting, MeetingType } from '@/types';
import { MOCK_GOOGLE_CALENDAR_EVENTS, INITIAL_MEETINGS, INITIAL_MEETING_TYPES } from '@/data/mockData';

interface GoogleUser {
  name: string;
  email: string;
  avatar: string;
}

interface CalendarContextType {
  isGoogleConnected: boolean;
  googleUser: GoogleUser | null;
  meetings: Meeting[];
  meetingTypes: MeetingType[];
  toastMessage: string | null;
  isConnecting: boolean;
  selectedDate: number;
  setSelectedDate: (date: number) => void;
  showToast: (msg: string) => void;
  connectGoogleCalendar: (mock?: boolean) => Promise<void>;
  disconnectGoogleCalendar: () => void;
  addMeeting: (newMeeting: Omit<Meeting, 'id'>) => void;
  addMeetingType: (newType: Omit<MeetingType, 'id'>) => void;
}

const CalendarContext = createContext<CalendarContextType | undefined>(undefined);

export const CalendarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isGoogleConnected, setIsGoogleConnected] = useState<boolean>(false);
  const [googleUser, setGoogleUser] = useState<GoogleUser | null>(null);
  const [meetings, setMeetings] = useState<Meeting[]>(INITIAL_MEETINGS);
  const [meetingTypes, setMeetingTypes] = useState<MeetingType[]>(INITIAL_MEETING_TYPES);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<number>(20);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev: string | null) => (prev === msg ? null : prev));
    }, 3000);
  };

  const connectGoogleCalendar = async (mock = true) => {
    setIsConnecting(true);
    await new Promise((res) => setTimeout(res, 800));

    setIsGoogleConnected(true);
    setGoogleUser({
      name: 'Aditya (Google User)',
      email: 'aditya.dev@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    });

    setMeetings((prev: Meeting[]) => {
      const existingIds = new Set(prev.map((m: Meeting) => m.id));
      const newGcalEvents = MOCK_GOOGLE_CALENDAR_EVENTS.filter((e: Meeting) => !existingIds.has(e.id));
      return [...prev, ...newGcalEvents];
    });

    setIsConnecting(false);
    showToast('Google Calendar connected successfully! 3 events synced.');
  };

  const disconnectGoogleCalendar = () => {
    setIsGoogleConnected(false);
    setGoogleUser(null);
    setMeetings((prev: Meeting[]) => prev.filter((m: Meeting) => !m.isGoogleSynced));
    showToast('Google Calendar disconnected.');
  };

  const addMeeting = (newMeetingData: Omit<Meeting, 'id'>) => {
    const newMeeting: Meeting = {
      ...newMeetingData,
      id: `meet-${Date.now()}`,
    };
    setMeetings((prev: Meeting[]) => [newMeeting, ...prev]);
    showToast(`Meeting "${newMeeting.title}" scheduled successfully!`);
  };

  const addMeetingType = (newTypeData: Omit<MeetingType, 'id'>) => {
    const newType: MeetingType = {
      ...newTypeData,
      id: `mt-${Date.now()}`,
    };
    setMeetingTypes((prev: MeetingType[]) => [...prev, newType]);
    showToast(`New meeting type "${newType.title}" created!`);
  };

  return (
    <CalendarContext.Provider
      value={{
        isGoogleConnected,
        googleUser,
        meetings,
        meetingTypes,
        toastMessage,
        isConnecting,
        selectedDate,
        setSelectedDate,
        showToast,
        connectGoogleCalendar,
        disconnectGoogleCalendar,
        addMeeting,
        addMeetingType,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};

export const useCalendar = () => {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error('useCalendar must be used within a CalendarProvider');
  }
  return context;
};
