import { StatCard } from "@/components/ui/StatCard";
import { formatCurrency, formatNumber, type MockInventoryItem, type MockInventoryMovement } from "@/mocks";

type InventoryStatsProps = {
  items: MockInventoryItem[];
  movements: MockInventoryMovement[];
};

export function InventoryStats({ items, movements }: InventoryStatsProps) {
  const totalValue = items.reduce((sum, item) => sum + item.totalValue, 0);
  const lowStock = items.filter((item) => item.status === "low_stock").length;
  const outOfStock = items.filter((item) => item.status === "out_of_stock").length;
  const monthMovements = movements.length;

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
      <StatCard label="Productos" value={formatNumber(items.length)} helper="Catálogo operativo" />
      <StatCard label="Valor inventario" value={formatCurrency(totalValue)} helper="Stock x costo unitario" />
      <StatCard label="Stock bajo" value={formatNumber(lowStock)} helper="Requieren reposición" />
      <StatCard label="Sin stock" value={formatNumber(outOfStock)} helper="No disponibles" />
      <StatCard label="Movimientos" value={formatNumber(monthMovements)} helper="Registros mock" />
    </div>
  );
}
