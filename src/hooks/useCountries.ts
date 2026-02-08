import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/app/supabase';
import { getCountries } from '@/services/countries.service';

export function useCountries() {
  const queryClient = useQueryClient();

  /* -------- GET -------- */
  const countriesQuery = useQuery({
    queryKey: ['countries'],
    queryFn: getCountries,
  });

  /* -------- CREATE -------- */
  const createCountry = useMutation({
    mutationFn: async (payload: { name: string; iso: string }) => {
      const { error } = await supabase
        .from('mvp_countries')
        .insert(payload);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['countries'] });
    },
  });

  /* -------- UPDATE -------- */
  const updateCountry = useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: number;
      payload: { name: string; iso: string };
    }) => {
      const { error } = await supabase
        .from('mvp_countries')
        .update(payload)
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['countries'] });
    },
  });

  /* -------- DELETE -------- */
  const deleteCountry = useMutation({
    mutationFn: async (id: number) => {
      const { error } = await supabase
        .from('mvp_countries')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['countries'] });
    },
  });

  return {    
    countries: countriesQuery.data ?? [],
    isLoading: countriesQuery.isLoading,
    isError: countriesQuery.isError,    
    createCountry: createCountry.mutateAsync,
    updateCountry: updateCountry.mutateAsync,
    deleteCountry: deleteCountry.mutateAsync,
  };
}
