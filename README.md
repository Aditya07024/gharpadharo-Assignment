# MeetPlan - All-in-One Meeting & Scheduling Dashboard

A responsive, high-fidelity scheduling dashboard web application built with **Next.js 14+ (App Router)**, **TypeScript**, **Tailwind CSS**, and **Google Calendar API Integration**.

Designed to replicate the **MeetPlan** UI reference with maximum accuracy, smooth interactions, responsive breakpoints across Mobile, Tablet, and Desktop, and live/demo Google Calendar synchronization.

---

## 🌟 Key Features

### 🎨 Pixel-Perfect UI & Responsive Layout
- **Brand Navigation & Sidebar**: Custom MeetPlan logo, rounded navigation items, "Upgrade to Pro" card, user profile footer, and slide-over mobile drawer navigation.
- **Header Bar**: Interactive search bar with `⌘ K` keyboard shortcut trigger, notification bell with unread badge popover, user avatar, and Google Calendar status pill.
- **Welcome Banner**: "Good Morning, Welcome back!" banner with total daily meeting counter and customized vector architectural line illustration SVG.
- **Metrics Grid**: 4 stat cards (*Upcoming Meetings*, *Pending Invitations*, *Hours Booked*, *Revenue in ₹*) with trend percentages and custom rounded icons.
- **Upcoming Meetings List**: Platform badges (*Google Meet*, *Zoom*, *Microsoft Teams*), participant avatar stacks, `Join` meeting buttons, and event menu actions.
- **Your Meeting Types Grid**: Interactive meeting template cards (*30 Min Consultation*, *60 Min Strategy Call*, *Quick Demo*, *Interview Session*) with single-click "Copy Link" to clipboard and instant toast feedback.
- **Interactive Calendar Widget**: Full month view (May 2025) with date selection, month navigation arrows, and event indicators.
- **Today's Schedule Timeline**: Color-coded timeline nodes connecting scheduled meetings and live synced Google Calendar events.
- **+ New Meeting Modal**: Modal form to add custom meetings into the schedule dynamically.

---

### 📅 Google Calendar API Integration
- **OAuth 2.0 Ready**: Built with environment variable support (`.env` / `.env.local`) for `NEXT_PUBLIC_GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, and `NEXT_PUBLIC_GOOGLE_CALENDAR_SCOPE`.
- **Dual Connect Options**:
  1. **Google OAuth 2.0 Sign-In**: Authenticate with real Google Cloud Console OAuth credentials.
  2. **Instant Demo Connection**: Evaluate the integration instantly with a single click without needing GCP credentials pre-configured. Imports sample live events (*Quarterly OKR Review*, *Client Onboarding Sync*, *Frontend Architecture Sync*) with visual `Synced` badges.

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18.17+ or v20+
- **npm**: v9+

### 1. Installation
Clone the repository and install project dependencies:

```bash
git clone <your-repo-url>
cd deh
npm install
```

### 2. Environment Variables
Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Configure your credentials in `.env.local`:

```env
# Google OAuth 2.0 Credentials (Optional for live OAuth mode)
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret

# NextAuth / Security Secret
NEXTAUTH_SECRET=meetplan-super-secret-key-production-2026
NEXTAUTH_URL=http://localhost:3000

# Google Calendar Scope
NEXT_PUBLIC_GOOGLE_CALENDAR_SCOPE=https://www.googleapis.com/auth/calendar.readonly
```

### 3. Run Development Server
Start the local Next.js development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🛠️ Tech Stack & Architecture

| Layer | Technology |
| :--- | :--- |
| **Framework** | Next.js 14+ (App Router) |
| **Language** | TypeScript (Strict Mode) |
| **Styling** | Tailwind CSS (v4) |
| **Icons** | Lucide React |
| **State Management** | React Context API (`CalendarContext`) |
| **API Integration** | Google Calendar REST API (`/v3/calendars/primary/events`) |

---

## 📂 Folder Structure

```
├── src/
│   ├── app/
│   │   ├── globals.css          # Design system tokens, color variables & custom scrollbar
│   │   ├── layout.tsx           # Root layout with CalendarProvider & Toast container
│   │   └── page.tsx             # Main MeetPlan Dashboard page
│   ├── components/
│   │   ├── common/              # Toast notifications
│   │   ├── dashboard/           # WelcomeBanner, MetricsGrid, UpcomingMeetings, MeetingTypes, CalendarWidget, TodayScheduleWidget
│   │   ├── layout/              # Sidebar, Header
│   │   └── modals/              # SearchModal (⌘K), NewMeetingModal, GoogleConnectModal
│   ├── context/
│   │   └── CalendarContext.tsx  # Global state for meetings, calendar sync & notifications
│   ├── data/
│   │   └── mockData.ts          # Initial metrics, meetings, meeting types & Google events
│   ├── lib/
│   │   └── googleCalendar.ts    # Google Calendar REST API client & transformers
│   └── types/
│       └── index.ts             # TypeScript interface definitions
├── .env.example                 # Documented environment variables template
├── .env.local                   # Development environment configuration
├── next.config.ts               # Next.js configuration
├── package.json                 # Project dependencies & scripts
└── README.md                    # Setup documentation
```

---

## 🧪 Verification & Build

To test production compilation:

```bash
npm run build
```

To run the production server:

```bash
npm run start
```
