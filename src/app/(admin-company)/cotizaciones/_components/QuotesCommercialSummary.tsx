import { SectionCard } from "@/components/ui/SectionCard";
import { formatCurrency } from "@/mocks";
import type { MockQuote } from "@/mocks";

type QuotesCommercialSummaryProps = {
  quotes: MockQuote[];
};

export function QuotesCommercialSummary({ quotes }: QuotesCommercialSummaryProps) {
  const draft = quotes.filter((quote) => quote.status === "draft");
  const sent = quotes.filter((quote) => quote.status === "sent");
  const approved = quotes.filter((quote) => quote.status === "approved");
  const approvedAmount = approved.reduce((total, quote) => total + quote.total, 0);
  const pipelineAmount = quotes
    .filter((quote) => quote.status === "draft" || quote.status === "sent")
    .reduce((total, quote) => total + quote.total, 0);

  return (
    <div className="grid gap-4 xl:grid-cols-4">
      <SectionCard title="Borradores" description="Propuestas internas pendientes de envío.">
        <p className="text-2xl font-semibold text-neutral-950">{draft.length}</p>
        <p className="mt-2 text-sm text-neutral-500">Preparación comercial</p>
      </SectionCard>

      <SectionCard title="Enviadas" description="Cotizaciones en evaluación por el cliente.">
        <p className="text-2xl font-semibold text-neutral-950">{sent.length}</p>
        <p className="mt-2 text-sm text-neutral-500">Seguimiento pendiente</p>
      </SectionCard>

      <SectionCard title="Aprobadas" description="Listas para convertirse en proyecto.">
        <p className="text-2xl font-semibold text-neutral-950">{formatCurrency(approvedAmount)}</p>
        <p className="mt-2 text-sm text-neutral-500">{approved.length} propuestas ganadas</p>
      </SectionCard>

      <SectionCard title="Pipeline" description="Valor potencial entre borradores y enviadas.">
        <p className="text-2xl font-semibold text-neutral-950">{formatCurrency(pipelineAmount)}</p>
        <p className="mt-2 text-sm text-neutral-500">Venta potencial abierta</p>
      </SectionCard>
    </div>
  );
}
