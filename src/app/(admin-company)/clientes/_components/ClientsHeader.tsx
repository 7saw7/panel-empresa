import { Button } from "@/components/ui/Button";

type ClientsHeaderProps = {
  onCreateClient: () => void;
};

export function ClientsHeader({ onCreateClient }: ClientsHeaderProps) {
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-neutral-950">
          Clientes
        </h1>
        <p className="mt-1 text-sm leading-6 text-neutral-500">
          Administra contactos, estados comerciales, notas y relaciones con cotizaciones o proyectos.
        </p>
      </div>

      <Button type="button" onClick={onCreateClient}>
        Nuevo cliente
      </Button>
    </header>
  );
}
