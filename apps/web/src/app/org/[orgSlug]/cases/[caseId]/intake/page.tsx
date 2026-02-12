import { Card } from "@/components/aia/ui";
import { StepPage } from "@/components/aia/StepPage";

export default function IntakePage({ params }: { params: Promise<{ orgSlug: string; caseId: string }> }) {
  return (
    <StepPage params={params} stepKey="intake">
      <Card title="Intake (structured form)">
        <div className="grid gap-3 md:grid-cols-2">
          <Field label="Objective" placeholder="What decision does this study support?" />
          <Field label="Stakeholders" placeholder="Who needs to sign off?" />
          <Field label="Sector" placeholder="e.g., Real Estate" />
          <Field label="Geography" placeholder="e.g., Czech Republic" />
          <Field label="Due date" placeholder="YYYY-MM-DD" />
          <Field label="Language" placeholder="cs-CZ" />
        </div>
        <div className="mt-3">
          <button className="rounded-md bg-zinc-900 px-3 py-2 text-sm font-semibold text-white hover:bg-zinc-800">Generate plan</button>
          <span className="ml-3 text-xs text-zinc-500">(Demo button)</span>
        </div>
      </Card>
    </StepPage>
  );
}

function Field({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <label className="block">
      <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-zinc-500">{label}</div>
      <input className="h-10 w-full rounded-md border border-zinc-200 px-3 text-sm" placeholder={placeholder} />
    </label>
  );
}
