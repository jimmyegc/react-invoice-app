import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Card, Select, Input } from '@/components/ui';
import { useCountries } from '@/hooks/useCountries'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/app/supabase';

type Props = {
  open: boolean;
  state?: StateEntity | null;
  onClose: () => void;
};

export function StateFormModal({ open, state, onClose }: Props) {
  const queryClient = useQueryClient();
  const { countries } = useCountries();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<StateFormValues>({
    defaultValues: {
      name: '',
      country_id: undefined,
    },
  });

  // 🔑 Sincroniza editar / crear
  useEffect(() => {
    if (open) {
      if (state) {        
        reset({
          name: state.name,
          country_id: state.country.id,
        });
      } else {
        reset({
          name: '',
          country_id: undefined,
        });
      }
    }
  }, [state, open, reset]);

  const mutation = useMutation({
    mutationFn: async (form: StateFormValues) => {
      if (state) {
        const { error } = await supabase
          .from('mvp_states')
          .update(form)
          .eq('id', state.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('mvp_states')
          .insert(form);

        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['states'] });
      onClose();
    },
  });

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
      <Card className="w-full max-w-md p-6">
        <h2 className="font-semibold mb-4">
          {state ? 'Editar estado' : 'Nuevo estado'}
        </h2>

        <form
          onSubmit={handleSubmit((data) => mutation.mutate(data))}
          className="space-y-3"
        >
          <Input
            {...register('name', { required: true })}
            placeholder="Nombre del estado"
          />

          <Select
            key={`country-${state?.country.id ?? 'new'}`}
            {...register('country_id', { required: true, valueAsNumber: true })}
          >
            <option value="">Selecciona país</option>
            {countries?.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </Select>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="ghost" onClick={onClose}>
              Cancelar
            </Button>
            <Button
              type="submit"
              loading={isSubmitting || mutation.isPending || undefined}
            >
              Guardar
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
