import { cookies } from "next/headers";
import Link from "next/link";
import { AlertCircle, ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";
import {
  getGymBySlug,
  getMachine,
  getMember,
  getActiveProgram,
  getMachineSetLogs,
  getProgramExercises,
} from "@/lib/db/queries";
import { SiteHeader } from "@/components/marketing/site-header";
import { MachineIllustration } from "@/components/machines/machine-illustration";
import { LogSetSection } from "@/components/machines/log-set-section";
import type { SetLog, ProgramExercise } from "@/lib/types";

export const dynamic = "force-dynamic";

function getStationNumber(slug: string): number {
  let h = 0;
  for (const c of slug) h = ((h << 5) - h + c.charCodeAt(0)) | 0;
  return (Math.abs(h) % 18) + 1;
}

function relativeTime(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / 86400000);
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  return `${days} days ago`;
}

interface MachinePageProps {
  params: Promise<{ slug: string }>;
}

export default async function MachinePage({ params }: MachinePageProps) {
  const { slug } = await params;

  const gym = await getGymBySlug("apex-fitness-dubai");
  if (!gym) notFound();

  const machine = await getMachine(gym.id, slug);
  if (!machine) notFound();

  const cookieStore = await cookies();
  const memberId = cookieStore.get("apex_demo_member_id")?.value ?? null;

  let setLogs: SetLog[] = [];
  let todayExercise: ProgramExercise | null = null;
  let hasProgram = false;

  if (memberId) {
    const [member, activeProgram, logs] = await Promise.all([
      getMember(memberId),
      getActiveProgram(memberId),
      getMachineSetLogs(memberId, machine.id, 5),
    ]);

    setLogs = logs;

    if (member && activeProgram) {
      hasProgram = true;
      const todayDayNumber = (new Date().getDay() % activeProgram.sessions_per_week) + 1;
      const todayExercises = await getProgramExercises(activeProgram.id, todayDayNumber);
      todayExercise = todayExercises.find((e) => e.machine_id === machine.id) ?? null;
    }
  }

  const stationNumber = getStationNumber(machine.slug);
  const firstMuscleGroup =
    machine.muscle_groups[0]?.replace(/_/g, " ") ?? machine.category;

  const commonMistakes = machine.common_mistakes.split("\n").filter(Boolean);
  const variations = machine.variations.split("\n").filter(Boolean);
  const instructionParagraphs = machine.instructions.split("\n\n").filter(Boolean);

  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-2xl px-4 pb-16 pt-6 sm:px-6">
        {/* Back nav */}
        <Link
          href="/m/machines"
          className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowRight className="h-3.5 w-3.5 rotate-180" />
          All machines
        </Link>

        {/* Machine hero illustration */}
        <MachineIllustration machine={machine} size="lg" />

        {/* Machine info */}
        <div className="mt-6 space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">{machine.name}</h1>
          <p className="text-base text-muted-foreground capitalize">
            Targets {firstMuscleGroup} &middot; Station {stationNumber}
          </p>

          {/* Muscle group chips */}
          {machine.muscle_groups.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-1">
              {machine.muscle_groups.map((mg) => (
                <span
                  key={mg}
                  className="rounded-full px-2.5 py-0.5 text-xs font-medium capitalize"
                  style={{
                    color: "var(--brand)",
                    backgroundColor: "color-mix(in oklch, var(--brand) 10%, transparent)",
                  }}
                >
                  {mg.replace(/_/g, " ")}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Log set section */}
        <LogSetSection
          machine={machine}
          gymId={gym.id}
          todayExercise={todayExercise}
          hasProgram={hasProgram}
          memberId={memberId}
        />

        {/* Instructions */}
        <section className="mt-10">
          <h2 className="text-lg font-semibold text-foreground">How to use it</h2>
          <div className="mt-4 space-y-4 text-base leading-relaxed text-muted-foreground">
            {instructionParagraphs.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </section>

        {/* Common mistakes */}
        {commonMistakes.length > 0 && (
          <section className="mt-10">
            <h2 className="text-lg font-semibold text-foreground">Watch out for</h2>
            <ul className="mt-4 space-y-3">
              {commonMistakes.map((mistake, i) => (
                <li key={i} className="flex gap-3 text-sm text-muted-foreground">
                  <AlertCircle
                    className="mt-0.5 h-4 w-4 shrink-0"
                    style={{ color: "var(--brand)" }}
                  />
                  <span>{mistake}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Variations */}
        {variations.length > 0 && (
          <section className="mt-10">
            <h2 className="text-lg font-semibold text-foreground">Try these variations</h2>
            <ul className="mt-4 space-y-3">
              {variations.map((variation, i) => (
                <li key={i} className="flex gap-3 text-sm text-muted-foreground">
                  <ArrowRight
                    className="mt-0.5 h-4 w-4 shrink-0"
                    style={{ color: "var(--brand)" }}
                  />
                  <span>{variation}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Recent activity */}
        {memberId && setLogs.length > 0 && (
          <section className="mt-10">
            <h2 className="text-lg font-semibold text-foreground">Recent activity</h2>
            <ul className="mt-4 divide-y divide-border">
              {setLogs.map((log) => (
                <li key={log.id} className="flex items-center justify-between py-3">
                  <span className="text-sm text-muted-foreground">
                    {relativeTime(log.logged_at)}
                  </span>
                  <span className="text-sm font-medium text-foreground">
                    {log.reps != null ? `${log.reps} reps` : ""}
                    {log.reps != null && log.weight_kg != null ? " · " : ""}
                    {log.weight_kg != null ? `${log.weight_kg} kg` : ""}
                    {log.reps == null && log.weight_kg == null ? "Set logged" : ""}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
    </>
  );
}
