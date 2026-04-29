import { Button } from "@/components/ui/Button";
import type { MockRole } from "@/mocks";

type RoleDetailDrawerProps = {
  role: MockRole | null;
  onClose: () => void;
};

const permissionLabels: Record<string, string> = {
  "dashboard.view": "Ver dashboard",
  "clients.view": "Ver clientes",
  "clients.manage": "Gestionar clientes",
  "quotes.view": "Ver cotizaciones",
  "quotes.manage": "Gestionar cotizaciones",
  "projects.view": "Ver proyectos",
  "projects.manage": "Gestionar proyectos",
  "technicians.manage": "Gestionar técnicos",
  "services.manage": "Gestionar servicios",
  "inventory.manage": "Gestionar inventario",
  "finances.manage": "Gestionar finanzas",
  "evidences.manage": "Gestionar evidencias",
  "company.manage": "Gestionar empresa",
  "settings.manage": "Gestionar configuración",
};

export function RoleDetailDrawer({ role, onClose }: RoleDetailDrawerProps) {
  if (!role) return null;

  return (
    <div className="fixed inset-0 z-40 flex justify-end bg-neutral-950/30" onClick={onClose}>
      <aside
        className="h-full w-full max-w-xl overflow-y-auto bg-white p-6 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-neutral-500">Rol</p>
            <h2 className="mt-1 text-2xl font-semibold text-neutral-950">{role.name}</h2>
            <p className="mt-2 text-sm leading-6 text-neutral-500">{role.description}</p>
          </div>
          <Button variant="ghost" onClick={onClose}>Cerrar</Button>
        </div>

        <div className="mt-6 space-y-3">
          {role.permissions.map((permission) => (
            <div key={permission} className="rounded-2xl border border-neutral-200 bg-neutral-50 p-4">
              <p className="font-medium text-neutral-900">{permissionLabels[permission] ?? permission}</p>
              <p className="mt-1 text-xs text-neutral-500">{permission}</p>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
}
