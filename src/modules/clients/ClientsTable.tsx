import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getClients, deleteClient } from './clients.service';
import type { Client } from './clients.types';
import { Table } from '@/components/ui/Table';
import { Card } from '@/components/ui';

export function ClientsTable({
  search,
  onEdit,
}: {
  search: string;
  onEdit: (client: Client) => void;
}) {  
  const queryClient = useQueryClient();

  const { data = [], isLoading } = useQuery({
    queryKey: ['clients', search],
    queryFn: () => getClients(search),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteClient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
    },
  });

  if (isLoading) return <p>Cargando...</p>;

  return (
    <Card>
      <Table>
        <thead className="bg-gray-50 text-sm">
          <tr>
            <th className="p-2 text-left">Nombre</th>
            <th className="p-2 text-left">Razon Social</th>
            <th className="p-2 text-left">RFC</th>
            <th className="p-2 text-left">Teléfono</th>
            <th className="p-2 text-left">Correo</th>
            <th className="p-2 text-right w-32">Acciones</th>
          </tr>
        </thead>

        <tbody>
          {data.map((c) => (
            <tr key={c.id} className="border-t text-sm">
              <td className="p-2">{c.name}</td>
              <td className="p-2">{c.business_name}</td>
              <td className="p-2">{c.rfc}</td>
              <td className="p-2">{c.phone}</td>
              <td className="p-2">{c.email}</td>
              <td className="p-2 text-right space-x-2">
                <button
                  onClick={() => onEdit(c)}
                  className="text-blue-600"
                >
                  Editar
                </button>

                <button
                  onClick={() => {
                    if (confirm(`¿Eliminar el cliente "${c.name}"?`)) {
                      deleteMutation.mutate(c.id);
                    }
                  }}
                  className="text-red-600"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Card>
  );
}
