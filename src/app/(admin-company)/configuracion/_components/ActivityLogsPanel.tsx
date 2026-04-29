import { DataTable, type DataTableColumn } from "@/components/ui/DataTable";
import { SectionCard } from "@/components/ui/SectionCard";
import type { MockActivityLog } from "@/mocks";

type ActivityLogsPanelProps = {
  logs: MockActivityLog[];
};

export function ActivityLogsPanel({ logs }: ActivityLogsPanelProps) {
  const columns: DataTableColumn<MockActivityLog>[] = [
    {
      key: "user",
      header: "Usuario",
      render: (log) => <span className="font-medium text-neutral-900">{log.userName}</span>,
    },
    {
      key: "action",
      header: "Acción",
      render: (log) => <span className="text-neutral-700">{log.action}</span>,
    },
    {
      key: "module",
      header: "Módulo",
      render: (log) => <span className="text-neutral-600">{log.module}</span>,
    },
    {
      key: "createdAt",
      header: "Fecha",
      render: (log) => <span className="text-neutral-500">{log.createdAt}</span>,
    },
  ];

  return (
    <SectionCard title="Actividad" description="Registro mock de acciones recientes del equipo.">
      <DataTable data={logs} columns={columns} getRowKey={(log) => String(log.id)} />
    </SectionCard>
  );
}
