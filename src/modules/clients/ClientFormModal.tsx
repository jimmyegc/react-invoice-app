import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createClient, updateClient } from './clients.service';
import { Client } from './clients.types';

type Props = {
  open: boolean;
  client: Client | null;
  onClose: () => void;
};

type FormData = {
  name: string;
  business_name?: string;
  rfc?: string;
  address?: string;
  phone?: string;
  email?: string;
};

export function ClientFormModal({ open, client, onClose }: Props) {
  const queryClient = useQueryClient();

  const [form, setForm] = useState<FormData>({
    name: '',
    business_name: '',
    rfc: '',
    address: '',
    phone: '',
    email: '',
  });

  // 👉 cuando es editar, llenamos el form
  useEffect(() => {
    if (client) {
      setForm({
        name: client.name,
        business_name: client.business_name ?? '',
        rfc: client.rfc ?? '',
        address: client.address ?? '',
        phone: client.phone ?? '',
        email: client.email ?? '',
      });
    } else {
      setForm({
        name: '',
        business_name: '',
        rfc: '',
        address: '',
        phone: '',
        email: '',
      });
    }
  }, [client]);

  const mutation = useMutation({
    mutationFn: (data: FormData) =>
      client ? updateClient(client.id, data) : createClient(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      onClose();
    },
  });

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-lg p-6 space-y-4">
        <h2 className="text-lg font-semibold">
          {client ? 'Editar cliente' : 'Nuevo cliente'}
        </h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            mutation.mutate(form);
          }}
          className="space-y-3"
        >
          <input
            className="border px-3 py-2 rounded w-full"
            placeholder="Nombre *"
            required
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <input
            className="border px-3 py-2 rounded w-full"
            placeholder="Razón social"
            value={form.business_name}
            onChange={(e) =>
              setForm({ ...form, business_name: e.target.value })
            }
          />

          <input
            className="border px-3 py-2 rounded w-full"
            placeholder="RFC"
            value={form.rfc}
            onChange={(e) =>
              setForm({ ...form, rfc: e.target.value })
            }
          />

          <input
            className="border px-3 py-2 rounded w-full"
            placeholder="Dirección"
            value={form.address}
            onChange={(e) =>
              setForm({ ...form, address: e.target.value })
            }
          />

          <input
            className="border px-3 py-2 rounded w-full"
            placeholder="Teléfono"
            value={form.phone}
            onChange={(e) =>
              setForm({ ...form, phone: e.target.value })
            }
          />

          <input
            type="email"
            className="border px-3 py-2 rounded w-full"
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm border rounded"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={mutation.isPending}
              className="px-4 py-2 text-sm bg-gray-900 text-white rounded"
            >
              {mutation.isPending
                ? 'Guardando...'
                : 'Guardar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
