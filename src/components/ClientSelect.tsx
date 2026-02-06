import { useEffect, useState } from 'react';
import { getClients } from '@/services/clients.service';

type Props = {
  value?: string;
  onChange: (value: string) => void;
};

export function ClientSelect({ value, onChange }: Props) {
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getClients()
      .then(setClients)
      .finally(() => setLoading(false));
  }, []);

  if (!loading) return <p>Cargando clientes...</p>;

  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      required
    >
      <option value="">Selecciona un cliente</option>

      {clients.map(client => (
        <option key={client.id} value={client.id}>
          {client.business_name || client.name}
        </option>
      ))}
    </select>
  );
}
