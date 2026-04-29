import { Button } from "@/components/ui/Button";

type TechniciansHeaderProps = {
  onCreateTechnician: () => void;
};

export function TechniciansHeader({ onCreateTechnician }: TechniciansHeaderProps) {
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-neutral-950">Técnicos</h1>
        <p className="mt-1 text-sm leading-6 text-neutral-500">
          Gestiona disponibilidad, especialidades, agenda, zonas de cobertura y asignación operativa del equipo.
        </p>
      </div>

      <Button type="button" onClick={onCreateTechnician}>
        Nuevo técnico
      </Button>
    </header>
  );
}
