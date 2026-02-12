import Link from "next/link";

export default async function CaseIndex({
  params,
}: {
  params: Promise<{ orgSlug: string; caseId: string }>;
}) {
  const { orgSlug, caseId } = await params;
  return (
    <div className="space-y-2">
      <div className="text-sm text-zinc-700">Select a step:</div>
      <div className="flex flex-wrap gap-2">
        {[
          "intake",
          "evidence",
          "design",
          "data",
          "stats",
          "report",
          "qa",
          "sociomapping",
        ].map((s) => (
          <Link
            key={s}
            className="rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm hover:bg-zinc-50"
            href={`/org/${orgSlug}/cases/${caseId}/${s}`}
          >
            {s}
          </Link>
        ))}
      </div>
    </div>
  );
}
