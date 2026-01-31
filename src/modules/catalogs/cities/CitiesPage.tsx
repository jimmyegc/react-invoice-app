import { useEffect, useState } from 'react';
import { getCountries } from '@/services/countries.service';
import { getStatesByCountry } from '@/services/states.service';
import { getCitiesByState } from '@/services/cities.service';

export function CitiesPage() {
  const [countries, setCountries] = useState<any[]>([]);
  const [states, setStates] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);

  const [countryId, setCountryId] = useState<number | null>(null);
  const [stateId, setStateId] = useState<number | null>(null);

  useEffect(() => {
    getCountries().then(setCountries);
  }, []);

  useEffect(() => {
    if (countryId) {
      setStateId(null);
      setCities([]);
      getStatesByCountry(countryId).then(setStates);
    }
  }, [countryId]);

  useEffect(() => {
    if (stateId) {
      getCitiesByState(stateId).then(setCities);
    }
  }, [stateId]);

  return (
    <div>
      <h1>Cities</h1>

      {/* Country */}
      <select onChange={(e) => setCountryId(Number(e.target.value))}>
        <option value="">Select country</option>
        {countries.map(c => (
          <option key={c.id} value={c.id}>{c.name}</option>
        ))}
      </select>

      {/* State */}
      {countryId && (
        <select onChange={(e) => setStateId(Number(e.target.value))}>
          <option value="">Select state</option>
          {states.map(s => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>
      )}

      {/* Cities */}
      <ul>
        {cities.map(city => (
          <li key={city.id}>{city.name}</li>
        ))}
      </ul>
    </div>
  );
}
