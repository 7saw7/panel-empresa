import { SectionCard } from "@/components/ui/SectionCard";
import { formatCurrency, formatNumber } from "@/mocks";
import type { MockClient, MockFinanceSummary, MockInventoryItem, MockQuote, MockService } from "@/mocks";

type DashboardBusinessSnapshotProps = {
  clients: MockClient[];
  quotes: MockQuote[];
  services: MockService[];
  inventory: MockInventoryItem[];
  finances: MockFinanceSummary;
};

export function DashboardBusinessSnapshot({
  clients,
  quotes,
  services,
  inventory,
  finances,
}: DashboardBusinessSnapshotProps) {
  const quotedAmount = quotes.reduce((sum, quote) => sum + quote.total, 0);
  const activeServices = services.filter((service) => service.status === "active").length;
  const inventoryValue = inventory.reduce((sum, item) => sum + item.totalValue, 0);

  const rows = [
    { label: "Clientes registrados", value: formatNumber(clients.length) },
    { label: "Monto total cotizado", value: formatCurrency(quotedAmount) },
    { label: "Servicios activos", value: formatNumber(activeServices) },
    { label: "Valor de inventario", value: formatCurrency(inventoryValue) },
    { label: "Ingresos del mes", value: formatCurrency(finances.monthlyIncome) },
    { label: "Egresos del mes", value: formatCurrency(finances.monthlyExpenses) },
  ];

  return (
    <SectionCard
      title="Resumen del negocio"
      description="Indicadores calculados desde los mocks productivos."
    >
      <div className="grid gap-3 sm:grid-cols-2">
        {rows.map((row) => (
          <div key={row.label} className="rounded-2xl border border-neutral-200 p-4">
            <p className="text-xs uppercase tracking-wide text-neutral-500">{row.label}</p>
            <p className="mt-2 text-lg font-semibold text-neutral-950">{row.value}</p>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
