import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { SectionCard } from "@/components/ui/SectionCard";
import { Select } from "@/components/ui/Select";
import { Tabs } from "@/components/ui/Tabs";
import type { MockTechnicianStatus } from "@/mocks";

type TechnicianStatusFilter = MockTechnicianStatus | "all";
type ViewMode = "table" | "grid";

type TechniciansFiltersProps = {
  search: string;
  statusFilter: TechnicianStatusFilter;
  specialtyFilter: string;
  zoneFilter: string;
  viewMode: ViewMode;
  specialties: string[];
  zones: string[];
  onSearchChange: (value: string) => void;
  onStatusChange: (value: TechnicianStatusFilter) => void;
  onSpecialtyChange: (value: string) => void;
  onZoneChange: (value: string) => void;
  onViewModeChange: (value: ViewMode) => void;
  onReset: () => void;
};

export function TechniciansFilters({
  search,
  statusFilter,
  specialtyFilter,
  zoneFilter,
  viewMode,
  specialties,
  zones,
  onSearchChange,
  onStatusChange,
  onSpecialtyChange,
  onZoneChange,
  onViewModeChange,
  onReset,
}: TechniciansFiltersProps) {
  return (
    <SectionCard title="Filtros" description="Busca técnicos por nombre, zona, especialidad, correo o disponibilidad.">
      <div className="space-y-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div className="grid flex-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            <Input
              label="Buscar"
              placeholder="Nombre, correo o teléfono"
              value={search}
              onChange={(event) => onSearchChange(event.target.value)}
            />
            <Select label="Estado" value={statusFilter} onChange={(event) => onStatusChange(event.target.value as TechnicianStatusFilter)}>
              <option value="all">Todos</option>
              <option value="available">Disponible</option>
              <option value="busy">Ocupado</option>
              <option value="offline">Fuera de horario</option>
              <option value="inactive">Inactivo</option>
            </Select>
            <Select label="Especialidad" value={specialtyFilter} onChange={(event) => onSpecialtyChange(event.target.value)}>
              <option value="all">Todas</option>
              {specialties.map((specialty) => (
                <option key={specialty} value={specialty}>{specialty}</option>
              ))}
            </Select>
            <Select label="Zona" value={zoneFilter} onChange={(event) => onZoneChange(event.target.value)}>
              <option value="all">Todas</option>
              {zones.map((zone) => (
                <option key={zone} value={zone}>{zone}</option>
              ))}
            </Select>
          </div>

          <Button type="button" variant="secondary" onClick={onReset}>
            Limpiar
          </Button>
        </div>

        <Tabs
          value={viewMode}
          onChange={(value) => onViewModeChange(value as ViewMode)}
          items={[
            { key: "table", label: "Tabla" },
            { key: "grid", label: "Tarjetas" },
          ]}
        />
      </div>
    </SectionCard>
  );
}
