import { StatusBadge } from "@/components/ui/StatusBadge";
import { getStatusLabel, type MockTechnicianStatus } from "@/mocks";

type TechnicianStatusBadgeProps = {
  status: MockTechnicianStatus;
};

export function TechnicianStatusBadge({ status }: TechnicianStatusBadgeProps) {
  const toneByStatus: Record<MockTechnicianStatus, "default" | "success" | "warning" | "danger" | "info"> = {
    available: "success",
    busy: "info",
    offline: "warning",
    inactive: "danger",
  };

  return <StatusBadge label={getStatusLabel(status)} tone={toneByStatus[status]} />;
}
