export interface Client {
  id: string;
  name: string;
  business_name?: string;
  rfc?: string;
  address?: string;
  phone?: string;
  email?: string;

  country_id?: number | null;
  country_name?: string | null;

  state_id?: number | null;
  state_name?: string | null;

  city_id?: number | null;
  city_name?: string | null;

  created_at?: string;
}

export type ClientFormData = {
  name: string;
  business_name?: string;
  rfc?: string;
  address?: string;
  phone?: string;
  email?: string;
  country_id?: number | null;
  state_id?: number | null;
  city_id?: number | null;
};
