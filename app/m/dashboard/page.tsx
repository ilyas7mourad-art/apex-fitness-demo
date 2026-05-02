import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { getMember, getActiveProgram } from "@/lib/db/queries";
import { SiteHeader } from "@/components/marketing/site-header";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const memberId = cookieStore.get("apex_demo_member_id")?.value;

  if (!memberId) {
    redirect("/m");
  }

  const member = await getMember(memberId);

  if (!member) {
    redirect("/m");
  }

  const activeProgram = await getActiveProgram(memberId);

  return (
    <>
      <SiteHeader />
      <main className="flex flex-1 flex-col">
        <section className="mx-auto w-full max-w-6xl px-6 pb-16 pt-12">
          {/* Welcome header */}
          <div className="flex flex-col gap-2">
            <p
              className="text-sm font-semibold uppercase tracking-widest"
              style={{ color: "var(--brand)" }}
            >
              Member Dashboard
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Welcome back, {member.full_name.split(" ")[0]}
            </h1>
            <p className="text-base text-muted-foreground">
              {member.full_name} &middot; {member.fitness_level.charAt(0).toUpperCase() + member.fitness_level.slice(1)}
            </p>
          </div>

          {/* Goal + program summary */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {/* Goal card */}
            <div className="rounded-xl border border-border bg-card p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Your Goal
              </p>
              <p
                className="mt-2 text-lg font-semibold"
                style={{ color: "var(--brand)" }}
              >
                {member.goal}
              </p>
            </div>

            {/* Active program card */}
            <div className="rounded-xl border border-border bg-card p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Active Program
              </p>
              {activeProgram ? (
                <>
                  <p className="mt-2 text-lg font-semibold text-foreground">
                    {activeProgram.name}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {activeProgram.duration_weeks} weeks &middot;{" "}
                    {activeProgram.sessions_per_week}x / week
                  </p>
                </>
              ) : (
                <p className="mt-2 text-sm text-muted-foreground">
                  No active program assigned
                </p>
              )}
            </div>

            {/* Fitness level card */}
            <div className="rounded-xl border border-border bg-card p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Fitness Level
              </p>
              <p className="mt-2 text-lg font-semibold text-foreground capitalize">
                {member.fitness_level}
              </p>
            </div>
          </div>

          {/* Coming soon notice */}
          <div className="mt-10 rounded-xl border border-dashed border-border bg-muted/30 p-8 text-center">
            <p
              className="text-sm font-semibold uppercase tracking-widest"
              style={{ color: "var(--brand)" }}
            >
              Coming in the next PR
            </p>
            <p className="mt-2 text-base font-medium text-foreground">
              Full dashboard experience
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Session history, program progress, QR machine scanner, and
              personalised analytics are being built in PR 4.
            </p>
          </div>

          {/* Switch member link */}
          <div className="mt-8 flex justify-center">
            <Link
              href="/m"
              className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
              Switch member
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
