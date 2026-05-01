import Link from "next/link";
import { ArrowRight, Users, LayoutDashboard } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { PhoneMockup } from "@/components/marketing/phone-mockup";

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
    <section className="px-6 py-10 sm:py-14">
      <div className="mx-auto max-w-6xl">
        {/*
         * Three-item CSS grid:
         *   desktop — [text  | phone (row-span-2)]
         *              [cards | phone            ]
         *   mobile  — text → phone → cards (single col, stacked)
         */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_auto] lg:gap-x-16">
          {/* ── Text block ── row 1 col 1 */}
          <div className="lg:col-start-1 lg:row-start-1">
            {/* Accent tag */}
            <div className="mb-7 flex items-center gap-2.5">
              <span
                className="h-px w-6 shrink-0"
                style={{ backgroundColor: "var(--brand)" }}
              />
              <span
                className="text-xs font-semibold uppercase tracking-[0.15em]"
                style={{ color: "var(--brand)" }}
              >
                Interactive Product Demo
              </span>
            </div>

            {/* Headline */}
            <h1 className="mb-2.5 text-5xl font-black leading-[1.04] tracking-tight text-foreground sm:text-6xl lg:text-[64px]">
              Apex Fitness
              <br />
              <span className="text-muted-foreground/50">Dubai</span>
            </h1>

            <Separator className="my-6 w-14" />

            {/* Subhead */}
            <p className="max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
              A live demonstration of gym management technology built for
              independent fitness clubs. Choose a perspective to begin.
            </p>
          </div>

          {/* ── Phone mockup ── row 1–2 col 2 (desktop), row 2 (mobile) */}
          <div className="flex items-center justify-center lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-center lg:justify-end">
            <PhoneMockup />
          </div>

          {/* ── Entry cards ── row 2 col 1 */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-start-1 lg:row-start-2">
            {entries.map(({ href, icon: Icon, label, description, cta }) => (
              <Link
                key={href}
                href={href}
                className="group flex flex-col gap-5 rounded-xl border border-border bg-card p-7 transition-all duration-200 hover:border-foreground/20 hover:shadow-sm"
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
                    className="text-sm font-medium"
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
      </div>
    </section>
  );
}
