"use client";

import { useState } from "react";
import Link from "next/link";
import type { Machine } from "@/lib/types";
import type { ProgramExercise } from "@/lib/types";
import { LogSetSheet } from "@/components/member/log-set-sheet";

interface LogSetSectionProps {
  machine: Machine;
  gymId: string;
  todayExercise: ProgramExercise | null;
  hasProgram: boolean;
  memberId: string | null;
}

export function LogSetSection({
  machine,
  gymId,
  todayExercise,
  hasProgram,
  memberId,
}: LogSetSectionProps) {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  function handleSuccess() {
    setSuccessMessage("Set logged successfully!");
    setTimeout(() => setSuccessMessage(null), 3000);
  }

  if (!memberId) {
    return (
      <div
        className="mt-8 rounded-xl border border-dashed border-border p-6 text-center"
        style={{ backgroundColor: "color-mix(in oklch, var(--brand) 4%, var(--background))" }}
      >
        <p className="text-sm text-muted-foreground">
          <Link href="/m" className="font-semibold underline" style={{ color: "var(--brand)" }}>
            Pick a member
          </Link>{" "}
          to track sets on this machine
        </p>
      </div>
    );
  }

  return (
    <>
      <div
        className="mt-8 rounded-xl border p-5"
        style={{ borderColor: hasProgram && todayExercise ? "var(--brand)" : "var(--border)" }}
      >
        {hasProgram && todayExercise ? (
          /* Plan info + log button */
          <div className="flex flex-col gap-4">
            <div
              className="inline-flex items-center gap-1.5 self-start rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider"
              style={{
                color: "var(--brand)",
                backgroundColor: "color-mix(in oklch, var(--brand) 10%, transparent)",
              }}
            >
              On today&apos;s plan
            </div>
            <div>
              <p className="text-base font-semibold text-foreground">{todayExercise.name}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {todayExercise.sets} sets &middot;{" "}
                {todayExercise.reps_min}
                {todayExercise.reps_max && todayExercise.reps_max !== todayExercise.reps_min
                  ? `–${todayExercise.reps_max}`
                  : ""}{" "}
                reps &middot; {todayExercise.rest_seconds}s rest
              </p>
              {todayExercise.notes && (
                <p className="mt-1 text-xs text-muted-foreground italic">{todayExercise.notes}</p>
              )}
            </div>
            <button
              onClick={() => setSheetOpen(true)}
              className="h-11 w-full rounded-lg text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: "var(--brand)" }}
            >
              Log a set
            </button>
          </div>
        ) : hasProgram ? (
          /* Has program but not on today's plan */
          <div className="flex flex-col gap-4">
            <p className="text-sm text-muted-foreground">
              Not on today&apos;s plan — feel free to log a set
            </p>
            <button
              onClick={() => setSheetOpen(true)}
              className="h-11 w-full rounded-lg text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: "var(--brand)" }}
            >
              Log a set
            </button>
          </div>
        ) : (
          /* No program — just log button */
          <div className="flex flex-col gap-4">
            <p className="text-sm font-medium text-foreground">Log a set</p>
            <button
              onClick={() => setSheetOpen(true)}
              className="h-11 w-full rounded-lg text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: "var(--brand)" }}
            >
              Log a set
            </button>
          </div>
        )}

        {/* Success message */}
        {successMessage && (
          <p className="mt-3 text-center text-sm font-medium" style={{ color: "var(--brand)" }}>
            {successMessage}
          </p>
        )}
      </div>

      <LogSetSheet
        machine={machine}
        gymId={gymId}
        todayExercise={todayExercise}
        isOpen={sheetOpen}
        onClose={() => setSheetOpen(false)}
        onSuccess={handleSuccess}
      />
    </>
  );
}
