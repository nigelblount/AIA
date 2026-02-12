import Link from "next/link";
import { ReactNode } from "react";

export function AppShell({ orgSlug, children }: { orgSlug: string; children: ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <div className="grid grid-cols-[260px_1fr]">
        <aside className="min-h-screen border-r border-zinc-200 bg-white p-4">
          <div className="mb-6">
            <div className="text-xs font-semibold uppercase tracking-wide text-zinc-500">AIA</div>
            <div className="text-base font-semibold">Workspace</div>
            <div className="mt-1 text-xs text-zinc-500">/{orgSlug}</div>
          </div>

          <nav className="space-y-1 text-sm">
            <NavLink href={`/org/${orgSlug}/dashboard`}>Dashboard</NavLink>
            <NavLink href={`/org/${orgSlug}/cases`}>Cases</NavLink>
            <NavLink href={`/org/${orgSlug}/knowledge-base`}>Knowledge Base</NavLink>
            <NavLink href={`/org/${orgSlug}/templates`}>Templates & Standards</NavLink>
            <NavLink href={`/org/${orgSlug}/agents`}>Agents</NavLink>
            <NavLink href={`/org/${orgSlug}/admin/settings`}>Admin / Settings</NavLink>
          </nav>
        </aside>

        <div>
          <header className="sticky top-0 z-10 border-b border-zinc-200 bg-white/80 backdrop-blur">
            <div className="flex items-center justify-between px-6 py-3">
              <div className="text-sm text-zinc-600">AIA MVP UI Demo</div>
              <div className="flex items-center gap-2">
                <input
                  className="h-9 w-80 rounded-md border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-200"
                  placeholder="Search cases, tasks, artifacts…"
                />
                <div className="h-9 w-9 rounded-full bg-zinc-200" title="User" />
              </div>
            </div>
          </header>

          <main className="px-6 py-6">{children}</main>
        </div>
      </div>
    </div>
  );
}

function NavLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="block rounded-md px-3 py-2 text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900"
    >
      {children}
    </Link>
  );
}
