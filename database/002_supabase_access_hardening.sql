-- Apply after 001_report_workspace.sql.
-- Narrows function/table privileges and lets report owners manage collaborators.

revoke all on function public.can_read_report(uuid) from public;
revoke all on function public.can_edit_report(uuid) from public;
grant execute on function public.can_read_report(uuid) to authenticated;
grant execute on function public.can_edit_report(uuid) to authenticated;

revoke all on table public.reports from anon;
revoke all on table public.report_collaborators from anon;
revoke all on table public.report_sections from anon;
revoke all on table public.report_section_revisions from anon;

grant select, insert, update on table public.reports to authenticated;
grant select, insert, update, delete on table public.report_collaborators to authenticated;
grant select, insert, update, delete on table public.report_sections to authenticated;
grant select on table public.report_section_revisions to authenticated;
grant usage, select on all sequences in schema public to authenticated;

drop policy if exists collaborators_insert on public.report_collaborators;
create policy collaborators_insert on public.report_collaborators
for insert to authenticated
with check (exists (
  select 1 from public.reports r
  where r.id = report_id and r.owner_id = (select auth.uid())
));

drop policy if exists collaborators_update on public.report_collaborators;
create policy collaborators_update on public.report_collaborators
for update to authenticated
using (exists (
  select 1 from public.reports r
  where r.id = report_id and r.owner_id = (select auth.uid())
))
with check (exists (
  select 1 from public.reports r
  where r.id = report_id and r.owner_id = (select auth.uid())
));

drop policy if exists collaborators_delete on public.report_collaborators;
create policy collaborators_delete on public.report_collaborators
for delete to authenticated
using (exists (
  select 1 from public.reports r
  where r.id = report_id and r.owner_id = (select auth.uid())
));

drop policy if exists sections_delete on public.report_sections;
create policy sections_delete on public.report_sections
for delete to authenticated
using (public.can_edit_report(report_id));
