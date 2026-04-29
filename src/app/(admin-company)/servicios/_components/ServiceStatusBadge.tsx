import { StatusBadge } from "@/components/ui/StatusBadge";
import { getStatusLabel, type MockServiceStatus } from "@/mocks";

type ServiceStatusBadgeProps = { status: MockServiceStatus };

export function ServiceStatusBadge({ status }: ServiceStatusBadgeProps) {
  const tone = status === "active" ? "success" : status === "draft" ? "warning" : "default";
  return <StatusBadge label={getStatusLabel(status)} tone={tone} />;
}
