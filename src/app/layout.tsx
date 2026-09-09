import type { Metadata } from 'next';
import './globals.css';
import { CalendarProvider } from '@/context/CalendarContext';
import { Toast } from '@/components/common/Toast';

export const metadata: Metadata = {
  title: 'MeetPlan - All-in-One Meeting & Scheduling Dashboard',
  description:
    'Manage your calendar, schedule meetings, track availability, and connect Google Calendar seamlessly with MeetPlan.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full bg-[#FAF8F5] text-[#1E293B] antialiased">
        <CalendarProvider>
          {children}
          <Toast />
        </CalendarProvider>
      </body>
    </html>
  );
}
