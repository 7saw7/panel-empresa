import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import type { MockQuoteStatus } from "@/mocks";

type QuoteStatusFilter = MockQuoteStatus | "all";

type QuotesFiltersProps = {
  search: string;
  statusFilter: QuoteStatusFilter;
  clientFilter: string;
  responsibleFilter: string;
  clients: string[];
  responsibles: string[];
  onSearchChange: (value: string) => void;
  onStatusChange: (value: QuoteStatusFilter) => void;
  onClientChange: (value: string) => void;
  onResponsibleChange: (value: string) => void;
  onReset: () => void;
};

const statusOptions: Array<{ value: QuoteStatusFilter; label: string }> = [
  { value: "all", label: "Todos" },
  { value: "draft", label: "Borrador" },
  { value: "sent", label: "Enviada" },
  { value: "approved", label: "Aprobada" },
  { value: "rejected", label: "Rechazada" },
  { value: "expired", label: "Vencida" },
];

export function QuotesFilters({
  search,
  statusFilter,
  clientFilter,
  responsibleFilter,
  clients,
  responsibles,
  onSearchChange,
  onStatusChange,
  onClientChange,
  onResponsibleChange,
  onReset,
}: QuotesFiltersProps) {
  return (
    <div className="rounded-3xl border border-neutral-200 bg-white p-4 shadow-sm">
      <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr_1fr_1fr_auto] lg:items-end">
        <Input
          label="Buscar"
          placeholder="Código, cliente, servicio o responsable"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
        />

        <Select
          label="Estado"
          value={statusFilter}
          onChange={(event) => onStatusChange(event.target.value as QuoteStatusFilter)}
        >
          {statusOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>

        <Select label="Cliente" value={clientFilter} onChange={(event) => onClientChange(event.target.value)}>
          <option value="all">Todos</option>
          {clients.map((client) => (
            <option key={client} value={client}>
              {client}
            </option>
          ))}
        </Select>

        <Select
          label="Responsable"
          value={responsibleFilter}
          onChange={(event) => onResponsibleChange(event.target.value)}
        >
          <option value="all">Todos</option>
          {responsibles.map((responsible) => (
            <option key={responsible} value={responsible}>
              {responsible}
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
