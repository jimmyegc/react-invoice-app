import { supabase } from '@/app/supabase';

export type CityRow = {
  id: number;
  name: string;
  state: {
    id: number;
    name: string;
    country: {
      id: number;
      name: string;
    };
  };
};

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
    .from('mvp_cities')
    .select(`
      id,
      name,
      state:mvp_states (
        id,
        name,
        country:mvp_countries (
          id,
          name
        )
      )
    `)
    .order('name');

  if (error) throw error;
  return data as CityRow[];
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

