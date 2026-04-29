import { Button } from "@/components/ui/Button";
import { formatDate, type MockEvidence } from "@/mocks";
import { EvidenceStatusBadge } from "./EvidenceStatusBadge";
import { EvidenceTypeBadge } from "./EvidenceTypeBadge";

type EvidencesGridProps = {
  evidences: MockEvidence[];
  onView: (evidence: MockEvidence) => void;
  onApprove: (evidence: MockEvidence) => void;
  onReject: (evidence: MockEvidence) => void;
};

function getPreviewLabel(evidence: MockEvidence) {
  if (evidence.type === "photo") return "Vista foto";
  if (evidence.type === "invoice") return "Comprobante";
  if (evidence.type === "signature") return "Firma";
  return "Documento";
}

export function EvidencesGrid({ evidences, onView, onApprove, onReject }: EvidencesGridProps) {
  if (evidences.length === 0) return null;

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {evidences.map((evidence) => (
        <article key={evidence.id} className="rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm">
          <div className="flex h-32 items-center justify-center rounded-2xl border border-dashed border-neutral-200 bg-neutral-50 text-sm font-medium text-neutral-500">
            {getPreviewLabel(evidence)}
          </div>

          <div className="mt-4 space-y-3">
            <div className="flex flex-wrap gap-2">
              <EvidenceTypeBadge type={evidence.type} />
              <EvidenceStatusBadge status={evidence.status} />
            </div>

            <div>
              <h3 className="text-base font-semibold text-neutral-950">{evidence.title}</h3>
              <p className="mt-1 text-sm text-neutral-500">{evidence.fileName}</p>
            </div>

            <div className="space-y-1 text-sm text-neutral-600">
              <p><span className="font-medium text-neutral-800">Proyecto:</span> {evidence.projectName}</p>
              <p><span className="font-medium text-neutral-800">Cliente:</span> {evidence.clientName}</p>
              <p><span className="font-medium text-neutral-800">Subida:</span> {formatDate(evidence.uploadedAt)}</p>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              <Button type="button" size="sm" variant="secondary" onClick={() => onView(evidence)}>Ver detalle</Button>
              <Button type="button" size="sm" variant="ghost" disabled={evidence.status === "approved"} onClick={() => onApprove(evidence)}>Aprobar</Button>
              <Button type="button" size="sm" variant="ghost" disabled={evidence.status === "rejected"} onClick={() => onReject(evidence)}>Rechazar</Button>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
