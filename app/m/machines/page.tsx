import { getGymBySlug, listMachines } from "@/lib/db/queries";
import { SiteHeader } from "@/components/marketing/site-header";
import { MachinesFilter } from "@/components/machines/machines-filter";

export const dynamic = "force-dynamic";

export default async function MachinesPage() {
  const gym = await getGymBySlug("apex-fitness-dubai");
  const machines = gym ? await listMachines(gym.id) : [];

  return (
    <>
      <SiteHeader />
      <main>
        {/* Hero */}
        <section className="mx-auto w-full max-w-6xl px-6 pb-8 pt-12">
          <div className="flex flex-col gap-3">
            <p
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: "var(--brand)" }}
            >
              Equipment Library
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Explore every machine
            </h1>
            <p className="max-w-xl text-base text-muted-foreground">
              Tap a machine to see instructions, form cues, and what&apos;s on your plan today.
            </p>
          </div>
        </section>

        {/* Filter + Grid */}
        <section className="mx-auto w-full max-w-6xl px-6 pb-16">
          <MachinesFilter machines={machines} />
        </section>

        {/* Footer note */}
        <p className="pb-8 text-center text-xs text-muted-foreground/60">
          Demo environment &mdash; instructions and form cues are fictional placeholder content.
        </p>
      </main>
    </>
  );
}
