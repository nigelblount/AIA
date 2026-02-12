"use client";

import { useMemo, useState } from "react";
import type { Artifact, ArtifactType } from "@/lib/mock";
import { seedArtifacts } from "@/lib/mockArtifacts";
import { lsGet, lsSet } from "@/lib/storage";
import { Card, Pill } from "@/components/aia/ui";

function key(caseId: string) {
  return `aia.artifacts.${caseId}`;
}

function typeLabel(t: ArtifactType) {
  switch (t) {
    case "input_docx":
      return "Input DOCX";
    case "input_xlsx":
      return "Input XLSX";
    case "dataset":
      return "Dataset";
    case "import_pack":
      return "Import Pack";
    case "sociomap":
      return "Sociomap";
    case "final_docx":
      return "Final DOCX";
    case "final_pdf":
      return "Final PDF";
  }
}

export function ArtifactsPanel({ caseId }: { caseId: string }) {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<ArtifactType>("input_docx");
  const [filename, setFilename] = useState("");
  const [versionLabel, setVersionLabel] = useState("v1");

  const artifacts = useMemo(() => {
    const seeded = seedArtifacts.filter((a) => a.caseId === caseId);
    const stored = lsGet<Artifact[]>(key(caseId), []);
    const merged = [...seeded, ...stored];
    merged.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
    return merged;
  }, [caseId]);

  function addArtifact() {
    if (!filename.trim()) return;
    const stored = lsGet<Artifact[]>(key(caseId), []);
    const a: Artifact = {
      id: `art-${Math.random().toString(16).slice(2)}`,
      caseId,
      type,
      filename: filename.trim(),
      versionLabel: versionLabel.trim() || "v1",
      createdAt: new Date().toISOString(),
      note: "Mock upload (UI demo)",
    };
    lsSet(key(caseId), [a, ...stored]);
    setFilename("");
    setVersionLabel("v1");
    setOpen(false);
    // quick refresh: simplest for demo
    window.location.reload();
  }

  return (
    <Card title="Artifacts">
      <div className="flex items-center justify-between">
        <div className="text-xs text-zinc-600">Versioned inputs/outputs (DOCX/XLSX etc.).</div>
        <button
          className="rounded-md border border-zinc-200 px-2.5 py-1.5 text-xs font-semibold hover:bg-zinc-50"
          onClick={() => setOpen(true)}
        >
          Upload
        </button>
      </div>

      <div className="mt-3 space-y-2">
        {artifacts.length === 0 ? (
          <div className="text-xs text-zinc-500">No artifacts yet.</div>
        ) : (
          artifacts.map((a) => (
            <div key={a.id} className="rounded-lg border border-zinc-200 p-2">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="text-xs font-semibold text-zinc-900">{a.filename}</div>
                  <div className="mt-0.5 text-[11px] text-zinc-500">{new Date(a.createdAt).toLocaleString()}</div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <Pill tone="zinc">{typeLabel(a.type)}</Pill>
                  <Pill tone="blue">{a.versionLabel}</Pill>
                </div>
              </div>
              {a.note ? <div className="mt-1 text-[11px] text-zinc-500">{a.note}</div> : null}
            </div>
          ))
        )}
      </div>

      {open ? (
        <div className="mt-4 rounded-xl border border-zinc-200 bg-zinc-50 p-3">
          <div className="text-xs font-semibold text-zinc-900">Mock upload</div>
          <div className="mt-2 grid gap-2">
            <label className="text-xs text-zinc-700">
              Type
              <select
                className="mt-1 h-9 w-full rounded-md border border-zinc-200 bg-white px-3 text-sm"
                value={type}
                onChange={(e) => setType(e.target.value as ArtifactType)}
              >
                <option value="input_docx">Input DOCX</option>
                <option value="input_xlsx">Input XLSX</option>
                <option value="dataset">Dataset</option>
                <option value="import_pack">Import Pack</option>
                <option value="sociomap">Sociomap</option>
                <option value="final_docx">Final DOCX</option>
                <option value="final_pdf">Final PDF</option>
              </select>
            </label>

            <label className="text-xs text-zinc-700">
              Filename
              <input
                className="mt-1 h-9 w-full rounded-md border border-zinc-200 bg-white px-3 text-sm"
                placeholder="e.g., inputs.xlsx"
                value={filename}
                onChange={(e) => setFilename(e.target.value)}
              />
            </label>

            <label className="text-xs text-zinc-700">
              Version label
              <input
                className="mt-1 h-9 w-full rounded-md border border-zinc-200 bg-white px-3 text-sm"
                placeholder="v1"
                value={versionLabel}
                onChange={(e) => setVersionLabel(e.target.value)}
              />
            </label>
          </div>

          <div className="mt-3 flex gap-2">
            <button
              className="rounded-md bg-zinc-900 px-3 py-2 text-xs font-semibold text-white hover:bg-zinc-800"
              onClick={addArtifact}
            >
              Save
            </button>
            <button
              className="rounded-md border border-zinc-200 px-3 py-2 text-xs font-semibold hover:bg-white"
              onClick={() => setOpen(false)}
            >
              Cancel
            </button>
          </div>
          <div className="mt-2 text-[11px] text-zinc-500">
            This is stored in your browser (localStorage) for the demo. We’ll wire it to S3 + DB when backend exists.
          </div>
        </div>
      ) : null}
    </Card>
  );
}
