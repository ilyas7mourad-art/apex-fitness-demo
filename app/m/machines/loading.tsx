export default function MachinesLoading() {
  return (
    <main>
      {/* Hero skeleton */}
      <section className="mx-auto w-full max-w-6xl px-6 pb-8 pt-12">
        <div className="flex flex-col gap-3">
          <div className="h-3 w-28 animate-pulse rounded bg-muted" />
          <div className="h-9 w-64 animate-pulse rounded bg-muted" />
          <div className="h-5 w-80 animate-pulse rounded bg-muted" />
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 pb-16">
        {/* Filter pills skeleton */}
        <div className="mb-6 flex flex-wrap gap-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-8 w-16 animate-pulse rounded-full bg-muted" />
          ))}
        </div>

        {/* Machine card grid skeleton */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="overflow-hidden rounded-xl border border-border bg-card">
              <div className="h-[120px] w-full animate-pulse bg-muted" />
              <div className="p-4">
                <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
                <div className="mt-1.5 h-3 w-1/2 animate-pulse rounded bg-muted" />
                <div className="mt-2 flex gap-1">
                  <div className="h-5 w-16 animate-pulse rounded-full bg-muted" />
                  <div className="h-5 w-14 animate-pulse rounded-full bg-muted" />
                </div>
                <div className="mt-3 h-3 w-10 animate-pulse rounded bg-muted" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
