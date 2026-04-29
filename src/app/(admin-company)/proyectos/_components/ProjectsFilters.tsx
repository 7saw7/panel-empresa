import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { SectionCard } from "@/components/ui/SectionCard";
import { Select } from "@/components/ui/Select";
import { Tabs } from "@/components/ui/Tabs";
import type { MockPriority, MockProjectStatus } from "@/mocks";

type ProjectStatusFilter = MockProjectStatus | "all";
type ProjectPriorityFilter = MockPriority | "all";
type ViewMode = "table" | "kanban";

type ProjectsFiltersProps = {
  search: string;
  statusFilter: ProjectStatusFilter;
  priorityFilter: ProjectPriorityFilter;
  technicianFilter: string;
  clientFilter: string;
  viewMode: ViewMode;
  clients: string[];
  technicians: string[];
  onSearchChange: (value: string) => void;
  onStatusChange: (value: ProjectStatusFilter) => void;
  onPriorityChange: (value: ProjectPriorityFilter) => void;
  onTechnicianChange: (value: string) => void;
  onClientChange: (value: string) => void;
  onViewModeChange: (value: ViewMode) => void;
  onReset: () => void;
};

export function ProjectsFilters({
  search,
  statusFilter,
  priorityFilter,
  technicianFilter,
  clientFilter,
  viewMode,
  clients,
  technicians,
  onSearchChange,
  onStatusChange,
  onPriorityChange,
  onTechnicianChange,
  onClientChange,
  onViewModeChange,
  onReset,
}: ProjectsFiltersProps) {
  return (
    <SectionCard title="Filtros" description="Busca proyectos por código, cliente, técnico, estado o prioridad.">
      <div className="space-y-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div className="grid flex-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
            <Input
              label="Buscar"
              placeholder="PROY-2026, cliente o técnico"
              value={search}
              onChange={(event) => onSearchChange(event.target.value)}
            />
            <Select label="Estado" value={statusFilter} onChange={(event) => onStatusChange(event.target.value as ProjectStatusFilter)}>
              <option value="all">Todos</option>
              <option value="pending">Pendiente</option>
              <option value="scheduled">Programado</option>
              <option value="in_progress">En proceso</option>
              <option value="paused">Pausado</option>
              <option value="completed">Terminado</option>
              <option value="cancelled">Cancelado</option>
            </Select>
            <Select label="Prioridad" value={priorityFilter} onChange={(event) => onPriorityChange(event.target.value as ProjectPriorityFilter)}>
              <option value="all">Todas</option>
              <option value="low">Baja</option>
              <option value="medium">Media</option>
              <option value="high">Alta</option>
              <option value="urgent">Urgente</option>
            </Select>
            <Select label="Técnico" value={technicianFilter} onChange={(event) => onTechnicianChange(event.target.value)}>
              <option value="all">Todos</option>
              {technicians.map((technician) => (
                <option key={technician} value={technician}>{technician}</option>
              ))}
            </Select>
            <Select label="Cliente" value={clientFilter} onChange={(event) => onClientChange(event.target.value)}>
              <option value="all">Todos</option>
              {clients.map((client) => (
                <option key={client} value={client}>{client}</option>
              ))}
            </Select>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Tabs
              items={[
                { key: "table", label: "Tabla" },
                { key: "kanban", label: "Kanban" },
              ]}
              value={viewMode}
              onChange={(value) => onViewModeChange(value as ViewMode)}
            />
            <Button type="button" variant="secondary" onClick={onReset}>
              Limpiar
            </Button>
          </div>
        </div>
      </div>
    </SectionCard>
  );
}
