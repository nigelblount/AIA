import type { Artifact } from "@/lib/mock";

export const seedArtifacts: Artifact[] = [
  {
    id: "art-001",
    caseId: "case-001",
    type: "input_xlsx",
    filename: "customer_survey_q1.xlsx",
    versionLabel: "v1",
    createdAt: "2026-02-11T10:00:00Z",
  },
  {
    id: "art-002",
    caseId: "case-002",
    type: "input_docx",
    filename: "requirements_brief.docx",
    versionLabel: "v1",
    createdAt: "2026-02-10T14:30:00Z",
  },
];
