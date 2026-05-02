"use server";

import { cookies } from "next/headers";

/**
 * Sets the demo member cookie so the session persists across page navigations.
 * httpOnly is false so the client can also read it if needed for UI purposes.
 */
export async function selectDemoMember(memberId: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set("apex_demo_member_id", memberId, {
    maxAge: 60 * 60 * 24 * 30, // 30 days in seconds
    httpOnly: false,
    sameSite: "lax",
    path: "/",
  });
}
