import { Button } from "@/components/ui/Button";
import { SectionCard } from "@/components/ui/SectionCard";
import { formatCurrency, formatDate, getStatusLabel } from "@/mocks";
import type { MockClient, MockProject, MockQuote, MockTimelineEvent } from "@/mocks";
import { ClientStatusBadge } from "./ClientStatusBadge";

type ClientDetailDrawerProps = {
  client: MockClient | null;
  open: boolean;
  quotes: MockQuote[];
  projects: MockProject[];
  timeline: MockTimelineEvent[];
  onClose: () => void;
  onEdit: (client: MockClient) => void;
  onCreateQuote: (client: MockClient) => void;
};

export function ClientDetailDrawer({
  client,
  open,
  quotes,
  projects,
  timeline,
  onClose,
  onEdit,
  onCreateQuote,
}: ClientDetailDrawerProps) {
  if (!open || !client) return null;

  return (
    <div className="fixed inset-0 z-40 bg-black/40" onMouseDown={(event) => {
      if (event.target === event.currentTarget) onClose();
    }}>
      <aside className="ml-auto flex h-full w-full max-w-2xl flex-col overflow-hidden bg-white shadow-2xl">
        <div className="border-b border-neutral-200 px-6 py-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-neutral-500">Detalle del cliente</p>
              <h2 className="mt-1 text-xl font-semibold tracking-tight text-neutral-950">
                {client.name}
              </h2>
            </div>
            <Button type="button" variant="ghost" onClick={onClose}>
              Cerrar
            </Button>
          </div>
        </div>

        <div className="flex-1 space-y-5 overflow-y-auto p-6">
          <SectionCard>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <ClientStatusBadge status={client.status} />
                <p className="mt-4 text-sm text-neutral-500">Contacto</p>
                <p className="font-medium text-neutral-950">{client.contactName}</p>
                <p className="text-sm text-neutral-600">{client.phone}</p>
                <p className="text-sm text-neutral-600">{client.email}</p>
              </div>
              <div className="text-sm text-neutral-600 sm:text-right">
                <p>{client.type}</p>
                <p>{client.district}</p>
                {client.address ? <p>{client.address}</p> : null}
                <p className="mt-3">Registrado: {formatDate(client.createdAt)}</p>
              </div>
            </div>

            {client.notes ? (
              <div className="mt-5 rounded-2xl bg-neutral-50 p-4 text-sm leading-6 text-neutral-600">
                {client.notes}
              </div>
            ) : null}

            <div className="mt-5 flex flex-wrap gap-2">
              {client.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700">
                  {tag}
                </span>
              ))}
            </div>
          </SectionCard>

          <div className="grid gap-5 lg:grid-cols-2">
            <SectionCard title="Cotizaciones relacionadas">
              {quotes.length > 0 ? (
                <div className="space-y-3">
                  {quotes.map((quote) => (
                    <div key={quote.id} className="rounded-2xl border border-neutral-200 p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-medium text-neutral-950">{quote.code}</p>
                          <p className="text-sm text-neutral-500">{quote.service}</p>
                        </div>
                        <span className="text-sm font-semibold text-neutral-950">{formatCurrency(quote.total)}</span>
                      </div>
                      <p className="mt-2 text-xs text-neutral-500">Estado: {getStatusLabel(quote.status)}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-neutral-500">Sin cotizaciones asociadas.</p>
              )}
            </SectionCard>

            <SectionCard title="Proyectos relacionados">
              {projects.length > 0 ? (
                <div className="space-y-3">
                  {projects.map((project) => (
                    <div key={project.id} className="rounded-2xl border border-neutral-200 p-4">
                      <p className="font-medium text-neutral-950">{project.code}</p>
                      <p className="text-sm text-neutral-500">{project.name}</p>
                      <div className="mt-3 h-2 overflow-hidden rounded-full bg-neutral-100">
                        <div className="h-full rounded-full bg-neutral-950" style={{ width: `${project.progress}%` }} />
                      </div>
                      <p className="mt-2 text-xs text-neutral-500">Avance {project.progress}%</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-neutral-500">Sin proyectos asociados.</p>
              )}
            </SectionCard>
          </div>

          <SectionCard title="Historial comercial">
            {timeline.length > 0 ? (
              <div className="space-y-4">
                {timeline.map((event) => (
                  <div key={event.id} className="border-l-2 border-neutral-200 pl-4">
                    <p className="font-medium text-neutral-950">{event.title}</p>
                    {event.description ? <p className="mt-1 text-sm text-neutral-600">{event.description}</p> : null}
                    <p className="mt-1 text-xs text-neutral-500">{event.createdAt}{event.createdBy ? ` · ${event.createdBy}` : ""}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-neutral-500">Sin actividad reciente.</p>
            )}
          </SectionCard>
        </div>

        <div className="flex flex-wrap justify-end gap-2 border-t border-neutral-200 px-6 py-4">
          <Button type="button" variant="secondary" onClick={() => onCreateQuote(client)}>
            Crear cotización
          </Button>
          <Button type="button" onClick={() => onEdit(client)}>
            Editar cliente
          </Button>
        </div>
      </aside>
    </div>
  );
}
