// modules/states/StateFormModal.tsx
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getCountries } from '@/services/countries.service';
import { createState, updateState } from '@/services/states.service';
import { Card, Button, Input, Select } from '@/components/ui';

type FormValues = {
  name: string;
  country_id?: number;
};

export function StateFormModal({
  open,
  state,
  onClose,
}: {
  open: boolean;
  state?: any | null; // ← viene de la vista
  onClose: () => void;
}) {
  const queryClient = useQueryClient();
  const isEditing = !!state;

  const {
    register,
    handleSubmit,
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      name: '',
      country_id: undefined,
    },
  });

  /* =========================
     Queries
  ========================= */

  const { data: countries = [] } = useQuery({
    queryKey: ['countries'],
    queryFn: getCountries,
  });

  /* =========================
     Mutación
  ========================= */

  const mutation = useMutation({
    mutationFn: async (data: FormValues) => {
      if (!data.country_id) return;

      if (isEditing) {
        await updateState(state.state_id, {
          name: data.name,
          country_id: data.country_id,
        });
      } else {
        await createState({
          name: data.name,
          country_id: data.country_id,
        });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['states'] });
      onClose();
    },
  });

  /* =========================
     Inicialización del form
  ========================= */

  useEffect(() => {
    if (!open) return;

    if (isEditing) {
      reset({
        name: state.state_name,
        country_id: state.country_id,
      });
    } else {
      reset({
        name: '',
        country_id: undefined,
      });
    }
  }, [open, isEditing, state, reset]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <Card className="w-full max-w-md space-y-4">
        <h2 className="text-lg font-semibold">
          {isEditing ? 'Editar estado' : 'Nuevo estado'}
        </h2>

        <form
          onSubmit={handleSubmit((data) => mutation.mutate(data))}
          className="space-y-3"
        >
          {/* País */}
          <Select
            {...register('country_id', { valueAsNumber: true })}
          >
            <option value="">País</option>
            {countries.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </Select>

          {/* Nombre */}
          <Input
            placeholder="Nombre del estado"
            {...register('name', { required: true })}
          />

          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
            >
              Cancelar
            </Button>
            <Button type="submit" loading={mutation.isPending}>
              Guardar
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
