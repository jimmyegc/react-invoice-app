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


export const getAllCities = async () => {
  const { data, error } = await supabase
    .from('mvp_cities')
    .select('id, name, state_id, state:mvp_states(name)')
    .order('name');

  if (error) throw error;
  return data;
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