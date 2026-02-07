import { supabase } from '@/app/supabase';

export type StateRow = {
  state_id: number;
  state_name: string;
  country_id: number;
  country_name: string;
};

export type CreateStatePayload = {
  name: string;
  country_id: number;
};

export const getStatesByCountry = async (countryId: number) => {
  const { data, error } = await supabase
    .from('v_mvp_states')
    .select('*')
    .eq('country_id', countryId) 
    .order("country_name")
    .order('state_name');

  if (error) throw error;  
  return data;
};

export async function getStates(): Promise<StateRow[]> {
  const { data, error } = await supabase
    .from('v_mvp_states')
    .select('*')
    .order("country_name")
    .order('state_name');

  if (error) throw error;  
  
  return data ?? [];
}

export async function createState(payload: CreateStatePayload) {
  const { error } = await supabase
    .from('mvp_states') // 👈 tabla real
    .insert({
      name: payload.name,
      country_id: payload.country_id,
    });

  if (error) throw error;
}

export async function updateState(
  stateId: number,
  payload: CreateStatePayload
) {
  const { error } = await supabase
    .from('mvp_states')
    .update({
      name: payload.name,
      country_id: payload.country_id,
    })
    .eq('id', stateId);

  if (error) throw error;
}

export async function deleteState(stateId: number) {
  const { error } = await supabase
    .from('mvp_states')
    .delete()
    .eq('id', stateId);

  if (error) throw error;
}