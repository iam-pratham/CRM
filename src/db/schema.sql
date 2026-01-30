-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- PROFILES (Extends Supabase Auth)
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  email text unique not null,
  full_name text,
  avatar_url text,
  role text check (role in ('admin', 'manager', 'member')) default 'member',
  department text,
  
  -- Gamification Stats
  total_points integer default 0,
  current_streak integer default 0,
  longest_streak integer default 0,
  level integer default 1,
  
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- TASKS
create table tasks (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text,
  assigned_to uuid references profiles(id),
  created_by uuid references profiles(id),
  
  status text check (status in ('todo', 'in_progress', 'blocked', 'completed')) default 'todo',
  priority text check (priority in ('low', 'medium', 'high', 'urgent')) default 'medium',
  
  due_date timestamp with time zone,
  estimated_hours numeric,
  actual_hours numeric,
  
  ai_complexity_score numeric, -- AI estimated complexity
  
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- DAILY LOGINS (Check-ins)
create table daily_logins (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references profiles(id) not null,
  date date default current_date not null,
  
  check_in_time timestamp with time zone default now(),
  mood text, -- 'motivated', 'tired', 'neutral', etc.
  
  planned_tasks_summary text, -- AI generated or user input
  
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, date)
);

-- EOD UPDATES (End of Day)
create table eod_updates (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references profiles(id) not null,
  date date default current_date not null,
  
  completed_tasks_summary text,
  blockers text,
  notes text,
  
  productivity_score integer check (productivity_score between 0 and 100), -- AI scored
  manager_feedback text,
  
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, date)
);

-- ACHIEVEMENTS
create table achievements (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text not null,
  icon text, -- icon name or url
  points_reward integer default 10,
  category text, -- 'streak', 'performance', 'collaboration'
  
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- USER ACHIEVEMENTS
create table user_achievements (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references profiles(id) not null,
  achievement_id uuid references achievements(id) not null,
  earned_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, achievement_id)
);

-- POINTS HISTORY (Audit Log for Gamification)
create table points_history (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references profiles(id) not null,
  amount integer not null,
  reason text not null, -- 'Task Completed', '7 Day Streak', etc.
  source_id uuid, -- Optional reference to task_id or achievement_id
  
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Row Level Security (RLS) Policies (Draft)
-- alter table profiles enable row level security;
-- alter table tasks enable row level security;
-- ... (Policies would be defined here to ensure privacy and access control)
