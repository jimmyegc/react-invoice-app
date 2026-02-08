export type ClientListRow = {
  id: string;

  name: string;
  business_name: string;
  rfc: string;

  address: string;
  phone: string;
  email: string;

  created_at: string;

  city_id: number | null;
  city_name: string | null;

  state_id: number | null;
  state_name: string | null;

  country_id: number | null;
  country_name: string | null;
};

export type ClientPayload = {
  name: string;
  business_name: string;
  rfc: string;
  address?: string | null;
  phone?: string | null;
  email?: string | null;
  city_id?: number | null;
  state_id?: number | null;
  country_id?: number | null;
};