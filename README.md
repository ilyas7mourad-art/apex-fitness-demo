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

Edit `.env.local` with your Supabase project URL and anon key.  
For PR 1 the app renders without Supabase — seed data and queries are added in PR 2.

### 3. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 4. Build for production

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

## Project structure

```
apex-fitness-demo/
├── app/
│   ├── layout.tsx           Root layout, Inter font, metadata
│   ├── globals.css          Tailwind v4 + CSS variable theme tokens
│   ├── page.tsx             Landing page (demo entry point)
│   ├── m/page.tsx           Member experience (placeholder — PR 2)
│   └── admin/page.tsx       Owner dashboard (placeholder — PR 2)
├── components/
│   ├── ui/                  shadcn primitives
│   ├── marketing/           Landing page sections
│   ├── member/              Member screens (PR 2)
│   └── owner/               Owner dashboard (PR 2)
├── lib/
│   ├── supabase.ts          Supabase client wrapper
│   ├── types.ts             Shared TypeScript types
│   ├── utils.ts             shadcn cn() utility
│   └── seed/                Seed scripts (PR 2)
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
```
