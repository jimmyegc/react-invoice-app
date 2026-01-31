// modules/catalogs/states/StatesPage.tsx
import { useEffect, useState } from 'react';
import { useStates } from './useStates';
import { StateFormModal } from './StateFormModal';

export function StatesPage() {
  const { getStates, createState, updateState, deleteState } = useStates();

  const [states, setStates] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any | null>(null);

  const loadData = async () => {
    const data = await getStates();
    setStates(data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = async (data: {
    name: string;
    country_id: number;
  }) => {
    if (editing) {
      await updateState(editing.id, data);
    } else {
      await createState(data);
    }
    setOpen(false);
    setEditing(null);
    loadData();
  };

  return (
    <>
      <button onClick={() => setOpen(true)}>Nuevo estado</button>

      <table>
        <thead>
          <tr>
            <th>Estado</th>
            <th>País</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {states.map((s) => (
            <tr key={s.id}>
              <td>{s.name}</td>
              <td>{s.mvp_countries?.name}</td>
              <td>
                <button
                  onClick={() => {
                    setEditing({
                      id: s.id,
                      name: s.name,
                      country_id: s.country_id,
                    });
                    setOpen(true);
                  }}
                >
                  Editar
                </button>

                <button onClick={() => deleteState(s.id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <StateFormModal
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
