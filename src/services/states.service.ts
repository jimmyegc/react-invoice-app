import { supabase } from '@/app/supabase';

export const getStatesByCountry = async (countryId: number) => {
  const { data, error } = await supabase
    .from('mvp_states')
    .select('*')
    .eq('country_id', countryId)
    .order('name');

  if (error) throw error;
  return data;
};
