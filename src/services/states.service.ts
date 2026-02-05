import { supabase } from '@/app/supabase';

export const getStatesByCountry = async (countryId: number) => {
  const { data, error } = await supabase
    .from('mvp_states')
    .select('id, name')
    .eq('country_id', countryId) 
    .order('name');

  if (error) throw error;
  return data;
};

export const getAllStates = async () => {
  const { data, error } = await supabase
    .from('mvp_states')
    .select(`
      id,
      name,
      country:country_id (
        id,
        name
      )
    `)
    .order('name');

  if (error) throw error;
  return data;
};

export const deleteState = async (id: number) => {
  const { error } = await supabase
    .from('mvp_states')
    .delete()
    .eq('id', id);

  if (error) throw error;
};