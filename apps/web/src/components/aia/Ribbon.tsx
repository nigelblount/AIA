"use client";

export function RibbonGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-2">
      <div className="text-[11px] font-semibold uppercase tracking-wide text-zinc-500">{title}</div>
      <div className="mt-2">{children}</div>
    </div>
  );
}

export function RibbonButton({
  children,
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`h-9 rounded-md border px-2 text-xs font-semibold transition-colors ${
        disabled
          ? "cursor-not-allowed border-zinc-200 bg-white text-zinc-400"
          : "border-zinc-200 bg-white text-zinc-800 hover:bg-zinc-100"
      }`}
    >
      {children}
    </button>
  );
}
