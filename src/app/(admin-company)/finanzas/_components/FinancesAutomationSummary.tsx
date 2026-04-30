import { SectionCard } from "@/components/ui/SectionCard";
import { formatCurrency, formatNumber, type MockFinanceMovement } from "@/mocks";
import { getFinanceOrigin } from "./FinanceOriginBadge";

type FinancesAutomationSummaryProps = {
  movements: MockFinanceMovement[];
};

function sumAmount(movements: MockFinanceMovement[]) {
  return movements.reduce((total, movement) => total + movement.amount, 0);
}

export function FinancesAutomationSummary({ movements }: FinancesAutomationSummaryProps) {
  const automaticMovements = movements.filter((movement) => {
    const origin = getFinanceOrigin(movement);
    return origin === "project" || origin === "phase" || origin === "quote";
  });

  const manualMovements = movements.filter((movement) => getFinanceOrigin(movement) === "manual");
  const incomeMovements = movements.filter((movement) => movement.type === "income");
  const expenseMovements = movements.filter((movement) => movement.type === "expense");

  return (
    <div className="grid gap-4 xl:grid-cols-4">
      <SectionCard title="Ingresos" description="Pagos, adelantos, fases o cierres de proyecto.">
        <p className="text-2xl font-semibold text-neutral-950">{formatCurrency(sumAmount(incomeMovements))}</p>
        <p className="mt-2 text-sm text-neutral-500">{formatNumber(incomeMovements.length)} movimientos de ingreso</p>
      </SectionCard>

      <SectionCard title="Egresos" description="Materiales, técnicos, servicios y gastos operativos.">
        <p className="text-2xl font-semibold text-neutral-950">{formatCurrency(sumAmount(expenseMovements))}</p>
        <p className="mt-2 text-sm text-neutral-500">{formatNumber(expenseMovements.length)} movimientos de egreso</p>
      </SectionCard>

      <SectionCard title="Origen automático" description="Movimientos conectados a proyectos, fases o cotizaciones.">
        <p className="text-2xl font-semibold text-neutral-950">{formatNumber(automaticMovements.length)}</p>
        <p className="mt-2 text-sm text-neutral-500">Simula generación desde operación comercial.</p>
      </SectionCard>

      <SectionCard title="Origen manual" description="Gastos o ajustes registrados por administración.">
        <p className="text-2xl font-semibold text-neutral-950">{formatNumber(manualMovements.length)}</p>
        <p className="mt-2 text-sm text-neutral-500">Planilla, servicios, movilidad y materiales sueltos.</p>
      </SectionCard>
    </div>
  );
}
