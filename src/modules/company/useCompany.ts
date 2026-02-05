import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/app/supabase';

export function useCompany() {
  return useQuery({
    queryKey: ['company'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('mvp_companies')
        .select('*')
        .limit(1);

      if (error) throw error;

      return data?.[0] ?? null;
    },
  });
}