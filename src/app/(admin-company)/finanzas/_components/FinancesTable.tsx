import { Button } from "@/components/ui/Button";
import { DataTable, type DataTableColumn } from "@/components/ui/DataTable";
import { formatCurrency, formatDate, type MockFinanceMovement } from "@/mocks";
import { FinanceStatusBadge } from "./FinanceStatusBadge";
import { FinanceTypeBadge } from "./FinanceTypeBadge";

type FinancesTableProps = {
  movements: MockFinanceMovement[];
  onView: (movement: MockFinanceMovement) => void;
  onEdit: (movement: MockFinanceMovement) => void;
  onMarkAsPaid: (movement: MockFinanceMovement) => void;
  onPreview: (movement: MockFinanceMovement) => void;
  onDuplicate: (movement: MockFinanceMovement) => void;
  onCancel: (movement: MockFinanceMovement) => void;
};

export function FinancesTable({ movements, onView, onEdit, onMarkAsPaid, onPreview, onDuplicate, onCancel }: FinancesTableProps) {
  const columns: Array<DataTableColumn<MockFinanceMovement>> = [
    {
      key: "code",
      header: "Movimiento",
      render: (movement) => (
        <div>
          <p className="font-medium text-neutral-950">{movement.code}</p>
          <p className="text-xs text-neutral-500">{movement.concept}</p>
        </div>
      ),
    },
    { key: "type", header: "Tipo", render: (movement) => <FinanceTypeBadge type={movement.type} /> },
    {
      key: "thirdParty",
      header: "Cliente / proveedor",
      render: (movement) => movement.clientName ?? movement.providerName ?? "Sin asociado",
    },
    {
      key: "project",
      header: "Proyecto",
      render: (movement) => movement.projectName ?? "No asociado",
    },
    { key: "method", header: "Método", render: (movement) => movement.paymentMethod },
    { key: "status", header: "Estado", render: (movement) => <FinanceStatusBadge status={movement.status} /> },
    {
      key: "amount",
      header: "Monto",
      render: (movement) => (
        <span className={movement.type === "income" ? "font-medium text-emerald-700" : "font-medium text-amber-700"}>
          {movement.type === "income" ? "+" : "-"}{formatCurrency(movement.amount)}
        </span>
      ),
    },
    { key: "date", header: "Vencimiento", render: (movement) => formatDate(movement.dueDate) },
    {
      key: "actions",
      header: "Acciones",
      className: "w-[25rem]",
      render: (movement) => (
        <div className="flex flex-wrap gap-2">
          <Button type="button" size="sm" variant="secondary" onClick={() => onView(movement)}>Ver</Button>
          <Button type="button" size="sm" variant="ghost" onClick={() => onEdit(movement)}>Editar</Button>
          <Button type="button" size="sm" variant="ghost" onClick={() => onPreview(movement)}>Comprobante</Button>
          <Button type="button" size="sm" variant="ghost" onClick={() => onDuplicate(movement)}>Duplicar</Button>
          <Button type="button" size="sm" variant="ghost" disabled={movement.status === "paid"} onClick={() => onMarkAsPaid(movement)}>Pagado</Button>
          <Button type="button" size="sm" variant="ghost" disabled={movement.status === "cancelled"} onClick={() => onCancel(movement)}>Cancelar</Button>
        </div>
      ),
    },
  ];

  return (
    <DataTable
      data={movements}
      columns={columns}
      getRowKey={(movement) => String(movement.id)}
      caption="Listado de movimientos financieros"
      emptyTitle="No hay movimientos"
      emptyDescription="Ajusta los filtros o registra un ingreso/egreso para continuar."
    />
  );
}
