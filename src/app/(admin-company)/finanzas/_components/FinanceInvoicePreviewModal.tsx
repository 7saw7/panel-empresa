import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { formatCurrency, formatDate, type MockFinanceMovement } from "@/mocks";
import { FinanceStatusBadge } from "./FinanceStatusBadge";
import { FinanceTypeBadge } from "./FinanceTypeBadge";

type FinanceInvoicePreviewModalProps = {
  open: boolean;
  movement: MockFinanceMovement | null;
  onClose: () => void;
  onDownload: () => void;
};

export function FinanceInvoicePreviewModal({ open, movement, onClose, onDownload }: FinanceInvoicePreviewModalProps) {
  if (!movement) return null;

  return (
    <Modal
      open={open}
      title="Comprobante mock"
      description="Vista previa simulada para presentación comercial."
      onClose={onClose}
      footer={
        <div className="flex justify-end gap-2">
          <Button type="button" variant="secondary" onClick={onClose}>Cerrar</Button>
          <Button type="button" onClick={onDownload}>Descargar mock</Button>
        </div>
      }
    >
      <div className="rounded-3xl border border-neutral-200 bg-neutral-50 p-6">
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between gap-4 border-b border-neutral-200 pb-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">Comprobante</p>
              <h3 className="mt-2 text-2xl font-semibold text-neutral-950">{movement.code}</h3>
            </div>
            <div className="text-right">
              <p className="text-sm text-neutral-500">Fecha</p>
              <p className="font-medium text-neutral-950">{formatDate(movement.createdAt)}</p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-xs uppercase tracking-wide text-neutral-500">Tipo</p>
              <div className="mt-2"><FinanceTypeBadge type={movement.type} /></div>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-neutral-500">Estado</p>
              <div className="mt-2"><FinanceStatusBadge status={movement.status} /></div>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-neutral-500">Cliente / proveedor</p>
              <p className="mt-2 text-sm text-neutral-700">{movement.clientName ?? movement.providerName ?? "Sin asociado"}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-neutral-500">Método</p>
              <p className="mt-2 text-sm text-neutral-700">{movement.paymentMethod}</p>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-neutral-200 p-4">
            <p className="text-sm font-medium text-neutral-950">{movement.concept}</p>
            {movement.projectName ? <p className="mt-1 text-xs text-neutral-500">Proyecto: {movement.projectName}</p> : null}
            <div className="mt-4 flex items-center justify-between border-t border-neutral-200 pt-4">
              <p className="text-sm text-neutral-500">Total</p>
              <p className="text-2xl font-semibold text-neutral-950">{formatCurrency(movement.amount)}</p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
