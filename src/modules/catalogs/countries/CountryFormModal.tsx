// modules/catalogs/countries/CountryFormModal.tsx
import { useEffect, useState } from 'react';

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; iso: string }) => void;
  initialData?: { name: string; iso: string };
};

export function CountryFormModal({
  open,
  onClose,
  onSubmit,
  initialData,
}: Props) {
  const [name, setName] = useState('');
  const [iso, setIso] = useState('');

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setIso(initialData.iso);
    }
  }, [initialData]);

  if (!open) return null;

  return (
    <div className="modal">
      <h2>{initialData ? 'Editar país' : 'Nuevo país'}</h2>

      <input
        placeholder="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="ISO (MX, US)"
        value={iso}
        maxLength={2}
        onChange={(e) => setIso(e.target.value.toUpperCase())}
      />

      <button onClick={() => onSubmit({ name, iso })}>
        Guardar
      </button>

      <button onClick={onClose}>Cancelar</button>
    </div>
  );
}
