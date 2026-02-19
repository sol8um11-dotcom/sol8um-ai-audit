# AI Opportunity Audit — Project Context

## Project Purpose
A gamified 1-page AI Opportunity Audit form for sol8um.tech — serves dual purpose:
1. **Lead magnet** on sol8um website
2. **Ice breaker tool** at business expos (first target: FRO India Jaipur, Feb 21-22, 2026)

## Target Audience
Business owners, founders, core team members of companies — people attending franchise & retail opportunity expos. These are decision-makers with real budget authority. They include:
- Franchise seekers & investors (5,000+ HNI delegates)
- Brand owners setting up stalls (100+ brands)
- Entrepreneurs exploring new business opportunities

## Key Design Goals
- **Results under 15 seconds** — pre-trained, no API calls needed
- **Gamified experience** — micro-interactions, auto-advance, celebrations
- **Maximum pre-filled/clickable options** — minimal typing, mostly taps
- **"This guy knows what to build"** — the form itself should demonstrate sol8um's product craft
- **Dark navy gradient + glassmorphism** — premium, modern aesthetic
- **iPad Pro 12.9" optimized** — primary expo device (1024x1366 portrait, 1366x1024 landscape)

## Brand: Sol8um
- **Tagline:** "AI Automation That Pays For Itself"
- **Logo files** (in `/public/` — sourced from `E:\AI Opportunity Audit Form\SOL8UM logo\`):
  - `sol8um-logo-dark-bg.png` — White text SOL8UM for DARK backgrounds (used in header)
  - `sol8um-logo-light-bg.webp` — Dark navy text SOL8UM for LIGHT backgrounds (GlassCard contexts)
  - `sol8um-8-mark.jpg` — The "8" mark only
  - `sol8um-favicon.jpg` — Favicon/app icon
- **Primary Colors:**
  - Deep Navy: #0a0f2c (dark backgrounds, body bg gradient)
  - Vibrant Blue: #2563eb (primary actions, CTAs)
  - Cyan/Turquoise: #00d4ff → #2ddbe6 (accent, gradients)
- **Secondary:**
  - Light accents: rgba(37, 99, 235, 0.1) for subtle backgrounds
  - White: #ffffff (GlassCard background at 85% opacity)
  - Gradient: Navy → Blue → Cyan for CTAs and title text
- **Fonts:** Inter (body via next/font/google), DM Sans (display headings via `--font-display`)
- **Design Language:** Dark navy gradient bg, animated blobs, GlassCard with backdrop-filter blur(20px), 3D emojis, metallic buttons

## Tech Stack
- Next.js 16.1.6 (App Router, TypeScript)
- Tailwind CSS v4
- Framer Motion (animations)
- Supabase (free tier — lead storage)
- Vercel (deployment)
- No AI API calls — all pre-trained/pre-computed results

## FRO Jaipur 2026 — Target Sectors (9 sectors)
1. Food & Restaurant (QSR, beverages, cloud kitchens)
2. Hotel, Travel & Tourism
3. E-Commerce & D2C
4. Auto & EV
5. Beauty, Health & Wellness
6. Education & EdTech
7. Specialty Services (finance, logistics, HR, payments)
8. Fashion & Jewelry
9. Dealer & Distributor

## Architecture
- `src/components/AuditForm.tsx` — Main gamified form with 8-step flow, dark bg, GlassCard, auto-advance
- `src/components/ResultsView.tsx` — Instant results display with AIReadinessGauge, solutions, quick wins, CTA
- `src/components/Gamification.tsx` — Emoji3D, AIReadinessGauge, SelectionConfetti, PulseRing, StepCelebration, FloatingEmoji, PainSlider, MetallicButton, ProgressBar, StepDots, ScorePreview, StreakCounter, AnimatedCounter
- `src/components/Logo.tsx` — Logo component with `variant` prop ("dark" for light bg, "light" for dark bg) + LogoMark
- `src/components/FloatingHints.tsx` — Side hints (currently not actively used in V6 design)
- `src/lib/knowledge-base.ts` — Pre-trained sector data: 9 sectors, 72+ pain points, 144+ solutions
- `src/lib/supabase.ts` — Supabase client for lead capture (includes tribe field)
- `supabase-schema.sql` — Database schema for `audit_submissions` table

## Form Flow (8 steps, all gamified)
0. **Name** — only free-type field (along with step 7). Title: "AI Opportunity Audit"
1. **Tribe** — Franchisor, Franchisee, Investor, Distributor (auto-advance)
2. **Sector** — 9 industry options (auto-advance)
3. **Team Size** — size brackets (auto-advance)
4. **Pain Points** — multi-select with descriptions and intensity slider
5. **Tech Readiness** — 4 levels (auto-advance)
6. **Budget** — monthly ranges (auto-advance)
7. **Contact** — business name + WhatsApp number (to receive results)

## Key UX Principles
- Dark navy gradient background with animated floating blobs
- GlassCard: white bg at 85% opacity, backdrop-filter blur(20px), rounded-3xl
- Celebration micro-animations on selections (confetti, pulse rings)
- Auto-advance on single-choice steps (600ms delay)
- 3D emoji styling with drop-shadow and perspective transforms
- Progress bar with glowing tip, step dots with shimmer
- WhatsApp-first CTA (India market)
- iPad Pro 12.9" responsive via `md:` breakpoint (768px+)

## Supabase Configuration
- **Project ID:** zpilaphkxpoxgkvedjex
- **Project URL:** https://zpilaphkxpoxgkvedjex.supabase.co
- **Env vars:** `.env.local` (gitignored) with `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **Table:** `audit_submissions` (see `supabase-schema.sql`)
- **RLS:** Insert-only policy for anon role (users can submit but not read/modify)

## Deployment
- **GitHub:** https://github.com/sol8um11-dotcom/sol8um-ai-audit
- **Hosting:** Vercel (needs env vars configured in Vercel dashboard)
- **Dev server:** `npx next dev --port 3002`
- **Git identity:** Set locally per-repo (not global)

## Critical Technical Notes
- Unicode escape sequences MUST be inside `{"\u{...}"}` in JSX text, NOT raw `\u{...}` — causes parser errors
- AnimatePresence uses `mode="sync"` for multiple children, `mode="wait"` for single child swap
- `shadow` is NOT a valid Framer Motion property in `whileHover` — use boxShadow via style instead
- Auto-advance timer must be cleared in goBack/goNext to prevent stale navigation
- `.env.local` is gitignored — never commit credentials
- Port 3002 can get stale node processes — kill with `taskkill //F //IM node.exe` and remove `.next/dev/lock` if needed
- WhatsApp number in ResultsView is still placeholder `919876543210` — needs real number before expo
