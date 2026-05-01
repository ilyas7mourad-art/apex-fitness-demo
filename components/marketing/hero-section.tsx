import Link from "next/link";
import { ArrowRight, Users, LayoutDashboard } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const entries = [
  {
    href: "/m",
    icon: Users,
    label: "Member Experience",
    description:
      "Follow a personalized training program, scan machines for instant guidance, and track session-by-session progress.",
    cta: "Explore member view",
  },
  {
    href: "/admin",
    icon: LayoutDashboard,
    label: "Gym Owner Dashboard",
    description:
      "Monitor member retention, spot churn risk early, review program adoption, and manage the gym's full equipment library.",
    cta: "Open dashboard",
  },
];

export function HeroSection() {
  return (
    <section className="flex flex-1 flex-col items-center justify-center px-6 py-24 sm:py-32">
      <div className="mx-auto w-full max-w-3xl">
        {/* Tag */}
        <div className="mb-8 flex items-center gap-2.5">
          <span
            className="h-px flex-1 max-w-8"
            style={{ backgroundColor: "var(--brand)" }}
          />
          <span
            className="text-xs font-semibold tracking-[0.15em] uppercase"
            style={{ color: "var(--brand)" }}
          >
            Interactive Product Demo
          </span>
        </div>

        {/* Headline */}
        <h1 className="mb-3 text-5xl font-black leading-[1.05] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
          Apex Fitness
          <br />
          <span className="text-muted-foreground/60">Dubai</span>
        </h1>

        <Separator className="my-7 w-16" />

        {/* Subheading */}
        <p className="mb-12 max-w-xl text-lg leading-relaxed text-muted-foreground">
          A live demonstration of gym management technology built for
          independent fitness clubs. Choose a perspective to begin.
        </p>

        {/* Entry cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {entries.map(({ href, icon: Icon, label, description, cta }) => (
            <Link
              key={href}
              href={href}
              className="group relative flex flex-col gap-5 rounded-xl border border-border bg-card p-7 transition-all duration-200 hover:border-foreground/20 hover:shadow-sm"
            >
              {/* Icon */}
              <div
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-border transition-colors duration-200 group-hover:border-foreground/15"
                style={{
                  backgroundColor:
                    "color-mix(in oklch, var(--brand) 8%, transparent)",
                }}
              >
                <Icon
                  className="h-5 w-5"
                  style={{ color: "var(--brand)" }}
                  strokeWidth={1.75}
                />
              </div>

              {/* Text */}
              <div className="flex flex-col gap-2">
                <h2 className="text-base font-semibold tracking-tight text-foreground">
                  {label}
                </h2>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {description}
                </p>
              </div>

              {/* CTA row */}
              <div className="mt-auto flex items-center gap-1.5">
                <span
                  className="text-sm font-medium transition-colors duration-200"
                  style={{ color: "var(--brand)" }}
                >
                  {cta}
                </span>
                <ArrowRight
                  className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                  style={{ color: "var(--brand)" }}
                  strokeWidth={2}
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
