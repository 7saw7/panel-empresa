import { StatusBadge } from "@/components/ui/StatusBadge";
import { getStatusLabel, type MockInventoryStatus } from "@/mocks";

type InventoryStatusBadgeProps = {
  status: MockInventoryStatus;
};

export function InventoryStatusBadge({ status }: InventoryStatusBadgeProps) {
  const tone = status === "available" ? "success" : status === "low_stock" ? "warning" : "danger";
  return <StatusBadge label={getStatusLabel(status)} tone={tone} />;
}
