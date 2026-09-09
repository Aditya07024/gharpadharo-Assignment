import { GoogleCalendarEvent, Meeting } from '@/types';

/**
 * Configuration loaded strictly from environment variables (.env.local / .env.example)
 */
export const GOOGLE_CONFIG = {
  clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '',
  clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
  scope: process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_SCOPE || 'https://www.googleapis.com/auth/calendar.readonly',
};

/**
 * Fetch primary Google Calendar events using a OAuth Access Token
 */
export async function fetchGoogleCalendarEvents(accessToken: string): Promise<Meeting[]> {
  try {
    const timeMin = new Date().toISOString();
    const url = `https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${encodeURIComponent(
      timeMin
    )}&singleEvents=true&orderBy=startTime&maxResults=10`;

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error(`Google API HTTP ${res.status}: ${res.statusText}`);
    }

    const data = await res.json();
    const items: GoogleCalendarEvent[] = data.items || [];

    return items.map(transformGoogleEventToMeeting);
  } catch (error) {
    console.error('Error fetching Google Calendar events:', error);
    throw error;
  }
}

/**
 * Transform Google Calendar API event format to MeetPlan Meeting structure
 */
export function transformGoogleEventToMeeting(gEvent: GoogleCalendarEvent): Meeting {
  const startDateTime = gEvent.start.dateTime || gEvent.start.date || new Date().toISOString();
  const eventDate = new Date(startDateTime);

  // Format time (e.g. 09:30 AM)
  const formattedTime = eventDate.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  return {
    id: `gcal-${gEvent.id}`,
    title: gEvent.summary || 'Untitled Event',
    subtitle: gEvent.description || 'Google Calendar Event',
    time: formattedTime,
    dateLabel: eventDate.toDateString() === new Date().toDateString() ? 'Today' : 'Upcoming',
    dateIso: startDateTime.split('T')[0],
    platform: 'google-meet',
    joinUrl: gEvent.htmlLink || 'https://calendar.google.com',
    isGoogleSynced: true,
    colorDot: 'bg-emerald-600',
    attendees: (gEvent.attendees || []).map((att, i) => ({
      id: `att-${i}`,
      name: att.displayName || att.email || 'Guest',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    })),
  };
}
