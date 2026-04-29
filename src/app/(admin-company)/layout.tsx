import { redirect } from "next/navigation";
import { getMockSession } from "@/features/auth/mock-session";
import { AdminCompanyShell } from "@/components/layout/AdminCompanyShell";

export default async function AdminCompanyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getMockSession();

  if (!user) {
    redirect("/login");
  }

  return <AdminCompanyShell user={user}>{children}</AdminCompanyShell>;
}