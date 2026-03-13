import { CaseWorkspaceLayout } from "@/components/aia/CaseWorkspaceLayout";

export async function StepPage({
  params,
  stepKey,
  children,
}: {
  params: Promise<{ orgSlug: string; caseId: string }>;
  stepKey: string;
  children: React.ReactNode;
}) {
  const { orgSlug, caseId } = await params;

  return (
    <CaseWorkspaceLayout orgSlug={orgSlug} caseId={caseId} activeStep={stepKey}>
      {children}
    </CaseWorkspaceLayout>
  );
}
