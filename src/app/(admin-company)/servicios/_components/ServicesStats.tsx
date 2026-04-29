import { StatCard } from "@/components/ui/StatCard";
import { formatCurrency, formatNumber, type MockService } from "@/mocks";

type ServicesStatsProps = { services: MockService[] };

export function ServicesStats({ services }: ServicesStatsProps) {
  const activeServices = services.filter((service) => service.status === "active").length;
  const categories = new Set(services.map((service) => service.category)).size;
  const generatedRevenue = services.reduce((sum, service) => sum + service.generatedRevenue, 0);
  const mostUsed = [...services].sort((a, b) => b.timesUsed - a.timesUsed)[0];

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
      <StatCard label="Total servicios" value={formatNumber(services.length)} helper="Catálogo mock" />
      <StatCard label="Activos" value={formatNumber(activeServices)} helper="Listos para cotizar" />
      <StatCard label="Categorías" value={formatNumber(categories)} helper="Agrupación comercial" />
      <StatCard label="Más usado" value={mostUsed?.name ?? "-"} helper={mostUsed ? `${formatNumber(mostUsed.timesUsed)} usos` : "Sin datos"} />
      <StatCard label="Ingreso generado" value={formatCurrency(generatedRevenue)} helper="Histórico mock" />
    </div>
  );
}
