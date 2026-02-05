import { supabase } from '@/app/supabase';

export const getInvoices = async () => {
  const { data, error } = await supabase
    .from('mvp_invoices')
    .select(`
      id,
      folio,
      issue_date,
      status,
      total,
      mvp_clients (
        id,
        name
      )
    `)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

export async function createInvoice(payload: {
  client_id: string;
  issue_date: string;
  subtotal: number;
  tax: number;
  total: number;
  items: {
    description: string;
    quantity: number;
    price: number;
  }[];
}) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: invoice, error } = await supabase
    .from('mvp_invoices')
    .insert({
      user_id: user?.id,
      client_id: payload.client_id,
      issue_date: payload.issue_date,
      subtotal: payload.subtotal,
      tax: payload.tax,
      total: payload.total,
      status: 'draft',
    })
    .select()
    .single();

  if (error) throw error;

  const items = payload.items.map(item => ({
    invoice_id: invoice.id,
    ...item,
  }));

  const { error: itemsError } = await supabase
    .from('mvp_invoice_items')
    .insert(items);

  if (itemsError) throw itemsError;

  return invoice;
}
