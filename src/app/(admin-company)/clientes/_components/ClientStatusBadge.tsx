import { StatusBadge } from "@/components/ui/StatusBadge";
import { getStatusLabel } from "@/mocks";
import type { MockClientStatus } from "@/mocks";

type ClientStatusBadgeProps = {
  status: MockClientStatus;
};

const statusTone: Record<MockClientStatus, "success" | "warning" | "info" | "default"> = {
  active: "success",
  inactive: "default",
  prospect: "warning",
  with_project: "info",
};

export function ClientStatusBadge({ status }: ClientStatusBadgeProps) {
  return <StatusBadge label={getStatusLabel(status)} tone={statusTone[status]} />;
}
