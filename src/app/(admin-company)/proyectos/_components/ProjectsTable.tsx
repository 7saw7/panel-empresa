import { Button } from "@/components/ui/Button";
import { DataTable, type DataTableColumn } from "@/components/ui/DataTable";
import { formatCurrency, formatDate, formatPercent } from "@/mocks";
import type { MockProject } from "@/mocks";
import { ProjectPriorityBadge } from "./ProjectPriorityBadge";
import { ProjectStatusBadge } from "./ProjectStatusBadge";

type ProjectsTableProps = {
  projects: MockProject[];
  onView: (project: MockProject) => void;
  onEdit: (project: MockProject) => void;
  onStart: (project: MockProject) => void;
  onPause: (project: MockProject) => void;
  onComplete: (project: MockProject) => void;
  onCancel: (project: MockProject) => void;
};

export function ProjectsTable({ projects, onView, onEdit, onStart, onPause, onComplete, onCancel }: ProjectsTableProps) {
  const columns: Array<DataTableColumn<MockProject>> = [
    {
      key: "project",
      header: "Proyecto",
      render: (project) => (
        <div>
          <p className="font-medium text-neutral-950">{project.name}</p>
          <p className="text-xs text-neutral-500">{project.code}</p>
        </div>
      ),
    },
    { key: "client", header: "Cliente", render: (project) => project.clientName },
    { key: "technician", header: "Técnico", render: (project) => project.technicianName ?? "Sin asignar" },
    { key: "status", header: "Estado", render: (project) => <ProjectStatusBadge status={project.status} /> },
    { key: "priority", header: "Prioridad", render: (project) => <ProjectPriorityBadge priority={project.priority} /> },
    {
      key: "dates",
      header: "Fechas",
      render: (project) => (
        <div>
          <p>Inicio: {formatDate(project.startDate)}</p>
          <p className="text-xs text-neutral-500">Entrega: {formatDate(project.dueDate)}</p>
        </div>
      ),
    },
    {
      key: "progress",
      header: "Avance",
      render: (project) => (
        <div className="min-w-32">
          <div className="flex items-center justify-between text-xs text-neutral-500">
            <span>{formatPercent(project.progress)}</span>
            <span>{formatCurrency(project.budget)}</span>
          </div>
          <div className="mt-2 h-2 rounded-full bg-neutral-100">
            <div className="h-2 rounded-full bg-neutral-950" style={{ width: `${project.progress}%` }} />
          </div>
        </div>
      ),
    },
    {
      key: "actions",
      header: "Acciones",
      className: "min-w-72",
      render: (project) => (
        <div className="flex flex-wrap gap-2">
          <Button type="button" size="sm" variant="secondary" onClick={() => onView(project)}>Ver</Button>
          <Button type="button" size="sm" variant="ghost" onClick={() => onEdit(project)}>Editar</Button>
          <Button type="button" size="sm" variant="ghost" onClick={() => onStart(project)}>Iniciar</Button>
          <Button type="button" size="sm" variant="ghost" onClick={() => onPause(project)}>Pausar</Button>
          <Button type="button" size="sm" variant="ghost" onClick={() => onComplete(project)}>Terminar</Button>
          <Button type="button" size="sm" variant="ghost" onClick={() => onCancel(project)}>Cancelar</Button>
        </div>
      ),
    },
  ];

  return (
    <DataTable
      data={projects}
      columns={columns}
      getRowKey={(project) => String(project.id)}
      caption="Listado de proyectos"
      emptyTitle="No se encontraron proyectos"
      emptyDescription="Ajusta los filtros o crea un nuevo proyecto mock."
    />
  );
}
