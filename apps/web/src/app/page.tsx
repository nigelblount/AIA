import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 p-10">
      <div className="mx-auto max-w-2xl space-y-4">
        <h1 className="text-2xl font-semibold">AIA UI Demo</h1>
        <p className="text-sm text-zinc-600">
          Click through the MVP wireframe (Dashboard → Case Workspace → step screens). This is a UI-only demo with mock data.
        </p>
        <div className="rounded-xl border border-zinc-200 bg-white p-4">
          <Link className="font-medium text-blue-700 hover:underline" href="/org/aia-demo/dashboard">
            Go to demo workspace
          </Link>
        </div>
      </div>
    </div>
  );
}
