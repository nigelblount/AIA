export type CaseStatus =
  | "intake"
  | "evidence"
  | "design"
  | "data"
  | "stats"
  | "report"
  | "qa"
  | "sociomapping"
  | "delivered";

export type GateStatus = "not_requested" | "pending" | "approved" | "rejected";

export type Case = {
  id: string;
  name: string;
  client: string;
  sector: string;
  owner: string;
  dueDate: string; // ISO
  status: CaseStatus;
};

export type Gate = {
  n: 1 | 2 | 3 | 4 | 5;
  status: GateStatus;
  requestedAt?: string;
  decidedAt?: string;
  decidedBy?: string;
};

export type ArtifactType =
  | "input_docx"
  | "input_xlsx"
  | "dataset"
  | "import_pack"
  | "sociomap"
  | "final_docx"
  | "final_pdf";

export type Artifact = {
  id: string;
  caseId: string;
  type: ArtifactType;
  filename: string;
  versionLabel: string;
  createdAt: string; // ISO
  note?: string;
};

export const mockOrg = {
  slug: "aia-demo",
  name: "AIA Demo Workspace",
};

export const mockCases: Case[] = [
  {
    id: "case-001",
    name: "Retail Expansion Study — Prague",
    client: "Bydlio",
    sector: "Real Estate",
    owner: "Nigel",
    dueDate: "2026-02-20",
    status: "design",
  },
  {
    id: "case-002",
    name: "SaaS Pricing & Packaging",
    client: "Agent House",
    sector: "Software",
    owner: "Nigel",
    dueDate: "2026-02-28",
    status: "report",
  },
];

export const mockAlerts = [
  { kind: "approval", text: "Gate 1 approval pending (case-001)" },
  { kind: "data", text: "Missing data for 2 variables (case-001)" },
  { kind: "due", text: "Due in 3 days (case-002)" },
];

export const mockGates: Gate[] = [
  { n: 1, status: "pending", requestedAt: "2026-02-12T09:00:00Z" },
  { n: 2, status: "not_requested" },
  { n: 3, status: "not_requested" },
  { n: 4, status: "not_requested" },
  { n: 5, status: "not_requested" },
];

export const steps = [
  { key: "intake", label: "Zadání" },
  { key: "report", label: "Dokument" },
  { key: "evidence", label: "Evidence" },
  { key: "design", label: "Návrh studie" },
  { key: "data", label: "Data" },
  { key: "stats", label: "Statistika" },
  { key: "qa", label: "Kontrola (QA)" },
  { key: "sociomapping", label: "Sociomapping" },
] as const;

export function statusLabel(s: CaseStatus) {
  switch (s) {
    case "intake":
      return "Intake";
    case "evidence":
      return "Evidence";
    case "design":
      return "Design";
    case "data":
      return "Data";
    case "stats":
      return "Stats";
    case "report":
      return "Draft";
    case "qa":
      return "QA";
    case "sociomapping":
      return "Sociomapping";
    case "delivered":
      return "Delivered";
  }
}
