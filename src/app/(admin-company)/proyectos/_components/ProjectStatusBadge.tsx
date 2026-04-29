import { StatusBadge } from "@/components/ui/StatusBadge";
import { getStatusLabel, type MockProjectStatus } from "@/mocks";

type ProjectStatusBadgeProps = {
  status: MockProjectStatus;
};

export function ProjectStatusBadge({ status }: ProjectStatusBadgeProps) {
  const toneByStatus: Record<MockProjectStatus, "default" | "success" | "warning" | "danger" | "info"> = {
    pending: "warning",
    scheduled: "info",
    in_progress: "info",
    paused: "warning",
    completed: "success",
    cancelled: "danger",
  };

  return <StatusBadge label={getStatusLabel(status)} tone={toneByStatus[status]} />;
}
