// modules/invoices/InvoiceEditPage.tsx
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '@/app/supabase';
import { Card, Button } from '@/components/ui';
import { InvoiceForm } from './InvoiceForm';

export function InvoiceEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [invoice, setInvoice] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) loadInvoice();
  }, [id]);

  // Cargar factura
  async function loadInvoice() {
    setLoading(true);
    const { data, error } = await supabase
      .from('mvp_invoices')
      .select(`*, mvp_invoice_items(*)`)
      .eq('id', id)
      .single();

    if (!error) setInvoice(data);
    setLoading(false);
  }

  // Guardar cambios
  async function handleSaved(data: any) {
    if (!invoice) return;

    setLoading(true);

    // 1️⃣ Actualizar factura
    const { error: invoiceError } = await supabase
      .from('mvp_invoices')
      .update({
        client_id: data.client_id,
        issue_date: data.issue_date,
        subtotal: data.subtotal,
        tax: data.tax,
        total: data.total,
      })
      .eq('id', invoice.id);

    if (invoiceError) {
      setLoading(false);
      return;
    }

    // 2️⃣ Manejar items
    const existingItems = invoice.mvp_invoice_items || [];

    // Separar items nuevos y existentes
    const newItems = data.items.filter((i: any) => !i.id);
    const updatedItems = data.items.filter((i: any) => i.id);
    const removedItems = existingItems.filter(
      (ei: any) => !updatedItems.some((ui: any) => ui.id === ei.id)
    );

    // Insertar nuevos
    if (newItems.length) {
      await supabase.from('mvp_invoice_items').insert(
        newItems.map((i: any) => ({
          invoice_id: invoice.id,
          description: i.description,
          quantity: i.quantity,
          price: i.price,
          total: i.total,
        }))
      );
    }

    // Actualizar existentes
    for (const i of updatedItems) {
      await supabase
        .from('mvp_invoice_items')
        .update({
          description: i.description,
          quantity: i.quantity,
          price: i.price,
          //total: i.total,
        })
        .eq('id', i.id);
    }

    // Eliminar borrados
    for (const i of removedItems) {
      await supabase.from('mvp_invoice_items').delete().eq('id', i.id);
    }

    setLoading(false);
    navigate(`/invoices/${invoice.id}`);
  }

  if (loading) return <p>Cargando factura…</p>;
  if (!invoice) return <p>Factura no encontrada</p>;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">
          Editar factura #{invoice.folio}
        </h1>

        <Button
          variant="ghost"
          onClick={() => navigate(`/invoices/${invoice.id}`)}
        >
          Cancelar
        </Button>
      </div>

      <Card>
        <InvoiceForm
          initialData={invoice}
          onSubmit={handleSaved}
          loading={loading}
        />
      </Card>
    </div>
  );
}
