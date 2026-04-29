"use client";

import { useMemo, useState } from "react";
import {
  evidencesMock,
  type MockEvidence,
  type MockEvidenceStatus,
} from "@/mocks";
import { EvidenceDetailDrawer } from "./_components/EvidenceDetailDrawer";
import { EvidenceUploadModal } from "./_components/EvidenceUploadModal";
import {
  EvidencesFilters,
  type EvidenceStatusFilter,
  type EvidenceTypeFilter,
  type EvidenceVisibilityFilter,
} from "./_components/EvidencesFilters";
import { EvidencesGrid } from "./_components/EvidencesGrid";
import { EvidencesHeader } from "./_components/EvidencesHeader";
import { EvidencesStats } from "./_components/EvidencesStats";
import { EvidencesTable } from "./_components/EvidencesTable";

function withReviewStatus(evidence: MockEvidence, status: MockEvidenceStatus, message?: string): MockEvidence {
  const now = new Date().toISOString().slice(0, 16).replace("T", " ");

  return {
    ...evidence,
    status,
    reviewedBy: status === "pending_review" ? null : "Admin Principal",
    reviewedAt: status === "pending_review" ? null : now,
    comments: message
      ? [
          ...evidence.comments,
          {
            id: evidence.id * 100 + evidence.comments.length + 1,
            author: "Admin Principal",
            message,
            createdAt: now,
          },
        ]
      : evidence.comments,
  };
}

export default function EvidenciasPage() {
  const [evidences, setEvidences] = useState<MockEvidence[]>(evidencesMock);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<EvidenceStatusFilter>("all");
  const [typeFilter, setTypeFilter] = useState<EvidenceTypeFilter>("all");
  const [visibilityFilter, setVisibilityFilter] = useState<EvidenceVisibilityFilter>("all");
  const [projectFilter, setProjectFilter] = useState("all");
  const [selectedEvidence, setSelectedEvidence] = useState<MockEvidence | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  const projects = useMemo(() => {
    const values = new Set(evidences.map((evidence) => evidence.projectName));
    return Array.from(values).sort();
  }, [evidences]);

  const filteredEvidences = useMemo(() => {
    const query = search.trim().toLowerCase();

    return evidences.filter((evidence) => {
      const matchesSearch =
        query.length === 0 ||
        evidence.title.toLowerCase().includes(query) ||
        evidence.fileName.toLowerCase().includes(query) ||
        evidence.projectName.toLowerCase().includes(query) ||
        evidence.clientName.toLowerCase().includes(query) ||
        evidence.technicianName.toLowerCase().includes(query);

      const matchesStatus = statusFilter === "all" || evidence.status === statusFilter;
      const matchesType = typeFilter === "all" || evidence.type === typeFilter;
      const matchesVisibility = visibilityFilter === "all" || evidence.visibility === visibilityFilter;
      const matchesProject = projectFilter === "all" || evidence.projectName === projectFilter;

      return matchesSearch && matchesStatus && matchesType && matchesVisibility && matchesProject;
    });
  }, [evidences, search, statusFilter, typeFilter, visibilityFilter, projectFilter]);

  const showNotice = (message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice(null), 2500);
  };

  const updateEvidence = (evidence: MockEvidence, message: string) => {
    setEvidences((current) => current.map((item) => (item.id === evidence.id ? evidence : item)));
    setSelectedEvidence((current) => (current?.id === evidence.id ? evidence : current));
    showNotice(message);
  };

  const handleViewEvidence = (evidence: MockEvidence) => {
    setSelectedEvidence(evidence);
    setIsDetailOpen(true);
  };

  const handleApproveEvidence = (evidence: MockEvidence) => {
    updateEvidence(
      withReviewStatus(evidence, "approved", "Evidencia aprobada desde el panel mock."),
      "Evidencia aprobada correctamente."
    );
  };

  const handleRejectEvidence = (evidence: MockEvidence) => {
    updateEvidence(
      withReviewStatus(evidence, "rejected", "Evidencia rechazada. Requiere corrección o nueva carga."),
      "Evidencia rechazada correctamente."
    );
  };

  const handleArchiveEvidence = (evidence: MockEvidence) => {
    updateEvidence(
      withReviewStatus(evidence, "archived", "Evidencia archivada manualmente."),
      "Evidencia archivada correctamente."
    );
  };

  const handleDownloadEvidence = (evidence: MockEvidence) => {
    showNotice(`Descarga mock iniciada: ${evidence.fileName}`);
  };

  const handleDeleteEvidence = (evidence: MockEvidence) => {
    setEvidences((current) => current.filter((item) => item.id !== evidence.id));
    setSelectedEvidence((current) => (current?.id === evidence.id ? null : current));
    showNotice("Evidencia eliminada del estado local.");
  };

  const handleSubmitEvidence = (evidence: MockEvidence) => {
    setEvidences((current) => [evidence, ...current]);
    setIsUploadOpen(false);
    showNotice("Evidencia mock registrada correctamente.");
  };

  const handleResetFilters = () => {
    setSearch("");
    setStatusFilter("all");
    setTypeFilter("all");
    setVisibilityFilter("all");
    setProjectFilter("all");
  };

  return (
    <div className="space-y-8">
      <EvidencesHeader
        onUpload={() => setIsUploadOpen(true)}
        onExport={() => showNotice("Reporte de evidencias mock exportado correctamente.")}
      />

      {notice ? (
        <div className="rounded-2xl border border-neutral-200 bg-neutral-950 px-4 py-3 text-sm text-white shadow-sm">
          {notice}
        </div>
      ) : null}

      <EvidencesStats evidences={evidences} />

      <EvidencesFilters
        search={search}
        statusFilter={statusFilter}
        typeFilter={typeFilter}
        visibilityFilter={visibilityFilter}
        projectFilter={projectFilter}
        projects={projects}
        onSearchChange={setSearch}
        onStatusChange={setStatusFilter}
        onTypeChange={setTypeFilter}
        onVisibilityChange={setVisibilityFilter}
        onProjectChange={setProjectFilter}
        onReset={handleResetFilters}
      />

      <EvidencesGrid
        evidences={filteredEvidences.slice(0, 6)}
        onView={handleViewEvidence}
        onApprove={handleApproveEvidence}
        onReject={handleRejectEvidence}
      />

      <EvidencesTable
        evidences={filteredEvidences}
        onView={handleViewEvidence}
        onApprove={handleApproveEvidence}
        onReject={handleRejectEvidence}
        onArchive={handleArchiveEvidence}
        onDownload={handleDownloadEvidence}
        onDelete={handleDeleteEvidence}
      />

      <EvidenceDetailDrawer
        open={isDetailOpen}
        evidence={selectedEvidence}
        onClose={() => setIsDetailOpen(false)}
        onApprove={handleApproveEvidence}
        onReject={handleRejectEvidence}
        onArchive={handleArchiveEvidence}
        onDownload={handleDownloadEvidence}
      />

      <EvidenceUploadModal
        open={isUploadOpen}
        evidences={evidences}
        projects={projects}
        onClose={() => setIsUploadOpen(false)}
        onSubmit={handleSubmitEvidence}
      />
    </div>
  );
}
