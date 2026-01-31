// modules/catalogs/states/StateFormModal.tsx
import { useEffect, useState } from 'react';
import { useCountries } from '../countries/useCountries';

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; country_id: number }) => void;
  initialData?: { name: string; country_id: number };
};

export function StateFormModal({
  open,
  onClose,
  onSubmit,
  initialData,
}: Props) {
  const { getCountries } = useCountries();
  const [countries, setCountries] = useState<any[]>([]);
  const [name, setName] = useState('');
  const [countryId, setCountryId] = useState<number | ''>('');

  useEffect(() => {
    getCountries().then(setCountries);
  }, []);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setCountryId(initialData.country_id);
    }
  }, [initialData]);

  if (!open) return null;

  return (
    <div className="modal">
      <h2>{initialData ? 'Editar estado' : 'Nuevo estado'}</h2>

      <input
        placeholder="Nombre del estado"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <select
        value={countryId}
        onChange={(e) => setCountryId(Number(e.target.value))}
      >
        <option value="">Selecciona país</option>
        {countries.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>

      <button
        onClick={() =>
          onSubmit({
            name,
            country_id: Number(countryId),
          })
        }
        disabled={!name || !countryId}
      >
        Guardar
      </button>

      <button onClick={onClose}>Cancelar</button>
    </div>
  );
}
