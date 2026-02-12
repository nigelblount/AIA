import { Card, Pill } from "@/components/aia/ui";
import { mockAlerts, mockCases, statusLabel } from "@/lib/mock";
import Link from "next/link";
import { t } from "@/i18n/t";

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ orgSlug: string }>;
}) {
  const { orgSlug } = await params;

  return (
    <div className="space-y-6">
      <div>
        <div className="text-xs font-semibold uppercase tracking-wide text-zinc-500">{t("dashboard.title")}</div>
        <h1 className="mt-1 text-2xl font-semibold">{t("dashboard.casesTitle")}</h1>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card title={t("dashboard.alerts")}>
          <ul className="space-y-2">
            {mockAlerts.map((a, idx) => (
              <li key={idx} className="flex items-center justify-between gap-3">
                <span className="text-xs text-zinc-700">{a.text}</span>
                <Pill tone={a.kind === "approval" ? "amber" : a.kind === "data" ? "red" : "blue"}>{a.kind}</Pill>
              </li>
            ))}
          </ul>
        </Card>
        <Card title={t("dashboard.filters")}>
          <div className="grid gap-2">
            <input className="h-9 rounded-md border border-zinc-200 px-3 text-sm" placeholder="Client" />
            <input className="h-9 rounded-md border border-zinc-200 px-3 text-sm" placeholder="Sector" />
            <input className="h-9 rounded-md border border-zinc-200 px-3 text-sm" placeholder="Status" />
          </div>
        </Card>
        <Card title={t("dashboard.quickActions")}>
          <div className="space-y-2">
            <button className="w-full rounded-md bg-zinc-900 px-3 py-2 text-sm font-semibold text-white hover:bg-zinc-800">{t("dashboard.newCase")}</button>
            <button className="w-full rounded-md border border-zinc-200 px-3 py-2 text-sm font-semibold text-zinc-800 hover:bg-zinc-50">{t("dashboard.importRequest")}</button>
          </div>
        </Card>
      </div>

      <div className="rounded-xl border border-zinc-200 bg-white shadow-sm">
        <div className="border-b border-zinc-200 px-4 py-3 text-sm font-semibold">{t("dashboard.caseList")}</div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-zinc-50 text-xs font-semibold uppercase tracking-wide text-zinc-600">
              <tr>
                <th className="px-4 py-3">{t("dashboard.columns.name")}</th>
                <th className="px-4 py-3">{t("dashboard.columns.client")}</th>
                <th className="px-4 py-3">{t("dashboard.columns.sector")}</th>
                <th className="px-4 py-3">{t("dashboard.columns.owner")}</th>
                <th className="px-4 py-3">{t("dashboard.columns.due")}</th>
                <th className="px-4 py-3">{t("dashboard.columns.status")}</th>
              </tr>
            </thead>
            <tbody>
              {mockCases.map((c) => (
                <tr key={c.id} className="border-t border-zinc-100 hover:bg-zinc-50">
                  <td className="px-4 py-3 font-medium">
                    <Link className="text-blue-700 hover:underline" href={`/org/${orgSlug}/cases/${c.id}/intake`}>
                      {c.name}
                    </Link>
                  </td>
                  <td className="px-4 py-3">{c.client}</td>
                  <td className="px-4 py-3">{c.sector}</td>
                  <td className="px-4 py-3">{c.owner}</td>
                  <td className="px-4 py-3">{c.dueDate}</td>
                  <td className="px-4 py-3">
                    <Pill tone={c.status === "qa" ? "amber" : c.status === "data" ? "red" : "zinc"}>{statusLabel(c.status)}</Pill>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
