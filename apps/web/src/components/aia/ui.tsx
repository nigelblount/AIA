import Link from "next/link";

export function Card({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
      {title ? <div className="mb-3 text-sm font-semibold text-zinc-900">{title}</div> : null}
      <div className="text-sm text-zinc-700">{children}</div>
    </div>
  );
}

export function Pill({ children, tone = "zinc" }: { children: React.ReactNode; tone?: "zinc" | "amber" | "green" | "red" | "blue" }) {
  const map: Record<string, string> = {
    zinc: "bg-zinc-100 text-zinc-800 border-zinc-200",
    amber: "bg-amber-50 text-amber-800 border-amber-200",
    green: "bg-green-50 text-green-800 border-green-200",
    red: "bg-red-50 text-red-800 border-red-200",
    blue: "bg-blue-50 text-blue-800 border-blue-200",
  };
  return (
    <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs ${map[tone]}`}>{children}</span>
  );
}

export function AiaLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-sm font-medium text-blue-700 hover:underline">
      {children}
    </Link>
  );
}
