import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/app/supabase";
import { Table } from "@/components/ui";
import { Button } from "@/components/ui";

export function InvoicePrintPage() {
  const { id } = useParams();
  const [invoice, setInvoice] = useState<any>(null);

  useEffect(() => {
    if (id) fetchInvoice();
  }, [id]);

  async function fetchInvoice() {
    const { data, error } = await supabase
      .from("mvp_invoices")
      .select(
        `
        *,
        mvp_clients ( name ),
        mvp_invoice_items ( * )
      `,
      )
      .eq("id", id)
      .single();

    if (!error) setInvoice(data);
  }

  if (!invoice) return <p>Cargando...</p>;

  return (
    <div className="max-w-3xl mx-auto p-8 text-sm print:p-0 print:mx-0 print:max-w-full">
      <div className="flex justify-end mb-4 print:hidden">
        <Button onClick={() => window.print()}>Imprimir factura</Button>
      </div>
      <h1 className="text-2xl font-semibold mb-4 print:text-xl">
        Factura {invoice.folio}
      </h1>

      <div className="mb-4 print:mb-2">
        <p>
          <strong>Cliente:</strong> {invoice.mvp_clients?.name}
        </p>
        <p>
          <strong>Fecha:</strong> {invoice.issue_date}
        </p>
        <p>
          <strong>Status:</strong> {invoice.status}
        </p>
      </div>

      {/* Items */}
      <div className="overflow-x-auto print:overflow-visible">
        <Table className="print:w-full">
          <thead className="bg-gray-50 text-sm print:bg-white">
            <tr>
              <th className="p-2 text-left">Descripción</th>
              <th className="p-2 text-right">Cantidad</th>
              <th className="p-2 text-right">Precio</th>
              <th className="p-2 text-right">Total</th>
            </tr>
          </thead>

          <tbody>
            {invoice.mvp_invoice_items.map((item: any) => (
              <tr key={item.id} className="border-t text-sm print:border-none">
                <td className="p-2">{item.description}</td>
                <td className="p-2 text-right">{item.quantity}</td>
                <td className="p-2 text-right">${item.price}</td>
                <td className="p-2 text-right">${item.total}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <div className="flex justify-end mt-4 print:mt-2">
        <div className="w-full max-w-xs space-y-2 text-sm print:w-64">
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

      <style>
        {`
          @media print {
            body {
              margin: 0;
              font-size: 12pt;
            }
            .print\\:p-0 { padding: 0 !important; }
            .print\\:mx-0 { margin-left: 0 !important; margin-right: 0 !important; }
            .print\\:max-w-full { max-width: 100% !important; }
            .print\\:w-full { width: 100% !important; }
            .print\\:overflow-visible { overflow: visible !important; }
            .print\\:mb-2 { margin-bottom: 0.5rem !important; }
            .print\\:mt-2 { margin-top: 0.5rem !important; }
            .print\\:text-xl { font-size: 1.25rem !important; }
            .print\\:border-none { border: none !important; }
            .print\\:w-64 { width: 16rem !important; }
          }
        `}
      </style>
    </div>
  );
}
