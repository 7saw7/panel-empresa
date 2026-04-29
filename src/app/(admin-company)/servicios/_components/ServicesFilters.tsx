import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { SectionCard } from "@/components/ui/SectionCard";
import { Select } from "@/components/ui/Select";
import type { MockServiceStatus } from "@/mocks";

type ServiceStatusFilter = MockServiceStatus | "all";
type ViewMode = "table" | "grid";

type ServicesFiltersProps = {
  search: string;
  statusFilter: ServiceStatusFilter;
  categoryFilter: string;
  viewMode: ViewMode;
  categories: string[];
  onSearchChange: (value: string) => void;
  onStatusChange: (value: ServiceStatusFilter) => void;
  onCategoryChange: (value: string) => void;
  onViewModeChange: (value: ViewMode) => void;
  onReset: () => void;
};

export function ServicesFilters({ search, statusFilter, categoryFilter, viewMode, categories, onSearchChange, onStatusChange, onCategoryChange, onViewModeChange, onReset }: ServicesFiltersProps) {
  return (
    <SectionCard title="Filtros" description="Busca servicios por nombre, categoría, descripción o materiales frecuentes.">
      <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr_1fr_1fr_auto] lg:items-end">
        <Input label="Buscar" value={search} onChange={(event) => onSearchChange(event.target.value)} placeholder="Ej. CCTV, cableado, mantenimiento" />
        <Select label="Estado" value={statusFilter} onChange={(event) => onStatusChange(event.target.value as ServiceStatusFilter)}>
          <option value="all">Todos</option>
          <option value="active">Activo</option>
          <option value="draft">Borrador</option>
          <option value="inactive">Inactivo</option>
        </Select>
        <Select label="Categoría" value={categoryFilter} onChange={(event) => onCategoryChange(event.target.value)}>
          <option value="all">Todas</option>
          {categories.map((category) => <option key={category} value={category}>{category}</option>)}
        </Select>
        <Select label="Vista" value={viewMode} onChange={(event) => onViewModeChange(event.target.value as ViewMode)}>
          <option value="table">Tabla</option>
          <option value="grid">Cards</option>
        </Select>
        <Button type="button" variant="secondary" onClick={onReset}>Limpiar</Button>
      </div>
    </SectionCard>
  );
}
