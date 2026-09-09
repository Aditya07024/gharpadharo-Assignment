'use client';

import React from 'react';
import { useCalendar } from '@/context/CalendarContext';
import { Meeting } from '@/types';

export const WelcomeBanner: React.FC = () => {
  const { meetings } = useCalendar();

  // Count meetings scheduled for today
  const todayMeetingsCount = meetings.filter(
    (m: Meeting) => m.dateLabel === 'Today' || m.dateIso === '2025-05-20'
  ).length;

  return (
    <div className="relative rounded-3xl bg-[#F6F3EC] border border-[#E8E4DB] p-6 md:p-8 overflow-hidden shadow-2xs">
      <div className="relative z-10 max-w-lg">
        <span className="text-sm md:text-base font-medium text-[#64748B]">
          Good Morning,
        </span>
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#1E293B] tracking-tight mt-1 flex items-center gap-2">
          Welcome back! <span className="animate-bounce inline-block">👋</span>
        </h1>
        <p className="text-sm md:text-base text-[#475569] mt-3 font-medium">
          You have{' '}
          <span className="font-bold text-[#1B4D3E] underline decoration-emerald-400 decoration-2 underline-offset-4">
            {todayMeetingsCount || 8} meetings
          </span>{' '}
          today.
        </p>
      </div>

      {/* Decorative Architectural Line Art Vector */}
      <div className="absolute right-0 bottom-0 h-full w-1/2 pointer-events-none hidden sm:flex items-end justify-end opacity-90">
        <svg
          className="h-full max-h-44 md:max-h-48 w-auto text-emerald-800/20"
          viewBox="0 0 500 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Birds */}
          <path d="M120 40 Q130 30 140 40 Q150 30 160 40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M180 25 Q188 18 196 25 Q204 18 212 25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          
          {/* Buildings Outline */}
          <rect x="250" y="80" width="50" height="120" rx="4" stroke="currentColor" strokeWidth="2" fill="#FAF8F5" fillOpacity="0.4" />
          <path d="M265 95 h20 M265 115 h20 M265 135 h20 M265 155 h20" stroke="currentColor" strokeWidth="1.5" />
          
          <rect x="310" y="40" width="70" height="160" rx="4" stroke="currentColor" strokeWidth="2" fill="#FAF8F5" fillOpacity="0.5" />
          <path d="M325 60 h40 M325 85 h40 M325 110 h40 M325 135 h40 M325 160 h40" stroke="currentColor" strokeWidth="1.5" />
          <path d="M345 20 L345 40 M340 30 L350 30" stroke="currentColor" strokeWidth="2" />

          <rect x="390" y="90" width="65" height="110" rx="4" stroke="currentColor" strokeWidth="2" fill="#FAF8F5" fillOpacity="0.4" />
          <path d="M405 105 h35 M405 130 h35 M405 155 h35" stroke="currentColor" strokeWidth="1.5" />

          {/* Dome / Arch Structure */}
          <path d="M200 200 C200 130 250 130 250 200" stroke="currentColor" strokeWidth="2" fill="none" />
          <path d="M225 150 L225 200" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
          
          {/* Plant foliage accent */}
          <circle cx="150" cy="185" r="15" stroke="currentColor" strokeWidth="2" fill="#DDF2E6" />
          <circle cx="170" cy="180" r="12" stroke="currentColor" strokeWidth="2" fill="#DDF2E6" />
        </svg>
      </div>
    </div>
  );
};
