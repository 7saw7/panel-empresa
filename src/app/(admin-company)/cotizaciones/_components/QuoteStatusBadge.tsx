import { StatusBadge } from "@/components/ui/StatusBadge";
import { getStatusLabel } from "@/mocks";
import type { MockQuoteStatus } from "@/mocks";

type QuoteStatusBadgeProps = {
  status: MockQuoteStatus;
};

const statusTone: Record<MockQuoteStatus, "default" | "success" | "warning" | "danger" | "info"> = {
  draft: "default",
  sent: "info",
  approved: "success",
  rejected: "danger",
  expired: "warning",
};

export function QuoteStatusBadge({ status }: QuoteStatusBadgeProps) {
  return <StatusBadge label={getStatusLabel(status)} tone={statusTone[status]} />;
}
