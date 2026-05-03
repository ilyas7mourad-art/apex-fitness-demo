import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  getMember,
  getActiveProgram,
  getGymBySlug,
  getMostUsedMachines,
  getProgramExercises,
  getMachinesByIds,
} from "@/lib/db/queries";
import { SiteHeader } from "@/components/marketing/site-header";
import { MachineIllustration } from "@/components/machines/machine-illustration";
import { formatExerciseDetail } from "@/lib/utils";
import type { Machine } from "@/lib/types";

export const dynamic = "force-dynamic";

function getStationNumber(slug: string): number {
  let h = 0;
  for (const c of slug) h = ((h << 5) - h + c.charCodeAt(0)) | 0;
  return (Math.abs(h) % 18) + 1;
}

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const memberId = cookieStore.get("apex_demo_member_id")?.value;

  if (!memberId) {
    redirect("/m");
  }

  const gym = await getGymBySlug("apex-fitness-dubai");

  const [member, activeProgram, mostUsedMachines] = await Promise.all([
    getMember(memberId),
    getActiveProgram(memberId),
    gym ? getMostUsedMachines(memberId, gym.id, 3) : Promise.resolve([]),
  ]);

  if (!member) {
    redirect("/m");
  }

  // Today's exercises
  const todayDayNumber = activeProgram
    ? (new Date().getDay() % activeProgram.sessions_per_week) + 1
    : null;
  const todayExercises =
    activeProgram && todayDayNumber
      ? await getProgramExercises(activeProgram.id, todayDayNumber)
      : [];

  // Look up machine slugs for today's exercises
  const machineIds = todayExercises
    .filter((e) => e.machine_id)
    .map((e) => e.machine_id!);
  const exerciseMachines = await getMachinesByIds(machineIds);
  const machineMap = new Map<string, Machine>(exerciseMachines.map((m) => [m.id, m]));

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
              {member.full_name} &middot;{" "}
              {member.fitness_level.charAt(0).toUpperCase() + member.fitness_level.slice(1)}
            </p>
          </div>

          {/* Goal + program summary cards */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {/* Goal card */}
            <div className="rounded-xl border border-border bg-card p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Your Goal
              </p>
              <p className="mt-2 text-lg font-semibold" style={{ color: "var(--brand)" }}>
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
                <p className="mt-2 text-sm text-muted-foreground">No active program assigned</p>
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

          {/* Continue your training */}
          <div className="mt-10">
            <div className="mb-4 flex flex-col gap-1">
              <h2 className="text-xl font-semibold text-foreground">Continue your training</h2>
              <p className="text-sm text-muted-foreground">Your most-used machines</p>
            </div>

            {mostUsedMachines.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {mostUsedMachines.map((machine) => (
                  <Link
                    key={machine.id}
                    href={`/m/machine/${machine.slug}`}
                    className="overflow-hidden rounded-xl border border-border bg-card transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--brand)] hover:shadow-md"
                  >
                    <MachineIllustration machine={machine} size="sm" />
                    <div className="p-4">
                      <p className="text-sm font-semibold text-foreground">{machine.name}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        Station {getStationNumber(machine.slug)}
                      </p>
                      <p className="mt-3 text-xs font-medium" style={{ color: "var(--brand)" }}>
                        View machine →
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-border p-8 text-center">
                <p className="text-sm text-muted-foreground">
                  No sessions yet.{" "}
                  <Link
                    href="/m/machines"
                    className="font-medium transition-colors"
                    style={{ color: "var(--brand)" }}
                  >
                    Browse the equipment library →
                  </Link>
                </p>
              </div>
            )}
          </div>

          {/* Today's plan */}
          <div className="mt-10">
            <div className="mb-4 flex flex-col gap-1">
              <h2 className="text-xl font-semibold text-foreground">Today&apos;s plan</h2>
              {activeProgram && (
                <p className="text-sm text-muted-foreground">{activeProgram.name}</p>
              )}
            </div>

            {todayExercises.length > 0 ? (
              <div className="rounded-xl border border-border bg-card">
                {todayExercises.map((exercise) => {
                  const machineSlug = exercise.machine_id
                    ? machineMap.get(exercise.machine_id)?.slug ?? null
                    : null;
                  return (
                    <div
                      key={exercise.id}
                      className="flex items-center justify-between border-b border-border px-5 py-3 last:border-0"
                    >
                      <div>
                        <p className="text-sm font-medium text-foreground">{exercise.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatExerciseDetail(exercise)}
                        </p>
                      </div>
                      {machineSlug && (
                        <Link
                          href={`/m/machine/${machineSlug}`}
                          className="ml-4 shrink-0 text-xs font-semibold"
                          style={{ color: "var(--brand)" }}
                        >
                          Open →
                        </Link>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-border p-8 text-center">
                <p className="text-sm text-muted-foreground">
                  {activeProgram ? "Rest day. " : "No program assigned. "}
                  <Link
                    href="/m/machines"
                    className="font-medium transition-colors"
                    style={{ color: "var(--brand)" }}
                  >
                    Browse the equipment library →
                  </Link>
                </p>
              </div>
            )}
          </div>

          {/* Footer nav */}
          <div className="mt-8 flex items-center justify-between border-t border-border pt-6">
            <Link
              href="/m/machines"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Browse all machines →
            </Link>
            <Link
              href="/m"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Switch member
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
