import { Button } from "@/components/ui/Button";
import { DataTable, type DataTableColumn } from "@/components/ui/DataTable";
import { formatDate } from "@/mocks";
import type { MockClient } from "@/mocks";
import { ClientStatusBadge } from "./ClientStatusBadge";

type ClientsTableProps = {
  clients: MockClient[];
  onView: (client: MockClient) => void;
  onEdit: (client: MockClient) => void;
  onCreateQuote: (client: MockClient) => void;
  onChangeStatus: (client: MockClient) => void;
};

export function ClientsTable({
  clients,
  onView,
  onEdit,
  onCreateQuote,
  onChangeStatus,
}: ClientsTableProps) {
  const columns: Array<DataTableColumn<MockClient>> = [
    {
      key: "client",
      header: "Cliente",
      render: (client) => (
        <div>
          <p className="font-medium text-neutral-950">{client.name}</p>
          <p className="text-xs text-neutral-500">{client.email}</p>
        </div>
      ),
    },
    {
      key: "contact",
      header: "Contacto",
      render: (client) => (
        <div>
          <p>{client.contactName}</p>
          <p className="text-xs text-neutral-500">{client.phone}</p>
        </div>
      ),
    },
    {
      key: "type",
      header: "Tipo",
      render: (client) => client.type,
    },
    {
      key: "district",
      header: "Distrito",
      render: (client) => client.district,
    },
    {
      key: "status",
      header: "Estado",
      render: (client) => <ClientStatusBadge status={client.status} />,
    },
    {
      key: "tags",
      header: "Etiquetas",
      render: (client) => (
        <div className="flex max-w-52 flex-wrap gap-1.5">
          {client.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-neutral-100 px-2 py-1 text-xs font-medium text-neutral-600"
            >
              {tag}
            </span>
          ))}
        </div>
      ),
    },
    {
      key: "createdAt",
      header: "Registro",
      render: (client) => formatDate(client.createdAt),
    },
    {
      key: "actions",
      header: "Acciones",
      className: "min-w-72",
      render: (client) => (
        <div className="flex flex-wrap gap-2">
          <Button type="button" size="sm" variant="secondary" onClick={() => onView(client)}>
            Ver
          </Button>
          <Button type="button" size="sm" variant="ghost" onClick={() => onEdit(client)}>
            Editar
          </Button>
          <Button type="button" size="sm" variant="ghost" onClick={() => onCreateQuote(client)}>
            Cotizar
          </Button>
          <Button type="button" size="sm" variant="ghost" onClick={() => onChangeStatus(client)}>
            Estado
          </Button>
        </div>
      ),
    },
  ];

  return (
    <DataTable
      data={clients}
      columns={columns}
      getRowKey={(client) => String(client.id)}
      caption="Listado de clientes"
      emptyTitle="No se encontraron clientes"
      emptyDescription="Ajusta los filtros o registra un nuevo cliente mock."
    />
  );
}
