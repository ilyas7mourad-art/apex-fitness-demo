"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { selectDemoMember } from "@/app/actions/member";
import type { Member } from "@/lib/types";

interface MemberCardProps {
  member: Member;
}

function getAvatarUrl(seed: string): string {
  return `https://api.dicebear.com/8.x/avataaars/svg?seed=${encodeURIComponent(seed)}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`;
}

function getFitnessLevelLabel(level: Member["fitness_level"]): string {
  switch (level) {
    case "beginner":
      return "Beginner";
    case "intermediate":
      return "Intermediate";
    case "advanced":
      return "Advanced";
  }
}

export function MemberCard({ member }: MemberCardProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  async function handleSelect() {
    if (isLoading) return;
    setIsLoading(true);
    try {
      await selectDemoMember(member.id);
      router.push("/m/dashboard");
    } catch {
      setIsLoading(false);
    }
  }

  return (
    <button
      onClick={handleSelect}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      disabled={isLoading}
      className="group relative flex w-full flex-col items-center gap-3 rounded-xl border border-border bg-card p-4 text-left transition-all duration-200 hover:border-[var(--brand)] hover:shadow-md disabled:cursor-wait disabled:opacity-70"
      style={
        isHovered
          ? { backgroundColor: "color-mix(in oklch, var(--brand) 5%, var(--card))" }
          : undefined
      }
      aria-label={`Continue as ${member.full_name}`}
    >
      {/* Avatar */}
      <div className="relative">
        <div
          className="h-16 w-16 overflow-hidden rounded-full border-2 transition-colors duration-200"
          style={
            isHovered
              ? { borderColor: "var(--brand)" }
              : { borderColor: "var(--border)" }
          }
        >
          {isLoading ? (
            <div
              className="flex h-full w-full items-center justify-center"
              style={{
                backgroundColor: "color-mix(in oklch, var(--brand) 10%, transparent)",
              }}
            >
              <svg
                className="h-6 w-6 animate-spin"
                style={{ color: "var(--brand)" }}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
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
            </div>
          ) : (
            <img
              src={getAvatarUrl(member.avatar_seed)}
              alt={member.full_name}
              width={64}
              height={64}
              className="h-full w-full object-cover"
            />
          )}
        </div>
      </div>

      {/* Name */}
      <div className="w-full text-center">
        <p className="text-sm font-semibold leading-tight text-foreground">
          {member.full_name}
        </p>
      </div>

      {/* Goal badge */}
      <div
        className="rounded-full px-2.5 py-0.5 text-xs font-medium"
        style={{
          color: "var(--brand)",
          backgroundColor: "color-mix(in oklch, var(--brand) 10%, transparent)",
        }}
      >
        {member.goal}
      </div>

      {/* Fitness level chip */}
      <div className="rounded-md border border-border bg-muted px-2 py-0.5 text-xs text-muted-foreground">
        {getFitnessLevelLabel(member.fitness_level)}
      </div>

      {/* Hover CTA */}
      <div
        className="mt-1 text-xs font-medium transition-opacity duration-200"
        style={{
          color: "var(--brand)",
          opacity: isHovered && !isLoading ? 1 : 0,
        }}
        aria-hidden="true"
      >
        Continue as {member.full_name.split(" ")[0]} →
      </div>
    </button>
  );
}
