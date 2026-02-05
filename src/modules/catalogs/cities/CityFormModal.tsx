// modules/cities/CityFormModal.tsx
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getCountries } from '@/services/countries.service';
import { getStatesByCountry } from '@/services/states.service';
import { createCity, updateCity } from '@/services/cities.service';
import { Card, Button, Input, Select } from '@/components/ui';

type FormValues = {
  name: string;
  country_id?: number;
  state_id?: number;
};

export function CityFormModal({
  open,
  city,
  onClose,
}: {
  open: boolean;
  city?: any | null;
  onClose: () => void;
}) {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
  } = useForm<FormValues>({
    defaultValues: {
      name: '',
      country_id: undefined,
      state_id: undefined,
    },
  });

  const countryId = watch('country_id');

  /* =========================
     Queries
  ========================= */

  const { data: countries = [] } = useQuery({
    queryKey: ['countries'],
    queryFn: getCountries,
  });

  const { data: states = [] } = useQuery({
    queryKey: ['states', countryId],
    queryFn: () => getStatesByCountry(countryId!),
    enabled: !!countryId,
  });

  /* =========================
     Mutación
  ========================= */

  const mutation = useMutation({
    mutationFn: async (data: FormValues) => {
      if (!data.state_id) return;

      if (city) {
        await updateCity(city.id, {
          name: data.name,
          state_id: data.state_id,
        });
      } else {
        await createCity({
          name: data.name,
          state_id: data.state_id,
        });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cities'] });
      onClose();
    },
  });

  /* =========================
     Edición / Creación
  ========================= */

  useEffect(() => {
    if (!open) return;

    if (city) {
      reset({
        name: city.name,
        country_id: city.state.country.id,
        state_id: city.state.id,
      });
    } else {
      reset({
        name: '',
        country_id: undefined,
        state_id: undefined,
      });
    }
  }, [city, open, reset]);

  /* =========================
     Cambio de país
  ========================= */

  useEffect(() => {
    setValue('state_id', undefined);
  }, [countryId, setValue]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <Card className="w-full max-w-md space-y-4">
        <h2 className="text-lg font-semibold">
          {city ? 'Editar ciudad' : 'Nueva ciudad'}
        </h2>
        <form
          onSubmit={handleSubmit((data) => mutation.mutate(data))}
          className="space-y-3"
        >
          {/* 🔑 FORZAMOS RESET DEL SELECT */}
          <Select
            key={`country-${city?.id ?? 'new'}`}
            {...register('country_id', { valueAsNumber: true })}
          >
            <option value="">País</option>
            {countries.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </Select>

          {/* 🔑 DEPENDE DEL PAÍS */}
          <Select
            key={`state-${countryId ?? 'none'}`}
            {...register('state_id', { valueAsNumber: true })}
            disabled={!countryId}
          >
            <option value="">Estado</option>
            {states.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </Select>

          <Input
            placeholder="Nombre de la ciudad"
            {...register('name', { required: true })}
          />

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="ghost" onClick={onClose}>
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
