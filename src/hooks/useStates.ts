import { useQuery } from '@tanstack/react-query';
import {  getStatesByCountry } from '@/services/states.service'

export function useStates (){
  return useQuery({
    queryKey: ['states'],
    queryFn: getStatesByCountry
  })
}

/*
import { useQuery } from '@tanstack/react-query';
import { getCountries } from '@/services/countries.service';

export function useCountries() {
  return useQuery({
    queryKey: ['countries'],
    queryFn: getCountries,
  });
}
*/