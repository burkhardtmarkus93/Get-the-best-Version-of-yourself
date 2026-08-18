-- Fortschritt des Fußballwörter Trainers (Leitner-System), gespiegelt aus
-- dem bisher rein lokalen (localStorage) Speicher, für geräteübergreifenden
-- Sync eingeloggter Nutzer. card_key entspricht dem bestehenden Client-Key
-- "${cardIndex}_${from}_${to}".
create table public.vocab_progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  card_key text not null,
  box smallint not null default 0,
  due bigint not null default 0,
  seen integer not null default 0,
  updated_at timestamptz not null default now(),
  primary key (user_id, card_key)
);

alter table public.vocab_progress enable row level security;

create policy "vocab_progress_select_own"
  on public.vocab_progress for select
  using (auth.uid() = user_id);

create policy "vocab_progress_insert_own"
  on public.vocab_progress for insert
  with check (auth.uid() = user_id);

create policy "vocab_progress_update_own"
  on public.vocab_progress for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "vocab_progress_delete_own"
  on public.vocab_progress for delete
  using (auth.uid() = user_id);
