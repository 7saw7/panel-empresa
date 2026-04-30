"use client";

export type FinancePeriod =
  | "this_month"
  | "last_month"
  | "last_3_months"
  | "this_year"
  | "custom";

export type FinanceCustomRange = {
  from: string;
  to: string;
};

const periodOptions: Array<{ label: string; value: FinancePeriod }> = [
  { label: "Este mes", value: "this_month" },
  { label: "Mes anterior", value: "last_month" },
  { label: "Últimos 3 meses", value: "last_3_months" },
  { label: "Este año", value: "this_year" },
  { label: "Personalizado", value: "custom" },
];

type FinancesPeriodSelectorProps = {
  value: FinancePeriod;
  customRange: FinanceCustomRange;
  onChange: (value: FinancePeriod) => void;
  onCustomRangeChange: (range: FinanceCustomRange) => void;
};

export function getFinancePeriodLabel(period: FinancePeriod) {
  const option = periodOptions.find((item) => item.value === period);
  return option?.label ?? "Periodo";
}

export function FinancesPeriodSelector({
  value,
  customRange,
  onChange,
  onCustomRangeChange,
}: FinancesPeriodSelectorProps) {
  return (
    <div className="rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <p className="text-sm font-semibold text-neutral-950">Periodo financiero</p>
          <p className="mt-1 text-sm text-neutral-500">
            Filtra ingresos, egresos y pendientes según creación, vencimiento o pago.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {periodOptions.map((option) => {
            const isActive = option.value === value;

            return (
              <button
                key={option.value}
                type="button"
                onClick={() => onChange(option.value)}
                className={[
                  "rounded-xl border px-3 py-2 text-sm font-medium transition",
                  isActive
                    ? "border-neutral-950 bg-neutral-950 text-white shadow-sm"
                    : "border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-100 hover:text-neutral-950",
                ].join(" ")}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>

      {value === "custom" ? (
        <div className="mt-4 grid gap-4 border-t border-neutral-200 pt-4 sm:grid-cols-2">
          <label className="space-y-2 text-sm">
            <span className="font-medium text-neutral-700">Desde</span>
            <input
              type="date"
              value={customRange.from}
              onChange={(event) => onCustomRangeChange({ ...customRange, from: event.target.value })}
              className="w-full rounded-2xl border border-neutral-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-neutral-950"
            />
          </label>

          <label className="space-y-2 text-sm">
            <span className="font-medium text-neutral-700">Hasta</span>
            <input
              type="date"
              value={customRange.to}
              onChange={(event) => onCustomRangeChange({ ...customRange, to: event.target.value })}
              className="w-full rounded-2xl border border-neutral-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-neutral-950"
            />
          </label>
        </div>
      ) : null}
    </div>
  );
}
