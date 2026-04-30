import { Button } from "@/components/ui/Button";
import { SectionCard } from "@/components/ui/SectionCard";
import { formatCurrency, formatDate, type MockFinanceMovement, type MockTimelineEvent } from "@/mocks";
import { FinanceOriginBadge, getFinanceOriginDescription } from "./FinanceOriginBadge";
import { FinanceStatusBadge } from "./FinanceStatusBadge";
import { FinanceTypeBadge } from "./FinanceTypeBadge";

type FinanceDetailDrawerProps = {
  movement: MockFinanceMovement | null;
  timeline: MockTimelineEvent[];
  open: boolean;
  onClose: () => void;
  onEdit: (movement: MockFinanceMovement) => void;
  onMarkAsPaid: (movement: MockFinanceMovement) => void;
  onPreview: (movement: MockFinanceMovement) => void;
  onCancel: (movement: MockFinanceMovement) => void;
};

export function FinanceDetailDrawer({ movement, timeline, open, onClose, onEdit, onMarkAsPaid, onPreview, onCancel }: FinanceDetailDrawerProps) {
  if (!open || !movement) return null;

  return (
    <div className="fixed inset-0 z-40 flex justify-end bg-black/20 p-4" role="dialog" aria-modal="true">
      <div className="flex h-full w-full max-w-2xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">
        <div className="border-b border-neutral-200 p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-neutral-500">Detalle financiero</p>
              <h2 className="mt-1 text-2xl font-semibold tracking-tight text-neutral-950">{movement.code}</h2>
              <p className="mt-1 text-sm text-neutral-500">{movement.concept}</p>
            </div>
            <Button type="button" variant="ghost" onClick={onClose}>Cerrar</Button>
          </div>
        </div>

        <div className="flex-1 space-y-5 overflow-y-auto p-6">
          <SectionCard title="Resumen">
            <div className="grid gap-4 sm:grid-cols-2">
              <div><p className="text-xs uppercase tracking-wide text-neutral-500">Tipo</p><div className="mt-2"><FinanceTypeBadge type={movement.type} /></div></div>
              <div><p className="text-xs uppercase tracking-wide text-neutral-500">Estado</p><div className="mt-2"><FinanceStatusBadge status={movement.status} /></div></div>
              <div><p className="text-xs uppercase tracking-wide text-neutral-500">Origen</p><div className="mt-2"><FinanceOriginBadge movement={movement} /></div></div>
              <div><p className="text-xs uppercase tracking-wide text-neutral-500">Monto</p><p className="mt-2 text-lg font-semibold text-neutral-950">{formatCurrency(movement.amount)}</p></div>
              <div className="sm:col-span-2">
                <p className="text-xs uppercase tracking-wide text-neutral-500">Lectura operativa</p>
                <p className="mt-2 text-sm leading-6 text-neutral-700">{getFinanceOriginDescription(movement)}</p>
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Relaciones">
            <div className="grid gap-4 sm:grid-cols-2">
              <div><p className="text-xs uppercase tracking-wide text-neutral-500">Cliente / proveedor</p><p className="mt-2 text-sm text-neutral-700">{movement.clientName ?? movement.providerName ?? "Sin asociado"}</p></div>
              <div><p className="text-xs uppercase tracking-wide text-neutral-500">Proyecto</p><p className="mt-2 text-sm text-neutral-700">{movement.projectName ?? "No asociado"}</p></div>
              <div><p className="text-xs uppercase tracking-wide text-neutral-500">Cotización</p><p className="mt-2 text-sm text-neutral-700">{movement.quoteId ? `#${movement.quoteId}` : "No asociada"}</p></div>
              <div><p className="text-xs uppercase tracking-wide text-neutral-500">Método</p><p className="mt-2 text-sm text-neutral-700">{movement.paymentMethod}</p></div>
            </div>
          </SectionCard>

          <SectionCard title="Fechas">
            <div className="grid gap-4 sm:grid-cols-2">
              <div><p className="text-xs uppercase tracking-wide text-neutral-500">Creación</p><p className="mt-2 text-sm text-neutral-700">{formatDate(movement.createdAt)}</p></div>
              <div><p className="text-xs uppercase tracking-wide text-neutral-500">Vencimiento</p><p className="mt-2 text-sm text-neutral-700">{formatDate(movement.dueDate)}</p></div>
              <div><p className="text-xs uppercase tracking-wide text-neutral-500">Pago</p><p className="mt-2 text-sm text-neutral-700">{movement.paidAt ? formatDate(movement.paidAt) : "Pendiente"}</p></div>
            </div>
          </SectionCard>

          {movement.notes ? (
            <SectionCard title="Notas internas">
              <p className="text-sm leading-6 text-neutral-700">{movement.notes}</p>
            </SectionCard>
          ) : null}

          <SectionCard title="Historial financiero">
            {timeline.length > 0 ? (
              <div className="space-y-3">
                {timeline.map((event) => (
                  <div key={event.id} className="rounded-2xl border border-neutral-200 p-4">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="font-medium text-neutral-950">{event.title}</p>
                        {event.description ? <p className="mt-1 text-sm text-neutral-500">{event.description}</p> : null}
                      </div>
                      <p className="text-xs text-neutral-500">{event.createdAt}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-neutral-500">Aún no hay historial específico para este movimiento.</p>
            )}
          </SectionCard>
        </div>

        <div className="flex flex-wrap justify-end gap-2 border-t border-neutral-200 p-4">
          <Button type="button" variant="secondary" onClick={() => onEdit(movement)}>Editar</Button>
          <Button type="button" variant="ghost" onClick={() => onPreview(movement)}>Comprobante</Button>
          <Button type="button" variant="ghost" disabled={movement.status === "paid"} onClick={() => onMarkAsPaid(movement)}>Marcar pagado</Button>
          <Button type="button" variant="danger" disabled={movement.status === "cancelled"} onClick={() => onCancel(movement)}>Cancelar</Button>
        </div>
      </div>
    </div>
  );
}
