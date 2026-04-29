import { Button } from "@/components/ui/Button";
import { formatCurrency, formatDate, formatPercent, getStatusLabel } from "@/mocks";
import type { MockProject, MockProjectStatus } from "@/mocks";
import { ProjectPriorityBadge } from "./ProjectPriorityBadge";
import { ProjectStatusBadge } from "./ProjectStatusBadge";

type ProjectsKanbanProps = {
  projects: MockProject[];
  onView: (project: MockProject) => void;
  onEdit: (project: MockProject) => void;
  onMove: (project: MockProject, status: MockProjectStatus) => void;
};

const kanbanStatuses: MockProjectStatus[] = ["pending", "scheduled", "in_progress", "paused", "completed"];

export function ProjectsKanban({ projects, onView, onEdit, onMove }: ProjectsKanbanProps) {
  return (
    <div className="grid gap-4 xl:grid-cols-5">
      {kanbanStatuses.map((status) => {
        const columnProjects = projects.filter((project) => project.status === status);

        return (
          <section key={status} className="rounded-3xl border border-neutral-200 bg-white p-4 shadow-sm">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <h2 className="text-sm font-semibold text-neutral-950">{getStatusLabel(status)}</h2>
                <p className="text-xs text-neutral-500">{columnProjects.length} proyectos</p>
              </div>
              <ProjectStatusBadge status={status} />
            </div>

            <div className="space-y-3">
              {columnProjects.length > 0 ? (
                columnProjects.map((project) => (
                  <article key={project.id} className="rounded-2xl border border-neutral-200 p-4">
                    <div className="space-y-2">
                      <div>
                        <p className="text-xs text-neutral-500">{project.code}</p>
                        <h3 className="text-sm font-semibold leading-5 text-neutral-950">{project.name}</h3>
                      </div>
                      <p className="text-xs text-neutral-600">{project.clientName}</p>
                      <div className="flex flex-wrap gap-2">
                        <ProjectPriorityBadge priority={project.priority} />
                      </div>
                      <div className="space-y-1 text-xs text-neutral-500">
                        <p>Técnico: {project.technicianName ?? "Sin asignar"}</p>
                        <p>Entrega: {formatDate(project.dueDate)}</p>
                        <p>Presupuesto: {formatCurrency(project.budget)}</p>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs text-neutral-500">
                          <span>Avance</span>
                          <span>{formatPercent(project.progress)}</span>
                        </div>
                        <div className="mt-1 h-2 rounded-full bg-neutral-100">
                          <div className="h-2 rounded-full bg-neutral-950" style={{ width: `${project.progress}%` }} />
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 pt-2">
                        <Button type="button" size="sm" variant="secondary" onClick={() => onView(project)}>Ver</Button>
                        <Button type="button" size="sm" variant="ghost" onClick={() => onEdit(project)}>Editar</Button>
                        {status !== "in_progress" && status !== "completed" ? (
                          <Button type="button" size="sm" variant="ghost" onClick={() => onMove(project, "in_progress")}>Mover</Button>
                        ) : null}
                        {status !== "completed" ? (
                          <Button type="button" size="sm" variant="ghost" onClick={() => onMove(project, "completed")}>Cerrar</Button>
                        ) : null}
                      </div>
                    </div>
                  </article>
                ))
              ) : (
                <div className="rounded-2xl border border-dashed border-neutral-200 p-4 text-center text-sm text-neutral-500">
                  Sin proyectos en esta columna.
                </div>
              )}
            </div>
          </section>
        );
      })}
    </div>
  );
}
