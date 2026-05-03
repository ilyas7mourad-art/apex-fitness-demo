"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase";
import { getMember, getActiveProgram, getOrCreateTodaySession, logEvent } from "@/lib/db/queries";

export async function logSet(params: {
  machineId: string;
  machineSlug: string;
  machineName: string;
  gymId: string;
  reps: number;
  weightKg?: number;
  difficulty?: number;
}): Promise<{ success: boolean; error?: string }> {
  const cookieStore = await cookies();
  const memberId = cookieStore.get("apex_demo_member_id")?.value;
  if (!memberId) return { success: false, error: "No member selected" };

  const member = await getMember(memberId);
  if (!member) return { success: false, error: "Member not found" };

  const activeProgram = await getActiveProgram(memberId);
  const session = await getOrCreateTodaySession(memberId, params.gymId, activeProgram?.id);
  if (!session) return { success: false, error: "Could not create session" };

  const db = createAdminClient();
  const { count } = await db
    .from("set_logs")
    .select("*", { count: "exact", head: true })
    .eq("session_id", session.id)
    .eq("machine_id", params.machineId);

  const setNumber = (count ?? 0) + 1;

  const { error } = await db.from("set_logs").insert({
    session_id: session.id,
    machine_id: params.machineId,
    exercise_name: params.machineName,
    set_number: setNumber,
    reps: params.reps,
    weight_kg: params.weightKg ?? null,
    notes: params.difficulty != null ? `difficulty:${params.difficulty}` : null,
  });

  if (error) return { success: false, error: error.message };

  await logEvent({
    gymId: params.gymId,
    memberId,
    type: "set_logged",
    payload: {
      machine_id: params.machineId,
      machine_name: params.machineName,
      reps: params.reps,
      weight_kg: params.weightKg,
      set_number: setNumber,
    },
  });

  revalidatePath(`/m/machine/${params.machineSlug}`);
  revalidatePath("/m/dashboard");
  return { success: true };
}
