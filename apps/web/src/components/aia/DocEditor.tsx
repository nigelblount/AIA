"use client";

import { useEffect, useMemo, useState } from "react";
import type { JSONContent } from "@tiptap/core";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableHeader } from "@tiptap/extension-table-header";
import { TableCell } from "@tiptap/extension-table-cell";
import { Card, Pill } from "@/components/aia/ui";
import { RibbonButton, RibbonGroup } from "@/components/aia/Ribbon";
import {
  acceptProposal,
  ensureInitialDoc,
  getDocState,
  rejectProposal,
  setDocState,
} from "@/lib/doc";

const AGENTS = [
  { id: "editor", name: "Editor" },
  { id: "research", name: "Research" },
  { id: "finance", name: "Finance" },
  { id: "qa", name: "QA" },
];

export function DocEditor({ studyId }: { studyId: string }) {
  const [agent, setAgent] = useState(AGENTS[0].id);
  const [chat, setChat] = useState("");
  const [refresh, setRefresh] = useState(0);

  const state = useMemo(() => {
    return getDocState(studyId) ?? ensureInitialDoc(studyId);
  }, [studyId, refresh]);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Placeholder.configure({
        placeholder: "Začněte psát…",
      }),
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: state.current as JSONContent,
    editorProps: {
      attributes: {
        class: "focus:outline-none",
      },
    },
  });

  // Keep editor content in sync when accepting/rejecting proposals.
  useEffect(() => {
    if (!editor) return;
    editor.commands.setContent(state.current as JSONContent);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

  function saveCurrent() {
    if (!editor) return;
    const json = editor.getJSON();
    setDocState(studyId, {
      ...state,
      current: json,
    });
    setRefresh((x) => x + 1);
  }

  function generateProposal() {
    if (!editor) return;

    // Snapshot current from editor (ensures we propose on latest state)
    const current = editor.getJSON();

    // Simple mock “agent” behavior: append a short formal Czech paragraph + a tiny table.
    const proposed = structuredClone(current) as Record<string, unknown>;

    const p = proposed as unknown as { content?: unknown[] };
    p.content = p.content || [];
    p.content.push({
      type: "heading",
      attrs: { level: 2 },
      content: [{ type: "text", text: "Návrh doplnění (od agenta)" }],
    });
    p.content.push({
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "Navrhujeme doplnit tuto část o jasné shrnutí cíle, klíčových předpokladů a doporučených dalších kroků. Text je psán ve formální češtině.",
        },
      ],
    });
    p.content.push({
      type: "table",
      content: [
        {
          type: "tableRow",
          content: [
            { type: "tableHeader", content: [{ type: "paragraph", content: [{ type: "text", text: "Položka" }] }] },
            { type: "tableHeader", content: [{ type: "paragraph", content: [{ type: "text", text: "Poznámka" }] }] },
          ],
        },
        {
          type: "tableRow",
          content: [
            { type: "tableCell", content: [{ type: "paragraph", content: [{ type: "text", text: "Cíl" }] }] },
            { type: "tableCell", content: [{ type: "paragraph", content: [{ type: "text", text: "Upřesnit rozhodnutí, které má studie podpořit" }] }] },
          ],
        },
      ],
    });

    setDocState(studyId, {
      current,
      proposed,
      lastProposalMeta: {
        agent,
        createdAt: new Date().toISOString(),
        prompt: chat.trim() || "(bez zprávy)",
      },
    });
    setChat("");
    setRefresh((x) => x + 1);
  }

  function onAccept() {
    acceptProposal(studyId);
    setRefresh((x) => x + 1);
  }

  function onReject() {
    rejectProposal(studyId);
    setRefresh((x) => x + 1);
  }

  const hasProposal = Boolean(state.proposed);

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_360px]">
      <div className="space-y-3">
        {/* Ribbon (Word-like) */}
        <div className="rounded-xl border border-zinc-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-zinc-200 px-4 py-2">
            <div className="text-sm font-semibold text-zinc-900">Dokument</div>
            <div className="flex items-center gap-2">
              {hasProposal ? <Pill tone="amber">Čeká návrh změn</Pill> : <Pill tone="green">Bez návrhu</Pill>}
              <button
                className="rounded-md bg-zinc-900 px-3 py-2 text-xs font-semibold text-white hover:bg-zinc-800"
                onClick={saveCurrent}
              >
                Uložit
              </button>
            </div>
          </div>

          <div className="grid gap-3 px-4 py-3">
            <div className="grid gap-3 lg:grid-cols-4">
              <RibbonGroup title="Písmo">
                <div className="grid grid-cols-3 gap-2">
                  <RibbonButton onClick={() => editor?.chain().focus().toggleBold().run()}>B</RibbonButton>
                  <RibbonButton onClick={() => editor?.chain().focus().toggleItalic().run()}>I</RibbonButton>
                  <RibbonButton onClick={() => editor?.chain().focus().toggleUnderline().run()}>U</RibbonButton>
                </div>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  <RibbonButton onClick={() => editor?.chain().focus().setParagraph().run()}>Normální</RibbonButton>
                  <RibbonButton onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}>Nadpis 1</RibbonButton>
                  <RibbonButton onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}>Nadpis 2</RibbonButton>
                  <RibbonButton onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}>Nadpis 3</RibbonButton>
                </div>
              </RibbonGroup>

              <RibbonGroup title="Odstavec">
                <div className="grid grid-cols-4 gap-2">
                  <RibbonButton onClick={() => editor?.chain().focus().setTextAlign("left").run()}>Vlevo</RibbonButton>
                  <RibbonButton onClick={() => editor?.chain().focus().setTextAlign("center").run()}>Na střed</RibbonButton>
                  <RibbonButton onClick={() => editor?.chain().focus().setTextAlign("right").run()}>Vpravo</RibbonButton>
                  <RibbonButton onClick={() => editor?.chain().focus().setTextAlign("justify").run()}>Do bloku</RibbonButton>
                </div>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  <RibbonButton onClick={() => editor?.chain().focus().toggleBulletList().run()}>Odrážky</RibbonButton>
                  <RibbonButton onClick={() => editor?.chain().focus().toggleOrderedList().run()}>Číslování</RibbonButton>
                </div>
              </RibbonGroup>

              <RibbonGroup title="Vložit">
                <div className="grid grid-cols-2 gap-2">
                  <RibbonButton
                    onClick={() =>
                      editor?.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
                    }
                  >
                    Tabulka
                  </RibbonButton>
                  <RibbonButton disabled>Obrázek</RibbonButton>
                  <RibbonButton disabled>Zalomení stránky</RibbonButton>
                </div>
                <div className="mt-2 text-[11px] text-zinc-500">(obrázky + DOCX export doplníme)</div>
              </RibbonGroup>

              <RibbonGroup title="Revize">
                <div className="grid grid-cols-2 gap-2">
                  <RibbonButton onClick={() => editor?.chain().focus().undo().run()}>Zpět</RibbonButton>
                  <RibbonButton onClick={() => editor?.chain().focus().redo().run()}>Znovu</RibbonButton>
                </div>
              </RibbonGroup>
            </div>
          </div>
        </div>

        {/* A4 page canvas */}
        <div className="rounded-xl border border-zinc-200 bg-zinc-200/50 p-6">
          <div className="mx-auto w-full max-w-[820px]">
            <div className="rounded-sm bg-white shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
              <div className="px-16 py-14">
                <div className="prose max-w-none prose-zinc">
                  <EditorContent editor={editor} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {hasProposal ? (
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-3">
            <div className="text-xs font-semibold text-amber-900">Návrh změn je připraven</div>
            <div className="mt-1 text-xs text-amber-900/80">
              Klikněte na „Přijmout změny“ pro aplikaci návrhu na celý dokument, nebo „Zamítnout“.
            </div>
            <div className="mt-3 flex gap-2">
              <button
                className="rounded-md bg-zinc-900 px-3 py-2 text-xs font-semibold text-white hover:bg-zinc-800"
                onClick={onAccept}
              >
                Přijmout změny
              </button>
              <button
                className="rounded-md border border-amber-300 bg-white px-3 py-2 text-xs font-semibold text-amber-900 hover:bg-amber-100"
                onClick={onReject}
              >
                Zamítnout
              </button>
            </div>
          </div>
        ) : null}
      </div>

      <Card title="Agent">
        <div className="text-xs text-zinc-600">
          Vyberte agenta, napište zprávu a nechte jej připravit návrh změn pro celý dokument.
        </div>

        <label className="mt-3 block text-xs text-zinc-700">
          Agent
          <select
            className="mt-1 h-10 w-full rounded-md border border-zinc-200 bg-white px-3 text-sm"
            value={agent}
            onChange={(e) => setAgent(e.target.value)}
          >
            {AGENTS.map((a) => (
              <option key={a.id} value={a.id}>
                {a.name}
              </option>
            ))}
          </select>
        </label>

        <label className="mt-3 block text-xs text-zinc-700">
          Zpráva
          <textarea
            className="mt-1 min-h-[120px] w-full rounded-md border border-zinc-200 bg-white p-3 text-sm"
            placeholder="Popište, co má agent doplnit/upravit (formální čeština)…"
            value={chat}
            onChange={(e) => setChat(e.target.value)}
          />
        </label>

        <div className="mt-3 flex gap-2">
          <button
            className="rounded-md bg-zinc-900 px-3 py-2 text-xs font-semibold text-white hover:bg-zinc-800"
            onClick={generateProposal}
          >
            Vygenerovat návrh změn
          </button>
        </div>

        {state.lastProposalMeta ? (
          <div className="mt-4 rounded-lg border border-zinc-200 bg-white p-3">
            <div className="text-xs font-semibold text-zinc-900">Poslední návrh</div>
            <div className="mt-1 text-xs text-zinc-600">
              Agent: <span className="font-medium">{state.lastProposalMeta.agent}</span>
              <br />
              Čas: {new Date(state.lastProposalMeta.createdAt).toLocaleString()}
            </div>
            <div className="mt-2 text-xs text-zinc-700">Zpráva: {state.lastProposalMeta.prompt}</div>
          </div>
        ) : null}
      </Card>
    </div>
  );
}
