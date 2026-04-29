import { StatCard } from "@/components/ui/StatCard";
import { formatNumber } from "@/mocks";
import type { MockTechnician } from "@/mocks";

type TechniciansStatsProps = {
  technicians: MockTechnician[];
};

export function TechniciansStats({ technicians }: TechniciansStatsProps) {
  const total = technicians.length;
  const available = technicians.filter((technician) => technician.status === "available").length;
  const busy = technicians.filter((technician) => technician.status === "busy").length;
  const activeProjects = technicians.reduce((sum, technician) => sum + technician.activeProjects, 0);
  const averageRating = total > 0 ? technicians.reduce((sum, technician) => sum + technician.rating, 0) / total : 0;

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
      <StatCard label="Total técnicos" value={formatNumber(total)} helper="Equipo registrado" />
      <StatCard label="Disponibles" value={formatNumber(available)} helper="Listos para asignar" />
      <StatCard label="Ocupados" value={formatNumber(busy)} helper="Con carga activa" />
      <StatCard label="Proyectos activos" value={formatNumber(activeProjects)} helper="Asignaciones actuales" />
      <StatCard label="Calificación" value={averageRating.toFixed(1)} helper="Promedio interno" />
    </div>
  );
}
