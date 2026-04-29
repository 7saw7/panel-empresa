import { StatusBadge } from "@/components/ui/StatusBadge";
import type { MockFinanceMovementType } from "@/mocks";

type FinanceTypeBadgeProps = {
  type: MockFinanceMovementType;
};

export function FinanceTypeBadge({ type }: FinanceTypeBadgeProps) {
  return <StatusBadge label={type === "income" ? "Ingreso" : "Egreso"} tone={type === "income" ? "success" : "warning"} />;
}
