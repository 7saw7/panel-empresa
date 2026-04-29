import { cookies } from "next/headers";

export const MOCK_SESSION_COOKIE = "panel_demo_session";

export type MockUser = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "vendedor" | "tecnico";
};

export const demoUser: MockUser = {
  id: "demo-admin-001",
  name: "Administrador Demo",
  email: "admin@demo.com",
  role: "admin",
};

export async function getMockSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get(MOCK_SESSION_COOKIE);

  if (!session?.value) return null;

  return demoUser;
}