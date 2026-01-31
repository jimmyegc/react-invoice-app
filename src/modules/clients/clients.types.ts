export interface Client {
  id: string;
  name: string;
  business_name?: string;
  rfc?: string;
  address?: string;
  phone?: string;
  email?: string;
  created_at?: string;
}

export type ClientFormData = Omit<Client, 'id' | 'created_at'>;
