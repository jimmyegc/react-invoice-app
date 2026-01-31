// modules/clients/hooks.ts
import { useCrud } from '@/hooks/useCrud';

export const useClients = () => useCrud<Client>('clients');
