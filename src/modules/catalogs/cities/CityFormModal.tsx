import { useEffect, useState } from 'react';
import { createCity, updateCity } from '@/services/cities.service';
import { getCountries } from '@/services/countries.service';
import { getStatesByCountry } from '@/services/states.service';
import { Card, Button, Input, Select } from '@/components/ui';

type City = {
  id: number;
  name: string;
  state_id: number;
};

export function CityFormModal({
  open,
  city,
  onClose,
}: {
  open: boolean;
  city?: City | null;
  onClose: () => void;
}) {
  const [name, setName] = useState('');
  const [countryId, setCountryId] = useState<number | null>(null);
  const [stateId, setStateId] = useState<number | null>(null);

  const [countries, setCountries] = useState<any[]>([]);
  const [states, setStates] = useState<any[]>([]);

  // cargar países
  useEffect(() => {
    getCountries().then(setCountries);    
  }, []);

  // cuando cambia país → cargar estados
  useEffect(() => {
    if (countryId) {
      getStatesByCountry(countryId).then(setStates);
    } else {
      setStates([]);
    }
  }, [countryId]);

  // modo edición
  useEffect(() => {
    if (!city) return;
    console.log(city)
    setName(city.name);
    setStateId(city.state_id);

    // inferir country desde state
    getStatesByCountry(undefined as any).then(() => {}); // noop visual
  }, [city]);

  if (!open) return null;

  const submit = async () => {
    if (!name || !stateId) return;

    if (city) {
      await updateCity(city.id, {
        name,
        state_id: stateId,
      });
    } else {
      await createCity({
        name,
        state_id: stateId,
      });
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <Card className="w-full max-w-md space-y-4">
        <h2 className="text-lg font-semibold">
          {city ? 'Editar ciudad' : 'Nueva ciudad'}
        </h2>

        <Select
          value={countryId ?? ''}
          onChange={(e) => setCountryId(Number(e.target.value))}
        >
          <option value="">País</option>
          {countries.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </Select>
        <Select
          value={stateId ?? ''}
          onChange={(e) => setStateId(Number(e.target.value))}
          disabled={!countryId}
        >
          <option value="">Estado</option>
          {states.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </Select>

        <Input
          placeholder="Nombre de la ciudad"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <div className="flex justify-end gap-2 pt-2">
          <Button variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={submit}>
            Guardar
          </Button>
        </div>
      </Card>
    </div>
  );
}
