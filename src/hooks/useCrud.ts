// hooks/useCrud.ts
import { supabase } from '@/app/supabase';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export function useCrud<T>(table: string) {
  const queryClient = useQueryClient();

  const list = () =>
    useQuery({
      queryKey: [table],
      queryFn: async () => {
        const { data, error } = await supabase.from(table).select('*');
        if (error) throw error;
        return data as T[];
      },
    });

  const create = () =>
    useMutation({
      mutationFn: async (payload: Partial<T>) => {
        const { error } = await supabase.from(table).insert(payload);
        if (error) throw error;
      },
      onSuccess: () => queryClient.invalidateQueries({ queryKey: [table] }),
    });

  const update = () =>
    useMutation({
      mutationFn: async ({ id, ...payload }: any) => {
        const { error } = await supabase
          .from(table)
          .update(payload)
          .eq('id', id);
        if (error) throw error;
      },
      onSuccess: () => queryClient.invalidateQueries({ queryKey: [table] }),
    });

  return { list, create, update };
}
