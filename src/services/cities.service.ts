import { supabase } from '@/app/supabase';

export interface CityRow {
  city_id: number
  city_name: string
  state_id: number
  state_name: string
  country_id: number | string
  country_name: string
}

export const getCitiesByState = async (stateId: number) => {
  const { data, error } = await supabase
    .from('mvp_cities')
    .select('*')
    .eq('state_id', stateId)
    .order('name');

  if (error) throw error;
  return data;
};

export const getAllCities = async (): Promise<CityRow[]> => {
  const { data, error } = await supabase
    .from('v_mvp_cities')
    .select('*')
    .order('country_name')
    .order('state_name')
    .order('city_name')

  if (error) throw error;
  
  return data as CityRow[]

};


export const createCity = async (payload: {
  name: string;
  state_id: number;
}) => {
  const { error } = await supabase
    .from('mvp_cities')
    .insert(payload);

  if (error) throw error;
};

export const updateCity = async (
  id: number,
  payload: { name: string; state_id: number }
) => {
  const { error } = await supabase
    .from('mvp_cities')
    .update(payload)
    .eq('id', id);

  if (error) throw error;
};

export const deleteCity = async (id: number) => {
  const { error } = await supabase
    .from('mvp_cities')
    .delete()
    .eq('id', id);

  if (error) throw error;
};

