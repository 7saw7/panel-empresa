import { Button } from "@/components/ui/Button";

type QuotesHeaderProps = {
  onCreateQuote: () => void;
};

export function QuotesHeader({ onCreateQuote }: QuotesHeaderProps) {
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-neutral-950">
          Cotizaciones
        </h1>
        <p className="mt-1 text-sm leading-6 text-neutral-500">
          Crea, revisa y simula el seguimiento comercial de propuestas antes de convertirlas en proyectos.
        </p>
      </div>

      <Button type="button" onClick={onCreateQuote}>
        Nueva cotización
      </Button>
    </header>
  );
}
