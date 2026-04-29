import { Button } from "@/components/ui/Button";

type FinancesHeaderProps = {
  onCreateIncome: () => void;
  onCreateExpense: () => void;
  onExport: () => void;
};

export function FinancesHeader({ onCreateIncome, onCreateExpense, onExport }: FinancesHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm font-medium text-neutral-500">Administración</p>
        <h1 className="text-3xl font-semibold tracking-tight text-neutral-950">Finanzas</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-500">
          Simula ingresos, egresos, pagos pendientes, comprobantes y relación con proyectos o cotizaciones.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button type="button" variant="secondary" onClick={onExport}>Exportar mock</Button>
        <Button type="button" variant="secondary" onClick={onCreateExpense}>Nuevo egreso</Button>
        <Button type="button" onClick={onCreateIncome}>Nuevo ingreso</Button>
      </div>
    </div>
  );
}
