# MeetPlan - Scheduling Dashboard & Google Calendar Integration

A full-stack responsive web application built with **Next.js 14+ (App Router)**, **TypeScript**, and **Tailwind CSS** for the **Gharpadharo** Full Stack Developer technical assessment.

---

## 📌 Project Overview

MeetPlan is an all-in-one meeting scheduling and calendar management dashboard. It replicates the reference homepage design with high precision, offers full responsiveness across mobile, tablet, and desktop devices, and integrates with the **Google Calendar API** to fetch and display upcoming events.

---

## ✨ Features

- 🎨 **Pixel-Perfect UI**: Built with the exact MeetPlan color palette (`#1B4D3E` forest green, `#FAF8F5` cream background, rounded-3xl white cards, and Lucide icons).
- 📅 **Google Calendar Integration**:
  - Supports **Live Google OAuth 2.0** via `.env.local` credentials (`NEXT_PUBLIC_GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`).
  - Includes **Instant Demo Mode Sync** to test live event synchronization with a single click out of the box.
- 📱 **Fully Responsive**: Collapsible sidebar, mobile drawer navigation, and responsive grid layouts.
- 🗺️ **11 Navigation Views**:
  - **Dashboard**: Welcome banner with custom architectural vector artwork, 4 metric cards, upcoming meetings, meeting types, calendar widget, and timeline schedule.
  - **Meetings**: Filterable meetings table (*All*, *Today*, *Upcoming*, *Google Synced*) with live title search and join links.
  - **Calendar**: May 2025 monthly calendar grid with day agenda inspector.
  - **Availability**: Weekly working hours schedule, timezone selector, and meeting buffer controls.
  - **Meeting Types**: Booking templates grid with single-click link copier and embed code generator.
  - **Contacts**: Directory list with meeting history count and email actions.
  - **Analytics**: Performance KPIs, platform distribution charts (*Google Meet*, *Zoom*, *Teams*), and weekly density insights.
  - **Integrations**: Directory cards for Google Calendar, Zoom, Teams, Stripe, Slack, and Zapier.
  - **Team**: Workspace member roles and assigned booking links.
  - **Billing**: Subscription plan comparison (*Free Starter* vs *Pro ₹1,499/mo*) and invoice history.
  - **Settings**: Profile settings, email notification toggles, and security controls.
- ⚡ **Interactive Modals**:
  - **⌘ K Search Modal**: Quick search across meetings and contacts.
  - **Schedule Meeting Modal**: Create custom meetings dynamically.
  - **Upgrade Pro Modal**: Monthly/Annual pricing toggle and feature breakdown.
  - **Account Profile Popover**: Sidebar footer popover menu.

---

## 🚀 How to Run Locally

### 1. Clone the repository
```bash
git clone https://github.com/Aditya07024/gharpadharo-Assignment.git
cd gharpadharo-Assignment
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup environment variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

*(Optional)* Add your Google OAuth credentials in `.env.local`:
```env
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret
NEXTAUTH_SECRET=meetplan-super-secret-key-2026
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_GOOGLE_CALENDAR_SCOPE=https://www.googleapis.com/auth/calendar.readonly
```

### 4. Start development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS (v4)
- **Icons**: Lucide React
- **State**: React Context API (`CalendarContext`)
- **API**: Google Calendar REST API (`/v3/calendars/primary/events`)

---

## 📂 Project Structure

```
├── src/
│   ├── app/                # App router layout & dashboard page
│   ├── components/
│   │   ├── common/         # Toast notification
│   │   ├── dashboard/      # Welcome banner, metrics grid, upcoming meetings, meeting types, calendar widget, today schedule
│   │   ├── layout/         # Sidebar navigation & Header bar
│   │   ├── modals/         # Search (⌘K), New Meeting, Google Connect, Upgrade Pro
│   │   └── views/          # 11 sidebar page views
│   ├── context/            # Global state management
│   ├── data/               # Mock meetings & metric data
│   ├── lib/                # Google Calendar API helper utilities
│   └── types/              # TypeScript interface definitions
├── .env.example            # Environment variables template
├── .env.local              # Local environment configuration
├── package.json
└── README.md
```

---

## 📜 Production Build

To verify build compilation:
```bash
npm run build
npm run start
```
