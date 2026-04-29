import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import type { MockClientStatus, MockClientType } from "@/mocks";

type ClientStatusFilter = MockClientStatus | "all";
type ClientTypeFilter = MockClientType | "all";

type ClientsFiltersProps = {
  search: string;
  statusFilter: ClientStatusFilter;
  typeFilter: ClientTypeFilter;
  districtFilter: string;
  districts: string[];
  onSearchChange: (value: string) => void;
  onStatusChange: (value: ClientStatusFilter) => void;
  onTypeChange: (value: ClientTypeFilter) => void;
  onDistrictChange: (value: string) => void;
  onReset: () => void;
};

const statusOptions: Array<{ value: ClientStatusFilter; label: string }> = [
  { value: "all", label: "Todos" },
  { value: "active", label: "Activo" },
  { value: "prospect", label: "Prospecto" },
  { value: "with_project", label: "Con proyecto" },
  { value: "inactive", label: "Inactivo" },
];

const typeOptions: Array<{ value: ClientTypeFilter; label: string }> = [
  { value: "all", label: "Todos" },
  { value: "Empresa", label: "Empresa" },
  { value: "Residencial", label: "Residencial" },
  { value: "Institución", label: "Institución" },
];

export function ClientsFilters({
  search,
  statusFilter,
  typeFilter,
  districtFilter,
  districts,
  onSearchChange,
  onStatusChange,
  onTypeChange,
  onDistrictChange,
  onReset,
}: ClientsFiltersProps) {
  return (
    <div className="rounded-3xl border border-neutral-200 bg-white p-4 shadow-sm">
      <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr_1fr_1fr_auto] lg:items-end">
        <Input
          label="Buscar"
          placeholder="Cliente, contacto, correo o distrito"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
        />

        <Select
          label="Estado"
          value={statusFilter}
          onChange={(event) => onStatusChange(event.target.value as ClientStatusFilter)}
        >
          {statusOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>

        <Select
          label="Tipo"
          value={typeFilter}
          onChange={(event) => onTypeChange(event.target.value as ClientTypeFilter)}
        >
          {typeOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>

        <Select
          label="Distrito"
          value={districtFilter}
          onChange={(event) => onDistrictChange(event.target.value)}
        >
          <option value="all">Todos</option>
          {districts.map((district) => (
            <option key={district} value={district}>
              {district}
            </option>
          ))}
        </Select>

        <Button type="button" variant="secondary" onClick={onReset}>
          Limpiar
        </Button>
      </div>
    </div>
  );
}
