import { StatCard } from "@/components/ui/StatCard";
import { formatCurrency, formatNumber } from "@/mocks";
import type { MockProject } from "@/mocks";

type ProjectsStatsProps = {
  projects: MockProject[];
};

export function ProjectsStats({ projects }: ProjectsStatsProps) {
  const totalProjects = projects.length;
  const inProgress = projects.filter((project) => project.status === "in_progress").length;
  const scheduled = projects.filter((project) => project.status === "scheduled").length;
  const overdue = projects.filter((project) => project.isOverdue).length;
  const completed = projects.filter((project) => project.status === "completed").length;
  const totalBudget = projects.reduce((sum, project) => sum + project.budget, 0);

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
      <StatCard label="Total proyectos" value={formatNumber(totalProjects)} helper="Activos y cerrados" />
      <StatCard label="En proceso" value={formatNumber(inProgress)} helper="Ejecución actual" />
      <StatCard label="Programados" value={formatNumber(scheduled)} helper="Pendientes de inicio" />
      <StatCard label="Atrasados" value={formatNumber(overdue)} helper="Requieren atención" />
      <StatCard label="Presupuesto" value={formatCurrency(totalBudget)} helper={`${completed} terminados`} />
    </div>
  );
}
