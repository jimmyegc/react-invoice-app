import { useQuery } from '@tanstack/react-query';
import { getAllCities, getCitiesByState } from '@/services/cities.service';

export function useCities() {
  return useQuery({
    queryKey: ['cities'],
    queryFn: getAllCities,
  });
}

export function useCitiesByState(stateId?: number | null) {
  return useQuery({
    queryKey: ['cities', stateId],
    queryFn: () => getCitiesByState(stateId!),
    enabled: !!stateId,
  });
}
