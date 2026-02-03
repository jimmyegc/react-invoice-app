// modules/invoices/InvoiceItemsTable.tsx
import { Table, Button } from '@/components/ui';

type Item = {
  id?: number;
  description: string;
  quantity: number;
  price: number;
  total: number;
};

type Props = {
  items: Item[];
  editable?: boolean;
  onChange?: (items: Item[]) => void;
};

export function InvoiceItemsTable({
  items,
  editable = false,
  onChange,
}: Props) {
  function updateItem(index: number, patch: Partial<Item>) {
    if (!onChange) return;

    const next = [...items];
    const updated = {
      ...next[index],
      ...patch,
    };

    updated.total = updated.quantity * updated.price;
    next[index] = updated;

    onChange(next);
  }

  function addItem() {
    if (!onChange) return;

    onChange([
      ...items,
      {
        description: '',
        quantity: 1,
        price: 0,
        total: 0,
      },
    ]);
  }

  function removeItem(index: number) {
    if (!onChange) return;

    const next = [...items];
    next.splice(index, 1);
    onChange(next);
  }

  return (
    <div className="space-y-2">
      <Table>
        <thead className="bg-gray-50 text-sm">
          <tr>
            <th className="p-2 text-left">Descripción</th>
            <th className="p-2 text-right">Cantidad</th>
            <th className="p-2 text-right">Precio</th>
            <th className="p-2 text-right">Total</th>
            {editable && <th className="p-2 w-20"></th>}
          </tr>
        </thead>

        <tbody>
          {items.map((item, i) => (
            <tr key={i} className="border-t text-sm">
              <td className="p-2">
                {editable ? (
                  <input
                    className="border px-2 py-1 rounded w-full"
                    value={item.description}
                    onChange={(e) =>
                      updateItem(i, {
                        description: e.target.value,
                      })
                    }
                  />
                ) : (
                  item.description
                )}
              </td>

              <td className="p-2 text-right">
                {editable ? (
                  <input
                    type="number"
                    className="border px-2 py-1 rounded w-20 text-right"
                    value={item.quantity}
                    onChange={(e) =>
                      updateItem(i, {
                        quantity: Number(e.target.value),
                      })
                    }
                  />
                ) : (
                  item.quantity
                )}
              </td>

              <td className="p-2 text-right">
                {editable ? (
                  <input
                    type="number"
                    className="border px-2 py-1 rounded w-24 text-right"
                    value={item.price}
                    onChange={(e) =>
                      updateItem(i, {
                        price: Number(e.target.value),
                      })
                    }
                  />
                ) : (
                  `$${item.price}`
                )}
              </td>

              <td className="p-2 text-right">
                ${item.total}
              </td>

              {editable && (
                <td className="p-2 text-right">
                  <button
                    className="text-red-600 text-sm"
                    onClick={() => removeItem(i)}
                  >
                    Eliminar
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </Table>

      {editable && (
        <Button onClick={addItem}>
          Agregar concepto
        </Button>
      )}
    </div>
  );
}
