import { Button } from "@/components/ui/Button";

type InventoryHeaderProps = {
  onCreateItem: () => void;
  onExport: () => void;
};

export function InventoryHeader({ onCreateItem, onExport }: InventoryHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm font-medium text-neutral-500">Operación</p>
        <h1 className="text-3xl font-semibold tracking-tight text-neutral-950">Inventario</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-500">
          Controla materiales, stock mínimo, proveedores y movimientos simulados para proyectos y servicios.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button type="button" variant="secondary" onClick={onExport}>Exportar mock</Button>
        <Button type="button" onClick={onCreateItem}>Nuevo producto</Button>
      </div>
    </div>
  );
}
