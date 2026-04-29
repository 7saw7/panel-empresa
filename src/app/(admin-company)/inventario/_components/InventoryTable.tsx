import { Button } from "@/components/ui/Button";
import { DataTable, type DataTableColumn } from "@/components/ui/DataTable";
import { formatCurrency, formatNumber, type MockInventoryItem } from "@/mocks";
import { InventoryStatusBadge } from "./InventoryStatusBadge";

type InventoryTableProps = {
  items: MockInventoryItem[];
  onView: (item: MockInventoryItem) => void;
  onEdit: (item: MockInventoryItem) => void;
  onEntry: (item: MockInventoryItem) => void;
  onExit: (item: MockInventoryItem) => void;
  onAdjust: (item: MockInventoryItem) => void;
  onAssociateToService: (item: MockInventoryItem) => void;
  onAssociateToProject: (item: MockInventoryItem) => void;
};

export function InventoryTable({
  items,
  onView,
  onEdit,
  onEntry,
  onExit,
  onAdjust,
  onAssociateToService,
  onAssociateToProject,
}: InventoryTableProps) {
  const columns: Array<DataTableColumn<MockInventoryItem>> = [
    {
      key: "product",
      header: "Producto",
      render: (item) => (
        <div>
          <p className="font-medium text-neutral-950">{item.name}</p>
          <p className="text-xs text-neutral-500">{item.supplier}</p>
        </div>
      ),
    },
    { key: "category", header: "Categoría", render: (item) => item.category },
    {
      key: "stock",
      header: "Stock",
      render: (item) => (
        <div>
          <p className="font-medium text-neutral-950">{formatNumber(item.stock)} {item.unit}</p>
          <p className="text-xs text-neutral-500">Mínimo: {formatNumber(item.minStock)}</p>
        </div>
      ),
    },
    { key: "cost", header: "Costo unitario", render: (item) => formatCurrency(item.unitCost) },
    { key: "value", header: "Valor", render: (item) => formatCurrency(item.totalValue) },
    { key: "status", header: "Estado", render: (item) => <InventoryStatusBadge status={item.status} /> },
    { key: "lastMovement", header: "Último movimiento", render: (item) => item.lastMovementAt },
    {
      key: "actions",
      header: "Acciones",
      className: "w-[28rem]",
      render: (item) => (
        <div className="flex flex-wrap gap-2">
          <Button type="button" size="sm" variant="secondary" onClick={() => onView(item)}>Ver</Button>
          <Button type="button" size="sm" variant="ghost" onClick={() => onEdit(item)}>Editar</Button>
          <Button type="button" size="sm" variant="ghost" onClick={() => onEntry(item)}>Entrada</Button>
          <Button type="button" size="sm" variant="ghost" onClick={() => onExit(item)}>Salida</Button>
          <Button type="button" size="sm" variant="ghost" onClick={() => onAdjust(item)}>Ajuste</Button>
          <Button type="button" size="sm" variant="ghost" onClick={() => onAssociateToService(item)}>Servicio</Button>
          <Button type="button" size="sm" variant="ghost" onClick={() => onAssociateToProject(item)}>Proyecto</Button>
        </div>
      ),
    },
  ];

  return (
    <DataTable
      data={items}
      columns={columns}
      getRowKey={(item) => String(item.id)}
      caption="Listado de inventario"
      emptyTitle="No hay productos"
      emptyDescription="Ajusta los filtros o registra un nuevo producto para continuar."
    />
  );
}
