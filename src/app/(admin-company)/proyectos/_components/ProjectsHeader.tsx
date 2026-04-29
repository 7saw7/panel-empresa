import { Button } from "@/components/ui/Button";

type ProjectsHeaderProps = {
  onCreateProject: () => void;
};

export function ProjectsHeader({ onCreateProject }: ProjectsHeaderProps) {
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-neutral-950">Proyectos</h1>
        <p className="mt-1 text-sm leading-6 text-neutral-500">
          Gestiona ejecución, técnicos, prioridades, avances, checklist y seguimiento operativo.
        </p>
      </div>

      <Button type="button" onClick={onCreateProject}>
        Nuevo proyecto
      </Button>
    </header>
  );
}
