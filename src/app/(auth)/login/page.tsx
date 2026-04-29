import { redirect } from "next/navigation";
import { getMockSession } from "@/features/auth/mock-session";
import { LoginView } from "./_components/LoginView";

export default async function LoginPage() {
  const session = await getMockSession();

  if (session) {
    redirect("/dashboard");
  }

  return <LoginView />;
}