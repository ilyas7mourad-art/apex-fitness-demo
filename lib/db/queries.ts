import { createAdminClient } from "@/lib/supabase";
import type { Gym, Machine, Member, Program, Session, GymEvent, ProgramExercise, SetLog } from "@/lib/types";

// ----------------------------------------------------------------
// Gym
// ----------------------------------------------------------------

export async function getGym(slug: string): Promise<Gym | null> {
  const db = createAdminClient();
  const { data, error } = await db
    .from("gyms")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) return null;
  return data;
}

// ----------------------------------------------------------------
// Machines
// ----------------------------------------------------------------

export async function listMachines(gymId: string): Promise<Machine[]> {
  const db = createAdminClient();
  const { data, error } = await db
    .from("machines")
    .select("*")
    .eq("gym_id", gymId)
    .eq("is_active", true)
    .order("name");

  if (error) return [];
  return data ?? [];
}

export async function getMachine(
  gymId: string,
  slug: string,
): Promise<Machine | null> {
  const db = createAdminClient();
  const { data, error } = await db
    .from("machines")
    .select("*")
    .eq("gym_id", gymId)
    .eq("slug", slug)
    .single();

  if (error) return null;
  return data;
}

// ----------------------------------------------------------------
// Members
// ----------------------------------------------------------------

export async function listMembers(gymId: string): Promise<Member[]> {
  const db = createAdminClient();
  const { data, error } = await db
    .from("members")
    .select("*")
    .eq("gym_id", gymId)
    .eq("is_active", true)
    .order("full_name");

  if (error) return [];
  return data ?? [];
}

export async function getMember(memberId: string): Promise<Member | null> {
  const db = createAdminClient();
  const { data, error } = await db
    .from("members")
    .select("*")
    .eq("id", memberId)
    .single();

  if (error) return null;
  return data;
}

export async function getFeaturedMembers(gymId: string): Promise<Member[]> {
  const db = createAdminClient();
  const { data, error } = await db
    .from("members")
    .select("*")
    .eq("gym_id", gymId)
    .eq("is_active", true)
    .like("notes", "%DEMO_FEATURED%")
    .order("full_name")
    .limit(10);

  if (error) return [];
  return (data ?? []) as Member[];
}

export async function getGymBySlug(slug: string): Promise<Gym | null> {
  const db = createAdminClient();
  const { data, error } = await db
    .from("gyms")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) return null;
  return data as Gym;
}

// ----------------------------------------------------------------
// Sessions
// ----------------------------------------------------------------

export async function getMemberSessions(
  memberId: string,
  limit = 20,
): Promise<Session[]> {
  const db = createAdminClient();
  const { data, error } = await db
    .from("sessions")
    .select("*")
    .eq("member_id", memberId)
    .order("started_at", { ascending: false })
    .limit(limit);

  if (error) return [];
  return data ?? [];
}

// ----------------------------------------------------------------
// Programs
// ----------------------------------------------------------------

export async function getActiveProgram(
  memberId: string,
): Promise<Program | null> {
  const db = createAdminClient();

  // First get the active program_id
  const { data: mp, error: mpError } = await db
    .from("member_programs")
    .select("program_id")
    .eq("member_id", memberId)
    .eq("is_active", true)
    .limit(1)
    .single();

  if (mpError || !mp) return null;

  // Then fetch the program
  const { data: program, error: progError } = await db
    .from("programs")
    .select("*")
    .eq("id", mp.program_id)
    .single();

  if (progError) return null;
  return program as Program;
}

// ----------------------------------------------------------------
// Events
// ----------------------------------------------------------------

export async function logEvent(params: {
  gymId: string;
  memberId?: string;
  type: string;
  payload?: Record<string, unknown>;
  occurredAt?: Date;
}): Promise<GymEvent | null> {
  const db = createAdminClient();
  const { data, error } = await db
    .from("events")
    .insert({
      gym_id: params.gymId,
      member_id: params.memberId ?? null,
      type: params.type,
      payload: params.payload ?? {},
      occurred_at: (params.occurredAt ?? new Date()).toISOString(),
    })
    .select("*")
    .single();

  if (error) return null;
  return data as GymEvent;
}

// ----------------------------------------------------------------
// Program Exercises
// ----------------------------------------------------------------

export async function getProgramExercises(
  programId: string,
  dayNumber?: number,
): Promise<ProgramExercise[]> {
  const db = createAdminClient();
  let query = db
    .from("program_exercises")
    .select("*")
    .eq("program_id", programId)
    .order("day_number")
    .order("order_index");
  if (dayNumber !== undefined) {
    query = query.eq("day_number", dayNumber);
  }
  const { data, error } = await query;
  if (error) return [];
  return data ?? [];
}

// ----------------------------------------------------------------
// Set Logs & Machine Usage
// ----------------------------------------------------------------

export async function getMostUsedMachines(
  memberId: string,
  gymId: string,
  limit = 3,
): Promise<Machine[]> {
  const db = createAdminClient();
  const { data: sessions } = await db
    .from("sessions")
    .select("id")
    .eq("member_id", memberId)
    .limit(500);
  if (!sessions?.length) return [];
  const sessionIds = sessions.map((s) => s.id);
  const { data: logs } = await db
    .from("set_logs")
    .select("machine_id")
    .in("session_id", sessionIds)
    .not("machine_id", "is", null);
  if (!logs?.length) return [];
  const counts: Record<string, number> = {};
  for (const log of logs) {
    if (log.machine_id) counts[log.machine_id] = (counts[log.machine_id] ?? 0) + 1;
  }
  const topIds = Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([id]) => id);
  if (!topIds.length) return [];
  const { data: machines, error } = await db
    .from("machines")
    .select("*")
    .eq("gym_id", gymId)
    .in("id", topIds)
    .eq("is_active", true);
  if (error) return [];
  return topIds.map((id) => machines?.find((m) => m.id === id)).filter(Boolean) as Machine[];
}

export async function getMachineSetLogs(
  memberId: string,
  machineId: string,
  limit = 5,
): Promise<SetLog[]> {
  const db = createAdminClient();
  const { data: sessions } = await db
    .from("sessions")
    .select("id")
    .eq("member_id", memberId)
    .limit(500);
  if (!sessions?.length) return [];
  const sessionIds = sessions.map((s) => s.id);
  const { data, error } = await db
    .from("set_logs")
    .select("*")
    .in("session_id", sessionIds)
    .eq("machine_id", machineId)
    .order("logged_at", { ascending: false })
    .limit(limit);
  if (error) return [];
  return data ?? [];
}

export async function getOrCreateTodaySession(
  memberId: string,
  gymId: string,
  programId?: string | null,
): Promise<Session | null> {
  const db = createAdminClient();
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const { data: existing } = await db
    .from("sessions")
    .select("*")
    .eq("member_id", memberId)
    .gte("started_at", todayStart.toISOString())
    .order("started_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (existing) return existing as Session;
  const { data, error } = await db
    .from("sessions")
    .insert({ member_id: memberId, gym_id: gymId, program_id: programId ?? null, started_at: new Date().toISOString() })
    .select("*")
    .single();
  if (error) return null;
  return data as Session;
}

export async function getMachinesByIds(ids: string[]): Promise<Machine[]> {
  if (!ids.length) return [];
  const db = createAdminClient();
  const { data, error } = await db
    .from("machines")
    .select("*")
    .in("id", ids);
  if (error) return [];
  return data ?? [];
}
