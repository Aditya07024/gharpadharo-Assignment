export type MeetingPlatform = 'google-meet' | 'zoom' | 'teams';

export interface Attendee {
  id: string;
  name: string;
  avatar: string;
}

export interface Meeting {
  id: string;
  title: string;
  subtitle: string;
  time: string; // e.g. "09:30 AM"
  dateLabel: string; // e.g. "Today"
  dateIso?: string; // e.g. "2025-05-20"
  platform: MeetingPlatform;
  joinUrl?: string;
  attendees: Attendee[];
  extraAttendeesCount?: number;
  isGoogleSynced?: boolean;
  colorDot?: string;
}

export interface MetricCardData {
  id: string;
  title: string;
  value: string;
  trend: string;
  trendType: 'up' | 'down';
  period: string;
  iconType: 'calendar' | 'users' | 'clock' | 'revenue';
  iconBgColor: string;
}

export interface MeetingType {
  id: string;
  title: string;
  duration: string;
  type: 'One-on-One' | 'Group';
  link: string;
  iconType: 'video' | 'strategy' | 'demo' | 'interview';
  bgColor: string;
  iconColor: string;
}

export interface GoogleCalendarEvent {
  id: string;
  summary: string;
  description?: string;
  start: {
    dateTime?: string;
    date?: string;
  };
  end: {
    dateTime?: string;
    date?: string;
  };
  htmlLink?: string;
  location?: string;
  attendees?: Array<{ email?: string; displayName?: string }>;
}
