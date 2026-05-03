"use client";

import Link from "next/link";

export default function MachineError({
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center px-6">
      <p className="text-sm font-medium text-muted-foreground">Failed to load machine details</p>
      <button
        onClick={unstable_retry}
        className="text-sm font-semibold underline"
        style={{ color: "var(--brand)" }}
      >
        Try again
      </button>
      <Link
        href="/m/machines"
        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        Back to all machines
      </Link>
    </div>
  );
}
