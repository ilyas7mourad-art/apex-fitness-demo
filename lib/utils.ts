import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { ProgramExercise } from "@/lib/types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Returns a human-readable description of a program exercise row.
 * Time-based exercises (reps_min and reps_max both null) use the notes
 * field instead of a reps/rest string.
 */
export function formatExerciseDetail(exercise: ProgramExercise): string {
  const isTimeBased = exercise.reps_min == null && exercise.reps_max == null;
  if (isTimeBased) {
    if (exercise.notes) return exercise.notes;
    return exercise.sets > 1 ? `${exercise.sets} rounds` : "Duration exercise";
  }
  const repsStr =
    exercise.reps_min != null &&
    exercise.reps_max != null &&
    exercise.reps_min !== exercise.reps_max
      ? `${exercise.reps_min}–${exercise.reps_max}`
      : `${exercise.reps_min ?? exercise.reps_max}`;
  const parts = [`${exercise.sets} sets`, `${repsStr} reps`];
  if (exercise.rest_seconds > 0) parts.push(`${exercise.rest_seconds}s rest`);
  return parts.join(" · ");
}
