"use client";

import { lsGet, lsSet } from "@/lib/storage";

import type { JSONContent } from "@tiptap/core";

export type DocState = {
  current: JSONContent;
  proposed?: JSONContent;
  lastProposalMeta?: {
    agent: string;
    createdAt: string;
    prompt: string;
  };
};

export function docKey(studyId: string) {
  return `aia.doc.${studyId}`;
}

export function getDocState(studyId: string): DocState | null {
  return lsGet<DocState | null>(docKey(studyId), null);
}

export function setDocState(studyId: string, s: DocState) {
  lsSet(docKey(studyId), s);
}

export function ensureInitialDoc(studyId: string) {
  const existing = getDocState(studyId);
  if (existing?.current) return existing;

  const starter = makeStarterDoc();
  const next: DocState = {
    current: starter,
    proposed: undefined,
    lastProposalMeta: undefined,
  };
  setDocState(studyId, next);
  return next;
}

export function makeStarterDoc() {
  // A simple ProseMirror document compatible with TipTap StarterKit.
  return {
    type: "doc",
    content: [
      {
        type: "heading",
        attrs: { level: 1 },
        content: [{ type: "text", text: "Studie" }],
      },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "Tento dokument je určen pro interní použití. Prosím doplňte obsah ve formální češtině.",
          },
        ],
      },
      ...section("Shrnutí pro vedení"),
      ...section("Kontext a cíl"),
      ...section("Rozsah a předpoklady"),
      ...section("Metodika"),
      ...section("Zjištění"),
      ...section("Rizika a omezení"),
      ...section("Doporučení a další kroky"),
      {
        type: "paragraph",
        content: [{ type: "text", text: "" }],
      },
    ],
  };
}

function section(title: string) {
  return [
    {
      type: "heading",
      attrs: { level: 2 },
      content: [{ type: "text", text: title }],
    },
    {
      type: "paragraph",
      content: [{ type: "text", text: "(Doplňte…)" }],
    },
  ];
}

export function acceptProposal(studyId: string) {
  const s = getDocState(studyId);
  if (!s?.proposed) return;
  setDocState(studyId, {
    current: s.proposed,
    proposed: undefined,
    lastProposalMeta: s.lastProposalMeta,
  });
}

export function rejectProposal(studyId: string) {
  const s = getDocState(studyId);
  if (!s) return;
  setDocState(studyId, {
    current: s.current,
    proposed: undefined,
    lastProposalMeta: s.lastProposalMeta,
  });
}
