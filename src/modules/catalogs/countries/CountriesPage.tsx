// modules/catalogs/countries/CountriesPage.tsx
import { useEffect, useState } from 'react';
import { useCountries } from './useCountries';
import { CountryFormModal } from './CountryFormModal';

export function CountriesPage() {
  const { getCountries, createCountry, updateCountry, deleteCountry } =
    useCountries();

  const [countries, setCountries] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any | null>(null);

  const loadData = async () => {
    const data = await getCountries();
    setCountries(data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = async (data: { name: string; iso: string }) => {
    if (editing) {
      await updateCountry(editing.id, data);
    } else {
      await createCountry(data);
    }
    setOpen(false);
    setEditing(null);
    loadData();
  };

  return (
    <>
      <button onClick={() => setOpen(true)}>Nuevo país</button>

      <table>
        <thead>
          <tr>
            <th>ISO</th>
            <th>Nombre</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {countries.map((c) => (
            <tr key={c.id}>
              <td>{c.iso}</td>
              <td>{c.name}</td>
              <td>
                <button onClick={() => {
                  setEditing(c);
                  setOpen(true);
                }}>
                  Editar
                </button>

                <button onClick={() => deleteCountry(c.id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <CountryFormModal
        open={open}
        onClose={() => {
          setOpen(false);
          setEditing(null);
        }}
        onSubmit={handleSubmit}
        initialData={editing}
      />
    </>
  );
}
