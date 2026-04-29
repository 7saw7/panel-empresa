import { Button } from "@/components/ui/Button";
import { DataTable, type DataTableColumn } from "@/components/ui/DataTable";
import { SectionCard } from "@/components/ui/SectionCard";
import { StatusBadge } from "@/components/ui/StatusBadge";
import type { MockRole, MockUser } from "@/mocks";

type UsersSettingsPanelProps = {
  users: MockUser[];
  roles: MockRole[];
  onCreate: () => void;
  onEdit: (user: MockUser) => void;
  onToggleStatus: (user: MockUser) => void;
};

const statusLabels: Record<MockUser["status"], { label: string; tone: "success" | "warning" | "default" }> = {
  active: { label: "Activo", tone: "success" },
  invited: { label: "Invitado", tone: "warning" },
  inactive: { label: "Inactivo", tone: "default" },
};

export function UsersSettingsPanel({ users, roles, onCreate, onEdit, onToggleStatus }: UsersSettingsPanelProps) {
  const columns: DataTableColumn<MockUser>[] = [
    {
      key: "user",
      header: "Usuario",
      render: (user) => (
        <div>
          <p className="font-medium text-neutral-950">{user.name}</p>
          <p className="text-xs text-neutral-500">{user.email}</p>
        </div>
      ),
    },
    {
      key: "role",
      header: "Rol",
      render: (user) => <span className="text-neutral-700">{user.role}</span>,
    },
    {
      key: "status",
      header: "Estado",
      render: (user) => {
        const status = statusLabels[user.status];
        return <StatusBadge label={status.label} tone={status.tone} />;
      },
    },
    {
      key: "lastLogin",
      header: "Último ingreso",
      render: (user) => <span className="text-neutral-600">{user.lastLogin ?? "Aún no ingresa"}</span>,
    },
    {
      key: "actions",
      header: "Acciones",
      render: (user) => (
        <div className="flex flex-wrap gap-2">
          <Button size="sm" variant="secondary" onClick={() => onEdit(user)}>
            Editar
          </Button>
          <Button size="sm" variant="ghost" onClick={() => onToggleStatus(user)}>
            {user.status === "active" ? "Desactivar" : "Activar"}
          </Button>
        </div>
      ),
    },
  ];

  return (
    <SectionCard
      title="Usuarios"
      description="Administra accesos mock para ventas, operaciones y administración."
    >
      <div className="mb-5 flex flex-col justify-between gap-3 md:flex-row md:items-center">
        <p className="text-sm text-neutral-500">
          {users.length} usuarios registrados · {roles.length} roles disponibles
        </p>
        <Button onClick={onCreate}>Nuevo usuario</Button>
      </div>

      <DataTable
        data={users}
        columns={columns}
        getRowKey={(user) => String(user.id)}
        emptyTitle="Sin usuarios"
        emptyDescription="Crea usuarios mock para mostrar cómo funcionaría la gestión de accesos."
      />
    </SectionCard>
  );
}
