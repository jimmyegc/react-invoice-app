import { useQuery } from '@tanstack/react-query';
import { getCountries } from '@/services/countries.service';

export function useCountries() {
  return useQuery({
    queryKey: ['countries'],
    queryFn: getCountries,
  });
}
