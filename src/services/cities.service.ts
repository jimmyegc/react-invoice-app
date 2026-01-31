import { supabase } from '@/app/supabase';

export const getCitiesByState = async (stateId: number) => {
  const { data, error } = await supabase
    .from('mvp_cities')
    .select('*')
    .eq('state_id', stateId)
    .order('name');

  if (error) throw error;
  return data;
};
