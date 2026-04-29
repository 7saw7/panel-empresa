import { StatCard } from "@/components/ui/StatCard";
import { formatCurrency } from "@/mocks";
import type { MockQuote } from "@/mocks";

type QuotesStatsProps = {
  quotes: MockQuote[];
};

export function QuotesStats({ quotes }: QuotesStatsProps) {
  const totalQuotes = quotes.length;
  const sentQuotes = quotes.filter((quote) => quote.status === "sent").length;
  const approvedQuotes = quotes.filter((quote) => quote.status === "approved").length;
  const quotedAmount = quotes.reduce((sum, quote) => sum + quote.total, 0);
  const conversionRate = totalQuotes > 0 ? Math.round((approvedQuotes / totalQuotes) * 100) : 0;

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
      <StatCard label="Total" value={String(totalQuotes)} helper="Cotizaciones mock" />
      <StatCard label="Monto cotizado" value={formatCurrency(quotedAmount)} helper="Valor total con IGV" />
      <StatCard label="Enviadas" value={String(sentQuotes)} helper="Pendientes de respuesta" />
      <StatCard label="Aprobadas" value={String(approvedQuotes)} helper="Listas para proyecto" />
      <StatCard label="Conversión" value={`${conversionRate}%`} helper="Aprobadas sobre total" />
    </div>
  );
}
