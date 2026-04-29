import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import type { MockInventoryStatus } from "@/mocks";

type InventoryStatusFilter = MockInventoryStatus | "all";

type InventoryFiltersProps = {
  search: string;
  statusFilter: InventoryStatusFilter;
  categoryFilter: string;
  supplierFilter: string;
  categories: string[];
  suppliers: string[];
  onSearchChange: (value: string) => void;
  onStatusChange: (value: InventoryStatusFilter) => void;
  onCategoryChange: (value: string) => void;
  onSupplierChange: (value: string) => void;
  onReset: () => void;
};

export function InventoryFilters({
  search,
  statusFilter,
  categoryFilter,
  supplierFilter,
  categories,
  suppliers,
  onSearchChange,
  onStatusChange,
  onCategoryChange,
  onSupplierChange,
  onReset,
}: InventoryFiltersProps) {
  return (
    <div className="rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm">
      <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr_1fr_1fr_auto] lg:items-end">
        <Input
          label="Buscar"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Producto, categoría, proveedor..."
        />

        <Select label="Estado" value={statusFilter} onChange={(event) => onStatusChange(event.target.value as InventoryStatusFilter)}>
          <option value="all">Todos</option>
          <option value="available">Disponible</option>
          <option value="low_stock">Stock bajo</option>
          <option value="out_of_stock">Sin stock</option>
        </Select>

        <Select label="Categoría" value={categoryFilter} onChange={(event) => onCategoryChange(event.target.value)}>
          <option value="all">Todas</option>
          {categories.map((category) => <option key={category} value={category}>{category}</option>)}
        </Select>

        <Select label="Proveedor" value={supplierFilter} onChange={(event) => onSupplierChange(event.target.value)}>
          <option value="all">Todos</option>
          {suppliers.map((supplier) => <option key={supplier} value={supplier}>{supplier}</option>)}
        </Select>

        <Button type="button" variant="secondary" onClick={onReset}>Limpiar</Button>
      </div>
    </div>
  );
}
