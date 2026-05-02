import { getFeaturedMembers, getGymBySlug } from "@/lib/db/queries";
import { SiteHeader } from "@/components/marketing/site-header";
import { MemberCard } from "@/components/member/member-card";

export const dynamic = "force-dynamic";

export default async function MemberPickerPage() {
  const gym = await getGymBySlug("apex-fitness-dubai");

  const featuredMembers = gym
    ? await getFeaturedMembers(gym.id)
    : [];

  return (
    <>
      <SiteHeader />
      <main className="flex flex-1 flex-col">
        {/* Hero */}
        <section className="mx-auto w-full max-w-6xl px-6 pb-10 pt-16">
          <div className="flex flex-col items-center gap-5 text-center">
            {/* Amber tag */}
            <div
              className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-widest"
              style={{
                color: "var(--brand)",
                backgroundColor: "color-mix(in oklch, var(--brand) 10%, transparent)",
              }}
            >
              Member Experience
            </div>

            <h1 className="max-w-2xl text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Choose a member to explore as
            </h1>

            <p className="max-w-xl text-base text-muted-foreground">
              Each profile below is a real demo account with 3 months of workout
              history, an active program, and personalised insights. Select one
              to see Apex Fitness through their eyes.
            </p>
          </div>
        </section>

        {/* Member grid */}
        <section className="mx-auto w-full max-w-6xl px-6 pb-16">
          {featuredMembers.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {featuredMembers.map((member) => (
                <MemberCard key={member.id} member={member} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border bg-muted/30 py-20 text-center">
              <p className="text-sm font-medium text-muted-foreground">
                No featured members found.
              </p>
              <p className="text-xs text-muted-foreground/70">
                Run{" "}
                <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
                  npm run seed -- --force
                </code>{" "}
                to populate the database.
              </p>
            </div>
          )}

          {/* Muted note */}
          <p className="mt-8 text-center text-xs text-muted-foreground/60">
            This is a demo environment. All members and data are fictional.
            No real personal information is used.
          </p>
        </section>
      </main>
    </>
  );
}
