import { Card, Pill } from "@/components/aia/ui";
import { StepPage } from "@/components/aia/StepPage";

export default function EvidencePage({ params }: { params: Promise<{ orgSlug: string; caseId: string }> }) {
  return (
    <StepPage params={params} stepKey="evidence">
      <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
        <Card title="Evidence Pack Builder">
          <div className="grid gap-2 md:grid-cols-3">
            <input className="h-9 rounded-md border border-zinc-200 px-3 text-sm" placeholder="Search" />
            <input className="h-9 rounded-md border border-zinc-200 px-3 text-sm" placeholder="Filter: sector" />
            <input className="h-9 rounded-md border border-zinc-200 px-3 text-sm" placeholder="Filter: year" />
          </div>
          <div className="mt-3 rounded-lg border border-zinc-200">
            <div className="border-b border-zinc-200 p-3 text-xs font-semibold uppercase text-zinc-500">Results (mock)</div>
            <ul className="divide-y divide-zinc-100">
              {[
                { t: "Internal Report — Kelleria Alfa 2024", c: "doc: KB-120 · p. 12 · sec 3.2" },
                { t: "Study Template — Market Overview", c: "doc: TMP-004 · p. 2" },
              ].map((r) => (
                <li key={r.t} className="p-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="font-medium text-zinc-900">{r.t}</div>
                      <div className="text-xs text-zinc-500">{r.c}</div>
                    </div>
                    <button className="rounded-md border border-zinc-200 px-3 py-1.5 text-xs font-semibold hover:bg-zinc-50">Pin</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Card>

        <Card title="Pinned (mock)">
          <div className="space-y-2">
            <div className="rounded-lg border border-zinc-200 p-2">
              <div className="text-xs font-semibold text-zinc-900">Kelleria Alfa — KPI outcomes</div>
              <div className="mt-1 flex gap-1">
                <Pill tone="blue">KPI outcome</Pill>
                <Pill tone="zinc">methodology</Pill>
              </div>
            </div>
            <div className="text-xs text-zinc-500">(Pinned items appear in the right Evidence panel too.)</div>
          </div>
        </Card>
      </div>
    </StepPage>
  );
}
