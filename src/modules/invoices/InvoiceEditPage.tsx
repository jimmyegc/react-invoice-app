import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/app/supabase";
import { Card, Button } from "@/components/ui";
import { InvoiceForm } from "./InvoiceForm";
import { PageLoader } from "@/components/ui/PageLoader";

type InvoiceStatus = "draft" | "issued" | "paid" | "cancelled";

function canEditInvoice(status: InvoiceStatus) {
  return status === "draft" || status === "issued";
}

function canChangeStatus(current: InvoiceStatus, next: InvoiceStatus) {
  const rules: Record<InvoiceStatus, InvoiceStatus[]> = {
    draft: ["issued"],
    issued: ["paid", "cancelled"],
    paid: [],
    cancelled: [],
  };

  return rules[current].includes(next);
}

export function InvoiceEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [invoice, setInvoice] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) loadInvoice();
  }, [id]);

  async function loadInvoice() {
    setLoading(true);
    const { data, error } = await supabase
      .from("mvp_invoices")
      .select(`*, mvp_invoice_items(*)`)
      .eq("id", id)
      .single();

    if (!error) setInvoice(data);
    setLoading(false);
  }

  async function handleStatusChange(nextStatus: InvoiceStatus) {
    if (!invoice) return;

    if (!canChangeStatus(invoice.status, nextStatus)) {
      alert("Cambio de estatus no permitido");
      return;
    }

    const { error } = await supabase
      .from("mvp_invoices")
      .update({ status: nextStatus })
      .eq("id", invoice.id);

    if (!error) {
      setInvoice({ ...invoice, status: nextStatus });
    }
  }

  async function handleSaved(data: any) {
    if (!invoice) return;

    if (!canEditInvoice(invoice.status)) {
      alert("Esta factura ya no puede editarse");
      return;
    }

    setLoading(true);

    const { error: invoiceError } = await supabase
      .from("mvp_invoices")
      .update({
        client_id: data.client_id,
        issue_date: data.issue_date,
        subtotal: data.subtotal,
        tax: data.tax,
        total: data.total,
      })
      .eq("id", invoice.id);

    if (invoiceError) {
      setLoading(false);
      return;
    }

    const existingItems = invoice.mvp_invoice_items || [];

    const newItems = data.items.filter((i: any) => !i.id);
    const updatedItems = data.items.filter((i: any) => i.id);
    const removedItems = existingItems.filter(
      (ei: any) => !updatedItems.some((ui: any) => ui.id === ei.id),
    );

    if (newItems.length) {
      await supabase.from("mvp_invoice_items").insert(
        newItems.map((i: any) => ({
          invoice_id: invoice.id,
          description: i.description,
          quantity: i.quantity,
          price: i.price,
          total: i.total,
        })),
      );
    }

    for (const i of updatedItems) {
      await supabase
        .from("mvp_invoice_items")
        .update({
          description: i.description,
          quantity: i.quantity,
          price: i.price,
          //total: i.total,
        })
        .eq("id", i.id);
    }

    for (const i of removedItems) {
      await supabase.from("mvp_invoice_items").delete().eq("id", i.id);
    }

    setLoading(false);
    navigate(`/invoices/${invoice.id}`);
  }

  if (loading) return <PageLoader />;
  if (!invoice) return <p>Factura no encontrada</p>;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">
          Editar factura #{invoice.folio}
        </h1>

        <div className="flex items-center gap-3">
          <span className="text-sm px-2 py-1 rounded bg-gray-100">
            {invoice.status}
          </span>

          <select
            value={invoice.status}
            onChange={(e) =>
              handleStatusChange(e.target.value as InvoiceStatus)
            }
            disabled={
              invoice.status === "paid" || invoice.status === "cancelled"
            }
            className="border px-2 py-1 rounded text-sm"
          >
            <option value="draft">Borrador</option>
            <option value="issued">Emitida</option>
            <option value="paid">Pagada</option>
            <option value="cancelled">Cancelada</option>
          </select>
        </div>

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
          /* disabled={!canEditInvoice(invoice.status)} */
        />
      </Card>
    </div>
  );
}
