import { useQuery } from '@tanstack/react-query';
import {  getStates, getStatesByCountry } from '@/services/states.service'

export function useStates (){
  return useQuery({
    queryKey: ['states'],
    queryFn: getStates
  })
}

export function useStatesByCountry(countryId?: number | null) {
  return useQuery({
    queryKey: ['states', countryId],
    queryFn: () => getStatesByCountry(countryId!),
    enabled: !!countryId,
  });
}