import type { MockFinanceMovement } from "@/mocks";
import type { FinanceCustomRange, FinancePeriod } from "./FinancesPeriodSelector";

function startOfDay(date: Date) {
  const cloned = new Date(date);
  cloned.setHours(0, 0, 0, 0);
  return cloned;
}

function endOfDay(date: Date) {
  const cloned = new Date(date);
  cloned.setHours(23, 59, 59, 999);
  return cloned;
}

function toDate(value: string | null | undefined) {
  if (!value) return null;
  const date = new Date(`${value}T00:00:00`);
  return Number.isNaN(date.getTime()) ? null : date;
}

export function getMovementOperationalDate(movement: MockFinanceMovement) {
  return toDate(movement.paidAt) ?? toDate(movement.dueDate) ?? toDate(movement.createdAt) ?? new Date();
}

export function getFinancePeriodRange(period: FinancePeriod, customRange: FinanceCustomRange, now = new Date()) {
  const current = startOfDay(now);
  const year = current.getFullYear();
  const month = current.getMonth();

  if (period === "this_month") {
    return {
      from: new Date(year, month, 1),
      to: endOfDay(new Date(year, month + 1, 0)),
    };
  }

  if (period === "last_month") {
    return {
      from: new Date(year, month - 1, 1),
      to: endOfDay(new Date(year, month, 0)),
    };
  }

  if (period === "last_3_months") {
    return {
      from: new Date(year, month - 2, 1),
      to: endOfDay(new Date(year, month + 1, 0)),
    };
  }

  if (period === "this_year") {
    return {
      from: new Date(year, 0, 1),
      to: endOfDay(new Date(year, 11, 31)),
    };
  }

  const from = customRange.from ? toDate(customRange.from) : new Date(year, month, 1);
  const to = customRange.to ? endOfDay(toDate(customRange.to) ?? current) : endOfDay(current);

  return {
    from: from ?? new Date(year, month, 1),
    to,
  };
}

export function isMovementInsidePeriod(
  movement: MockFinanceMovement,
  period: FinancePeriod,
  customRange: FinanceCustomRange
) {
  const date = getMovementOperationalDate(movement);
  const { from, to } = getFinancePeriodRange(period, customRange);

  return date >= from && date <= to;
}

export function formatFinancePeriodRange(period: FinancePeriod, customRange: FinanceCustomRange) {
  const { from, to } = getFinancePeriodRange(period, customRange);

  return `${from.toLocaleDateString("es-PE")} - ${to.toLocaleDateString("es-PE")}`;
}
