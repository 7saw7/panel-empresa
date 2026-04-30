import { Button } from "@/components/ui/Button";
import { SectionCard } from "@/components/ui/SectionCard";
import { formatCurrency, formatDate } from "@/mocks";
import type { MockQuote, MockTimelineEvent } from "@/mocks";
import { QuoteStatusBadge } from "./QuoteStatusBadge";

type QuoteDetailDrawerProps = {
  quote: MockQuote | null;
  open: boolean;
  timeline: MockTimelineEvent[];
  onClose: () => void;
  onEdit: (quote: MockQuote) => void;
  onPreview: (quote: MockQuote) => void;
  onSend: (quote: MockQuote) => void;
  onApprove: (quote: MockQuote) => void;
  onConvertToProject: (quote: MockQuote) => void;
};

export function QuoteDetailDrawer({
  quote,
  open,
  timeline,
  onClose,
  onEdit,
  onPreview,
  onSend,
  onApprove,
  onConvertToProject,
}: QuoteDetailDrawerProps) {
  if (!open || !quote) return null;

  return (
    <div
      className="fixed inset-0 z-40 bg-black/40"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <aside className="ml-auto flex h-full w-full max-w-2xl flex-col overflow-hidden bg-white shadow-2xl">
        <div className="flex items-start justify-between gap-4 border-b border-neutral-200 px-6 py-5">
          <div>
            <p className="text-xs uppercase tracking-wide text-neutral-500">Detalle de cotización</p>
            <h2 className="mt-1 text-xl font-semibold tracking-tight text-neutral-950">{quote.code}</h2>
            <p className="mt-1 text-sm text-neutral-500">{quote.clientName}</p>
          </div>
          <Button type="button" variant="ghost" onClick={onClose}>
            Cerrar
          </Button>
        </div>

        <div className="flex-1 space-y-5 overflow-y-auto p-6">
          <SectionCard title="Resumen comercial">
            <p className="mb-4 text-sm text-neutral-500">
              Flujo comercial controlado: borrador → enviada → aprobada → proyecto.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <Info label="Servicio" value={quote.service} />
              <div className="space-y-1">
                <p className="text-xs uppercase tracking-wide text-neutral-500">Estado</p>
                <QuoteStatusBadge status={quote.status} />
              </div>
              <Info label="Emisión" value={formatDate(quote.issueDate)} />
              <Info label="Vencimiento" value={formatDate(quote.expirationDate)} />
              <Info label="Responsable" value={quote.responsible} />
              <Info label="Cliente" value={quote.clientName} />
            </div>
          </SectionCard>

          <SectionCard title="Items cotizados">
            <div className="space-y-3">
              {quote.items.map((item) => (
                <div key={item.id} className="rounded-2xl border border-neutral-200 p-4">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="font-medium text-neutral-950">{item.description}</p>
                      <p className="text-sm text-neutral-500">
                        {item.quantity} × {formatCurrency(item.unitPrice)}
                      </p>
                    </div>
                    <p className="font-semibold text-neutral-950">{formatCurrency(item.total)}</p>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard title="Resumen económico">
            <div className="space-y-3 text-sm">
              <MoneyRow label="Subtotal" value={quote.subtotal} />
              <MoneyRow label="IGV 18%" value={quote.tax} />
              <div className="border-t border-neutral-200 pt-3">
                <MoneyRow label="Total" value={quote.total} strong />
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Condiciones y notas">
            {quote.notes ? <p className="text-sm leading-6 text-neutral-700">{quote.notes}</p> : null}
            {quote.terms && quote.terms.length > 0 ? (
              <ul className="mt-3 space-y-2 text-sm text-neutral-700">
                {quote.terms.map((term) => (
                  <li key={term} className="rounded-2xl bg-neutral-50 px-3 py-2">{term}</li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-neutral-500">Sin condiciones registradas.</p>
            )}
          </SectionCard>

          <SectionCard title="Historial">
            {timeline.length > 0 ? (
              <div className="space-y-3">
                {timeline.map((event) => (
                  <div key={event.id} className="rounded-2xl border border-neutral-200 p-4">
                    <p className="font-medium text-neutral-950">{event.title}</p>
                    {event.description ? <p className="mt-1 text-sm text-neutral-600">{event.description}</p> : null}
                    <p className="mt-2 text-xs text-neutral-500">{event.createdAt} · {event.createdBy ?? "Sistema"}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-neutral-500">Sin historial para esta cotización.</p>
            )}
          </SectionCard>
        </div>

        <div className="flex flex-wrap justify-end gap-2 border-t border-neutral-200 px-6 py-4">
          <Button type="button" variant="secondary" onClick={() => onPreview(quote)}>Vista previa</Button>
          <Button type="button" variant="ghost" onClick={() => onEdit(quote)}>Editar</Button>
          <Button type="button" variant="ghost" onClick={() => onSend(quote)}>Enviar</Button>
          <Button type="button" variant="ghost" onClick={() => onApprove(quote)}>Aprobar</Button>
          <Button type="button" onClick={() => onConvertToProject(quote)}>Convertir en proyecto</Button>
        </div>
      </aside>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wide text-neutral-500">{label}</p>
      <p className="mt-1 text-sm font-medium text-neutral-950">{value}</p>
    </div>
  );
}

function MoneyRow({ label, value, strong = false }: { label: string; value: number; strong?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className={strong ? "font-semibold text-neutral-950" : "text-neutral-600"}>{label}</span>
      <span className={strong ? "text-lg font-semibold text-neutral-950" : "font-medium text-neutral-950"}>{formatCurrency(value)}</span>
    </div>
  );
}
