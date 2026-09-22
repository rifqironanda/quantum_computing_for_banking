-- PostgreSQL/Supabase baseline for the report workspace.
-- Review policies and retention requirements before production deployment.

create extension if not exists pgcrypto;

create type public.report_role as enum ('owner', 'editor', 'reviewer', 'viewer');
create type public.report_section_status as enum ('draft', 'review', 'complete');

create table public.reports (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  owner_id uuid not null references auth.users(id) on delete restrict,
  outline_version integer not null default 1 check (outline_version > 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.report_collaborators (
  report_id uuid not null references public.reports(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.report_role not null,
  created_at timestamptz not null default now(),
  primary key (report_id, user_id)
);

create table public.report_sections (
  id uuid primary key default gen_random_uuid(),
  report_id uuid not null references public.reports(id) on delete cascade,
  section_key text not null,
  parent_key text,
  heading_number text,
  title text not null,
  heading_level smallint not null check (heading_level between 2 and 4),
  position integer not null check (position >= 0),
  content_html text not null default '<p><br></p>',
  content_text text not null default '',
  status public.report_section_status not null default 'draft',
  revision integer not null default 0 check (revision >= 0),
  updated_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (report_id, section_key),
  unique (report_id, position)
);

create table public.report_section_revisions (
  id bigint generated always as identity primary key,
  section_id uuid not null references public.report_sections(id) on delete cascade,
  revision integer not null,
  content_html text not null,
  content_text text not null,
  status public.report_section_status not null,
  changed_by uuid references auth.users(id) on delete set null,
  changed_at timestamptz not null default now(),
  unique (section_id, revision)
);

create index report_sections_report_position_idx on public.report_sections(report_id, position);
create index report_revisions_section_changed_idx on public.report_section_revisions(section_id, changed_at desc);

create or replace function public.can_read_report(target_report_id uuid)
returns boolean language sql stable security definer set search_path = public
as $$
  select exists (
    select 1 from public.reports r
    where r.id = target_report_id and (
      r.owner_id = (select auth.uid()) or exists (
        select 1 from public.report_collaborators c
        where c.report_id = r.id and c.user_id = (select auth.uid())
      )
    )
  );
$$;

create or replace function public.can_edit_report(target_report_id uuid)
returns boolean language sql stable security definer set search_path = public
as $$
  select exists (
    select 1 from public.reports r
    where r.id = target_report_id and (
      r.owner_id = (select auth.uid()) or exists (
        select 1 from public.report_collaborators c
        where c.report_id = r.id and c.user_id = (select auth.uid())
          and c.role in ('owner', 'editor')
      )
    )
  );
$$;

create or replace function public.audit_report_section_update()
returns trigger language plpgsql security definer set search_path = public
as $$
begin
  if tg_op = 'UPDATE' and (
    old.content_html is distinct from new.content_html or
    old.status is distinct from new.status
  ) then
    new.revision := old.revision + 1;
    new.updated_at := now();
    new.updated_by := (select auth.uid());
    insert into public.report_section_revisions
      (section_id, revision, content_html, content_text, status, changed_by)
    values
      (old.id, old.revision, old.content_html, old.content_text, old.status, (select auth.uid()));
  end if;
  return new;
end;
$$;

create trigger report_section_audit
before update on public.report_sections
for each row execute function public.audit_report_section_update();

alter table public.reports enable row level security;
alter table public.report_collaborators enable row level security;
alter table public.report_sections enable row level security;
alter table public.report_section_revisions enable row level security;

create policy reports_select on public.reports for select to authenticated
using (public.can_read_report(id));
create policy reports_insert on public.reports for insert to authenticated
with check ((select auth.uid()) is not null and owner_id = (select auth.uid()));
create policy reports_update on public.reports for update to authenticated
using (public.can_edit_report(id)) with check (public.can_edit_report(id));

create policy collaborators_select on public.report_collaborators for select to authenticated
using (public.can_read_report(report_id));
create policy sections_select on public.report_sections for select to authenticated
using (public.can_read_report(report_id));
create policy sections_insert on public.report_sections for insert to authenticated
with check (public.can_edit_report(report_id));
create policy sections_update on public.report_sections for update to authenticated
using (public.can_edit_report(report_id)) with check (public.can_edit_report(report_id));
create policy revisions_select on public.report_section_revisions for select to authenticated
using (exists (
  select 1 from public.report_sections s
  where s.id = section_id and public.can_read_report(s.report_id)
));

