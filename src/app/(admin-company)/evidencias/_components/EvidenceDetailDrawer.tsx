import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { SectionCard } from "@/components/ui/SectionCard";
import { formatDate, type MockEvidence } from "@/mocks";
import { EvidenceStatusBadge } from "./EvidenceStatusBadge";
import { EvidenceTypeBadge } from "./EvidenceTypeBadge";

type EvidenceDetailDrawerProps = {
  open: boolean;
  evidence: MockEvidence | null;
  onClose: () => void;
  onApprove: (evidence: MockEvidence) => void;
  onReject: (evidence: MockEvidence) => void;
  onArchive: (evidence: MockEvidence) => void;
  onDownload: (evidence: MockEvidence) => void;
};

export function EvidenceDetailDrawer({ open, evidence, onClose, onApprove, onReject, onArchive, onDownload }: EvidenceDetailDrawerProps) {
  return (
    <Modal
      open={open}
      title={evidence ? evidence.title : "Detalle de evidencia"}
      description={evidence ? evidence.fileName : undefined}
      onClose={onClose}
      footer={
        evidence ? (
          <div className="flex flex-wrap justify-end gap-2">
            <Button type="button" variant="secondary" onClick={() => onDownload(evidence)}>Descargar mock</Button>
            <Button type="button" variant="ghost" disabled={evidence.status === "approved"} onClick={() => onApprove(evidence)}>Aprobar</Button>
            <Button type="button" variant="ghost" disabled={evidence.status === "rejected"} onClick={() => onReject(evidence)}>Rechazar</Button>
            <Button type="button" variant="ghost" disabled={evidence.status === "archived"} onClick={() => onArchive(evidence)}>Archivar</Button>
          </div>
        ) : null
      }
    >
      {evidence ? (
        <div className="space-y-5">
          <div className="flex h-44 items-center justify-center rounded-3xl border border-dashed border-neutral-200 bg-neutral-50 text-sm font-medium text-neutral-500">
            Vista previa mock: {evidence.fileName}
          </div>

          <div className="flex flex-wrap gap-2">
            <EvidenceTypeBadge type={evidence.type} />
            <EvidenceStatusBadge status={evidence.status} />
            <span className="inline-flex rounded-full border border-neutral-200 bg-neutral-50 px-2.5 py-1 text-xs font-medium text-neutral-700">
              {evidence.visibility === "client_visible" ? "Visible para cliente" : "Solo interno"}
            </span>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <SectionCard title="Proyecto">
              <div className="space-y-2 text-sm text-neutral-600">
                <p><span className="font-medium text-neutral-900">Proyecto:</span> {evidence.projectName}</p>
                <p><span className="font-medium text-neutral-900">Cliente:</span> {evidence.clientName}</p>
                <p><span className="font-medium text-neutral-900">Técnico:</span> {evidence.technicianName}</p>
              </div>
            </SectionCard>

            <SectionCard title="Carga y revisión">
              <div className="space-y-2 text-sm text-neutral-600">
                <p><span className="font-medium text-neutral-900">Subido por:</span> {evidence.uploadedBy}</p>
                <p><span className="font-medium text-neutral-900">Fecha:</span> {formatDate(evidence.uploadedAt)}</p>
                <p><span className="font-medium text-neutral-900">Revisado por:</span> {evidence.reviewedBy ?? "Pendiente"}</p>
                <p><span className="font-medium text-neutral-900">Revisión:</span> {evidence.reviewedAt ? formatDate(evidence.reviewedAt) : "Pendiente"}</p>
              </div>
            </SectionCard>
          </div>

          <SectionCard title="Comentarios internos" description="Observaciones de revisión asociadas a esta evidencia.">
            {evidence.comments.length > 0 ? (
              <div className="space-y-3">
                {evidence.comments.map((comment) => (
                  <div key={comment.id} className="rounded-2xl border border-neutral-200 bg-neutral-50 p-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="text-sm font-medium text-neutral-950">{comment.author}</p>
                      <p className="text-xs text-neutral-500">{formatDate(comment.createdAt)}</p>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-neutral-600">{comment.message}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-neutral-500">No hay comentarios registrados.</p>
            )}
          </SectionCard>
        </div>
      ) : null}
    </Modal>
  );
}
