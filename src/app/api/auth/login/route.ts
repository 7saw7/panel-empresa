import { NextResponse } from "next/server";
import { MOCK_SESSION_COOKIE } from "@/features/auth/mock-session";

export async function POST(request: Request) {
  const body = await request.json();

  const email = String(body.email ?? "").trim().toLowerCase();
  const password = String(body.password ?? "");

  if (email !== "admin@demo.com" || password !== "demo123") {
    return NextResponse.json(
      { message: "Credenciales inválidas" },
      { status: 401 },
    );
  }

  const response = NextResponse.json({
    user: {
      id: "demo-admin-001",
      name: "Administrador Demo",
      email: "admin@demo.com",
      role: "admin",
    },
  });

  response.cookies.set(MOCK_SESSION_COOKIE, "active", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8,
  });

  return response;
}