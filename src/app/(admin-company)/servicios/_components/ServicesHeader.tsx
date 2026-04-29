import { Button } from "@/components/ui/Button";

type ServicesHeaderProps = {
  onCreateService: () => void;
};

export function ServicesHeader({ onCreateService }: ServicesHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm font-medium text-neutral-500">Catálogo comercial</p>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight text-neutral-950">Servicios</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-600">
          Administra servicios mock para cotizaciones, proyectos y estimaciones comerciales.
        </p>
      </div>

      <Button type="button" onClick={onCreateService}>Nuevo servicio</Button>
    </div>
  );
}
