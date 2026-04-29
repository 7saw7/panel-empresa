import { StatusBadge } from "@/components/ui/StatusBadge";
import { getStatusLabel, type MockEvidenceStatus } from "@/mocks";

type EvidenceStatusBadgeProps = {
  status: MockEvidenceStatus;
};

const toneByStatus: Record<MockEvidenceStatus, "default" | "success" | "warning" | "danger" | "info"> = {
  pending_review: "warning",
  approved: "success",
  rejected: "danger",
  archived: "default",
};

export function EvidenceStatusBadge({ status }: EvidenceStatusBadgeProps) {
  return <StatusBadge label={getStatusLabel(status)} tone={toneByStatus[status]} />;
}
