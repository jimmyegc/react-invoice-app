import { useNavigate } from 'react-router-dom';
import { supabase } from '@/app/supabase';
import { useState } from 'react';
import { InvoiceForm } from './InvoiceForm';

export function InvoiceFormPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

async function handleCreate(data: any) {
  try {
    setLoading(true);

    // ✅ Obtener user actual
    const { data: authData, error: authError } = await supabase.auth.getUser();
    if (authError) throw authError;
    const userId = authData.user?.id;

    // 1️⃣ Crear factura (sin columnas generadas)
    const { data: invoice, error: invoiceError } = await supabase
      .from('mvp_invoices')
      .insert({
        client_id: data.client_id,
        user_id: userId,
        issue_date: data.issue_date,
        status: 'draft',
        subtotal: data.subtotal,
        discount: 0,
        tax: data.tax,
        total: data.total,
      })
      .select()
      .single();

    if (invoiceError || !invoice) {
      console.error('Error creando factura:', invoiceError);
      setLoading(false);
      return;
    }

    // 2️⃣ Insertar items
    if (data.items && data.items.length > 0) {
      const { error: itemsError } = await supabase
        .from('mvp_invoice_items')
        .insert(
          data.items.map((item: any) => ({
            invoice_id: invoice.id,
            description: item.description,
            quantity: item.quantity,
            price: item.price,
            user_id: userId,
          }))
        );

      if (itemsError) {
        console.error('Error creando items:', itemsError);
        setLoading(false);
        return;
      }
    }

    setLoading(false);
    navigate(`/invoices/${invoice.id}`);
  } catch (err) {
    console.error(err);
    setLoading(false);
  }
}

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Nueva factura</h1>

      <InvoiceForm
        loading={loading}
        onSubmit={handleCreate}
      />
    </div>
  );
}
