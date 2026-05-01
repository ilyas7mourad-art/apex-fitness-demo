import { ArrowRight } from "lucide-react";

export function FooterCta() {
  return (
    <section className="border-t border-border bg-muted/50">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-5 px-6 py-10 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-base font-semibold text-foreground sm:text-lg">
            Ready to see this for your gym?
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Book a 20-minute call and we&apos;ll walk through the platform live.
          </p>
        </div>
        <a
          href="#"
          className="inline-flex shrink-0 items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: "var(--brand)" }}
        >
          Book a demo
          <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
        </a>
      </div>
    </section>
  );
}
