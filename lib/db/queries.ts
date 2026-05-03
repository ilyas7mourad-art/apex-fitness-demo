import { createAdminClient } from "@/lib/supabase";
import type { Gym, Machine, Member, Program, Session, GymEvent } from "@/lib/types";

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
