-- Einzeilige Tabelle, die der Keepalive-Job aktualisiert. Zweck ist
-- ausschließlich, dem Supabase-Free-Tier echte Datenbankaktivität (einen
-- Schreibvorgang) zu zeigen, damit das Projekt nicht wegen Inaktivität
-- pausiert wird. Enthält bewusst keine personenbezogenen Daten.
create table public.keepalive (
  id smallint primary key default 1,
  last_ping timestamptz not null default now(),
  ping_count bigint not null default 0,
  constraint keepalive_single_row check (id = 1)
);

insert into public.keepalive (id) values (1);

-- RLS an, aber bewusst ohne Policies: direkter Zugriff über die REST-API
-- ist damit für anon/authenticated komplett gesperrt. Geschrieben wird
-- ausschließlich über die security-definer-Funktion unten.
alter table public.keepalive enable row level security;

create or replace function public.keepalive_ping()
returns timestamptz
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_last_ping timestamptz;
begin
  update public.keepalive
     set last_ping = now(),
         ping_count = ping_count + 1
   where id = 1
  returning last_ping into v_last_ping;

  return v_last_ping;
end;
$$;

-- Postgres vergibt bei CREATE FUNCTION automatisch EXECUTE an PUBLIC. Das
-- muss explizit entzogen werden, sonst läuft ein revoke von einzelnen
-- Rollen ins Leere (jede Rolle ist implizit Mitglied von PUBLIC).
revoke execute on function public.keepalive_ping() from public;

-- Aufrufbar nur mit dem öffentlichen anon-Key. Die Funktion kann nichts
-- anderes, als einen Zeitstempel hochzuzählen — der mögliche Missbrauch
-- (jemand ruft sie zusätzlich auf) ist genau das gewünschte Verhalten.
grant execute on function public.keepalive_ping() to anon;
