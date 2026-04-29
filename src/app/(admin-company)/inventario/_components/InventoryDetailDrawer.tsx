import { Button } from "@/components/ui/Button";
import { SectionCard } from "@/components/ui/SectionCard";
import { formatCurrency, formatNumber, type MockInventoryItem, type MockInventoryMovement } from "@/mocks";
import { InventoryStatusBadge } from "./InventoryStatusBadge";

type InventoryDetailDrawerProps = {
  item: MockInventoryItem | null;
  movements: MockInventoryMovement[];
  open: boolean;
  onClose: () => void;
  onEdit: (item: MockInventoryItem) => void;
  onEntry: (item: MockInventoryItem) => void;
  onExit: (item: MockInventoryItem) => void;
  onAdjust: (item: MockInventoryItem) => void;
};

function getMovementLabel(type: MockInventoryMovement["type"]) {
  if (type === "entry") return "Entrada";
  if (type === "exit") return "Salida";
  return "Ajuste";
}

export function InventoryDetailDrawer({ item, movements, open, onClose, onEdit, onEntry, onExit, onAdjust }: InventoryDetailDrawerProps) {
  if (!open || !item) return null;

  return (
    <div className="fixed inset-0 z-40 flex justify-end bg-black/20 p-4" role="dialog" aria-modal="true">
      <div className="flex h-full w-full max-w-2xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">
        <div className="border-b border-neutral-200 p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-neutral-500">Detalle de inventario</p>
              <h2 className="mt-1 text-2xl font-semibold tracking-tight text-neutral-950">{item.name}</h2>
              <p className="mt-1 text-sm text-neutral-500">{item.category} · {item.supplier}</p>
            </div>
            <Button type="button" variant="ghost" onClick={onClose}>Cerrar</Button>
          </div>
        </div>

        <div className="flex-1 space-y-5 overflow-y-auto p-6">
          <SectionCard title="Resumen">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-xs uppercase tracking-wide text-neutral-500">Estado</p>
                <div className="mt-2"><InventoryStatusBadge status={item.status} /></div>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-neutral-500">Stock actual</p>
                <p className="mt-2 text-lg font-semibold text-neutral-950">{formatNumber(item.stock)} {item.unit}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-neutral-500">Stock mínimo</p>
                <p className="mt-2 text-sm text-neutral-700">{formatNumber(item.minStock)} {item.unit}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-neutral-500">Valor total</p>
                <p className="mt-2 text-sm text-neutral-700">{formatCurrency(item.totalValue)}</p>
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Costos y proveedor">
            <div className="grid gap-4 sm:grid-cols-3">
              <div><p className="text-xs uppercase tracking-wide text-neutral-500">Proveedor</p><p className="mt-2 text-sm text-neutral-700">{item.supplier}</p></div>
              <div><p className="text-xs uppercase tracking-wide text-neutral-500">Costo unitario</p><p className="mt-2 text-sm text-neutral-700">{formatCurrency(item.unitCost)}</p></div>
              <div><p className="text-xs uppercase tracking-wide text-neutral-500">Último movimiento</p><p className="mt-2 text-sm text-neutral-700">{item.lastMovementAt}</p></div>
            </div>
          </SectionCard>

          <SectionCard title="Historial de movimientos">
            {movements.length > 0 ? (
              <div className="space-y-3">
                {movements.map((movement) => (
                  <div key={movement.id} className="rounded-2xl border border-neutral-200 p-4">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="font-medium text-neutral-950">{getMovementLabel(movement.type)} · {formatNumber(movement.quantity)}</p>
                        <p className="mt-1 text-sm text-neutral-500">{movement.reason}</p>
                      </div>
                      <p className="text-xs text-neutral-500">{movement.createdAt}</p>
                    </div>
                    <p className="mt-2 text-xs text-neutral-500">
                      Stock: {formatNumber(movement.previousStock)} → {formatNumber(movement.newStock)} · Responsable: {movement.responsible}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-neutral-500">Aún no hay movimientos para este producto.</p>
            )}
          </SectionCard>
        </div>

        <div className="flex flex-wrap justify-end gap-2 border-t border-neutral-200 p-4">
          <Button type="button" variant="secondary" onClick={() => onEdit(item)}>Editar</Button>
          <Button type="button" variant="ghost" onClick={() => onEntry(item)}>Entrada</Button>
          <Button type="button" variant="ghost" onClick={() => onExit(item)}>Salida</Button>
          <Button type="button" variant="ghost" onClick={() => onAdjust(item)}>Ajuste</Button>
        </div>
      </div>
    </div>
  );
}
