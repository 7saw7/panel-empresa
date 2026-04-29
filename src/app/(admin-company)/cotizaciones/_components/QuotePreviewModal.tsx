import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { formatCurrency, formatDate } from "@/mocks";
import type { MockQuote } from "@/mocks";
import { QuoteStatusBadge } from "./QuoteStatusBadge";

type QuotePreviewModalProps = {
  open: boolean;
  quote: MockQuote | null;
  onClose: () => void;
};

export function QuotePreviewModal({ open, quote, onClose }: QuotePreviewModalProps) {
  return (
    <Modal
      open={open && Boolean(quote)}
      title="Vista previa de cotización"
      description="Documento mock para mostrar cómo se vería la propuesta enviada al cliente."
      onClose={onClose}
      footer={
        <div className="flex justify-end gap-2">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cerrar
          </Button>
          <Button type="button" onClick={onClose}>
            Descargar mock
          </Button>
        </div>
      }
    >
      {quote ? (
        <div className="rounded-3xl border border-neutral-200 bg-white p-6">
          <div className="flex flex-col gap-4 border-b border-neutral-200 pb-5 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">ElectroLima Pro</p>
              <h3 className="mt-2 text-2xl font-semibold text-neutral-950">{quote.code}</h3>
              <p className="mt-1 text-sm text-neutral-500">Cotización comercial</p>
            </div>
            <QuoteStatusBadge status={quote.status} />
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-neutral-50 p-4">
              <p className="text-xs uppercase tracking-wide text-neutral-500">Cliente</p>
              <p className="mt-1 font-medium text-neutral-950">{quote.clientName}</p>
              <p className="mt-1 text-sm text-neutral-600">Servicio: {quote.service}</p>
            </div>
            <div className="rounded-2xl bg-neutral-50 p-4">
              <p className="text-xs uppercase tracking-wide text-neutral-500">Fechas</p>
              <p className="mt-1 text-sm text-neutral-700">Emisión: {formatDate(quote.issueDate)}</p>
              <p className="mt-1 text-sm text-neutral-700">Vencimiento: {formatDate(quote.expirationDate)}</p>
            </div>
          </div>

          <div className="mt-6 overflow-hidden rounded-2xl border border-neutral-200">
            <table className="min-w-full text-sm">
              <thead className="bg-neutral-50 text-left text-neutral-600">
                <tr>
                  <th className="px-4 py-3 font-medium">Descripción</th>
                  <th className="px-4 py-3 font-medium">Cant.</th>
                  <th className="px-4 py-3 font-medium">P. unitario</th>
                  <th className="px-4 py-3 text-right font-medium">Total</th>
                </tr>
              </thead>
              <tbody>
                {quote.items.map((item) => (
                  <tr key={item.id} className="border-t border-neutral-200">
                    <td className="px-4 py-3 text-neutral-950">{item.description}</td>
                    <td className="px-4 py-3 text-neutral-700">{item.quantity}</td>
                    <td className="px-4 py-3 text-neutral-700">{formatCurrency(item.unitPrice)}</td>
                    <td className="px-4 py-3 text-right font-medium text-neutral-950">{formatCurrency(item.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-5 ml-auto max-w-xs space-y-2 text-sm">
            <div className="flex justify-between"><span>Subtotal</span><span>{formatCurrency(quote.subtotal)}</span></div>
            <div className="flex justify-between"><span>IGV</span><span>{formatCurrency(quote.tax)}</span></div>
            <div className="flex justify-between border-t border-neutral-200 pt-2 text-lg font-semibold text-neutral-950">
              <span>Total</span><span>{formatCurrency(quote.total)}</span>
            </div>
          </div>

          <div className="mt-6 rounded-2xl bg-neutral-50 p-4">
            <p className="text-sm font-medium text-neutral-950">Condiciones</p>
            {quote.terms && quote.terms.length > 0 ? (
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-neutral-700">
                {quote.terms.map((term) => <li key={term}>{term}</li>)}
              </ul>
            ) : (
              <p className="mt-2 text-sm text-neutral-600">Sin condiciones adicionales.</p>
            )}
          </div>
        </div>
      ) : null}
    </Modal>
  );
}
