import { Card, Pill } from "@/components/aia/ui";
import { StepPage } from "@/components/aia/StepPage";

export default function SociomappingPage({ params }: { params: Promise<{ orgSlug: string; caseId: string }> }) {
  return (
    <StepPage params={params} stepKey="sociomapping">
      <div className="grid gap-4">
        <Card title="Manual Sociomapping SOP">
          <ol className="list-decimal pl-5 text-sm text-zinc-700 space-y-2">
            <li>
              Download Import Pack <Pill tone="zinc">(from Stats)</Pill>
            </li>
            <li>Import into Sociomapping</li>
            <li>Export Sociomap (upload images/PDF)</li>
            <li>Insert into report (upload final DOCX/PDF)</li>
            <li>Confirm Gate 5 “Sociomaps Inserted”</li>
          </ol>

          <div className="mt-4 flex gap-2">
            <button className="rounded-md border border-zinc-200 px-3 py-2 text-xs font-semibold hover:bg-zinc-50">Upload Sociomap</button>
            <button className="rounded-md border border-zinc-200 px-3 py-2 text-xs font-semibold hover:bg-zinc-50">Upload Final DOCX</button>
            <button className="ml-auto rounded-md bg-zinc-900 px-3 py-2 text-xs font-semibold text-white hover:bg-zinc-800">Confirm Gate 5</button>
          </div>
        </Card>
      </div>
    </StepPage>
  );
}
