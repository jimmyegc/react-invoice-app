import { Card, Button, Table } from '@/components/ui';
import { useCountries } from '@/hooks/useCountries';
import { useState } from 'react';
import { CountryFormModal } from './CountryFormModal';

export function CountriesPage() {
  const { data = [], isLoading } = useCountries();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-lg font-semibold">Países</h1>
        <Button onClick={() => setOpen(true)}>
          Nuevo país
        </Button>
      </div>

      {isLoading ? (
        <p className="text-sm text-gray-500">Cargando...</p>
      ) : (
        <Table>
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">ISO</th>
              <th className="p-2 text-left">Nombre</th>
              <th className="p-2 text-right">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {data.map((country) => (
              <tr key={country.id} className="border-t">
                <td className="p-2">{country.iso}</td>
                <td className="p-2">{country.name}</td>
                <td className="p-2 text-right">
                  <button
                    onClick={() => {
                      setEditing(country);
                      setOpen(true);
                    }}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <CountryFormModal
        open={open}
        country={editing}
        onClose={() => {
          setOpen(false);
          setEditing(null);
        }}
      />
    </Card>
  );
}
