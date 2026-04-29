import { Button } from "@/components/ui/Button";

type DashboardHeaderProps = {
  onExportReport?: () => void;
};

export function DashboardHeader({ onExportReport }: DashboardHeaderProps) {
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <p className="text-sm font-medium text-neutral-500">Panel administrativo</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-neutral-950">
          Dashboard
        </h1>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-neutral-500">
          Resumen general de clientes, cotizaciones, proyectos, inventario, finanzas y evidencias del negocio.
        </p>
      </div>

      <Button type="button" variant="secondary" onClick={onExportReport}>
        Exportar reporte mock
      </Button>
    </header>
  );
}
