// modules/catalogs/states/StateFormModal.tsx
import { useEffect, useState } from 'react';
import { useCountries } from '../countries/useCountries';
import { Button, Card } from '@/components/ui';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; country_id: number }) => void;
  initialData?: { name: string; country_id: number };
};

export function StateFormModal({
  open,
  onClose,
  onSubmit,
  initialData,
}: Props) {

  const { getCountries } = useCountries();
  const [countries, setCountries] = useState<any[]>([]);
  const [name, setName] = useState('');
  const [countryId, setCountryId] = useState<number | ''>('');

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
    getCountries().then(setCountries);
  }, []);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setCountryId(initialData.country_id);
    }
  }, [initialData]);

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
      <h2 className="font-semibold mb-4">{initialData ? 'Editar estado' : 'Nuevo estado'}</h2>
      <form className="space-y-3">
      <input
        placeholder="Nombre del estado"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <select
        value={countryId}
        onChange={(e) => setCountryId(Number(e.target.value))}
      >
        <option value="">Selecciona país</option>
        {countries.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>

      <div className='flex justify-end gap-2'>
        <Button type='button' variant="ghost" onClick={onClose}>
          Cancelar
        </Button>
        <Button type="submit" loading={isSubmitting || mutation.isPending}>
          Guardar
        </Button>
      </div>

      <button
        onClick={() =>
          onSubmit({
            name,
            country_id: Number(countryId),
          })
        }
        disabled={!name || !countryId}
      >
        Guardar
      </button>

      <button onClick={onClose}>Cancelar</button>
      </form>
      </Card>
    </div>
  );
}
