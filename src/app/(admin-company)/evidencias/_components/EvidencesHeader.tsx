import { Button } from "@/components/ui/Button";

type EvidencesHeaderProps = {
  onUpload: () => void;
  onExport: () => void;
};

export function EvidencesHeader({ onUpload, onExport }: EvidencesHeaderProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-sm font-medium text-neutral-500">Operación</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-neutral-950">Evidencias</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-600">
          Gestiona fotos, documentos, comprobantes y reportes asociados a proyectos, clientes y técnicos.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button type="button" variant="secondary" onClick={onExport}>Exportar mock</Button>
        <Button type="button" onClick={onUpload}>Subir evidencia</Button>
      </div>
    </div>
  );
}
