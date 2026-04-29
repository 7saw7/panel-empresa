import { StatCard } from "@/components/ui/StatCard";
import { calculateFinanceSummary, formatCurrency, formatNumber, type MockFinanceMovement } from "@/mocks";

type FinancesStatsProps = {
  movements: MockFinanceMovement[];
};

export function FinancesStats({ movements }: FinancesStatsProps) {
  const summary = calculateFinanceSummary(movements);
  const pendingCount = movements.filter((movement) => movement.status === "pending").length;
  const overdueCount = movements.filter((movement) => movement.status === "overdue").length;

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
      <StatCard label="Ingresos pagados" value={formatCurrency(summary.monthlyIncome)} helper="Movimientos cobrados" />
      <StatCard label="Egresos pagados" value={formatCurrency(summary.monthlyExpenses)} helper="Costos registrados" />
      <StatCard label="Utilidad estimada" value={formatCurrency(summary.estimatedProfit)} helper="Ingreso - egreso" />
      <StatCard label="Pendiente" value={formatCurrency(summary.pendingAmount)} helper={`${formatNumber(pendingCount)} pagos por cobrar/pagar`} />
      <StatCard label="Vencido" value={formatCurrency(summary.overdueAmount)} helper={`${formatNumber(overdueCount)} movimientos vencidos`} />
    </div>
  );
}
