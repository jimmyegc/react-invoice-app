import { supabase } from '@/app/supabase';

export const getCountries = async () => {
  const { data, error } = await supabase
    .from('mvp_countries')
    .select('*')
    .order('name');

  if (error) throw error;
  return data;
};

export const deleteCountry = async (id: number) => {
  const { error } = await supabase
    .from('mvp_countries')
    .delete()
    .eq('id', id);

  if (error) throw error;
};