import { useQuery } from '@tanstack/react-query';
import {  getAllStates, getStatesByCountry } from '@/services/states.service'

export function useStates (){
  return useQuery({
    queryKey: ['states'],
    queryFn: getAllStates
  })
}

export function useStatesByCountry(countryId?: number) {
  return useQuery({
    queryKey: ['states', countryId],
    queryFn: () => getStatesByCountry(countryId!),
    enabled: !!countryId,
  });
}