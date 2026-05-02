import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const db = createAdminClient();

    const [gymsResult, machinesResult, membersResult] = await Promise.all([
      db.from("gyms").select("id", { count: "exact", head: true }),
      db.from("machines").select("id", { count: "exact", head: true }),
      db.from("members").select("id", { count: "exact", head: true }),
    ]);

    return NextResponse.json({
      status: "ok",
      gyms: gymsResult.count ?? 0,
      machines: machinesResult.count ?? 0,
      members: membersResult.count ?? 0,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { status: "error", message, timestamp: new Date().toISOString() },
      { status: 500 },
    );
  }
}
