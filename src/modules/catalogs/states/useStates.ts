// modules/catalogs/states/useStates.ts
import { supabase } from '@/app/supabase';

export function useStates() {
  const getStates = async () => {
    const { data, error } = await supabase
      .from('mvp_states')
      .select(`
        id,
        name,
        country_id,
        mvp_countries (
          id,
          name
        )
      `)
      .order('name');

    if (error) throw error;
    return data;
  };

  const createState = async (payload: {
    name: string;
    country_id: number;
  }) => {
    const { error } = await supabase
      .from('mvp_states')
      .insert(payload);

    if (error) throw error;
  };

  const updateState = async (
    id: number,
    payload: { name: string; country_id: number }
  ) => {
    const { error } = await supabase
      .from('mvp_states')
      .update(payload)
      .eq('id', id);

    if (error) throw error;
  };

  const deleteState = async (id: number) => {
    const { error } = await supabase
      .from('mvp_states')
      .delete()
      .eq('id', id);

    if (error) throw error;
  };

  return {
    getStates,
    createState,
    updateState,
    deleteState,
  };
}
