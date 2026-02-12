import { Card, Pill } from "@/components/aia/ui";
import { StepPage } from "@/components/aia/StepPage";

const sections = [
  { key: "exec", title: "Executive Summary", status: "needs_review" },
  { key: "method", title: "Methodology", status: "drafted" },
  { key: "findings", title: "Findings", status: "not_started" },
];

export default function ReportPage({ params }: { params: Promise<{ orgSlug: string; caseId: string }> }) {
  return (
    <StepPage params={params} stepKey="report">
      <div className="grid gap-4 lg:grid-cols-[280px_1fr]">
        <Card title="Chapters (outline)">
          <div className="space-y-2">
            {sections.map((s) => (
              <div key={s.key} className="flex items-center justify-between rounded-lg border border-zinc-200 px-3 py-2">
                <div className="text-sm font-medium text-zinc-900">{s.title}</div>
                <Pill tone={s.status === "needs_review" ? "amber" : s.status === "drafted" ? "blue" : "zinc"}>
                  {s.status}
                </Pill>
              </div>
            ))}
          </div>
          <div className="mt-3">
            <button className="w-full rounded-md border border-zinc-200 px-3 py-2 text-xs font-semibold hover:bg-zinc-50">Create task for section</button>
          </div>
        </Card>

        <Card title="Master DOCX (preview)">
          <div className="text-xs text-zinc-600">
            This is the doc-centric report composer. Agent outputs merge by **replacing a section** (with snapshot + undo).
          </div>
          <div className="mt-3 rounded-lg border border-zinc-200 bg-zinc-50 p-3 text-sm text-zinc-800">
            <div className="font-semibold">Executive Summary</div>
            <p className="mt-2">
              Placeholder content. When an agent delivers output for this section, you’ll click “Merge” → section text is replaced.
            </p>
          </div>
          <div className="mt-3 flex gap-2">
            <button className="rounded-md bg-zinc-900 px-3 py-2 text-xs font-semibold text-white hover:bg-zinc-800">Merge latest output</button>
            <button className="rounded-md border border-zinc-200 px-3 py-2 text-xs font-semibold hover:bg-zinc-50">Undo</button>
            <button className="ml-auto rounded-md bg-zinc-900 px-3 py-2 text-xs font-semibold text-white hover:bg-zinc-800">Send to Gate 4 (QA)</button>
          </div>

          <div className="mt-4 rounded-lg border border-zinc-200 p-3">
            <div className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Sociomap placeholders</div>
            <div className="mt-2 text-xs text-zinc-600">Sociomap 1 · Pending · Position: Findings</div>
          </div>
        </Card>
      </div>
    </StepPage>
  );
}
