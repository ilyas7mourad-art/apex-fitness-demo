"use client";

export default function MachinesError({
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
      <p className="text-sm font-medium text-muted-foreground">Failed to load machines</p>
      <button
        onClick={unstable_retry}
        className="text-sm font-semibold underline"
        style={{ color: "var(--brand)" }}
      >
        Try again
      </button>
    </div>
  );
}
