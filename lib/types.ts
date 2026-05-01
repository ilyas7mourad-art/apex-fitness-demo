// Expanded in PR 2 with seed data and full schema

export interface GymMember {
  id: string;
  name: string;
  email: string;
  joinDate: string;
  activeProgram: string | null;
  attendanceStreak: number;
}

export interface WorkoutProgram {
  id: string;
  name: string;
  durationWeeks: number;
  sessionsPerWeek: number;
  targetLevel: "beginner" | "intermediate" | "advanced";
}

export interface GymEquipment {
  id: string;
  name: string;
  category: string;
  qrCode: string;
  instructionUrl: string;
}

export interface RetentionMetric {
  month: string;
  activeMembers: number;
  churnRate: number;
  newSignups: number;
}
