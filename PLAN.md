# AI-Powered Gamified CRM & Work OS - Master Plan

## 1. Project Overview
A next-generation internal CRM and performance management system that gamifies work, tracks productivity via AI, and provides deep insights for management.
**Goal:** Make work feel like a game while ensuring high productivity and transparency.

## 2. Tech Stack
- **Frontend:** Next.js 15 (App Router, TypeScript)
- **UI Framework:** Tailwind CSS v4, shadcn/ui
- **Animations:** Framer Motion (micro-interactions, page transitions)
- **Charts:** Recharts
- **State Management:** Zustand (Global Store), React Query (Server State)
- **Backend/DB:** Supabase (PostgreSQL, Auth, Realtime)
- **AI Engine:** OpenAI API (via Next.js API Routes)
- **Icons:** Lucide React

## 3. Core Features & UX Flow

### 🔐 Authentication & Onboarding
- **Login:** Email/Password or Magic Link via Supabase.
- **Onboarding:** "Character Creation" style profile setup.
- **Role Assignment:** Admin assigns roles (Manager, Team Member).

### ⏰ Daily Check-in (The "Start Game" Button)
- **Flow:** User logs in -> Prompted with "Ready to start the day?".
- **Input:** Select key tasks, set priorities, rate mood/energy.
- **Gamification:** Streak counter increases + Daily Login Bonus (+10 XP).

### ✅ Task Management (The "Quest Log")
- **Kanban/List View:** Drag and drop tasks.
- **Smart Estimation:** AI analyzes task description and suggests effort.
- **Gamified Actions:**
  - Completing a task triggers "Level Up" animations.
  - "Combo Mode" for completing multiple small tasks quickly.

### 🌙 EOD Update (The "Save Game" Point)
- **Flow:** End of day prompt.
- **Input:** What did you finish? What blocked you?
- **AI Analysis:** AI generates a "Daily Recap" and assigns a Productivity Score (0-100).

### 🏆 Gamification Engine
- **Leaderboards:** Real-time ranking based on XP/Points.
- **Badges:**
  - "Early Bird" (Login before 9 AM)
  - "Task Slayer" (5 tasks in a day)
  - "Streak Master" (10 day login streak)
- **Shop (Optional):** Redeem points for real-world perks (managed by Admin).

### 📊 Analytics Dashboard
- **User View:** My stats, productivity trend, XP history.
- **Manager View:** Team heatmap, burnout risk alerts (AI predicted), performance outliers.

## 4. Architecture & Component Structure

### Directory Structure
```
src/
├── app/                 # Next.js App Router
│   ├── (auth)/          # Login/Signup pages
│   ├── (dashboard)/     # Main app layout
│   │   ├── check-in/    # Daily Check-in
│   │   ├── tasks/       # Task Board
│   │   ├── leaderboard/ # Gamification stats
│   │   └── analytics/   # Charts & Reports
│   └── api/             # Backend Routes (AI, webhooks)
├── components/
│   ├── ui/              # shadcn primitives (Button, Card...)
│   ├── layout/          # Sidebar, Navbar, Shell
│   ├── features/        # Feature-specific components
│   │   ├── tasks/       # TaskCard, KanbanBoard
│   │   ├── gamification/# XPBar, BadgeList, LeaderboardTable
│   │   └── analytics/   # ProductivityChart, BurnoutGauge
├── lib/
│   ├── supabase/        # Supabase client
│   ├── openai.ts        # AI wrapper
│   └── utils.ts         # Helpers
├── hooks/               # Custom React hooks
├── store/               # Zustand stores (useAuthStore, useGameStore)
└── types/               # TypeScript definitions
```

## 5. AI Logic & Integration
- **Productivity Scoring:**
  - Input: Task completion count, complexity, timeliness, focus time (implied).
  - Output: 0-100 Score + Summary text.
- **Burnout Detection:**
  - Input: Late EOD updates, negative sentiment in check-ins, declining velocity.
  - Output: Alert to Manager.
- **Task Complexity:**
  - Input: Task title & description.
  - Output: Story Points / Estimated Hours.

## 6. Next Steps for Implementation
1.  **Setup Supabase:** Connect environment variables.
2.  **Auth Flow:** Implement Login/Signup.
3.  **Layout:** Build the Dashboard Shell (Sidebar + Header).
4.  **Daily Check-in:** Build the form and DB connection.
5.  **Gamification:** Implement XP system and visual feedback.
