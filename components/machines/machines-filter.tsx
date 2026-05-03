"use client";

import { useState } from "react";
import Link from "next/link";
import type { Machine } from "@/lib/types";
import { MachineIllustration } from "@/components/machines/machine-illustration";

type FilterPill = "All" | "Chest" | "Back" | "Legs" | "Shoulders" | "Arms" | "Core" | "Cardio";

const FILTER_PILLS: FilterPill[] = [
  "All",
  "Chest",
  "Back",
  "Legs",
  "Shoulders",
  "Arms",
  "Core",
  "Cardio",
];

function matchesFilter(machine: Machine, filter: FilterPill): boolean {
  if (filter === "All") return true;
  if (filter === "Cardio") return machine.category === "cardio";
  const groups = machine.muscle_groups.map((g) => g.toLowerCase());
  if (filter === "Chest") {
    return groups.some((g) => g.includes("pectoral") || g.includes("chest"));
  }
  if (filter === "Back") {
    return groups.some(
      (g) =>
        g.includes("lat") ||
        g.includes("back") ||
        g.includes("rhomboid") ||
        g.includes("trapezius"),
    );
  }
  if (filter === "Legs") {
    return groups.some(
      (g) =>
        g.includes("quadricep") ||
        g.includes("hamstring") ||
        g.includes("glute") ||
        g.includes("calf") ||
        g.includes("calves"),
    );
  }
  if (filter === "Shoulders") {
    return groups.some((g) => g.includes("deltoid") || g.includes("shoulder"));
  }
  if (filter === "Arms") {
    return groups.some((g) => g.includes("bicep") || g.includes("tricep"));
  }
  if (filter === "Core") {
    return groups.some(
      (g) =>
        g.includes("core") ||
        g.includes("abdominal") ||
        g.includes("oblique") ||
        g.includes("erector"),
    );
  }
  return false;
}

function getStationNumber(slug: string): number {
  let h = 0;
  for (const c of slug) h = ((h << 5) - h + c.charCodeAt(0)) | 0;
  return (Math.abs(h) % 18) + 1;
}

interface MachinesFilterProps {
  machines: Machine[];
}

export function MachinesFilter({ machines }: MachinesFilterProps) {
  const [activeFilter, setActiveFilter] = useState<FilterPill>("All");

  const filtered = machines.filter((m) => matchesFilter(m, activeFilter));

  return (
    <div className="flex flex-col gap-6">
      {/* Filter pills */}
      <div className="flex flex-wrap gap-2">
        {FILTER_PILLS.map((pill) => {
          const isActive = activeFilter === pill;
          return (
            <button
              key={pill}
              onClick={() => setActiveFilter(pill)}
              className="rounded-full border px-4 py-1.5 text-sm font-medium transition-all duration-150"
              style={
                isActive
                  ? { backgroundColor: "var(--brand)", color: "white", borderColor: "var(--brand)" }
                  : {
                      backgroundColor: "var(--background)",
                      color: "var(--muted-foreground)",
                      borderColor: "var(--border)",
                    }
              }
              onMouseEnter={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                    "color-mix(in oklch, var(--brand) 8%, var(--background))";
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--brand)";
                  (e.currentTarget as HTMLButtonElement).style.color = "var(--brand)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = "var(--background)";
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border)";
                  (e.currentTarget as HTMLButtonElement).style.color = "var(--muted-foreground)";
                }
              }}
            >
              {pill}
            </button>
          );
        })}
      </div>

      {/* Machine grid */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border bg-muted/30 py-20 text-center">
          <p className="text-sm text-muted-foreground">No machines found for this filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {filtered.map((machine) => (
            <MachineCard key={machine.id} machine={machine} />
          ))}
        </div>
      )}
    </div>
  );
}

function MachineCard({ machine }: { machine: Machine }) {
  const stationNumber = getStationNumber(machine.slug);
  const visibleMuscles = machine.muscle_groups.slice(0, 2);

  return (
    <Link
      href={`/m/machine/${machine.slug}`}
      className="group overflow-hidden rounded-xl border border-border bg-card transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--brand)] hover:shadow-md cursor-pointer block"
    >
      {/* Illustration */}
      <MachineIllustration machine={machine} size="sm" />

      {/* Body */}
      <div className="p-4">
        <p className="text-sm font-semibold text-foreground">{machine.name}</p>
        <p className="mt-0.5 text-xs text-muted-foreground">Station {stationNumber}</p>

        {/* Muscle group chips */}
        {visibleMuscles.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {visibleMuscles.map((mg) => (
              <span
                key={mg}
                className="rounded-full px-2 py-0.5 text-xs font-medium capitalize"
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

        {/* View link */}
        <p className="mt-3 text-xs font-medium" style={{ color: "var(--brand)" }}>
          View →
        </p>
      </div>
    </Link>
  );
}
