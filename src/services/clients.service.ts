import { supabase } from '@/app/supabase';
import type { ClientListRow } from '@/types/clients'

export async function getClients(): Promise<ClientListRow[]> {
  const { data, error } = await supabase
    .from('mvp_clients')
    .select('id, name, business_name')
    .order('name');

  if (error) throw error;
  return data as ClientListRow[];
}
