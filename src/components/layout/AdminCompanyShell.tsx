import { ADMIN_COMPANY_NAV } from "@/config/nav/admin-company-nav";
import Link from "next/link";

type AdminCompanyShellProps = {
  children: React.ReactNode;
  user: {
    name: string;
    email: string;
    role: string;
  };
};

export function AdminCompanyShell({ children, user }: AdminCompanyShellProps) {
  return (
    <div className="min-h-screen bg-neutral-50">
      <aside className="fixed left-0 top-0 hidden h-screen w-72 border-r border-neutral-200 bg-white px-4 py-5 lg:block">
        <div className="mb-8 px-3">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-neutral-400">
            ElectroLima
          </p>
          <h1 className="mt-2 text-lg font-semibold text-neutral-950">
            Panel empresa
          </h1>
        </div>

        <nav className="space-y-1">
          {ADMIN_COMPANY_NAV.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium text-neutral-600 transition hover:bg-neutral-100 hover:text-neutral-950"
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      <div className="lg:pl-72">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-neutral-200 bg-white/90 px-6 backdrop-blur">
          <div>
            <p className="text-sm font-medium text-neutral-950">
              Seguridad Electrónica Integral SAC
            </p>
            <p className="text-xs text-neutral-500">
              Dashboard interno de operaciones
            </p>
          </div>

          <div className="text-right">
            <p className="text-sm font-medium text-neutral-950">{user.name}</p>
            <p className="text-xs text-neutral-500">{user.email}</p>
          </div>
        </header>

        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}