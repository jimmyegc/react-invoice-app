// modules/clients/hooks.ts
import { useCrud } from '@/hooks/useCrud';
import type { Client } from './clients.types'
export const useClients = () => useCrud<Client>('clients');
