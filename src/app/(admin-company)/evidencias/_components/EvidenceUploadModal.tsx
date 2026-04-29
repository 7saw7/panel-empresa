"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import type { MockEvidence, MockEvidenceType, MockEvidenceVisibility } from "@/mocks";

type EvidenceUploadModalProps = {
  open: boolean;
  evidences: MockEvidence[];
  projects: string[];
  onClose: () => void;
  onSubmit: (evidence: MockEvidence) => void;
};

const typeExtension: Record<MockEvidenceType, string> = {
  photo: "jpg",
  document: "pdf",
  invoice: "pdf",
  signature: "pdf",
  report: "pdf",
};

export function EvidenceUploadModal({ open, evidences, projects, onClose, onSubmit }: EvidenceUploadModalProps) {
  const [title, setTitle] = useState("");
  const [type, setType] = useState<MockEvidenceType>("photo");
  const [projectName, setProjectName] = useState(projects[0] ?? "Proyecto mock");
  const [clientName, setClientName] = useState("");
  const [technicianName, setTechnicianName] = useState("");
  const [visibility, setVisibility] = useState<MockEvidenceVisibility>("internal");
  const [note, setNote] = useState("");

  const selectedProjectEvidence = useMemo(
    () => evidences.find((evidence) => evidence.projectName === projectName),
    [evidences, projectName]
  );

  useEffect(() => {
    if (!open) return;
    setTitle("");
    setType("photo");
    setProjectName(projects[0] ?? "Proyecto mock");
    setClientName(selectedProjectEvidence?.clientName ?? "Cliente mock");
    setTechnicianName(selectedProjectEvidence?.technicianName ?? "Técnico mock");
    setVisibility("internal");
    setNote("");
  }, [open, projects, selectedProjectEvidence?.clientName, selectedProjectEvidence?.technicianName]);

  useEffect(() => {
    if (!selectedProjectEvidence) return;
    setClientName(selectedProjectEvidence.clientName);
    setTechnicianName(selectedProjectEvidence.technicianName);
  }, [selectedProjectEvidence]);

  const handleSubmit = () => {
    const nextId = Math.max(...evidences.map((evidence) => evidence.id), 0) + 1;
    const safeTitle = title.trim() || "Nueva evidencia mock";
    const extension = typeExtension[type];
    const fileName = `${safeTitle.toLowerCase().replace(/[^a-z0-9áéíóúñ]+/gi, "-").replace(/^-|-$/g, "")}.${extension}`;

    onSubmit({
      id: nextId,
      title: safeTitle,
      fileName,
      fileUrl: `/mock/evidences/${fileName}`,
      type,
      status: "pending_review",
      visibility,
      projectId: selectedProjectEvidence?.projectId ?? null,
      projectName,
      clientName: clientName.trim() || "Cliente mock",
      technicianName: technicianName.trim() || "Técnico mock",
      uploadedBy: "Admin Principal",
      uploadedAt: new Date().toISOString().slice(0, 16).replace("T", " "),
      reviewedBy: null,
      reviewedAt: null,
      comments: note.trim()
        ? [
            {
              id: nextId * 10,
              author: "Admin Principal",
              message: note.trim(),
              createdAt: new Date().toISOString().slice(0, 16).replace("T", " "),
            },
          ]
        : [],
    });
  };

  return (
    <Modal
      open={open}
      title="Subir evidencia mock"
      description="Registra una evidencia simulada sin cargar archivos reales."
      onClose={onClose}
      footer={
        <div className="flex justify-end gap-2">
          <Button type="button" variant="secondary" onClick={onClose}>Cancelar</Button>
          <Button type="button" onClick={handleSubmit}>Guardar evidencia</Button>
        </div>
      }
    >
      <div className="grid gap-4 md:grid-cols-2">
        <div className="md:col-span-2">
          <Input label="Título" placeholder="Ej. Avance de instalación" value={title} onChange={(event) => setTitle(event.target.value)} />
        </div>

        <Select label="Tipo" value={type} onChange={(event) => setType(event.target.value as MockEvidenceType)}>
          <option value="photo">Foto</option>
          <option value="document">Documento</option>
          <option value="invoice">Comprobante</option>
          <option value="signature">Firma</option>
          <option value="report">Reporte</option>
        </Select>

        <Select label="Visibilidad" value={visibility} onChange={(event) => setVisibility(event.target.value as MockEvidenceVisibility)}>
          <option value="internal">Solo interno</option>
          <option value="client_visible">Visible para cliente</option>
        </Select>

        <Select label="Proyecto asociado" value={projectName} onChange={(event) => setProjectName(event.target.value)}>
          {projects.map((project) => (
            <option key={project} value={project}>{project}</option>
          ))}
        </Select>

        <Input label="Cliente" value={clientName} onChange={(event) => setClientName(event.target.value)} />
        <Input label="Técnico" value={technicianName} onChange={(event) => setTechnicianName(event.target.value)} />

        <div className="md:col-span-2">
          <Textarea
            label="Nota interna"
            placeholder="Observación opcional para revisión"
            rows={4}
            value={note}
            onChange={(event) => setNote(event.target.value)}
          />
        </div>
      </div>
    </Modal>
  );
}
