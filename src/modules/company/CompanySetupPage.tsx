import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/app/supabase';
import { useState } from 'react';

type FormData = {
  name: string;
  business_line?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  phone?: string;
  email?: string;
  website?: string;
};

export function CompanySetupPage() {
  const [submitted, setSubmitted] = useState(false);
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async (form: FormData) => {
      const { data: user } = await supabase.auth.getUser();

      if (!user.user) throw new Error('No user');

      const { data: company, error } = await supabase
        .from('mvp_companies')
        .insert({
          user_id: user.user.id,
          ...form,
        })
        .select()
        .single();

      if (error) throw error;

      await supabase.from('mvp_settings').insert({
        user_id: user.user.id,
        company_id: company.id,
        is_main: true,
      });

      return company;
    },
    onSuccess: async () => {      
      await queryClient.invalidateQueries({ queryKey: ['company'] });
      await queryClient.refetchQueries({ queryKey: ['company'] });
      navigate('/');
    },
    onError: () => {
      setSubmitted(false);
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={(e) => {
          e.preventDefault();
  if (submitted) return;
  setSubmitted(true);
  mutation.mutate(
    Object.fromEntries(new FormData(e.currentTarget)) as FormData
  );
        }}
        className="bg-white p-6 rounded-lg w-full max-w-lg space-y-4"
      >
        <h1 className="text-xl font-semibold">Configura tu empresa</h1>

        <input
          name="name"
          required
          placeholder="Nombre de la empresa"
          className="w-full border px-3 py-2 rounded"
        />

        <input
          name="business_line"
          placeholder="Giro"
          className="w-full border px-3 py-2 rounded"
        />

        <input
          name="address"
          placeholder="Dirección"
          className="w-full border px-3 py-2 rounded"
        />

        <input
          name="phone"
          placeholder="Teléfono"
          className="w-full border px-3 py-2 rounded"
        />

        <input
          name="email"
          placeholder="Email"
          type="email"
          className="w-full border px-3 py-2 rounded"
        />

        <button
          type="submit"
          disabled={mutation.isPending}
          className="w-full bg-gray-900 text-white py-2 rounded"
        >
          {mutation.isPending ? 'Guardando...' : 'Guardar y continuar'}
        </button>
      </form>
    </div>
  );
}
