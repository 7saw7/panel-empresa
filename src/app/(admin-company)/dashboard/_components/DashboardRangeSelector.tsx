"use client";

import type { DashboardRangeKey, DashboardRangeOption } from "../_types/dashboard-range.types";

const rangeOptions: DashboardRangeOption[] = [
  { label: "30 días", value: "30d" },
  { label: "3 meses", value: "3m" },
  { label: "6 meses", value: "6m" },
  { label: "12 meses", value: "12m" },
];

type DashboardRangeSelectorProps = {
  value: DashboardRangeKey;
  onChange: (value: DashboardRangeKey) => void;
};

export function DashboardRangeSelector({ value, onChange }: DashboardRangeSelectorProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-neutral-200 bg-white p-1 shadow-sm">
      {rangeOptions.map((option) => {
        const isActive = option.value === value;

        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={[
              "rounded-xl px-3 py-2 text-sm font-medium transition",
              isActive
                ? "bg-neutral-950 text-white shadow-sm"
                : "text-neutral-500 hover:bg-neutral-100 hover:text-neutral-950",
            ].join(" ")}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
