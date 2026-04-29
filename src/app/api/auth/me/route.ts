import { NextResponse } from "next/server";
import { getMockSession } from "@/features/auth/mock-session";

export async function GET() {
  const user = await getMockSession();

  if (!user) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  return NextResponse.json({ user });
}