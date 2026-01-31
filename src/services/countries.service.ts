import { supabase } from '@/app/supabase';

export const getCountries = async () => {
  const { data, error } = await supabase
    .from('mvp_countries')
    .select('*')
    .order('name');

  if (error) throw error;
  return data;
};
