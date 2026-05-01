import Link from "next/link";
import { Dumbbell, QrCode, BarChart3, ArrowRight } from "lucide-react";

const pillars = [
  {
    icon: Dumbbell,
    title: "Personalized Programs",
    description:
      "Members follow structured, coach-designed training plans adapted to their goals and progress week by week.",
    href: "/m",
  },
  {
    icon: QrCode,
    title: "QR Machine Guidance",
    description:
      "Every machine carries a QR code. One scan delivers video instructions and form cues — no trainer required.",
    href: "/m",
  },
  {
    icon: BarChart3,
    title: "Retention Analytics",
    description:
      "Owners see attendance trends, churn signals, and program adoption — before members go quiet.",
    href: "/admin",
  },
];

export function FeaturePillars() {
  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {pillars.map(({ icon: Icon, title, description, href }) => (
            <div
              key={title}
              className="flex flex-col gap-4 border-l-[3px] pl-6"
              style={{ borderLeftColor: "var(--brand)" }}
            >
              {/* Icon */}
              <div
                className="flex h-11 w-11 items-center justify-center rounded-xl"
                style={{
                  backgroundColor:
                    "color-mix(in oklch, var(--brand) 12%, transparent)",
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
                <h3 className="text-sm font-semibold tracking-tight text-foreground">
                  {title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {description}
                </p>
              </div>

              {/* Learn more */}
              <Link
                href={href}
                className="mt-auto flex items-center gap-1.5 text-xs font-semibold transition-opacity hover:opacity-70"
                style={{ color: "var(--brand)" }}
              >
                Learn more
                <ArrowRight className="h-3 w-3" strokeWidth={2.5} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
