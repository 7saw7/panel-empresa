import { Button } from "@/components/ui/Button";
import { SectionCard } from "@/components/ui/SectionCard";
import { Select } from "@/components/ui/Select";
import { formatCurrency, formatDate, formatPercent } from "@/mocks";
import type { MockProject, MockTechnician, MockTimelineEvent } from "@/mocks";
import { ProjectChecklist } from "./ProjectChecklist";
import { ProjectPriorityBadge } from "./ProjectPriorityBadge";
import { ProjectStatusBadge } from "./ProjectStatusBadge";

type ProjectDetailDrawerProps = {
  project: MockProject | null;
  open: boolean;
  timeline: MockTimelineEvent[];
  technicians: MockTechnician[];
  onClose: () => void;
  onEdit: (project: MockProject) => void;
  onAssignTechnician: (project: MockProject, technicianId: number) => void;
  onToggleTask: (project: MockProject, taskId: number) => void;
  onStart: (project: MockProject) => void;
  onPause: (project: MockProject) => void;
  onComplete: (project: MockProject) => void;
};

export function ProjectDetailDrawer({
  project,
  open,
  timeline,
  technicians,
  onClose,
  onEdit,
  onAssignTechnician,
  onToggleTask,
  onStart,
  onPause,
  onComplete,
}: ProjectDetailDrawerProps) {
  if (!open || !project) return null;

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
            <p className="text-xs uppercase tracking-wide text-neutral-500">Detalle de proyecto</p>
            <h2 className="mt-1 text-xl font-semibold tracking-tight text-neutral-950">{project.name}</h2>
            <p className="mt-1 text-sm text-neutral-500">{project.code} · {project.clientName}</p>
          </div>
          <Button type="button" variant="ghost" onClick={onClose}>Cerrar</Button>
        </div>

        <div className="flex-1 space-y-5 overflow-y-auto p-6">
          <SectionCard title="Resumen operativo">
            <div className="grid gap-4 sm:grid-cols-2">
              <Info label="Cliente" value={project.clientName} />
              <Info label="Técnico" value={project.technicianName ?? "Sin asignar"} />
              <Info label="Inicio" value={formatDate(project.startDate)} />
              <Info label="Entrega" value={formatDate(project.dueDate)} />
              <Info label="Presupuesto" value={formatCurrency(project.budget)} />
              <Info label="Cotización" value={project.quoteId ? `#${project.quoteId}` : "Sin cotización"} />
              <div className="space-y-1">
                <p className="text-xs uppercase tracking-wide text-neutral-500">Estado</p>
                <ProjectStatusBadge status={project.status} />
              </div>
              <div className="space-y-1">
                <p className="text-xs uppercase tracking-wide text-neutral-500">Prioridad</p>
                <ProjectPriorityBadge priority={project.priority} />
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Avance">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-neutral-600">Progreso general</span>
                <span className="font-semibold text-neutral-950">{formatPercent(project.progress)}</span>
              </div>
              <div className="h-3 rounded-full bg-neutral-100">
                <div className="h-3 rounded-full bg-neutral-950" style={{ width: `${project.progress}%` }} />
              </div>
              {project.isOverdue ? <p className="text-sm text-red-600">Este proyecto figura como atrasado.</p> : null}
            </div>
          </SectionCard>

          <SectionCard title="Asignación rápida" description="Simula cambio de responsable técnico sin backend.">
            <Select
              label="Técnico asignado"
              value={project.technicianId ? String(project.technicianId) : ""}
              onChange={(event) => onAssignTechnician(project, Number(event.target.value))}
            >
              <option value="" disabled>Selecciona un técnico</option>
              {technicians.map((technician) => (
                <option key={technician.id} value={technician.id}>
                  {technician.name} · {technician.status}
                </option>
              ))}
            </Select>
          </SectionCard>

          <SectionCard title="Checklist">
            <ProjectChecklist tasks={project.checklist} onToggleTask={(taskId) => onToggleTask(project, taskId)} />
          </SectionCard>

          <SectionCard title="Notas internas">
            <p className="text-sm leading-6 text-neutral-700">{project.notes ?? "Sin notas registradas."}</p>
          </SectionCard>

          <SectionCard title="Historial operativo">
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
              <p className="text-sm text-neutral-500">Sin historial para este proyecto.</p>
            )}
          </SectionCard>
        </div>

        <div className="flex flex-wrap justify-end gap-2 border-t border-neutral-200 px-6 py-4">
          <Button type="button" variant="secondary" onClick={() => onEdit(project)}>Editar</Button>
          <Button type="button" variant="ghost" onClick={() => onStart(project)}>Iniciar</Button>
          <Button type="button" variant="ghost" onClick={() => onPause(project)}>Pausar</Button>
          <Button type="button" onClick={() => onComplete(project)}>Marcar terminado</Button>
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
