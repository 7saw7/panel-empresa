import { StatusBadge } from "@/components/ui/StatusBadge";
import { getPriorityLabel, type MockPriority } from "@/mocks";

type ProjectPriorityBadgeProps = {
  priority: MockPriority;
};

export function ProjectPriorityBadge({ priority }: ProjectPriorityBadgeProps) {
  const toneByPriority: Record<MockPriority, "default" | "success" | "warning" | "danger" | "info"> = {
    low: "default",
    medium: "info",
    high: "warning",
    urgent: "danger",
  };

  return <StatusBadge label={getPriorityLabel(priority)} tone={toneByPriority[priority]} />;
}
