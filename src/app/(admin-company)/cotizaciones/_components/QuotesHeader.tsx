import { Button } from "@/components/ui/Button";

type QuotesHeaderProps = {
  onCreateQuote: () => void;
};

export function QuotesHeader({ onCreateQuote }: QuotesHeaderProps) {
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <p className="text-sm font-medium text-neutral-500">Ventas</p>
        <h1 className="text-3xl font-semibold tracking-tight text-neutral-950">
          Cotizaciones
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-500">
          Crea propuestas comerciales con servicios predefinidos, totales automáticos, estados de seguimiento y conversión a proyecto.
        </p>
      </div>

      <Button type="button" onClick={onCreateQuote}>
        Nueva cotización
      </Button>
    </header>
  );
}
