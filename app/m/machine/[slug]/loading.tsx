export default function MachineLoading() {
  return (
    <main className="mx-auto w-full max-w-2xl px-4 pb-16 pt-6 sm:px-6">
      {/* Back nav skeleton */}
      <div className="mb-6 h-4 w-24 animate-pulse rounded bg-muted" />

      {/* Illustration placeholder */}
      <div
        className="h-[240px] w-full animate-pulse rounded-xl"
        style={{ backgroundColor: "color-mix(in oklch, var(--brand) 5%, var(--background))" }}
      />

      {/* Machine info skeletons */}
      <div className="mt-6 space-y-3">
        <div className="h-8 w-48 animate-pulse rounded bg-muted" />
        <div className="h-5 w-36 animate-pulse rounded bg-muted" />
        <div className="flex gap-2 pt-1">
          <div className="h-6 w-20 animate-pulse rounded-full bg-muted" />
          <div className="h-6 w-16 animate-pulse rounded-full bg-muted" />
          <div className="h-6 w-18 animate-pulse rounded-full bg-muted" />
        </div>
      </div>

      {/* Plan block skeleton */}
      <div className="mt-8 rounded-xl border border-border p-5">
        <div className="h-5 w-28 animate-pulse rounded-full bg-muted" />
        <div className="mt-3 h-5 w-40 animate-pulse rounded bg-muted" />
        <div className="mt-2 h-4 w-56 animate-pulse rounded bg-muted" />
        <div className="mt-4 h-11 w-full animate-pulse rounded-lg bg-muted" />
      </div>

      {/* Instructions section skeleton */}
      <div className="mt-10">
        <div className="h-6 w-32 animate-pulse rounded bg-muted" />
        <div className="mt-4 space-y-3">
          <div className="h-4 w-full animate-pulse rounded bg-muted" />
          <div className="h-4 w-5/6 animate-pulse rounded bg-muted" />
          <div className="h-4 w-4/5 animate-pulse rounded bg-muted" />
          <div className="h-4 w-full animate-pulse rounded bg-muted" />
          <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
        </div>
      </div>

      {/* Watch out skeleton */}
      <div className="mt-10">
        <div className="h-6 w-28 animate-pulse rounded bg-muted" />
        <div className="mt-4 space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex gap-3">
              <div className="mt-0.5 h-4 w-4 shrink-0 animate-pulse rounded bg-muted" />
              <div className="h-4 flex-1 animate-pulse rounded bg-muted" />
            </div>
          ))}
        </div>
      </div>

      {/* Variations skeleton */}
      <div className="mt-10">
        <div className="h-6 w-40 animate-pulse rounded bg-muted" />
        <div className="mt-4 space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex gap-3">
              <div className="mt-0.5 h-4 w-4 shrink-0 animate-pulse rounded bg-muted" />
              <div className="h-4 flex-1 animate-pulse rounded bg-muted" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
