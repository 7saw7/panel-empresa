import { SectionCard } from "@/components/ui/SectionCard";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { formatPercent, getStatusLabel } from "@/mocks";
import type { MockProjectStatus } from "@/mocks";

type DashboardProjectProgressProps = {
  projects: Array<{
    name: string;
    status: MockProjectStatus;
    progress: number;
  }>;
};

const statusTone: Record<MockProjectStatus, "default" | "success" | "warning" | "danger" | "info"> = {
  pending: "warning",
  scheduled: "info",
  in_progress: "info",
  paused: "warning",
  completed: "success",
  cancelled: "danger",
};

export function DashboardProjectProgress({ projects }: DashboardProjectProgressProps) {
  return (
    <SectionCard
      title="Avance de proyectos"
      description="Proyectos activos o recientes con su progreso operativo."
    >
      <div className="space-y-4">
        {projects.map((project) => (
          <article key={project.name} className="rounded-2xl border border-neutral-200 p-4">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h3 className="font-medium text-neutral-950">{project.name}</h3>
                <p className="mt-1 text-sm text-neutral-500">
                  Avance actual: {formatPercent(project.progress)}
                </p>
              </div>
              <StatusBadge label={getStatusLabel(project.status)} tone={statusTone[project.status]} />
            </div>

            <div className="mt-4 h-2 overflow-hidden rounded-full bg-neutral-100">
              <div
                className="h-full rounded-full bg-neutral-950"
                style={{ width: `${Math.max(0, Math.min(project.progress, 100))}%` }}
              />
            </div>
          </article>
        ))}
      </div>
    </SectionCard>
  );
}
