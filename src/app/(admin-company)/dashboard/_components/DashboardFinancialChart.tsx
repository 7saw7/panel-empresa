import { SectionCard } from "@/components/ui/SectionCard";
import { formatCurrency } from "@/mocks";
import type { DashboardChartPoint } from "../_types/dashboard-range.types";

type DashboardFinancialChartProps = {
  data: DashboardChartPoint[];
};

export function DashboardFinancialChart({ data }: DashboardFinancialChartProps) {
  const maxValue = Math.max(...data.flatMap((item) => [item.income, item.expenses, item.profit]), 1);

  return (
    <SectionCard
      title="Tendencia financiera"
      description="Ingresos, egresos y margen estimado según el rango seleccionado."
    >
      <div className="space-y-5">
        <div className="flex flex-wrap gap-3 text-xs text-neutral-500">
          <span className="inline-flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-neutral-950" />
            Ingresos
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-neutral-400" />
            Egresos
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-neutral-200 ring-1 ring-neutral-300" />
            Margen
          </span>
        </div>

        <div className="overflow-x-auto">
          <div className="flex min-w-[560px] items-end gap-4">
            {data.map((item) => (
              <div key={item.label} className="flex flex-1 flex-col items-center gap-3">
                <div className="flex h-48 w-full items-end justify-center gap-1 rounded-2xl bg-neutral-50 px-2 py-3">
                  <div
                    title={`Ingresos: ${formatCurrency(item.income)}`}
                    className="w-3 rounded-t-full bg-neutral-950"
                    style={{ height: `${Math.max(8, (item.income / maxValue) * 100)}%` }}
                  />
                  <div
                    title={`Egresos: ${formatCurrency(item.expenses)}`}
                    className="w-3 rounded-t-full bg-neutral-400"
                    style={{ height: `${Math.max(8, (item.expenses / maxValue) * 100)}%` }}
                  />
                  <div
                    title={`Margen: ${formatCurrency(item.profit)}`}
                    className="w-3 rounded-t-full bg-neutral-200 ring-1 ring-neutral-300"
                    style={{ height: `${Math.max(8, (item.profit / maxValue) * 100)}%` }}
                  />
                </div>

                <div className="text-center">
                  <p className="text-xs font-medium text-neutral-700">{item.label}</p>
                  <p className="mt-1 text-[11px] text-neutral-500">{formatCurrency(item.profit)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionCard>
  );
}
