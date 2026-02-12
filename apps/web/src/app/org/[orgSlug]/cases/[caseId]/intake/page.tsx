"use client";

import { useRouter } from "next/navigation";
import { Card } from "@/components/aia/ui";
import { StepPage } from "@/components/aia/StepPage";
import { ensureInitialDoc } from "@/lib/doc";

export default function IntakePage({ params }: { params: Promise<{ orgSlug: string; caseId: string }> }) {
  const router = useRouter();

  return (
    <StepPage params={params} stepKey="intake">
      <Card title="Zadání (strukturovaný formulář)">
        <div className="grid gap-3 md:grid-cols-2">
          <Field label="Cíl studie" placeholder="Jaké rozhodnutí má studie podpořit?" />
          <Field label="Stakeholdeři" placeholder="Kdo bude schvalovat?" />
          <Field label="Sektor" placeholder="např. Reality" />
          <Field label="Geografie" placeholder="např. Česká republika" />
          <Field label="Termín" placeholder="YYYY-MM-DD" />
          <Field label="Jazyk" placeholder="cs-CZ" />
        </div>
        <div className="mt-3 flex items-center gap-2">
          <button
            className="rounded-md bg-zinc-900 px-3 py-2 text-sm font-semibold text-white hover:bg-zinc-800"
            onClick={async () => {
              const { caseId, orgSlug } = await params;
              ensureInitialDoc(caseId);
              router.push(`/org/${orgSlug}/cases/${caseId}/report`);
            }}
          >
            Vytvořit dokument
          </button>
          <span className="text-xs text-zinc-500">(demo: vytvoří strukturu dokumentu)</span>
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
