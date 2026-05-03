"use client";

import { useState, useTransition, useEffect } from "react";
import type { Machine, ProgramExercise } from "@/lib/types";
import { logSet } from "@/app/actions/set-log";

interface LogSetSheetProps {
  machine: Machine;
  gymId: string;
  todayExercise: ProgramExercise | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function LogSetSheet({
  machine,
  gymId,
  todayExercise,
  isOpen,
  onClose,
  onSuccess,
}: LogSetSheetProps) {
  const [isPending, startTransition] = useTransition();
  const [reps, setReps] = useState<string>(
    todayExercise?.reps_max ? String(todayExercise.reps_max) : "",
  );
  const [weightKg, setWeightKg] = useState<string>("");
  const [difficulty, setDifficulty] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Reset form when sheet opens
  useEffect(() => {
    if (isOpen) {
      setReps(todayExercise?.reps_max ? String(todayExercise.reps_max) : "");
      setWeightKg("");
      setDifficulty(null);
      setError(null);
    }
  }, [isOpen, todayExercise]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const repsNum = parseInt(reps, 10);
    if (!reps || isNaN(repsNum) || repsNum < 1) {
      setError("Please enter a valid number of reps (minimum 1)");
      return;
    }

    const weightNum = weightKg ? parseFloat(weightKg) : undefined;

    startTransition(async () => {
      const result = await logSet({
        machineId: machine.id,
        machineSlug: machine.slug,
        machineName: machine.name,
        gymId,
        reps: repsNum,
        weightKg: weightNum,
        difficulty: difficulty ?? undefined,
      });

      if (result.success) {
        onSuccess();
        onClose();
      } else {
        setError(result.error ?? "Something went wrong. Please try again.");
      }
    });
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/50 transition-opacity duration-300"
        style={{ opacity: isOpen ? 1 : 0, pointerEvents: isOpen ? "auto" : "none" }}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sheet panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`Log a set on ${machine.name}`}
        className="fixed bottom-0 left-0 right-0 z-50 rounded-t-2xl border-t border-border bg-background p-6 pb-8 transition-transform duration-300 ease-out"
        style={{ transform: isOpen ? "translateY(0)" : "translateY(100%)" }}
      >
        {/* Drag handle */}
        <div className="mx-auto mb-6 h-1 w-10 rounded-full bg-border" />

        {/* Heading */}
        <h2 className="mb-6 text-lg font-semibold text-foreground">Log set</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Reps input */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-foreground" htmlFor="log-reps">
              Reps
            </label>
            <input
              id="log-reps"
              type="number"
              min={1}
              max={100}
              value={reps}
              onChange={(e) => setReps(e.target.value)}
              placeholder="e.g. 10"
              className="h-12 w-full rounded-lg border border-border bg-background text-center text-lg text-foreground focus:outline-none focus:ring-2"
              style={{ focusRingColor: "var(--brand)" } as React.CSSProperties}
              disabled={isPending}
            />
          </div>

          {/* Weight input */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-foreground" htmlFor="log-weight">
              Weight (kg) <span className="text-xs font-normal text-muted-foreground">optional</span>
            </label>
            <input
              id="log-weight"
              type="number"
              min={0}
              step={0.5}
              value={weightKg}
              onChange={(e) => setWeightKg(e.target.value)}
              placeholder="e.g. 50"
              className="h-12 w-full rounded-lg border border-border bg-background text-center text-lg text-foreground focus:outline-none focus:ring-2"
              disabled={isPending}
            />
          </div>

          {/* Difficulty selector */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-foreground">
                Difficulty <span className="text-xs font-normal text-muted-foreground">optional</span>
              </label>
              <div className="flex gap-4 text-xs text-muted-foreground">
                <span>Easy</span>
                <span>All out</span>
              </div>
            </div>
            <div className="flex gap-1.5">
              {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => {
                const isSelected = difficulty === n;
                return (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setDifficulty(isSelected ? null : n)}
                    disabled={isPending}
                    className="flex-1 rounded-md border py-1.5 text-xs font-medium transition-all duration-150"
                    style={
                      isSelected
                        ? {
                            backgroundColor: "var(--brand)",
                            color: "white",
                            borderColor: "var(--brand)",
                          }
                        : {
                            backgroundColor: "var(--background)",
                            color: "var(--muted-foreground)",
                            borderColor: "var(--border)",
                          }
                    }
                  >
                    {n}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Error message */}
          {error && (
            <p className="rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
              {error}
            </p>
          )}

          {/* Submit button */}
          <button
            type="submit"
            disabled={isPending}
            className="mt-2 flex h-12 w-full items-center justify-center gap-2 rounded-lg text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
            style={{ backgroundColor: "var(--brand)" }}
          >
            {isPending ? (
              <>
                <svg
                  className="h-4 w-4 animate-spin"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                Logging...
              </>
            ) : (
              "Log set"
            )}
          </button>
        </form>

        {/* Cancel */}
        <button
          type="button"
          onClick={onClose}
          disabled={isPending}
          className="mt-4 w-full text-center text-sm text-muted-foreground transition-colors hover:text-foreground disabled:opacity-50"
        >
          Cancel
        </button>
      </div>
    </>
  );
}
