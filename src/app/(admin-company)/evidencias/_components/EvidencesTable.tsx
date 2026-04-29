import { Button } from "@/components/ui/Button";
import { DataTable, type DataTableColumn } from "@/components/ui/DataTable";
import { formatDate, type MockEvidence } from "@/mocks";
import { EvidenceStatusBadge } from "./EvidenceStatusBadge";
import { EvidenceTypeBadge } from "./EvidenceTypeBadge";

type EvidencesTableProps = {
  evidences: MockEvidence[];
  onView: (evidence: MockEvidence) => void;
  onApprove: (evidence: MockEvidence) => void;
  onReject: (evidence: MockEvidence) => void;
  onArchive: (evidence: MockEvidence) => void;
  onDownload: (evidence: MockEvidence) => void;
  onDelete: (evidence: MockEvidence) => void;
};

export function EvidencesTable({ evidences, onView, onApprove, onReject, onArchive, onDownload, onDelete }: EvidencesTableProps) {
  const columns: Array<DataTableColumn<MockEvidence>> = [
    {
      key: "file",
      header: "Archivo",
      render: (evidence) => (
        <div>
          <p className="font-medium text-neutral-950">{evidence.title}</p>
          <p className="text-xs text-neutral-500">{evidence.fileName}</p>
        </div>
      ),
    },
    { key: "type", header: "Tipo", render: (evidence) => <EvidenceTypeBadge type={evidence.type} /> },
    {
      key: "project",
      header: "Proyecto / cliente",
      render: (evidence) => (
        <div>
          <p className="text-neutral-800">{evidence.projectName}</p>
          <p className="text-xs text-neutral-500">{evidence.clientName}</p>
        </div>
      ),
    },
    { key: "technician", header: "Técnico", render: (evidence) => evidence.technicianName },
    { key: "status", header: "Estado", render: (evidence) => <EvidenceStatusBadge status={evidence.status} /> },
    {
      key: "visibility",
      header: "Visibilidad",
      render: (evidence) => evidence.visibility === "client_visible" ? "Visible cliente" : "Solo interno",
    },
    { key: "uploadedAt", header: "Subida", render: (evidence) => formatDate(evidence.uploadedAt) },
    {
      key: "actions",
      header: "Acciones",
      className: "w-[25rem]",
      render: (evidence) => (
        <div className="flex flex-wrap gap-2">
          <Button type="button" size="sm" variant="secondary" onClick={() => onView(evidence)}>Ver</Button>
          <Button type="button" size="sm" variant="ghost" disabled={evidence.status === "approved"} onClick={() => onApprove(evidence)}>Aprobar</Button>
          <Button type="button" size="sm" variant="ghost" disabled={evidence.status === "rejected"} onClick={() => onReject(evidence)}>Rechazar</Button>
          <Button type="button" size="sm" variant="ghost" disabled={evidence.status === "archived"} onClick={() => onArchive(evidence)}>Archivar</Button>
          <Button type="button" size="sm" variant="ghost" onClick={() => onDownload(evidence)}>Descargar</Button>
          <Button type="button" size="sm" variant="danger" onClick={() => onDelete(evidence)}>Eliminar</Button>
        </div>
      ),
    },
  ];

  return (
    <DataTable
      data={evidences}
      columns={columns}
      getRowKey={(evidence) => String(evidence.id)}
      caption="Listado de evidencias"
      emptyTitle="No hay evidencias"
      emptyDescription="Ajusta los filtros o sube una evidencia mock para continuar."
    />
  );
}
