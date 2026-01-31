// components/ui/Table.tsx
type Column<T> = {
  key: keyof T;
  label: string;
};

export function Table<T>({
  columns,
  data,
  onEdit,
}: {
  columns: Column<T>[];
  data: T[];
  onEdit: (row: T) => void;
}) {
  return (
    <table className="w-full border rounded">
      <thead className="bg-gray-100">
        <tr>
          {columns.map(col => (
            <th key={String(col.key)} className="p-2 text-left">
              {col.label}
            </th>
          ))}
          <th />
        </tr>
      </thead>
      <tbody>
        {data.map((row: any) => (
          <tr key={row.id} className="border-t">
            {columns.map(col => (
              <td key={String(col.key)} className="p-2">
                {row[col.key]}
              </td>
            ))}
            <td className="p-2 text-right">
              <button
                onClick={() => onEdit(row)}
                className="text-sm text-blue-600"
              >
                Editar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
