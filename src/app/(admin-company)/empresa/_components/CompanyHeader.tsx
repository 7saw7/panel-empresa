import { Button } from "@/components/ui/Button";

type CompanyHeaderProps = {
  saveState: "idle" | "saved";
  onSave: () => void;
  onPreview: () => void;
};

export function CompanyHeader({ saveState, onSave, onPreview }: CompanyHeaderProps) {
  return (
    <div className="flex flex-col gap-4 rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm font-medium text-neutral-500">Configuración</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-neutral-950">
          Perfil de empresa
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-500">
          Administra la información comercial, horarios, contacto y datos legales que se usarán en la vista pública mock del negocio.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {saveState === "saved" ? (
          <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
            Cambios guardados
          </span>
        ) : null}
        <Button type="button" variant="secondary" onClick={onPreview}>
          Vista previa
        </Button>
        <Button type="button" onClick={onSave}>
          Guardar cambios
        </Button>
      </div>
    </div>
  );
}
