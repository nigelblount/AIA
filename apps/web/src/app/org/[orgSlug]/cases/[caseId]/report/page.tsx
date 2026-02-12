import { StepPage } from "@/components/aia/StepPage";
import { DocEditor } from "@/components/aia/DocEditor";

export default async function ReportPage({ params }: { params: Promise<{ orgSlug: string; caseId: string }> }) {
  const { caseId } = await params;
  return (
    <StepPage params={params} stepKey="report">
      <DocEditor studyId={caseId} />
    </StepPage>
  );
}
