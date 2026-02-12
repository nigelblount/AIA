export default function CaseLayout({ children }: { children: React.ReactNode }) {
  // Step pages render the full Case Workspace layout (3-column shell).
  // This layout only exists to allow /cases/:caseId index + nested routes.
  return <>{children}</>;
}
