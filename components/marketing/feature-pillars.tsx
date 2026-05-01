import { Dumbbell, QrCode, BarChart3 } from "lucide-react";

const pillars = [
  {
    icon: Dumbbell,
    title: "Personalized Programs",
    description:
      "Members follow structured, coach-designed training plans adapted to their goals and progress.",
  },
  {
    icon: QrCode,
    title: "QR Machine Guidance",
    description:
      "Every machine carries a QR code. One scan delivers video instructions and form cues — no trainer required.",
  },
  {
    icon: BarChart3,
    title: "Retention Analytics",
    description:
      "Owners see attendance trends, churn signals, and program adoption — before members go quiet.",
  },
];

export function FeaturePillars() {
  return (
    <section className="w-full border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-1 gap-px bg-border sm:grid-cols-3">
          {pillars.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="flex flex-col gap-3 bg-background px-8 py-10"
            >
              <div
                className="flex h-9 w-9 items-center justify-center rounded-lg"
                style={{ backgroundColor: "color-mix(in oklch, var(--brand) 12%, transparent)" }}
              >
                <Icon
                  className="h-4.5 w-4.5"
                  style={{ color: "var(--brand)" }}
                  strokeWidth={1.75}
                />
              </div>
              <h3 className="text-sm font-semibold tracking-tight text-foreground">
                {title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
