import { StatCard } from "@/components/ui/StatCard";
import type { MockClient } from "@/mocks";

type ClientsStatsProps = {
  clients: MockClient[];
};

export function ClientsStats({ clients }: ClientsStatsProps) {
  const totalClients = clients.length;
  const activeClients = clients.filter((client) => client.status === "active").length;
  const prospects = clients.filter((client) => client.status === "prospect").length;
  const withProject = clients.filter((client) => client.status === "with_project").length;

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard label="Total clientes" value={String(totalClients)} helper="Base comercial mock" />
      <StatCard label="Activos" value={String(activeClients)} helper="Clientes en seguimiento" />
      <StatCard label="Prospectos" value={String(prospects)} helper="Oportunidades abiertas" />
      <StatCard label="Con proyecto" value={String(withProject)} helper="Operación en curso" />
    </div>
  );
}
