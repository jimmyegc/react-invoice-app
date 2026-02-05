import { supabase } from '@/app/supabase';
import type { Client, ClientFormData } from './clients.types';

export async function getClients(search = '') {
  let query = supabase
    .from('mvp_clients')
    .select('*')
    .order('created_at', { ascending: false });

  if (search) {
    query = query.ilike('name', `%${search}%`);
  }

  const { data, error } = await query;

  if (error) throw error;
  return data as Client[];
}

export async function createClient(payload: ClientFormData) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error('No authenticated user');

  const { error } = await supabase.from('mvp_clients').insert({
    ...payload,
    user_id: user.id,
  });

  if (error) throw error;
}

export async function updateClient(
  id: string,
  payload: ClientFormData
) {
  const { error } = await supabase
    .from('mvp_clients')
    .update(payload)
    .eq('id', id);

  if (error) throw error;
}

export async function deleteClient(id: string) {
  const { error } = await supabase
    .from('mvp_clients')
    .delete()
    .eq('id', id);

  if (error) throw error;
}
