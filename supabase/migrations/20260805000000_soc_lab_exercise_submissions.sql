-- SOC Lab portfolio site (soc-ransomware-isolation-lab) — exercise answers + AI feedback.
-- Deliberately a separate table from cyber-stride-learn's `exercise_submissions`:
-- different app, different exercise id scheme (text ids like "ex1"/"at5"/"log3"
-- instead of an integer section_id), and no dependency on auth.users since this
-- site has no login — visitors are identified by a random id generated client-side
-- and stored in localStorage.

create table if not exists public.soc_lab_exercise_submissions (
  id           uuid primary key default gen_random_uuid(),
  visitor_id   uuid not null,
  exercise_id  text not null,
  submission   text not null,
  ai_feedback  jsonb,
  score        int,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now(),

  constraint soc_lab_exercise_submissions_visitor_exercise unique (visitor_id, exercise_id)
);

alter table public.soc_lab_exercise_submissions enable row level security;

-- No auth on this site: every visitor uses the public anon key, scoped only by a
-- client-generated visitor_id. This is a portfolio demo (no PII, no real accounts),
-- so anon is allowed to read/write freely rather than being restricted by auth.uid().
create policy "Anon can manage soc lab exercise submissions"
  on public.soc_lab_exercise_submissions
  for all
  to anon
  using (true)
  with check (true);

create index if not exists soc_lab_exercise_submissions_visitor_idx
  on public.soc_lab_exercise_submissions (visitor_id);
