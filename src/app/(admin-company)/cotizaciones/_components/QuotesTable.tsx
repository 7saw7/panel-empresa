import { Button } from "@/components/ui/Button";
import { DataTable, type DataTableColumn } from "@/components/ui/DataTable";
import { formatCurrency, formatDate } from "@/mocks";
import type { MockQuote } from "@/mocks";
import { QuoteStatusBadge } from "./QuoteStatusBadge";

type QuotesTableProps = {
  quotes: MockQuote[];
  onView: (quote: MockQuote) => void;
  onEdit: (quote: MockQuote) => void;
  onPreview: (quote: MockQuote) => void;
  onDuplicate: (quote: MockQuote) => void;
  onSend: (quote: MockQuote) => void;
  onApprove: (quote: MockQuote) => void;
  onConvertToProject: (quote: MockQuote) => void;
};

export function QuotesTable({
  quotes,
  onView,
  onEdit,
  onPreview,
  onDuplicate,
  onSend,
  onApprove,
  onConvertToProject,
}: QuotesTableProps) {
  const columns: Array<DataTableColumn<MockQuote>> = [
    {
      key: "code",
      header: "Cotización",
      render: (quote) => (
        <div>
          <p className="font-medium text-neutral-950">{quote.code}</p>
          <p className="text-xs text-neutral-500">{quote.service}</p>
        </div>
      ),
    },
    {
      key: "client",
      header: "Cliente",
      render: (quote) => quote.clientName,
    },
    {
      key: "dates",
      header: "Fechas",
      render: (quote) => (
        <div>
          <p>Emisión: {formatDate(quote.issueDate)}</p>
          <p className="text-xs text-neutral-500">Vence: {formatDate(quote.expirationDate)}</p>
        </div>
      ),
    },
    {
      key: "status",
      header: "Estado",
      render: (quote) => <QuoteStatusBadge status={quote.status} />,
    },
    {
      key: "total",
      header: "Total",
      render: (quote) => (
        <div>
          <p className="font-medium text-neutral-950">{formatCurrency(quote.total)}</p>
          <p className="text-xs text-neutral-500">IGV: {formatCurrency(quote.tax)}</p>
        </div>
      ),
    },
    {
      key: "responsible",
      header: "Responsable",
      render: (quote) => quote.responsible,
    },
    {
      key: "actions",
      header: "Acciones",
      className: "min-w-80",
      render: (quote) => (
        <div className="flex flex-wrap gap-2">
          <Button type="button" size="sm" variant="secondary" onClick={() => onView(quote)}>
            Ver
          </Button>
          <Button type="button" size="sm" variant="ghost" onClick={() => onEdit(quote)}>
            Editar
          </Button>
          <Button type="button" size="sm" variant="ghost" onClick={() => onPreview(quote)}>
            Vista previa
          </Button>
          <Button type="button" size="sm" variant="ghost" onClick={() => onDuplicate(quote)}>
            Duplicar
          </Button>
          <Button type="button" size="sm" variant="ghost" onClick={() => onSend(quote)}>
            Enviar
          </Button>
          <Button type="button" size="sm" variant="ghost" onClick={() => onApprove(quote)}>
            Aprobar
          </Button>
          <Button type="button" size="sm" variant="ghost" onClick={() => onConvertToProject(quote)}>
            Crear proyecto
          </Button>
        </div>
      ),
    },
  ];

  return (
    <DataTable
      data={quotes}
      columns={columns}
      getRowKey={(quote) => String(quote.id)}
      caption="Listado de cotizaciones"
      emptyTitle="No se encontraron cotizaciones"
      emptyDescription="Ajusta los filtros o crea una nueva cotización mock."
    />
  );
}
