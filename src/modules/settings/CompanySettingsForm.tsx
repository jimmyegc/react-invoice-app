import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/app/supabase';
import { useCompany } from '@/modules/company/useCompany';

type FormData = {
  name: string;
  business_line?: string;
  address?: string;
  phone?: string;
  email?: string;
  website?: string;
};

export function CompanySettingsForm() {
  const { data: company } = useCompany();
  const queryClient = useQueryClient();

  const { register, handleSubmit, reset } = useForm<FormData>();

  useEffect(() => {
    if (company) {
      reset({
        name: company.name,
        business_line: company.business_line ?? '',
        address: company.address ?? '',
        phone: company.phone ?? '',
        email: company.email ?? '',
        website: company.website ?? '',
      });
    }
  }, [company, reset]);

  const mutation = useMutation({
    mutationFn: async (form: FormData) => {
      if (!company) return;
      const { error } = await supabase
        .from('mvp_companies')
        .update(form)
        .eq('id', company.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['company'] });
    },
  });

  if (!company) return null;

  return (
    <form
      onSubmit={handleSubmit((data) => mutation.mutate(data))}
      className="bg-white border rounded-lg p-6 space-y-4"
    >
      <div>
        <label className="block text-sm font-medium">Nombre</label>
        <input
          {...register('name', { required: true })}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Giro</label>
        <input
          {...register('business_line')}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Dirección</label>
        <input
          {...register('address')}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">Teléfono</label>
          <input
            {...register('phone')}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            {...register('email')}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={mutation.isPending}
        className="bg-gray-900 text-white px-4 py-2 rounded"
      >
        {mutation.isPending ? 'Guardando...' : 'Guardar cambios'}
      </button>
    </form>
  );
}
