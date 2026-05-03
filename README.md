# Apex Fitness Dubai — Demo

An interactive product demo for a B2B SaaS platform targeting independent gyms.
The demo uses a fictional gym ("Apex Fitness Dubai") with realistic fake data to
showcase three core product pillars:

- **Personalized workout programs** — members follow structured, coach-designed plans
- **QR machine guidance** — scan any machine for instant video instructions
- **Retention analytics** — owners monitor churn signals and program adoption

> This is a marketing/sales demo — all data is fabricated. Not a live gym product.

---

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js (App Router) + TypeScript |
| Styling | Tailwind CSS v4 + shadcn/ui |
| Database client | Supabase JS |
| Charts | Recharts |
| Icons | lucide-react |
| Formatting | Prettier + ESLint |

---

## Getting started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your Supabase project URL, anon key, and service role key.

```
NEXT_PUBLIC_SUPABASE_URL=https://<project>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon-key>
SUPABASE_SERVICE_ROLE_KEY=<service-role-key>
```

### 3. Apply the database migration

Paste the contents of `supabase/migrations/0001_initial_schema.sql` into the
**SQL Editor** in your Supabase dashboard and run it. This creates all 9 tables,
indexes, and RLS policies.

### 4. Seed demo data

```bash
npm run seed -- --force
```

This inserts 1 gym, 18 machines, 80 members, 4 programs, ~1 800 sessions, and
~2 500 events. Re-run at any time to reset to a clean demo state.

### 5. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 6. Build for production

```bash
npm run build
npm run start
```

---

## Demo flow

```
/ (landing page — demo entry point)
├── /m        Member experience  (programs, QR scanner, session log)
└── /admin    Gym owner dashboard (retention, analytics, management)
```

The landing page is what prospects see first. Both experience paths are linked
from it with brief context about what each demonstrates.

---

## Design system

- **Font**: Inter (loaded via `next/font/google`)
- **Mode**: Light only (v1 — dark mode not in scope)
- **Accent**: Warm amber `oklch(0.720 0.160 52)` — a premium copper tone that
  evokes Dubai luxury fitness without generic "SaaS blue"
- **CSS variables**: defined in `app/globals.css` via shadcn's `@theme inline` block

| Token | Value | Usage |
|---|---|---|
| `--background` | `oklch(0.990 0 0)` | Page background |
| `--foreground` | `oklch(0.120 0 0)` | Primary text |
| `--muted-foreground` | `oklch(0.500 0 0)` | Secondary text |
| `--border` | `oklch(0.900 0 0)` | Dividers, card borders |
| `--brand` | `oklch(0.720 0.160 52)` | Accent highlights, icons, CTAs |

---

## Schema overview

9 tables, all scoped by `gym_id`:

| Table | Purpose |
|---|---|
| `gyms` | Gym profile (one row for the demo) |
| `machines` | 18 gym machines with instructions and QR codes |
| `members` | 80 demo members; 10 flagged `DEMO_FEATURED` for the picker |
| `programs` | 4 structured workout programs |
| `program_exercises` | Exercises within each program (day, order, sets, reps) |
| `member_programs` | Which members are enrolled in which programs |
| `sessions` | ~1 800 workout sessions across 3 months |
| `set_logs` | Individual sets logged within each session |
| `events` | Audit/activity stream (check-ins, milestones, alerts) |

RLS is enabled on all tables. Browser clients (anon key) can only SELECT.
Writes require the service role key used by the seed script and server actions.

---

## Hybrid auth (no login required)

The member experience uses a "demo picker" pattern:

1. `/m` shows 10 featured member cards — visitor clicks one
2. A server action writes `apex_demo_member_id` (UUID) to a first-party cookie
3. All subsequent member routes read this cookie and query via the admin client

No Supabase Auth is involved. This keeps the demo frictionless while still
demonstrating personalised, member-specific views.

---

## Project structure

```
apex-fitness-demo/
├── app/
│   ├── layout.tsx           Root layout, Inter font, metadata
│   ├── globals.css          Tailwind v4 + CSS variable theme tokens
│   ├── page.tsx             Landing page (demo entry point)
│   ├── actions/member.ts    Server action — sets demo member cookie
│   ├── api/health/          GET endpoint returning table row counts
│   ├── m/page.tsx           Member picker (10 DEMO_FEATURED cards)
│   ├── m/dashboard/         Member dashboard (reads cookie)
│   └── admin/page.tsx       Owner dashboard (placeholder)
├── components/
│   ├── ui/                  shadcn primitives
│   ├── marketing/           Landing page sections
│   └── member/member-card.tsx  Clickable member card with amber hover
├── lib/
│   ├── supabase.ts          createBrowserClient / createServerClient / createAdminClient
│   ├── types.ts             Database interfaces + convenience joined types
│   ├── db/queries.ts        Query helpers (getGym, listMembers, getSessions, …)
│   └── utils.ts             shadcn cn() utility
├── supabase/
│   ├── migrations/          SQL migration files
│   └── seed/seed.ts         80-member demo seed (run with npm run seed -- --force)
└── public/                  Static assets
```

---

## Deployment

The project deploys on [Vercel](https://vercel.com) without any extra config.
Connect the repo, add the two env vars, and deploy.

Required env vars:

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```
