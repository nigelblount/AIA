import { Card, Pill } from "@/components/aia/ui";
import { StepPage } from "@/components/aia/StepPage";

const issues = [
  { id: "ISS-1", sev: "S1", title: "Claim missing evidence citation", status: "open" },
  { id: "ISS-2", sev: "S2", title: "Variable naming inconsistent (V2 vs churn_rate)", status: "open" },
];

export default function QaPage({ params }: { params: Promise<{ orgSlug: string; caseId: string }> }) {
  return (
    <StepPage params={params} stepKey="qa">
      <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
        <Card title="QA — Issues">
          <div className="space-y-2">
            {issues.map((i) => (
              <div key={i.id} className="flex items-center justify-between gap-3 rounded-lg border border-zinc-200 p-3">
                <div>
                  <div className="text-sm font-semibold text-zinc-900">{i.title}</div>
                  <div className="text-xs text-zinc-500">{i.id}</div>
                </div>
                <div className="flex items-center gap-2">
                  <Pill tone={i.sev === "S1" ? "red" : "amber"}>{i.sev}</Pill>
                  <Pill tone="zinc">{i.status}</Pill>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Gate 4">
          <div className="space-y-2">
            <button className="w-full rounded-md bg-zinc-900 px-3 py-2 text-sm font-semibold text-white hover:bg-zinc-800">Approve</button>
            <button className="w-full rounded-md border border-zinc-200 px-3 py-2 text-sm font-semibold hover:bg-zinc-50">Reject</button>
            <button className="w-full rounded-md border border-zinc-200 px-3 py-2 text-sm font-semibold hover:bg-zinc-50">Request changes</button>
          </div>
          <div className="mt-2 text-xs text-zinc-500">(Demo buttons)</div>
        </Card>
      </div>
    </StepPage>
  );
}
