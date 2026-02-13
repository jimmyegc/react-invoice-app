import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient, updateClient } from "./clients.service";
import type { Client, ClientFormData } from "./clients.types";

import { useCountries } from "@/hooks/useCountries";
import { useStatesByCountry } from "@/hooks/useStates";
import { useCitiesByState } from "@/hooks/useCities";
import { Spinner } from "@/components/ui/Spinner";

type Props = {
  open: boolean;
  client: Client | null;
  onClose: () => void;
};

export function ClientFormModal({ open, client, onClose }: Props) {
  const queryClient = useQueryClient();

  const [form, setForm] = useState<ClientFormData>({
    name: "",
    business_name: "",
    rfc: "",
    address: "",
    phone: "",
    email: "",
    country_id: null,
    state_id: null,
    city_id: null,
  });

  const { countries } = useCountries();
  const { data: states } = useStatesByCountry(form?.country_id);
  const { data: cities } = useCitiesByState(form?.state_id);

  useEffect(() => {
    if (client) {
      setForm({
        name: client.name,
        business_name: client.business_name ?? "",
        rfc: client.rfc ?? "",
        address: client.address ?? "",
        phone: client.phone ?? "",
        email: client.email ?? "",
        country_id: client.country_id ?? null,
        state_id: client.state_id ?? null,
        city_id: client.city_id ?? null,
      });
    } else {
      setForm({
        name: "",
        business_name: "",
        rfc: "",
        address: "",
        phone: "",
        email: "",
        country_id: null,
        state_id: null,
        city_id: null,
      });
    }
  }, [client]);

  const mutation = useMutation({
    mutationFn: (data: ClientFormData) =>
      client ? updateClient(client.id, data) : createClient(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
      onClose();
    },
  });

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-lg p-6 space-y-4">
        <h2 className="text-lg font-semibold">
          {client ? "Editar cliente" : "Nuevo cliente"}
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
            onChange={(e) => setForm({ ...form, name: e.target.value })}
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
            onChange={(e) => setForm({ ...form, rfc: e.target.value })}
          />

          <input
            className="border px-3 py-2 rounded w-full"
            placeholder="Teléfono"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />

          <input
            className="border px-3 py-2 rounded w-full"
            placeholder="Correo electrónico"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <select
            className="border px-3 py-2 rounded w-full"
            value={form.country_id ?? ""}
            onChange={(e) =>
              setForm({
                ...form,
                country_id: Number(e.target.value),
                state_id: null,
                city_id: null,
              })
            }
          >
            <option value="">País</option>

            {countries.map((c) => (
              <option key={c.country_id} value={c.country_id}>
                {c.country_name}
              </option>
            ))}
          </select>

          <select
            className="border px-3 py-2 rounded w-full"
            value={form.state_id ?? ""}
            disabled={!form.country_id}
            onChange={(e) =>
              setForm({
                ...form,
                state_id: Number(e.target.value),
                city_id: null,
              })
            }
          >
            <option value="">Estado</option>
            {states?.map((s) => (
              <option key={s.state_id} value={s.state_id}>
                {s.state_name}
              </option>
            ))}
          </select>

          <select
            className="border px-3 py-2 rounded w-full"
            value={form.city_id ?? ""}
            disabled={!form.state_id}
            onChange={(e) =>
              setForm({ ...form, city_id: Number(e.target.value) })
            }
          >
            <option value="">Ciudad</option>
            {cities?.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          <input
            className="border px-3 py-2 rounded w-full"
            placeholder="Dirección (calle, número)"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
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
              className="flex gap-2 px-4 py-2 text-sm bg-gray-900 text-white rounded"
            >
              {mutation.isPending && <Spinner size="sm" />}
              {mutation.isPending ? "Guardando..." : "Guardar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
