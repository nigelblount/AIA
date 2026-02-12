import { Card, Pill } from "@/components/aia/ui";

const agents = [
  { name: "Research Agent", owns: "Evidence Pack" },
  { name: "Design Agent", owns: "Variables" },
  { name: "Stats Agent", owns: "Correlation + Import Pack" },
  { name: "Report Agent", owns: "DOCX sections" },
];

export default function AgentsPage() {
  return (
    <Card title="Agents">
      <div className="space-y-2">
        {agents.map((a) => (
          <div key={a.name} className="flex items-center justify-between rounded-lg border border-zinc-200 p-3">
            <div className="font-medium text-zinc-900">{a.name}</div>
            <Pill tone="zinc">{a.owns}</Pill>
          </div>
        ))}
      </div>
    </Card>
  );
}
