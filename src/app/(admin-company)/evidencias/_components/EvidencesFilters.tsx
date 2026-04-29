import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import type { MockEvidenceStatus, MockEvidenceType, MockEvidenceVisibility } from "@/mocks";

export type EvidenceStatusFilter = MockEvidenceStatus | "all";
export type EvidenceTypeFilter = MockEvidenceType | "all";
export type EvidenceVisibilityFilter = MockEvidenceVisibility | "all";

type EvidencesFiltersProps = {
  search: string;
  statusFilter: EvidenceStatusFilter;
  typeFilter: EvidenceTypeFilter;
  visibilityFilter: EvidenceVisibilityFilter;
  projectFilter: string;
  projects: string[];
  onSearchChange: (value: string) => void;
  onStatusChange: (value: EvidenceStatusFilter) => void;
  onTypeChange: (value: EvidenceTypeFilter) => void;
  onVisibilityChange: (value: EvidenceVisibilityFilter) => void;
  onProjectChange: (value: string) => void;
  onReset: () => void;
};

export function EvidencesFilters({
  search,
  statusFilter,
  typeFilter,
  visibilityFilter,
  projectFilter,
  projects,
  onSearchChange,
  onStatusChange,
  onTypeChange,
  onVisibilityChange,
  onProjectChange,
  onReset,
}: EvidencesFiltersProps) {
  return (
    <div className="rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">
        <div className="xl:col-span-2">
          <Input
            label="Buscar"
            placeholder="Archivo, proyecto, cliente o técnico"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
          />
        </div>

        <Select label="Estado" value={statusFilter} onChange={(event) => onStatusChange(event.target.value as EvidenceStatusFilter)}>
          <option value="all">Todos</option>
          <option value="pending_review">Pendiente revisión</option>
          <option value="approved">Aprobada</option>
          <option value="rejected">Rechazada</option>
          <option value="archived">Archivada</option>
        </Select>

        <Select label="Tipo" value={typeFilter} onChange={(event) => onTypeChange(event.target.value as EvidenceTypeFilter)}>
          <option value="all">Todos</option>
          <option value="photo">Foto</option>
          <option value="document">Documento</option>
          <option value="invoice">Comprobante</option>
          <option value="signature">Firma</option>
          <option value="report">Reporte</option>
        </Select>

        <Select label="Visibilidad" value={visibilityFilter} onChange={(event) => onVisibilityChange(event.target.value as EvidenceVisibilityFilter)}>
          <option value="all">Todas</option>
          <option value="internal">Solo interno</option>
          <option value="client_visible">Visible cliente</option>
        </Select>

        <Select label="Proyecto" value={projectFilter} onChange={(event) => onProjectChange(event.target.value)}>
          <option value="all">Todos</option>
          {projects.map((project) => (
            <option key={project} value={project}>{project}</option>
          ))}
        </Select>
      </div>

      <div className="mt-4 flex justify-end">
        <Button type="button" variant="ghost" onClick={onReset}>Limpiar filtros</Button>
      </div>
    </div>
  );
}
