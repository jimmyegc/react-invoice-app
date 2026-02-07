import { useEffect, useState } from 'react';
import { supabase } from '@/app/supabase';
import { Card, Button } from '@/components/ui';
import { InvoiceItemsTable } from './InvoiceItemsTable';

type Props = {
  initialData?: any; // ahora opcional
  onSubmit: (data: any) => void;
  loading?: boolean;
};

export function InvoiceForm({ initialData, onSubmit, loading }: Props) {
  const [clients, setClients] = useState<any[]>([]);
  const [clientId, setClientId] = useState<string | null>(null);
  const [issueDate, setIssueDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [items, setItems] = useState<any[]>([]);

  // cargar clientes
  useEffect(() => {
    supabase
      .from('mvp_clients')
      .select('id, name')
      .order('name')
      .then(({ data }) => setClients(data || []));
  }, []);

  // inicializar con datos existentes
  useEffect(() => {
    if (initialData) {
      setClientId(initialData.client_id);
      setIssueDate(initialData.issue_date);
      setItems(initialData.mvp_invoice_items || []);
    }
  }, [initialData]);

  const subtotal = items.reduce((sum, i) => sum + i.total, 0);
  const tax = subtotal * 0.16; // listo para crecer
  const total = subtotal + tax;

  async function submit() {
    if (!clientId || items.length === 0) return;

    onSubmit({
      client_id: clientId,
      issue_date: issueDate,
      items,
      subtotal,
      tax,
      total,
      id: initialData?.id, // enviar id si es edición
    });
  }

  return (
    <div className="space-y-4">
      {/* Datos generales */}
      <Card>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <label className="block mb-1 font-medium">Cliente</label>
            <select
              className="border px-3 py-2 rounded w-full"
              value={clientId ?? ''}
              onChange={(e) => setClientId(e.target.value || null)}
            >
              <option value="">Seleccionar cliente</option>
              {clients.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Fecha</label>
            <input
              type="date"
              className="border px-3 py-2 rounded w-full"
              value={issueDate}
              onChange={(e) => setIssueDate(e.target.value)}
            />
          </div>
        </div>
      </Card>

      {/* Items */}
      <Card>
        <InvoiceItemsTable
          items={items}
          editable
          onChange={setItems}
        />
      </Card>

      {/* Totales */}
      <Card>
        <div className="flex justify-end">
          <div className="w-full max-w-xs space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal}</span>
            </div>

            <div className="flex justify-between">
              <span>Impuestos</span>
              <span>${tax}</span>
            </div>

            <div className="flex justify-between font-semibold text-base">
              <span>Total</span>
              <span>${total}</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Acciones */}
      <div className="flex justify-end gap-2">
        <Button onClick={submit} disabled={loading || !clientId || items.length === 0}>
          {loading ? 'Guardando…' : initialData ? 'Actualizar factura' : 'Crear factura'}
        </Button>
      </div>
    </div>
  );
}
