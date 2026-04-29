import { Button } from "@/components/ui/Button";
import { SectionCard } from "@/components/ui/SectionCard";
import type { MockRole } from "@/mocks";

type RolesSettingsPanelProps = {
  roles: MockRole[];
  onViewRole: (role: MockRole) => void;
};

export function RolesSettingsPanel({ roles, onViewRole }: RolesSettingsPanelProps) {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {roles.map((role) => (
        <SectionCard key={role.id} className="flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-semibold text-neutral-950">{role.name}</h2>
            <p className="mt-2 text-sm leading-6 text-neutral-500">{role.description}</p>
            <p className="mt-4 text-sm font-medium text-neutral-700">
              {role.permissions.length} permisos asignados
            </p>
          </div>
          <div className="mt-5">
            <Button variant="secondary" onClick={() => onViewRole(role)}>
              Ver permisos
            </Button>
          </div>
        </SectionCard>
      ))}
    </div>
  );
}
