import { Card, Pill } from "@/components/aia/ui";
import { StepPage } from "@/components/aia/StepPage";

const rows = [
  { id: "V1", name: "Customer satisfaction", type: "Likert 1–5", unit: "score", status: "ok" },
  { id: "V2", name: "Churn", type: "ratio", unit: "%", status: "missing_def" },
];

export default function DesignPage({ params }: { params: Promise<{ orgSlug: string; caseId: string }> }) {
  return (
    <StepPage params={params} stepKey="design">
      <Card title="Study Design — Variables table">
        <div className="mb-3 flex items-center justify-between">
          <div className="text-xs text-zinc-500">Table editor (MVP). Validations block Gate 1 request.</div>
          <button className="rounded-md bg-zinc-900 px-3 py-2 text-xs font-semibold text-white hover:bg-zinc-800">Request Gate 1</button>
        </div>

        <div className="overflow-x-auto rounded-lg border border-zinc-200">
          <table className="w-full text-left text-sm">
            <thead className="bg-zinc-50 text-xs font-semibold uppercase tracking-wide text-zinc-600">
              <tr>
                <th className="px-3 py-2">ID</th>
                <th className="px-3 py-2">Name</th>
                <th className="px-3 py-2">Type/scale</th>
                <th className="px-3 py-2">Unit</th>
                <th className="px-3 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-t border-zinc-100">
                  <td className="px-3 py-2 font-mono text-xs">{r.id}</td>
                  <td className="px-3 py-2">{r.name}</td>
                  <td className="px-3 py-2">{r.type}</td>
                  <td className="px-3 py-2">{r.unit}</td>
                  <td className="px-3 py-2">
                    {r.status === "ok" ? <Pill tone="green">OK</Pill> : <Pill tone="red">Missing definition</Pill>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </StepPage>
  );
}
