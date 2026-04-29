import { NextResponse } from "next/server";
import { MOCK_SESSION_COOKIE } from "@/features/auth/mock-session";

export async function POST() {
  const response = NextResponse.json({ ok: true });

  response.cookies.set(MOCK_SESSION_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

  return response;
}