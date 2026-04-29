import { StatusBadge } from "@/components/ui/StatusBadge";
import type { MockEvidenceType } from "@/mocks";

type EvidenceTypeBadgeProps = {
  type: MockEvidenceType;
};

const labels: Record<MockEvidenceType, string> = {
  photo: "Foto",
  document: "Documento",
  invoice: "Comprobante",
  signature: "Firma",
  report: "Reporte",
};

export function EvidenceTypeBadge({ type }: EvidenceTypeBadgeProps) {
  return <StatusBadge label={labels[type]} tone="info" />;
}
