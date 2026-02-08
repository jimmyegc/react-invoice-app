import { Card, Button, Input } from '@/components/ui';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/app/supabase';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

type Country = {
  id: number;
  iso: string;
  name: string;
};

type FormValues = {
  iso: string;
  name: string;
};

export function CountryFormModal({
  open,
  country,
  onClose,
}: {
  open: boolean;
  country?: Country | null;
  onClose: () => void;
}) {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      iso: '',
      name: '',
    },
  });

  useEffect(() => {
    if (country) {
      reset({
        iso: country.iso,
        name: country.name,
      });
    } else {
      reset({
        iso: '',
        name: '',
      });
    }
  }, [country, reset]);

  const mutation = useMutation({
    mutationFn: async (form: FormValues) => {
      if (country) {
        const { error } = await supabase
          .from('mvp_countries')
          .update(form)
          .eq('id', country.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('mvp_countries')
          .insert(form);

        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['countries'] });
      onClose();
    },
  });

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
      <Card className="w-full max-w-md p-6">
        <h2 className="font-semibold mb-4">
          {country ? 'Editar país' : 'Nuevo país'}
        </h2>

        <form
          onSubmit={handleSubmit((data) => mutation.mutate(data))}
          className="space-y-3"
        >
          <Input
            placeholder="ISO (MX)"
            {...register('iso', { required: true })}
          />

          <Input
            placeholder="Nombre"
            {...register('name', { required: true })}
          />

          <div className="flex justify-end gap-2">
            <Button type="button" variant="ghost" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" loading={isSubmitting || mutation.isPending}>
              Guardar
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
