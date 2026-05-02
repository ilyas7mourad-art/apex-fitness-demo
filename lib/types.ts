// ============================================================
// Apex Fitness Dubai — Database Types
// ============================================================

// ----------------------------------------------------------------
// gyms
// ----------------------------------------------------------------
export type Gym = {
  id: string;
  name: string;
  slug: string;
  city: string;
  country: string;
  timezone: string;
  logo_url: string | null;
  created_at: string;
  updated_at: string;
};

// ----------------------------------------------------------------
// machines
// ----------------------------------------------------------------
export type Machine = {
  id: string;
  gym_id: string;
  name: string;
  slug: string;
  category: string;
  muscle_groups: string[];
  instructions: string;
  common_mistakes: string;
  variations: string;
  image_url: string | null;
  qr_code: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

// ----------------------------------------------------------------
// members
// ----------------------------------------------------------------
export type FitnessLevel = "beginner" | "intermediate" | "advanced";

export type MemberStatus = "active" | "at_risk" | "churned" | "paused";

export type Member = {
  id: string;
  gym_id: string;
  full_name: string;
  email: string | null;
  avatar_seed: string;
  gender: "male" | "female" | "other" | "prefer_not_to_say" | null;
  fitness_level: FitnessLevel;
  goal: string;
  joined_at: string;
  notes: string | null;
  status: MemberStatus;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

// ----------------------------------------------------------------
// programs
// ----------------------------------------------------------------
export type Program = {
  id: string;
  gym_id: string;
  name: string;
  slug: string;
  description: string;
  target_level: FitnessLevel;
  duration_weeks: number;
  sessions_per_week: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

// ----------------------------------------------------------------
// program_exercises
// ----------------------------------------------------------------
export type ProgramExercise = {
  id: string;
  program_id: string;
  machine_id: string | null;
  name: string;
  day_number: number;
  order_index: number;
  sets: number;
  reps_min: number | null;
  reps_max: number | null;
  rest_seconds: number;
  notes: string | null;
  created_at: string;
};

// ----------------------------------------------------------------
// member_programs
// ----------------------------------------------------------------
export type MemberProgram = {
  id: string;
  member_id: string;
  program_id: string;
  started_at: string;
  ended_at: string | null;
  is_active: boolean;
  created_at: string;
};

// ----------------------------------------------------------------
// sessions
// ----------------------------------------------------------------
export type Session = {
  id: string;
  member_id: string;
  gym_id: string;
  program_id: string | null;
  started_at: string;
  ended_at: string | null;
  duration_seconds: number | null;
  notes: string | null;
  created_at: string;
};

// ----------------------------------------------------------------
// set_logs
// ----------------------------------------------------------------
export type SetLog = {
  id: string;
  session_id: string;
  machine_id: string | null;
  exercise_name: string;
  set_number: number;
  reps: number | null;
  weight_kg: number | null;
  duration_seconds: number | null;
  notes: string | null;
  logged_at: string;
};

// ----------------------------------------------------------------
// events
// ----------------------------------------------------------------
export type GymEvent = {
  id: string;
  gym_id: string;
  member_id: string | null;
  type: string;
  payload: Record<string, unknown>;
  occurred_at: string;
  created_at: string;
};

// ----------------------------------------------------------------
// Database generic type for Supabase client
// ----------------------------------------------------------------

type GymInsert = {
  id?: string;
  name: string;
  slug: string;
  city: string;
  country?: string;
  timezone?: string;
  logo_url?: string | null;
  created_at?: string;
  updated_at?: string;
};

type MachineInsert = {
  id?: string;
  gym_id: string;
  name: string;
  slug: string;
  category: string;
  muscle_groups?: string[];
  instructions?: string;
  common_mistakes?: string;
  variations?: string;
  image_url?: string | null;
  qr_code?: string | null;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
};

type MemberInsert = {
  id?: string;
  gym_id: string;
  full_name: string;
  email?: string | null;
  avatar_seed: string;
  gender?: "male" | "female" | "other" | "prefer_not_to_say" | null;
  fitness_level: FitnessLevel;
  goal: string;
  joined_at?: string;
  notes?: string | null;
  status?: MemberStatus;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
};

type ProgramInsert = {
  id?: string;
  gym_id: string;
  name: string;
  slug: string;
  description?: string;
  target_level: FitnessLevel;
  duration_weeks: number;
  sessions_per_week: number;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
};

type ProgramExerciseInsert = {
  id?: string;
  program_id: string;
  machine_id?: string | null;
  name: string;
  day_number: number;
  order_index?: number;
  sets?: number;
  reps_min?: number | null;
  reps_max?: number | null;
  rest_seconds?: number;
  notes?: string | null;
  created_at?: string;
};

type MemberProgramInsert = {
  id?: string;
  member_id: string;
  program_id: string;
  started_at?: string;
  ended_at?: string | null;
  is_active?: boolean;
  created_at?: string;
};

type SessionInsert = {
  id?: string;
  member_id: string;
  gym_id: string;
  program_id?: string | null;
  started_at: string;
  ended_at?: string | null;
  duration_seconds?: number | null;
  notes?: string | null;
  created_at?: string;
};

type SetLogInsert = {
  id?: string;
  session_id: string;
  machine_id?: string | null;
  exercise_name: string;
  set_number?: number;
  reps?: number | null;
  weight_kg?: number | null;
  duration_seconds?: number | null;
  notes?: string | null;
  logged_at?: string;
};

type EventInsert = {
  id?: string;
  gym_id: string;
  member_id?: string | null;
  type: string;
  payload?: Record<string, unknown>;
  occurred_at?: string;
  created_at?: string;
};

export interface Database {
  public: {
    Tables: {
      gyms: {
        Row: Gym;
        Insert: GymInsert;
        Update: Partial<GymInsert>;
        Relationships: [];
      };
      machines: {
        Row: Machine;
        Insert: MachineInsert;
        Update: Partial<MachineInsert>;
        Relationships: [];
      };
      members: {
        Row: Member;
        Insert: MemberInsert;
        Update: Partial<MemberInsert>;
        Relationships: [];
      };
      programs: {
        Row: Program;
        Insert: ProgramInsert;
        Update: Partial<ProgramInsert>;
        Relationships: [];
      };
      program_exercises: {
        Row: ProgramExercise;
        Insert: ProgramExerciseInsert;
        Update: Partial<ProgramExerciseInsert>;
        Relationships: [];
      };
      member_programs: {
        Row: MemberProgram;
        Insert: MemberProgramInsert;
        Update: Partial<MemberProgramInsert>;
        Relationships: [];
      };
      sessions: {
        Row: Session;
        Insert: SessionInsert;
        Update: Partial<SessionInsert>;
        Relationships: [];
      };
      set_logs: {
        Row: SetLog;
        Insert: SetLogInsert;
        Update: Partial<SetLogInsert>;
        Relationships: [];
      };
      events: {
        Row: GymEvent;
        Insert: EventInsert;
        Update: Partial<EventInsert>;
        Relationships: [];
      };
    };
    Views: Record<string, {
      Row: Record<string, unknown>;
      Relationships: [];
    }>;
    Functions: Record<string, {
      Args: Record<string, unknown>;
      Returns: unknown;
    }>;
    Enums: {
      fitness_level: FitnessLevel;
    };
  };
}

// ----------------------------------------------------------------
// Convenience joined types
// ----------------------------------------------------------------
export interface MemberWithProgram extends Member {
  active_program: Program | null;
}
