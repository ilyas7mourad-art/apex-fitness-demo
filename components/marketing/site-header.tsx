import { Badge } from "@/components/ui/badge";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/90 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <div className="flex items-center gap-2.5">
          <span
            className="h-5 w-5 rounded-sm"
            style={{ backgroundColor: "var(--brand)" }}
            aria-hidden="true"
          />
          <span className="text-sm font-semibold tracking-wide text-foreground">
            APEX FITNESS DUBAI
          </span>
        </div>

        <Badge
          variant="secondary"
          className="rounded-full px-3 py-0.5 text-xs font-medium tracking-wider text-muted-foreground"
        >
          DEMO ENVIRONMENT
        </Badge>
      </div>
    </header>
  );
}
