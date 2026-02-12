import { Card } from "@/components/aia/ui";
import { StepPage } from "@/components/aia/StepPage";

export default function StatsPage({ params }: { params: Promise<{ orgSlug: string; caseId: string }> }) {
  return (
    <StepPage params={params} stepKey="stats">
      <div className="grid gap-4">
        <Card title="Stats — Correlation Studio (mock)">
          <div className="grid gap-2 md:grid-cols-3">
            <select className="h-10 rounded-md border border-zinc-200 px-3 text-sm">
              <option>Pearson (recommended)</option>
              <option>Spearman</option>
              <option>Kendall</option>
            </select>
            <select className="h-10 rounded-md border border-zinc-200 px-3 text-sm">
              <option>Missing handling: pairwise</option>
              <option>listwise</option>
            </select>
            <button className="rounded-md bg-zinc-900 px-3 py-2 text-sm font-semibold text-white hover:bg-zinc-800">Run</button>
          </div>

          <div className="mt-3 rounded-lg border border-zinc-200 p-3 text-xs text-zinc-600">
            Heatmap + table goes here. Export generates a versioned “Sociomapping Import Pack”.
          </div>

          <div className="mt-3 flex gap-2">
            <button className="rounded-md border border-zinc-200 px-3 py-2 text-xs font-semibold hover:bg-zinc-50">Export Import Pack</button>
            <button className="rounded-md bg-zinc-900 px-3 py-2 text-xs font-semibold text-white hover:bg-zinc-800">Request Gate 3</button>
          </div>
        </Card>
      </div>
    </StepPage>
  );
}
