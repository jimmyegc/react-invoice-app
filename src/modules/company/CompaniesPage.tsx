import { useEffect, useState } from 'react';
import { useCompanies, CompanyPayload } from './useCompany';
import { CompanyFormModal } from './CompanyFormModal';

export function CompaniesPage() {
  const { getCompanies, createCompany, updateCompany, deleteCompany } =
    useCompanies();

  const [companies, setCompanies] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any | null>(null);

  const loadData = async () => {
    const data = await getCompanies();
    setCompanies(data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = async (data: CompanyPayload) => {
    if (editing) {
      await updateCompany(editing.id, data);
    } else {
      await createCompany(data);
    }

    setOpen(false);
    setEditing(null);
    loadData();
  };

  return (
    <>
      <button onClick={() => setOpen(true)}>
        Nueva empresa
      </button>

      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Ciudad</th>
            <th>País</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {companies.map((c) => (
            <tr key={c.id}>
              <td>{c.name}</td>
              <td>{c.city}</td>
              <td>{c.country}</td>
              <td>
                <button
                  onClick={() => {
                    setEditing(c);
                    setOpen(true);
                  }}
                >
                  Editar
                </button>

                <button onClick={() => deleteCompany(c.id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <CompanyFormModal
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
