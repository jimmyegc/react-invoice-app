import { supabase } from '@/app/supabase';
import type { CountryRow } from '@/types/countries';

export async function getCountries() : Promise<CountryRow[]> {
  const { data, error } = await supabase
    .from('v_countries')
    .select('*')
    .order('country_name');

  if (error) throw error;    

  return data ?? [];
}

export const deleteCountry = async (id: number) => {
  const { error } = await supabase
    .from('mvp_countries') 
    .delete()
    .eq('id', id);

  if (error) throw error;
};