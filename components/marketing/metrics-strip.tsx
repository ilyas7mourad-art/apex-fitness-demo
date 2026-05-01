const metrics = [
  { value: "127", label: "Active members" },
  { value: "23", label: "Machines tracked" },
  { value: "94%", label: "Program completion" },
  { value: "8.2/10", label: "Member satisfaction" },
];

export function MetricsStrip() {
  return (
    <section className="border-y border-border">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px bg-border sm:grid-cols-4">
        {metrics.map(({ value, label }) => (
          <div key={label} className="bg-background px-6 py-6 sm:px-10 sm:py-7">
            <p className="text-2xl font-black tracking-tight text-foreground sm:text-3xl">
              {value}
            </p>
            <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground sm:text-xs">
              {label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
