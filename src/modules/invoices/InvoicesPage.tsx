import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/app/supabase";
import { Card, Button, Table } from "@/components/ui";

export function InvoicesPage() {
  const [invoices, setInvoices] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchInvoices();
  }, []);

  async function fetchInvoices() {
    const { data, error } = await supabase
      .from("mvp_invoices")
      .select(
        `
        id,
        folio,
        issue_date,
        status,
        total,
        mvp_clients ( name )
      `,
      )
      .order("created_at", { ascending: false });

    if (!error) setInvoices(data || []);
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Facturas</h1>

        <Button onClick={() => navigate("/invoices/new")}>Nueva factura</Button>
      </div>

      <Card>
        <Table>
          <thead className="bg-gray-50 text-sm">
            <tr>
              <th className="p-2 text-left">Folio</th>
              <th className="p-2 text-left">Cliente</th>
              <th className="p-2 text-left">Fecha</th>
              <th className="p-2 text-left">Estado</th>
              <th className="p-2 text-right">Total</th>
              <th className="p-2 text-right">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {invoices.map((inv) => (
              <tr key={inv.id} className="border-t text-sm">
                <td className="p-2">{inv.folio}</td>
                <td className="p-2">{inv.mvp_clients?.name}</td>
                <td className="p-2">{inv.issue_date}</td>
                <td className="p-2 capitalize">{inv.status}</td>
                <td className="p-2 text-right">${inv.total}</td>

                <td className="p-2 text-right space-x-2">
                  <Button
                    variant="ghost"
                    onClick={() => navigate(`/invoices/${inv.id}`)}
                  >
                    Ver
                  </Button>

                  {(inv.status === "draft" || inv.status === "issued") && (
                    <Button
                      variant="ghost"
                      onClick={() => navigate(`/invoices/${inv.id}/edit`)}
                    >
                      Editar
                    </Button>
                  )}

                  <Button
                    variant="ghost"
                    onClick={() => navigate(`/invoices/${inv.id}/print`)}
                  >
                    Imprimir
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </div>
  );
}
