import { StatusBadge } from "@/components/ui/StatusBadge";
import { getStatusLabel, type MockFinanceStatus } from "@/mocks";

type FinanceStatusBadgeProps = {
  status: MockFinanceStatus;
};

export function FinanceStatusBadge({ status }: FinanceStatusBadgeProps) {
  const tone =
    status === "paid" ? "success" : status === "pending" ? "warning" : status === "overdue" ? "danger" : "default";

  return <StatusBadge label={getStatusLabel(status)} tone={tone} />;
}
