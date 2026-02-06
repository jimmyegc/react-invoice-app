import { supabase } from '@/app/supabase';

export type ClientRow = {
  id: string;
  name: string;
  business_name: string;
  rfc: string;
  address: string | null;
  phone: string | null;
  email: string | null;

  city_id: number | null;
  city_name: string | null;

  state_id: number | null;
  state_name: string | null;

  country_id: number | null;
  country_name: string | null;
};

export type ClientPayload = {
  name: string;
  business_name: string;
  rfc: string;
  address?: string | null;
  phone?: string | null;
  email?: string | null;
  city_id?: number | null;
  state_id?: number | null;
  country_id?: number | null;
};

export async function getClients() {
  const { data, error } = await supabase
    .from('mvp_clients')
    .select('id, name, business_name')
    .order('name');

  if (error) throw error;
  return data;
}
