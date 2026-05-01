import { ChevronLeft, QrCode, CheckCircle2, Circle, Wifi, Bookmark } from "lucide-react";

const sets = [
  { label: "Set 1", detail: "12 reps · 30 kg", status: "done" as const },
  { label: "Set 2", detail: "10 reps · 35 kg", status: "done" as const },
  { label: "Set 3", detail: "10 reps · 35 kg", status: "active" as const },
  { label: "Set 4", detail: "8 reps · 40 kg", status: "pending" as const },
];

function SignalBars() {
  return (
    <div className="flex items-end gap-[1.5px]" aria-hidden="true">
      {([4, 6, 8, 11] as const).map((h, i) => (
        <div
          key={i}
          className={`w-[2.5px] rounded-[1px] bg-foreground${i >= 2 ? " opacity-30" : ""}`}
          style={{ height: h }}
        />
      ))}
    </div>
  );
}

function BatteryIcon() {
  return (
    <div className="flex items-center" aria-hidden="true">
      <div className="flex h-[11px] w-[20px] items-center rounded-[2.5px] border border-foreground/60 p-[1.5px]">
        <div className="h-full w-[72%] rounded-[1px] bg-foreground" />
      </div>
      <div className="ml-[1.5px] h-[5px] w-[1.5px] rounded-r-[1px] bg-foreground/40" />
    </div>
  );
}

export function PhoneMockup() {
  return (
    <div
      className="relative mx-auto w-[248px] select-none"
      aria-hidden="true"
    >
      {/* Outer phone frame */}
      <div className="relative rounded-[40px] bg-[oklch(0.11_0_0)] px-[9px] pb-[18px] pt-[9px] shadow-[0_24px_60px_-8px_oklch(0.08_0_0/0.50),0_0_0_1px_oklch(0.20_0_0)]">
        {/* Volume up */}
        <div className="absolute -left-[2px] top-[100px] h-7 w-[2px] rounded-l-full bg-[oklch(0.22_0_0)]" />
        {/* Volume down */}
        <div className="absolute -left-[2px] top-[136px] h-9 w-[2px] rounded-l-full bg-[oklch(0.22_0_0)]" />
        {/* Silent switch */}
        <div className="absolute -left-[2px] top-[80px] h-4 w-[2px] rounded-l-full bg-[oklch(0.22_0_0)]" />
        {/* Power button */}
        <div className="absolute -right-[2px] top-[124px] h-14 w-[2px] rounded-r-full bg-[oklch(0.22_0_0)]" />

        {/* Screen surface */}
        <div className="overflow-hidden rounded-[31px] bg-background">
          {/* ── Status bar ── */}
          <div className="relative flex h-[44px] items-center justify-between px-5 pt-[6px]">
            <span className="text-[12px] font-semibold leading-none text-foreground">
              9:41
            </span>
            {/* Dynamic island — absolutely centered so it's always at 50% of
                the screen width regardless of left/right element widths */}
            <div className="absolute left-1/2 top-1/2 h-[22px] w-[84px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[oklch(0.11_0_0)]" />
            {/* System icons */}
            <div className="flex items-center gap-1.5 text-foreground">
              <SignalBars />
              <Wifi className="h-[11px] w-[11px]" strokeWidth={2.5} />
              <BatteryIcon />
            </div>
          </div>

          {/* ── Nav row ── */}
          <div className="flex items-center justify-between px-4 py-2">
            <button className="flex items-center gap-[3px] text-muted-foreground">
              <ChevronLeft className="h-[15px] w-[15px]" strokeWidth={2.5} />
              <span className="text-[12px] font-medium">My Program</span>
            </button>
            <Bookmark
              className="h-[15px] w-[15px] text-muted-foreground"
              strokeWidth={1.75}
            />
          </div>

          {/* ── Machine card ── */}
          <div className="mx-3 mb-3 rounded-2xl bg-muted px-4 py-3.5">
            <div className="mb-2.5 flex items-center gap-3">
              <div
                className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-xl"
                style={{
                  backgroundColor:
                    "color-mix(in oklch, var(--brand) 16%, transparent)",
                }}
              >
                <QrCode
                  className="h-[20px] w-[20px]"
                  style={{ color: "var(--brand)" }}
                  strokeWidth={1.75}
                />
              </div>
              <div className="min-w-0">
                <p className="text-[13px] font-bold leading-tight text-foreground">
                  Cable Row
                </p>
                <p className="text-[11px] leading-tight text-muted-foreground">
                  Back & Biceps · Station 4
                </p>
              </div>
            </div>
            <span
              className="rounded-full px-2 py-[2px] text-[9px] font-bold tracking-[0.08em]"
              style={{
                backgroundColor:
                  "color-mix(in oklch, var(--brand) 14%, transparent)",
                color: "var(--brand)",
              }}
            >
              ACTIVE
            </span>
          </div>

          {/* ── Session section ── */}
          <div className="px-4">
            <p className="mb-2 text-[9.5px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
              Today&apos;s Session
            </p>
            <div className="flex flex-col gap-[2px]">
              {sets.map(({ label, detail, status }) => (
                <div
                  key={label}
                  className="flex items-center gap-2.5 rounded-lg px-2.5 py-2"
                  style={
                    status === "active"
                      ? {
                          backgroundColor:
                            "color-mix(in oklch, var(--brand) 9%, transparent)",
                        }
                      : {}
                  }
                >
                  {status === "done" ? (
                    <CheckCircle2
                      className="h-[13px] w-[13px] shrink-0 text-muted-foreground/40"
                      strokeWidth={2}
                    />
                  ) : status === "active" ? (
                    <div
                      className="h-[13px] w-[13px] shrink-0 rounded-full border-[2px]"
                      style={{ borderColor: "var(--brand)" }}
                    />
                  ) : (
                    <Circle
                      className="h-[13px] w-[13px] shrink-0 text-muted-foreground/25"
                      strokeWidth={1.5}
                    />
                  )}
                  <span
                    className="flex-1 text-[11.5px] font-medium"
                    style={
                      status === "active"
                        ? { color: "var(--brand)" }
                        : status === "done"
                          ? { color: "oklch(0.55 0 0)" }
                          : { color: "oklch(0.65 0 0)" }
                    }
                  >
                    {label}
                  </span>
                  <span
                    className="text-[10.5px]"
                    style={
                      status === "active"
                        ? { color: "var(--brand)", fontWeight: 500 }
                        : status === "done"
                          ? { color: "oklch(0.65 0 0)" }
                          : { color: "oklch(0.72 0 0)" }
                    }
                  >
                    {detail}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Log button ── */}
          <div className="px-4 pb-4 pt-3">
            <div
              className="flex w-full items-center justify-center rounded-xl py-3 text-[12.5px] font-semibold text-white"
              style={{ backgroundColor: "var(--brand)" }}
            >
              Log Set 3
            </div>
          </div>

          {/* ── Home indicator ── */}
          <div className="flex justify-center pb-[10px]">
            <div className="h-[4px] w-24 rounded-full bg-foreground/20" />
          </div>
        </div>
      </div>
    </div>
  );
}
