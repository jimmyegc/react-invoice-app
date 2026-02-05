import { Card, Button, Table } from '@/components/ui';
import { useCities } from '@/hooks/useCities';
import { useState } from 'react';
import { CityFormModal } from './CityFormModal';
import { deleteCity } from '@/services/cities.service';
import { useQueryClient } from '@tanstack/react-query';

export function CitiesAdminPage() {
  const { data = [], isLoading } = useCities();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const queryClient = useQueryClient();

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-lg font-semibold">Ciudades</h1>
        <Button onClick={() => { setEditing(null); setOpen(true); }}>
          Nueva ciudad
        </Button>
      </div>

      {isLoading ? (
        <p className="text-sm text-gray-500">Cargando…</p>
      ) : (
        <Table>
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Ciudad</th>
              <th className="p-2 text-left">Estado</th>
              <th className="p-2 text-left">País</th>
              <th className="p-2 text-right">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {data.map((city) => (
              <tr key={city.id} className="border-t">
                <td className="p-2">{city.name}</td>
                <td className="p-2">{city.state[0].name}</td>
                <td className="p-2">{city.state[0].country[0].name}</td>
                <td className="p-2 text-right space-x-2">
                  <button
                    className="text-sm text-blue-600 hover:underline"
                    onClick={() => {
                      setEditing(city);
                      setOpen(true);
                    }}
                  >
                    Editar
                  </button>
                  <button
                    className="text-sm text-red-600 hover:underline"
                    onClick={async () => {
                      await deleteCity(city.id);
                      queryClient.invalidateQueries({ queryKey: ['cities'] });
                    }}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <CityFormModal
        key={editing?.id ?? 'new'}
        open={open}
        city={editing}
        onClose={() => {
          setOpen(false);
          setEditing(null);
        }}
      />
    </Card>
  );
}
