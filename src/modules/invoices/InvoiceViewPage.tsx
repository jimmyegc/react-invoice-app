// modules/invoices/InvoiceViewPage.tsx
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '@/app/supabase';
import { Card, Button, Table } from '@/components/ui';

export function InvoiceViewPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [invoice, setInvoice] = useState<any>(null);

  useEffect(() => {
    if (id) loadInvoice();
  }, [id]);

  async function loadInvoice() {
    const { data, error } = await supabase
      .from('mvp_invoices')
      .select(`
        *,
        mvp_clients (*),
        mvp_invoice_items (*)
      `)
      .eq('id', id)
      .single();

    if (!error) setInvoice(data);
  }

  if (!invoice) {
    return <p>Cargando factura...</p>;
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">
          Factura #{invoice.folio}
        </h1>

        <div className="flex gap-2">
          <Button
            variant="ghost"
            onClick={() => navigate('/invoices')}
          >
            Volver
          </Button>

          {invoice.status === 'draft' && (
            <Button
              onClick={() =>
                navigate(`/invoices/${invoice.id}/edit`)
              }
            >
              Editar
            </Button>
          )}

          <Button
            onClick={() =>
              navigate(`/invoices/${invoice.id}/print`)
            }
          >
            Imprimir
          </Button>
        </div>
      </div>

      {/* Datos generales */}
      <Card>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="font-medium">Cliente</p>
            <p>{invoice.mvp_clients?.name}</p>
          </div>

          <div>
            <p className="font-medium">Fecha</p>
            <p>{invoice.issue_date}</p>
          </div>

          <div>
            <p className="font-medium">Estado</p>
            <p className="capitalize">{invoice.status}</p>
          </div>
        </div>
      </Card>

      {/* Items */}
      <Card>
        <Table>
          <thead className="bg-gray-50 text-sm">
            <tr>
              <th className="p-2 text-left">Descripción</th>
              <th className="p-2 text-right">Cantidad</th>
              <th className="p-2 text-right">Precio</th>
              <th className="p-2 text-right">Total</th>
            </tr>
          </thead>

          <tbody>
            {invoice.mvp_invoice_items.map((item: any) => (
              <tr key={item.id} className="border-t text-sm">
                <td className="p-2">{item.description}</td>
                <td className="p-2 text-right">{item.quantity}</td>
                <td className="p-2 text-right">
                  ${item.price}
                </td>
                <td className="p-2 text-right">
                  ${item.total}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>

      {/* Totales */}
      <Card>
        <div className="flex justify-end">
          <div className="w-full max-w-xs space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${invoice.subtotal}</span>
            </div>

            <div className="flex justify-between">
              <span>Impuestos</span>
              <span>${invoice.tax}</span>
            </div>

            <div className="flex justify-between font-semibold text-base">
              <span>Total</span>
              <span>${invoice.total}</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
