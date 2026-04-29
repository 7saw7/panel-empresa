import { StatCard } from "@/components/ui/StatCard";

type SettingsHeaderProps = {
  counters: {
    activeUsers: number;
    invitedUsers: number;
    inactiveUsers: number;
    roles: number;
  };
  savedMessage: string | null;
};

export function SettingsHeader({ counters, savedMessage }: SettingsHeaderProps) {
  return (
    <div className="space-y-5">
      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-medium text-neutral-500">Administración interna</p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight text-neutral-950">
            Configuración
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-500">
            Gestiona usuarios, roles, permisos, plantillas y preferencias generales del panel demo.
          </p>
        </div>

        {savedMessage ? (
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700">
            {savedMessage}
          </div>
        ) : null}
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <StatCard label="Usuarios activos" value={String(counters.activeUsers)} helper="Con acceso habilitado" />
        <StatCard label="Invitados" value={String(counters.invitedUsers)} helper="Pendientes de ingreso" />
        <StatCard label="Inactivos" value={String(counters.inactiveUsers)} helper="Acceso deshabilitado" />
        <StatCard label="Roles" value={String(counters.roles)} helper="Perfiles configurados" />
      </div>
    </div>
  );
}
