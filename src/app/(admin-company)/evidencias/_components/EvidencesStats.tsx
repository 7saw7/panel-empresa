import { StatCard } from "@/components/ui/StatCard";
import { formatNumber, type MockEvidence } from "@/mocks";

type EvidencesStatsProps = {
  evidences: MockEvidence[];
};

export function EvidencesStats({ evidences }: EvidencesStatsProps) {
  const total = evidences.length;
  const pending = evidences.filter((evidence) => evidence.status === "pending_review").length;
  const approved = evidences.filter((evidence) => evidence.status === "approved").length;
  const rejected = evidences.filter((evidence) => evidence.status === "rejected").length;
  const clientVisible = evidences.filter((evidence) => evidence.visibility === "client_visible").length;

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
      <StatCard label="Total evidencias" value={formatNumber(total)} helper="Archivos registrados" />
      <StatCard label="Pendientes" value={formatNumber(pending)} helper="Requieren revisión" />
      <StatCard label="Aprobadas" value={formatNumber(approved)} helper="Validadas internamente" />
      <StatCard label="Rechazadas" value={formatNumber(rejected)} helper="Con observaciones" />
      <StatCard label="Visibles cliente" value={formatNumber(clientVisible)} helper="Marcadas para compartir" />
    </div>
  );
}
