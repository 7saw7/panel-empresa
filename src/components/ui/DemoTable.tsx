type DemoTableProps<T> = {
  columns: {
    label: string;
    render: (item: T) => React.ReactNode;
  }[];
  data: T[];
};

export function DemoTable<T>({ columns, data }: DemoTableProps<T>) {
  return (
    <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
      <table className="w-full text-sm">
        <thead className="bg-neutral-50 text-left text-neutral-500">
          <tr>
            {columns.map((column) => (
              <th key={column.label} className="px-5 py-3 font-medium">
                {column.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-neutral-100">
          {data.map((item, index) => (
            <tr key={index} className="hover:bg-neutral-50">
              {columns.map((column) => (
                <td key={column.label} className="px-5 py-4 text-neutral-700">
                  {column.render(item)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}