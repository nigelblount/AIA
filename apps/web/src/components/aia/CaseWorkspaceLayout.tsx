import Link from "next/link";
import { ReactNode } from "react";
import { Card, Pill } from "@/components/aia/ui";
import { mockGates, steps } from "@/lib/mock";
import { ArtifactsPanel } from "@/components/aia/ArtifactsPanel";
import { t } from "@/i18n/t";

export function CaseWorkspaceLayout({
  orgSlug,
  caseId,
  activeStep,
  children,
}: {
  orgSlug: string;
  caseId: string;
  activeStep: string;
  children: ReactNode;
}) {
  return (
    <div className="grid gap-4 lg:grid-cols-[280px_1fr_320px]">
      {/* A) Workflow & Gates */}
      <aside className="space-y-4">
        <Card title={t("caseWorkspace.workflow")}>
          <div className="space-y-1">
            {steps.map((s) => {
              const isActive = s.key === activeStep;
              return (
                <Link
                  key={s.key}
                  href={`/org/${orgSlug}/cases/${caseId}/${s.key}`}
                  className={`block rounded-md px-2 py-1.5 text-sm ${isActive ? "bg-zinc-900 text-white" : "text-zinc-700 hover:bg-zinc-100"}`}
                >
                  {s.label}
                </Link>
              );
            })}
          </div>
        </Card>

        <Card title={t("caseWorkspace.approvals")}>
          <div className="space-y-2">
            {mockGates.map((g) => (
              <div key={g.n} className="flex items-center justify-between gap-2 rounded-lg border border-zinc-200 px-3 py-2">
                <div className="text-sm font-medium">Gate {g.n}</div>
                <GatePill status={g.status} />
              </div>
            ))}
          </div>
          <div className="mt-3 flex gap-2">
            <button className="rounded-md bg-zinc-900 px-3 py-2 text-xs font-semibold text-white hover:bg-zinc-800">
              {t("caseWorkspace.requestApproval")}
            </button>
            <button className="rounded-md border border-zinc-200 px-3 py-2 text-xs font-semibold text-zinc-800 hover:bg-zinc-50">
              {t("caseWorkspace.approveReject")}
            </button>
          </div>
          <div className="mt-2 text-xs text-zinc-500">{t("caseWorkspace.demoControls")}</div>
        </Card>
      </aside>

      {/* B) Work area */}
      <section className="space-y-4">
        <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
          <div className="text-xs font-semibold uppercase tracking-wide text-zinc-500">{t("caseWorkspace.caseLabel")}</div>
          <div className="mt-1 flex items-center justify-between">
            <div className="text-lg font-semibold">{caseId}</div>
            <div className="flex items-center gap-2">
              <Pill tone="blue">{t("caseWorkspace.masterDocx")}</Pill>
              <Pill tone="zinc">{t("caseWorkspace.multiTenant")}</Pill>
            </div>
          </div>
        </div>
        {children}
      </section>

      {/* C) Evidence & Audit */}
      <aside className="space-y-4">
        <Card title={t("caseWorkspace.evidencePack")}>
          <ul className="list-disc pl-4 text-xs text-zinc-700">
            <li>Pin citations (doc/page/section)</li>
            <li>Tag: methodology / variable / recommendation</li>
          </ul>
        </Card>

        <ArtifactsPanel caseId={caseId} />

        <Card title={t("caseWorkspace.audit")}>
          <div className="text-xs text-zinc-600">Merge events, approvals, exports.</div>
        </Card>
      </aside>
    </div>
  );
}

function GatePill({ status }: { status: "not_requested" | "pending" | "approved" | "rejected" }) {
  if (status === "approved") return <Pill tone="green">Approved</Pill>;
  if (status === "pending") return <Pill tone="amber">Pending</Pill>;
  if (status === "rejected") return <Pill tone="red">Rejected</Pill>;
  return <Pill tone="zinc">Not requested</Pill>;
}
