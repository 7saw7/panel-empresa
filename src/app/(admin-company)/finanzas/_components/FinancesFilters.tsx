import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import type { MockFinanceMovementType, MockFinanceStatus } from "@/mocks";

export type FinanceTypeFilter = MockFinanceMovementType | "all";
export type FinanceStatusFilter = MockFinanceStatus | "all";

type FinancesFiltersProps = {
  search: string;
  typeFilter: FinanceTypeFilter;
  statusFilter: FinanceStatusFilter;
  methodFilter: string;
  methods: string[];
  onSearchChange: (value: string) => void;
  onTypeChange: (value: FinanceTypeFilter) => void;
  onStatusChange: (value: FinanceStatusFilter) => void;
  onMethodChange: (value: string) => void;
  onReset: () => void;
};

export function FinancesFilters({
  search,
  typeFilter,
  statusFilter,
  methodFilter,
  methods,
  onSearchChange,
  onTypeChange,
  onStatusChange,
  onMethodChange,
  onReset,
}: FinancesFiltersProps) {
  return (
    <div className="rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm">
      <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr_1fr_1fr_auto] lg:items-end">
        <Input
          label="Buscar"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Código, concepto, cliente, proveedor..."
        />

        <Select label="Tipo" value={typeFilter} onChange={(event) => onTypeChange(event.target.value as FinanceTypeFilter)}>
          <option value="all">Todos</option>
          <option value="income">Ingresos</option>
          <option value="expense">Egresos</option>
        </Select>

        <Select label="Estado" value={statusFilter} onChange={(event) => onStatusChange(event.target.value as FinanceStatusFilter)}>
          <option value="all">Todos</option>
          <option value="paid">Pagado</option>
          <option value="pending">Pendiente</option>
          <option value="overdue">Vencido</option>
          <option value="cancelled">Cancelado</option>
        </Select>

        <Select label="Método" value={methodFilter} onChange={(event) => onMethodChange(event.target.value)}>
          <option value="all">Todos</option>
          {methods.map((method) => <option key={method} value={method}>{method}</option>)}
        </Select>

        <Button type="button" variant="secondary" onClick={onReset}>Limpiar</Button>
      </div>
    </div>
  );
}
