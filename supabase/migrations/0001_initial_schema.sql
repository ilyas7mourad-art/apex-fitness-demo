-- ============================================================
-- Apex Fitness Dubai — Initial Schema
-- ============================================================

-- Enable UUID generation
create extension if not exists "pgcrypto";

-- ----------------------------------------------------------------
-- gyms
-- ----------------------------------------------------------------
create table if not exists gyms (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  slug        text not null unique,
  city        text not null,
  country     text not null default 'AE',
  timezone    text not null default 'Asia/Dubai',
  logo_url    text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index if not exists idx_gyms_slug on gyms(slug);

-- ----------------------------------------------------------------
-- machines
-- ----------------------------------------------------------------
create table if not exists machines (
  id            uuid primary key default gen_random_uuid(),
  gym_id        uuid not null references gyms(id) on delete cascade,
  name          text not null,
  slug          text not null,
  category      text not null,  -- e.g. 'cardio', 'strength', 'free_weights'
  muscle_groups text[] not null default '{}',
  instructions  text not null default '',
  common_mistakes text not null default '',
  variations    text not null default '',
  image_url     text,
  qr_code       text,
  is_active     boolean not null default true,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  unique(gym_id, slug)
);

create index if not exists idx_machines_gym_id     on machines(gym_id);
create index if not exists idx_machines_category   on machines(category) where is_active = true;
create index if not exists idx_machines_slug       on machines(slug);

-- ----------------------------------------------------------------
-- members
-- ----------------------------------------------------------------
create table if not exists members (
  id              uuid primary key default gen_random_uuid(),
  gym_id          uuid not null references gyms(id) on delete cascade,
  full_name       text not null,
  email           text,
  avatar_seed     text not null,  -- used to deterministically generate avatar URL
  gender          text check (gender in ('male','female','other','prefer_not_to_say')),
  fitness_level   text not null check (fitness_level in ('beginner','intermediate','advanced')),
  goal            text not null,  -- e.g. 'Weight Loss', 'Muscle Gain', 'Endurance'
  joined_at       timestamptz not null default now(),
  notes           text,           -- DEMO_FEATURED flag stored here
  status          text not null default 'active'
                    check (status in ('active','at_risk','churned','paused')),
  is_active       boolean not null default true,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create index if not exists idx_members_gym_id       on members(gym_id);
create index if not exists idx_members_status       on members(status);
create index if not exists idx_members_is_active    on members(is_active) where is_active = true;
create index if not exists idx_members_notes        on members(notes) where notes like '%DEMO_FEATURED%';

-- ----------------------------------------------------------------
-- programs
-- ----------------------------------------------------------------
create table if not exists programs (
  id               uuid primary key default gen_random_uuid(),
  gym_id           uuid not null references gyms(id) on delete cascade,
  name             text not null,
  slug             text not null,
  description      text not null default '',
  target_level     text not null check (target_level in ('beginner','intermediate','advanced')),
  duration_weeks   int not null check (duration_weeks > 0),
  sessions_per_week int not null check (sessions_per_week > 0),
  is_active        boolean not null default true,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now(),
  unique(gym_id, slug)
);

create index if not exists idx_programs_gym_id on programs(gym_id);

-- ----------------------------------------------------------------
-- program_exercises
-- ----------------------------------------------------------------
create table if not exists program_exercises (
  id          uuid primary key default gen_random_uuid(),
  program_id  uuid not null references programs(id) on delete cascade,
  machine_id  uuid references machines(id) on delete set null,
  name        text not null,
  day_number  int not null,
  order_index int not null default 0,
  sets        int not null default 3,
  reps_min    int,
  reps_max    int,
  rest_seconds int not null default 60,
  notes       text,
  created_at  timestamptz not null default now()
);

create index if not exists idx_prog_ex_program_id on program_exercises(program_id);
create index if not exists idx_prog_ex_machine_id on program_exercises(machine_id);
create index if not exists idx_prog_ex_day        on program_exercises(program_id, day_number);

-- ----------------------------------------------------------------
-- member_programs
-- ----------------------------------------------------------------
create table if not exists member_programs (
  id          uuid primary key default gen_random_uuid(),
  member_id   uuid not null references members(id) on delete cascade,
  program_id  uuid not null references programs(id) on delete cascade,
  started_at  timestamptz not null default now(),
  ended_at    timestamptz,
  is_active   boolean not null default true,
  created_at  timestamptz not null default now(),
  unique(member_id, program_id, started_at)
);

create index if not exists idx_member_programs_member_id   on member_programs(member_id);
create index if not exists idx_member_programs_program_id  on member_programs(program_id);
create index if not exists idx_member_programs_active      on member_programs(member_id, is_active) where is_active = true;

-- ----------------------------------------------------------------
-- sessions
-- ----------------------------------------------------------------
create table if not exists sessions (
  id              uuid primary key default gen_random_uuid(),
  member_id       uuid not null references members(id) on delete cascade,
  gym_id          uuid not null references gyms(id) on delete cascade,
  program_id      uuid references programs(id) on delete set null,
  started_at      timestamptz not null,
  ended_at        timestamptz,
  duration_seconds int,
  notes           text,
  created_at      timestamptz not null default now()
);

create index if not exists idx_sessions_member_id   on sessions(member_id);
create index if not exists idx_sessions_gym_id      on sessions(gym_id);
create index if not exists idx_sessions_started_at  on sessions(started_at desc);
create index if not exists idx_sessions_member_date on sessions(member_id, started_at desc);

-- ----------------------------------------------------------------
-- set_logs
-- ----------------------------------------------------------------
create table if not exists set_logs (
  id             uuid primary key default gen_random_uuid(),
  session_id     uuid not null references sessions(id) on delete cascade,
  machine_id     uuid references machines(id) on delete set null,
  exercise_name  text not null,
  set_number     int not null default 1,
  reps           int,
  weight_kg      numeric(6,2),
  duration_seconds int,
  notes          text,
  logged_at      timestamptz not null default now()
);

create index if not exists idx_set_logs_session_id  on set_logs(session_id);
create index if not exists idx_set_logs_machine_id  on set_logs(machine_id);
create index if not exists idx_set_logs_logged_at   on set_logs(logged_at desc);

-- ----------------------------------------------------------------
-- events
-- ----------------------------------------------------------------
create table if not exists events (
  id          uuid primary key default gen_random_uuid(),
  gym_id      uuid not null references gyms(id) on delete cascade,
  member_id   uuid references members(id) on delete set null,
  type        text not null,   -- e.g. 'check_in', 'program_start', 'milestone'
  payload     jsonb not null default '{}',
  occurred_at timestamptz not null default now(),
  created_at  timestamptz not null default now()
);

create index if not exists idx_events_gym_id      on events(gym_id);
create index if not exists idx_events_member_id   on events(member_id);
create index if not exists idx_events_type        on events(type);
create index if not exists idx_events_occurred_at on events(occurred_at desc);
create index if not exists idx_events_gym_date    on events(gym_id, occurred_at desc);

-- ----------------------------------------------------------------
-- Row Level Security
-- ----------------------------------------------------------------

alter table gyms             enable row level security;
alter table machines         enable row level security;
alter table members          enable row level security;
alter table programs         enable row level security;
alter table program_exercises enable row level security;
alter table member_programs  enable row level security;
alter table sessions         enable row level security;
alter table set_logs         enable row level security;
alter table events           enable row level security;

-- authenticated users can SELECT all rows (demo app — read-only from client)
create policy "authenticated_select_gyms"
  on gyms for select to authenticated using (true);

create policy "authenticated_select_machines"
  on machines for select to authenticated using (true);

create policy "authenticated_select_members"
  on members for select to authenticated using (true);

create policy "authenticated_select_programs"
  on programs for select to authenticated using (true);

create policy "authenticated_select_program_exercises"
  on program_exercises for select to authenticated using (true);

create policy "authenticated_select_member_programs"
  on member_programs for select to authenticated using (true);

create policy "authenticated_select_sessions"
  on sessions for select to authenticated using (true);

create policy "authenticated_select_set_logs"
  on set_logs for select to authenticated using (true);

create policy "authenticated_select_events"
  on events for select to authenticated using (true);

-- service_role can write (bypasses RLS by default in Supabase,
-- but explicit policies document intent)
create policy "service_role_all_gyms"
  on gyms for all to service_role using (true) with check (true);

create policy "service_role_all_machines"
  on machines for all to service_role using (true) with check (true);

create policy "service_role_all_members"
  on members for all to service_role using (true) with check (true);

create policy "service_role_all_programs"
  on programs for all to service_role using (true) with check (true);

create policy "service_role_all_program_exercises"
  on program_exercises for all to service_role using (true) with check (true);

create policy "service_role_all_member_programs"
  on member_programs for all to service_role using (true) with check (true);

create policy "service_role_all_sessions"
  on sessions for all to service_role using (true) with check (true);

create policy "service_role_all_set_logs"
  on set_logs for all to service_role using (true) with check (true);

create policy "service_role_all_events"
  on events for all to service_role using (true) with check (true);
