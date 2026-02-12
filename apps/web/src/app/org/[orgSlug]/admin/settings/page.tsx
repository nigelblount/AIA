import { Card } from "@/components/aia/ui";

export default function AdminSettingsPage() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card title="Org settings (stub)">
        <div className="text-xs text-zinc-600">Workspace name, billing, retention.</div>
      </Card>
      <Card title="Members & roles (stub)">
        <div className="text-xs text-zinc-600">RBAC: owner/admin/editor/reviewer.</div>
      </Card>
    </div>
  );
}
