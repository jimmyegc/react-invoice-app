import { useEffect, useState } from 'react';
import { CompanyPayload } from './useCompany';

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: CompanyPayload) => void;
  initialData?: CompanyPayload;
};

export function CompanyFormModal({
  open,
  onClose,
  onSubmit,
  initialData,
}: Props) {
  const [form, setForm] = useState<CompanyPayload>({
    name: '',
    business_line: '',
    address: '',
    city: '',
    state: '',
    country: '',
    phone: '',
    email: '',
    website: '',
  });

  useEffect(() => {
    if (initialData) setForm(initialData);
  }, [initialData]);

  if (!open) return null;

  return (
    <div className="modal">
      <h2>{initialData ? 'Editar empresa' : 'Nueva empresa'}</h2>

      {Object.entries(form).map(([key, value]) => (
        <input
          key={key}
          placeholder={key.replace('_', ' ')}
          value={value ?? ''}
          onChange={(e) =>
            setForm({ ...form, [key]: e.target.value })
          }
        />
      ))}

      <button
        onClick={() => onSubmit(form)}
        disabled={!form.name}
      >
        Guardar
      </button>

      <button onClick={onClose}>Cancelar</button>
    </div>
  );
}
