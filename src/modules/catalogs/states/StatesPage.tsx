import { Card, Button, Table } from '@/components/ui';
import { useStates } from '@/hooks/useStates';
import { useState } from 'react';
import { StateFormModal } from './StateFormModal';
import { deleteState } from '@/services/states.service'
import { useQueryClient } from '@tanstack/react-query';

export function StatesPage() {
  const { data = [], isLoading } = useStates();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any | null>(null);
  const queryClient = useQueryClient();

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-lg font-semibold">Estados</h1>
        <Button
          onClick={() => {
            setEditing(null);
            setOpen(true);
          }}
        >
          Nuevo estado
        </Button>
      </div>

      {isLoading ? (
        <p className="text-sm text-gray-500">Cargando...</p>
      ) : (
        <Table>
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Estado</th>
              <th className="p-2 text-left">País</th>
              <th className="p-2 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data.map((state) => (
              <tr key={state.state_id} className="border-t">                              
                <td className="p-2">{state.state_name}</td>                
                <td className="p-2">{state.country_name}</td>
                <td className="p-2 text-right">
                  <button
                    className="text-sm text-blue-600 hover:underline"
                    onClick={() => {
                      setEditing(state);
                      setOpen(true);
                    }}
                  >
                    Editar
                  </button>
                  <button
                    onClick={async () => {
                      await deleteState(state.state_id)
                      queryClient.invalidateQueries({ queryKey: ['states'] });
                    }}
                    className="text-sm text-red-600 hover:underline ml-3"
                  >
                    Eliminar
                  </button>

                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <StateFormModal
        key={editing?.id ?? 'new'}   // 🔥 mata estado interno
        open={open}
        state={editing}
        onClose={() => {
          setOpen(false);
          setEditing(null);
        }}
      />
    </Card>
  );
}
