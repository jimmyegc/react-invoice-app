import { supabase } from '@/app/supabase';

export async function getClients() {
  const { data, error } = await supabase
    .from('mvp_clients')
    .select('id, name, business_name')
    .order('name');

  if (error) throw error;
  return data;
}
