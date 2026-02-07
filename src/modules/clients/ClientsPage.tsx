import { useState } from 'react';
import { ClientsTable } from './ClientsTable';
import { ClientFormModal } from './ClientFormModal';
import type { Client } from './clients.types';
import { useDebounce } from '@/hooks/useDebounce';

export function ClientsPage() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Client | null>(null);
  const [search, setSearch] = useState('');

  const debouncedSearch = useDebounce(search, 500);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Clientes</h1>

        <button
          onClick={() => {
            setSelected(null);
            setOpen(true);
          }}
          className="bg-gray-900 text-white px-4 py-2 rounded text-sm"
        >
          Nuevo cliente
        </button>
      </div>

      <input
        className="border px-3 py-2 rounded w-full"
        placeholder="Buscar cliente..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <ClientsTable
        search={debouncedSearch}
        onEdit={(client) => {
          setSelected(client);
          setOpen(true);
        }}
      />

      <ClientFormModal
        open={open}
        client={selected}
        onClose={() => {
          setOpen(false);
          setSelected(null);
        }}
      />
    </div>
  );
}
