import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/app/supabase';

export function useSettings() {
  return useQuery({
    queryKey: ['settings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('mvp_settings')
        .select('*')
        .limit(1);

      if (error) throw error;

      return data?.[0] ?? null;
    },
  });
}
